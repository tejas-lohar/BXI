import axios from "axios";
import {
  ORDER_TRACKING_REQUEST,
  ORDER_TRACKING_SUCCESS,
  ORDER_TRACKING_FAIL,
} from "../../reduser/Order-Tracking/Order-Tracking-Status";

export const OrderTracking = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_TRACKING_REQUEST.toString() });
    console.log("id", id);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const link = `order/order-status/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: ORDER_TRACKING_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_TRACKING_FAIL.toString(),
      payload: error.response?.data?.message || "An error occurred.",
    });
  }
};
