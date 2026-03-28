/**
 * Dark theme — cool graphite base, elevated surfaces, readable contrast.
 */
export const colors = {
  /** App background, scroll areas */
  canvas: '#0b0e14',
  /** Hero band + nav header (continuous with carousel shell) */
  carouselShelf: '#12161e',
  /** Product cards, raised panels */
  surface: '#171c26',

  text: '#f2f5fa',
  textSecondary: '#b6becd',
  textMuted: '#8b95a8',

  border: '#2a3344',

  badgeBg: '#252e3f',
  badgeText: '#c5cede',

  /** Native header (stack) */
  headerTint: '#c4cddc',
  headerTitle: '#f2f5fa',
} as const;
