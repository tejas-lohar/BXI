import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Tab,
  Select,
  MenuItem,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Input,
  InputLabel,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PDFIcon from "../../../assets/pdficon.png";

import axios from "axios";
import { useMutation } from "react-query";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import LeftArrow from "../../assets/Images/payment/LeftArrow.svg";
import LeftArrow from "../../../assets/Images/payment/LeftArrow.png";
import { styles } from "../../../components/common/voucherTemplates/styles/commonStyles";

import { useGetAllCartVouchers } from "../../../Hooks/VoucherActions/useGetAllCartVouchers";
// import Weight from "../..///assets/Images/Weight.svg";
import Weight from "../../../assets/Images/Weight.svg";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { GetProductByIdAction } from "../../../redux/action/ProductActions/GetProductByIdAction";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import { toast, ToastContainer } from "react-toastify";
import { useProductAddToCart } from "../../../Hooks/ProductActions/useProductAddToCart";
import VoucherPageHeader from "../../../components/VoucherPageHeader";
import CarouselforApperal from "../../../components/Carousel/CarouselforApperal";
// import axios from "axios";
import { useGetCartData } from "../../../Hooks/ProductActions/useGetCartData";
import { useAddToWishlist } from "../../../Hooks/ProductActions/useAddToWishlist";
import { useRemoveWishlistProductByProductId } from "../../../Hooks/ProductActions/useRemoveWishlistProduct";
import CarasoulForVoucherDetails from "../../../components/Carousel/CarasoulForVoucherDetails";
import SelectedImg from "../../../assets/Images/CommonImages/Selected.png";
import UnSelectedImg from "../../../assets/Images/CommonImages/Unselected.png";
import FeatureName from "../../../components/FeatureName";

import CarasoulForProductDetails from "../../../components/Carousel/CarasoulForProductDetails";
import PageLoader from "../../../components/LoadingButton/PageLoader";
import useGetProductById from "../../../Hooks/ProductActions/useGetProductById";
import useGetCompanyTypeData from "../../../Hooks/CompanyData/useGetCompanyTypeData";
import { useGetVoucherCartData } from "../../../Hooks/ProductActions/useGetCartData";
import { ProductAnalysisUpdate } from "../../../redux/action/Products/ProductAnalysis";

