import {
  ORDER_SUMMARY_REQUEST,
  ORDER_SUMMARY_SUCCESS,
  ORDER_SUMMARY_FAIL,
  CLEAR_ERRORS,
} from "../reduser/OrderSummary";

import axios from "axios";

export const getOrderSummary = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_SUMMARY_REQUEST.toString() });

    let data = await axios
      .get(`purchase/get_order_summary_by_id/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      });

    dispatch({
      type: ORDER_SUMMARY_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_SUMMARY_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
