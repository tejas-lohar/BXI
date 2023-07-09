import axios from "axios";
import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAIL,
} from "../../reduser/Notification/notification";

export const notifications =
  (receiver, sender, message, type) => async (dispatch) => {
    try {
      dispatch({ type: NOTIFICATION_REQUEST.toString() });

      const config = { headers: { "Content-Type": "application/json" } };
      let link = `notification/sendnotification`;

      const { data } = await axios.post(
        link,
        { receiver, sender, message, type },
        { withCredentials: true },
        config
      );

      dispatch({
        type: NOTIFICATION_SUCCESS.toString(),
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NOTIFICATION_FAIL.toString(),
        payload: error.response.data.message,
      });
    }
  };
