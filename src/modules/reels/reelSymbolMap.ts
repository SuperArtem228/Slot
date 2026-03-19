export type SymbolDef = {
  id: string;
  label: string;
  tier: 'high' | 'mid' | 'low';
};

export const reelSymbolMap: Record<string, SymbolDef> = {
  crown: { id: 'crown', label: 'Crown', tier: 'high' },
  bonus: { id: 'bonus', label: 'Bonus', tier: 'high' },
  chest: { id: 'chest', label: 'Chest', tier: 'mid' },
  '500FS': { id: '500FS', label: '500 FS', tier: 'high' },
  cup: { id: 'cup', label: 'Cup', tier: 'mid' },
  pig: { id: 'pig', label: 'Pig', tier: 'low' },
  tickets: { id: 'tickets', label: 'Tickets', tier: 'low' },
};
