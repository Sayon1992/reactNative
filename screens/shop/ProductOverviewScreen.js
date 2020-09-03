import React, { useState, useEffect, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cardActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import Colors from "../../constants/Colors";

const ProductOverviewScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  const loadProducts = useCallback(async () => {
    setError(null);
    setRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    loadProducts().then(() => {
      setLoading(false);
    });
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const willFocus = props.navigation.addListener("focus", loadProducts);
    return () => {
      willFocus;
    };
  }, [loadProducts]);

  if (error) {
    return (
      <View style={styles.loadingSpinner}>
        <Text>An error ocurred</Text>
        <Button
          color={Colors.primary}
          title="try again"
          onPress={loadProducts}
        ></Button>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingSpinner}>
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <View style={styles.loadingSpinner}>
        <Text>No Products found</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        onRefresh={loadProducts}
        refreshing={refreshing}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.image}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={() => dispatch(cardActions.addToCart(itemData.item))}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingSpinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductOverviewScreen;
