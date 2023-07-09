import axios from "axios";

import { useQuery, useMutation } from "react-query";

export const useUpdateSellerPurchaseOrder = (id, status) => {
  const { data, isLoading, error, mutate } = useMutation(
    (id) =>
      axios
        .put(
          `purchase/update_purchase_order_accepted_by_buyer_for_seller_company`,
          { data: id },
          { withCredentials: true }
        )
        .then((res) => {
          return res.data;
        }),
    {
      onSuccess: (data) => {
        return data;
      },
    },
    {
      onLoading: (data) => {
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
  return { data, isLoading, error, mutate };
};
