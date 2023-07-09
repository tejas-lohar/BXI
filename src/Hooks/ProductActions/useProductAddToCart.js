//  react query to add product to cart

import { useMutation } from "react-query";
import axios from "axios";

export const useProductAddToCart = (id) => {
  console.log("function");
  const { data, isLoading, error, mutate } = useMutation(
    (data) =>
      axios.post(
        "product/add_to_cart_from_marketplace",
        { data },
        { withCredentials: true }
      ),
    {
      onSuccess: (data) => {},
    }
  );
  return { data, isLoading, error, mutate };
};
