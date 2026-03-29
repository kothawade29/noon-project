import { SharedTransition } from 'react-native-reanimated';

export const heroSharedTransition = SharedTransition.springify(560)
  .stiffness(200)
  .damping(26)
  .mass(0.92);
