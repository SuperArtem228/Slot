import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import type { ReelWindowProps } from './ReelWindow.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

// Symbol data — PNG assets with emoji fallbacks
const SYMBOLS = [
  { id: 'crown',   asset: '/assets/symbols/symbol_crown_emerald.png',          emoji: '\u{1F451}' },
  { id: 'bonus',   asset: '/assets/symbols/symbol_bonus_orb_emerald.png',      emoji: '\u{2B50}' },
  { id: 'chest',   asset: '/assets/symbols/symbol_treasure_chest_emerald.png', emoji: '\u{1F4E6}' },
  { id: '500FS',   asset: '/assets/symbols/symbol_bonus_orb_emerald.png',      emoji: '\u{1F3B0}' },
  { id: 'cup',     asset: '/assets/symbols/symbol_trophy_silver_blue.png',     emoji: '\u{1F3C6}' },
  { id: 'pig',     asset: '/assets/symbols/symbol_vip_badge_emerald.png',      emoji: '\u{1F416}' },
  { id: 'tickets', asset: '/assets/symbols/symbol_gift_box_violet.png',        emoji: '\u{1F39F}' },
];

const SYMBOL_HEIGHT = 72;
const VISIBLE_COUNT = 3; // top, center, bottom
const TOTAL_SYMBOLS = SYMBOLS.length;
const STRIP_HEIGHT = TOTAL_SYMBOLS * SYMBOL_HEIGHT;

// Near miss outcomes: center row index for each column
const OUTCOMES: Record<string, number[]> = {
  idle: [0, 3, 5],
  near_miss_1: [0, 1, 2],       // crown, bonus, chest — close but different
  near_miss_2: [3, 3, 0],       // 500FS, 500FS, crown — two match, third off
  win: [3, 3, 3],               // 500FS x3
};

function getOutcomeKey(state: string): string {
  if (state === 'near_miss_1') return 'near_miss_1';
  if (state === 'near_miss_2') return 'near_miss_2';
  if (state === 'final_lock' || state === 'jackpot_burst' || state === 'reward_morph') return 'win';
  return 'idle';
}

