//  use mutate multiple purchase order
//  Path: src\Hooks\PurchaseOrderActions\useMutateMultiplePurchaseOrder.js
import axios from "axios";
import { useMutation } from "react-query";
export const useMutateMultiplePurchaseOrder = () => {
  return useMutation(
    async (data) => {
      const response = await axios.post(
        `purchase/update_multiple_purchase_order`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        return data;
      },
      onError: (error) => {
        return error;
      },
      onSettled: (data) => {
        return data;
      },
    }
  );
};
//  use mutate multiple purchase order
