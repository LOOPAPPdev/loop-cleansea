/** Layer 1 — tokens that JavaScript needs. Keep in sync with tokens.css. */
export const breakpoints = { sm: 640, md: 900, lg: 1100 } as const;

export type Tone = "blue" | "purple" | "green" | "slate";
/** Card tone rotation used by grids: blue → purple → green → slate. */
export const toneRotation: Tone[] = ["blue", "purple", "green", "slate"];
