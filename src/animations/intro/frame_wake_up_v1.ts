import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

export const frame_wake_up_v1: AnimationModule = {
  id: 'frame_wake_up_v1',
  slot: 'intro',
  variant: 'v1',
  duration: 0.6,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    if (!frame) return { status: 'completed' };

    const tl = gsap.timeline();

    // Inner glow awakens
    tl.fromTo(
      frame,
      { boxShadow: '0 0 0px rgba(0,200,83,0), inset 0 1px 0 rgba(255,255,255,0.06)' },
      {
        boxShadow: '0 0 30px rgba(0,200,83,0.15), inset 0 1px 0 rgba(255,255,255,0.06)',
        duration: 0.6,
        ease: 'power2.out',
      },
      0,
    );

    // Glass overlay shimmer hint
    const glass = frame.querySelector('[style*="linear-gradient(180deg"]') as HTMLElement | null;
    if (glass) {
      tl.fromTo(
        glass,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'sine.out' },
        0.1,
      );
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
