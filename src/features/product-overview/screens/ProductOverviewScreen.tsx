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
import {
  ADD_TO_CART_END_INTERACTION_DELAY_MS,
  FLIGHT_LANDING_THUMB_SIZE_PX,
  MEASURE_INVALID_MAX_PX,
} from '../constants/addToCartFlight';

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
      setTimeout(endInteraction, ADD_TO_CART_END_INTERACTION_DELAY_MS);
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
        if (sw <= MEASURE_INVALID_MAX_PX || sh <= MEASURE_INVALID_MAX_PX) {
          failSoft();
          return;
        }
        cart.measureInWindow((tx, ty, tw, th) => {
          if (tw <= MEASURE_INVALID_MAX_PX || th <= MEASURE_INVALID_MAX_PX) {
            failSoft();
            return;
          }
          const endSize = FLIGHT_LANDING_THUMB_SIZE_PX;
          const toX = tx + tw / 2 - endSize / 2;
          const toY = ty + th / 2 - endSize / 2;
          // Button bounds are non-square; min side + center keeps the flying thumb square end-to-end.
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
