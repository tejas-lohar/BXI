import React, { useEffect, useState, useRef } from "react";
import DownloadIcon from "../../assets/Images/CommonImages/downloadicon.svg";
import PrintIcon from "../../assets/Images/CommonImages/printicon.svg";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  Modal,
} from "@mui/material";
// import LeftArrow from "../../assets/Images/payment/LeftArrow.svg";
import LeftArrow from "../../assets/Images/payment/LeftArrow.png";

import StacsOfCoinIcon from "../../assets/Stackofcoinsgrey.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetInvoiceByOrderSummary,
  useGetVouhcerInvoiceByOrderId,
} from "../../Hooks/Invoices/useGetInvoiceByOrderSummary";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { BalanceSharp } from "@mui/icons-material";
import { useReactToPrint } from "react-to-print";
import { Document, Page } from "react-pdf";
const OrderSummaryVoucherDetails = () => {
  const { id } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/home/buynow/${id}`);
  };
  const {
    data: VoucherInvoiceData,
    isLoading: DataLoading,
    error: DataError,
  } = useGetInvoiceByOrderSummary(id);

  const {
    data: VoucherVoucherInvoiceData,
    isLoading: VoucherDataLoading,
    error: VoucherDataError,
    refetch: VoucherRefetch,
  } = useGetVouhcerInvoiceByOrderId(id);
  // const { OrderSummary: OrderSummarydata, loading: OrderSummaryDataLoading } =
  //   useSelector((state) => state.OrderSummaryD);
  console.log("VoucherVoucherInvoiceData", VoucherVoucherInvoiceData);
  let sum = 0;
  const [eaaUrl, setEaaUrl] = useState();

  const [open, setOpen] = useState(false);
  const totalGstToTake = VoucherVoucherInvoiceData?.ProductData.reduce(
    (acc, curr) => {
      //If Discounted
      if (curr.DiscountedPrice) {
        const value = curr.DiscountedPrice * curr.ProductQuantity;
        const gst = (value * curr.GST) / 100;

        return acc + gst;
      }

      const value = curr.ProductQuantity * curr.PricePerUnit;
      const gst = (value * curr.GST) / 100;

      return acc + gst;

      //
    },
    0
  );

  const totalAdditionalCharges = VoucherVoucherInvoiceData?.ProductData.reduce(
    (acc, curr) => {
      return acc + curr.TotalAdditionalCostInRupee;
    },
    0
  );

  const totalTransactionPrice = VoucherVoucherInvoiceData?.ProductData.reduce(
    (acc, curr) => {
      if (curr.DiscountedPrice) {
        const value = curr.DiscountedPrice * curr.ProductQuantity;

        return acc + value;
      }

      const value = curr.ProductQuantity * curr.PricePerUnit;
      const gst = (value * curr.GST) / 100;

      return acc + value;
    }
  );

  //7 % of total transaction price As bxi charges
  const BxiCharges = (totalTransactionPrice * 7) / 100;

  //Total Deal Amount
  const totalDealAmount = BxiCharges + totalGstToTake + totalAdditionalCharges;
  useEffect(() => {
    setEaaUrl(
      "https://uidai.gov.in/images/commdoc/26_JAN_2023_Aadhaar_List_of_documents_English.pdf"
    );
  }, []);

  console.log("VoucherInvoiceData===>", VoucherInvoiceData);

  const itemDetails = [
    {
      item: "Seller Name :",
      value: VoucherVoucherInvoiceData?.SellerDetails?.SellerCompanyName,
    },
    {
      item: "Address :",
      value: VoucherVoucherInvoiceData?.SellerDetails?.Address?.AddressLine,
    },
    {
      item: "GSTIN :",

      value: VoucherVoucherInvoiceData?.SellerDetails?.GSTIN,
    },
    {
      item: "State :",
      value: VoucherVoucherInvoiceData?.SellerDetails?.Address?.State,
    },
  ];
  const pror = [
    {
      item: "Purchase Order number :",
      value: VoucherVoucherInvoiceData?.PoNumber,
    },
    {
      item: "Purchase order date :",
      value: new Date(VoucherVoucherInvoiceData?.PoDate).toLocaleDateString(),
    },
  ];

  const inr = [
    // {
    //   item: "Transportation fees ( )",
    //   value: `₹ ${VoucherVoucherInvoiceData?.Transportationdata?.transportationfee}`,
    // },
    {
      item: "GST ( )",
      value: `₹ ${totalGstToTake}`,
    },
    {
      item: "BXI Commission ( )",
      value: `₹ ${BxiCharges}`,
    },
    {
      item: "total Deal Price( )",
      value: `₹ ${totalDealAmount}`,
    },
  ];

  return (
    <Paper sx={{ width: "100%", bgcolor: "transparent" }} elevation={0}>
      <BreadCrumbHeader
        MainText="Order Summery"
        LinkText1="{splitedurl[1]}"
        LinkText2="{splitedurl[2]}"
        link1="Link1"
        link2="link2"
      />
      <Paper
        sx={{
          bgcolor: "#fff",
          boxShadow: "none",
          p: 3,
          borderRadius: "20px",
          height: "auto",
          minHeight: "520px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={0}
        // ref={componentRef}
      >
        <Box
          sx={{
            width: "96%",
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <img
            src={LeftArrow}
            alt="letf-arrow"
            style={{ width: "25px", height: "auto" }}
          />
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "21px",
              color: "#6B7A99",
            }}
          >
            Order Summary
          </Typography>
        </Box>
        <Box ref={componentRef}>
          <Grid
            container
            gap={10}
            sx={{
              py: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xl={7}
              lg={7}
              md={7}
              sm={12}
              xs={12}
              sx={{
                ...gridstyle,
                width: "830px",
                height: "170px",
                position: "relative",
              }}
            >
              <Box sx={mainbox}>
                <Typography sx={headbox}>Supplier Details</Typography>
              </Box>
              <Box sx={contentbox}>
                {/* <Typography sx={selername}>
                  {VoucherVoucherInvoiceData?.SellerDetails?.SellerCompanyName}
                </Typography> */}
                {itemDetails?.map((el, idx) => {
                  return (
                    <Box sx={mapbox} key={idx}>
                      <Typography sx={elitem}>{el.item}</Typography>
                      <Typography
                        sx={{
                          ...elvalue,
                          width: "85%",
                          textAlign: "left",
                          // maxWidth: "300px",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {el.value}
                      </Typography>
                    </Box>
                  );
                })}
                <Typography
                  sx={{
                    ...selername,
                    justifyContent: "flex-end",
                    position: "absolute",
                    mt: 8,
                  }}
                >
                  Code :{VoucherVoucherInvoiceData?.SellerDetails?.StateCode}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                ...gridstyle,
                width: "399px",
                height: "172px",
              }}
            >
              <Box sx={mainbox}>
                <Typography sx={headbox}>Purchase order</Typography>
              </Box>
              <Box sx={contentbox}>
                {pror?.map((el, idx) => {
                  return (
                    <Box sx={mapbox} key={idx}>
                      <Typography sx={elitem}>{el.item}</Typography>
                      <Typography sx={elvalue}>{el.value}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            gap={8}
            sx={{
              py: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xl={7}
              lg={7}
              md={7}
              sm={12}
              xs={12}
              sx={{
                ...gridstyle,
                width: "628px",
                height: "276px",
              }}
            >
              <Box sx={headbox2}>
                <Typography sx={detailtext}>Item Details</Typography>
                <Typography sx={detailtext2}>Details with more info</Typography>
              </Box>

              <Grid
                container
                sx={{
                  width: "100%",
                  height: "20%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "0rem 0rem 0rem 4rem",
                  justifyContent: "center",
                }}
              >
                <Grid item xl={0.5} lg={0.5} md={0.5} sm={0.5} xs={0.5}>
                  <Typography sx={{ ...headtext, textAlign: "left" }}>
                    No
                  </Typography>
                </Grid>
                <Grid item xl={5.5} lg={5.5} md={5.5} sm={5.5} xs={5.5}>
                  <Typography sx={{ ...headtext, textAlign: "left" }}>
                    ITEM
                  </Typography>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                  <Typography sx={headtext}>Quantity</Typography>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                  <Typography sx={headtext}>Rate / Unit</Typography>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                  <Typography sx={headtext}>BXI Tokens</Typography>
                </Grid>
              </Grid>

              {VoucherVoucherInvoiceData?.ProductData?.map((el, idx) => {
                const total = () => {
                  sum +=
                    Number(el.ProductQuantity) * Number(el.DiscountedPrice);
                };
                console.log(el, "el");
                return (
                  <Grid
                    container
                    sx={{
                      width: "100%",
                      height: "100px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "start",
                      padding: "0rem 0rem 0rem 4rem",
                      justifyContent: "end",
                      overflow: "scroll",
                    }}
                  >
                    <Grid item xl={0.5} lg={0.5} md={0.5} sm={0.5} xs={0.5}>
                      <Typography
                        sx={{
                          ...headtext,
                          fontWeight: 500,
                          textAlign: "left",
                          color: "#6B7A99",
                          opacity: 1,
                        }}
                      >
                        {idx + 1}
                      </Typography>
                    </Grid>
                    <Grid item xl={5.5} lg={5.5} md={5.5} sm={5.5} xs={5.5}>
                      <Typography
                        sx={{
                          ...headtext,
                          fontWeight: 500,
                          textAlign: "left",
                          color: "#6B7A99",
                          opacity: 1,
                        }}
                      >
                        {el.ProductName}
                      </Typography>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                      <Typography
                        sx={{
                          ...headtext,
                          fontWeight: 500,

                          color: "#6B7A99",
                          opacity: 1,
                        }}
                      >
                        {el.ProductQuantity}
                      </Typography>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                      <Typography
                        sx={{
                          ...headtext,
                          fontWeight: 500,

                          color: "#6B7A99",
                          opacity: 1,
                        }}
                      >
                        {el.DiscountedPrice}
                      </Typography>
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                      <Typography
                        sx={{
                          ...headtext,
                          fontWeight: 500,
                          color: "#6B7A99",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 1,
                        }}
                      >
                        <Box component="img" src={StacsOfCoinIcon} />
                        {Number(el.ProductQuantity) *
                          Number(el.DiscountedPrice)}
                        {total()}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
              {/* </Grid> */}

              <Box sx={totaltextbox}>
                <Box sx={totaltextsec}>
                  <Typography sx={totaltext}>Total</Typography>
                  <Typography
                    sx={{
                      ...totaltext,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Box component="img" src={StacsOfCoinIcon} />
                    {/* 308,000 */}
                    {sum}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                ...gridstyle,
                width: "399px",
                height: "276px",
              }}
            >
              <Box sx={headbox2}>
                <Typography sx={detailtext}>INR Details</Typography>
                <Typography sx={detailtext2}>Details with more info</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                {inr?.map((el, idx) => {
                  return (
                    <Box sx={mapbox} key={idx}>
                      <Typography sx={inrvalue}>{el.item}</Typography>
                      <Typography sx={inrvalue}>{el.value}</Typography>
                    </Box>
                  );
                })}
              </Box>
              <Box sx={totaltextbox}>
                <Box sx={totaltextsec}>
                  <Typography sx={totaltext}>Total</Typography>
                  <Typography sx={totaltext}>
                    ₹{" "}
                    {VoucherVoucherInvoiceData?.Transportationdata
                      ?.transportationfee
                      ? Number(
                          VoucherVoucherInvoiceData?.Transportationdata
                            ?.transportationfee
                        ) +
                        Number(
                          VoucherVoucherInvoiceData?.Transportationdata?.gstFee
                        )
                      : 0}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            gap={8}
            sx={{
              py: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xl={7}
              lg={7}
              md={7}
              sm={12}
              xs={12}
              sx={{
                width: "400px",
                height: "50px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(true);
                }}
                sx={{
                  width: "100%",
                  height: "100%",
                  background: "#445FD2",
                  borderRadius: "10px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#FFFFFF",
                  textTransform: "none",
                }}
              >
                Pay now
              </Button>
              <Modal
                open={open}
                onClose={() => {
                  setOpen(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    background: "#fff",
                    width: "60%",
                    height: "50%",
                    mx: "auto",
                    mt: 10,
                    gap: "10px",
                  }}
                >
                  <Box>
                    <iframe src={eaaUrl} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      gap: "10px",
                    }}
                  >
                    <Button variant="contained">Deny</Button>
                    <Button variant="contained">Approve</Button>
                  </Box>
                </Box>
              </Modal>
            </Grid>
            <Grid
              item
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
              sx={{
                width: "400px",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button variant="outlined" sx={btn} onClick={handlePrint}>
                <Box
                  component={"img"}
                  src={PrintIcon}
                  sx={ButtonIconStyle}
                ></Box>
                <Typography sx={btntext}>Print</Typography>
              </Button>
              <Button variant="outlined" sx={btn} onClick={handlePrint}>
                <Box
                  component={"img"}
                  src={DownloadIcon}
                  sx={ButtonIconStyle}
                ></Box>
                <Typography sx={btntext}>Download</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xl={7} lg={7} md={7}>
              <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                  width: "100%",
                  mx: "auto",
                  height: "100%",
                  background: "#445FD2",
                  borderRadius: "10px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#FFFFFF",
                  textTransform: "none",
                  mt: 0.5,
                  ml: "20px",
                }}
              >
                buy now
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Paper>
  );
};

export default OrderSummaryVoucherDetails;

const ButtonIconStyle = {
  width: {
    xl: "24px",
    lg: "24px",
    md: "20px",
    sm: "20px",
    xs: "18px",
  },
  height: "auto",
};

const headtext = {
  width: "100%",
  textAlign: "center",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "20px",
  color: "#6B7A99",
  opacity: 0.4,
};

const mainbox = {
  width: "100%",
  height: "48px",
  background: "#F3F6F9",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const headbox = {
  width: "90%",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#6B7A99",
};

const contentbox = {
  width: "100%",
  height: "70%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  // gap: "3px",
};

const headbox2 = {
  width: "100%",
  height: "64px",
  background: "#F3F6F9",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const selername = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center",
  color: "#6B7A99",
  width: "90%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  opacity: 0.7,
};

const mapbox = {
  width: "90%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const elitem = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center",
  color: "#6B7A99",
  opacity: 0.7,
};

const totaltext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center",
  color: "#6B7A99",
};

const totaltextbox = {
  width: "100%",
  height: "15%",
  borderTop: "1px solid rgba(149, 144, 168, 0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

const elvalue = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center",
  color: "#6B7A99",
  opacity: 0.7,
};

const detailtext = {
  width: "90%",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#6B7A99",
};

const detailtext2 = {
  width: "90%",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",
  color: "#6B7A99",
  opacity: 0.4,
};

const totaltextsec = {
  width: "90%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const btntext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "21px",
  textAlign: "center",
  color: "#445FD2",
  textTransform: "none",
};

const btn = {
  width: "40%",
  height: "100%",
  border: "1px solid #445FD2",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "row",
  gap: "10px",
};

const inrvalue = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center",
  color: "#6B7A99",
};

const gridstyle = {
  border: "1px solid rgba(24, 2, 12, 0.05)",
  borderRadius: "10px 10px 0px 0",
};
