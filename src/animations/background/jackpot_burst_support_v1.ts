import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

export const jackpot_burst_support_v1: AnimationModule = {
  id: 'jackpot_burst_support_v1',
  slot: 'jackpotBurst',
  variant: 'support_v1',
  duration: 1.05,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const bg = ctx.layers['background'];
    if (!bg) return { status: 'completed' };

    const tl = gsap.timeline();

    tl.to(bg, { filter: 'brightness(1.35) saturate(1.2)', duration: 0.15, ease: 'power3.out' }, 0);
    tl.to(bg, { filter: 'brightness(1.05) saturate(1)', duration: 0.8, ease: 'power2.out' }, 0.2);

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
