import axios from "axios";

import { useQuery, useMutation } from "react-query";

export const useUpdatePurchaseOrder = (newdata, status) => {
  const { data, isLoading, error, mutate } = useMutation(
    (id) =>
      axios
        .put(
          `purchase/update_orderSummary`,
          { data: id },
          { withCredentials: true }
        )
        .then((res) => {
          return res.data;
        }),
    {
      onSuccess: (data) => {
        return data;
      },
    },
    {
      onLoading: (data) => {
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
