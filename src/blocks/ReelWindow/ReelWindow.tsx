import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import gsap from 'gsap';
import type { ReelWindowProps } from './ReelWindow.types';
import { zLayers } from '../../theme/zLayers';

/*──────────────────────────────────────────────────────────────
  FROZEN REEL CONSTANTS
──────────────────────────────────────────────────────────────*/

/** Number of visible rows in the viewport — always 3 */
const VISIBLE_ROWS = 3;

/** Symbol icon fills this fraction of its cell */
const SYMBOL_FILL = 0.72;

/** Gap between columns in px */
const COL_GAP = 2;

/** Symbol data — PNG assets with emoji fallbacks */
const SYMBOLS = [
  { id: 'crown',   asset: '/assets/symbols/symbol_crown_emerald.png',          emoji: '\u{1F451}' },
  { id: 'bonus',   asset: '/assets/symbols/symbol_bonus_orb_emerald.png',      emoji: '\u{2B50}' },
  { id: 'chest',   asset: '/assets/symbols/symbol_treasure_chest_emerald.png', emoji: '\u{1F4E6}' },
  { id: '500FS',   asset: '/assets/symbols/symbol_bonus_orb_emerald.png',      emoji: '\u{1F3B0}' },
  { id: 'cup',     asset: '/assets/symbols/symbol_trophy_silver_blue.png',     emoji: '\u{1F3C6}' },
  { id: 'pig',     asset: '/assets/symbols/symbol_vip_badge_emerald.png',      emoji: '\u{1F416}' },
  { id: 'tickets', asset: '/assets/symbols/symbol_gift_box_violet.png',        emoji: '\u{1F39F}' },
];

const TOTAL_SYMBOLS = SYMBOLS.length;

/** Near-miss / win outcomes: index into SYMBOLS for center row of each column */
const OUTCOMES: Record<string, number[]> = {
  idle: [0, 3, 5],
  near_miss_1: [0, 1, 2],
  near_miss_2: [3, 3, 0],
  win: [3, 3, 3],
};

function getOutcomeKey(state: string): string {
  if (state === 'near_miss_1') return 'near_miss_1';
  if (state === 'near_miss_2') return 'near_miss_2';
  if (state === 'final_lock' || state === 'jackpot_burst' || state === 'reward_morph') return 'win';
  return 'idle';
}

/*──────────────────────────────────────────────────────────────
  SymbolCell — renders one symbol at the given cell height
──────────────────────────────────────────────────────────────*/

