import { companyReducer } from "../reduser/CompanyReducer";

//  company actions

import axios from "axios";
import {
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAIL,
  CLEAR_ERRORS,
  GET_COMPANY_BYID_FAIL,
  GET_COMPANY_BYID_REQUEST,
  GET_COMPANY_BYID_SUCCESS,
} from "../constant/CompanyConstants";

//  get company details
export const getCompanyDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COMPANY_REQUEST.toString() });

    let data = await axios
      .get("auth/getauthsCompany", {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      });

    dispatch({
      type: GET_COMPANY_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMPANY_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

export const getCompanyById = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMPANY_BYID_REQUEST.toString() });
    let data = await axios
      .get(`company/get_company/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      });
    dispatch({
      type: GET_COMPANY_BYID_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMPANY_BYID_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};

//  clear errors
