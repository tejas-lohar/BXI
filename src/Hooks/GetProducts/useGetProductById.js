import { useQuery } from "react-query";
import axios from "axios";

export function useGetProductById(id) {
  return useQuery(["getProductById", id], () =>
    axios.get(`product/get_product_byId/${id}`).then((res) => res.data)
  );
}
