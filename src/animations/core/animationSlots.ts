import type { AnimationSlot } from './animationTypes';

export const ANIMATION_SLOTS: Record<AnimationSlot, { label: string; description: string }> = {
  intro: { label: 'Intro Assemble', description: 'Scene entry animation' },
  ambient: { label: 'Ambient Loop', description: 'Idle breathing, drifts' },
  hud: { label: 'HUD Reveal', description: 'Header/attempts entry' },
  ctaIdle: { label: 'CTA Idle Pulse', description: 'Button idle breathing' },
  ctaPress: { label: 'CTA Press', description: 'Button press response' },
  spinStart: { label: 'Spin Start', description: 'Ignition on attempt start' },
  spinCore: { label: 'Spin Core', description: 'Main reel spin motion' },
  nearMiss: { label: 'Near Miss', description: 'Almost-win emphasis' },
  nearMissCopy: { label: 'Near Miss Copy', description: 'Status text after near miss' },
  attemptProgress: { label: 'Attempt Progress', description: 'HUD update between attempts' },
  backgroundCharge: { label: 'Background Charge', description: 'BG intensification' },
  finalCharge: { label: 'Final Charge', description: 'Pre-final-spin charge' },
  finalLock: { label: 'Final Lock', description: 'Reel lock impact' },
  jackpotBurst: { label: 'Jackpot Burst', description: 'Peak energy burst' },
  rewardMorph: { label: 'Reward Morph', description: 'Slot to reward transition' },
  rewardSettle: { label: 'Reward Settle', description: 'Card settle into place' },
  finalCopy: { label: 'Final Copy', description: 'Reward text settle' },
  finalCta: { label: 'Final CTA', description: 'Final action button emphasis' },
  rewardHold: { label: 'Reward Hold', description: 'Hold final scene stable' },
};
