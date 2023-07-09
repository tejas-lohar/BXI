import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useGetProductById } from "../../../Hooks/GetProducts/useGetProductById";
import { useAddToWishlist } from "../../../Hooks/ProductActions/useAddToWishlist";
import { useGetCartData } from "../../../Hooks/ProductActions/useGetCartData";
import { useProductAddToCart } from "../../../Hooks/ProductActions/useProductAddToCart";
import { useRemoveWishlistProductByProductId } from "../../../Hooks/ProductActions/useRemoveWishlistProduct";
import SelectedImg from "../../../assets/Images/CommonImages/Selected.png";
import UnSelectedImg from "../../../assets/Images/CommonImages/Unselected.png";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import bxifeature from "../../../assets/bxifeaturelogo1.png";
import CarasoulForVoucherDetails from "../../../components/Carousel/CarasoulForVoucherDetails";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import PreviewPageHeader from "../../../components/PreviewPageHeader";
import { GetProductByIdAction } from "../../../redux/action/ProductActions/GetProductByIdAction";

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

            color: "#6B7A99",
          }}
        >
          {discountPrice}{" "}
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
const ApprealPage = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let ProductId = id;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const [currentImage, setCurrentImage] = useState(0);
  const [GetProductByIdData, setGetProductByIdData] = useState();
  // const [showSizechart, setShowSizechart] = useState(false);
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();

  const [VariationToMap, setVariationToMap] = useState();
  const [WishlistData, setWishlistData] = useState();

  const [CustomQuantity, setCustomQty] = useState();

  const [color, setColor] = useState("");
  const { data: cartItems, refetch: cartRefetch } = useGetCartData();
  const [storeVariationData, setStoreVariationData] = useState();
  let minValue = 0;
  let maxValue = 0;

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

  const { data: ProductData } = useGetProductById(id);
  const getProductData = async () => {
    await axios
      .get(`product/get_product_byId/${id}`)
      .then((res) => {
        console.log("res", res);
        setGetProductByIdData(res?.data);

        setStoreVariationData(res?.data?.ProductsVariantions[0]?._id);
        setStoreTechnicalInfo(res?.data?.ProductFeatures);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProductData();
  }, []);

  const [open, setOpen] = React.useState(false);
  // const [messageOption, setMessageOption] = useState("");
  const [IsSample, setIsSample] = useState("");
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const { data: mutateCartData, mutate: addtocart } = useProductAddToCart();

  // const { data: VoucherAddCart, mutate: VoucherCartMutate } =
  //   useVoucherAddtoCart();

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
  //     `https://www.testing-bxi.unada.in/home/hotelvoucheraddtocart` + `/${id}`
  //   );
  // };

  const {
    // data: mutateWishlistData,
    mutate: addtowishlist,
    // isLoading: wishlistMutateLoading,
    // error: wishlistMutateError,
  } = useAddToWishlist();

  const {
    //  data: mutateRemoveWishlistData,
    mutate: removefromwishlist,
  } = useRemoveWishlistProductByProductId();

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
    VoucherQuantity: CustomQuantity,
    ProductId: ProductId,
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
          cartRefetch();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

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
        <BreadCrumbHeader MainText={"Hotel Voucher"} />
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
              // borderBottom: "2px solid rgba(236, 236, 236, 1)",
              width: "95%",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                width: "100%",
                mx: "auto",
                // textAlign: "end",
                height: "80px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <PreviewPageHeader />
            </Box>
          </Box>

          <Grid container sx={{ width: "95%", mx: "auto", mt: 4 }}>
            <Grid item xl={1} lg={1} md={12} sm={12} xs={12} sx={fixGrid}>
              {/* {ImageDataArray?.length > 1 ? ( */}
              <>
                {/* <Button onClick={upwardClick} sx={{ width: "120px" }}>
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
            <Button onClick={downwardClick} sx={{ width: "120px" }}>
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
            </Button> */}
              </>
              {/* ) : null} */}
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
                  alignItems: "center",
                  display: "flex",
                  alignContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={
                    ImageDataArray ? ImageDataArray[currentImage]?.url : null
                  }
                  alt="cloth"
                  sx={{
                    width: {
                      xl: "95%",
                      lg: "95%",
                      md: "95%",
                      sm: "95%",
                      xs: "95%",
                    },
                    height: "auto",
                  }}
                ></Box>
              </Box> */}

              <CarasoulForVoucherDetails images={ProductData?.ProductImages} />
            </Grid>
            <Grid item xl={7} lg={7} md={12} sm={12} xs={12} sx={fixGrid}>
              <Box>
                <Typography sx={semi}>
                  {GetProductByIdData?.ProductName}
                </Typography>
                <DiscountedPrice
                  regularPrice={priceone}
                  discountPrice={priceTwo}
                />

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
                      return (
                        <Box
                          key={idx}
                          onClick={() => {
                            setVariationToMap(res?.ProductVariations);
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
                        ></Box>
                      );
                    })}
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
                            <Typography sx={tableHeader}>Sizes</Typography>
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
                    gap: "10px",
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
                      sx={{
                        ...tableData,
                        mt: 1,
                        width: "186px",
                        height: "49px",
                        background: "#F4F4F4",
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
                        height: "49px",
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
                    {/* <Typography sx={find}>Download Size Chart </Typography> */}
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
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Typography sx={tabText}>
                            {ProductData?.ProductSubtittle}
                          </Typography>
                          <Typography sx={tabSubText}>
                            {ProductData?.ProductDescription}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Typography sx={tabText}>Custom Message</Typography>
                          <Typography sx={tabSubText}>
                            Lorem ipsum dolor sit amet consectetur.
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Typography sx={tabText}>Store Details</Typography>
                          <Typography sx={tabSubText}>
                            Lorem ipsum dolor sit amet consectetur. Proin sit
                            nisl a a lectus imperdiet.
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            gap: 0.5,
                            mb: "1%",
                          }}
                        >
                          <Typography sx={tabText}>Store List</Typography>
                          <Box
                            component={"a"}
                            download="hotelsList"
                            target="_blank"
                            href={`${ProductData?.HotelsListUrls?.at(0)?.url}`}
                            onClick={() => {
                              console.log("download excel");
                            }}
                            sx={storelist}
                          >
                            Document - name.pdf
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Typography sx={tabText}>Store Link</Typography>
                          <Box
                            component={"a"}
                            target="_blank"
                            href={
                              ProductData?.Link
                                ? ProductData?.Link
                                : "www.loremipsum.com"
                            }
                            sx={storelink}
                          >
                            {ProductData?.Link
                              ? ProductData?.Link
                              : "www.loremipsum.com "}
                          </Box>
                        </Box>
                      </Grid>

                      <Grid container>
                        <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} xs={1.5}>
                          <Typography sx={{ ...HeaderTypoStyle, pb: "1rem" }}>
                            Area
                          </Typography>
                          <Typography sx={HeaderSubTypoStyle}>
                            {ProductData?.Area}
                          </Typography>
                        </Grid>

                        <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} xs={1.5}>
                          <Typography sx={{ ...HeaderTypoStyle, pb: "1rem" }}>
                            Landmark
                          </Typography>
                          <Typography sx={HeaderSubTypoStyle}>
                            {ProductData?.Landmark}
                          </Typography>
                        </Grid>

                        <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} xs={1.5}>
                          <Typography sx={{ ...HeaderTypoStyle, pb: "1rem" }}>
                            City
                          </Typography>
                          <Typography sx={HeaderSubTypoStyle}>
                            {ProductData?.City}
                          </Typography>
                        </Grid>

                        <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} xs={1.5}>
                          <Typography sx={{ ...HeaderTypoStyle, pb: "1rem" }}>
                            State
                          </Typography>
                          <Typography sx={HeaderSubTypoStyle}>
                            {ProductData?.State}
                          </Typography>
                        </Grid>

                        <Grid container sx={{ marginTop: "20px" }}>
                          <Grid
                            item
                            xl={2.5}
                            lg={2.5}
                            md={2.5}
                            sm={2.5}
                            xs={2.5}
                          >
                            <Typography sx={{ ...HeaderTypoStyle, pb: "1rem" }}>
                              Redemption Type
                            </Typography>
                            {ProductData?.redemptionType === "both" ? (
                              <Typography sx={HeaderSubTypoStyle}>
                                Online and Offline
                              </Typography>
                            ) : (
                              <Typography sx={HeaderSubTypoStyle}>
                                {ProductData?.redemptionType}
                              </Typography>
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
                            <Typography sx={{ ...HeaderTypoStyle, pb: "1rem" }}>
                              Listed this Product for
                            </Typography>
                            <Typography sx={HeaderSubTypoStyle}>
                              {`${ProductData?.ListThisProductForAmount} ${ProductData?.ListThisProductForUnitOfTime}`}
                              {/* 30 Days */}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Box mt={2}>
                        <Typography sx={pack}>Technical Information</Typography>
                        <Box>
                          <Typography sx={inclusiveheader}>
                            Inclusion
                          </Typography>
                          <Box sx={{ pt: "0.8%", padding: "10px" }}>
                            <Typography sx={dots}>
                              <FiberManualRecordIcon
                                sx={{ fontSize: "7px", pt: "10px" }}
                              />
                              {ProductData?.Inclusions}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Typography sx={inclusiveheader}>
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
                          <Typography sx={inclusiveheader}>
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
                          <Typography sx={inclusiveheader}>
                            Other Cost
                          </Typography>
                          <Box sx={{ pt: "0.8%", padding: "10px" }}>
                            <Typography sx={dots}>
                              {ProductData?.OtherCost?.length === 0
                                ? "No Other Cost"
                                : ProductData?.OtherCost?.map((cost) => {
                                    console.log("cost", cost);
                                    const newValue = cost?.CostPrice.toFixed(2);
                                    return (
                                      <>
                                        <Typography sx={dots}>
                                          {cost.ReasonOfCost} Cost Price :{" "}
                                          {newValue}
                                          {cost.currencyType === "BXITokens" ? (
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
                                  })}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Typography sx={RedemptionSteps}>
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
                      <Box mt={2}>
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
                                      gap: "70px",
                                      mt: 1,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: "10px",
                                      }}
                                    >
                                      <Box
                                        component="img"
                                        src={bxifeature}
                                        sx={{ height: "auto", width: "30px" }}
                                      />
                                      <Box>
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
                    <TabPanel value="2">
                      <Box>
                        <Typography sx={inclusiveheader}>Inclusion</Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {ProductData?.Inclusions}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography sx={inclusiveheader}>Exclusion</Typography>
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
                        <Typography sx={inclusiveheader}>
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
                        <Typography sx={inclusiveheader}>Other Cost</Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots}>
                            {ProductData?.OtherCost?.length === 0
                              ? "No Other Cost"
                              : ProductData?.OtherCost?.map((cost) => {
                                  console.log("cost", cost);
                                  const newValue = cost?.CostPrice.toFixed(2);
                                  return (
                                    <>
                                      <Typography sx={dots}>
                                        {cost.ReasonOfCost} Cost Price :{" "}
                                        {newValue}
                                        {cost.currencyType === "BXITokens" ? (
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
                                })}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography sx={RedemptionSteps}>
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
                                      gap: "70px",
                                      mt: 1,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        gap: "10px",
                                      }}
                                    >
                                      <Box
                                        component="img"
                                        src={bxifeature}
                                        sx={{ height: "auto", width: "30px" }}
                                      />
                                      <Box>
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
            {/* <Button sx={uploadBtn} onClick={() => handleAddToCart(ProductId)}>
              Add To Cart
            </Button> */}
          </Box>
        </Paper>
      </Paper>
    </React.Fragment>
  );
};

export default ApprealPage;

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
  color: "#445FD2",
  lineHeight: "4rem",
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

const packHead = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.4rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
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
  textAlign: {
    xl: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
  color: "#6B7A99",
};

const packVal = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.6rem",
    sm: "1.6rem",
    xs: "1.2rem",
  },
  color: "#6B7A99",
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

const RedemptionSteps = {
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
  pt: "3%",
};

const storelist = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "justify",
  textDecoration: "none",
  color: "#6B7A99",
};

const storelink = {
  textDecoration: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "justify",
  color: "#445FD2",
  width: "20px",
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
