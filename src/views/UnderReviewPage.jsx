import { Stack } from "@mui/material";
import mainImg from "../assets/Images/register/underreviewimg.svg";
import VerifiedRej from "../components/VerifiedRej";
import ImageIdentity from "../assets/under_review.png";
import { useParams, useNavigate } from "react-router";
import { useGetCompanyById, useGetCompanyDetails } from "../Hooks/Auth";
import { useEffect } from "react";
import axios from "axios";

const UnderReviewPage = () => {
  const navigate = useNavigate();
  const { data } = useGetCompanyDetails();
  useEffect(() => {
    if (data?.data?.companyOnboardingStatus === "TNC") {
      navigate(`/home/terms`);
    } else if (data?.data?.companyOnboardingStatus === "UNDER_REVIEW") {
      navigate(`/under_review`);
    } else {
    }
  }, [data]);

  // const getCompanyLog = async () => {
  //   await axios
  //     .get(`/checkcompany/${data?.data?.email}`)
  //     .then((res) => console.log(res.data))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  return (
    <Stack>
      <VerifiedRej
        imgLogoUrl={ImageIdentity}
        imgSize={"115px"}
        mainimg={mainImg}
        headText={"Your account Is Under Review"}
        subText={
          " This generally takes 24 hours, but in rare cases can take up to two weeks. we’ll e - mail you when verification is complete."
        }
        ShowButton
        // showLoader={true}
      />
    </Stack>
  );
};

export default UnderReviewPage;
