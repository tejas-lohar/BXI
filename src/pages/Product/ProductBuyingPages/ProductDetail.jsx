import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  Paper,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import FeatureName from "../../../components/FeatureName";
import { useDispatch, useSelector } from "react-redux";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CarasoulForProductDetails from "../../../components/Carousel/CarasoulForProductDetails";
import LeftArrow from "../../../assets/Images/ProductDetailIcon/LeftArrow.svg";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { useNavigate } from "react-router-dom";
import { useProductAddToCart } from "../../../Hooks/ProductActions/useProductAddToCart";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import bxifeature from "../../../assets/bxifeaturelogo.svg";
import Breadth from "../../../assets/Images/Breadth.svg";
import Height from "../../../assets/Images/Height.svg";
import Length from "../../../assets/Images/Length.svg";
import Weight from "../../../assets/Images/Weight.svg";
export default function ProductDetail() {
  let { id } = useParams();
  const navigate = useNavigate();
  let ProductId = id;
  const [count, setCount] = useState(1);

  const [starvalue, setstarValue] = React.useState(2);

  const [TabValue, setTabValue] = React.useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [currentImage, setCurrentImage] = useState(0);

  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [ProductFeatures, setProfuctFeatures] = useState([]);
  const [VariationToMap, setVariationToMap] = useState();
  const [storeVariationData, setStoreVariationData] = useState();
  const { data: mutateCartData, mutate: addtocart } = useProductAddToCart();

  let NewdataArray = [];
  const ImageDataArray = GetProductByIdData?.ProductImages;
  const upwardClick = () => {
    setCurrentImage((currentImage + 1) % ImageDataArray.length);
  };

  async function GetProductByid() {
    await axios
      .get(`product/get_product_byId/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setGetProductByIdData(res?.data);
        setStoreVariationData(res?.data?.ProductsVariantions[0]?._id);
        setProfuctFeatures(res?.data?.ProductFeatures);
        console.log("heloo", res.data);
      });
  }

  useEffect(() => {
    GetProductByid();
  }, []);
  console.log("VariationToMappp", VariationToMap);
  console.log("ProductFeatures", ProductFeatures);

  useEffect(() => {
    GetProductByid();
  }, []);

  useEffect(() => {
    if (mutateCartData) {
      toast.success("Added to Cart", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [mutateCartData]);

  async function handleAddToCart(id) {
    addtocart(id);
  }

  const technicalinfo = [
    {
      name: "Height",
      img: Height,
      val: GetProductByIdData?.ProductTechInfo?.Height,
    },
    {
      name: "Length",
      img: Length,
      val: GetProductByIdData?.ProductTechInfo?.Length,
    },
    {
      name: "Breadth",
      img: Breadth,
      val: GetProductByIdData?.ProductTechInfo?.Width,
    },
    {
      name: "Weight",
      img: Weight,
      val: GetProductByIdData?.ProductTechInfo?.WeightBeforePackingPerUnit,
    },
  ];

  return (
    <React.Fragment>
    {/*  <ToastContainer
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
  /> */}
      <Paper
        Paper
        sx={{
          width: "100%",
          height: "100%",
          background: "transparent",
          boxShadow: "none",
        }}
        elevation={0}
      >
        <BreadCrumbHeader MainText="Company Type" />
        <Box
          sx={{
            padding: "1% 0",
            borderRadius: "30px",
            margin: "2%",
            background: "#fff",
            height: "auto",
            width: "auto",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              borderBottom: "2px solid rgba(236, 236, 236, 1)",
              width: "95%",
              mx: "auto",
              position: "relative",
            }}
          >
            {/* <Link to={"/home"}> */}
            {/* <Box
              component="img"
              src={LeftArrow}
              alt="LeftArrow"
              sx={{
                position: "absolute",
                top: "30%",
                left: "1%",
                height: "auto",
                width: "auto",
                mx: "auto",
                // p: 2,
              }}
            ></Box> */}
            <Box
              component="img"
              src={LeftArrow}
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
            />
            {/* </Link> */}
            <Typography sx={mainText}>Preview Page </Typography>
          </Box>
          <Grid container sx={HeaderContainerStyle}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box sx={PageHeader}>
                <Typography sx={AppBarTypoStyle}>
                  {GetProductByIdData?.ProductName}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* ***** Carasoul ***** */}
          <Box
            sx={{
              display: "flex",
              my: {
                xl: "0px",
                lg: "0px",
                md: "5px",
                sm: "10px",
                xs: "20px",
              },
              width: "100%",
            }}
          >
            <CarasoulForProductDetails ImageDataArray={ImageDataArray} />
          </Box>

          <TabContext value={TabValue} variant="fullwidth">
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "100%",
                mt: {
                  xl: "40px",
                  lg: "40px",
                  md: "30px",
                  sm: "20px",
                  xs: "10px",
                },
              }}
            >
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
                sx={MainTabStyle}
              >
                <Tab label="Description" value="1" sx={TabTextStyle} />
                <Tab label="Price & Availability" value="2" sx={TabTextStyle} />
                <Tab
                  label="Technical Information"
                  value="3"
                  sx={TabTextStyle}
                />
                <Tab label="Key Features" value="4" sx={TabTextStyle} />
              </TabList>
            </Box>

            <TabPanel value="1">
              {/* Description */}
              <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Box>
                    <Typography sx={TypographyTitleText}>
                      Get the celebrity treatment with world-class service at
                      Hyderabad Royal Orchid Hotel{" "}
                    </Typography>
                    <Typography sx={DescriptionAnswerText}>
                      Lorem ipsum dolor sit amet consectetur. Proin sit nisl a a
                      lectus imperdiet. Nisl consectetur sit lacus proin
                      faucibus vitae. Ut imperdiet massa ut urna dui amet.
                      Feugiat non pellentesque tellus congue augue. Habitant
                      nunc pellentesque duis egestas orci. Gravida elementum
                      venenatis a volutpat luctus. Est vitae tempor vitae eget
                      bibendum leo. Iaculis sed a amet rutrum tellus pretium
                      iaculis id sed. Non neque dolor fermentum augue diam
                      senectus. Nunc sodales elementum aenean sit risus odio
                      commodo orci sed. Magna ultrices viverra arcu in aliquam
                      cursus. Nascetur est imperdiet pharetra sit diam feugiat
                      morbi sit in.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>{" "}
            </TabPanel>
            <TabPanel value="2">
              {/* Price & Availability */}
              <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Box>
                    <Typography sx={semi}>
                      {/* {GetProductByIdData?.ProductName} */}
                      Price & Availability
                    </Typography>
                    <Typography sx={semiPrice}>
                      {GetProductByIdData &&
                        GetProductByIdData?.ProductsVariantions?.length > 0 &&
                        GetProductByIdData?.ProductsVariantions[0]
                          ?.PricePerUnit}{" "}
                      <img
                        src={BXITokenIcon}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                        }}
                        alt="BXITokenIcon"
                      />
                    </Typography>

                    <Typography sx={semiSub}>Colors</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: {
                          x: "flex-start",
                          lg: "flex-start",
                          md: "flex-start",
                          sm: "flex-start",
                          xs: "center",
                        },
                      }}
                    >
                      {GetProductByIdData &&
                        GetProductByIdData?.ProductsVariantions?.map(
                          (res, idx) => {
                            console.log("resss", res);
                            console.log(NewdataArray, "NewdataArray");
                            return (
                              <Box
                                key={idx}
                                onClick={() => {
                                  setVariationToMap(res?.ProductsVariantions);
                                }}
                                sx={{
                                  background: res?.ProductColor,
                                  width: {
                                    xl: "5%",
                                    lg: "5%",
                                    md: "5%",
                                    sm: "5%",
                                    xs: "13%",
                                  },
                                  ml: 1,
                                  height: "100%",
                                  minHeight: "35px",
                                  borderRadius: "0.5rem",
                                  cursor: "pointer",
                                  border: "2px solid #000",
                                }}
                              >
                                {/* {res?.ProductColor} */}
                              </Box>
                            );
                          }
                        )}
                    </Box>

                    <Box
                      mt={6}
                      sx={{
                        width: "100%",
                        mx: "auto",
                      }}
                    >
                      <Grid container>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                          <Typography sx={tableHeader}>Sizes</Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}> Min QTY</Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>Max QTY</Typography>
                        </Grid>

                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                          <Typography sx={tableHeader}>
                            {" "}
                            GST/Product{" "}
                          </Typography>
                        </Grid>

                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}> Product ID</Typography>
                        </Grid>
                      </Grid>

                      {GetProductByIdData &&
                        GetProductByIdData?.ProductsVariantions?.map(
                          (el, idx) => {
                            return (
                              <Grid
                                container
                                sx={{
                                  textAlign: "center",
                                  maxHeight: "60px",
                                  height: "60px",
                                  overflow: "auto",
                                  "::-webkit-scrollbar": {
                                    display: "block",
                                  },
                                  "::-webkit-scrollbar-thumb": {
                                    dynamic: "#8d8e90",
                                    height: "8px",
                                    borderRadius: "8px",
                                  },
                                }}
                              >
                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                  <Typography sx={tableData}>
                                    {el.ProductSize}
                                  </Typography>
                                </Grid>

                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                  <Typography sx={tableData}>
                                    {el.MinOrderQuantity}
                                  </Typography>
                                </Grid>

                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                  <Typography sx={tableData}>
                                    {el.MaxOrderQuantity}
                                  </Typography>
                                </Grid>

                                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                                  <Typography sx={tableData}>
                                    {" "}
                                    {
                                      GetProductByIdData.ProductsVariantions[0]
                                        .GST
                                    }
                                    &nbsp;%
                                  </Typography>
                                </Grid>

                                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                  <Typography sx={tableData}>
                                    {el.ProductIdType}
                                  </Typography>
                                </Grid>
                              </Grid>
                            );
                          }
                        )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Box>
                <Typography sx={pack}>Technical Information</Typography>
                <Box
                  mt={1}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Typography
                    sx={{
                      ...packHead,
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      color: "#6B7A99",
                    }}
                  >
                    Packaging information
                  </Typography>
                </Box>

                <Box
                  mt={1}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Typography sx={inclusiveheader}>
                    Packaging information per Unit
                  </Typography>

                  <Typography
                    sx={{
                      ...packHead,
                      color: "#6B7A99",
                      fontWeight: 400,
                      fontSize: "16px",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Proin sit nisl a a
                    lectus imperdiet. Nisl consectetur sit lacus proin faucibus
                    vitae. Ut imperdiet massa ut urna dui amet. Feugiat non
                    pellentesque tellus congue augue. Habitant nunc pellentesque
                    duis egestas orci. Gravida elementum venenatis a volutpat
                    luctus. Est vitae tempor vitae eget bibendum leo.
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={inclusiveheader}>
                    Packaging and delivery Instructions
                  </Typography>
                  <Box sx={{ pt: "0.8%", padding: "10px" }}>
                    <Typography sx={dots}>
                      Lorem ipsum dolor sit amet consectetur. Proin sit nisl a a
                      lectus imperdiet. Nisl consectetur sit lacus proin
                      faucibus vitae. Ut imperdiet massa ut urna dui amet.
                      Feugiat non pellentesque tellus congue augue. Habitant
                      nunc pellentesque duis egestas orci. Gravida elementum
                      venenatis a volutpat luctus. Est vitae tempor vitae eget
                      bibendum leo.
                    </Typography>
                    <br />
                  </Box>
                </Box>

                <Box>
                  <Typography sx={inclusiveheader}>
                    Instructions to use product
                  </Typography>
                  <Box sx={{ pt: "0.8%", padding: "10px" }}>
                    <Typography sx={dots}>
                      Lorem ipsum dolor sit amet consectetur. Proin sit nisl a a
                      lectus imperdiet. Nisl consectetur sit lacus proin
                      faucibus vitae. Ut imperdiet massa ut urna dui amet.
                      Feugiat non pellentesque tellus.
                    </Typography>
                    <br />
                  </Box>
                </Box>

                <Box>
                  <Typography sx={inclusiveheader}>Other Cost </Typography>
                  <Box sx={{ pt: "0.8%", padding: "10px" }}>
                    <Typography sx={dots}>
                      Lorem ipsum dolor sit amet consectetur. Donec pellentesque
                      aliquam eget nibh lectus urna tempor eget. Enim sed dictum
                      arcu aliquam aliquet consequat adipiscing odio ut.
                    </Typography>
                    <br />

                    <Typography sx={dots}>
                      Lorem ipsum dolor sit amet consectetur. Donec pellentesque
                      aliquam eget nibh lectus urna tempor eget. Enim sed dictum
                      arcu aliquam aliquet consequat adipiscing odio ut.
                    </Typography>
                    <br />
                  </Box>
                </Box>
                <Box
                  mt={4}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    // bgcolor: "green",
                  }}
                >
                  {technicalinfo?.map((val) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          // gap: "5px",
                          width: "12%",
                        }}
                      >
                        <Box component="img" src={val.img} />
                        <Box>
                          <Typography sx={packHead}>{val.name}</Typography>
                          <Typography sx={packVal}>{val.val}</Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="4">
              <Box>
                <Typography sx={pack}>Key Features</Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Grid
                    container
                    mt={4}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    {ProductFeatures?.map((res) => {
                      return (
                        <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                          <Box
                            sx={{
                              px: 2,
                              display: "flex",
                              // flexWrap: "wrap",
                              textAlign: "start",
                              flexDirection: "row",
                              gap: "100px",
                              mt: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: "20px",
                                width: "100%",
                              }}
                            >
                              {/* <Box
                                      component="img"
                                      src={bxifeature}
                                      sx={{ height: "80px", width: "30px" }}
                                    /> */}
                              <FeatureName name={res?.name} />
                              <Box
                                sx={{
                                  width: "80%",
                                  maxWidth: "825px",
                                  height: "auto",
                                  wordWrap: "break-word",
                                }}
                              >
                                <Typography sx={packHead}>
                                  {res.name}
                                </Typography>
                                <Typography sx={packVal}>
                                  {res.description}{" "}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={BookButtonStyle}
          >
            <Button
              variant="contained"
              sx={CartButtonStyle}
              onClick={() => handleAddToCart(ProductId)}
            >
              Add To Cart
            </Button>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

const inclusiveheader = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xs: "12px",
    sm: "15px",
    md: "20px",
    lg: "20px",
    xl: "20px",
  },
  color: "#6B7A99",
  width: {
    xl: "80%",
    lg: "80%",
    md: "65%",
    sm: "100%",
    xs: "100%",
  },
  pt: "2%",
};

const dots = {
  display: "flex",
  gap: "8px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xs: "20px",
    sm: "15px",
    md: "16px",
    lg: "16px",
    xl: "16px",
  },
  textAlign: "justify",
  color: "#6B7A99",
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
  textAlign: {
    xl: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
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
};

const tableData = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.6rem",
    sm: "1.6rem",
    xs: "1.5rem",
  },
  color: "#B1B1B1",
  lineHeight: "4rem",
  // textAlign: "end",
  // width: "50%",
  // background: "yellow",
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
};

const tableHeader = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.6rem",
    sm: "1.4rem",
    xs: "1rem",
  },
  color: "#6B7A99",
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
};

const mainText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "24px",
  color: "#6B7A99",
  p: 3,
};

const HeaderContainerStyle = { px: "2rem" };
const PageHeader = {
  display: "flex",
  background: "#fff",
  width: "100%",
  py: "20px",
  position: "relative",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
};

const AppBarTypoStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "24px",
    lg: "24px",
    md: "20px",
    sm: "16px",
    xs: "12px",
  },
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  px: "15%",
  color: "#4D4D4D",
};

const MainTabStyle = {
  width: "100%",
};

const TabTextStyle = {
  color: "#B1B1B1",
  fontFamily: "poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "14px",
    sm: "12px",
    xs: "10px",
  },
  letterSpacing: "0.02em",
  textTransform: "none",
};

const ImageDescriptionStyle = {
  display: "grid",
  textAlign: "left",
};

const TypographyTitleText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "24px",
    lg: "24px",
    md: "20px",
    sm: "16px",
    xs: "16px",
  },
  color: "#6B7A99",
  // py: "8px",
};

const DescriptionAnswerText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "16px",
    lg: "16px",
    md: "12px",
    sm: "10px",
    xs: "8px",
  },
  textAlign: "justify",
  color: "#6B7A99",
  py: {
    xl: "16px",
    lg: "16px",
    md: "12px",
    sm: "10px",
    xs: "8px",
  },
};

const BookButtonStyle = {
  py: "16px",
  textAlign: "center",
};

const CartButtonStyle = {
  width: "50%",
  fontSize: {
    xl: "16px",
    lg: "16px",
    md: "12px",
    sm: "10px",
    xs: "8px",
  },
  fontFamily: "poppins",
  fontStyle: "normal",
  fontWeight: 500,
  background: "#445FD2",
  ":hover": {
    background: "#445FD2",
  },
  textTransform: "none",
};

const FormGridContainersStyle = {
  py: "32px",
};

const QuantityGridStyle = {
  display: "grid",
};

const QuantityCountStyle = {
  display: "flex",
  alignContent: "center",
  alignItems: "center",
};

const CountIconStyle = {
  border: "1px solid #B1B1B1",
  borderRadius: "5px",
  color: "#696969",
  padding: "10px",
  // // fontWeight: 100,
  // height: {
  //   xl: "40px",
  //   lg: "40px",
  //   md: "30px",
  //   sm: "30px",
  //   xs: "30px",
  // },
  // width: {
  //   xl: "40px",
  //   lg: "40px",
  //   md: "30px",
  //   sm: "30px",
  //   xs: "30px",
  // },
};

const CountTypographyStyle = {
  background: "#F3F6F9",
  borderRadius: "6px",
  textAlign: "center",
  width: "70px",
  height: "45px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  color: "#ADB8CC",
};

const PolicyTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "20px",
    lg: "20px",
    md: "14px",
    sm: "12px",
    xs: "10px",
  },
  textAlign: "justify",
  color: "#445FD2",
  // my: "16px",
};

const DotStyle = { height: "7px" };
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
};

const semiSub = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "40px",
  color: "#6B7A99",
  fontSize: {
    xl: "16px",
    lg: "16px",
    md: "16px",
    sm: "14px",
    xs: "12px",
  },
  mt: 2,
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
};
