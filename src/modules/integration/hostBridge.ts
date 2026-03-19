/**
 * Stub: host <-> iframe communication bridge.
 * Will be implemented in iteration 5.
 */

export type HostInitPayload = {
  locale: 'ru' | 'en';
  theme: string;
  soundEnabled: boolean;
  reward: {
    title: string;
    value: string;
    subtitle: string;
    ctaLabel: string;
  };
};

export function initHostBridge(): void {
  // stub: will listen for postMessage from host
}

export function sendToHost(event: string, data?: Record<string, unknown>): void {
  // stub: will postMessage to parent
  console.log(`[HostBridge] -> ${event}`, data);
}
