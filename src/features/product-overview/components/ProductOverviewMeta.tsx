import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../theme/colors';
import { ProductCategoryBadge } from '../../../shared/components/product/ProductCategoryBadge';
import { ProductName } from '../../../shared/components/product/ProductName';
import { ProductPrice } from '../../../shared/components/product/ProductPrice';
import type { Product } from '../../../shared/types/product';

type Props = {
  product: Product;
};

export const ProductOverviewMeta = memo(function ProductOverviewMeta({ product }: Props) {
  return (
    <View style={styles.block}>
      <ProductCategoryBadge category={product.category} />
      <ProductName name={product.name} numberOfLines={3} size="large" />
      <ProductPrice price={product.price} size="large" />
    </View>
  );
});

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 8,
    gap: 14,
    backgroundColor: colors.canvas,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
});
