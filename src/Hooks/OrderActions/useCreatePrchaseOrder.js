import { useMutation } from "react-query";
import axios from "axios";

export const useCreatePrchaseOrder = (order) => {
  const { data, isLoading, error, mutate } = useMutation(
    (OrderData) =>
      axios.post(
        "purchase/create_purchase_order",
        { OrderData },
        { withCredentials: true }
      ),
    {
      onSuccess: (data) => {
        return "Order Created";
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
