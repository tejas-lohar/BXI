import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Grid, Paper, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import LeftArrow from "../../../assets/Images/payment/LeftArrow.svg";
import LeftArrow from "../../../assets/Images/payment/LeftArrow.png";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import BXITokenIcon from "../../../assets/BXITokenIcon.png";
import backRed from "../../../assets/Images/Apprealimg/backRed.jpg";
import blackClose from "../../../assets/Images/Apprealimg/blackClose.jpg";
import blackFront from "../../../assets/Images/Apprealimg/blackFront.jpg";
import closeRed from "../../../assets/Images/Apprealimg/closeRed.jpg";
import redFront from "../../../assets/Images/Apprealimg/redFront.jpg";
import Breadth from "../../../assets/Images/Breadth.svg";
import Height from "../../../assets/Images/Height.svg";
import Length from "../../../assets/Images/Length.svg";
import Weight from "../../../assets/Images/Weight.svg";
import CarouselforApperal from "../../../components/Carousel/CarouselforApperal";
import FeatureName from "../../../components/FeatureName";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { GetProductByIdAction } from "../../../redux/action/ProductActions/GetProductByIdAction";
import { useUpdateProductQuery } from "../../AddProductAllPages/Textile/ProductInfo/ProductHooksQuery";
const ApprealPreviewPage = () => {
  let { id } = useParams();
  let ProductId = id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const [currentImage, setCurrentImage] = useState(0);
  const [color, setColor] = useState("blue");
  const [dynamic, setDynamic] = useState("cloth");
  const [showSizechart, setShowSizechart] = useState(false);
  const [GetProductDataById, setGetProductDataById] = useState();
  const { GetProductByIdData } = useSelector((state) => state.GetProductById);
  const [borderColor, setBorderColor] = useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    mutate: updateProduct,
    isLoading,
    isError,
    data: productData,
    reset,
    variables,

    error: RegisterError,
  } = useUpdateProductQuery();
  const naviagte = useNavigate();
  const listItemText = [
    {
      itemText: "Do not wash",
    },
    {
      itemText: "Do not use bleach",
    },
    {
      itemText: "Iron at a maximum of 110ºC/230ºF",
    },
    {
      itemText: "Dry clean with tetrachloroethylene",
    },
    {
      itemText: "Do not tumble dry",
    },
  ];

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
  const technicalinfo = [
    {
      name: "Height",
      img: Height,
      val: GetProductDataById?.ProductTechInfo?.Height,
    },
    {
      name: "Length",
      img: Length,
      val: GetProductDataById?.ProductTechInfo?.Length,
    },
    {
      name: "Breadth",
      img: Breadth,
      val: GetProductDataById?.ProductTechInfo?.Width,
    },
    {
      name: "Before Weight",
      img: Weight,
      val: GetProductDataById?.ProductTechInfo?.WeightBeforePackingPerUnit,
    },
    {
      name: "After Weight",
      img: Weight,
      val: GetProductDataById?.ProductTechInfo?.WeightAfterPackingPerUnit,
    },
  ];

  console.log("GetProductDataById", GetProductDataById);

  // const fetchCompanyData = async () => {
  //   await axios.get("").;
  // };
  const ImageDataArray = GetProductDataById?.ProductImages;
  console.log("ImageDataArray Here", ImageDataArray);
  const blackClothImages = [blackFront, blackClose];
  const [ProductUploadState, setProductUploadState] = useState("");
  const redClothImages = [redFront, closeRed, backRed];
  const upwardClick = () => {
    setCurrentImage((currentImage + 1) % ImageDataArray.length);
  };
  const downwardClick = () => {
    setCurrentImage(
      (currentImage === 0 ? ImageDataArray.length - 1 : currentImage - 1) %
        ImageDataArray.length
    );
  };

  useEffect(() => {
    dispatch(GetProductByIdAction(ProductId));
  }, [dispatch]);

  const [storeVariationData, setStoreVariationData] = useState();
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();

  async function GetProductByid() {
    await axios
      .get(`product/get_product_byId/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setGetProductDataById(res?.data);
        setStoreVariationData(res?.data?.ProductsVariantions[0]?._id);
        setStoreTechnicalInfo(res?.data?.ProductFeatures);
      });
  }
  useEffect(() => {
    GetProductByid();
  }, []);

  let samplestate = false;
  const uploadProduct = () => {
    updateProduct(
      { id, ProductUploadStatus: "Approved" },

      {
        onSuccess: (response) => {
          console.log("response", response);
          toast.success(
            response?.data?.ProductUploadStatus
              ? response?.data?.ProductUploadStatus
              : "Product Uploaded Succesfully",
            {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          if (response?.data?.ProductUploadStatus === "Approved") {
            setTimeout(() => {
              naviagte("/home/mylistedproducts");
            }, [1200]);
          }
        },
      }
    );
  };
  GetProductDataById?.ProductsVariantions?.map((item, index) => {
    if (item?.sampleavailability) {
      return (samplestate = true);
    } else {
      return (samplestate = false);
    }
  });
  const uniqueColors = [
    ...new Set(
      GetProductDataById?.ProductsVariantions?.map((item) => item.ProductColor)
    ),
  ];
  // console.log("uniqueColors", uniqueColors);

  return (
    <>
      <ToastContainer />
      <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <BreadCrumbHeader MainText={"Apparel"} />
        <Paper
          elevation={0}
          sx={{
            borderRadius: "20px",
          }}
        >
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
            <Box
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
              onClick={() => {
                navigate("/home");
              }}
            ></Box>
            {/* </Link> */}
            <Typography sx={mainText}>Preview Page </Typography>
          </Box>
          <Grid container sx={{ width: "95%", mx: "auto", mt: 4 }}>
            <Grid item xl={0.5} lg={0.5} md={12} sm={12} xs={12} sx={fixGrid}>
              {/* {ImageDataArray?.length > 1 ? ( */}
              {/* <>
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
              </> */}
              {/* ) : null} */}
            </Grid>
            <Grid item xl={4.5} lg={4.5} md={12} sm={12} xs={12} sx={fixGrid}>
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
                }}
              >
                {console.log("images", ImageDataArray)}
                {/* <Box
                  component="img"
                  // src={ImageDataArray[0]?.url ? ImageDataArray[0]?.url : null}
                  // {}
                  // src={
                  // // color === "blue"
                  // // ImageDataArray?.url
                  // //   : blackClothImages[currentImage]
                  // // GetProductDataById?.ProductImages[0].url
                  // }
                  src={
                    // "https://bxi-development.s3.amazonaws.com/productImages/479768D823C767AB0C"
                    ImageDataArray ? ImageDataArray[currentImage]?.url : null
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
                    height: "auto",
                  }} //optional / we can also set with grid
                ></Box> */}
                <CarouselforApperal ImageDataArray={ImageDataArray} />
              </Box>
            </Grid>
            <Grid item xl={7} lg={7} md={12} sm={12} xs={12} sx={fixGrid}>
              <Box>
                <Typography sx={semi}>
                  {GetProductDataById?.ProductName}
                </Typography>
                <Typography sx={semiPrice}>
                  {GetProductDataById &&
                    GetProductDataById?.ProductsVariantions?.length > 0 &&
                    GetProductDataById?.ProductsVariantions[0]
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

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      height: "auto",
                      width: "30%",
                    }}
                  >
                    <Typography sx={semiSub}>Available colors</Typography>
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
                      {GetProductDataById &&
                        uniqueColors?.map((res, idx) => {
                          console.log("resss", res);
                          return (
                            <Box
                              key={idx}
                              onClick={() => {
                                // setVariationToMap(res?.ProductVariations);
                                setBorderColor(res?.ProductColor);
                              }}
                              sx={{
                                background: res?.ProductColor,
                                width: {
                                  xl: "15%",
                                  lg: "15%",
                                  md: "15%",
                                  sm: "15%",
                                  xs: "15%",
                                },
                                ml: 1,
                                height: "100%",
                                minHeight: "35px",
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                                border:
                                  res?.ProductColor === borderColor
                                    ? "2px solid blue"
                                    : "2px solid #000",
                              }}
                            ></Box>
                          );
                        })}
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={semiSub}>Gender</Typography>
                    <Typography
                      sx={{
                        ...tableData,
                        textAlign: "start",
                        lineHeight: "4rem",
                      }}
                    >
                      {GetProductDataById?.gender}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  mt={6}
                  sx={{
                    width: "100%",
                    mx: "auto",
                  }}
                >
                  {/* <Grid
                    container
                    sx={{
                      background: "red",
                    }}
                  >
                   
                  </Grid> */}

                  {/* {NewdataArray?.map((el, idx) => {
                    if (
                      el?.ProductColor === color ||
                      el?.ProductColor === ColorData
                    ) {
                      return ( */}
                  <Grid
                    container
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Box sx={ProductVariationStyle}>
                        <Typography sx={tableHeader}>
                          {" "}
                          Available Sizes
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Box sx={ProductVariationStyle}>
                        <Typography sx={tableHeader}> Min QTY</Typography>
                      </Box>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Box sx={ProductVariationStyle}>
                        <Typography sx={tableHeader}> Max QTY</Typography>
                      </Box>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Box sx={ProductVariationStyle}>
                        <Typography sx={tableHeader}> GST/Product</Typography>
                      </Box>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Box sx={ProductVariationStyle}>
                        <Typography sx={tableHeader}> Product ID</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    sx={{
                      textAlign: "center",
                      //   maxHeight: "60px",
                      //   height: "60px",
                      //   overflow: "auto",
                      //   "::-webkit-scrollbar": {
                      //     display: "block",
                      //   },
                      //   "::-webkit-scrollbar-thumb": {
                      //     dynamic: "#8d8e90",
                      //     height: "8px",
                      //     borderRadius: "8px",
                      //   },
                    }}
                  >
                    {
                      // filter the data from the array
                      GetProductDataById?.ProductsVariantions?.map(
                        (res, idx) => {
                          console.log("res==>", GetProductDataById);
                          return (
                            <Grid
                              container
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                              }}
                            >
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={tableData}>
                                    {/* {res.ShoeSize} {res.length} {res.height}{" "}
                                    {res.measureMentUnit} */}
                                    {res.ProductSize}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={tableData}>
                                    {res.MinOrderQuantity}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={tableData}>
                                    {res.MaxOrderQuantity}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={tableData}>
                                    {res.GST} %
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={tableData}>
                                    {res.ProductIdType}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          );
                        }
                      )
                    }
                  </Grid>
                </Box>
                <Box
                  mt={4}
                  sx={{
                    borderTop: "2px solid rgba(238, 238, 238, 1)",
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <Typography sx={find}>Download Size Chart </Typography>
                  <Typography
                    sx={{ ...chart, cursor: "pointer" }}
                    onMouseEnter={() => setShowSizechart(true)}
                    onMouseLeave={() => setShowSizechart(false)}
                  >
                    Size Chart{" "}
                  </Typography>
                  {showSizechart ? (
                    <Box
                      component="img"
                      src={GetProductDataById?.SizeChart?.url}
                      alt="hello"
                      onMouseEnter={() => setShowSizechart(true)}
                      onMouseLeave={() => setShowSizechart(false)}
                      sx={{
                        position: "absolute",
                        height: "300px",
                        width: "auto",
                        right: "5%",
                        zIndex: 10,
                      }}
                    />
                  ) : null}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{ mt: 6 }}>
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
                        label={
                          <Typography sx={tabTexts}>Description</Typography>
                        }
                        value="1"
                      />
                      <Tab
                        label={
                          <Typography sx={tabTexts}>
                            Product Information
                          </Typography>
                        }
                        value="2"
                      />
                      <Tab
                        label={
                          <Typography sx={tabTexts}>
                            Technical Information
                          </Typography>
                        }
                        value="3"
                      />
                      <Tab
                        label={
                          <Typography sx={tabTexts}>Key Features</Typography>
                        }
                        value="4"
                      />
                    </TabList>
                  </Box>
                  <Box>
                    <TabPanel value="1">
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Typography sx={tabText}>
                            {GetProductDataById &&
                              GetProductDataById.ProductSubtittle}
                          </Typography>
                          <Typography sx={tabSubText}>
                            {GetProductDataById &&
                              GetProductDataById.ProductDescription}
                          </Typography>
                        </Box>
                      </Grid>

                      {/* Tabpanel 2 data */}
                      <Grid container>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            // gap: 0.5,
                            // backgroundColor: "red",
                            // width: "100%",
                          }}
                        >
                          <Typography sx={product}>
                            Product Information
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Typography sx={available}>
                                Sample Available :&nbsp;
                              </Typography>
                              {samplestate ? (
                                <Typography
                                  sx={{
                                    ...available,
                                    fontWeight: 600,
                                    width: "20%",
                                  }}
                                >
                                  Yes
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    ...available,
                                    fontWeight: 600,
                                    width: "20%",
                                  }}
                                >
                                  No
                                </Typography>
                              )}
                            </Box>
                            {samplestate ? (
                              <>
                                {GetProductDataById?.ProductsVariantions?.map(
                                  (item) => {
                                    return (
                                      <>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: "10px",
                                            width: "500px",
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              width: "100%",
                                              display: "flex",
                                              flexDirection: "row",
                                            }}
                                          >
                                            <Grid
                                              container
                                              sx={{
                                                display: "flex",
                                                width: "100%",
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
                                                  flexDirection: "row",
                                                  gap: "20px",
                                                  width: "100%",
                                                }}
                                              >
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "100%",
                                                  }}
                                                >
                                                  <Typography
                                                    sx={{
                                                      ...available,
                                                      width: "100%",
                                                      fontWeight: 500,
                                                      fontSize: "18px",
                                                      lineHeight: "27px",
                                                      color: "#ADB8CC",
                                                    }}
                                                  >
                                                    Minimum Order Quantity
                                                  </Typography>
                                                  <Typography
                                                    sx={{
                                                      ...available,
                                                      lineHeight: "20px",
                                                      fontWeight: 500,
                                                      fontSize: "14px",
                                                      color: "#6B7A99",
                                                      width: "100%",
                                                    }}
                                                  >
                                                    {item.sampleavailability}
                                                  </Typography>
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
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  gap: "20px",
                                                }}
                                              >
                                                <Box sx={{}}>
                                                  <Typography
                                                    sx={{
                                                      ...available,
                                                      width: "100%",
                                                      fontWeight: 500,
                                                      fontSize: "18px",
                                                      lineHeight: "27px",
                                                      color: "#ADB8CC",
                                                    }}
                                                  >
                                                    Price of Sample
                                                  </Typography>
                                                  <Typography
                                                    sx={{
                                                      ...available,
                                                      lineHeight: "20px",
                                                      fontWeight: 500,
                                                      fontSize: "14px",
                                                      color: "#6B7A99",
                                                    }}
                                                  >
                                                    {item.priceofsample}
                                                    {/* <Box
                                          component="img"
                                          src={Stackofcoinsgrey}
                                        /> */}
                                                  </Typography>
                                                </Box>
                                              </Grid>
                                            </Grid>
                                          </Box>
                                        </Box>
                                      </>
                                    );
                                  }
                                )}
                              </>
                            ) : null}
                          </Box>
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Grid
                                container
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                }}
                              >
                                <Box
                                  mt={3}
                                  sx={{
                                    color: "#6B7A99",
                                    display: "flex",
                                    gap: "10px",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Box>
                                    <Typography
                                      sx={{
                                        ...product,
                                        fontWeight: 600,
                                        fontSize: "20px",
                                        lineHeight: "30px",
                                      }}
                                    >
                                      Product pickup location & Pin code
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "50px",
                                      }}
                                    >
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            lineHeight: "27px",
                                            color: "#ADB8CC",
                                          }}
                                        >
                                          Region
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#6B7A99",
                                            width: "100%",
                                          }}
                                        >
                                          {
                                            GetProductDataById?.LocationDetails
                                              ?.region
                                          }
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            lineHeight: "27px",
                                            color: "#ADB8CC",
                                          }}
                                        >
                                          State
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#6B7A99",
                                            width: "100%",
                                          }}
                                        >
                                          {
                                            GetProductDataById?.LocationDetails
                                              ?.state
                                          }
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            lineHeight: "27px",
                                            color: "#ADB8CC",
                                          }}
                                        >
                                          City
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#6B7A99",
                                            width: "100%",
                                          }}
                                        >
                                          {
                                            GetProductDataById?.LocationDetails
                                              ?.city
                                          }
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            lineHeight: "27px",
                                            color: "#ADB8CC",
                                          }}
                                        >
                                          Landmark
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#6B7A99",
                                            width: "100%",
                                          }}
                                        >
                                          {
                                            GetProductDataById?.LocationDetails
                                              ?.landmark
                                          }
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            lineHeight: "27px",
                                            color: "#ADB8CC",
                                          }}
                                        >
                                          Pin code
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#6B7A99",
                                            width: "100%",
                                          }}
                                        >
                                          {
                                            GetProductDataById?.LocationDetails
                                              ?.pincode
                                          }
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                  <Box mt={3}>
                                    <Typography
                                      sx={{
                                        ...product,
                                        fontWeight: 600,
                                        fontSize: "20px",
                                        lineHeight: "30px",
                                      }}
                                    >
                                      Additional Cost
                                    </Typography>
                                    {GetProductDataById?.OtherCost?.length === 0
                                      ? ""
                                      : GetProductDataById?.OtherCost?.map(
                                          (cost) => {
                                            console.log("cost", cost);
                                            const newValue =
                                              cost?.CostPrice.toFixed(2);
                                            return (
                                              <>
                                                {/* <Typography sx={listText}>
                                                  Product Pickup Location:{"   "}
                                                  {
                                                    GetProductDataById?.ProductPickupLocation
                                                  }
                                                </Typography> */}
                                                <Typography sx={listText}>
                                                  {cost.ReasonOfCost} Cost Price
                                                  : {/* {cost.CostPrice} */}
                                                  {newValue}
                                                  {cost.currencyType ===
                                                  "BXITokens" ? (
                                                    <Box
                                                      component="img"
                                                      src={BXITokenIcon}
                                                      alt="token"
                                                      sx={{
                                                        height: "auto",
                                                        width: "20px",
                                                      }}
                                                    />
                                                  ) : (
                                                    "₹"
                                                  )}
                                                </Typography>
                                              </>
                                            );
                                          }
                                        )}
                                  </Box>
                                </Box>
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Tabpanel 3 data */}
                      <Box mt={2}>
                        <Typography sx={pack}>Technical Information</Typography>

                        {/* <Box
                          mt={4}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          {technicalinfo?.map((val) => {
                            // console.log(val, "value");
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: "12%",
                                }}
                              >
                                <Box component="img" src={val.img} />
                                <Box>
                                  <Typography sx={packHead}>
                                    {val.name}
                                  </Typography>
                                  <Typography sx={packVal}>
                                    {val.name === "Before Weight" ||
                                    val.name === "After Weight"
                                      ? val.val + " kg"
                                      : val.val + " cm"}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box> */}
                        <Typography
                          mt={1}
                          sx={{
                            ...product,
                            fontWeight: 600,
                            fontSize: "20px",
                            lineHeight: "30px",
                          }}
                        >
                          Packaging Information
                        </Typography>
                        <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "95%",
                          }}
                        >
                          {technicalinfo?.map((val) => {
                            const newVal = Number(val?.val).toFixed(2);
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  // justifyContent: "space-between",
                                  width: "12%",
                                  gap: "25px",
                                }}
                              >
                                <Box component="img" src={val.img} />
                                <Box
                                  sx={{
                                    width: "100%",
                                    minWidth: "145px",
                                  }}
                                >
                                  <Typography sx={packHead}>
                                    {val.name}
                                  </Typography>
                                  <Typography sx={packVal}>
                                    {val.name === "Before Weight" ||
                                    val.name === "After Weight"
                                      ? newVal + " kg"
                                      : newVal + " cm"}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                        <Box
                          mt={1}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            mt={2}
                            sx={{
                              ...product,
                              fontWeight: 600,
                              fontSize: "20px",
                              lineHeight: "30px",
                            }}
                          >
                            Packaging and delivery Instructions
                          </Typography>

                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                          >
                            {
                              GetProductDataById?.ProductTechInfo
                                ?.PackagingAndDeliveryInstructionsIfAny
                            }
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
                          <Typography
                            mt={2}
                            sx={{
                              ...product,
                              fontWeight: 600,
                              fontSize: "20px",
                              lineHeight: "30px",
                            }}
                          >
                            Instructions to use product
                          </Typography>

                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                          >
                            {
                              GetProductDataById?.ProductTechInfo
                                ?.InstructionsToUseProduct
                            }
                          </Typography>
                        </Box>
                      </Box>

                      {/* Tabpanel 4 data */}
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
                            {storeTechnicalInfo?.map((res) => {
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
                                        <Typography
                                          sx={{
                                            ...packVal,
                                            fontSize: "1.5rem",
                                          }}
                                        >
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
                    <TabPanel value="2">
                      <Grid container>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            // gap: 0.5,
                            // backgroundColor: "red",
                            // width: "100%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Typography sx={available}>
                                Sample Available :&nbsp;
                              </Typography>
                              {samplestate ? (
                                <Typography
                                  sx={{
                                    ...available,
                                    fontWeight: 600,
                                    width: "20%",
                                  }}
                                >
                                  Yes
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    ...available,
                                    fontWeight: 600,
                                    width: "20%",
                                  }}
                                >
                                  No
                                </Typography>
                              )}
                            </Box>
                            {samplestate ? (
                              <>
                                {GetProductDataById?.ProductsVariantions?.map(
                                  (item) => {
                                    return (
                                      <>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: "10px",
                                            width: "500px",
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              width: "100%",
                                              display: "flex",
                                              flexDirection: "row",
                                            }}
                                          >
                                            <Grid
                                              container
                                              sx={{
                                                display: "flex",
                                                width: "100%",
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
                                                  flexDirection: "row",
                                                  gap: "20px",
                                                  width: "100%",
                                                }}
                                              >
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "100%",
                                                  }}
                                                >
                                                  <Typography
                                                    sx={{
                                                      ...available,
                                                      width: "100%",
                                                      fontWeight: 500,
                                                      fontSize: "18px",
                                                      lineHeight: "27px",
                                                      color: "#ADB8CC",
                                                    }}
                                                  >
                                                    Minimum Order Quantity
                                                  </Typography>
                                                  <Typography
                                                    sx={{
                                                      ...available,
                                                      lineHeight: "20px",
                                                      fontWeight: 500,
                                                      fontSize: "14px",
                                                      color: "#6B7A99",
                                                      width: "100%",
                                                    }}
                                                  >
                                                    {item.sampleavailability}
                                                  </Typography>
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
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  gap: "20px",
                                                }}
                                              >
                                                <Box sx={{}}>
                                                  <Typography
                                                    sx={{
                                                      ...available,
                                                      width: "100%",
                                                      fontWeight: 500,
                                                      fontSize: "18px",
                                                      lineHeight: "27px",
                                                      color: "#ADB8CC",
                                                    }}
                                                  >
                                                    Price of Sample
                                                  </Typography>
                                                  <Typography
                                                    sx={{
                                                      ...available,
                                                      lineHeight: "20px",
                                                      fontWeight: 500,
                                                      fontSize: "14px",
                                                      color: "#6B7A99",
                                                    }}
                                                  >
                                                    {item.priceofsample}
                                                    {/* <Box
                                          component="img"
                                          src={Stackofcoinsgrey}
                                        /> */}
                                                  </Typography>
                                                </Box>
                                              </Grid>
                                            </Grid>
                                          </Box>
                                        </Box>
                                      </>
                                    );
                                  }
                                )}
                              </>
                            ) : null}
                          </Box>
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Grid
                                container
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                }}
                              >
                                <Box
                                  mt={3}
                                  sx={{
                                    color: "#6B7A99",
                                    display: "flex",
                                    gap: "10px",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Box>
                                    <Typography
                                      sx={{
                                        ...product,
                                        fontWeight: 600,
                                        fontSize: "20px",
                                        lineHeight: "30px",
                                      }}
                                    >
                                      Product pickup location & Pin code
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "50px",
                                      }}
                                    >
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            lineHeight: "27px",
                                            color: "#ADB8CC",
                                          }}
                                        >
                                          Region
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#6B7A99",
                                            width: "100%",
                                          }}
                                        >
                                          {
                                            GetProductDataById?.LocationDetails
                                              ?.region
                                          }
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            lineHeight: "27px",
                                            color: "#ADB8CC",
                                          }}
                                        >
                                          State
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#6B7A99",
                                            width: "100%",
                                          }}
                                        >
                                          {
                                            GetProductDataById?.LocationDetails
                                              ?.state
                                          }
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            lineHeight: "27px",
                                            color: "#ADB8CC",
                                          }}
                                        >
                                          City
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#6B7A99",
                                            width: "100%",
                                          }}
                                        >
                                          {
                                            GetProductDataById?.LocationDetails
                                              ?.city
                                          }
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            lineHeight: "27px",
                                            color: "#ADB8CC",
                                          }}
                                        >
                                          Landmark
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#6B7A99",
                                            width: "100%",
                                          }}
                                        >
                                          {
                                            GetProductDataById?.LocationDetails
                                              ?.landmark
                                          }
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            lineHeight: "27px",
                                            color: "#ADB8CC",
                                          }}
                                        >
                                          Pin code
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#6B7A99",
                                            width: "100%",
                                          }}
                                        >
                                          {
                                            GetProductDataById?.LocationDetails
                                              ?.pincode
                                          }
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                  <Box mt={3}>
                                    <Typography
                                      sx={{
                                        ...product,
                                        fontWeight: 600,
                                        fontSize: "20px",
                                        lineHeight: "30px",
                                      }}
                                    >
                                      Additional Cost
                                    </Typography>
                                    {GetProductDataById?.OtherCost?.length === 0
                                      ? ""
                                      : GetProductDataById?.OtherCost?.map(
                                          (cost) => {
                                            console.log("cost", cost);
                                            const newValue =
                                              cost?.CostPrice.toFixed(2);
                                            return (
                                              <>
                                                {/* <Typography sx={listText}>
                                                  Product Pickup Location:{"   "}
                                                  {
                                                    GetProductDataById?.ProductPickupLocation
                                                  }
                                                </Typography> */}
                                                <Typography sx={listText}>
                                                  {cost.ReasonOfCost} Cost Price
                                                  : {/* {cost.CostPrice} */}
                                                  {newValue}
                                                  {cost.currencyType ===
                                                  "BXITokens" ? (
                                                    <Box
                                                      component="img"
                                                      src={BXITokenIcon}
                                                      alt="token"
                                                      sx={{
                                                        height: "auto",
                                                        width: "20px",
                                                      }}
                                                    />
                                                  ) : (
                                                    "₹"
                                                  )}
                                                </Typography>
                                              </>
                                            );
                                          }
                                        )}
                                  </Box>
                                </Box>
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </TabPanel>
                    <TabPanel value="3">
                      <Box mt={2}>
                        <Typography sx={pack}>Technical Information</Typography>

                        {/* <Box
                          mt={4}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          {technicalinfo?.map((val) => {
                            // console.log(val, "value");
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: "12%",
                                }}
                              >
                                <Box component="img" src={val.img} />
                                <Box>
                                  <Typography sx={packHead}>
                                    {val.name}
                                  </Typography>
                                  <Typography sx={packVal}>
                                    {val.name === "Before Weight" ||
                                    val.name === "After Weight"
                                      ? val.val + " kg"
                                      : val.val + " cm"}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box> */}
                        <Typography
                          mt={1}
                          sx={{
                            ...product,
                            fontWeight: 600,
                            fontSize: "20px",
                            lineHeight: "30px",
                          }}
                        >
                          Packaging Information
                        </Typography>
                        <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "95%",
                          }}
                        >
                          {technicalinfo?.map((val) => {
                            const newVal = Number(val?.val).toFixed(2);
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  // justifyContent: "space-between",
                                  width: "12%",
                                  gap: "25px",
                                }}
                              >
                                <Box component="img" src={val.img} />
                                <Box
                                  sx={{
                                    width: "100%",
                                    minWidth: "145px",
                                  }}
                                >
                                  <Typography sx={packHead}>
                                    {val.name}
                                  </Typography>
                                  <Typography sx={packVal}>
                                    {val.name === "Before Weight" ||
                                    val.name === "After Weight"
                                      ? newVal + " kg"
                                      : newVal + " cm"}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                        <Box
                          mt={1}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            mt={2}
                            sx={{
                              ...product,
                              fontWeight: 600,
                              fontSize: "20px",
                              lineHeight: "30px",
                            }}
                          >
                            Packaging and delivery Instructions
                          </Typography>

                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                          >
                            {
                              GetProductDataById?.ProductTechInfo
                                ?.PackagingAndDeliveryInstructionsIfAny
                            }
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
                          <Typography
                            mt={2}
                            sx={{
                              ...product,
                              fontWeight: 600,
                              fontSize: "20px",
                              lineHeight: "30px",
                            }}
                          >
                            Instructions to use product
                          </Typography>

                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                          >
                            {
                              GetProductDataById?.ProductTechInfo
                                ?.InstructionsToUseProduct
                            }
                          </Typography>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="4">
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
                          {storeTechnicalInfo?.map((res) => {
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
                                      <Typography
                                        sx={{ ...packVal, fontSize: "1.5rem" }}
                                      >
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
                    </TabPanel>
                  </Box>
                </TabContext>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ width: "95%", mx: "auto", mt: 2 }}>
            <Button sx={uploadBtn} onClick={uploadProduct}>
              Upload Product
            </Button>
          </Box>
        </Paper>
      </Paper>
    </>
  );
};

export default ApprealPreviewPage;

const mainText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "24px",
  color: "#6B7A99",
  p: 3,
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
  mt: { xl: 0, lg: 0, md: 0, sm: 0, xs: 2 },
};

const tabTexts = {
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.4rem",
    sm: "1.2rem",
    xs: "1.2rem",
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
  // ml: { xl: 2, lg: 2, md: 0, sm: 0, xs: 0 },
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
    xl: "center",
    lg: "center",
    md: "center",
    sm: "center",
    xs: "center",
  },
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
    xl: "center",
    lg: "center",
    md: "center",
    sm: "center",
    xs: "center",
  },
};

const find = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.4rem",
    sm: "1.3rem",
    xs: "1.3rem",
  },
  color: "#6B7A99",
  lineHeight: "5rem",
};

const chart = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.4rem",
    sm: "1.3rem",
    xs: "1.3rem",
  },
  lineHeight: "5rem",
  color: "#445FD2",
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
  // textAlign: "center",
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
  color: "#6B7A99",
};

const material = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.2rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  lineHeight: "3rem",
  color: "#ADB8CC",
};

const listText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.6rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
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

const gridAdj = {
  textAlign: { xl: "left", lg: "left", md: "left", sm: "left", xs: "center" },
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

const ProductVariationStyle = {
  width: "auto",
};
