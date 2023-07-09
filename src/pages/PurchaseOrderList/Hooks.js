import axios from "axios";
import { useMutation, useQuery } from "react-query";

// export const useCreateEaaaDeal = async (invoiceId) => {
//   return useMutation(["useCreateEaaaDeal"], () =>
//     axios.get("/escrow/geteaafordealwithinvoice", {
//       invoiceId: invoiceId,
//     })
//   );
// };

const CreateDeal = async (invoiceId) => {
  return await axios.post("escrow/submiteaaafordealwithinvoice", invoiceId);
};
export const useCreateDeal = () => {
  return useMutation(CreateDeal);
};

const getEaaaDealDocument = async (invoiceId) => {
  return await axios.get("/escrow/geteaafordealwithinvoice", invoiceId);
};
export const useGetEaaaDealDocument = () => {
  const { data, refetch } = useQuery(
    ["getEaaaDealDocument"],
    getEaaaDealDocument,
    {
      refetchOnWindowFocus: false,
      enabled: false, // disable this query from automatically running
    }
  );
  console.log("useGetEaaaDealDocument", data);
  return { data, refetch };
};

const updateBuyerEaaaAgreemnetStatus = async (invoiceId, buyerEaaaAccepted) => {
  return await axios.post(
    "/escrow/update-buyer-eaaaagreementstatus-in-invoice",
    invoiceId,
    buyerEaaaAccepted
  );
};

export const useUpdateBuyerEaaaAgreemnetStatus = () => {
  return useMutation(updateBuyerEaaaAgreemnetStatus);
};

const updateSellerEaaaAgreemnetStatus = async (
  invoiceId,
  buyerEaaaAccepted
) => {
  return await axios.post(
    "/escrow/update-seller-eaaaagreementstatus-in-invoice",
    invoiceId,
    buyerEaaaAccepted
  );
};
export const useUpdateSellerEaaaAgreemnetStatus = () => {
  return useMutation(updateSellerEaaaAgreemnetStatus);
};

const buyerUploadPaymentDocs = async (invoiceId) => {
  return await axios.post("/escrow/submit-doc", invoiceId);
};
export const useBuyerUploadPaymentDocs = () => {
  return useMutation(buyerUploadPaymentDocs);
};
