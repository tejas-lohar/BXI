import axios from "axios";

import { useQuery } from "react-query";

export const useGetAllBuyerApprovedOrdersForSeller = (page=1) => {
  const { data, isLoading, error, refetch } = useQuery(
    "buyer_approved_purchase_orders",
    () =>
      axios
        .get(`purchase/get_order_summary_after_buyer_accept?page=${page}`, {
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
  return { data, isLoading, error, refetch };
};
