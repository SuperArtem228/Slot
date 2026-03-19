import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/**
 * Soft near miss: gentle frame emphasis, subtle ambient prop react,
 * controlled light, status copy fade.
 */
export const near_miss_soft_v1: AnimationModule = {
  id: 'near_miss_soft_v1',
  slot: 'nearMiss',
  variant: 'v1',
  duration: 0.95,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const statusCopy = ctx.layers['status-copy'];
    const bg = ctx.layers['background'];
    const ambientBack = ctx.layers['ambient-back'];

    const tl = gsap.timeline();

    // Frame soft reaction
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

    // Background halo subtle pulse
    if (bg) {
      const halo = bg.querySelector('[data-bg="halo"]') as HTMLElement | null;
      if (halo) {
        tl.to(halo, { opacity: 0.65, duration: 0.25, ease: 'power2.out' }, 0);
        tl.to(halo, { opacity: 0.5, duration: 0.5, ease: 'sine.out' }, 0.35);
      }
    }

    // Ambient props: slight outward nudge
    if (ambientBack) {
      const props = ambientBack.querySelectorAll<HTMLElement>('[data-prop]');
      props.forEach((el, i) => {
        const dir = i % 2 === 0 ? -3 : 3;
        tl.to(el, { x: `+=${dir}`, duration: 0.2, ease: 'power2.out' }, 0.05);
        tl.to(el, { x: `-=${dir}`, duration: 0.4, ease: 'sine.out' }, 0.3);
      });
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
