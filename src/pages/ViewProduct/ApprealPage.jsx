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
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LeftArrow from "../../assets/Images/payment/LeftArrow.svg";
import upward from "../../assets/Images/Apprealimg/upward.svg";
import downward from "../../assets/Images/Apprealimg/downward.svg";
import Breadth from "../../assets/Images/Breadth.svg";
import Height from "../../assets/Images/Height.svg";
import Length from "../../assets/Images/Length.svg";
import Weight from "../../assets/Images/Weight.svg";
import bxifeature from "../../assets/bxifeaturelogo.svg";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { GetProductByIdAction } from "../../redux/action/ProductActions/GetProductByIdAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BXITokenIcon from "../../assets/Stack of Coins.svg";
import { toast, ToastContainer } from "react-toastify";
import ChatIcon from "../../assets/HeaderIcon/Chat.png";
import { useProductAddToCart } from "../../Hooks/ProductActions/useProductAddToCart";
import LikeIcon from "../../assets/Images/CommonImages/LikeIcon.svg";
import ShareIcon from "../../assets/Images/CommonImages/ShareIcon.svg";
import { sendMassage } from "../../redux/action/Chat/Send-Massages";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import FeatureName from "../../components/FeatureName";
const ApprealPage = () => {
  let { id } = useParams();
  let ProductId = id;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const [currentImage, setCurrentImage] = useState(0);
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [VariationToMap, setVariationToMap] = useState();

  const [color, setColor] = useState("");

  async function GetProductByid() {
    await axios
      .get(`product/get_product_byId/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setGetProductByIdData(res?.data);
        setStoreVariationData(res?.data?.ProductsVariantions[0]?._id);
      });
  }

  console.log("VariationToMappp", VariationToMap);

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
  const [open, setOpen] = React.useState(false);
  const [one, setone] = React.useState();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log("ProductId", storeVariationData);

  const { data: mutateCartData, mutate: addtocart } = useProductAddToCart();

  const listItemText = [
    {
      itemText: "Do not wash",
    },
    {
      itemText: "Do not use bleach",
    },
    {
      itemText: "Iron at a maximum of 110ºC/230ºF",
    },
    {
      itemText: "Dry clean with tetrachloroethylene",
    },
    {
      itemText: "Do not tumble dry",
    },
  ];
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
  const keyFeaturesText = [
    {
      keyFeatures: "Material",
    },
    {
      keyFeatures: "Expiry Date",
    },
    {
      keyFeatures: "Manufacturing Date",
    },
    {
      keyFeatures: "Weight",
    },
  ];
  const priceValText = [
    {
      priceVal: "70cm",
    },
    {
      priceVal: "70cm",
    },
    {
      priceVal: "70cm",
    },
    {
      priceVal: "70cm",
    },
  ];

  // const { GetProductByIdData } = useSelector((state) => state.GetProductById);
  // if (GetProductByIdData) {
  //   setStoreVariationData(GetProductByIdData?.ProductsVariantions[0]);
  // }

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
      name: "Weight",
      img: Weight,
      val: GetProductByIdData?.ProductTechInfo?.WeightBeforePackingPerUnit,
    },
  ];
  let NewdataArray = [];
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
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home/message");
  };
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
  return (
    <React.Fragment>
      {/* <ToastContainer
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
      /> */}

      <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <BreadCrumbHeader MainText={"Apparel"} />
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
              // textAlign: "center",
              borderBottom: "2px solid rgba(236, 236, 236, 1)",
              width: "95%",
              mx: "auto",
              position: "relative",
            }}
          >
            <Link to={"/home"}>
              <Box
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
              />
            </Link>
            <Box
              sx={{
                width: "500%",
                mx: "auto",
                textAlign: "end",
              }}
            >
              <Typography sx={mainText}>Preview Page </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                gap: "15px",
                mt: 2,
                // marginRight: "auto",
                marginLeft: "450px",
              }}
            >
              <Box
                component="img"
                src={ChatIcon}
                sx={{ ...HeaderIconStyle, height: "40%", width: "15%" }}
                onClick={handleClickOpen}
              />

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogContent sx={{ borderRadius: "20px" }}>
                  <DialogContentText
                    id="alert-dialog-description"
                    sx={{ p: 2, borderRadius: "20px" }}
                  >
                    <DialogTitle
                      id="alert-dialog-title"
                      sx={{ borderRadius: "20px" }}
                    >
                      <Typography
                        sx={{
                          color: "#6B7A99",
                          fontSize: "25px",
                          textAlign: "center",
                        }}
                      >
                        {" "}
                        select your Query
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
                              p: 0.5,
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
                                fontSize: "16px",
                                textTransform: "NONE",
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
          </Box>
          <Grid container sx={{ width: "95%", mx: "auto", mt: 4 }}>
            <Grid item xl={1} lg={1} md={12} sm={12} xs={12} sx={fixGrid}>
              {/* {ImageDataArray?.length > 1 ? ( */}
              <>
                <Button onClick={upwardClick}>
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
                <Button onClick={downwardClick}>
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
                </Button>
              </>
              {/* ) : null} */}
            </Grid>
            <Grid item xl={4} lg={4} md={12} sm={12} xs={12} sx={fixGrid}>
              <Box
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
                }}
              >
                {console.log("images", ImageDataArray)}
                <Box
                  component="img"
                  src={
                    // "https://bxi-development.s3.amazonaws.com/productImages/479768D823C767AB0C"
                    ImageDataArray ? ImageDataArray[currentImage]?.url : null
                  }
                  alt="cloth"
                  sx={{
                    width: {
                      xl: "80%",
                      lg: "80%",
                      md: "100%",
                      sm: "100%",
                      xs: "100%",
                    },
                    height: "auto",
                  }} //optional / we can also set with grid
                ></Box>
              </Box>
            </Grid>
            <Grid item xl={7} lg={7} md={12} sm={12} xs={12} sx={fixGrid}>
              <Box>
                <Typography sx={semi}>
                  {GetProductByIdData?.ProductName}
                </Typography>
                <Typography sx={semiPrice}>
                  {GetProductByIdData &&
                    GetProductByIdData?.ProductsVariantions?.length > 0 &&
                    GetProductByIdData?.ProductsVariantions[0]
                      ?.PricePerUnit}{" "}
                  <img
                    src={BXITokenIcon}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "10px",
                    }}
                    alt="BXITokenIcon"
                  />
                </Typography>

                <Typography sx={semiSub}>Colors</Typography>
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
                          }}
                        ></Box>
                      );
                    })}
                </Box>

                <Box
                  mt={6}
                  sx={{
                    width: "100%",
                    mx: "auto",
                  }}
                >
                  <Grid container>
                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                      <Typography sx={tableHeader}>Sizes</Typography>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                      <Typography sx={tableHeader}> Min QTY</Typography>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                      <Typography sx={tableHeader}>Max QTY</Typography>
                    </Grid>

                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                      <Typography sx={tableHeader}> GST/Product </Typography>
                    </Grid>

                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                      <Typography sx={tableHeader}> Product ID</Typography>
                    </Grid>
                  </Grid>

                  {GetProductByIdData &&
                    GetProductByIdData?.ProductsVariantions?.map((el, idx) => {
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
                            <Select
                              sx={{
                                width: "120px",
                              }}
                            >
                              {GetProductByIdData &&
                                GetProductByIdData?.ProductsVariantions?.map(
                                  (el, idx) => {
                                    return (
                                      <MenuItem
                                        key={idx}
                                        value={el?.ProductSize}
                                        onClick={() =>
                                          setStoreVariationData(el)
                                        }
                                      >
                                        {el?.ProductSize}
                                      </MenuItem>
                                    );
                                  }
                                )}
                            </Select>
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
                              {GetProductByIdData.ProductsVariantions[0].GST}
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
                    })}
                </Box>
                <Box
                  mt={4}
                  sx={{
                    borderTop: "2px solid rgba(238, 238, 238, 1)",
                    display: "flex",
                    gap: "20px",
                  }}
                >
                  <Typography sx={find}>Find Your Size</Typography>
                  <Typography sx={chart}>Size Chart </Typography>
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
                          <Typography sx={tabSubText}>
                            {GetProductByIdData &&
                              GetProductByIdData.ProductDescription}
                          </Typography>
                          <Box sx={{ display: "flex", gap: "10px" }}>
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
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", gap: "10px" }}>
                          <Box
                            sx={{
                              width: "60%",
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
                                }}
                              >
                                <Box>
                                  <Typography
                                    sx={{
                                      ...available,
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      color: "#6B7A99",
                                    }}
                                  >
                                    Minimum Order Quantity
                                  </Typography>
                                  <Typography
                                    sx={{
                                      ...available,
                                      lineHeight: "20px",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      color: "#6B7A99",
                                    }}
                                  >
                                    100
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
                                      fontWeight: 400,
                                      fontSize: "14px",
                                      color: "#6B7A99",
                                    }}
                                  >
                                    Price of Sample
                                  </Typography>
                                  <Typography
                                    sx={{
                                      ...available,
                                      lineHeight: "20px",
                                      fontWeight: 600,
                                      fontSize: "14px",
                                      color: "#6B7A99",
                                    }}
                                  >
                                    1,000
                                    {/* <Box
                                      component="img"
                                      src={Stackofcoinsgrey}
                                    /> */}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Grid>
                    </TabPanel>
                    <TabPanel value="2">
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
                          <Typography sx={product}>Product Details</Typography>
                          <Typography sx={material}>
                            Material & Care composition Information{" "}
                          </Typography>
                          <Box
                            mt={3}
                            sx={{
                              color: "#6B7A99",
                              display: "flex",
                              gap: "10px",
                              flexDirection: "column",
                            }}
                          >
                            {listItemText?.map((el, idx) => {
                              return (
                                <>
                                  <Typography sx={listText}>
                                    <FiberManualRecordRoundedIcon
                                    //   sx={{ mt: 0.5 }}
                                    />{" "}
                                    {el.itemText}
                                  </Typography>
                                </>
                              );
                            })}
                          </Box>
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
                          Lorem ipsum dolor sit amet consectetur. Proin sit nisl
                          a a lectus imperdiet. Nisl consectetur sit lacus proin
                          faucibus vitae. Ut imperdiet massa ut urna dui amet.
                          Feugiat non pellentesque tellus congue augue. Habitant
                          nunc pellentesque duis egestas orci. Gravida elementum
                          venenatis a volutpat luctus. Est vitae tempor vitae
                          eget bibendum leo.
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
                                justifyContent: "space-between",
                                width: "12%",
                              }}
                            >
                              <Box component="img" src={val.img} />
                              <Box>
                                <Typography sx={packHead}>
                                  {val.name}
                                </Typography>
                                <Typography sx={packVal}>{val.val}</Typography>
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
                          width: "60%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Grid
                          container
                          mt={4}
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
                            }}
                          >
                            {/* <Box component="img" src={bxifeature} /> */}
                            <FeatureName name={res?.name} />
                            <Box>
                              <Typography sx={packHead}>
                                Extra Key Feature
                              </Typography>
                              <Typography
                                sx={{ ...packVal, fontSize: "1.5rem" }}
                              >
                                Lorem Ipsum{" "}
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
                              background: "red",
                            }}
                          >
                            {/* <Box component="img" src={bxifeature} /> */}
                            <FeatureName name={res?.name} />
                            <Box>
                              <Typography sx={packHead}>
                                Extra Key Feature
                              </Typography>
                              <Typography sx={packVal}>Lorem Ipsum </Typography>
                            </Box>
                          </Grid>
                        </Grid>
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

export default ApprealPage;

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
  height: "40%",
  width: "15%",
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

const InputPropsStyle = {
  disableUnderline: true,
  style: {
    background: "#fff",
    fontFamily: "Poppins",
    color: "rgba(68, 95, 210, 1)",
    height: "100%",
    fontSize: "14px",
  },
};
const TextFieldStyle = {
  width: "50%",
  height: "48px",
  borderRadius: "9px",
  border: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  textAlign: "center",
  color: "#6B7A99",
  overflow: "auto",
  "&:focus": {
    outline: "none",
  },
};

const gridAdj = {
  textAlign: { xl: "left", lg: "left", md: "left", sm: "left", xs: "center" },
};
const packHead1 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.5rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  color: "#6B7A99",
};

const packVal1 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.3rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  color: "#ADB8CC",
};

const productText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.7rem",
    lg: "1.7rem",
    md: "1.6rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  lineHeight: 1.5,
  textAlign: "justify",
  color: "#6B7A99",
};
const locationText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "2.2rem",
    lg: "2.2rem",
    md: "1.8rem",
    sm: "1.6rem",
    xs: "1.6rem",
  },
  color: "#6B7A99",
  mt: 2,
};
