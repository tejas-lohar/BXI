import {
    Box,
    Button,
    CircularProgress,
    Grid,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import Amex from "../../assets/Images/payment/Amex.svg";
import paymentcard from "../../assets/Images/payment/Card.svg";
import correcticon from "../../assets/Images/payment/correcticon.svg";
import DinersClub from "../../assets/Images/payment/DinersClub.svg";
import Discover from "../../assets/Images/payment/Discover.svg";
import dropdown from "../../assets/Images/payment/dropdown.svg";
import JCB from "../../assets/Images/payment/JCB.svg";
import Mastercard from "../../assets/Images/payment/Mastercard.svg";
import no1 from "../../assets/Images/payment/no1.svg";
import no2 from "../../assets/Images/payment/no2.svg";
import no3 from "../../assets/Images/payment/no3.svg";
import Visa from "../../assets/Images/payment/Visa.svg";
// import LeftArrow from "../../assets/Images/payment/LeftArrow.svg";
import LeftArrow from '../../assets/Images/payment/LeftArrow.png';

import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    useGetCompanyPaymentStatusByOrderId
} from "../../Hooks/Auth";
import { BankCodes } from "../../utils/bank_codes";

import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer } from "react-toastify";
import { z } from "zod";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { useCompanyDetails, useCompanyStepDetails } from "../../Hooks/Auth";
import { useMutation } from "react-query";
import axios from "axios";


const usePayWithNetbank = () => {
    return useMutation((data)=>{
        return axios.post("purchase/pay-netbank" , data)
    })
}

const AddPayment = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [pay, setPay] = useState();
  const [CreditCardPayment, setCreditCardPayment] = useState(true);
