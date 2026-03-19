import React from 'react';
import type { StatusCopyLayerProps } from './StatusCopyLayer.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

export const StatusCopyLayer: React.FC<StatusCopyLayerProps> = ({
  sceneState,
  title,
  subtitle,
}) => {
  const isVisible =
    sceneState === 'near_miss_1' || sceneState === 'near_miss_2';

  if (!isVisible) return null;

  return (
    <div
      data-layer="status-copy"
      style={{
        position: 'absolute',
        top: '62%',
        left: 0,
        right: 0,
        zIndex: zLayers.statusCopy,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        opacity: 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      <div
        style={{
          fontSize: visualTokens.fontSizes.xl,
          fontWeight: 700,
          color: visualTokens.colors.textPrimary,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: visualTokens.fontSizes.sm,
          color: visualTokens.colors.textSecondary,
        }}
      >
        {subtitle}
      </div>
    </div>
  );
};
