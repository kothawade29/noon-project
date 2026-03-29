import {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  CAROUSEL_FOCUS_SIDE_OPACITY,
  CAROUSEL_FOCUS_SIDE_SCALE,
} from '../utils/carouselLayout';

export function useCarouselSlideFocusStyle(
  scrollX: SharedValue<number>,
  index: number,
  pageWidth: number,
) {
  return useAnimatedStyle(() => {
    const x = scrollX.value;
    const w = pageWidth;
    const i = index;
    const input = [(i - 1) * w, i * w, (i + 1) * w];
    const scale = interpolate(
      x,
      input,
      [CAROUSEL_FOCUS_SIDE_SCALE, 1, CAROUSEL_FOCUS_SIDE_SCALE],
      Extrapolation.CLAMP,
    );
    const opacity = interpolate(
      x,
      input,
      [CAROUSEL_FOCUS_SIDE_OPACITY, 1, CAROUSEL_FOCUS_SIDE_OPACITY],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [{ scale }],
    };
  }, [index, pageWidth]);
}
