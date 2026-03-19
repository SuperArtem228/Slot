import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

export const background_charge_up_v1: AnimationModule = {
  id: 'background_charge_up_v1',
  slot: 'backgroundCharge',
  variant: 'v1',
  duration: 0.8,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const bg = ctx.layers['background'];
    if (!bg) return { status: 'completed' };

    const intensity = (ctx.payload?.intensity as number) ?? 1.05;

    const tl = gsap.timeline();
    tl.to(bg, {
      filter: `brightness(${intensity})`,
      duration: 0.5,
      ease: 'sine.inOut',
    });
    tl.to(bg, {
      filter: 'brightness(1)',
      duration: 0.4,
      ease: 'sine.out',
    });

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
