import React from 'react';
import type { SlotFrameProps } from './SlotFrame.types';
import { zLayers } from '../../theme/zLayers';

/** States that use the active (glowing) frame variant */
const ACTIVE_FRAME_STATES = new Set([
  'spin_3_charge',
  'spin_3',
  'final_lock',
  'jackpot_burst',
  'near_miss_2',
]);

export const SlotFrame: React.FC<SlotFrameProps> = ({ sceneState, children }) => {
  const isHidden =
    sceneState === 'reward_reveal' ||
    sceneState === 'reward_hold' ||
    sceneState === 'closing';

  const useActiveFrame = ACTIVE_FRAME_STATES.has(sceneState);
  const frameSrc = useActiveFrame
    ? '/assets/frames/slot_frame_active.png'
    : '/assets/frames/slot_frame_idle.png';

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
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Frame image — idle or active */}
      <img
        src={frameSrc}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
          zIndex: 0,
        }}
      />

      {/* Reel content area — positioned inside the frame */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '8%',
          right: '8%',
          bottom: '10%',
          overflow: 'hidden',
          borderRadius: 12,
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};
