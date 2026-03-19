import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

let activeTween: gsap.core.Timeline | null = null;

/** Hold the final reward scene stable with minimal breathing. */
export const reward_hold_stabilize_v1: AnimationModule = {
  id: 'reward_hold_stabilize_v1',
  slot: 'rewardHold',
  variant: 'v1',

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const card = ctx.layers['reward-card'];
    const bg = ctx.layers['background'];

    const tl = gsap.timeline({ repeat: -1 });
    activeTween = tl;

    // Gentle card breathing
    if (card) {
      tl.to(card, {
        boxShadow: '0 0 50px rgba(0,200,83,0.35)',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }, 0);
    }

    // Background gentle pulse
    if (bg) {
      tl.to(bg, {
        filter: 'brightness(1.03)',
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      }, 0);
    }

    return { status: 'completed' };
  },

  stop() {
    activeTween?.kill();
    activeTween = null;
  },

  dispose() {
    this.stop?.();
  },
};
