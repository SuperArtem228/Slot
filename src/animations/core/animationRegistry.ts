import type { AnimationModule, AnimationSlot } from './animationTypes';

type RegistryMap = Partial<Record<AnimationSlot, Record<string, AnimationModule>>>;

const registry: RegistryMap = {};

export function registerAnimation(mod: AnimationModule): void {
  if (!registry[mod.slot]) {
    registry[mod.slot] = {};
  }
  registry[mod.slot]![mod.id] = mod;
}

export function getAnimation(slot: AnimationSlot, id: string): AnimationModule | undefined {
  return registry[slot]?.[id];
}

export function getAnimationsForSlot(slot: AnimationSlot): AnimationModule[] {
  const slotModules = registry[slot];
  return slotModules ? Object.values(slotModules) : [];
}

export function resolveAnimation(id: string): AnimationModule | undefined {
  for (const slot of Object.values(registry)) {
    if (slot && slot[id]) return slot[id];
  }
  return undefined;
}

export const animationRegistry = {
  register: registerAnimation,
  get: getAnimation,
  getForSlot: getAnimationsForSlot,
  resolve: resolveAnimation,
};
