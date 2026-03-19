import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Attempt 2 ignition — heavier energy */
export const spin_start_ignite_v2: AnimationModule = {
  id: 'spin_start_ignite_v2',
  slot: 'spinStart',
  variant: 'v2',
  duration: 0.4,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];

    const tl = gsap.timeline();

    if (frame) {
      tl.to(frame, {
        boxShadow: '0 0 55px rgba(0,200,83,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
        scale: 1.008,
        duration: 0.3,
        ease: 'power3.out',
      });
      tl.to(frame, {
        boxShadow: '0 0 35px rgba(0,200,83,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        scale: 1,
        duration: 0.15,
        ease: 'sine.out',
      });
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
