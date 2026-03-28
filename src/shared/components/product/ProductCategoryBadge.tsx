import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../theme/colors';

type Props = {
  category: string;
};

export const ProductCategoryBadge = memo(function ProductCategoryBadge({ category }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{category}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.badgeBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.badgeText,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});