// import
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
          justifyContent: "space-between",
          flexDirection: "row",
          width: "200px",
          mt: "15px",
          gap: "5px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "24px",
            lineHeight: "10px",
            letterSpacing: "0.06em",
            textTransform: "capitalize",

            color: "#DC3737",
          }}
        >
          -{formattedDiscountPercent}%
        </Typography>
        {/* <Box sx={{ display: "flex" }}> */}
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "10px",
            letterSpacing: "0.06em",
            textTransform: "capitalize",
            color: "#6B7A99",
          }}
        >
          <Box sx={{ display: "flex", gap: "5px" }}>
            {discountPrice}{" "}
            <img
              src={BXITokenIcon}
              style={{
                width: "25px",
                height: "auto",
                marginTop: "-8px",
              }}
            />
          </Box>
        </Typography>
        {/* </Box> */}
      </Box>
      <Typography
        sx={{
          color: "#4C4C4C",
          fontSize: "12px",
          fontFamily: "Poppins",
          fontWeight: 300,
          lineHeight: "10px",
          letterSpacing: "0.06em",
          textTransform: "capitalize",
          mt: 1,
          color: "#6B7A99",
          textDecoration: "line-through",
        }}
      >
        MRP: {regularPrice}
      </Typography>
    </div>
  );
}
const ProductDetails = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let ProductId = id;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const [currentImage, setCurrentImage] = useState(0);
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [showSizechart, setShowSizechart] = useState(false);
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();
  const [VariationToMap, setVariationToMap] = useState();
  const [WishlistData, setWishlistData] = useState();
  const [open, setOpen] = React.useState(false);
  const [messageOption, setMessageOption] = useState("");
  const [IsSample, setIsSample] = useState("");
  const [CustomQuantity, setCustomQty] = useState(0);
  const [VoucherCartadata, setVoucherCartData] = useState();
  // const LocationData = useLocation();
  // console.log("LocationData", LocationData?.state?.type);
  const [color, setColor] = useState("");
  const { data: cartItems, refetch: cartRefetch } = useGetCartData();
  const [storeVariationData, setStoreVariationData] = useState();
  const [borderColor, setBorderColor] = useState(true);

  let minValue = 0;
  let maxValue = 0;

  async function getVoucherCartData() {
    await axios
      .get("voucher/get_cart_vouchers", {
        withCredentials: true,
      })
      .then((res) => {
        setVoucherCartData(res?.data);
      })
      .then((res) => {
        console.log("res", res);
      });
  }

  const {
    data: Productdata,
    isLoading: DataLoading,
    error: DataError,
    refetch: ProductRefetch,
  } = useGetProductById(id);

  const {
    data: CompanyTypeData,
    isLoading: CompanyTypeLoading,
    error: CompanyTypeError,
    refetch: CompanyTypeRefetch,
  } = useGetCompanyTypeData(Productdata?.ProductType);

  const { data: voucherCartItems, refetch: voucherCartRefetch } =
    useGetVoucherCartData();

  async function GetProductByid() {
    await axios
      .get(`product/get_product_byId/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setGetProductByIdData(res?.data);
        setStoreTechnicalInfo(res?.data?.ProductFeatures);
        setStoreVariationData(res?.data?.ProductsVariantions[0]);
      });
  }
  useEffect(() => {
    GetProductByid();
  }, []);

  // const { GetProductByIdDatas } = useSelector((state) => state?.GetProductById);
  const classes = styles();

  const [like, setLike] = useState(false);
  let ColorData = {};
  GetProductByIdData?.ProductsVariantions?.map((item, index) => {
    if (index === 0) {
      ColorData = item;
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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

  let samplestate = false;
  GetProductByIdData?.ProductsVariantions?.map((item, index) => {
    if (item.sampleavailability) {
      return (samplestate = true);
    } else {
      return (samplestate = false);
    }
  });

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

  useEffect(() => {
    GetProductByid();
    getVoucherCartData();
  }, []);

  const GetProductShareLink = async (id) => {
    toast.info("Url Copied", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(
      `https://barter-dev-v2.web.app/home/appreal` + `/${id}`
    );
  };

  const {
    data: mutateWishlistData,
    mutate: addtowishlist,
    isLoading: wishlistMutateLoading,
    error: wishlistMutateError,
  } = useAddToWishlist();

  const { data: mutateRemoveWishlistData, mutate: removefromwishlist } =
    useRemoveWishlistProductByProductId();

  async function fetWishlistData() {
    await axios
      .get("wishlist/get_wishlist_product", {
        withCredentials: true,
      })
      .then((res) => {
        setWishlistData(res?.data);
      });
  }

  async function handleAddToWishlist(id) {
    addtowishlist(id);
    setLike(true);
  }

  useEffect(() => {
    fetWishlistData();
  }, []);

  async function handleRemoveWishlist(id) {
    removefromwishlist(id);
    setLike(false);
  }

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

  GetProductByIdData?.ProductsVariantions?.map((res, idx) => {
    if (res?._id === storeVariationData) {
      maxValue = res?.MaxOrderQuantity;
      return res.MaxOrderQuantity;
    }
  });

  let ObjectForAddToCart = {
    ProductVariationId: storeVariationData,
    IsSample: IsSample ? true : false,
    ProductQty: !IsSample ? CustomQuantity : null,
    ProductId: ProductId,
    IsMedia: false,
  };
  async function handleAddToCart() {
    if (CustomQuantity < minValue) {
      toast.error("Selected quanity is less that Min Order Quantity", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (CustomQuantity === 0) {
      toast.error("Please select Qty to continue", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (CustomQuantity > maxValue) {
      toast.error("Selected quanity is Greater that Max Order Quantity", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      await axios
        .post(
          "voucher/add_voucher_tocart",
          { ObjectForAddToCart },
          {
            withCredentials: true,
          }
        )
        .then((res) => {

          dispatch(ProductAnalysisUpdate(ProductId, "", "ProductAddToCardCount"))
          getVoucherCartData();
          toast.success("Voucher Succefully Added to cart", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          voucherCartRefetch();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  //  fetch product type data

  if (GetProductByIdData === undefined) {
    return <PageLoader />;
  }

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "https://www.africau.edu/images/default/sample.pdf";
    link.download = "user-manuel.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  // ProductData.redemptionType
  const getRedimptionType = () => {
    switch (GetProductByIdData?.redemptionType) {
      case "online":
        return "Online";
      case "offline":
        return "Offline";
      case "both":
        return "Online and Offline";
      default:
        return "-";
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
              justifyContent: "space-between",
              textAlign: "center",
              width: "95%",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                width: "100%",
                mx: "auto",
                height: "70px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <VoucherPageHeader />
            </Box>
          </Box>
          <Grid
            container
            sx={{
              width: "100%",
              mx: "auto",
              mt: 0,
              display: "flex",
            }}
          >
            {console.log("GetProductByIdData?.files", GetProductByIdData)}
            <Grid
              item
              xl={5.5}
              lg={5.5}
              md={5.5}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                {GetProductByIdData?.ProductImages &&
                  GetProductByIdData.ProductImages.length > 0 && (
                    <CarasoulForVoucherDetails
                      imgSrc={GetProductByIdData?.ProductImages}
                    />
                  )}
              </Box>
            </Grid>
            <Grid item xl={0.5} lg={0.5} md={0.5} sm={12} xs={12}></Grid>
            <Grid
              item
              xl={6}
              lg={6}
              md={6}
              sm={12}
              xs={12}
              sx={{ ...fixGrid, mt: 0 }}
            >
              <Box sx={{ marginTop: "20px" }}>
                <Typography sx={semi}>
                  {GetProductByIdData?.ProductName}
                </Typography>
                <Typography
                  sx={{
                    ...semi,
                    color: "#6B7A99",
                    textAlign: "justify",
                    fontSize: "13px",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                  }}
                >
                  {GetProductByIdData?.SellerCompanyName}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "24px",
                    lineHeight: "10px",
                    letterSpacing: "0.06em",
                    textTransform: "capitalize",
                    color: "#6B7A99",
                    mt: "20px",
                  }}
                >
                  <Box sx={{ display: "flex", gap: "5px" }}>
                    {priceone}{" "}
                    <img
                      src={BXITokenIcon}
                      style={{
                        width: "25px",
                        height: "auto",
                        marginTop: "-8px",
                      }}
                    />
                  </Box>
                </Typography>

                <Box sx={{ display: "flex", gap: "100px" }}>
                  <Box>
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
                        width: "100%",
                        overflow: "auto",
                        "::-webkit-scrollbar": {
                          mt: 1,
                          display: "flex",
                          height: "4px",
                        },
                      }}
                    >
                      {GetProductByIdData &&
                        NewdataArray?.map((res, idx) => {
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
                                  xl: "25%",
                                  lg: "25%",
                                  md: "25%",
                                  sm: "5%",
                                  xs: "13%",
                                },
                                mb: 1,
                                ml: 1,
                                height: "100%",
                                minHeight: "35px",
                                maxWidth: "25%",
                                minWidth: "25%",
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
                                    ? "2px solid #000"
                                    : "2px solid lightgray",
                              }}
                            ></Box>
                          );
                        })}
                    </Box>
                  </Box>
                  <Box>
                    {GetProductByIdData?.gender === null ||
                    GetProductByIdData?.gender === undefined ? null : (
                      <Box>
                        <Typography sx={semiSub}>Gender</Typography>
                        <Typography
                          sx={{
                            ...tableData,
                            textAlign: "start",
                            lineHeight: "4rem",
                            color: "#B1B1B1",
                          }}
                        >
                          {GetProductByIdData?.gender}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box
                  mt={2}
                  sx={{
                    width: "100%",
                    mx: "auto",
                    overflow: "hidden",
                  }}
                >
                  <TableContainer sx={{ overflow: "hidden" }}>
                    <Table sx={{ overflow: "hidden" }}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ borderBottom: "none" }}>
                            <Typography
                              sx={{ ...tableHeader, marginLeft: "-15px" }}
                            >
                              Sizes
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              width: "120px",
                            }}
                          >
                            <Typography sx={tableHeader}>Min QTY</Typography>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "none", width: "120px" }}
                          >
                            <Typography sx={tableHeader}>Max QTY</Typography>
                          </TableCell>
                          <TableCell
                            sx={{ borderBottom: "none", width: "120px" }}
                          >
                            <Typography sx={tableHeader}>
                              GST/Product{" "}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ p: 0 }}>
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              width: "200px",
                              height: "40px",
                              p: 0,
                            }}
                          >
                            <Select
                              sx={{
                                width: "180px",
                                marginLeft: "0px",
                                marginRight: "auto",
                                height: "40px",
                                marginTop: "0px",
                                border: "none",
                                borderRadius: "10px",
                                cursor: "pointer",
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "1px solid #000",
                                  },
                              }}
                              defaultValue={"hello"}
                              onChange={(e) => {
                                setStoreVariationData(e.target.value);
                                setIsSample(false);
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
                          </TableCell>
                          {GetProductByIdData?.ProductsVariantions?.map(
                            (res, idx) => {
                              if (res?._id === storeVariationData) {
                                minValue = res.MinOrderQuantity;
                                return (
                                  <TableCell
                                    sx={{
                                      borderBottom: "none",
                                      px: 2,
                                      py: 0,
                                      width: "120px",
                                    }}
                                    align="center"
                                  >
                                    <Typography sx={tableData}>
                                      {res.MinOrderQuantity}
                                    </Typography>
                                  </TableCell>
                                );
                              }
                            }
                          )}
                          {GetProductByIdData?.ProductsVariantions?.map(
                            (res, idx) => {
                              if (res?._id === storeVariationData) {
                                maxValue = res?.MaxOrderQuantity;
                                return (
                                  <TableCell
                                    sx={{
                                      borderBottom: "none",
                                      px: 2,
                                      py: 0,
                                      width: "120px",
                                    }}
                                  >
                                    <Typography sx={tableData}>
                                      {res.MaxOrderQuantity}
                                    </Typography>
                                  </TableCell>
                                );
                              }
                            }
                          )}
                          {GetProductByIdData?.ProductsVariantions?.map(
                            (res, idx) => {
                              if (res?._id === storeVariationData) {
                                return (
                                  <TableCell
                                    sx={{
                                      borderBottom: "none",
                                      px: 2,
                                      py: 0,
                                      width: "120px",
                                    }}
                                  >
                                    <Typography sx={tableData}>
                                      {" "}
                                      {
                                        GetProductByIdData
                                          .ProductsVariantions[0].GST
                                      }
                                      &nbsp;%
                                    </Typography>
                                  </TableCell>
                                );
                              }
                            }
                          )}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: "45px",
                    mt: "40px",
                  }}
                >
                  <Box>
                    <InputLabel
                      sx={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#6B7A99",
                      }}
                    >
                      Add Quantity
                    </InputLabel>
                    <Input
                      disableUnderline
                      onWheel={numberInputOnWheelPreventChange}
                      sx={{
                        ...tableData,
                        mt: 1,
                        width: "186px",
                        height: "42px",
                        background: "#fff",
                        border: "1px solid #000",
                        borderRadius: "8px",
                        textAlign: "center",
                        px: 2,
                      }}
                      value={CustomQuantity}
                      onChange={(e) => setCustomQty(e.target.value)}
                      type="number"
                      inputProps={{
                        min: minValue,
                        max: maxValue,
                      }}
                    />
                  </Box>
                  <Box>
                    <InputLabel
                      sx={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#6B7A99",
                      }}
                    >
                      Total Price
                    </InputLabel>
                    <Box
                      sx={{
                        mt: 1,
                        width: "140px",
                        height: "42px",
                        background: "#F4F4F4",
                        borderRadius: "6px",
                        textAlign: "center",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",

                        px: 2,
                      }}
                    >
                      {GetProductByIdData?.ProductsVariantions?.map(
                        (res, idx) => {
                          if (res?._id === storeVariationData) {
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-evenly",
                                  width: "100px",
                                  alignContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={{ ...tableData, color: "#B1B1B1" }}
                                >
                                  {CustomQuantity
                                    ? res?.DiscountedPrice * CustomQuantity
                                    : 0}{" "}
                                </Typography>
                                <img
                                  src={BXITokenIcon}
                                  style={{
                                    widows: "20px",
                                    height: "15px",
                                    width: "15px",
                                  }}
                                />
                              </Box>
                            );
                          }
                        }
                      )}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                    borderTop: "2px solid #EEEEEE",
                    mt: "15px",
                    pt: "10px",
                  }}
                >
                  {/* <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                    }}
                  >
                    <Typography sx={find} onClick={handleDownload}>
                      Download user Manuel{" "}
                    </Typography>
                    {GetProductByIdData?.SizeChart === null ||
                    !GetProductByIdData?.SizeChart ? null : (
                      <Box
                        component={"a"}
                        download="sizechart"
                        target="_blank"
                        href={GetProductByIdData?.SizeChart?.url}
                        onClick={() => {
                          console.log(
                            "download",
                            GetProductByIdData?.SizeChart?.url
                          );
                        }}
                        sx={find}
                      >
                        Download Size Chart
                      </Box>
                    )}
                   
                  </Box> */}
                  <Box>
                    {GetProductByIdData?.ProductsVariantions[0]
                      ?.PriceOfSample ? (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            gap: "10px",
                            alignItems: "center",
                          }}
                        >
                          {!IsSample ? (
                            <Box
                              component="img"
                              src={UnSelectedImg}
                              sx={{
                                width: "18px",
                                height: "18px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsSample(true)}
                            ></Box>
                          ) : (
                            <Box
                              component="img"
                              src={SelectedImg}
                              sx={{
                                width: "18px",
                                height: "18px",
                                cursor: "pointer",
                              }}
                              onClick={() => setIsSample(false)}
                            ></Box>
                          )}
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: "16px",
                              lineHeight: "24px",
                              color: "#6B7A99",
                            }}
                          >
                            Do you want to first try a product sample ?
                          </Typography>
                        </Box>
                      </>
                    ) : null}
                  </Box>
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
                      {/* main container for Desc section starts */}
                      <Box>
                        {/* general info section starts */}
                        <Box style={{ marginBottom: "25px" }}>
                          <Typography sx={detailsText}>
                            {GetProductByIdData?.ProductName}
                          </Typography>
                          <Typography className={classes.titleDesc}>
                            {GetProductByIdData?.ProductSubtitle}
                          </Typography>
                          <Typography className={classes.titleDesc}>
                            {GetProductByIdData?.ProductDescription}
                          </Typography>
                        </Box>
                        {/* general info section ends */}

                        {/* tech info section starts */}
                        <Box style={{ marginBottom: "25px" }}>
                          <Typography sx={detailsText}>
                            Store Details
                          </Typography>

                          {GetProductByIdData?.redemptionType &&
                            (GetProductByIdData.redemptionType == "offline" ||
                              GetProductByIdData.redemptionType == "both") && (
                              <>
                                {GetProductByIdData?.Area === null ||
                                GetProductByIdData?.Area ===
                                  undefined ? null : (
                                  <Box style={{ marginBottom: "10px" }}>
                                    <Typography sx={storeText}>
                                      Store Address
                                    </Typography>
                                    <Typography className={classes.titleDesc}>
                                      {GetProductByIdData?.Address},&nbsp;
                                      {GetProductByIdData?.Area},&nbsp;
                                      {GetProductByIdData?.Landmark},&nbsp;
                                      {GetProductByIdData?.City},&nbsp;
                                      {GetProductByIdData?.State}
                                    </Typography>
                                  </Box>
                                )}
                                {/* <Box
                                  sx={{ width: "650px", marginBottom: "10px" }}
                                >
                                  <table style={{ width: "100%" }}>
                                    <thead>
                                      <tr>
                                        <td className={classes.subTitle}>
                                          Area{" "}
                                        </td>
                                        <td className={classes.subTitle}>
                                          Landmark{" "}
                                        </td>
                                        <td className={classes.subTitle}>
                                          City{" "}
                                        </td>
                                        <td className={classes.subTitle}>
                                          State{" "}
                                        </td>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className={classes.titleDesc}>
                                          {GetProductByIdData?.Area}{" "}
                                        </td>
                                        <td className={classes.titleDesc}>
                                          {GetProductByIdData?.Landmark}{" "}
                                        </td>
                                        <td className={classes.titleDesc}>
                                          {GetProductByIdData?.City}{" "}
                                        </td>
                                        <td className={classes.titleDesc}>
                                          {GetProductByIdData?.State}{" "}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </Box> */}

                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "60%",
                                  }}
                                >
                                  <Box>
                                    <Typography sx={locationHeader}>
                                      Area
                                    </Typography>
                                    <Typography sx={locationData}>
                                      {GetProductByIdData?.Area}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography sx={locationHeader}>
                                      Landmark
                                    </Typography>
                                    <Typography sx={locationData}>
                                      {GetProductByIdData?.Landmark}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography sx={locationHeader}>
                                      City
                                    </Typography>
                                    <Typography sx={locationData}>
                                      {GetProductByIdData?.City}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography sx={locationHeader}>
                                      State
                                    </Typography>
                                    <Typography sx={locationData}>
                                      {GetProductByIdData?.State}
                                    </Typography>
                                  </Box>
                                </Box>

                                {GetProductByIdData?.HotelsListUrls &&
                                  GetProductByIdData?.HotelsListUrls.length >
                                    0 && (
                                    <Box style={{ marginTop: "20px" }}>
                                      <Typography className={classes.subTitle}>
                                        Store List
                                      </Typography>
                                      <Box
                                        component={"a"}
                                        download="hotelsList"
                                        target="_blank"
                                        href={
                                          GetProductByIdData?.HotelsListUrls &&
                                          GetProductByIdData?.HotelsListUrls[0]
                                            ?.url
                                            ? GetProductByIdData
                                                .HotelsListUrls[0].url
                                            : null
                                        }
                                        onClick={() => {
                                          console.log("download excel");
                                        }}
                                        sx={CommonTypoStyle2}
                                        style={{
                                          marginTop: "5px",
                                          display: "flex",
                                        }}
                                      >
                                        <img
                                          src={PDFIcon}
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            marginRight: "10px",
                                          }}
                                          alt=""
                                        />
                                        click to download
                                      </Box>
                                    </Box>
                                  )}
                              </>
                            )}

                          {GetProductByIdData?.redemptionType &&
                            GetProductByIdData.redemptionType == "online" && (
                              <>
                                <Box style={{ marginTop: "20px" }}>
                                  <Typography className={classes.subTitle}>
                                    Store Link
                                  </Typography>
                                  <a
                                    // className={classes.titleDesc}
                                    style={{
                                      color: "#445FD2",
                                      textAlign: "justify",
                                      fontSize: 12,
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      lineHeight: "normal",
                                    }}
                                    target="_blank"
                                    href={
                                      GetProductByIdData?.Link
                                        ? GetProductByIdData?.Link
                                        : ""
                                    }
                                  >
                                    {GetProductByIdData?.Link
                                      ? GetProductByIdData?.Link
                                      : ""}
                                  </a>
                                </Box>
                              </>
                            )}

                          <Box style={{ marginTop: "20px", width: "650px" }}>
                            <table style={{ width: "100%" }}>
                              <thead>
                                <tr>
                                  <td className={classes.subTitle}>
                                    Redemption Type
                                  </td>
                                  <td className={classes.subTitle}>
                                    Listed this Product for
                                  </td>
                                  {localStorage.getItem("companyType") ===
                                    "Textile" && (
                                    <td className={classes.subTitle}>Gender</td>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className={classes.titleDesc}>
                                    {getRedimptionType()}
                                  </td>
                                  <td className={classes.titleDesc}>
                                    {
                                      GetProductByIdData?.ListThisProductForAmount
                                    }{" "}
                                    {
                                      GetProductByIdData?.ListThisProductForUnitOfTime
                                    }{" "}
                                  </td>
                                  {localStorage.getItem("companyType") ===
                                    "Textile" && (
                                    <td className={classes.titleDesc}>
                                      {GetProductByIdData?.gender}
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </Box>
                        </Box>
                        {/* tech info section ends */}

                        {/* additional section starts */}
                        {GetProductByIdData?.OtherCost?.length > 0 && (
                          <Box style={{ marginBottom: "20px" }}>
                            <Typography className={classes.sectionTitle}>
                              Additional Cost
                            </Typography>
                            {GetProductByIdData.OtherCost.map((item, i) => {
                              return (
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "650px",
                                  }}
                                >
                                  {item?.AdCostApplicableOn && (
                                    <Typography
                                      className={classes.titleDesc}
                                      style={{ color: "#6B7A99" }}
                                    >
                                      {" "}
                                      {item.AdCostApplicableOn}{" "}
                                    </Typography>
                                  )}
                                  <Typography
                                    className={classes.titleDesc}
                                    style={{ color: "#6B7A99" }}
                                  >
                                    {" "}
                                    {item.ReasonOfCost}{" "}
                                  </Typography>

                                  {item?.AdCostHSN && (
                                    <Typography
                                      className={classes.titleDesc}
                                      style={{ color: "#6B7A99" }}
                                    >
                                      {" "}
                                      HSN - {item.AdCostHSN}{" "}
                                    </Typography>
                                  )}

                                  {item?.AdCostGST && (
                                    <Typography
                                      className={classes.titleDesc}
                                      style={{ color: "#6B7A99" }}
                                    >
                                      GST - {item.AdCostGST} %{" "}
                                    </Typography>
                                  )}

                                  <Typography
                                    className={classes.titleDesc}
                                    style={{
                                      color: "#445FD2 !important",
                                      fontWeight: "600 !important",
                                    }}
                                  >
                                    {" "}
                                    {item.CostPrice}&nbsp;{item.currencyType}
                                  </Typography>
                                </Box>
                              );
                            })}
                          </Box>
                        )}
                        {/* additional section ends */}
                      </Box>

                      {/* main container for Desc section ends */}
                    </TabPanel>
                    <TabPanel value="2">
                      <Box>
                        <Typography className={classes.subTitle}>
                          Inclusion
                        </Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots} className={classes.titleDesc}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {GetProductByIdData?.Inclusions}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography className={classes.subTitle}>
                          Exclusion
                        </Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots} className={classes.titleDesc}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {GetProductByIdData?.Exclusions}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography className={classes.subTitle}>
                          Terms & Conditions
                        </Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots} className={classes.titleDesc}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {GetProductByIdData?.TermConditions}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Typography className={classes.subTitle}>
                          Redemption Steps
                        </Typography>
                        <Box sx={{ padding: "10px" }}>
                          <Typography sx={dots} className={classes.titleDesc}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {GetProductByIdData?.RedemptionSteps}
                          </Typography>
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
                            {GetProductByIdData?.ProductFeatures?.map((res) => {
                              return (
                                <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                                  <Box
                                    sx={{
                                      // px: 2,
                                      display: "flex",
                                      // flexWrap: "wrap",
                                      textAlign: "start",
                                      flexDirection: "row",
                                      gap: "70px",
                                      mt: 1,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: "10px",
                                        width: "100%",
                                      }}
                                    >
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
                  </Box>
                </TabContext>
                {/* <Box sx={{ pt: "2%" }}>
                  <Button sx={ButtonCss} onClick={uploadProduct}>
                    Upload Voucher
                  </Button>
                </Box> */}
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ width: "95%", mx: "auto", mt: 2 }}>
            {VoucherCartadata?.find(
              (item) => item?.ProductId?._id === ProductId
            ) ? (
              <Button sx={uploadBtn} onClick={() => navigate("/home/cart")}>
                Go To Cart
              </Button>
            ) : (
              <Button sx={uploadBtn} onClick={handleAddToCart}>
                Add To Cart
              </Button>
            )}
          </Box>
        </Paper>
      </Paper>
    </React.Fragment>
  );
};

