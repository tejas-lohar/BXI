import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import StacsOfCoinIcon from "../../assets/BXITokenIcon.png";
import Rupieicon from "../../assets/CartPage/rupieicon.svg";

import addItemCartIcon from "../../assets/CartPage/addItemIcon.svg";
import TrashCanIcon from "../../assets/WishlistPage/TrashCanicon.svg";
import ClearIcon from "@mui/icons-material/Clear";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { useRemoveCartProduct } from "../../Hooks/ProductActions/useRemoveCartProduct";
import { useDispatch } from "react-redux";
import { useCreatePrchaseOrder } from "../../Hooks/OrderActions/useCreatePrchaseOrder";
import { BiCheckbox } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { get_Cart_Items } from "../../redux/action/CartActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useGetCartData } from "../../Hooks/ProductActions/useGetCartData";
import CommaSeprator from "../../components/CommaSeprator";
import axios from "axios";
import useStyles from "./Styles";
import { useGetMediaCart } from "../../Hooks/MediaHooks/useGetMediaCart";
import { useCreateMediaOrder } from "../../Hooks/MediaHooks/useCreateMediaOrder";
import EmptyCart from "./EmptyCart";
import { useRemoveMediaFromCart } from "../../Hooks/MediaHooks/useRemoveMediaFromCart";
import PageLoader from "../../components/LoadingButton/PageLoader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const MediaCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [balance, setBalance] = React.useState("");
  const [Order, setOrder] = React.useState([]);
  const [MediaCartData, setMediaCartData] = useState([]);
  const [MediaCartLoading, setMediaCartLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [CartRemoveData, setCartRemoveData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { data: cartItems, refetch: cartRefetch } = useGetCartData();
  const classes = useStyles();

  function storeData(params) {
    const orderData = Order.find((el) => el._id === params._id);
    if (orderData) {
    } else {
      setOrder([...Order, params]);
    }
  }

  // const {
  //   data: MediaCartData,
  //   isLoading: VoucherCartLoading,
  //   error: VoucherDataError,
  //   refetch: MediaCartRefetch,
  // } = useGetMediaCart();

  async function GetMediaCartData() {
    axios
      .get("media/get_media_cart", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("MediaCartDatares", res);
        setMediaCartData(res?.data?.body);
        if (res?.data?.data?.length > 0) {
          setMediaCartLoading(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  const {
    data: MediaOrderCreate,
    isLoading: MediaOrderLoading,
    error: MediaOrderError,
    mutate: MediaOrderMutate,
  } = useCreateMediaOrder();

  function removeData(params) {
    const orderData = Order.find((el) => el._id === params._id);
    if (orderData) {
      const newOrder = Order.filter((el) => el._id !== params._id);
      setOrder(newOrder);
    } else {
      console.log("not exist");
    }
  }

  const reqBalance = async () => {
    await axios
      .get("wallet/mywallet", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res wallet", res);
        setBalance(res?.data?.data?.balance);
      });
  };

  useEffect(() => {
    reqBalance();
    GetMediaCartData();
  }, []);

  let totalPrice = 0;
  let totalgst = 0;
  let totalQuantity = 0;
  let dataId = [];
  let totalqty = 0;
  let TotalAdditionalCostInRupee = 0;
  let TotalAdditionalCostInBXI = 0;
  let ToTalGstPercentage = 0;
  let totalfinalPrice = 0;
  let TotalFinalPrice = 0;
  let TimeLineToBought = 0;
  let TimeLine = "";
  let BoughtSeconds = 0;

  let DataToBeSentToBackend = [];

  Order?.map((el) => {
    DataToBeSentToBackend.push({
      ProductId: el?.ProductId?._id,
      ProductName: el?.ProductId?.ProductName,
      ProductPrice: el?.DiscountedPrice,
      ProductQty: el.VoucherQuantity,
      Days: el?.NumberOfDays,
      // TimeLine: el?.
      BoughtSeconds: el?.BoughtSeconds,
      ProductDesc: el?.ProductId?.ProductDesc,
      SellerCompanyId: el?.ProductId?.SellerCompanyId,
      ProductsVariantionId: el?.ProductsVariantionId,
      TotalAdditionalCostInRupee: el?.TotalAdditionalCostInRupee,
      TotalAdditionalCostInBXI: el?.TotalAdditionalCostInBXI,
      TotalFinalPrice:
        TotalFinalPrice +
        el?.DiscountedPrice *
          el?.VoucherQuantity *
          el?.BoughtSeconds *
          el?.TimeLineToBought,
    });
    BoughtSeconds += el?.BoughtSeconds;
    ToTalGstPercentage += el?.ProductGst;
    totalPrice += el?.DiscountedPrice;
    totalgst +=
      (el?.DiscountedPrice *
        el?.VoucherQuantity *
        el?.BoughtSeconds *
        el?.TimeLineToBought *
        el?.ProductGst) /
      100;

    console.log(
      "finalprice",
      el?.DiscountedPrice,
      el?.VoucherQuantity,
      el?.BoughtSeconds,
      el?.TimeLineToBought
    );
    totalfinalPrice =
      totalfinalPrice +
      el?.DiscountedPrice *
        el?.VoucherQuantity *
        el?.BoughtSeconds *
        el?.TimeLineToBought;
    totalQuantity = totalQuantity + el.NumberOfDays;
    TotalAdditionalCostInRupee += el.TotalAdditionalCostInRupee;
    TotalAdditionalCostInBXI += el.TotalAdditionalCostInBXI;
    totalqty += el.VoucherQuantity;
    dataId.push(el._id);
  });

  const { mutate: removeCartProduct, refetch: removeCartProductRefetch } =
    useRemoveMediaFromCart();

  useEffect(() => {
    if (MediaOrderCreate?.data === "Order Created") {
      toast.success("Order Created", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate(`/home/purchaseorderlist`);
      }, 2000);
    } else if (MediaOrderCreate?.data === "OrderSummary validation failed") {
      toast.error("OrderSummary validation failed", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [MediaOrderCreate]);

  async function handleRemoveCartProduct(id) {
    await removeCartProduct(id);
    await GetMediaCartData();
    await setOpen(false);
  }

  async function handleRemoveMultipleCartProduct() {
    dataId.map((el) => {
      removeCartProduct(el);
      GetMediaCartData();
    });
    setOrder([]);
    GetMediaCartData();
  }

  async function handleCreateOrder() {
    if (balance < Number(totalfinalPrice) + Number(TotalAdditionalCostInBXI)) {
      alert("Your Wallet balance is low");
    } else {
      MediaOrderMutate(DataToBeSentToBackend);
    }
    cartRefetch();
    GetMediaCartData();
  }

  useEffect(() => {
    dispatch(get_Cart_Items());
  }, []);

  return (
    <Paper sx={{ bgcolor: "transparent" }} elevation={0}>
      {MediaCartData?.length > 0 ? (
        <React.Fragment>
          <Box
            sx={{
              marginTop: "50px",
            }}
          >
            {MediaCartData?.map((el, idx) => {
              return (
                <Box key={idx}>
                  <Box className={classes.rootbox}>
                    <Box className={classes.rootboxChildOne}>
                      <Box
                        className={classes.cartProductStrip}
                        sx={{
                          backgroundImage: `url(${el?.ProductId?.ProductImages[0].url})`,
                        }}
                      ></Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                          alignContent: "start",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <Typography
                          sx={{
                            ...ProductNameTextStyle,
                            width: "300px",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                          }}
                        >
                          {el?.ProductId?.ProductName}
                        </Typography>
                        <Typography
                          sx={{
                            ...ProductMetaTextStyle,
                            width: "300px",
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontFamily: "Poppins",
                            fontWeight: 500,
                          }}
                        >
                          {el?.ProductId?.ProductDescription}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            alignContent: "center",
                            width: "100%",
                          }}
                        >
                          <Typography sx={ProductPriceTextStyle}>
                            <img
                              src={StacsOfCoinIcon}
                              alt="rupieicon"
                              style={{
                                width: "20px",
                                height: "auto",
                              }}
                            />
                          </Typography>
                          <Typography
                            sx={{
                              ...ProductPriceTextStyle,
                              marginTop: "-03px",
                            }}
                          >
                            &nbsp;
                            <CommaSeprator Price={el?.DiscountedPrice} />
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        maxWidth: "120px",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        alignContent: "center",
                      }}
                    >
                      {dataId.includes(el._id) ? (
                        <Box
                          onClick={() => {
                            removeData(el);
                          }}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          {/* <BiCheckboxChecked size={35}  style={{color : "#445FD2"}}  /> */}
                          <img src={addItemCartIcon} size={30} />
                        </Box>
                      ) : (
                        <Box
                          onClick={() => {
                            storeData(el);
                          }}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <BiCheckbox size={30} />
                        </Box>
                      )}

                      <Box
                        onClick={() => {
                          handleClickOpen();
                          setCartRemoveData({
                            id: el._id,
                            ProductName: el?.ProductId?.ProductName,
                          });
                        }}
                      >
                        <IoClose
                          size={25}
                          style={{
                            cursor: "pointer",
                          }}
                          sx={{
                            color: "rgba(104, 107, 111, 1)",
                            fontSize: "2rem",
                            cursor: "pointer",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "row",
                xs: "column",
              },
              gap: "2rem",
              marginTop: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "2rem",
                bgcolor: "transparent",
                justifyContent: "flex-start",
              }}
            >
              {" "}
              <Box
                component={"img"}
                src={addItemCartIcon}
                alt="icon"
                style={{ cursor: "pointer" }}
              ></Box>
              <Typography sx={{ ...cartSelectionTextStyle, display: "flex " }}>
                {Order?.length}/{MediaCartData?.body?.length}
                &nbsp;Items&nbsp;Selected&nbsp; (&nbsp;
                {totalPrice ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <img
                      src={StacsOfCoinIcon}
                      style={{
                        width: "auto",
                        height: "23px",
                        marginRight: "5px",
                      }}
                      alt="rupieicon"
                    />
                    <Typography sx={cartSelectionTextStyle}>
                      <CommaSeprator Price={totalPrice} />
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <img
                      src={StacsOfCoinIcon}
                      style={{
                        width: "23px",
                        height: "auto",
                      }}
                      alt="rupieicon"
                    />
                    <Typography sx={cartSelectionTextStyle}>0</Typography>
                  </Box>
                )}
                &nbsp;)
                {"   "}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "2rem" }}>
              {" "}
              <Box
                component={"img"}
                src={TrashCanIcon}
                alt="trashIcon"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  handleRemoveMultipleCartProduct();
                }}
              ></Box>
            </Box>
          </Grid>
          {Order?.length === 0 ? null : (
            <>
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{
                  background: "#fff",
                  padding: "4rem",
                  borderRadius: "10px",

                  marginTop: "2rem",
                }}
              >
                <Typography sx={{ ...cartSelectionTextStyle }}>
                  PRICE DETAILS&nbsp;({Order?.length} Items){"   "}
                </Typography>

                <TableContainer sx={{ marginTop: "3rem" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                        >
                          Product Name
                        </TableCell>
                        <TableCell
                          sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                          align="center"
                        >
                          Price Per Unit
                        </TableCell>
                        <TableCell
                          sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                          align="center"
                        >
                          Days
                        </TableCell>
                        <TableCell
                          sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                          align="center"
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                          align="center"
                        >
                          GST Rate
                        </TableCell>

                        <TableCell
                          sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                          align="center"
                        >
                          GST Amount
                        </TableCell>
                        <TableCell
                          sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                          align="center"
                        >
                          Additional Cost ('₹')
                        </TableCell>
                        <TableCell
                          sx={{
                            ...InfoBoxAmountText,
                            borderBottom: "none",
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignContent: "center",
                          }}
                          align="center"
                        >
                          Additional Cost ('
                          <img
                            src={StacsOfCoinIcon}
                            style={{
                              width: "auto",
                              height: "23px",
                              marginRight: "5px",
                            }}
                            alt="rupieicon"
                          />
                          ')
                        </TableCell>
                        <TableCell
                          sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                          align="center"
                        >
                          Total Tokens
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Order?.map((row, idx) => {
                        let TotalBXIToken = Math.round(
                          row?.DiscountedPrice *
                            row?.VoucherQuantity *
                            row?.BoughtSeconds *
                            row?.TimeLineToBought
                        );

                        console.log("rowrowrow", TotalBXIToken);
                        return (
                          <TableRow
                            key={idx}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{
                                borderBottom: "none",
                              }}
                            >
                              <Typography
                                sx={{
                                  ...SelectedItemsTetxStyle,
                                  width: "250px",
                                  height: "30px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {row?.ProductId?.ProductName}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={SelectedItemsTetxStyle}>
                                <CommaSeprator Price={row?.DiscountedPrice} />
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={SelectedItemsTetxStyle}>
                                <CommaSeprator Price={row?.NumberOfDays} />
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={SelectedItemsTetxStyle}>
                                <CommaSeprator Price={row?.VoucherQuantity} />
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={SelectedItemsTetxStyle}>
                                {row?.ProductGst}&nbsp;%
                              </Typography>
                            </TableCell>

                            <TableCell
                              align="center"
                              sx={{
                                borderBottom: "none",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "auto",
                                }}
                              >
                                <Typography sx={SelectedItemsTetxStyle}>
                                  {/* <img
                                    src={Rupieicon}
                                    alt="rupieicon"
                                    style={{ height: "13px" }}
                                  />
                                  &nbsp; */}
                                  <CommaSeprator
                                    Price={
                                      (TotalBXIToken * row?.ProductGst) / 100
                                    }
                                  />
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderBottom: "none",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "auto",
                                }}
                              >
                                <Typography sx={SelectedItemsTetxStyle}>
                                  <CommaSeprator
                                    Price={
                                      row?.TotalAdditionalCostInRupee
                                        ? row?.TotalAdditionalCostInRupee
                                        : 0
                                    }
                                  />
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderBottom: "none",
                              }}
                            >
                              <Box
                                sx={{
                                  width: "auto",
                                }}
                              >
                                <Typography sx={SelectedItemsTetxStyle}>
                                  &nbsp;
                                  <CommaSeprator
                                    Price={
                                      row?.TotalAdditionalCostInBXI
                                        ? row?.TotalAdditionalCostInBXI
                                        : 0
                                    }
                                  />
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                borderBottom: "none",
                              }}
                            >
                              <Typography
                                sx={{
                                  ...SelectedItemsTetxStyle,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <img
                                  src={StacsOfCoinIcon}
                                  alt="rupieicon"
                                  style={{ height: "23px" }}
                                />
                                &nbsp;
                                <CommaSeprator
                                  Price={
                                    TotalBXIToken +
                                    row?.TotalAdditionalCostInBXI
                                  }
                                />
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow sx={{ borderTop: "1px solid #EDEDED" }}>
                        <TableCell
                          sx={{ fontWeight: "bold", borderBottom: "none" }}
                          component="th"
                          scope="row"
                        >
                          <Typography sx={SelectedItemsTetxStyle}>
                            Total Amount
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", borderBottom: "none" }}
                          align="center"
                        ></TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", borderBottom: "none" }}
                          align="center"
                        >
                          <Typography sx={SelectedItemsTetxStyle}>
                            <CommaSeprator Price={totalQuantity} />
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", borderBottom: "none" }}
                          align="center"
                        >
                          <Typography sx={SelectedItemsTetxStyle}>
                            <CommaSeprator Price={totalqty} />
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            ...SelectedItemsTetxStyle,
                            borderBottom: "none",
                          }}
                          align="center"
                        >
                          <CommaSeprator Price={ToTalGstPercentage} /> %
                        </TableCell>

                        <TableCell
                          sx={{ fontWeight: "bold", borderBottom: "none" }}
                          align="center"
                        >
                          <Typography sx={SelectedItemsTetxStyle}>
                            {/* <img
                              src={Rupieicon}
                              alt="rupieicon"
                              style={{ height: "13px" }}
                            />
                            &nbsp; */}
                            <CommaSeprator Price={totalgst} />
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", borderBottom: "none" }}
                          align="center"
                        >
                          <Typography sx={SelectedItemsTetxStyle}>
                            {/* <img
                              src={Rupieicon}
                              alt="rupieicon"
                              style={{ height: "13px" }}
                            />
                            &nbsp; */}
                            <CommaSeprator Price={TotalAdditionalCostInRupee} />
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", borderBottom: "none" }}
                          align="center"
                        >
                          <Typography sx={SelectedItemsTetxStyle}>
                            <CommaSeprator Price={TotalAdditionalCostInBXI} />
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "bold", borderBottom: "none" }}
                          align="right"
                        >
                          <Typography
                            sx={{
                              ...SelectedItemsTetxStyle,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <img
                              src={StacsOfCoinIcon}
                              alt="rupieicon"
                              style={{ height: "23px" }}
                            />
                            &nbsp;
                            <CommaSeprator
                              Price={
                                totalfinalPrice +
                                Number(TotalAdditionalCostInBXI)
                              }
                            />
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Button
                sx={{
                  width: "100%",
                  height: "50px",
                  background: "#E0F0FF",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#445FD2",
                  "&:hover": {
                    background: "#E0F0FF",
                    color: "#445FD2",
                  },
                }}
                onClick={() => {
                  handleCreateOrder();
                }}
              >
                Place Order
              </Button>
            </>
          )}
        </React.Fragment>
      ) : MediaCartLoading ? (
        <PageLoader />
      ) : (
        <EmptyCart />
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {CartRemoveData?.ProductName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this item from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleRemoveCartProduct(CartRemoveData?.id)}
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default MediaCart;

const SelectedItemsTetxStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "27px",
  color: "#6B7A99",
};

const InfoBoxAmountText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "24px",
  color: " #282828",
};

const ProductNameTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "17px",
    sm: "13px",
    xs: "13px",
  },
  lineHeight: "25px",
  color: "#6B7A99",
  textAlign: "left",
};
const ProductMetaTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: {
    xl: "12px",
    lg: "12px",
    md: "11px",
    sm: "9px",
    xs: "9px",
  },
  lineHeight: {
    xl: "18px",
    lg: "18px",
    md: "15px",
    sm: "14px",
    xs: "14px",
  },
  color: "#858585",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
const ProductPriceTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  color: "rgba(107, 122, 153, 0.5)",
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "18px",
    sm: "15px",
    xs: "15px",
  },
  lineHeight: {
    xl: "21px",
    lg: "21px",
    md: "19px",
    sm: "18px",
    xs: "17px",
  },
  alignContent: "center",
  alignItems: "center",
};

const cartSelectionTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "25px",
  color: "#6B7A99",
};
