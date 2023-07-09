import React, { useEffect } from "react";
import { Grid, Typography, Button, Paper } from "@mui/material";

import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { useState } from "react";
import GoLeft from "../../../assets/Images/CommonImages/GoLeft.png";
import { Box, Stack } from "@mui/system";
import makeStyles from "@mui/styles/makeStyles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useGetCompanyTypeData from "../../../Hooks/CompanyData/useGetCompanyTypeData";

import { useGetCompanyDetails } from "../../../Hooks/Auth";
import PageLoader from "../../../components/LoadingButton/PageLoader";

const useStyles = makeStyles((theme) => ({
  borderedText: {
    position: "relative",
    padding: "0 1rem",
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      width: "50%",
      borderTop: "1px solid #E0E2EA",
    },
    "&::before": {
      left: 100,
    },
    "&::after": {
      right: 100,
    },
    "& span": {
      position: "relative",
      display: "inline-block",
      padding: "10px",
      backgroundColor: "#fff",
      zIndex: 1,
    },
  },
}));

const PhysicalDeliveryTypeArray = [
  {
    id: 1,
    name: "Single SKU- Multiple QTY",
    desc: "One Product , Multiple Qty , Single SKU & Multiple Colors to be uploaded here",
    bulkupload: false,
  },
  {
    id: 2,
    name: "Multiple SKU & Bulk QTY",
    desc: "Multiple Products, Multiple Designs, Multiple Sizes and Colors to be Uploaded here.",
    bulkupload: true,
  },
];

const DigitalDeliveryTypeArray = [
  {
    id: 1,
    name: "Offer Specific",
    desc: "Specific / Code ( One Time | Single Use | Specific to Something | Only That is Available )",
  },
  {
    id: 2,
    name: "Value Voucher / Gift Cards ",
    desc: "Value Vouchers  - It is a Value Which Can be Used for Multiple Services / Products In One Go Only. Gift Card / Wallet : Full Value Can be Used on Your Own Website by Buyer",
  }

];

