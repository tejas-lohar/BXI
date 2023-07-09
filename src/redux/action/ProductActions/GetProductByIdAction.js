import axios from "axios";

import {
  GetProductByIdReceived,
  GetProductByIdRequested,
  GetProductByIdRequestFailed,
} from "../../reduser/ProductReducer/GetProductByIdReducer";

export const GetProductByIdAction = (id) => async (dispatch) => {
  console.log(id);
  try {
    dispatch({ type: GetProductByIdRequested.toString() });
    let data = await axios
      .get(`product/get_product_byId/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
    dispatch({
      type: GetProductByIdReceived.toString(),
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GetProductByIdRequestFailed.toString(),
      payload: error.response.data.message,
    });
  }
};
