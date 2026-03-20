import type { RescueSceneState } from '../../scene/rescueSceneTypes';

export type ReelSymbol = {
  id: string;
  asset: string;
};

export type ReelWindowProps = {
  sceneState: RescueSceneState;
};

export type ReelColumnHandle = {
  spinTo: (targetIdx: number, duration: number, delay: number, ease: string) => Promise<void>;
  reset: () => void;
};
