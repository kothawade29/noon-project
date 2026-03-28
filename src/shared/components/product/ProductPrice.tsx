import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../../theme/colors';
import { formatProductPrice } from '../../utils/formatCurrency';

type Props = {
  price: number;
  size?: 'small' | 'large';
};

export const ProductPrice = memo(function ProductPrice({ price, size = 'large' }: Props) {
  return (
    <Text style={size === 'small' ? styles.small : styles.large}>{formatProductPrice(price)}</Text>
  );
});

const styles = StyleSheet.create({
  small: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textMuted,
  },
  large: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
});
