import type { AnimationModule } from '../core/animationTypes';
import { completed } from '../core/animationHelpers';

export const floating_props_drift_v1: AnimationModule = {
  id: 'floating_props_drift_v1',
  slot: 'ambient',
  variant: 'v1',
  async play() {
    return completed();
  },
};
