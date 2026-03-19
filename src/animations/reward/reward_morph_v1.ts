import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Reward morph: slot frame fades back, center energy collects into reward form. */
export const reward_morph_v1: AnimationModule = {
  id: 'reward_morph_v1',
  slot: 'rewardMorph',
  variant: 'v1',
  duration: 0.9,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const morphLayer = ctx.layers['reward-morph'];
    const hud = ctx.layers['hud'];

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
