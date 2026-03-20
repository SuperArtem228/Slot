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
        top: '18%',
        left: '3%',
        right: '3%',
        height: '46%',
        zIndex: zLayers.slotFrame,
        opacity: isHidden ? 0 : 1,
        transform: isHidden ? 'scale(0.95)' : 'scale(1)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Frame image — purely decorative outer shell */}
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
          zIndex: 2,
        }}
      />

      {/* Inner reel viewport — exact bounds matching the dark glass area in frame PNG */}
      <div
        style={{
          position: 'absolute',
          left: '28%',
          top: '21%',
          width: '44%',
          height: '58%',
          zIndex: 3,
          overflow: 'hidden',
          borderRadius: 6,
        }}
      >
        {children}
      </div>
    </div>
  );
};