const {mutate} = usePayWithNetbank()
  const [payCode, setPayCode] = useState();
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
  const submitCard =(()=>{})

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


  const [netPaymentLoading, setNetPaymentLoading] = useState(false);
  const ConfirmNetPayment = async () => {
    // setTimeout(() => {
    //   navigate("/home/terms");
    // }, 3000);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
    setNetPaymentLoading(true);
    if (payCode === undefined) {
      alert("data Cant be empty");
      setNetPaymentLoading(false);
    } else {
      const data = {
        paymentType: "netbanking",
        pay_code: payCode,
        invoiceId :id
      };
      mutate(data, {
        onSuccess: (Response) => {
          setOrderId(Response.data?.order_id);
          const newWindow = window.open();
          newWindow.document.write(htmlDecode(Response?.data?.content));
          setTimeout(() => {
            navigate("/home/terms");
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
              width : "22px" , 
              height : "9px" ,
              mx: "auto",
              p: 2,
            }}
          ></Box>
        </Link>
        <Grid
          container
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "17px",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            // textAlign: "center",
            // paddingBottom: "4rem",
          }}
        >
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: "1rem",
            }}
            gap={2}
          >
            <Typography sx={mainText}>Add Payment method </Typography>
            <Box
              sx={{
                width: {
                  xl: "75%",
                  lg: "75%",
                  md: "80%",
                  sm: "85%",
                  xs: "90%",
                },
                mx: "auto",
                mt: { xl: 10, lg: 10, md: 6, sm: 4, xs: 3 },
              }}
            >
              <FormControl fullWidth variant="standard">
                <InputLabel
                  required
                  id="demo-simple-select-label"
                  sx={{ color: "rgba(161, 161, 161, 1)" }}
                >
                  Pay By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="companyType"
                  value={pay}
                  onChange={(e) => {
                    setCreditCardPayment(e.target.value);
                  }}
                >
                  <MenuItem value={true}>Via Card</MenuItem>
                  <MenuItem value={false}>Via net banking </MenuItem>
                </Select>
              </FormControl>
            </Box>
            {!CreditCardPayment ? null : (
              <>
                <Typography sx={paymethodText}>Payment Method</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: {
                      xl: "flex-start",
                      lg: "flex-start",
                      md: "flex-start",
                      sm: "center",
                      xs: "center",
                    },
                    flexDirection: "row",
                    mt: 0,
                    width: {
                      xl: "75%",
                      lg: "75%",
                      md: "80%",
                      sm: "85%",
                      xs: "90%",
                    },
                    mx: "auto",
                    gap: "20px",
                  }}
                >
                  {cardImgs?.map((el, idx) => {
                    return (
                      <>
                        <img
                          src={el.imgUrl}
                          alt="visa"
                          style={{ height: "auto", width: "8%" }}
                        />
                      </>
                    );
                  })}
                </Box>
              </>
            )}
            <Box mt={2}>
              {CreditCardPayment ? (
                <>
                  <form onSubmit={submitCard}>
                    <Box
                      sx={{
                        mt: 4,
                        width: {
                          xl: "75%",
                          lg: "75%",
                          md: "80%",
                          sm: "85%",
                          xs: "90%",
                        },
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                      }}
                    >
                      <Box>
                        <TextField
                          sx={{ color: "rgba(161, 161, 161, 1)" }}
                          label="Card Number"
                          placeholder="Card Number"
                          variant="standard"
                          fullWidth
                          {...register("card_number")}
                          InputProps={{
                            style: {
                              border: "1px rgba(232, 232, 232, 1)",
                            },
                          }}
                        />
                        <Typography
                          sx={{
                            ml: 1,
                            mt: 1,
                            fontSize: "10px",
                            color: "red",
                          }}
                        >
                          {errors["card_number"]?.message}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          gap: "25px",
                          // background: "red",
                        }}
                      >
                        <Box sx={{ width: "100%" }}>
                          <TextField
                            sx={{
                              color: "rgba(161, 161, 161, 1)",
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 14,
                              width: "100%",
                            }}
                            label="Expires Year  "
                            placeholder="Expires Year  "
                            variant="standard"
                            fullWidth
                            {...register("card_expiry_year")}
                            InputProps={{
                              style: {
                                border: "1px rgba(232, 232, 232, 1)",
                              },
                            }}
                          />
                          <Typography
                            sx={{
                              ml: 1,
                              mt: 1,
                              fontSize: "10px",
                              color: "red",
                            }}
                          >
                            {errors["card_expiry_year"]?.message}
                          </Typography>
                        </Box>
                        <Box sx={{ width: "100%" }}>
                          <TextField
                            label="Expire Month"
                            placeholder="Expire Month"
                            variant="standard"
                            fullWidth
                            {...register("card_expiry_month")}
                            InputProps={{
                              style: {
                                border: "1px rgba(232, 232, 232, 1)",
                              },
                            }}
                          />

                          <Typography
                            sx={{
                              ml: 1,
                              mt: 1,
                              fontSize: "10px",
                              color: "red",
                            }}
                          >
                            {errors["card_expiry_month"]?.message}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <TextField
                          label="Card Holder Name"
                          placeholder="Card Holder Names"
                          variant="standard"
                          fullWidth
                          {...register("card_holder_name")}
                          InputProps={{
                            style: {
                              border: "1px rgba(232, 232, 232, 1)",
                            },
                          }}
                        />
                        <Typography
                          sx={{
                            ml: 1,
                            mt: 1,
                            fontSize: "10px",
                            color: "red",
                          }}
                        >
                          {errors["card_holder_name"]?.message}
                        </Typography>
                      </Box>
                      <Box>
                        <TextField
                          label="cvv"
                          placeholder="cvv"
                          variant="standard"
                          fullWidth
                          {...register("cvv")}
                          InputProps={{
                            style: {
                              border: "1px rgba(232, 232, 232, 1)",
                            },
                          }}
                        />
                        <Typography
                          sx={{
                            ml: 1,
                            mt: 1,
                            fontSize: "10px",
                            color: "red",
                          }}
                        >
                          {errors["cvv"]?.message}
                        </Typography>
                      </Box>
                      <Box>
                        <TextField
                          label="Country Code"
                          placeholder="Country Code"
                          variant="standard"
                          fullWidth
                          {...register("country_code")}
                          InputProps={{
                            style: {
                              border: "1px rgba(232, 232, 232, 1)",
                            },
                          }}
                        />
                        <Typography
                          sx={{
                            ml: 1,
                            mt: 1,
                            fontSize: "10px",
                            color: "red",
                          }}
                        >
                          {errors["country_code"]?.message}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: {
                          xl: "75%",
                          lg: "75%",
                          md: "80%",
                          sm: "85%",
                          xs: "90%",
                        },
                        mx: "auto",
                        mt: 2,
                      }}
                      gap={2}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                          width: {
                            xl: "50%",
                            lg: "50%",
                            md: "60%",
                            sm: "60%",
                            xs: "90%",
                          },
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
                          background: "rgba(68, 95, 210, 1)",
                        }}
                        // onClick={addCard}
                      >
                        Add Card
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
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </form>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      width: "75%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "5rem",
                      marginBottom: "5rem",
                    }}
                  >
                    <FormControl fullWidth variant="standard">
                      <InputLabel
                        required
                        id="demo-simple-select-label"
                        sx={{ color: "rgba(161, 161, 161, 1)" }}
                      >
                        Select Your Bank
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
                      width: "75%",
                      mx: "auto",
                      mt: 2,
                    }}
                    gap={2}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        width: {
                          xl: "50%",
                          lg: "50%",
                          md: "60%",
                          sm: "60%",
                          xs: "90%",
                        },
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
                      }}
                      onClick={ConfirmNetPayment}
                    >
                      {netPaymentLoading ? (
                        <CircularProgress
                          size="20px"
                          sx={{ color: "white", width: "40%" }}
                        />
                      ) : (
                        "Confirm Payment"
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
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </>
              )}
            </Box>

            <Grid
              sx={{
                display: "flex",
                // justifyContent: "center",
                flexDirection: "row",
                width: "75%",
                mx: "auto",
                mt: 2,
              }}
              gap={2}
            >
              <img
                src={correcticon}
                alt="icon"
                style={{ height: "auto", width: "auto" }}
              />
              <Typography sx={saveText}>Save Card Details</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xl={6}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: "0rem",
            }}
          >
            <Box
              component="img"
              src={paymentcard}
              alt="payment"
              sx={{
                height: "auto",
                width: {
                  xl: "70%",
                  lg: "70%",
                  md: "80%",
                  sm: "80%",
                  xs: "90%",
                },
                mx: "auto",
              }}
            ></Box>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                width: {
                  xl: "70%",
                  lg: "70%",
                  md: "80%",
                  sm: "80%",
                  xs: "82%",
                },
                mx: "auto",
                mt: 10,
              }}
              gap={2}
            >
              <img
                src={dropdown}
                alt="dropdown"
                style={{ height: "auto", width: "auto" }}
              />
              <Typography sx={saveText2}>More Option</Typography>
            </Grid>
            {moreOptionsList?.map((el, idx) => {
              return (
                <>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: {
                        xl: "70%",
                        lg: "70%",
                        md: "80%",
                        sm: "80%",
                        xs: "85%",
                      },
                      mx: "auto",
                      mt: 5,
                    }}
                    gap={2}
                  >
                    <img
                      src={el.imgNo}
                      alt="dropdown"
                      style={{ height: "auto", width: "auto" }}
                    />
                    <Typography sx={dropText}>{el.imgText}</Typography>
                  </Grid>
                </>
              );
            })}
          </Grid>
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

const paymethodText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "1.4rem",
  color: "#A1A1A1",
  textAlign: "left",
  width: "75%",
  mx: "auto",
  mt: 2,
};

const saveText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#6B7A99",
};

const saveText2 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 16,
  textAlign: "center",
  color: "#525252",
};

const dropText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.4rem",
    sm: "1.2rem",
    xs: "1.1rem",
  },
  textAlign: "justify",
  color: "#909BB2",
  width: "80%",
};
