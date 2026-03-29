import { useCallback, useRef, useState, type RefObject } from 'react';
import type { View } from 'react-native';
import { useAddToCart, useAppStore } from '../../../store';
import { shouldSkipFlightAnimation } from '../utils/shouldSkipFlightAnimation';
import type { FlightPayload } from '../components/FlyingThumbnailOverlay';
import {
  ADD_TO_CART_END_INTERACTION_DELAY_MS,
  FLIGHT_LANDING_THUMB_SIZE_PX,
  MEASURE_INVALID_MAX_PX,
} from '../constants/addToCartFlight';

type Result = {
  sourceRef: RefObject<View | null>;
  flight: FlightPayload | null;
  adding: boolean;
  onFlightFinished: () => void;
  handleAddToCart: () => Promise<void>;
};

export function useAddToCartFlight(
  productId: string,
  cartAnchorRef: RefObject<View | null>,
): Result {
  const addToCart = useAddToCart();
  const sourceRef = useRef<View>(null);
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
      const src = sourceRef.current;
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
          // Button measure is non-square; min side + center keeps the flying thumb square.
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

  return {
    sourceRef,
    flight,
    adding,
    onFlightFinished,
    handleAddToCart,
  };
}
