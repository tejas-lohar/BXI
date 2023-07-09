import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useProductAddToCart } from "../../../Hooks/ProductActions/useProductAddToCart";
// import Leftrrow from "../../../assets/Images/ProductDetailIcon/LeftArrow.svg";
import GoLeft from "../../../assets/Images/CommonImages/GoLeft.png";
import Weight from "../../../assets/Images/Weight.svg";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import CarasoulForProductDetails from "../../../components/Carousel/CarasoulForProductDetails";
import FeatureName from "../../../components/FeatureName";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { useUpdateProductQuery } from "../../AddProductAllPages/Textile/ProductInfo/ProductHooksQuery";

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

export default function MobilityProductPreview() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);

  const [starvalue, setstarValue] = React.useState(2);

  const [TabValue, setTabValue] = React.useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [currentImage, setCurrentImage] = useState(0);

  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [VariationToMap, setVariationToMap] = useState();
  const [storeVariationData, setStoreVariationData] = useState();
  const { data: mutateCartData, mutate: addtocart } = useProductAddToCart();
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();
  const [borderColor, setBorderColor] = useState(true);

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
        setStoreTechnicalInfo(res?.data?.ProductFeatures);

        console.log("heloo", res.data);
      });
  }

  useEffect(() => {
    GetProductByid();
  }, []);
  console.log("VariationToMappp", VariationToMap);

  useEffect(() => {
    GetProductByid();
  }, []);

  let samplestate = false;
  GetProductByIdData?.ProductsVariantions?.map((item, index) => {
    if (item.sampleavailability) {
      return (samplestate = true);
    } else {
      return (samplestate = false);
    }
  });

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
    // {
    //   name: "Breadth",
    //   img: Breadth,
    //   val: GetProductByIdData?.ProductTechInfo?.Width,
    // },
    {
      name: "Before Weight",
      img: Weight,
      val: GetProductByIdData?.ProductTechInfo?.WeightBeforePackingPerUnit,
    },
  ];

  const {
    mutate: updateProduct,
    isLoading,
    isError,
    data: productData,
    reset,
    variables,
    error: RegisterError,
  } = useUpdateProductQuery();
  console.log("GetProductByIdData", GetProductByIdData);

  const uploadProduct = () => {
    let confirm = window.confirm(
      "Are you sure you want to upload this product?"
    );
    if (confirm === true) {
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
                navigate("/home/mylistedproducts");
              }, [1200]);
            }
          },
        }
      );
    }
  };

  return (
    <React.Fragment>
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
        <BreadCrumbHeader MainText="Mobility" />
        <Box
          sx={{
            borderRadius: "30px",
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
              src={GoLeft}
              alt="GoLeft"
              sx={{
                height: "10px",
                width: "25px",
                position: "absolute",
                left: "0",
                mt:2,
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/home/mobility/mobilitygolive/" +id);
                
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
                      {GetProductByIdData &&
                        GetProductByIdData.ProductSubtittle}
                    </Typography>
                    <Typography sx={tabSubText}>
                      {GetProductByIdData &&
                        GetProductByIdData.ProductDescription}
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
                    <Typography sx={{...product , color: "#156DB6" , mt:2}}>Price & Availability</Typography>

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
                  </Box>
                </Grid>
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
                  mt={3}
                  sx={{
                    width: "70%",
                  }}
                >
                  <Grid
                    container
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={{...tableHeader , fontSize : "16px" ,   fontWeight: 600,}}> Available Sizes</Typography>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={{...tableHeader , fontSize : "16px" ,   fontWeight: 600,}}> Min QTY</Typography>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={{...tableHeader , fontSize : "16px" ,   fontWeight: 600,}}> Max QTY</Typography>
                    </Grid>
                    <Grid item xl={2} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={{...tableHeader , fontSize : "16px" ,   fontWeight: 600,}}>GST</Typography>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={{...tableHeader , fontSize : "16px" ,   fontWeight: 600,}}>Product ID</Typography>
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
                                <Typography  sx={{
                                  ...tableData,
                                  fontSize: "14px",
                                }}>
                                  {res.ProductSize}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Typography  sx={{
                                  ...tableData,
                                  fontSize: "14px",
                                }}>
                                  {res.MinOrderQuantity}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Typography  sx={{
                                  ...tableData,
                                  fontSize: "14px",
                                }}>
                                  {res.MaxOrderQuantity}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Typography  sx={{
                                  ...tableData,
                                  fontSize: "14px",
                                }}>
                                  {res.GST} %
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Typography  sx={{
                                  ...tableData,
                                  fontSize: "14px",
                                }}>
                                  {res.ProductIdType}
                                </Typography>
                              </Grid>
                            </Grid>
                          );
                        }
                      )
                    }
                  </Grid>
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
                        {/* <Typography sx={listText}>
                              Product Pickup Location:{"   "}
                              {GetProductByIdData?.ProductPickupLocation}
                            </Typography> */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Typography sx={{...available , fontSize:"18px"}}>
                            Sample Details :&nbsp;
                          </Typography>
                          {samplestate ? (
                            <Typography
                              sx={{
                                ...available,
                                fontWeight: 500,
                                width: "20%",
                                fontSize:"18px"
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
                                fontSize:"18px"
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
                                                  mt:1
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
                                                  mt:1
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
                                      fontSize: "18px",
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
                                          mt:1
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
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
                                          mt:1
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
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
                                          mt:1
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
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
                                          mt:1
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
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
                                          mt:1
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
                              </Box>
                            </Grid>
                          </Box>
                        </Box>
                        
<Box sx={{width:"140rem"}}>
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
                             width : "70%"
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

</Box>
                     


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
                      </Box>
                    </Grid>
                  </Box>
                </Box>

                {/* Tabpanel 3 data */}
                <Box mt={2}>
                  <Typography sx={{...pack , color: "#156DB6"}}>Technical Information</Typography>
                  <Box
                    mt={1}
                    sx={{
                      width: "60%",
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                        <Box sx={ProductVariationStyle}>
                          <Typography sx={{ ...tableHeader, color: "#ADB8CC" ,         fontSize: "18px", }}>
                            Warranty
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                        <Box sx={ProductVariationStyle}>
                          <Typography sx={{ ...tableHeader, color: "#ADB8CC" ,         fontSize: "18px", }}>
                            Guarantee
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
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                          <Box sx={ProductVariationStyle}>
                            <Typography
                              sx={{ ...tableHeader, color: "#6B7A99" ,fontSize: "14px", mt:1
                            }}
                            >
                              {GetProductByIdData?.ProductTechInfo?.Warranty +
                                " " +
                                GetProductByIdData?.UnitOfTime}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                          <Box sx={ProductVariationStyle}>
                            <Typography
                              sx={{ ...tableHeader, color: "#6B7A99" , fontSize: "14px", mt:1
                            }}
                            >
                              {GetProductByIdData?.ProductTechInfo?.Guarantee +
                                " " +
                                GetProductByIdData?.UnitOfTime}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  {GetProductByIdData?.ProductTechInfo
                    ?.WeightBeforePackingPerUnit === "NA" ||
                  GetProductByIdData?.ProductTechInfo
                    ?.WeightBeforePackingPerUnit === null ? null : (
                    <>
                      <Box
                        mt={2}
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
                          Packaging Information
                        </Typography>
                      </Box>

                      <Box
                        mt={2}
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
                                width: "15%",
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
                      </Box>
                    </>
                  )}

                  <Box
                    mt={2.5}
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
                  <Box
                    mt={2.5}
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
                </Box>

                {GetProductByIdData?.listperiod === undefined || GetProductByIdData?.listperiod === null ? null : (
                  <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
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
                    {GetProductByIdData?.listperiod}&nbsp; Days
                  </Typography>
                </Box>
                )  }

                {/* Tabpanel 4 data */}
                <Box mt={2}>
                  <Typography sx={{...pack , color: "#156DB6"}}>Key Features</Typography>

                  <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Grid
                    container
                    mt={0.5}
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
                              // px: 2,
                              display: "flex",
                              // flexWrap: "wrap",
                              textAlign: "start",
                              flexDirection: "row",
                              gap: "100px",
                              mt: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: "20px",
                                width: "100%",
                                mt:1.5
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
                    <Typography sx={{...product , color: "#156DB6"}}>Price & Availability</Typography>

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
                  </Box>
                </Grid>
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
                  mt={3}
                  sx={{
                    width: "70%",
                  }}
                >
                  <Grid
                    container
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={{...tableHeader , fontSize : "16px" ,   fontWeight: 600,}}> Available Sizes</Typography>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={{...tableHeader , fontSize : "16px" ,   fontWeight: 600,}}> Min QTY</Typography>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={{...tableHeader , fontSize : "16px" ,   fontWeight: 600,}}> Max QTY</Typography>
                    </Grid>
                    <Grid item xl={2} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={{...tableHeader , fontSize : "16px" ,   fontWeight: 600,}}>GST</Typography>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={{...tableHeader , fontSize : "16px" ,  fontWeight: 600, }}>Product ID</Typography>
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
                                <Typography  sx={{
                                  ...tableData,
                                  fontSize: "14px",
                                }}>
                                  {res.ProductSize}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Typography  sx={{
                                  ...tableData,
                                  fontSize: "14px",
                                }}>
                                  {res.MinOrderQuantity}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Typography  sx={{
                                  ...tableData,
                                  fontSize: "14px",
                                }}>
                                  {res.MaxOrderQuantity}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Typography  sx={{
                                  ...tableData,
                                  fontSize: "14px",
                                }}>
                                  {res.GST} %
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xl={2.4}
                                lg={2.4}
                                md={2.4}
                                sm={2.4}
                                xs={2.4}
                              >
                                <Typography  sx={{
                                  ...tableData,
                                  fontSize: "14px",
                                }}>
                                  {res.ProductIdType}
                                </Typography>
                              </Grid>
                            </Grid>
                          );
                        }
                      )
                    }
                  </Grid>
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
                        mt={2}
                        sx={{
                          color: "#6B7A99",
                          display: "flex",
                          gap: "10px",
                          flexDirection: "column",
                        }}
                      >
                        {/* <Typography sx={listText}>
                              Product Pickup Location:{"   "}
                              {GetProductByIdData?.ProductPickupLocation}
                            </Typography> */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >

                          <Typography sx={{...available , fontSize:"18px"}}>
                            Sample Details  :&nbsp;
                          </Typography>
                          {samplestate ? (
                            <Typography
                              sx={{
                                ...available,
                                fontWeight: 500,
                                width: "20%",
                                fontSize:"18px"

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
                                fontSize:"18px"

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
                                                  mt:1
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
                                                  mt:1
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
                                      fontSize: "18px",
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
                                          mt:1
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
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
                                          mt:1
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
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
                                          mt:1
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
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
                                          mt:1
                                        }}
                                      >
                                        {
                                          GetProductByIdData?.LocationDetails
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
                                          mt:1
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
                              </Box>
                            </Grid>
                          </Box>
                        </Box>

                        <Box sx={{width:"140rem"}}>
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
                                                     width : "70%"
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
                        
                        </Box>
                      </Box>
                    </Grid>
                  </Box>
                </Box>
              </TabPanel>
              <TabPanel value="3">
                <Box>
                  <Typography sx={{...pack , color: "#156DB6"}}>Technical Information</Typography>
                  <Box
                    mt={1}
                    sx={{
                      width: "60%",
                    }}
                  >
                    <Grid
                      container
                      sx={{
                        textAlign: "center",
                      }}
                    >
                      <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                        <Box sx={ProductVariationStyle}>
                          <Typography sx={{ ...tableHeader, color: "#ADB8CC" ,fontSize: "18px", }}>
                            Warranty
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                        <Box sx={ProductVariationStyle}>
                          <Typography sx={{ ...tableHeader, color: "#ADB8CC" , fontSize: "18px", }}>
                            Guarantee
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
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                        }}
                      >
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                          <Box sx={ProductVariationStyle}>
                            <Typography
                                      
                                      sx={{ ...tableHeader, color: "#6B7A99" , fontSize: "14px", mt:1  }}
                            >
                              {GetProductByIdData?.ProductTechInfo?.Warranty +
                                " " +
                                GetProductByIdData?.UnitOfTime}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                          <Box sx={ProductVariationStyle}>
                            <Typography
                              sx={{ ...tableHeader, color: "#6B7A99" , fontSize: "14px", mt:1 }}
                            >
                              {GetProductByIdData?.ProductTechInfo?.Guarantee +
                                " " +
                                GetProductByIdData?.UnitOfTime}
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                  {GetProductByIdData?.ProductTechInfo
                    ?.WeightBeforePackingPerUnit === "NA" ||
                  GetProductByIdData?.ProductTechInfo
                    ?.WeightBeforePackingPerUnit === null ? null : (
                    <>
                      <Box
                        mt={2}
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
                          Packaging Information
                        </Typography>
                      </Box>

                      <Box
                        mt={2}
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
                                width: "15%",
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
                      </Box>
                    </>
                  )}
                  <Box
                    mt={2.5}
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
                  <Box
                    mt={2.5}
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
                </Box>

                {GetProductByIdData?.listperiod === undefined || GetProductByIdData?.listperiod === null ? null : (
                  <Box
                  mt={2}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
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
                    {GetProductByIdData?.listperiod}&nbsp; Days
                  </Typography>
                </Box>
                )  }

              </TabPanel>
              <TabPanel value="4">
                <Typography sx={{...pack , color: "#156DB6"}}>Key Features</Typography>
                <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Grid
                  container
                  mt={0.5}
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
                            // px: 2,
                            display: "flex",
                            // flexWrap: "wrap",
                            textAlign: "start",
                            flexDirection: "row",
                            gap: "100px",
                            mt: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              gap: "20px",
                              width: "100%",
                              mt:1.5
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
              </TabPanel>
            </Box>
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
            {GetProductByIdData?.ProductUploadStatus === "Approved" ? null : (
              <Button
                variant="contained"
                sx={CartButtonStyle}
                // onClick={() => handleAddToCart(ProductId)}
                onClick={uploadProduct}
              >
                Upload Product
              </Button>
            )}
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

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

const BookButtonStyle = {
  py: "16px",
  textAlign: "center",
};

const CartButtonStyle = {
  // width: "50%",
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
  width: "90%",
  mx: "auto",
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

const tableHeader = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
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

const ProductVariationStyle = {
  width: "auto",
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
