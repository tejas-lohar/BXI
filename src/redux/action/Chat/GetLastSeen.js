import axios from "axios";
import {
  GET_LASTSEEN_REQUEST,
  GET_LASTSEEN_SUCCESS,
  GET_LASTSEEN_FAIL,
} from "../../reduser/Chat/GetLastSeen";

export const GetLastSeens = (login_User) => async (dispatch) => {
  try {
    dispatch({ type: GET_LASTSEEN_REQUEST.toString() });

    const config = { headers: { "Content-Type": "application/json" } };
    let link = `support/lastseen?loginUser=${login_User}`;

    const { data } = await axios.get(link, { withCredentials: true }, config);
    dispatch({
      type: GET_LASTSEEN_SUCCESS.toString(),
      payload: data ? data : {},
    });
  } catch (error) {
    dispatch({
      type: GET_LASTSEEN_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};