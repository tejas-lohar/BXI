import axios from "axios";

import { useQuery } from "react-query";

export const GetSellerAllInvoices = () => {
  const { data, isLoading, error, refetch } = useQuery(
    "get_all_sellers_invoices",
    () =>
      axios
        .get(`escrow/get-seller-invoce`, {
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
