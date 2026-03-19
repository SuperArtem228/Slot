import type { AttemptOutcome } from '../../scene/rescueSceneTypes';

export type AttemptOutcomeConfig = {
  attemptId: string;
  outcome: AttemptOutcome;
  targetSymbol?: string;
};

export const defaultAttemptsOutcomes: AttemptOutcomeConfig[] = [
  { attemptId: 'attempt_1', outcome: 'near_miss_soft', targetSymbol: 'crown' },
  { attemptId: 'attempt_2', outcome: 'near_miss_hard', targetSymbol: '500FS' },
  { attemptId: 'attempt_3', outcome: 'win', targetSymbol: '500FS' },
];
