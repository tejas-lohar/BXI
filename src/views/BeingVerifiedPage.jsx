
import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import VerifiedRej from "../components/VerifiedRej";
import mainImg from "../assets/Images/register/underreviewimg.svg";
import ImageIdentity from "../assets/Images/verified/id.svg";
import { useParams, useNavigate } from "react-router";
import { useGetCompanyById, useGetCompanyDetails } from "../Hooks/Auth";
const BeingVerifiedPage = () => {
  const { data: CompanyData } = useGetCompanyDetails();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetCompanyById(id, 2000);
  useEffect(() => {
    if (CompanyData?.data?.companyOnboardingStatus === "FORWARD_DROP") {
      setTimeout(() => {
        navigate(`/forward_penny`);
      }, [3000]);
    } else if (CompanyData?.data?.companyOnboardingStatus === "BANK_DETAILS") {
      setTimeout(() => {
        navigate(`/bank`);
      }, [3000]);
    } else if (CompanyData?.data?.companyOnboardingStatus === "UNDER_REVIEW") {
      setTimeout(() => {
        navigate(`/under_review`);
      }, [3000]);
    }
  }, [CompanyData]);

  return (
    <Stack>
      <VerifiedRej
        imgLogoUrl={ImageIdentity}
        mainimg={mainImg}
        headText={"Your account is verifying"}
        subText={" We are Currently checking your Company Details"}
        showLoader={true}
      />
    </Stack>
  );
};

export default BeingVerifiedPage;
