//  Logged in company actions
import axios from "axios";
import {
  GET_LOGGED_COMPANY_REQUEST,
  GET_LOGGED_COMPANY_SUCCESS,
  GET_LOGGED_COMPANY_FAIL,
} from "../../reduser/Company/GetLoggedCompany";

//  get logged company details
export const getLoggedCompanyDetails = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LOGGED_COMPANY_REQUEST.toString() });

    let data = await axios
      .get("company/get_logged_in_company", {
        withCredentials: true,
      })
      .then((res) => {
        return res?.data;
      });

    dispatch({
      type: GET_LOGGED_COMPANY_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LOGGED_COMPANY_FAIL.toString(),
      payload: error?.response?.data?.message,
    });
  }
};
