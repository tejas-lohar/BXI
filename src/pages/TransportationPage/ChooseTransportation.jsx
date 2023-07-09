import React, { useEffect, useState } from "react";
import PaymentArrow from "../../assets/Transportation/paymentArrow.svg";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Button,
  Paper,
  Input,
} from "@mui/material";
import SSlogo from "../../assets/Transportation/sslogo.svg";
import Shiprocket from "../../assets/Transportation/shiprocketlogo.svg";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ColorCircle from "../../assets/Transportation/colorcircle.png";
import Circle from "../../assets/Transportation/circle.svg";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { useNavigate, useParams } from "react-router-dom";
import { useGetInvoiceById } from "../../Hooks/Invoices/useGetInvoiceById";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useEffectOnce } from "react-use";
import { TransportationStyle } from "./ChooseTransportationStyle.js";
import { useGetCompanyDetails } from "../../Hooks/Auth";
import useGetCompanyTypeData from "../../Hooks/CompanyData/useGetCompanyTypeData";
import CompanyName from "../../components/CompanyName";

function ChooseTransportation() {
  // const classes = TransportStyle();
  const { id } = useParams();
  const navigate = useNavigate();
  const [boxone, setboxone] = useState(true);
  const [boxsecond, setboxsecond] = useState(false);
  const [shipRocketData, setShipRocketData] = useState([]);
  const [shiprocket, setshiprocket] = useState([]);
  const [shiprocketDown, setShiprocketdown] = useState(false);
  const [TransporterId, setTransporterId] = useState("");

  async function getShiprocketData() {
    await axios.get(`purchase/get_shiprocket_charges/${id}`).then((res) => {
      console.log("shiprocketdata", res);
      setShipRocketData(res?.data);
      if (res?.data?.message?.includes("429")) {
        setShiprocketdown(true);
      }
      // setshiprocket(
      //   Object.entries(res.data).map(([key, value]) => ({ key, value }))
      // );
    });
  }

  console.log("TransporterId", TransporterId);

  const { data: CompanyData } = useGetCompanyDetails();
  const { data: CompanyTypeData } = useGetCompanyTypeData(
    CompanyData?.data?.companyType
  );

  const NaviGateFunction = (InvoiceId) => {
    if (CompanyTypeData?.data?.CompanyTypeName === "Media") {
      navigate(`/home/mediaordersummerydetails/${InvoiceId}`);
    } else {
      navigate(`/home/ordersummerydetails/${InvoiceId}`);
    }
  };

  useEffectOnce(() => {
    getShiprocketData();
  }, []);

  const {
    data: InvoiceData,
    isLoading: InvoiceLoading,
    isError: InvoiceDataLoading,
  } = useGetInvoiceById(id);

  const AddChoosedTransportDataToInvoice = () => {
    axios
      .put(`invoices/add_transportation_data_to_invoice/${id}`, {
        BuyerChoosedTransportation: {
          TransportationType: "Seller",
          Transportationfee: InvoiceData?.Transportationdata?.transportationfee,
          GSTFee: InvoiceData?.Transportationdata?.gstFee,
          TotalWithGST:
            Number(InvoiceData?.Transportationdata?.transportationfee) +
            (InvoiceData?.Transportationdata?.gstFee *
              Number(InvoiceData?.Transportationdata?.transportationfee)) /
              100,
          DeliveryTime: InvoiceData?.Transportationdata?.deliveryTime,
        },
      })
      .then((res) => {
        if (res?.data === "Success") {
          NaviGateFunction(InvoiceData?._id);
        } else {
          alert("Something went wrong");
        }
      });
  };

  useEffect(() => {
    if (!InvoiceData?.Transportationdata) {
      setboxsecond(false);
    }
  }, [InvoiceData]);

  const pincode =
    InvoiceData?.BuyerDetails?.BuyerCompanyDetailedAddress?.pincode;
  const addressLine =
    InvoiceData?.BuyerDetails?.BuyerCompanyDetailedAddress?.addressLine;
  const city = InvoiceData?.BuyerDetails?.BuyerCompanyDetailedAddress?.district;
  const state = InvoiceData?.BuyerDetails?.BuyerCompanyDetailedAddress?.state;
  const country =
    InvoiceData?.BuyerDetails?.BuyerCompanyDetailedAddress?.country;

  const handleclick1 = () => {
    setboxone(true);
    setboxsecond(false);
    setshiprocket(false);
  };

  const handleclick2 = () => {
    setboxone(false);
    setboxsecond(true);
    setshiprocket(true);
  };

  async function CreateShipment() {
    const FindObjectFromTransponsterId = Object.entries(shipRocketData).find(
      ([key, value]) => value.transporter_id == TransporterId
    );
    console.log(
      "FindObjectFromTransponsterId",
      FindObjectFromTransponsterId.at(1)
    );
    await axios
      .post("purchase/create_shipment_order", {
        id,
        TransportersDetails: FindObjectFromTransponsterId.at(1),
      })
      .then((res) => {
        console.log("shippppppppppppppppp", res);
      });

    // navigate(`/home/paymentprofile/${id}`);
  }

  const price = [
    {
      item: "GST",
      value: InvoiceData?.Transportationdata?.gstFee
        ? InvoiceData?.Transportationdata?.gstFee + "%"
        : "0%",
    },
    {
      item: "Transportation fees",
      value: InvoiceData?.Transportationdata?.transportationfee,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        boxShadow: "none",
        background: "transparent",
      }}
    >
      <BreadCrumbHeader MainText={"Choose Transportation"} />
      <Box
        sx={{
          bgcolor: "#fff",
          position: "relative",
          py: 5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
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

          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                color: "#6B7A99",
                fontSize: "20px",
                fontWeight: "500",
                marginTop: "2rem",
              }}
            >
              Choose your mode of transportation
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "#B5BCCC",
                fontFamily: "Poppins",
                mt: 1,
              }}
            >
              Your Good Office May Decide the Best You Feel and Want to Go Ahead
              with Logistic Services
            </Typography>
          </Box>
        </Box>
        <Paper
          sx={{
            width: "80%",
            mx: "auto",
            boxShadow: "none",
            background: "transparent",
          }}
          elevation={0}
        >
          <Box
            sx={{
              width: "100%",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                height: "auto",
                minHeight: "100px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Box sx={adressbox}>
                <Typography sx={CommonTextStyle}>Region</Typography>
                <Input disableUnderline sx={adressinput} value={country} />
              </Box>
              <Box sx={adressbox}>
                <Typography sx={CommonTextStyle}>State</Typography>
                <Input disableUnderline sx={adressinput} value={state} />
              </Box>
              <Box sx={adressbox}>
                <Typography sx={CommonTextStyle}>City</Typography>
                <Input disableUnderline sx={adressinput} value={city} />
              </Box>
              <Box sx={adressbox}>
                <Typography sx={CommonTextStyle}>Landmark</Typography>
                <Input disableUnderline sx={adressinput} value={addressLine} />
              </Box>
              <Box sx={adressbox}>
                <Typography sx={CommonTextStyle}>Pin code</Typography>
                <Input disableUnderline sx={adressinput} value={pincode} />
              </Box>
            </Box>
          </Box>

          <Box
            container
            sx={{
              height: "auto",
              display: "flex",
              marginTop: "3rem",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              width: "100%",
            }}
          >
            {InvoiceData?.Transportationdata ? (
              <Box
                onClick={handleclick1}
                sx={{
                  border: boxone ? "1px solid #D9D9D9" : "1px solid #D9D9D9",
                  borderRadius: "10px",
                  width: "100%",
                  maxWidth: "440px",
                  height: "100%",
                  minHeight: "200px",
                  display: "flex",

                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    width: "17%",
                  }}
                >
                  <Box
                    sx={{
                      marginTop: "16px",
                      width: "60px",
                      height: "60px",
                      mx: "auto",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={CompanyData?.data?.CompanyAvatar?.url}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        maxWidth: "60px",
                        maxHeight: "60px",
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "83%",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        color: boxone
                          ? " #6B7A99"
                          : " rgba(107, 122, 153, 0.5)",
                        fontSize: "18px",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                      }}
                    >
                      Company Transportation
                    </Typography>
                    {boxone ? (
                      <img
                        src={ColorCircle}
                        alt="MyImage"
                        style={{ height: " fit-content" }}
                      />
                    ) : (
                      <img
                        src={Circle}
                        alt="MyImage"
                        style={{ height: " fit-content" }}
                      />
                    )}
                  </Box>
                  {/* <Typography
                    sx={{
                      color: boxone ? " #475467" : " rgba(107, 122, 153, 0.5)",
                      fontSize: "13px",
                      fontFamily: "Poppins",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur.
                  </Typography> */}
                  <Typography
                    sx={{
                      color: boxone ? " #445FD2 " : "rgba(71, 84, 103, 0.5);",
                      fontSize: "14px",
                      textAlign: "left",
                      fontFamily: "Poppins",
                      mt: 2,
                    }}
                  >
                    This are the Delivery Logistic Charges Provided By the
                    Seller of Whose Products / Services You have Raise the Said
                    Purchase Order.
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box
                onClick={handleclick1}
                sx={{
                  border: boxone ? "1px solid #D9D9D9" : "1px solid #D9D9D9",
                  borderRadius: "10px",
                  width: "100%",
                  maxWidth: "440px",
                  height: "100%",
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box
                  sx={{
                    width: "17%",
                    mx: "auto",
                    pl: "05%",
                    pt: "05%",
                  }}
                >
                  {boxone ? (
                    <CompanyName
                      CompanyName={
                        InvoiceData?.SellerDetails?.SellerCompanyName
                      }
                    />
                  ) : (
                    <CompanyName
                      CompanyName={
                        InvoiceData?.SellerDetails?.SellerCompanyName
                      }
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    width: "83%",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        color: boxone
                          ? " #6B7A99"
                          : " rgba(107, 122, 153, 0.5)",
                        fontSize: "18px",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                      }}
                    >
                      Company Transportation
                    </Typography>
                    {boxone ? (
                      <img
                        src={ColorCircle}
                        alt="MyImage"
                        style={{ height: " fit-content" }}
                      />
                    ) : (
                      <img
                        src={Circle}
                        alt="MyImage"
                        style={{ height: " fit-content" }}
                      />
                    )}
                  </Box>

                  <Typography
                    sx={{
                      color: boxone ? " #445FD2 " : "rgba(71, 84, 103, 0.5);",
                      fontSize: "14px",
                      textAlign: "left",
                      fontFamily: "Poppins",
                      mt: 2,
                    }}
                  >
                    This are the Delivery Logistic Charges Avialblr from
                    Shiprocket Logistic Company Partners, They would help you
                    with Transport / Logistic services as Third Party to do the
                    Needful for the Said Purchase Order Raised by you to this
                    Seller.
                  </Typography>
                </Box>
              </Box>
            )}
            <Box
              onClick={handleclick2}
              // {isHide}
              sx={{
                border: boxone ? "1px solid #D9D9D9" : "1px solid #D9D9D9",
                borderRadius: "10px",
                width: "100%",
                maxWidth: "440px",
                height: "100%",
                minHeight: "200px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{
                  width: "17%",
                }}
              >
                <Box
                  sx={{
                    marginTop: "16px",
                    width: "100%",
                    mx: "auto",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {boxsecond ? (
                    <img src={Shiprocket} alt="logo" />
                  ) : (
                    <img
                      src={Shiprocket}
                      alt="logo"
                      style={{ opacity: "0.5" }}
                    />
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  width: "83%",
                  p: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      color: boxsecond
                        ? " #6B7A99"
                        : " rgba(107, 122, 153, 0.5)",
                      fontSize: "18px",
                      fontFamily: "Poppins",
                      fontWeight: 400,
                    }}
                  >
                    ShipRocket
                  </Typography>
                  {boxsecond ? (
                    <img
                      src={ColorCircle}
                      alt="MyImage"
                      style={{ height: " fit-content" }}
                    />
                  ) : (
                    <img
                      src={Circle}
                      alt="MyImage"
                      style={{ height: " fit-content" }}
                    />
                  )}
                </Box>

                <Typography
                  sx={{
                    color: boxsecond ? " #445FD2 " : "rgba(71, 84, 103, 0.5);",
                    fontSize: "14px",
                    textAlign: "left",
                    fontFamily: "Poppins",
                    mt: 2,
                  }}
                >
                  This are the Delivery Logistic Charges Avialblr from
                  Shiprocket Logistic Company Partners, They would help you with
                  Transport / Logistic services as Third Party to do the Needful
                  for the Said Purchase Order Raised by you to this Seller.
                </Typography>
              </Box>
            </Box>
          </Box>
          {!shiprocketDown ? (
            <>
              {InvoiceData?.Transportationdata && boxone && !boxsecond ? (
                <Box
                  sx={{
                    width: "100%",
                    mx: "auto",
                    border: " 1px solid rgba(24, 2, 12, 0.05)",
                    mt: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Box sx={headbox2}>
                    <Typography
                      sx={{
                        ...tableBottomDataStyle,
                        fontSize: "16px",
                        lineHeight: "24px",
                      }}
                    >
                      Price Details ({InvoiceData?.ProductIds?.length} items)
                    </Typography>
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
                    {price?.map((el, idx) => {
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
                        {" "}
                        {Number(
                          InvoiceData?.Transportationdata?.transportationfee
                        ) +
                          (InvoiceData?.Transportationdata?.gstFee *
                            Number(
                              InvoiceData?.Transportationdata?.transportationfee
                            )) /
                            100}{" "}
                        ₹
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      py: 3,
                      width: "100%",
                      maxWidth: "500px",
                      mx: "auto",
                    }}
                  >
                    <Button
                      sx={TransportationStyle.ConfirmButtonStyle}
                      onClick={AddChoosedTransportDataToInvoice}
                    >
                      Confirm
                    </Button>

                    <Button sx={TransportationStyle.CancelButtonStyle}>
                      Back
                    </Button>
                  </Box>
                </Box>
              ) : (
                <>
                  {boxone === true ? (
                    <Box
                      sx={{
                        width: "100%",
                        mx: "auto",
                        border: " 1px solid rgba(24, 2, 12, 0.05)",
                        mt: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Box sx={headbox2}>
                        <Typography
                          sx={{
                            ...tableBottomDataStyle,
                            fontSize: "16px",
                            lineHeight: "24px",
                          }}
                        >
                          Price Details ({InvoiceData?.ProductIds?.length}{" "}
                          items)
                        </Typography>
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
                        {price?.map((el, idx) => {
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
                          <Typography sx={totaltext}>₹ </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: "auto",
                        maxWidth: "800px",
                        height: "auto",
                        mx: "auto",
                        border: "1px solid rgba(24, 2, 12, 0.05)",
                        mt: 4,
                        py: 2,
                      }}
                    >
                      <FormControl
                        sx={{
                          width: "800px",
                          maxWidth: "800px",
                          mx: "auto",
                        }}
                      >
                        <FormLabel id="demo-radio-buttons-group-label">
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: "20px",
                              lineHeight: "30px",
                              color: "#6B7A99",
                            }}
                          >
                            Choose Your Delivery Partner
                          </Typography>
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                          onChange={(e) => {
                            setTransporterId(e.target.value);
                          }}
                          sx={{
                            width: "100%",
                            mt: 1,
                          }}
                        >
                          {shipRocketData &&
                            Object.values(shipRocketData)?.map(
                              (item, index) => {
                                console.log(
                                  "shiprocketdata",
                                  item?.transporter_id
                                );
                                if (item.mode_name === "air") return null;
                                return (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      gap: "10px",
                                      width: "100%",
                                      mx: "auto",
                                    }}
                                  >
                                    <Typography
                                      sx={{ ...deliverytext, width: "40%" }}
                                    >
                                      Delivery Option :{" "}
                                      <span
                                        style={{
                                          ...deliverytext2,
                                          opacity: "0.5",
                                        }}
                                      >
                                        {item.common_name}
                                      </span>
                                    </Typography>
                                    <Typography
                                      sx={{ ...deliverytext, width: "20%" }}
                                    >
                                      Price :{" "}
                                      <span style={deliverytext2}>
                                        Rs. {item.rates}
                                      </span>
                                    </Typography>
                                    {/* <Typography
                                      sx={{ ...deliverytext, width: "20%" }}
                                    >
                                      Days :{" "}
                                      <span
                                        style={{
                                          fontFamily: "Poppins",
                                          fontStyle: "normal",
                                          fontWeight: 500,
                                          fontSize: "16px",
                                          lineHeight: "24px",
                                          color: "#6B7A99",
                                        }}
                                      >
                                        5-7 Days
                                      </span>
                                    </Typography> */}
                                    <FormControlLabel
                                      value={item.transporter_id}
                                      control={<Radio />}
                                      sx={{
                                        width: "20%",
                                        display: "flex",
                                        justifyContent: "flex-start",
                                      }}
                                      // label={`${item.common_name},      Price:${item.rates}(INR)  `}
                                    />
                                  </Box>
                                );
                              }
                            )}
                        </RadioGroup>
                      </FormControl>

                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                        }}
                      >
                        Important Note: Shipment will take 5-7 working days
                        after payments and shipment is ready to collect from
                        seller side
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          py: 3,
                          gap: "50px",
                          width: "100%",
                          maxWidth: "800px",
                          mx: "auto",
                        }}
                      >
                        <Button
                          sx={TransportationStyle.ConfirmButtonStyle}
                          onClick={CreateShipment}
                        >
                          Confirm
                        </Button>

                        <Button sx={TransportationStyle.CancelButtonStyle}>
                          Back
                        </Button>
                      </Box>
                    </Box>
                  )}
                </>
              )}
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography sx={tableheading}>Shiprocket is down</Typography>
              <Button
                variant="contained"
                sx={{
                  borderRedius: "6px",
                  fontFamily: "Poppins",
                  textTransform: "none",
                  border: "1px solid #445FD2",
                  backgroundColor: "#445FD2",
                  color: "white",
                  fontWeight: 500,
                  fontSize: "14px",
                  mx: "auto",
                }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Click to Refresh
              </Button>
            </Box>
          )}

          {/* {InvoiceData?.Transportationdata ||
            boxone ||
            boxsecond ||
            !shiprocketDown( */}

          {/* )} */}
        </Paper>
      </Box>
    </Paper>
  );
}

export default ChooseTransportation;

const tableheading = {
  color: "red",
  fontFamily: "Poppins",
  fontWeight: 500,
  fontSize: "large",
  textAlign: "center",
  my: 3,
};

const tableBottomDataStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  color: "#6B7A99",
};

const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "21px",
  color: "#6B7A99",
};

const adressbox = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  mt: 1,
  maxWidth: "140px",
};

const adressinput = {
  width: "150px",
  height: "42px",
  background: "#F9F9F9",
  borderRadius: "9px",
  px: 1,
  color: "#445fd2",
  fontSize: "12px",
};

const deliverytext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#6B7A99",
};

const deliverytext2 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#6B7A99",
};

const mapbox = {
  width: "90%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
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

const totaltextsec = {
  width: "90%",
  height: "60px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
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

const headbox2 = {
  width: "100%",
  height: "30px",
  display: "flex",
  width: "90%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  mt: 2,
};
