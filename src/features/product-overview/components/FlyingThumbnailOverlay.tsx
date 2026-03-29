import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

export type FlightRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FlightPayload = {
  nonce: number;
  uri: string;
  from: FlightRect;
  to: FlightRect;
};

type Props = {
  payload: FlightPayload | null;
  onFinished: () => void;
};

const DURATION_MS = 900;

export function FlyingThumbnailOverlay({ payload, onFinished }: Props) {
  const progress = useSharedValue(0);
  const fx = useSharedValue(0);
  const fy = useSharedValue(0);
  const fw = useSharedValue(0);
  const fh = useSharedValue(0);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const tw = useSharedValue(0);
  const th = useSharedValue(0);

  useEffect(() => {
    if (!payload) return;
    fx.value = payload.from.x;
    fy.value = payload.from.y;
    fw.value = payload.from.width;
    fh.value = payload.from.height;
    tx.value = payload.to.x;
    ty.value = payload.to.y;
    tw.value = payload.to.width;
    th.value = payload.to.height;
    progress.value = 0;
    progress.value = withTiming(
      1,
      { duration: DURATION_MS, easing: Easing.out(Easing.cubic) },
      (finished) => {
        if (finished) scheduleOnRN(onFinished);
      },
    );
  }, [payload]);

  const animatedStyle = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      position: 'absolute',
      left: fx.value + (tx.value - fx.value) * p,
      top: fy.value + (ty.value - fy.value) * p,
      width: fw.value + (tw.value - fw.value) * p,
      height: fh.value + (th.value - fh.value) * p,
      opacity: 0.98,
    };
  });

  if (!payload) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill} collapsable={false}>
      <Animated.View style={[animatedStyle, styles.thumb]}>
        <Image
          source={{ uri: payload.uri }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          cachePolicy="memory-disk"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  thumb: {
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 9999,
    elevation: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.2)',
  },
});
