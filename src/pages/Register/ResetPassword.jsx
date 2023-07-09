import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { useResetPassword } from "../../Hooks/Auth";
import mainImg from "../../assets/Images/register/newMainLogo.svg";
import BarterHeader from "../../components/BarterHeader";

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

const ResetPassword = () => {
  // const email = useSearchParam("email");
  const LocationData = useLocation();
  const navigate = useNavigate();
  console.log(LocationData?.state, " LocationData.state");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   email: email,
    // },
    resolver: zodResolver(
      z.object({
        // otp: z.string().min(3).max(4),
        // email: z.string().email(),
        newpassword: z.string().min(6),
        confirmpassword: z.string().min(6),
      })
    ),
  });
  const {
    mutate: mutateResetPassword,
    //  isLoading: resetpassLoading
  } = useResetPassword();
  // const { mutate: addNewPasswords } = useRestPassword();

  //   const addPassword = () => {
  //     const data = { otp, password, confirmPassword };
  //     data(mutate);
  //   };
  const resSetPasswords = handleSubmit((data) => {
    console.log(data);
    console.log(
      LocationData?.state?.email,
      LocationData?.state?.resetpassotp,
      data.newpassword,
      data.confirmpassword,
      data.newpassword !== data.confirmpassword,
      "condition here"
    );
    if (data.newpassword !== data.confirmpassword) {
      setError("confirmpassword", {
        type: "manual",
        message: "Password and Confirm Password must be same",
      });
    } else {
      mutateResetPassword(
        {
          email: LocationData?.state?.email,
          ResetPassOtp: LocationData?.state?.resetpassotp,
          password: data.newpassword,
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
            // console.log(res);
            setTimeout(() => {
              navigate(`/`);
            }, [1000]);
          },
          onError: (err) => {
            console.log(err);
          },
        }
      );
    }
  });

  return (
    <>
      <ToastContainer style={{ fontSize: "16px" }} />

      <form onSubmit={resSetPasswords}>
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
          <BarterHeader />
          {/* <Stepper /> */}
          <Grid
            container
            sx={{
              background: "#fff",
              height: "100vh",
              width: "100.5%",
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
              }}
            >
              <Typography sx={login}>Reset Password </Typography>
              <Box
                mt={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "75%",
                  gap: "20px",
                }}
              >
                <ThemeProvider theme={outerTheme}>
                  {/* <TextField
                  {...register("ResetPassOtp")}
                  label="Enter otp"
                  placeholder="1234"
                  variant="outlined"
                  required
                  //   onChange={(e) => {
                  //     setPassword(e.target.value);
                  //   }}
                  // size="large"
                  InputProps={{
                    style: {
                      borderRadius: "12px",
                      border: "1px #CCCCCC",
                      // padding: "4px 4px",
                      // margin: "8px 0",
                    },
                  }}
                /> */}
                  <TextField
                    {...register("newpassword")}
                    label="Enter Password"
                    placeholder="*******"
                    variant="outlined"
                    required
                    //   onChange={(e) => {
                    //     setPassword(e.target.value);
                    //   }}
                    // size="large"
                    InputProps={{
                      style: {
                        borderRadius: "12px",
                        border: "1px #CCCCCC",
                        // padding: "4px 4px",
                        // margin: "8px 0",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "red",
                    }}
                  >
                    {errors["newpassword"]?.message}
                  </Typography>
                  <TextField
                    {...register("confirmpassword")}
                    label="Confirm Password"
                    placeholder="*******"
                    variant="outlined"
                    required
                    //   onChange={(e) => {
                    //     setRePassword(e.target.value);
                    //   }}
                    InputProps={{
                      style: {
                        borderRadius: "12px",
                        border: "1px #CCCCCC",
                        // padding: "4px 4px",
                        // margin: "8px 0",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "red",
                    }}
                  >
                    {errors["confirmpassword"]?.message}
                  </Typography>
                </ThemeProvider>
              </Box>
              <Box sx={{ display: "flex", mt: 4, width: "75%", gap: "10px" }}>
                {/* <Button variant="outlined" fullWidth sx={previous}>
                Previous
              </Button> */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={loginTextButton}
                >
                  Add new Password
                </Button>
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
              <Box
                sx={{
                  width: "90%",
                  minWidth: "700px",
                  maxWidth: "1050px",
                  height: "100vh",
                  position: "absolute",
                  right: "-200px",
                  bottom: "-60px",
                }}
              >
                <img
                  // src={newMainLogo}
                  src={mainImg}
                  alt="img"
                  style={{ height: "auto", width: "100%", maxHeight: "100vh" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

export default ResetPassword;

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
};
const loginTextButton = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.4rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  textAlign: "center",
  color: "#fff",
  textTransform: "none",
};
