import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Jackpot burst: peak energy moment. Short, powerful, then decay. */
export const jackpot_burst_v1: AnimationModule = {
  id: 'jackpot_burst_v1',
  slot: 'jackpotBurst',
  variant: 'v1',
  duration: 1.05,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const bg = ctx.layers['background'];
    const impactFx = ctx.layers['impact-fx'];

    const tl = gsap.timeline();

    // Background peak brightness
    if (bg) {
      tl.to(bg, { filter: 'brightness(1.4)', duration: 0.15, ease: 'power2.out' }, 0);
      tl.to(bg, { filter: 'brightness(1.1)', duration: 0.6, ease: 'power2.inOut' }, 0.3);
      tl.to(bg, { filter: 'brightness(1)', duration: 0.4, ease: 'sine.out' }, 0.7);
    }

    // Frame burst glow
    if (frame) {
      tl.to(frame, {
        boxShadow: '0 0 100px rgba(255,214,0,0.9), inset 0 0 25px rgba(255,214,0,0.2)',
        scale: 1.02,
        duration: 0.18,
        ease: 'power4.out',
      }, 0);
      tl.to(frame, {
        boxShadow: '0 0 50px rgba(255,214,0,0.4), inset 0 0 10px rgba(255,214,0,0.05)',
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
      }, 0.25);
    }

    // Impact FX: radial flash
    if (impactFx) {
      gsap.set(impactFx, {
        background: 'radial-gradient(circle at 50% 40%, rgba(255,214,0,0.5) 0%, transparent 70%)',
        opacity: 0,
      });
      tl.to(impactFx, { opacity: 1, duration: 0.12, ease: 'power2.out' }, 0);
      tl.to(impactFx, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 0.2);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
