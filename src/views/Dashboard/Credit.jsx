import { Box, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import stackofcoin from "../../assets/CartPage/unnamed 1.svg";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";

const Credit = () => {
  //   const location = console.log(location);
  const location = useLocation();
  const [GetProductDataById, setGetProductDataById] = useState();
  // const [amount, setAmount] = useState();

  const navigate = useNavigate();

  console.log(location?.state, "location");
  const productId = location?.state?.ProductId;
  const TotalAmount = location?.state?.total;

  const reqBal = async (ProductId) => {
    navigate("/home/creditterms", {
      state: {
        ProductId: ProductId,
        total: Response?.data?.total,
      },
    });
  };

  async function GetProductByid() {
    await axios
      .get(`product/get_product_byId/${productId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res, "result");
        setGetProductDataById(res?.data);
        // setStoreVariationData(res?.data?.ProductsVariantions[0]?._id);
      });
  }
  useEffect(() => {
    GetProductByid();
  }, []);
  return (
    <Paper sx={{ width: "100%", bgcolor: "transparent" }} elevation={0}>
      <BreadCrumbHeader
        MainText="Credit"
        LinkText1="{splitedurl[1]}"
        LinkText2="{splitedurl[2]}"
        link1="Link1"
        link2="link2"
      />
      <Paper
        sx={{
          bgcolor: "#fff",
          boxShadow: "none",
          p: 3,
          borderRadius: "20px",
          height: "auto",
          minHeight: "520px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
        elevation={0}
      >
        <Box
          sx={{
            width: "30%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100px",
              background: "#FFFFFF",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              //   border: "1px solid #EDEFF2",
              //   borderRadius: "20px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: {
                  xl: "700px",
                  lg: "700px",
                  md: "700px",
                  sm: "350px",
                  xs: "350px",
                },
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                alignContent: "center",
                gap: "2rem",
              }}
            >
              <Box
                sx={{
                  ...imgstyle,
                  backgroundImage: `url(${
                    GetProductDataById?.ProductImages?.at(0)?.url
                  })`,
                }}
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  alignContent: "start",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Typography sx={ProductNameTextStyle}>
                  {GetProductDataById?.ProductName}
                </Typography>
                <Box
                  sx={{
                    width: "50%",
                  }}
                >
                  <Typography sx={ProductMetaTextStyle}>
                    {GetProductDataById?.ProductDescription}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      ...ProductPriceTextStyle,
                      marginTop: "-03px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <img
                      src={stackofcoin}
                      alt="rupieicon"
                      style={{
                        width: "20px",
                        height: "auto",
                      }}
                    />
                    {
                      GetProductDataById?.ProductsVariantions?.at(0)
                        ?.PricePerUnit
                    }
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={amountstyle}>
            You are eligible for Credit Amount {(TotalAmount / 130) * 100} %
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "21px",
              textAlign: "center",
              color: "#6B7A99",
            }}
          >
            further to this please provide sample of products and documents
            required for the credit
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "20px",
              lineHeight: "30px",
              color: "#6B7A99",
            }}
          >
            Do you wish to proceed further ?
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              variant="contained"
              sx={reqbtn}
              onClick={() => {
                reqBal(productId);
              }}
            >
              Yes
            </Button>
            <Button
              variant="outlined"
              sx={{
                ...reqbtn,
                fontWeight: 700,
                background: "none",
                border: "0.7px solid #EBEDEE",
                color: "#445FD2",
              }}
              onClick={() => {
                navigate("/home/dashboard");
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
};

export default Credit;

const reqbtn = {
  width: "114px",
  height: "42px",
  boxShadow: "none",
  background: "#445FD2",
  borderRadius: "8px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "24px",
  textTransform: "none",
};

const ProductPriceTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  color: "#717171",
  fontSize: {
    xl: "15px",
    lg: "15px",
    md: "15px",
    sm: "12px",
    xs: "12px",
  },
  lineHeight: {
    xl: "24px",
    lg: "24px",
    md: "22px",
    sm: "21px",
    xs: "20px",
  },
  alignContent: "center",
  alignItems: "center",
};

const ProductNameTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "17px",
    sm: "13px",
    xs: "13px",
  },
  lineHeight: "25px",
  color: "#6B7A99",
  textAlign: "left",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  // fontFamily: "Poppins",
  // fontStyle: "normal",
  // fontWeight: 600,
  // fontSize: "20px",
  // lineHeight: "30px",
  // color: "#141414",
};

const ProductMetaTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "12px",
    lg: "12px",
    md: "11px",
    sm: "9px",
    xs: "9px",
  },
  lineHeight: {
    xl: "18px",
    lg: "18px",
    md: "15px",
    sm: "14px",
    xs: "14px",
  },
  color: "#858585",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const imgstyle = {
  ml: "1%",
  height: "100px",
  width: "150px",
  border: "1px solid #EDEFF2",
  borderRadius: "20px",
  maxHeight: "122px",
  minWidth: "150px",
  maxWidth: "150px",
  // borderRadius: "10px 10px 10px 10px",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const amountstyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "30px",
  color: "#6B7A99",
};
