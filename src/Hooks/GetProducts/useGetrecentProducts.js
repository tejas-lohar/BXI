import axios from "axios";

import { useQuery } from "react-query";

//  react query to fetch all data from api

export const useGetrecentProducts = () => {
  const { data, isLoading, error, refetch } = useQuery(
    "recent_products",
    () =>
      axios
        .get(`product/get_recent_products`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
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
    },
    {
      onSettled: (data) => {
        return data;
      },
    }
  );
  return { data, isLoading, error, refetch };
};
