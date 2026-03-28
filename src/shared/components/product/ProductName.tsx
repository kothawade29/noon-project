import { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../../../theme/colors';

type Props = {
  name: string;
  numberOfLines?: number;
  size?: 'small' | 'large';
};

export const ProductName = memo(function ProductName({ name, numberOfLines = 2, size = 'large' }: Props) {
  return (
    <Text style={size === 'small' ? styles.small : styles.large} numberOfLines={numberOfLines}>
      {name}
    </Text>
  );
});

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  large: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
});
