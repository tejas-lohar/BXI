import axios from "axios";
import {
  SEND_MASSAGES_REQUEST,
  SEND_MASSAGES_SUCCESS,
  SEND_MASSAGES_FAIL,
} from "../../reduser/Chat/Send-Massages";

export const sendMassage = (content, chatId, type) => async (dispatch) => {
  try {
    dispatch({ type: SEND_MASSAGES_REQUEST.toString() });

    const config = { headers: { "Content-Type": "application/json" } };
    let link = `support/sendmassage`;

    const { data } = await axios.post(
      link,
      { content, chatId, type },
      { withCredentials: true },
      config
    );

    dispatch({
      type: SEND_MASSAGES_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_MASSAGES_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
