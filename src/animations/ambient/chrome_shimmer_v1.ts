import type { AnimationModule } from '../core/animationTypes';
import { completed } from '../core/animationHelpers';

export const chrome_shimmer_v1: AnimationModule = {
  id: 'chrome_shimmer_v1',
  slot: 'ambient',
  variant: 'v1',
  async play() {
    return completed();
  },
};
