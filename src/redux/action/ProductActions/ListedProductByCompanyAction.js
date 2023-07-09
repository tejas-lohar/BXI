import {
  ListedProductsByCompanyReceived,
  ListedProductsByCompanyRequested,
  ListedProductsByCompanyRequestFailed,
  ListedDraftProductsByCompanyReceived,
  ListedDraftProductsByCompanyRequestFailed,
  ListedDraftProductsByCompanyRequested,
  AllListedProductByCompanyReceived,
  AllListedProductByCompanyRequested,
  AllListedProductByCompanyRequestFailed,
} from "../../reduser/ProductReducer/ListedProductsByCompany";

import axios from "axios";

export const ListedProductsByCompanyAction = (page=1) => async (dispatch) => {
  try {
    dispatch({ type: ListedProductsByCompanyRequested.toString() });
    let data = await axios
      .get(`product/get_product_bySellerCompanyId?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
    dispatch({
      type: ListedProductsByCompanyReceived.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ListedProductsByCompanyRequestFailed.toString(),
      payload: error.response.data.message,
    });
  }
};

export const ListedDraftProductsByCompanyAction = (page=1) => async (dispatch) => {
  try {
    dispatch({ type: ListedDraftProductsByCompanyRequested.toString() });
    let data = await axios
      .get(`product/get_listed_draft_product?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
    dispatch({
      type: ListedDraftProductsByCompanyReceived.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ListedDraftProductsByCompanyRequestFailed.toString(),
      payload: error.response.data.message,
    });
  }
};

export const AllListedProductByCompanyAction = (page=1) => async (dispatch) => {
  try {
    dispatch({ type: AllListedProductByCompanyRequested.toString() });
    let data = await axios
      .get(`product/get_product_byCompanyId?page=${page}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        return res.data;
      });
    dispatch({
      type: AllListedProductByCompanyReceived.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AllListedProductByCompanyRequestFailed.toString(),
      payload: error.response.data.message,
    });
  }
};
