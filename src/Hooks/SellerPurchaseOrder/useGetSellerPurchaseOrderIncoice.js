import axios from "axios";
import { useQuery } from "react-query";

export default function useGetSellerPurchaseOrderIncoice(purchaseOrderId) {
  const { data, isLoading, error, refetch } = useQuery(
    "seller_ordersummary_invoice",
    () =>
      axios
        .get(`invoices/get_invoices_by_seller_company`, {
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
}
