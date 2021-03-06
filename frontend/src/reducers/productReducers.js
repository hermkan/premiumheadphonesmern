import {
  SIDE_DRAWER_CLOSE,
  SIDE_DRAWER_OPEN,
  CART_DRAWER_CLOSE,
  CART_DRAWER_OPEN,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_SINGLE_PRODUCT_REQUEST,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_FAILED,
  HIDE_NAVBAR,
  SHOW_NAVBAR,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} from '../actions';

const productsListReducer = (state, action) => {
  switch (action.type) {
    case HIDE_NAVBAR: {
      return { ...state, hideNav: true };
    }
    case SHOW_NAVBAR: {
      return { ...state, hideNav: false };
    }
    case SIDE_DRAWER_OPEN: {
      return { ...state, isSideDrawerOpen: true };
    }
    case SIDE_DRAWER_CLOSE: {
      return { ...state, isSideDrawerOpen: false };
    }
    case CART_DRAWER_OPEN: {
      return { ...state, isCartDrawerOpen: true };
    }
    case CART_DRAWER_CLOSE: {
      return { ...state, isCartDrawerOpen: false };
    }
    case GET_PRODUCTS_REQUEST: {
      return { ...state, products_loading: true };
    }
    case GET_PRODUCTS_SUCCESS: {
      const featured_products = action.payload.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        products_loading: false,
        products: action.payload,
        featured_products,
      };
    }
    case GET_PRODUCTS_FAILED: {
      return {
        ...state,
        products_loading: false,
        products_error: action.payload,
      };
    }

    case GET_SINGLE_PRODUCT_REQUEST: {
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
      };
    }
    case GET_SINGLE_PRODUCT_SUCCESS: {
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload,
      };
    }
    case GET_SINGLE_PRODUCT_FAILED: {
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      };
    }
    case PRODUCT_DELETE_REQUEST:
      return { ...state, product_delete_loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        product_delete_loading: false,
        product_delete_success: true,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        ...state,
        product_delete_loading: false,
        product_delete_error: action.payload,
      };
    case PRODUCT_CREATE_REQUEST:
      return { ...state, product_create_loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        product_create_loading: false,
        product_create_success: true,
        product: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        product_create_loading: false,
        product_create_error: action.payload,
      };
    case PRODUCT_CREATE_RESET:
      return {};

    case PRODUCT_UPDATE_REQUEST:
      return { ...state, product_update_loading: true };

    case PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        product_update_loading: false,
        product_update_success: true,
        product: action.payload,
      };

    case PRODUCT_UPDATE_FAIL:
      return {
        ...state,
        product_update_loading: false,
        product_update_error: action.payload,
      };

    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    default: {
      throw new Error(`No matching ${action.type} action type`);
    }
  }
};

// export const productUpdateReducer = (state = { product: {} }, action) => {
//   switch (action.type) {
//     case PRODUCT_UPDATE_REQUEST:
//       return { loading: true };
//     case PRODUCT_UPDATE_SUCCESS:
//       return { loading: false, success: true, product: action.payload };
//     case PRODUCT_UPDATE_FAIL:
//       return { loading: false, error: action.payload };
//     case PRODUCT_UPDATE_RESET:
//       return { product: {} };
//     default:
//       return state;
//   }
// };

// export const productReviewCreateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PRODUCT_CREATE_REVIEW_REQUEST:
//       return { loading: true };
//     case PRODUCT_CREATE_REVIEW_SUCCESS:
//       return { loading: false, success: true };
//     case PRODUCT_CREATE_REVIEW_FAIL:
//       return { loading: false, error: action.payload };
//     case PRODUCT_CREATE_REVIEW_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

// export const productTopRatedReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case PRODUCT_TOP_REQUEST:
//       return { loading: true, products: [] };
//     case PRODUCT_TOP_SUCCESS:
//       return { loading: false, products: action.payload };
//     case PRODUCT_TOP_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

export default productsListReducer;
