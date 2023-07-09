import axios from "axios";
import {
  wishlist_Request,
  wishlist_Success,
  wishlist_Fail,
  removeWishlist_Request,
  removeWishlist_Success,
  removeWishlist_Fail,
} from "../../reduser/WishlistReducer/Wishlist";

import {
  addWishlist_Request,
  addWishlist_Success,
  addWishlist_Fail,
} from "../../reduser/WishlistReducer/AddWishlist";

export const addWishlist = (id) => async (dispatch) => {
  try {
    dispatch({ type: addWishlist_Request.toString() });
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
      type: addWishlist_Success.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: addWishlist_Fail.toString(),
      payload: error.response.data.message,
    });
  }
};

export const removeWishlist = (id) => async (dispatch) => {
  try {
    dispatch({ type: removeWishlist_Request });
    let data = await axios
      .delete(`wishlist/delete_wishlist_product/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      });
    dispatch({
      type: removeWishlist_Success,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: removeWishlist_Fail,
      payload: error.response.data.message,
    });
  }
};
