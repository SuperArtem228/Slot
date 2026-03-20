import type { RescueSceneState } from '../../scene/rescueSceneTypes';

export type AmbientProp = {
  id: string;
  asset: string;    // path to PNG
  emoji: string;    // fallback emoji
  x: number;       // % from left
  y: number;       // % from top
  size: number;    // px
  depth: 'near' | 'mid' | 'far';
  rotation: number; // initial deg
};

export type AmbientDecorLayerProps = {
  sceneState: RescueSceneState;
};
