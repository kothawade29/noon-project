import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { ProductCategoryBadge } from '../../../shared/components/product/ProductCategoryBadge';
import { ProductHeroImage } from '../../../shared/components/product/ProductHeroImage';
import { ProductName } from '../../../shared/components/product/ProductName';
import { ProductPrice } from '../../../shared/components/product/ProductPrice';
import type { Product } from '../../../shared/types/product';

type Props = {
  product: Product;
  width: number;
  onPress: () => void;
};

export const ProductGridItem = memo(function ProductGridItem({ product, width, onPress }: Props) {
  const uri = product.images[0];
  return (
    <Pressable onPress={onPress} style={[styles.wrap, { width }]} accessibilityRole="button">
      <ProductHeroImage uri={uri} productId={product.id} variant="grid" width={width} />
      <View style={styles.meta}>
        <ProductCategoryBadge category={product.category} />
        <ProductName name={product.name} numberOfLines={2} size="small" />
        <ProductPrice price={product.price} size="small" />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 16,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    paddingBottom: 12,
    overflow: 'hidden',
  },
  meta: {
    marginTop: 10,
    paddingHorizontal: 10,
    gap: 6,
  },
});
