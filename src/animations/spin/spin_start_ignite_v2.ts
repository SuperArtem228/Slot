import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const spin_start_ignite_v2: AnimationModule = {
  id: 'spin_start_ignite_v2',
  slot: 'spinStart',
  variant: 'v2',
  duration: 0.4,
  async play() {
    await delay(400);
    return completed();
  },
};
