// company type actions
import axios from "axios";

import {
  GET_COMPANY_TYPE_REQUEST,
  GET_COMPANY_TYPE_SUCCESS,
  GET_COMPANY_TYPE_FAIL,
} from "../../reduser/Company/CompanyTypeReducer";

export const getCompanyType = () => async (dispatch) => {
  try {
    dispatch({ type: GET_COMPANY_TYPE_REQUEST.toString() });
    let data = await axios
      .get("company_type/get_companyTypes", {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      });
    dispatch({
      type: GET_COMPANY_TYPE_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COMPANY_TYPE_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
