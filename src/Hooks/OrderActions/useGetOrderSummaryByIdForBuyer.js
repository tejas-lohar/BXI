import axios from "axios";

import { useQuery } from "react-query";

export const useGetOrderSummaryByIdForBuyer = (sellerId) => {
  const { data, isLoading, error } = useQuery(
    "purchase_orders",
    () =>
      axios
        .get(`purchase/get_order_summary_by_id/${sellerId}`, {
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
