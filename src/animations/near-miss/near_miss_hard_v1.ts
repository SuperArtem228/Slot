import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const near_miss_hard_v1: AnimationModule = {
  id: 'near_miss_hard_v1',
  slot: 'nearMiss',
  variant: 'v1',
  duration: 1.2,
  async play() {
    await delay(1200);
    return completed();
  },
};
