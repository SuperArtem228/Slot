import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Final copy settle: staggered text appearance within reward card. */
export const final_copy_settle_v1: AnimationModule = {
  id: 'final_copy_settle_v1',
  slot: 'finalCopy',
  variant: 'v1',
  duration: 0.6,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const card = ctx.layers['reward-card'];
    if (!card) return { status: 'completed' };

    const children = card.children;
    const tl = gsap.timeline();

    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement;
      gsap.set(el, { opacity: 0, y: 12 });
      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, i * 0.07);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
