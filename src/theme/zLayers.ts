export const zLayers = {
  background: 0,
  backgroundFx: 10,
  ambientBack: 20,
  slotFrame: 30,
  reels: 40,
  glassOverlay: 45,
  impactFx: 50,
  ambientFront: 60,
  hud: 70,
  statusCopy: 75,
  rewardMorph: 80,
  rewardCard: 90,
  finalCta: 100,
} as const;

export type ZLayers = typeof zLayers;
