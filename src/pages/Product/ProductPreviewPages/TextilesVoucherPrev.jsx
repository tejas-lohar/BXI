import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Tab,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProductById } from "../../../Hooks/GetProducts/useGetProductById";
import ChatIcon from "../../../assets/HeaderIcon/Chat.png";
import LikeIcon from "../../../assets/Images/CommonImages/Heart.svg";
import LeftArrowForVoucherDetail from "../../../assets/Images/CommonImages/LeftArrowForVoucherDetail.svg";
import ShareIcon from "../../../assets/Images/CommonImages/ShareIcon.svg";
import coinsIcon from "../../../assets/Images/CommonImages/coinsIcon.svg";
import bxifeature from "../../../assets/bxifeaturelogo1.png";
import CarasoulForVoucherDetails from "../../../components/Carousel/CarasoulForVoucherDetails";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { sendMassage } from "../../../redux/action/Chat/Send-Massages";
import { useUpdateProductQuery } from "../../AddProductAllPages/Textile/ProductInfo/ProductHooksQuery";

export default function TextilesVoucherPrev() {
  const [value, setValue] = React.useState("1");
  const naviagte = useNavigate();

  const id = useParams().id;
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();
  const [storeVariationData, setStoreVariationData] = useState();
  const [GetProductByIdData, setGetProductByIdData] = useState();

  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    mutate: updateProduct,
    // isLoading,
    // isError,
    data: productData,
    // reset,
    // variables,
    error: RegisterError,
  } = useUpdateProductQuery();
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
    console.log("GetProductByIdData==", GetProductByIdData);
  }, []);
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
      <BreadCrumbHeader MainText="Textile Voucher" />
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
                color: "#B1B1B1",
              }}
            >
              Preview Page
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
              }}
            >
              <Box
                component="img"
                src={ChatIcon}
                sx={{ ...HeaderIconStyle, height: "auto", width: "10%" }}
                onClick={handleClickOpen}
              />
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent sx={{ borderRadius: "20px" }}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <CloseIcon
                      sx={{
                        fontSize: "16px",
                        color: "#fff",
                        p: "2px",
                        borderRadius: "20px",
                        backgroundColor: "#c3cad9",
                        cursor: "pointer",
                      }}
                      onClick={handleClose}
                    />
                  </Box>
                  <DialogContentText
                    id="alert-dialog-description"
                    sx={{ p: 1, borderRadius: "20px" }}
                  >
                    <DialogTitle
                      id="alert-dialog-title"
                      sx={{ borderRadius: "20px", p: 1 }}
                    >
                      <Typography
                        sx={{
                          color: "#6B7A99",
                          fontSize: "20px",
                          textAlign: "center",
                        }}
                      >
                        Select Your Query
                      </Typography>
                    </DialogTitle>
                    {step.map((item, idx) => {
                      return (
                        <div key={idx}>
                          <Box
                            sx={{
                              borderRadius: "10px",
                              border: "1px solid grey ",
                              mt: 1.5,
                              // p: 0.3,
                              cursor: "pointer",
                              "&:hover": {
                                border: " 1px solid #1976d2",
                              },
                            }}
                            onClick={() => {
                              handleClick();
                              UpdateNotifications();
                            }}
                          >
                            <Button
                              sx={{
                                fontSize: "12px",
                                textTransform: "none",
                                color: "#000",

                                "&:hover": {
                                  color: "#1976d2",
                                },
                              }}
                              onClick={() => {
                                setone(item.messgage);
                              }}
                            >
                              {item.messgage}
                            </Button>
                          </Box>
                        </div>
                      );
                    })}
                  </DialogContentText>
                </DialogContent>
              </Dialog>
              <Box component="img" src={LikeIcon} sx={HeaderIconStyle}></Box>
              <Box component="img" src={ShareIcon} sx={HeaderIconStyle}></Box>
            </Box>
          </Grid>

          {/* **************************** CarasoulForVoucherDetails ********************************** */}
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box style={{ width: "100%", marginLeft: "2rem" }}>
              {GetProductByIdData?.files &&
                GetProductByIdData.files.length > 0 && (
                  <CarasoulForVoucherDetails
                    imgSrc={GetProductByIdData?.files}
                  />
                )}
            </Box>
          </Grid>

          <Grid item xl={1} lg={1} md={1} sm={12} xs={12}></Grid>

          <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
            <Box
              sx={{
                // background: "pink",
                width: "90%",
                mx: "auto",
                marginTop: "2%",
                marginLeft: "-3%",
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
                    marginTop: "9%",
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
                  {ProductData?.ProductsVariantions[0]?.RoomType}
                </Typography>
                <Box
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
                    25.00
                    {/* {ProductData?.ProductsVariantions[0]?.PricePerUnit} */}
                  </Typography>
                  <Box component="img" src={coinsIcon}></Box>
                </Box>
              </Box>

              <Grid
                container
                sx={{
                  py: "2rem",
                }}
              >
                <Grid
                  item
                  xl={5}
                  lg={5}
                  md={5}
                  sm={5}
                  xs={5}
                  sx={VoucherDetailSecondGrid}
                >
                  <Typography sx={HeaderTypoStyle}>Available Colors</Typography>
                  <Box sx={{ display: "flex" }}>
                    <Box
                      sx={{
                        width: "30px",
                        height: "28px",
                        background: "#052E70",
                        borderRadius: "3px",
                        marginRight: "1rem",
                      }}
                    />
                    <Box
                      sx={{
                        width: "30px",
                        height: "28px",
                        background: "#000000",
                        borderRadius: "3px",
                      }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xl={7}
                  lg={7}
                  md={7}
                  sm={7}
                  xs={7}
                  sx={VoucherDetailSecondGrid}
                >
                  <Typography sx={HeaderTypoStyle}>Validity</Typography>
                  <Typography sx={HeaderSubTypoStyle}>
                    {ProductData?.ProductsVariantions[0]
                      ?.validityOfVoucherValue +
                      " " +
                      ProductData?.ProductsVariantions[0]
                        ?.validityOfVoucherUnit}
                  </Typography>
                </Grid>
                {/* <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                  <Typography
                    sx={{ ...HeaderTypoStyle, pb: "1rem", marginTop: "3%" }}
                  >
                    Total Uploaded price
                  </Typography>
                  <Typography
                    sx={{
                      ...HeaderSubTypoStyle,
                      marginTop: "-11px",
                      marginLeft: "1px",
                    }}
                  >
                    {ProductData?.ProductsVariantions[0]?.PricePerUnit}
                  </Typography>
                </Grid> */}
              </Grid>
              <Grid
                container
                sx={{
                  py: {
                    xl: "0rem",
                    lg: "0rem",
                    md: "0rem",
                    sm: "1rem",
                    xs: "1rem",
                  },
                }}
              >
                {/* section of min and max qty */}
                {localStorage.getItem("digitalData") === "Offer Specific" ? (
                  <Grid
                    item
                    xl={3}
                    lg={3}
                    md={3}
                    sm={3}
                    xs={3}
                    sx={VoucherDetailSecondGrid}
                  >
                    <Typography sx={HeaderTypoStyle}>Room Type</Typography>
                    <Typography
                      sx={{
                        ...HeaderSubTypoStyle,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {" "}
                      {ProductData?.ProductsVariantions.map((value) => (
                        <span>{value.RoomType}</span>
                      ))}
                    </Typography>
                  </Grid>
                ) : (
                  ""
                )}
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={4}
                  sm={4}
                  xs={4}
                  sx={VoucherDetailSecondGrid}
                >
                  <Typography sx={HeaderTypoStyle}>Available Sizes</Typography>
                  <Typography
                    sx={{
                      ...HeaderSubTypoStyle,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {ProductData?.ProductsVariantions.map((value) => (
                      <span>{value.MinOrderQuantity}</span>
                    ))}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={2.5}
                  xs={2.5}
                  sx={VoucherDetailSecondGrid}
                >
                  <Typography sx={HeaderTypoStyle}>Min QTY</Typography>
                  <Typography
                    sx={{
                      ...HeaderSubTypoStyle,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {ProductData?.ProductsVariantions.map((value) => (
                      <span>{value.MinOrderQuantity}</span>
                    ))}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={2.5}
                  xs={2.5}
                  sx={VoucherDetailSecondGrid}
                >
                  <Typography sx={HeaderTypoStyle}>Max QTY</Typography>
                  <Typography
                    sx={{
                      ...HeaderSubTypoStyle,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    {ProductData?.ProductsVariantions.map((value) => (
                      <span>{value.MaxOrderQuantity}</span>
                    ))}
                  </Typography>
                </Grid>
                <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                  <Typography
                    sx={{
                      ...HeaderTypoStyle,
                      pb: "1rem",
                      marginTop: "8px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    GST/Product
                  </Typography>
                  <Typography
                    sx={{
                      ...HeaderSubTypoStyle,
                      marginTop: "-11px",
                      marginLeft: "1px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {/* {ProductData?.ProductsVariantions[0]?.GST}&nbsp;% */}
                    {ProductData?.ProductsVariantions.map((value) => (
                      <span>{value.GST}</span>
                    ))}
                  </Typography>
                </Grid>
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
                      <Box
                        sx={{
                          width: "100%",
                          padding: "0rem",
                          //   background: "red",
                          marginTop: {
                            xl: "0rem",
                            lg: "1rem",
                            md: "4rem",
                            sm: "2rem",
                            xs: "2rem",
                          },
                        }}
                      >
                        <Box>
                          <Typography sx={CommonTypoStyle1}>
                            {ProductData?.ProductName}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 400,
                              fontSize: {
                                xs: "12px",
                                sm: "15px",
                                md: "15px",
                                lg: "16px",
                                xl: "16px",
                              },
                              textAlign: "justify",
                              color: "#6B7A99",
                              width: "100%",
                              pt: {
                                xs: "2%",
                                sm: "1%",
                                md: "0.8%",
                                lg: "0.8%",
                                xl: "0.8%",
                              },
                            }}
                          >
                            {ProductData?.ProductSubtittle}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 400,
                              fontSize: {
                                xs: "12px",
                                sm: "15px",
                                md: "15px",
                                lg: "16px",
                                xl: "16px",
                              },
                              textAlign: "justify",
                              color: "#6B7A99",
                              width: "100%",
                              pt: {
                                xs: "2%",
                                sm: "1%",
                                md: "0.8%",
                                lg: "0.8%",
                                xl: "0.8%",
                              },
                            }}
                          >
                            {ProductData?.ProductDescription} Start Hotel
                          </Typography>
                        </Box>
                        <Box>
                          <Typography sx={CommonTypoStyle1}>
                            Custom Message
                          </Typography>
                          <Box sx={{ display: "grid", gap: "6px" }}>
                            <Typography sx={txt}>
                              Lorem ipsum dolor sit amet consectetur.
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Typography sx={CommonTypoStyle1}>
                            Store Details
                          </Typography>
                          <Box sx={{ display: "grid", gap: "6px" }}>
                            <Typography sx={txt}>
                              Lorem ipsum dolor sit amet consectetur. Proin sit
                              nisl a a lectus imperdiet.
                            </Typography>
                            <Box
                              component={"a"}
                              download="hotelsList"
                              target="_blank"
                              href={`${
                                ProductData?.HotelsListUrls?.at(0)?.url
                              }`}
                              onClick={() => {
                                console.log("download excel");
                              }}
                              sx={CommonTypoStyle2}
                            >
                              Store List
                            </Box>
                            {/* <Typography sx={storelist}>Store List</Typography> */}
                            <Typography sx={CommonTypoStyle2}>
                              Store Link
                            </Typography>
                            <a
                              style={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: 12,
                                textAlign: "justify",
                                color: "#445FD2",
                                marginTop: "-8px",
                                marginBottom: "1%",
                              }}
                              target="_blank"
                              href={
                                ProductData?.Link
                                  ? ProductData?.Link
                                  : "www.loremipsum.com"
                              }
                            >
                              {ProductData?.Link
                                ? ProductData?.Link
                                : "www.loremipsum.com "}
                            </a>
                          </Box>
                        </Box>
                      </Box>

                      <Box>
                        <Grid container>
                          {ProductData?.redemptionType === "offline" ||
                          ProductData?.redemptionType === "both" ? (
                            <>
                              <Grid
                                item
                                xl={1.5}
                                lg={1.5}
                                md={1.5}
                                sm={1.5}
                                xs={1.5}
                              >
                                <Typography
                                  sx={{ ...CommonTypoStyle3, pb: "1rem" }}
                                >
                                  Area
                                </Typography>
                                <Typography sx={HeaderSubTypoStyle}>
                                  {ProductData?.Area}
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xl={1.5}
                                lg={1.5}
                                md={1.5}
                                sm={1.5}
                                xs={1.5}
                              >
                                <Typography
                                  sx={{ ...CommonTypoStyle3, pb: "1rem" }}
                                >
                                  Landmark
                                </Typography>
                                <Typography sx={HeaderSubTypoStyle}>
                                  {ProductData?.Landmark}
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xl={1.5}
                                lg={1.5}
                                md={1.5}
                                sm={1.5}
                                xs={1.5}
                              >
                                <Typography
                                  sx={{ ...CommonTypoStyle3, pb: "1rem" }}
                                >
                                  City
                                </Typography>
                                <Typography sx={HeaderSubTypoStyle}>
                                  {ProductData?.City}
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xl={1.5}
                                lg={1.5}
                                md={1.5}
                                sm={1.5}
                                xs={1.5}
                              >
                                <Typography
                                  sx={{ ...CommonTypoStyle3, pb: "1rem" }}
                                >
                                  State
                                </Typography>
                                <Typography sx={HeaderSubTypoStyle}>
                                  {ProductData?.State}
                                </Typography>
                              </Grid>
                            </>
                          ) : (
                            ""
                          )}

                          <Grid container sx={{ marginTop: "20px" }}>
                            <Grid
                              item
                              xl={2.5}
                              lg={2.5}
                              md={2.5}
                              sm={2.5}
                              xs={2.5}
                            >
                              <Typography
                                sx={{ ...CommonTypoStyle2, pb: "1rem" }}
                              >
                                Redemption Type
                              </Typography>
                              {ProductData?.redemptionType === "both" ? (
                                <Typography sx={HeaderSubTypoStyle}>
                                  Online and Offline
                                </Typography>
                              ) : (
                                ""
                              )}
                              {ProductData?.redemptionType === "online" ? (
                                <Typography sx={HeaderSubTypoStyle}>
                                  Online
                                </Typography>
                              ) : (
                                ""
                              )}
                              {ProductData?.redemptionType === "offline" ? (
                                <Typography sx={HeaderSubTypoStyle}>
                                  Offline
                                </Typography>
                              ) : (
                                ""
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
                              <Typography
                                sx={{ ...CommonTypoStyle1, pb: "1rem" }}
                              >
                                Listed this Product for
                              </Typography>
                              <Typography sx={HeaderSubTypoStyle}>
                                {`${ProductData?.ListThisProductForAmount} ${ProductData?.ListThisProductForUnitOfTime}`}
                                {/* 30 Days */}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Box>
                          <Typography sx={CommonTypoStyle1}>
                            Additional Cost
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "6px",
                            }}
                          >
                            <Typography sx={txt}>
                              Lorem ipsum dolor sit amet consectetur. Donec
                              pellentesque aliquam eget nibh lectus urna tempor
                              eget. Enim sed dictum arcu aliquam aliquet
                              consequat adipiscing odio ut.
                            </Typography>
                            <Typography
                              sx={{
                                ...txt,
                                marginLeft: "9rem",
                                color: "#445FD2",
                              }}
                            >
                              $1,000
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "6px",
                            }}
                          >
                            <Typography sx={txt}>
                              Lorem ipsum dolor sit amet consectetur. Donec
                              pellentesque aliquam eget nibh lectus urna tempor
                              eget. Enim sed dictum arcu aliquam aliquet
                              consequat adipiscing odio ut.
                            </Typography>
                            <Typography
                              sx={{
                                ...txt,
                                marginLeft: "9rem",
                                color: "#445FD2",
                              }}
                            >
                              $1,000
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TabPanel>
                    <TabPanel value="2">
                      <Box>
                        <Typography sx={CommonTypoStyle1}>Inclusion</Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {ProductData?.Inclusions}
                          </Typography>
                          {/* <Typography sx={dots}>
                              <FiberManualRecordIcon
                                sx={{ fontSize: "7px", pt: "10px" }}
                              />
                              9 Iconic Restaurants & Bars
                            </Typography>
                            <Typography sx={dots}>
                              <FiberManualRecordIcon
                                sx={{ fontSize: "7px", pt: "10px" }}
                              />
                              High-tea & Live Music Every Evening
                            </Typography>
                            <Typography sx={dots}>
                              <FiberManualRecordIcon
                                sx={{ fontSize: "7px", pt: "10px" }}
                              />
                              Luxury Shopping Arcade
                            </Typography> */}
                        </Box>
                      </Box>
                      <Box>
                        <Typography sx={CommonTypoStyle1}>Exclusion</Typography>
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
                        <Typography sx={CommonTypoStyle1}>
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
                        <Typography sx={CommonTypoStyle1}>
                          Other Cost
                        </Typography>
                        <Box sx={{ pt: "0.8%", padding: "10px" }}>
                          <Typography sx={dots}>
                            {ProductData?.OtherCost[0]?.CostPrice}{" "}
                            {ProductData?.OtherCost[0]?.currencyType}{" "}
                            {ProductData?.OtherCost[0]?.ReasonOfCost}
                          </Typography>
                          {/* <Typography sx={dots}>
                              Lorem ipsum dolor sit amet consectetur. Donec
                              pellentesque aliquam eget nibh lectus urna tempor
                              eget. Enim sed dictum arcu aliquam aliquet consequat
                              adipiscing odio ut.
                            </Typography>
                            <br />
                            <Typography sx={dots}>
                              Lorem ipsum dolor sit amet consectetur. Donec
                              pellentesque aliquam eget nibh lectus urna tempor
                              eget. Enim sed dictum arcu aliquam aliquet consequat
                              adipiscing odio ut.
                            </Typography> */}
                        </Box>
                      </Box>
                      <Box>
                        <Typography sx={CommonTypoStyle1}>
                          Redemption Steps
                        </Typography>
                        <Box sx={{ padding: "10px" }}>
                          <Typography sx={dots}>
                            <FiberManualRecordIcon
                              sx={{ fontSize: "7px", pt: "10px" }}
                            />
                            {ProductData?.RedemptionSteps}
                          </Typography>
                          {/* <Typography sx={dots}>
                              <FiberManualRecordIcon
                                sx={{ fontSize: "7px", pt: "10px" }}
                              />
                              9 Nisl consectetur sit lacus proin faucibus vitae.
                            </Typography>
                            <Typography sx={dots}>
                              <FiberManualRecordIcon
                                sx={{ fontSize: "7px", pt: "10px" }}
                              />
                              Ut imperdiet massa ut urna dui amet. Feugiat non
                              pellentesque tellus congue augue.
                            </Typography>
                            <Typography sx={dots}>
                              <FiberManualRecordIcon
                                sx={{ fontSize: "7px", pt: "10px" }}
                              />
                              Habitant nunc pellentesque duis egestas orci.
                            </Typography>
                            <Typography sx={dots}>
                              <FiberManualRecordIcon
                                sx={{ fontSize: "7px", pt: "10px" }}
                              />
                              Gravida elementum venenatis a volutpat luctus.
                            </Typography>
                            <Typography sx={dots}>
                              <FiberManualRecordIcon
                                sx={{ fontSize: "7px", pt: "10px" }}
                              />
                              Est vitae tempor vitae eget bibendum leo.
                            </Typography> */}
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
}

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

const VoucherDetailSecondGrid = {
  py: "1rem",
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
