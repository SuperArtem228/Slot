import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const reward_card_settle_v1: AnimationModule = {
  id: 'reward_card_settle_v1',
  slot: 'rewardSettle',
  variant: 'v1',
  duration: 0.7,
  async play() {
    await delay(700);
    return completed();
  },
};
