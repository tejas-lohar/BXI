import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Link from "@mui/material/Link";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import LeftArrow from '../../assets/Images/payment/LeftArrow.png';


const PricingDetails = () => {
  let companyId = useParams();
  let navigate = useNavigate();
  const [select, setSelect] = useState("0");

  async function functionToNavigate() {
    if (select === "1") {
      navigate(`/home/payment?plan=1`);
    } else if (select === "0") {
      navigate(`/home/payment?plan=0`);
    }
  }
  return (
    <Paper sx={{ width: "100%", bgcolor: "transparent" }} elevation={0}>
      <BreadCrumbHeader
        MainText="Membership Plans"
        LinkText1="{splitedurl[1]}"
        LinkText2="{splitedurl[2]}"
        link1="Link1"
        link2="link2"
      />
      <Paper
        sx={{
          backgroundColor: "#FFFFFF",
          boxShadow: "none",
          p: 3,
          borderRadius: "20px",
          height: "auto",
          minHeight: "520px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={0}
      >
      <Box 
      component="img"
      src={LeftArrow}
      alt="LeftArrow"
      sx={{
        width:"25px",
        height :"10px" ,
        // mx: "auto",
        // p: 2,
       marginRight : "1300px",
       cursor : "pointer"
      }}
      onClick={() => {
        navigate("/home/terms");
      }}
    />
        <Grid
          container
          sx={{
            backgroundColor: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
          }}
          gap={5}
        >
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              backgroundColor: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
            gap={2}
          >
            <Typography sx={plantext}>
            Unlock the ultimate experience with our exclusive Membership Plans !
            </Typography>
            <Typography sx={introtext}>
            Choose the Best Plan That Suits Your Needs.
            </Typography>
            <Grid>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
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
                  }}
                >
                  <Paper
                    sx={{
                      ...paperStyle,
                      border:
                        select === "0"
                          ? "2px solid #445FD2"
                          : "2px solid #EAEAEA",
                      opacity: select === "0" ? "" : "0.3",
                    }}
                    onClick={() => setSelect("0")}
                  >
                    <Box sx={card}>
                      <Typography sx={preplan}>Premium Plan</Typography>
                      <Typography sx={membertext}>Membership Fees</Typography>
                      <Typography sx={inrtext}>INR 1</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          height: "50%",
                          width: "100%",
                        }}
                      >
                        <Typography sx={TextStyleInsidePaper}>
                          <CheckIcon sx={checkicon} />
                          Brokerage : 12%
                        </Typography>
                        <Typography sx={TextStyleInsidePaper}>
                          <CheckIcon sx={checkicon} />
                          AMC : Free for First Year
                        </Typography>
                        <Typography sx={TextStyleInsidePaper}>
                          <CheckIcon sx={checkicon} />
                          Full Access to Platform
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
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
                  }}
                >
                  <Paper
                    sx={{
                      ...paperStyle,
                      border:
                        select === "1"
                          ? "2px solid #445FD2"
                          : "2px solid #EAEAEA",
                      opacity: select === "1" ? "" : "0.3",
                    }}
                    onClick={() => setSelect("1")}
                  >
                    <Box sx={card}>
                      <Typography sx={preplan}>Premium<sup>+</sup> Plan</Typography>
                      <Typography sx={membertext}>Membership Fees</Typography>

                      <Typography sx={inrtext}>INR 1,20,000</Typography>
                      <Box
                        sx={{
                          py: "2rem",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: {
                              xl: "1.5rem",
                              lg: "1.5rem",
                              md: "1.1rem",
                              sm: "0.9rem",
                              xs: "0.9rem",
                            },
                            lineHeight: "22px",
                          }}
                        >
                          ( This Deposit is interest Free Refundable Deposit)
                        </Typography>
                      </Box>

                      <Typography sx={TextStyleInsidePaper}>
                        <CheckIcon sx={checkicon} />
                        Brokerage : 8%
                      </Typography>
                      <Typography sx={TextStyleInsidePaper}>
                        <CheckIcon sx={checkicon} />
                        AMC : Free for First Year
                      </Typography>
                      <Typography sx={TextStyleInsidePaper}>
                        <CheckIcon sx={checkicon} />
                        Your Priority Account Manager
                      </Typography>
                      <Typography sx={TextStyleInsidePaper}>
                        <CheckIcon sx={checkicon} />
                        Full Access to Platform
                      </Typography>
                      <Typography sx={TextStyleInsidePaper}>
                        <CheckIcon sx={checkicon} />
                        Tokens : 120000 Tokens
                      </Typography>
                      <Typography
                        sx={{
                          ...TextStyleInsidePaper,
                          marginBottom: "0px",
                          marginLeft: "6px",
                        }}
                      >
                        <li>1 Tokens = 1 INR</li>
                      </Typography>
                      <Typography
                        sx={{
                          ...TextStyleInsidePaper,
                          marginBottom: "0px",
                          marginLeft: "6px",
                        }}
                      >
                        <li>
                          These tokens are Medium <br />
                          of exchange on the
                          <br /> Platform.
                        </li>
                      </Typography>
                      <Typography
                        sx={{
                          ...TextStyleInsidePaper,
                          marginBottom: "0px",
                          marginLeft: "6px",
                        }}
                      >
                        <li>
                          Tokens can be Used to buy
                          <br /> what you want from Market
                          <br /> place.
                        </li>
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              <Box
                sx={{
                  mx: "auto",
                  width: {
                    xl: "95%",
                    lg: "95%",
                    md: "95%",
                    sm: "95%",
                    xs: "85%",
                  },
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={functionToNavigate}
                  sx={{
                    background: "#445FD2",
                    height: "4rem",
                    borderRadius: "24px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Typography
                    size="large"
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "1.5rem",
                      textAlign: "center",
                      textTransform: "none",
                    }}
                  >
                    Choose plan
                  </Typography>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default PricingDetails;

const TextStyleInsidePaper = {
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  fontFamily: "Poppins",
  fontSize: {
    xl: "1.5rem",
    lg: "1.5rem",
    md: "1.1rem",
    sm: "0.9rem",
    xs: "0.9rem",
  },
  fontWeight: 500,
  color: "#000",
  lineHeight: "1.5",
  marginBottom: "2%",
};

const plantext = {
  fontFamily: "Poppins",
  fontStyle: "SemiBold",
  fontWeight: 600,
  fontSize: {
    xl: "26px",
    lg: "26px",
    md: "24px",
    sm: "22px",
    xs: "22px",
  },
  color: "#202020",
};

const introtext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "16px",
    lg: "16px",
    md: "14px",
    sm: "14px",
    xs: "14px",
  },
  color: "#B5BCCC",
  textAlign: "center",
  width: "75%",
  mx: "auto",
};

