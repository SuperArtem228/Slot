import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Attempt 3 ignition — maximum energy, all layers converge */
export const spin_start_ignite_final_v3: AnimationModule = {
  id: 'spin_start_ignite_final_v3',
  slot: 'spinStart',
  variant: 'v3',
  duration: 0.45,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const bg = ctx.layers['background'];
    const ambientBack = ctx.layers['ambient-back'];
    const ambientFront = ctx.layers['ambient-front'];

    const tl = gsap.timeline();

    // Frame: strongest activation
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

    // Background: all layers intensify
    if (bg) {
      const halo = bg.querySelector('[data-bg="halo"]') as HTMLElement | null;
      const centerGlow = bg.querySelector('[data-bg="center-glow"]') as HTMLElement | null;
      const warmAccent = bg.querySelector('[data-bg="warm-accent"]') as HTMLElement | null;

      if (halo) {
        tl.to(halo, { opacity: 0.9, scale: 1.06, duration: 0.3, ease: 'power3.out' }, 0);
      }
      if (centerGlow) {
        tl.to(centerGlow, { opacity: 1, scale: 1.08, duration: 0.25, ease: 'power2.out' }, 0);
      }
      if (warmAccent) {
        tl.to(warmAccent, { opacity: 0.6, duration: 0.3, ease: 'sine.out' }, 0);
      }
    }

    // Ambient props: converge slightly toward center
    [ambientBack, ambientFront].forEach((layer) => {
      if (!layer) return;
      layer.querySelectorAll<HTMLElement>('[data-prop]').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const parentRect = (el.parentElement?.getBoundingClientRect()) ?? rect;
        const centerX = parentRect.width / 2;
        const propCenterX = rect.left - parentRect.left + rect.width / 2;
        const moveX = (centerX - propCenterX) * 0.03; // 3% toward center

        tl.to(el, { x: `+=${moveX}`, duration: 0.35, ease: 'power2.out' }, 0);
      });
    });

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
