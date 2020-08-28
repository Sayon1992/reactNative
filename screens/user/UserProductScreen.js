import React from "react";
import { View, Button, FlatList, StyleSheet, Alert } from "react-native";

import Colors from "../../constants/Colors";

import ProductItem from "../../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    Alert.alert(
      "Are you sure?",
      "Do you want to permanently delete this item?",
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productActions.deleteProduct(id));
        },
      }
    );
  };

  return (
    <View>
      <FlatList
        data={userProducts}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return (
            <ProductItem
              image={itemData.item.image}
              title={itemData.item.title}
              price={itemData.item.price}
              onSelect={() => {
                props.navigation.navigate("EditProductScreen", {
                  productId: itemData.item.id,
                });
              }}
            >
              <Button
                color={Colors.primary}
                title="Edit"
                onPress={() => {
                  props.navigation.navigate("EditProductScreen", {
                    productId: itemData.item.id,
                  });
                }}
              />
              <Button
                color={Colors.primary}
                title="Delete"
                onPress={() => {
                  deleteHandler(itemData.item.id);
                }}
              />
            </ProductItem>
          );
        }}
      />
    </View>
  );
};

export default UserProductScreen;

const styles = StyleSheet.create({});
