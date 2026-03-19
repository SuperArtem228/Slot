import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Hard near miss: stronger drama, longer hold, more light. */
export const near_miss_hard_v1: AnimationModule = {
  id: 'near_miss_hard_v1',
  slot: 'nearMiss',
  variant: 'v1',
  duration: 1.2,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const statusCopy = ctx.layers['status-copy'];
    const bg = ctx.layers['background'];

    const tl = gsap.timeline();

    // Frame: stronger, longer hold
    if (frame) {
      tl.to(frame, {
        boxShadow: '0 0 50px rgba(0,200,83,0.5), inset 0 0 10px rgba(0,200,83,0.08)',
        scale: 1.005,
        duration: 0.25,
        ease: 'power3.out',
      }, 0);
      // Hold
      tl.to(frame, {
        scale: 1.005,
        duration: 0.4,
      }, 0.25);
      // Release
      tl.to(frame, {
        boxShadow: '0 0 25px rgba(0,200,83,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
        scale: 1,
        duration: 0.45,
        ease: 'sine.out',
      }, 0.65);
    }

    // Background slight pulse
    if (bg) {
      tl.to(bg, { filter: 'brightness(1.08)', duration: 0.2, ease: 'power2.out' }, 0);
      tl.to(bg, { filter: 'brightness(1)', duration: 0.5, ease: 'sine.out' }, 0.35);
    }

    // Status copy
    if (statusCopy) {
      gsap.set(statusCopy, { opacity: 0, y: 10 });
      tl.to(statusCopy, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.5);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