/** Single symbol cell — shows PNG image, falls back to emoji if image is tiny/missing */
const SymbolCell: React.FC<{ sym: typeof SYMBOLS[0] }> = ({ sym }) => {
  const [useFallback, setUseFallback] = React.useState(false);

  return (
    <div
      style={{
        height: SYMBOL_HEIGHT,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {useFallback ? (
        <span style={{ fontSize: 32, lineHeight: 1 }}>{sym.emoji}</span>
      ) : (
        <img
          src={sym.asset}
          alt={sym.id}
          draggable={false}
          onLoad={(e) => {
            // If the loaded image is tiny (placeholder), use emoji fallback
            const img = e.currentTarget;
            if (img.naturalWidth <= 2 && img.naturalHeight <= 2) {
              setUseFallback(true);
            }
          }}
          onError={() => setUseFallback(true)}
          style={{
            width: 52,
            height: 52,
            objectFit: 'contain',
            imageRendering: 'auto',
            filter: 'drop-shadow(0 2px 6px rgba(0,200,83,0.25))',
          }}
        />
      )}
    </div>
  );
};

type ReelStripProps = {
  columnIndex: number;
  stripRef: React.RefObject<HTMLDivElement | null>;
};

const ReelStrip: React.FC<ReelStripProps> = ({ columnIndex: _ci, stripRef }) => {
  return (
    <div
      style={{
        flex: 1,
        height: VISIBLE_COUNT * SYMBOL_HEIGHT,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        ref={stripRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          willChange: 'transform',
        }}
      >
        {/* Render strip 3x for seamless wrap */}
        {[0, 1, 2].map((rep) =>
          SYMBOLS.map((sym, idx) => (
            <SymbolCell key={`${rep}-${idx}`} sym={sym} />
          )),
        )}
      </div>
    </div>
  );
};

export type ReelWindowHandle = {
  spinReels: (
    targetIndices: number[],
    spinDuration: number,
    staggerDelay: number,
    ease: string,
  ) => Promise<void>;
  resetReels: () => void;
};

export const ReelWindow = forwardRef<ReelWindowHandle, ReelWindowProps>(
  ({ sceneState }, ref) => {
    const strip0 = useRef<HTMLDivElement>(null);
    const strip1 = useRef<HTMLDivElement>(null);
    const strip2 = useRef<HTMLDivElement>(null);
    const strips = [strip0, strip1, strip2];

    // Set initial positions
    useEffect(() => {
      const outcome = OUTCOMES[getOutcomeKey(sceneState)] ?? OUTCOMES.idle;
      strips.forEach((s, i) => {
        if (s.current) {
          const targetY = -(outcome[i] * SYMBOL_HEIGHT + STRIP_HEIGHT);
          gsap.set(s.current, { y: targetY });
        }
      });
      // Only run on mount
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const spinReels = useCallback(
      async (
        targetIndices: number[],
        spinDuration: number,
        staggerDelay: number,
        ease: string,
      ): Promise<void> => {
        const promises = strips.map((stripRef, colIdx) => {
          return new Promise<void>((resolve) => {
            const el = stripRef.current;
            if (!el) { resolve(); return; }

            const targetIdx = targetIndices[colIdx] ?? 0;
            const centerOffset = SYMBOL_HEIGHT;
            const targetY = -(targetIdx * SYMBOL_HEIGHT + STRIP_HEIGHT) - centerOffset;

            const fullRotations = 3 + colIdx;
            const spinDistance = fullRotations * STRIP_HEIGHT;

            const currentY = gsap.getProperty(el, 'y') as number;

            const tl = gsap.timeline({
              delay: colIdx * staggerDelay,
              onComplete: resolve,
            });

            // Fast spin phase
            tl.to(el, {
              y: currentY - spinDistance,
              duration: spinDuration * 0.6,
              ease: 'none',
              modifiers: {
                y: (y: string) => {
                  const val = parseFloat(y);
                  const wrapped = ((val % (STRIP_HEIGHT * 3)) + STRIP_HEIGHT * 3) % (STRIP_HEIGHT * 3);
                  return -wrapped + 'px';
                },
              },
            });

            // Slowdown to exact target
            tl.to(el, {
              y: targetY,
              duration: spinDuration * 0.4,
              ease: ease,
            });
          });
        });

        await Promise.all(promises);
      },
      [strips],
    );

    const resetReels = useCallback(() => {
      strips.forEach((s, i) => {
        if (s.current) {
          const y = -(OUTCOMES.idle[i] * SYMBOL_HEIGHT + STRIP_HEIGHT);
          gsap.set(s.current, { y });
        }
      });
    }, [strips]);

    useImperativeHandle(ref, () => ({ spinReels, resetReels }), [spinReels, resetReels]);

    // Auto-position on state changes for non-spinning states
    useEffect(() => {
      const key = getOutcomeKey(sceneState);
      if (
        key !== 'idle' &&
        sceneState !== 'spin_1' &&
        sceneState !== 'spin_2' &&
        sceneState !== 'spin_3_charge' &&
        sceneState !== 'spin_3'
      ) {
        const outcome = OUTCOMES[key];
        strips.forEach((s, i) => {
          if (s.current) {
            const centerOffset = SYMBOL_HEIGHT;
            const targetY = -(outcome[i] * SYMBOL_HEIGHT + STRIP_HEIGHT) - centerOffset;
            gsap.to(s.current, { y: targetY, duration: 0.3, ease: 'power2.out' });
          }
        });
      }
    }, [sceneState, strips]);

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
          gap: 2,
          padding: '0 8px',
        }}
      >
        {strips.map((stripRef, i) => (
          <ReelStrip key={i} columnIndex={i} stripRef={stripRef} />
        ))}

        {/* Center row highlight — CSS fallback + PNG overlay */}
        <div
          style={{
            position: 'absolute',
            left: '5%',
            right: '5%',
            top: '50%',
            transform: 'translateY(-50%)',
            height: SYMBOL_HEIGHT,
            border: `1px solid ${visualTokens.colors.emeraldGlow}30`,
            borderRadius: 8,
            pointerEvents: 'none',
            boxShadow: `inset 0 0 20px ${visualTokens.colors.emeraldGlow}10`,
            overflow: 'hidden',
          }}
        >
          <img
            src="/assets/fx/slot_row_highlight_overlay.png"
            alt=""
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'fill',
              opacity: 0.85,
            }}
          />
        </div>
      </div>
    );
  },
);

ReelWindow.displayName = 'ReelWindow';
