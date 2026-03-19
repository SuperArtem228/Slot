import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

/** Final (3rd) reel spin — longest, most dramatic. */
export const final_reel_spin_v1: AnimationModule = {
  id: 'final_reel_spin_v1',
  slot: 'spinCore',
  variant: 'v1',
  duration: 2.1,

  async play(_ctx: AnimationContext): Promise<AnimationResult> {
    await delay(2100);
    return completed();
  },
};
