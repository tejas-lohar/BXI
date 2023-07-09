import { useQuery, useMutation } from "react-query";
import axios from "axios";

export const useVoucherOrderFetch = (id) => {
  const { data, isLoading, error, refetch } = useQuery("VoucherOrder", () =>
    axios.get(`voucher/get_voucher_order/${id}`)
  );

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
// export const useInitiateTransaction = () => {
//   const { data, isLoading, error } = useMutation((data) =>
//     axios.post(`wallet//wallet-transaction`, data)
//   );

//   return {
//     data,
//     isLoading,
//     error,
//   };
// };

// const initiateTransaction = async (data) => {
//   await axios.post(`wallet/wallet-transaction`, data);
// };
// export const useInitiateTransaction = () => {
//   return useMutation(initiateTransaction);
// };

export const useInitiateTransaction = () => {
  const { data, isLoading, error, mutate } = useMutation((data) =>
    axios.post(`wallet/wallet-transaction`, data)
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};
