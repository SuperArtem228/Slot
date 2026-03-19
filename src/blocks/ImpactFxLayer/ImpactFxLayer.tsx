import React from 'react';
import type { ImpactFxLayerProps } from './ImpactFxLayer.types';
import { zLayers } from '../../theme/zLayers';

/** Stub: particles, rays, bursts will be added in iteration 3-4. */
export const ImpactFxLayer: React.FC<ImpactFxLayerProps> = ({ sceneState: _sceneState }) => {
  return (
    <div
      data-layer="impact-fx"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: zLayers.impactFx,
        pointerEvents: 'none',
      }}
    />
  );
};
