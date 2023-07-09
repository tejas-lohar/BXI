import axios from "axios";
import {
  LASTSEEN_REQUEST,
  LASTSEEN_SUCCESS,
  LASTSEEN_FAIL,
} from "../../reduser/Chat/LastSeen";

export const LastSeenSet = (login_User) => async (dispatch) => {
  try {
    dispatch({ type: LASTSEEN_REQUEST.toString() });

    const config = { headers: { "Content-Type": "application/json" } };
    let link = `support/lastseen?loginUser=${login_User}`;

    const { data } = await axios.post(link, { withCredentials: true }, config);

    dispatch({
      type: LASTSEEN_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LASTSEEN_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
﻿
