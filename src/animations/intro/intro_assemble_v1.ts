import type { AnimationModule } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

export const intro_assemble_v1: AnimationModule = {
  id: 'intro_assemble_v1',
  slot: 'intro',
  variant: 'v1',
  duration: 0.9,
  async play() {
    await delay(900);
    return completed();
  },
};
