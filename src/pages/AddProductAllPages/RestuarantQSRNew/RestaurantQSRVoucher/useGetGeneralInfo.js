import { useMutation } from "react-query";
import axios from "axios";
const productGet = async (data) => {
  return await axios.get(
    "product_category/get_product_category",
    { ...data },
    { withCredentials: true }
  );
};
export const useGetGeneralInfo = () => {
  return useMutation(productGet);
};
