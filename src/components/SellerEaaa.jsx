import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetSellerAllInvoices } from "../Hooks/GetSellerAllInvoices";
import { useGetAllBuyerApprovedOrdersForSeller } from "../Hooks/OrderActions/useGetAllBuyerApprovedOrdersForSeller";
import { useGetSellerSidePendingOrder } from "../Hooks/OrderActions/useGetSellerSidePendingOrder";
import stackofcoin from "../assets/CartPage/unnamed 1.svg";
import AcceptedIcon from "../assets/Images/CommonImages/Accepted.png";
import DownIcon from "../assets/Images/CommonImages/Down.png";
import GoLeft from "../assets/Images/CommonImages/GoLeft.png";
import PendingIcon from "../assets/Images/CommonImages/Pending.png";
import RejectedIcon from "../assets/Images/CommonImages/Rejected.png";
import stackofcoins from "../assets/Stack of Coins.svg";
import CommaSeprator from "../components/CommaSeprator";
import CompanyName from "../components/CompanyName";
import BreadCrumbHeader from "../components/Header/BreadCrumbHeader";
import { useUpdateSellerEaaaAgreemnetStatus } from "../pages/PurchaseOrderList/Hooks";
import { listPurchaseOrders } from "../redux/action/PurchaseOrder_Action";

