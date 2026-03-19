import type { RescueSceneState } from '../../scene/rescueSceneTypes';

export type FinalCtaZoneProps = {
  sceneState: RescueSceneState;
  label: string;
  onTap: () => void;
};
