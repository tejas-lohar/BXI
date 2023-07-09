import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Table,
  TextField,
  CircularProgress,
  Tab,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PageNameHeader from "../../components/PageNameHeader";
// import LeftArrow from "../../assets/Images/payment/LeftArrow.svg";
import LeftArrow from '../../assets/Images/payment/LeftArrow.png';

import upward from "../../assets/Images/Apprealimg/upward.svg";
import downward from "../../assets/Images/Apprealimg/downward.svg";
import backSide from "../../assets/Images/Apprealimg/backSide.jpg";
import closeCloth from "../../assets/Images/Apprealimg/closeCloth.jpg";
import handCuf from "../../assets/Images/Apprealimg/handCuf.jpg";
import cloth from "../../assets/Images/Apprealimg/cloth.svg";
import Watch from "../../assets/Images/Apprealimg/watch.svg";
import blackFront from "../../assets/Images/Apprealimg/blackFront.jpg";
import blackClose from "../../assets/Images/Apprealimg/blackClose.jpg";
import chair from "../../assets/Images/Apprealimg/chair.svg";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
const OfficeAppreal = () => {
  const [value, setValue] = React.useState("1");
  const [currentImage, setCurrentImage] = useState(0);
  const [color, setColor] = useState("blue");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const images = [chair, backSide, closeCloth, handCuf, cloth];
  const blackClothImages = [
    blackFront,
    blackClose,
    closeCloth,
    closeCloth,
    closeCloth,
  ];
  // const redClothImages = [redFront, closeRed, backRed];
  const upwardClick = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };
  const downwardClick = () => {
    setCurrentImage(
      (currentImage === 0 ? images.length - 1 : currentImage - 1) %
        images.length
    );
  };

  const changeColor = () => {
    setColor(blackClothImages);
  };

  const keyFeaturesText = [
    {
      keyFeatures: "Material",
    },
    {
      keyFeatures: "Expiry Date",
    },
    {
      keyFeatures: "Manufacturing Date",
    },
    {
      keyFeatures: "Weight",
    },
  ];

  const priceValText = [
    {
      priceVal: "70cm",
    },
    {
      priceVal: "70cm",
    },
    {
      priceVal: "70cm",
    },
    {
      priceVal: "70cm",
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{ bgcolor: "transparent", boxShadow: "none", width: "100%" }}
    >
      <BreadCrumbHeader MainText={"Apparel"} />
      <Paper elevation={0}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            borderBottom: "2px solid rgba(236, 236, 236, 1)",
            width: "95%",
            mx: "auto",
          }}
        >
          {/* <Link to={"/home"}>
            <Box
              component="img"
              src={LeftArrow}
              alt="LeftArrow"
              sx={{
                height: "auto",
                width: "auto",
                display: "flex",
                justifyContent: "flex-start",
                p: 2,
              }}
            ></Box>
          </Link> */}
          <Box
            component="img"
            src={LeftArrow}
            alt="LeftArrow"
            sx={{
              width:"22px",
              height :"9px" ,
              position: "absolute",
              left: "0",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/home");
            }}
          />
          <Typography sx={mainText}>Preview Page </Typography>
        </Box>
        <Grid container sx={{ width: "95%", mx: "auto", mt: 4 }}>
          <Grid item xl={1} lg={1} md={6} sm={12} xs={12} sx={fixGrid}>
            <Button onClick={upwardClick}>
              <Box
                component="img"
                src={upward}
                alt="upward"
                sx={{
                  height: "auto",
                  width: {
                    xl: "50%",
                    lg: "50%",
                    md: "10%",
                    sm: "10%",
                    xs: "10%",
                  },
                  pointer: "cursor",
                  mx: "auto",
                }}
              ></Box>
            </Button>
            <Button onClick={downwardClick}>
              <Box
                component="img"
                src={downward}
                alt="downward"
                sx={{
                  height: "auto",
                  width: {
                    xl: "50%",
                    lg: "50%",
                    md: "10%",
                    sm: "10%",
                    xs: "10%",
                  },
                  pointer: "cursor",
                  mx: "auto",
                }}
              ></Box>
            </Button>
          </Grid>
          <Grid item xl={4} lg={4} md={6} sm={12} xs={12} sx={fixGrid}>
            <Box
              sx={{
                width: {
                  xl: "90%",
                  lg: "90%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
                height: "100%",
                mx: "auto",
                mt: { xl: 6, lg: 6, md: 0, sm: 1, xs: 1 },
              }}
            >
              <Box
                component="img"
                src={
                  color === "blue"
                    ? images[currentImage]
                    : blackClothImages[currentImage]
                }
                alt="cloth"
                sx={{
                  width: {
                    xl: "80%",
                    lg: "80%",
                    md: "100%",
                    sm: "100%",
                    xs: "100%",
                  },
                  //   maxHeight: "350px",
                  display: "flex",
                  height: "auto",
                }} //optional / we can also set with grid
              ></Box>
            </Box>
          </Grid>
          <Grid item xl={7} lg={7} md={12} sm={12} xs={12} sx={fixGrid}>
            <Box>
              <Typography sx={semi}>
                Green Soul Urbane Premium Leatherette Office Chair (Brown)
              </Typography>
              <Typography sx={semiPrice}>INR 12,990 </Typography>
              <Box
                mt={5}
                sx={{
                  width: "100%",
                  mx: "auto",
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={gridAdj}
                  >
                    <Box mt={4}>
                      <Typography sx={packHead1}>Available Quantity</Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography sx={packVal1}>20</Typography>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    sx={gridAdj}
                  >
                    <Box mt={4}>
                      <Typography sx={packHead1}>GST</Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography sx={packVal1}>18%</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ mt: 15 }}>
            <Box
              sx={{
                width: {
                  xl: "100%",
                  lg: "100%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
                typography: "body1",
              }}
            >
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    sx={{ width: "95%" }}
                    variant="fullWidth"
                  >
                    <Tab
                      label={<Typography sx={tabTexts}>Description</Typography>}
                      value="1"
                    />
                    <Tab
                      label={
                        <Typography sx={tabTexts}>Product Details</Typography>
                      }
                      value="2"
                    />
                    <Tab
                      label={
                        <Typography sx={tabTexts}>
                          Packaging Information
                        </Typography>
                      }
                      value="3"
                    />
                    <Tab
                      label={
                        <Typography sx={tabTexts}>Key features</Typography>
                      }
                      value="4"
                    />
                  </TabList>
                </Box>
                <Box
                  sx={
                    {
                      // maxHeight: "310px",
                      // height: "310px",
                    }
                  }
                >
                  <TabPanel value="1">
                    <Grid container>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <Typography sx={tabText}>
                          Lorem ipsum dolor sit amet consectetur. Sit eget in
                          vehicula facilisi sed dignissim ut neque augue.
                        </Typography>
                        <Typography sx={tabSubText}>
                          Lorem ipsum dolor sit amet consectetur. Proin sit nisl
                          a a lectus imperdiet. Nisl consectetur sit lacus proin
                          faucibus vitae. Ut imperdiet massa ut urna dui amet.
                          Feugiat non pellentesque tellus congue augue. Habitant
                          nunc pellentesque duis egestas orci. Gravida elementum
                          venenatis a volutpat luctus. Est vitae tempor vitae
                          eget bibendum leo.
                        </Typography>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <Typography sx={available}>
                            Sample Available :
                          </Typography>
                          <Typography sx={{ ...available, fontWeight: 500 }}>
                            YES
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="2">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography sx={product}>Product Details</Typography>
                      <Typography sx={material}>Instruction </Typography>
                      <Box
                        mt={3}
                        sx={{
                          color: "#6B7A99",
                          display: "flex",
                          gap: "10px",
                          flexDirection: "column",
                        }}
                      >
                        <Typography sx={productText}>
                          Lorem ipsum dolor sit amet consectetur. Proin sit nisl
                          a a lectus imperdiet. Nisl consectetur sit lacus proin
                          faucibus vitae. Ut imperdiet massa ut urna dui amet.
                          Feugiat non pellentesque tellus congue augue. Habitant
                          nunc pellentesque duis egestas orci. Gravida elementum
                          venenatis a volutpat luctus. Est vitae tempor vitae
                          eget bibendum leo.
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={locationText}>
                          Location : Lorem
                        </Typography>
                      </Box>
                    </Box>
                  </TabPanel>
                  <TabPanel value="3">
                    <Typography sx={pack}>Packaging Information</Typography>
                    <Box
                      mt={4}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "95%",
                      }}
                    >
                      <Typography sx={packHead}>Height</Typography>
                      <Typography sx={packHead}>Length</Typography>
                      <Typography sx={packHead}>Breadth </Typography>
                      <Typography sx={packHead}>weight </Typography>
                    </Box>
                    <Box
                      mt={1}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "95%",
                      }}
                    >
                      <Typography sx={packVal}>70 cm</Typography>
                      <Typography sx={packVal}>70 cm</Typography>
                      <Typography sx={packVal}>70 cm </Typography>
                      <Typography sx={packVal}>70 cm </Typography>
                    </Box>
                  </TabPanel>
                  <TabPanel value="4">
                    <Typography sx={pack}>Key Features </Typography>{" "}
                    <Grid container sx={{ mt: 2, width: "95%" }}>
                      <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {keyFeaturesText?.map((el, idx) => {
                          return (
                            <>
                              <Typography sx={packHead}>
                                {el.keyFeatures}
                              </Typography>
                            </>
                          );
                        })}
                      </Grid>
                      <Grid
                        item
                        xl={12}
                        lg={12}
                        md={12}
                        sm={12}
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {priceValText?.map((el, idx) => {
                          return (
                            <>
                              <Typography sx={packVal}>
                                {el.priceVal}
                              </Typography>
                            </>
                          );
                        })}
                      </Grid>
                    </Grid>
                  </TabPanel>
                </Box>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ width: "98%", mx: "auto", mt: 1 }}>
          <Button sx={uploadBtn}>Upload Product</Button>
        </Box>
      </Paper>
    </Paper>
  );
};

