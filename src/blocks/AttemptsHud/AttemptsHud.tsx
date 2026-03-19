import React from 'react';
import type { AttemptsHudProps } from './AttemptsHud.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

export const AttemptsHud: React.FC<AttemptsHudProps> = ({
  sceneState,
  currentAttempt,
  headline,
  subheadline,
}) => {
  const isVisible =
    sceneState !== 'preload' &&
    sceneState !== 'reward_morph' &&
    sceneState !== 'reward_reveal' &&
    sceneState !== 'reward_hold' &&
    sceneState !== 'closing';

  if (!isVisible) return null;

  return (
    <div
      data-layer="hud"
      style={{
        position: 'absolute',
        top: 16,
        left: 0,
        right: 0,
        zIndex: zLayers.hud,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '0 16px',
        opacity: sceneState === 'intro' ? 0.7 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: visualTokens.fontSizes.lg,
          fontWeight: 700,
          color: visualTokens.colors.textPrimary,
          textAlign: 'center',
        }}
      >
        {headline}
      </h2>
      <p
        style={{
          margin: 0,
          fontSize: visualTokens.fontSizes.sm,
          color: visualTokens.colors.textSecondary,
          textAlign: 'center',
        }}
      >
        {subheadline}
      </p>

      {/* Attempt indicators */}
      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background:
                n < currentAttempt
                  ? visualTokens.colors.textMuted
                  : n === currentAttempt
                    ? visualTokens.colors.emeraldGlow
                    : 'rgba(255,255,255,0.2)',
              boxShadow:
                n === currentAttempt
                  ? `0 0 8px ${visualTokens.colors.emeraldGlow}`
                  : 'none',
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
