import axios from "axios";
import {
  NEW_CHAT_REQUEST,
  NEW_CHAT_SUCCESS,
  NEW_CHAT_FAIL,
} from "../../reduser/Chat/Create-Chat";

export const createChat =
  (userId, admin = "6437d9efb16a5049913d70a5") =>
  async (dispatch) => {
    try {
      dispatch({ type: NEW_CHAT_REQUEST.toString() });

      const config = { headers: { "Content-Type": "application/json" } };
      let link = `support/create_room`;

      const { data } = await axios.post(
        link,
        { userId, admin },
        { withCredentials: true },
        config
      );

      dispatch({
        type: NEW_CHAT_SUCCESS.toString(),
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_CHAT_FAIL.toString(),
        payload: error.response.data.message,
      });
    }
  };
