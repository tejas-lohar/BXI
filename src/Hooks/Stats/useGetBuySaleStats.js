import axios from "axios";
import { useQuery } from "react-query";

const useGetBuySaleStats = () => {
  const { data, isLoading, isError, error } = useQuery(
    "getBuySaleStats",
    async () => {
      const { data } = await axios.get(`soldAndbrought/sales-buy-percentage`, {
        withCredentials: true,
      });
      return data;
    }
  );
  return { data, isLoading, isError, error };
};
export default useGetBuySaleStats;
