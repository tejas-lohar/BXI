import { useQuery, useMutation } from "react-query";
import axios from "axios";
import v1Backend from "./axios";
/* LOG IN */
const LoginUser = async (data) => {
  return await axios.post(
    "/auth/login",
    { ...data },
    { withCredentials: true }
  );
};
export const useLoginUser = () => {
  return useMutation(LoginUser);
};

/* CREATE ACCOUNT */

const RegisterUser = async (data) => {
  return await axios.post("/auth/AddAuth", { ...data });
};
export const useRegisterUser = () => {
  return useMutation(RegisterUser);
};
const GetCompanyTypes = async () => {
  return await axios.get("/company_type/get_companyTypes");
};
export const useFetchCompanyTypes = async () => {
  return useQuery(["getCompanyTypesList"], async () => {
    return await GetCompanyTypes();
  });
};
const CreateCompanyAccount = async (data) => {
  return await v1Backend.post("/auth/register", { ...data });
};
export const useCreateAccount = () => {
  return useMutation(CreateCompanyAccount);
};
export const useForgetPassEmailSubmit = () => {
  return useMutation(async (data) => {
    return await v1Backend.post("/auth/forgot-password", { ...data });
  });
};
export const useResetPassword = () => {
  return useMutation(async (data) => {
    return await v1Backend.post("/auth/reset-password", { ...data });
  });
};
export const useVerifyresetpassOtp = () => {
  return useMutation(async (data) => {
    return await v1Backend.post("/auth/verify-resetotp", { ...data });
  });
};
/* Roc Search */
const FetchRocSearch = async (data) => {
  return await v1Backend.post("roc", { ...data });
};
export const useRocSearch = () => {
  return useMutation(FetchRocSearch);
};

/* BANK DETAILS */

const BankDetails = async (data) => {
  return await axios.put(`company/updatecompany/${data.id}`, {
    ...data,
  });
};
export const useBankDetails = () => {
  return useMutation(BankDetails);
};

/* OTP */

const AddOtp = async (data) => {
  return await v1Backend.post("/auth/login-otp", { ...data });
};

export const useOtp = () => {
  return useMutation(AddOtp);
};

/* GST DETAILS */

export const useCompanyStepDetails = () => {
  return useMutation(async (data) => {
    return await v1Backend.put("/step", { ...data });
  });
};

/* COMPANY DETAILS */

const CompanyDetails = async (data) => {
  return await axios.post("/", { ...data });
};
export const useCompanyDetails = () => {
  return useMutation(CompanyDetails);
};

// GET COMPMAY DETAILS
export const useGetCompanyDetails = () => {
  return useQuery(["companydetails"], async () => {
    return await v1Backend.get("onboard-company");
  });
};
const resendOtp = async (data) => {
  return await v1Backend.put(`auth/resend-otp/`, { ...data });
};
export const useResendOtp = () => {
  return useMutation(resendOtp);
};
/* FORGET PASSWORD */

const forget = async (data) => {
  return await v1Backend.post("/auth/forgot-password", { ...data });
};
export const useForget = () => {
  return useMutation(forget);
};

/* reset-password */

const resetPass = async (data) => {
  return await v1Backend.post("/auth/reset-password", { ...data });
};

export const useRestPassword = () => {
  return useMutation(resetPass);
};
/* ADD PASSWORD */
const AddPassword = async (data) => {
  return await axios.post("/", { ...data });
};

export const useAddPassword = () => {
  return useMutation(AddPassword);
};

/* PAYMENT */

// By Card
const AddCardPayment = async (data) => {
  return await axios.post("/pine_lab/payWithCard", { ...data });
};
export const usePaymentByCard = () => {
  return useMutation(AddCardPayment);
};

// By NetBanking
const AddBankPayment = async (data) => {
  return await axios.post("/pine_lab/payWithNetBanking", { ...data });
};
export const usePaymentByNetBanking = () => {
  return useMutation(AddBankPayment);
};

const FetchCompanyByID = async (id) => {
  return await axios.get(`company/get_company/${id}`);
};
export const useGetCompanyById = (id, refetchInterval) => {
  return useQuery(
    ["getcompanybyid", id],
    async () => {
      return await FetchCompanyByID(id);
    },
    {
      refetchInterval: refetchInterval ?? false,
    }
  );
};
const FetchCompanyPayemntStatus = async (orderId) => {
  return await axios.get(`/check_payment_status`, { pluralId: orderId });
};
export const useGetCompanyPaymentStatusByOrderId = (orderId, enabled) => {
  return useQuery(
    ["getcompanyPaymentbyorderid", orderId],
    async () => {
      return await FetchCompanyPayemntStatus(orderId);
    },
    {
      enabled: enabled,
    }
  );
};

const FetchCompanyListById = async (id) => {
  return await axios.get(`company/by-name/${id}`);
};
export const useGetListCompany = (id) => {
  return useQuery(["getcompanybyidlist", id], async () => {
    return await FetchCompanyListById(id);
  });
};
