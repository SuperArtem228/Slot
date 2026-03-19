/**
 * Stub: analytics event bridge.
 * Will be implemented in iteration 5.
 */

export function trackEvent(event: string, payload?: Record<string, unknown>): void {
  console.log(`[Analytics] ${event}`, payload);
}
