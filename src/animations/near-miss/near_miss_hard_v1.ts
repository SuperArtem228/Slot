import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/**
 * Hard near miss: stronger drama, longer hold, more light,
 * ambient props react more visibly, frame holds tension.
 */
export const near_miss_hard_v1: AnimationModule = {
  id: 'near_miss_hard_v1',
  slot: 'nearMiss',
  variant: 'v1',
  duration: 1.2,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const statusCopy = ctx.layers['status-copy'];
    const bg = ctx.layers['background'];
    const ambientBack = ctx.layers['ambient-back'];
    const ambientFront = ctx.layers['ambient-front'];

    const tl = gsap.timeline();

    // Frame: stronger, longer hold
    if (frame) {
      tl.to(frame, {
        boxShadow: '0 0 50px rgba(0,200,83,0.5), inset 0 0 10px rgba(0,200,83,0.08)',
        scale: 1.005,
        duration: 0.25,
        ease: 'power3.out',
      }, 0);
      // Hold for drama
      tl.to(frame, { duration: 0.35 }, 0.25);
      // Release
      tl.to(frame, {
        boxShadow: '0 0 25px rgba(0,200,83,0.2), inset 0 1px 0 rgba(255,255,255,0.06)',
        scale: 1,
        duration: 0.45,
        ease: 'sine.out',
      }, 0.6);
    }

    // Background: halo and center glow pulse
    if (bg) {
      const halo = bg.querySelector('[data-bg="halo"]') as HTMLElement | null;
      const centerGlow = bg.querySelector('[data-bg="center-glow"]') as HTMLElement | null;

      if (halo) {
        tl.to(halo, { opacity: 0.85, scale: 1.06, duration: 0.2, ease: 'power2.out' }, 0);
        tl.to(halo, { opacity: 0.55, scale: 1, duration: 0.6, ease: 'sine.out' }, 0.4);
      }
      if (centerGlow) {
        tl.to(centerGlow, { opacity: 0.95, duration: 0.2, ease: 'power2.out' }, 0);
        tl.to(centerGlow, { opacity: 0.75, duration: 0.5, ease: 'sine.out' }, 0.4);
      }
    }

    // Ambient props: stronger outward react from both layers
    [ambientBack, ambientFront].forEach((layer) => {
      if (!layer) return;
      const props = layer.querySelectorAll<HTMLElement>('[data-prop]');
      props.forEach((el, i) => {
        const dirX = i % 2 === 0 ? -5 : 5;
        const dirY = i % 3 === 0 ? -3 : 3;
        tl.to(el, { x: `+=${dirX}`, y: `+=${dirY}`, duration: 0.18, ease: 'power3.out' }, 0.02);
        tl.to(el, { x: `-=${dirX}`, y: `-=${dirY}`, duration: 0.6, ease: 'sine.out' }, 0.3);
      });
    });

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
