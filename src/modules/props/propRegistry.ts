/** Stub: Ambient prop definitions. Will be populated in iteration 3. */
export type PropDef = {
  id: string;
  asset: string;
  depth: 'near' | 'mid' | 'far';
  position: { x: number; y: number };
};

export const defaultProps: PropDef[] = [];
