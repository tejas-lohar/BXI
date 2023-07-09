import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { default as React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import mainImg from "../../assets/Images/register/bankdetailimg.svg";
import Stepper from "../../components/Stepper";
import UnderDraw from "../../assets/undraw_completed_re_cisp 1.svg";
import {
  useCompanyStepDetails,
  useGetCompanyDetails,
} from "../../Hooks/Auth";
import cashback from "../../assets/Images/verified/cashback.svg";
import VerifiedRej from "../../components/VerifiedRej";
import barterLogo from "../../assets/BXI_LOGO.png";
import { useEffect } from "react";
import axios from "axios";
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

const BankDetails = () => {
  const { id } = useParams();
  const { data: companyData } = useGetCompanyDetails();
  const [bankresponse, setBankResponse] = useState(false);
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetailsData] = useState();
  const FecthCompanyDetails = async () => {
    await axios
      .get("/api/v1/onboard-company")
      .then((res) => {
        setCompanyDetailsData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const { mutate, isLoading } = useCompanyStepDetails();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(
      z.object({
        branchName: z.string().min(3),
        ifsc: z.string().min(11),
        bankAccountNo: z.string().min(11),
        pan: z.string().length(10),
      })
    ),
  });
  useEffect(() => {
    FecthCompanyDetails();
  }, []);

  const submitForm = handleSubmit((data) => {
    const newData = { bankdetails: data, id };
    mutate(newData, {
      onSuccess: (res) => {
        setBankResponse(true);
        setTimeout(() => {
          navigate("/forward_penny");
        }, 3000);
      },
      onError: (err) => {
        // alert(err);
      },
    });
  });

  if (companyData?.data?.companyOnboardingStatus === "UNDER_REVIEW") {
    navigate("/under_review");
  } else if (companyData?.data?.companyOnboardingStatus === "BANK_DETAILS") {
  }

  if (isLoading) {
    return (
      <Stack>
        <VerifiedRej
          imgLogoUrl={cashback}
          headText={"Forward penny drop "}
          subText={
            "Please check your bank account because we credited 1 rupee to it. To determine whether the account information is correct."
          }
          showLoader
        />
      </Stack>
    );
  }

  return (
    <form onSubmit={submitForm}>
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
        <Stepper />
        <Grid
          mt={0}
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
              mt: 10,
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
            {/* {alert ? <Alert severity="error">{errorMessage}</Alert> : null} */}
            <Typography sx={login}>Company Bank Details </Typography>
            <Box
              mt={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                width: "75%",
                gap: "15px",
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
                      Pan No.
                    </label>
                  </Box>
                  <input
                    type={"text"}
                    {...register("pan")}
                    placeholder="HNM51*****"
                    style={InputStyle}
                  />
                </Box>

                <Typography
                  sx={{
                    ml: 1,
                    fontSize: "10px",
                    color: "red",
                  }}
                >
                  {errors["pan"]?.message}
                </Typography>
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
                      Account no.
                    </label>
                  </Box>
                  <input
                    type={"text"}
                    {...register("bankAccountNo")}
                    placeholder="1234xxxxxxx89"
                    style={InputStyle}
                  />
                </Box>

                <Typography
                  sx={{
                    ml: 1,
                    fontSize: "10px",
                    color: "red",
                  }}
                >
                  {errors["bankAccountNo"]?.message}
                </Typography>
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
                      Branch Name
                    </label>
                  </Box>
                  <input
                    type={"text"}
                    {...register("branchName")}
                    placeholder="East Mumbai"
                    style={InputStyle}
                  />
                </Box>

                <Typography
                  sx={{
                    ml: 1,
                    fontSize: "10px",
                    color: "red",
                  }}
                >
                  {errors["branchName"]?.message}
                </Typography>
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
                      IFSC Code
                    </label>
                  </Box>
                  <input
                    type={"text"}
                    {...register("ifsc")}
                    placeholder="SBIN0016028"
                    style={InputStyle}
                  />
                </Box>

                <Typography
                  sx={{
                    ml: 1,
                    fontSize: "10px",
                    color: "red",
                  }}
                >
                  {errors["ifsc"]?.message}
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
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "  #375DBB",
                    height: "4rem",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  type="submit"
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

                {bankresponse ? (
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
                ) : (
                  <Box
                    sx={{
                      height: "auto",
                      width: "100%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "1rem",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        lineHeight: "21px",
                        color: "#6B7A99",
                      }}
                    >
                      Important note :
                    </Typography>
                    <Typography sx={note}>
                      1. BXI will deposit INR 1 in this account and same will be
                      reversed.
                    </Typography>
                    <Typography sx={note}>
                      2. This account will be used for collection of GST, BXI
                      Fees, transportation and other charges.
                    </Typography>
                    <Typography sx={note}>
                      3. Here you will receive your GST and other charges.
                    </Typography>
                  </Box>
                )}
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
  );
};

export default BankDetails;

const InputStyle = {
  mt: 2,
  width: "100%",
  height: "40px",
  borderRadius: "12px",
  padding: "0 1rem",
  fontFamily: "Poppins",
  fontStyle: "normal",
  // required: "true",
  fontWeight: 400,
  border: "1px solid #CCCCCC",
  textAlign: "left",
  color: "#6B7A99",
};

const mainText = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: 16,
  textAlign: "center",
  color: "#6B7A99",
  display: "flex",
  justifyContent: "space-around",
};

const login = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "22px",
    lg: "22px",
    md: "22px",
    sm: "22px",
    xs: "22px",
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

const note = {
  fontFamily: "Poppins",
  fontSize: "14px",
  width: "101%",
  fontWeight: 400,
  lineHeight: "21px",
  color: "#6B7A99",
};