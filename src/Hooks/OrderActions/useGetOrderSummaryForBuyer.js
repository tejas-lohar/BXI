import axios from "axios";

import { useQuery } from "react-query";

export const useGetOrderSummaryForBuyer = (page=1) => {
  const { data, isLoading, error, refetch } = useQuery(
    "purchase_orders",
    () =>
      axios
        .get(`purchase/get_order_summary_for_buyer?page=${page}`, {
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

export const useGetOrderSummaryAfterBuyerAccept = () => {
  const { data, isLoading, error } = useQuery(
    "purchase_orders",
    () =>
      axios
        .get(`purchase/get_order_summary_after_buyer_accept`, {
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
