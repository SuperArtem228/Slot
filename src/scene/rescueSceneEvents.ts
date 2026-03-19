export type SceneEvent =
  | 'iframe_loaded'
  | 'intro_shown'
  | 'attempt_1_clicked'
  | 'attempt_1_near_miss'
  | 'attempt_2_clicked'
  | 'attempt_2_near_miss'
  | 'attempt_3_clicked'
  | 'reward_revealed'
  | 'final_cta_clicked'
  | 'scene_closed';

type EventListener = (event: SceneEvent, payload?: Record<string, unknown>) => void;

class SceneEventBus {
  private listeners: EventListener[] = [];

  emit(event: SceneEvent, payload?: Record<string, unknown>): void {
    console.log(`[SceneEvent] ${event}`, payload);
    this.listeners.forEach((fn) => fn(event, payload));
  }

  subscribe(listener: EventListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const sceneEventBus = new SceneEventBus();
