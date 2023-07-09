// react query to fetch all data from api
import { useQuery } from "react-query";
import axios from "axios";

export const useGetMediaCart = () => {
  const { data, error, isLoading, refetch } = useQuery("voucher", () =>
    axios
      .get("media/get_media_cart", {
        withCredentials: true,
      })
      .then((res) => {
        return res?.data;
      })
  );
  return { data, error, isLoading, refetch };
};

// export default useGetInvoices;
