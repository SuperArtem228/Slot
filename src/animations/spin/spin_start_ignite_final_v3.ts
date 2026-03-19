import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const spin_start_ignite_final_v3: AnimationModule = {
  id: 'spin_start_ignite_final_v3',
  slot: 'spinStart',
  variant: 'v3',
  duration: 0.45,
  async play() {
    await delay(450);
    return completed();
  },
};
