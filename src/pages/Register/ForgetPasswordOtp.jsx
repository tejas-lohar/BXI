import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import {
  useOtp,
  useResetPassword,
  useVerifyresetpassOtp,
} from "../../Hooks/Auth";
import barterLogo from "../../assets/BXI_LOGO.png";
import emailIcon from "../../assets/Images/OnBoardingPages/emaiIcon.svg";
import mainImg from "../../assets/Images/register/forgetpasswordotpimg.svg";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const handleChange = (enteredOtp) => {
    const combinedOtp = enteredOtp.split("").join("");
    setOtp(combinedOtp);
  };
  const Location = useLocation();
  // console.log(Location, "Location");
  const email = Location?.state?.email;
  const navigate = useNavigate();
  const { mutate, isLoading } = useOtp();
  const { mutate: mutateResetPassword, isLoading: resetpassLoading } =
    useResetPassword();
  const { mutate: VerifyOtpMutate, isLoading: verifyingOtpLoading } =
    useVerifyresetpassOtp();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
    },
    resolver: zodResolver(z.object({})),
  });

  const [seconds, setSeconds] = useState(600);
  console.log(errors, "errors");
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const submitOtp = handleSubmit((data) => {
    if (otp?.length < 4) {
      setError("otp", {
        type: "manual",
        message: "Please Enter Valid OTP of 4 digits",
      });
    } else {
      VerifyOtpMutate(
        {
          email: email,
          resetpassotp: otp,
          // password: data.newpassword,
        },
        {
          onSuccess: (res) => {
            toast.success(
              res?.data?.message ??
                "Otp verified successfully, Please reset your password",
              {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            console.log(res);
            // if (res?.data?.message === "Password Reset Successfully") {
            setTimeout(() => {
              navigate(`/resetpassword`, {
                state: {
                  email: email,
                  resetpassotp: otp,
                },
              });
            }, 1000);
            // }
          },
          onError: (err) => {
            console.log(err.response.status, err.response.data.message, "err");
            if (err.response.status === 401) {
              setError("otp", {
                type: "manual",
                message: err.response.data.message,
              });
            }
          },
        }
      );
    }
    // }
  });

  return (
    <>
      <form onSubmit={submitOtp}>
        <ToastContainer style={{ fontSize: "16px" }} />

        <Paper
          elevation={0}
          sx={{
            boxShadow: "0px",
            height: "100vh",
            width: "100%",
            maxHeight: "100vh",
            maxWidth: "100vw",
            overflowY: "hidden",
            overflowX: "hidden",
            position: "relative",
          }}
        >
          {/* <BarterHeader /> */}
          <Grid
            container
            sx={{
              background: "#fff",
              height: "100vh",
              width: "110%",
            }}
          >
            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: {
                  xl: "3.2rem",
                  lg: "3.1rem",
                  md: "3rem",
                  sm: "2.8rem",
                  xs: "2.6rem",
                },
                color: "#6B7A99",
                marginTop: "-15rem",
              }}
            >
              <Grid
                container
                sx={{
                  height: "25%",
                }}
              >
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box sx={{ width: "100px", mt: 3 }}>
                    <img
                      src={barterLogo}
                      alt="img"
                      style={{
                        height: "auto",
                        width: "70px",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Box component={"img"} src={emailIcon}></Box>
              <Typography sx={login}>OTP Verification</Typography>
              <Typography sx={metaTextStyle}>
                A One-Time password has been sent to{" "}
              </Typography>
              <Typography sx={metaEmailTextStyle}>{email}</Typography>

              <Box
                mt={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "75%",
                  gap: "5px",
                  maxWidth: "450px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "50%",
                    mx: "auto",
                  }}
                >
                  <OtpInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={4}
                    // separator={<span> </span>}
                    isInputNum={true}
                    containerStyle={{
                      gap: "2rem",
                    }}
                    separateAfter={false}
                    onSubmit={console.log(otp)}
                    inputStyle={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      textAlign: "center",
                      border: "1px solid rgba(55, 93, 187, 1)",
                      fontFamily: "Outfit",
                      fontStyle: "normal",
                      fontWeight: 800,
                      fontSize: 15,
                      lineHeight: 19,
                      color: "#000000",
                      background: "#F6F6F6",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "12px",
                    color: "red",
                  }}
                >
                  {errors["otp"]?.message}
                </Typography>

                <Grid
                  container
                  mt={3}
                  sx={{
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      background: "  #375DBB",
                      // height: "4rem",
                      marginLeft: "auto",
                      marginRight: "auto",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: {
                        xl: "1.8rem",
                        lg: "1.8rem",
                        md: "1.4rem",
                        sm: "1.4rem",
                        xs: "1.4rem",
                      },
                      textAlign: "center",
                      color: "#FFFFFF",
                      textTransform: "none",
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress
                        size={"20px"}
                        sx={{ color: "white", width: "50%" }}
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Grid>
              </Box>
            </Grid>
            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              sx={{
                display: {
                  xl: "block",
                  lg: "block",
                  md: "block",
                  sm: "none",
                  xs: "none",
                },
                justifyContent: "center",
              }}
            >
              <img
                src={mainImg}
                alt="img"
                style={{ height: "auto", width: "100%", maxHeight: "100vh" }}
              />
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

export default Otp;

const InputField = (props) => {
  return (
    <Box
      sx={{
        width: "95%",
        height: "auto",
        borderRadius: "12px",
        border: "1px #CCCCCC",
        marginTop: "03px",
        position: "relative",
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: 400,
        bgcolor: "transparent",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "10%",
          top: "-20%",
          bgcolor: "#fff",
          px: 1,
          fontSize: {
            xl: "14px",
            lg: "14px",
            md: "12px",
            sm: "12px",
            xs: "12px",
          },
        }}
      >
        <label
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,

            color: "#6B7A99",
          }}
        >
          {props.title}
        </label>
      </Box>
      <input
        type={props.inputType}
        placeholder={props.placeholder}
        style={{
          mt: 2,
          width: "100%",
          height: "5rem",
          borderRadius: "12px",
          padding: "0 1rem",
          fontFamily: "Poppins",
          fontStyle: "normal",
          // required: "true",
          fontWeight: 400,
          border: "1px solid #CCCCCC",
          textAlign: "left",
          color: "#6B7A99",
        }}
        // onChange={(e) => props.textFunction(e.target.value)}
      />
    </Box>
  );
};

const login = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "3.2rem",
    lg: "3.1rem",
    md: "3rem",
    sm: "2.8rem",
    xs: "2.6rem",
  },
  color: "#6B7A99",
  marginTop: "2rem",
};

