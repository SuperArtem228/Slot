import React from 'react';
import type { AmbientDecorLayerProps, AmbientProp } from './AmbientDecorLayer.types';
import { zLayers } from '../../theme/zLayers';

const PROPS: AmbientProp[] = [
  { id: 'crown',   emoji: '\u{1F451}', x: 8,  y: 18, size: 28, depth: 'far',  rotation: -12 },
  { id: 'chest',   emoji: '\u{1F4E6}', x: 85, y: 25, size: 24, depth: 'far',  rotation: 8 },
  { id: 'cup',     emoji: '\u{1F3C6}', x: 12, y: 72, size: 22, depth: 'mid',  rotation: -5 },
  { id: 'tickets', emoji: '\u{1F39F}', x: 88, y: 68, size: 26, depth: 'mid',  rotation: 15 },
  { id: 'pig',     emoji: '\u{1F416}', x: 5,  y: 45, size: 20, depth: 'near', rotation: -8 },
  { id: 'bonus',   emoji: '\u{2B50}',  x: 92, y: 42, size: 18, depth: 'near', rotation: 10 },
];

const depthOpacity: Record<string, number> = {
  far: 0.2,
  mid: 0.3,
  near: 0.4,
};

const depthBlur: Record<string, number> = {
  far: 3,
  mid: 1.5,
  near: 0,
};

export const AmbientDecorLayer: React.FC<AmbientDecorLayerProps> = ({ sceneState }) => {
  const isHidden =
    sceneState === 'preload' ||
    sceneState === 'reward_reveal' ||
    sceneState === 'reward_hold' ||
    sceneState === 'closing';

  return (
    <>
      {/* Back layer */}
      <div
        data-layer="ambient-back"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: zLayers.ambientBack,
          pointerEvents: 'none',
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        {PROPS.filter((p) => p.depth === 'far' || p.depth === 'mid').map((prop) => (
          <div
            key={prop.id}
            data-prop={prop.id}
            style={{
              position: 'absolute',
              left: `${prop.x}%`,
              top: `${prop.y}%`,
              fontSize: prop.size,
              opacity: depthOpacity[prop.depth],
              filter: `blur(${depthBlur[prop.depth]}px)`,
              transform: `rotate(${prop.rotation}deg)`,
              willChange: 'transform',
              transition: 'opacity 0.5s ease',
            }}
          >
            {prop.emoji}
          </div>
        ))}
      </div>

      {/* Front layer */}
      <div
        data-layer="ambient-front"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: zLayers.ambientFront,
          pointerEvents: 'none',
          opacity: isHidden ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        {PROPS.filter((p) => p.depth === 'near').map((prop) => (
          <div
            key={prop.id}
            data-prop={prop.id}
            style={{
              position: 'absolute',
              left: `${prop.x}%`,
              top: `${prop.y}%`,
              fontSize: prop.size,
              opacity: depthOpacity[prop.depth],
              transform: `rotate(${prop.rotation}deg)`,
              willChange: 'transform',
              transition: 'opacity 0.5s ease',
            }}
          >
            {prop.emoji}
          </div>
        ))}
      </div>
    </>
  );
};
