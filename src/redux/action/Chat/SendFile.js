import axios from "axios";
import {
    SEND_FILES_REQUEST,
    SEND_FILES_SUCCESS,
    SEND_FILES_FAIL
} from "../../reduser/Chat/SendFiles";

export const sendFile = (formdata) => async (dispatch) => {
    try {
        dispatch({ type: SEND_FILES_REQUEST.toString() });

        const config = { headers: { 'Content-type': 'multipart/form-data' } };
        let link = `support/files`;

        const { data } = await axios.post(link, formdata, {
            headers: { 'Content-type': 'multipart/form-data' },
            withCredentials: true
        });

        dispatch({
            type: SEND_FILES_SUCCESS.toString(),
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SEND_FILES_FAIL.toString(),
            payload: error.response.data.message,
        });
    }
};
