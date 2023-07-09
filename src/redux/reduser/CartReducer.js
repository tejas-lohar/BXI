import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  CLEAR_ERRORS,
  // CLEAR_CART_SUCCESS,
  // CLEAR_CART_FAIL,
  // CLEAR_CART_REQUEST,
  GET_CART_DATA_FAIL,
  GET_CART_DATA_REQUEST,
  GET_CART_DATA_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
} from "../constant/CartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case GET_CART_DATA_REQUEST:
      return {
        loading: true,
      };
    case GET_CART_DATA_SUCCESS:
      return {
        loading: false,
        cartItems: action.payload,
      };
    case GET_CART_DATA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const addToCartReducer = (state = { cartItem: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        loading: true,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        loading: false,
        isAdded: action.payload,
      };
    case ADD_TO_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const removeFromCartReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_FROM_CART_REQUEST:
      return {
        loading: true,
      };
    case REMOVE_FROM_CART_SUCCESS:
      return {
        loading: false,
        isRemoved: action.payload,
      };
    case REMOVE_FROM_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
