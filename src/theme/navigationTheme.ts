import { DarkTheme } from '@react-navigation/native';
import { colors } from './colors';

export const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.textSecondary,
    background: colors.canvas,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: DarkTheme.colors.notification,
  },
};
