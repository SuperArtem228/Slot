import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Pre-final spin charge: all layers converge energy to center. */
export const final_spin_charge_v1: AnimationModule = {
  id: 'final_spin_charge_v1',
  slot: 'finalCharge',
  variant: 'v1',
  duration: 0.6,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const bg = ctx.layers['background'];

    const tl = gsap.timeline();

    if (frame) {
      tl.to(frame, {
        boxShadow: '0 0 60px rgba(0,200,83,0.55), inset 0 0 15px rgba(0,200,83,0.1)',
        scale: 1.01,
        duration: 0.6,
        ease: 'power2.inOut',
      }, 0);
    }

    if (bg) {
      const halo = bg.querySelector('[data-bg="halo"]') as HTMLElement | null;
      const centerGlow = bg.querySelector('[data-bg="center-glow"]') as HTMLElement | null;

      if (halo) {
        tl.to(halo, { opacity: 0.95, scale: 1.08, duration: 0.5, ease: 'power2.inOut' }, 0);
      }
      if (centerGlow) {
        tl.to(centerGlow, { opacity: 1, scale: 1.1, duration: 0.5, ease: 'sine.inOut' }, 0);
      }
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
