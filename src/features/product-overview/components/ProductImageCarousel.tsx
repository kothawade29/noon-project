import { useCallback, useMemo } from 'react';
import { StyleSheet, View, type ListRenderItemInfo } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { ProductCarouselSlide } from './ProductCarouselSlide';
import { colors } from '../../../theme/colors';
import {
  CAROUSEL_SHELL_PAD_BOTTOM,
  CAROUSEL_SHELL_PAD_H,
  CAROUSEL_SHELL_PAD_V,
  getCarouselContentInset,
  getOverviewHeroPageWidth,
  OVERVIEW_HERO_CAROUSEL_HEIGHT,
} from '../utils/carouselLayout';

type Props = {
  uris: readonly string[];
  screenWidth: number;
  productId: string;
};

export function ProductImageCarousel({ uris, screenWidth, productId }: Props) {
  const trackWidth = screenWidth - 2 * CAROUSEL_SHELL_PAD_H;
  const pageWidth = useMemo(() => getOverviewHeroPageWidth(trackWidth), [trackWidth]);
  const contentInset = useMemo(
    () => getCarouselContentInset(trackWidth, pageWidth),
    [trackWidth, pageWidth],
  );
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<string>) => (
      <ProductCarouselSlide
        uri={item}
        index={index}
        scrollX={scrollX}
        pageWidth={pageWidth}
        height={OVERVIEW_HERO_CAROUSEL_HEIGHT}
        productId={productId}
        isSharedHero={index === 0}
      />
    ),
    [pageWidth, productId, scrollX],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: pageWidth,
      offset: pageWidth * index,
      index,
    }),
    [pageWidth],
  );

  const keyExtractor = useCallback((item: string, index: number) => `${index}-${item}`, []);

  return (
    <View
      style={[
        styles.shell,
        {
          width: screenWidth,
          paddingHorizontal: CAROUSEL_SHELL_PAD_H,
          paddingTop: CAROUSEL_SHELL_PAD_V,
          paddingBottom: CAROUSEL_SHELL_PAD_BOTTOM,
        },
      ]}
    >
      <Animated.FlatList
        data={uris as string[]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={pageWidth}
        snapToAlignment="start"
        decelerationRate="fast"
        bounces={false}
        disableIntervalMomentum
        nestedScrollEnabled
        scrollEventThrottle={1}
        onScroll={scrollHandler}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews={false}
        style={{ width: trackWidth }}
        contentContainerStyle={{
          paddingHorizontal: contentInset,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    overflow: 'hidden',
    backgroundColor: colors.carouselShelf,
  },
});
