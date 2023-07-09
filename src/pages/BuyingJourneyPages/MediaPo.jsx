// import { Paper, Box } from "@material-ui/core";
// import { CircularProgress } from "@material-ui/core";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import React, { useEffect, useRef, useState } from "react";
// import { MdKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { useUpdatePurchaseOrder } from "../../Hooks/OrderActions/useUpdatePurchaseOrder";
import CheckboxIcon from "../../assets/Images/CommonImages/CheckboxIcon.svg";
import CheckedBoxIcon from "../../assets/Images/CommonImages/CheckedBoxIcon.svg";
import CheckedCheckboxIcon from "../../assets/Images/CommonImages/CheckedCheckboxIcon.svg";
import CloseIcon from "../../assets/Images/CommonImages/CloseIcon.svg";
import DocDownloadImg from "../../assets/Images/CommonImages/DocDownload.png";
import LeftArrowIcon from "../../assets/Images/CommonImages/GoLeft.png";
import PrintPurchaseOrder from "../../assets/Images/CommonImages/Print.png";
// import CommaSeprator from "../../components/CommaSeprator";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
// import NumberToWord from "../../components/NumberToWord";
import { getCompanyById } from "../../redux/action/CompanyActions";
import { notifications } from "../../redux/action/Notification/notification";
import { getOrderSummary } from "../../redux/action/OrderSummaryActions";
import StateData from "../../utils/StateCityArray.json";

// import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import NumberToWord from "../../components/NumberToWord";
import { MdKeyboardBackspace } from "react-icons/md";
import CommaSeprator from "../../components/CommaSeprator";
import { useReactToPrint } from "react-to-print";
import { socket } from "../Message/Message";

