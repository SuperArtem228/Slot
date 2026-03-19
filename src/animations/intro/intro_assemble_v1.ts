import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

export const intro_assemble_v1: AnimationModule = {
  id: 'intro_assemble_v1',
  slot: 'intro',
  variant: 'v1',
  duration: 0.9,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const { layers } = ctx;
    const bg = layers['background'];
    const frame = layers['slot-frame'];
    const hud = layers['hud'];
    const cta = layers['cta'];

    const tl = gsap.timeline();

    // Background fades in
    if (bg) {
      gsap.set(bg, { opacity: 0 });
      tl.to(bg, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0);
    }

    // Frame rises from below
    if (frame) {
      gsap.set(frame, { opacity: 0, y: 40 });
      tl.to(frame, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.15);
    }

    // HUD fades in with slight rise
    if (hud) {
      gsap.set(hud, { opacity: 0, y: -15 });
      tl.to(hud, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.3);
    }

    // CTA enters last
    if (cta) {
      gsap.set(cta, { opacity: 0, y: 20 });
      tl.to(cta, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, 0.45);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },

  stop() {
    gsap.killTweensOf('[data-layer]');
  },
};
