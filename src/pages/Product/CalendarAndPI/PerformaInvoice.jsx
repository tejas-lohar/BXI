import React, { useEffect, useState } from "react";
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
  Input,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import axios from "axios";
import { styled } from "@mui/material/styles";
// import bxitoken from "../../assets/Images/CommonImages/BXIToken.svg";
import bxitoken from "../../../assets/Images/CommonImages/BXIToken.svg";

import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import StacsOfCoinIcon from "../../../assets/CartPage/StacksOfCoinsIcon.svg";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateSellerPurchaseOrder } from "../../../Hooks/OrderActions/useUpdateSellerPurchaseOrder";
import { useGetOrderSummaryByIdForBuyer } from "../../../Hooks/OrderActions/useGetOrderSummaryByIdForBuyer";
import PageLoader from "../../../components/LoadingButton/PageLoader";

import { getCompanyById } from "../../../redux/action/CompanyActions";
import { useDispatch, useSelector } from "react-redux";

import BarterCoin from "../../../assets/BXITokenIcon.png";
import { CompanyById } from "../../../redux/action/Company/CompanyByIdAction";

import { getOrderSummary } from "../../../redux/action/OrderSummaryActions";

import { ToastContainer, toast } from "react-toastify";

// const [id,getId] = useState()
import { useGetInvoiceByOrderSummary } from "../../../Hooks/Invoices/useGetInvoiceByOrderSummary";

import NumberToWord from "../../../components/NumberToWord";

