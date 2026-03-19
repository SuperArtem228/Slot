import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const final_reel_spin_v1: AnimationModule = {
  id: 'final_reel_spin_v1',
  slot: 'spinCore',
  variant: 'v1',
  duration: 2.1,
  async play() {
    await delay(2100);
    return completed();
  },
};
