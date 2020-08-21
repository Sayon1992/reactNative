import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { debug } from "react-native-reanimated";
import Order from "../../models/order";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          console.log(itemData);
          return <Text>{itemData.item.totalAmount}</Text>;
        }}
      />
    </View>
  );
};

export default OrdersScreen;
