import { RescueSceneMachine } from './rescueSceneMachine';
import { sceneEventBus } from './rescueSceneEvents';
import { rescueSceneConfig } from './rescueSceneConfig';
import type { RescueSceneState, AttemptNumber } from './rescueSceneTypes';
import type { AnimationContext } from '../animations/core/animationTypes';
import { animationRegistry } from '../animations/core/animationRegistry';
import { motionTokens } from '../theme/motionTokens';
import type { ReelWindowHandle } from '../blocks/ReelWindow/ReelWindow';

// Near miss & win target indices for 3 reel columns
const REEL_OUTCOMES = {
  near_miss_soft: [0, 1, 2],   // crown, bonus, chest — different
  near_miss_hard: [3, 3, 0],   // 500FS, 500FS, crown — two match
  win: [3, 3, 3],              // 500FS x3
};

/**
 * Orchestrates the rescue scene flow with GSAP animation modules.
 */
export class RescueSceneController {
  private machine: RescueSceneMachine;
  private onStateChange: (state: RescueSceneState) => void;
  private sceneRoot: HTMLElement | null = null;
  private reelHandle: ReelWindowHandle | null = null;

  constructor(onStateChange: (state: RescueSceneState) => void) {
    this.machine = new RescueSceneMachine();
    this.onStateChange = onStateChange;

    this.machine.onStateChange((newState) => {
      this.onStateChange(newState);
    });
  }

  get state(): RescueSceneState {
    return this.machine.state;
  }

  setSceneRoot(el: HTMLElement | null): void {
    this.sceneRoot = el;
  }

  setReelHandle(handle: ReelWindowHandle | null): void {
    this.reelHandle = handle;
  }

  private go(next: RescueSceneState): boolean {
    return this.machine.transition(next);
  }

  private buildContext(payload?: Record<string, unknown>): AnimationContext {
    const root = this.sceneRoot ?? document.body;
    const layers: Record<string, HTMLElement | null> = {};

    // Collect all data-layer elements
    root.querySelectorAll<HTMLElement>('[data-layer]').forEach((el) => {
      const name = el.getAttribute('data-layer');
      if (name) layers[name] = el;
    });

    return {
      sceneRoot: root,
      layers,
      theme: { name: 'flagman' },
      tokens: motionTokens,
      payload,
    };
  }

  private async playAnim(animId: string, payload?: Record<string, unknown>): Promise<void> {
    const mod = animationRegistry.resolve(animId);
    if (!mod) {
      console.warn(`[Controller] Animation not found: ${animId}`);
      return;
    }
    const ctx = this.buildContext(payload);
    await mod.play(ctx);
  }

  private stopAnim(animId: string): void {
    const mod = animationRegistry.resolve(animId);
    mod?.stop?.();
  }

  /** Start the scene from preload */
  async start(): Promise<void> {
    sceneEventBus.emit('iframe_loaded');

    // Short preload
    await new Promise((r) => setTimeout(r, 400));

    // Intro
    this.go('intro');
    sceneEventBus.emit('intro_shown');

    // Run intro animations
    await Promise.all([
      this.playAnim('intro_assemble_v1'),
      this.playAnim('hud_intro_reveal_v1'),
      this.playAnim('frame_wake_up_v1'),
    ]);

    // Ready for attempt 1
    this.go('ready_attempt_1');

    // Start ambient systems + CTA idle pulse
    this.startAmbient();
    this.playAnim('cta_idle_pulse_v1');
  }

  /** Start all ambient motion loops */
  private startAmbient(): void {
    this.playAnim('ambient_idle_loop_v1');
    this.playAnim('floating_props_drift_v1');
    this.playAnim('chrome_shimmer_v1');
  }

  /** Stop all ambient motion loops */
  private stopAmbient(): void {
    this.stopAnim('ambient_idle_loop_v1');
    this.stopAnim('floating_props_drift_v1');
    this.stopAnim('chrome_shimmer_v1');
  }

  /** User taps the CTA */
  async handleTap(): Promise<void> {
    const { state } = this.machine;

    if (state === 'ready_attempt_1') {
      await this.runAttempt1();
    } else if (state === 'ready_attempt_2') {
      await this.runAttempt2();
    } else if (state === 'ready_attempt_3') {
      await this.runAttempt3();
    } else if (state === 'reward_hold') {
      this.handleFinalCta();
    }
  }

  getCurrentAttemptNumber(): AttemptNumber {
    const s = this.machine.state;
    if (s === 'ready_attempt_1' || s === 'spin_1' || s === 'near_miss_1') return 1;
    if (s === 'ready_attempt_2' || s === 'spin_2' || s === 'near_miss_2') return 2;
    return 3;
  }

