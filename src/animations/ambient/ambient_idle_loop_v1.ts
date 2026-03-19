import type { AnimationModule } from '../core/animationTypes';
import { completed } from '../core/animationHelpers';

export const ambient_idle_loop_v1: AnimationModule = {
  id: 'ambient_idle_loop_v1',
  slot: 'ambient',
  variant: 'v1',
  async play() {
    // Stub: continuous loop will be GSAP-driven in iteration 3
    return completed();
  },
};
