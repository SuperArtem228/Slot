import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Precise lock impact: frame slam, bg flash, micro screen-shake. */
export const final_lock_impact_v1: AnimationModule = {
  id: 'final_lock_impact_v1',
  slot: 'finalLock',
  variant: 'v1',
  duration: 0.45,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const bg = ctx.layers['background'];
    const root = ctx.sceneRoot;

    const tl = gsap.timeline();

    // Frame: slam in with gold glow
    if (frame) {
      tl.to(frame, {
        scale: 1.02,
        boxShadow: '0 0 90px rgba(255,214,0,0.8), inset 0 0 20px rgba(255,214,0,0.15)',
        duration: 0.1,
        ease: 'power4.out',
      }, 0);
      tl.to(frame, {
        scale: 0.995,
        duration: 0.08,
        ease: 'power2.in',
      }, 0.1);
      tl.to(frame, {
        scale: 1,
        boxShadow: '0 0 55px rgba(255,214,0,0.5), inset 0 0 10px rgba(255,214,0,0.06)',
        duration: 0.25,
        ease: 'power2.out',
      }, 0.18);
    }

    // Background: layered flash
    if (bg) {
      const halo = bg.querySelector('[data-bg="halo"]') as HTMLElement | null;
      const centerGlow = bg.querySelector('[data-bg="center-glow"]') as HTMLElement | null;

      if (halo) {
        tl.to(halo, { opacity: 1, scale: 1.1, duration: 0.08, ease: 'power3.out' }, 0);
        tl.to(halo, { opacity: 0.8, scale: 1.04, duration: 0.3, ease: 'sine.out' }, 0.1);
      }
      if (centerGlow) {
        tl.to(centerGlow, { opacity: 1, scale: 1.12, duration: 0.08, ease: 'power3.out' }, 0);
        tl.to(centerGlow, { opacity: 0.85, scale: 1.05, duration: 0.3, ease: 'sine.out' }, 0.1);
      }
    }

    // Screen micro-shake (root element)
    if (root) {
      tl.to(root, { x: -2, duration: 0.03 }, 0.02);
      tl.to(root, { x: 3, duration: 0.03 }, 0.05);
      tl.to(root, { x: -1, duration: 0.03 }, 0.08);
      tl.to(root, { x: 0, duration: 0.05, ease: 'sine.out' }, 0.11);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
