import type { SceneConfig } from './rescueSceneTypes';

export const rescueSceneConfig: SceneConfig = {
  intro: {
    assemble: 'intro_assemble_v1',
    hud: 'hud_intro_reveal_v1',
    frameWake: 'frame_wake_up_v1',
    ambient: [
      'ambient_idle_loop_v1',
      'floating_props_drift_v1',
      'chrome_shimmer_v1',
    ],
  },
  attempts: [
    {
      id: 'attempt_1',
      ctaLabel: 'Запустить',
      spinStart: 'spin_start_ignite_v1',
      spinCore: 'reel_spin_soft_v1',
      result: 'near_miss_soft_v1',
      copy: {
        title: 'Почти',
        subtitle: 'Осталось 2 попытки',
      },
    },
    {
      id: 'attempt_2',
      ctaLabel: 'Ещё раз',
      spinStart: 'spin_start_ignite_v2',
      spinCore: 'reel_spin_heavy_v1',
      result: 'near_miss_hard_v1',
      copy: {
        title: 'Ещё чуть-чуть',
        subtitle: 'Последняя попытка',
      },
    },
    {
      id: 'attempt_3',
      ctaLabel: 'Финальный спин',
      spinStart: 'spin_start_ignite_final_v3',
      spinCharge: 'final_spin_charge_v1',
      spinCore: 'final_reel_spin_v1',
      finalLock: 'final_lock_impact_v1',
      burst: 'jackpot_burst_v1',
      morph: 'reward_morph_v1',
      rewardSettle: 'reward_card_settle_v1',
      finalCopy: 'final_copy_settle_v1',
      finalCta: 'final_cta_emphasis_v1',
    },
  ],
  reward: {
    title: 'Second Bonus',
    value: 'До 500 FS',
    subtitle: 'Открыт шанс на реванш',
    ctaLabel: 'Пополнить',
  },
};
