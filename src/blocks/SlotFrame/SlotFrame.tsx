import React from 'react';
import type { SlotFrameProps } from './SlotFrame.types';
import { zLayers } from '../../theme/zLayers';

/*──────────────────────────────────────────────────────────────
  FROZEN LAYOUT CONSTANTS — anchored to the frame PNG asset.
  Do not change these without re-measuring the frame image.
──────────────────────────────────────────────────────────────*/

/** Where the entire frame sits inside the scene (% of scene) */
const FRAME_TOP    = '18%';
const FRAME_LEFT   = '3%';
const FRAME_RIGHT  = '3%';
const FRAME_HEIGHT = '46%';

/** Inner reel viewport — relative to frame bounds (% of frame) */
const VIEWPORT_LEFT   = '19%';
const VIEWPORT_TOP    = '15%';
const VIEWPORT_WIDTH  = '62%';
const VIEWPORT_HEIGHT = '58%';

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
        top: FRAME_TOP,
        left: FRAME_LEFT,
        right: FRAME_RIGHT,
        height: FRAME_HEIGHT,
        zIndex: zLayers.slotFrame,
        opacity: isHidden ? 0 : 1,
        transform: isHidden ? 'scale(0.95)' : 'scale(1)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {/* Layer 1: decorative outer shell — full frame PNG */}
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

      {/* Layer 2: inner reel viewport — the dark glass area only.
          overflow:hidden here is the ONLY clip boundary for all symbols. */}
      <div
        data-layer="reel-viewport"
        style={{
          position: 'absolute',
          left: VIEWPORT_LEFT,
          top: VIEWPORT_TOP,
          width: VIEWPORT_WIDTH,
          height: VIEWPORT_HEIGHT,
          zIndex: 3,
          overflow: 'hidden',
          borderRadius: 4,
        }}
      >
        {children}
      </div>
    </div>
  );
};
