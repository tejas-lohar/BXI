import axios from "axios";

import {
  SEARCH_CHAT_REQUEST,
  SEARCH_CHAT_SUCCESS,
  SEARCH_CHAT_FAIL,
} from "../../reduser/Chat/SearchChat";

export const searchChats = (search) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_CHAT_REQUEST.toString() });

    console.log("searchApi", search);

    let link = `support/search?search=${search}`;

    // const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({
      type: SEARCH_CHAT_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_CHAT_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
