export const motionDurations = {
  tap: 0.16,
  micro: 0.22,
  fast: 0.35,
  base: 0.55,
  medium: 0.8,
  slow: 1.1,
  dramatic: 1.4,
  introAssemble: 0.9,
  frameWake: 0.6,
  hudReveal: 0.45,
  spinSoft: 1.6,
  spinHeavy: 1.9,
  spinFinal: 2.1,
  nearMissSoft: 0.95,
  nearMissHard: 1.2,
  finalLock: 0.38,
  jackpotBurst: 1.05,
  rewardMorph: 0.9,
  rewardSettle: 0.7,
} as const;

export const motionEasing = {
  ui: 'power2.out',
  uiSoft: 'sine.out',
  softInOut: 'sine.inOut',
  objectFloat: 'sine.inOut',
  frameWake: 'power2.out',
  spinStart: 'power3.out',
  spinCruise: 'none',
  spinSlowdownSoft: 'power3.out',
  spinSlowdownHard: 'expo.out',
  finalLock: 'power4.out',
  reveal: 'expo.out',
  settle: 'power2.out',
} as const;

export const motionScale = {
  ctaPress: 0.97,
  ctaIdleMax: 1.02,
  frameImpactMax: 1.015,
  rewardPopMax: 1.03,
} as const;

export const glowLevels = {
  idle: 0.2,
  active: 0.4,
  charged: 0.65,
  nearMiss: 0.75,
  jackpot: 1,
  rewardHold: 0.35,
} as const;

export type MotionTokens = {
  durations: typeof motionDurations;
  easing: typeof motionEasing;
  scale: typeof motionScale;
  glow: typeof glowLevels;
};

export const motionTokens: MotionTokens = {
  durations: motionDurations,
  easing: motionEasing,
  scale: motionScale,
  glow: glowLevels,
};
