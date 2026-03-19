import React from 'react';
import type { BackgroundStageProps } from './BackgroundStage.types';
import { zLayers } from '../../theme/zLayers';

export const BackgroundStage: React.FC<BackgroundStageProps> = ({ sceneState }) => {
  return (
    <div
      data-layer="background"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: zLayers.background,
        overflow: 'hidden',
      }}
    >
      {/* Layer 1: Deep dark base */}
      <div
        data-bg="base"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #080c14 0%, #060a10 50%, #040810 100%)',
        }}
      />

      {/* Layer 2: Center radial glow — primary light source */}
      <div
        data-bg="center-glow"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(0,200,83,0.12) 0%, transparent 70%)',
          opacity: sceneState === 'preload' ? 0.3 : 1,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Layer 3: Halo behind slot — intensifies per attempt */}
      <div
        data-bg="halo"
        style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '20%',
          bottom: '35%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(0,200,83,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.5,
          transition: 'opacity 0.8s ease',
        }}
      />

      {/* Layer 4: Secondary warm accent — appears on later attempts */}
      <div
        data-bg="warm-accent"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 50% 45%, rgba(255,214,0,0.03) 0%, transparent 60%)',
          opacity: 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Layer 5: Edge vignette for depth */}
      <div
        data-bg="vignette"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Layer 6: Top gradient for HUD readability */}
      <div
        data-bg="top-gradient"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '15%',
          background: 'linear-gradient(180deg, rgba(4,8,16,0.7) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Layer 7: Bottom gradient for CTA readability */}
      <div
        data-bg="bottom-gradient"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '20%',
          background: 'linear-gradient(0deg, rgba(4,8,16,0.8) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
