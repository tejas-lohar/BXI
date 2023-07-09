import axios from "axios";

import {
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAIL,
} from "../../reduser/Notification/getNotications";

export const allNotification =
  (loginUser = "", type = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_NOTIFICATION_REQUEST.toString() });

      const config = { headers: { "Content-Type": "application/json" } };
      let link = `notification/notification?loginUser=${loginUser}&type=${type}`;

      const { data } = await axios.get(link, { withCredentials: true }, config);

      dispatch({
        type: GET_NOTIFICATION_SUCCESS.toString(),
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_NOTIFICATION_FAIL.toString(),
        payload: error.response.data.message,
      });
    }
  };