import { SharedTransition } from 'react-native-reanimated';

// Use springify(ms) — .duration().springify() overwrites duration in Reanimated.
export const heroSharedTransition = SharedTransition.springify(560)
  .stiffness(200)
  .damping(26)
  .mass(0.92);
