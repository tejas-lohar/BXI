import {
  Box,
  Button,
  Checkbox,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  TableCell,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PreviewPageHeader from "../../../components/PreviewPageHeader";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToWishlist } from "../../../Hooks/ProductActions/useAddToWishlist";
import { useGetCartData } from "../../../Hooks/ProductActions/useGetCartData";
import { useProductAddToCart } from "../../../Hooks/ProductActions/useProductAddToCart";
import { useRemoveWishlistProductByProductId } from "../../../Hooks/ProductActions/useRemoveWishlistProduct";
import Weight from "../../../assets/Images/Weight.svg";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import CarasoulForProductDetails from "../../../components/Carousel/CarasoulForProductDetails";
import FeatureName from "../../../components/FeatureName";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { GetProductByIdAction } from "../../../redux/action/ProductActions/GetProductByIdAction";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
          width: "300px",
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

const ElectronicsDetails = () => {
  let { id } = useParams();
  let ProductId = id;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  // const [currentImage, setCurrentImage] = useState(0);
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [VariationToMap, setVariationToMap] = useState();
  // const [showSizechart, setShowSizechart] = useState(false);
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();

  const [WishlistData, setWishlistData] = useState();

  const [CustomQuantity, setCustomQty] = useState(0);

  const { data: cartItems, refetch: cartRefetch } = useGetCartData();
  const [color, setColor] = useState("");
  // const [like, setLike] = useState(false);
  const [IsSample, setIsSample] = useState("");
  let minValue = 0;
  let maxValue = 0;

  async function GetProductByid() {
    await axios
      .get(`product/get_product_byId/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setGetProductByIdData(res?.data);
        setStoreVariationData(res?.data?.ProductsVariantions[0]?._id);
        setStoreTechnicalInfo(res?.data?.ProductFeatures);
      });
  }

  // const navigate = useNavigate();

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [storeVariationData, setStoreVariationData] = useState();

  let ColorData = {};

  GetProductByIdData?.ProductsVariantions?.map((item, index) => {
    if (index === 0) {
      ColorData = item;
    }
  });

  console.log(GetProductByIdData, "GetProductByIdData");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: mutateCartData, mutate: addtocart } = useProductAddToCart();

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

  let samplestate = false;
  GetProductByIdData?.ProductsVariantions?.map((item, index) => {
    if (item.sampleavailability) {
      return (samplestate = true);
    } else {
      return (samplestate = false);
    }
  });

  async function handleAddToCart(id) {
    addtocart(id);
  }

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

  const {
    // data: mutateWishlistData,
    mutate: addtowishlist,
    // isLoading: wishlistMutateLoading,
    // error: wishlistMutateError,
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
      toast.error("Selected quanity is Zero", {
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
          "product/add_to_cart_from_marketplace",
          { ObjectForAddToCart },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          cartRefetch();
          console.log("add to cart", res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <React.Fragment>
      <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <BreadCrumbHeader MainText={"Electronics"} />
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
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <PreviewPageHeader
                productname={GetProductByIdData?.ProductName}
              />
            </Box>
          </Box>

          <Grid container sx={{ width: "95%", mx: "auto", mt: 4 }}>
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
                          <Typography sx={product}>
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
                              mt: 1,
                              // gap: 0.5,
                              // backgroundColor: "red",
                              // width: "100%",
                            }}
                          >
                            <Typography sx={product}>
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

                        {/*    <Typography sx={semiSub}>Available  colors</Typography>
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
                    </Box>  */}

                        {/* <Box
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
                                    <Typography sx={tableHeader}>
                                      Available colors
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    sx={{ borderBottom: "none", ml: "25%" }}
                                  >
                                    <Typography sx={tableHeader}>
                                      Available Sizes
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
                                      GST
                                    </Typography>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow sx={{ p: 0 }}>
                                  <TableCell
                                    sx={{
                                      borderBottom: "none",
                                      width: "100px",
                                      height: "40px",
                                      p: 0,
                                    }}
                                  >
                                    {GetProductByIdData &&
                                      NewdataArray?.map((res, idx) => {
                                        console.log("resss", res);
                                        return (
                                          <Box
                                            key={idx}
                                            onClick={() => {
                                              setVariationToMap(
                                                res?.ProductVariations
                                              );
                                            }}
                                            sx={{
                                              background: res?.ProductColor,
                                              ml: 1,
                                              height: "100%",
                                              width: "35px",
                                              minHeight: "35px",
                                              borderRadius: "0.5rem",
                                              cursor: "pointer",
                                              border: "2px solid #000",
                                            }}
                                          ></Box>
                                        );
                                      })}
                                  </TableCell>
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
                        </Box> */}
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            gap: "10px",
                            mt: "40px",
                          }}
                        >
                          <Grid container>
                            <Grid item xl={4} lg={4} md={4}>
                              <Box>
                                <Typography sx={semiSub}>
                                  Available colors
                                </Typography>
                              </Box>
                              <Box>
                                {GetProductByIdData &&
                                  NewdataArray?.map((res, idx) => {
                                    console.log("resss", res);
                                    return (
                                      <Box
                                        key={idx}
                                        onClick={() => {
                                          setVariationToMap(
                                            res?.ProductVariations
                                          );
                                        }}
                                        sx={{
                                          background: res?.ProductColor,
                                          ml: 1,
                                          height: "100%",
                                          width: "35px",
                                          minHeight: "35px",
                                          borderRadius: "0.5rem",
                                          cursor: "pointer",
                                          border: "2px solid #000",
                                        }}
                                      ></Box>
                                    );
                                  })}
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4}>
                              <Box sx={{ mt: 2 }}>
                                <Typography sx={tableHeader}>
                                  {" "}
                                  Available Sizes
                                </Typography>
                              </Box>
                              <Box>
                                <Select
                                  sx={{
                                    width: "180px",
                                    marginLeft: "0px",
                                    marginRight: "auto",
                                    height: "40px",
                                    marginTop: "4px",
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
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            gap: "10px",
                            mt: "5px",
                          }}
                        >
                          <Grid container>
                            <Grid item xl={4} lg={4} md={4}>
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
                            </Grid>
                            <Grid item xl={4} lg={4} md={4}>
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
                                              alt="BXI Token"
                                            />
                                          </Box>
                                        );
                                      }
                                    }
                                  )}
                                </Box>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4}>
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
                                  Gst
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
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>

                        {/*   <Box
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
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Box sx={ProductVariationStyle}>
                        <Typography sx={tableHeader}>
                          {" "}
                          Available  Sizes
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
                    <Grid item xl={2} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Box sx={ProductVariationStyle}>
                        <Typography sx={tableHeader}>GST/Product</Typography>
                      </Box>
                    </Grid>
                    <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                      <Box sx={ProductVariationStyle}>
                        <Typography sx={tableHeader}>Product ID</Typography>
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
                                  <Typography sx={tableData}>
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
                  </Box>     */}

                        {/*     <Box
                mt={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Typography
                  sx={product}
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
                </Box>  */}
                        <Box sx={{ display: "flex", mt: 2 }}>
                          <Checkbox {...label} sx={{ fontSize: "50px" }} />
                          <Box>
                            <Typography
                              sx={{
                                ...packHead,
                                mt: 0.5,
                                color: "rgba(107, 122, 153, 1)",
                              }}
                            >
                              Do you want to first try a product sample ?{" "}
                            </Typography>
                          </Box>
                        </Box>

                        <Box
                          mt={1}
                          sx={{
                            width: "60%",
                          }}
                        >
                          <Typography sx={product}>Sample Details</Typography>
                          <Grid
                            container
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                              <Box sx={ProductVariationStyle}>
                                <Typography
                                  sx={{
                                    ...tableHeader,
                                    fontSize: "20px",
                                    color: "#ADB8CC",
                                  }}
                                >
                                  Minimum Order Quantity
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography
                                  sx={{
                                    ...tableHeader,
                                    fontSize: "20px",
                                    color: "#ADB8CC",
                                  }}
                                >
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
                                  <Typography
                                    sx={{
                                      ...tableData,
                                      color: "#6B7A99",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {
                                      GetProductByIdData?.ProductsVariantions[0]
                                        ?.sampleavailability
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography
                                    sx={{
                                      ...tableData,
                                      color: "#6B7A99",
                                      fontSize: "16px",
                                    }}
                                  >
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
                                          fontSize: "20px",
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
                                          fontSize: "16px",
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
                                    <Box>
                                      <Typography
                                        sx={{
                                          ...available,
                                          width: "100%",
                                          fontWeight: 500,
                                          fontSize: "20px",
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
                                          fontSize: "16px",
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
                                    <Box>
                                      <Typography
                                        sx={{
                                          ...available,
                                          width: "100%",
                                          fontWeight: 500,
                                          fontSize: "20px",
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
                                          fontSize: "16px",
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
                                    <Box>
                                      <Typography
                                        sx={{
                                          ...available,
                                          width: "100%",
                                          fontWeight: 500,
                                          fontSize: "20px",
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
                                          fontSize: "16px",
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
                                    <Box>
                                      <Typography
                                        sx={{
                                          ...available,
                                          width: "100%",
                                          fontWeight: 500,
                                          fontSize: "20px",
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
                                          fontSize: "16px",
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
                              </Box>
                            </Grid>
                          </Box>
                        </Box>

                        <Box sx={{ mt: 3 }}>
                          <Typography sx={product}>Model Name</Typography>
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
                        <Box
                          mt={3}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography sx={product}>
                            Service Available
                          </Typography>

                          <Box>
                            {GetProductByIdData?.demoInstallation === "true" ? (
                              <Typography sx={available}>
                                demo & Installation : Yes
                              </Typography>
                            ) : (
                              <Typography sx={available}>
                                demo & Installation : No
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        <Box
                          mt={3}
                          sx={{
                            width: "100%",
                          }}
                        >
                          <Typography sx={{ ...product }}>
                            Additional Cost
                          </Typography>
                          {GetProductByIdData?.OtherCost?.length === 0
                            ? ""
                            : GetProductByIdData?.OtherCost?.map((cost) => {
                                console.log("cost", cost);
                                // const newValue = cost?.CostPrice.toFixed(2);
                                return (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      width: "auto",
                                      height: "auto",
                                      // bgcolor:"red",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...listText,
                                        width: "auto",
                                        height: "auto",
                                        inlineSize: "400px",
                                        overflowWrap: "break-word",
                                      }}
                                    >
                                      {cost.ReasonOfCost}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        ...listText,
                                        width: "200px",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      Cost Price : {/* {cost.CostPrice} */}
                                      {cost.CostPrice}{" "}
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
                                  </Box>
                                );
                              })}
                        </Box>

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
                            {GetProductByIdData?.listperiod} Days
                          </Typography>
                        </Box>

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
                                <Typography
                                  sx={{
                                    ...tableHeader,
                                    fontSize: "20px",
                                    color: "#ADB8CC",
                                  }}
                                >
                                  Manufacturing Date
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography
                                  sx={{
                                    ...tableHeader,
                                    fontSize: "20px",
                                    color: "#ADB8CC",
                                  }}
                                >
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
                                  <Typography
                                    sx={{
                                      ...tableData,
                                      color: "#6B7A99",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {new Date(
                                      GetProductByIdData?.ManufacturingDate
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography
                                    sx={{
                                      ...tableData,
                                      color: "#6B7A99",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {GetProductByIdData?.ExpiryDate === null ||
                                    " " ? (
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
                          </Grid>
                        </Box>

                        <Typography sx={pack}>Technical Information</Typography>

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
                                <Typography
                                  sx={{
                                    ...tableHeader,
                                    fontSize: "20px",
                                    color: "#ADB8CC",
                                  }}
                                >
                                  Warranty
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography
                                  sx={{
                                    ...tableHeader,
                                    fontSize: "20px",
                                    color: "#ADB8CC",
                                  }}
                                >
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
                                  <Typography
                                    sx={{
                                      ...tableData,
                                      color: "#6B7A99",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {GetProductByIdData?.ProductTechInfo
                                      ?.Warranty +
                                      " " +
                                      GetProductByIdData?.UnitOfTime}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography
                                    sx={{
                                      ...tableData,
                                      color: "#6B7A99",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {GetProductByIdData?.ProductTechInfo
                                      ?.Guarantee +
                                      " " +
                                      GetProductByIdData?.UnitOfTime}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box
                          mt={1}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 3,
                          }}
                        >
                          <Typography sx={product}>
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
                                  <Typography
                                    sx={{ ...packHead, fontSize: "20px" }}
                                  >
                                    {val.name}
                                  </Typography>
                                  <Typography
                                    sx={{ ...packVal, fontSize: "16px" }}
                                  >
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
                          mt={3}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography sx={product}>
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
                          mt={1}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography sx={product}>
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
                                  <Grid
                                    item
                                    xl={3}
                                    lg={3}
                                    md={4}
                                    sm={6}
                                    xs={6}
                                    sx={{ mt: 1 }}
                                  >
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
                                        {/* <Box
                      component="img"
                      src={bxifeature}
                      sx={{ height: "auto", width: "30px" }}
                    /> */}
                                        <FeatureName name={res?.name} />
                                        <Box>
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
                        {/* <Box sx={{ mt: 3 }}>
                          <Typography
                            sx={{
                              ...tableHeader,
                              fontWeight: 600,
                              fontSize: 24,
                            }}
                          >
                            Reviews
                          </Typography>
                          <Typography
                            sx={{
                              ...tableHeader,
                              fontWeight: 500,
                              fontSize: 20,
                            }}
                          >
                            Average Rating
                          </Typography>
                          <Box sx={{ display: "flex" }}>
                            <Typography sx={ratingformat}>4.0</Typography>
                            <Box></Box>
                          </Box>
                        </Box> */}
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
                            <Typography sx={product}>
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
                                    setVariationToMap(res?.ProductVariations);
                                  }}
                                  sx={{
                                    background: res?.ProductColor,
                                    width: {
                                      xl: "3%",
                                      lg: "3%",
                                      md: "3%",
                                      sm: "3%",
                                      xs: "3%",
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
                            width: "60%",
                          }}
                        >
                          <Grid
                            container
                            sx={{
                              textAlign: "center",
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
                                <Typography sx={tableHeader}>
                                  {" "}
                                  Available Sizes
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
                                <Typography sx={tableHeader}>
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
                                <Typography sx={tableHeader}>
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
                                <Typography sx={tableHeader}>
                                  GST/Product
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
                                <Typography sx={tableHeader}>
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
                                          <Typography sx={tableData}>
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
                          mt={1}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography sx={product}>Model Name</Typography>

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

                        <Box
                          mt={1}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography sx={product}>
                            Service Available
                          </Typography>

                          <Box>
                            {GetProductByIdData?.demoInstallation === "true" ? (
                              <Typography sx={available}>
                                demo & Installation : Yes
                              </Typography>
                            ) : (
                              <Typography sx={available}>
                                demo & Installation : No
                              </Typography>
                            )}
                          </Box>
                        </Box>

                        <Box
                          mt={1}
                          sx={{
                            width: "60%",
                          }}
                        >
                          <Typography sx={product}>Sample Details</Typography>
                          <Grid
                            container
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                              <Box sx={ProductVariationStyle}>
                                <Typography
                                  sx={{
                                    ...tableHeader,
                                    fontSize: "20px",
                                    color: "#ADB8CC",
                                  }}
                                >
                                  Minimum Order Quantity
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography
                                  sx={{
                                    ...tableHeader,
                                    fontSize: "20px",
                                    color: "#ADB8CC",
                                  }}
                                >
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
                                  <Typography
                                    sx={{
                                      ...tableData,
                                      color: "#6B7A99",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {
                                      GetProductByIdData?.ProductsVariantions[0]
                                        ?.sampleavailability
                                    }
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography
                                    sx={{ ...tableData, fontSize: "16px" }}
                                  >
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
                                          fontSize: "20px",
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
                                          fontSize: "16px",
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
                                    <Box>
                                      <Typography
                                        sx={{
                                          ...available,
                                          width: "100%",
                                          fontWeight: 500,
                                          fontSize: "20px",
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
                                          fontSize: "16px",
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
                                    <Box>
                                      <Typography
                                        sx={{
                                          ...available,
                                          width: "100%",
                                          fontWeight: 500,
                                          fontSize: "20px",
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
                                          fontSize: "16px",
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
                                    <Box>
                                      <Typography
                                        sx={{
                                          ...available,
                                          width: "100%",
                                          fontWeight: 500,
                                          fontSize: "20px",
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
                                          fontSize: "16px",
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
                                    <Box>
                                      <Typography
                                        sx={{
                                          ...available,
                                          width: "100%",
                                          fontWeight: 500,
                                          fontSize: "20px",
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
                                          fontSize: "16px",
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
                              </Box>
                            </Grid>
                          </Box>
                        </Box>

                        <Box
                          mt={3}
                          sx={{
                            width: "100%",
                          }}
                        >
                          <Typography sx={{ ...product }}>
                            Additional Cost
                          </Typography>
                          {GetProductByIdData?.OtherCost?.length === 0
                            ? ""
                            : GetProductByIdData?.OtherCost?.map((cost) => {
                                console.log("cost", cost);
                                // const newValue = cost?.CostPrice.toFixed(2);
                                return (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      width: "auto",
                                      height: "auto",
                                      // bgcolor:"red",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...listText,
                                        width: "auto",
                                        height: "auto",
                                        inlineSize: "400px",
                                        overflowWrap: "break-word",
                                      }}
                                    >
                                      {cost.ReasonOfCost}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        ...listText,
                                        width: "200px",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      Cost Price : {/* {cost.CostPrice} */}
                                      {cost.CostPrice}{" "}
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
                            {GetProductByIdData?.listperiod} Days
                          </Typography>
                        </Box>

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
                                <Typography
                                  sx={{
                                    ...tableHeader,
                                    fontSize: "20px",
                                    color: "#ADB8CC",
                                  }}
                                >
                                  Manufacturing Date
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography
                                  sx={{
                                    ...tableHeader,
                                    fontSize: "20px",
                                    color: "#ADB8CC",
                                  }}
                                >
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
                                  <Typography
                                    sx={{
                                      ...tableData,
                                      color: "#6B7A99",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {new Date(
                                      GetProductByIdData?.ManufacturingDate
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                <Box sx={ProductVariationStyle}>
                                  <Typography
                                    sx={{
                                      ...tableData,
                                      color: "#6B7A99",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {GetProductByIdData?.ExpiryDate === null ||
                                    " " ? (
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
                          </Grid>
                        </Box>
                      </Grid>
                    </TabPanel>
                    <TabPanel value="3">
                      <Typography sx={pack}>Technical Information</Typography>

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
                              <Typography
                                sx={{
                                  ...tableHeader,
                                  fontSize: "20px",
                                  color: "#ADB8CC",
                                }}
                              >
                                Warranty
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                            <Box sx={ProductVariationStyle}>
                              <Typography
                                sx={{
                                  ...tableHeader,
                                  fontSize: "20px",
                                  color: "#ADB8CC",
                                }}
                              >
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
                                <Typography
                                  sx={{
                                    ...tableData,
                                    color: "#6B7A99",
                                    fontSize: "16px",
                                  }}
                                >
                                  {GetProductByIdData?.ProductTechInfo
                                    ?.Warranty +
                                    " " +
                                    GetProductByIdData?.UnitOfTime}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Box sx={ProductVariationStyle}>
                                <Typography
                                  sx={{
                                    ...tableData,
                                    color: "#6B7A99",
                                    fontSize: "16px",
                                  }}
                                >
                                  {GetProductByIdData?.ProductTechInfo
                                    ?.Guarantee +
                                    " " +
                                    GetProductByIdData?.UnitOfTime}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box
                        mt={1}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Typography sx={product}>
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
                                // justifyContent: "space-between",
                                gap: "25px",
                                width: "12%",
                              }}
                            >
                              <Box component="img" src={val.img} />
                              <Box
                                sx={{
                                  width: "100%",
                                  minWidth: "145px",
                                }}
                              >
                                <Typography
                                  sx={{ ...packHead, fontSize: "20px" }}
                                >
                                  {val.name}
                                </Typography>
                                <Typography
                                  sx={{ ...packVal, fontSize: "16px" }}
                                >
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
                        <Typography sx={product}>
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
                        mt={1}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Typography sx={product}>
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
                                      {/* <Box
                                    component="img"
                                    src={bxifeature}
                                    sx={{ height: "auto", width: "30px" }}
                                  /> */}
                                      <FeatureName name={res?.name} />
                                      <Box>
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
            <Button sx={uploadBtn} onClick={() => handleAddToCart(ProductId)}>
              Add To Cart
            </Button>
          </Box>
        </Paper>
      </Paper>
    </React.Fragment>
  );
};

export default ElectronicsDetails;

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
