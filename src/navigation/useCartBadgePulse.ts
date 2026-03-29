import { useEffect } from 'react';
import { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

export function useCartBadgePulseStyle(pulseId: number) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (pulseId === 0) return;
    scale.value = 1;
    scale.value = withSequence(
      withSpring(1.2, { damping: 11, stiffness: 520 }),
      withSpring(1, { damping: 14, stiffness: 380 }),
    );
  }, [pulseId, scale]);

  return useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
}
