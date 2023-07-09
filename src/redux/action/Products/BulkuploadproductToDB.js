import axios from "axios";

import {
  BULK_UPLOAD_TODB_REQUEST,
  BULK_UPLOAD_TODB_SUCCESS,
  BULK_UPLOAD_TODB_FAIL,
} from "../../reduser/Products/BulkuploadproductToDB";

export const BulkuploadproductToDB = () => async (dispatch) => {
  try {
    dispatch({ type: BULK_UPLOAD_TODB_REQUEST.toString() });

    let link = `product/productbulkuploadtodb`;

    const { data } = await axios.post(link, { withCredentials: true });

    dispatch({
      type: BULK_UPLOAD_TODB_SUCCESS.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BULK_UPLOAD_TODB_FAIL.toString(),
      payload: error.response.data.message,
    });
  }
};
