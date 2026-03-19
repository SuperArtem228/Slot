import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const near_miss_soft_v1: AnimationModule = {
  id: 'near_miss_soft_v1',
  slot: 'nearMiss',
  variant: 'v1',
  duration: 0.95,
  async play() {
    await delay(950);
    return completed();
  },
};
