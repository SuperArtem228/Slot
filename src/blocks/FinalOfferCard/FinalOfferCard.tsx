import React from 'react';
import type { FinalOfferCardProps } from './FinalOfferCard.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

export const FinalOfferCard: React.FC<FinalOfferCardProps> = ({
  sceneState,
  reward,
}) => {
  const isVisible =
    sceneState === 'reward_reveal' || sceneState === 'reward_hold';

  if (!isVisible) return null;

  return (
    <div
      data-layer="reward-card"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: zLayers.rewardCard,
        width: '85%',
        maxWidth: 340,
        padding: '32px 24px',
        borderRadius: visualTokens.radii.xl,
        background: visualTokens.colors.rewardCardBg,
        border: `1.5px solid ${visualTokens.colors.rewardCardBorder}`,
        boxShadow: `0 0 40px ${visualTokens.colors.emeraldGlow}30`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: visualTokens.fontSizes.md,
          color: visualTokens.colors.textSecondary,
          fontWeight: 500,
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        {reward.title}
      </div>
      <div
        style={{
          fontSize: visualTokens.fontSizes.hero,
          fontWeight: 800,
          color: visualTokens.colors.goldAccent,
          lineHeight: 1.1,
        }}
      >
        {reward.value}
      </div>
      <div
        style={{
          fontSize: visualTokens.fontSizes.sm,
          color: visualTokens.colors.textSecondary,
          marginTop: 4,
        }}
      >
        {reward.subtitle}
      </div>
    </div>
  );
};
