import axios from "axios";
import {
  GET_MASSAGES_REQUEST,
  GET_MASSAGES_SUCCESS,
  GET_MASSAGES_FAIL,
} from "../../reduser/Chat/Get-Massages";

export const getMassages = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: GET_MASSAGES_REQUEST.toString() });

    const config = { headers: { "Content-Type": "application/json" } };
    let link = `support/${chatId}`;

    const { data } = await axios.get(link, config, { withCredentials: true });

    dispatch({
      type: GET_MASSAGES_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MASSAGES_FAIL.toString(),
      payload: error.response,
    });
  }
};
