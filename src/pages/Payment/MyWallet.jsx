import React from "react";
import PageNameHeader from "../../components/PageNameHeader";
import { Box, Button, Grid, Paper, Typography, TextField } from "@mui/material";
// import LeftArrow from "../../assets/Images/payment/LeftArrow.svg";
import LeftArrow from '../../assets/Images/payment/LeftArrow.png';

import paymentcard from "../../assets/Images/payment/Card.svg";
import Coins from "../../assets/Images/payment/Coins.svg";
import plus from "../../assets/Images/payment/plus.svg";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { BalanceSharp } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
const MyWallet = () => {
  let navigate = useNavigate();

  const itemDetails = [
    {
      item1: "Gst",
      value1: "18%",
    },
    {
      item1: "BXI Fees",
      value1: "10%",
    },
    {
      item1: "Transportation fees",
      value1: "300$",
    },
  ];
  const cardInfo = [
    {
      cardKey: "Company Name",
      cardValue: "Lorem Ipsum",
    },
    {
      cardKey: "Phone Number",
      cardValue: "+91-74-6474-9999",
    },
    {
      cardKey: "E - mail",
      cardValue: "Lorem@gmail.com",
    },
  ];
  return (
    <>
      <BreadCrumbHeader
        MainText={"Payment Profile"}
        LinkText1={"Explore"}
        LinkText2={"Product"}
      />
      <Paper elevation={0}>
        <Box sx={{ width: "5%" }}>
          <Link
            to={"/home"}
            style={{
              textDecoration: "none",
              display: "flex",
              marginLeft: "20px",
              // alignContent: "center",
              // alignItems: "center",
              padding: "5px",
            }}
          >
            <img src={LeftArrow} style={{  width:"22px",
            height :"9px"}} />
          </Link>
        </Box>

        <Grid
          container
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "17px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            textAlign: "center",
          }}
        >
          <Grid
            item
            xl={7}
            lg={7}
            md={7}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              p: { xl: 6, lg: 6, md: 6, sm: 2, xs: 2 },
              mb: "auto",
            }}
            gap={2}
          >
            <Typography sx={mainText}>My Wallet </Typography>

            {/* item details */}
            <Box
              sx={{
                width: {
                  xl: "80%",
                  lg: "80%",
                  md: "80%",
                  sm: "72%",
                  xs: "80%",
                },
                height: "auto",
                border: "1px solid rgba(24, 2, 12, 0.05)",
                borderRadius: "1px",
                mx: "auto",
                p: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                }}
              >
                <Typography sx={item}>Item Details</Typography>
                <Typography sx={subItem}> Details with more info</Typography>
              </Box>
              <Grid
                container
                mt={4}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  mx: "auto",
                }}
              >
                <Grid item xl={4} lg={4} md={4} sm={6} xs={6}>
                  <Typography sx={textStyle}>ITEM</Typography>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      width: {
                        xl: "70%",
                        lg: "70%",
                        md: "70%",
                        sm: "90%",
                        xs: "90%",
                      },
                      marginRight: "auto",
                    }}
                  >
                    <TextField
                      fullWidth
                      label="lorem"
                      InputProps={{
                        style: {
                          border: "1px #CCCCCC",
                        },
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                  <Typography sx={textStyle}>Quantity</Typography>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      width: {
                        xl: "70%",
                        lg: "70%",
                        md: "70%",
                        sm: "90%",
                        xs: "90%",
                      },
                      marginRight: "auto",
                    }}
                  >
                    <TextField
                      label="Quantity"
                      fullWidth
                      InputProps={{
                        style: {
                          border: "1px #CCCCCC",
                        },
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={6} xs={6}>
                  <Typography sx={textStyle}>Size</Typography>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      justifyContent: "flex-start",
                      width: {
                        xl: "40%",
                        lg: "50%",
                        md: "80%",
                        sm: "90%",
                        xs: "90%",
                      },
                      marginRight: "auto",
                    }}
                  >
                    <TextField
                      label="M"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        style: {
                          border: "1px #CCCCCC",
                        },
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
                  <Typography sx={textStyle}>BXI Tokens</Typography>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      justifyContent: "center",
                      width: {
                        xl: "90%",
                        lg: "90%",
                        md: "90%",
                        sm: "90%",
                        xs: "90%",
                      },
                      marginRight: "auto",
                    }}
                  >
                    <TextField
                      label="lorem"
                      fullWidth
                      InputProps={{
                        style: {
                          border: "1px #CCCCCC",
                        },
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* change transporation */}
            <Box
              sx={{
                width: {
                  xl: "83%",
                  lg: "83%",
                  md: "85%",
                  sm: "75%",
                  xs: "85%",
                },
                height: "auto",
                borderRadius: "1rem",
                mx: "auto",
                p: 2,
                background: "#F3F6F9",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Typography sx={textTransport}>
                  Change Transportation
                </Typography>
                <Button
                  variant="outlined"
                  sx={{
                    border: "2px solid rgba(107, 122, 153, 0.11)",
                    borderRadius: "1rem",
                    color: "#6B7A99",
                    textTransform: "none",
                    fontSize: "1.4rem",
                  }}
                >
                  Seller
                </Button>
              </Box>
            </Box>

            {/* price details */}
            <Box
              sx={{
                width: {
                  xl: "75%",
                  lg: "75%",
                  md: "70%",
                  sm: "65%",
                  xs: "60%",
                },
                height: "auto",
                border: "1px solid rgba(24, 2, 12, 0.05)",
                borderRadius: "1px",
                mx: "auto",
                p: 6,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "10px",
                }}
              >
                <Typography sx={price}>Item Details </Typography>
                <Typography sx={exPrice}>(1000 items)</Typography>
              </Box>
              <Box sx={{ mt: 4 }}>
                {itemDetails?.map((el, idx) => {
                  return (
                    <>
                      <Box sx={boxStyle}>
                        <Typography sx={mainTableText}>{el.item1}</Typography>
                        <Typography sx={subTablText}>{el.value1}</Typography>
                      </Box>
                    </>
                  );
                })}
              </Box>
              <Box
                sx={{ borderBottom: "1px solid rgba(24, 2, 12, 0.05)", mt: 2 }}
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  mt: 1,
                }}
              >
                <Typography sx={mainTableText}>Total</Typography>
                <Typography sx={subTablText}>$5555.00</Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                background: "rgba(68, 95, 210, 1)",
                fontSize: "1.4rem",
                borderRadius: "1rem",
                width: {
                  xl: "89%",
                  lg: "89%",
                  md: "70%",
                  sm: "82%",
                  xs: "95%",
                },
                p: 1.2,
                mx: "auto",
                textTransform: "none",
                fontFamily: "Kumbh Sans",
              }}
            >
              Pay now
            </Button>
          </Grid>
          <Grid
            item
            xl={5}
            lg={5}
            md={5}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              pb: "2rem",
              mt: { xl: 0, lg: 0, md: 2, sm: 2, xs: 2 },
            }}
            gap={2}
          >
            <Box
              sx={{
                width: {
                  xl: "65%",
                  lg: "65%",
                  md: "65%",
                  sm: "70%",
                  xs: "78%",
                },
                height: "auto",
                borderRadius: "1rem",
                mx: "auto",
                p: { xl: 1.5, lg: 1.5, md: 1.5, sm: 1.5, xs: 1 },
                background: "#F3F6F9",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                  width: {
                    xl: "50%",
                    lg: "50%",
                    md: "50%",
                    sm: "50%",
                    xs: "100%",
                  },
                  mx: "auto",
                }}
              >
                <img
                  src={Coins}
                  alt="coins"
                  style={{ height: "auto", width: "auto" }}
                />
                <Typography sx={balance}>5,240,000.00</Typography>
              </Box>
            </Box>
            {/* card img */}
            <Box
              component="img"
              src={paymentcard}
              alt="payment"
              sx={{
                height: "auto",
                width: {
                  xl: "70%",
                  lg: "70%",
                  md: "70%",
                  sm: "75%",
                  xs: "85%",
                },
                mx: "auto",
              }}
            ></Box>
            {/* your balance */}
            <Box
              sx={{
                width: {
                  xl: "65%",
                  lg: "65%",
                  md: "65%",
                  sm: "70%",
                  xs: "75%",
                },
                height: "auto",
                border: "1px solid rgba(24, 2, 12, 0.05)",
                borderRadius: "1rem",
                mx: "auto",
                p: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: "5px",
                }}
              >
                <Typography sx={price1}>Your Balance </Typography>
                <Typography sx={price2}>$128,320</Typography>
              </Box>
              <Box
                sx={{ borderBottom: "1px solid rgba(24, 2, 12, 0.05)", mt: 2 }}
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  mt: 1,
                }}
              >
                <Typography sx={currency}>Currency</Typography>
                <Typography sx={currency}>Status</Typography>
              </Box>
              <Box
                sx={{
                  ...boxStyle,
                  mt: 1,
                }}
              >
                <Typography sx={value}>Rupee</Typography>
                <Typography sx={value}>Active</Typography>
              </Box>
            </Box>

            {/* company details */}
            <Box
              sx={{
                width: {
                  xl: "65%",
                  lg: "65%",
                  md: "65%",
                  sm: "70%",
                  xs: "75%",
                },
                // height: "auto",
                border: "1px solid rgba(24, 2, 12, 0.05)",
                borderRadius: "1rem",
                mx: "auto",
                p: 2,
              }}
            >
              {cardInfo?.map((el, idx) => {
                return (
                  <>
                    <Box sx={boxStyles}>
                      <Typography
                        sx={{
                          ...price2,
                          fontSize: {
                            xl: "1.4rem",
                            lg: "1.4rem",
                            md: "1.2rem",
                            sm: "1.1rem",
                            xs: "1.1rem",
                          },
                        }}
                      >
                        {el.cardKey}
                      </Typography>
                      <Typography sx={currency}>{el.cardValue}</Typography>
                    </Box>
                  </>
                );
              })}
              <Box
                sx={{
                  ...boxStyles,
                  borderTop: "1px solid rgba(24, 2, 12, 0.05)",
                }}
              >
                <Typography
                  sx={{
                    ...price2,
                    fontSize: {
                      xl: "1.4rem",
                      lg: "1.4rem",
                      md: "1.2rem",
                      sm: "1.1rem",
                      xs: "1.1rem",
                    },
                    mt: 2,
                  }}
                >
                  Invoice Number
                </Typography>
                <Typography sx={currency}> MGL524874</Typography>
              </Box>
            </Box>
            <Button
              sx={{
                background: " #F3F6F9",
                color: "#6B7A99",
                width: {
                  xl: "72%",
                  lg: "72%",
                  md: "70%",
                  sm: "75%",
                  xs: "85%",
                },
                mx: "auto",
                borderRadius: "1rem",
                fontFamily: "Kumbh Sans",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: 14,
                textTransform: "none",
                p: 1.5,
              }}
            >
              <img
                src={plus}
                alt="plus"
                style={{ height: "auto", width: "auto" }}
              />
              Add New Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default MyWallet;

