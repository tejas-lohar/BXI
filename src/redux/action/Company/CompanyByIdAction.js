//  company by id action

import axios from "axios";

import {
  COMPANY_BY_ID_FAIL,
  COMPANY_BY_ID_REQUEST,
  COMPANY_BY_ID_SUCCESS,
  CLEAR_ERRORS,
  GET_COMPANY_FAIL,
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
} from "../../reduser/CompanyReducer";

export const CompanyById = (id) => async (dispatch) => {
  console.log("id", id);
  try {
    dispatch({ type: COMPANY_BY_ID_REQUEST.toString() });

    const { data } = await axios.get(`company/get_company/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: COMPANY_BY_ID_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COMPANY_BY_ID_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS.toString(),
  });
};
