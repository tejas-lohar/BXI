import axios from "axios";
import {
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAIL,
} from "../../reduser/Profile/Edit-Profile";

export const EditProfile = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_PROFILE_REQUEST.toString() });

    const {
      companyName,
      email,
      companyRegisteredAddress,
      city,
      pincode,
      phone,
      bankAccountNo,
      ifsc,
      branchName,
    } = formdata;

    const config = { headers: { "Content-Type": "application/json" } };
    let link = `company/editcompany`;

    const { data } = await axios.put(
      link,
      {
        companyName,
        email,
        companyRegisteredAddress,
        city,
        pincode,
        phone,
        bankAccountNo,
        ifsc,
        branchName,
      },
      { withCredentials: true },
      config
    );

    dispatch({
      type: EDIT_PROFILE_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PROFILE_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
