import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const near_miss_copy_reveal_v1: AnimationModule = {
  id: 'near_miss_copy_reveal_v1',
  slot: 'nearMissCopy',
  variant: 'v1',
  duration: 0.8,
  async play() {
    await delay(800);
    return completed();
  },
};
