export const layoutTokens = {
  scene: {
    baseWidth: 390,
    baseHeight: 844,
    minWidth: 360,
    maxWidth: 430,
  },
  safeArea: {
    top: 16,
    bottom: 24,
    left: 16,
    right: 16,
  },
  slotFrame: {
    widthRatio: 0.88,
    heightRatio: 0.32,
    topOffset: 0.22,
  },
  hud: {
    topOffset: 12,
    height: 80,
  },
  cta: {
    bottomOffset: 48,
    height: 56,
    width: 280,
  },
  rewardCard: {
    widthRatio: 0.85,
    maxWidth: 340,
  },
} as const;

export type LayoutTokens = typeof layoutTokens;
