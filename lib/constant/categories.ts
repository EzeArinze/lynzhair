export const HAIR_CATEGORIES = [
  "Straight hair",
  "Wavy hair",
  "Curly hair",
  "Coily hair",
  "Afro-textured hair",
  "Thick hair",
  "Wigs",
] as const;

export type HairCategory = (typeof HAIR_CATEGORIES)[number];
