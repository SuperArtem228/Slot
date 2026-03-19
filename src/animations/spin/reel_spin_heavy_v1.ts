import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const reel_spin_heavy_v1: AnimationModule = {
  id: 'reel_spin_heavy_v1',
  slot: 'spinCore',
  variant: 'v1',
  duration: 1.9,
  async play() {
    await delay(1900);
    return completed();
  },
};
