import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { debug } from "react-native-reanimated";
import Order from "../../models/order";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return (
            <OrderItem
              amount={itemData.item.totalAmount}
              date={itemData.item.readableDate}
              items={itemData.item.items}
            />
          );
        }}
      />
    </View>
  );
};

export default OrdersScreen;
