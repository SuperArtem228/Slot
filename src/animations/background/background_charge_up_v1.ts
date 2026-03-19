import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/**
 * Background charge up: intensifies layered background per attempt.
 * Payload: { attemptLevel: 1 | 2 | 3 }
 * Each level controls halo opacity, center glow intensity, warm accent visibility.
 */
export const background_charge_up_v1: AnimationModule = {
  id: 'background_charge_up_v1',
  slot: 'backgroundCharge',
  variant: 'v1',
  duration: 0.8,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const bg = ctx.layers['background'];
    if (!bg) return { status: 'completed' };

    const level = (ctx.payload?.attemptLevel as number) ?? 1;

    const centerGlow = bg.querySelector('[data-bg="center-glow"]') as HTMLElement | null;
    const halo = bg.querySelector('[data-bg="halo"]') as HTMLElement | null;
    const warmAccent = bg.querySelector('[data-bg="warm-accent"]') as HTMLElement | null;

    const tl = gsap.timeline();

    // Center glow intensification
    if (centerGlow) {
      const glowOpacity = level === 1 ? 0.85 : level === 2 ? 1 : 1;
      const glowScale = level === 1 ? 1 : level === 2 ? 1.05 : 1.1;
      tl.to(centerGlow, {
        opacity: glowOpacity,
        scale: glowScale,
        duration: 0.5,
        ease: 'sine.inOut',
      }, 0);
      // Settle back slightly
      tl.to(centerGlow, {
        opacity: glowOpacity * 0.9,
        scale: 1 + (glowScale - 1) * 0.7,
        duration: 0.4,
        ease: 'sine.out',
      });
    }

    // Halo behind slot gets stronger
    if (halo) {
      const haloOpacity = level === 1 ? 0.55 : level === 2 ? 0.75 : 0.95;
      tl.to(halo, {
        opacity: haloOpacity,
        scale: 1 + level * 0.02,
        duration: 0.6,
        ease: 'power2.out',
      }, 0);
    }

    // Warm accent appears on attempt 2+
    if (warmAccent && level >= 2) {
      const warmOpacity = level === 2 ? 0.4 : 0.7;
      tl.to(warmAccent, {
        opacity: warmOpacity,
        duration: 0.5,
        ease: 'sine.out',
      }, 0.1);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