const PurchaseOrderDetails = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateArray, setStateArray] = useState();
  const [Address, setAddress] = useState("");
  const [Area, setArea] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("");
  const [BuyerShippingAddress, setBuyerShippingAddress] = useState();
  const [CityArray, setCityArray] = useState();
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [openTextarea, setOpenTextarea] = useState("");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  console.log("checked", checked);

  useEffect(() => {
    setBuyerShippingAddress({
      PinCode: pincode,
      City: city,
      State: state,
      Address: Address,
    });
  }, [pincode, city, state, Address, Area]);

  console.log("BuyerShippingAddress", BuyerShippingAddress);

  const { OrderSummary: OrderSummarydata, loading: OrderSummaryDataLoading } =
    useSelector((state) => state.OrderSummaryD);

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
  let totaltaxvalue = 0;
  let totalCGSTAmount = 0;
  let totalIGSTPercentage = 0;
  let totalSGSTAmount = 0;
  let totalSGSTPercentage = 0;
  let totalCSTPerCentage = 0;
  let TotalGSTAmount = 0;

  let totaladditionalcostinrupee = 0;
  let totaladditionalcostinbxi = 0;
  OrderSummarydata?.ProductData?.map((item) => {
    let TotalSec = item?.BoughtSeconds * 10;
    storeDataIds.push(item);
    TotalQuantity += item.ProductQuantity;
    totalAmount += OrderSummarydata?.IsMedia
      ? item.DiscountedPrice *
        item?.TimelineToBought *
        item.ProductQuantity *
        item?.BoughtSeconds
      : item.DiscountedPrice * item.ProductQuantity;
    totalPricePerUnit += item.DiscountedPrice;
    totatlTaxableAmount += OrderSummarydata?.IsMedia
      ? item.DiscountedPrice *
        item?.TimelineToBought *
        item.ProductQuantity *
        item?.BoughtSeconds
      : item.DiscountedPrice * item.ProductQuantity;
    totalGST += item.GST;
    totalAmountWithGST += (
      item?.DiscountedPrice *
      item?.ProductQuantity *
      (item?.GST / 100)
    )?.toFixed(2);
    totalAmountWithTax += OrderSummarydata?.IsMedia
      ? item?.DiscountedPrice *
          item?.ProductQuantity *
          item?.TimelineToBought *
          item?.BoughtSeconds *
          (item?.GST / 100) +
        item?.DiscountedPrice *
          item?.ProductQuantity *
          item?.TimelineToBought *
          item?.BoughtSeconds
      : item?.DiscountedPrice * item?.ProductQuantity * (item?.GST / 100) +
        item?.DiscountedPrice * item?.ProductQuantity;
    totaladditionalcostinrupee += item?.TotalAdditionalCostInRupee;
    totaladditionalcostinbxi += item?.TotalAdditionalCostInBXI;
    totalCGSTAmount +=
      (item?.DiscountedPrice * item?.ProductQuantity * item?.GST) / 2 / 100;
    totalSGSTAmount +=
      (item?.DiscountedPrice * item?.ProductQuantity * item?.GST) / 2 / 100;
    totalSGSTPercentage += item.GST / 2;
    totalCSTPerCentage += item.GST / 2;
    totalIGSTPercentage += item.GST;
    TotalGSTAmount += OrderSummarydata?.IsMedia
      ? (item?.DiscountedPrice *
          item?.TimelineToBought *
          item?.ProductQuantity *
          item?.BoughtSeconds *
          item?.GST) /
        100
      : (item?.DiscountedPrice * item?.ProductQuantity * item?.GST) / 100;
  });

  totaltaxvalue = (totatlTaxableAmount * totalGST) / 100;

  const {
    data: updatePurchaseOrderData,
    isLoading: updatePurchaseOrderLoading,
    error: updatePurchaseOrderError,
    mutate: updatePurchaseOrderMutate,
  } = useUpdatePurchaseOrder();

  async function mutatePurchaseOrder() {
    if (checked) {
      if (
        !BuyerShippingAddress?.PinCode ||
        !BuyerShippingAddress?.City ||
        !BuyerShippingAddress?.State ||
        !BuyerShippingAddress?.Address
      ) {
        toast.error("Please fill all the fields", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        await updatePurchaseOrderMutate({
          status: "Accepted",
          OrderSummaryId: id,
          BuyerShippingAddress: BuyerShippingAddress
            ? BuyerShippingAddress
            : "",
        });
      }
    } else {
      await updatePurchaseOrderMutate({
        status: "Accepted",
        OrderSummaryId: id,
        BuyerShippingAddress: "",
      });
    }
  }

  let notificationMessage = "Order Accepted";
  let notificationType = "info";
  let socketId = socket.id;

  useEffect(() => {
    if (updatePurchaseOrderData?.status === "Accepted") {
      toast.success("Order Accepted", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/home/sellerordersummary");
      }, 2000);
    } else if (updatePurchaseOrderData?.status === "Rejected") {
      toast.error("Order Declined", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/home/purchaseorderlist");
      }, 2000);
    }
  }, [dispatch, updatePurchaseOrderData]);

  async function mutatePurchaseOrderRejected() {
    await updatePurchaseOrderMutate({
      status: "Rejected",
      OrderSummaryId: id,
      BuyerShippingAddress: "",
    });
  }

  const printRef = useRef();

  const handlePrintClick = () => {
    window.print(printRef.current.innerHTML);
  };

  const downloadRef = useRef(null);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (updatePurchaseOrderData) {
      let receiver = OrderSummarydata?.SellerDetails?.SellerCompanyId;
      let sender = OrderSummarydata?.BuyerDetails?.BuyerCompanyId;
      let message = `Congratulations, PO for your product has been generated by ${OrderSummarydata?.BuyerDetails?.BuyerCompanyName} Company`;
      let type = "Order";

      dispatch(notifications(receiver, sender, message, type));
    }
  }, [updatePurchaseOrderData]);

  useEffect(() => {
    if (stateArray) {
      let stateData = StateData?.filter((item) => item?.name === stateArray);
      setCityArray(stateData[0]?.data);
    }
  }, [stateArray]);

  return (
    <Box
      sx={{
        bgcolor: "transparent",
        width: "100%",
        height: "100%",
      }}
      elevation={0}
    >
      <BreadCrumbHeader MainText={props?.PageName} />
      <Box
        sx={{
          width: "100%",
          bgcolor: "white",
          mx: "auto",
          borderRadius: "17px",
          pb: "40px",
        }}
        elevation={1}
      >
        <Paper
          sx={{
            width: "95%",
            mx: "auto",
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center",
          }}
          elevation={0}
        >
          <Box
            component="img"
            src={LeftArrowIcon}
            sx={{ width: "25px", cursor: "pointer" }}
            onClick={() => navigate("/home/purchaseorderlist")}
          />
          <Box
            sx={{
              display: "flex",
              width: "60px",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="img"
              src={PrintPurchaseOrder}
              sx={{ width: "22px", height: "auto", cursor: "pointer" }}
              onClick={handlePrint}
            />
            <Box
              component="img"
              src={DocDownloadImg}
              sx={{ width: "21px", height: "auto", cursor: "pointer" }}
              // onClick={handleDownloadClick}
              onClick={handlePrint}
            />
          </Box>
        </Paper>
        <Box ref={componentRef}>
          <Box
            sx={{
              width: "95%",
              mx: "auto",
              borderLeft: "1px solid #cdcdcd",
              borderRight: "1px solid #cdcdcd",
              borderBottom: "1px solid #cdcdcd",
              borderTop: "1px solid #cdcdcd",
              px: "0px",
            }}
            // ref={printRef}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "auto",
                mx: "auto",
              }}
              ref={downloadRef}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "130px",
                  width: "30%",
                }}
              >
                <img
                  src={OrderSummarydata?.SellerDetails?.SellerCompanyLogo}
                  style={{ width: "100px", height: "100px" }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
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
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "130px",
                  width: "30%",
                  borderLeft: "1px solid #cdcdcd",
                }}
              >
                <img
                  src={OrderSummarydata?.BuyerDetails?.BuyerCompanyLogo}
                  style={{ width: "100px", height: "100px" }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "42px",
                mx: "auto",
                background: "#2261A2",
                borderRadius: "10px",
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
                {props?.PageName}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                mx: "auto",
                height: "40px",
                borderRight: "1px solid #cdcdcd",
                borderLeft: "1px solid #cdcdcd",
              }}
            >
              <Box
                sx={{
                  width: "50%",
                  borderRight: "1px solid #F3F2F3",
                  pl: 1,
                }}
              >
                <Typography sx={CommongTextStyle}>
                  PO Number: {OrderSummarydata?.PoNumber}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  pl: 1,
                }}
              >
                <Typography sx={CommongTextStyle}>
                  PO Date:{" "}
                  {new Date(OrderSummarydata?.PoDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                mx: "auto",
                border: "1px solid #cdcdcd",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "21px",
                  background: "#2261A2",
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
                    Seller Details
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
                    Buyer Details
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
                  <Table sx={{ p: 0 }}>
                    <TableBody sx={{ p: 0 }}>
                      <TableRow sx={{ p: 0 }}>
                        <TableCell
                          sx={{
                            p: 0.5,
                            borderBottom: "none",
                            width: "90px",
                          }}
                        >
                          <Typography sx={TextStyleTitle}>
                            {" "}
                            Seller name
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            p: 0.5,
                            borderBottom: "none",
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
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
                          <Typography sx={TextStyleTitle}> Address </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            p: 0.5,
                            borderBottom: "none",
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            {
                              OrderSummarydata?.SellerDetails?.Address
                                ?.AddressLine
                            }
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
                          <Typography sx={TextStyleTitle}> GSTIN </Typography>
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
                          <Typography sx={TextStyleTitle}> State: </Typography>{" "}
                        </TableCell>
                        <TableCell
                          sx={{
                            p: 0.5,
                            position: "relative",
                            borderBottom: "none",
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            {OrderSummarydata?.SellerDetails?.Address?.State}
                          </Typography>
                          <Typography
                            sx={{
                              ...TextStyleTwo,
                              textAlign: "right",
                              position: "absolute",
                              right: "0px",
                              top: "0px",
                            }}
                          >
                            Code: {OrderSummarydata?.SellerDetails?.StateCode}
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
                            width: "90px",
                          }}
                        >
                          <Typography sx={TextStyleTitle}>
                            {" "}
                            Buyer name
                          </Typography>
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
                          <Typography sx={TextStyleTitle}> Address </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            p: 0.5,
                            borderBottom: "none",
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            {
                              OrderSummarydata?.BuyerDetails?.Address
                                ?.AddressLine
                            }
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
                          <Typography sx={TextStyleTitle}> GSTIN </Typography>
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
                          <Typography sx={TextStyleTitle}> State</Typography>{" "}
                        </TableCell>
                        <TableCell
                          sx={{
                            p: 0.5,
                            borderBottom: "none",
                            position: "relative",
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            {" "}
                            {OrderSummarydata?.BuyerDetails?.Address?.State}
                          </Typography>{" "}
                          <Typography
                            sx={{
                              ...TextStyleTwo,
                              textAlign: "right",
                              position: "absolute",
                              right: "0px",
                              top: "0px",
                            }}
                          >
                            Code: {OrderSummarydata?.BuyerDetails?.StateCode}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Box>
            {props?.SellerPage === true &&
            OrderSummarydata?.BuyerRequestedAddress?.Address !== "" ? (
              <Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "21px",
                    background: "#2261A2",
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
                      width: "100%",
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
                      Buyer Ship To / Delivery Location Details Below
                    </Typography>
                  </Box>
                </Box>

                <Table
                  sx={{
                    p: 0,
                    border: "1px solid #cdcdcd",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "none",
                    borderRadius: "0px 0px 10px 10px",
                    width: "100%",
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          borderBottom: "none",
                        }}
                      >
                        <Typography sx={AddressTextStyleTitle}>
                          {" "}
                          State:{" "}
                          {OrderSummarydata?.BuyerRequestedAddress?.State}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "none",
                        }}
                      >
                        <Typography sx={AddressTextStyleTitle}>
                          {" "}
                          City: {OrderSummarydata?.BuyerRequestedAddress?.City}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          p: 0.5,
                          borderBottom: "none",
                        }}
                      >
                        <Typography sx={AddressTextStyleTitle}>
                          {" "}
                          Pincode:{" "}
                          {OrderSummarydata?.BuyerRequestedAddress?.PinCode}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "auto",
                          maxWidth: "300px",
                          borderBottom: "none",
                        }}
                      >
                        <Typography sx={AddressTextStyleTitle}>
                          {" "}
                          Address:{" "}
                          {OrderSummarydata?.BuyerRequestedAddress?.Address}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            ) : null}
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: "100%",
                mx: "auto",
              }}
            >
              <Table sx={{ minWidth: "700px" }} aria-label="customized table">
                <TableHead>
                  <TableRow sx={{ height: "42px", bgcolor: "#2261A2" }}>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableTextStyle}> Sr. No.</Typography>
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
                      <Typography sx={TableTextStyle}>Taxable Value</Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        p: 0,
                        maxWidth: "200px",
                        mx: "auto",
                      }}
                      align="center"
                    >
                      {OrderSummarydata && OrderSummarydata?.IsIGST ? (
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
                            <Typography sx={TableTextStyle}>IGST</Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
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
                      )}

                      {OrderSummarydata && OrderSummarydata?.IsIGST ? (
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
                        </TableRow>
                      ) : (
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
                      )}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#2261A2",
                        width: "170px",
                        borderLeft: "1px solid #CDCDCD",
                      }}
                    >
                      <Typography sx={TableTextStyle}>Total</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {OrderSummarydata?.ProductData?.map((row, idx) => {
                    console.log("rowrowrowrow", row);
                    let TotalSec = row?.TotalSec;

                    return (
                      <React.Fragment key={idx}>
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
                            <Typography sx={TableBottomtext}>
                              {idx + 1}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="left"
                            colSpan={1}
                            rowSpan={1}
                            sx={{ borderRight: "1px solid #CDCDCD" }}
                          >
                            <Typography
                              sx={{
                                ...TableBottomtext,
                                fontSize: "14px",
                                width: "300px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {row?.ProductName}
                            </Typography>

                            {row?.TotalSec && (
                              <Typography>
                                {`(${TotalSec} sec)`}{" "}
                                {`(${row?.TimelineToBought} ${row?.Timeline})`}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            colSpan={1}
                            rowSpan={1}
                            sx={{ borderRight: "1px solid #CDCDCD" }}
                          >
                            <Typography sx={TableBottomtext}>
                              {row?.HSN}
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            colSpan={1}
                            rowSpan={1}
                            sx={{ borderRight: "1px solid #CDCDCD" }}
                          >
                            <Typography sx={TableBottomtext}>
                              <CommaSeprator Price={row?.ProductQuantity} />
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            colSpan={1}
                            rowSpan={1}
                            sx={{ borderRight: "1px solid #CDCDCD" }}
                          >
                            <Typography sx={TableBottomtext}>
                              <CommaSeprator Price={row?.DiscountedPrice} />
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            colSpan={1}
                            rowSpan={1}
                            sx={{ borderRight: "1px solid #CDCDCD" }}
                          >
                            <Typography sx={TableBottomtext}>
                              <CommaSeprator
                                Price={
                                  row?.TotalPriceInBXI ||
                                  row?.DiscountedPrice *
                                    row?.ProductQuantity *
                                    row?.BoughtSeconds *
                                    row?.TimelineToBought
                                }
                              />
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
                              <CommaSeprator
                                Price={
                                  row?.TotalPriceInBXI ||
                                  row?.DiscountedPrice *
                                    row?.ProductQuantity *
                                    row?.BoughtSeconds *
                                    row?.TimelineToBought
                                }
                              />
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              p: 0,
                              maxWidth: "200px",
                              mx: "auto",
                            }}
                            align="center"
                          >
                            {OrderSummarydata && OrderSummarydata?.IsIGST ? (
                              <TableRow>
                                <TableCell
                                  align="center"
                                  colSpan={2}
                                  sx={{
                                    width: "150px",
                                    borderRight: "1px solid #CDCDCD",
                                  }}
                                >
                                  <Typography sx={TableBottomtext}>
                                    {row?.GST}
                                  </Typography>
                                </TableCell>

                                <TableCell
                                  align="center"
                                  colSpan={2}
                                  sx={{
                                    width: "150px",
                                    borderRight: "1px solid #CDCDCD",
                                  }}
                                >
                                  <Typography sx={TableBottomtext}>
                                    <CommaSeprator
                                      Price={
                                        row?.TotalGSTInBXI?.toFixed(1) ||
                                        (row?.DiscountedPrice *
                                          row?.ProductQuantity *
                                          row?.BoughtSeconds *
                                          row?.TimelineToBought *
                                          row?.GST) /
                                          100
                                      }
                                    />
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            ) : (
                              <TableRow>
                                <TableCell
                                  align="center"
                                  colSpan={2}
                                  sx={{
                                    width: "150px",
                                    borderRight: "1px solid #CDCDCD",
                                  }}
                                >
                                  <Typography sx={TableBottomtext}>
                                    {row?.GST / 2}
                                  </Typography>
                                </TableCell>

                                <TableCell
                                  align="center"
                                  colSpan={2}
                                  sx={{
                                    width: "150px",
                                    borderRight: "1px solid #CDCDCD",
                                  }}
                                >
                                  <Typography sx={TableBottomtext}>
                                    <CommaSeprator
                                      Price={
                                        row?.TotalGSTInBXI / 2 ||
                                        (row?.DiscountedPrice *
                                          row?.ProductQuantity *
                                          row?.BoughtSeconds *
                                          row?.TimelineToBought *
                                          row?.GST) /
                                          100 /
                                          2
                                      }
                                    />
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  align="center"
                                  colSpan={2}
                                  sx={{
                                    width: "150px",
                                    borderRight: "1px solid #CDCDCD",
                                  }}
                                >
                                  <Typography sx={TableBottomtext}>
                                    {row?.GST / 2}
                                  </Typography>
                                </TableCell>

                                <TableCell
                                  align="center"
                                  colSpan={2}
                                  sx={{
                                    width: "150px",
                                    borderRight: "1px solid #CDCDCD",
                                  }}
                                >
                                  <Typography sx={TableBottomtext}>
                                    <CommaSeprator
                                      Price={(
                                        row?.TotalGSTInBXI / 2 ||
                                        (row?.DiscountedPrice *
                                          row?.ProductQuantity *
                                          row?.BoughtSeconds *
                                          row?.TimelineToBought *
                                          row?.GST) /
                                          100 /
                                          2
                                      )?.toFixed(1)}
                                    />
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            )}
                          </TableCell>
                          <TableCell
                            align="center"
                            colSpan={1}
                            rowSpan={1}
                            sx={{ borderRight: "1px solid #CDCDCD" }}
                          >
                            <Typography sx={TableBottomtext}>
                              <CommaSeprator
                                Price={
                                  row?.TotalPriceWithGSTInBXI ||
                                  row?.DiscountedPrice *
                                    row?.ProductQuantity *
                                    row?.BoughtSeconds *
                                    row?.TimelineToBought +
                                    (row?.DiscountedPrice *
                                      row?.ProductQuantity *
                                      row?.BoughtSeconds *
                                      row?.TimelineToBought *
                                      row?.GST) /
                                      100
                                }
                              />
                            </Typography>
                          </TableCell>
                        </TableRow>
                        {row?.AdditionCostArray?.map((res, index) => {
                          let GstOfAdCost = Number(res?.AdCostGST);
                          console.log("GstOfAdCost", res);
                          return (
                            <TableRow
                              sx={{
                                height: "25px",
                                padding: 0,
                                margin: 0,
                              }}
                              key={index}
                            >
                              <TableCell
                                align="center"
                                colSpan={1}
                                rowSpan={1}
                                sx={{
                                  borderRight: "1px solid #CDCDCD",
                                  padding: 0,
                                  margin: 0,
                                }}
                              ></TableCell>
                              <TableCell
                                align="left"
                                colSpan={1}
                                rowSpan={1}
                                sx={{
                                  borderRight: "1px solid #CDCDCD",
                                  padding: 0,
                                  margin: 0,
                                  px: 1,
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "12px",
                                    width: "300px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {res?.ReasonOfCost} {"  "}( Additional Cost )
                                </Typography>

                                {row?.TotalSec && (
                                  <Typography>
                                    {`(${TotalSec} sec)`}{" "}
                                    {`(${row?.TimelineToBought} ${row?.Timeline})`}
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell
                                align="center"
                                colSpan={1}
                                rowSpan={1}
                                sx={{
                                  borderRight: "1px solid #CDCDCD",
                                  padding: 0,
                                  margin: 0,
                                }}
                              >
                                <Typography>{res?.AdCostHSN}</Typography>
                              </TableCell>
                              <TableCell
                                align="center"
                                colSpan={1}
                                rowSpan={1}
                                sx={{
                                  borderRight: "1px solid #CDCDCD",
                                  padding: 0,
                                  margin: 0,
                                }}
                              >
                                <Typography>-</Typography>
                              </TableCell>
                              <TableCell
                                align="center"
                                colSpan={1}
                                rowSpan={1}
                                sx={{
                                  borderRight: "1px solid #CDCDCD",
                                  padding: 0,
                                  margin: 0,
                                }}
                              >
                                <Typography>
                                  <CommaSeprator Price={res?.CostPrice} />
                                </Typography>
                              </TableCell>
                              <TableCell
                                align="center"
                                colSpan={1}
                                rowSpan={1}
                                sx={{
                                  borderRight: "1px solid #CDCDCD",
                                  padding: 0,
                                  margin: 0,
                                }}
                              >
                                <Typography>
                                  <CommaSeprator Price={res?.AdCostPrice} />
                                </Typography>
                              </TableCell>
                              <TableCell
                                align="center"
                                colSpan={1}
                                rowSpan={1}
                                sx={{
                                  borderRight: "1px solid #CDCDCD",
                                  padding: 0,
                                  margin: 0,
                                }}
                              >
                                <Typography>
                                  <CommaSeprator Price={res?.AdCostPrice} />
                                </Typography>
                              </TableCell>
                              <TableCell
                                sx={{
                                  maxWidth: "200px",
                                  mx: "auto",
                                  padding: 0,
                                  margin: 0,
                                }}
                                align="center"
                              >
                                {OrderSummarydata &&
                                OrderSummarydata?.IsIGST ? (
                                  <TableRow>
                                    <TableCell
                                      align="center"
                                      colSpan={2}
                                      sx={{
                                        padding: 0,
                                        width: "150px",
                                        borderRight: "1px solid #CDCDCD",
                                        margin: 0,
                                      }}
                                    >
                                      <Typography>{GstOfAdCost}</Typography>
                                    </TableCell>

                                    <TableCell
                                      align="center"
                                      colSpan={2}
                                      sx={{
                                        padding: 0,
                                        width: "150px",
                                        borderRight: "1px solid #CDCDCD",
                                        margin: 0,
                                      }}
                                    >
                                      <Typography>
                                        {res?.AdCostApplicableOn === "PerUnit"
                                          ? Math.round(
                                              res?.PriceWithoutGST *
                                                row?.ProductQuantity *
                                                (GstOfAdCost / 100)
                                            )
                                          : Math.round(
                                              res?.PriceWithoutGST *
                                                (GstOfAdCost / 100)
                                            )}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  <TableRow>
                                    <TableCell
                                      align="center"
                                      colSpan={2}
                                      sx={{
                                        padding: 0,
                                        width: "150px",
                                        borderRight: "1px solid #CDCDCD",
                                        margin: 0,
                                      }}
                                    >
                                      <Typography>{GstOfAdCost / 2}</Typography>
                                    </TableCell>

                                    <TableCell
                                      align="center"
                                      colSpan={2}
                                      sx={{
                                        padding: 0,
                                        width: "150px",
                                        borderRight: "1px solid #CDCDCD",
                                        margin: 0,
                                      }}
                                    >
                                      <Typography>
                                        {res?.AdCostGSTPrice / 2}
                                      </Typography>
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      colSpan={2}
                                      sx={{
                                        padding: 0,
                                        width: "150px",
                                        borderRight: "1px solid #CDCDCD",
                                        margin: 0,
                                      }}
                                    >
                                      <Typography>{GstOfAdCost / 2}</Typography>
                                    </TableCell>

                                    <TableCell
                                      align="center"
                                      colSpan={2}
                                      sx={{
                                        padding: 0,
                                        width: "150px",
                                        borderRight: "1px solid #CDCDCD",
                                        margin: 0,
                                      }}
                                    >
                                      <Typography>
                                        {res?.AdCostGSTPrice / 2}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableCell>
                              <TableCell
                                align="center"
                                colSpan={1}
                                rowSpan={1}
                                sx={{
                                  borderRight: "1px solid #CDCDCD",
                                  padding: 0,
                                  margin: 0,
                                  height: "10px",
                                }}
                              >
                                <Typography>
                                  <CommaSeprator Price={res?.TotalCost} />
                                </Typography>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
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
                      <Typography sx={TableBottomtext}>Total</Typography>
                    </TableCell>

                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        <CommaSeprator Price={TotalQuantity} />
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        <CommaSeprator Price={totalPricePerUnit} />
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        <CommaSeprator Price={totalAmount} />
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        <CommaSeprator Price={totatlTaxableAmount} />
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        p: 0,
                        maxWidth: "200px",
                        mx: "auto",
                      }}
                      align="center"
                    >
                      {OrderSummarydata && OrderSummarydata?.IsIGST ? (
                        <TableRow>
                          <TableCell
                            align="center"
                            colSpan={2}
                            sx={{
                              width: "100px",
                              borderRight: "1px solid #CDCDCD",
                            }}
                          >
                            <Typography sx={TableBottomtext}>
                              <CommaSeprator Price={totalIGSTPercentage} />
                            </Typography>
                          </TableCell>

                          <TableCell
                            align="center"
                            colSpan={2}
                            sx={{
                              width: "100px",
                              borderRight: "1px solid #CDCDCD",
                            }}
                          >
                            <Typography sx={TableBottomtext}>
                              <CommaSeprator Price={totaltaxvalue} />
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ) : (
                        <TableRow>
                          <TableCell
                            align="center"
                            colSpan={2}
                            sx={{
                              width: "100px",
                              borderRight: "1px solid #CDCDCD",
                            }}
                          >
                            <Typography sx={TableBottomtext}>
                              <CommaSeprator Price={totalCSTPerCentage} />
                            </Typography>
                          </TableCell>

                          <TableCell
                            align="center"
                            colSpan={2}
                            sx={{
                              width: "100px",
                              borderRight: "1px solid #CDCDCD",
                            }}
                          >
                            <Typography sx={TableBottomtext}>
                              <CommaSeprator Price={totaltaxvalue / 2} />
                            </Typography>
                          </TableCell>
                          <TableCell
                            align="center"
                            colSpan={2}
                            sx={{
                              width: "100px",
                              borderRight: "1px solid #CDCDCD",
                            }}
                          >
                            <Typography sx={TableBottomtext}>
                              <CommaSeprator Price={totalSGSTPercentage} />
                            </Typography>
                          </TableCell>

                          <TableCell
                            align="center"
                            colSpan={2}
                            sx={{
                              width: "100px",
                              borderRight: "1px solid #CDCDCD",
                            }}
                          >
                            <Typography sx={TableBottomtext}>
                              <CommaSeprator Price={totaltaxvalue / 2} />
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={1}
                      rowSpan={1}
                      sx={{ borderRight: "1px solid #CDCDCD" }}
                    >
                      <Typography sx={TableBottomtext}>
                        <CommaSeprator Price={totalAmountWithTax} />
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* <Box
                sx={{
                  width: "60%",
                  height: "100%",
                  borderRight: "1px solid #CDCDCD",
                }}
              >
                <Box
                  sx={{
                    background: "#2261A2",
                    borderRadius: "3px 0px 0px 3",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={TableTextStyle}>
                    Total Additional Cost
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Box sx={{ display: "grid", minWidth: "300px" }}>
                    <Box
                      sx={{
                        background: "#2261A2",
                        borderRadius: "3px 0px 0px 3",
                        width: "100%",
                      }}
                    >
                      <Typography sx={TableTextStyle}>
                        Total Additional Cost in INR
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        height: "35px",
                        p: 1,
                      }}
                    >
                      <Typography sx={TableBottomtext}>
                        {totaladditionalcostinrupee}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "grid", minWidth: "300px" }}>
                    <Box
                      sx={{
                        background: "#2261A2",
                        borderRadius: "3px 0px 0px 3",
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <Typography sx={TableTextStyle}>
                        Total Additional Cost in BXI Token
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: "35px",
                        p: 1,
                      }}
                    >
                      <Typography sx={TableBottomtext}>
                        {totaladditionalcostinbxi}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box> */}
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
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
                    background: "#2261A2",
                    borderRadius: "3px 0px 0px 3",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={TableTextStyle}>
                    Total amount in words
                  </Typography>
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
                    <NumberToWord
                      number={Number(
                        Number(totalAmountWithTax) +
                          Number(totaladditionalcostinbxi) +
                          Number(totaladditionalcostinrupee)
                      )}
                    />
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "40%",
                }}
              >
                <Table
                  sx={{
                    height: "120px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <TableRow sx={{ width: "100%", display: "flex" }}>
                    <TableCell
                      sx={{
                        pl: 1,
                        py: 0.5,
                        borderBottom: "none",
                        width: "50%",
                      }}
                      colSpan={1}
                    >
                      <Typography sx={TableTotaltextStyle}>
                        Total Amount to be paid in BXI Coins
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderBottom: "none",
                        width: "50%",
                      }}
                      align="right"
                    >
                      <Typography sx={TableBottomtext}>
                        <CommaSeprator Price={totatlTaxableAmount} />
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ width: "100%", display: "flex" }}>
                    <TableCell
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderBottom: "none",
                        width: "50%",
                      }}
                    >
                      <Typography sx={TableTotaltextStyle}>
                        Total GST to be paid in INR
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderBottom: "none",
                        width: "50%",
                      }}
                      align="right"
                    >
                      <Typography sx={TableBottomtext}>
                        <CommaSeprator Price={Number(TotalGSTAmount)} />
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ width: "100%", display: "flex" }}>
                    <TableCell
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderBottom: "none",
                        width: "50%",
                      }}
                    >
                      <Typography sx={TableTotaltextStyle}>
                        Additional cost to be paid in INR
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderBottom: "none",
                        width: "50%",
                      }}
                      align="right"
                    >
                      <Typography sx={TableBottomtext}>
                        <CommaSeprator
                          Price={Number(totaladditionalcostinrupee)}
                        />
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{ width: "100%", display: "flex" }}>
                    <TableCell
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderBottom: "none",
                        width: "50%",
                      }}
                    >
                      <Typography sx={TableTotaltextStyle}>
                        Additional cost to be paid in BXI Coins
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderBottom: "none",
                        width: "50%",
                      }}
                      align="right"
                    >
                      <Typography sx={TableBottomtext}>
                        <CommaSeprator
                          Price={Number(totaladditionalcostinbxi)}
                        />
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Table>
                <Box
                  sx={{
                    background: "#2261A2",
                    borderRadius: "3px 0px 0px 3",
                    display: "flex",
                    justifyContent: "space-between",
                    px: 1,
                  }}
                >
                  <Typography sx={TableTextStyle}>
                    Total amount after Tax :
                  </Typography>
                  <Typography sx={TableTextStyle}>
                    <CommaSeprator
                      Price={
                        Number(totalAmountWithTax) +
                        Number(totaladditionalcostinbxi) +
                        Number(totaladditionalcostinrupee)
                      }
                    />
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          {/*  checkbox to validate if user want new delivery location */}
          {(props?.SellerPage === true && !OrderSummarydata?.IsMedia) ||
          OrderSummarydata?.ProductData?.at(0)?.ProductTypeName ===
            "Media" ? null : (
            <Box sx={{ width: "95%", mx: "auto" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    name="checked"
                    color="primary"
                  />
                }
                label="Click here to add new delivery location"
              />
            </Box>
          )}
          {props?.SellerPage === true || OrderSummarydata?.IsMedia
            ? null
            : checked && (
                <React.Fragment>
                  <Box
                    sx={{
                      width: "95%",
                      mx: "auto",
                      height: "20px",
                      bgcolor: "#2261A2",
                      alignContent: "center",
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "center",
                      mt: 2,
                      mb: 2,
                    }}
                  >
                    <Typography sx={TableTextStyle}>
                      Fill the Address Details : Ship To / Delivery Location
                      Details
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: "transparent",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "95%",
                      mx: "auto",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <label style={AddressInputTextStyle}>State</label>
                      <Select
                        sx={{
                          width: "100%",
                          maxWidth: "300px",
                          height: "35px",
                          borderRadius: "5px",
                          border: "1px solid #cdcdcd",
                          outline: "none",
                          "&:focus": {
                            border: "1px solid #2261A2",
                          },
                        }}
                        onChange={(e) => {
                          setStateArray(e.target.value);
                          setState(e.target.value);
                        }}
                        name="state"
                        value={stateArray}
                        id="state"
                        required
                        style={AddressInputStyle}
                      >
                        {StateData?.map((res, index) => (
                          <MenuItem key={index} value={res?.name}>
                            {res?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <label style={AddressInputTextStyle}>City</label>
                      <Select
                        sx={{
                          width: "100%",
                          maxWidth: "300px",
                          height: "35px",
                          borderRadius: "5px",
                          border: "1px solid #cdcdcd",
                          outline: "none",
                          "&:focus": {
                            border: "1px solid #2261A2",
                          },
                        }}
                        onChange={(e) => setCity(e.target.value)}
                        name="state"
                        value={CityArray}
                        id="state"
                        required
                        style={AddressInputStyle}
                      >
                        {CityArray?.map((res, index) => (
                          <MenuItem key={index} value={res}>
                            {res}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <label style={AddressInputTextStyle}>Pin Code</label>
                      <input
                        type="text"
                        placeholder=" "
                        className="inp"
                        onChange={(e) => setPincode(e.target.value)}
                        required
                        style={{ ...AddressInputStyle, width: "250px" }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        width: "400px",
                      }}
                    >
                      <label style={AddressInputTextStyle}>Address</label>
                      <input
                        type="text"
                        placeholder=" "
                        onChange={(e) => setAddress(e.target.value)}
                        className="inp"
                        required
                        style={{ ...AddressInputStyle, width: "400px" }}
                      />
                    </Box>
                  </Box>
                </React.Fragment>
              )}
        </Box>
      </Box>

      {props?.SellerPage === true ? null : (
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
            {OrderSummarydata?.BuyerOrderStatus === "Pending" &&
            !OrderSummaryDataLoading ? (
              <Box
                sx={ButtonStyleForAcceptAndReject}
                onClick={mutatePurchaseOrder}
              >
                Accept{" "}
              </Box>
            ) : OrderSummarydata?.BuyerOrderStatus === "Accepted" &&
              !OrderSummaryDataLoading ? (
              <Box
                sx={ButtonStyleForAcceptAndReject}
                onClick={() => navigate("/home/sellerordersummary")}
              >
                Continue{" "}
              </Box>
            ) : OrderSummarydata?.BuyerOrderStatus === "Rejected" &&
              !OrderSummaryDataLoading ? (
              <Box sx={ButtonStyleForAcceptAndReject}>Order Rejected</Box>
            ) : (
              <CircularProgress size={20} color="inherit" />
            )}

            {OrderSummarydata?.BuyerOrderStatus === "Rejected" ? (
              <Box
                sx={{
                  ...ButtonStyleForAcceptAndReject,
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  bgcolor: "#fff",
                  color: "#2261A2",
                  border: "1px solid #2261A2",
                }}
                onClick={() => navigate("/home/cart")}
              >
                <MdKeyboardBackspace size={25} />
                Back to Cart
              </Box>
            ) : OrderSummarydata?.BuyerOrderStatus === "Accepted" ? null : (
              // <Box
              //   sx={ButtonStyleForAcceptAndReject}
              //   onClick={mutatePurchaseOrderRejected}
              // >
              //   Reject
              // </Box>
              <React.Fragment>
                <Box
                  sx={{
                    ...ButtonStyleForAcceptAndReject,
                    bgcolor: "#fff",
                    border: "1px solid #445FD2",
                    color: "#445FD2",
                  }}
                  // onClick={UpdateInvoiceReject}
                  onClick={() => setOpen(true)}
                >
                  Reject
                </Box>

                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "translate(0%, 0%)",
                  }}
                >
                  <Box
                    sx={{
                      background: "#fff",
                      width: "350px",
                      height: openTextarea === "" ? "400px" : "480px",
                      p: 3,
                      borderRadius: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "poppins",
                            fontStyle: "normal",
                            fontWeight: 600,
                            fontSize: "16px",
                            color: "#6B7A99",
                          }}
                        >
                          Please select the reason of Rejection
                        </Typography>
                        <Box
                          component="img"
                          src={CloseIcon}
                          onClick={() => setOpen(false)}
                          sx={{
                            cursor: "pointer",
                          }}
                        ></Box>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: "poppins",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "14px",
                          color: "#475467",
                        }}
                      >
                        Lorem ipsum dolor sit amet consectetur.
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "15px",
                        width: "100%",
                      }}
                    >
                      <Box sx={ButtonGroupstyle}>
                        <Box
                          sx={{
                            ...RejectReasonBtnStyle,
                            color:
                              openTextarea == "price" ? "#445FD2" : "#6B7A99",
                            border:
                              openTextarea == "price"
                                ? "1px solid #445FD2"
                                : "1px solid #E4E7EC",
                          }}
                          onClick={() => setOpenTextarea("price")}
                        >
                          <Box
                            sx={{
                              ...TextAndCheckBoxGroupStyle,
                              border: "none",
                            }}
                          >
                            {openTextarea == "price" ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent:
                                    openTextarea === "price"
                                      ? "space-between"
                                      : "flex-start",
                                  gap: "10px",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={CheckedBoxIcon}
                                    sx={{
                                      width: "25px",
                                      height: "25px",
                                    }}
                                  />
                                  <Typography sx={ReasonTextStyle}>
                                    {" "}
                                    Price{" "}
                                  </Typography>
                                </Box>
                                <Box
                                  component="img"
                                  src={CheckedCheckboxIcon}
                                />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent:
                                    openTextarea === "price"
                                      ? "space-between"
                                      : "flex-start",
                                  gap: "20px",
                                }}
                              >
                                <Box component="img" src={CheckboxIcon} />
                                <Typography sx={ReasonTextStyle}>
                                  {" "}
                                  Price{" "}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                        <React.Fragment>
                          {openTextarea === "price" ? (
                            <TextField
                              sx={TextAreaStyle}
                              InputProps={InputPropsStyle}
                              placeholder="please explain your reason"
                              multiline
                              rows={4}
                            ></TextField>
                          ) : null}
                        </React.Fragment>
                      </Box>
                      <Box sx={ButtonGroupstyle}>
                        <Box
                          sx={{
                            ...RejectReasonBtnStyle,
                            color:
                              openTextarea == "deliverydate"
                                ? "#445FD2"
                                : "#6B7A99",
                            border:
                              openTextarea == "deliverydate"
                                ? "1px solid #445FD2"
                                : "1px solid #E4E7EC",
                          }}
                          onClick={() => setOpenTextarea("deliverydate")}
                        >
                          <Box sx={TextAndCheckBoxGroupStyle}>
                            {openTextarea == "deliverydate" ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent:
                                    openTextarea === "deliverydate"
                                      ? "space-between"
                                      : "flex-start",
                                  gap: "10px",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={CheckedBoxIcon}
                                    sx={{
                                      width: "25px",
                                      height: "25px",
                                    }}
                                  />
                                  <Typography sx={ReasonTextStyle}>
                                    {" "}
                                    Delivery Date{" "}
                                  </Typography>
                                </Box>
                                <Box
                                  component="img"
                                  src={CheckedCheckboxIcon}
                                />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent:
                                    openTextarea === "deliverydate"
                                      ? "space-between"
                                      : "flex-start",
                                  gap: "20px",
                                }}
                              >
                                <Box component="img" src={CheckboxIcon} />
                                <Typography sx={ReasonTextStyle}>
                                  {" "}
                                  Delivery Date{" "}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                        <React.Fragment>
                          {openTextarea === "deliverydate" ? (
                            <TextField
                              sx={TextAreaStyle}
                              InputProps={InputPropsStyle}
                              placeholder="please explain your reason"
                              multiline
                              rows={4}
                            ></TextField>
                          ) : null}
                        </React.Fragment>
                      </Box>
                      <Box sx={ButtonGroupstyle}>
                        <Box
                          sx={{
                            ...RejectReasonBtnStyle,
                            color:
                              openTextarea == "quantity"
                                ? "#445FD2"
                                : "#6B7A99",
                            border:
                              openTextarea == "quantity"
                                ? "1px solid #445FD2"
                                : "1px solid #E4E7EC",
                          }}
                          onClick={() => setOpenTextarea("quantity")}
                        >
                          <Box sx={TextAndCheckBoxGroupStyle}>
                            {openTextarea == "quantity" ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent:
                                    openTextarea === "quantity"
                                      ? "space-between"
                                      : "flex-start",
                                  gap: "10px",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={CheckedBoxIcon}
                                    sx={{
                                      width: "25px",
                                      height: "25px",
                                    }}
                                  />
                                  <Typography sx={ReasonTextStyle}>
                                    {" "}
                                    Quantity{" "}
                                  </Typography>
                                </Box>
                                <Box
                                  component="img"
                                  src={CheckedCheckboxIcon}
                                />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent:
                                    openTextarea === "quantity"
                                      ? "space-between"
                                      : "flex-start",
                                  gap: "20px",
                                }}
                              >
                                <Box component="img" src={CheckboxIcon} />
                                <Typography sx={ReasonTextStyle}>
                                  {" "}
                                  Quantity{" "}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                        <React.Fragment>
                          {openTextarea === "quantity" ? (
                            <TextField
                              sx={TextAreaStyle}
                              InputProps={InputPropsStyle}
                              placeholder="please explain your reason"
                              multiline
                              rows={4}
                            ></TextField>
                          ) : null}
                        </React.Fragment>
                      </Box>
                      <Box sx={ButtonGroupstyle}>
                        <Box
                          sx={{
                            ...RejectReasonBtnStyle,
                            color:
                              openTextarea == "other" ? "#445FD2" : "#6B7A99",
                            border:
                              openTextarea == "other"
                                ? "1px solid #445FD2"
                                : "1px solid #E4E7EC",
                          }}
                          onClick={() => setOpenTextarea("other")}
                        >
                          <Box sx={TextAndCheckBoxGroupStyle}>
                            {openTextarea == "other" ? (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent:
                                    openTextarea === "other"
                                      ? "space-between"
                                      : "flex-start",
                                  gap: "10px",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <Box
                                    component="img"
                                    src={CheckedBoxIcon}
                                    sx={{
                                      width: "25px",
                                      height: "25px",
                                    }}
                                  />
                                  <Typography sx={ReasonTextStyle}>
                                    {" "}
                                    Other{" "}
                                  </Typography>
                                </Box>
                                <Box
                                  component="img"
                                  src={CheckedCheckboxIcon}
                                />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent:
                                    openTextarea === "other"
                                      ? "space-between"
                                      : "flex-start",
                                  gap: "20px",
                                }}
                              >
                                <Box component="img" src={CheckboxIcon} />
                                <Typography sx={ReasonTextStyle}>
                                  {" "}
                                  Other{" "}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                        <React.Fragment>
                          {openTextarea === "other" ? (
                            <TextField
                              sx={TextAreaStyle}
                              InputProps={InputPropsStyle}
                              placeholder="please explain your reason"
                              multiline
                              rows={4}
                              // InputProps={{ border: "none" }}
                            ></TextField>
                          ) : null}
                        </React.Fragment>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <Button
                        onClick={() => setOpen(false)}
                        sx={{
                          width: "50%",
                          color: "#000",
                          textTransform: "none",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "12px",
                          border: "1px solid #D0D5DD",
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        sx={{
                          width: "50%",
                          color: "#fff",
                          background: "#445FD2",
                          textTransform: "none",
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "12px",
                          "&:hover": {
                            background: "#445FD2",
                          },
                        }}
                      >
                        Confirm
                      </Button>
                    </Box>
                  </Box>
                </Modal>
              </React.Fragment>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PurchaseOrderDetails;

const AddressInputStyle = {
  width: "186px",
  height: "35px",
  background: "#F9F9F9",
  borderRadius: "6px",
  border: "none",
  paddingLeft: "10px",
};

const AddressInputTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "16px",
  marginBottom: "10px",
  color: "#6B7A99",
};

const ButtonStyleForAcceptAndReject = {
  width: "100%",
  height: "40px",
  maxWidth: "200px",
  borderRadius: "6px",
  bgcolor: "#2261A2",
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

const CommongTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
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

  width: "300px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const TextStyleTitle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "left",
  color: "#505050",
  opacity: 1,
  width: "120px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const AddressTextStyleTitle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "left",
  color: "#505050",
  opacity: 1,

  width: "300px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const TableTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",
  color: "#FFFFFF",
};

const TableBottomtext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",

  color: "#505050",
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

const RejectReasonBtnStyle = {
  width: "100%",
  mx: "auto",
  textTransform: "none",
  height: "40px",
  borderRadius: "6px",
  border: "1px solid #E4E7EC",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ButtonGroupstyle = {
  width: "100%",
  border: "none",
};

const TextAndCheckBoxGroupStyle = {
  width: "100%",
  px: "10px",
  cursor: "pointer",
};

const TextAreaStyle = {
  width: "100%",
  mx: "auto",
  background: "#ECEFF1",
  color: "#C7C7CC",
  border: "1px solid lighgray",
  height: "100px",
  "& fieldset": { border: "none" },
  borderRadius: "10px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  my: 1,
};

const InputPropsStyle = {
  // disableUnderline: true,
  sx: {
    background: "#ECEFF1",
    fontFamily: "Poppins",
    color: "#445FD2",
    borderRadius: "10px",
    fontSize: "14px",
    width: "100%",
  },
};

const ReasonTextStyle = {
  fontFamily: "poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  color: "#6B7A99",
};
