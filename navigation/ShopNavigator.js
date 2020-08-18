import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import { Platform } from 'react-native';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const Stack = createStackNavigator();

function ShopNavigator({ route }) {
  return (
    <Stack.Navigator
      initialRouteName="All products"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headertTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerBackTitleStyle: {
          fontFamily: 'open-sans',
        },
      }}
    >
      <Stack.Screen name="All products" component={ProductOverviewScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
}

export default ShopNavigator;
