// react query to fetch all data from api
import { useQuery } from "react-query";
import axios from "axios";

export default function useGetAllProductsWithFilter(categoryId, traits) {
  return useQuery(["designations", categoryId, traits], async () => {
    return await axios.post("product/get_products", {
      category: categoryId,
      traits: traits,
    });
  });
}




