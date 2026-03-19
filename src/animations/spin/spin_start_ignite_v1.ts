import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Attempt 1 ignition — medium energy, subtle halo activation */
export const spin_start_ignite_v1: AnimationModule = {
  id: 'spin_start_ignite_v1',
  slot: 'spinStart',
  variant: 'v1',
  duration: 0.35,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const bg = ctx.layers['background'];

    const tl = gsap.timeline();

    if (frame) {
      tl.to(frame, {
        boxShadow: '0 0 40px rgba(0,200,83,0.35), inset 0 1px 0 rgba(255,255,255,0.08)',
        duration: 0.25,
        ease: 'power3.out',
      });
      tl.to(frame, {
        boxShadow: '0 0 25px rgba(0,200,83,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
        duration: 0.15,
        ease: 'sine.out',
      });
    }

    // Halo subtle activation
    if (bg) {
      const halo = bg.querySelector('[data-bg="halo"]') as HTMLElement | null;
      if (halo) {
        tl.to(halo, { opacity: 0.6, duration: 0.25, ease: 'power2.out' }, 0);
      }
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
