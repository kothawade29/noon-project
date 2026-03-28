import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductListScreen } from '../features/product-list/screens/ProductListScreen';
import { ProductOverviewScreen } from '../features/product-overview/screens/ProductOverviewScreen';
import { colors } from '../theme/colors';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.carouselShelf },
        headerTintColor: colors.headerTint,
        headerTitleStyle: { color: colors.headerTitle, fontWeight: '600', fontSize: 17 },
        contentStyle: { backgroundColor: colors.canvas },
      }}
    >
      <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Shop' }} />
      <Stack.Screen name="ProductOverview" component={ProductOverviewScreen} />
    </Stack.Navigator>
  );
}