export default function AddProducts() {
  const [selectedOne, setSelectedOne] = useState(true);
  const [selectedTwo, setSelectedTwo] = useState(false);
  const [selectedBulkUpload, setSelectedBulkUpload] = useState(false);
  const [physicalData, setPhysicalData] = useState();
  const [digitalData, setDigitalData] = useState();
  const [isVoucher, setIsVoucher] = useState(false);
  const [CheckCompanyType, setCheckCompanyType] = useState("");

  const classes = useStyles();

  const navigate = useNavigate();

  const { data: CompanyData } = useGetCompanyDetails();
  const {
    data: CompanyTypeData,
    isLoading: CompanyTypeDataLoading,
    error: CompanyTypeDataError,
    refetch: CompanyTypeDataRefetch,
  } = useGetCompanyTypeData(CompanyData?.data?.companyType);

  useEffect(() => {
    if (CompanyTypeData?.data?.CompanyTypeName === "Hotel") {
      setIsVoucher(true);
      setSelectedTwo(true);
    }
  }, [CompanyTypeData]);

  const NavigateFunction = () => {
    CompanyTypeDataRefetch();
    if (digitalData?.id || physicalData?.id) {
      localStorage.setItem("digitalData", digitalData.name);
      navigate("/home/eeVoucher");
    } else {
      alert("Please Select One Option");
    }
  };

  const DeliveryCompanyType = [
    {
      CompanyType: "Textile",
      text: "Let your brands perfect blend of comfort and style be discovered in our Textile Products.",
    },
    {
      CompanyType: "Hotel",
      text: "Let buyer Experience luxury and comfort of your premium hotel",
    },
    {
      CompanyType: "Lifestyle",
      text: "Style Your Buyers and Make Them FAMOUS , YO !",
    },
    {
      CompanyType: "Mobility",
      text: "Let Them Discover the Freedom to Go Where Ever They Want with Your Mobility Products, Make Your Listing Count !",
    },
    {
      CompanyType: "Electronics",
      text: "Let the Buyer Experience, The Latest in Technology with Your Cutting Edge Electronic Offerings !",
    },
    {
      CompanyType: "Office Supply",
      text: "Get Discovered by listing your products. The future of office shopping, now just a few clicks away.",
    },
    {
      CompanyType: "FMCG",
      text: "Revolutionizing the way your brand’s everyday essentials are made available to buyers. Lets begin to list.",
    },
    {
      CompanyType: "QSR",
      text: "The future of dining out: ordering in. Start to List!",
    },
    {
      CompanyType: "Entertainment & Events",
      text: "Let Your Offering of Entertainment and Recreation, Keep the Buyers Engaged, Active & Entertained !",
    },
  ];

  if (CompanyTypeDataLoading) {
    return <PageLoader />;
  }

  if (CompanyTypeDataError) {
    return <PageLoader />;
  }

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "transparent",
      }}
      elevation={0}
    >
      <BreadCrumbHeader title="Addcghfh Product " MainText={"Add Voucher "} />
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "#fff",
          borderRadius: "20px 20px 20px 20px",
        }}
      >
        <Grid container>
          <Box
            component={"img"}
            src={GoLeft}
            sx={{
              width: "22px",
              marginLeft: "1%",
              marginTop: "2%",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/home");
            }}
          />
          {/* <Box
            component="img"
            src={GoLeft}
            alt="LeftArrow"
            sx={{
              height: "30px",
              width: "30px",
              position: "absolute",
              left: "0",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/home");
            }}
          /> */}
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

            <Typography sx={Howwouldyou}>
              How are you offering this Product ?
            </Typography>


            <Typography sx={maindescription}>
              <span>
                Let the Buyer be dazzled to Your World-Class Event & Entertainment Venues.
              </span>
            </Typography>

            <Box sx={Box0}>

              <Button
                onClick={() => {
                  setSelectedOne(true);
                  setSelectedTwo(false);
                }}
                sx={{
                  ...DigitalPhysicalButtonStyle,
                  border: selectedOne
                    ? "2px solid #445FD2"
                    : "2px solid #EDEFF2",
                  color: `${selectedOne
                    ? "rgba(57, 61, 94, 0.5)"
                    : "rgba(57, 61, 94, 0.3)"
                    }`,
                }}
              >
                <Typography
                  sx={{
                    ...singleupload,
                    color: `${selectedOne ? "#6B7A99" : "rgba(57, 61, 94, 0.3)"
                      }`,
                  }}
                >
                  Entertainment
                </Typography>

                <Typography sx={Typo1}>
                  Value Vouchers for your FEC | Entertainment | Activity Center | Parks | Adventures Click Here
                </Typography>

              </Button>

              <Button
                onClick={() => {
                  setSelectedTwo(true);
                  setSelectedOne(false);
                }}
                sx={{
                  ...DigitalPhysicalButtonStyle,
                  border: selectedTwo
                    ? "2px solid #445FD2"
                    : "2px solid #EDEFF2",
                  color: `${selectedTwo
                    ? "rgba(57, 61, 94, 0.5)"
                    : "rgba(57, 61, 94, 0.3)"
                    }`,
                }}
              >
                <Typography
                  sx={{
                    ...singleupload,
                    color: `${selectedTwo ? "#6B7A99" : "rgba(57, 61, 94, 0.3)"
                      }`,
                  }}
                >
                  Events
                </Typography>

                <Typography sx={Typo2}>
                  Date Specific Shows | Events | Programs | Gathering Click here
                </Typography>

              </Button>
            </Box>


            <Box
              sx={{
                textAlign: "center",

              }}
            >
              <Typography
                className={classes.borderedText}
                sx={ButtonClickTitle1}
              >
                <span>Please ! Select Type of Voucher You are Offering.</span>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "90%",
                  mx: "auto",
                  maxWidth: "800px",
                  alignItems: "center",
                  alignContent: "center",
                  height: "auto",
                  mt: 2,
                }}
              >
                {DigitalDeliveryTypeArray?.map((res, idx) => {
                  return (
                    <Button
                      onClick={() => {
                        setDigitalData(res);
                      }}
                      sx={{
                        ...ButtonChildStyle,
                        border:
                          digitalData?.id === res?.id
                            ? "2px solid #445FD2"
                            : "2px solid  #EDEFF2",
                        color: `${digitalData?.id === res?.id
                          ? "rgba(57, 61, 94, 0.5)"
                          : "rgba(57, 61, 94, 0.3)"
                          }`,
                      }}
                    >
                      <Typography
                        sx={{
                          ...singleupload,
                          color: `${digitalData?.id === res?.id
                            ? "#6B7A99"
                            : "rgba(57, 61, 94, 0.3)"
                            }`,
                        }}
                      >
                        {res.name}
                      </Typography>
                      <Typography
                        sx={{
                          ...offerservicetext,
                          color: `${digitalData?.id === res?.id
                            ? "rgba(57, 61, 94, 0.5)"
                            : "rgba(57, 61, 94, 0.3)"
                            }`,
                        }}
                      >
                        {res.desc}
                      </Typography>
                    </Button>
                  );
                })}
              </Box>
            </Box>

            <Box
              sx={{
                display: "grid",
                gap: "10px",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "auto",
                width: "100%",
                py: 5,
                bgcolor: "transparent",
              }}
            >
              <Button
                sx={{
                  width: "100%",
                  minWidth: {
                    xl: "600px",
                    lg: "600px",
                    md: "550px",
                    sm: "450px",
                    xs: "300px",
                  },
                  bgcolor: "#445FD2",
                  mx: "auto",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  color: "#FFFFFF",
                  textTransform: "none",
                  height: "42px",
                  borderRadius: "10px",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "21px",
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#445FD2",
                    border: "2px solid #445FD2",
                    opacity: 1,
                  },
                }}
                onClick={NavigateFunction}
              >
                List Product
              </Button>
              <Button
                sx={{
                  textTransform: "none",
                  width: "auto",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
                variant="text"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Skip To Explore
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
}

const DigitalPhysicalButtonStyle = {
  borderRadius: "14px",
  display: "block",
  mt: 2,
  height: {
    xl: "121px",
    lg: "121px",
    md: "121px",
    sm: "121px",
    xs: "121px",
  },
  width: "auto",
  maxWidth: {
    xl: "200px",
    lg: "200px",
    md: "200px",
    sm: "190px",
    xs: "170px",
  },
  mx: "auto",
  ":hover": {
    opacity: 1,
    border: "2px solid #445FD2",
    background: "#FFFFFF",
  },
};

const ButtonChildStyle = {
  mt: 2,
  borderRadius: "14px",
  display: "block",
  mx: "auto",
  height: "160px",
  maxHeight: {
    xl: "160px",
    lg: "171px",
    md: "171px",
    sm: "171px",
    xs: "171px",
  },
  width: {
    xl: "208px",
    lg: "208px",
    md: "208px",
    sm: "208px",
    xs: "208px",
  },
  overFlowY: "scroll",
  ":hover": {
    opacity: 1,
    border: "2px solid #445FD2",
    background: "#FFFFFF",
  },
};

const Howwouldyou = {
  textAlign: "center",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  width: "100%",
  mx: "auto",
  fontSize: {
    xl: "25.008px",
    lg: "24px",
    md: "22.4px",
    sm: "19.2px",
    xs: "16px",
  },
  color: "#393D5E",
};

const maindescription = {
  color: " rgba(57, 61, 94, 0.54)",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontSize: {
    xl: "16px",
    lg: "16px",
    md: "16px",
    sm: "14px",
    xs: "12px",
  },
  fontWeight: 400,
  // letterSpacing: "0em",
  textAlign: "center",
  marginTop: "1%",
  width: {
    xl: "55%",
    lg: "55%",
    md: "70%",
    sm: "85%",
    xs: "90%",
  },
  mx: "auto",
};

const Box0 = {
  mt: 3,
  mb: 3,
  width: {
    xl: "90%",
    lg: "90%",
    md: "90%",
    sm: "90%",
    xs: "90%",
  },
  mx: "auto",
  gap: "10px",
  maxWidth: "600px",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
};
const Typo1 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10px",
  color: "rgba(57, 61, 94, 0.5)",
  // color: "red",
  textTransform: "none",
};
const Typo2 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10px",
  // color: "rgba(57, 61, 94, 0.5)",
  textTransform: "none",
};
const ButtonClickTitle1 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  color: "#6B7A99",
  width: "100%",
};
const offerservicetext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10px",
  // color: "#ADB8CC",
  marginBottom: "28%",
  textTransform: "none",
};

const ButtonClickTitle2 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  color: "#6B7A99",
};
const singleupload = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px ",
  // color: "#6B7A99",
  marginBottom: "10%",
  textTransform: "none",
};
const singleuploadtext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10px",
  textAlign: "center",
  // color: "rgba(57, 61, 94, 0.5)",
  textTransform: "none",
};
