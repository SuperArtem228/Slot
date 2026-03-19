import React from 'react';
import type { FinalOfferCardProps } from './FinalOfferCard.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

/**
 * FinalOfferCard: always mounted for GSAP targeting.
 * Starts invisible — reward_card_settle_v1 animates it in.
 */
export const FinalOfferCard: React.FC<FinalOfferCardProps> = ({
  sceneState,
  reward,
}) => {
  const shouldMount =
    sceneState === 'reward_morph' ||
    sceneState === 'reward_reveal' ||
    sceneState === 'reward_hold' ||
    sceneState === 'closing';

  if (!shouldMount) return null;

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
        background: 'linear-gradient(165deg, rgba(14,22,36,0.95) 0%, rgba(8,14,24,0.98) 100%)',
        border: '1.5px solid rgba(0,200,83,0.2)',
        boxShadow: '0 0 40px rgba(0,200,83,0.15), 0 0 15px rgba(255,214,0,0.05)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        textAlign: 'center',
        opacity: 0,
        willChange: 'transform, opacity, box-shadow',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: visualTokens.fontSizes.md,
          color: visualTokens.colors.textSecondary,
          fontWeight: 500,
          letterSpacing: 1.5,
          textTransform: 'uppercase',
        }}
      >
        {reward.title}
      </div>

      {/* Hero value */}
      <div
        style={{
          fontSize: visualTokens.fontSizes.hero,
          fontWeight: 800,
          color: visualTokens.colors.goldAccent,
          lineHeight: 1.1,
          textShadow: '0 0 8px rgba(255,214,0,0.2)',
        }}
      >
        {reward.value}
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: visualTokens.fontSizes.sm,
          color: visualTokens.colors.textSecondary,
          marginTop: 4,
          opacity: 0.8,
        }}
      >
        {reward.subtitle}
      </div>
    </div>
  );
};
