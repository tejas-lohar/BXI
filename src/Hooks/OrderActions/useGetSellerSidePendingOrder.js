import axios from "axios";

import { useQuery } from "react-query";

export const useGetSellerSidePendingOrder = (page=1) => {
  const { data, isLoading, error, refetch } = useQuery(
    "purchase_orders",
    () =>
      axios
        .get(`purchase/get_purchase_order_by_seller_and_status?page=${page}`, {
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

export const useGetPurchaseOrderAfterSellerAcceptOrReject = () => {
  const { data, isLoading, error, refetch } = useQuery(
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
  return { data, isLoading, error, refetch };
};
