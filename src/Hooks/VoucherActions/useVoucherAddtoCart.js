//  react query to add product to cart

import { useMutation } from "react-query";
import axios from "axios";

export const useVoucherAddtoCart = () => {
  const { data, isLoading, error, mutate } = useMutation(
    (ObjectForAddToCart) =>
      axios.post(
        "voucherRoutes/add_voucher_tocart",
        { ObjectForAddToCart },
        { withCredentials: true }
      ),
    {
      onSuccess: (data) => {},
    }
  );
  return { data, isLoading, error, mutate };
};
