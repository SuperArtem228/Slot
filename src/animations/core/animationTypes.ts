import type { MotionTokens } from '../../theme/motionTokens';

export type AnimationSlot =
  | 'intro'
  | 'ambient'
  | 'hud'
  | 'ctaIdle'
  | 'ctaPress'
  | 'spinStart'
  | 'spinCore'
  | 'nearMiss'
  | 'nearMissCopy'
  | 'attemptProgress'
  | 'backgroundCharge'
  | 'finalCharge'
  | 'finalLock'
  | 'jackpotBurst'
  | 'rewardMorph'
  | 'rewardSettle'
  | 'finalCopy'
  | 'finalCta'
  | 'rewardHold';

export type ThemeConfig = {
  name: string;
  [key: string]: unknown;
};

export type AnimationContext = {
  sceneRoot: HTMLElement;
  layers: Record<string, HTMLElement | null>;
  theme: ThemeConfig;
  tokens: MotionTokens;
  payload?: Record<string, unknown>;
};

export type AnimationResult = {
  status: 'completed' | 'cancelled';
  finalState?: Record<string, unknown>;
};

export interface AnimationModule {
  id: string;
  slot: AnimationSlot;
  variant: string;
  duration?: number;
  play: (ctx: AnimationContext) => Promise<AnimationResult>;
  stop?: () => void;
  dispose?: () => void;
}
