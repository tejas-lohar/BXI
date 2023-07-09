import { useQuery, useMutation } from "react-query";
import axios from "axios";

const GetInvoicesOfBuyerCompany = async () => {
  return await axios.get("/invoices/get_all_invoice_of_buyer_company");
};

export const useGetBuyersInvoiceOrders = () => {
  return useQuery(GetInvoicesOfBuyerCompany);
};

const addReview = async (data) => {
  return await axios.post("/reviews/add_review", data);
};

export const useAddReview = () => {
  return useMutation(addReview);
};

const fetchReviews = async () => {
  return await axios.get("/reviews/get_loggedin_users_reviews");
};

const updateReview = async (data) => {
  return await axios.put("/reviews/update_review/" + data.id, { ...data });
};
export const useUpdateReview = () => {
  return useMutation(updateReview);
};
export const useFetchReviews = () => {
  return useQuery(["reviews"], () => fetchReviews());
};
const fetchLoggedInUser = async () => {
  return await axios.get("/auth/getLoggedinUser");
};
export const useGetLoggedInUser = () => {
  return useQuery(["Loggedinuser"], () => fetchLoggedInUser());
};
