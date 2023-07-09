import axios from "axios";
import { useQuery } from "react-query";

export const useGetCompanyDataById = (companyId) => {
  const { data, isLoading, error, refetch } = useQuery(
    "company_data",
    () =>
      axios
        .get(`company/get_company/${companyId}`, {
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
    },
    {
      onload: (isLoading) => {
        return isLoading;
      },
    }
  );
  return { data, isLoading, error, refetch };
};
