import axios from "axios";
import {
    GET_FILES_REQUEST,
    GET_FILES_SUCCESS,
    GET_FILES_FAIL,
} from "../../reduser/Chat/GetFiles";

export const GetFiles = (senderUserId, recevieUserId, recevieChatId) => async (dispatch) => {
    try {
        dispatch({ type: GET_FILES_REQUEST.toString() });

        const config = { headers: { "Content-Type": "application/json" } };
        let link = `support/getfiles?senderUserId=${senderUserId}&recevieUserId=${recevieUserId}&recevieChatId=${recevieChatId}`;

        const { data } = await axios.get(
            link,
            {withCredentials: true},
            config,
        );

        dispatch({
            type: GET_FILES_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_FILES_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};
