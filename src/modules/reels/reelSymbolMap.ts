export type SymbolDef = {
  id: string;
  label: string;
  tier: 'high' | 'mid' | 'low';
  asset: string; // path relative to /assets/symbols/
};

export const reelSymbolMap: Record<string, SymbolDef> = {
  crown:   { id: 'crown',   label: 'Crown',   tier: 'high', asset: '/assets/symbols/symbol_crown_emerald.png' },
  bonus:   { id: 'bonus',   label: 'Bonus',   tier: 'high', asset: '/assets/symbols/symbol_bonus_orb_emerald.png' },
  chest:   { id: 'chest',   label: 'Chest',   tier: 'mid',  asset: '/assets/symbols/symbol_treasure_chest_emerald.png' },
  '500FS': { id: '500FS',   label: '500 FS',  tier: 'high', asset: '/assets/symbols/symbol_bonus_orb_emerald.png' },
  cup:     { id: 'cup',     label: 'Cup',     tier: 'mid',  asset: '/assets/symbols/symbol_trophy_silver_blue.png' },
  pig:     { id: 'pig',     label: 'Pig',     tier: 'low',  asset: '/assets/symbols/symbol_vip_badge_emerald.png' },
  tickets: { id: 'tickets', label: 'Tickets', tier: 'low',  asset: '/assets/symbols/symbol_gift_box_violet.png' },
};