const remText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.4rem",
    lg: "1.3rem",
    md: "1.3rem",
    sm: "1.3rem",
    xs: "1.3rem",
  },
  color: "#6B7A99",
  // marginTop: "rem",
};

const accountText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.4rem",
    sm: "1.2rem",
    xs: "1rem",
  },
  color: "#A1A1A1",
  textAlign: {
    xl: "left",
    lg: "left",
    md: "center",
    sm: "center",
    xs: "center",
  },
};

const loginText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.4rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  lineHeight: 24,
  textAlign: "center",
  color: "#FFFFFF",
  textTransform: "none",
};
const metaTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "22px",
  textAlign: "center",
  color: "#6B7A99",
  // marginx: "4rem",
  marginTop: "2rem",
  marginBottom: "0.5rem",
};
const metaEmailTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "15px",
  lineHeight: "22px",
  textAlign: "center",

  color: "#375DBB",
};
// const counterTextStyle = {
//   fontFamily: "Poppins",
//   fontStyle: "normal",
//   fontWeight: 400,
//   fontSize: 15,
//   lineHeight: 22,
//   textAlign: "center",
//   color: "#6B7A99",
// };
const resendOtpTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "22px",
  textAlign: "center",
  color: "#6B7A99",
  cursor: "pointer",
};
const otpInputStyle = {
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  textAlign: "center",
  border: "1px solid rgba(55, 93, 187, 1)",
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 800,
  fontSize: 15,
  lineHeight: 19,
  color: "#000000",
  background: "#F6F6F6",
};
