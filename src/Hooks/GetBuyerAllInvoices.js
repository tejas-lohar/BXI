import axios from "axios";

import { useQuery } from "react-query";

export const GetBuyerAllInvoices = () => {
  const { data, isLoading, error, refetch } = useQuery(
    "get_all_buyers_invoices",
    () =>
      axios
        .get(`escrow/get-buyers-deal-invoce`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("response", res);
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
