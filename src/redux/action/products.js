import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS,
} from "../constant/products";

// Get All Products
export const getProductFilter =
  (price = "", sortBy = "", ProductQty = "", categoryId = "") =>
  async (dispatch) => {
    //   let price = props.price ? props.price : null;
    //   let sortBy = props.sortBy ? props.sortBy : null;
    //   let ProductQty = props.ProductQty ? props.ProductQty : null;
    //   let categoryId = props.categoryId ? props.categoryId : null;

    try {
      dispatch({ type: ALL_PRODUCT_REQUEST.toString() });

      if (sortBy === "sort") {
        sortBy = -1;
      }

      // const link = `https://staging-backend.bxi.unada.in/product/get_products?category=${categoryId}`;
      // const link = `product/get_all_products?pricerange=${price}&createdAt=${sortBy}&ProductQty=${ProductQty}&category=${categoryId}`;

      // const { data } = await axios.post(link, {
      //   withCredentials: true,
      // });

      const data = "";

      dispatch({
        type: ALL_PRODUCT_SUCCESS.toString(),
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL.toString(),
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
