// react query to fetch all data from api
import { useQuery } from "react-query";
import axios from "axios";

export const useGetInvoices = () => {
  const { data, error, isLoading, refetch } = useQuery("invoices", () =>
    axios
      .get("invoices/get_invoices_by_buyer_company", {
        withCredentials: true,
      })
      .then((res) => {
        return res;
      })
  );
  return { data, error, isLoading, refetch };
};

// export default useGetInvoices;
