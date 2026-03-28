export const OVERVIEW_HERO_CAROUSEL_HEIGHT = 380;

/** Inset of image cards inside the carousel shelf (shelf stays flush to header). */
export const CAROUSEL_SHELL_PAD_H = 14;
export const CAROUSEL_SHELL_PAD_V = 12;
export const CAROUSEL_SHELL_PAD_BOTTOM = 18;

/** Card width as a fraction of screen — side peek shows neighbors (membership-style stack). */
export const CAROUSEL_CARD_WIDTH_FRACTION = 0.82;
export const CAROUSEL_CARD_MAX_WIDTH = 340;

/** Scale of off-center slides at rest (interpolates smoothly while swiping). */
export const CAROUSEL_FOCUS_SIDE_SCALE = 0.88;
/** Off-center slides fade slightly so the focused card reads clearly. */
export const CAROUSEL_FOCUS_SIDE_OPACITY = 0.78;

export function getCarouselCardWidth(screenWidth: number): number {
  return Math.round(Math.min(screenWidth * CAROUSEL_CARD_WIDTH_FRACTION, CAROUSEL_CARD_MAX_WIDTH));
}

/** Horizontal padding so the first/last card can sit in the viewport center. */
export function getCarouselContentInset(screenWidth: number, cardWidth: number): number {
  return (screenWidth - cardWidth) / 2;
}

/** Per-item scroll step (same as card width; items are flush). */
export function getOverviewHeroPageWidth(screenWidth: number): number {
  return getCarouselCardWidth(screenWidth);
}
