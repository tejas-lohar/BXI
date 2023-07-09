import { useQuery } from "react-query";
import axios from "axios";
//  remove product from cart

import { useMutation } from "react-query";

export const useRemoveCartProduct = (id) => {
  const { data, isLoading, error, mutate } = useMutation(
    (id) =>
      axios.post(`product/delete_cart_product/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (data) => {
        return data;
      },
    }
  );
  return { data, isLoading, error, mutate };
};

export const useRemoveCartProductByProductId = (id) => {
  const { data, isLoading, error, mutate } = useMutation(
    (id) =>
      axios.delete(`product/delete_cart_product_by_product_id/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (data) => {
        return data;
      },
    }
  );
  return { data, isLoading, error, mutate };
};

export const useRemoveVoucherCartProduct = (id) => {
  const { data, isLoading, error, mutate } = useMutation(
    (id) =>
      axios.delete(`voucher/delete_cart_voucher/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (data) => {
        return data;
      },
    }
  );
  return { data, isLoading, error, mutate };
};
