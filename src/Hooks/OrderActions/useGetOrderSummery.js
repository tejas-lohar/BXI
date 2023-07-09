import axios from "axios";

import { useQuery } from "react-query";

export const useGetOrderSummary = () => {
  const { data, isLoading, error, mutate, refetch } = useQuery(
    "order",
    () =>
      axios
        .get(`purchase/get_order_summary_by_company_id`, {
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
  return { data, isLoading, error, mutate, refetch };
};