const paperStyle = {
  width: "90%",
  display: "flex",
  margin: "2rem",
  padding: "2rem",
  height: {
    xl: "52rem",
    lg: "52rem",
    md: "45rem",
    sm: "40rem",
    xs: "40rem",
  },
  cursor: "pointer",
  border: "2px solid #EAEAEA",
  borderRadius: "3rem",
  // "&:hover": {
  //   border: "2px solid #445FD2",
  // },
};

const checkicon = {
  color: "#445FD2",
  borderRadius: "30px",
  padding: "2px",
  background: "#E5EAEF",
};

const card = {
  textAlign: "left",
  width: {
    xl: "95%",
    lg: "95%",
    md: "90%",
    sm: "90%",
    xs: "95%",
  },
  marginLeft: "auto",
  marginTop: {
    xl: "1rem",
    lg: "1rem",
    md: "1rem",
    sm: "1rem",
    xs: "0.5rem",
  },
};

const membertext = {
  fontStyle: "normal",
  fontFamily: "Poppins",
  fontSize: {
    xl: "1.5rem",
    lg: "1.5rem",
    md: "1rem",
    sm: "0.5rem",
    xs: "0.5rem",
  },
  fontWeight: 500,
  color: "#848199",
};

const inrtext = {
  color: "#231D4F",
  fontFamily: "Poppins",
  fontSize: {
    xl: "3.6rem",
    lg: "3.6rem",
    md: "3rem",
    sm: "2rem",
    xs: "2rem",
  },
  lineHeight: {
    xl: "4.6rem",
    lg: "4.6rem",
    md: "4rem",
    sm: "3.2rem",
    xs: "3.2rem",
  },
  fontWeight: "700",
};

const preplan = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "2.8rem",
    lg: "2.8rem",
    md: "2.3rem",
    sm: "2rem",
    xs: "2rem",
  },
  lineHeight: {
    xl: "4.2rem",
    lg: "4.2rem",
    md: "3.8rem",
    sm: "3rem",
    xs: "3rem",
  },
  color: "#231D4F",
};
