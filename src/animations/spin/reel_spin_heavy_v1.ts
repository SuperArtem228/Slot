import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

/** Attempt 2: heavier spin with more tension. */
export const reel_spin_heavy_v1: AnimationModule = {
  id: 'reel_spin_heavy_v1',
  slot: 'spinCore',
  variant: 'v1',
  duration: 1.9,

  async play(_ctx: AnimationContext): Promise<AnimationResult> {
    await delay(1900);
    return completed();
  },
};
