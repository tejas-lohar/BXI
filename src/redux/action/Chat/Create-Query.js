import axios from "axios";
import {
  NEW_QUERY_REQUEST,
  NEW_QUERY_SUCCESS,
  NEW_QUERY_FAIL,
} from "../../reduser/Chat/Create-Query";

export const newQuery = (userId) => async (dispatch) => {
  try {
    dispatch({ type: NEW_QUERY_REQUEST.toString() });

    const config = { headers: { "Content-Type": "application/json" } };
    let link = `support/createquery`;

    const { data } = await axios.post(
      link,
      { userId },
      { withCredentials: true },
      config
    );

    dispatch({
      type: NEW_QUERY_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_QUERY_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
