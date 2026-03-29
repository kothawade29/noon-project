import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';
import { colors } from '../../../theme/colors';
import { heroSharedTransition } from './heroSharedTransition';

export type ProductHeroImageVariant = 'grid';

type Props = {
  uri: string;
  productId: string;
  variant: ProductHeroImageVariant;
  width: number;
};

function frameStyleForVariant(variant: ProductHeroImageVariant, width: number) {
  switch (variant) {
    case 'grid':
      return {
        width,
        height: width,
        borderRadius: 14,
        overflow: 'hidden' as const,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
      };
  }
}

export const ProductHeroImage = memo(function ProductHeroImage({
  uri,
  productId,
  variant,
  width,
}: Props) {
  const tag = `hero-${productId}`;
  const frameStyle = frameStyleForVariant(variant, width);

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