export default OfficeAppreal;

const mainText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 24,
  color: "#6B7A99",
  p: 2,
};

const fixGrid = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
};

const semi = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "2.2rem",
    lg: "2.2rem",
    md: "2.2rem",
    sm: "2rem",
    xs: "2rem",
  },
  color: "#4D4D4D",
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
  width: "70%",
  mt: { xl: 0, lg: 0, md: 0, sm: 0, xs: 2 },
};
const tabTexts = {
  fontSize: {
    xl: "2rem",
    lg: "2rem",
    md: "1.8rem",
    sm: "1rem",
    xs: "1rem",
  },
};
const semiPrice = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "3.6rem",
    lg: "3.6rem",
    md: "3.6rem",
    sm: "3.4rem",
    xs: "2.5rem",
  },
  letterSpacing: "0.06em",
  textTransform: "capitalize",
  color: "#6B7A99",
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
  mt: 1,
};

const tabText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "2rem",
    lg: "2rem",
    md: "1.8rem",
    sm: "1.6rem",
    xs: "1.6rem",
  },
  width: "95%",
  color: "#6B7A99",
};

const tabSubText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.6rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  width: "95%",
  textAlign: "justify",
  color: "#6B7A99",
};

const available = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 200,
  fontSize: {
    xl: "2rem",
    lg: "2rem",
    md: "1.6rem",
    sm: "1.5rem",
    xs: "1.5rem",
  },
  lineHeight: "7rem",
  color: "#6B7A99",
};

