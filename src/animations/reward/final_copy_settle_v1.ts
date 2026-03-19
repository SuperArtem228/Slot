import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

/** Final copy settle: staggered text with gold emphasis on value. */
export const final_copy_settle_v1: AnimationModule = {
  id: 'final_copy_settle_v1',
  slot: 'finalCopy',
  variant: 'v1',
  duration: 0.65,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const card = ctx.layers['reward-card'];
    if (!card) return { status: 'completed' };

    const children = card.children;
    const tl = gsap.timeline();

    for (let i = 0; i < children.length; i++) {
      const el = children[i] as HTMLElement;
      gsap.set(el, { opacity: 0, y: 14 });

      const isHeroValue = i === 1; // Second child is the big value
      const delay = i * 0.09;

      tl.to(el, {
        opacity: 1,
        y: 0,
        duration: isHeroValue ? 0.4 : 0.3,
        ease: isHeroValue ? 'back.out(1.2)' : 'power2.out',
      }, delay);

      // Hero value gets a brief glow pulse
      if (isHeroValue) {
        tl.to(el, {
          textShadow: '0 0 20px rgba(255,214,0,0.6)',
          duration: 0.2,
          ease: 'power2.out',
        }, delay + 0.15);
        tl.to(el, {
          textShadow: '0 0 8px rgba(255,214,0,0.2)',
          duration: 0.35,
          ease: 'sine.out',
        }, delay + 0.35);
      }
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
