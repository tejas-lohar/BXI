import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import mainImg from "../../assets/Images/register/otpbymailimg.svg";
import { createTheme, ThemeProvider, makeStyles } from "@mui/material/styles";
import BarterHeader from "../../components/BarterHeader";
import Stepper from "../../components/Stepper";
import axios from "axios";
import { useOtp, useResendOtp } from "../../Hooks/Auth";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParam } from "react-use";
import emailIcon from "../../assets/Images/OnBoardingPages/emaiIcon.svg";
import OtpInput from "react-otp-input";
import barterLogo from "../../assets/BXI_LOGO.png";
import { useQueryClient } from "react-query";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { async } from "react-input-emoji";

const outerTheme = createTheme({
  palette: {
    primary: {
      main: "#6B7A99",
    },
  },
  typography: {
    fontSize: 20,
  },
});
const Otp = () => {
  const [otp, setOtp] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVerifyOTP = async () => {
    try {
      const data = {
        previceEmail: oldEmail,
        newEmail: newEmail,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      await axios.post("api/v1/auth/editemail", data, config);

      toast.success("OTP send Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setNewEmail("");
      setOldEmail("");
      resetTimer();
      handleClose();
    } catch (error) {
      console.log(error);

      toast.error("Company Not Found", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleChange = (enteredOtp) => {
    const combinedOtp = enteredOtp.split("").join("");
    setOtp(combinedOtp);
  };
  const email = useSearchParam("email");
  const id = useSearchParam("id");

  const navigate = useNavigate();
  const { mutate, isLoading } = useOtp();
  const { mutate: ResendOtp } = useResendOtp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: id,
    },
    // resolver: zodResolver(
    //   z.object({
    //     otp: z.string().min(3).max(4),
    //     email: z.string().email(),
    //   })
    // ),
  });

  const ResendOtpClick = () => {
    // console.log("click here");
    toast.success("OTP send Successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    ResendOtp(
      { email },
      {
        onSuccess: (res) => {
          console.log(res);
          resetTimer();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  const [seconds, setSeconds] = useState(600);
  const [timerActive, setTimerActive] = useState(true);
  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    let interval = null;

    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            setTimerActive(false); // Stop the timer when it reaches 0
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive]);

  const resetTimer = () => {
    setSeconds(600);
    setTimerActive(true);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const queryClient = useQueryClient();

  const submitOtp = handleSubmit((data) => {
    mutate(
      { id, otp },
      {
        onSuccess: async (res) => {
          await queryClient.invalidateQueries("getLoggedInUser");
          if (res?.status === 200) {
            navigate(`/gst`);
          }
        },
        onError: (err) => {
          console.log(err);
          toast.error(err.response.data?.message ?? "Internal Server Error", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      }
    );
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
          <Box>
            <Stepper />
          </Box>
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
              }}
            >
              <Grid
                container
                sx={{
                  // height: "25%",
                  position: "absolute",
                  top: "1%",
                  right: "45%",
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
                  <Box sx={{ width: "100px" }}>
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
              <Typography sx={login}>Verify your email</Typography>
              <Typography sx={metaTextStyle}>
                A One-Time password has been sent to{" "}
              </Typography>
              <Typography sx={metaEmailTextStyle}>{email}</Typography>
              <Button onClick={handleClickOpen}>Edit Email</Button>
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
                {/* <Box
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
                      Otp
                    </label>
                  </Box>
                  <input
                    {...register("otp")}
                    type={"text"}
                    placeholder={"1234"}
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
                  />
                </Box> */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "50%",
                    mx: "auto",
                  }}
                >
                  {/* <Box
                    component={"input"}
                    type="number"
                    placeholder="1"
                    sx={otpInputStyle}
                    max="1"
                    className="otpInput"
                  ></Box>
                  <Box
                    component={"input"}
                    type="number"
                    placeholder="2"
                    max="1"
                    // sx={{ width: "40px", height: "40px" }}
                    sx={otpInputStyle}
                    className="otpInput"
                  ></Box>
                  <Box
                    component={"input"}
                    type="number"
                    placeholder="3"
                    // maxLength="1"
                    max="1"
                    // sx={{ width: "40px", height: "40px" }}
                    sx={otpInputStyle}
                    className="otpInput"
                  ></Box>
                  <Box
                    component={"input"}
                    type="number"
                    placeholder="4"
                    // maxLength="1"
                    max="1"
                    // sx={{ width: "40px", height: "40px" }}
                    sx={otpInputStyle}
                    className="otpInput"
                  ></Box> */}
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
                    ml: 1,
                    fontSize: "10px",
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
                  {/* <Button
                    variant="contained"
                    fullWidth
                    onClick={ResendOtpClick}
                    sx={{
                      background: "  #375DBB",
                      height: "4rem",
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
                      marginTop: "2rem",
                    }}
                  >
                    Resend Otp
                  </Button> */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      marginTop: "1rem",
                    }}
                  >
                    <Typography
                      sx={resendOtpTextStyle}
                      onClick={timerActive ? null : ResendOtpClick}
                      style={{
                        cursor: timerActive ? "not-allowed" : "pointer",
                        color: timerActive ? "red" : "green",
                      }}
                    >
                      Resend OTP ?
                    </Typography>
                    <Typography sx={resendOtpTextStyle}>
                      OTP Valid For {minutes}:{remainingSeconds < 10 ? "0" : ""}
                      {remainingSeconds} Min
                    </Typography>
                  </Box>
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
                // src={newMainLogo}
                src={mainImg}
                alt="img"
                style={{ height: "auto", width: "100%", maxHeight: "100vh" }}
              />
            </Grid>
          </Grid>
        </Paper>
      </form>

      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Edit email"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                id="outlined-basic"
                label="Old Email"
                variant="outlined"
                value={oldEmail}
                onChange={(e) => setOldEmail(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="New Email"
                variant="outlined"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleVerifyOTP} autoFocus>
              Send OTP
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
