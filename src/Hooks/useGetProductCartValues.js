import react from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function useGetProductCartValues() {
  return useQuery(["product-cart"], () => {
    return axios.get(`product/get_cart_products`);
  });
}
