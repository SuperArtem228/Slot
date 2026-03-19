import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

let activeTween: gsap.core.Timeline | null = null;

/** Final CTA emphasis: entry with bounce, then gentle attention pulse. */
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

    // Entry: slide up + scale bounce
    gsap.set(btn, { scale: 0.85, opacity: 0, y: 20 });
    tl.to(btn, {
      scale: 1.05,
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'back.out(1.6)',
    });
    tl.to(btn, { scale: 1, duration: 0.2, ease: 'power2.out' });

    // Settle pause
    tl.to(btn, { duration: 0.3 });

    // Infinite attention pulse — gentle scale + glow
    tl.to(btn, {
      scale: 1.03,
      boxShadow: '0 4px 36px rgba(255,214,0,0.55), 0 0 60px rgba(255,214,0,0.15)',
      duration: 1.2,
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

  dispose() {
    this.stop?.();
  },
};
