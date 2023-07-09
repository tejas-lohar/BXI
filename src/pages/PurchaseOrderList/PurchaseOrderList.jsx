import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";

import { useDispatch } from "react-redux";
import { listPurchaseOrders } from "../../redux/action/PurchaseOrder_Action";

import CompanyName from "../../components/CompanyName";

import { BiCheckbox } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { useGetOrderSummaryForBuyer } from "../../Hooks/OrderActions/useGetOrderSummaryForBuyer";
import addItemCartIcon from "../../assets/CartPage/addItemIcon.svg";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import AcceptedIcon from "../../assets/Images/CommonImages/Accepted.png";
import DownIcon from "../../assets/Images/CommonImages/Down.png";
import GoLeft from "../../assets/Images/CommonImages/GoLeft.png";
import PendingIcon from "../../assets/Images/CommonImages/Pending.png";
import RejectedIcon from "../../assets/Images/CommonImages/Rejected.png";
import stackofcoins from "../../assets/Stack of Coins.svg";
// import { useGetSellerSidePendingOrder } from "../../Hooks/OrderActions/useGetSellerSidePendingOrder";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import { useGetSellerSidePendingOrder } from "../../Hooks/OrderActions/useGetSellerSidePendingOrder";
import CommaSeprator from "../../components/CommaSeprator";

