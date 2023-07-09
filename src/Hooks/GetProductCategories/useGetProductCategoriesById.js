//  get product category by id

import { useQuery } from "react-query";
import axios from "axios";

export default function useGetProductCategoriesById(id) {
  return useQuery(["productCategories", id], () =>
    axios.get(`product_type/get_productType/${id}`).then((res) => res.data)
  );
}
