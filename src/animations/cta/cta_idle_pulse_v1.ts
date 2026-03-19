import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

let activeTween: gsap.core.Tween | null = null;

export const cta_idle_pulse_v1: AnimationModule = {
  id: 'cta_idle_pulse_v1',
  slot: 'ctaIdle',
  variant: 'v1',

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const cta = ctx.layers['cta'];
    if (!cta) return { status: 'completed' };

    const btn = cta.querySelector('button') as HTMLElement | null;
    if (!btn) return { status: 'completed' };

    activeTween = gsap.to(btn, {
      scale: 1.02,
      boxShadow: '0 4px 28px rgba(0,200,83,0.45)',
      duration: 1.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    return { status: 'completed' };
  },

  stop() {
    activeTween?.kill();
    activeTween = null;
  },

  dispose() {
    this.stop?.();
  },
};
