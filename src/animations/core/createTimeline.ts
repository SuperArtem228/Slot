import gsap from 'gsap';

export type TimelineOptions = {
  id?: string;
  defaults?: gsap.TweenVars;
  onComplete?: () => void;
};

export function createTimeline(options?: TimelineOptions): gsap.core.Timeline {
  return gsap.timeline({
    paused: true,
    defaults: options?.defaults,
    onComplete: options?.onComplete,
  });
}

/** Plays a timeline and returns a promise that resolves on complete or rejects on kill. */
export function playTimeline(tl: gsap.core.Timeline): Promise<'completed' | 'cancelled'> {
  return new Promise((resolve) => {
    const origComplete = tl.eventCallback('onComplete');
    tl.eventCallback('onComplete', () => {
      if (typeof origComplete === 'function') origComplete();
      resolve('completed');
    });
    tl.play();
  });
}
