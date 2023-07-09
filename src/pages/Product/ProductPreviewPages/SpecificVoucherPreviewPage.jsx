import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Tab,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useGetProductById } from "../../../Hooks/GetProducts/useGetProductById";
import { useProductAddToCart } from "../../../Hooks/ProductActions/useProductAddToCart";
import Weight from "../../../assets/Images/Weight.svg";
import LeftArrow from "../../../assets/Images/payment/LeftArrow.png";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { GetProductByIdAction } from "../../../redux/action/ProductActions/GetProductByIdAction";
import { useUpdateProductQuery } from "../../AddProductAllPages/Textile/ProductInfo/ProductHooksQuery";

import { useGetCompanyDetails } from "../../../Hooks/Auth";
import useGetCompanyTypeData from "../../../Hooks/CompanyData/useGetCompanyTypeData";
import CarouselforApperal from "../../../components/Carousel/CarouselforApperal";
import FeatureName from "../../../components/FeatureName";
function DiscountedPrice({ regularPrice, discountPrice }) {
  console.log({ regularPrice, discountPrice });
  const discount = regularPrice - discountPrice;
  const discountPercent = (discount / regularPrice) * 100;
  const formattedDiscountPercent = discountPercent.toFixed(2);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          // justifyContent: "space-between",
          flexDirection: "row",
          width: "400px",
          mt: "20px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "24px",
            lineHeight: "36px",
            letterSpacing: "0.06em",
            textTransform: "capitalize",

            color: "#DC3737",
          }}
        >
          -{formattedDiscountPercent}%
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "36px",
            letterSpacing: "0.06em",
            textTransform: "capitalize",
            ml: 1,
            color: "#6B7A99",
          }}
        >
          &nbsp;{discountPrice}{" "}
          <img
            src={BXITokenIcon}
            style={{
              width: "20px",
              height: "auto",
            }}
            alt="BXI Token"
          />
        </Typography>
      </Box>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "36px",
          letterSpacing: "0.06em",
          textTransform: "capitalize",

          color: "#6B7A99",
          textDecoration: "line-through",
        }}
      >
        MRP: {regularPrice}
      </Typography>
    </div>
  );
}

