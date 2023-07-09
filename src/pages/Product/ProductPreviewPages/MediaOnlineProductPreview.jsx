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
// import LeftArrow from "../../../assets/Images/ProductDetailIcon/LeftArrow.svg";
import GoLeft from "../../../assets/Images/CommonImages/GoLeft.png";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import CarasoulForProductDetails from "../../../components/Carousel/CarasoulForProductDetails";
import FeatureName from "../../../components/FeatureName";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
// import { createSearchParams, useNavigate } from "react-router-dom";
import { useUpdateProductQuery } from "../../AddProductAllPages/Textile/ProductInfo/ProductHooksQuery";
const options = { day: "2-digit", month: "short", year: "numeric" };
function DiscountedPrice({ regularPrice, discountPrice, GetProductByIdData }) {
  console.log({ regularPrice, discountPrice });
  const discount = regularPrice - discountPrice;
  const discountPercent = (discount / regularPrice) * 100;
  const formattedDiscountPercent = discountPercent.toFixed(2);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          width: "500px",
          mt: "10px",
          marginBottom: "-11px",
          gap: "10px",
          // bgcolor: "red",
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
        {GetProductByIdData?.ProductsVariantions.at(0)?.unit ? (
          <Typography sx={{ ...fetchValue, pb: 1 }}>
            Per {GetProductByIdData?.ProductsVariantions.at(0)?.unit} Per{" "}
            {GetProductByIdData?.ProductsVariantions.at(0)?.Timeline}
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "15px",
            }}
          >
            <Typography sx={fetchValue}>
              Per Day
              {/* {GetProductByIdData?.ProductsVariantions.at(0)?.Timeline} */}
            </Typography>
            <Typography sx={fetchValue}>
              Per insertion
              {/* {GetProductByIdData?.ProductsVariantions.at(0)?.Timeline} */}
            </Typography>
          </Box>
        )}
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