  getCtaLabel(): string {
    const s = this.machine.state;
    if (s === 'ready_attempt_1') return rescueSceneConfig.attempts[0].ctaLabel;
    if (s === 'ready_attempt_2') return rescueSceneConfig.attempts[1].ctaLabel;
    if (s === 'ready_attempt_3') return rescueSceneConfig.attempts[2].ctaLabel;
    if (s === 'reward_hold') return rescueSceneConfig.reward.ctaLabel;
    return '';
  }

  isCtaEnabled(): boolean {
    const s = this.machine.state;
    return (
      s === 'ready_attempt_1' ||
      s === 'ready_attempt_2' ||
      s === 'ready_attempt_3' ||
      s === 'reward_hold'
    );
  }

  /** Attempt 1: soft spin -> soft near miss */
  private async runAttempt1(): Promise<void> {
    this.stopAnim('cta_idle_pulse_v1');
    sceneEventBus.emit('attempt_1_clicked');

    // Press + ignite
    await this.playAnim('cta_press_response_v1');
    this.go('spin_1');

    // Spin reels + ignition + bg charge in parallel
    const spinPromise = this.reelHandle?.spinReels(
      REEL_OUTCOMES.near_miss_soft,
      1.6,
      0.12,
      'power3.out',
    );
    this.playAnim('spin_start_ignite_v1');
    this.playAnim('background_charge_up_v1', { attemptLevel: 1 });

    await spinPromise;

    // Near miss
    this.go('near_miss_1');
    sceneEventBus.emit('attempt_1_near_miss');
    await this.playAnim('near_miss_soft_v1');

    // Transition to ready 2
    this.go('ready_attempt_2');
    this.playAnim('cta_idle_pulse_v1');
  }

  /** Attempt 2: heavy spin -> hard near miss */
  private async runAttempt2(): Promise<void> {
    this.stopAnim('cta_idle_pulse_v1');
    sceneEventBus.emit('attempt_2_clicked');

    await this.playAnim('cta_press_response_v1');
    this.go('spin_2');

    const spinPromise = this.reelHandle?.spinReels(
      REEL_OUTCOMES.near_miss_hard,
      1.9,
      0.15,
      'expo.out',
    );
    this.playAnim('spin_start_ignite_v2');
    this.playAnim('background_charge_up_v1', { attemptLevel: 2 });

    await spinPromise;

    this.go('near_miss_2');
    sceneEventBus.emit('attempt_2_near_miss');
    await this.playAnim('near_miss_hard_v1');

    this.go('ready_attempt_3');
    this.playAnim('cta_idle_pulse_v1');
  }

  /** Attempt 3: charge -> final spin -> lock -> burst -> morph -> reveal -> hold */
  private async runAttempt3(): Promise<void> {
    this.stopAnim('cta_idle_pulse_v1');
    sceneEventBus.emit('attempt_3_clicked');

    await this.playAnim('cta_press_response_v1');

    // Charge
    this.go('spin_3_charge');
    await Promise.all([
      this.playAnim('final_spin_charge_v1'),
      this.playAnim('spin_start_ignite_final_v3'),
    ]);

    // Final spin
    this.go('spin_3');
    const spinPromise = this.reelHandle?.spinReels(
      REEL_OUTCOMES.win,
      2.1,
      0.18,
      'expo.out',
    );
    this.playAnim('background_charge_up_v1', { attemptLevel: 3 });
    await spinPromise;

    // Lock
    this.go('final_lock');
    await this.playAnim('final_lock_impact_v1');

    // Burst
    this.go('jackpot_burst');
    await Promise.all([
      this.playAnim('jackpot_burst_v1'),
      this.playAnim('jackpot_burst_support_v1'),
    ]);

    // Morph — stop ambient before transition
    this.stopAmbient();
    this.go('reward_morph');
    await this.playAnim('reward_morph_v1');

    // Reveal
    this.go('reward_reveal');
    sceneEventBus.emit('reward_revealed');
    await this.playAnim('reward_card_settle_v1');
    await this.playAnim('final_copy_settle_v1');

    // Hold
    this.go('reward_hold');
    this.playAnim('reward_hold_stabilize_v1');
    this.playAnim('final_cta_emphasis_v1');
  }

  /** Final CTA click */
  private handleFinalCta(): void {
    this.stopAnim('reward_hold_stabilize_v1');
    this.stopAnim('final_cta_emphasis_v1');
    sceneEventBus.emit('final_cta_clicked');
    this.go('closing');
    sceneEventBus.emit('scene_closed');
  }

  reset(): void {
    this.machine.reset();
  }
}