const SymbolCell: React.FC<{
  sym: typeof SYMBOLS[0];
  cellH: number;
}> = ({ sym, cellH }) => {
  const [useFallback, setUseFallback] = React.useState(false);
  const iconSize = Math.round(cellH * SYMBOL_FILL);

  return (
    <div
      style={{
        height: cellH,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {useFallback ? (
        <span style={{ fontSize: Math.round(iconSize * 0.7), lineHeight: 1 }}>
          {sym.emoji}
        </span>
      ) : (
        <img
          src={sym.asset}
          alt={sym.id}
          draggable={false}
          onLoad={(e) => {
            const img = e.currentTarget;
            if (img.naturalWidth <= 2 && img.naturalHeight <= 2) setUseFallback(true);
          }}
          onError={() => setUseFallback(true)}
          style={{
            width: iconSize,
            height: iconSize,
            objectFit: 'contain',
            imageRendering: 'auto',
            filter: 'drop-shadow(0 2px 4px rgba(0,200,83,0.2))',
          }}
        />
      )}
    </div>
  );
};

/*──────────────────────────────────────────────────────────────
  ReelWindow — 3 vertical reel tracks inside the viewport
──────────────────────────────────────────────────────────────*/

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
    const containerRef = useRef<HTMLDivElement>(null);
    const strip0 = useRef<HTMLDivElement>(null);
    const strip1 = useRef<HTMLDivElement>(null);
    const strip2 = useRef<HTMLDivElement>(null);
    const strips = [strip0, strip1, strip2];

    // Derived from actual container measurement — guarantees exactly 3 visible rows
    const [cellH, setCellH] = useState(60); // sensible fallback
    const cellHRef = useRef(cellH);
    cellHRef.current = cellH;

    // Derived constants
    const stripH = TOTAL_SYMBOLS * cellH;
    const stripHRef = useRef(stripH);
    stripHRef.current = stripH;

    // Measure container and compute cell height before first paint
    useLayoutEffect(() => {
      const measure = () => {
        if (containerRef.current) {
          const h = containerRef.current.clientHeight;
          if (h > 0) {
            const newCellH = Math.floor(h / VISIBLE_ROWS);
            setCellH(newCellH);
          }
        }
      };
      measure();

      const ro = new ResizeObserver(measure);
      if (containerRef.current) ro.observe(containerRef.current);
      return () => ro.disconnect();
    }, []);

    // Position strips on mount once cellH is computed
    useEffect(() => {
      const ch = cellHRef.current;
      const sh = TOTAL_SYMBOLS * ch;
      const outcome = OUTCOMES[getOutcomeKey(sceneState)] ?? OUTCOMES.idle;
      strips.forEach((s, i) => {
        if (s.current) {
          // Position so the target symbol is in the CENTER row (row index 1)
          const targetY = -(outcome[i] * ch + sh) + ch;
          gsap.set(s.current, { y: targetY });
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cellH]);

    const spinReels = useCallback(
      async (
        targetIndices: number[],
        spinDuration: number,
        staggerDelay: number,
        ease: string,
      ): Promise<void> => {
        const ch = cellHRef.current;
        const sh = TOTAL_SYMBOLS * ch;

        const promises = strips.map((stripRef, colIdx) => {
          return new Promise<void>((resolve) => {
            const el = stripRef.current;
            if (!el) { resolve(); return; }

            const targetIdx = targetIndices[colIdx] ?? 0;
            // Target Y: symbol at targetIdx is in center row
            const targetY = -(targetIdx * ch + sh) + ch;

            const fullRotations = 3 + colIdx;
            const spinDistance = fullRotations * sh;

            const currentY = gsap.getProperty(el, 'y') as number;
            const totalStripPx = sh * 3; // 3x repeated

            const tl = gsap.timeline({
              delay: colIdx * staggerDelay,
              onComplete: resolve,
            });

            // Fast spin phase — wrap modulo total strip length
            tl.to(el, {
              y: currentY - spinDistance,
              duration: spinDuration * 0.6,
              ease: 'none',
              modifiers: {
                y: (y: string) => {
                  const val = parseFloat(y);
                  const wrapped = ((val % totalStripPx) + totalStripPx) % totalStripPx;
                  return -wrapped + 'px';
                },
              },
            });

            // Decelerate to exact target
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
      const ch = cellHRef.current;
      const sh = TOTAL_SYMBOLS * ch;
      strips.forEach((s, i) => {
        if (s.current) {
          const y = -(OUTCOMES.idle[i] * ch + sh) + ch;
          gsap.set(s.current, { y });
        }
      });
    }, [strips]);

    useImperativeHandle(ref, () => ({ spinReels, resetReels }), [spinReels, resetReels]);

    // Auto-position on non-spinning state changes
    useEffect(() => {
      const key = getOutcomeKey(sceneState);
      if (
        key !== 'idle' &&
        sceneState !== 'spin_1' &&
        sceneState !== 'spin_2' &&
        sceneState !== 'spin_3_charge' &&
        sceneState !== 'spin_3'
      ) {
        const ch = cellHRef.current;
        const sh = TOTAL_SYMBOLS * ch;
        const outcome = OUTCOMES[key];
        strips.forEach((s, i) => {
          if (s.current) {
            const targetY = -(outcome[i] * ch + sh) + ch;
            gsap.to(s.current, { y: targetY, duration: 0.3, ease: 'power2.out' });
          }
        });
      }
    }, [sceneState, strips]);

    return (
      <div
        ref={containerRef}
        data-layer="reel-window"
        style={{
          position: 'relative',
          zIndex: zLayers.reels,
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: COL_GAP,
          /* NO overflow:hidden here — clipping is done by the viewport div in SlotFrame */
        }}
      >
        {/* Layer 3: three reel tracks */}
        {strips.map((stripRef, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              position: 'relative',
              /* NO overflow:hidden on columns — viewport clips everything */
            }}
          >
            <div
              ref={stripRef}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                willChange: 'transform',
              }}
            >
              {/* 3x symbol set for seamless looping */}
              {[0, 1, 2].map((rep) =>
                SYMBOLS.map((sym, idx) => (
                  <SymbolCell key={`${rep}-${idx}`} sym={sym} cellH={cellH} />
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    );
  },
);

ReelWindow.displayName = 'ReelWindow';
