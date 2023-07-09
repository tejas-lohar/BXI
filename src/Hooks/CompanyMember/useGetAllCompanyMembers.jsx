// use query to get all company members
import { useQuery } from "react-query";
// import { GET_ALL_COMPANY_MEMBERS } from "../../GraphQL/Queries";
import axios from "axios";

// get_IamUser_ByCompanyId

const useGetAllCompanyMembers = () => {
  const { data, error, isLoading } = useQuery("company members", () =>
    axios
      .get("assign/get_IamUser_ByCompanyId", {
        withCredentials: true,
      })
      .then((res) => res.data)
  );

  return { data, error, isLoading };
};

export default useGetAllCompanyMembers;
