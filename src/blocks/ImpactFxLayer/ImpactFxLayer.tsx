import React from 'react';
import type { ImpactFxLayerProps } from './ImpactFxLayer.types';
import { zLayers } from '../../theme/zLayers';

/**
 * ImpactFxLayer: hosts dynamic particles, rays, and radial flashes
 * injected by animation modules. Always present but invisible until triggered.
 */
export const ImpactFxLayer: React.FC<ImpactFxLayerProps> = () => {
  return (
    <div
      data-layer="impact-fx"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: zLayers.impactFx,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Radial flash overlay */}
      <div
        data-fx="radial-flash"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Particle container — burst particles injected here */}
      <div
        data-fx="particles"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Ray container — light rays injected here */}
      <div
        data-fx="rays"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
