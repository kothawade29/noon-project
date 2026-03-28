import { forwardRef, memo } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';

type Props = {
  onAddToCart: () => void;
  busy: boolean;
};

export const ProductOverviewActions = memo(
  forwardRef<View, Props>(function ProductOverviewActions({ onAddToCart, busy }, ref) {
    return (
      <View style={styles.block}>
        <View ref={ref} collapsable={false} style={styles.buttonMeasure}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              (pressed || busy) && styles.buttonPressed,
              busy && styles.buttonBusy,
            ]}
            onPress={onAddToCart}
            disabled={busy}
            accessibilityRole="button"
            accessibilityLabel="Add to cart"
            accessibilityHint="Adds this product to your cart"
            accessibilityState={{ busy }}
          >
            <Text style={styles.buttonLabel}>{busy ? 'Adding…' : 'Add to cart'}</Text>
          </Pressable>
        </View>
      </View>
    );
  }),
);

export async function shouldSkipFlightAnimation(): Promise<boolean> {
  try {
    return await AccessibilityInfo.isReduceMotionEnabled();
  } catch {
    return false;
  }
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 22,
    paddingTop: 20,
    alignItems: 'center',
  },
  buttonMeasure: {
    alignSelf: 'stretch',
  },
  button: {
    backgroundColor: colors.actionFill,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.88,
  },
  buttonBusy: {
    backgroundColor: colors.actionDisabled,
  },
  buttonLabel: {
    color: colors.actionLabel,
    fontSize: 16,
    fontWeight: '700',
  },
});
