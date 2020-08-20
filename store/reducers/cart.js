import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      if (state.items[addedProduct.id]) {
        const updateCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].totalAmount + productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updateCartItem },
          totalAmount: state.totalAmount + productPrice,
        };
      } else {
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice,
        };
      }
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId];
      let updatedCartItems;
      if (selectedCartItem.quantity > 1) {
        const newCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.totalAmount - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.productId]: newCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
  }
  return state;
};
