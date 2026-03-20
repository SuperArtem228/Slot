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
          position: 'relative',
          width: 280,
          height: 56,
          borderRadius: visualTokens.radii.full,
          border: 'none',
          // CSS gradient as fallback — image overlays on top
          background: enabled
            ? `linear-gradient(135deg, ${visualTokens.colors.ctaBg}, ${visualTokens.colors.limeAccent})`
            : 'rgba(255,255,255,0.1)',
          cursor: enabled ? 'pointer' : 'default',
          opacity: enabled ? 1 : 0.5,
          transition: 'all 0.3s ease',
          boxShadow: enabled
            ? `0 4px 20px ${visualTokens.colors.emeraldGlow}50`
            : 'none',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {/* CTA button image — overlays CSS gradient */}
        <img
          src="/assets/ui/cta_button_primary_green.png"
          alt=""
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            borderRadius: 'inherit',
            zIndex: 0,
          }}
        />
        {/* Label text on top */}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            color: enabled ? '#0a0e14' : visualTokens.colors.textMuted,
            fontSize: visualTokens.fontSizes.md,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          {label}
        </span>
      </button>
    </div>
  );
};
