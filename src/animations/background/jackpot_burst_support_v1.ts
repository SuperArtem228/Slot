import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/**
 * Jackpot burst background support: peak brightness on all bg layers,
 * then controlled decay to readable reward state.
 */
export const jackpot_burst_support_v1: AnimationModule = {
  id: 'jackpot_burst_support_v1',
  slot: 'jackpotBurst',
  variant: 'support_v1',
  duration: 1.05,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const bg = ctx.layers['background'];
    if (!bg) return { status: 'completed' };

    const centerGlow = bg.querySelector('[data-bg="center-glow"]') as HTMLElement | null;
    const halo = bg.querySelector('[data-bg="halo"]') as HTMLElement | null;
    const warmAccent = bg.querySelector('[data-bg="warm-accent"]') as HTMLElement | null;

    const tl = gsap.timeline();

    // Center glow peak
    if (centerGlow) {
      tl.to(centerGlow, { opacity: 1, scale: 1.2, duration: 0.15, ease: 'power3.out' }, 0);
      tl.to(centerGlow, { opacity: 0.6, scale: 1, duration: 0.8, ease: 'power2.out' }, 0.2);
    }

    // Halo peak
    if (halo) {
      tl.to(halo, { opacity: 1, scale: 1.15, duration: 0.15, ease: 'power3.out' }, 0);
      tl.to(halo, { opacity: 0.4, scale: 1, duration: 0.8, ease: 'power2.out' }, 0.2);
    }

    // Warm accent flash
    if (warmAccent) {
      tl.to(warmAccent, { opacity: 0.9, duration: 0.12, ease: 'power2.out' }, 0);
      tl.to(warmAccent, { opacity: 0.15, duration: 0.8, ease: 'power2.out' }, 0.2);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
