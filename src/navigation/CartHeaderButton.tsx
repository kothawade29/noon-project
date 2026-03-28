import { memo, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useAppStore } from '../store/appStore';
import { colors } from '../theme/colors';
import { useCartAnchor } from './CartAnchorContext';

export const CartHeaderButton = memo(function CartHeaderButton() {
  const { cartAnchorRef } = useCartAnchor();
  const count = useAppStore((s) => s.cartLineItems.length);
  const pulseId = useAppStore((s) => s.cartBadgePulseId);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (pulseId === 0) return;
    scale.value = 1;
    scale.value = withSequence(
      withSpring(1.2, { damping: 11, stiffness: 520 }),
      withSpring(1, { damping: 14, stiffness: 380 }),
    );
  }, [pulseId, scale]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      ref={cartAnchorRef}
      collapsable={false}
      style={styles.anchor}
      accessibilityLabel={`Shopping cart, ${count} items`}
    >
      <Animated.View style={[styles.iconCluster, pulseStyle]}>
        <Ionicons name="bag-handle-outline" size={24} color={colors.headerTint} />
        {count > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText} numberOfLines={1}>
              {count > 99 ? '99+' : String(count)}
            </Text>
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  anchor: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCluster: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: colors.actionFill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.actionLabel,
    fontSize: 10,
    fontWeight: '700',
  },
});
