import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const hud_intro_reveal_v1: AnimationModule = {
  id: 'hud_intro_reveal_v1',
  slot: 'hud',
  variant: 'v1',
  duration: 0.45,
  async play() {
    await delay(450);
    return completed();
  },
};
