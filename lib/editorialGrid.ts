export type CardSize = "md" | "wide" | "tall";

/** Hand-curated "spreads" cycled in order — never randomized or index-alternated. */
const ROW_TEMPLATES: CardSize[][] = [
  ["md", "md", "wide"],
  ["wide", "tall"],
  ["tall", "md", "md"],
];

export const SIZE_SPAN: Record<CardSize, string> = {
  md: "aspect-[4/5] lg:aspect-auto lg:col-span-4 lg:row-span-1",
  wide: "aspect-[16/9] lg:aspect-auto lg:col-span-8 lg:row-span-1",
  tall: "aspect-[3/4] lg:aspect-auto lg:col-span-4 lg:row-span-2",
};

/** Deterministically assigns a card size to every project by flattening the
 *  repeating ROW_TEMPLATES sequence across however many projects exist. */
export function buildEditorialLayout(count: number): CardSize[] {
  const sizes: CardSize[] = [];
  let templateIndex = 0;
  while (sizes.length < count) {
    sizes.push(...ROW_TEMPLATES[templateIndex % ROW_TEMPLATES.length]);
    templateIndex += 1;
  }
  return sizes.slice(0, count);
}
