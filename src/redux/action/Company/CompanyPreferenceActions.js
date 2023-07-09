import axios from "axios";
import {
  UPDATE_COMPANY_DATA_FAIL,
  UPDATE_COMPANY_DATA_REQUEST,
  UPDATE_COMPANY_DATA_SUCCESS,
} from "../../reduser/Company/CompanyPreference";

export const UpdateCompanyPreference = (prefrencedata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COMPANY_DATA_REQUEST.toString() });

    let link = `company/updatecompanypereference`;

    const { data } = await axios.put(
      link,
      { prefrencedata },
      { withCredentials: true }
    );

    dispatch({
      type: UPDATE_COMPANY_DATA_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_COMPANY_DATA_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
