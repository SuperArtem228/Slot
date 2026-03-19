import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Precise, tight lock impact when reels hit target. */
export const final_lock_impact_v1: AnimationModule = {
  id: 'final_lock_impact_v1',
  slot: 'finalLock',
  variant: 'v1',
  duration: 0.38,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const bg = ctx.layers['background'];

    const tl = gsap.timeline();

    // Frame micro-impact
    if (frame) {
      tl.to(frame, {
        scale: 1.015,
        boxShadow: '0 0 80px rgba(255,214,0,0.7), inset 0 0 20px rgba(255,214,0,0.15)',
        duration: 0.12,
        ease: 'power4.out',
      }, 0);
      tl.to(frame, {
        scale: 1,
        boxShadow: '0 0 50px rgba(255,214,0,0.4), inset 0 0 8px rgba(255,214,0,0.05)',
        duration: 0.26,
        ease: 'power2.out',
      });
    }

    // BG flash
    if (bg) {
      tl.to(bg, { filter: 'brightness(1.25)', duration: 0.08, ease: 'power2.out' }, 0);
      tl.to(bg, { filter: 'brightness(1)', duration: 0.3, ease: 'sine.out' }, 0.08);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
