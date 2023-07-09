import axios from "axios";
import {
  ALL_WISHLIST_FAIL,
  ALL_WISHLIST_REQUEST,
  ALL_WISHLIST_SUCCESS,
  CLEAR_ERRORS,
  ADD_WISHLIST_FAIL,
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_SUCCESS,
  REMOVE_WISHLIST_FAIL,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_SUCCESS,
} from "../constant/Wishlist";

// Get All Products
export const get_Wishlist = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_WISHLIST_REQUEST.toString() });

    let data = await axios
      .get("wishlist/get_wishlist_product", {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      });

    dispatch({
      type: ALL_WISHLIST_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_WISHLIST_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

export const addWishlist = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_WISHLIST_REQUEST.toString() });
    let data = await axios
      .post(
        "wishlist/add_to_wishlist",
        { id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        return res.data;
      });
    dispatch({
      type: ADD_WISHLIST_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_WISHLIST_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

export const removeWishlist = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_WISHLIST_REQUEST.toString() });
    let data = await axios
      .delete(`wishlist/delete_wishlist_product/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      });
    dispatch({
      type: REMOVE_WISHLIST_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_WISHLIST_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS.toString() });
};
