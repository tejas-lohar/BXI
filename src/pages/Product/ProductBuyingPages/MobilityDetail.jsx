import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useProductAddToCart } from "../../../Hooks/ProductActions/useProductAddToCart";
import BXIToken from "../../../assets/BXITokenIcon.png";
import Breadth from "../../../assets/Images/Breadth.svg";
import Height from "../../../assets/Images/Height.svg";
import Length from "../../../assets/Images/Length.svg";
import Weight from "../../../assets/Images/Weight.svg";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import CarasoulForProductDetails from "../../../components/Carousel/CarasoulForProductDetails";
import FeatureName from "../../../components/FeatureName";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import PreviewPageHeader from "../../../components/PreviewPageHeader";
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
            src={BXIToken}
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
export default function MobilityDetail() {
  let { id } = useParams();
  // const navigate = useNavigate();
  let ProductId = id;
  // const [count, setCount] = useState(1);

  // const [starvalue, setstarValue] = React.useState(2);

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
  const [CustomQuantity, setCustomQty] = useState(0);
  const [IsSample, setIsSample] = useState("");
  const [LocationData, setLocationData] = useState();

  let minValue = 0;
  let maxValue = 0;
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
        setStoreTechnicalInfo(res?.data?.ProductFeatures);
        setLocationData(res?.data?.LocationDetails);
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
    {
      name: "Height",
      img: Height,
      val: GetProductByIdData?.ProductTechInfo?.Height,
    },
    {
      name: "Length",
      img: Length,
      val: GetProductByIdData?.ProductTechInfo?.Length,
    },
    {
      name: "Breadth",
      img: Breadth,
      val: GetProductByIdData?.ProductTechInfo?.Width,
    },
    {
      name: "Before Weight",
      img: Weight,
      val: GetProductByIdData?.ProductTechInfo?.WeightBeforePackingPerUnit,
    },
    {
      name: "After Weight",
      img: Weight,
      val: GetProductByIdData?.ProductTechInfo?.WeightAfterPackingPerUnit,
    },
  ];

  // var newObject = Object.keys(myObject).map(function (key) {
  //   return myObject[key];
  // });

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

  GetProductByIdData?.ProductsVariantions?.map((res, idx) => {});

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
      toast.error("Please Select quanity to continue", {
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
          console.log("add to cart", res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

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
          <PreviewPageHeader />

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
                        <Typography sx={product}>
                          Price & Availability
                        </Typography>
                        <DiscountedPrice
                          regularPrice={
                            GetProductByIdData &&
                            GetProductByIdData?.ProductsVariantions?.length >
                              0 &&
                            GetProductByIdData?.ProductsVariantions[0]
                              ?.PricePerUnit
                          }
                          discountPrice={
                            GetProductByIdData &&
                            GetProductByIdData?.ProductsVariantions?.length >
                              0 &&
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
                                      setVariationToMap(res?.ProductVariations);
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
                                    ?.MinOrderQuantity
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
                                    }}
                                  >
                                    {GetProductByIdData?.LocationDetails?.state}
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
                                    {GetProductByIdData?.LocationDetails?.city}
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
                      <Typography sx={{ ...product, fontSize: "18px" }}>
                        Model Name
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
                      <Typography
                        sx={{
                          ...packHead,
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          color: "#6B7A99",
                        }}
                      >
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
                    </Box>
                    {GetProductByIdData?.OtherCost?.length === 0
                      ? ""
                      : GetProductByIdData?.OtherCost?.map((cost) => {
                          console.log("cost", cost);
                          const newValue = cost?.CostPrice.toFixed(2);
                          return (
                            <>
                              <Typography sx={listText}>
                                {cost.ReasonOfCost} Cost Price :{" "}
                                {/* {cost.CostPrice} */}
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
                            <Typography sx={tableHeader}>
                              Manufacturing Date
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                          <Box sx={ProductVariationStyle}>
                            <Typography sx={tableHeader}>
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
                              <Typography sx={tableData}>
                                {new Date(
                                  GetProductByIdData?.ManufacturingDate
                                ).toLocaleDateString()}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                            <Box sx={ProductVariationStyle}>
                              <Typography sx={tableData}>
                                {new Date(
                                  GetProductByIdData?.ExpiryDate
                                ).toLocaleDateString()}
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
                            <Typography sx={tableHeader}>Warranty</Typography>
                          </Box>
                        </Grid>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                          <Box sx={ProductVariationStyle}>
                            <Typography sx={tableHeader}>Guarantee</Typography>
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
                                {GetProductByIdData?.ProductTechInfo?.Warranty}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                            <Box sx={ProductVariationStyle}>
                              <Typography sx={tableData}>
                                {GetProductByIdData?.ProductTechInfo?.Guarantee}
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
                        const newVal = Number().toFixed(2);
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
                              <Typography sx={packHead}>{val.name}</Typography>
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
                      mt={3}
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
              </TabPanel>
              <TabPanel value="2">
                <Grid container>
                  {/* <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexDirection: "column",
                      // gap: 0.5,
                      // backgroundColor: "red",
                      // width: "100%",
                    }}
                  >
                    <Typography sx={product}>Product Details</Typography>
                    <Box>
                      <Typography sx={listText}>
                        Product Name: {GetProductByIdData?.ProductName}
                      </Typography>
                      <Box sx={{ display: "flex", gap: "10px" }}>
                        <Typography sx={listText}>
                          Price Per Unit:{" "}
                          {
                            GetProductByIdData?.ProductsVariantions?.at(0)
                              ?.PricePerUnit
                          }
                        </Typography>
                        <Box
                          component="img"
                          src={BXIToken}
                          sx={{ height: "25px", width: "25px" }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Typography sx={available}>Sample Available :</Typography>
                      {samplestate ? (
                        <Typography sx={{ ...available, fontWeight: 600 }}>
                          Yes
                        </Typography>
                      ) : (
                        <Typography sx={{ ...available, fontWeight: 600 }}>
                          No
                        </Typography>
                      )}
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
                            <Typography sx={listText}>
                              Product Pickup Location:{"   "}
                              {GetProductByIdData?.ProductPickupLocation}
                            </Typography>
                            <Box sx={{ display: "flex", gap: "10px" }}>
                              <Typography sx={available}>
                                Sample Available:
                              </Typography>
                              {samplestate ? (
                                <Typography sx={available}>Yes</Typography>
                              ) : (
                                <Typography sx={available}>No</Typography>
                              )}
                            </Box>
                            {setGetProductByIdData?.OtherCost?.length === 0
                              ? ""
                              : setGetProductByIdData?.OtherCost?.map(
                                  (cost) => {
                                    console.log("cost", cost);
                                    return (
                                      <>
                                        <Typography sx={listText}>
                                          Other cost Price : {cost.CostPrice}
                                        </Typography>
                                        <Typography sx={listText}>
                                          Other cost Price Reason:{" "}
                                          {cost.ReasonOfCost}
                                        </Typography>
                                      </>
                                    );
                                  }
                                )}
                            <Typography sx={available}>
                              Instructions to use Product :{" "}
                              {
                                GetProductByIdData?.ProductTechInfo
                                  ?.InstructionsToUseProduct
                              }
                            </Typography>
                          </Box>
                        </Grid>
                      </Box>
                    </Box>
                  </Box> */}
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
                          console.log("colorRes", res);
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
                                <Typography sx={tableHeader}>
                                  Min QTY
                                </Typography>
                              </TableCell>
                              <TableCell
                                sx={{ borderBottom: "none", width: "120px" }}
                              >
                                <Typography sx={tableHeader}>
                                  Max QTY
                                </Typography>
                              </TableCell>
                              <TableCell
                                sx={{ borderBottom: "none", width: "120px" }}
                              >
                                <Typography sx={tableHeader}>GST</Typography>
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
                                      src={BXIToken}
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
                    </Box>

                    <Box>
                      <Typography sx={find}>
                        Product pickup location & Pin code
                      </Typography>
                      <Grid
                        container
                        sx={{
                          py: 2,
                        }}
                      >
                        <Grid item xl={2} lg={2} md={2} sm={3} xs={3}>
                          <Box>
                            <Typography
                              sx={{ ...tableHeader, color: "#ADB8CC" }}
                            >
                              city
                            </Typography>
                          </Box>
                          <Box sx={tableHeader}>{LocationData?.city}</Box>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={3} xs={3}>
                          <Box>
                            <Typography
                              sx={{ ...tableHeader, color: "#ADB8CC" }}
                            >
                              landmark
                            </Typography>
                          </Box>
                          <Box sx={tableHeader}>{LocationData?.landmark}</Box>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={3} xs={3}>
                          <Box>
                            <Typography
                              sx={{ ...tableHeader, color: "#ADB8CC" }}
                            >
                              pincode
                            </Typography>
                          </Box>
                          <Box sx={tableHeader}>{LocationData?.pincode}</Box>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={3} xs={3}>
                          <Box>
                            <Typography
                              sx={{ ...tableHeader, color: "#ADB8CC" }}
                            >
                              region
                            </Typography>
                          </Box>
                          <Box sx={tableHeader}>{LocationData?.region}</Box>
                        </Grid>
                        <Grid item xl={2} lg={2} md={2} sm={3} xs={3}>
                          <Box>
                            <Typography
                              sx={{ ...tableHeader, color: "#ADB8CC" }}
                            >
                              state
                            </Typography>
                          </Box>
                          <Box sx={tableHeader}> {LocationData?.state}</Box>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* <Box
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
                        ) : null}
                      </Box>
                    </Box> */}
                  </Box>
                </Grid>
              </TabPanel>
              <TabPanel value="3">
                <Typography sx={pack}>Technical Information</Typography>
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

                  <Typography
                    sx={{
                      ...packHead,
                      color: "#6B7A99",
                      fontWeight: 400,
                      fontSize: "16px",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Proin sit nisl a a
                    lectus imperdiet. Nisl consectetur sit lacus proin faucibus
                    vitae. Ut imperdiet massa ut urna dui amet. Feugiat non
                    pellentesque tellus congue augue. Habitant nunc pellentesque
                    duis egestas orci. Gravida elementum venenatis a volutpat
                    luctus. Est vitae tempor vitae eget bibendum leo.
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
                          <Typography sx={packHead}>{val.name}</Typography>
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
            <Button
              variant="contained"
              sx={CartButtonStyle}
              onClick={() => handleAddToCart(ProductId)}
            >
              Add To Cart
            </Button>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

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
  width: "50%",
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
