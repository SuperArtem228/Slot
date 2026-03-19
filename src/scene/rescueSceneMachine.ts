import type { RescueSceneState } from './rescueSceneTypes';

/** Valid transitions map. Key = current state, Value = allowed next states. */
const transitions: Record<RescueSceneState, RescueSceneState[]> = {
  preload: ['intro'],
  intro: ['ready_attempt_1'],
  ready_attempt_1: ['spin_1'],
  spin_1: ['near_miss_1'],
  near_miss_1: ['ready_attempt_2'],
  ready_attempt_2: ['spin_2'],
  spin_2: ['near_miss_2'],
  near_miss_2: ['ready_attempt_3'],
  ready_attempt_3: ['spin_3_charge'],
  spin_3_charge: ['spin_3'],
  spin_3: ['final_lock'],
  final_lock: ['jackpot_burst'],
  jackpot_burst: ['reward_morph'],
  reward_morph: ['reward_reveal'],
  reward_reveal: ['reward_hold'],
  reward_hold: ['closing'],
  closing: [],
};

export type StateChangeListener = (
  newState: RescueSceneState,
  prevState: RescueSceneState,
) => void;

export class RescueSceneMachine {
  private _state: RescueSceneState = 'preload';
  private _listeners: StateChangeListener[] = [];

  get state(): RescueSceneState {
    return this._state;
  }

  canTransitionTo(next: RescueSceneState): boolean {
    return transitions[this._state]?.includes(next) ?? false;
  }

  transition(next: RescueSceneState): boolean {
    if (!this.canTransitionTo(next)) {
      console.warn(
        `[StateMachine] Invalid transition: ${this._state} -> ${next}`,
      );
      return false;
    }
    const prev = this._state;
    this._state = next;
    this._listeners.forEach((fn) => fn(next, prev));
    return true;
  }

  onStateChange(listener: StateChangeListener): () => void {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }

  reset(): void {
    this._state = 'preload';
  }
}
