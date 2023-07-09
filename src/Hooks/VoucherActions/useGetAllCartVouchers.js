// react query to fetch all data from api
import { useQuery } from "react-query";
import axios from "axios";

export const useGetAllCartVouchers = () => {
  const { data, error, isLoading, refetch } = useQuery("voucher", () =>
    axios
      .get("voucher/get_cart_vouchers", {
        withCredentials: true,
      })
      .then((res) => {
        return res;
      })
  );
  return { data, error, isLoading, refetch };
};

// export default useGetInvoices;
