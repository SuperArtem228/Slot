import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

let activeTween: gsap.core.Timeline | null = null;

export const final_cta_emphasis_v1: AnimationModule = {
  id: 'final_cta_emphasis_v1',
  slot: 'finalCta',
  variant: 'v1',
  duration: 1.2,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const zone = ctx.layers['final-cta'];
    if (!zone) return { status: 'completed' };

    const btn = zone.querySelector('button') as HTMLElement | null;
    if (!btn) return { status: 'completed' };

    const tl = gsap.timeline();
    activeTween = tl;

    // Entry emphasis
    gsap.set(btn, { scale: 0.9, opacity: 0 });
    tl.to(btn, { scale: 1.03, opacity: 1, duration: 0.4, ease: 'back.out(1.4)' });
    tl.to(btn, { scale: 1, duration: 0.25, ease: 'power2.out' });

    // Then gentle idle pulse
    tl.to(btn, {
      scale: 1.02,
      boxShadow: '0 4px 32px rgba(255,214,0,0.5)',
      duration: 1.1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    return { status: 'completed' };
  },

  stop() {
    activeTween?.kill();
    activeTween = null;
  },
};
