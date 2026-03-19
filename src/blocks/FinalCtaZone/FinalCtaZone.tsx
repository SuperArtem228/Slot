import React from 'react';
import type { FinalCtaZoneProps } from './FinalCtaZone.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

export const FinalCtaZone: React.FC<FinalCtaZoneProps> = ({
  sceneState,
  label,
  onTap,
}) => {
  const isVisible = sceneState === 'reward_hold';

  if (!isVisible) return null;

  return (
    <div
      data-layer="final-cta"
      style={{
        position: 'absolute',
        bottom: 48,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: zLayers.finalCta,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <button
        onClick={onTap}
        style={{
          width: 280,
          height: 56,
          borderRadius: visualTokens.radii.full,
          border: 'none',
          background: `linear-gradient(135deg, ${visualTokens.colors.goldAccent}, #ffab00)`,
          color: '#0a0e14',
          fontSize: visualTokens.fontSizes.md,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: `0 4px 24px ${visualTokens.colors.goldAccent}40`,
          letterSpacing: 0.5,
        }}
      >
        {label}
      </button>
    </div>
  );
};
