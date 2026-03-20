import React from 'react';
import type { AmbientDecorLayerProps, AmbientProp } from './AmbientDecorLayer.types';
import { zLayers } from '../../theme/zLayers';

const PROPS: AmbientProp[] = [
  { id: 'crown',   asset: '/assets/symbols/symbol_crown_emerald.png',          emoji: '\u{1F451}', x: 8,  y: 18, size: 36, depth: 'far',  rotation: -12 },
  { id: 'chest',   asset: '/assets/symbols/symbol_treasure_chest_emerald.png', emoji: '\u{1F4E6}', x: 85, y: 25, size: 32, depth: 'far',  rotation: 8 },
  { id: 'cup',     asset: '/assets/symbols/symbol_trophy_silver_blue.png',     emoji: '\u{1F3C6}', x: 12, y: 72, size: 30, depth: 'mid',  rotation: -5 },
  { id: 'tickets', asset: '/assets/symbols/symbol_gift_box_violet.png',        emoji: '\u{1F39F}', x: 88, y: 68, size: 34, depth: 'mid',  rotation: 15 },
  { id: 'pig',     asset: '/assets/symbols/symbol_vip_badge_emerald.png',      emoji: '\u{1F416}', x: 5,  y: 45, size: 28, depth: 'near', rotation: -8 },
  { id: 'bonus',   asset: '/assets/symbols/symbol_bonus_orb_emerald.png',      emoji: '\u{2B50}',  x: 92, y: 42, size: 26, depth: 'near', rotation: 10 },
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

/** Renders PNG with emoji fallback if image is placeholder/missing */
const PropSymbol: React.FC<{ prop: AmbientProp }> = ({ prop }) => {
  const [useFallback, setUseFallback] = React.useState(false);

  if (useFallback) {
    return <span style={{ fontSize: prop.size * 0.7 }}>{prop.emoji}</span>;
  }

  return (
    <img
      src={prop.asset}
      alt=""
      draggable={false}
      onLoad={(e) => {
        const img = e.currentTarget;
        if (img.naturalWidth <= 2 && img.naturalHeight <= 2) {
          setUseFallback(true);
        }
      }}
      onError={() => setUseFallback(true)}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  );
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
              width: prop.size,
              height: prop.size,
              opacity: depthOpacity[prop.depth],
              filter: `blur(${depthBlur[prop.depth]}px)`,
              transform: `rotate(${prop.rotation}deg)`,
              willChange: 'transform',
              transition: 'opacity 0.5s ease',
            }}
          >
            <PropSymbol prop={prop} />
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
              width: prop.size,
              height: prop.size,
              opacity: depthOpacity[prop.depth],
              transform: `rotate(${prop.rotation}deg)`,
              willChange: 'transform',
              transition: 'opacity 0.5s ease',
            }}
          >
            <PropSymbol prop={prop} />
          </div>
        ))}
      </div>
    </>
  );
};
