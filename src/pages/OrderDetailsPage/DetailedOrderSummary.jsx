import React, { useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Button,
  TableRow,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useUpdatePurchaseOrder } from "../../Hooks/OrderActions/useUpdatePurchaseOrder";
import { useParams, Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";

import { getCompanyById } from "../../redux/action/CompanyActions";

import { useDispatch, useSelector } from "react-redux";

import { getOrderSummary } from "../../redux/action/OrderSummaryActions";
import { useGetCompanyById } from "../../Hooks/Auth";
import { socket } from "../Message/Message";
import BarterCoin from "../../assets/BXITokenIcon.png";

import { notifications } from "../../redux/action/Notification/notification";

const DetailedOrderSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let PaddingStyle = 1.5;

  const { company: CompanyDataByredux } = useSelector(
    (state) => state.companyById
  );
  const { OrderSummary: OrderSummarydata, loading: OrderSummaryDataLoading } =
    useSelector((state) => state.OrderSummaryD);

  useEffect(() => {
    // dispatch(getCompanyById(OrderSummarydata?.SellerCompanyId));
    dispatch(getOrderSummary(id));
  }, [dispatch, id]);

  let storeDataIds = [];
  OrderSummarydata?.ProductIds?.map((item) => {
    storeDataIds.push(item);
  });

  const {
    data: updatePurchaseOrderData,
    isLoading: updatePurchaseOrderLoading,
    error: updatePurchaseOrderError,
    mutate: updatePurchaseOrderMutate,
  } = useUpdatePurchaseOrder();

  async function mutatePurchaseOrder() {
    await updatePurchaseOrderMutate({
      status: "Accepted",
      OrderSummaryId: id,
    });
  }

  let notificationMessage = "Order Accepted";
  let notificationType = "info";
  let socketId = socket.id;

  useEffect(() => {
    if (updatePurchaseOrderData?.status === "Accepted") {
      // socket.emit("notificationR", { notificationMessage, updatePurchaseOrderData, notificationType, socketId })
      // dispatch(notification(updatePurchaseOrderData.SellerCompanyId, updatePurchaseOrderData.BuyerCompanyId, notificationMessage, notificationType))

      toast.success("Order Accepted", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/home/sellerordersummary");
      }, 2000);
    } else if (updatePurchaseOrderData?.status === "Rejected") {
      toast.error("Order Rejected", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/home/sellerordersummary");
      }, 2000);
    }
  }, [dispatch, updatePurchaseOrderData]);

  async function mutatePurchaseOrderRejected() {
    await updatePurchaseOrderMutate({
      status: "Rejected",
      OrderSummaryId: id,
    });
  }

  return (
    <Paper
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
        width: "100%",
        height: "100%",
      }}
      elevation={0}
    >
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BreadCrumbHeader MainText="Purchase Order" />
      <Paper
        sx={{
          bgcolor: "#fff",
          width: "92.7%",
          mx: "auto",
          borderRadius: "20px",
          p: 4,
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            mb: 2,
            maxWidth: "400px",
          }}
        >
          <Link to={"/home/purchaseorderlist"}>
            <HiOutlineArrowNarrowLeft size={30} color="lightgray" />
          </Link>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: "36px",
              color: "#000000",
            }}
          >
            Company Name
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(2, 1fr)",
            height: "100%",
            maxHeight: "170px",
          }}
        >
          <Box
            sx={{
              height: "48px",
              background: "#445FD2",
              border: "1px solid #F5F5F5",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              pl: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "21px",

                color: "#FFFFFF",
              }}
            >
              Buyer Information
            </Typography>
          </Box>
          <Box sx={{ width: "90%", ml: 0, mr: "auto", maxWidth: "800px" }}>
            <Grid container>
              <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                <Typography sx={BuyerInfoText}>Name:</Typography>
              </Grid>
              <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                <Typography sx={BuyerInfoTextTwo}>
                  {OrderSummarydata?.SellerCompanyName
                    ? OrderSummarydata?.SellerCompanyName
                    : "Company Name"}
                </Typography>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{ mt: 1 }}>
                <Typography sx={BuyerInfoText}>E-Mail:</Typography>
              </Grid>
              <Grid item xl={9} lg={9} md={9} sm={9} xs={9} sx={{ mt: 1 }}>
                <Typography sx={BuyerInfoTextTwo}>
                  {CompanyDataByredux?.email
                    ? CompanyDataByredux?.email
                    : "Flipkart@flipkart.com"}
                </Typography>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{ mt: 1 }}>
                <Typography sx={BuyerInfoText}>Shipping Address:</Typography>
              </Grid>
              <Grid item xl={9} lg={9} md={9} sm={9} xs={9} sx={{ mt: 1 }}>
                <Typography sx={BuyerInfoTextTwo}>
                  2715 Ash Dr. San Jose, South Dakota 83475
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(2, 1fr)",
            height: "100%",
            maxHeight: "170px",
            mt: 4,
          }}
        >
          <Box
            sx={{
              height: "48px",
              background: "#445FD2",
              border: "1px solid #F5F5F5",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              pl: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "21px",

                color: "#FFFFFF",
              }}
            >
              Product Information
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", ml: 0, mr: "auto" }}>
          <TableContainer sx={{ height: "100%" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      ...InfoBoxAmountText,
                      borderBottom: "none",
                      width: "10px",
                      textAlign: "center",
                    }}
                  >
                    No
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                    align="right"
                  >
                    Price Per Unit
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                    align="right"
                  >
                    GST Per Product
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                    align="right"
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                    align="right"
                  >
                    GST
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                    align="right"
                  >
                    Total Tokens
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {OrderSummarydata?.ProductData?.map((el, idx) => {
                  return (
                    <TableRow
                      key={idx}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        py: 2,
                        height: "10px",
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {idx + 1}
                        </Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography
                          sx={{
                            ...SelectedItemsTetxStyle,
                            // make text ... if it is too long
                            maxWidth: "200px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {el?.ProductName}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {el?.PricePerUnit}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {el?.GST}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {el?.ProductQuantity}
                        </Typography>
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {el?.ProductQuantity * el.GST}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          width: "auto",
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {el?.PricePerUnit * el?.ProductQuantity}
                        </Typography>
                        <img
                          src={BarterCoin}
                          width={"25px"}
                          height={"auto"}
                          style={{
                            marginTop: "0px",
                            marginRight: "5px",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{
            width: "100%",
            mt: 4,
          }}
        >
          <Box
            sx={{
              maxWidth: "500px",
              mx: "auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              height: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "40px",
                maxWidth: "200px",
                borderRadius: "6px",
                bgcolor: "#445FD2",
                textTransform: "none",
                color: "#fff",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "16px",
                color: "#FFFFFF",
                textAlign: "center",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                cursor: "pointer",
              }}
              onClick={mutatePurchaseOrder}
            >
              {OrderSummaryDataLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Confirm"
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "40px",
                maxWidth: "200px",
                borderRadius: "6px",
                bgcolor: "#fff",
                color: "#445FD2",
                textTransform: "none",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "16px",
                textAlign: "center",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                cursor: "pointer",
                border: "1px solid #445FD2",
              }}
              onClick={mutatePurchaseOrderRejected}
            >
              {OrderSummaryDataLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Reject"
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
};

export default DetailedOrderSummary;

const BuyerInfoText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "right",
  color: "#000000",
};

const BuyerInfoTextTwo = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left",
  color: "#6B7A99",
  ml: 2,
};

const InfoBoxAmountText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: " #282828",
};

const SelectedItemsTetxStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "27px",

  color: "#6B7A99",
};

const FeeBoxText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#6B7A99",
};
