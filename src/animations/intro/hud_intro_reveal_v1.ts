import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

export const hud_intro_reveal_v1: AnimationModule = {
  id: 'hud_intro_reveal_v1',
  slot: 'hud',
  variant: 'v1',
  duration: 0.45,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const hud = ctx.layers['hud'];
    if (!hud) return { status: 'completed' };

    const headline = hud.querySelector('h2') as HTMLElement | null;
    const subtitle = hud.querySelector('p') as HTMLElement | null;
    const dots = hud.querySelectorAll<HTMLElement>('div > div > div');

    const tl = gsap.timeline();

    if (headline) {
      gsap.set(headline, { opacity: 0, y: 8 });
      tl.to(headline, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0);
    }

    if (subtitle) {
      gsap.set(subtitle, { opacity: 0, y: 6 });
      tl.to(subtitle, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.1);
    }

    // Dots light up sequentially
    dots.forEach((dot, i) => {
      gsap.set(dot, { scale: 0 });
      tl.to(dot, { scale: 1, duration: 0.2, ease: 'back.out(2)' }, 0.15 + i * 0.06);
    });

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
