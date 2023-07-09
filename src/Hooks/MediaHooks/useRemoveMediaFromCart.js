import axios from "axios";
import { useMutation } from "react-query";

export const useRemoveMediaFromCart = (id) => {
  const { data, isLoading, error, mutate } = useMutation(
    (id) =>
      axios.delete(`media/remove_media_from_cart/${id}`, {
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
