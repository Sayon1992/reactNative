import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, TouchableOpacity, View } from "react-native";

import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import OrdersScreen from "../screens/shop/OrdersScreen";
import ShopNavigator from "./ShopNavigator";
import { createStackNavigator } from "@react-navigation/stack";

const StackDrawer = createDrawerNavigator();
const StackOrders = createStackNavigator();

const OrderStackScreen = ({ navigation }) => (
  <StackOrders.Navigator
    initialRouteName="OrderScreen"
    ScreenOptions={{
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headertTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      headerBackTitleStyle: {
        fontFamily: "open-sans",
      },
    }}
  >
    <StackOrders.Screen
      name="OrderScreen"
      component={OrdersScreen}
      options={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headertTintColor: Platform.OS === "android" ? "white" : Colors.primary,
        headerBackTitleStyle: {
          fontFamily: "open-sans",
        },
        headerLeft: () => (
          <TouchableOpacity>
            <Ionicons
              name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              size={23}
              color={Platform.OS === "android" ? "white" : Colors.primary}
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </TouchableOpacity>
        ),
        title: "Orders",
      }}
    />
  </StackOrders.Navigator>
);

const ShopDrawerNavigator = () => {
  return (
    <StackDrawer.Navigator
      initialRouteName="Products"
      drawerContentOptio
      ns={{
        activeTintColor: Colors.primary,
      }}
    >
      <StackDrawer.Screen
        name="Products"
        component={ShopNavigator}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <StackDrawer.Screen
        name="OrderStackScreen"
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={color}
            />
          ),
          title: "Your Orders",
        }}
        component={OrderStackScreen}
      />
    </StackDrawer.Navigator>
  );
};

export default ShopDrawerNavigator;
