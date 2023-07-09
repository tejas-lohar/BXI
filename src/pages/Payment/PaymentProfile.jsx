import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import { Link } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PaymentArrow from "../../assets/Images/CommonImages/LeftArrowForVoucherDetail.svg";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";
import { useParams, useNavigate } from "react-router-dom";
import { useGetInvoiceByOrderSummary } from "../../Hooks/Invoices/useGetInvoiceByOrderSummary";

import {
  useVoucherOrderFetch,
  useInitiateTransaction,
} from "./VoucherOrderHooks";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import {
  PaymentVerifies,
  OrderCreates,
} from "../../redux/action/PaymentGetway/CreateOrder";
import axios from "axios";

function PaymentProfile() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { PaymentVerification } = useSelector((state) => state.paymentVerifie);

  console.log("PaymentVerification", PaymentVerification);

  const handleClose = () => {
    setOpen(false);
  };
  let navigate = useNavigate();
  const { id } = useParams();
  const { price } = useParams();
  console.log("price", price);

  const {
    data: loggedInUserData,
    isLoading: loggedInUserLoading,
    error: loggedInUserError,
  } = useGetLoggedInUser();

  const {
    data: InvoiceData,
    isLoading: DataLoading,
    error: DataError,
  } = useGetInvoiceByOrderSummary(id);

  const {
    data: voucherOrderData,
    isLoading: voucherOrderLoading,
    error: voucherOrderError,
  } = useVoucherOrderFetch(id);

  let VoucherPrice = 0;
  voucherOrderData?.data?.ProductData?.map((res, idx) => {
    return (VoucherPrice += res?.DiscountedPrice * res?.ProductQuantity);
  });
  const {
    data: initiateTransactionData,
    mutate: initiateTransactionMutate,
    isLoading: initiateTransactionLoading,
    error: initiateTransactionError,
    mutateAsync: initiateTransactionMutateAsync,
  } = useInitiateTransaction();

  let BankNameBasedOnIfsc = "";
  let ifscCode = loggedInUserData?.data?.bankdetails?.ifsc?.slice(0, 3);
  if (ifscCode === "SBI") {
    BankNameBasedOnIfsc = "State Bank of India";
  } else if (ifscCode === "HDF") {
    BankNameBasedOnIfsc = "HDFC Bank";
  } else if (ifscCode === "KKB") {
    BankNameBasedOnIfsc = "Kotak Mahindra Bank";
  } else if (ifscCode === "ICI") {
    BankNameBasedOnIfsc = "ICICI Bank";
  } else if (ifscCode === "CIT") {
    BankNameBasedOnIfsc = "Citi Bank";
  } else if (ifscCode === "PUN") {
    BankNameBasedOnIfsc = "Punjab National Bank";
  } else if (ifscCode === "BOB") {
    BankNameBasedOnIfsc = "Bank of Baroda";
  } else if (ifscCode === "YES") {
    BankNameBasedOnIfsc = "Yes Bank";
  } else if (ifscCode === "UTI") {
    BankNameBasedOnIfsc = "Axis Bank";
  } else if (ifscCode === "UBI") {
    BankNameBasedOnIfsc = "Union Bank of India";
  } else if (ifscCode === "IDI") {
    BankNameBasedOnIfsc = "Indian Bank";
  } else if (ifscCode === "IBK") {
    BankNameBasedOnIfsc = "IDBI Bank";
  } else if (ifscCode === "KAR") {
    BankNameBasedOnIfsc = "Karnataka Bank";
  } else if (ifscCode === "CNR") {
    BankNameBasedOnIfsc = "Canara Bank";
  } else if (ifscCode === "ALL") {
    BankNameBasedOnIfsc = "Allahabad Bank";
  } else if (ifscCode === "AND") {
    BankNameBasedOnIfsc = "Andhra Bank";
  } else if (ifscCode === "MAH") {
    BankNameBasedOnIfsc = "Bank of Maharashtra";
  } else if (ifscCode === "BAR") {
    BankNameBasedOnIfsc = "Bank of Baroda";
  } else if (ifscCode === "BAN") {
    BankNameBasedOnIfsc = "Bank of India";
  } else if (ifscCode === "BRA") {
    BankNameBasedOnIfsc = "Bank of Rajasthan";
  } else if (ifscCode === "CBI") {
    BankNameBasedOnIfsc = "Central Bank of India";
  }
  const handlePay = async () => {
    await initiateTransactionMutate(
      {
        amount: Number(price) || VoucherPrice,
        walletTo:
          voucherOrderData?.data?.SellerDetails?.SellerCompanyId ||
          InvoiceData?.SellerDetails?.SellerCompanyId,
      },
      {
        onSuccess: (response) => {
          console.log("responseHere", response?.data?.data);
          if (response?.data?.data?.status === "SUCCESS") {
            setOpen(false);
            setTimeout(() => {
              navigate(`/home/orderdetails`);
            }, 3000);

            return toast.success(`Payment was succesfull`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (response?.data?.data?.status === "FAILED") {
            return toast.error(
              `Payment was failed - ${response?.data?.data?.message}`,
              {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
          }
        },
        onError: (error) => {
          console.log("responseHer", error);
        },
        // onSettled: () => {
        //   setOpen(false);
        // },
      }
    );
  };

  const shippingInfo = {
    hNo: "A-33",
    city: "Nagpur",
    state: "MH",
    country: "India",
    pinCode: "440024",
    phoneNo: "8793644541",
  };

  const orderItems = {
    cheeseBurger: {
      price: 300,
      quantity: 2,
    },
    vegCheeseBurger: {
      price: 500,
      quantity: 3,
    },
    burgerWithFries: {
      price: 200,
      quantity: 2,
    },
  };

  const paymentMethod = "Online";
  const itemsPrice = 700;
  const taxPrice = 120;
  const shippingCharges = 80;
  const totalAmount = 900;

  const HandlerPaymentSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "COD") {
      dispatch(
        OrderCreates(
          shippingInfo,
          orderItems,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingCharges,
          totalAmount
        )
      );
    } else {
      // createorderonline

      const {
        data: { order, orderOptions },
      } = await axios.post(
        `product_type/createorder`,
        {
          shippingInfo,
          orderItems,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingCharges,
          totalAmount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const options = {
        key: "rzp_test_8ty9TeqARebES9",
        amount: order.amount,
        currency: "INR",
        name: "BXI",
        description: "Bater Exchange of India",
        order_id: order.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const {
            data: { success, message },
          } = await axios.post(
            `product_type/paymentverification`,
            {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              orderOptions,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          if (success) {
            await axios.post(`order/create_order`, { id }).then((res) => {
              alert("Payment Successfull");
              navigate(`/home/taxinvoice`);
            });
          }
        },

        theme: {
          color: "#3792cb",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <Paper
        elevation={0}
        sx={{
          boxShadow: "none",
          width: "100%",
          bgcolor: "transparent",
        }}
      >
        <BreadCrumbHeader MainText="Payment Profile" />

        <Grid
          container
          sx={{
            background: "#FFFFFF",
            padding: "2.5rem",
            borderRadius: "20px",
            marginTop: "2%",
            minHeight: "70vh",
            position: "relative",
          }}
        >
          <img
            src={PaymentArrow}
            style={{
              position: "absolute",
              left: "3%",
              top: "3%",
            }}
            alt="laft-arrow"
          />

          <Grid
            item
            xl={10}
            lg={10}
            md={10}
            sm={10}
            xs={12}
            sx={{
              mx: "auto",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "#6B7A99",
                fontWeight: 500,
                marginTop: "2rem",
                marginLeft: {
                  xl: "40%",
                  lg: "40%",
                  md: "40%",
                  sm: "50%",
                  xs: "20%",
                },
                fontSize: {
                  xl: "32px",
                  lg: "32px",
                  md: "32px",
                  sm: "32px",
                  xs: "27px",
                },
              }}
            >
              Bank Details
            </Typography>

            <Box
              sx={{
                marginTop: "4rem",
                mx: "auto",
                width: {
                  xl: "45%",
                  lg: "45%",
                  md: "45%",
                  sm: "100%",
                  xs: "100%",
                },
              }}
            >
              <TextField
                focused
                className="text"
                label="Bank Name"
                value={BankNameBasedOnIfsc}
                multiline
                variant="standard"
                sx={lablechange}
                InputLabelProps={{
                  style: {
                    color: "#C4CAD6",
                    fontSize: "17px",
                    fontFamily: "Poppins",
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Poppins", mt: "30px" }}
                    ></Typography>
                  ),
                  style: {
                    fontFamily: "Poppins",
                    color: " #6B7A99",
                    fontSize: "17px",
                  },
                }}
              />

              <TextField
                focused
                label="Address"
                value={loggedInUserData?.data?.bankdetails?.branchName}
                variant="standard"
                sx={lablechange}
                InputLabelProps={{
                  style: {
                    color: "#C4CAD6",
                    fontSize: "17px",
                    fontFamily: "Poppins",
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Poppins", mt: "30px" }}
                    ></Typography>
                  ),
                  style: {
                    fontFamily: "Poppins",
                    color: " #6B7A99",
                    fontSize: "17px",
                  },
                }}
              />

              <TextField
                focused
                label="Account Number"
                value={loggedInUserData?.data?.bankdetails?.bankAccountNo}
                multiline
                variant="standard"
                sx={lablechange}
                InputLabelProps={{
                  style: {
                    color: "#C4CAD6",
                    fontSize: "17px",
                    fontFamily: "Poppins",
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Poppins", mt: "30px" }}
                    ></Typography>
                  ),
                  style: {
                    fontFamily: "Poppins",
                    color: " #6B7A99",
                    fontSize: "17px",
                  },
                }}
              />

              <TextField
                focused
                label="IFSC Code"
                value={loggedInUserData?.data?.bankdetails?.ifsc}
                multiline
                variant="standard"
                sx={lablechange}
                InputLabelProps={{
                  style: {
                    color: "#C4CAD6",
                    fontFamily: "Poppins",
                    fontSize: "17px",
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <Typography
                      variant="body1"
                      sx={{ fontFamily: "Poppins", mt: "30px" }}
                    ></Typography>
                  ),
                  style: {
                    fontFamily: "Poppins",
                    color: " #6B7A99",
                    fontSize: "17px",
                  },
                }}
              />

              <Grid xl={12} lg={12} sm={12} xs={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexWrap: "wrap",
                    alignItems: "center",
                    marginTop: "3rem",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      borderRedius: "6px",
                      fontFamily: "Poppins",
                      textTransform: "none",

                      border: "1px solid #445FD2",
                      backgroundColor: "#445FD2",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: {
                        xl: "16px",
                        lg: "16px",
                        md: "15px",
                        sm: "15px",
                        xs: "14px",
                      },

                      marginRight: {
                        xl: "60px",
                        lg: "60px",
                        md: "60px",
                        sm: "40px",
                        xs: "10px",
                      },
                      ":hover": {
                        opacity: 1,
                        border: "1px solid blue",
                        color: "#445FD2",
                      },
                    }}
                    onClick={HandlerPaymentSubmit}
                  >
                    Proceed to pay
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      marginTop: {
                        xl: "auto",
                        lg: "auto",
                        md: "auto",
                        sm: "auto",
                        xs: "4px",
                      },
                      color: "#445FD2",
                      fontFamily: "Poppins",
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: {
                        xl: "16px",
                        lg: "16px",
                        md: "15px",
                        sm: "15px",
                        xs: "14px",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Payment"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to pay {price || VoucherPrice} BXI Tokens to
            the {voucherOrderData?.data?.SellerDetails?.SellerCompanyName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              handlePay();
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default PaymentProfile;

const lablechange = {
  fontFamily: "Poppins",
  color: "#C4CAD6",
  fontSize: "16px",
  display: "grid",
  textAlign: "left",
  marginTop: "2rem",
  fontWeight: "bold",
  borderBottom: "1px solid #E8E8E8",
  "&:focus": {
    border: "1px solid #E8E8E8",
  },
  mt: 4,
};
