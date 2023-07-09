import axios from "axios";
import { useQuery } from "react-query";

const useGetCompanyTypeData = (id) => {
  const { data, isLoading, error, refetch } = useQuery(
    ["companyTypeData", id],
    () => axios.get(`company_type/get_companyType/${id}`)
  );
  return { data, isLoading, error, refetch };
};

export default useGetCompanyTypeData;
