import { useQuery } from "react-query";
import axios from "axios";

//  use quary to get product by id

export default function useGetProductById(id) {
  const { data, isLoading, error, refetch } = useQuery(
    "ProductById",
    () =>
      axios
        .get(`product/get_product_byId/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        }),
    {
      onSuccess: (data) => {
        return data;
      },
    },
    {
      onError: (error) => {
        return error;
      },
    },
    {
      onload: (isLoading) => {
        return isLoading;
      },
    }
  );
  //  refetch data

  return { data, isLoading, error, refetch };
}
