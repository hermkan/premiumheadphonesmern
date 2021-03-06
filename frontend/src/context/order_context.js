import React, { useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import { useUserContext } from './user_context';

import reducer from '../reducers/orderReducers';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../actions';

// const getCartFromLocalStorage = () => {
//   let cart = localStorage.getItem('cart');
//   if (cart) {
//     return JSON.parse(localStorage.getItem('cart'));
//   } else {
//     return [];
//   }
// };

const initialState = {
  order: {},
  loading: false,
  success: false,
  error: false,
  orderItems: [],
  shippingAddress: {},
  myOrders: [],
};

const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userInfo, logout } = useUserContext();

  const createOrder = async (order) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(`/api/orders`, order, config);
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const getOrderDetails = async (id) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);

      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const payOrder = async (orderId, paymentResult) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });
      const config = {
        'Content-Type': 'application/json',
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const payReset = () => {
    dispatch({
      type: ORDER_PAY_RESET,
    });
  };

  const listMyOrders = async () => {
    try {
      dispatch({
        type: ORDER_LIST_MY_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/myorders`, config);

      dispatch({
        type: ORDER_LIST_MY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        logout();
      }
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: message,
      });
    }
  };

  const listOrders = async () => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders`, config);

      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_LIST_FAIL,
        payload: message,
      });
    }
  };

  const deliverOrder = async (order) => {
    try {
      dispatch({
        type: ORDER_DELIVER_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        config
      );

      dispatch({
        type: ORDER_DELIVER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload: message,
      });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        createOrder,
        getOrderDetails,
        payOrder,
        payReset,
        listMyOrders,
        listOrders,
        deliverOrder,
      }}>
      {children}
    </OrderContext.Provider>
  );
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrderContext);
};
export { OrderContext };
