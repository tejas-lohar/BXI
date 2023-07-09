import axios from "axios";
import { useQuery } from "react-query";

export const useGetCartData = () => {
  const { data, isLoading, error, mutate, refetch } = useQuery(
    "cart",
    () =>
      axios
        .get("product/get_cart_products", { withCredentials: true })
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
    }
  );
  return { data, isLoading, error, mutate, refetch };
};

export const useGetVoucherCartData = () => {
  const { data, isLoading, error, mutate, refetch } = useQuery(
    "voucherCart",
    () =>
      axios
        .get("voucher/get_cart_vouchers", { withCredentials: true })
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
    }
  );
  return { data, isLoading, error, mutate, refetch };
};
