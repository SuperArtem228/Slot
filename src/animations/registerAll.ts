import { animationRegistry } from './core/animationRegistry';

// Intro
import { intro_assemble_v1 } from './intro/intro_assemble_v1';
import { hud_intro_reveal_v1 } from './intro/hud_intro_reveal_v1';
import { frame_wake_up_v1 } from './intro/frame_wake_up_v1';

// Ambient
import { ambient_idle_loop_v1 } from './ambient/ambient_idle_loop_v1';
import { floating_props_drift_v1 } from './ambient/floating_props_drift_v1';
import { chrome_shimmer_v1 } from './ambient/chrome_shimmer_v1';

// CTA
import { cta_idle_pulse_v1 } from './cta/cta_idle_pulse_v1';
import { cta_press_response_v1 } from './cta/cta_press_response_v1';
import { final_cta_emphasis_v1 } from './cta/final_cta_emphasis_v1';

// Spin
import { spin_start_ignite_v1 } from './spin/spin_start_ignite_v1';
import { spin_start_ignite_v2 } from './spin/spin_start_ignite_v2';
import { spin_start_ignite_final_v3 } from './spin/spin_start_ignite_final_v3';
import { reel_spin_soft_v1 } from './spin/reel_spin_soft_v1';
import { reel_spin_heavy_v1 } from './spin/reel_spin_heavy_v1';
import { final_spin_charge_v1 } from './spin/final_spin_charge_v1';
import { final_reel_spin_v1 } from './spin/final_reel_spin_v1';
import { final_lock_impact_v1 } from './spin/final_lock_impact_v1';

// Near miss
import { near_miss_soft_v1 } from './near-miss/near_miss_soft_v1';
import { near_miss_hard_v1 } from './near-miss/near_miss_hard_v1';
import { near_miss_copy_reveal_v1 } from './near-miss/near_miss_copy_reveal_v1';

// Reward
import { jackpot_burst_v1 } from './reward/jackpot_burst_v1';
import { reward_morph_v1 } from './reward/reward_morph_v1';
import { reward_card_settle_v1 } from './reward/reward_card_settle_v1';
import { final_copy_settle_v1 } from './reward/final_copy_settle_v1';
import { reward_hold_stabilize_v1 } from './reward/reward_hold_stabilize_v1';

// Background
import { background_charge_up_v1 } from './background/background_charge_up_v1';
import { jackpot_burst_support_v1 } from './background/jackpot_burst_support_v1';

export function registerAllAnimations(): void {
  const modules = [
    intro_assemble_v1,
    hud_intro_reveal_v1,
    frame_wake_up_v1,
    ambient_idle_loop_v1,
    floating_props_drift_v1,
    chrome_shimmer_v1,
    cta_idle_pulse_v1,
    cta_press_response_v1,
    final_cta_emphasis_v1,
    spin_start_ignite_v1,
    spin_start_ignite_v2,
    spin_start_ignite_final_v3,
    reel_spin_soft_v1,
    reel_spin_heavy_v1,
    final_spin_charge_v1,
    final_reel_spin_v1,
    final_lock_impact_v1,
    near_miss_soft_v1,
    near_miss_hard_v1,
    near_miss_copy_reveal_v1,
    jackpot_burst_v1,
    reward_morph_v1,
    reward_card_settle_v1,
    final_copy_settle_v1,
    reward_hold_stabilize_v1,
    background_charge_up_v1,
    jackpot_burst_support_v1,
  ];

  modules.forEach((mod) => animationRegistry.register(mod));
}
