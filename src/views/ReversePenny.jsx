import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCompanyStepDetails, useGetCompanyDetails } from "../Hooks/Auth";
import barterLogo from "../assets/BXI_LOGO.png";
import mainImg from "../assets/Images/register/reverspennyimg.svg";
import cashback from "../assets/Images/verified/cashback.svg";

const ReversePenny = () => {
  const [onlyState, setOnlyState] = useState(false);
  const navigate = useNavigate();
  // const [CompanyDetailsData, setCompanyDetailsData] = useState();
  const {
    data: cdata,
    isError: dataError,
    isLoading: cdataLoading,
    refetch: cdataRefetch,
  } = useGetCompanyDetails();
  const { mutate } = useCompanyStepDetails();

  const FecthCompanyDetails = async () => {
    await axios
      .get("api/v1/onboard-company")
      .then((res) => {
        // setCompanyDetailsData(res.data);
      })
      .catch((err) => console.log(err));
  };
  if (cdata?.data?.companyOnboardingStatus === "UNDER_REVIEW") {
    navigate("/under_review");
  } else if (cdata?.data.companyOnboardingStatus === "TNC") {
    navigate("/home/terms");
  }
  useEffect(() => {
    FecthCompanyDetails();
  }, [cdata]);

  const forwardPennyClick = async () => {
    mutate(
      {},
      {
        onSuccess: (res) => {
          console.log(res);
          cdataRefetch();
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  useEffect(() => {
    forwardPennyClick();
  }, []);
  return (
    <Stack>
      {/* <VerifiedRej
        imgLogoUrl={ForwardPenny}
        headText={"Forward penny drop "}
        subText={
          "Please check your bank account because we will collect Rs. 1 from this account and again deposit Rs.1 in your bank account. "
        }
      /> */}
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
        {/* <Stepper /> */}
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
            <Box pb={2}>
              <img
                src={cashback}
                alt="protect"
                style={{
                  height: "auto",
                  width: "auto",
                }}
              />
            </Box>
            <Typography sx={login}> Collecting INR 1 </Typography>
            <Box
              mt={2}
              sx={{
                width: {
                  xl: "75%",
                  lg: "75%",
                  md: "70%",
                  sm: "70%",
                  xs: "95%",
                },
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Typography sx={intoText}>
                Please note we are collecting INR 1 from your bank account.
              </Typography>
            </Box>
            <Box
              mt={2}
              sx={{
                width: {
                  xl: "75%",
                  lg: "75%",
                  md: "70%",
                  sm: "70%",
                  xs: "95%",
                },
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Typography sx={intoText}>
                {" "}
                <span
                  style={{ color: "rgba(68, 95, 210, 1)", fontWeight: 600 }}
                >
                  {/* {subTextColor} */}
                </span>{" "}
                {/* {subText2} */}
              </Typography>
            </Box>
            {/* {ShowButton === true ? ( */}

            {/* ) : null}
            {showLoader ? (
            ) : null} */}
            <CircularProgress sx={{ marginTop: "2rem" }} />
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
    </Stack>
  );
};

export default ReversePenny;
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
  textAlign: "center",
};

const intoText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.4rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  textAlign: "center",
  color: "#6B7A99",
};

// const loginText = {
//   fontFamily: "Poppins",
//   fontStyle: "normal",
//   fontWeight: 400,
//   fontSize: {
//     xl: "1.8rem",
//     lg: "1.8rem",
//     md: "1.4rem",
//     sm: "1.4rem",
//     xs: "1.4rem",
//   },
//   textAlign: "center",
//   color: "rgba(107, 122, 153, 1)",
//   textTransform: "none",
// };

const btn = {
  background: "rgba(68, 95, 210, 1)",
  width: "75%",
  height: "4rem",
  marginLeft: "auto",
  marginRight: "auto",
  // border: "1px solid rgba(237, 239, 242, 1)",
  marginTop: "4rem",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.4rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  textAlign: "center",
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    bgcolor: "rgba(68, 95, 210, 1)",
  },
};
