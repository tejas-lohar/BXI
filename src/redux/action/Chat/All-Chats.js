import axios from "axios";
import {
  ALL_CHAT_REQUEST,
  ALL_CHAT_SUCCESS,
  ALL_CHAT_FAIL,
} from "../../reduser/Chat/All-Chats";

export const getChats = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CHAT_REQUEST.toString() });

    let link = `support/allchats`;

    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({
      type: ALL_CHAT_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CHAT_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
