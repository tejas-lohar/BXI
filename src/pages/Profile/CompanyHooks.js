import { useMutation, useQuery } from "react-query";
import axios from "axios";

const UpdateCompanDetails = async (data) => {
  return await axios.post(
    "/company-address",
    { ...data },
    { withCredentials: true }
  );
};
export const useUpdateCompanyQuery = () => {
  return useMutation(UpdateCompanDetails);
};

const FetchCompanyLocationDetails = async () => {
  return await axios.get("/company-address", { withCredentials: true });
};
export const useFetchCompanyLocationQuery = () => {
  const { data, isLoading, error } = useQuery(
    "company-location",
    FetchCompanyLocationDetails
  );
  return { data, isLoading, error };
};

const FetchCompanyTypesForFetchingAllInterests = async () => {
  return await axios.get("/company_type/get_companyTypes", {
    withCredentials: true,
  });
};
export const useFetchCompanyTypesForFetchingAllInterestsQuery = () => {
  const { data, isLoading, error } = useQuery(
    "company-types",
    FetchCompanyTypesForFetchingAllInterests
  );
  return { data, isLoading, error };
};

const FetchCompaniesPreferences = async () => {
  return await axios.get("/Prefernces/get_preferences", {
    withCredentials: true,
  });
};
export const useFetchCompaniesPreferencesQuery = () => {
  const { data, isLoading, error } = useQuery(
    "companies-preferences",
    FetchCompaniesPreferences
  );
  return { data, isLoading, error };
};
