import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Platform, TouchableOpacity, View } from "react-native";

import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import CartScreen from "../screens/shop/CartScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";

const Stack = createStackNavigator();

function ShopNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName="All products"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headertTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
      }}
    >
      <Stack.Screen
        name="All products"
        component={ProductOverviewScreen}
        options={({ navigation }) => ({
          headerTitle: "All Products",
          headerRight: () => (
            <View>
              <TouchableOpacity>
                <Ionicons
                  name="md-cart"
                  size={23}
                  color={Platform.OS === "android" ? "white" : Colors.primary}
                  style={{ marginRight: 20 }}
                  onPress={() => {
                    navigation.navigate("CartScreen");
                  }}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
    </Stack.Navigator>
  );
}

export default ShopNavigator;
