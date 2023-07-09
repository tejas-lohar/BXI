import {
  DialogTitle,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Input,
  InputLabel,
  Chip,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button, Grid, Paper, Tab, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import LeftArrowForVoucherDetail from "../../../assets/Images/CommonImages/LeftArrowForVoucherDetail.svg";
import CarasoulForVoucherDetails from "../../../components/Carousel/CarasoulForVoucherDetails";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { sendMassage } from "../../../redux/action/Chat/Send-Massages";

import { useNavigate, useParams } from "react-router-dom";
// import { useGetProductById } from "../../../../Hooks/GetProducts/useGetProductById";
import { useGetProductById } from "../../../Hooks/GetProducts/useGetProductById";
import BXITokenIcon from "../../../assets/BXITokenIcon.png";
import PDFIcon from "../../../assets/pdficon.png";
import FeatureName from "../../../components/FeatureName";
import { styles } from "../../../components/common/voucherTemplates/styles/commonStyles";
import { useUpdateProductQuery } from "../../AddProductAllPages/Textile/ProductInfo/ProductHooksQuery";

const tableKeys = {
  "Entertainment & Events": [
    { label: "Price", value: "PricePerUnit" },
    { label: "Min Order Qty", value: "MinOrderQuantity" },
    { label: "Max Order Qty", value: "MaxOrderQuantity" },
    { label: "HSN", value: "HSN" },
    { label: "GST", value: "GST" },
  ],
  FMCG: [
    { label: "Price/Voucher", value: "PricePerUnit" },
    { label: "Total QTY", value: "TotalAvailableQty" },
    { label: "HSN", value: "HSN" },
    { label: "GST", value: "GST" },
    { label: "Min", value: "MinOrderQuantity" },
    { label: "Max", value: "MaxOrderQuantity" },
    { label: "Total uploaded value", value: "TotalValueUploaded" },
    { label: "Size", value: "ProductSize" },
    { label: "Validity", value: "validityOfVoucherValue" },
  ],
  Textile: [
    { label: "Validity", value: "validityOfVoucherValue" },
    { label: "Min Order QTY", value: "MinOrderQuantity" },
    { label: "Max Order Qty", value: "MaxOrderQuantity" },
    { label: "Total QTY", value: "TotalAvailableQty" },
    { label: "Total Uploaded Value", value: "TotalValueUploaded" },
    { label: "HSN", value: "HSN" },
    { label: "GST", value: "GST" },
  ],
  Electronics: [
    { label: "Price/Voucher", value: "PricePerUnit" },
    { label: "Total QTY", value: "TotalAvailableQty" },
    { label: "HSN", value: "HSN" },
    { label: "GST", value: "GST" },
    { label: "Min", value: "MinOrderQuantity" },
    { label: "Max", value: "MaxOrderQuantity" },
    { label: "Total uploaded value", value: "TotalValueUploaded" },
    { label: "Validity", value: "validityOfVoucherValue" },
  ],
  Mobility: [
    { label: "Price/Voucher", value: "PricePerUnit" },
    { label: "Total QTY", value: "TotalAvailableQty" },
    { label: "HSN", value: "HSN" },
    { label: "GST", value: "GST" },
    { label: "Min", value: "MinOrderQuantity" },
    { label: "Max", value: "MaxOrderQuantity" },
    { label: "Total uploaded value", value: "TotalValueUploaded" },
    { label: "Validity", value: "validityOfVoucherValue" },
  ],
  Lifestyle: [
    { label: "Color", value: "ProductColor" },
    { label: "Size", value: "ProductSize" },
    { label: "Price", value: "PricePerUnit" },
    { label: "HSN", value: "HSN" },
    { label: "GST", value: "GST" },
    { label: "Min Order QTY", value: "MinOrderQuantity" },
    { label: "Max Order Qty", value: "MaxOrderQuantity" },
    { label: "Validity", value: "validityOfVoucherValue" },
  ],
  "Office Supply": [
    { label: "Price/Voucher", value: "PricePerUnit" },
    { label: "Total QTY", value: "TotalAvailableQty" },
    { label: "HSN", value: "HSN" },
    { label: "GST", value: "GST" },
    { label: "Min", value: "MinOrderQuantity" },
    { label: "Max", value: "MaxOrderQuantity" },
    { label: "Total uploaded value", value: "TotalValueUploaded" },
    { label: "Validity", value: "validityOfVoucherValue" },
  ],
  Hotel: [
    { label: "Price/Voucher", value: "PricePerUnit" },
    { label: "Total QTY", value: "TotalAvailableQty" },
    { label: "HSN", value: "HSN" },
    { label: "GST", value: "GST" },
    { label: "Min", value: "MinOrderQuantity" },
    { label: "Max", value: "MaxOrderQuantity" },
    { label: "Total uploaded value", value: "TotalValueUploaded" },
    { label: "Validity", value: "validityOfVoucherValue" },
  ],
};

const GiftAndValueVoucherDetails = () => {
  const classes = styles();

  const [value, setValue] = React.useState("1");
  const naviagte = useNavigate();
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [ProductFeatures, setProfuctFeatures] = useState([]);
  let { id } = useParams();
  let ProductId = id;
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();
  const [storeVariationData, setStoreVariationData] = useState();
  const [VoucherCartadata, setVoucherCartData] = useState();
  const [ProductVariationId, setProductVariationId] = useState();
  const [CustomQuantity, setCustomQty] = useState(0);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: ProductData } = useGetProductById(id);

  const [selectedPrice, setSelectedPrice] = useState(null);
  const [distictPrice, setDistictPrice] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    if (ProductData && ProductData.ProductsVariantions) {
      let products = ProductData.ProductsVariantions;
      let distictPrice = [
        ...new Set(products.map((item) => item.PricePerUnit)),
      ];
      setDistictPrice(distictPrice);
      setSelectedPrice(distictPrice[0]);
    }
  }, [ProductData]);

  useEffect(() => {
    if (selectedPrice) {
      let products = ProductData.ProductsVariantions;
      let filteredProducts = selectedPrice
        ? products.filter((item) => item.PricePerUnit === selectedPrice)
        : products;
      setfilteredProducts(filteredProducts);
    }
  }, [selectedPrice]);

  const navigate = useNavigate();

  useEffect(() => {
    getVoucherCartData();
    GetProductByid();
  }, []);

  let offerSpecific = 3;
  localStorage.getItem("digitalData") === "Offer Specific"
    ? (offerSpecific = 3)
    : (offerSpecific = 4);

  let VariationId = 0;

  const renderCellValue = (row, key) => {
    console.log("voucherrow", row?._id);
    minValue = row?.MinOrderQuantity;
    maxValue = row?.MaxOrderQuantity;
    VariationId = row?._id;
    switch (key.value) {
      case "ProductColor":
        return (
          <div
            style={{
              margin: "0px 40px 40px 0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography sx={CommonTypoStyle10}> {key.label} </Typography>
            <Typography sx={CommonTypoStyle11}>
              {" "}
              <input
                value={row[key.value]}
                type="color"
                disabled
                style={{
                  height: "30px",
                  width: "30px",
                  border: "1px",
                }}
              />{" "}
            </Typography>
          </div>
        );

      case "validityOfVoucherValue":
        return (
          <div
            style={{
              margin: "0px 40px 40px 0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography sx={CommonTypoStyle10}> {key.label} </Typography>
            <Typography sx={CommonTypoStyle11}>
              {" "}
              {row[key.value]} &nbsp; {row["validityOfVoucherUnit"]}{" "}
            </Typography>
          </div>
        );
      case "TotalValueUploaded":
        return (
          <div
            style={{
              margin: "0px 40px 40px 0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography sx={CommonTypoStyle10}> {key.label} </Typography>
            <Typography sx={CommonTypoStyle11}>
              {" "}
              {row[key.value]?.toLocaleString("en-US")}
            </Typography>
          </div>
        );
      case "MinOrderQuantity":
        return (
          <div
            style={{
              margin: "0px 40px 40px 0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography sx={CommonTypoStyle10}> {key.label} </Typography>
            <Typography sx={CommonTypoStyle11}>
              {" "}
              {row[key.value]?.toLocaleString("en-US")}
            </Typography>
          </div>
        );
      case "MaxOrderQuantity":
        return (
          <div
            style={{
              margin: "0px 40px 40px 0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography sx={CommonTypoStyle10}> {key.label} </Typography>
            <Typography sx={CommonTypoStyle11}>
              {" "}
              {row[key.value]?.toLocaleString("en-US")}
            </Typography>
          </div>
        );
      default:
        return (
          <div
            style={{
              margin: "0px 40px 40px 0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography sx={CommonTypoStyle10}> {key.label} </Typography>
            <Typography sx={CommonTypoStyle11}> {row[key.value]} </Typography>
          </div>
        );
    }
  };

  console.log("VariationId", VariationId);

  const renderPrice = (price) => {
    return (
      <>
        {price}
        &nbsp;
        <img
          src={BXITokenIcon}
          style={{
            width: "20px",
            height: "20px",
          }}
          alt="BXITokenIcon"
        />
      </>
    );
  };

  let ObjectForAddToCart = {
    ProductVariationId: ProductVariationId,
    ProductQty: CustomQuantity,
    ProductId: ProductId,
    IsMedia: false,
  };
  async function handleAddToCart() {
    console.log("ObjectForAddToCart", ObjectForAddToCart);
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
          getVoucherCartData();
          GetProductByid();
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
          getVoucherCartData();
          GetProductByid();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // ProductData.redemptionType
  const getRedimptionType = () => {
    switch (ProductData?.redemptionType) {
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

  console.log("GetProductByIdData", GetProductByIdData);

  return (
    <Paper
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        width: "100%",
        height: "100%",
      }}
      elevation={0}
    >
      <BreadCrumbHeader MainText="Voucher" />
      <Box
        sx={{
          width: "95%",
          mx: "auto",
          background: "#fff",
          padding: "2rem",
          borderRadius: "20px",
        }}
      >
        <Grid container>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: "2rem",
            }}
          >
            <Box
              component="img"
              src={LeftArrowForVoucherDetail}
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                naviagte(-1);
              }}
            ></Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 700,
                marginLeft: "20%",
                fontSize: {
                  xl: "24px",
                  lg: "24px",
                  md: "24px",
                  sm: "20px",
                  xs: "20px",
                },
                color: "#6B7A99",
              }}
            >
              Preview Page
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                width: "350px",
              }}
            ></Box>
          </Grid>

          {/* **************************** CarasoulForVoucherDetails ********************************** */}
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box style={{ width: "632px" }}>
              {ProductData?.ProductImages &&
                ProductData?.ProductImages.length > 0 && (
                  <CarasoulForVoucherDetails
                    imgSrc={ProductData?.ProductImages}
                  />
                )}
            </Box>
          </Grid>

          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Box
              sx={{
                // background: "pink",
                width: "100%",
                mx: "auto",
              }}
            >
              <Box
                sx={{
                  //   background: "red",
                  paddingTop: {
                    xl: "0rem",
                    lg: "0rem",
                    md: "0rem",
                    sm: "4rem",
                    xs: "4rem",
                  },
                  display: "grid",
                  gap: "1rem",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: {
                      xl: "20px",
                      lg: "20px",
                      md: "20px",
                      sm: "16px",
                      xs: "16px",
                    },
                    color: "#4D4D4D",
                    textAlign: {
                      xl: "left",
                      lg: "left",
                      md: "left",
                      sm: "center",
                      xs: "center",
                    },
                  }}
                >
                  {ProductData?.ProductName}
                </Typography>

                <div
                  style={{
                    margin: "0px 80px 10px 0px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                  }}
                >
                  <Typography
                    sx={CommonTypoStyle11}
                    style={{ display: "flex" }}
                    className={classes.priceCard}
                  >
                    {GetProductByIdData &&
                      GetProductByIdData?.ProductsVariantions?.length > 0 &&
                      GetProductByIdData?.ProductsVariantions?.map(
                        (color, idx) => (
                          <Chip
                            label={renderPrice(color?.DiscountedPrice)}
                            style={{
                              background: "none",
                              fontSize: "16px",
                              border: "1px solid #CCCCCC",
                              marginRight: "5px",
                              marginBottom: "10px",
                              cursor: "pointer",
                              borderRadius: "11px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            sx={
                              color == selectedPrice
                                ? { border: "1px solid #445FD2 !important" }
                                : {}
                            }
                            onClick={() => {
                              setProductVariationId(color?._id);
                              setSelectedPrice(color?.DiscountedPrice);
                            }}
                          />
                        )
                      )}
                  </Typography>
                </div>
              </Box>

              <Grid
                container
                sx={{
                  py: "2rem",
                }}
              >
                {filteredProducts && filteredProducts.length > 0 && (
                  <>
                    {tableKeys &&
                    tableKeys[localStorage.getItem("companyType")] ? (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "start",
                            flexWrap: "wrap",
                          }}
                        >
                          {tableKeys[localStorage.getItem("companyType")].map(
                            (item) => {
                              return renderCellValue(filteredProducts[0], item);
                            }
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "start",
                            flexWrap: "wrap",
                          }}
                        >
                          <div
                            style={{
                              margin: "0px 40px 40px 0px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                            }}
                          >
                            <Typography sx={CommonTypoStyle10}>
                              Validity
                            </Typography>
                            <Typography sx={CommonTypoStyle11}>
                              {
                                ProductData.ProductsVariantions[0][
                                  "validityOfVoucher"
                                ]
                              }{" "}
                              {
                                ProductData.ProductsVariantions[0][
                                  "validityOfVoucherUnit"
                                ]
                              }
                            </Typography>
                          </div>
                          <div
                            style={{
                              margin: "0px 40px 40px 0px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                            }}
                          >
                            <Typography sx={CommonTypoStyle10}>
                              Min order QTY
                            </Typography>
                            <Typography sx={CommonTypoStyle11}>
                              {
                                ProductData.ProductsVariantions[0][
                                  "MinOrderQuantity"
                                ]
                              }
                            </Typography>
                          </div>
                          <div
                            style={{
                              margin: "0px 40px 40px 0px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                            }}
                          >
                            <Typography sx={CommonTypoStyle10}>
                              Max order QTY
                            </Typography>
                            <Typography sx={CommonTypoStyle11}>
                              {
                                ProductData.ProductsVariantions[0][
                                  "MaxOrderQuantity"
                                ]
                              }
                            </Typography>
                          </div>
                          <div
                            style={{
                              margin: "0px 40px 40px 0px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                            }}
                          >
                            <Typography sx={CommonTypoStyle10}>
                              Price per Product
                            </Typography>
                            <Typography sx={CommonTypoStyle11}>
                              {ProductData.ProductsVariantions[0][
                                "PricePerUnit"
                              ]?.toLocaleString("en-US")}
                            </Typography>
                          </div>
                          <div
                            style={{
                              margin: "0px 40px 40px 0px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                            }}
                          >
                            <Typography sx={CommonTypoStyle10}>
                              GST per Product
                            </Typography>
                            <Typography sx={CommonTypoStyle11}>
                              {ProductData.ProductsVariantions[0]["GST"]} %
                            </Typography>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </Grid>

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
                          <Typography className={classes.sectionTitle}>
                            {ProductData?.ProductName}
                          </Typography>
                          <Typography className={classes.titleDesc}>
                            {ProductData?.ProductSubtitle}
                          </Typography>
                          <Typography className={classes.titleDesc}>
                            {ProductData?.ProductDescription}
                          </Typography>
                        </Box>
                        {/* general info section ends */}

                        {/* tech info section starts */}
                        <Box style={{ marginBottom: "25px" }}>
                          <Typography className={classes.sectionTitle}>
                            Store Details
                          </Typography>

                          {ProductData?.redemptionType &&
                            (ProductData.redemptionType == "offline" ||
                              ProductData.redemptionType == "both") && (
                              <>
                                <Box style={{ marginBottom: "10px" }}>
                                  <Typography className={classes.subTitle}>
                                    Store Address
                                  </Typography>
                                  <Typography className={classes.titleDesc}>
                                    {ProductData?.Address}&nbsp;
                                    {ProductData?.Area}&nbsp;
                                    {ProductData?.Landmark}&nbsp;
                                    {ProductData?.City}&nbsp;
                                    {ProductData?.State}
                                  </Typography>
                                </Box>
                                <Box
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
                                          {ProductData?.Area}{" "}
                                        </td>
                                        <td className={classes.titleDesc}>
                                          {ProductData?.Landmark}{" "}
                                        </td>
                                        <td className={classes.titleDesc}>
                                          {ProductData?.City}{" "}
                                        </td>
                                        <td className={classes.titleDesc}>
                                          {ProductData?.State}{" "}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </Box>

                                {ProductData?.HotelsListUrls &&
                                  ProductData?.HotelsListUrls.length > 0 && (
                                    <Box style={{ marginBottom: "10px" }}>
                                      <Typography className={classes.subTitle}>
                                        Store List
                                      </Typography>
                                      <Box
                                        component={"a"}
                                        download="hotelsList"
                                        target="_blank"
                                        href={
                                          ProductData?.HotelsListUrls &&
                                          ProductData?.HotelsListUrls[0]?.url
                                            ? ProductData.HotelsListUrls[0].url
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

                          {ProductData?.redemptionType &&
                            ProductData.redemptionType == "online" && (
                              <>
                                <Box style={{ marginBottom: "10px" }}>
                                  <Typography className={classes.subTitle}>
                                    Store Link
                                  </Typography>
                                  <a
                                    className={classes.titleDesc}
                                    target="_blank"
                                    href={
                                      ProductData?.Link ? ProductData?.Link : ""
                                    }
                                  >
                                    {ProductData?.Link ? ProductData?.Link : ""}
                                  </a>
                                </Box>
                              </>
                            )}

                          <Box style={{ marginBottom: "10px", width: "650px" }}>
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
                                    {ProductData?.ListThisProductForAmount}{" "}
                                    {ProductData?.ListThisProductForUnitOfTime}{" "}
                                  </td>
                                  {localStorage.getItem("companyType") ===
                                    "Textile" && (
                                    <td className={classes.titleDesc}>
                                      {ProductData?.gender}
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          </Box>
                        </Box>
                        {/* tech info section ends */}

                        {/* additional section starts */}
                        {ProductData?.OtherCost && (
                          <Box style={{ marginBottom: "25px", width: "800px" }}>
                            <Typography className={classes.sectionTitle}>
                              Additional Cost
                            </Typography>
                            <table style={{ width: "100%" }}>
                              <tbody>
                                {ProductData.OtherCost.map((item, i) => {
                                  return (
                                    <tr>
                                      <td
                                        width="80px"
                                        className={classes.titleDesc}
                                      >
                                        {item?.AdCostApplicableOn
                                          ? item.AdCostApplicableOn
                                          : null}
                                      </td>
                                      <td className={classes.titleDesc}>
                                        {item?.ReasonOfCost
                                          ? item.ReasonOfCost
                                          : null}
                                      </td>
                                      <td
                                        width="120px"
                                        className={classes.titleDesc}
                                      >
                                        {item?.AdCostHSN ? (
                                          <>HSN - {item.AdCostHSN} </>
                                        ) : null}
                                      </td>
                                      <td
                                        width="100px"
                                        className={classes.titleDesc}
                                      >
                                        {item?.AdCostGST ? (
                                          <>GST - {item.AdCostGST} %</>
                                        ) : (
                                          "GST -  0 %"
                                        )}
                                      </td>
                                      <td
                                        width="100px"
                                        className={classes.titleDesc}
                                      >
                                        {item?.AdCostApplicableOn ? (
                                          <>
                                            {" "}
                                            {item.currencyType} &nbsp;{" "}
                                            {item.CostPrice}
                                          </>
                                        ) : null}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
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
                            {ProductData?.Inclusions}
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
                            {ProductData?.Exclusions}
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
                            {ProductData?.TermConditions}
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
                            {ProductData?.ProductFeatures?.map((res) => {
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
                <Box sx={{ width: "95%", mx: "auto", mt: 2 }}>
                  {VoucherCartadata?.find(
                    (item) => item?.ProductId?._id === ProductId
                  ) ? (
                    <Button
                      sx={uploadBtn}
                      onClick={() => navigate("/home/cart")}
                    >
                      Go To Cart
                    </Button>
                  ) : (
                    <Button sx={uploadBtn} onClick={handleAddToCart}>
                      Add To Cart
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default GiftAndValueVoucherDetails;

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

const HeaderIconStyle = {
  border: "1px solid #8C8C8C",
  borderRadius: "6px",
  padding: {
    xl: "14px",
    lg: "14px",
    md: "10px",
    sm: "8px",
    xs: "8px",
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

const HeaderButtonStyle = {
  fontFamily: "Poppins",
  width: {
    xl: "50%",
    lg: "50%",
    md: "70%",
    sm: "80%",
    xs: "80%",
  },
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 14,
  color: "#B1B1B1",
  border: "1px solid #8C8C8C",
  borderRadius: "6px",
};

const VoucherDetailSecondGrid = {
  py: "1rem",
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

const StoreDetails = {
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

const txt = {
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
  pt: "0.5%",
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

const storelist = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
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
};

const storelink = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
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
};

const CommonTypoStyle = {
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
  letterSpacing: "1px",
  color: "#6B7A99",
  width: "auto",
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

const CommonTypoStyle4 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  marginTop: "3%",
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

const paraContent = {
  fontFamily: "Poppins",
  fontSize: {
    xs: "12px",
    sm: "15px",
    md: "20px",
    lg: "15px",
    xl: "15px",
  },
  fontWeight: 400,
  lineHeight: "24px",
  letterSpacing: "0em",
};
const CommonTypoStyle10 = {
  fontFamily: "Poppins",
  fontSize: {
    xs: "12px",
    sm: "15px",
    md: "20px",
    lg: "15px",
    xl: "15px",
  },
  fontWeight: "600",
  lineHeight: "24px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#6B7A99",
};

const CommonTypoStyle11 = {
  fontFamily: "Poppins",
  fontSize: {
    xs: "12px",
    sm: "15px",
    md: "20px",
    lg: "15px",
    xl: "15px",
  },
  fontWeight: "600",
  lineHeight: "24px",
  letterSpacing: "0em",
  textAlign: "left",
  color: "#B1B1B1",
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
