import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';
import { colors } from '../../../theme/colors';
import { heroSharedTransition } from './heroSharedTransition';

type Props = {
  uri: string;
  productId: string;
  variant: 'grid' | 'detail';
  width: number;
  detailHeight?: number;
};

export const ProductHeroImage = memo(function ProductHeroImage({
  uri,
  productId,
  variant,
  width,
  detailHeight = 360,
}: Props) {
  const tag = `hero-${productId}`;
  const frameStyle =
    variant === 'grid'
      ? {
          width,
          height: width,
          borderRadius: 14,
          overflow: 'hidden' as const,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
        }
      : { width, height: detailHeight, borderRadius: 0, overflow: 'hidden' as const };

  return (
    <Animated.View
      sharedTransitionTag={tag}
      sharedTransitionStyle={heroSharedTransition}
      style={frameStyle}
    >
      <Image
        source={{ uri }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        cachePolicy="memory-disk"
        recyclingKey={uri}
      />
    </Animated.View>
  );
});
