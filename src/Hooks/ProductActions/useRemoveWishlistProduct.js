import axios from "axios";
import { useMutation } from "react-query";

export const useRemoveWishlistProduct = (id) => {
  const { data, isLoading, error, mutate } = useMutation(
    (id) =>
      axios.delete(`wishlist/remove_from_wishlist/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (data) => {
        return "Deleted";
      },
    },
    {
      onError: (error) => {
        return "Error";
      },
    }
  );
  return { data, isLoading, error, mutate };
};

export const useRemoveWishlistProductByProductId = (id) => {
  const { data, isLoading, error, mutate } = useMutation(
    (id) =>
      axios.delete(`wishlist/remove_from_wishlist_by_product_id/${id}`, {
        withCredentials: true,
      }),
    {
      onSuccess: (data) => {
        return "Deleted";
      },
    },
    {
      onError: (error) => {
        return "Error";
      },
    }
  );
  return { data, isLoading, error, mutate };
};
