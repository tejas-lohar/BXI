//  update purchase order
import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const useMutatePurchaseOrder = (orderId) => {
  const { data, isLoading, error, mutate } = useMutation((data) =>
    axios.put(
      `purchase/update_purchase_order_accepted_by_buyer_for_seller_company`,
      { data },
      { withCredentials: true }
    )
  );
  return { data, isLoading, error, mutate };
};
