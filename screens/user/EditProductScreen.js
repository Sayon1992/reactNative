import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as productActions from "../../store/actions/products";
import Input from "../../components/UI/Input";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";

import Colors from "../../constants/Colors";

const FORM_UPDATE = "FORM_UPDATE";

const formReducer = (state, action) => {
  console.log(action);
  if (action.type === FORM_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  let productId;
  const dispatch = useDispatch();

  const focus = useIsFocused();

  if (props.route.params) {
    productId = props.route.params.productId;
  }
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      image: editedProduct ? editedProduct.image : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      image: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error ocurred", error, [{ text: "OK" }]);
    }
  }, [error]);

  useFocusEffect(() => {
    props.navigation.setOptions({
      headerTitle: productId ? "Edit product" : "Add Product",
    });
    return () => {
      props.navigation.setOptions({
        headerTitle: "",
      });
    };
  }, []);

  const submitHandler = useCallback(async () => {
    // if (!formState.formIsValid) {
    //   Alert.alert("Wrong input", "Please check the errors in the form", [
    //     { text: "Okay" },
    //   ]);
    //   return;
    // }
    setError(null);
    setLoading(true);
    try {
      if (editedProduct) {
        await dispatch(
          productActions.updateProduct(
            productId,
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.image
          )
        );
      } else {
        await dispatch(
          productActions.createProduct(
            formState.inputValues.title,
            formState.inputValues.description,
            formState.inputValues.image,
            +formState.inputValues.price
          )
        );
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    if (focus) {
      props.navigation.setParams({ submit: submitHandler });
    }
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialvalue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="image"
            label="Image"
            errorText="Please enter a valid Image URL!"
            keyboardType="default"
            returnKeyType="next"
            initialValue={editedProduct ? editedProduct.image : ""}
            initiallyValid={!!editedProduct}
            required
            onInputChange={inputChangeHandler}
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              required
              min={0.1}
              onInputChange={inputChangeHandler}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            required
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            onInputChange={inputChangeHandler}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
