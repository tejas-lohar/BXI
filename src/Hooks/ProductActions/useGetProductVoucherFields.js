import { useQuery } from "react-query";
import axios from "axios";

//  use quary to get product by id

export default function useGetProductVoucherFields() {
  const { data, isLoading, error, refetch } = useQuery(
    "ProductVoucherFields",
    () =>
      axios
        .get(`voucherfields/getvoucherFiledsByType`, {
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
    }
  );
  return { data, isLoading, error, refetch };
}
