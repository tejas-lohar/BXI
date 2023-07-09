import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import { useGetInvoiceByOrderSummary } from "../../../Hooks/Invoices/useGetInvoiceByOrderSummary";
import { useGetOrderSummaryByIdForBuyer } from "../../../Hooks/OrderActions/useGetOrderSummaryByIdForBuyer";
import CheckboxIcon from "../../../assets/Images/CommonImages/CheckboxIcon.svg";
import CheckedBoxIcon from "../../../assets/Images/CommonImages/CheckedBoxIcon.svg";
import CheckedCheckboxIcon from "../../../assets/Images/CommonImages/CheckedCheckboxIcon.svg";
import CloseIcon from "../../../assets/Images/CommonImages/CloseIcon.svg";
import DocDownloadImg from "../../../assets/Images/CommonImages/DocDownload.png";
import LeftArrowIcon from "../../../assets/Images/CommonImages/GoLeft.png";
import PrintPurchaseOrder from "../../../assets/Images/CommonImages/Print.png";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import NumberToWord from "../../../components/NumberToWord";
import { getCompanyById } from "../../../redux/action/CompanyActions";
import { notifications } from "../../../redux/action/Notification/notification";
import { getOrderSummary } from "../../../redux/action/OrderSummaryActions";
import MediaPurchseOrderDetails from "../../BuyingJourneyPages/MediaPo";
import PurchaseOrderDetails from "../../BuyingJourneyPages/PurchaseOrderDetails";
import PI from "../../BuyingJourneyPages/PI";

