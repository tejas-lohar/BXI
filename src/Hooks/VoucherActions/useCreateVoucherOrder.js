import { useMutation } from "react-query";
import axios from "axios";

export const userCreateVoucher = (order) => {
  const { data, isLoading, error, mutate } = useMutation(
    (OrderData) =>
      axios.post(
        "voucher/buy_voucher",
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
