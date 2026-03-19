import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Reward card settles into final readable position. */
export const reward_card_settle_v1: AnimationModule = {
  id: 'reward_card_settle_v1',
  slot: 'rewardSettle',
  variant: 'v1',
  duration: 0.7,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const card = ctx.layers['reward-card'];
    if (!card) return { status: 'completed' };

    const tl = gsap.timeline();

    gsap.set(card, { opacity: 0, scale: 0.85, y: 30 });

    tl.to(card, {
      opacity: 1,
      scale: 1.03,
      y: -5,
      duration: 0.45,
      ease: 'power2.out',
    });

    tl.to(card, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'sine.out',
    });

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
