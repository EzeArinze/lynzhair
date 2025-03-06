export const HAIR_CATEGORIES = [
  "Straight hair",
  "Wavy hair",
  "Curly hair",
  "Coily hair",
  "Afro-textured hair",
  "Wigs",
  "Brazilian hair",
  "Peruvian hair",
  "Indian hair",
  "Malaysian hair",
  "Closure & Frontals",
] as const;

export type HairCategory = (typeof HAIR_CATEGORIES)[number];

export const dummy_categories = [
  "All",
  "Straight hair",
  "Wavy hair",
  "Curly hair",
  "Coily hair",
  "Afro-textured hair",
  "Wigs",
  "Brazilian hair",
  "Peruvian hair",
  "Indian hair",
  "Malaysian hair",
  "Closure & Frontals",
];
