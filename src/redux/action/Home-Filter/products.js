import axios from "axios";
import {
  Category_Id,
  Category_Ids,
} from "../../../components/Carousel/ProductDetailsCarousel";

import { States, PriceRange, Product_Qty, Clear, Refresh, PriceShortHightToLow, PriceShortLowToHight, WhatsNew, Popularity, Voucher, ProductsFilter } from "../../../views/MarketPlace";

import {
  product_Fail,
  product_Request,
  product_Success,
} from "../../reduser/Home-Filter/products";

// Get All Products
export const getProduct =
  (
    search = "",
    price = "",
    sortBy = "",
    productQty = "",
    clear = "",
    categoryIds = "",
    refresh = "",
    SellerCompanyId = "",
    priceShortHightToLow = "",
    priceShortLowToHight = "",
    whatsNew = "",
    selectedCompany = "",
    currentPage = "",
    popularity = false,
    voucher = false,
    tag = "",
    productsFilter = false
  ) =>
    async (dispatch) => {
      try {
        dispatch({ type: product_Request.toString() });

        if (sortBy === "sort") {
          sortBy = "-createdAt";
        }

        // let categoryId = "";
        // categoryId = Category_Id;

        let limit = "";
        let rating = "";
        let deliveryType = "";

        const { data } = await axios.get(
          `product/get_products?Search=${search.trim()}&PriceRange=${PriceRange}&ProductLocationState=${States}&ProductRating=${rating}&ProductQty=${Product_Qty}&ProductDeliveryType=${deliveryType}&ProductCategory=${Category_Ids}&Clear=${Clear}&Short=${sortBy}&Category_Id=${Category_Id}&Refresh=${Refresh}&SellerCompanyId=${SellerCompanyId}&priceShortHightToLow=${PriceShortHightToLow}&priceShortLowToHight=${PriceShortLowToHight}&whatsNew=${WhatsNew}&companyName=${selectedCompany}&popularity=${Popularity}&Voucher=${Voucher}&Tag=${tag}&productsFilter=${ProductsFilter}&page=${currentPage}&limit=${limit}`,
          {
            withCredentials: true,
          }
        );

        dispatch({
          type: product_Success.toString(),
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: product_Fail.toString(),
          payload: error.response.data.message,
        });
      }
    };
