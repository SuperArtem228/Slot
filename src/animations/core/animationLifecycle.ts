import type { AnimationContext, AnimationResult } from './animationTypes';
import { animationRegistry } from './animationRegistry';

export async function playAnimation(
  animationId: string,
  ctx: AnimationContext,
): Promise<AnimationResult> {
  const mod = animationRegistry.resolve(animationId);
  if (!mod) {
    console.warn(`[AnimationLifecycle] Module not found: ${animationId}`);
    return { status: 'completed' };
  }
  try {
    return await mod.play(ctx);
  } catch (err) {
    console.error(`[AnimationLifecycle] Error in ${animationId}:`, err);
    return { status: 'cancelled' };
  }
}

export function stopAnimation(animationId: string): void {
  const mod = animationRegistry.resolve(animationId);
  mod?.stop?.();
}

export function disposeAnimation(animationId: string): void {
  const mod = animationRegistry.resolve(animationId);
  mod?.dispose?.();
}
