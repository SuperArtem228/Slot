import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const spin_start_ignite_v1: AnimationModule = {
  id: 'spin_start_ignite_v1',
  slot: 'spinStart',
  variant: 'v1',
  duration: 0.35,
  async play() {
    await delay(350);
    return completed();
  },
};
