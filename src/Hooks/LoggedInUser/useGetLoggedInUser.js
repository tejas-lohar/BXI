import axios from "axios";
import { useQuery } from "react-query";

const useGetLoggedInUser = () => {
  return useQuery(
    ["getLoggedInUser"],
    async () => {
      return await axios.get("auth/getauthsCompany", {
        withCredentials: true,
      });
    }
  );

};

export default useGetLoggedInUser;
