import React from 'react';
import type { RewardMorphLayerProps } from './RewardMorphLayer.types';
import { zLayers } from '../../theme/zLayers';

/**
 * RewardMorphLayer: always mounted, invisible by default.
 * GSAP controls its center glow disc for the morph transition.
 */
export const RewardMorphLayer: React.FC<RewardMorphLayerProps> = () => {
  return (
    <div
      data-layer="reward-morph"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: zLayers.rewardMorph,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Center glow disc — animated by reward_morph_v1 */}
      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,200,83,0.5), rgba(255,214,0,0.15), transparent)',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
};
