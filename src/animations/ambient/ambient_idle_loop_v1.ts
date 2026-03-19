import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

let activeTweens: gsap.core.Tween[] = [];

/**
 * Ambient idle loop: gentle breathing glow on background layers,
 * micro-movement on the slot frame, soft halo pulse.
 * Runs as infinite loop until stopped.
 */
export const ambient_idle_loop_v1: AnimationModule = {
  id: 'ambient_idle_loop_v1',
  slot: 'ambient',
  variant: 'v1',

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const { layers } = ctx;

    // Background center glow breathing
    const centerGlow = layers['background']?.querySelector('[data-bg="center-glow"]') as HTMLElement | null;
    if (centerGlow) {
      activeTweens.push(
        gsap.to(centerGlow, {
          opacity: 0.7,
          duration: 3.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }),
      );
    }

    // Halo breathing
    const halo = layers['background']?.querySelector('[data-bg="halo"]') as HTMLElement | null;
    if (halo) {
      activeTweens.push(
        gsap.to(halo, {
          opacity: 0.7,
          scale: 1.05,
          duration: 5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }),
      );
    }

    // Frame micro-breathing
    const frame = layers['slot-frame'];
    if (frame) {
      activeTweens.push(
        gsap.to(frame, {
          boxShadow: '0 0 35px rgba(0,200,83,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }),
      );
    }

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
