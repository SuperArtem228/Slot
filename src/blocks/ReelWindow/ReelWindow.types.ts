import type { RescueSceneState } from '../../scene/rescueSceneTypes';

export type ReelSymbol = {
  id: string;
  label: string;
  emoji: string; // placeholder until real assets
};

export type ReelWindowProps = {
  sceneState: RescueSceneState;
};
