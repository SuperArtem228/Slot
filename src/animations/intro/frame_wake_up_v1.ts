import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const frame_wake_up_v1: AnimationModule = {
  id: 'frame_wake_up_v1',
  slot: 'intro',
  variant: 'v1',
  duration: 0.6,
  async play() {
    await delay(600);
    return completed();
  },
};
