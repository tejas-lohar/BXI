import axios from "axios";
import { useQuery } from "react-query";

export const useGetInvoiceByOrderSummary = (orderId) => {
  console.log("orderId", orderId);
  const { data, isLoading, error } = useQuery(
    "invoice",
    () =>
      axios
        .get(`invoices/get_invoice_by_order_summary_id/${orderId}`, {
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

export const useGetVouhcerInvoiceByOrderId = (id) => {
  const { data, isLoading, error, refetch } = useQuery(
    "voucherInvoice",
    () =>
      axios
        .get(`voucher/get_voucher_order/${id}`, {
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
