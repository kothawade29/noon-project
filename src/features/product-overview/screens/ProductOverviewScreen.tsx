import { useEffect, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCatalogProductById } from '../../../store';
import { colors } from '../../../theme/colors';
import type { RootStackParamList } from '../../../navigation/types';
import { ProductImageCarousel } from '../components/ProductImageCarousel';
import { ProductOverviewMeta } from '../components/ProductOverviewMeta';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductOverview'>;

export function ProductOverviewScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const product = useCatalogProductById(productId);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product?.name ?? ' ',
      headerStyle: { backgroundColor: colors.carouselShelf },
      headerTintColor: colors.headerTint,
      headerTitleStyle: { color: colors.headerTitle, fontWeight: '600', fontSize: 17 },
    });
  }, [navigation, product?.name]);

  useEffect(() => {
    if (!product) {
      navigation.goBack();
    }
  }, [product, navigation]);

  if (!product) {
    return <View style={styles.empty} />;
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      showsVerticalScrollIndicator={false}
    >
      <ProductImageCarousel uris={product.images} screenWidth={width} productId={product.id} />
      <ProductOverviewMeta product={product} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  empty: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
});
