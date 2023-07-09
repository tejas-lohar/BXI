import { useMutation } from "react-query";
import axios from "axios";

export const useAddToWishlist = (id, ProductType) => {
  const { data, isLoading, error, mutate } = useMutation(
    (id, ProductType) =>
      axios.post(
        "wishlist/add_to_wishlist",
        { id: id, ProductType: ProductType },
        { withCredentials: true }
      ),
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
  return { data, isLoading, error, mutate };
};
