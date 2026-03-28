import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartAnchor } from '../../../navigation/CartAnchorContext';
import { useAddToCart, useAppStore, useCatalogProductById } from '../../../store';
import { colors } from '../../../theme/colors';
import type { RootStackParamList } from '../../../navigation/types';
import {
  FlyingThumbnailOverlay,
  type FlightPayload,
} from '../components/FlyingThumbnailOverlay';
import { ProductImageCarousel } from '../components/ProductImageCarousel';
import { ProductOverviewActions, shouldSkipFlightAnimation } from '../components/ProductOverviewActions';
import { ProductOverviewMeta } from '../components/ProductOverviewMeta';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductOverview'>;

export function ProductOverviewScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  const product = useCatalogProductById(productId);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { cartAnchorRef } = useCartAnchor();
  const addToCart = useAddToCart();

  const addToCartSourceRef = useRef<View>(null);
  const flightNonceRef = useRef(0);
  const interactionRef = useRef(false);

  const [flight, setFlight] = useState<FlightPayload | null>(null);
  const [adding, setAdding] = useState(false);

  const endInteraction = useCallback(() => {
    interactionRef.current = false;
    setAdding(false);
  }, []);

  const onFlightFinished = useCallback(() => {
    setFlight(null);
    endInteraction();
  }, [endInteraction]);

  const handleAddToCart = useCallback(async () => {
    if (interactionRef.current) return;
    interactionRef.current = true;
    setAdding(true);
    addToCart(productId);

    const failSoft = () => {
      setTimeout(endInteraction, 420);
    };

    const skipMotion = await shouldSkipFlightAnimation();
    if (skipMotion) {
      failSoft();
      return;
    }

    const tryFly = () => {
      const src = addToCartSourceRef.current;
      const cart = cartAnchorRef.current;
      if (!src || !cart) {
        failSoft();
        return;
      }
      src.measureInWindow((sx, sy, sw, sh) => {
        if (sw <= 1 || sh <= 1) {
          failSoft();
          return;
        }
        cart.measureInWindow((tx, ty, tw, th) => {
          if (tw <= 1 || th <= 1) {
            failSoft();
            return;
          }
          const endSize = 38;
          const toX = tx + tw / 2 - endSize / 2;
          const toY = ty + th / 2 - endSize / 2;
          /** Square only: button measure is a wide rect — center a square on it so width/height never diverge. */
          const fromSize = Math.min(sw, sh);
          const fromMidX = sx + sw / 2;
          const fromMidY = sy + sh / 2;
          const fromX = fromMidX - fromSize / 2;
          const fromY = fromMidY - fromSize / 2;
          flightNonceRef.current += 1;
          const line = useAppStore.getState().getProductById(productId);
          const uri = line?.images[0];
          if (!uri) {
            failSoft();
            return;
          }
          setFlight({
            nonce: flightNonceRef.current,
            uri,
            from: { x: fromX, y: fromY, width: fromSize, height: fromSize },
            to: { x: toX, y: toY, width: endSize, height: endSize },
          });
        });
      });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(tryFly);
    });
  }, [addToCart, cartAnchorRef, endInteraction, productId]);

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
    <View style={styles.root}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        <ProductImageCarousel uris={product.images} screenWidth={width} productId={product.id} />
        <ProductOverviewMeta product={product} />
        <ProductOverviewActions
          ref={addToCartSourceRef}
          onAddToCart={handleAddToCart}
          busy={adding}
        />
      </ScrollView>
      <FlyingThumbnailOverlay payload={flight} onFinished={onFlightFinished} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  empty: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
});
