import axios from "axios";
import { useQuery } from "react-query";

export const useGetPurchaseOrderById = (id) => {
  const { data, isLoading, error } = useQuery(
    "purchase_orders",
    () =>
      axios
        .get(`purchase/get_purchase_order/${id}`, {
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
      onSettled: (data) => {
        return data;
      },
    }
  );
  return { data, isLoading, error };
};