const product = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "2.4rem",
    lg: "2.4rem",
    md: "2.2rem",
    sm: "2.2rem",
    xs: "2.1rem",
  },
  lineHeight: 1.5,
  color: "#6B7A99",
};

const material = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "2.2rem",
    lg: "2.2rem",
    md: "2rem",
    sm: "1.9rem",
    xs: "1.9rem",
  },
  lineHeight: "3rem",
  color: "#ADB8CC",
};

const pack = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "2.4rem",
    lg: "2.4rem",
    md: "2.2rem",
    sm: "2rem",
    xs: "2rem",
  },
  textAlign: { xl: "left", lg: "left", md: "left", sm: "left", xs: "center" },
  color: "#6B7A99",
};

const packHead = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.6rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  color: "#ADB8CC",
};

const packVal = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.6rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  color: "#6B7A99",
  //   textAlign: "left",
};

const uploadBtn = {
  width: "100%",
  background: "rgba(68, 95, 210, 1)",
  "&:hover": {
    background: "rgba(68, 95, 210, 1)",
  },
  color: "#fff",
  fontFamily: "Work Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 18,
  borderRadius: "0.6rem",
  textTransform: "none",
  mb: "4rem",
};

const productText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.7rem",
    lg: "1.7rem",
    md: "1.6rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  lineHeight: 1.5,
  textAlign: "justify",
  color: "#6B7A99",
};

const locationText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "2.2rem",
    lg: "2.2rem",
    md: "1.8rem",
    sm: "1.6rem",
    xs: "1.6rem",
  },
  color: "#6B7A99",
  mt: 2,
};

const packHead1 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.5rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  color: "#6B7A99",
};

const packVal1 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.3rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  color: "#ADB8CC",
};

const gridAdj = {
  mt: 2,
  textAlign: { xl: "left", lg: "left", md: "left", sm: "left", xs: "center" },
};
