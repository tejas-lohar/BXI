import { Stack } from "@mui/material";
import React from "react";
import { useCompanyDetails } from "../Hooks/Auth";
import mainImg from "../assets/Images/register/rejectimg.svg";
import profile from "../assets/Images/verified/profile.svg";
import VerifiedRej from "../components/VerifiedRej";
const RejectPage = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  const { data: companyDetails } = useCompanyDetails();
  console.log(companyDetails);
  // const { data } = useGetCompanyById(id);

  return (
    <Stack>
      <VerifiedRej
        imgLogoUrl={profile}
        headText={"Your account has been rejected"}
        mainimg={mainImg}
        subText={
          // companyDetails?.data?.reason
          "We Regret to inform you that your account has been rejected and at the moment put on hold, we will keep you inform for future opportunities. Appreciate your interest in BXI. For further assistance you can write to us at support@bxiworld.com"
        }
      />
    </Stack>
  );
};

export default RejectPage;
