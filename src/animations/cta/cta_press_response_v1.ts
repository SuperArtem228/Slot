import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const cta_press_response_v1: AnimationModule = {
  id: 'cta_press_response_v1',
  slot: 'ctaPress',
  variant: 'v1',
  duration: 0.16,
  async play() {
    await delay(160);
    return completed();
  },
};
