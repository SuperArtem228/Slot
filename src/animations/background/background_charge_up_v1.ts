import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const background_charge_up_v1: AnimationModule = {
  id: 'background_charge_up_v1',
  slot: 'backgroundCharge',
  variant: 'v1',
  duration: 0.8,
  async play() {
    await delay(800);
    return completed();
  },
};
