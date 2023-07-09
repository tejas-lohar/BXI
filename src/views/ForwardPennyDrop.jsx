import React from "react";
import { Stack } from "@mui/material";
import VerifiedRej from "../components/VerifiedRej";
// import cashback from "../assets/Images/verified/cashback.svg";
import bxicoin from "../assets/Images/verified/coins (1) 1.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCompanyDetails, useCompanyStepDetails } from "../Hooks/Auth";
import mainImg from "../assets/Images/register/forwordpennyimg.svg";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
const ForwardPennyDrop = () => {
  const [companyDatafetch, setCompanyDetailsData] = useState();
  let navigate = useNavigate();
  let companyId = useParams().id;
  const { mutate } = useCompanyStepDetails();

  const { data: companyData } = useGetCompanyDetails(); // setTimeout(() => {

  useEffect(() => {
    FecthCompanyDetails();
  }, []);
  if (companyData?.data?.bankAccountNameMatch === false) {
    navigate("/bank");
  } else {
    if (companyData?.data?.companyOnboardingStatus === "UNDER_REVIEW") {
      navigate("/under_review");
    } else if (companyData?.data?.companyOnboardingStatus === "FORWARD_DROP") {
      navigate("/forward_penny");
    }
  }
  const FecthCompanyDetails = async () => {
    await axios
      .get("api/v1/onboard-company")
      .then((res) => {
        setCompanyDetailsData(res.data);
      })
      .catch((err) => console.log(err));
  };

  if (companyData?.data?.companyOnboardingStatus === "UNDER_REVIEW") {
    navigate("/under_review");
  } else if (companyData?.data?.companyOnboardingStatus === "FORWARD_DROP") {
    navigate("/reverse_penny");
  }

  useEffect(() => {
    FecthCompanyDetails();
  }, []);

  return (
    <Stack>
      <VerifiedRej
        imgLogoUrl={bxicoin}
        headText={"Depositing INR 1"}
        mainimg={mainImg}
        subText={
          "Please check we have deposited INR 1 in your company bank account. We will further debit INR 1 from same bank account in the next step."
        }
      />
    </Stack>
  );
};

export default ForwardPennyDrop;
