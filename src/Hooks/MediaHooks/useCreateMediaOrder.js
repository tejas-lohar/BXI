import { useMutation } from "react-query";
import axios from "axios";

export const useCreateMediaOrder = () => {
  const { data, isLoading, error, mutate } = useMutation(
    (ObjectForAddToCart) =>
      axios.post(
        "media/create_media_order",
        { ObjectForAddToCart },
        { withCredentials: true }
      ),
    {
      onSuccess: (data) => {},
    }
  );
  return { data, isLoading, error, mutate };
};
