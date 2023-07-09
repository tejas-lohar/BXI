// /product/get_companies_products
import axios from "axios";
import { useQuery, useMutation } from "react-query";

export const useGetAllCompanyProducts = () => {
  const { data, isLoading, error, mutate, refetch } = useQuery(
    "companyProducts",
    () =>
      axios
        .get("/product/get_companies_products", { withCredentials: true })
        .then((res) => {
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
    }
  );
  return { data, isLoading, error, mutate, refetch };
};

// export const useRequestCredit = () => {
//   const { data, isLoading, error, mutate, refetch } = useQuery(
//     "companyProducts",
//     () =>
//      axios
//     .post(
//       "wallet_funds/request_funds", { withCredentials: true })
//         .then((res) => {
//           return res.data;
//         }),
//     {
//       onSuccess: (data) => {
//         return data;
//       },
//     },
//     {
//       onError: (error) => {
//         return error;
//       },
//     }
//   );
//   return { data, isLoading, error, mutate, refetch };
// };
const requestBal = async (data) => {
  return await axios.post(
    "wallet_funds/request_funds",
    { ...data },
    { withCredentials: true }
  );
};
export const useRequestCredit = () => {
  return useMutation(requestBal);
};
