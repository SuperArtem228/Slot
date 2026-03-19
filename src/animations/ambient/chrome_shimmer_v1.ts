import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

let activeTimeline: gsap.core.Timeline | null = null;

/**
 * Chrome shimmer: a narrow light sweep across the slot frame
 * glass overlay. Triggers periodically with long pauses.
 */
export const chrome_shimmer_v1: AnimationModule = {
  id: 'chrome_shimmer_v1',
  slot: 'ambient',
  variant: 'v1',

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    if (!frame) return { status: 'completed' };

    // Create a shimmer pseudo-element via a child div
    let shimmer = frame.querySelector('[data-shimmer]') as HTMLElement | null;
    if (!shimmer) {
      shimmer = document.createElement('div');
      shimmer.setAttribute('data-shimmer', '');
      Object.assign(shimmer.style, {
        position: 'absolute',
        top: '0',
        left: '-30%',
        width: '20%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        zIndex: '46',
        pointerEvents: 'none',
        transform: 'skewX(-15deg)',
      });
      frame.appendChild(shimmer);
    }

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    activeTimeline = tl;

    tl.fromTo(
      shimmer,
      { left: '-30%', opacity: 0 },
      { left: '130%', opacity: 1, duration: 1.2, ease: 'sine.inOut' },
    );
    tl.set(shimmer, { opacity: 0 });

    return { status: 'completed' };
  },

  stop() {
    activeTimeline?.kill();
    activeTimeline = null;
  },

  dispose() {
    this.stop?.();
    // Clean up shimmer element
    document.querySelectorAll('[data-shimmer]').forEach((el) => el.remove());
  },
};
