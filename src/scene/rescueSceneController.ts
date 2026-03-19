import { RescueSceneMachine } from './rescueSceneMachine';
import { sceneEventBus } from './rescueSceneEvents';
import { rescueSceneConfig } from './rescueSceneConfig';
import type { RescueSceneState, AttemptNumber } from './rescueSceneTypes';
import { delay } from '../animations/core/animationHelpers';

/**
 * Orchestrates the rescue scene flow.
 * In iteration 1: uses delays as animation stubs.
 * In iteration 2: will delegate to animation modules via registry.
 */
export class RescueSceneController {
  private machine: RescueSceneMachine;
  private onStateChange: (state: RescueSceneState) => void;

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

  private go(next: RescueSceneState): boolean {
    return this.machine.transition(next);
  }

  /** Start the scene from preload */
  async start(): Promise<void> {
    sceneEventBus.emit('iframe_loaded');

    // Preload phase (stub: short delay)
    await delay(600);

    // Intro
    this.go('intro');
    sceneEventBus.emit('intro_shown');
    await delay(900);

    // Ready for attempt 1
    this.go('ready_attempt_1');
  }

  /** User taps the CTA — handles the current attempt */
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

  private get currentAttemptIndex(): number {
    const s = this.machine.state;
    if (s.includes('1')) return 0;
    if (s.includes('2')) return 1;
    return 2;
  }

  getCurrentAttemptNumber(): AttemptNumber {
    const s = this.machine.state;
    if (
      s === 'ready_attempt_1' ||
      s === 'spin_1' ||
      s === 'near_miss_1'
    )
      return 1;
    if (
      s === 'ready_attempt_2' ||
      s === 'spin_2' ||
      s === 'near_miss_2'
    )
      return 2;
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
    sceneEventBus.emit('attempt_1_clicked');
    this.go('spin_1');

    // Stub: spin duration
    await delay(1600);

    // Near miss
    this.go('near_miss_1');
    sceneEventBus.emit('attempt_1_near_miss');
    await delay(1200);

    // Ready for attempt 2
    this.go('ready_attempt_2');
  }

  /** Attempt 2: heavy spin -> hard near miss */
  private async runAttempt2(): Promise<void> {
    sceneEventBus.emit('attempt_2_clicked');
    this.go('spin_2');

    await delay(1900);

    this.go('near_miss_2');
    sceneEventBus.emit('attempt_2_near_miss');
    await delay(1400);

    this.go('ready_attempt_3');
  }

  /** Attempt 3: charge -> final spin -> lock -> burst -> morph -> reveal -> hold */
  private async runAttempt3(): Promise<void> {
    sceneEventBus.emit('attempt_3_clicked');

    // Charge
    this.go('spin_3_charge');
    await delay(600);

    // Final spin
    this.go('spin_3');
    await delay(2100);

    // Lock
    this.go('final_lock');
    await delay(400);

    // Burst
    this.go('jackpot_burst');
    await delay(1050);

    // Morph
    this.go('reward_morph');
    await delay(900);

    // Reveal
    this.go('reward_reveal');
    sceneEventBus.emit('reward_revealed');
    await delay(700);

    // Hold
    this.go('reward_hold');
  }

  /** Final CTA click */
  private handleFinalCta(): void {
    sceneEventBus.emit('final_cta_clicked');
    this.go('closing');
    sceneEventBus.emit('scene_closed');
  }

  reset(): void {
    this.machine.reset();
  }
}
