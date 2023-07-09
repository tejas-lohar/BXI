import { useMutation } from "react-query";
import axios from "axios";

export const useAddMediaToCart = () => {
  const { data, isLoading, error, mutate } = useMutation(
    (ObjectForAddToCart) =>
      axios.post(
        "media/add_media_tocart",
        { ObjectForAddToCart },
        { withCredentials: true }
      ),
    {
      onSuccess: (data) => {},
    }
  );
  return { data, isLoading, error, mutate };
};
