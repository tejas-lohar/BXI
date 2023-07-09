import React from "react";
import { Stack } from "@mui/material";
import VerifiedRej from "../components/VerifiedRej";
import mainImg from "../assets/Images/register/forgetpasswordotpimg.svg";

import email from "../assets/Images/verified/email.svg";
const EmailVerification = () => {
  return (
    <Stack>
      <VerifiedRej
        imgLogoUrl={email}
        headText={"Verify your email "}
        mainimg={mainImg}
        subText={
          "we’ve sent an email to loremipsum@gmail.com to verify your email address and activate your account. the link in the email will expire in 24 hours."
        }
        subTextColor={"Click here"}
        subText2={
          "if you did not receive an email or would like to change the email address you sighned up with."
        }
      />
    </Stack>
  );
};

export default EmailVerification;
