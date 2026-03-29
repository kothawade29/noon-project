/** When add-to-cart skips the flight (reduce motion, missing refs, bad measure), release UI after this delay. */
export const ADD_TO_CART_END_INTERACTION_DELAY_MS = 420;

/** Flying thumbnail size when it lands on the cart icon (square). */
export const FLIGHT_LANDING_THUMB_SIZE_PX = 38;

/** measureInWindow often returns 0 (or tiny values) before layout; treat as invalid. */
export const MEASURE_INVALID_MAX_PX = 1;
