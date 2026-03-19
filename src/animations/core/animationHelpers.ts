import type { AnimationResult } from './animationTypes';

/** Simple delay that resolves after ms. Used as timer stub for iteration 1. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Creates a completed result */
export function completed(): AnimationResult {
  return { status: 'completed' };
}

/** Creates a cancelled result */
export function cancelled(): AnimationResult {
  return { status: 'cancelled' };
}
