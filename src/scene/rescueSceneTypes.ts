export type RescueSceneState =
  | 'preload'
  | 'intro'
  | 'ready_attempt_1'
  | 'spin_1'
  | 'near_miss_1'
  | 'ready_attempt_2'
  | 'spin_2'
  | 'near_miss_2'
  | 'ready_attempt_3'
  | 'spin_3_charge'
  | 'spin_3'
  | 'final_lock'
  | 'jackpot_burst'
  | 'reward_morph'
  | 'reward_reveal'
  | 'reward_hold'
  | 'closing';

export type AttemptNumber = 1 | 2 | 3;

export type AttemptOutcome = 'near_miss_soft' | 'near_miss_hard' | 'win';

export type AttemptConfig = {
  id: string;
  ctaLabel: string;
  spinStart: string;
  spinCore: string;
  result?: string;
  spinCharge?: string;
  finalLock?: string;
  burst?: string;
  morph?: string;
  rewardSettle?: string;
  finalCopy?: string;
  finalCta?: string;
  copy?: {
    title: string;
    subtitle: string;
  };
};

export type RewardConfig = {
  title: string;
  value: string;
  subtitle: string;
  ctaLabel: string;
};

export type SceneConfig = {
  intro: {
    assemble: string;
    hud: string;
    frameWake: string;
    ambient: string[];
  };
  attempts: AttemptConfig[];
  reward: RewardConfig;
};
