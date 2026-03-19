import gsap from 'gsap';
import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';

const PARTICLE_COUNT = 18;
const RAY_COUNT = 8;

function createParticle(container: HTMLElement, i: number): HTMLElement {
  const el = document.createElement('div');
  const isGold = i % 3 === 0;
  const size = 4 + Math.random() * 6;
  Object.assign(el.style, {
    position: 'absolute',
    left: '50%',
    top: '40%',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    background: isGold
      ? 'radial-gradient(circle, #ffd600, #ffab00)'
      : 'radial-gradient(circle, #00c853, #00e676)',
    boxShadow: isGold
      ? '0 0 8px rgba(255,214,0,0.8)'
      : '0 0 8px rgba(0,200,83,0.8)',
    opacity: '0',
    willChange: 'transform, opacity',
  });
  container.appendChild(el);
  return el;
}

function createRay(container: HTMLElement, i: number): HTMLElement {
  const el = document.createElement('div');
  const angle = (360 / RAY_COUNT) * i;
  Object.assign(el.style, {
    position: 'absolute',
    left: '50%',
    top: '40%',
    width: '2px',
    height: '0px',
    transformOrigin: 'top center',
    transform: `rotate(${angle}deg)`,
    background: `linear-gradient(180deg, rgba(255,214,0,0.7), transparent)`,
    opacity: '0',
    willChange: 'height, opacity',
  });
  container.appendChild(el);
  return el;
}

/** Jackpot burst: particles + rays + radial flash + frame peak glow. */
export const jackpot_burst_v1: AnimationModule = {
  id: 'jackpot_burst_v1',
  slot: 'jackpotBurst',
  variant: 'v1',
  duration: 1.2,

  async play(ctx: AnimationContext): Promise<AnimationResult> {
    const frame = ctx.layers['slot-frame'];
    const impactFx = ctx.layers['impact-fx'];

    const tl = gsap.timeline();

    // === Frame peak glow ===
    if (frame) {
      tl.to(frame, {
        boxShadow: '0 0 120px rgba(255,214,0,0.95), 0 0 60px rgba(0,200,83,0.4), inset 0 0 30px rgba(255,214,0,0.2)',
        scale: 1.025,
        duration: 0.18,
        ease: 'power4.out',
      }, 0);
      tl.to(frame, {
        boxShadow: '0 0 50px rgba(255,214,0,0.3), inset 0 0 8px rgba(255,214,0,0.05)',
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      }, 0.3);
    }

    if (!impactFx) {
      return new Promise((resolve) => {
        tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
      });
    }

    const radialFlash = impactFx.querySelector('[data-fx="radial-flash"]') as HTMLElement | null;
    const particleContainer = impactFx.querySelector('[data-fx="particles"]') as HTMLElement | null;
    const rayContainer = impactFx.querySelector('[data-fx="rays"]') as HTMLElement | null;

    // === Radial flash ===
    if (radialFlash) {
      gsap.set(radialFlash, {
        background: 'radial-gradient(circle at 50% 40%, rgba(255,214,0,0.6) 0%, rgba(255,214,0,0.15) 35%, transparent 65%)',
        opacity: 0,
      });
      tl.to(radialFlash, { opacity: 1, duration: 0.1, ease: 'power3.out' }, 0);
      tl.to(radialFlash, { opacity: 0, duration: 0.9, ease: 'power2.out' }, 0.15);
    }

    // === Particles ===
    if (particleContainer) {
      const particles: HTMLElement[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle(particleContainer, i));
      }

      particles.forEach((p, i) => {
        const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.4;
        const radius = 80 + Math.random() * 120;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius - 30; // bias upward
        const dur = 0.5 + Math.random() * 0.4;

        tl.to(p, {
          opacity: 1,
          x: dx * 0.3,
          y: dy * 0.3,
          duration: 0.08,
          ease: 'power2.out',
        }, 0.02 + i * 0.01);

        tl.to(p, {
          x: dx,
          y: dy,
          opacity: 0,
          scale: 0.3,
          duration: dur,
          ease: 'power2.out',
        }, 0.1 + i * 0.01);
      });

      // Cleanup
      tl.call(() => {
        particles.forEach((p) => p.remove());
      });
    }

    // === Rays ===
    if (rayContainer) {
      const rays: HTMLElement[] = [];
      for (let i = 0; i < RAY_COUNT; i++) {
        rays.push(createRay(rayContainer, i));
      }

      rays.forEach((r, i) => {
        const maxH = 60 + Math.random() * 80;
        tl.to(r, {
          height: maxH,
          opacity: 0.7,
          duration: 0.15,
          ease: 'power3.out',
        }, 0.02 + i * 0.015);
        tl.to(r, {
          height: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        }, 0.2 + i * 0.015);
      });

      tl.call(() => {
        rays.forEach((r) => r.remove());
      });
    }

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => resolve({ status: 'completed' }));
    });
  },
};
