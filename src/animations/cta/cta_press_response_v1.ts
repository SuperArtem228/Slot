import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

export const cta_press_response_v1: AnimationModule = {
  id: 'cta_press_response_v1',
  slot: 'ctaPress',
  variant: 'v1',
  duration: 0.16,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const cta = ctx.layers['cta'];
    if (!cta) return { status: 'completed' };

    const btn = cta.querySelector('button') as HTMLElement | null;
    if (!btn) return { status: 'completed' };

    const tl = gsap.timeline();

    tl.to(btn, {
      scale: 0.97,
      duration: 0.08,
      ease: 'power2.in',
    }).to(btn, {
      scale: 1,
      duration: 0.1,
      ease: 'power2.out',
    });

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
