import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';
import type { ReelWindowProps } from './ReelWindow.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

// Symbol data
const SYMBOLS = [
  { id: 'crown', emoji: '\u{1F451}', label: 'crown' },
  { id: 'bonus', emoji: '\u{2B50}', label: 'bonus' },
  { id: 'chest', emoji: '\u{1F4E6}', label: 'chest' },
  { id: '500FS', emoji: '\u{1F3B0}', label: '500FS' },
  { id: 'cup', emoji: '\u{1F3C6}', label: 'cup' },
  { id: 'pig', emoji: '\u{1F416}', label: 'pig' },
  { id: 'tickets', emoji: '\u{1F39F}', label: 'tickets' },
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
            <div
              key={`${rep}-${idx}`}
              style={{
                height: SYMBOL_HEIGHT,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: 32, lineHeight: 1 }}>{sym.emoji}</span>
              <span
                style={{
                  fontSize: 10,
                  color: visualTokens.colors.textMuted,
                  marginTop: 2,
                }}
              >
                {sym.label}
              </span>
            </div>
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
            // Spin = go through full strips + land on target
            // Target position: we want the target symbol centered
            // center offset = 1 symbol above center visible
            const centerOffset = SYMBOL_HEIGHT; // one symbol above
            const targetY = -(targetIdx * SYMBOL_HEIGHT + STRIP_HEIGHT) - centerOffset;

            // First go fast (many full rotations), then slow to target
            const fullRotations = 3 + colIdx; // stagger feeling
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
                  // Wrap around: keep within 3 strip lengths
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

        {/* Center line indicator */}
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
          }}
        />
      </div>
    );
  },
);

ReelWindow.displayName = 'ReelWindow';
