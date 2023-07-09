import axios from "axios";

import {
  PRODUCT_ANAYLSIS_REQUEST,
  PRODUCT_ANAYLSIS_SUCCESS,
  PRODUCT_ANAYLSIS_FAIL,
} from "../../reduser/Products/ProductAnalysis";

import {
    PRODUCT_ANAYLSISUPDATE_REQUEST,
    PRODUCT_ANAYLSISUPDATE_SUCCESS,
    PRODUCT_ANAYLSISUPDATE_FAIL,
  } from "../../reduser/Products/ProductAnalysisUpdate";

export const ProductAnalysiss = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ANAYLSIS_REQUEST.toString() });

    let link = `product/productanalysis`;

    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({
      type: PRODUCT_ANAYLSIS_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ANAYLSIS_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};


export const ProductAnalysisUpdate = (id, ProductViewCount, ProductAddToCardCount) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_ANAYLSISUPDATE_REQUEST.toString() });

    let link = `product/productanalysis`;
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      link,
      { id, ProductViewCount, ProductAddToCardCount },
      { withCredentials: true },
      config
    );
    dispatch({
      type: PRODUCT_ANAYLSISUPDATE_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_ANAYLSISUPDATE_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

