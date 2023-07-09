import axios from "axios";
import { useQuery } from "react-query";

export const useGetWishlistData = () => {
  const { data, isLoading, error, mutate, refetch } = useQuery(
    "wishlist",
    () =>
      axios
        .get("wishlist/get_wishlist_product", { withCredentials: true })
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

  // how to refetch the data?
};
