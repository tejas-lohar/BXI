import { useQuery } from "react-query";
import axios from "axios";

export const useGetInvoiceById = (invoiceId) => {
  const { data, isLoading, error } = useQuery(
    "invoice",
    () =>
      axios
        .get(`invoices/get_invoice/${invoiceId}`, {
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
