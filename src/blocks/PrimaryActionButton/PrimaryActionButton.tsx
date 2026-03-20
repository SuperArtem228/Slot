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
          border: 'none',
          background: 'transparent',
          cursor: enabled ? 'pointer' : 'default',
          opacity: enabled ? 1 : 0.5,
          transition: 'all 0.3s ease',
          padding: 0,
          overflow: 'hidden',
          borderRadius: visualTokens.radii.full,
        }}
      >
        {/* CTA button image background */}
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
          }}
        />
        {/* Label text on top */}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            color: '#ffffff',
            fontSize: visualTokens.fontSizes.md,
            fontWeight: 700,
            letterSpacing: 0.5,
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}
        >
          {label}
        </span>
      </button>
    </div>
  );
};
