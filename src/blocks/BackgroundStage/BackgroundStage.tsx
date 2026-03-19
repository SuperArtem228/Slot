import React from 'react';
import type { BackgroundStageProps } from './BackgroundStage.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

const intensityMap: Record<string, number> = {
  preload: 0.15,
  intro: 0.25,
  ready_attempt_1: 0.3,
  spin_1: 0.4,
  near_miss_1: 0.35,
  ready_attempt_2: 0.4,
  spin_2: 0.55,
  near_miss_2: 0.5,
  ready_attempt_3: 0.55,
  spin_3_charge: 0.7,
  spin_3: 0.75,
  final_lock: 0.85,
  jackpot_burst: 1,
  reward_morph: 0.6,
  reward_reveal: 0.45,
  reward_hold: 0.35,
  closing: 0.2,
};

export const BackgroundStage: React.FC<BackgroundStageProps> = ({ sceneState }) => {
  const intensity = intensityMap[sceneState] ?? 0.3;

  return (
    <div
      data-layer="background"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: zLayers.background,
        background: `radial-gradient(ellipse at 50% 45%, ${visualTokens.colors.emeraldGlow}${Math.round(intensity * 30).toString(16).padStart(2, '0')} 0%, ${visualTokens.colors.bgBase} 65%, ${visualTokens.colors.bgDeep} 100%)`,
        transition: 'background 0.6s ease',
      }}
    >
      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
