import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Grid, Paper, Tab, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import LeftArrow from "../../../assets/Images/payment/LeftArrow.png";
import GoLeft from "../../../assets/Images/CommonImages/GoLeft.png";
import { useDispatch } from "react-redux";
import { useNavigate, useParams , useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useProductAddToCart } from "../../../Hooks/ProductActions/useProductAddToCart";
import Weight from "../../../assets/Images/Weight.svg";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { GetProductByIdAction } from "../../../redux/action/ProductActions/GetProductByIdAction";
import { useUpdateProductQuery } from "../../AddProductAllPages/Textile/ProductInfo/ProductHooksQuery";

import { useGetCompanyDetails } from "../../../Hooks/Auth";
import useGetCompanyTypeData from "../../../Hooks/CompanyData/useGetCompanyTypeData";
import CarasoulForProductDetails from "../../../components/Carousel/CarasoulForProductDetails";
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
          mt: "10px",
          marginBottom: "-11px",
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
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "16px",
          textTransform: "capitalize",
          color: "#6B7A99",
        }}
      >
        Appllicable Taxes Extra
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
  const [currentImage, setCurrentImage] = useState(0);
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [VariationToMap, setVariationToMap] = useState();
  const [showSizechart, setShowSizechart] = useState(false);
  // const [WishlistData, setWishlistData] = useState();
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();
  // const [keyfeture, setKeyFeature] = useState();
  const [keyfeatureName, setKeyFeatureName] = useState();
  const [pagename, setPageName] = useState("");
  // const [GetProductDataById] = useState();
  // const iconForFeaytures = {
  //   // hello: "hello",
  //   // Comfort: {
  //   //   img: Comfort,
  //   // },
  // };
  const [borderColor, setBorderColor] = useState(true);
  const [color, setColor] = useState("");
  // const [like, setLike] = useState(false);

  console.log(GetProductByIdData, "GetProductByIdData");

  const PageNameFunction = () => {
    if (CompanyTypeData?.data?.CompanyTypeName === "Textile") {
      setPageName("Textile");
    } else if (CompanyTypeData?.data?.CompanyTypeName === "Office Supply") {
      setPageName("Office Supply");
    } else if (CompanyTypeData?.data?.CompanyTypeName === "Lifestyle") {
      setPageName("Lifestyle");
    } else {
      setPageName("");
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




  async function GetFeaturesNames() {
    await axios
      .get("keyfeature/get_KeyFeatures_ByName", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("hellodataaja", res.data);
        setKeyFeatureName(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  useEffect(() => {
    // GetFeaturesIcons();
  }, []);
  useEffect(() => {
    GetFeaturesNames();
    PageNameFunction();
    console.log("kkk", CompanyData);
  }, []);
  const location = useLocation();
  console.log(location.pathname, "location");
  const navigate = useNavigate();

  let path = window.location.pathname;

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

  const { data: mutateCartData, mutate: addtocart } = useProductAddToCart();

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
      measure: GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit,
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

  
  let priceone;
  let sdgfusdgf;
  GetProductByIdData?.ProductsVariantions?.forEach((item) => {
    if (item?._id === storeVariationData) {
      sdgfusdgf = item.PricePerUnit;
      return sdgfusdgf;
    }
  });
  priceone = storeVariationData?.PricePerUnit
    ? storeVariationData?.PricePerUnit
    : sdgfusdgf;

  let oneone;
  let PriceOfSample;
  let QuantityOfSample;
  GetProductByIdData?.ProductsVariantions?.forEach((item) => {
    if (item?._id === storeVariationData) {
      oneone = item.DiscountedPrice;
      PriceOfSample = item.priceofsample;
      QuantityOfSample = item.sampleavailability;
      return oneone;
    }
  });

  let priceTwo = storeVariationData?.DiscountedPrice
    ? storeVariationData?.DiscountedPrice
    : oneone;



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
  }, [color, storeVariationData]);

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
  // const { GetProductByIdDatas } = useSelector((state) => state?.GetProductById);

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
  //     `https://www.testing-bxi.unada.in/home/appreal` + `/${id}`
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

    error: RegisterError,
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

  console.log(
    CompanyTypeData?.data?.CompanyTypeName,
    "CompanyTypeData?.data?.CompanyTypeName"
  );



  const backbutton = () => {
    if (CompanyTypeData?.data?.CompanyTypeName === "Textile") {
      navigate("/home/textile/golive/" + id);
    } 
    else if ( CompanyTypeData?.data?.CompanyTypeName === "Office Supply") {
      navigate("/home/officesupply/officesupplygolive/" + id);
    } 
    else if (   CompanyTypeData?.data?.CompanyTypeName === "Lifestyle") {
      navigate("/home/lifestyle/lifestylegolive/" + id);
    }
    else if (   CompanyTypeData?.data?.CompanyTypeName === "FMCG") {
      navigate("/home/fmcg/fmcggolive/" + id);
    }
    else if (   CompanyTypeData?.data?.CompanyTypeName === "Mobility") {
      navigate("/home/mobility/mobilitygolive/" + id);
    }
    else if (   CompanyTypeData?.data?.CompanyTypeName === "QSR") {
      navigate("/home/restaurant/restaurantgolive/" + id);
    }
    else if (   CompanyTypeData?.data?.CompanyTypeName === "Electronics") {
      navigate("/home/electronics/electronicsgolive/" + id);
    }

  };

  return (
    <React.Fragment>
      <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <BreadCrumbHeader MainText={CompanyTypeData?.data?.CompanyTypeName} />
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
                src={GoLeft}
                alt="GoLeft"
                onClick={backbutton}
                sx={{
                  height: "10px",
                  width: "25px",
                  position: "absolute",
                  left: "0",
                  cursor: "pointer",
                }}
                // onClick={() => {
                //   navigate("/home");
                // }}
              />
              {GetProductByIdData?.ProductUploadStatus === "Approved" ? (
                <Typography sx={mainText}> Preview Page</Typography>
              ) : (
                <Typography sx={mainText}>Preview Page</Typography>
              )}
            </Box>
          </Box>

          {CompanyTypeData?.data?.CompanyTypeName === "Textile" ||
          CompanyTypeData?.data?.CompanyTypeName === "Lifestyle" ||
          CompanyTypeData?.data?.CompanyTypeName === "Office Supply" ||
          CompanyTypeData?.data?.CompanyTypeName === "Others" ||
          !CompanyTypeData?.data?.CompanyTypeName ? (
            <Grid
              container
              sx={{
                width: "90%",
                mx: "auto",
                mt: 0,
                display: "flex",
                gap: "20px",
              }}
            >
              <Grid item xl={4} lg={4} md={12} sm={12} xs={12} sx={fixGrid}>
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
                      GetProductByIdData?.ProductsVariantions[0]
                        ?.DiscountedPrice
                    }
                  />

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
                      <Typography sx={{ ...semiSub, fontSize: "18px" }}>
                        Available colors
                      </Typography>
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
                                  transition:
                                    res?.ProductColor === borderColor
                                      ? "0.2s linear"
                                      : null,
                                  boxShadow:
                                    res?.ProductColor === borderColor
                                      ? "5px 5px 5px grey"
                                      : null,
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
                    {GetProductByIdData?.gender === null ||
                    GetProductByIdData?.gender === undefined ? null : (
                      <Box>
                        <Typography sx={semiSub}>Gender</Typography>
                        <Typography
                          sx={{
                            ...tableData,
                            textAlign: "start",
                            lineHeight: "4rem",
                          }}
                        >
                          {GetProductByIdData?.gender}
                        </Typography>
                      </Box>
                    )}
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
                          <Typography
                            sx={{
                              ...tableHeader,
                              fontSize: "16px",
                              fontWeight: 600,
                            }}
                          >
                            {" "}
                            Available Sizes
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Box sx={ProductVariationStyle}>
                          <Typography
                            sx={{
                              ...tableHeader,
                              fontSize: "16px",
                              fontWeight: 600,
                            }}
                          >
                            {" "}
                            Min QTY
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Box sx={ProductVariationStyle}>
                          <Typography
                            sx={{
                              ...tableHeader,
                              fontSize: "16px",
                              fontWeight: 600,
                            }}
                          >
                            {" "}
                            Max QTY
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Box sx={ProductVariationStyle}>
                          <Typography
                            sx={{
                              ...tableHeader,
                              fontSize: "16px",
                              fontWeight: 600,
                            }}
                          >
                            {" "}
                            GST
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Box sx={ProductVariationStyle}>
                          <Typography
                            sx={{
                              ...tableHeader,
                              fontSize: "16px",
                              fontWeight: 600,
                            }}
                          >
                            {" "}
                            Product ID
                          </Typography>
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
                                  <Box sx={ProductVariationStyle}>
                                    {res.ShoeSize === null ||
                                    res.ShoeSize === undefined ? (
                                      <Typography
                                        sx={{
                                          ...tableData,
                                          fontSize: "14px",
                                        }}
                                      >
                                        {res.ProductSize}
                                        {res.ProductSize === null ||
                                        res.ProductSize === undefined ? (
                                          <Typography sx={tableData}>
                                            {res.length}&nbsp;{res.measureMentUnit}
                                          </Typography>
                                        ) : null}
                                      </Typography>
                                    ) : (
                                      <Typography sx={tableData}>
                                        &nbsp;{res.ShoeSize}&nbsp;
                                        {res.measureMentUnit}
                                      </Typography>
                                    )}
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
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        fontSize: "14px",
                                      }}
                                    >
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
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        fontSize: "14px",
                                      }}
                                    >
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
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        fontSize: "14px",
                                      }}
                                    >
                                      {res.GST} &nbsp;%
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
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        fontSize: "14px",
                                      }}
                                    >
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
                    {/* <Typography sx={find}>Download Size Chart </Typography> */}
                    <Typography
                      sx={{ ...chart, cursor: "pointer" }}
                      onMouseEnter={() => setShowSizechart(true)}
                      onMouseLeave={() => setShowSizechart(false)}
                    >
                      Size Chart{" "}
                    </Typography>
                    {GetProductByIdData?.SizeChart?.at(0)?.url === undefined ||
                    GetProductByIdData?.SizeChart?.at(0)?.url === null ? (
                      showSizechart ? (
                        <Typography
                          sx={{
                            ...chart,
                            position: "absolute",
                            height: "300px",
                            width: "auto",
                            right: "5%",
                            zIndex: 10,
                          }}
                        >
                          Size Chart Unavailable
                        </Typography>
                      ) : null
                    ) : showSizechart ? (
                      <Box
                        component="img"
                        src={GetProductByIdData?.SizeChart?.at(0)?.url}
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
          ) : (
            <Box>
            <Grid container sx={HeaderContainerStyle}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box sx={PageHeader}>
                <Typography sx={AppBarTypoStyle}>
                  {GetProductByIdData?.ProductName}
                </Typography>
              </Box>
            </Grid>
          </Grid>

            <Grid container>
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{ mt: 6 }}
              >
                <CarasoulForProductDetails ImageDataArray={ImageDataArray} />
              </Grid>
            </Grid>
          </Box>
          )}

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
                  {CompanyTypeData?.data?.CompanyTypeName === "Textile" ||
                  CompanyTypeData?.data?.CompanyTypeName === "Lifestyle" ||
                  CompanyTypeData?.data?.CompanyTypeName ===
                    "Office Supply" ||
                  CompanyTypeData?.data?.CompanyTypeName === "Others" ||
                  !CompanyTypeData?.data?.CompanyTypeName ? (
                    <>
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
                          Price & Availability
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
                    </>
                    ) : (
                      <>
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
                                Price & Availability
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
                              <Typography sx={tabTexts}>
                                Key Features
                              </Typography>
                            }
                            value="4"
                          />
                        </TabList>
                      </>
                    )}
                  </Box>
                  <Box>

                    <TabPanel value="1">
                    {CompanyTypeData?.data?.CompanyTypeName === "Textile" ||
                    CompanyTypeData?.data?.CompanyTypeName === "Lifestyle" ||
                    CompanyTypeData?.data?.CompanyTypeName ===
                      "Office Supply" ||
                    CompanyTypeData?.data?.CompanyTypeName === "Others" 

                     ? null : (
                      <>
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
                          <Typography sx={product}>
                            {GetProductByIdData &&
                              GetProductByIdData.ProductSubtitle}
                          </Typography>
                          <Typography sx={tabSubText}>
                            {GetProductByIdData &&
                              GetProductByIdData.ProductDescription}
                          </Typography>
                        </Box>
                      </Grid>

                      <Box sx={{ mt: 2 }}>
                      <Typography
                        sx={{
                          color: "#156DB6",
                          fontSize: "24px",
                          fontFamily: "Poppins",
                          fontWeight: 600,
                        }}
                      >
                        Price & Availability
                      </Typography>
                      <DiscountedPrice
                        regularPrice={priceone}
                        discountPrice={priceTwo}
                      />
                    </Box>
      

                    <Typography sx={{...semiSub ,  fontSize: "16px"}}>Available colors</Typography>
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
                                setVariationToMap(res?.ProductVariations);
                                setBorderColor(res?.ProductColor);
                              }}
                              sx={{
                                background: res?.ProductColor,
                                width: {
                                  xl: "2.5%",
                                  lg: "2.5%",
                                  md: "2.5%",
                                  sm: "2.5%",
                                  xs: "10%",
                                },
                                ml: 1,
                                height: "100%",
                                minHeight: "35px",
                                borderRadius: "0.5rem",
                                cursor: "pointer",
                                transition:
                                res?.ProductColor === borderColor
                                  ? "0.2s linear"
                                  : null,
                              boxShadow:
                                res?.ProductColor === borderColor
                                  ? "5px 5px 5px grey"
                                  : null,
                              border:
                                res?.ProductColor === borderColor
                                  ? "2px solid blue"
                                  : "2px solid #000",
                              }}
                            ></Box>
                          );
                        })}
                    </Box>

                    <Box
                      mt={2}
                      sx={{
                        width: "60%",
                      }}
                    >
                      <Grid
                        container
                        sx={{
                          textAlign: "initial",
                        }}
                      >
                      {  GetProductByIdData?.ProductsVariantions[0]?.ProductSize === undefined ||   GetProductByIdData?.ProductsVariantions[0]?.ProductSize === null ? null : (
                        <Grid
                          item
                          xl={2.4}
                          lg={2.4}
                          md={2.4}
                          sm={2.4}
                          xs={2.4}
                        >
                          <Box sx={ProductVariationStyle}>
                            <Typography
                              sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                            >
                              {" "}
                              Available Sizes
                            </Typography>
                          </Box>
                        </Grid>
                        )}

                        {  GetProductByIdData?.ProductsVariantions[0]?.flavor === undefined ||   GetProductByIdData?.ProductsVariantions[0]?.flavor === null ? null : (
                          <Grid
                            item
                            xl={2.4}
                            lg={2.4}
                            md={2.4}
                            sm={2.4}
                            xs={2.4}
                          >
                            <Box sx={ProductVariationStyle}>
                              <Typography
                                sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                              >
                                {" "}
                          Available Flavor
                              </Typography>
                            </Box>
                          </Grid>
                          )}


                        <Grid
                          item
                          xl={2.4}
                          lg={2.4}
                          md={2.4}
                          sm={2.4}
                          xs={2.4}
                        >
                          <Box sx={ProductVariationStyle}>
                            <Typography
                              sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                            >
                              {" "}
                              Min QTY
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
                            <Typography
                              sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                            >
                              {" "}
                              Max QTY
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xl={2}
                          lg={2.4}
                          md={2.4}
                          sm={2.4}
                          xs={2.4}
                        >
                          <Box sx={ProductVariationStyle}>
                            <Typography
                              sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                            >
                              GST
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
                            <Typography
                              sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                            >
                              Product ID
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        sx={{
                          textAlign: "initial",
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
                      {  GetProductByIdData?.ProductsVariantions[0]?.ProductSize === undefined ||   GetProductByIdData?.ProductsVariantions[0]?.ProductSize === null ? null : (
                                  <Grid
                                    item
                                    xl={2.4}
                                    lg={2.4}
                                    md={2.4}
                                    sm={2.4}
                                    xs={2.4}
                                  >
                                    <Box sx={ProductVariationStyle}>
                                      <Typography
                                        sx={{
                                          ...tableData,
                                          fontSize: "14px",
                                        }}
                                      >
                                        {res.ProductSize}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                  )}
{ GetProductByIdData?.ProductsVariantions[0]?.flavor === undefined ||  GetProductByIdData?.ProductsVariantions[0]?.flavor === null ? null : (
                                  <Grid
                                  item
                                  xl={2.4}
                                  lg={2.4}
                                  md={2.4}
                                  sm={2.4}
                                  xs={2.4}
                                >
                                  <Box sx={ProductVariationStyle}>
                                    {res.flavor ? (
                                      <Typography
                                        sx={{ ...tableData, fontSize: "16px" }}
                                      >
                                        {res.flavor}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        sx={{ ...tableData, fontSize: "16px" }}
                                      >
                                        -
                                      </Typography>
                                    )}
                                  </Box>
                                </Grid>
                                )}
                                  <Grid
                                    item
                                    xl={2.4}
                                    lg={2.4}
                                    md={2.4}
                                    sm={2.4}
                                    xs={2.4}
                                  >
                                    <Box sx={ProductVariationStyle}>
                                      <Typography
                                        sx={{
                                          ...tableData,
                                          fontSize: "14px",
                                        }}
                                      >
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
                                      <Typography
                                        sx={{
                                          ...tableData,
                                          fontSize: "14px",
                                        }}
                                      >
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
                                      <Typography
                                        sx={{
                                          ...tableData,
                                          fontSize: "14px",
                                        }}
                                      >
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
                                      <Typography
                                        sx={{
                                          ...tableData,
                                          fontSize: "14px",
                                        }}
                                      >
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

                    {GetProductByIdData?.ModelName === undefined || GetProductByIdData?.ModelName === null ? null : (
                      <Box
                      mt={1}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap:"2px"
                      }}
                    >
                      <Typography sx={{...product ,  fontSize: "18px"}}>Model Name</Typography>
  
                      <Typography
                        sx={{
                          ...packHead,
                          color: "#6B7A99",
                          fontWeight: 400,
                          fontSize: "16px",
                        }}
                      >
                        {GetProductByIdData?.ModelName}
                      </Typography>
                    </Box>
                    )}
                    
                  {GetProductByIdData?.demoInstallation === undefined || GetProductByIdData?.demoInstallation === null ? null : (  
                    <Box
                    mt={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap:"2px"
                    }}
                  >
                    <Typography sx={{...product  ,   fontSize: "18px"}}>
                      Service Available
                    </Typography>

                    <Box>
                      {GetProductByIdData?.demoInstallation === "true" ? (
                        <Typography   sx={{
                          ...packHead,
                          color: "#6B7A99",
                          fontWeight: 400,
                          fontSize: "16px",
                        }}>
                          demo & Installation : Yes
                        </Typography>
                      ) : (
                        <Typography   sx={{
                          ...packHead,
                          color: "#6B7A99",
                          fontWeight: 400,
                          fontSize: "16px",
                        }}>
                          demo & Installation : No
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  )}
                    </>
                    )}
               

                      {/* Tabpanel 2 data */}


                      <Grid container   sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                      }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                          >

                        {/*  <Typography sx={product}>
                          {GetProductByIdData &&
                            GetProductByIdData.ProductSubtittle}
                        </Typography>

                        <Typography sx={{...tableHeader , textAlign  : "start"}}>
                          {GetProductByIdData &&
                            GetProductByIdData.ProductDescription}
                          </Typography> */}

                        <Typography sx={{...product  ,   fontSize: "18px"  , mt:2}}>
                       Sample Details
                      </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              gap: "2px",
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <Typography
                                sx={{ ...available, fontSize: "16px" }}
                              >
                                Sample Available :&nbsp;
                              </Typography>

                              {samplestate ? (
                                <Typography
                                  sx={{
                                    ...available,
                                    fontWeight: 500,
                                    width: "20%",
                                    fontSize: "16px",
                                  }}
                                >
                                  Yes
                                </Typography>
                              ) : (
                                <Typography
                                  sx={{
                                    ...available,
                                    fontWeight: 500,
                                    width: "20%",
                                    fontSize: "16px",
                                  }}
                                >
                                  No
                                </Typography>
                              )}
                            </Box>

                            {samplestate ? (
                              <>
                                {GetProductByIdData?.ProductsVariantions?.map(
                                  (item) => {
                                    return (
                                      <>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: "10px",
                                            width: "700px",
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
                                                      mt: 1,
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
                                                      mt: 1,
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

                          {GetProductByIdData?.productContentInformation === undefined || GetProductByIdData?.productContentInformation === null ? null : (
                          <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <Typography
                            sx={{
                              ...packHead,
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 600,
                              color: "#6B7A99",
                              fontSize: "18px",
                            }}
                          >
                            Product Content
                          </Typography>
        
                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                          >
                            {GetProductByIdData?.productContentInformation}
                          </Typography>
                        </Box>
                        )}

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
                                    width: "100%",
                                  }}
                                >
                                  <Box>
                                    <Typography
                                      sx={{ ...product, fontSize: "18px" }}
                                    >
                                      Product pickup location & Pin code
                                    </Typography>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "50px",
                                        mt: 1,
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
                                            mt: 1,
                                          }}
                                        >
                                          {
                                            GetProductByIdData?.LocationDetails
                                              ?.region
                                          }
                                        </Typography>
                                      </Box>
                                      <Box
                                        sx={{
                                          ml: 7,
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
                                            mt: 1,
                                          }}
                                        >
                                          {
                                            GetProductByIdData?.LocationDetails
                                              ?.state
                                          }
                                        </Typography>
                                      </Box>
                                      <Box
                                        sx={{
                                          ml: 7,
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
                                            mt: 1,
                                          }}
                                        >
                                          {
                                            GetProductByIdData?.LocationDetails
                                              ?.city
                                          }
                                        </Typography>
                                      </Box>
                                      <Box
                                        sx={{
                                          ml: 7,
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
                                            mt: 1,
                                          }}
                                        >
                                          {
                                            GetProductByIdData?.LocationDetails
                                              ?.landmark
                                          }
                                        </Typography>
                                      </Box>
                                      <Box
                                        sx={{
                                          ml: 7,
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
                                            mt: 1,
                                          }}
                                        >
                                          {
                                            GetProductByIdData?.LocationDetails
                                              ?.pincode
                                          }
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>

                                  {GetProductByIdData?.formofProduct === undefined || GetProductByIdData?.formofProduct === null ? null :(
                                  <Box
                                  mt={2}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      color: "#6B7A99",
                                    }}
                                  >
                                    Form
                                  </Typography>
                
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      color: "#6B7A99",
                                      fontWeight: 400,
                                      fontSize: "16px",
                                    }}
                                  >
                                    {GetProductByIdData?.formofProduct}
                                  </Typography>
                                </Box>
                                )}


                                  {GetProductByIdData?.listperiod ===
                                    undefined ||
                                  GetProductByIdData?.listperiod === null ||
                                  GetProductByIdData?.listperiod ===
                                    "undefined" ||
                                  GetProductByIdData?.listperiod ===
                                    "" ? null : (
                                    <Box
                                      mt={2}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px",
                                      }}
                                    >
                                      <Typography sx={product}>
                                        Listed this product for
                                      </Typography>

                                      <Typography
                                        sx={{
                                          ...packHead,
                                          color: "#6B7A99",
                                          fontWeight: 400,
                                          fontSize: "18px",
                                        }}
                                      >
                                        {GetProductByIdData?.listperiod}&nbsp;
                                        Days
                                      </Typography>
                                    </Box>
                                  )}

                                  {GetProductByIdData?.OtherCost &&
                                  GetProductByIdData?.OtherCost?.length !==
                                    0 ? (
                                    <Box mt={2}>
                                      <Typography
                                        sx={{
                                          ...product,
                                          fontWeight: 600,
                                          fontSize: "18px",
                                          lineHeight: "30px",
                                        }}
                                      >
                                        Additional Cost
                                      </Typography>
                                      {GetProductByIdData?.OtherCost?.length ===
                                      0
                                        ? ""
                                        : GetProductByIdData?.OtherCost?.map(
                                            (cost) => {
                                              console.log("cost", cost);
                                              const newValue =
                                                cost?.CostPrice.toFixed(2);
                                              return (
                                                <>
                                                  <Box
                                                    sx={{
                                                      display: "flex",
                                                      // gap: "60px",
                                                      justifyContent:
                                                        "space-between",
                                                      mt: 1,
                                                      width: "70%",
                                                    }}
                                                  >
                                                    <Box sx={{}}>
                                                      <Typography
                                                        sx={{
                                                          ...listText,
                                                          wordWrap:
                                                            "break-word",
                                                        }}
                                                      >
                                                        {" "}
                                                        {
                                                          cost.AdCostApplicableOn
                                                        }{" "}
                                                      </Typography>
                                                    </Box>

                                                    <Box sx={{}}>
                                                      <Typography
                                                        sx={{
                                                          ...listText,
                                                          wordWrap:
                                                            "break-word",
                                                        }}
                                                      >
                                                        {" "}
                                                        {cost.ReasonOfCost}{" "}
                                                      </Typography>
                                                    </Box>

                                                    <Box sx={{}}>
                                                      <Typography
                                                        sx={{
                                                          ...listText,
                                                          wordWrap:
                                                            "break-word",
                                                        }}
                                                      >
                                                        HSN - {cost.AdCostHSN}{" "}
                                                      </Typography>
                                                    </Box>

                                                    <Box sx={{}}>
                                                      <Typography
                                                        sx={{
                                                          ...listText,
                                                          wordWrap:
                                                            "break-word",
                                                        }}
                                                      >
                                                        GST - {cost.AdCostGST} %
                                                      </Typography>
                                                    </Box>
                                                    <Box
                                                      sx={{
                                                        gap: "5px",

                                                        display: "flex",
                                                      }}
                                                    >
                                                      <Typography
                                                        sx={{
                                                          ...listText,
                                                          wordWrap:
                                                            "break-word",
                                                          color:
                                                            "rgba(68, 95, 210, 1)",
                                                        }}
                                                      >
                                                        {newValue}
                                                      </Typography>
                                                      <Typography>
                                                        {cost.currencyType ===
                                                        "BXITokens" ? (
                                                          <Box
                                                            component="img"
                                                            src={BXITokenIcon}
                                                            alt="token"
                                                            sx={{
                                                              height: "auto",
                                                              width: "20px",
                                                              marginTop: "2px",
                                                            }}
                                                          />
                                                        ) : (
                                                          <Typography
                                                            sx={{
                                                              fontSize: "20px",
                                                              ml: 1,
                                                            }}
                                                          >
                                                            ₹
                                                          </Typography>
                                                        )}
                                                      </Typography>
                                                    </Box>
                                                  </Box>
                                                </>
                                              );
                                            }
                                          )}
                                    </Box>
                                  ) : null}

                                { GetProductByIdData?.ProductDetails
                                  ?.registrationdetails === undefined ||    GetProductByIdData?.ProductDetails
                                  ?.registrationdetails === null ? null : (

                                  <Box
                                  mt={2}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      color: "#6B7A99",
                                      fontSize: "1.8rem",
                                    }}
                                  >
                                    Registration Details
                                  </Typography>
        
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      color: "#6B7A99",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                    }}
                                  >
                                    {
                                      GetProductByIdData?.ProductDetails
                                        ?.registrationdetails
                                    }
                                  </Typography>
                                </Box>
                                  )}
        
                                {GetProductByIdData?.ProductDetails?.taxesdetails === undefined ||   GetProductByIdData?.ProductDetails?.taxesdetails === null ? null : (
                                <Box
                                  mt={2}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      color: "#6B7A99",
                                      fontSize: "1.8rem",
                                    }}
                                  >
                                    Tax Details
                                  </Typography>
        
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      color: "#6B7A99",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                    }}
                                  >
                                    {GetProductByIdData?.ProductDetails?.taxesdetails}
                                  </Typography>
                                </Box>
                                  )}
        
                                {GetProductByIdData?.ProductDetails
                                ?.insurancedetails === undefined ||   GetProductByIdData?.ProductDetails
                                ?.insurancedetails === null ? null : (
                                <Box
                                  mt={2}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      color: "#6B7A99",
                                      fontSize: "1.8rem",
                                    }}
                                  >
                                    Insurance Details
                                  </Typography>
        
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      color: "#6B7A99",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                    }}
                                  >
                                    {
                                      GetProductByIdData?.ProductDetails
                                        ?.insurancedetails
                                    }
                                  </Typography>
                                </Box>
                                )}

                                
                                {  GetProductByIdData?.ManufacturingDate === undefined || GetProductByIdData?.ManufacturingDate === null ? null : (
                                    <Grid
                                      container
                                      sx={{
                                        display: "flex",
                                        width: "50%",
                                      }}
                                      mt={2}
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
                                              color: "#6B7A99",
                                            }}
                                          >
                                            Manufacturing Date
                                          </Typography>
                                          <Typography
                                            sx={{
                                              ...available,
                                              lineHeight: "20px",
                                              fontWeight: 500,
                                              fontSize: "14px",
                                              color: "#B1B1B1",
                                              width: "100%",
                                              mt: 1,
                                            }}
                                          >
                                          {new Date(
                                            GetProductByIdData?.ManufacturingDate
                                          ).toLocaleDateString()}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                   
                                      <Grid
                                        item
                                        lg={6}
                                        xl={6}
                                        md={6}
                                        sm={12}
                                        xs={12}
                                        sx={{
                                          display: "flex",
                                          flexDirection: "row",
                                          gap: "20px",
                                        }}
                                      >
                                      <Box>
                                      <Typography
                                        sx={{
                                          ...available,
                                          width: "100%",
                                          fontWeight: 500,
                                          fontSize: "18px",
                                          color: "#6B7A99",
                                        }}
                                      >
                                        Expiry Date{" "}
                                      </Typography>
                                      <Typography
                                        sx={{
                                          ...available,
                                          lineHeight: "20px",
                                          fontWeight: 500,
                                          fontSize: "14px",
                                          color: "#B1B1B1",
                                          mt: 1,
                                        }}
                                      >
                                        {GetProductByIdData?.ExpiryDate ===
                                          null || " " ? (
                                          "Not Given"
                                        ) : (
                                          <>
                                            new Date(
                                            {GetProductByIdData?.ExpiryDate}
                                            ).toLocaleDateString()
                                          </>
                                        )}
                                      </Typography>
                                    </Box>
                                      </Grid>
                                    </Grid>
                                    )}
                                </Box>
                              </Grid>
                              </Box>
                              </Box>
                              </Box>
                              </Grid>

                      {/* Tabpanel 3 data */}
                      <Box mt={2}>
                        <Typography sx={{ ...pack, color: "#156DB6" }}>
                          Technical Information
                        </Typography>

                        <Box
                          mt={1}
                          sx={{
                            display: "flex",
                            gap: "10px",
                            width: "500px",
                          }}
                        >
                          <Grid
                            container
                            sx={{
                              display: "flex",
                              width: "100%",
                            }}
                          >
                          {GetProductByIdData?.ProductTechInfo
                            ?.Warranty === undefined || GetProductByIdData?.ProductTechInfo
                            ?.Warranty === null ? null : (
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
                                  Warranty
                                </Typography>
                                <Typography
                                  sx={{
                                    ...available,
                                    lineHeight: "20px",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    color: "#6B7A99",
                                    width: "100%",
                                    mt: 1,
                                  }}
                                >
                                {
                                  GetProductByIdData?.ProductTechInfo
                                    ?.Warranty
                                }{" "}
                                {GetProductByIdData?.WarrantyPeriod ===
                                  null ||
                                GetProductByIdData?.WarrantyPeriod ===
                                  undefined
                                  ? GetProductByIdData?.UnitOfTime
                                  : GetProductByIdData?.WarrantyPeriod}
                                </Typography>
                              </Box>
                            </Grid>
                            )}

                            {  GetProductByIdData?.ProductTechInfo
                              ?.Guarantee === undefined ||   GetProductByIdData?.ProductTechInfo
                              ?.Guarantee === null ? null : (
                            <Grid
                              item
                              lg={6}
                              xl={6}
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
                                  Guarantee
                                </Typography>
                                <Typography
                                  sx={{
                                    ...available,
                                    lineHeight: "20px",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    color: "#6B7A99",
                                    mt: 1,
                                  }}
                                >
                                {
                                  GetProductByIdData?.ProductTechInfo
                                    ?.Guarantee
                                }{" "}
                                {GetProductByIdData?.GuaranteePeriod ===
                                  null ||
                                GetProductByIdData?.GuaranteePeriod ===
                                  undefined
                                  ? GetProductByIdData?.UnitOfTime
                                  : GetProductByIdData?.GuaranteePeriod}
                                </Typography>
                              </Box>
                            </Grid>
                            )}
                          </Grid>
                        </Box>

                        {GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit === undefined || GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit === null || GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit  === "NA" ? null : (  
                      <Box
                        mt={2}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "95%",
                        }}
                      >
                      <Typography
                      mt={2}
                      sx={{ ...product, fontSize: "18px" }}
                    >
                      Packaging Information
                    </Typography>

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
                                  minWidth: "185px",
                                }}
                              >
                                <Typography
                                  sx={{ ...packHead, fontSize: "16px" }}
                                >
                                  {val.name}
                                </Typography>
                                {/* <Typography sx={packVal}>
                                  {val.name === "Before Weight" ||
                                  val.name === "After Weight"
                                    ? newVal + " kg"
                                    : newVal + " cm"}
                                </Typography> */}
                                {GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit ===
                                  undefined ||
                                GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit ? (
                                  <Typography sx={packVal}>
                                    {newVal}{" "}
                                    {GetProductByIdData?.UnitOfWeight}
                                  </Typography>
                                ) : (
                                  <Typography sx={packVal}>
                                    {newVal} {val.measure}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                      )}

                    {GetProductByIdData?.ProductTechInfo?.PackagingInfoPerUnit === undefined || GetProductByIdData?.ProductTechInfo?.PackagingInfoPerUnit === null ? null : (

                      <Box
                      mt={2}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <Typography
                        sx={{
                          ...packHead,
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          color: "#6B7A99",
                          fontSize: "18px",
                        }}
                      >
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
                        {GetProductByIdData?.ProductTechInfo?.PackagingInfoPerUnit}
                      </Typography>
                    </Box>
                    )}
    
                    {GetProductByIdData?.ProductTechInfo?.LegalInformation === undefined || GetProductByIdData?.ProductTechInfo?.LegalInformation === null ? null : (
                    <Box
                      mt={2}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <Typography
                        sx={{
                          ...packHead,
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          color: "#6B7A99",
                          fontSize: "18px",
                        }}
                      >
                        Legal Information
                      </Typography>
    
                      <Typography
                        sx={{
                          ...packHead,
                          color: "#6B7A99",
                          fontWeight: 400,
                          fontSize: "16px",
                        }}
                      >
                        {GetProductByIdData?.ProductTechInfo?.LegalInformation}
                      </Typography>
                    </Box>
                    )}



                      { GetProductByIdData?.ProductTechInfo
                        ?.PackagingAndDeliveryInstructionsIfAny === undefined ||  GetProductByIdData?.ProductTechInfo
                        ?.PackagingAndDeliveryInstructionsIfAny === null ? null : (
                        <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <Typography
                            mt={1}
                            sx={{ ...product, fontSize: "18px" }}
                          >
                            Packaging and delivery Instructions
                          </Typography>

                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "14px",
                            }}
                          >
                            {
                              GetProductByIdData?.ProductTechInfo
                                ?.PackagingAndDeliveryInstructionsIfAny
                            }
                          </Typography>
                        </Box>
                        )}
                        {GetProductByIdData?.ProductTechInfo
                          ?.InstructionsToUseProduct === null ||
                        GetProductByIdData?.ProductTechInfo
                          ?.InstructionsToUseProduct === undefined ? null : (
                          <Box
                            mt={1}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <Typography
                              mt={2}
                              sx={{
                                ...product,
                                fontWeight: 600,
                                fontSize: "18px",
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
                                fontSize: "14px",
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
                        <Typography sx={{ ...pack, color: "#156DB6" }}>
                          Key Features
                        </Typography>
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                        }}
                      >

                  {CompanyTypeData?.data?.CompanyTypeName === "Textile" ||
                  CompanyTypeData?.data?.CompanyTypeName === "Lifestyle" ||
                  CompanyTypeData?.data?.CompanyTypeName ===
                    "Office Supply" ||
                  CompanyTypeData?.data?.CompanyTypeName === "Others" 

                   ? null : (
                    <>
                    
                    <Box sx={{ mt: 2 }}>
                    <Typography
                      sx={{
                        color: "#156DB6",
                        fontSize: "24px",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                      }}
                    >
                      Price & Availability
                    </Typography>
                    <DiscountedPrice
                      regularPrice={priceone}
                      discountPrice={priceTwo}
                    />
                  </Box>
    

                  <Typography sx={{...semiSub ,  fontSize: "16px"}}>Available colors</Typography>
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
                              setVariationToMap(res?.ProductVariations);
                              setBorderColor(res?.ProductColor);
                            }}
                            sx={{
                              background: res?.ProductColor,
                              width: {
                                xl: "2.5%",
                                lg: "2.5%",
                                md: "2.5%",
                                sm: "2.5%",
                                xs: "10%",
                              },
                              ml: 1,
                              height: "100%",
                              minHeight: "35px",
                              borderRadius: "0.5rem",
                              cursor: "pointer",
                              transition:
                              res?.ProductColor === borderColor
                                ? "0.2s linear"
                                : null,
                            boxShadow:
                              res?.ProductColor === borderColor
                                ? "5px 5px 5px grey"
                                : null,
                            border:
                              res?.ProductColor === borderColor
                                ? "2px solid blue"
                                : "2px solid #000",
                            }}
                          ></Box>
                        );
                      })}
                  </Box>

                  <Box
                    mt={2}
                    sx={{
                      width: "60%",
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        textAlign: "initial",
                      }}
                    >
                    {  GetProductByIdData?.ProductsVariantions[0]?.ProductSize === undefined ||   GetProductByIdData?.ProductsVariantions[0]?.ProductSize === null ? null : (
                      <Grid
                        item
                        xl={2.4}
                        lg={2.4}
                        md={2.4}
                        sm={2.4}
                        xs={2.4}
                      >
                        <Box sx={ProductVariationStyle}>
                          <Typography
                            sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                          >
                            {" "}
                            Available Sizes
                          </Typography>
                        </Box>
                      </Grid>
                    )}

                    {  GetProductByIdData?.ProductsVariantions[0]?.flavor === undefined ||   GetProductByIdData?.ProductsVariantions[0]?.flavor === null ? null : (
                      <Grid
                        item
                        xl={2.4}
                        lg={2.4}
                        md={2.4}
                        sm={2.4}
                        xs={2.4}
                      >
                        <Box sx={ProductVariationStyle}>
                          <Typography
                            sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                          >
                            {" "}
                      Available Flavor
                          </Typography>
                        </Box>
                      </Grid>
                      )}

                      <Grid
                        item
                        xl={2.4}
                        lg={2.4}
                        md={2.4}
                        sm={2.4}
                        xs={2.4}
                      >
                        <Box sx={ProductVariationStyle}>
                          <Typography
                            sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                          >
                            {" "}
                            Min QTY
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
                          <Typography
                            sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                          >
                            {" "}
                            Max QTY
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xl={2}
                        lg={2.4}
                        md={2.4}
                        sm={2.4}
                        xs={2.4}
                      >
                        <Box sx={ProductVariationStyle}>
                          <Typography
                            sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                          >
                            GST
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
                          <Typography
                            sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}
                          >
                            Product ID
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      sx={{
                        textAlign: "initial",
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
                      {  GetProductByIdData?.ProductsVariantions[0]?.ProductSize === undefined ||   GetProductByIdData?.ProductsVariantions[0]?.ProductSize === null ? null : (
                                <Grid
                                  item
                                  xl={2.4}
                                  lg={2.4}
                                  md={2.4}
                                  sm={2.4}
                                  xs={2.4}
                                >
                                  <Box sx={ProductVariationStyle}>
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        fontSize: "14px",
                                      }}
                                    >
                                      {res.ProductSize}
                                    </Typography>
                                  </Box>
                                </Grid>
                                )}
                                { GetProductByIdData?.ProductsVariantions[0]?.flavor === undefined ||  GetProductByIdData?.ProductsVariantions[0]?.flavor === null ? null : (
                                  <Grid
                                  item
                                  xl={2.4}
                                  lg={2.4}
                                  md={2.4}
                                  sm={2.4}
                                  xs={2.4}
                                >
                                  <Box sx={ProductVariationStyle}>
                                    {res.flavor ? (
                                      <Typography
                                        sx={{ ...tableData, fontSize: "16px" }}
                                      >
                                        {res.flavor}
                                      </Typography>
                                    ) : (
                                      <Typography
                                        sx={{ ...tableData, fontSize: "16px" }}
                                      >
                                        -
                                      </Typography>
                                    )}
                                  </Box>
                                </Grid>
                                )}


                                <Grid
                                  item
                                  xl={2.4}
                                  lg={2.4}
                                  md={2.4}
                                  sm={2.4}
                                  xs={2.4}
                                >
                                  <Box sx={ProductVariationStyle}>
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        fontSize: "14px",
                                      }}
                                    >
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
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        fontSize: "14px",
                                      }}
                                    >
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
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        fontSize: "14px",
                                      }}
                                    >
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
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        fontSize: "14px",
                                      }}
                                    >
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

                  {GetProductByIdData?.ModelName === undefined || GetProductByIdData?.ModelName === null ? null : (
                    <Box
                    mt={1}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap:"2px"
                    }}
                  >
                    <Typography sx={{...product ,  fontSize: "18px"}}>Model Name</Typography>

                    <Typography
                      sx={{
                        ...packHead,
                        color: "#6B7A99",
                        fontWeight: 400,
                        fontSize: "16px",
                      }}
                    >
                      {GetProductByIdData?.ModelName}
                    </Typography>
                  </Box>
                  )}
                 
                  {GetProductByIdData?.demoInstallation === undefined || GetProductByIdData?.demoInstallation === null ? null : (     
                  <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap:"2px"
                  }}
                >
                  <Typography sx={{...product  ,   fontSize: "18px"}}>
                    Service Available
                  </Typography>

                  <Box>
                    {GetProductByIdData?.demoInstallation === "true" ? (
                      <Typography   sx={{
                        ...packHead,
                        color: "#6B7A99",
                        fontWeight: 400,
                        fontSize: "16px",
                      }}>
                        demo & Installation : Yes
                      </Typography>
                    ) : (
                      <Typography   sx={{
                        ...packHead,
                        color: "#6B7A99",
                        fontWeight: 400,
                        fontSize: "16px",
                      }}>
                        demo & Installation : No
                      </Typography>
                    )}
                  </Box>
                </Box>
                )}
                  </>
                  )}
                  


                    <Typography sx={{...product  ,   fontSize: "18px" , mt:2}}>
                    Sample Details
                   </Typography>

                       <Box
                         sx={{
                           display: "flex",
                           gap: "2px",
                           flexDirection: "column",
                         }}
                       >
                         <Box
                           sx={{
                             display: "flex",
                             flexDirection: "row",
                           }}
                         >
                           <Typography
                             sx={{ ...available, fontSize: "16px" }}
                           >
                             Sample Available :&nbsp;
                           </Typography>

                           {samplestate ? (
                             <Typography
                               sx={{
                                 ...available,
                                 fontWeight: 500,
                                 width: "20%",
                                 fontSize: "16px",
                               }}
                             >
                               Yes
                             </Typography>
                           ) : (
                             <Typography
                               sx={{
                                 ...available,
                                 fontWeight: 500,
                                 width: "20%",
                                 fontSize: "16px",
                               }}
                             >
                               No
                             </Typography>
                           )}
                         </Box>
                         
                          {samplestate ? (
                            <>
                              {GetProductByIdData?.ProductsVariantions?.map(
                                (item) => {
                                  return (
                                    <>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: "10px",
                                          width: "700px",
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

                        {GetProductByIdData?.productContentInformation === undefined || GetProductByIdData?.productContentInformation === null ? null : (
                          <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <Typography
                            sx={{
                              ...packHead,
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 600,
                              color: "#6B7A99",
                              fontSize: "18px",
                            }}
                          >
                            Product Content
                          </Typography>
        
                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                          >
                            {GetProductByIdData?.productContentInformation}
                          </Typography>
                        </Box>
                        )}


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
                                  width: "100%",
                                }}
                              >
                                <Box>
                                  <Typography
                                    sx={{ ...product, fontSize: "18px" }}
                                  >
                                    Product pickup location & Pin code
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      gap: "50px",
                                      mt: 1,
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
                                          mt: 1,
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
                                            ?.region
                                        }
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        ml: 7,
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
                                          mt: 1,
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
                                            ?.state
                                        }
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        ml: 7,
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
                                          mt: 1,
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
                                            ?.city
                                        }
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        ml: 7,
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
                                          mt: 1,
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
                                            ?.landmark
                                        }
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        ml: 7,
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
                                          mt: 1,
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
                                            ?.pincode
                                        }
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>

                                {GetProductByIdData?.formofProduct === undefined || GetProductByIdData?.formofProduct === null ? null :(
                                  <Box
                                  mt={2}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      color: "#6B7A99",
                                    }}
                                  >
                                    Form
                                  </Typography>
                
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      color: "#6B7A99",
                                      fontWeight: 400,
                                      fontSize: "16px",
                                    }}
                                  >
                                    {GetProductByIdData?.formofProduct}
                                  </Typography>
                                </Box>
                                )}


                                {GetProductByIdData?.listperiod === undefined ||
                                GetProductByIdData?.listperiod === null ||
                                GetProductByIdData?.listperiod ===
                                  "undefined" ||
                                GetProductByIdData?.listperiod === "" ? null : (
                                  <Box
                                    mt={2}
                                    sx={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "2px",
                                    }}
                                  >
                                    <Typography sx={product}>
                                      Listed this product for
                                    </Typography>

                                    <Typography
                                      sx={{
                                        ...packHead,
                                        color: "#6B7A99",
                                        fontWeight: 400,
                                        fontSize: "18px",
                                      }}
                                    >
                                      {GetProductByIdData?.listperiod}&nbsp;
                                      Days
                                    </Typography>
                                  </Box>
                                )}

                                {GetProductByIdData?.OtherCost &&
                                GetProductByIdData?.OtherCost?.length !== 0 ? (
                                  <Box mt={2}>
                                    <Typography
                                      sx={{
                                        ...product,
                                        fontWeight: 600,
                                        fontSize: "18px",
                                        lineHeight: "30px",
                                      }}
                                    >
                                      Additional Cost
                                    </Typography>
                                    {GetProductByIdData?.OtherCost?.length === 0
                                      ? ""
                                      : GetProductByIdData?.OtherCost?.map(
                                          (cost) => {
                                            console.log("cost", cost);
                                            const newValue =
                                              cost?.CostPrice.toFixed(2);
                                            return (
                                              <>
                                                <Box
                                                  sx={{
                                                    display: "flex",
                                                    // gap: "60px",
                                                    justifyContent:
                                                      "space-between",
                                                    mt: 1,
                                                    width: "70%",
                                                  }}
                                                >
                                                  <Box sx={{}}>
                                                    <Typography
                                                      sx={{
                                                        ...listText,
                                                        wordWrap: "break-word",
                                                      }}
                                                    >
                                                      {" "}
                                                      {
                                                        cost.AdCostApplicableOn
                                                      }{" "}
                                                    </Typography>
                                                  </Box>

                                                  <Box sx={{}}>
                                                    <Typography
                                                      sx={{
                                                        ...listText,
                                                        wordWrap: "break-word",
                                                      }}
                                                    >
                                                      {" "}
                                                      {cost.ReasonOfCost}{" "}
                                                    </Typography>
                                                  </Box>

                                                  <Box sx={{}}>
                                                    <Typography
                                                      sx={{
                                                        ...listText,
                                                        wordWrap: "break-word",
                                                      }}
                                                    >
                                                      HSN - {cost.AdCostHSN}{" "}
                                                    </Typography>
                                                  </Box>

                                                  <Box sx={{}}>
                                                    <Typography
                                                      sx={{
                                                        ...listText,
                                                        wordWrap: "break-word",
                                                      }}
                                                    >
                                                      GST - {cost.AdCostGST} %
                                                    </Typography>
                                                  </Box>
                                                  <Box
                                                    sx={{
                                                      gap: "5px",

                                                      display: "flex",
                                                    }}
                                                  >
                                                    <Typography
                                                      sx={{
                                                        ...listText,
                                                        wordWrap: "break-word",
                                                        color:
                                                          "rgba(68, 95, 210, 1)",
                                                      }}
                                                    >
                                                      {newValue}
                                                    </Typography>
                                                    <Typography>
                                                      {cost.currencyType ===
                                                      "BXITokens" ? (
                                                        <Box
                                                          component="img"
                                                          src={BXITokenIcon}
                                                          alt="token"
                                                          sx={{
                                                            height: "auto",
                                                            width: "20px",
                                                            marginTop: "2px",
                                                          }}
                                                        />
                                                      ) : (
                                                        <Typography
                                                          sx={{
                                                            fontSize: "20px",
                                                            ml: 1,
                                                          }}
                                                        >
                                                          ₹
                                                        </Typography>
                                                      )}
                                                    </Typography>
                                                  </Box>
                                                </Box>
                                              </>
                                            );
                                          }
                                        )}
                                  </Box>
                                ) : null}

                                { GetProductByIdData?.ProductDetails
                                  ?.registrationdetails === undefined ||    GetProductByIdData?.ProductDetails
                                  ?.registrationdetails === null ? null : (

                                  <Box
                                  mt={2}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      color: "#6B7A99",
                                      fontSize: "1.8rem",
                                    }}
                                  >
                                    Registration Details
                                  </Typography>
        
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      color: "#6B7A99",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                    }}
                                  >
                                    {
                                      GetProductByIdData?.ProductDetails
                                        ?.registrationdetails
                                    }
                                  </Typography>
                                </Box>
                                  )}
        
                                {GetProductByIdData?.ProductDetails?.taxesdetails === undefined ||   GetProductByIdData?.ProductDetails?.taxesdetails === null ? null : (
                                <Box
                                  mt={2}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      color: "#6B7A99",
                                      fontSize: "1.8rem",
                                    }}
                                  >
                                    Tax Details
                                  </Typography>
        
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      color: "#6B7A99",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                    }}
                                  >
                                    {GetProductByIdData?.ProductDetails?.taxesdetails}
                                  </Typography>
                                </Box>
                                  )}
        
                                {GetProductByIdData?.ProductDetails
                                ?.insurancedetails === undefined ||   GetProductByIdData?.ProductDetails
                                ?.insurancedetails === null ? null : (
                                <Box
                                  mt={2}
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "2px",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 600,
                                      color: "#6B7A99",
                                      fontSize: "1.8rem",
                                    }}
                                  >
                                    Insurance Details
                                  </Typography>
        
                                  <Typography
                                    sx={{
                                      ...packHead,
                                      color: "#6B7A99",
                                      fontWeight: 400,
                                      fontSize: "14px",
                                    }}
                                  >
                                    {
                                      GetProductByIdData?.ProductDetails
                                        ?.insurancedetails
                                    }
                                  </Typography>
                                </Box>
                                )}


                                {  GetProductByIdData?.ManufacturingDate === undefined || GetProductByIdData?.ManufacturingDate === null ? null : (
                              
                                  <Grid
                                    container
                                    sx={{
                                      display: "flex",
                                      width: "50%",
                                    }}
                                    mt={2}
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
                                            color: "#6B7A99",
                                          }}
                                        >
                                          Manufacturing Date
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#B1B1B1",
                                            width: "100%",
                                            mt: 1,
                                          }}
                                        >
                                        {new Date(
                                          GetProductByIdData?.ManufacturingDate
                                        ).toLocaleDateString()}
                                        </Typography>
                                      </Box>
                                    </Grid>
                                    <Grid
                                      item
                                      lg={6}
                                      xl={6}
                                      md={6}
                                      sm={12}
                                      xs={12}
                                      sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "20px",
                                      }}
                                    >
                                      <Box>
                                        <Typography
                                          sx={{
                                            ...available,
                                            width: "100%",
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            color: "#6B7A99",
                                          }}
                                        >
                                          Expiry Date{" "}
                                        </Typography>
                                        <Typography
                                          sx={{
                                            ...available,
                                            lineHeight: "20px",
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#B1B1B1",
                                            mt: 1,
                                          }}
                                        >
                                          {GetProductByIdData?.ExpiryDate ===
                                            null || " " ? (
                                            "Not Given"
                                          ) : (
                                            <>
                                              new Date(
                                              {GetProductByIdData?.ExpiryDate}
                                              ).toLocaleDateString()
                                            </>
                                          )}
                                        </Typography>
                                      </Box>
                                    </Grid>
              
                                  </Grid>
                                  )}
                              </Box>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="3">
                      <Box>
                        <Typography sx={{ ...pack, color: "#156DB6" }}>
                          Technical Information
                        </Typography>

                        <Box
                          mt={1}
                          sx={{
                            display: "flex",
                            gap: "10px",
                            width: "500px",
                          }}
                        >
                          <Grid
                            container
                            sx={{
                              display: "flex",
                              width: "100%",
                            }}
                          >
                          {GetProductByIdData?.ProductTechInfo
                            ?.Warranty === undefined || GetProductByIdData?.ProductTechInfo
                            ?.Warranty === null ? null : (
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
                                  Warranty
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
                                    GetProductByIdData?.ProductTechInfo
                                      ?.Warranty
                                  }{" "}
                                  {GetProductByIdData?.WarrantyPeriod ===
                                    null ||
                                  GetProductByIdData?.WarrantyPeriod ===
                                    undefined
                                    ? GetProductByIdData?.UnitOfTime
                                    : GetProductByIdData?.WarrantyPeriod}
                                </Typography>
                              </Box>
                              </Grid>
                              )}
                              {  GetProductByIdData?.ProductTechInfo
                                ?.Guarantee === undefined ||   GetProductByIdData?.ProductTechInfo
                                ?.Guarantee === null ? null : (
                            <Grid
                              item
                              lg={6}
                              xl={6}
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
                                  Guarantee{" "}
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
                                  {
                                    GetProductByIdData?.ProductTechInfo
                                      ?.Guarantee
                                  }{" "}
                                  {GetProductByIdData?.GuaranteePeriod ===
                                    null ||
                                  GetProductByIdData?.GuaranteePeriod ===
                                    undefined
                                    ? GetProductByIdData?.UnitOfTime
                                    : GetProductByIdData?.GuaranteePeriod}
                                </Typography>
                              </Box>
                            </Grid>
                            )}
                          </Grid>
                        </Box>

                        {GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit === undefined || GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit  === null || GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit  === "NA" ? null : (  
                      
                        <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "95%",
                          }}
                        >
                        <Typography
                        mt={2}
                        sx={{ ...product, fontSize: "18px" }}
                      >
                        Packaging Information
                      </Typography>

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
                                    minWidth: "185px",
                                  }}
                                >
                                  <Typography
                                    sx={{ ...packHead, fontSize: "16px" }}
                                  >
                                    {val.name}
                                  </Typography>
                                  {/* <Typography sx={packVal}>
                                    {val.name === "Before Weight" ||
                                    val.name === "After Weight"
                                      ? newVal + " kg"
                                      : newVal + " cm"}
                                  </Typography> */}
                                  {GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit ===
                                    undefined ||
                                  GetProductByIdData?.WeightBeforePackingPerUnitMeasurUnit ? (
                                    <Typography sx={packVal}>
                                      {newVal}{" "}
                                      {GetProductByIdData?.UnitOfWeight}
                                    </Typography>
                                  ) : (
                                    <Typography sx={packVal}>
                                      {newVal} {val.measure}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                            )}
                        {GetProductByIdData?.ProductTechInfo?.PackagingInfoPerUnit === undefined || GetProductByIdData?.ProductTechInfo?.PackagingInfoPerUnit === null ? null : (

                          <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <Typography
                            sx={{
                              ...packHead,
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 600,
                              color: "#6B7A99",
                              fontSize: "18px",
                            }}
                          >
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
                            {GetProductByIdData?.ProductTechInfo?.PackagingInfoPerUnit}
                          </Typography>
                        </Box>
                        )}
        
                        {GetProductByIdData?.ProductTechInfo?.LegalInformation === undefined || GetProductByIdData?.ProductTechInfo?.LegalInformation === null ? null : (
                        <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <Typography
                            sx={{
                              ...packHead,
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 600,
                              color: "#6B7A99",
                              fontSize: "18px",
                            }}
                          >
                            Legal Information
                          </Typography>
        
                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                          >
                            {GetProductByIdData?.ProductTechInfo?.LegalInformation}
                          </Typography>
                        </Box>
                        )}

                        { GetProductByIdData?.ProductTechInfo
                          ?.PackagingAndDeliveryInstructionsIfAny === undefined ||  GetProductByIdData?.ProductTechInfo
                          ?.PackagingAndDeliveryInstructionsIfAny === null ? null : (
                        <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px",
                          }}
                        >
                          <Typography
                            mt={1}
                            sx={{ ...product, fontSize: "18px" }}
                          >
                            Packaging and delivery Instructions
                          </Typography>

                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "14px",
                            }}
                          >
                            {
                              GetProductByIdData?.ProductTechInfo
                                ?.PackagingAndDeliveryInstructionsIfAny
                            }
                          </Typography>
                        </Box>
                          )}
                        {GetProductByIdData?.ProductTechInfo
                          ?.InstructionsToUseProduct === null ||
                        GetProductByIdData?.ProductTechInfo
                          ?.InstructionsToUseProduct === undefined ? null : (
                          <Box
                            mt={2}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <Typography
                              mt={1}
                              sx={{
                                ...product,
                                fontWeight: 600,
                                fontSize: "18px",
                                lineHeight: "30px",
                                mt: 1,
                              }}
                            >
                              Instructions to use product
                            </Typography>

                            <Typography
                              sx={{
                                ...packHead,
                                color: "#6B7A99",
                                fontWeight: 400,
                                fontSize: "14px",
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
                    </TabPanel>
                    <TabPanel value="4">
                      <Box>
                        <Typography sx={{ ...pack, color: "#156DB6" }}>
                          Key Features
                        </Typography>
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
  // textAlign: {
  //   xl: "center",
  //   lg: "center",
  //   md: "center",
  //   sm: "center",
  //   xs: "center",
  // },
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
  // textAlign: {
  //   xl: "center",
  //   lg: "center",
  //   md: "center",
  //   sm: "center",
  //   xs: "center",
  // },
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

const tabSubText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "18px",
    sm: "18px",
    xs: "18px",
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
    xl: "20px",
    lg: "20px",
    md: "20px",
    sm: "20px",
    xs: "18px",
  },
  color: "#6B7A99",
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

const ProductVariationStyle = {
  width: "auto",
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
