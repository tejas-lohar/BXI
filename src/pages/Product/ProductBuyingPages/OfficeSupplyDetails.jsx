import CloseIcon from "@mui/icons-material/Close";
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
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddToWishlist } from "../../../Hooks/ProductActions/useAddToWishlist";
import { useProductAddToCart } from "../../../Hooks/ProductActions/useProductAddToCart";
import { useRemoveWishlistProductByProductId } from "../../../Hooks/ProductActions/useRemoveWishlistProduct";
import ChatIcon from "../../../assets/HeaderIcon/Chat.png";
import Breadth from "../../../assets/Images/Breadth.svg";
import LikeIcon from "../../../assets/Images/CommonImages/Heart.svg";
import ShareIcon from "../../../assets/Images/CommonImages/ShareIcon.svg";
import Height from "../../../assets/Images/Height.svg";
import Length from "../../../assets/Images/Length.svg";
import Weight from "../../../assets/Images/Weight.svg";
import LeftArrow from "../../../assets/Images/payment/LeftArrow.png";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import CarouselforApperal from "../../../components/Carousel/CarouselforApperal";
import FeatureName from "../../../components/FeatureName";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { sendMassage } from "../../../redux/action/Chat/Send-Massages";
import { GetProductByIdAction } from "../../../redux/action/ProductActions/GetProductByIdAction";
import { useUpdateProductQuery } from "../../AddProductAllPages/Textile/ProductInfo/ProductHooksQuery";
const OfficeSupplyDetails = () => {
  let { id } = useParams();
  let ProductId = id;
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("1");
  const [currentImage, setCurrentImage] = useState(0);
  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [VariationToMap, setVariationToMap] = useState();
  const [showSizechart, setShowSizechart] = useState(false);
  const [storeTechnicalInfo, setStoreTechnicalInfo] = useState();

  const [WishlistData, setWishlistData] = useState();

  const [color, setColor] = useState("");
  const [like, setLike] = useState(false);

  const {
    mutate: updateProduct,
    // isLoading,
    // isError,
    data: productData,
    // reset,
    // variables,
    error: RegisterError,
  } = useUpdateProductQuery();
  // const naviagte = useNavigate();

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

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [storeVariationData, setStoreVariationData] = useState();

  let ColorData = {};

  // const uploadProduct = () => {
  //   updateProduct(
  //     { id, ProductUploadStatus: "Approved" },

  //     {
  //       onSuccess: (response) => {
  //         console.log("response", response);
  //         toast.success(
  //           response?.data?.ProductUploadStatus
  //             ? response?.data?.ProductUploadStatus
  //             : "Product Uploaded Succesfully",
  //           {
  //             position: "top-center",
  //             autoClose: 2000,
  //             hideProgressBar: false,
  //             closeOnClick: true,
  //             pauseOnHover: true,
  //             draggable: true,
  //             progress: undefined,
  //             theme: "light",
  //           }
  //         );
  //         if (response?.data?.ProductUploadStatus === "Approved") {
  //           setTimeout(() => {
  //             naviagte("/home/mylistedproducts");
  //           }, [1200]);
  //         }
  //       },
  //     }
  //   );
  // };

  GetProductByIdData?.ProductsVariantions?.map((item, index) => {
    if (index === 0) {
      ColorData = item;
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: mutateCartData, mutate: addtocart } = useProductAddToCart();

  const step = [
    {
      id: 1,
      message: "Product Defective/Damaged",
    },
    {
      id: 2,
      message: "Product not Delivered ",
    },
    {
      id: 3,
      message: "Raise a ticket with BXI ",
    },
    {
      id: 4,
      message: "Issue with Invoicing ",
    },
    {
      id: 5,
      message: "Issue with Pricing",
    },
    {
      id: 6,
      message: "Issue with Tokens",
    },
  ];

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
  const { GetProductByIdDatas } = useSelector((state) => state?.GetProductById);

  let SellerCompanyId = GetProductByIdDatas?.SellerCompanyId;
  const [messageOption, setMessageOption] = useState("");

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

  const {
    // data: mutateRemoveWishlistData,
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

  useEffect(() => {
    fetWishlistData();
  }, []);

  useEffect(() => {
    GetProductByid();
  }, []);

  async function handleAddToWishlist(id) {
    addtowishlist(id);
    setLike(true);
  }

  async function handleRemoveWishlist(id) {
    removefromwishlist(id);
    setLike(false);
  }

  return (
    <React.Fragment>
      <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <BreadCrumbHeader MainText={"Office Supply"} />
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={LeftArrow}
                alt="LeftArrow"
                sx={{
                  height: "30px",
                  width: "30px",
                  position: "absolute",
                  left: "0",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/home");
                }}
              />
              <Typography sx={mainText}>Preview Page </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "15px",
                  alignItems: "center",
                  position: "absolute",
                  right: "0",
                }}
              >
                <Box
                  component="img"
                  src={ChatIcon}
                  sx={{ ...HeaderIconStyle }}
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
                                const userId = async (companyId) => {
                                  try {
                                    const user = await axios.get(
                                      `support/getuser?companyId=${companyId}`,
                                      {
                                        withCredentials: true,
                                      }
                                    );
                                    const userId = user.data._id;

                                    await UpdateNotifications(userId);
                                  } catch (error) {
                                    console.log(error);
                                  }
                                };

                                const UpdateNotifications = async (
                                  userId,
                                  admin = "6437d9efb16a5049913d70a5"
                                ) => {
                                  try {
                                    const res1 = await axios.post(
                                      `support/create_room`,
                                      { userId, admin },
                                      { withCredentials: true }
                                    );
                                    const roomId = res1.data._id;
                                    const messageType = "text";
                                    const messageContent = item.message;
                                    await dispatch(
                                      sendMassage(
                                        messageContent,
                                        roomId,
                                        messageType
                                      )
                                    );
                                    navigate("/home/message");
                                  } catch (err) {
                                    console.log(err);
                                  }
                                };
                                userId(SellerCompanyId);
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
                                  setMessageOption(item.message);
                                }}
                              >
                                {item.message}
                              </Button>
                            </Box>
                          </div>
                        );
                      })}
                    </DialogContentText>
                  </DialogContent>
                </Dialog>

                <Box
                  sx={{
                    ...HeaderIconStyle,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (like === true) {
                      handleRemoveWishlist(ProductId);
                    } else {
                      handleAddToWishlist(ProductId);
                    }
                  }}
                >
                  {WishlistData?.find(
                    (item) => item?.ProductId?._id === ProductId
                  ) ? (
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                      // onClick={() => handleRemoveWishlist(ProductId)}
                    >
                      <AiFillHeart color={"red"} size={"20px"} />
                    </button>
                  ) : (
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        color: "#6B7A99",
                      }}
                      // onClick={() => handleAddToWishlist(ProductId)}
                    >
                      <img src={LikeIcon} alt="LikeIcon" />
                    </button>
                  )}
                </Box>

                <Box
                  sx={{
                    ...HeaderIconStyle,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => GetProductShareLink(ProductId)}
                >
                  <img src={ShareIcon} alt="shareIcon" />
                </Box>
              </Box>
            </Box>
          </Box>

          <Grid container sx={{ width: "95%", mx: "auto", mt: 4 }}>
            <Grid item xl={0.5} lg={0.5} md={12} sm={12} xs={12} sx={fixGrid}>
              {/* {ImageDataArray?.length > 1 ? ( */}
              {/* <>
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
              </> */}
              {/* ) : null} */}
            </Grid>
            <Grid item xl={4.5} lg={4.5} md={12} sm={12} xs={12} sx={fixGrid}>
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
                {/* <Box
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
                ></Box> */}
                <CarouselforApperal ImageDataArray={ImageDataArray} />
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
                            border: "2px solid #000",
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
                  {/* <Grid
                    container
                    sx={{
                      background: "red",
                    }}
                  >
                   
                  </Grid> */}

                  {/* {NewdataArray?.map((el, idx) => {
                    if (
                      el?.ProductColor === color ||
                      el?.ProductColor === ColorData
                    ) {
                      return ( */}

                  <Grid
                    container
                    sx={{
                      textAlign: "center",
                      //   maxHeight: "60px",
                      //   height: "60px",
                      //   overflow: "auto",
                      //   "::-webkit-scrollbar": {
                      //     display: "block",
                      //   },
                      //   "::-webkit-scrollbar-thumb": {
                      //     dynamic: "#8d8e90",
                      //     height: "8px",
                      //     borderRadius: "8px",
                      //   },
                    }}
                  >
                    {
                      // filter the data from the array
                      GetProductByIdData?.ProductsVariantions?.map(
                        (res, idx) => {
                          if (res?._id === storeVariationData) {
                            return (
                              <Grid
                                container
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                }}
                              >
                                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                  <Box sx={ProductVariationStyle}>
                                    <Typography sx={tableHeader}>
                                      Gender
                                    </Typography>
                                    {/* </Grid>
                                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4}> */}
                                    <Typography sx={tableData}>
                                      {/* {res.ProductSize}
                                       */}{" "}
                                      Male
                                    </Typography>
                                  </Box>
                                </Grid>

                                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                  <Box sx={ProductVariationStyle}>
                                    <Typography sx={tableHeader}>
                                      {" "}
                                      Available Quantity
                                    </Typography>
                                    {/* </Grid>
                                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4}> */}
                                    <Typography sx={tableData}>
                                      {res.MinOrderQuantity}
                                    </Typography>
                                  </Box>
                                </Grid>

                                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                  <Box sx={ProductVariationStyle}>
                                    <Typography sx={tableHeader}>
                                      {" "}
                                      GST{" "}
                                    </Typography>
                                    {/* </Grid>

                                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}> */}
                                    <Typography sx={tableData}>
                                      {
                                        GetProductByIdData
                                          .ProductsVariantions[0].GST
                                      }
                                      &nbsp;%
                                    </Typography>
                                  </Box>
                                </Grid>

                                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                  <Box sx={ProductVariationStyle}>
                                    <Typography sx={tableHeader}>
                                      Add Quantity
                                    </Typography>
                                    {/* </Grid>
                                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4}> */}
                                    <Box
                                      sx={{
                                        ...tableHeader,
                                        border: "1px solid #8d8e90",
                                        borderRadius: "3px",
                                        width: "70%",
                                        textAlign: "center",
                                        p: 1,
                                      }}
                                    >
                                      Quantity
                                    </Box>
                                  </Box>
                                </Grid>

                                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                  <Box sx={ProductVariationStyle}>
                                    <Typography sx={tableHeader}>
                                      Total Price
                                    </Typography>
                                    {/* </Grid>
                                  <Grid item xl={4} lg={4} md={4} sm={4} xs={4}> */}
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      {res.PricePerUnit}
                                      <Box
                                        component="img"
                                        src={BXITokenIcon}
                                        sx={{
                                          width: "15px",
                                          height: "15px",
                                        }}
                                      />
                                    </Typography>
                                  </Box>
                                </Grid>

                                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                  <Box sx={ProductVariationStyle}>
                                    <Typography sx={tableHeader}>
                                      Minimum Order Quantity
                                    </Typography>
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      {res.MinOrderQuantity}
                                    </Typography>
                                  </Box>
                                </Grid>

                                <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                                  <Box sx={ProductVariationStyle}>
                                    <Typography sx={tableHeader}>
                                      Maximum Order Quantity
                                    </Typography>
                                    <Typography
                                      sx={{
                                        ...tableData,
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "center",
                                      }}
                                    >
                                      {res.MaxOrderQuantity}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                            );
                          }
                        }
                      )
                    }
                  </Grid>
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
                  {/* <Typography sx={chart}>Size Chart </Typography> */}
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
                        </Box>
                      </Grid>

                      {/* Tabpanel 2 data */}
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

                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              flexDirection: "column",
                            }}
                          >
                            <Typography sx={available}>
                              Sample Available :
                            </Typography>
                            {samplestate ? (
                              <>
                                <Typography
                                  sx={{ ...available, fontWeight: 600 }}
                                >
                                  Yes
                                </Typography>
                                {GetProductByIdData?.ProductsVariantions?.map(
                                  (item) => {
                                    return (
                                      <>
                                        <Box
                                          sx={{ display: "flex", gap: "10px" }}
                                        >
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
                                                    {item.priceofsample}
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
                                      </>
                                    );
                                  }
                                )}
                              </>
                            ) : (
                              <Typography
                                sx={{ ...available, fontWeight: 600 }}
                              >
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
                                  {/* {listItemText?.map((el, idx) => {
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
                            })} */}
                                  <Typography sx={listText}>
                                    Product Pickup Location:{"   "}
                                    {GetProductByIdData?.ProductPickupLocation}
                                  </Typography>
                                  {/* <Box sx={{ display: "flex", gap: "10px" }}>
                                    <Typography sx={available}>
                                      Sample Available:
                                    </Typography>
                                    {samplestate ? (
                                      <Typography sx={available}>
                                        Yes
                                      </Typography>
                                    ) : (
                                      <Typography sx={available}>No</Typography>
                                    )}
                                  </Box> */}
                                  {GetProductByIdData?.OtherCost?.length !==
                                  0 ? null : (
                                    <>
                                      <Typography sx={listText}>
                                        Other cost Price :{" "}
                                        {
                                          GetProductByIdData?.OtherCost.at(0)
                                            ?.CostPrice
                                        }
                                      </Typography>
                                      <Typography sx={listText}>
                                        Other cost Price Reason:{" "}
                                        {
                                          GetProductByIdData?.OtherCost.at(0)
                                            ?.ReasonOfCost
                                        }
                                      </Typography>
                                    </>
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
                        </Box>
                      </Grid>

                      {/* Tabpanel 3 data */}
                      <Box>
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
                            Lorem ipsum dolor sit amet consectetur. Proin sit
                            nisl a a lectus imperdiet. Nisl consectetur sit
                            lacus proin faucibus vitae. Ut imperdiet massa ut
                            urna dui amet. Feugiat non pellentesque tellus
                            congue augue. Habitant nunc pellentesque duis
                            egestas orci. Gravida elementum venenatis a volutpat
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

                      {/* Tabpanel 4 data */}
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

                          <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              flexDirection: "column",
                            }}
                          >
                            <Typography sx={available}>
                              Sample Available :
                            </Typography>
                            {samplestate ? (
                              <>
                                <Typography
                                  sx={{ ...available, fontWeight: 600 }}
                                >
                                  Yes
                                </Typography>
                                {GetProductByIdData?.ProductsVariantions?.map(
                                  (item) => {
                                    return (
                                      <>
                                        <Box
                                          sx={{ display: "flex", gap: "10px" }}
                                        >
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
                                                    {item.priceofsample}
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
                                      </>
                                    );
                                  }
                                )}
                              </>
                            ) : (
                              <Typography
                                sx={{ ...available, fontWeight: 600 }}
                              >
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
                                      <Typography sx={available}>
                                        Yes
                                      </Typography>
                                    ) : (
                                      <Typography sx={available}>No</Typography>
                                    )}
                                  </Box>
                                  {GetProductByIdData?.OtherCost?.length !==
                                  0 ? null : (
                                    <>
                                      <Typography sx={listText}>
                                        Other cost Price :{" "}
                                        {
                                          GetProductByIdData?.OtherCost.at(0)
                                            ?.CostPrice
                                        }
                                      </Typography>
                                      <Typography sx={listText}>
                                        Other cost Price Reason:{" "}
                                        {
                                          GetProductByIdData?.OtherCost.at(0)
                                            ?.ReasonOfCost
                                        }
                                      </Typography>
                                    </>
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
                        </Box>
                      </Grid>
                    </TabPanel>
                    <TabPanel value="3">
                      <Box>
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
                            Lorem ipsum dolor sit amet consectetur. Proin sit
                            nisl a a lectus imperdiet. Nisl consectetur sit
                            lacus proin faucibus vitae. Ut imperdiet massa ut
                            urna dui amet. Feugiat non pellentesque tellus
                            congue augue. Habitant nunc pellentesque duis
                            egestas orci. Gravida elementum venenatis a volutpat
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
                            console.log("value===>", val);
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
              Add to Cart
            </Button>
          </Box>
        </Paper>
      </Paper>
    </React.Fragment>
  );
};

export default OfficeSupplyDetails;

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

const HeaderIconStyle = {
  border: "1px solid #8C8C8C",
  borderRadius: "6px",
  height: "30px",
  width: "30px",
  padding: {
    xl: "14px",
    lg: "12px",
    md: "10px",
    sm: "8px",
    xs: "8px",
  },
};