const PerformaInvoice = () => {
  const downloadRef = useRef(null);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  let dispatch = useDispatch();
  const [mutateResponse, setMutateResponse] = useState();
  const [mutateRespopnseLoading, setMutateResponseLoading] = useState(false);
  const [notificationOn, setNotificationOn] = useState("");
  const [isTransportation, setIsTransportation] = useState(true);
  const [open, setOpen] = useState(false);
  const [openTextarea, setOpenTextarea] = useState("");
  const [pdf, setPDF] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: InvoiceData,
    isLoading: DataLoading,
    error: DataError,
  } = useGetInvoiceByOrderSummary(id);

  const printRef = useRef();
  const handlePrintClick = () => {
    window.print(printRef.current.innerHTML);
  };

  let IsMedia;
  InvoiceData?.ProductData?.map((res) => {
    if (res?.ProductTypeName === "Media") {
      IsMedia = true;
    }
  });

  const { data: orderSummaryData, isLoading: orderSummaryLoading } =
    useGetOrderSummaryByIdForBuyer(id);

  let orderData = [];

  for (let i = 0; i < orderSummaryData?.ProductData?.length; i++) {
    orderData.push(orderSummaryData.ProductData[i]);
  }

  let totalPrice = 0;
  orderData?.map((item) => {
    totalPrice += item.DiscountedPrice
      ? item.DiscountedPrice
      : item.PricePerUnit * item.ProductQuantity * item.ProductQuantity;
  });

  async function UpdateInvoice() {
    setNotificationOn("Accepted");
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

        if (res?.data?.body === "Accepted") {
          if (
            InvoiceData?.ProductData?.at(0)?.ProductTypeName === "Media" ||
            InvoiceData?.IsMedia
          ) {
            setTimeout(() => {
              navigate(`/home/paymentprofile/${id}`);
            }, 2000);
          } else {
            setTimeout(() => {
              navigate("/home/choosetransport/" + InvoiceData?._id);
            }, 2000);
          }
        }
      })
      .catch((err) => {
        alert("Error");
      });
  }

  // function handleDownloadClick() {
  //   const doc = new jsPDF();
  //   doc.addHTML(downloadRef.current, function () {
  //     doc.save("screen.pdf");
  //   });
  // }

  // async function UpdateInvoiceReject() {
  //   setNotificationOn("Rejected");
  //   setOpen(true);
  //   await axios
  //     .put(
  //       `invoices/update_invoice/` + InvoiceData?._id,
  //       {
  //         BuyerInvoiceAcceptanceStatus: "Rejected",
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       toast.error("Invoice Rejected", {
  //         position: "top-center",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     })
  //     .catch((err) => {
  //       alert("Error");
  //     });
  // }

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
  let TotalAmountAfterTax = 0;
  let TotalDiscount = 0;
  let TotalAdditionalCostInBXIS = 0;
  let TotalAdditionalCostInINR = 0;
  OrderSummarydata?.ProductData?.map((item) => {
    storeDataIds.push(item);
    TotalAdditionalCostInBXIS += item?.TotalAdditionalCostInBXI;
    TotalAdditionalCostInINR += item?.TotalAdditionalCostInRupee;
    TotalQuantity += item.ProductQuantity;
    totalAmount += item.DiscountedPrice * item.ProductQuantity;
    totalPricePerUnit += item.DiscountedPrice * item.ProductQuantity;
    totatlTaxableAmount += item.DiscountedPrice * item.ProductQuantity;
    totalGST += item.GST;
    totalAmountWithGST +=
      item?.DiscountedPrice * item?.ProductQuantity * (item?.GST / 100);
    totalAmountWithTax += item?.DiscountedPrice * item?.ProductQuantity;
    TotalDiscount += item?.DiscountedPrice - item?.PricePerUnit;
  });

  let TotalAmountWithTransportationData = Number(totalAmountWithTax);

  TotalAmountAfterTax =
    Number(TotalAmountWithTransportationData) + Number(totalAmountWithTax);

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
    dispatch(
      getCompanyById(orderSummaryData?.OrderSummarydata?.BuyerCompanyId)
    );
  }, [orderSummaryData?.OrderSummarydata?.BuyerCompanyId]);

  useEffect(() => {
    if (notificationOn != "") {
      const sellerId = InvoiceData?.SellerDetails?.SellerCompanyId;
      const buyerId = InvoiceData?.BuyerDetails?.BuyerCompanyId;
      const type = "Order";

      let message = "";
      if (notificationOn === "Accepted") {
        message = `Congratulations, PI generated by you has been confirmed by ${InvoiceData?.BuyerDetails?.BuyerCompanyName}`;
      } else if (notificationOn === "Rejected") {
        message = `Sorry, PI generated by you has got rejected by ${InvoiceData?.SellerDetails?.SellerCompanyName}`;
      }

      dispatch(notifications(sellerId, buyerId, message, type));
    }
  }, [notificationOn]);

  console.log("InvoiceData", InvoiceData);

  return (
    <Paper
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
        width: "100%",
      }}
      elevation={0}
    >
      {InvoiceData?.ProductData?.at(0)?.ProductTypeName === "Media" ||
      InvoiceData?.IsMedia ? (
        <MediaPurchseOrderDetails
          SellerPage={true}
          ProformaInvoice={true}
          Title={"media Proforma Invoice"}
          PageName={"Proforma Invoice"}
        />
      ) : (
        <PI
          SellerPage={true}
          ProformaInvoice={true}
          Title={"Proforma Invoice"}
          PageName={"Proforma Invoice"}
          downloadpdf={pdf}
          InvoiceId={InvoiceData?._id}
        />
      )}

      {console.log("InvoiceDataInvoiceDataInvoiceData", InvoiceData)}

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
          {InvoiceData?.BuyerInvoiceAcceptanceStatus === "Pending" ? (
            <Box
              sx={ButtonStyleForAcceptAndReject}
              onClick={() => {
                UpdateInvoice();
                setPDF(true);
              }}
            >
              Accept{" "}
            </Box>
          ) : InvoiceData?.BuyerInvoiceAcceptanceStatus === "Accepted" ? (
            <Box
              sx={ButtonStyleForAcceptAndReject}
              onClick={() =>
                navigate(
                  InvoiceData?.ProductData?.at(0)?.ProductTypeName ===
                    "Media" || InvoiceData?.IsMedia
                    ? `/home/paymentprofile/${id}`
                    : `/home/choosetransport/${InvoiceData?._id}`
                )
              }
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
                              <Box component="img" src={CheckedCheckboxIcon} />
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
                              <Box component="img" src={CheckedCheckboxIcon} />
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
                            openTextarea == "quantity" ? "#445FD2" : "#6B7A99",
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
                              <Box component="img" src={CheckedCheckboxIcon} />
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
                              <Box component="img" src={CheckedCheckboxIcon} />
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
