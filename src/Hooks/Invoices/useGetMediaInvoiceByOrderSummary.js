import axios from "axios";
import { useQuery } from "react-query";

export const useGetMediaInvoiceByOrderSummary = (orderId) => {
  console.log("orderId", orderId);
  const { data, isLoading, error } = useQuery(
    "media",
    () =>
      axios
        .get(`media/get_media_orderById/${orderId}`, {
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
