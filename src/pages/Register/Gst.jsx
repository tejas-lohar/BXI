import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useCompanyStepDetails, useGetCompanyDetails } from "../../Hooks/Auth";
import barterLogo from "../../assets/BXI_LOGO.png";
import mainImg from "../../assets/Images/register/gstimg.svg";
import UnderDraw from "../../assets/undraw_completed_re_cisp 1.svg";
import Stepper from "../../components/Stepper";

import { ToastContainer, toast } from "react-toastify";

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
const Gst = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [gst, setGst] = useState();
  const [alert, setAlert] = useState(false);
  const { mutate, isLoading } = useCompanyStepDetails();
  const { data: CompanyData } = useGetCompanyDetails();
  let [trueresponse, setTrueRespones] = useState(false);
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(
      z.object({
        gst: z.string().length(15),
      })
    ),
  });

  // const { data } = useGetCompanyDetails();

  const submitGst = handleSubmit((data) => {
    //  how to validate gst with this regex  ([0-9]{2}[a-z]{4}([a-z]{1}|[0-9]{1}).[0-9]{3}[a-z]([a-z]|[0-9]){3})

    var reggst =
      /^([0-2][0-9]|[3][0-7])[A-Z]{3}[ABCFGHLJPTK][A-Z]\d{4}[A-Z][A-Z0-9][Z][A-Z0-9]$/;
    if (!reggst.test(data.gst) && data.gst !== "") {
      toast.error(
        "GST Identification Number is not valid. It should be in this 11AAAAA1111Z1A1 format"
      );
    } else {
      const newData = { gst: data.gst, id };
      mutate(newData, {
        onSuccess: (Response) => {
          console.log(Response);
          if (Response) {
            setTrueRespones(true);
            setTimeout(() => {
              navigate(`/beingverified`);
            }, 3000);
          }
        },
        onError: (err) => {
          alert(err);
        },
      });
    }
  });

  // const addGst = () => {
  //   if (gst === undefined) {
  //     setAlert(true);
  //     setTimeout(() => {
  //       setAlert(false);
  //     }, [3000]);
  //   } else {
  //   }
  // };

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
    <form onSubmit={submitGst}>
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
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Stepper />

        <Grid
          container
          sx={{
            background: "#fff",
            height: "95vh",
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
            {/* {alert ? <Alert severity="error">Field Cant Be Empty</Alert> : null} */}
            <Typography sx={login}>GST Detail </Typography>
            <Box
              mt={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "75%",
                // gap: "20px",
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
                      GST Number (15 Characters)
                    </label>
                  </Box>
                  <input
                    type={"text"}
                    {...register("gst")}
                    label="GST"
                    placeholder="12345667888"
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
                </Box>
                {/* <TextField
                  {...register("gst")}
                  label="GST"
                  placeholder="12345667888"
                  variant="outlined"
                  autoFocus
                  InputProps={{
                    style: {
                      borderRadius: "12px",
                      border: "1px #CCCCCC",
                    },
                  }}
                /> */}
                <Typography
                  sx={{
                    ml: 1,
                    mt: 1,
                    fontSize: "10px",
                    color: "red",
                  }}
                >
                  {errors["gst"]?.message}
                </Typography>
              </ThemeProvider>

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
                    height: "4rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress
                      size="20px"
                      sx={{ color: "white", width: "40%" }}
                    />
                  ) : (
                    <Typography sx={loginText}>Next</Typography>
                  )}
                </Button>
                {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12} mt={3}>
                  <Typography sx={accountText}>
                    Don’t have an account?{" "}
                    <span
                      style={{
                        color: "rgba(55, 93, 187, 1)",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 400,
                      }}
                    >
                      {" "}
                      Login
                    </span>
                  </Typography>
                </Grid> */}
                {trueresponse ? (
                  <Box
                    sx={{
                      height: "auto",
                      width: "100%",
                      alignItems: "center",
                      padding: "50px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      textAlignLast: "center",
                    }}
                  >
                    <img src={UnderDraw} alt="UnderDraw" />

                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        fontSize: "32px",
                        lineHeight: "48px",
                        color: "#6B7A99",
                        width: "90%",
                      }}
                    >
                      Congratulations !{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 400,
                        fontFamily: "Poppins",
                        color: "#6B7A99",
                        LineHeight: "21px",
                        textAlign: "center",
                        width: "95%",
                        fontSize: "14px",
                      }}
                    >
                      You have successfully completed the second step of your
                      registration process.
                    </Typography>
                  </Box>
                ) : null}
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
  );
};

export default Gst;

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

const loginText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
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
