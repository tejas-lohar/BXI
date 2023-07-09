import axios from "axios";
import {
  PROFILE_COMPLETION_REQUEST,
  PROFILE_COMPLETION_SUCCESS,
  PROFILE_COMPLETION_FAIL,
} from "../../reduser/Profile/Profile-Completion";

export const ProfileCompletions = () => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_COMPLETION_REQUEST.toString() });

    const config = { headers: { "Content-Type": "application/json" } };
    let link = `auth/profilecompletion`;

    const { data } = await axios.get(link, { withCredentials: true }, config);

    dispatch({
      type: PROFILE_COMPLETION_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_COMPLETION_FAIL.toString(),
      payload: error,
    });
  }
};