export default function MediaOnlineProductPreview() {
  let { id } = useParams();
  // let ProductId = id;
  // let ProductId = id;
  const navigate = useNavigate();
  // const [count, setCount] = useState(1);
  // const [starvalue, setstarValue] = React.useState(2);

  const [TabValue, setTabValue] = React.useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  // const [currentImage, setCurrentImage] = useState(0);
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [ProductFeatures, setProfuctFeatures] = useState([]);
  const [VariationToMap, setVariationToMap] = useState();
  const [storeVariationData, setStoreVariationData] = useState();
  const {
    data: mutateCartData,
    // mutate: addtocart
  } = useProductAddToCart();

  // let NewdataArray = [];
  const ImageDataArray = GetProductByIdData?.ProductImages;
  // const upwardClick = () => {
  //   setCurrentImage((currentImage + 1) % ImageDataArray.length);
  // };

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

  // async function handleAddToCart(id) {
  //   addtocart(id);
  // }

  // const technicalinfo = [
  //   {
  //     name: "Height",
  //     img: Height,
  //     val: GetProductByIdData?.ProductTechInfo?.Height,
  //   },
  //   {
  //     name: "Length",
  //     img: Length,
  //     val: GetProductByIdData?.ProductTechInfo?.Length,
  //   },
  //   {
  //     name: "Breadth",
  //     img: Breadth,
  //     val: GetProductByIdData?.ProductTechInfo?.Width,
  //   },
  //   {
  //     name: "Weight",
  //     img: Weight,
  //     val: GetProductByIdData?.ProductTechInfo?.WeightBeforePackingPerUnit,
  //   },
  // ];

  // const otherCostList = [
  //   {
  //     otherCostText: GetProductByIdData?.OtherCost[0]?.ReasonOfCost,
  //     otherCostValue: GetProductByIdData?.OtherCost[0]?.CostPrice,
  //   },
  // ];

  // const listMonthDateVal = [
  //   {
  //     valMonths: "Jan",
  //     valDates: "13th , 16th , 17th , 23rd ",
  //   },
  //   {
  //     valMonths: "Jan",
  //     valDates: "13th , 16th , 17th , 23rd ",
  //   },
  //   {
  //     valMonths: "Jan",
  //     valDates: "13th , 16th , 17th , 23rd ",
  //   },
  //   {
  //     valMonths: "Jan",
  //     valDates: "13th , 16th , 17th , 23rd ",
  //   },
  // ];
  const {
    mutate: updateProduct,
    // isLoading,
    // isError,
    data: productData,
    // reset,
    // variables,
    // error: RegisterError,
  } = useUpdateProductQuery();
  console.log("productData", GetProductByIdData);
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
        <BreadCrumbHeader MainText="Media Online" />
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
            {/* </Link> */}
            <Box
              component="img"
              src={GoLeft}
              alt="GoLeft"
              sx={{
                height: "10px",
                width: "25px",
                position: "absolute",
                left: "0",
                cursor: "pointer",
              }}
              onClick={() => {
                // navigate("/home");
                navigate("/home");
              }}
            />
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
                <Tab label="Product Information" value="2" sx={TabTextStyle} />
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
                      {GetProductByIdData?.ProductSubtitle}
                    </Typography>
                    <Typography sx={DescriptionAnswerText}>
                      {GetProductByIdData?.ProductDescription}
                    </Typography>

                    <Typography sx={{ ...semi, color: "#156DB6" }}>
                      {/* {GetProductByIdData?.ProductName} */}
                      Product Information
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        mx: "auto",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: "5px",
                      }}
                    >
                      <DiscountedPrice
                        regularPrice={
                          GetProductByIdData?.ProductsVariantions?.at(0)
                            ?.PricePerUnit
                        }
                        discountPrice={
                          GetProductByIdData?.ProductsVariantions?.at(0)
                            ?.DiscountedPrice
                        }
                        GetProductByIdData={GetProductByIdData}
                        // regularPrice={10000}
                        // discountPrice={5000}
                      />
                    </Box>

                    <Box
                      mt={4}
                      sx={{
                        width: "100%",
                        mx: "auto",
                      }}
                    >
                      <Grid container sx={{ width: "90%" }}>
                        {GetProductByIdData?.medianame ? (
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Typography sx={tableHeader}>Brand Name</Typography>
                            <Typography sx={fetchValue}>
                              {GetProductByIdData?.medianame}
                            </Typography>
                          </Grid>
                        ) : null}
                        {GetProductByIdData?.multiplexScreenName ? (
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Typography sx={tableHeader}>
                              Multiplex Name
                            </Typography>
                            <Typography sx={fetchValue}>
                              {GetProductByIdData?.multiplexScreenName}
                            </Typography>
                          </Grid>
                        ) : null}

                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          {GetProductByIdData?.offerningbrandat ? (
                            <>
                              <Typography sx={tableHeader}>
                                {" "}
                                Offering At
                              </Typography>
                              <Typography
                                sx={{ ...fetchValue, whiteSpace: "nowrap" }}
                              >
                                {GetProductByIdData?.offerningbrandat}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography sx={tableHeader}>
                                {" "}
                                Position of the Ad ?
                              </Typography>
                              <Typography
                                sx={{
                                  ...fetchValue,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {GetProductByIdData?.adPosition}
                              </Typography>
                            </>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container sx={{ mt: 4, width: "90%" }}>
                        {GetProductByIdData?.ProductsVariantions.at(0)
                          ?.location ? (
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Typography sx={tableHeader}>Location</Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.location
                              }
                            </Typography>
                          </Grid>
                        ) : null}
                        {GetProductByIdData?.ProductsVariantions.at(0)?.Type ? (
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Typography sx={tableHeader}>Type</Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.Type
                              }
                            </Typography>
                          </Grid>
                        ) : null}

                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          {GetProductByIdData?.ProductsVariantions.at(0)
                            ?.unit ? (
                            <>
                              <Typography sx={tableHeader}>Unit</Typography>
                              <Typography sx={fetchValue}>
                                Per{" "}
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.unit
                                }
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography sx={tableHeader}>
                                Release Details
                              </Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.releasedetails
                                }
                              </Typography>
                            </>
                          )}
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          {GetProductByIdData?.ProductsVariantions.at(0)
                            ?.Timeline ? (
                            <>
                              <Typography sx={tableHeader}>
                                {" "}
                                Timeline
                              </Typography>
                              <Typography sx={fetchValue}>
                                Per{" "}
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.Timeline
                                }
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography sx={tableHeader}> Edition</Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.edition
                                }
                              </Typography>
                            </>
                          )}
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          {GetProductByIdData?.ProductsVariantions.at(0)
                            ?.repetition ? (
                            <>
                              <Typography sx={tableHeader}>
                                {" "}
                                Repetition
                              </Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.repetition
                                }
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography sx={tableHeader}>Ad Type</Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.adType
                                }
                              </Typography>
                            </>
                          )}
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>
                            Dimension Size
                          </Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.dimensionSize
                            }
                          </Typography>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>GST</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.ProductsVariantions.at(0)?.GST}{" "}
                            %
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ mt: 4, width: "90%" }}>
                        {/* <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={tableHeader}>Price</Typography>
                      <Typography sx={fetchValue}>
                        {
                          GetProductByIdData?.ProductsVariantions?.at(0)
                            ?.PricePerUnit
                        }
                      </Typography>
                    </Grid> */}
                        {/* <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Typography sx={tableHeader}>
                        {" "}
                        Product ID Type
                      </Typography>
                      <Typography sx={fetchValue}>
                        {
                          GetProductByIdData?.ProductsVariantions.at(0)
                            ?.productIdType
                        }
                      </Typography>
                    </Grid> */}

                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                          <Typography sx={tableHeader}>
                            {" "}
                            Min - Max Order Quantity Timeline
                          </Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.ProductsVariantions.at(0)
                              ?.minOrderQuantitytimeline
                              ? `${
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.minOrderQuantitytimeline
                                } - ${
                                  GetProductByIdData?.ProductsVariantions?.at(0)
                                    ?.maxOrderQuantitytimeline
                                }`
                              : "N/A"}{" "}
                            {""} /{" "}
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.Timeline
                            }
                          </Typography>
                        </Grid>
                        {/* <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}>
                            Max Order Quantity Timeline
                          </Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.ProductsVariantions.at(0)
                              ?.maxOrderQuantitytimeline
                              ? GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.maxOrderQuantitytimeline
                              : "N/A"}{" "}
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.Timeline
                            }
                          </Typography>
                        </Grid> */}
                        {GetProductByIdData?.ProductSubCategory ===
                        "643cda0c53068696706e3951" ? null : (
                          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                            <Typography sx={tableHeader}>
                              {" "}
                              Min - Max Order Quantity Unit
                            </Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.minOrderQuantityunit
                              }{" "}
                              -
                              {
                                GetProductByIdData?.ProductsVariantions?.at(0)
                                  ?.maxOrderQuantityunit
                              }
                              /{" "}
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.unit
                              }
                            </Typography>
                          </Grid>
                        )}

                        {/* <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}>
                            Max Order Quantity Unit
                          </Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.maxOrderQuantityunit
                            }{" "}
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.unit
                            }
                          </Typography>
                        </Grid> */}
                        {GetProductByIdData?.ProductsVariantions?.at(0)
                          ?.minTimeslotSeconds ? (
                          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                            <Typography sx={tableHeader}>
                              {" "}
                              Min - Max Timeslot
                            </Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.minTimeslotSeconds
                              }{" "}
                              -
                              {
                                GetProductByIdData?.ProductsVariantions?.at(0)
                                  ?.maxTimeslotSeconds
                              }
                              / Seconds {""}{" "}
                            </Typography>
                          </Grid>
                        ) : null}

                        {/* <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}>Max Timeslot</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.ProductsVariantions.at(0)
                              ?.maxTimeslotSeconds
                              ? GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.maxTimeslotSeconds + " Sec"
                              : "N/A"}{" "}
                          
                          </Typography>
                        </Grid> */}
                      </Grid>
                      <Grid container sx={{ mt: 5, width: "90%" }}>
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}>Region</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.GeographicalData?.region}
                          </Typography>
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}> State</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.GeographicalData?.state}
                          </Typography>
                        </Grid>

                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}>City</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.GeographicalData?.city}
                          </Typography>
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}> Landmark</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.GeographicalData?.landmark}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* {GetProductByIdData &&
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
                                {el.medianame}
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
                    )} */}
                    </Box>

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
                          : GetProductByIdData?.OtherCost?.map((cost) => {
                              console.log("cost", cost);
                              const newValue = cost?.CostPrice.toFixed(2);
                              return (
                                <>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: "60px",
                                      mt: 1,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        minWidth: "160px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          ...fetchValue,
                                        }}
                                      >
                                        {" "}
                                        {cost?.ReasonOfCost}{" "}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        minWidth: "160px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          ...fetchValue,
                                        }}
                                      >
                                        HSN - {cost?.AdCostHSN}{" "}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        minWidth: "160px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          ...fetchValue,
                                        }}
                                      >
                                        GST - {cost?.AdCostHSN} %
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        minWidth: "160px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          ...fetchValue,
                                        }}
                                      >
                                        {cost?.AdCostApplicableOn}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        gap: "5px",
                                        minWidth: "160px",
                                        display: "flex",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          ...fetchValue,
                                        }}
                                      >
                                        {newValue}
                                      </Typography>
                                      <Typography>
                                        {cost.currencyType === "BXITokens" ? (
                                          <Box
                                            component="img"
                                            src={BXITokenIcon}
                                            alt="token"
                                            sx={{
                                              height: "auto",
                                              width: "15px",
                                              marginTop: "6px",
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
                            })}
                      </Box>
                    ) : null}

                    {GetProductByIdData?.OtherInformationBuyerMustKnowOrRemarks
                      .length === 0 ? null : (
                      <>
                        <Box sx={{ mt: 3 }}>
                          <Typography sx={cost}>Remarks </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              width: "95%",
                              gap: "10px",
                              mt: 1,
                            }}
                          >
                            {GetProductByIdData?.OtherInformationBuyerMustKnowOrRemarks.map(
                              (item) => {
                                return (
                                  <>
                                    <Typography sx={otherCostText}>
                                      {item}
                                    </Typography>
                                  </>
                                );
                              }
                            )}
                          </Box>
                        </Box>
                      </>
                    )}

                    <Box mt={4}>
                      <Typography sx={{ ...pack, color: "#156DB6" }}>
                        Technical Information
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <Typography sx={inclusiveheader}>
                          Supporting you would give to buyer
                        </Typography>
                        {GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer
                          ? Object?.keys(
                              GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer
                            ).map((el, idx) => {
                              if (
                                GetProductByIdData
                                  ?.WhatSupportingYouWouldGiveToBuyer[el] ===
                                "on"
                              ) {
                                return (
                                  <>
                                    <Typography
                                      sx={{
                                        ...packHead,
                                        color: "#6B7A99",
                                        fontWeight: 400,
                                        fontSize: "16px",
                                        display: "flex",
                                        gap: "10px",
                                      }}
                                    >
                                      {" "}
                                      {/* <span>{idx + 1}</span> */}
                                      {el}
                                      {/* {
                                    GetProductByIdData
                                      ?.WhatSupportingYouWouldGiveToBuyer[el]
                                  } */}
                                    </Typography>
                                    {/* <Typography> </Typography> */}
                                  </>
                                );
                              } else {
                                return null;
                              }
                            })
                          : null}{" "}
                        {/* <Typography
                      sx={{
                        ...packHead,
                        color: "#6B7A99",
                        fontWeight: 400,
                        fontSize: "16px",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      {" "}
                      <span>1.</span>
                    </Typography>
                    <Typography
                      sx={{
                        ...packHead,
                        color: "#6B7A99",
                        fontWeight: 400,
                        fontSize: "16px",
                        display: "flex",
                        gap: "2px",
                      }}
                    >
                      {" "}
                      <span>2.</span>
                      Exhibition Certificate
                    </Typography> */}
                      </Box>

                      <Box>
                        <Typography sx={inclusiveheader}>
                          Dimensions of Ad / Content Needed
                        </Typography>
                        <Box>
                          <Typography sx={dots}>
                            {GetProductByIdData?.Dimensions}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography sx={inclusiveheader}>
                          Content Upload Link
                        </Typography>
                        <Box>
                          <a
                            style={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 400,
                              fontSize: "16px",
                              color: "#445FD2",
                            }}
                          >
                            {GetProductByIdData?.UploadLink}
                          </a>
                          <br />
                        </Box>
                      </Box>

                      <Box>
                        <Typography sx={inclusiveheader}>
                          Inventory Available Dates
                        </Typography>
                        <Box sx={{ pt: "0.8%", display: "flex", gap: "10%" }}>
                          <Typography sx={dateMonth}>Start Date</Typography>
                          <Typography sx={dateMonth}>End Date</Typography>
                        </Box>

                        <Box sx={{ pt: "0.8%", display: "flex", gap: "10%" }}>
                          <Typography sx={valDateMonth}>
                            {GetProductByIdData?.calender?.map((el, idx) => {
                              return (
                                <>
                                  <Typography sx={valDateMonth}>
                                    {new Date(el.startDate).toLocaleDateString(
                                      "en-US",
                                      options
                                    )}{" "}
                                  </Typography>
                                </>
                              );
                            })}
                          </Typography>
                          <Typography sx={valDateMonth}>
                            {GetProductByIdData?.calender?.map((el, idx) => {
                              return (
                                <>
                                  <Typography sx={valDateMonth}>
                                    {new Date(el.endDate).toLocaleDateString(
                                      "en-US",
                                      options
                                    )}{" "}
                                  </Typography>
                                </>
                              );
                            })}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box mt={4}>
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
                          mt={0.5}
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
                  </Box>
                </Grid>
              </Grid>{" "}
            </TabPanel>
            <TabPanel value="2">
              {/* Price & Availability */}
              <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Typography sx={{ ...semi, color: "#156DB6" }}>
                    {/* {GetProductByIdData?.ProductName} */}
                    Product Information
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      mx: "auto",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "5px",
                    }}
                  >
                    <DiscountedPrice
                      regularPrice={
                        GetProductByIdData?.ProductsVariantions?.at(0)
                          ?.PricePerUnit
                      }
                      discountPrice={
                        GetProductByIdData?.ProductsVariantions?.at(0)
                          ?.DiscountedPrice
                      }
                      GetProductByIdData={GetProductByIdData}
                      // regularPrice={10000}
                      // discountPrice={5000}
                    />
                  </Box>

                  <Box
                    mt={4}
                    sx={{
                      width: "100%",
                      mx: "auto",
                    }}
                  >
                    <Grid container sx={{ width: "90%" }}>
                      {GetProductByIdData?.medianame ? (
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>Brand Name</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.medianame}
                          </Typography>
                        </Grid>
                      ) : null}
                      {GetProductByIdData?.multiplexScreenName ? (
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>
                            Multiplex Name
                          </Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.multiplexScreenName}
                          </Typography>
                        </Grid>
                      ) : null}
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        {GetProductByIdData?.offerningbrandat ? (
                          <>
                            <Typography sx={tableHeader}>
                              {" "}
                              Offering At
                            </Typography>
                            <Typography
                              sx={{ ...fetchValue, whiteSpace: "nowrap" }}
                            >
                              {GetProductByIdData?.offerningbrandat}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography sx={tableHeader}>
                              {" "}
                              Position of the Ad ?
                            </Typography>
                            <Typography
                              sx={{
                                ...fetchValue,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {GetProductByIdData?.adPosition}
                            </Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 4, width: "90%" }}>
                      {GetProductByIdData?.ProductsVariantions.at(0)
                        ?.location ? (
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>Location</Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.location
                            }
                          </Typography>
                        </Grid>
                      ) : null}
                      {GetProductByIdData?.ProductsVariantions.at(0)?.Type ? (
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>Type</Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.Type
                            }
                          </Typography>
                        </Grid>
                      ) : null}
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        {GetProductByIdData?.ProductsVariantions.at(0)?.unit ? (
                          <>
                            <Typography sx={tableHeader}>Unit</Typography>
                            <Typography sx={fetchValue}>
                              Per{" "}
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.unit
                              }
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography sx={tableHeader}>
                              Release Details
                            </Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.releasedetails
                              }
                            </Typography>
                          </>
                        )}
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        {GetProductByIdData?.ProductsVariantions.at(0)
                          ?.Timeline ? (
                          <>
                            <Typography sx={tableHeader}> Timeline</Typography>
                            <Typography sx={fetchValue}>
                              Per{" "}
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.Timeline
                              }
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography sx={tableHeader}> Edition</Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.edition
                              }
                            </Typography>
                          </>
                        )}
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        {GetProductByIdData?.ProductsVariantions.at(0)
                          ?.repetition ? (
                          <>
                            <Typography sx={tableHeader}>
                              {" "}
                              Repetition
                            </Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.repetition
                              }
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography sx={tableHeader}>Ad Type</Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.adType
                              }
                            </Typography>
                          </>
                        )}
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        <Typography sx={tableHeader}>Dimension Size</Typography>
                        <Typography sx={fetchValue}>
                          {
                            GetProductByIdData?.ProductsVariantions.at(0)
                              ?.dimensionSize
                          }
                        </Typography>
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        <Typography sx={tableHeader}>GST</Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.ProductsVariantions.at(0)?.GST} %
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 4, width: "90%" }}>
                      <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                        <Typography sx={tableHeader}>
                          {" "}
                          Min - Max Order Quantity Timeline
                        </Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.ProductsVariantions.at(0)
                            ?.minOrderQuantitytimeline
                            ? `${
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.minOrderQuantitytimeline
                              } - ${
                                GetProductByIdData?.ProductsVariantions?.at(0)
                                  ?.maxOrderQuantitytimeline
                              }`
                            : "N/A"}{" "}
                          {""} /{" "}
                          {
                            GetProductByIdData?.ProductsVariantions.at(0)
                              ?.Timeline
                          }
                        </Typography>
                      </Grid>

                      {GetProductByIdData?.ProductSubCategory ===
                      "643cda0c53068696706e3951" ? null : (
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                          <Typography sx={tableHeader}>
                            {" "}
                            Min - Max Order Quantity Unit
                          </Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.minOrderQuantityunit
                            }{" "}
                            -
                            {
                              GetProductByIdData?.ProductsVariantions?.at(0)
                                ?.maxOrderQuantityunit
                            }
                            /{" "}
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.unit
                            }
                          </Typography>
                        </Grid>
                      )}

                      {GetProductByIdData?.ProductsVariantions?.at(0)
                        ?.minTimeslotSeconds ? (
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                          <Typography sx={tableHeader}>
                            {" "}
                            Min - Max Timeslot
                          </Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.minTimeslotSeconds
                            }{" "}
                            -
                            {
                              GetProductByIdData?.ProductsVariantions?.at(0)
                                ?.maxTimeslotSeconds
                            }
                            / Seconds {""}{" "}
                          </Typography>
                        </Grid>
                      ) : null}
                    </Grid>
                    <Grid container sx={{ mt: 5, width: "90%" }}>
                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Typography sx={tableHeader}>Region</Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.GeographicalData?.region}
                        </Typography>
                      </Grid>
                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Typography sx={tableHeader}> State</Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.GeographicalData?.state}
                        </Typography>
                      </Grid>

                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Typography sx={tableHeader}>City</Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.GeographicalData?.city}
                        </Typography>
                      </Grid>
                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Typography sx={tableHeader}> Landmark</Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.GeographicalData?.landmark}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

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
                        : GetProductByIdData?.OtherCost?.map((cost) => {
                            console.log("cost", cost);
                            const newValue = cost?.CostPrice.toFixed(2);
                            return (
                              <>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: "60px",
                                    mt: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      minWidth: "160px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...fetchValue,
                                      }}
                                    >
                                      {" "}
                                      {cost?.ReasonOfCost}{" "}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      minWidth: "160px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...fetchValue,
                                      }}
                                    >
                                      HSN - {cost?.AdCostHSN}{" "}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      minWidth: "160px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...fetchValue,
                                      }}
                                    >
                                      GST - {cost?.AdCostHSN} %
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      minWidth: "160px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...fetchValue,
                                      }}
                                    >
                                      {cost?.AdCostApplicableOn}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      gap: "5px",
                                      minWidth: "160px",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...fetchValue,
                                      }}
                                    >
                                      {newValue}
                                    </Typography>
                                    <Typography>
                                      {cost.currencyType === "BXITokens" ? (
                                        <Box
                                          component="img"
                                          src={BXITokenIcon}
                                          alt="token"
                                          sx={{
                                            height: "auto",
                                            width: "15px",
                                            marginTop: "6px",
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
                          })}
                    </Box>
                  ) : null}

                  {GetProductByIdData?.OtherInformationBuyerMustKnowOrRemarks
                    .length === 0 ? null : (
                    <>
                      <Box sx={{ mt: 3 }}>
                        <Typography sx={cost}>Remarks </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            width: "95%",
                            gap: "10px",
                            mt: 1,
                          }}
                        >
                          {GetProductByIdData?.OtherInformationBuyerMustKnowOrRemarks.map(
                            (item) => {
                              return (
                                <>
                                  <Typography sx={otherCostText}>
                                    {item}
                                  </Typography>
                                </>
                              );
                            }
                          )}
                        </Box>
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Box>
                <Typography sx={{ ...pack, color: "#156DB6" }}>
                  Technical Information
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <Typography sx={inclusiveheader}>
                    Supporting you would give to buyer
                  </Typography>
                  {GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer
                    ? Object?.keys(
                        GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer
                      ).map((el, idx) => {
                        if (
                          GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer[
                            el
                          ] === "on"
                        ) {
                          return (
                            <>
                              <Typography
                                sx={{
                                  ...packHead,
                                  color: "#6B7A99",
                                  fontWeight: 400,
                                  fontSize: "16px",
                                  display: "flex",
                                  gap: "10px",
                                }}
                              >
                                {" "}
                                {/* <span>{idx + 1}</span> */}
                                {el}
                                {/* {
                                    GetProductByIdData
                                      ?.WhatSupportingYouWouldGiveToBuyer[el]
                                  } */}
                              </Typography>
                              {/* <Typography> </Typography> */}
                            </>
                          );
                        } else {
                          return null;
                        }
                      })
                    : null}{" "}
                  {/* <Typography
                      sx={{
                        ...packHead,
                        color: "#6B7A99",
                        fontWeight: 400,
                        fontSize: "16px",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      {" "}
                      <span>1.</span>
                    </Typography>
                    <Typography
                      sx={{
                        ...packHead,
                        color: "#6B7A99",
                        fontWeight: 400,
                        fontSize: "16px",
                        display: "flex",
                        gap: "2px",
                      }}
                    >
                      {" "}
                      <span>2.</span>
                      Exhibition Certificate
                    </Typography> */}
                </Box>

                <Box>
                  <Typography sx={inclusiveheader}>
                    Dimensions of Ad / Content Needed
                  </Typography>
                  <Box>
                    <Typography sx={dots}>
                      {GetProductByIdData?.Dimensions}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography sx={inclusiveheader}>
                    Content Upload Link
                  </Typography>
                  <Box>
                    <a
                      style={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "16px",
                        color: "#445FD2",
                      }}
                    >
                      {GetProductByIdData?.UploadLink}
                    </a>
                    <br />
                  </Box>
                </Box>

                <Box>
                  <Typography sx={inclusiveheader}>
                    Inventory Available Dates
                  </Typography>
                  <Box sx={{ pt: "0.8%", display: "flex", gap: "10%" }}>
                    <Typography sx={dateMonth}>Start Date</Typography>
                    <Typography sx={dateMonth}>End Date</Typography>
                  </Box>

                  <Box sx={{ pt: "0.8%", display: "flex", gap: "10%" }}>
                    <Typography sx={valDateMonth}>
                      {GetProductByIdData?.calender?.map((el, idx) => {
                        return (
                          <>
                            <Typography sx={valDateMonth}>
                              {new Date(el.startDate).toLocaleDateString(
                                "en-US",
                                options
                              )}{" "}
                            </Typography>
                          </>
                        );
                      })}
                    </Typography>
                    <Typography sx={valDateMonth}>
                      {GetProductByIdData?.calender?.map((el, idx) => {
                        return (
                          <>
                            <Typography sx={valDateMonth}>
                              {new Date(el.endDate).toLocaleDateString(
                                "en-US",
                                options
                              )}{" "}
                            </Typography>
                          </>
                        );
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="4">
              {/* {ProductFeatures?.map((res) => {
                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "200px",
                    }}
                  >
                    <Box component="img" src={bxifeature} />
                    <Typography sx={{ ...TypographyTitleText }}>
                      {res.name}
                    </Typography>
                    <Typography sx={{ ...TypographyTitleText }}>
                      {res.description}
                    </Typography>
                  </Box>
                );
              })} */}
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
                    mt={0.5}
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
              // onClick={() => handleAddToCart(ProductId)}
              onClick={uploadProduct}
            >
              Upload Product
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
    md: "18px",
    lg: "18px",
    xl: "18px",
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
const otherCostText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  color: "#6B7A99",
};
const dateMonth = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 16,
  color: "#6B7A99",
};
const valDateMonth = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#6B7A99",
};
const cost = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 20,
  color: "#6B7A99",
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

const fetchValue = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 450,
  fontSize: "14px",
  color: "#B1B1B1",
  marginTop: "7px",
};
const tableHeader = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 550,
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
  width: "90%",
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

const semi = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "2.4rem",
    lg: "2.4rem",
    md: "2.2rem",
    sm: "2rem",
    xs: "2rem",
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