function PurchaseOrderList() {
  const StyledPagination = styled(Pagination)({
    "& .MuiPagination-ul li:last-child": {
      marginLeft: "16px",
    },
    "& .MuiPagination-ul li:last-child button::before": {
      content: "'Last'",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "11px",
      lineHeight: "14px",
      color: "#445FD2",
      marginRight: "8px",
    },
    "& .MuiPagination-ul li:first-child": {
      marginRight: "16px",
    },
    "& .MuiPagination-ul li:first-child button::after": {
      content: "'First'",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "11px",
      lineHeight: "14px",
      color: "#445FD2",
      marginLeft: "8px",
    },
    "& .MuiPaginationItem-icon": {
      color: "#445FD2",
      fontWeight: 800,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

const [DataIds, setDataIds] = useState([]);
const [Order, setOrder] = React.useState([]);
const [Switchtab, setSwitchtab] = useState("Purchased");
const [currentPage, setCurrentPage] = useState(1);
const [initialPaginationCount, setInitialPaginationCount] = useState(null);
const [Allselected, setAllselected] = useState(false);

const handlePageChange = (event, page) => {
  setCurrentPage(page);
};

const {
  data: purchaseOrderDataBuyer,
  isLoading: purchaseOrderLoadingSeller,
  error: purchaseOrderErrorSeller,
  refetch: refetchBuyer,
} = useGetOrderSummaryForBuyer(currentPage);

const {
  data: purchaseOrderDataSeller,
  isLoading: purchaseOrderLoadingSellerPending,
  error: purchaseOrderErrorSellerPending,
  refetch: refetchSellerPending,
} = useGetSellerSidePendingOrder(currentPage);

useEffect(() => {
  if (Switchtab === "Purchased") {
    setCurrentPage(1);
    refetchBuyer({ page: 1 });
  } else if (Switchtab === "Sold") {
    setCurrentPage(1);
    refetchSellerPending({ page: 1 });
  }
}, [Switchtab]);

useEffect(() => {
  const { finalCount: allCount } = purchaseOrderDataBuyer || {};
  const { finalCount: liveCount } = purchaseOrderDataSeller || {};

  if (allCount !== undefined && Switchtab === "Purchased") {
    setInitialPaginationCount(allCount);
  } else if (liveCount !== undefined && Switchtab === "Sold") {
    setInitialPaginationCount(liveCount);
  }
}, [purchaseOrderDataBuyer, purchaseOrderDataSeller, Switchtab]);

useEffect(() => {
  if (Switchtab === "Purchased") {
    refetchBuyer({ page: currentPage });
  } else if (Switchtab === "Sold") {
    refetchSellerPending({ page: currentPage });
  }
}, [currentPage, Switchtab, refetchBuyer, refetchSellerPending]);

  let dataId = [];

  Order.map((el) => {
    dataId.push(el._id);
  });

  function storeData(params) {
    let pendingOrdersLength = 0;
    const orderData = Order.find((el) => el._id === params._id);
    if (orderData) {
    } else {
      setOrder([...Order, params._id]);
      pendingOrdersLength++;
    }
    const pendingOrders = purchaseOrderDataSeller?.OrderSumm?.filter(
      (order) => order.BuyerOrderStatus === "Pending"
    );
    if (pendingOrdersLength === pendingOrders?.length) {
      setAllselected(true);
    }
  }

  function SelectAllData() {
    let dataId = [];
    let pendingOrdersLength = 0;
    for (let i = 0; i < purchaseOrderDataSeller?.OrderSumm?.length; i++) {
      if (
        purchaseOrderDataSeller?.OrderSumm?.[i].BuyerOrderStatus === "Pending"
      )
        dataId.push(purchaseOrderDataSeller?.OrderSumm?.[i]._id);
      pendingOrdersLength++;
    }
    const pendingOrders = purchaseOrderDataSeller?.OrderSumm?.filter(
      (order) => order.BuyerOrderStatus === "Pending"
    );
    setOrder(dataId);
    if (
      dataId.length === pendingOrdersLength ||
      dataId?.length === pendingOrders?.length
    ) {
      setAllselected(true);
    }
  }

  function RemoveAllData() {
    setOrder([]);
    setAllselected(false);
  }

  useEffect(() => {
    const pendingOrders = purchaseOrderDataSeller?.OrderSumm?.filter(
      (order) => order.BuyerOrderStatus === "Pending"
    );
    const pendingOrdersLength = pendingOrders ? pendingOrders.length : 0;

    if (pendingOrdersLength === Order?.length) {
      setAllselected(false);
    }
  }, []);

  function removeData(params) {
    const orderData = Order.find((el) => el === params._id);
    if (orderData) {
      const newOrder = Order.filter((el) => el !== params._id);
      setOrder(newOrder);
    }
  }

  const BuyerAcceptOrder = async (status) => {
    if (Order.length > 0) {
      const confirmed = window.confirm(
        "Are you sure you want to update the orders?"
      );
      if (confirmed) {
        try {
          const res = await axios.put(
            "purchase/bulk_update_purchase_order",
            {
              OrderId: Order,
              Status: status,
            },
            {
              withCredentials: true,
            }
          );
          refetchBuyer();
          if (res?.data === "Rejected") {
            toast.error("Order Rejected", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (res?.data === "Accepted") {
            toast.success("Order Accepted", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          RemoveAllData();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      toast.error("Please Select Order", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // useEffect(() => {
  //   if (sendMassages) {
  //     let receiver = purchaseOrderDataSeller?.SellerDetails?.SellerCompanyId;
  //     let sender = purchaseOrderDataSeller?.BuyerDetails?.BuyerCompanyId;
  //     let message = `New Order Has been Received from ${purchaseOrderDataSeller?.SellerDetails?.SellerCompanyName}`;
  //     let type = "Order";

  //     dispatch(notifications(receiver, sender, message, type));
  //   }
  // }, [sendMassages]);

  useEffect(() => {
    dispatch(listPurchaseOrders());
  }, [dispatch]);

  return (
    <Paper
      sx={{
        boxShadow: "none",
        background: "transparent",
        width: "100%",
        mx: "auto",
      }}
      elevation={0}
    >
      <BreadCrumbHeader MainText={"Purchased Order List"} />

      <Grid
        container
        sx={{
          background: "#FFFFFF",
          padding: "1rem",
          borderRadius: "20px",
          minHeight: "70vh",
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: 1,
          position: "relative",
        }}
      >
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
            alignContent: "center",
            height: "50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "190px",
            }}
          >
            <Button
              onClick={() => navigate("/home")}
              sx={{
                background: "transparent",
                boxShadow: "none",
              }}
            >
              <img src={GoLeft} width="22px" />
            </Button>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#242120",
                ml: "1rem",
              }}
            >
              Product Details
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid #445FD2",
              borderRadius: "10px",
            }}
          >
            <Button
              variant="contained"
              sx={{
                ...SwitchButtonStyle,
                background:
                  Switchtab === "Purchased" ? "#445FD2" : "transparent",
                color: Switchtab === "Purchased" ? "#FFFFFF" : "#445FD2",
                "&:hover": {
                  background:
                    Switchtab === "Purchased" ? "#445FD2" : "transparent",
                  color: Switchtab === "Purchased" ? "#FFFFFF" : "#445FD2",
                },
              }}
              onClick={() => {
                setSwitchtab("Purchased");
                refetchBuyer();
              }}
            >
              Purchase
            </Button>
            <Button
              variant="contained"
              sx={{
                ...SwitchButtonStyle,
                background: Switchtab === "Sold" ? "#445FD2" : "transparent",
                color: Switchtab === "Sold" ? "#FFFFFF" : "#445FD2",
                "&:hover": {
                  background: Switchtab === "Sold" ? "#445FD2" : "transparent",
                  color: Switchtab === "Sold" ? "#FFFFFF" : "#445FD2",
                },
              }}
              onClick={() => {
                setSwitchtab("Sold");
                refetchSellerPending();
              }}
            >
              Sale
            </Button>
          </Box>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid
            container
            sx={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "99%",
            }}
          >
            <Grid
              item
              xl={0.5}
              lg={0.5}
              md={0.5}
              sm={0.5}
              xs={0.5}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography sx={tableheading}>No</Typography>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
              <Typography sx={tableheading}>Company Name</Typography>
            </Grid>
            <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} xs={1.5}>
              <Typography align="center" sx={tableheading}>
                Total Products
              </Typography>
            </Grid>
            <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} xs={1.5}>
              <Typography align="center" sx={tableheading}>
                Total Price
              </Typography>
            </Grid>
            <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} xs={1.5}>
              <Typography align="center" sx={tableheading}>
                Order date
              </Typography>
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
              <Typography align="center" sx={tableheading}>
                Status
              </Typography>
            </Grid>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              <Typography align="center" sx={tableheading}>
                Action
              </Typography>
            </Grid>
            {Switchtab === "Purchased" ? (
              <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <Typography
                  align="center"
                  sx={{ ...tableheading, color: "#445FD2" }}
                  onClick={RemoveAllData}
                >
                  Bulk Action
                </Typography>
              </Grid>
            ) : null}
          </Grid>
          {Switchtab === "Purchased" ? (
            <>
              {purchaseOrderDataBuyer?.OrderSumm?.length > 0 &&
                purchaseOrderDataBuyer?.OrderSumm?.map((data, idx) => {
                  let totalPrice = 0;
                  data?.ProductData?.map((data) => {
                    let timesec = data?.BoughtSeconds;
                    totalPrice +=
                      data.DiscountedPrice *
                        data.ProductQuantity *
                        timesec *
                        data?.TimelineToBought ||
                      data.DiscountedPrice * data.ProductQuantity;
                    return totalPrice;
                  });
                  function convertDate(inputFormat) {
                    function pad(s) {
                      return s < 10 ? "0" + s : s;
                    }
                    var d = new Date(inputFormat);
                    return [
                      pad(d.getDate()),
                      pad(d.getMonth() + 1),
                      d.getFullYear(),
                    ].join("/");
                  }

                  if (purchaseOrderLoadingSeller) {
                    return (
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={35}
                      />
                    );
                  } else {
                    return (
                      <Accordion
                        sx={{
                          p: 0,
                          boxShadow: "none",
                          border: "none",
                          borderBottom: "1px solid #F5F5F5",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <img src={DownIcon} style={{ width: "9px" }} />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{ p: 0 }}
                        >
                          <Grid container>
                            <Grid
                              item
                              xl={0.5}
                              lg={0.5}
                              md={0.5}
                              sm={0.5}
                              xs={0.5}
                              sx={{
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                              }}
                            >
                              <Typography sx={TableBodyTextStyling}>
                                {" "}
                                {idx + 1}
                              </Typography>
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                              <Typography
                                sx={{
                                  ...TableBodyTextStyling,
                                  fontSize: "14px",
                                }}
                              >
                                <CompanyName
                                  CompanyId={data.SellerCompanyId}
                                  CompanyName={
                                    data?.SellerDetails?.SellerCompanyName
                                  }
                                  CompanyTypeName={
                                    data?.SellerDetails?.CompanyTypeName
                                  }
                                />
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xl={1.5}
                              lg={1.5}
                              md={1.5}
                              sm={1.5}
                              xs={1.5}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <Typography sx={TableBodyTextStyling}>
                                {data?.ProductData?.length}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xl={1.5}
                              lg={1.5}
                              md={1.5}
                              sm={1.5}
                              xs={1.5}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <Typography
                                sx={{
                                  ...TableBodyTextStyling,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "2px",
                                }}
                              >
                                <img
                                  src={stackofcoins}
                                  alt="rupieicon"
                                  style={{
                                    width: "15px",
                                    height: "auto",
                                  }}
                                />
                                <CommaSeprator Price={totalPrice} />
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xl={1.5}
                              lg={1.5}
                              md={1.5}
                              sm={1.5}
                              xs={1.5}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <Typography sx={TableBodyTextStyling}>
                                {convertDate(data?.PoDate)}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xl={1}
                              lg={1}
                              md={1}
                              sm={1}
                              xs={1}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                                gap: "5px",
                              }}
                            >
                              <Typography
                                sx={{
                                  ...TableBodyTextStyling,
                                  fontSize: "14px",
                                  color:
                                    data?.BuyerOrderStatus === "Pending"
                                      ? "#FFB600"
                                      : data?.BuyerOrderStatus === "Accepted"
                                      ? "#118A2C"
                                      : "#FF0000",

                                  mx: "auto",
                                }}
                              >
                                {data?.BuyerOrderStatus}
                              </Typography>
                              {data?.BuyerOrderStatus === "Pending" ? (
                                <Box
                                  component="img"
                                  src={PendingIcon}
                                  sx={{ width: "13px", height: "13px" }}
                                />
                              ) : data?.BuyerOrderStatus === "Accepted" ? (
                                <Box
                                  component="img"
                                  src={AcceptedIcon}
                                  sx={{ width: "13px", height: "13px" }}
                                />
                              ) : (
                                <Box
                                  component="img"
                                  src={RejectedIcon}
                                  sx={{ width: "13px", height: "13px" }}
                                />
                              )}
                            </Grid>

                            <Grid
                              item
                              xl={2}
                              lg={2}
                              md={2}
                              sm={2}
                              xs={2}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <Box
                                onClick={() => {
                                  data.IsMedia === true
                                    ? navigate(
                                        `/home/mediapurchaseorderdetails/${data._id}`
                                      )
                                    : navigate(
                                        `/home/purchaseorderdetails/${data._id}`
                                      );
                                }}
                                sx={{
                                  cursor: "pointer",
                                  width: "100px",
                                  mx: "auto",
                                  height: "30px",
                                  background: "#445FD2",
                                  borderRadius: "4.39877px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <Typography
                                  sx={{
                                    ...TableBodyTextStyling,
                                    color: "#fff",
                                  }}
                                >
                                  View P.O.
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid
                              item
                              xl={1}
                              lg={1}
                              md={1}
                              sm={1}
                              xs={1}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              {data?.BuyerOrderStatus === "Accepted" ? (
                                <Box
                                  sx={ButtonStyleForAcceptAndReject}
                                  onClick={() =>
                                    navigate("/home/sellerordersummary")
                                  }
                                >
                                  Next Step{" "}
                                </Box>
                              ) : data?.BuyerOrderStatus === "Pending" ? (
                                <Box
                                  sx={{
                                    width: "100%",
                                    maxWidth: "150px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignContent: "center",
                                    mx: "auto",
                                  }}
                                >
                                  {Order.includes(data._id) ? (
                                    <Box
                                      onClick={() => {
                                        removeData(data);
                                      }}
                                      sx={{
                                        cursor: "pointer",
                                      }}
                                    >
                                      <img src={addItemCartIcon} size={30} />
                                    </Box>
                                  ) : (
                                    <Box
                                      onClick={() => {
                                        storeData(data);
                                      }}
                                      sx={{
                                        cursor: "pointer",
                                      }}
                                    >
                                      <BiCheckbox size={30} />
                                    </Box>
                                  )}
                                </Box>
                              ) : null}
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0, pb: 2 }}>
                          {data?.ProductData?.length > 0 &&
                            data?.ProductData?.map((data, idx) => {
                              return (
                                <Grid
                                  container
                                  spacing={2}
                                  sx={{
                                    p: 0,
                                    ml: 1,
                                    width: "100%",
                                    maxWidth: "500px",
                                  }}
                                >
                                  <Grid
                                    item
                                    xl={1}
                                    lg={1}
                                    md={1}
                                    sm={1}
                                    xs={1}
                                    sx={{
                                      textAlign: "center",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography sx={TableBodyTextStyling}>
                                      {idx + 1}
                                    </Typography>
                                  </Grid>
                                  <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <Box
                                      component="img"
                                      src={data?.ProductImage}
                                      sx={{
                                        width: "50px",
                                        height: "auto",
                                        mx: "auto",
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xl={3}
                                    lg={3}
                                    md={3}
                                    sm={3}
                                    xs={3}
                                    sx={{
                                      textAlign: "left",
                                      alignItems: "center",
                                      justifyContent: "flex-start",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...TableBodyTextStyling,
                                        textTransform: "capitalize",
                                        //  hide text overflow
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        maxWidth: "200px",
                                      }}
                                    >
                                      {data?.ProductName}
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xl={2}
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={2}
                                    sx={{
                                      textAlign: "center",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography sx={TableBodyTextStyling}>
                                      <CommaSeprator
                                        Price={data?.ProductQuantity}
                                      />
                                      QTY
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xl={2}
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={2}
                                    sx={{
                                      textAlign: "center",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...TableBodyTextStyling,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "2px",
                                      }}
                                    >
                                      <Box
                                        component="img"
                                        src={stackofcoins}
                                        alt="coins"
                                        sx={{
                                          height: "15px",
                                          width: "15px",
                                        }}
                                      />
                                      <CommaSeprator
                                        Price={
                                          data?.ProductQuantity *
                                            data?.DiscountedPrice *
                                            data?.TimelineToBought *
                                            data?.BoughtSeconds ||
                                          data?.ProductQuantity *
                                            data?.DiscountedPrice
                                        }
                                      />
                                    </Typography>
                                  </Grid>
                                </Grid>
                              );
                            })}
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                })}
            </>
          ) : (
            <>
              {purchaseOrderDataSeller?.PurchaseOrders?.length > 0 &&
                purchaseOrderDataSeller?.PurchaseOrders?.map((data, idx) => {
                  let totalPrice = 0;
                  data?.ProductData?.map((data) => {
                    totalPrice =
                      totalPrice + data.DiscountedPrice * data.ProductQuantity;
                    return totalPrice;
                  });

                  function convertDate(inputFormat) {
                    function pad(s) {
                      return s < 10 ? "0" + s : s;
                    }
                    var d = new Date(inputFormat);
                    return [
                      pad(d.getDate()),
                      pad(d.getMonth() + 1),
                      d.getFullYear(),
                    ].join("/");
                  }
                  if (purchaseOrderErrorSellerPending) {
                    return (
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={35}
                      />
                    );
                  } else {
                    return (
                      <Accordion
                        sx={{
                          p: 0,
                          boxShadow: "none",
                          border: "none",
                          borderBottom: "1px solid #F5F5F5",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <img src={DownIcon} style={{ width: "9px" }} />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{ p: 0 }}
                        >
                          <Grid container>
                            <Grid
                              item
                              xl={0.5}
                              lg={0.5}
                              md={0.5}
                              sm={0.5}
                              xs={0.5}
                              sx={{
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                              }}
                            >
                              <Typography sx={TableBodyTextStyling}>
                                {" "}
                                {idx + 1}
                              </Typography>
                            </Grid>
                            <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                              <Typography
                                sx={{
                                  ...TableBodyTextStyling,
                                  fontSize: "14px",
                                }}
                              >
                                <CompanyName
                                  CompanyId={
                                    data?.BuyerDetails?.BuyerCompanyName
                                  }
                                  CompanyName={
                                    data?.BuyerDetails?.BuyerCompanyName
                                  }
                                />
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xl={2}
                              lg={2}
                              md={2}
                              sm={2}
                              xs={2}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <Typography sx={TableBodyTextStyling}>
                                <CommaSeprator
                                  Price={data?.ProductData?.length}
                                />
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xl={1.5}
                              lg={1.5}
                              md={1.5}
                              sm={1.5}
                              xs={1.5}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <Typography
                                sx={{
                                  ...TableBodyTextStyling,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "2px",
                                }}
                              >
                                <img
                                  src={stackofcoins}
                                  alt="rupieicon"
                                  style={{
                                    width: "15px",
                                    height: "auto",
                                  }}
                                />
                                <CommaSeprator Price={totalPrice} />
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xl={1.8}
                              lg={1.8}
                              md={1.8}
                              sm={1.8}
                              xs={1.8}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <Typography sx={TableBodyTextStyling}>
                                {convertDate(data?.PoDate)}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xl={1}
                              lg={1}
                              md={1}
                              sm={1}
                              xs={1}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                                gap: "5px",
                              }}
                            >
                              <Typography
                                sx={{
                                  ...TableBodyTextStyling,
                                  fontSize: "14px",
                                  color:
                                    data?.SellerOrderStatus === "Pending"
                                      ? "#FFB600"
                                      : data?.SellerOrderStatus === "Accepted"
                                      ? "#118A2C"
                                      : "#FF0000",

                                  mx: "auto",
                                }}
                              >
                                {data?.SellerOrderStatus}
                              </Typography>
                              {data?.SellerOrderStatus === "Pending" ? (
                                <Box
                                  component="img"
                                  src={PendingIcon}
                                  sx={{ width: "13px", height: "13px" }}
                                />
                              ) : data?.SellerOrderStatus === "Accepted" ? (
                                <Box
                                  component="img"
                                  src={AcceptedIcon}
                                  sx={{ width: "13px", height: "13px" }}
                                />
                              ) : (
                                <Box
                                  component="img"
                                  src={RejectedIcon}
                                  sx={{ width: "13px", height: "13px" }}
                                />
                              )}
                            </Grid>
                            <Grid
                              item
                              xl={2}
                              lg={2}
                              md={2}
                              sm={2}
                              xs={2}
                              sx={{
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex",
                              }}
                            >
                              <Box
                                onClick={() => {
                                  navigate(
                                    `/home/sellerdetailedordersummary/${data._id}`
                                  );
                                }}
                                sx={{
                                  cursor: "pointer",
                                  width: "100px",
                                  mx: "auto",
                                  height: "30px",
                                  background: "#445FD2",
                                  borderRadius: "4.39877px",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  alignContent: "center",
                                }}
                              >
                                <Typography
                                  sx={{
                                    ...TableBodyTextStyling,
                                    color: "#fff",
                                  }}
                                >
                                  View
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                          {data?.ProductData?.length > 0 &&
                            data?.ProductData?.map((data, idx) => {
                              return (
                                <Grid
                                  container
                                  spacing={2}
                                  sx={{
                                    p: 0,
                                    m: 0,
                                    width: "100%",
                                    maxWidth: "500px",
                                    mb: 1,
                                  }}
                                >
                                  <Grid
                                    item
                                    xl={1}
                                    lg={1}
                                    md={1}
                                    sm={1}
                                    xs={1}
                                    sx={{
                                      textAlign: "center",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography sx={TableBodyTextStyling}>
                                      {idx + 1}
                                    </Typography>
                                  </Grid>
                                  <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                                    <img
                                      src={data?.ProductImage}
                                      style={{ width: "30px", height: "auto" }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xl={2}
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={2}
                                    sx={{
                                      textAlign: "left",
                                      alignItems: "start",
                                      justifyContent: "flex-start",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...TableBodyTextStyling,
                                        textTransform: "capitalize",
                                        //  hide text overflow
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        maxWidth: "150px",
                                      }}
                                    >
                                      {data?.ProductName}
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xl={2}
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={2}
                                    sx={{
                                      textAlign: "center",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography sx={TableBodyTextStyling}>
                                      <CommaSeprator
                                        Price={data?.ProductQuantity}
                                      />{" "}
                                      QTY
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xl={2}
                                    lg={2}
                                    md={2}
                                    sm={2}
                                    xs={2}
                                    sx={{
                                      textAlign: "center",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...TableBodyTextStyling,
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "2px",
                                      }}
                                    >
                                      <Box
                                        component="img"
                                        src={stackofcoins}
                                        alt="coins"
                                        sx={{
                                          height: "15px",
                                          width: "15px",
                                        }}
                                      />
                                      <CommaSeprator
                                        Price={data?.DiscountedPrice}
                                      />
                                    </Typography>
                                  </Grid>
                                </Grid>
                              );
                            })}
                        </AccordionDetails>
                      </Accordion>
                    );
                  }
                })}
            </>
          )}
        </Grid>

        {Switchtab === "Purchased" && (
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              bottom: "20px",
              height: "50px",
              width: "100%",
              mt: "20px",
            }}
          >
            <Box
              sx={{
                width: "95%",
                mx: "auto",
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  alignContent: "center",
                  width: "300px",
                  left: 0,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "110px",
                    height: "40px",
                    background: "#445FD2",
                    borderRadius: "10px",
                    fontFamily: "Poppins",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  onClick={() => BuyerAcceptOrder("Accepted")}
                >
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    width: "110px",
                    height: "40px",
                    background: "transperent",
                    outline: "1px solid #445FD2",
                    borderRadius: "10px",
                    fontFamily: "Poppins",
                    color: "#445FD2",
                    fontSize: "12px",
                  }}
                  onClick={() => BuyerAcceptOrder("Rejected")}
                >
                  Reject
                </Button>
              </Box>

              {Allselected ? (
                <Box
                  sx={{ float: "right", cursor: "pointer" }}
                  onClick={RemoveAllData}
                >
                  <Typography
                    sx={{
                      ...tableheading,
                      fontSize: "14px",
                      color: "#445FD2",
                    }}
                  >
                    Unselect All
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{ float: "right", cursor: "pointer" }}
                  onClick={SelectAllData}
                >
                  <Typography
                    sx={{
                      ...tableheading,
                      fontSize: "14px",
                      color: "#445FD2",
                    }}
                  >
                    Select All
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
        <Stack spacing={2}>
          <StyledPagination
            count={initialPaginationCount}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            strokeWidth={currentPage}
          />
        </Stack>
      </Box>
    </Paper>
  );
}

export default PurchaseOrderList;

const SwitchButtonStyle = {
  borderRadius: "9px",
  boxShadow: "none",
  fontSize: "12px",
  fontWeight: "400",
  textTransform: "capitalize",
  height: "30px",
  width: "100px",
  fontFamily: "Poppins",
};

const tableheading = {
  fontFamily: "Poppins",
  color: "#7E8BA6",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: 500,
  textTransform: "Capitalize",
};

const TableBodyTextStyling = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "21px",
  color: "#1B212D",
};

const companyname = {
  fontFamily: "Kumbh Sans",
  color: "#7E8BA6",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "700",
};

const ButtonStyleForAcceptAndReject = {
  width: "90%",
  height: "30px",
  maxWidth: "120px",
  borderRadius: "6px",
  bgcolor: "#445FD2",
  textTransform: "none",
  color: "#fff",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  color: "#FFFFFF",
  textAlign: "center",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  cursor: "pointer",
};
