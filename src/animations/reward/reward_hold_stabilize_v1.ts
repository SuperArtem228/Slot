import type { AnimationModule } from '../core/animationTypes';
import { completed } from '../core/animationHelpers';

export const reward_hold_stabilize_v1: AnimationModule = {
  id: 'reward_hold_stabilize_v1',
  slot: 'rewardHold',
  variant: 'v1',
  async play() {
    // Hold: runs until user action. No auto-complete.
    return completed();
  },
};
