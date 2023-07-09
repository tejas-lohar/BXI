import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";

import { useDispatch } from "react-redux";
import { listPurchaseOrders } from "../../redux/action/PurchaseOrder_Action";

import CompanyName from "../../components/CompanyName";

import { useNavigate } from "react-router-dom";

import { useGetOrderSummaryForBuyer } from "../../Hooks/OrderActions/useGetOrderSummaryForBuyer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Skeleton from "@mui/material/Skeleton";
import DownIcon from "../../assets/Images/CommonImages/Down.png";
import GoLeft from "../../assets/Images/CommonImages/GoLeft.png";
import stackofcoins from "../../assets/Stack of Coins.svg";
// import { useGetSellerSidePendingOrder } from "../../Hooks/OrderActions/useGetSellerSidePendingOrder";
import { ToastContainer, toast } from "react-toastify";
import CommaSeprator from "../../components/CommaSeprator";

import { useGetSellerSidePendingOrder } from "../../Hooks/OrderActions/useGetSellerSidePendingOrder";

function VoucherOrderList() {
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
  const [Order, setOrder] = useState([]);
  const [OrderLoading, setOrderLoading] = useState(false);
  const [OrderData, setOrderData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [initialPaginationCount, setInitialPaginationCount] = useState(1);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  console.log("currentPage", currentPage);
  async function GetMediaOrderData() {
    try {
      const response = await axios.get(
        `voucher/get_voucher_orders?page=${currentPage}`,
        { withCredentials: true }
      );
      const data = response.data;
      console.log("resss", data);
      setInitialPaginationCount(data.totalPages);
      setOrderData(data.vouchers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetMediaOrderData();
  }, [currentPage]);

  const {
    data: purchaseOrderDataBuyer,
    isLoading: purchaseOrderLoadingSeller,
    error: purchaseOrderErrorSeller,
    refetch: refetchBuyer,
  } = useGetOrderSummaryForBuyer();

  const {
    data: purchaseOrderDataSeller,
    isLoading: purchaseOrderLoadingSellerPending,
    error: purchaseOrderErrorSellerPending,
    refetch: refetchSellerPending,
  } = useGetSellerSidePendingOrder();

  let dataId = [];

  Order.map((el) => {
    dataId.push(el._id);
  });

  function storeData(params) {
    const orderData = Order.find((el) => el._id === params._id);
    if (orderData) {
    } else {
      setOrder([...Order, params._id]);
    }
  }

  async function CancelVoucherOrder(id) {
    try {
      const res = await axios.post(
        "voucher/cancel_voucher_order",
        { OrderId: id },
        { withCredentials: true }
      );
      console.log("ordercancell===>", res);
      GetMediaOrderData();
      if (res?.data === "Order Cancelled") {
        toast.success("Order Cancel Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
        });
      } else {
        toast.error("Order Cancel Failed", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // cancel order functionality with window confirm
  const CancelOrder = (id) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      CancelVoucherOrder(id);
    }
  };

  useEffect(() => {
    dispatch(listPurchaseOrders());
    GetMediaOrderData();
  }, [dispatch]);

  useEffect(() => {
    const dataId = Order.map((el) => el._id);
    setDataIds(dataId);
  }, [Order]);

  function storeData(params) {
    const orderData = Order.find((el) => el._id === params._id);
    if (!orderData) {
      setOrder([...Order, params._id]);
    }
  }

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
              maxWidth: "170px",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          >
            <img src={GoLeft} width="22px" />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#242120",
                ml: "0.5rem",
              }}
            >
              Voucher Cart
            </Typography>
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
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2.5}>
              <Typography sx={tableheading}>Company Name</Typography>
            </Grid>
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
              <Typography align="center" sx={tableheading}>
                Total Vouchers
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
                Order Status
              </Typography>
            </Grid>

            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              <Typography align="center" sx={tableheading}>
                Action
              </Typography>
            </Grid>
          </Grid>

          {OrderData?.length > 0 &&
            OrderData?.map((data, idx) => {
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
              console.log("======>>>>>", data);

              if (OrderLoading) {
                return (
                  <Skeleton variant="rectangular" width={"100%"} height={35} />
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
                      <Grid
                        container
                        sx={{
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
                        <Grid item xl={2.5} lg={2.5} md={2.5} sm={2.5} xs={2.5}>
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
                            {data?.ProductData?.length}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xl={2.5}
                          lg={2.5}
                          md={2.5}
                          sm={2.5}
                          xs={2.5}
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
                            textAlign: "left",
                            alignItems: "center",
                            justifyContent: "start",
                            display: "flex",
                            pl: 2,
                          }}
                        >
                          <Typography sx={TableBodyTextStyling}>
                            {convertDate(data?.createdAt)}
                          </Typography>
                        </Grid>
                        {data?.OrderStatus === "Pending" ? (
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
                            <Box
                              sx={{
                                cursor: "pointer",
                                width: "100px",
                                mx: "auto",
                                height: "30px",
                                background: "maroon",
                                borderRadius: "4.39877px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                              }}
                              onClick={() => CancelOrder(data._id)}
                            >
                              <Typography
                                sx={{
                                  ...TableBodyTextStyling,
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                              >
                                Cancel Order
                              </Typography>
                            </Box>
                          </Grid>
                        ) : (
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
                            <Box
                              sx={{
                                cursor: "pointer",
                                width: "100px",
                                mx: "auto",
                                height: "30px",
                                background: "red",
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
                                  fontSize: "12px",
                                }}
                              >
                                Cancelled
                              </Typography>
                            </Box>
                          </Grid>
                        )}
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
                          {data?.OrderStatus === "Pending" && (
                            <Box
                              sx={{
                                cursor: "pointer",
                                width: "150px",
                                mx: "auto",
                                height: "30px",
                                background: "#445FD2",
                                borderRadius: "4.39877px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                              }}
                              onClick={() =>
                                navigate(`/home/voucherpayment/${data._id}`)
                              }
                            >
                              <Typography
                                sx={{
                                  ...TableBodyTextStyling,
                                  color: "#fff",
                                  fontSize: "12px",
                                }}
                              >
                                Continue to Pay
                              </Typography>
                            </Box>
                          )}
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
        </Grid>
        {/* 
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            position: "absolute",
            bottom: "20px",
            height: "50px",
            width: "100%",
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
          </Box>
        </Grid> */}
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

export default VoucherOrderList;

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
  maxWidth: "110px",
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
