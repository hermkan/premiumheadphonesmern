import {
  ADD_TO_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CLEAR_CART,
} from '../actions';

const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, name, image, price, quantity, countInStock } = action.payload;
      const existItem = state.cart.find((i) => i.id === id);
      if (existItem) {
        const tempCart = state.cart.map((item) => {
          if (item.id === id) {
            let newQuantity = Number(item.quantity) + quantity;
            if (newQuantity > countInStock) {
              newQuantity = countInStock;
            }
            return {
              ...item,
              quantity: newQuantity,
            };
          } else {
            return item;
          }
        });
        return {
          ...state,
          cart: tempCart,
        };
      } else {
        const newItem = {
          id,
          name,
          image,
          price,
          quantity,
          countInStock,
        };
        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }
    case REMOVE_CART_ITEM:
      const tempCart = state.cart.filter((i) => i.id !== action.payload);
      return {
        ...state,
        cart: tempCart,
      };
    case CLEAR_CART:
      return { ...state, cart: [] };

    case COUNT_CART_TOTALS:
      const { total_items, total_amount } = state.cart.reduce(
        (acc, curr) => {
          const { quantity, price } = curr;
          acc.total_items += quantity;
          acc.total_amount += price * quantity;
          return acc;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      return {
        ...state,
        total_items,
        total_amount,
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default: {
      throw new Error(`No matching ${action.type} action type`);
    }
  }
};
export default cartReducer;
