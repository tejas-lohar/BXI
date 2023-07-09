import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Grid, Paper, Tab, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import LeftArrow from "../../../assets/Images/payment/LeftArrow.svg";
import LeftArrow from "../../../assets/Images/payment/LeftArrow.png";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import { useAddToWishlist } from "../../../Hooks/ProductActions/useAddToWishlist";
import { useProductAddToCart } from "../../../Hooks/ProductActions/useProductAddToCart";
import Weight from "../../../assets/Images/Weight.svg";
// import { useRemoveWishlistProductByProductId } from "../../../Hooks/ProductActions/useRemoveWishlistProduct";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { GetProductByIdAction } from "../../../redux/action/ProductActions/GetProductByIdAction";
// import { useGetWishlistData } from "../../../Hooks/ProductActions/useGetWishlistData";
import CarasoulForProductDetails from "../../../components/Carousel/CarasoulForProductDetails";
import FeatureName from "../../../components/FeatureName";
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

const RestaurantProductPreview = () => {
  let { id } = useParams();
  let ProductId = id;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  // const [currentImage, setCurrentImage] = useState(0);
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [VariationToMap, setVariationToMap] = useState();
  const [showSizechart, setShowSizechart] = useState(false);
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();

  // const [WishlistData, setWishlistData] = useState();
  const [borderColor, setBorderColor] = useState(true);
  const [color, setColor] = useState("");
  // const [like, setLike] = useState(false);

  async function GetProductByid() {
    await axios
      .get(`product/get_product_byId/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setGetProductByIdData(res?.data);
        console.log("alldata", res?.data);
        setStoreVariationData(res?.data?.ProductsVariantions[0]?._id);
        setStoreTechnicalInfo(res?.data?.ProductFeatures);
      });
  }

  const navigate = useNavigate();

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  console.log("VariationToMappp", VariationToMap);

  console.log(GetProductByIdData, "GetProductByIdData");

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

  // const step = [
  //   {
  //     id: 1,
  //     message: "Product Defective/Damaged",
  //   },
  //   {
  //     id: 2,
  //     message: "Product not Delivered ",
  //   },
  //   {
  //     id: 3,
  //     message: "Raise a ticket with BXI ",
  //   },
  //   {
  //     id: 4,
  //     message: "Issue with Invoicing ",
  //   },
  //   {
  //     id: 5,
  //     message: "Issue with Pricing",
  //   },
  //   {
  //     id: 6,
  //     message: "Issue with Tokens",
  //   },
  // ];

  // const listItemText = [
  //   {
  //     itemText: "Do not wash",
  //   },
  //   {
  //     itemText: "Do not use bleach",
  //   },
  //   {
  //     itemText: "Iron at a maximum of 110ºC/230ºF",
  //   },
  //   {
  //     itemText: "Dry clean with tetrachloroethylene",
  //   },
  //   {
  //     itemText: "Do not tumble dry",
  //   },
  // ];

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

  // let samplestate = false;
  // GetProductByIdData?.ProductsVariantions?.map((item, index) => {
  //   if (item.sampleavailability) {
  //     return (samplestate = true);
  //   } else {
  //     return (samplestate = false);
  //   }
  // });
  const {
    mutate: updateProduct,
    // isLoading,
    // isError,
    data: productData,
    // reset,
    // variables,
    // error: RegisterError,
  } = useUpdateProductQuery();
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
  const naviagte = useNavigate();

  // const {
  //   data: mutateWishlistData,
  //   mutate: addtowishlist,
  //   isLoading: wishlistMutateLoading,
  //   error: wishlistMutateError,
  // } = useAddToWishlist();

  // const { data: mutateRemoveWishlistData, mutate: removefromwishlist } =
  //   useRemoveWishlistProductByProductId();

  async function fetWishlistData() {
    await axios
      .get("wishlist/get_wishlist_product", {
        withCredentials: true,
      })
      .then((res) => {
        // setWishlistData(res?.data);
      });
  }
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
    fetWishlistData();
  }, []);

  useEffect(() => {
    GetProductByid();
  }, []);

  // async function handleAddToWishlist(id) {
  //   addtowishlist(id);
  //   setLike(true);
  // }

  // async function handleRemoveWishlist(id) {
  //   removefromwishlist(id);
  //   setLike(false);
  // }

  return (
    <React.Fragment>
    
      <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" ,   width: "100%",
      height: "100%",
      background: "transparent", }}>
        <BreadCrumbHeader MainText={"Restaurant QSR"} />
        <Box
        sx={{
          borderRadius: "30px",
          background: "#fff",
          height: "auto",
          width: "auto",
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
                component="img"
                src={LeftArrow}
                alt="LeftArrow"
                sx={{
                  height: "10px",
                  width: "25px",
                  position: "absolute",
                  left: "0",
                  mt:1 ,
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/home/restaurant/restaurantgolive/" +id);

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

                          <Typography sx={tableHeader}>
                          {GetProductByIdData &&
                            GetProductByIdData.ProductDescription}
                        </Typography>
                          {/* <Box sx={{ display: "flex", gap: "10px" }}>
                            <Typography sx={available}>
                              Sample Available :
                            </Typography>
                            {samplestate ? (
                              <Typography
                                sx={{ ...available, fontWeight: 600 }}
                              >
                                Yes
                              </Typography>
                            ) : (
                              <Typography
                                sx={{ ...available, fontWeight: 600 }}
                              >
                                No
                              </Typography>
                            )}
                          </Box> */}
                        </Box>

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
                            <Typography sx={{...product , mt:2 , color: "#156DB6"}}>
                              Price & Availability
                            </Typography>
                            <DiscountedPrice
                              regularPrice={
                                GetProductByIdData &&
                                GetProductByIdData?.ProductsVariantions
                                  ?.length > 0 &&
                                GetProductByIdData?.ProductsVariantions[0]
                                  ?.PricePerUnit
                              }
                              discountPrice={
                                GetProductByIdData &&
                                GetProductByIdData?.ProductsVariantions
                                  ?.length > 0 &&
                                GetProductByIdData?.ProductsVariantions[0]
                                  ?.DiscountedPrice
                              }
                            />
                          </Box>
                        </Grid>

                        <Typography sx={{...semiSub , fontSize: "16px"}}>Available colors</Typography>
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
                              textAlign: "center",
                            }}
                          >
                          {/*    <Grid
                              item
                              xl={2.4}
                              lg={2.4}
                              md={2.4}
                              sm={2.4}
                              xs={2.4}
                            >
                            <Box sx={ProductVariationStyle}>
                                <Typography sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}>
                                  {" "}
                                  Available Sizes
                          </Typography> 
                              </Box> 
                              
                          </Grid> */}
                            <Grid
                              item
                              xl={2.4}
                              lg={2.4}
                              md={2.4}
                              sm={2.4}
                              xs={2.4}
                            >
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}>
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
                                <Typography sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}>
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
                                <Typography sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}>
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
                                <Typography  sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}>
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
                                 {/*     <Grid
                                        item
                                        xl={2.4}
                                        lg={2.4}
                                        md={2.4}
                                        sm={2.4}
                                        xs={2.4}
                                      >
                                        <Box sx={ProductVariationStyle}>
                                          <Typography  sx={{
                                            ...tableData,
                                            fontSize: "16px",
                                          }}>
                                            {res.ProductSize}
                                          </Typography>
                                        </Box>
                                        </Grid> */}
                                      <Grid
                                        item
                                        xl={2.4}
                                        lg={2.4}
                                        md={2.4}
                                        sm={2.4}
                                        xs={2.4}
                                      >
                                        <Box sx={ProductVariationStyle}>
                                          <Typography  sx={{
                                            ...tableData,
                                            fontSize: "16px",
                                          }}>
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
                                          <Typography  sx={{
                                            ...tableData,
                                            fontSize: "16px",
                                          }}>
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
                                          <Typography  sx={{
                                            ...tableData,
                                            fontSize: "16px",
                                          }}>
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
                                          <Typography  sx={{
                                            ...tableData,
                                            fontSize: "16px",
                                          }}>
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
                            Model Name
                          </Typography>

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
                              fontSize: "18px"
                            }}
                          >
                            Service Available
                          </Typography>

                          <Box>
                            {GetProductByIdData?.demoInstallation === "true" ? (
                              <Typography sx={{...available , 
                                fontWeight: 400,
                                fontSize: "16px",
                              }}>
                                demo & Installation : Yes
                              </Typography>
                            ) : (
                              <Typography sx={{...available , 
                                fontWeight: 400,
                                fontSize: "16px",
                              }}>
                                demo & Installation : No
                              </Typography>
                            )}
                          </Box>
                        </Box>


                        {  GetProductByIdData?.ProductsVariantions[0]
                          ?.sampleavailability === undefined ||   GetProductByIdData?.ProductsVariantions[0]
                          ?.sampleavailability === null ? null : (
                        <Box
                          mt={2}
                          sx={{
                            width: "60%",
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
                            Sample Details
                          </Typography>
                          <Grid
                            container
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={tableHeader}>
                                  Minimum Order Quantity
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={tableHeader}>
                                  {" "}
                                  Price of Sample
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
                              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={tableData}>
                                    {
                                      GetProductByIdData?.ProductsVariantions[0]
                                      ?.sampleavailability
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={tableData}>
                                    {
                                      GetProductByIdData?.ProductsVariantions[0]
                                        ?.priceofsample
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
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
                                          mt:1,
                                          width: "100%",
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


                        {GetProductByIdData?.OtherCost &&
                          GetProductByIdData?.OtherCost?.length !==
                            0 ? (
                            <Box mt={3}>
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
                                                  ...listText,
                                                  wordWrap:
                                                    "break-word",
                                                }}
                                              >
                                                {" "}
                                                {cost.ReasonOfCost}{" "}
                                              </Typography>
                                            </Box>
                                            <Box
                                              sx={{
                                                minWidth: "160px",
                                              }}
                                            >
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
                                            <Box
                                              sx={{
                                                minWidth: "160px",
                                              }}
                                            >
                                              <Typography
                                                sx={{
                                                  ...listText,
                                                  wordWrap:
                                                    "break-word",
                                                }}
                                              >
                                                GST - {cost.AdCostHSN} %
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

                      
                          {GetProductByIdData?.listperiod === undefined || GetProductByIdData?.listperiod === null ? null : (
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
                            Listed this product for
                          </Typography>

                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                          >
                            {GetProductByIdData?.listperiod}&nbsp; Days
                          </Typography>
                        </Box>
                        )}

                        <Box
                          mt={2}
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
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={{...tableHeader , color : "#6B7A99" , fontWeight : 600 ,   fontSize: "18px",}}>
                                  Manufacturing Date
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={{...tableHeader , color : "#6B7A99" , fontWeight : 600 ,   fontSize: "18px",}}>
                                  {" "}
                                  Expiry Date
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
                              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={{...tableData , color : "#ADB8CC" ,   fontSize: "14px",}}>
                                    {new Date(
                                      GetProductByIdData?.ManufacturingDate
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={{...tableData , color : "#ADB8CC" ,   fontSize: "14px",}}>
                                  {GetProductByIdData?.ExpiryDate ? (
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        color: "#ADB8CC",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {new Date(
                                        GetProductByIdData?.ExpiryDate
                                      ).toLocaleDateString()}
                                    </Typography>
                                  ) : (
                                    "Not Given"
                                  )}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>

                        <Typography sx={{...pack , color: "#156DB6" , mt:1}}>Technical Information</Typography>

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
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                              <Box sx={ProductVariationStyle}>
                                <Typography  sx={{
                                  ...tableHeader,
                                  fontSize: "18px",
                                  color: "#ADB8CC",
                                }}>
                                  Warranty
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography  sx={{
                                  ...tableHeader,
                                  fontSize: "18px",
                                  color: "#ADB8CC",
                                }}>
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
                              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography  sx={{
                                    ...tableData,
                                    color: "#6B7A99",
                                    fontSize: "14px",
                                  }}>
                                    {GetProductByIdData?.ProductTechInfo
                                      ?.Warranty +
                                      " " +
                                      GetProductByIdData?.WarrantyPeriod}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography  sx={{
                                    ...tableData,
                                    color: "#6B7A99",
                                    fontSize: "14px",
                                  }}>
                                    {GetProductByIdData?.ProductTechInfo
                                      ?.Guarantee +
                                      " " +
                                      GetProductByIdData?.WarrantyPeriod}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
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
                            }}
                          >
                            Packaging Information
                          </Typography>

                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                          ></Typography>
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
                            const newVal = Number(val.val).toFixed(2);
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
                                      ? newVal + " kg"
                                      : newVal + " cm"}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
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

                        <Box>
                          <Typography sx={{...pack, color: "#156DB6" ,  mt:2}}>Key Features</Typography>
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
                      </Grid>
                    </TabPanel>

                    <TabPanel value="2">
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                        }}
                      >
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
                            <Typography sx={{...product , color: "#156DB6"}}>
                              Price & Availability
                            </Typography>
                            <DiscountedPrice
                              regularPrice={
                                GetProductByIdData &&
                                GetProductByIdData?.ProductsVariantions
                                  ?.length > 0 &&
                                GetProductByIdData?.ProductsVariantions[0]
                                  ?.PricePerUnit
                              }
                              discountPrice={
                                GetProductByIdData &&
                                GetProductByIdData?.ProductsVariantions
                                  ?.length > 0 &&
                                GetProductByIdData?.ProductsVariantions[0]
                                  ?.DiscountedPrice
                              }
                            />
                          </Box>
                        </Grid>

                        <Typography sx={{...semiSub , fontSize: "16px"}}>Available colors</Typography>
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
                              textAlign: "center",
                            }}
                          >
                      {/*      <Grid
                              item
                              xl={2.4}
                              lg={2.4}
                              md={2.4}
                              sm={2.4}
                              xs={2.4}
                            >
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}>
                                  {" "}
                                  Available Sizes
                                </Typography>
                              </Box>
                          </Grid> */}
                            <Grid
                              item
                              xl={2.4}
                              lg={2.4}
                              md={2.4}
                              sm={2.4}
                              xs={2.4}
                            >
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}>
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
                                <Typography sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}>
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
                                <Typography sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}>
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
                                <Typography sx={{ ...tableHeader, fontSize: "16px" ,   fontWeight: 600,  }}>
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

                                  {/*    <Grid
                                        item
                                        xl={2.4}
                                        lg={2.4}
                                        md={2.4}
                                        sm={2.4}
                                        xs={2.4}
                                      >
                                        <Box sx={ProductVariationStyle}>
                                          <Typography  sx={{
                                            ...tableData,
                                            fontSize: "16px",
                                          }}>
                                            {res.ProductSize}
                                          </Typography>
                                        </Box>
                                        </Grid> */}
                                      <Grid
                                        item
                                        xl={2.4}
                                        lg={2.4}
                                        md={2.4}
                                        sm={2.4}
                                        xs={2.4}
                                      >
                                        <Box sx={ProductVariationStyle}>
                                          <Typography  sx={{
                                            ...tableData,
                                            fontSize: "16px",
                                          }}>
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
                                          <Typography  sx={{
                                            ...tableData,
                                            fontSize: "16px",
                                          }}>
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
                                          <Typography  sx={{
                                            ...tableData,
                                            fontSize: "16px",
                                          }}>
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
                                          <Typography  sx={{
                                            ...tableData,
                                            fontSize: "16px",
                                          }}>
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
                            Model Name
                          </Typography>

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
                              fontSize: "18px"
                            }}
                          >
                            Service Available
                          </Typography>

                          <Box>
                            {GetProductByIdData?.demoInstallation === "true" ? (
                              <Typography sx={{...available , 
                                fontWeight: 400,
                                fontSize: "16px",}}>
                                demo & Installation : Yes
                              </Typography>
                            ) : (
                              <Typography sx={{...available , 
                                fontWeight: 400,
                                fontSize: "16px",}}>
                                demo & Installation : No
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        {  GetProductByIdData?.ProductsVariantions[0]
                          ?.sampleavailability === undefined ||   GetProductByIdData?.ProductsVariantions[0]
                          ?.sampleavailability === null ? null : (
                        <Box
                          mt={2}
                          sx={{
                            width: "60%",
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
                            Sample Details
                          </Typography>
                          <Grid
                            container
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={tableHeader}>
                                  Minimum Order Quantity
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={tableHeader}>
                                  {" "}
                                  Price of Sample
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
                              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={tableData}>
                                    {
                                      GetProductByIdData?.ProductsVariantions[0]
                                      ?.sampleavailability
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={tableData}>
                                    {
                                      GetProductByIdData?.ProductsVariantions[0]
                                        ?.priceofsample
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
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

                         {GetProductByIdData?.OtherCost &&
                          GetProductByIdData?.OtherCost?.length !==
                            0 ? (
                            <Box mt={3}>
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
                                                  ...listText,
                                                  wordWrap:
                                                    "break-word",
                                                }}
                                              >
                                                {" "}
                                                {cost.ReasonOfCost}{" "}
                                              </Typography>
                                            </Box>
                                            <Box
                                              sx={{
                                                minWidth: "160px",
                                              }}
                                            >
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
                                            <Box
                                              sx={{
                                                minWidth: "160px",
                                              }}
                                            >
                                              <Typography
                                                sx={{
                                                  ...listText,
                                                  wordWrap:
                                                    "break-word",
                                                }}
                                              >
                                                GST - {cost.AdCostHSN} %
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
                       

{GetProductByIdData?.listperiod === undefined  || GetProductByIdData?.listperiod === null ? null : (
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
                              fontWeight: 600,
                              color: "#6B7A99",
                            }}
                          >
                            Listed this product for
                          </Typography>

                          <Typography
                            sx={{
                              ...packHead,
                              color: "#6B7A99",
                              fontWeight: 400,
                              fontSize: "16px",
                            }}
                          >
                            {GetProductByIdData?.listperiod}
                          </Typography>
                        </Box>
                        )}

                        <Box
                          mt={2}
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
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={{...tableHeader , color : "#6B7A99" , fontWeight : 600 ,   fontSize: "18px",}}>
                                  Manufacturing Date
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography sx={{...tableHeader , color : "#6B7A99" , fontWeight : 600 ,   fontSize: "18px",}}>
                                  {" "}
                                  Expiry Date
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
                              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={{...tableData , color : "#ADB8CC" ,   fontSize: "14px",}}>
                                    {new Date(
                                      GetProductByIdData?.ManufacturingDate
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography sx={{...tableData , color : "#ADB8CC" ,   fontSize: "14px",}}>
                                  {GetProductByIdData?.ExpiryDate ? (
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        color: "#ADB8CC",
                                        fontSize: "14px",
                                      }}
                                    >
                                      {new Date(
                                        GetProductByIdData?.ExpiryDate
                                      ).toLocaleDateString()}
                                    </Typography>
                                  ) : (
                                    "Not Given"
                                  )}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Grid>
                    </TabPanel>
                    <TabPanel value="3">
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
                          <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                            <Box sx={ProductVariationStyle}>
                              <Typography  sx={{
                                ...tableHeader,
                                fontSize: "18px",
                                color: "#ADB8CC",
                              }}>Warranty</Typography>
                            </Box>
                          </Grid>
                          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                            <Box sx={ProductVariationStyle}>
                              <Typography  sx={{
                                ...tableHeader,
                                fontSize: "18px",
                                color: "#ADB8CC",
                              }}>
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
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                              <Box sx={ProductVariationStyle}>
                                <Typography  sx={{
                                  ...tableData,
                                  color: "#6B7A99",
                                  fontSize: "14px",
                                }}>
                                {GetProductByIdData?.ProductTechInfo
                                  ?.Warranty +
                                  " " +
                                  GetProductByIdData?.WarrantyPeriod}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography  sx={{
                                  ...tableData,
                                  color: "#6B7A99",
                                  fontSize: "14px",
                                }}>
                                {GetProductByIdData?.ProductTechInfo
                                  ?.Guarantee +
                                  " " +
                                  GetProductByIdData?.WarrantyPeriod}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
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
                          }}
                        >
                          Packaging Information
                        </Typography>
                      </Box>

                      <Box
                        mt={3}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        {technicalinfo?.map((val) => {
                          const newVal = Number(val.val).toFixed(2);
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
                                    ? newVal + " kg"
                                    : newVal + " cm"}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })}
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
                    </TabPanel>
                    <TabPanel value="4">
                      <Box>
                        <Typography sx={{...pack,color: "#156DB6" }}>Key Features</Typography>
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
        </Box>
      </Paper>
    </React.Fragment>
  );
};

export default RestaurantProductPreview;

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
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
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
