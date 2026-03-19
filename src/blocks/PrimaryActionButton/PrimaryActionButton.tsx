import React from 'react';
import type { PrimaryActionButtonProps } from './PrimaryActionButton.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

export const PrimaryActionButton: React.FC<PrimaryActionButtonProps> = ({
  label,
  enabled,
  onTap,
}) => {
  return (
    <div
      data-layer="cta"
      style={{
        position: 'absolute',
        bottom: 48,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: zLayers.finalCta,
      }}
    >
      <button
        disabled={!enabled}
        onClick={enabled ? onTap : undefined}
        style={{
          width: 280,
          height: 56,
          borderRadius: visualTokens.radii.full,
          border: 'none',
          background: enabled
            ? `linear-gradient(135deg, ${visualTokens.colors.ctaBg}, ${visualTokens.colors.limeAccent})`
            : 'rgba(255,255,255,0.1)',
          color: enabled ? '#0a0e14' : visualTokens.colors.textMuted,
          fontSize: visualTokens.fontSizes.md,
          fontWeight: 700,
          cursor: enabled ? 'pointer' : 'default',
          opacity: enabled ? 1 : 0.5,
          transition: 'all 0.3s ease',
          boxShadow: enabled
            ? `0 4px 20px ${visualTokens.colors.emeraldGlow}50`
            : 'none',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </button>
    </div>
  );
};
