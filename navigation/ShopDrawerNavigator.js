import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Platform, TouchableOpacity, View } from "react-native";

import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

import EditProductScreen from "../screens/user/EditProductScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductScreen from "../screens/user/UserProductScreen";

import ShopNavigator from "./ShopNavigator";
import { createStackNavigator } from "@react-navigation/stack";

const StackDrawer = createDrawerNavigator();
const StackOrders = createStackNavigator();
const StackAdmin = createStackNavigator();

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

const AdminStackScreen = ({ navigation }) => {
  return (
    <StackAdmin.Navigator initialRouteName="AdminScreen">
      <StackAdmin.Screen
        name="AdminScreen"
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headertTintColor:
            Platform.OS === "android" ? "white" : Colors.primary,
          headerBackTitleStyle: {
            fontFamily: "open-sans",
          },
          headerTitle: "Your Products",
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
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons
                name={Platform.OS === "android" ? "md-create" : "ios-create"}
                size={23}
                color={Platform.OS === "android" ? "white" : Colors.primary}
                style={{ marginRight: 10 }}
                onPress={() => {
                  navigation.navigate("EditProductScreen");
                }}
              />
            </TouchableOpacity>
          ),
        })}
        component={UserProductScreen}
      />
      <StackAdmin.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={({ navigation, route }) => ({
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headertTintColor:
            Platform.OS === "android" ? "white" : Colors.primary,
          headerBackTitleStyle: {
            fontFamily: "open-sans",
          },
          headerRight: () => (
            <TouchableOpacity>
              <Ionicons
                name={
                  Platform.OS === "android"
                    ? "md-checkbox-outline"
                    : "ios-checkbox-outline"
                }
                size={23}
                color={Platform.OS === "android" ? "white" : Colors.primary}
                style={{ marginRight: 10 }}
                onPress={() => {
                  if (route.params?.submit) {
                    const { submit } = route.params;
                    submit();
                    navigation.goBack();
                  }
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </StackAdmin.Navigator>
  );
};

const ShopDrawerNavigator = () => {
  return (
    <StackDrawer.Navigator
      initialRouteName="Products"
      drawerContentOptions={{
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
      <StackDrawer.Screen
        name="AdminScreen"
        component={AdminStackScreen}
        options={{
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={color}
            />
          ),
          title: "Admin",
        }}
      />
    </StackDrawer.Navigator>
  );
};

export default ShopDrawerNavigator;
