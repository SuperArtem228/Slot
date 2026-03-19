import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const final_cta_emphasis_v1: AnimationModule = {
  id: 'final_cta_emphasis_v1',
  slot: 'finalCta',
  variant: 'v1',
  duration: 1.2,
  async play() {
    await delay(1200);
    return completed();
  },
};
