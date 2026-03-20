import React from 'react';
import type { SlotFrameProps } from './SlotFrame.types';
import { zLayers } from '../../theme/zLayers';
import { visualTokens } from '../../theme/visualTokens';

/** States that use the active (glowing) frame variant */
const ACTIVE_FRAME_STATES = new Set([
  'spin_3_charge',
  'spin_3',
  'final_lock',
  'jackpot_burst',
  'near_miss_2',
]);

const glowByState: Record<string, string> = {
  preload: 'transparent',
  intro: 'rgba(0, 200, 83, 0.1)',
  ready_attempt_1: 'rgba(0, 200, 83, 0.15)',
  spin_1: 'rgba(0, 200, 83, 0.3)',
  near_miss_1: 'rgba(0, 200, 83, 0.2)',
  ready_attempt_2: 'rgba(0, 200, 83, 0.2)',
  spin_2: 'rgba(0, 200, 83, 0.45)',
  near_miss_2: 'rgba(0, 200, 83, 0.35)',
  ready_attempt_3: 'rgba(0, 200, 83, 0.35)',
  spin_3_charge: 'rgba(0, 200, 83, 0.6)',
  spin_3: 'rgba(0, 200, 83, 0.65)',
  final_lock: 'rgba(255, 214, 0, 0.7)',
  jackpot_burst: 'rgba(255, 214, 0, 0.9)',
  reward_morph: 'rgba(0, 200, 83, 0.3)',
  reward_reveal: 'transparent',
  reward_hold: 'transparent',
  closing: 'transparent',
};

export const SlotFrame: React.FC<SlotFrameProps> = ({ sceneState, children }) => {
  const isHidden =
    sceneState === 'reward_reveal' ||
    sceneState === 'reward_hold' ||
    sceneState === 'closing';

  const useActiveFrame = ACTIVE_FRAME_STATES.has(sceneState);
  const frameSrc = useActiveFrame
    ? '/assets/frames/slot_frame_active.png'
    : '/assets/frames/slot_frame_idle.png';

  const glow = glowByState[sceneState] ?? 'transparent';

  return (
    <div
      data-layer="slot-frame"
      style={{
        position: 'absolute',
        top: '22%',
        left: '4%',
        right: '4%',
        height: '38%',
        zIndex: zLayers.slotFrame,
        opacity: isHidden ? 0 : 1,
        transform: isHidden ? 'scale(0.95)' : 'scale(1)',
        transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease',
        borderRadius: visualTokens.radii.xl,
        border: `1.5px solid ${visualTokens.colors.glassBright}`,
        background: `linear-gradient(180deg, rgba(20, 28, 40, 0.85) 0%, rgba(10, 14, 20, 0.95) 100%)`,
        boxShadow: `0 0 30px ${glow}, inset 0 1px 0 ${visualTokens.colors.glass}`,
        overflow: 'hidden',
      }}
    >
      {/* Frame image overlay — sits on top of CSS fallback */}
      <img
        src={frameSrc}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: -2,
          width: 'calc(100% + 4px)',
          height: 'calc(100% + 4px)',
          objectFit: 'fill',
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
          zIndex: 2,
          borderRadius: 'inherit',
        }}
      />

      {/* Glass overlay (CSS fallback) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: zLayers.glassOverlay,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%)',
          pointerEvents: 'none',
          borderRadius: 'inherit',
        }}
      />

      {/* Reel content area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          zIndex: 3,
        }}
      >
        {children}
      </div>
    </div>
  );
};
