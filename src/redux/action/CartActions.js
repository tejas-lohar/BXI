import axios from "axios";
import {
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  REMOVE_FROM_CART_SUCCESS,
  REMOVE_FROM_CART_FAIL,
  REMOVE_FROM_CART_REQUEST,
  GET_CART_DATA_REQUEST,
  GET_CART_DATA_SUCCESS,
  GET_CART_DATA_FAIL,
} from "../constant/CartConstants";

export const get_Cart_Items = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CART_DATA_REQUEST.toString() });
    const data = await axios
      .get(`product/get_cart_products`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      });

    dispatch({
      type: GET_CART_DATA_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_DATA_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

export const Add_To_Cart = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADD_TO_CART_REQUEST.toString() });
    const { data } = await axios.post(
      `product/add_to_cart`,
      {
        id,
      },
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: ADD_TO_CART_SUCCESS.toString(),
      payload: {
        product: data.product._id,
        name: data.product.name,
      },
    });
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

export const Remove_From_Cart = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_FROM_CART_REQUEST.toString() });
    dispatch({
      type: REMOVE_FROM_CART_SUCCESS.toString(),
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_CART_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
