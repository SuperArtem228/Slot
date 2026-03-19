import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

export const near_miss_copy_reveal_v1: AnimationModule = {
  id: 'near_miss_copy_reveal_v1',
  slot: 'nearMissCopy',
  variant: 'v1',
  duration: 0.8,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const layer = ctx.layers['status-copy'];
    if (!layer) return { status: 'completed' };

    const children = layer.children;

    const tl = gsap.timeline();

    // Stagger text elements
    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement;
      gsap.set(el, { opacity: 0, y: 8 });
      tl.to(el, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, i * 0.08);
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
