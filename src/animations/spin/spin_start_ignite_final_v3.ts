import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Attempt 3 ignition — maximum energy, final round feeling */
export const spin_start_ignite_final_v3: AnimationModule = {
  id: 'spin_start_ignite_final_v3',
  slot: 'spinStart',
  variant: 'v3',
  duration: 0.45,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const bg = ctx.layers['background'];

    const tl = gsap.timeline();

    if (frame) {
      tl.to(frame, {
        boxShadow: '0 0 70px rgba(0,200,83,0.65), inset 0 1px 0 rgba(255,255,255,0.14)',
        scale: 1.012,
        duration: 0.3,
        ease: 'power3.out',
      });
      tl.to(frame, {
        boxShadow: '0 0 45px rgba(0,200,83,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        scale: 1,
        duration: 0.2,
        ease: 'sine.out',
      });
    }

    // Background flash
    if (bg) {
      tl.to(bg, { filter: 'brightness(1.15)', duration: 0.2, ease: 'power2.out' }, 0);
      tl.to(bg, { filter: 'brightness(1)', duration: 0.3, ease: 'sine.out' }, 0.2);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
