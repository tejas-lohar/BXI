import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
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
import FilledStar from "../../../assets/FilledStar.png";
import BlankStar from "../../../assets/BlankStar.png";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

const tableKeys = {
  "Entertainment & Events": [
    { label: 'Price/Voucher', value: 'PricePerUnit' },
    { label: 'Total QTY', value: 'TotalAvailableQty' },
    { label: 'HSN', value: 'HSN' },
    { label: 'GST', value: 'GST' },
    { label: 'Min', value: 'MinOrderQuantity' },
    { label: 'Max', value: 'MaxOrderQuantity' },
    { label: 'Total uploaded value', value: 'TotalValueUploaded' },
    { label: 'Validity', value: 'validityOfVoucherValue' },
  ],
  FMCG: [
    { label: 'Price/Voucher', value: 'PricePerUnit' },
    { label: 'Total QTY', value: 'TotalAvailableQty' },
    { label: 'HSN', value: 'HSN' },
    { label: 'GST', value: 'GST' },
    { label: 'Min', value: 'MinOrderQuantity' },
    { label: 'Max', value: 'MaxOrderQuantity' },
    { label: 'Total uploaded value', value: 'TotalValueUploaded' },
    { label: 'Size', value: 'ProductSize' },
    { label: 'Validity', value: 'validityOfVoucherValue' },
  ],
  "Textile": [
    { label: 'Size', value: 'ProductSize' },
    { label: 'Total QTY', value: 'TotalAvailableQty' },
    { label: 'Min QTY', value: 'MinOrderQuantity' },
    { label: 'Max QTY', value: 'MaxOrderQuantity' },
    { label: 'Total Uploaded Value', value: 'TotalValueUploaded' },
    { label: 'HSN', value: 'HSN' },
    { label: 'GST', value: 'GST' },
  ],
  "Electronics": [
    { label: 'Price/Voucher', value: 'PricePerUnit' },
    { label: 'Total QTY', value: 'TotalAvailableQty' },
    { label: 'HSN', value: 'HSN' },
    { label: 'GST', value: 'GST' },
    { label: 'Min', value: 'MinOrderQuantity' },
    { label: 'Max', value: 'MaxOrderQuantity' },
    { label: 'Total uploaded value', value: 'TotalValueUploaded' },
    { label: 'Size', value: 'ProductSize' },
    { label: 'Validity', value: 'validityOfVoucherValue' },
  ],
  "Mobility": [
    { label: 'Price/Voucher', value: 'PricePerUnit' },
    { label: 'Total QTY', value: 'TotalAvailableQty' },
    { label: 'HSN', value: 'HSN' },
    { label: 'GST', value: 'GST' },
    { label: 'Min', value: 'MinOrderQuantity' },
    { label: 'Max', value: 'MaxOrderQuantity' },
    { label: 'Total uploaded value', value: 'TotalValueUploaded' },
    { label: 'Size', value: 'ProductSize' },
    { label: 'Validity', value: 'validityOfVoucherValue' },
  ],
  "Lifestyle": [
    { label: 'Price/Voucher', value: 'PricePerUnit' },
    { label: 'Total QTY', value: 'TotalAvailableQty' },
    { label: 'HSN', value: 'HSN' },
    { label: 'GST', value: 'GST' },
    { label: 'Min', value: 'MinOrderQuantity' },
    { label: 'Max', value: 'MaxOrderQuantity' },
    { label: 'Total uploaded value', value: 'TotalValueUploaded' },
    { label: 'Size', value: 'ProductSize' },
    { label: 'Validity', value: 'validityOfVoucherValue' },
  ],
  "Office Supply": [
    { label: 'Price/Voucher', value: 'PricePerUnit' },
    { label: 'Total QTY', value: 'TotalAvailableQty' },
    { label: 'HSN', value: 'HSN' },
    { label: 'GST', value: 'GST' },
    { label: 'Min', value: 'MinOrderQuantity' },
    { label: 'Max', value: 'MaxOrderQuantity' },
    { label: 'Total uploaded value', value: 'TotalValueUploaded' },
    { label: 'Size', value: 'ProductSize' },
    { label: 'Validity', value: 'validityOfVoucherValue' },
  ],
  "Hotel": [
    { label: 'Price/Voucher', value: 'PricePerUnit' },
    { label: 'Total QTY', value: 'TotalAvailableQty' },
    { label: 'HSN', value: 'HSN' },
    { label: 'GST', value: 'GST' },
    { label: 'Min', value: 'MinOrderQuantity' },
    { label: 'Max', value: 'MaxOrderQuantity' },
    { label: 'Total uploaded value', value: 'TotalValueUploaded' },
    { label: 'Validity', value: 'validityOfVoucherValue' },
  ],
  "Airlines Tickets": [
    { label: 'Total QTY', value: 'TotalAvailableQty' },
    { label: 'Min', value: 'MinOrderQuantity' },
    { label: 'Max', value: 'MaxOrderQuantity' },
    { label: 'Total uploaded value', value: 'TotalValueUploaded' },
    { label: 'Validity', value: 'validityOfVoucherValue' },
    { label: 'HSN', value: 'HSN' },
    { label: 'GST', value: 'GST' },
  ],
  "QSR":[
    { label: 'Price/Voucher', value: 'PricePerUnit' },
    { label: 'Total QTY', value: 'TotalAvailableQty' },
    { label: 'HSN', value: 'HSN' },
    { label: 'GST', value: 'GST' },
    { label: 'Min', value: 'MinOrderQuantity' },
    { label: 'Max', value: 'MaxOrderQuantity' },
    { label: 'Total uploaded value', value: 'TotalValueUploaded' },
    { label: 'Validity', value: 'validityOfVoucherValue' },
  ]
}
const VoucherTypeOne = () => {
  const classes = styles();

  const [value, setValue] = React.useState("1");
  const naviagte = useNavigate();

  const id = useParams().id;
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();
  const [storeVariationData, setStoreVariationData] = useState();
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [ProductData, setProductData] = useState(null)

  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    mutate: updateProduct,
    isLoading,
    isError,
    data: productData,
    reset,
    variables,

    error: RegisterError,
  } = useUpdateProductQuery();
  // const { data: ProductData } = useGetProductById(id);
  const getProductData = async () => {
    await axios
      .get(`product/get_product_byId/${id}`)
      .then((res) => {
        console.log("res", res);
        setProductData(res?.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    getProductData();
    console.log("GetProductByIdData==", ProductData);
  }, []);

  const [selectedColor, setSelectedColor] = useState(null);
  const [distinctVariation, setDistinctVariation] = useState([])
  const [filteredProducts, setfilteredProducts] = useState([])



  const prepareData = () => {
    console.log('ProductData.ProductsVariantions=====111', localStorage.getItem("companyType"))
    if (ProductData && ProductData.ProductsVariantions) {
      let products = ProductData.ProductsVariantions
      let distinctVariation = null

      if (localStorage.getItem("companyType") === "Hotel" || localStorage.getItem("companyType") === "QSR") {
        distinctVariation = [...new Set(products.map(item => item.OfferingType))];
      } else if (localStorage.getItem("companyType") === "Textile" || localStorage.getItem("companyType") === "Mobility" || localStorage.getItem("companyType") === "Electronics" || localStorage.getItem("companyType") === "Office Supply" || localStorage.getItem("companyType") === "Lifestyle") {
        distinctVariation = [...new Set(products.map(item => item.ProductColor))];
      }
      else if (localStorage.getItem("companyType") === "FMCG") {
        distinctVariation = [...new Set(products.map(item => item.Flavor))];
      }
      else if (localStorage.getItem("companyType") === "Entertainment & Events") {
        distinctVariation = [...new Set(products.map(item => item.DateOfTheEvent))];
      }
      setDistinctVariation(distinctVariation);

      if (distinctVariation && distinctVariation.length > 0) setSelectedColor(distinctVariation[0])



    }
  }


  useEffect(() => {
    if (selectedColor) {
      let products = ProductData.ProductsVariantions
      let filteredProducts = null

      if (localStorage.getItem("companyType") === "Hotel" || localStorage.getItem("companyType") === "QSR") {
        filteredProducts = selectedColor
          ? products.filter(item => item.OfferingType === selectedColor)
          : products;
        setfilteredProducts(filteredProducts)
      } else if (localStorage.getItem("companyType") === "Textile" || localStorage.getItem("companyType") === "Mobility" || localStorage.getItem("companyType") === "Electronics" || localStorage.getItem("companyType") === "Office Supply" || localStorage.getItem("companyType") === "Lifestyle") {
        filteredProducts = selectedColor
          ? products.filter(item => item.ProductColor === selectedColor)
          : products;
        setfilteredProducts(filteredProducts)
      } else if (localStorage.getItem("companyType") === "FMCG") {
        filteredProducts = selectedColor
          ? products.filter(item => item.Flavor === selectedColor)
          : products;
        setfilteredProducts(filteredProducts)
      }
      else if (localStorage.getItem("companyType") === "Entertainment & Events") {
        filteredProducts = selectedColor
          ? products.filter(item => item.DateOfTheEvent === selectedColor)
          : products;
        setfilteredProducts(filteredProducts)
      }



    }
  }, [selectedColor])
  console.log("===>datahereOfProductData", id, ProductData);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [one, setone] = React.useState();
  const step = [
    {
      id: 1,
      messgage: "Product Defective/Damaged",
    },
    {
      id: 2,
      messgage: "Product not Delivered ",
    },
    {
      id: 3,
      messgage: "Raise a ticket with BXI ",
    },
    {
      id: 4,
      messgage: "Issue with Invoicing ",
    },
    {
      id: 5,
      messgage: "Issue with Pricing",
    },
    {
      id: 6,
      messgage: "Issue with Tokens",
    },
  ];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home/message");
  };
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
  const UpdateNotifications = async (
    userId = "64364eddca8d144a536b64c2",
    admin = "6437d9efb16a5049913d70a5"
  ) => {
    try {
      console.log("call");
      const res1 = await axios.post(
        `support/create_room`,
        { userId, admin },
        { withCredentials: true }
      );
      const id = res1.data._id;
      const type = "text";
      let content = "Product Defective/Damaged";
      dispatch(sendMassage(content, id, type));
    } catch (err) {
      console.log(err);
    }
  };

  let offerSpecific = 3;
  localStorage.getItem("digitalData") === "Offer Specific"
    ? (offerSpecific = 3)
    : (offerSpecific = 4);

  const displayRatingStar = () => {
    const max_star = 5;
    const filled_star = parseInt(ProductData?.HotelStars);
    const blank_star = parseInt(max_star - filled_star);
    const arrFilledStar = new Array(filled_star).fill(FilledStar);
    const arrBlankStar = new Array(blank_star).fill(BlankStar);
    return (
      <div>
         {arrFilledStar.map((src, index) => (
          <img
            key={index}
            src={src}
          />
        ))}
        {arrBlankStar.map((src, index) => (
          <img
            key={index}
            src={src}
          />
        ))}
      </div>
    );
  }

  const renderCellValue = (row, key) => {
    switch (key) {
      case "PricePerUnit":
        return (
          <>
            {row[key]?.toLocaleString("en-US")}
          </>
        );
      case "ProductColor":
        return (
          <input
            value={row[key]}
            type="color"
            disabled
            style={{
              height: "30px",
              width: "30px",
              border: "1px",
            }}
          />
        );
      case "validityOfVoucherValue":
        return (
          <>
            {row[key]} &nbsp; {row["validityOfVoucherUnit"]}
          </>
        );
      case "TotalValueUploaded":
        return (
          <>
            {row[key]?.toLocaleString("en-US")}
          </>
        );
      case "MinOrderQuantity":
        return (
          <>
            {row[key]?.toLocaleString("en-US")}
          </>
        );
      case "MaxOrderQuantity":
        return (
          <>
            {row[key]?.toLocaleString("en-US")}
          </>
        );
      case "GST":
        return (
          <>
            {row[key]} %
          </>
        );
      default:
        return row[key];
    }
  };


  useEffect(() => {
    const timeoutId = setInterval(() => {
      if (localStorage.getItem("companyType") != 'undefined' && ProductData && ProductData.ProductsVariantions) {
        prepareData();
        clearInterval(timeoutId);
      }
    }, 700);

    return () => {
      clearInterval(timeoutId);
    };
  }, [ProductData]);


  // ProductData.redemptionType
  const getRedimptionType = () => {
    switch (ProductData?.redemptionType) {
      case "online":
        return "Online"
      case "offline":
        return "Offline"
      case "both":
        return "Online and Offline"
      default:
        return "-"
    }
  }

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
              onClick={() => {
                naviagte(-1);
              }}
              src={LeftArrowForVoucherDetail}
              sx={{
                cursor: "pointer",
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
            >

            </Box>
          </Grid>

          {/* **************************** CarasoulForVoucherDetails ********************************** */}
          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Box >
              {ProductData?.ProductImages &&
                ProductData?.ProductImages.length > 0 && (
                  <CarasoulForVoucherDetails
                    imgSrc={ProductData?.ProductImages}
                  />
                )}
            </Box>
          </Grid>



          <Grid item xl={7} lg={7} md={7} sm={12} xs={12}>
            <Box
              sx={{
                // background: "pink",
                width: "90%",
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
                <Typography className={classes.sectionTitle} >
                  {ProductData?.ProductName}


                </Typography>
                {localStorage.getItem("companyType") != "Airlines Tickets" && <Box

                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginTop: "-2%",
                    justifyContent: {
                      xl: "flex-start",
                      lg: "flex-start",
                      md: "flex-start",
                      sm: "center",
                      xs: "center",
                    },
                  }}
                >
                  {/* <Box component="img" src={coinsIcon}></Box> */}

                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: {
                        xl: "25px",
                        lg: "25px",
                        md: "25px",
                        sm: "20px",
                        xs: "20px",
                      },
                      letterSpacing: "0.06em",
                      textTransform: "capitalize",
                      color: "#6B7A99",
                    }}
                  >
                    {/* 25.00/ Voucher */}
                    {
                      filteredProducts && filteredProducts.length > 0 &&
                      <> {filteredProducts[0]['PricePerUnit']?.toLocaleString("en-US")} </>
                    }

                  </Typography>
                  <img
                    src={BXITokenIcon}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                    }}
                    alt="BXITokenIcon"
                  />
                </Box>}
                {localStorage.getItem("companyType") === "Hotel" && 
                  ProductData?.HotelStars && displayRatingStar()
                }
              </Box>

              <Grid
                container
                sx={{
                  py: "2rem",
                }}
              >
                <div
                  style={{
                    margin: "0px 80px 10px 0px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  {
                    (localStorage.getItem("companyType") === "Hotel" || localStorage.getItem("companyType") === "QSR") && <>

                      <Typography sx={CommonTypoStyle10}>
                        Offering Type
                      </Typography>

                      <Select
                        className={classes.goLiveSelectBox}
                        sx={{
                          width: '100%',
                          fontSize: "15px",
                          fontWeight: '600',
                          padding: "0",
                          color: "#B1B1B1",
                          ".MuiSelect-select": { padding: "0" },
                          ".MuiOutlinedInput-notchedOutline": { border: 0 },
                          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                        }}
                        value={selectedColor || '-1'}

                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            fontSize: "14px",
                            padding: "10px",
                          },
                        }}
                        onChange={(e) => setSelectedColor(e.target.value)}
                      >


                        {distinctVariation && distinctVariation.length > 0 &&
                          distinctVariation.map(color => (
                            <MenuItem className={classes.goLiveMenuItems} value={color} >
                              <Typography sx={{
                                color: "#B1B1B1",
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 600,
                                fontSize: "15px",
                              }}> {color}</Typography>
                            </MenuItem>
                          ))
                        }
                      </Select>



                    </>
                  }
                  {
                    localStorage.getItem("companyType") === "Entertainment & Events" && <>

                      <Typography sx={CommonTypoStyle10}>
                        Date of the Event
                      </Typography>

                      <Select
                        className={classes.goLiveSelectBox}
                        sx={{
                          width: '100%',
                          fontSize: "15px",
                          fontWeight: '600',
                          padding: "0",
                          color: "#B1B1B1",
                          ".MuiSelect-select": { padding: "0" },
                          ".MuiOutlinedInput-notchedOutline": { border: 0 },
                          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                        }}
                        value={selectedColor || '-1'}

                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            fontSize: "14px",
                            padding: "10px",
                          },
                        }}
                        onChange={(e) => setSelectedColor(e.target.value)}
                      >


                        {distinctVariation && distinctVariation.length > 0 &&
                          distinctVariation.map(color => (
                            <MenuItem className={classes.goLiveMenuItems} value={color} >
                              <Typography sx={{
                                color: "#B1B1B1",
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 600,
                                fontSize: "15px",
                              }}> {color}</Typography>
                            </MenuItem>
                          ))
                        }
                      </Select>



                    </>
                  }

                  {
                    localStorage.getItem("companyType") === "FMCG" && <>

                      <Typography sx={CommonTypoStyle10}>
                        Flavor
                      </Typography>
                      <Select
                        className={classes.goLiveSelectBox}
                        sx={{
                          width: '100%',
                          fontSize: "15px",
                          fontWeight: '600',
                          padding: "0",
                          color: "#B1B1B1",
                          ".MuiSelect-select": { padding: "0" },
                          ".MuiOutlinedInput-notchedOutline": { border: 0 },
                          "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                          "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: 0,
                          },
                        }}
                        value={selectedColor || '-1'}

                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            fontSize: "14px",
                            padding: "10px",
                          },
                        }}
                        onChange={(e) => setSelectedColor(e.target.value)}
                      >


                        {distinctVariation && distinctVariation.length > 0 &&
                          distinctVariation.map(color => (
                            <MenuItem className={classes.goLiveMenuItems} value={color} >
                              <Typography sx={{
                                color: "#B1B1B1",
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 600,
                                fontSize: "15px",
                              }}> {color}</Typography>
                            </MenuItem>
                          ))
                        }
                      </Select>
                    </>
                  }
                  {
                    (localStorage.getItem("companyType") === "Textile" || localStorage.getItem("companyType") === "Mobility" || localStorage.getItem("companyType") === "Electronics" || localStorage.getItem("companyType") === "Office Supply" || localStorage.getItem("companyType") === "Lifestyle") && <>
                      <Typography sx={CommonTypoStyle10}>
                        Available colors
                      </Typography>
                      <Typography sx={CommonTypoStyle11}>
                        {distinctVariation && distinctVariation.length > 0 &&
                          distinctVariation.map(color => (
                            <Chip
                              key={color}
                              // label={color}
                              style={{ border: "1px solid #CCCCCC", backgroundColor: color, marginRight: '5px', marginBottom: '10px', cursor: 'pointer', width: '30px', height: '30px', borderRadius: '3px' }}
                              sx={color == selectedColor ? { border: '1px solid #445FD2 !important' } : {}}
                              onClick={() => setSelectedColor(color)}
                            />
                          ))
                        }
                      </Typography>
                    </>
                  }

                </div>
                {localStorage.getItem("companyType") != "Airlines Tickets" && <div
                  style={{
                    margin: "0px 80px 10px 0px",
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
                      filteredProducts && filteredProducts.length > 0 &&
                      <>{filteredProducts[0]['validityOfVoucherValue']} &nbsp; {filteredProducts[0]['validityOfVoucherUnit']}</>
                    }
                  </Typography>
                </div>}

                {
                  ProductData?.ProductsVariantions &&
                  ProductData.ProductsVariantions.length > 0 && (
                    <>
                      <table className={classes.customTable}>
                        <thead>
                          <tr>
                            {
                              tableKeys &&
                                tableKeys[localStorage.getItem("companyType")] ? (
                                <>
                                  {tableKeys[
                                    localStorage.getItem("companyType")
                                  ].map((item) => {
                                    return <td>{item.label}</td>;
                                  })}
                                </>
                              ) : null
                            }
                          </tr>
                        </thead>
                        <tbody>
                          {
                            localStorage.getItem("companyType") == "Airlines Tickets" ?
                              <>
                                {

                                  ProductData.ProductsVariantions.length > 0 && ProductData.ProductsVariantions.map((row, i) => (
                                    <tr>
                                      {
                                        tableKeys &&
                                          tableKeys[
                                          localStorage.getItem("companyType")
                                          ] ? (
                                          <>
                                            {tableKeys[
                                              localStorage.getItem("companyType")
                                            ].map((item) => {
                                              return (
                                                <td>
                                                  {renderCellValue(row, item.value)}
                                                </td>
                                              );
                                            })}
                                          </>
                                        ) : null
                                      }
                                    </tr>
                                  ))
                                }
                              </> :
                              <>
                                {
                                  filteredProducts && filteredProducts.length > 0 && filteredProducts.map((row, i) => (
                                    <tr>
                                      {
                                        tableKeys &&
                                          tableKeys[
                                          localStorage.getItem("companyType")
                                          ] ? (
                                          <>
                                            {tableKeys[
                                              localStorage.getItem("companyType")
                                            ].map((item) => {
                                              return (
                                                <td>
                                                  {renderCellValue(row, item.value)}
                                                </td>
                                              );
                                            })}
                                          </>
                                        ) : null
                                      }
                                    </tr>
                                  ))
                                }
                              </>

                          }
                        </tbody>
                      </table>
                    </>
                  )
                }
              </Grid>
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
                        <Box style={{ marginBottom: '25px' }}>
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
                        <Box style={{ marginBottom: '25px' }}>
                          <Typography className={classes.sectionTitle}>
                            Store Details
                          </Typography>

                          {ProductData?.redemptionType && (ProductData.redemptionType == "offline" || ProductData.redemptionType == "both") &&
                            <>
                              <Box style={{ marginBottom: '10px' }}>
                                <Typography className={classes.subTitle}>
                                  Store Address
                                </Typography>
                                <Typography className={classes.titleDesc}>
                                  {ProductData?.Address}&nbsp;{ProductData?.Area}&nbsp;{ProductData?.Landmark}&nbsp;{ProductData?.City}&nbsp;{ProductData?.State}
                                </Typography>
                              </Box>
                              <Box sx={{ width: "650px", marginBottom: '10px' }} >
                                <table style={{ width: '100%' }}>
                                  <thead>
                                    <tr>
                                      <td className={classes.subTitle} >Area </td>
                                      <td className={classes.subTitle} >Landmark </td>
                                      <td className={classes.subTitle} >City </td>
                                      <td className={classes.subTitle} >State </td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className={classes.titleDesc} >{ProductData?.Area} </td>
                                      <td className={classes.titleDesc} >{ProductData?.Landmark} </td>
                                      <td className={classes.titleDesc} >{ProductData?.City} </td>
                                      <td className={classes.titleDesc} >{ProductData?.State} </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </Box>

                              {ProductData?.HotelsListUrls &&
                                ProductData?.HotelsListUrls.length > 0 && (
                                  <Box style={{ marginBottom: '10px' }}>
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
                          }

                          {
                            ProductData?.redemptionType && (ProductData.redemptionType == "online"  || ProductData.redemptionType == "both") &&
                            <>
                              <Box style={{ marginBottom: '10px' }}>
                                <Typography className={classes.subTitle} >
                                  Store Link
                                </Typography>
                                <a
                                  className={classes.titleDesc}
                                  target="_blank"
                                  href={
                                    ProductData?.Link
                                      ? ProductData?.Link
                                      : ""
                                  }
                                >
                                  {ProductData?.Link
                                    ? ProductData?.Link
                                    : ""}
                                </a>
                              </Box>
                            </>
                          }

                          <Box style={{ marginBottom: '10px', width: "650px", }}>
                            <table style={{ width: "100%" }}>
                              <thead>
                                <tr>
                                  <td className={classes.subTitle} >Redemption Type</td>
                                  <td className={classes.subTitle} >Listed this Product for</td>
                                  {localStorage.getItem("companyType") === "Textile" && <td className={classes.subTitle} >Gender</td>}
                                  {localStorage.getItem("companyType") === "Airlines Tickets" && <td className={classes.subTitle} >From</td>}
                                  {localStorage.getItem("companyType") === "Airlines Tickets" && <td className={classes.subTitle} >Destination</td>}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className={classes.titleDesc} >
                                    {getRedimptionType()}
                                  </td>
                                  <td className={classes.titleDesc} >{ProductData?.ListThisProductForAmount} {ProductData?.ListThisProductForUnitOfTime} </td>
                                  {localStorage.getItem("companyType") === "Textile" && <td className={classes.titleDesc} >{ProductData?.gender}</td>}
                                  {localStorage.getItem("companyType") === "Airlines Tickets" && <td className={classes.titleDesc} >{ProductData?.fromLocation}</td>}
                                  {localStorage.getItem("companyType") === "Airlines Tickets" && <td className={classes.titleDesc} >{ProductData?.destinationLocation}</td>}
                                </tr>
                              </tbody>
                            </table>
                          </Box>

                        </Box>
                        {/* tech info section ends */}



                        {/* additional section starts */}
                        {ProductData?.OtherCost && ProductData?.OtherCost.length > 0 && <Box style={{ marginBottom: '25px', width: "800px", }}>
                          <Typography className={classes.sectionTitle}>
                            Additional Cost

                          </Typography>
                          <table style={{ width: "100%" }}>
                            <tbody>
                              {ProductData.OtherCost.map((item, i) => {
                                return (
                                  <tr>
                                    <td width="80px" className={classes.titleDesc}  >{item?.AdCostApplicableOn ? item.AdCostApplicableOn : null}</td>
                                    <td className={classes.titleDesc}  >{item?.ReasonOfCost ? item.ReasonOfCost : null}</td>
                                    <td width="120px" className={classes.titleDesc} >{item?.AdCostHSN ? <>HSN - {item.AdCostHSN} </> : null}</td>
                                    <td width="100px" className={classes.titleDesc} >{item?.AdCostGST ? <>GST - {item.AdCostGST} %</> : "GST -  0 %"}</td>
                                    <td width="100px" className={classes.titleDesc} >{item?.AdCostApplicableOn ? <> {item.currencyType} &nbsp;{" "} {item.CostPrice}</> : null}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </Box>}
                        {/* additional section ends */}
                      </Box>

                      {/* main container for Desc section ends */}

                    </TabPanel>
                    <TabPanel value="2">
                      <Box>
                        <Typography className={classes.subTitle}>Inclusion</Typography>
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
                        <Typography className={classes.subTitle}>Exclusion</Typography>
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
                <Box sx={{ pt: "2%" }}>
                  <Button sx={ButtonCss} onClick={uploadProduct}>
                    Upload Voucher
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default VoucherTypeOne;

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
  marginBottom: '10px'
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
const selectStyle1 = {
  width: "100%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  background: "#fff",
  height: "100%",
  borderRadius: "10px",
  color: "#B1B1B1",
  fontSize: "15px",
  fontWeight: 600
};

const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "15px",
  lineHeight: "21px",
  color: "#B1B1B1",
};