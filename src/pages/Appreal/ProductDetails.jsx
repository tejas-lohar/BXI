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
import axios from "axios";
import { useMutation } from "react-query";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import LeftArrow from "../../assets/Images/payment/LeftArrow.svg";
import LeftArrow from "../../assets/Images/payment/LeftArrow.png";

import Weight from "../../assets/Images/Weight.svg";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { GetProductByIdAction } from "../../redux/action/ProductActions/GetProductByIdAction";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import BXITokenIcon from "../../assets/Stack of Coins.svg";
import { toast, ToastContainer } from "react-toastify";
import { useProductAddToCart } from "../../Hooks/ProductActions/useProductAddToCart";
import PreviewPageHeader from "../../components/PreviewPageHeader";
import CarouselforApperal from "../../components/Carousel/CarouselforApperal";
// import axios from "axios";
import { useGetCartData } from "../../Hooks/ProductActions/useGetCartData";
import { useAddToWishlist } from "../../Hooks/ProductActions/useAddToWishlist";
import { useRemoveWishlistProductByProductId } from "../../Hooks/ProductActions/useRemoveWishlistProduct";

import SelectedImg from "../../assets/Images/CommonImages/Selected.png";
import UnSelectedImg from "../../assets/Images/CommonImages/Unselected.png";
import FeatureName from "../../components/FeatureName";

