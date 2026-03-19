import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/**
 * Reward morph: slot frame fades back, center energy collects,
 * background settles to calm premium state, HUD exits.
 */
export const reward_morph_v1: AnimationModule = {
  id: 'reward_morph_v1',
  slot: 'rewardMorph',
  variant: 'v1',
  duration: 0.9,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const morphLayer = ctx.layers['reward-morph'];
    const hud = ctx.layers['hud'];
    const bg = ctx.layers['background'];
    const ambientBack = ctx.layers['ambient-back'];
    const ambientFront = ctx.layers['ambient-front'];

    const tl = gsap.timeline();

    // Slot frame retreats
    if (frame) {
      tl.to(frame, {
        opacity: 0,
        scale: 0.95,
        filter: 'blur(4px)',
        duration: 0.6,
        ease: 'power2.inOut',
      }, 0);
    }

    // HUD fades out
    if (hud) {
      tl.to(hud, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: 'power2.in',
      }, 0);
    }

    // Ambient props fade
    [ambientBack, ambientFront].forEach((layer) => {
      if (layer) {
        tl.to(layer, { opacity: 0, duration: 0.5, ease: 'sine.out' }, 0.1);
      }
    });

    // Background settles to calm state
    if (bg) {
      const halo = bg.querySelector('[data-bg="halo"]') as HTMLElement | null;
      const centerGlow = bg.querySelector('[data-bg="center-glow"]') as HTMLElement | null;
      const warmAccent = bg.querySelector('[data-bg="warm-accent"]') as HTMLElement | null;

      if (halo) {
        tl.to(halo, { opacity: 0.35, scale: 1, duration: 0.7, ease: 'sine.out' }, 0.1);
      }
      if (centerGlow) {
        tl.to(centerGlow, { opacity: 0.5, scale: 1, duration: 0.7, ease: 'sine.out' }, 0.1);
      }
      if (warmAccent) {
        tl.to(warmAccent, { opacity: 0.1, duration: 0.5, ease: 'sine.out' }, 0.1);
      }
    }

    // Morph layer: center glow blooms
    if (morphLayer) {
      const glowDiv = morphLayer.querySelector('div') as HTMLElement | null;
      if (glowDiv) {
        gsap.set(glowDiv, { scale: 0.3, opacity: 0 });
        tl.to(glowDiv, { scale: 1.5, opacity: 0.8, duration: 0.5, ease: 'power2.out' }, 0.1);
        tl.to(glowDiv, { scale: 2, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0.5);
      }
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
