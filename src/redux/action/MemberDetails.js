//  redux action for MemberDetails
import axios from "axios";
import {
  MEMBER_DETAILS_REQUEST,
  MEMBER_DETAILS_SUCCESS,
  MEMBER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constant/MemberDetails";

export const getMemberDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEMBER_DETAILS_REQUEST.toString() });
    const { data } = await axios.get(`/api/v1/members/${id}`);
    dispatch({
      type: MEMBER_DETAILS_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEMBER_DETAILS_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
