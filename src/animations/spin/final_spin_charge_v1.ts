import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const final_spin_charge_v1: AnimationModule = {
  id: 'final_spin_charge_v1',
  slot: 'finalCharge',
  variant: 'v1',
  duration: 0.6,
  async play() {
    await delay(600);
    return completed();
  },
};
