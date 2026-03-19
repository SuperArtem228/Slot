import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

let activeTweens: gsap.core.Tween[] = [];

/** Hold the final reward scene stable with minimal breathing. */
export const reward_hold_stabilize_v1: AnimationModule = {
  id: 'reward_hold_stabilize_v1',
  slot: 'rewardHold',
  variant: 'v1',

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const card = ctx.layers['reward-card'];
    const bg = ctx.layers['background'];

    // Gentle card glow breathing
    if (card) {
      activeTweens.push(
        gsap.to(card, {
          boxShadow: '0 0 50px rgba(0,200,83,0.35)',
          duration: 2.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }),
      );
    }

    // Background halo gentle pulse
    if (bg) {
      const halo = bg.querySelector('[data-bg="halo"]') as HTMLElement | null;
      if (halo) {
        activeTweens.push(
          gsap.to(halo, {
            opacity: 0.4,
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          }),
        );
      }

      const centerGlow = bg.querySelector('[data-bg="center-glow"]') as HTMLElement | null;
      if (centerGlow) {
        activeTweens.push(
          gsap.to(centerGlow, {
            opacity: 0.55,
            duration: 3.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          }),
        );
      }
    }

    return { status: 'completed' };
  },

  stop() {
    activeTweens.forEach((t) => t.kill());
    activeTweens = [];
  },

  dispose() {
    this.stop?.();
  },
};
