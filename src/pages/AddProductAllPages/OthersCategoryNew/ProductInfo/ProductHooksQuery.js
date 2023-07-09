import { useMutation } from "react-query";
import axios from "axios";

const productUpload = async (data) => {
  return await axios.post("product/product_mutation", data, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const usePostProductQuery = () => {
  return useMutation(productUpload);
};

const productUpdate = async (data) => {
  return await axios.post("product/product_mutation", data, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const useUpdateProductQuery = () => {
  return useMutation(productUpdate);
};