const PerformaInvoice = () => {
  let dispatch = useDispatch();
  const [mutateResponse, setMutateResponse] = useState();
  const [mutateRespopnseLoading, setMutateResponseLoading] = useState(false);

  const [isTransportation, setIsTransportation] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: InvoiceData,
    isLoading: DataLoading,
    error: DataError,
  } = useGetInvoiceByOrderSummary(id);

  console.log("InvoiceData", InvoiceData);

  const { data: orderSummaryData, isLoading: orderSummaryLoading } =
    useGetOrderSummaryByIdForBuyer(id);

  let orderData = [];

  for (let i = 0; i < orderSummaryData?.ProductData?.length; i++) {
    orderData.push(orderSummaryData.ProductData[i]);
  }

  let totalPrice = 0;
  orderData?.map((item) => {
    totalPrice += item.PricePerUnit * item.ProductQuantity;
  });

  async function UpdateInvoice() {
    await axios
      .put(
        `invoices/update_invoice/` + InvoiceData?._id,
        {
          BuyerInvoiceAcceptanceStatus: "Accepted",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Invoice Accepted", {
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
          navigate("/home/choosetransport/" + InvoiceData?._id);
        }, 2000);
      })
      .catch((err) => {
        alert("Error");
      });
  }

  async function UpdateInvoiceReject() {
    await axios
      .put(
        `invoices/update_invoice/` + InvoiceData?._id,
        {
          BuyerInvoiceAcceptanceStatus: "Rejected",
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.error("Invoice Rejected", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        alert("Error");
      });
  }

  const { OrderSummary: OrderSummarydata, loading: OrderSummaryDataLoading } =
    useSelector((state) => state.OrderSummaryD);

  console.log("OrderSummarydata--", InvoiceData);

  useEffect(() => {
    dispatch(getCompanyById(OrderSummarydata?.SellerCompanyId));
    dispatch(getOrderSummary(id));
  }, [dispatch, id]);

  let storeDataIds = [];
  let TotalQuantity = 0;
  let totalAmount = 0;
  let totalPricePerUnit = 0;
  let totatlTaxableAmount = 0;
  let totalGST = 0;
  let totalAmountWithGST = 0;
  let totalAmountWithTax = 0;
  let TotalAmountAfterTax = 0;
  let TotalDiscount = 0;
  OrderSummarydata?.ProductData?.map((item) => {
    storeDataIds.push(item);
    TotalQuantity += item.ProductQuantity;
    totalAmount += item.PricePerUnit * item.ProductQuantity;
    totalPricePerUnit += item.PricePerUnit;
    totatlTaxableAmount += item.PricePerUnit * item.ProductQuantity;
    totalGST += item.GST;
    totalAmountWithGST +=
      item?.PricePerUnit * item?.ProductQuantity * (item?.GST / 100);
    totalAmountWithTax += item?.PricePerUnit * item?.ProductQuantity;
    TotalDiscount += item?.DiscountedPrice;
  });

  let TotalAmountWithTransportationData = Number(totalAmountWithTax);

  TotalAmountAfterTax =
    Number(TotalAmountWithTransportationData) + Number(totalAmountWithGST);

  useEffect(() => {
    if (mutateResponse === "Accepted") {
      alert("Order Accepted");
      navigate("/home/sellerordersummary");
    } else if (mutateResponse === "Rejected") {
      alert("Order Rejected");
      navigate("/home/sellerordersummary");
    } else if (mutateResponse === "Already Accepted") {
      alert("Error");
      navigate("/home/sellerordersummary");
    }
  }, [mutateResponse]);

  useEffect(() => {
    // dispatch(
    //   getCompanyById(orderSummaryData?.OrderSummarydata?.BuyerCompanyId)
    // );
  }, [orderSummaryData?.OrderSummarydata?.BuyerCompanyId]);

  return (
    <Paper
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
        width: "100%",
      }}
      elevation={0}
    >
      <ToastContainer
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
      />
      <BreadCrumbHeader MainText="Performa Invoice" />
      <Paper
        sx={{
          width: "100%",
          bgcolor: "white",
          mx: "auto",
        }}
        elevation={1}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
            height: "auto",
            mx: "auto",
            borderRight: "1px solid #cdcdcd",
            borderLeft: "1px solid #cdcdcd",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "1px solid #F3F2F3",
              height: "130px",
              width: "30%",
            }}
          >
            Buyer Logo
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "1px solid #cdcdcd",
              borderLeft: "1px solid #cdcdcd",
              height: "130px",
              width: "40%",
            }}
          >
            <Typography sx={CommongTextStyle}>
              {OrderSummarydata?.BuyerDetails?.BuyerCompanyName}
            </Typography>
            <Typography
              sx={{
                ...CommongTextStyle,
                textAlign: "center",
                fontSize: "11px",
              }}
            >
              {OrderSummarydata?.BuyerDetails?.BuyerCompanyAddress}
            </Typography>
            <Typography>
              Tel:{OrderSummarydata?.BuyerDetails?.BuyerCompanyContact}
            </Typography>
            <Typography>
              GSTIN:{OrderSummarydata?.BuyerDetails?.GSTIN}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRight: "1px solid #cdcdcd",
              borderLeft: "1px solid #cdcdcd",
              height: "130px",
              width: "30%",
            }}
          >
            <Typography>Buyer’s website</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "95%",
            height: "42px",
            mx: "auto",
            background: "#445FD2",
            borderRadius: "10px",
            borderRight: "1px solid #cdcdcd",
            borderLeft: "1px solid #cdcdcd",
          }}
        >
          <Typography
            sx={{
              ...CommongTextStyle,
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "100%",
            }}
          >
            Performa Invoice
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
            mx: "auto",
            borderRight: "1px solid #cdcdcd",
            borderLeft: "1px solid #cdcdcd",
          }}
        >
          <TableContainer>
            <Table>
              <TableBody>
                {/* <TableRow>
                  <TableCell sx={{ p: 0.5 }}>
                    <Typography sx={CommongTextStyle}>
                      Invoice No : {OrderSummarydata?.PoNumber}
                    </Typography>
                  </TableCell>
                   */}
                <TableRow>
                  <TableCell sx={{ p: 0.5 }}>
                    <Typography sx={CommongTextStyle}>
                      Invoice Date :{" "}
                      {new Date(OrderSummarydata?.PoDate).toDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <Typography sx={CommongTextStyle}>
                      Place of Supply:{" "}
                      {
                        OrderSummarydata?.BuyerDetails
                          ?.BuyerCompanyDetailedAddress?.district[0]
                      }
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ p: 0.5 }}>
                    <Typography sx={CommongTextStyle}>
                      State : Asper Client GSTIN NO
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ p: 0.5 }}>
                    <Typography sx={CommongTextStyle}>
                      Purchase Order no: {OrderSummarydata?.PoNumber}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{
            width: "95%",
            mx: "auto",
            border: "1px solid #cdcdcd",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "21px",
              background: "#445FD2",
              borderRadius: "3px 0px 0px 3",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                height: "100%",
                borderRight: "1px solid #F3F2F3",
              }}
            >
              <Typography
                sx={{
                  ...CommongTextStyle,
                  fontSize: "10px",
                  color: "white",
                }}
              >
                Bill to Party
              </Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  ...CommongTextStyle,
                  color: "white",
                  fontSize: "10px",
                }}
              >
                Ship to Party
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              py: 0,
            }}
          >
            <Box
              sx={{
                width: "100%",
                mx: "auto",
                borderRight: "1px solid #CDCDCD",
                p: 2,
              }}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}> Seller name</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}>
                        {" "}
                        {OrderSummarydata?.SellerDetails?.SellerCompanyName}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}> Address </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}>
                        {OrderSummarydata?.SellerDetails?.SellerCompanyAddress}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}> GSTIN </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}>
                        {OrderSummarydata?.SellerDetails?.GSTIN}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}> State</Typography>{" "}
                    </TableCell>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}>
                        {
                          OrderSummarydata?.SellerDetails
                            ?.SellerCompanyDetailedAddress?.district[0]
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
            <Box sx={{ width: "100%", mx: "auto", p: 2 }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}> Buyer name</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}>
                        {" "}
                        {OrderSummarydata?.BuyerDetails?.BuyerCompanyName}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}> Address </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}>
                        {OrderSummarydata?.BuyerDetails?.BuyerCompanyAddress}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}> GSTIN </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}>
                        {OrderSummarydata?.BuyerDetails?.GSTIN}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}> State</Typography>{" "}
                    </TableCell>
                    <TableCell
                      sx={{
                        p: 0.5,
                        borderBottom: "none",
                      }}
                    >
                      <Typography sx={TextStyleTwo}>
                        {" "}
                        {
                          OrderSummarydata?.SellerDetails
                            ?.SellerCompanyDetailedAddress?.district[0]
                        }
                      </Typography>{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Box>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "95%",
            mx: "auto",
          }}
        >
          <Table sx={{ minWidth: "700px" }} aria-label="customized table">
            <TableHead>
              <TableRow sx={{ height: "42px", bgcolor: "#445FD2" }}>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableTextStyle}> S. No.</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={2}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableTextStyle}>
                    Product / Service Description
                  </Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableTextStyle}>HSN Code</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableTextStyle}>UOM</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableTextStyle}>QTY</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableTextStyle}>Rate</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableTextStyle}>Amount</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableTextStyle}>Discount</Typography>
                </TableCell>
                {/* <TableCell
                  sx={{
                    p: 0,
                    maxWidth: "200px",
                    mx: "auto",
                  }}
                  align="center"
                >
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={2}
                      sx={{
                        width: "150px",
                        borderRight: "1px solid #CDCDCD",
                        p: 0,
                        height: "35px",
                      }}
                    >
                      <Typography sx={TableTextStyle}>CGST</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={2}
                      sx={{
                        width: "150px",
                        p: 0,
                        height: "35px",
                      }}
                    >
                      <Typography sx={TableTextStyle}>SGST</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        borderRight: "1px solid #CDCDCD",
                        p: 0,
                        height: "35px",
                        width: "25%",
                      }}
                    >
                      {" "}
                      <Typography sx={TableTextStyle}>%</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "25%",
                        borderRight: "1px solid #CDCDCD",
                        p: 0,
                        height: "35px",
                      }}
                    >
                      {" "}
                      <Typography sx={TableTextStyle}>Rs.</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        width: "25%",
                        borderRight: "1px solid #CDCDCD",
                        p: 0,
                        height: "100%",
                      }}
                    >
                      {" "}
                      <Typography sx={TableTextStyle}>%</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ p: 0, height: "100%", width: "25%" }}
                    >
                      {" "}
                      <Typography sx={TableTextStyle}>Rs.</Typography>
                    </TableCell>
                  </TableRow>
                </TableCell> */}
                <TableCell
                  align="center"
                  sx={{
                    bgcolor: "#445FD2",
                    width: "170px",
                    borderLeft: "1px solid #CDCDCD",
                  }}
                >
                  <Typography sx={TableTextStyle}>Taxable Value</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {OrderSummarydata?.ProductData?.map((row) => {
                return (
                  <TableRow
                    sx={{
                      height: "42px",
                      backgroundColor: "#F7F7F7",
                    }}
                  >
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>1</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        {row?.ProductName}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>9983</Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        {row?.ProductQuantity}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        {row?.PricePerUnit}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        {row?.PricePerUnit * row?.ProductQuantity}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        {" "}
                        {row?.PricePerUnit * row?.ProductQuantity}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        {row?.DiscountedPrice}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        {row?.PricePerUnit * row?.ProductQuantity}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableBody>
              {/* <TableRow
                sx={{
                  height: "42px",
                  backgroundColor: "#F7F7F7",
                }}
              >
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableBottomtext}>1</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableBottomtext}>
                    Transportation data
                  </Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                ></TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                ></TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                ></TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                ></TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                ></TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                ></TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableBottomtext}>
                    {OrderSummarydata?.Transportationdata?.transportationfee}
                  </Typography>
                </TableCell>
              </TableRow> */}
              <TableRow
                sx={{
                  height: "42px",
                  backgroundColor: "#F7F7F7",
                }}
              >
                <TableCell
                  align="center"
                  colSpan={3}
                  rowSpan={3}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  {/* <Typography sx={TableBottomtext}>
                    Total Amount Before Tax
                  </Typography> */}
                </TableCell>

                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                ></TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                ></TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableBottomtext}>{totalAmount}</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableBottomtext}>
                    {totatlTaxableAmount}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    p: 0,
                    maxWidth: "200px",
                    mx: "auto",
                    borderRight: "1px solid #CDCDCD",
                  }}
                  align="center"
                >
                  <Typography sx={TableBottomtext}>{TotalDiscount}</Typography>
                </TableCell>
                <TableCell
                  align="center"
                  colSpan={1}
                  rowSpan={1}
                  sx={{ borderRight: "1px solid #CDCDCD" }}
                >
                  <Typography sx={TableBottomtext}>
                    {TotalAmountWithTransportationData}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
            mx: "auto",
            border: "1px solid #cdcdcd",
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "100%",
              borderRight: "1px solid #CDCDCD",
            }}
          >
            <Box
              sx={{
                background: "#445FD2",
                borderRadius: "3px 0px 0px 3",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography sx={TableTextStyle}>Total amount in words</Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                minHeight: "100px",
              }}
            >
              <Typography
                sx={{
                  ...TableTotaltextStyle,
                  fontWeight: 600,
                  fontSize: "13px",
                }}
              >
                <NumberToWord number={TotalAmountAfterTax} />
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "40%" }}>
            <Table>
              <TableRow>
                <TableCell
                  sx={{ pl: 1, py: 0.5, borderBottom: "none" }}
                  colSpan={1}
                >
                  <Typography sx={TableTotaltextStyle}>CGST</Typography>
                </TableCell>
                <TableCell
                  sx={{ px: 1, py: 0.5, borderBottom: "none" }}
                  align="center"
                >
                  <Typography sx={TableBottomtext}>{totalGST / 2} %</Typography>
                </TableCell>
                <TableCell
                  sx={{ px: 1, py: 0.5, borderBottom: "none" }}
                  align="right"
                >
                  <Typography sx={TableBottomtext}>
                    {(totatlTaxableAmount * totalGST) / 100 / 2}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ pl: 1, py: 0.5, borderBottom: "none" }}
                  colSpan={1}
                >
                  <Typography sx={TableTotaltextStyle}>SGST</Typography>
                </TableCell>
                <TableCell
                  sx={{ px: 1, py: 0.5, borderBottom: "none" }}
                  align="center"
                >
                  <Typography sx={TableBottomtext}>{totalGST / 2} %</Typography>
                </TableCell>
                <TableCell
                  sx={{ px: 1, py: 0.5, borderBottom: "none" }}
                  align="right"
                >
                  <Typography sx={TableBottomtext}>
                    {(totatlTaxableAmount * totalGST) / 100 / 2}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ pl: 1, py: 0.5, borderBottom: "none" }}
                  colSpan={1}
                >
                  <Typography sx={TableTotaltextStyle}>IGST</Typography>
                </TableCell>
                <TableCell
                  sx={{ px: 1, py: 0.5, borderBottom: "none" }}
                  align="center"
                >
                  <Typography sx={TableBottomtext}>{totalGST} %</Typography>
                </TableCell>
                <TableCell
                  sx={{ px: 1, py: 0.5, borderBottom: "none" }}
                  align="right"
                >
                  <Typography sx={TableBottomtext}>
                    {(totatlTaxableAmount * totalGST) / 100}
                  </Typography>
                </TableCell>
              </TableRow>
            </Table>
            <Box
              sx={{
                background: "#445FD2",
                borderRadius: "3px 0px 0px 3",
                display: "flex",
                justifyContent: "space-between",
                px: 1,
              }}
            >
              <Typography sx={TableTextStyle}>Total Tax :</Typography>
              <Typography sx={TableTextStyle}>
                {(totatlTaxableAmount * totalGST) / 100}
              </Typography>
            </Box>
            <Box
              sx={{
                background: "#445FD2",
                borderRadius: "3px 0px 0px 3",
                display: "flex",
                justifyContent: "space-between",
                px: 1,
              }}
            >
              <Typography sx={TableTextStyle}>Invoice Total</Typography>
              <Typography sx={TableTextStyle}>{TotalAmountAfterTax}</Typography>
            </Box>
          </Box>
        </Box>
        {/* <Box
          sx={{
            width: "95%",
            display: "flex",
            mx: "auto",
            justifyContent: "space-between",
            border: "1px solid #cdcdcd",
          }}
        >
          <Box
            sx={{
              width: "60%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: "40%",
                borderRight: "1px solid #CDCDCD",
              }}
            >
              <Box
                sx={{
                  background: "#445FD2",
                  borderRadius: "3px 0px 0px 3",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography sx={TableTextStyle}>Terms & Conditions</Typography>
              </Box>
              <Box>
                <ol>
                  {OrderSummarydata?.TermsAndConditions?.map((item, index) => {
                    return (
                      <li style={TAndCStyle} key={index}>
                        {item}
                      </li>
                    );
                  })}
                </ol>
              </Box>
            </Box>
            <Box
              sx={{
                width: "35%",
                borderRight: "1px solid #CDCDCD",
              }}
            >
              <Box
                sx={{
                  background: "#445FD2",
                  borderRadius: "3px 0px 0px 3",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography sx={TableTextStyle}>Bank Details</Typography>
              </Box>
              <Box>
                <ul>
                  <li style={{ listStyleType: "none" }}>
                    <Typography sx={BanktText}> Account Number</Typography>
                  </li>
                  <li style={{ listStyleType: "none" }}>
                    <Typography sx={BanktbottomText}>
                      {OrderSummarydata?.BankDetails?.AccountNumber}
                    </Typography>
                  </li>
                </ul>
                <ul>
                  <li style={{ listStyleType: "none" }}>
                    <Typography sx={BanktText}> Branch Address</Typography>
                  </li>
                  <li style={{ listStyleType: "none" }}>
                    <Typography sx={BanktbottomText}>
                      {OrderSummarydata?.BankDetails?.BranchName}
                    </Typography>
                  </li>
                </ul>
                <ul>
                  <li style={{ listStyleType: "none" }}>
                    <Typography sx={BanktText}>
                      {OrderSummarydata?.BankDetails?.BankName}
                    </Typography>
                  </li>
                  <li style={{ listStyleType: "none" }}>
                    <Typography sx={BanktbottomText}>
                      {OrderSummarydata?.BankDetails?.IFSC}
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Box>
            <Box
              sx={{
                width: "25%",
                borderRight: "1px solid #CDCDCD",
              }}
            >
              <Box
                sx={{
                  background: "#445FD2",
                  borderRadius: "3px 0px 0px 3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "bottom",
                }}
              >
                <Typography sx={TableTextStyle}>Company Seal</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "40%",
            }}
          >
            <Box
              sx={{
                borderRadius: "3px 0px 0px 3",
                display: "flex",
                justifyContent: "center",
                alignItems: "bottom",
                border: "1px solid #CDCDCD",
              }}
            >
              <Typography sx={TextLastStyle}>
                Certified that the particulars given above are true and correct
              </Typography>
            </Box>
            <Box
              sx={{
                borderRadius: "3px 0px 0px",
                display: "flex",
                justifyContent: "center",
                border: "0px 1px solid #CDCDCD 0px 0px",
              }}
            >
              <Typography sx={TextLastStyle}>For Buyer Name</Typography>
            </Box>
            <Box
              sx={{
                height: "100px",
                width: "100%",
              }}
            ></Box>
            <Box
              sx={{
                borderRadius: "3px 0px 0px 3",
                display: "flex",
                justifyContent: "center",
                borderTop: "1px solid #CDCDCD",
              }}
            >
              <Typography sx={TextLastStyle}>Authorised Signatory</Typography>
            </Box>
          </Box>
        </Box> */}

        <Box
          sx={{
            width: "100%",
            mt: 3,
            pb: 3,
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
            {console.log("OrderSummarydata", OrderSummarydata)}
            {InvoiceData?.BuyerInvoiceAcceptanceStatus === "Pending" &&
            !mutateRespopnseLoading ? (
              <Box sx={ButtonStyleForAcceptAndReject} onClick={UpdateInvoice}>
                Accept{" "}
              </Box>
            ) : InvoiceData?.BuyerInvoiceAcceptanceStatus === "Accepted" &&
              !mutateRespopnseLoading ? (
              <Box
                sx={ButtonStyleForAcceptAndReject}
                onClick={() => navigate(`/home/choosetransport/${id}`)}
              >
                Continue{" "}
              </Box>
            ) : InvoiceData?.BuyerInvoiceAcceptanceStatus === "Rejected" &&
              !mutateRespopnseLoading ? (
              <Box sx={ButtonStyleForAcceptAndReject}>Order Rejected</Box>
            ) : (
              <CircularProgress size={20} color="inherit" />
            )}

            {InvoiceData?.BuyerInvoiceAcceptanceStatus === "Rejected" ||
            (InvoiceData?.BuyerInvoiceAcceptanceStatus === "Accepted" &&
              !mutateRespopnseLoading) ? null : (
              <Box
                sx={{
                  ...ButtonStyleForAcceptAndReject,
                  bgcolor: "#fff",
                  border: "1px solid #445FD2",
                  color: "#445FD2",
                }}
                onClick={UpdateInvoiceReject}
              >
                Reject
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
};

export default PerformaInvoice;

const ButtonStyleForAcceptAndReject = {
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
};

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
  fontWeight: 500,
  fontSize: "16px",
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

const CommongTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "21px",
  color: "#6B7A99",
};

const TextStyleTwo = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "left",
  color: "#505050",
  opacity: 1,
};

const TableTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "10px",
  lineHeight: "20px",
  color: "#FFFFFF",
};

const TableBottomtext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",
  color: "#050505",
};

const TableTotaltextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",
  color: "#050505",
  opacity: 1,
};

const TextLastStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "20px",
  color: "#050505",
  opacity: 1,
};

const TAndCStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "17px",
  color: "rgba(5, 5, 5, 0.2)",
  opacity: 1,
};

const BanktText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "10px",
  lineHeight: "11px",
  color: "#505050",
};

const BanktbottomText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "9px",
  lineHeight: "11px",
  color: "#505050",
};
