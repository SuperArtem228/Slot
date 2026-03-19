import type { AnimationModule, AnimationContext, AnimationResult } from '../core/animationTypes';
import { delay, completed } from '../core/animationHelpers';

/** Attempt 1: soft spin. Reel spinning is driven by ReelWindow handle from controller. */
export const reel_spin_soft_v1: AnimationModule = {
  id: 'reel_spin_soft_v1',
  slot: 'spinCore',
  variant: 'v1',
  duration: 1.6,

  async play(_ctx: AnimationContext): Promise<AnimationResult> {
    // Reel motion is now handled by ReelWindow.spinReels() called from controller.
    // This module acts as a timing marker.
    await delay(1600);
    return completed();
  },
};
