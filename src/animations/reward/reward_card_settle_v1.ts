import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Reward card settles: scale-up entrance with glow bloom, then settle. */
export const reward_card_settle_v1: AnimationModule = {
  id: 'reward_card_settle_v1',
  slot: 'rewardSettle',
  variant: 'v1',
  duration: 0.8,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const card = ctx.layers['reward-card'];
    if (!card) return { status: 'completed' };

    const tl = gsap.timeline();

    // Start invisible
    gsap.set(card, { opacity: 0, scale: 0.8, y: 40, filter: 'blur(6px)' });

    // Phase 1: bloom entrance — slight overshoot
    tl.to(card, {
      opacity: 1,
      scale: 1.04,
      y: -8,
      filter: 'blur(0px)',
      duration: 0.45,
      ease: 'power2.out',
    });

    // Phase 2: glow bloom at peak
    tl.to(card, {
      boxShadow: '0 0 60px rgba(0,200,83,0.4), 0 0 30px rgba(255,214,0,0.2)',
      duration: 0.15,
      ease: 'power2.out',
    }, 0.3);

    // Phase 3: settle to final position
    tl.to(card, {
      scale: 1,
      y: 0,
      boxShadow: '0 0 40px rgba(0,200,83,0.2), 0 0 15px rgba(255,214,0,0.08)',
      duration: 0.35,
      ease: 'sine.out',
    });

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
