//  purchase order actions

import axios from "axios";
import {
  PURCHASE_ORDER_LIST_REQUEST,
  PURCHASE_ORDER_LIST_SUCCESS,
  PURCHASE_ORDER_LIST_FAIL,
  PURCHASE_ORDER_DETAILS_REQUEST,
  PURCHASE_ORDER_DETAILS_SUCCESS,
  PURCHASE_ORDER_DETAILS_FAIL,
  PURCHASE_ORDER_DELETE_REQUEST,
  PURCHASE_ORDER_DELETE_SUCCESS,
  PURCHASE_ORDER_DELETE_FAIL,
  PURCHASE_ORDER_CREATE_REQUEST,
  PURCHASE_ORDER_CREATE_SUCCESS,
  PURCHASE_ORDER_CREATE_FAIL,
  PURCHASE_ORDER_UPDATE_REQUEST,
  PURCHASE_ORDER_UPDATE_SUCCESS,
  PURCHASE_ORDER_UPDATE_FAIL,
} from "../constant/PurchaseOrderConstants";

export const listPurchaseOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PURCHASE_ORDER_LIST_REQUEST.toString(),
    });

    const { data } = await axios.get(`purchase/get_purchase_orders`, {
      withCredentials: true,
    });

    dispatch({
      type: PURCHASE_ORDER_LIST_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PURCHASE_ORDER_LIST_FAIL.toString(),
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPurchaseOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PURCHASE_ORDER_DETAILS_REQUEST.toString(),
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/purchaseOrders/${id}`, config);

    dispatch({
      type: PURCHASE_ORDER_DETAILS_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PURCHASE_ORDER_DETAILS_FAIL.toString(),
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePurchaseOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PURCHASE_ORDER_DELETE_REQUEST.toString(),
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/purchaseOrders/${id}`, config);

    dispatch({
      type: PURCHASE_ORDER_DELETE_SUCCESS.toString(),
    });
  } catch (error) {
    dispatch({
      type: PURCHASE_ORDER_DELETE_FAIL.toString(),
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPurchaseOrder =
  (OrderData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PURCHASE_ORDER_CREATE_REQUEST.toString(),
      });
      const create_purchase_order_data = await axios
        .post(
          `purchase/create_purchase_order`,
          { OrderData },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          return res.data;
        });

      dispatch({
        type: PURCHASE_ORDER_CREATE_SUCCESS.toString(),
        payload: create_purchase_order_data,
      });
    } catch (error) {
      dispatch({
        type: PURCHASE_ORDER_CREATE_FAIL.toString(),
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updatePurchaseOrder =
  (purchaseOrder) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PURCHASE_ORDER_UPDATE_REQUEST.toString(),
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/purchaseOrders/${purchaseOrder._id}`,
        purchaseOrder,
        config
      );

      dispatch({
        type: PURCHASE_ORDER_UPDATE_SUCCESS.toString(),
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PURCHASE_ORDER_UPDATE_FAIL.toString(),
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
