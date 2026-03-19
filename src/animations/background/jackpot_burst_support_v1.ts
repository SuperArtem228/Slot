import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const jackpot_burst_support_v1: AnimationModule = {
  id: 'jackpot_burst_support_v1',
  slot: 'jackpotBurst',
  variant: 'support_v1',
  duration: 1.05,
  async play() {
    await delay(1050);
    return completed();
  },
};
