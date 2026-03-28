import { useCallback } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCatalogProducts } from '../../../store';
import { colors } from '../../../theme/colors';
import type { Product } from '../../../shared/types/product';
import type { RootStackParamList } from '../../../navigation/types';
import { ProductGridItem } from '../components/ProductGridItem';
import { GRID_COLUMN_GAP, GRID_HORIZONTAL_PAD, getGridItemWidth } from '../utils/gridLayout';

export function ProductListScreen() {
  const products = useCatalogProducts();
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const itemWidth = getGridItemWidth(width);

  const onPressItem = useCallback(
    (id: string) => {
      navigation.navigate('ProductOverview', { productId: id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductGridItem product={item} width={itemWidth} onPress={() => onPressItem(item.id)} />
    ),
    [itemWidth, onPressItem],
  );

  return (
    <View style={[styles.screen, { paddingBottom: insets.bottom }]}>
      <FlatList
        data={products as Product[]}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        columnWrapperStyle={{ gap: GRID_COLUMN_GAP, marginBottom: 0 }}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: GRID_HORIZONTAL_PAD, paddingTop: 12 },
        ]}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={8}
        windowSize={7}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  listContent: {
    paddingBottom: 24,
  },
});
