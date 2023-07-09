import axios from "axios";
import { useQuery } from "react-query";

const useGetAuthUser = () => {
  const { data, isLoading, error, refetch } = useQuery(
    ["authuser"],
    async () => {
      return await axios.get("auth/logged_user", {
        withCredentials: true,
      });
    }
  );

  return { data, isLoading, error, refetch };
};

export default useGetAuthUser;
