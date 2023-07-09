import axios from "axios";

import {
  TOTAL_SALES_REQUEST,
  TOTAL_SALES_SUCCESS,
  TOTAL_SALES_FAIL,
} from "../../reduser/DashBoard/Total-Sales";

import {
  PURCHASE_SALES_REQUEST,
  PURCHASE_SALES_SUCCESS,
  PURCHASE_SALES_FAIL,
} from "../../reduser/DashBoard/Total-Purchase";

export const totalSalesData = () => async (dispatch) => {
  try {
    dispatch({ type: TOTAL_SALES_REQUEST.toString() });

    const config = { headers: { "Content-Type": "application/json" } };
    let link = `soldAndbrought/total-sales`;

    const { data } = await axios.get(link, { withCredentials: true }, config);

    dispatch({
      type: TOTAL_SALES_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_SALES_FAIL.toString(),
      payload: error.response,
    });
  }
};

export const totalPurchaseData = () => async (dispatch) => {
  try {
    dispatch({ type: PURCHASE_SALES_REQUEST.toString() });

    const config = { headers: { "Content-Type": "application/json" } };
    let link = `soldAndbrought/total-buy`;

    const { data } = await axios.get(link, { withCredentials: true }, config);

    dispatch({
      type: PURCHASE_SALES_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PURCHASE_SALES_FAIL.toString(),
      payload: error.response,
    });
  }
};
