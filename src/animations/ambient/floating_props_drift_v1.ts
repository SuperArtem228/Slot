import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

let activeTweens: gsap.core.Tween[] = [];

/**
 * Floating props drift: each branded prop floats on its own
 * trajectory with unique speed, amplitude, and phase offset.
 * Creates organic, non-synchronous ambient motion.
 */
export const floating_props_drift_v1: AnimationModule = {
  id: 'floating_props_drift_v1',
  slot: 'ambient',
  variant: 'v1',

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const { layers } = ctx;

    // Gather all prop elements from both ambient layers
    const propEls: HTMLElement[] = [];
    ['ambient-back', 'ambient-front'].forEach((layerName) => {
      const layer = layers[layerName];
      if (layer) {
        layer.querySelectorAll<HTMLElement>('[data-prop]').forEach((el) => {
          propEls.push(el);
        });
      }
    });

    propEls.forEach((el, i) => {
      const seed = i * 1.3 + 0.5;
      const ampY = 6 + (i % 3) * 4;     // 6-14 px
      const ampX = 3 + (i % 4) * 2.5;   // 3-10 px
      const rotAmp = 1.5 + (i % 3) * 1; // 1.5-3.5 deg
      const dur = 3.5 + seed * 0.7;     // 3.5-6.5 sec

      // Y float
      activeTweens.push(
        gsap.to(el, {
          y: `+=${ampY}`,
          duration: dur,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: seed * 0.3,
        }),
      );

      // X drift (slower)
      activeTweens.push(
        gsap.to(el, {
          x: `+=${ampX}`,
          duration: dur * 1.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: seed * 0.5,
        }),
      );

      // Rotation drift
      activeTweens.push(
        gsap.to(el, {
          rotation: `+=${rotAmp}`,
          duration: dur * 1.1,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: seed * 0.2,
        }),
      );
    });

    return { status: 'completed' };
  },

  stop() {
    activeTweens.forEach((t) => t.kill());
    activeTweens = [];
  },

  dispose() {
    this.stop?.();
  },
};
