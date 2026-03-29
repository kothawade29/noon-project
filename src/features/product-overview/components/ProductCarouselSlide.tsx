import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated, { type SharedValue } from 'react-native-reanimated';
import { heroSharedTransition } from '../../../shared/components/product/heroSharedTransition';
import { colors } from '../../../theme/colors';
import { useCarouselSlideFocusStyle } from '../hooks/useCarouselSlideFocusStyle';

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
  const focusStyle = useCarouselSlideFocusStyle(scrollX, index, pageWidth);

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
