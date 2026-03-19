import type { RescueSceneState, AttemptNumber } from '../../scene/rescueSceneTypes';

export type AttemptsHudProps = {
  sceneState: RescueSceneState;
  currentAttempt: AttemptNumber;
  headline: string;
  subheadline: string;
};
