import React from 'react';
import type { AmbientDecorLayerProps } from './AmbientDecorLayer.types';
import { zLayers } from '../../theme/zLayers';

/** Stub: ambient floating props will be added in iteration 3. */
export const AmbientDecorLayer: React.FC<AmbientDecorLayerProps> = ({ sceneState: _sceneState }) => {
  return (
    <div
      data-layer="ambient-decor"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: zLayers.ambientBack,
        pointerEvents: 'none',
      }}
    >
      {/* Floating branded props will be rendered here */}
    </div>
  );
};
