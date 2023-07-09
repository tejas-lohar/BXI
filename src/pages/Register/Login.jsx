import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useLoginUser } from "../../Hooks/Auth";
import barterLogo from "../../assets/BXI_LOGO.png";
import mainImg from "../../assets/Images/register/loginimg.svg";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";

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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: LoginClick } = useLoginUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    ),
  });
  console.log("errors", errors);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const queryClient = useQueryClient();
  const LoginUserClick = handleSubmit((data) => {
    const Senddata = { email: data.email, password: data.password };
    LoginClick(Senddata, {
      onSuccess: async (res) => {
        await queryClient.invalidateQueries("getLoggedInUser");
        console.log("ressss", res);
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (res.status === 404) {
          toast.error(
            res.response?.data?.message ?? "User Not Found! Please Try Again",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
        setTimeout(() => {
          switch (res?.data?.data?.companyOnboardingStatus) {
            case "GST":
              navigate("/gst");
              break;
            case "BANK_DETAILS":
              navigate("/bank");
              break;
            case "REVERSE_DROP":
              navigate("/forward_penny");
              break;
            case "COURT_CASE":
              navigate("/reverse_penny");
              break;
            case "TNC":
              navigate("/home/terms");
              break;
            case "PAYMENT":
              navigate("/home/payment");
              break;
            case "UNDER_REVIEW":
              navigate("/under_review");
              break;
            case "COMPLETE":
              navigate("/home");
              break;
            case "FORWARD_DROP":
              navigate("/forward_penny");
              break;
            default:
              navigate("/");
              break;
          }
        }, [2000]);

        // switch (res.data.companyOnboardingStatus) {
        //   case "GST":
        //     break;
        //   case "BANK_DETAILS":
        //     navigate("/bank");
        //     console.log("BANK_DETAILS");

        //     break;
        //   case "REVERSE_DROP":
        //     navigate("/forward_penny");
        //     console.log("REVERSE_DROP");
        //     break;
        //   case "COURT_CASE":
        //     navigate("/reverse_penny");
        //     console.log("COURT_CASE");
        //     break;
        //   case "TNC":
        //     navigate("/terms");
        //     console.log("TNC");
        //     break;
        //   case "PAYMENT":
        //     navigate("/payment");
        //     console.log("PAYMENT");
        //     break;
        //   case "UNDER_REVIEW":
        //     navigate("/under_review");
        //     console.log("UNDER_REVIEW");
        //     break;
        //   case "APPROVED":
        //     navigate("/home");
        //     console.log("APPROVED");
        //     break;
        //   default:
        //     navigate("/");
        //     break;
        // }
      },
      onError: (error) => {
        toast.error(
          error.response?.data ?? "Not Been Able To Process! Please Try Again",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        console.log("===>error ", error);
      },
    });
    //  store login data in local storage
    localStorage.setItem("loginData", JSON.stringify(Senddata));
  });

  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100%",
        maxHeight: "100vh",
        maxWidth: "100vw",
        overflowY: "hidden",
        bgcolor: "red",
      }}
    >
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
        <form onSubmit={LoginUserClick}>
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
              md={5}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: "-20rem",
              }}
            >
              <Grid
                container
                sx={{
                  height: "25%",
                  // bgcolor: "red",
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
              <Typography sx={login}> Log In</Typography>

              <Box
                mt={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "90%",
                  gap: "20px",
                  maxWidth: "450px",
                }}
              >
                <ThemeProvider theme={outerTheme}>
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
                        Email Address
                      </label>
                    </Box>
                    <input
                      type={"text"}
                      {...register("email")}
                      placeholder="Loremipsum@gmail.com"
                      style={{
                        mt: 2,
                        width: "100%",
                        height: "4rem",
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
                  </Box>

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
                        Password
                      </label>
                    </Box>
                    {/* <input
                      type={"password"}
                      {...register("password")}
                      placeholder="********"
                      style={{
                        mt: 2,
                        width: "100%",
                        height: "4rem",
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
                    /> */}
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      placeholder="********"
                      style={{
                        mt: 2,
                        width: "100%",
                        height: "4rem",
                        borderRadius: "12px",
                        padding: "0 1rem",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 400,
                        border: "1px solid #CCCCCC",
                        textAlign: "left",
                        color: "#6B7A99",
                      }}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </Box>
                </ThemeProvider>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginRight: "auto",
                    // p: 2,
                    gap: {
                      xl: "10px",
                      lg: "10px",
                      md: "10px",
                      sm: "6px",
                      xs: "6px",
                    },
                    ml: 1.8,
                  }}
                >
                  <input type="checkbox" />
                  <Typography sx={remText}>Remember me ? </Typography>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "  #375DBB",
                    width: "100%",
                    height: "4rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  // onClick={handleLoginClick}
                >
                  <Typography sx={loginText}>Log in</Typography>
                </Button>
                <Grid
                  container
                  mt={1}
                  sx={{
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography sx={accountText}>
                      Don’t have an account?{" "}
                      <Link
                        to={"/createaccount"}
                        style={{ textDecoration: "none" }}
                      >
                        <span
                          style={{
                            // color: "rgba(107, 122, 153, 1)",
                            color: "#375DBB",
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: 400,
                          }}
                        >
                          {" "}
                          Sign up
                        </span>
                      </Link>
                    </Typography>

                    <Link to={"/forget"} style={{ textDecoration: "none" }}>
                      <Typography
                        sx={{
                          ...accountText,
                          fontWeight: 700,
                          fontSize: {
                            xl: "1.4rem",
                            lg: "1.4rem",
                            md: "1.4rem",
                            sm: "1.2rem",
                            xs: "1rem",
                          },
                          // color: "rgba(107, 122, 153, 1)",
                          color: "#375DBB",
                        }}
                      >
                        Forgot password ?{" "}
                      </Typography>
                    </Link>
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
                  xl: "flex",
                  lg: "flex",
                  md: "flex",
                  sm: "none",
                  xs: "none",
                },
                // justifyContent: "center",
              }}
            >
              <img
                // src={newMainLogo}
                src={mainImg}
                alt="img"
                style={{
                  height: "auto",
                  width: "100%",
                  maxHeight: "100vh",
                }}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Paper>
  );
};

export default Login;

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
  textAlign: "center",
  color: "#FFFFFF",
  textTransform: "none",
};
