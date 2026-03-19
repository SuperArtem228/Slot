import type { AnimationModule } from '../core/animationTypes';
import { completed } from '../core/animationHelpers';

export const cta_idle_pulse_v1: AnimationModule = {
  id: 'cta_idle_pulse_v1',
  slot: 'ctaIdle',
  variant: 'v1',
  async play() {
    return completed();
  },
};
