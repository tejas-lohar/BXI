import { useQuery } from "react-query";
import axios from "axios";

const useGetProductCategories = () => {
  const { data, error, isLoading } = useQuery("categories", () =>
    axios.get("product_type/get_productTypes").then((res) => res.data)
  );

  return { data, error, isLoading };
};

export default useGetProductCategories;