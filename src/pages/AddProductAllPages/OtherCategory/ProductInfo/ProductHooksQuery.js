import { useMutation } from "react-query";
import axios from "axios";
const productUpload = async (data) => {
  return await axios.post(
    "/product/add_product",
    { ...data },
    { withCredentials: true }
  );
};
export const usePostProductQuery = () => {
  return useMutation(productUpload);
};

const productUpdate = async (data) => {
  return await axios.put(
    "/product/update_product",
    { ...data },
    { withCredentials: true }
  );
};
export const useUpdateProductQuery = () => {
  return useMutation(productUpdate);
};