export default ProductDetails;

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
  fontWeight: 500,
  fontSize: {
    xl: "14px",
    lg: "14px",
    md: "14px",
    sm: "14px",
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
  color: "#445FD2",
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
  color: "#445FD2",
  cursor: "pointer",
};
// const HeaderIconStyle = {
//   border: "1px solid #8C8C8C",
//   borderRadius: "6px",
//   height: "30px",
//   width: "30px",
//   padding: {
//     xl: "14px",
//     lg: "12px",
//     md: "10px",
//     sm: "8px",
//     xs: "8px",
//   },
// };
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
  fontWeight: 600,
  fontSize: {
    xl: "20px",
    lg: "20px",
    md: "1.6rem",
    sm: "1.5rem",
    xs: "1.5rem",
  },
  color: "#6B7A99",
};

const CommonTypoStyle2 = {
  marginTop: "1%",
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

const product = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "2rem",
    lg: "2rem",
    md: "2rem",
    sm: "2rem",
    xs: "2rem",
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

const detailsText = {
  color: "#6B7A99",
  fontSize: 20,
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
};

const storeText = {
  color: "#6B7A99",
  textAlign: "justify",
  fontSize: 16,
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
};

const locationHeader = {
  color: "#6B7A99",
  fontSize: "16px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "30px",
};

const locationData = {
  color: "#B1B1B1",
  fontSize: 14,
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
};
