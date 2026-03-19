/**
 * Placeholder for GSAP timeline factory.
 * Will be implemented in Iteration 2 when GSAP is added.
 * For now, provides a stub interface.
 */

export type TimelineOptions = {
  id?: string;
  onComplete?: () => void;
};

// Stub — will wrap gsap.timeline() in iteration 2
export function createTimeline(_options?: TimelineOptions) {
  return {
    play: () => Promise.resolve(),
    pause: () => {},
    kill: () => {},
  };
}
