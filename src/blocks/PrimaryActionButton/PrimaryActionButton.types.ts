import type { RescueSceneState } from '../../scene/rescueSceneTypes';

export type PrimaryActionButtonProps = {
  sceneState: RescueSceneState;
  label: string;
  enabled: boolean;
  onTap: () => void;
};
