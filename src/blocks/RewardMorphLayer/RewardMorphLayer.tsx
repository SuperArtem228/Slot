import React from 'react';
import type { RewardMorphLayerProps } from './RewardMorphLayer.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

/** Stub: morph transition will be rich in iteration 4. */
export const RewardMorphLayer: React.FC<RewardMorphLayerProps> = ({ sceneState }) => {
  const isActive = sceneState === 'reward_morph';

  if (!isActive) return null;

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
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${visualTokens.colors.emeraldGlow}60, transparent)`,
          animation: 'pulse 0.9s ease-in-out',
        }}
      />
    </div>
  );
};
