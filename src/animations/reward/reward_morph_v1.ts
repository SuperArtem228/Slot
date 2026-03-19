import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const reward_morph_v1: AnimationModule = {
  id: 'reward_morph_v1',
  slot: 'rewardMorph',
  variant: 'v1',
  duration: 0.9,
  async play() {
    await delay(900);
    return completed();
  },
};
