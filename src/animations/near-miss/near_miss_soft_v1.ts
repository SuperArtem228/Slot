import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Soft near miss: gentle emphasis, short hold, subtle disappointment. */
export const near_miss_soft_v1: AnimationModule = {
  id: 'near_miss_soft_v1',
  slot: 'nearMiss',
  variant: 'v1',
  duration: 0.95,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const statusCopy = ctx.layers['status-copy'];

    const tl = gsap.timeline();

    // Frame gives a soft reaction
    if (frame) {
      tl.to(frame, {
        boxShadow: '0 0 35px rgba(0,200,83,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        duration: 0.3,
        ease: 'power2.out',
      }, 0);
      tl.to(frame, {
        boxShadow: '0 0 20px rgba(0,200,83,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
        duration: 0.5,
        ease: 'sine.out',
      }, 0.4);
    }

    // Status copy fades in
    if (statusCopy) {
      gsap.set(statusCopy, { opacity: 0, y: 10 });
      tl.to(statusCopy, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.3);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
