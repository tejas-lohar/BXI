//  react query to add product to cart

import { useMutation } from "react-query";
import axios from "axios";

export const useAddToCart = (id) => {
  const { data, isLoading, error, mutate } = useMutation(
    (ObjectForAddToCart) =>
      axios.post("product/add_to_cart_from_marketplace", { ObjectForAddToCart }, { withCredentials: true }),
    {
      onSuccess: (data) => {},
    }
  );
  return { data, isLoading, error, mutate };
};
