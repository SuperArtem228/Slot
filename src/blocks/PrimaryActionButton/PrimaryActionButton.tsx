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
          border: enabled
            ? '1.5px solid rgba(255,255,255,0.25)'
            : '1px solid rgba(255,255,255,0.06)',
          background: enabled
            ? 'linear-gradient(180deg, #1b9e52 0%, #0d7a3a 50%, #0a5e2d 100%)'
            : 'rgba(255,255,255,0.08)',
          cursor: enabled ? 'pointer' : 'default',
          opacity: enabled ? 1 : 0.5,
          transition: 'all 0.3s ease',
          boxShadow: enabled
            ? [
                '0 1px 0 rgba(255,255,255,0.15) inset',           // top inner highlight
                '0 -1px 2px rgba(0,0,0,0.25) inset',              // bottom inner shadow
                '0 4px 14px rgba(0,200,83,0.35)',                  // outer glow
                '0 2px 4px rgba(0,0,0,0.4)',                       // drop shadow
              ].join(', ')
            : 'none',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {/* Soft gloss highlight — top half */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 100%)',
            borderRadius: 'inherit',
            pointerEvents: 'none',
          }}
        />
        {/* Label text */}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            color: enabled ? '#ffffff' : visualTokens.colors.textMuted,
            fontSize: visualTokens.fontSizes.md,
            fontWeight: 700,
            letterSpacing: 1.2,
            textShadow: enabled
              ? '0 1px 2px rgba(0,0,0,0.4), 0 0 8px rgba(0,200,83,0.3)'
              : 'none',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      </button>
    </div>
  );
};
