import type { AttemptOutcome } from '../../scene/rescueSceneTypes';

export type ReelOutcomeConfig = {
  attemptId: string;
  outcome: AttemptOutcome;
  targetSymbol?: string;
};

/**
 * Composes reel visual outcome.
 * Reels don't decide results — this composer dictates the final pattern.
 * Will be used by ReelWindow in iteration 2 for controlled spin outcomes.
 */
export function composeReelOutcome(config: ReelOutcomeConfig): string[][] {
  const { outcome, targetSymbol = '500FS' } = config;

  if (outcome === 'near_miss_soft') {
    return [
      [targetSymbol, 'pig', 'tickets'],
      ['bonus', targetSymbol, 'chest'],
      ['cup', 'chest', targetSymbol],
    ];
  }

  if (outcome === 'near_miss_hard') {
    return [
      ['chest', targetSymbol, 'pig'],
      ['cup', targetSymbol, 'tickets'],
      [targetSymbol, 'crown', 'bonus'], // almost 3x but off
    ];
  }

  // Win
  return [
    ['bonus', targetSymbol, 'pig'],
    ['chest', targetSymbol, 'cup'],
    ['tickets', targetSymbol, 'crown'],
  ];
}
