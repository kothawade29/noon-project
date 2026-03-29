export const OVERVIEW_HERO_CAROUSEL_HEIGHT = 380;

export const CAROUSEL_SHELL_PAD_H = 14;
export const CAROUSEL_SHELL_PAD_V = 12;
export const CAROUSEL_SHELL_PAD_BOTTOM = 18;

export const CAROUSEL_CARD_WIDTH_FRACTION = 0.82;
export const CAROUSEL_CARD_MAX_WIDTH = 340;

export const CAROUSEL_FOCUS_SIDE_SCALE = 0.88;
export const CAROUSEL_FOCUS_SIDE_OPACITY = 0.78;

export function getCarouselCardWidth(screenWidth: number): number {
  return Math.round(Math.min(screenWidth * CAROUSEL_CARD_WIDTH_FRACTION, CAROUSEL_CARD_MAX_WIDTH));
}

export function getCarouselContentInset(screenWidth: number, cardWidth: number): number {
  return (screenWidth - cardWidth) / 2;
}

export function getOverviewHeroPageWidth(screenWidth: number): number {
  return getCarouselCardWidth(screenWidth);
}