const AllProductPreviewPage = () => {
  const { data: CompanyData } = useGetCompanyDetails();

  const {
    data: CompanyTypeData,
    // isLoading: CompanyTypeDataLoading,
    // error: CompanyTypeDataError,
    // refetch: CompanyTypeDataRefetch,
  } = useGetCompanyTypeData(CompanyData?.data?.companyType);
  let { id } = useParams();
  let ProductId = id;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  // const [currentImage, setCurrentImage] = useState(0);
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [VariationToMap, setVariationToMap] = useState();
  // const [showSizechart, setShowSizechart] = useState(false);
  // const [WishlistData, setWishlistData] = useState();
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();
  // const [keyfeture, setKeyFeature] = useState();
  // const [keyfeatureName, setKeyFeatureName] = useState();
  const [pagename, setPageName] = useState("");
  // const [GetProductDataById] = useState();
  // const [IsSample, setIsSample] = useState("");

  // const iconForFeaytures = {
  //   // hello: "hello",
  //   // Comfort: {
  //   //   img: Comfort,
  //   // },
  // };
  const [borderColor, setBorderColor] = useState(true);
  // const [color, setColor] = useState("");
  // const [like, setLike] = useState(false);

  const PageNameFunction = () => {
    if (CompanyTypeData?.data?.CompanyTypeName === "Textile") {
      setPageName("Textile");
    } else if (CompanyTypeData?.data?.CompanyTypeName === "Office Supply") {
      setPageName("Office Supply");
    } else if (CompanyTypeData?.data?.CompanyTypeName === "Lifestyle") {
      setPageName("Life Style");
    } else {
      setPageName("Preview Page");
    }
  };
  async function GetProductByid() {
    await axios
      .get(`product/get_product_byId/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setGetProductByIdData(res?.data);
        // console.log(
        //   "GetProductByIdDataImage",
        //   res?.data?.SizeChart?.at(0)?.url
        // );
        setStoreVariationData(res?.data?.ProductsVariantions[0]?._id);
        setStoreTechnicalInfo(res?.data?.ProductFeatures);
        // setFetauresIcons(res?.data);
      });
  }

  // async function GetFeaturesNames() {
  //   await axios
  //     .get("keyfeature/get_KeyFeatures_ByName", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log("hellodataaja", res.data);
  //       // setKeyFeatureName(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // }

  useEffect(() => {
    // GetFeaturesIcons();
  }, []);
  useEffect(() => {
    // GetFeaturesNames();
    PageNameFunction();
    console.log("kkk", CompanyData);
  }, []);
  const navigate = useNavigate();

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  console.log("VariationToMappp", VariationToMap);

  const [storeVariationData, setStoreVariationData] = useState();

  console.log("storeVariationData", storeVariationData);

  let ColorData = {};

  GetProductByIdData?.ProductsVariantions?.map((item, index) => {
    if (index === 0) {
      ColorData = item;
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    data: mutateCartData,
    // mutate: addtocart
  } = useProductAddToCart();

  const technicalinfo = [
    // {
    //   name: "Height",
    //   img: Height,
    //   val: GetProductByIdData?.ProductTechInfo?.Height,
    // },
    // {
    //   name: "Length",
    //   img: Length,
    //   val: GetProductByIdData?.ProductTechInfo?.Length,
    // },
    {
      name: "Before Weight",
      img: Weight,
      val: GetProductByIdData?.ProductTechInfo?.WeightBeforePackingPerUnit,
    },
    // {
    //   name: "After Weight",
    //   img: Weight,
    //   val: GetProductByIdData?.ProductTechInfo?.WeightAfterPackingPerUnit,
    // },
  ];

  const ImageDataArray = GetProductByIdData?.ProductImages;
  // const upwardClick = () => {
  //   setCurrentImage((currentImage + 1) % ImageDataArray.length);
  // };
  // const downwardClick = () => {
  //   setCurrentImage(
  //     (currentImage === 0 ? ImageDataArray.length - 1 : currentImage - 1) %
  //       ImageDataArray.length
  //   );
  // };

  useEffect(() => {
    dispatch(GetProductByIdAction(ProductId));
  }, [dispatch]);

  let samplestate = false;
  GetProductByIdData?.ProductsVariantions?.map((item, index) => {
    if (item.sampleavailability) {
      return (samplestate = true);
    } else {
      return (samplestate = false);
    }
  });

  // async function handleAddToCart(id) {
  //   addtocart(id);
  // }

  useEffect(() => {
    ColorData = {};
  }, [
    // color,
    storeVariationData,
  ]);

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
  const { GetProductByIdDatas } = useSelector((state) => state?.GetProductById);

  // let SellerCompanyId = GetProductByIdDatas?.SellerCompanyId;
  // const [messageOption, setMessageOption] = useState("");

  // const GetProductShareLink = async (id) => {
  //   toast.info("Url Copied", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  //   navigator.clipboard.writeText(
  //     `https://barter-dev-v2.web.app/home/appreal` + `/${id}`
  //   );
  // };

  let NewdataArray = [];

  for (let i = 0; i < GetProductByIdData?.ProductsVariantions?.length; i++) {
    let ProductColor = GetProductByIdData?.ProductsVariantions[i].ProductColor;
    let finddata = NewdataArray.find((d) => d.ProductColor === ProductColor);
    if (finddata) {
      finddata.ProductVariations.push(
        GetProductByIdData?.ProductsVariantions[i]
      );
    } else {
      NewdataArray.push({
        ProductColor: GetProductByIdData?.ProductsVariantions[i].ProductColor,
        ProductVariations: [GetProductByIdData?.ProductsVariantions[i]],
      });
    }
  }
  const {
    mutate: updateProduct,
    // isLoading,
    // isError,
    data: productData,
    // reset,
    // variables,

    // error: RegisterError,
  } = useUpdateProductQuery();

  const naviagte = useNavigate();

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

  useEffect(() => {
    GetProductByid();
  }, []);

  const { data: ProductData } = useGetProductById(id);

  console.log(GetProductByIdData, "GetProductByIdData");

  return (
    <React.Fragment>
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

      <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <BreadCrumbHeader MainText={pagename} />
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
            <Box
              sx={{
                width: "100%",
                mx: "auto",
                // textAlign: "end",
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={LeftArrow}
                alt="LeftArrow"
                sx={{
                  height: "9px",
                  width: "22px",
                  position: "absolute",
                  left: "0",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/home");
                }}
              />

              <Typography sx={mainText}>Preview Page</Typography>
            </Box>
          </Box>

          <Grid container sx={{ width: "95%", mx: "auto", mt: 4 }}>
            <Grid item xl={1} lg={1} md={12} sm={12} xs={12} sx={fixGrid}>
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
            </Grid>
            <Grid item xl={4} lg={4} md={12} sm={12} xs={12} sx={fixGrid}>
              {/* <Box
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
                <Box
                  component="img"
                  src={
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
                ></Box>
              </Box> */}
              <CarouselforApperal ImageDataArray={ImageDataArray} />
            </Grid>
            <Grid item xl={7} lg={7} md={12} sm={12} xs={12} sx={fixGrid}>
              <Box>
                <Typography sx={semi}>
                  {GetProductByIdData?.ProductName}
                </Typography>
                <DiscountedPrice
                  regularPrice={
                    GetProductByIdData &&
                    GetProductByIdData?.ProductsVariantions?.length > 0 &&
                    GetProductByIdData?.ProductsVariantions[0]?.PricePerUnit
                  }
                  discountPrice={
                    GetProductByIdData &&
                    GetProductByIdData?.ProductsVariantions?.length > 0 &&
                    GetProductByIdData?.ProductsVariantions[0]?.DiscountedPrice
                  }
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
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
                      {GetProductByIdData &&
                        NewdataArray?.map((res, idx) => {
                          console.log("resss", res);
                          return (
                            <Box
                              key={idx}
                              onClick={() => {
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

                  <Grid
                    item
                    xl={4}
                    lg={4}
                    md={4}
                    sm={4}
                    xs={4}
                    sx={{
                      py: "1rem",
                    }}
                  >
                    <Typography sx={HeaderTypoStyle}>Validity</Typography>
                    <Typography sx={HeaderSubTypoStyle}>
                      {ProductData?.ProductsVariantions &&
                        ProductData?.ProductsVariantions.length > 0 &&
                        ProductData?.ProductsVariantions[0]?.validityOfVoucher +
                          " " +
                          ProductData?.ProductsVariantions &&
                        ProductData?.ProductsVariantions.length > 0 &&
                        ProductData?.ProductsVariantions[0]
                          ?.validityOfVoucherUnit}
                    </Typography>
                  </Grid>
                </Box>

                <Box
                  mt={6}
                  sx={{
                    width: "100%",
                    mx: "auto",
                  }}
                >
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
                  </Grid>
                  <Grid
                    container
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    {
                      // filter the data from the array
                      GetProductByIdData?.ProductsVariantions?.map(
                        (res, idx) => {
                          console.log("res==>", GetProductByIdData);
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
                                <Select
                                  sx={{
                                    width: "180px",
                                    marginLeft: "0px",
                                    marginRight: "auto",
                                    height: "40px",
                                    marginTop: "0px",
                                    border: "1px solid #8C8C8C",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                      {
                                        borderColor: "transparent",
                                      },
                                  }}
                                  defaultValue={"hello"}
                                  onChange={(e) => {
                                    setStoreVariationData(e.target.value);
                                    // setIsSample(false);
                                  }}
                                >
                                  <MenuItem disabled>
                                    <Typography
                                      sx={{
                                        cursor: "pointer",
                                        color: "black",
                                        fontSize: "14px",
                                      }}
                                    >
                                      Select a Size
                                    </Typography>
                                  </MenuItem>
                                  {!VariationToMap && NewdataArray?.length > 0
                                    ? !VariationToMap &&
                                      NewdataArray[0]?.ProductVariations?.map(
                                        (el, idx) => {
                                          return (
                                            <MenuItem key={idx} value={el?._id}>
                                              <Typography
                                                sx={{
                                                  cursor: "pointer",
                                                  color: "black",
                                                  fontSize: "14px",
                                                }}
                                              >
                                                {el?.ProductSize}
                                              </Typography>
                                            </MenuItem>
                                          );
                                        }
                                      )
                                    : VariationToMap?.map((el, idx) => {
                                        return (
                                          <MenuItem key={idx} value={el?._id}>
                                            <Typography
                                              sx={{
                                                cursor: "pointer",
                                                color: "black",
                                                fontSize: "14px",
                                              }}
                                            >
                                              {el?.ProductSize}
                                            </Typography>
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
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
                            Technical Information
                          </Typography>
                        }
                        value="2"
                      />
                      <Tab
                        label={
                          <Typography sx={tabTexts}>Key Features</Typography>
                        }
                        value="3"
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
                            width: "100%",
                            padding: "0rem",
                            //   background: "red",
                            marginTop: {
                              xl: "0rem",
                              lg: "1rem",
                              md: "4rem",
                              sm: "2rem",
                              xs: "2rem",
                            },
                          }}
                        >
                          <Box>
                            <Typography sx={CommonTypoStyle1}>
                              {ProductData?.ProductName}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: {
                                  xs: "12px",
                                  sm: "15px",
                                  md: "15px",
                                  lg: "16px",
                                  xl: "16px",
                                },
                                textAlign: "justify",
                                color: "#6B7A99",
                                width: "100%",
                                pt: {
                                  xs: "2%",
                                  sm: "1%",
                                  md: "0.8%",
                                  lg: "0.8%",
                                  xl: "0.8%",
                                },
                              }}
                            >
                              {ProductData?.ProductSubtittle}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: {
                                  xs: "12px",
                                  sm: "15px",
                                  md: "15px",
                                  lg: "16px",
                                  xl: "16px",
                                },
                                textAlign: "justify",
                                color: "#6B7A99",
                                width: "100%",
                                pt: {
                                  xs: "2%",
                                  sm: "1%",
                                  md: "0.8%",
                                  lg: "0.8%",
                                  xl: "0.8%",
                                },
                              }}
                            >
                              {ProductData?.ProductDescription} Start Hotel
                            </Typography>
                          </Box>
                          <Box>
                            <Typography sx={CommonTypoStyle1}>
                              Store Details
                            </Typography>
                            <Box sx={{ display: "grid", gap: "6px" }}>
                              {/* <Typography sx={txt}>
                              Lorem ipsum dolor sit amet consectetur. Proin sit
                              nisl a a lectus imperdiet.
                            </Typography> */}
                              <Box
                                component={"a"}
                                download="hotelsList"
                                target="_blank"
                                href={`${
                                  ProductData?.HotelsListUrls?.at(0)?.url
                                }`}
                                onClick={() => {
                                  console.log("download excel");
                                }}
                                sx={CommonTypoStyle2}
                              >
                                Store List
                              </Box>
                              {/* <Typography sx={storelist}>Store List</Typography> */}
                              <Typography sx={CommonTypoStyle2}>
                                Store Link
                              </Typography>
                              <a
                                style={{
                                  fontFamily: "Poppins",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  fontSize: 12,
                                  textAlign: "justify",
                                  color: "#445FD2",
                                  marginTop: "-8px",
                                  marginBottom: "1%",
                                }}
                                target="_blank"
                                href={
                                  ProductData?.Link
                                    ? ProductData?.Link
                                    : "www.loremipsum.com"
                                }
                              >
                                {ProductData?.Link
                                  ? ProductData?.Link
                                  : "www.loremipsum.com "}
                              </a>
                            </Box>
                          </Box>
                        </Box>

                        <Box>
                          <Grid container>
                            {ProductData?.redemptionType === "offline" ||
                            ProductData?.redemptionType === "both" ? (
                              <>
                                <Grid
                                  item
                                  xl={1.5}
                                  lg={1.5}
                                  md={1.5}
                                  sm={1.5}
                                  xs={1.5}
                                >
                                  <Typography
                                    sx={{ ...CommonTypoStyle3, pb: "1rem" }}
                                  >
                                    Area
                                  </Typography>
                                  <Typography sx={HeaderSubTypoStyle}>
                                    {ProductData?.Area}
                                  </Typography>
                                </Grid>

                                <Grid
                                  item
                                  xl={1.5}
                                  lg={1.5}
                                  md={1.5}
                                  sm={1.5}
                                  xs={1.5}
                                >
                                  <Typography
                                    sx={{ ...CommonTypoStyle3, pb: "1rem" }}
                                  >
                                    Landmark
                                  </Typography>
                                  <Typography sx={HeaderSubTypoStyle}>
                                    {ProductData?.Landmark}
                                  </Typography>
                                </Grid>

                                <Grid
                                  item
                                  xl={1.5}
                                  lg={1.5}
                                  md={1.5}
                                  sm={1.5}
                                  xs={1.5}
                                >
                                  <Typography
                                    sx={{ ...CommonTypoStyle3, pb: "1rem" }}
                                  >
                                    City
                                  </Typography>
                                  <Typography sx={HeaderSubTypoStyle}>
                                    {ProductData?.City}
                                  </Typography>
                                </Grid>

                                <Grid
                                  item
                                  xl={1.5}
                                  lg={1.5}
                                  md={1.5}
                                  sm={1.5}
                                  xs={1.5}
                                >
                                  <Typography
                                    sx={{ ...CommonTypoStyle3, pb: "1rem" }}
                                  >
                                    State
                                  </Typography>
                                  <Typography sx={HeaderSubTypoStyle}>
                                    {ProductData?.State}
                                  </Typography>
                                </Grid>
                              </>
                            ) : (
                              ""
                            )}

                            <Grid container sx={{ marginTop: "20px" }}>
                              <Grid
                                item
                                xl={2.5}
                                lg={2.5}
                                md={2.5}
                                sm={2.5}
                                xs={2.5}
                              >
                                <Typography
                                  sx={{ ...CommonTypoStyle2, pb: "1rem" }}
                                >
                                  Redemption Type
                                </Typography>
                                {ProductData?.redemptionType === "both" ? (
                                  <Typography sx={HeaderSubTypoStyle}>
                                    Online and Offline
                                  </Typography>
                                ) : (
                                  ""
                                )}
                                {ProductData?.redemptionType === "online" ? (
                                  <Typography sx={HeaderSubTypoStyle}>
                                    Online
                                  </Typography>
                                ) : (
                                  ""
                                )}
                                {ProductData?.redemptionType === "offline" ? (
                                  <Typography sx={HeaderSubTypoStyle}>
                                    Offline
                                  </Typography>
                                ) : (
                                  ""
                                )}
                              </Grid>

                              <Grid
                                item
                                xl={2.5}
                                lg={2.5}
                                md={2.5}
                                sm={2.5}
                                xs={2.5}
                              >
                                <Typography
                                  sx={{ ...CommonTypoStyle1, pb: "1rem" }}
                                >
                                  Listed this Product for
                                </Typography>
                                <Typography sx={HeaderSubTypoStyle}>
                                  {`${ProductData?.ListThisProductForAmount} ${ProductData?.ListThisProductForUnitOfTime}`}
                                  {/* 30 Days */}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>

                      {/* Tabpanel 2 data */}
                      <Grid container>
                        <Box>
                          <Box>
                            <Typography sx={CommonTypoStyle1}>
                              Inclusion
                            </Typography>
                            <Box sx={{ pt: "0.8%", padding: "10px" }}>
                              <Typography sx={dots}>
                                <FiberManualRecordIcon
                                  sx={{ fontSize: "7px", pt: "10px" }}
                                />
                                {ProductData?.Inclusions}
                              </Typography>
                              {/* <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            9 Iconic Restaurants & Bars
                          </Typography>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            High-tea & Live Music Every Evening
                          </Typography>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            Luxury Shopping Arcade
                          </Typography> */}
                            </Box>
                          </Box>
                          <Box>
                            <Typography sx={CommonTypoStyle1}>
                              Exclusion
                            </Typography>
                            <Box sx={{ pt: "0.8%", padding: "10px" }}>
                              <Typography sx={dots}>
                                <FiberManualRecordIcon
                                  sx={{ fontSize: "7px", pt: "10px" }}
                                />
                                {ProductData?.Exclusions}
                              </Typography>
                            </Box>
                          </Box>

                          <Box>
                            <Typography sx={CommonTypoStyle1}>
                              Terms & Conditions
                            </Typography>
                            <Box sx={{ pt: "0.8%", padding: "10px" }}>
                              <Typography sx={dots}>
                                <FiberManualRecordIcon
                                  sx={{ fontSize: "7px", pt: "10px" }}
                                />
                                {ProductData?.TermConditions}
                              </Typography>
                            </Box>
                          </Box>

                          <Box>
                            <Typography sx={CommonTypoStyle1}>
                              Other Cost
                            </Typography>
                            <Box sx={{ pt: "0.8%", padding: "10px" }}>
                              <Typography sx={dots}>
                                {ProductData?.OtherCost[0]?.CostPrice}{" "}
                                {ProductData?.OtherCost[0]?.currencyType}{" "}
                                {ProductData?.OtherCost[0]?.ReasonOfCost}
                              </Typography>
                              {/* <Typography sx={dots}>
                            Lorem ipsum dolor sit amet consectetur. Donec
                            pellentesque aliquam eget nibh lectus urna tempor
                            eget. Enim sed dictum arcu aliquam aliquet consequat
                            adipiscing odio ut.
                          </Typography>
                          <br />
                          <Typography sx={dots}>
                            Lorem ipsum dolor sit amet consectetur. Donec
                            pellentesque aliquam eget nibh lectus urna tempor
                            eget. Enim sed dictum arcu aliquam aliquet consequat
                            adipiscing odio ut.
                          </Typography> */}
                            </Box>
                          </Box>
                          <Box>
                            <Typography sx={CommonTypoStyle1}>
                              Redemption Steps
                            </Typography>
                            <Box sx={{ padding: "10px" }}>
                              <Typography sx={dots}>
                                <FiberManualRecordIcon
                                  sx={{ fontSize: "7px", pt: "10px" }}
                                />
                                {ProductData?.RedemptionSteps}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>

                      {/* Tabpanel 3 data */}
                      <Box mt={2}>
                        <Typography sx={pack}>Technical Information</Typography>

                        <Box
                          mt={1}
                          sx={{
                            display: "flex",
                            gap: "10px",
                            width: "500px",
                          }}
                        ></Box>

                        <Typography
                          mt={2}
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
                              GetProductByIdData?.ProductTechInfo
                                ?.PackagingAndDeliveryInstructionsIfAny
                            }
                          </Typography>
                        </Box>
                        {GetProductByIdData?.ProductTechInfo
                          ?.InstructionsToUseProduct === null ||
                        GetProductByIdData?.ProductTechInfo
                          ?.InstructionsToUseProduct === undefined ? null : (
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
                                GetProductByIdData?.ProductTechInfo
                                  ?.InstructionsToUseProduct
                              }
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      {/* Tabpanel 4 data */}
                      <Box sx={{ mt: 2 }}>
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
                            mt={2}
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
                      <Box>
                        <Typography sx={CommonTypoStyle1}>Inclusion</Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {ProductData?.Inclusions}
                          </Typography>
                          {/* <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            9 Iconic Restaurants & Bars
                          </Typography>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            High-tea & Live Music Every Evening
                          </Typography>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            Luxury Shopping Arcade
                          </Typography> */}
                        </Box>
                      </Box>
                      <Box>
                        <Typography sx={CommonTypoStyle1}>Exclusion</Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {ProductData?.Exclusions}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography sx={CommonTypoStyle1}>
                          Terms & Conditions
                        </Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {ProductData?.TermConditions}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography sx={CommonTypoStyle1}>
                          Other Cost
                        </Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots}>
                            {ProductData?.OtherCost[0]?.CostPrice}{" "}
                            {ProductData?.OtherCost[0]?.currencyType}{" "}
                            {ProductData?.OtherCost[0]?.ReasonOfCost}
                          </Typography>
                          {/* <Typography sx={dots}>
                            Lorem ipsum dolor sit amet consectetur. Donec
                            pellentesque aliquam eget nibh lectus urna tempor
                            eget. Enim sed dictum arcu aliquam aliquet consequat
                            adipiscing odio ut.
                          </Typography>
                          <br />
                          <Typography sx={dots}>
                            Lorem ipsum dolor sit amet consectetur. Donec
                            pellentesque aliquam eget nibh lectus urna tempor
                            eget. Enim sed dictum arcu aliquam aliquet consequat
                            adipiscing odio ut.
                          </Typography> */}
                        </Box>
                      </Box>
                      <Box>
                        <Typography sx={CommonTypoStyle1}>
                          Redemption Steps
                        </Typography>
                        <Box sx={{ padding: "10px" }}>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {ProductData?.RedemptionSteps}
                          </Typography>
                          {/* <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            9 Nisl consectetur sit lacus proin faucibus vitae.
                          </Typography>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            Ut imperdiet massa ut urna dui amet. Feugiat non
                            pellentesque tellus congue augue.
                          </Typography>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            Habitant nunc pellentesque duis egestas orci.
                          </Typography>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            Gravida elementum venenatis a volutpat luctus.
                          </Typography>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            Est vitae tempor vitae eget bibendum leo.
                          </Typography> */}
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="3">
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
                            mt={2}
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
                  </Box>
                </TabContext>
                <Box sx={{ pt: "2%" }}>
                  <Button sx={ButtonCss} onClick={uploadProduct}>
                    Upload Voucher
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ width: "95%", mx: "auto", mt: 2 }}>
            {GetProductByIdData?.ProductUploadStatus === "Approved" ? null : (
              <Button sx={uploadBtn} onClick={uploadProduct}>
                Upload Product
              </Button>
            )}
          </Box>
        </Paper>
      </Paper>
    </React.Fragment>
  );
};

export default AllProductPreviewPage;

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
  textTransform: "none",
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.4rem",
    sm: "1.2rem",
    xs: "1.2rem",
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

const ProductVariationStyle = {
  width: "auto",
};

const ButtonCss = {
  textTransform: "none",
  width: {
    xl: "100%",
    lg: "100%",
    md: "100%",
    sm: "100%",
    xs: "100%",
  },
  height: "auto",
  maxHeight: "49px",
  minHeight: "49px",
  fontFamily: "Work Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xs: "12px",
    sm: "15px",
    md: "20px",
    lg: "20px",
    xl: "20px",
  },
  borderRadius: "8px",
  color: "#FFFFFF",
  background: "#445FD2",
  "&:hover": {
    background: "#445FD2",
  },
};
const HeaderTypoStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "16px",
    lg: "16px",
    md: "14px",
    sm: "12px",
    xs: "12px",
  },
  color: "#6B7A99",
};

const HeaderSubTypoStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "14px",
    lg: "14px",
    md: "12px",
    sm: "10px",
    xs: "10px",
  },
  color: "#B1B1B1",
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

const CommonTypoStyle1 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xs: "12px",
    sm: "15px",
    md: "20px",
    lg: "17px",
    xl: "17px",
  },
  letterSpacing: "1px",
  color: "#6B7A99",
  width: "auto",
  marginTop: "2%",
};

const CommonTypoStyle2 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  marginTop: "2%",
  fontSize: {
    xs: "12px",
    sm: "15px",
    md: "20px",
    lg: "15px",
    xl: "15px",
  },
  letterSpacing: "1px",
  color: "#6B7A99",
  width: "auto",
};

const CommonTypoStyle3 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  marginTop: "6%",
  fontSize: {
    xs: "12px",
    sm: "15px",
    md: "20px",
    lg: "15px",
    xl: "15px",
  },
  letterSpacing: "1px",
  color: "#6B7A99",
  width: "auto",
};
