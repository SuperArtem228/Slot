import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const final_lock_impact_v1: AnimationModule = {
  id: 'final_lock_impact_v1',
  slot: 'finalLock',
  variant: 'v1',
  duration: 0.38,
  async play() {
    await delay(380);
    return completed();
  },
};
