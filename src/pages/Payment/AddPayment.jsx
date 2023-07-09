import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useGetCompanyPaymentStatusByOrderId } from "../../Hooks/Auth";
import Amex from "../../assets/Images/payment/Amex.svg";
import DinersClub from "../../assets/Images/payment/DinersClub.svg";
import Discover from "../../assets/Images/payment/Discover.svg";
import JCB from "../../assets/Images/payment/JCB.svg";
import LeftArrow from "../../assets/Images/payment/LeftArrow.png";
import Mastercard from "../../assets/Images/payment/Mastercard.svg";
import Visa from "../../assets/Images/payment/Visa.svg";
import no1 from "../../assets/Images/payment/no1.svg";
import no2 from "../../assets/Images/payment/no2.svg";
import no3 from "../../assets/Images/payment/no3.svg";
import { BankCodes } from "../../utils/bank_codes";

import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from "react-toastify";
import { z } from "zod";
import { useCompanyDetails, useCompanyStepDetails } from "../../Hooks/Auth";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
const AddPayment = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [pay, setPay] = useState();
  const [CreditCardPayment, setCreditCardPayment] = useState(true);
  const [cardNumber, setCardNumber] = useState();
  const [expireYear, setExpireYear] = useState();
  const [expireMonth, setExpireMonth] = useState();
  const [countryCode, setCountryCode] = useState();
  const [cvv, setCvv] = useState();
  const [payCode, setPayCode] = useState();
  const [holderName, setHolderName] = useState();
  const [open, setOpen] = useState(false);
  const { mutate: PaymentByCard } = useCompanyStepDetails();
  const { mutate: PaymentByNetBanking } = useCompanyStepDetails();
  const { data: CompanyData } = useCompanyDetails();

  const [orderId, setOrderId] = useState();
  const [payClicked, setPayClicked] = useState(false);
  const { data } = useGetCompanyPaymentStatusByOrderId(orderId, payClicked);

  function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    setPayClicked(true);
    return doc.documentElement.textContent;
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        card_number: z.string().length(16),
        card_expiry_month: z.string().length(2),
        card_expiry_year: z.string().length(4),
        cvv: z.string().min(3).max(4),
        card_holder_name: z.string(),
        country_code: z.string().length(2),
      })
    ),
  });

  const cardImgs = [
    {
      imgUrl: Visa,
    },
    {
      imgUrl: Amex,
    },
    {
      imgUrl: Mastercard,
    },
    {
      imgUrl: JCB,
    },
    {
      imgUrl: Discover,
    },
    {
      imgUrl: DinersClub,
    },
  ];

  const moreOptionsList = [
    {
      imgNo: no1,
      imgText:
        "Lorem ipsum dolor sit amet consectetur. Feugiat mattis tellus fames et vitae porta nulla.",
    },
    {
      imgNo: no2,
      imgText:
        "Lorem ipsum dolor sit amet consectetur. Feugiat mattis tellus fames et vitae porta nulla.",
    },
    {
      imgNo: no3,
      imgText:
        "Lorem ipsum dolor sit amet consectetur. Feugiat mattis tellus fames et vitae porta nulla.",
    },
  ];
  const [searchParams, _] = useSearchParams();

  const [netPaymentLoading, setNetPaymentLoading] = useState(false);
  const ConfirmNetPayment = async () => {
    setNetPaymentLoading(true);
    if (payCode === undefined) {
      alert("data Cant be empty");
      setNetPaymentLoading(false);
    } else {
      // const payment =

      const data = {
        paymentType: "netbanking",
        pay_code: payCode,
        plan: searchParams.get("plan"),
      };
      PaymentByNetBanking(data, {
        onSuccess: (Response) => {
          setOrderId(Response.data?.order_id);
          const newWindow = window.open();
          newWindow.document.write(htmlDecode(Response?.data?.content));
          setTimeout(() => {
            navigate("/home");
          }, 5000);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  if (payClicked) {
    return (
      <Grid
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Paper elevation={0} sx={{ bgcolor: "transparent" }}>
      <ToastContainer style={{ fontSize: "16px" }} />
      <BreadCrumbHeader MainText="Payment" subText="Payment" />
      <Paper elevation={0}>
        <Link to={"/home"}>
          <Box
            component="img"
            src={LeftArrow}
            alt="LeftArrow"
            sx={{
              // height: "auto",
              // width: "auto",
              width: "22px",
              height: "9px",
              mx: "auto",
              p: 2,
            }}
          ></Box>
        </Link>
        <Grid
          container
          sx={{
            backgroundColor: "#fff",
            borderRadius: "25px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "300px",
            width: "700px",
            mx: "auto",
            minHeight: "60vh",
          }}
        >
          <Typography sx={mainText}> Pay Via Your Bank</Typography>
          <Box mt={2}>
            <>
              <Box
                sx={{
                  width: "450px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "5rem",
                  marginBottom: "5rem",
                }}
              >
                <FormControl fullWidth variant="standard">
                  <React.Fragment>
                    {payCode === undefined ? (
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: 14,
                          color: "#6B7A99",
                        }}
                      >
                        {" "}
                        Bank Account
                      </Typography>
                    ) : null}
                  </React.Fragment>
                  <InputLabel
                    required
                    id="demo-simple-select-label"
                    sx={{ color: "rgba(161, 161, 161, 1)" }}
                    label="Bank Account"
                  >
                    Select Your Bank Account
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="companyType"
                    value={payCode}
                    onChange={(e) => {
                      setPayCode(e.target.value);
                    }}
                  >
                    {Object.keys(BankCodes).map((e) => {
                      return <MenuItem value={e}>{BankCodes[e]}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  mx: "auto",
                  mt: 2,
                }}
                gap={2}
              >
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: {
                      xl: "1.2rem",
                      lg: "1.2rem",
                      md: "1rem",
                      sm: "0.8rem",
                      xs: "0.8rem",
                    },
                    textAlign: "center",
                    color: "#FFFFFF",
                    background: "#445FD2",
                    textTransform: "none",
                    "&:hover": {
                      background: "#445FD2",
                    },
                  }}
                  onClick={ConfirmNetPayment}
                >
                  {netPaymentLoading ? (
                    <CircularProgress
                      size="20px"
                      sx={{ color: "white", width: "40%" }}
                    />
                  ) : (
                    "Confirm Bank Account"
                  )}
                </Button>
                <Button
                  variant="standard"
                  size="large"
                  sx={{
                    color: "blue",
                    width: "50%",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: {
                      xl: "1.2rem",
                      lg: "1.2rem",
                      md: "1rem",
                      sm: "0.8rem",
                      xs: "0.8rem",
                    },
                    textAlign: "center",
                    TextTransform: "none",
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          </Box>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default AddPayment;

const mainText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "3.2rem",
    lg: "3.1rem",
    md: "3rem",
    sm: "2.8rem",
    xs: "2.6rem",
  },
  textAlign: "center",
  // lineHeight:48,
  color: "#6B7A99",
};