import CarasoulForProductDetails from "../../components/Carousel/CarasoulForProductDetails";
import PageLoader from "../../components/LoadingButton/PageLoader";
import useGetProductById from "../../Hooks/ProductActions/useGetProductById";
import { ProductAnalysisUpdate } from "../../redux/action/Products/ProductAnalysis";
import useGetCompanyTypeData from "../../Hooks/CompanyData/useGetCompanyTypeData";
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
  // const LocationData = useLocation();
  // console.log("LocationData", LocationData?.state?.type);
  const [color, setColor] = useState("");
  const { data: cartItems, refetch: cartRefetch } = useGetCartData();
  const [storeVariationData, setStoreVariationData] = useState();
  const [borderColor, setBorderColor] = useState(true);

  let minValue = 0;
  let maxValue = 0;

  const {
    data: Productdata,
    isLoading: DataLoading,
    error: DataError,
    refetch: ProductRefetch,
  } = useGetProductById(id);

  console.log("ProductdataProductdata", Productdata);

  const {
    data: CompanyTypeData,
    isLoading: CompanyTypeLoading,
    error: CompanyTypeError,
    refetch: CompanyTypeRefetch,
  } = useGetCompanyTypeData(Productdata?.ProductType);

  console.log("CompanyTypeData", CompanyTypeData?.data?.CompanyTypeName);

  async function GetProductByid() {
    await axios
      .get(`product/get_product_byId/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("111111", res);
        setGetProductByIdData(res?.data);
        setStoreTechnicalInfo(res?.data?.ProductFeatures);
        setStoreVariationData(res?.data?.ProductsVariantions[0]);
      });
  }
  useEffect(() => {
    GetProductByid();
  }, []);

  // const { GetProductByIdDatas } = useSelector((state) => state?.GetProductById);

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
    } else if (CustomQuantity === 0) {
      toast.error("Please Select Qty to continue", {
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
          "product/add_to_cart_from_marketplace",
          { ObjectForAddToCart },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          cartRefetch();
          dispatch(ProductAnalysisUpdate(ProductId, "", "ProductAddToCardCount"))
          console.log("add to cart", res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  //  fetch product type data

  if (Productdata === undefined) {
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
              <PreviewPageHeader />
            </Box>
          </Box>
          {CompanyTypeData?.data?.CompanyTypeName === "Textile" ||
          CompanyTypeData?.data?.CompanyTypeName === "Lifestyle" ||
          CompanyTypeData?.data?.CompanyTypeName === "Office Supply" ||
          CompanyTypeData?.data?.CompanyTypeName === "Others" ||
          CompanyTypeData?.data?.CompanyTypeName === "QSR" ||
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
              <Grid
                item
                xl={7}
                lg={7}
                md={12}
                sm={12}
                xs={12}
                sx={{ ...fixGrid, mt: 0 }}
              >
                <Box sx={{ marginTop: "40px" }}>
                  <Typography sx={semi}>
                    {GetProductByIdData?.ProductName}
                  </Typography>
                  <Typography
                    sx={{
                      ...semi,
                      color: "#6B7A99",
                      textAlign: "justify",
                      fontSize: "14px",
                      fontFamily: "Poppins",
                      fontWeight: 600,
                    }}
                  >
                    {GetProductByIdData?.SellerCompanyName}
                  </Typography>
                  <DiscountedPrice
                    regularPrice={priceone}
                    discountPrice={priceTwo}
                  />
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
                                GST per Product{" "}
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
                    <Box
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
                      {/* <Typography
                      sx={{ ...chart, cursor: "pointer" }}
                      onMouseEnter={() => setShowSizechart(true)}
                      onMouseLeave={() => setShowSizechart(false)}
                    >
                    </Typography> */}
                      {/* {showSizechart ? (
                      <Box
                        component="img"
                        src={GetProductByIdData?.SizeChart?.url}
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
                    ) : null} */}
                    </Box>
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
          ) : (
            <Box>
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
              <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={fixGrid}>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        // borderTop: "2px solid #EEEEEE",
                        mt: "15px",
                        pt: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "20px",
                        }}
                      >
                        {/* <Typography sx={find}>Download Size Chart </Typography> */}
                        {/* {GetProductByIdData?.SizeChart === null ||
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
                        )} */}
                        {/* <Typography
                      sx={{ ...chart, cursor: "pointer" }}
                      onMouseEnter={() => setShowSizechart(true)}
                      onMouseLeave={() => setShowSizechart(false)}
                    >
                    </Typography> */}
                        {/* {showSizechart ? (
                      <Box
                        component="img"
                        src={GetProductByIdData?.SizeChart?.url}
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
                    ) : null} */}
                      </Box>
                      {/* <Box
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
                        </Box> */}
                    </Box>
                  </Box>
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
                    CompanyTypeData?.data?.CompanyTypeName === "QSR" ||
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
                              <Typography sx={tabTexts}>
                                Key Features
                              </Typography>
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
                      CompanyTypeData?.data?.CompanyTypeName === "Others" ||
                      CompanyTypeData?.data?.CompanyTypeName ===
                        "QSR" ? null : (
                        <>
                          {/* <Typography
                            sx={{
                              ...semi,
                              color: "#6B7A99",
                              fontSize: 20,
                              fontFamily: "Poppins",
                              fontWeight: 600,
                            }}
                          >
                            {GetProductByIdData?.ProductName}
                          </Typography>
                          <Typography
                            sx={{
                              ...semi,
                              color: "#6B7A99",
                              textAlign: "justify",
                              fontSize: 16,
                              fontFamily: "Poppins",
                              fontWeight: 400,
                            }}
                          >
                            {GetProductByIdData?.SellerCompanyName}
                          </Typography> */}
                          <Grid
                            container
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              flexDirection: "column",
                              mt: 3,
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
                              <Typography
                                sx={{
                                  ...tabText,
                                  fontSize: "18px",
                                  fontWeight: 600,
                                }}
                              >
                                {GetProductByIdData &&
                                  GetProductByIdData.ProductSubtittle}
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

                          {/* <Grid
                            container
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              flexDirection: "column",
                              mt: 3,
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
                              <Typography
                                sx={{
                                  ...tabText,
                                  fontSize: "18px",
                                  fontWeight: 600,
                                }}
                              >
                                {GetProductByIdData &&
                                  GetProductByIdData.ProductSubtittle}
                              </Typography>
                              <Typography sx={tabSubText}>
                                {GetProductByIdData &&
                                  GetProductByIdData.ProductDescription}
                              </Typography>
                            </Box>
                          </Grid> */}
                        </>
                      )}

                      {CompanyTypeData?.data?.CompanyTypeName === "Textile" ||
                      CompanyTypeData?.data?.CompanyTypeName === "Lifestyle" ||
                      CompanyTypeData?.data?.CompanyTypeName ===
                        "Office Supply" ||
                      CompanyTypeData?.data?.CompanyTypeName === "Others" ||
                      CompanyTypeData?.data?.CompanyTypeName ===
                        "QSR" ? null : (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "40px",
                            }}
                          >
                            {/* <Box>
                              <Typography sx={semiSub}>
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
                                    return (
                                      <Box
                                        key={idx}
                                        onClick={() => {
                                          setVariationToMap(
                                            res?.ProductVariations
                                          );
                                          setBorderColor(res?.ProductColor);
                                        }}
                                        // onClick={handleClick}
                                        sx={{
                                          background: res?.ProductColor,
                                          width: {
                                            xl: "25%",
                                            lg: "25%",
                                            md: "25%",
                                            sm: "25%",
                                            xs: "25%",
                                          },
                                          ml: 1,
                                          height: "100%",
                                          maxWidth: "25%",
                                          minWidth: "25%",
                                          minHeight: "35px",
                                          borderRadius: "0.5rem",
                                          cursor: "pointer",
                                          // border: "2px solid red",
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
                                              : "2px solid lighgray",
                                        }}
                                      ></Box>
                                    );
                                  })}
                              </Box>
                            </Box> */}
                          </Box>
                          {/* <Box>
                              {GetProductByIdData?.gender === null ||
                              GetProductByIdData?.gender ===
                                undefined ? null : (
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
                            </Box> */}

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
                                        sx={{ ...tableHeader, ml: "-15px" }}
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
                                      <Typography sx={tableHeader}>
                                        Min QTY
                                      </Typography>
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        borderBottom: "none",
                                        width: "120px",
                                      }}
                                    >
                                      <Typography sx={tableHeader}>
                                        Max QTY
                                      </Typography>
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        borderBottom: "none",
                                        width: "120px",
                                      }}
                                    >
                                      <Typography sx={tableHeader}>
                                        GST{" "}
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
                                        label="select"
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
                                        {!VariationToMap &&
                                        NewdataArray?.length > 0
                                          ? !VariationToMap &&
                                            NewdataArray[0]?.ProductVariations?.map(
                                              (el, idx) => {
                                                return (
                                                  <MenuItem
                                                    key={idx}
                                                    value={el?._id}
                                                  >
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
                                                <MenuItem
                                                  key={idx}
                                                  value={el?._id}
                                                >
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
                                                {/* {res.sampleavailability} */}
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
                              gap: "195px",
                              // mt: "40px",
                            }}
                          >
                            <Box>
                              <Typography sx={semiSub}>
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
                                  width: "110%",
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
                                          setVariationToMap(
                                            res?.ProductVariations
                                          );
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
                            <Box sx={{ mt: 2.7, ml: "70px" }}>
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
                              {/* <Input
                                disableUnderline
                                sx={{
                                  ...tableData,
                                  mt: 1,
                                  width: "186px",
                                  height: "49px",
                                  background: "#fff",
                                  border: "1px solid 000",
                                  borderRadius: "6px",
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
                              /> */}
                              <Input
                                disableUnderline
                                onWheel={numberInputOnWheelPreventChange}
                                sx={{
                                  ...tableData,
                                  mt: 1,
                                  width: "186px",
                                  height: "42px",
                                  background: "#fff",
                                  border: "1px solid #000", // Set the border color to black (#000)
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
                            <Box sx={{ mt: 2.7, ml: "-70px" }}>
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
                                            sx={{
                                              ...tableData,
                                              color: "#B1B1B1",
                                            }}
                                          >
                                            {CustomQuantity
                                              ? res?.DiscountedPrice *
                                                CustomQuantity
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
                        </>
                      )}

                      {/* Tabpanel 2 data */}

                      <Grid container sx={{ mt: 5 }}>
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
                          <Typography
                            sx={{
                              ...product,
                              fontSize: "1.8rem",
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              color: "#6B7A99",
                            }}
                          >
                            Sample Details
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              gap: "20px",
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
                                sx={{
                                  ...available,
                                  fontWeight: 200,
                                  mt: 0.5,
                                  fontSize: "1.6rem",
                                }}
                              >
                                Sample Available :&nbsp;
                              </Typography>
                              {samplestate ? (
                                <Typography
                                  sx={{
                                    ...available,
                                    fontWeight: 600,
                                    width: "20%",
                                    fontSize: "1.6rem",
                                    mt: 0.5,
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
                                    fontSize: "1.6rem",
                                    mt: 0.5,
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
                                        // lineHeight: "40px",
                                        fontSize: "1.8rem",
                                        fontFamily: "Poppins",
                                        fontWeight: 600,
                                        color: "#6B7A99",
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
                                            lineHeight: "35px",
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
                                            lineHeight: "35px",
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
                                            lineHeight: "35px",
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
                                            lineHeight: "35px",
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
                                            lineHeight: "35px",
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
                                            GetProductByIdData?.LocationDetails
                                              ?.pincode
                                          }
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                  {/* {
                                      GetProductByIdData?.LocationDetails
                                        ?.landmark
                                    } */}
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

                                  {GetProductByIdData?.ProductTechInfo
                                    ?.PackagingAndDeliveryInstructionsIfAny ? (
                                    <Box sx={{ mt: 2 }}>
                                      <Typography
                                        sx={{
                                          ...available,
                                          fontSize: "1.8rem",
                                          fontFamily: "Poppins",
                                          fontStyle: "normal",
                                          fontWeight: 600,
                                          color: "#6B7A99",
                                        }}
                                      >
                                        Instructions to use Product :{" "}
                                      </Typography>
                                      <Typography sx={{ ...listText, mt: 0.5 }}>
                                        {
                                          GetProductByIdData?.ProductTechInfo
                                            ?.PackagingAndDeliveryInstructionsIfAny
                                        }
                                      </Typography>
                                    </Box>
                                  ) : null}
                                </Box>
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      {/* Tabpanel 3 data */}
                      <Box sx={{ borderTop: "0.2px solid #156DB6", mt: 4 }}>
                        <Box sx={{ mt: 4 }}>
                          <Typography
                            sx={{ ...pack, fontSize: "24px", color: "#156DB6" }}
                          >
                            Technical Information
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "50px",
                              mt: 0.5,
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
                                Guarantee
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
                                {/* {GetProductByIdData?.ProductTechInfo?.Guarantee} */}
                                {GetProductByIdData?.ProductTechInfo
                                  ?.Guarantee +
                                  " " +
                                  GetProductByIdData?.UnitOfTime}
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
                                {/* {GetProductByIdData?.ProductTechInfo?.Warranty} */}
                                {GetProductByIdData?.ProductTechInfo?.Warranty +
                                  " " +
                                  GetProductByIdData?.UnitOfTime}
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            mt={3}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "0px",
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
                              Packaging information per Unit
                            </Typography>
                          </Box>

                          <Box
                            mt={1.5}
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "95%",
                            }}
                          >
                            {technicalinfo?.map((val) => {
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
                                  <Box
                                    component="img"
                                    src={val.img}
                                    style={{
                                      height: "auto",
                                      minWidth: "40px",
                                      maxWidth: "40px",
                                    }}
                                  />
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
                                        ? val.val + " kg"
                                        : val.val + " cm"}
                                    </Typography>
                                  </Box>
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{ borderBottom: "0.2px solid #156DB6", mt: 4 }}
                      ></Box>
                      {/* Tabpanel 4 data */}
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          sx={{
                            ...pack,
                            fontSize: "24px",
                            color: "#156DB6",
                            // borderBottom: "1px solid",
                          }}
                        >
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
                                        justifyContent: "center",
                                        gap: "15px",
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
                      <Grid container sx={{ mt: 1 }}>
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
                          <Typography
                            sx={{
                              ...product,
                              fontSize: "1.8rem",
                              fontFamily: "Poppins",
                              fontWeight: 600,
                              color: "#6B7A99",
                            }}
                          >
                            Sample Details
                          </Typography>

                          <Box
                            sx={{
                              display: "flex",
                              gap: "20px",
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
                                sx={{
                                  ...available,
                                  fontWeight: 200,
                                  mt: 0.5,
                                  fontSize: "1.6rem",
                                }}
                              >
                                Sample Available :&nbsp;
                              </Typography>
                              {samplestate ? (
                                <Typography
                                  sx={{
                                    ...available,
                                    fontWeight: 600,
                                    width: "20%",
                                    fontSize: "1.6rem",
                                    mt: 0.5,
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
                                    fontSize: "1.6rem",
                                    mt: 0.5,
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
                                  mt={1}
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
                                        lineHeight: "40px",
                                        fontSize: "1.8rem",
                                        fontFamily: "Poppins",
                                        fontWeight: 600,
                                        color: "#6B7A99",
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
                                            lineHeight: "35px",
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
                                            lineHeight: "35px",
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
                                            lineHeight: "35px",
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
                                            lineHeight: "35px",
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
                                            lineHeight: "35px",
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
                                            GetProductByIdData?.LocationDetails
                                              ?.pincode
                                          }
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                  {/* {
                                      GetProductByIdData?.LocationDetails
                                        ?.landmark
                                    } */}
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

                                  {GetProductByIdData?.ProductTechInfo
                                    ?.PackagingAndDeliveryInstructionsIfAny ? (
                                    <Box sx={{ mt: 2 }}>
                                      <Typography
                                        sx={{
                                          ...available,
                                          fontSize: "1.8rem",
                                          fontFamily: "Poppins",
                                          fontStyle: "normal",
                                          fontWeight: 600,
                                          color: "#6B7A99",
                                        }}
                                      >
                                        Instructions to use Product :{" "}
                                      </Typography>
                                      <Typography sx={{ ...listText, mt: 0.5 }}>
                                        {
                                          GetProductByIdData?.ProductTechInfo
                                            ?.PackagingAndDeliveryInstructionsIfAny
                                        }
                                      </Typography>
                                    </Box>
                                  ) : null}
                                </Box>
                              </Grid>
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                    </TabPanel>
                    <TabPanel value="3">
                      {/* <Box>
                        <Typography sx={pack}>Technical Information</Typography>
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
                              Guarantee
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
                              {GetProductByIdData?.ProductTechInfo?.Guarantee}
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
                              {GetProductByIdData?.ProductTechInfo?.Warranty}
                            </Typography>
                          </Box>
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
                            sx={{
                              ...packHead,
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 500,
                              color: "#6B7A99",
                            }}
                          >
                            Packaging information per Unit
                          </Typography>
                        </Box>

                        <Box
                          mt={4}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          {technicalinfo?.map((val) => {
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
                                      ? val.val + " kg"
                                      : val.val + " cm"}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box> */}
                      <Box sx={{ mt: 1 }}>
                        <Typography
                          sx={{ ...pack, fontSize: "24px", color: "#156DB6" }}
                        >
                          Technical Information
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "50px",
                            mt: 0,
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
                              Guarantee
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
                              {/* {GetProductByIdData?.ProductTechInfo?.Guarantee} */}
                              {GetProductByIdData?.ProductTechInfo?.Guarantee +
                                " " +
                                GetProductByIdData?.UnitOfTime}
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
                              {/* {GetProductByIdData?.ProductTechInfo?.Warranty} */}
                              {GetProductByIdData?.ProductTechInfo?.Warranty +
                                " " +
                                GetProductByIdData?.UnitOfTime}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          mt={3}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0px",
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
                            Packaging information per Unit
                          </Typography>
                        </Box>

                        <Box
                          mt={2}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "95%",
                          }}
                        >
                          {technicalinfo?.map((val) => {
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
                                <Box
                                  component="img"
                                  src={val.img}
                                  style={{
                                    height: "auto",
                                    minWidth: "40px",
                                    maxWidth: "40px",
                                  }}
                                />
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
                                      ? val.val + " kg"
                                      : val.val + " cm"}
                                  </Typography>
                                </Box>
                              </Box>
                            );
                          })}
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="4">
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          sx={{
                            ...pack,
                            fontSize: "24px",
                            color: "#156DB6",
                            // borderBottom: "1px solid",
                          }}
                        >
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
                                      // px: 2,
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
                                        gap: "15px",
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
            {cartItems?.find((item) => item?.ProductId?._id === ProductId) ? (
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
