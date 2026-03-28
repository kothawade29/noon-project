import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { heroSharedTransition } from '../../../shared/components/product/heroSharedTransition';
import { colors } from '../../../theme/colors';
import {
  CAROUSEL_FOCUS_SIDE_OPACITY,
  CAROUSEL_FOCUS_SIDE_SCALE,
} from '../utils/carouselLayout';

type Props = {
  uri: string;
  index: number;
  scrollX: SharedValue<number>;
  pageWidth: number;
  height: number;
  productId: string;
  isSharedHero: boolean;
};

export const ProductCarouselSlide = memo(function ProductCarouselSlide({
  uri,
  index,
  scrollX,
  pageWidth,
  height,
  productId,
  isSharedHero,
}: Props) {
  const focusStyle = useAnimatedStyle(() => {
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

  const frame = {
    width: pageWidth,
    height,
    overflow: 'hidden' as const,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  };

  const inner = (
    <Animated.View style={[StyleSheet.absoluteFill, focusStyle]}>
      <Image
        source={{ uri }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        cachePolicy="memory-disk"
        recyclingKey={uri}
      />
    </Animated.View>
  );

  if (isSharedHero) {
    return (
      <Animated.View
        sharedTransitionTag={`hero-${productId}`}
        sharedTransitionStyle={heroSharedTransition}
        style={frame}
      >
        {inner}
      </Animated.View>
    );
  }

  return <Animated.View style={frame}>{inner}</Animated.View>;
});