function SellerEaaa() {
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
  // const { id } = useParams();
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(7);
  const [Order, setOrder] = React.useState([]);
  // let [Switchtab, setSwitchtab] = useState("Purchased");
  const [currentPage, setCurrentPage] = useState(1);
  const [initialPaginationCount, setInitialPaginationCount] = useState(null);
  const [Allselected, setAllselected] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const {
    data: purchaseOrderDataSeller,
    isLoading: purchaseOrderLoadingSellerPending,
    // error: purchaseOrderErrorSellerPending,
    refetch: refetchbuyerpurchaseorder,
  } = useGetAllBuyerApprovedOrdersForSeller(currentPage);

  const {
    data: sellerAllInvoices,
    isLoading: loadingsellerallinvoices,
    error,
    refetch: refetchsellerallinvoices,
  } = GetSellerAllInvoices(currentPage);
  const {
    mutate: SellerEaaaDocumentStatusMutate,
    isLoading: EaaaDocumentStatusLoading,
    error: EaaaDocumentStatusError,
  } = useUpdateSellerEaaaAgreemnetStatus();
  const {
    data: purchaseOrderDataSellerAfterAcceptOrReject,
    isLoading: purchaseOrderLoadingSellerPendingAfterAcceptOrReject,
    // error: purchaseOrderErrorSellerPendingAfterAcceptOrReject,
    refetch: refetchBuyerAfterAcceptOrReject,
  } = useGetSellerSidePendingOrder(currentPage);

  // useEffect(() => {
  //   if (Switchtab === "Purchased") {
  //     refetchbuyerpurchaseorder({ page: currentPage });
  //   } else if (Switchtab === "Sold") {
  //     refetchBuyerAfterAcceptOrReject({ page: currentPage });
  //   }
  // }, [currentPage, Switchtab]);

  useEffect(() => {
    const { finalCount: allCount } = purchaseOrderDataSeller || {};
    const { finalCount: liveCount } =
      purchaseOrderDataSellerAfterAcceptOrReject || {};

    // if (allCount !== undefined && Switchtab === "Purchased") {
    //   setInitialPaginationCount(allCount);
    // } else if (liveCount !== undefined && Switchtab === "Sold") {
    //   setInitialPaginationCount(liveCount);
    // }
  }, [
    purchaseOrderDataSellerAfterAcceptOrReject,
    purchaseOrderDataSeller,
    // Switchtab,
  ]);

  const [EAAModalOpen, setEAAModalOpen] = React.useState(false);
  const disagreeescroDocument = async () => {
    SellerEaaaDocumentStatusMutate(
      {
        invoiceId: invoiceId,
        sellerEaaaAccepted: false,
      },
      {
        onSuccess: (data) => {
          setEAAModalOpen(false);
        },
        onError: (err) => {
          console.log("error", err);
        },
      }
    );
  };
  const agreeescroDocument = async () => {
    SellerEaaaDocumentStatusMutate(
      {
        invoiceId: invoiceId,
        sellerEaaaAccepted: true,
      },
      {
        onSuccess: (data) => {
          setEAAModalOpen(false);
        },
        onError: (err) => {
          console.log("error", err);
        },
      }
    );
  };

  const handleClose = () => {
    setEAAModalOpen(false);
  };
  const handleEaadialogOpen = (id) => {
    setInvoiceId(id);
    setEAAModalOpen(true);
    console.log("invoiceid", invoiceId);
  };

  useEffect(() => {
    dispatch(listPurchaseOrders());
  }, [dispatch]);

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
      (order) => order.InvoiceStatus
    );
    if (pendingOrdersLength === pendingOrders?.length) {
      setAllselected(true);
    }
  }

  function SelectAllData() {
    let dataId = [];
    let pendingOrdersLength = 0;
    for (let i = 0; i < purchaseOrderDataSeller?.OrderSumm?.length; i++) {
      if (!purchaseOrderDataSeller?.OrderSumm?.[i].InvoiceStatus)
        console.log("true", true);
      dataId.push(purchaseOrderDataSeller?.OrderSumm?.[i]._id);
      pendingOrdersLength++;
    }
    const pendingOrders = purchaseOrderDataSeller?.OrderSumm?.filter(
      (order) => order.InvoiceStatus
    );

    console.log("pendingOrderspendingOrders", dataId);
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
      (order) => order.InvoiceStatus
    );
    const pendingOrdersLength = pendingOrders ? pendingOrders.length : 0;

    console.log("OrderOrderOrder", Order, pendingOrdersLength);
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

  return (
    <>
      <Paper
        sx={{
          boxShadow: "none",
          background: "transparent",
          width: "95%",
          mx: "auto",
        }}
        elevation={0}
      >
        <BreadCrumbHeader MainText={"Seller Eaaa List"} />
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
                maxWidth: "170px",
              }}
            >
              <img src={GoLeft} width="22px" alt="golefticon" />
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#242120",
                  ml: "1rem",
                }}
              >
                Product Details
              </Typography>
            </Box>
            {/* <Box
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
                  refetchbuyerpurchaseorder();
                }}
              >
                Purchased
              </Button>
              <Button
                variant="contained"
                sx={{
                  ...SwitchButtonStyle,
                  background: Switchtab === "Sold" ? "#445FD2" : "transparent",
                  color: Switchtab === "Sold" ? "#FFFFFF" : "#445FD2",
                  "&:hover": {
                    background:
                      Switchtab === "Sold" ? "#445FD2" : "transparent",
                    color: Switchtab === "Sold" ? "#FFFFFF" : "#445FD2",
                  },
                }}
                onClick={() => {
                  setSwitchtab("Sold");
                }}
              >
                Sold
              </Button>
            </Box> */}
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
                xl={1}
                lg={1}
                md={1}
                sm={1}
                xs={1}
                sx={{
                  textAlign: "center",
                }}
              >
                <Typography align="center" sx={tableheading}>
                  No
                </Typography>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                <Typography align="center" sx={tableheading}>
                  Company Name
                </Typography>
              </Grid>
              <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <Typography align="center" sx={tableheading}>
                  Total Products
                </Typography>
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Typography align="center" sx={tableheading}>
                  Total Price
                </Typography>
              </Grid>
              <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} xs={1.5}>
                <Typography align="center" sx={tableheading}>
                  Order date
                </Typography>
              </Grid>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Typography align="center" sx={tableheading}>
                  Your Escrow Status
                </Typography>
              </Grid>
              <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} xs={1.5}>
                <Typography align="center" sx={tableheading}>
                  Action
                </Typography>
              </Grid>
              {/* {Switchtab === "Purchased" ? ( */}
              {/* <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <Typography
                  align="center"
                  sx={{ ...tableheading, cursor: "pointer" }}
                  onClick={RemoveAllData}
                >
                  Eaaa Status
                </Typography>
              </Grid> */}
              {/* ) : null} */}
            </Grid>
            <React.Fragment>
              {sellerAllInvoices?.length > 0 &&
                sellerAllInvoices?.map((data, idx) => {
                  console.log("status", data?.escrowData?.sellerEaaaAccepted);
                  console.log("datatatata", data);
                  let sellerEaaaAcceptedStatus =
                    data?.escrowData?.sellerEaaaAccepted;
                  let totalPrice = 0;
                  data?.ProductData?.map((data) => {
                    console.log("data", data);
                    let timesec = data?.BoughtSeconds;
                    totalPrice +=
                      data.DiscountedPrice *
                        data?.TimelineToBought *
                        data.ProductQuantity *
                        data?.BoughtSeconds ||
                      data.DiscountedPrice * data.ProductQuantity;
                    return totalPrice;
                  });

                  console.log("datadatadatadatadata", data?.InvoiceStatus);
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

                  if (purchaseOrderLoadingSellerPending) {
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
                          borderBottom:
                            data?.PartialOrderDetails?.length > 0
                              ? "1px solid red"
                              : "1px solid #F5F5F5",
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <img
                              src={DownIcon}
                              style={{ width: "9px" }}
                              alt="downicon"
                            />
                          }
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{ p: 0 }}
                        >
                          <Grid container>
                            <Grid
                              item
                              xl={1}
                              lg={1}
                              md={1}
                              sm={1}
                              xs={1}
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
                                />
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
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "2px",
                                }}
                              >
                                <img
                                  src={stackofcoin}
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
                            {/* <Grid
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
                                  fontSize: "14px",
                                  fontFamily: "Poppins",
                                }}
                              >
                                {data?.PartialOrderDetails?.length > 0
                                  ? "Yes"
                                  : "No"}
                              </Typography>
                            </Grid> */}
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
                                gap: "10px",
                              }}
                            >
                              <Typography
                                sx={{
                                  ...TableBodyTextStyling,
                                  fontSize: "14px",
                                  color:
                                    sellerEaaaAcceptedStatus === false
                                      ? "#FFB600"
                                      : sellerEaaaAcceptedStatus === true
                                      ? "#118A2C"
                                      : "#FF0000",
                                  // mx: "auto",
                                }}
                              >
                                {sellerEaaaAcceptedStatus
                                  ? "accepted"
                                  : "pending"}
                              </Typography>
                              {sellerEaaaAcceptedStatus === false ? (
                                <Box
                                  component="img"
                                  src={PendingIcon}
                                  sx={{ width: "13px", height: "13px" }}
                                />
                              ) : sellerEaaaAcceptedStatus === true ? (
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
                              {sellerEaaaAcceptedStatus === true ? (
                                "---"
                              ) : (
                                <Box
                                  onClick={() => {
                                    handleEaadialogOpen(data._id);
                                    // console.log("invoiceid", invoiceId, data);
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
                              )}
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
                              {data?.InvoiceStatus === false ? (
                                <Box
                                  onClick={() => {
                                    navigate(
                                      `/home/performainvoice/${data._id}`
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
                                    Accept
                                  </Typography>
                                </Box>
                              ) : // <Box
                              //   sx={{
                              //     width: "100%",
                              //     maxWidth: "150px",
                              //     display: "flex",
                              //     justifyContent: "center",
                              //     alignItems: "center",
                              //     alignContent: "center",
                              //     mx: "auto",
                              //   }}
                              // >
                              //   {Order.includes(data._id) ? (
                              //     <Box
                              //       onClick={() => {
                              //         removeData(data);
                              //       }}
                              //       sx={{
                              //         cursor: "pointer",
                              //       }}
                              //     >
                              //       <img
                              //         src={addItemCartIcon}
                              //         size={30}
                              //         style={{ opacity: 1 }}
                              //         alt="additemtocarticon"
                              //       />
                              //     </Box>
                              //   ) : (
                              //     <Box
                              //       onClick={() => {
                              //         storeData(data);
                              //       }}
                              //       sx={{
                              //         opacity: 0.5,
                              //         cursor: "pointer",
                              //       }}
                              //     >
                              //       <BiCheckbox size={30} />
                              //     </Box>
                              //   )}
                              // </Box>
                              null}
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
                                        Price={
                                          data.DiscountedPrice *
                                            data?.TimelineToBought *
                                            data.ProductQuantity *
                                            data?.BoughtSeconds ||
                                          data.DiscountedPrice *
                                            data.ProductQuantity
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
            </React.Fragment>
            {/* {Switchtab === "Purchased" ? (
            ) : (
              <React.Fragment>
                {purchaseOrderDataSellerAfterAcceptOrReject?.length > 0 &&
                  purchaseOrderDataSellerAfterAcceptOrReject?.map(
                    (data, idx) => {
                      let totalPrice = 0;
                      data?.ProductData?.map((data) => {
                        totalPrice +=
                          data.DiscountedPrice *
                          data?.TimelineToBought *
                          data.ProductQuantity *
                          data?.BoughtSeconds;
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
                      if (
                        purchaseOrderLoadingSellerPendingAfterAcceptOrReject
                      ) {
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
                                <img
                                  src={DownIcon}
                                  style={{ width: "9px" }}
                                  alt="downicon"
                                />
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
                                      src={stackofcoin}
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
                                        data?.SellerOrderStatus === "Pending"
                                          ? "#FFB600"
                                          : data?.SellerOrderStatus ===
                                            "Accepted"
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
                            <AccordionDetails sx={{ p: 0, width: "500px" }}>
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
                                        maxWidth: "100%",
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
                                      <Grid
                                        item
                                        xl={2}
                                        lg={2}
                                        md={2}
                                        sm={2}
                                        xs={2}
                                      >
                                        <img
                                          src={data?.ProductImage}
                                          style={{
                                            width: "30px",
                                            height: "auto",
                                          }}
                                          alt="productimage"
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
                                            src={stackofcoin}
                                            alt="rupieicon"
                                            style={{
                                              width: "15px",
                                              height: "auto",
                                            }}
                                          />
                                          <CommaSeprator
                                            Price={
                                              data.DiscountedPrice *
                                              data?.TimelineToBought *
                                              data.ProductQuantity *
                                              data?.BoughtSeconds
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
                    }
                  )}
              </React.Fragment>
            )} */}
          </Grid>

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
                width: "90%",
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
                  // onClick={() => BuyerAcceptOrder("Accepted")}
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
                  // onClick={() => BuyerAcceptOrder("Rejected")}
                >
                  Reject
                </Button>
              </Box>
              {/* {Allselected ? (
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
                    Deny All
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
                    Accept All
                  </Typography>
                </Box>
              )} */}
            </Box>
          </Grid>
          {/* {Switchtab === "Purchased" && (
          )} */}
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
      <Dialog
        open={EAAModalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do You agree to EAAA Agreement??"}
        </DialogTitle>
        <DialogContent>
          <iframe
            src="https://d1tq5769y0bfry.cloudfront.net/centraluat-documents/K6NNC6ZQh6Vaj6F.pdf"
            title="EAA Contarct"
            style={{ width: "800px", height: "500px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={disagreeescroDocument}>Disagree</Button>
          <Button onClick={agreeescroDocument} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SellerEaaa;

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

const TableBodyTextStyling = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "21px",
  color: "#1B212D",
};

const tableheading = {
  fontFamily: "Poppins",
  color: "#7E8BA6",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: 500,
  textTransform: "Capitalize",
};
