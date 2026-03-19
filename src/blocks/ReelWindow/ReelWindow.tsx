import React from 'react';
import type { ReelWindowProps } from './ReelWindow.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

const SYMBOLS = ['crown', 'bonus', 'chest', '500FS', 'cup', 'pig', 'tickets'];

const REEL_CONFIGS = [
  { offset: 0, speed: 1 },
  { offset: 2, speed: 1.1 },
  { offset: 4, speed: 0.9 },
];

const isSpinning = (state: string) =>
  state === 'spin_1' ||
  state === 'spin_2' ||
  state === 'spin_3_charge' ||
  state === 'spin_3';

const isLocked = (state: string) =>
  state === 'final_lock' ||
  state === 'jackpot_burst' ||
  state === 'reward_morph';

const getNearMissSymbols = (state: string): string[] => {
  if (state === 'near_miss_1') return ['crown', 'bonus', 'chest'];
  if (state === 'near_miss_2') return ['500FS', '500FS', 'crown']; // almost 3x
  return ['crown', 'crown', 'crown'];
};

const getDisplaySymbols = (state: string): string[][] => {
  if (isSpinning(state)) {
    // During spin, show cycling placeholder
    return REEL_CONFIGS.map((cfg) => {
      const start = cfg.offset % SYMBOLS.length;
      return [
        SYMBOLS[(start + 0) % SYMBOLS.length],
        SYMBOLS[(start + 1) % SYMBOLS.length],
        SYMBOLS[(start + 2) % SYMBOLS.length],
      ];
    });
  }

  if (state === 'near_miss_1' || state === 'near_miss_2') {
    const nm = getNearMissSymbols(state);
    return [
      [SYMBOLS[3], nm[0], SYMBOLS[5]],
      [SYMBOLS[1], nm[1], SYMBOLS[6]],
      [SYMBOLS[0], nm[2], SYMBOLS[2]],
    ];
  }

  if (isLocked(state)) {
    // Win state: 3x 500FS
    return [
      [SYMBOLS[2], '500FS', SYMBOLS[0]],
      [SYMBOLS[5], '500FS', SYMBOLS[1]],
      [SYMBOLS[6], '500FS', SYMBOLS[4]],
    ];
  }

  // Default idle
  return [
    ['crown', 'bonus', 'chest'],
    ['500FS', 'cup', 'pig'],
    ['tickets', 'crown', 'bonus'],
  ];
};

const symbolLabel: Record<string, string> = {
  crown: '\u{1F451}',
  bonus: '\u{2B50}',
  chest: '\u{1F4E6}',
  '500FS': '\u{1F3B0}',
  cup: '\u{1F3C6}',
  pig: '\u{1F416}',
  tickets: '\u{1F39F}',
};

export const ReelWindow: React.FC<ReelWindowProps> = ({ sceneState }) => {
  const spinning = isSpinning(sceneState);
  const reels = getDisplaySymbols(sceneState);

  return (
    <div
      data-layer="reel-window"
      style={{
        position: 'relative',
        zIndex: zLayers.reels,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        padding: '12px 8px',
      }}
    >
      {reels.map((col, colIdx) => (
        <div
          key={colIdx}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          {col.map((sym, rowIdx) => {
            const isCenter = rowIdx === 1;
            return (
              <div
                key={rowIdx}
                style={{
                  fontSize: isCenter ? 36 : 22,
                  opacity: isCenter ? 1 : 0.4,
                  textAlign: 'center',
                  lineHeight: 1.2,
                  transition: spinning ? 'none' : 'all 0.3s ease',
                  filter: spinning ? 'blur(2px)' : 'none',
                }}
              >
                <div>{symbolLabel[sym] ?? sym}</div>
                {isCenter && (
                  <div
                    style={{
                      fontSize: visualTokens.fontSizes.xs,
                      color: visualTokens.colors.textMuted,
                      marginTop: 2,
                    }}
                  >
                    {sym}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Center line indicator */}
      <div
        style={{
          position: 'absolute',
          left: '8%',
          right: '8%',
          top: '50%',
          transform: 'translateY(-50%)',
          height: 2,
          background: `linear-gradient(90deg, transparent, ${visualTokens.colors.emeraldGlow}40, transparent)`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