const mainText = {
  fontSize: {
    xl: "2.5rem",
    lg: "2.5rem",
    md: "2.3rem",
    sm: "2rem",
    xs: "2rem",
  },
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 500,
  color: "#1B212D",
};

const item = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: 16,
  textAlign: "left",
  color: "#6B7A99",
};

const subItem = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 12,
  color: "#6B7A99",
  opacity: 0.4,
  textAlign: "left",
};

const textStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "1.2rem",
    lg: "1.2rem",
    md: "1.2rem",
    sm: "1rem",
    xs: "1rem",
  },
  color: "#6B7A99",
  opacity: 0.4,
  textAlign: "left",
  mt: { xl: 0, lg: 0, md: 0, sm: 0, xs: 1 },
};
const boxStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
  flexDirection: "row",
  mt: 1,
};
const textTransport = {
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.4rem",
    sm: "1.3rem",
    xs: "1.3rem",
  },
  color: "#6B7A99",
};

const price = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.4rem",
    xs: "1.4rem",
    sm: "1.4rem",
  },
  color: "#6B7A99",
  textAlign: { xl: "left ", lg: "left", md: "left", sm: "left", xs: "center" },
};

const exPrice = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 100,
  fontSize: 10,
  color: "#6B7A99",
  textAlign: "left",
};

const mainTableText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "1.2rem",
    lg: "1.2rem",
    md: "1.2rem",
    sm: "1.1rem",
    xs: "1.1rem",
  },
  color: "#6B7A99",
};

const subTablText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "1.2rem",
    lg: "1.2rem",
    md: "1.2rem",
    sm: "1.1rem",
    xs: "1.1rem",
  },

  textAlign: "left",

  color: "#6B7A99",
};

const balance = {
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 20,
  textAlign: "center",
  color: "#000000",
};

const price1 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 12,
  color: "#C4CAD6",
  textAlign: "left",
};

const price2 = {
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "2rem",
  color: "#6B7A99",
  textAlign: "left",
};

const currency = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.2rem",
    lg: "1.2rem",
    md: "1.2rem",
    sm: "1.2rem",
    xs: "1rem",
  },
  color: "#C4CAD6",
};

const value = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 16,
  color: "#6B7A99",
};

const boxStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignContent: "center",
  alignItems: "center",
  flexDirection: "row",
};
