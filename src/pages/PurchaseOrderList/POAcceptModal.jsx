import React, { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import {
  Paper,
  Box,
  Typography,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useMutatePurchaseOrder } from "../../Hooks/PurchaseOrderActions/useMutatePurchaseOrder";
import { useGetOrderSummaryByIdForBuyer } from "../../Hooks/OrderActions/useGetOrderSummaryByIdForBuyer";
import { styled } from "@mui/material/styles";
import { notifications } from "../../redux/action/Notification/notification";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const StyledLabel = styled("span")({
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6B7A99",
});

const POAcceptModal = (props) => {
  let ProductIdHere = props?.ProductId;
  const [open, setOpen] = React.useState(false);
  const [openrejectModal, setOpenRejectModal] = useState(false);
  const [openpartOrder, setOpenPartOrder] = React.useState(false);
  const [notificationOn, setNotificationOn] = useState("");
  const navigate = useNavigate();
  let dispatch = useDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isTransportation, setIsTransportation] = useState("true");
  const [isPartialState, setIsPartialState] = useState(false);

  const handleInputChange = (event, name) => {
    const { value } = event.target;
    setPackagingObject((prevObject) => ({
      ...prevObject,
      [name]: value,
    }));
  };

  const handleInputChangeTransportation = (event, name) => {
    const { value } = event.target;
    setTransportationdata((prevObject) => ({
      ...prevObject,
      [name]: value,
    }));
  };

  const InputBoxArray = [
    {
      lable: "Packaging Weight",
      name: "packagingweight",
      size: "full",
      type: "number",
    },
    {
      lable: "Packaging costs",
      name: "packagingcosts",
      size: "full",
      type: "number",
    },
    {
      lable: "Number of boxes",
      name: "numberofboxes",
      size: "full",
      type: "number",
    },
    {
      lable: "Pickeup Date",
      name: "pickupdate",
      size: "full",
      type: "date",
    },
    { lable: "Box Height", name: "boxheight", size: "full", type: "number" },
    {
      lable: "Box Width",
      name: "boxwidth",
      size: "full",
      type: "number",
    },
    {
      lable: "Box Length",
      name: "boxlength",
      size: "full",
      type: "number",
    },
  ];

  const InputArrayTwo = [
    {
      lable: "Transportation fees ( INR )",
      name: "transportationfee",
      size: "full",
      type: "text",
    },
    {
      lable: "GST Rate ( INR )",
      name: "gstFee",
      size: "full",
      type: "text",
    },
    {
      lable: "Delivery Time",
      name: "deliveryTime",
      size: "full",
      type: "number",
    },
  ];

  const { data: OrderSummarydata, isLoading: orderSummaryLoading } =
    useGetOrderSummaryByIdForBuyer(props?.ProductId);

  const [quantity, setQuantity] = useState({
    productId: "",
    quantity: "",
  });

  const [QuantityArr, setQuantityArr] = useState([]);

  async function openpartorderfun() {
    setOpenPartOrder(true);
  }

  const {
    data: OrderUpdateData,
    isLoading,
    error,
    mutate: OrderUpdateMutate,
  } = useMutatePurchaseOrder();

  const handleCloseRejectModal = () => {
    setOpenRejectModal(false);
  };

  const [PackgingDataObject, setPackagingObject] = useState({
    packagingweight: "",
    packagingcosts: "",
    numberofboxes: "",
    pickupdate: "",
    boxheight: "",
    boxwidth: "",
    boxlength: "",
  });

  const [trasportationdata, setTransportationdata] = useState({
    transportationfee: "",
    gstFee: "",
    deliveryTime: "",
  });

  const [InsuranceData, setInsuranceData] = useState();

  async function UpdateOrRejectThePurchaseOrder(props) {
    if (
      PackgingDataObject?.packagingweight === "" ||
      PackgingDataObject?.packagingcosts === "" ||
      PackgingDataObject?.numberofboxes === "" ||
      PackgingDataObject?.pickupdate === "" ||
      PackgingDataObject?.boxheight === "" ||
      PackgingDataObject?.boxwidth === "" ||
      PackgingDataObject?.boxlength === ""
    ) {
      alert("Please fill Packaging details");
      return;
    }

    if (isTransportation === "true") {
      if (
        trasportationdata.transportationfee === "" ||
        trasportationdata.gstFee === "" ||
        trasportationdata.deliveryTime === ""
      ) {
        alert("Please fill all the fields");
        return;
      } else {
        try {
          await axios
            .put(
              `purchase/update_purchase_order_accepted_by_buyer_for_seller_company`,
              {
                data: {
                  status: props,
                  PackgingDataObject,
                  Transportationdata: isTransportation
                    ? trasportationdata
                    : null,
                  InsuranceData,
                  OrderSummaryId: ProductIdHere,
                  IsPartialOrder: false,
                  PartialOrderDetails: QuantityArr,
                },
              },
              { withCredentials: true }
            )
            .then((res) => {
              console.log("new resssss", res);
            if (res.data === "success") {
                toast.success("Order Updated", {
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
                  navigate("/home/invoicenotification");
                }, 2000);
              } else {
                toast.error("Please fill all the details", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              }
            });
        } catch (error) {
          toast.error("Please fill all the details", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } else {
      try {
        await axios
          .put(
            `purchase/update_purchase_order_accepted_by_buyer_for_seller_company`,
            {
              data: {
                status: props,
                PackgingDataObject,
                Transportationdata: isTransportation ? trasportationdata : null,
                InsuranceData,
                OrderSummaryId: ProductIdHere,
                IsPartialOrder: false,
                PartialOrderDetails: QuantityArr,
              },
            },
            { withCredentials: true }
          )
          .then((res) => {
            // console.log("new resssss", res);
            // if (res.data === "success") {
            //   toast.success("Order Updated", {
            //     position: "top-center",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //   });
            //   setTimeout(() => {
            //     navigate("/home/invoicenotification");
            //   }, 2000);
            // } else {
            //   toast.error("Please fill all the details", {
            //     position: "top-center",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //   });
            // }
          });
      } catch (error) {
        toast.error("Please fill all the details", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }

  useEffect(() => {
    if (notificationOn !== "") {
      console.log("called");
      const sellerId = OrderSummarydata?.BuyerDetails?.BuyerCompanyId;
      const buyerId = OrderSummarydata?.SellerDetails?.SellerCompanyId;
      const type = "Order";

      let message = "";
      if (notificationOn === "Accepted") {
        message = `Congratulations, the PO you generated has been confirmed by ${OrderSummarydata?.SellerDetails?.SellerCompanyName}`;
      } else if (notificationOn === "Rejected") {
        message = `Sorry, PO generated by you has been rejected by ${OrderSummarydata?.SellerDetails?.SellerCompanyName}`;
      }

      dispatch(notifications(sellerId, buyerId, message, type));
    }
  }, [notificationOn]);

  return (
    <div>
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
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss={true}
          draggable={true}
          pauseOnHover={true}
        />

        <Button onClick={handleOpen} sx={ButtonStyleForAcceptAndReject}>
          Accept
        </Button>
        <Button
          onClick={() => setOpenRejectModal(true)}
          sx={{
            ...ButtonStyleForAcceptAndReject,
            bgcolor: "#fff",
            border: "1px solid #2261A2",
            color: "#2261A2",
          }}
        >
          Reject
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          top: "10%",
          width: "80%",
          height: "100%",
          overflowY: "scroll",
          mx: "auto",
        }}
      >
        <Paper
          sx={{
            bgcolor: "white",
            width: "100%",
            mx: "auto",
            py: 0,
            height: "100%",
            maxHeight: "80vh",
            overflowY: "scroll",
          }}
        >
          <Box
            sx={{
              float: "right",
              position: "absolute",
              right: "0px",
            }}
          >
            <CloseIcon
              sx={{
                color: "#667085",
                fontSize: "25px",
                cursor: "pointer",
              }}
              onClick={() => {
                if (open === false) {
                  setOpen(true);
                } else {
                  setOpen(false);
                }
              }}
            />
          </Box>

          <div style={{ background: "white", width: "90%", margin: "auto" }}>
            <Box
              sx={{
                width: "95%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                py: 3,
              }}
            ></Box>
            <Box sx={{ py: 3 }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#505050",
                }}
              >
                Packaging Information
              </Typography>
              {/* <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "10px",
                  lineHeight: "15px",
                  color: "rgba(133, 133, 133, 0.67)",
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Interdum est est lorem
                nunc et lectus malesuada quis.
              </Typography>*/}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignContent: "center",
                alignItems: "center",
                gap: "5%",
                flexWrap: "wrap",
              }}
            >
              {InputBoxArray?.map((input, index) => {
                return (
                  <Box
                    sx={{
                      width: "100%",
                      minWidth: "150px",
                      maxWidth: "150px",
                      marginTop: "20px",
                    }}
                  >
                    <Typography sx={{ ...FeeBoxText, textAlign: "left" }}>
                      {input?.lable}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        height: "40px",
                        border: "1px solid #E8E8E8",
                        borderRadius: "10px",
                        mt: 0.7,
                        px: 1,
                      }}
                    >
                      <Input
                        required
                        placeholder="10"
                        disableUnderline
                        inputProps={{ min: 0 }}
                        sx={InputSx}
                        key={index}
                        name={input.name}
                        size={input.size}
                        type={input.type}
                        value={PackgingDataObject[input.name]}
                        onChange={(event) =>
                          handleInputChange(event, input.name)
                        }
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* {OrderSummarydata?.SellerOrderStatus !== "Accepted" &&
            OrderSummarydata?.SellerOrderStatus !== "Rejected" ? ( */}
            <Box
              sx={{
                width: "95%",
                mx: "auto",
              }}
            >
              <Box sx={{ py: 3 }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#505050",
                  }}
                >
                  Transportation fees
                </Typography>
                {/* <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "10px",
                    lineHeight: "15px",
                    color: "rgba(133, 133, 133, 0.67)",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur. Interdum est est lorem
                  nunc et lectus malesuada quis.
                </Typography> */}
              </Box>
              <FormControl>
                <RadioGroup
                  sx={{
                    width: "100%",
                    minWidth: "600px",
                    display: {
                      xl: "flex",
                      lg: "flex",
                      md: "flex",
                      sm: "grid",
                      xs: "grid",
                    },
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    bgcolor: "transparent",
                    alignItems: "center",
                    alignContent: "center",
                    flexDirection: "row",
                    mt: 2,
                    gap: "20px",
                  }}
                  defaultValue={true}
                  onChange={(e) => setIsTransportation(e.target.value)}
                >
                  <FormControlLabel
                    value={true}
                    control={
                      <Radio
                        sx={{
                          color: "#445FD2",
                          "& .MuiSvgIcon-root": {
                            fontSize: 22,
                          },
                        }}
                      />
                    }
                    label={
                      <StyledLabel>Add your transportation costs </StyledLabel>
                    }
                  />
                  <FormControlLabel
                    value={false}
                    control={
                      <Radio
                        sx={{
                          color: "#445FD2",
                          "& .MuiSvgIcon-root": {
                            fontSize: 22,
                          },
                        }}
                      />
                    }
                    label={
                      <StyledLabel>we do not offer transportation</StyledLabel>
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            {/* ) : null} */}

            {isTransportation === "true" ? (
              <>
                <Box sx={{ py: 1, marginTop: "40px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#505050",
                    }}
                  >
                    Transportation Fees
                  </Typography>
                  {/* <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "10px",
                      lineHeight: "15px",
                      color: "rgba(133, 133, 133, 0.67)",
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur. Interdum est est
                    lorem nunc et lectus malesuada quis.
                  </Typography> */}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    alignItems: "center",
                    gap: "5%",
                    flexWrap: "wrap",
                  }}
                >
                  {InputArrayTwo?.map((input, index) => {
                    return (
                      <Box
                        sx={{
                          width: "100%",
                          minWidth: "200px",
                          maxWidth: "200px",
                          marginTop: "20px",
                        }}
                      >
                        <Typography sx={{ ...FeeBoxText, textAlign: "left" }}>
                          {input?.lable}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            height: "40px",
                            border: "1px solid #E8E8E8",
                            borderRadius: "10px",
                            mt: 1,
                            px: 1,
                          }}
                        >
                          <Input
                            required
                            placeholder="10"
                            disableUnderline
                            inputProps={{ min: 0 }}
                            sx={InputSx}
                            key={index}
                            name={input.name}
                            size={input.size}
                            type={input.type}
                            value={PackgingDataObject[input.name]}
                            onChange={(event) =>
                              handleInputChangeTransportation(event, input.name)
                            }
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </>
            ) : null}

            <Box sx={{ py: 1, marginTop: "40px" }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#505050",
                }}
              >
                Insurance Fees
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "10px",
                  lineHeight: "15px",
                  color: "rgba(133, 133, 133, 0.67)",
                }}
              >
                If the goods are insured mentioned the cost of insurance.
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
                minWidth: "200px",
                maxWidth: "200px",
                marginTop: "20px",
              }}
            >
              <Typography sx={{ ...FeeBoxText, textAlign: "left" }}>
                Cost of Insurance ( INR )
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  height: "40px",
                  border: "1px solid #E8E8E8",
                  borderRadius: "10px",
                  mt: 1,
                  px: 1,
                }}
              >
                <Input
                  required
                  placeholder="10"
                  disableUnderline
                  inputProps={{ min: 0 }}
                  sx={InputSx}
                  name="insurance"
                  size="full"
                  type="number"
                  value={InsuranceData}
                  onChange={(event) => setInsuranceData(event?.target?.value)}
                />
              </Box>
            </Box>

            <Box
              sx={{
                mt: "50px",
                mx: "auto",
                maxWidth: "400px",
              }}
            >
              {openpartOrder ? (
                <div>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "start",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "14px",
                          lineHeight: "28px",
                          color: "#6B7A99",
                        }}
                      >
                        Please update your available quantity here
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {OrderSummarydata?.ProductData?.map((row) => {
                      console.log(row);
                      return (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              flexDirection: "row",
                              mt: 1,
                              p: 1,
                            }}
                          >
                            <Box
                              sx={{
                                background: "#FFFFFF",
                                display: "flex",
                                flexDirection: "row",
                                borderRadius: "14px",
                                width: "100%",
                              }}
                            >
                              <Typography
                                sx={{ ...dialogtexthead, width: "70%" }}
                              >
                                Product Name
                              </Typography>
                              <Typography
                                sx={{
                                  ...dialogtexthead,
                                  width: "30%",
                                  textAlign: "end",
                                }}
                              >
                                Quantity
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              width: "100%",
                              flexDirection: "row",
                              gap: "10px",
                              overflow: "none",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                background: "#FFFFFF",
                                border: "0.73322px solid #EDEFF2",
                                borderRadius: "14.5px",
                                width: "300px",
                                height: "50px",
                              }}
                            >
                              <Typography
                                sx={{
                                  ...dialogtext,
                                  ml: 2,
                                  maxWidth: "300px",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {row?.ProductName}
                              </Typography>
                            </Box>
                            <TextField
                              sx={{
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    border: "0.711956px solid #E6E9EE",
                                    borderRadius: "8.5px",
                                    textAlign: "center",
                                  },
                                },
                                width: "100px",
                                textAlign: "center",
                              }}
                              defaultValue={row?.ProductQuantity}
                              onChange={(e) => {
                                setQuantity({
                                  Id: row?.ProductId,
                                  quantity: e.target.value,
                                });
                              }}
                            />
                          </Box>
                        </>
                      );
                    })}
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                      mt: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ ...reqbtn, width: "130px" }}
                      onClick={() => {
                        setIsPartialState(true);
                        setQuantityArr([...QuantityArr, quantity]);
                      }}
                    >
                      Update Quantity
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        ...reqbtn,
                        fontWeight: 700,
                        background: "none",
                        border: "0.7px solid #EBEDEE",
                        color: "#2261A2",
                      }}
                      onClick={() => setOpenPartOrder(false)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </div>
              ) : null}
            </Box>
            <Box
              sx={{
                width: "100%",
                mt: 3,
                pb: 3,
              }}
            >
              <Box
                sx={{
                  maxWidth: "600px",
                  mx: "auto",
                  gap: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  height: "100%",
                }}
              >
                <Box
                  sx={ButtonStyleForAcceptAndReject}
                  onClick={() => {
                    UpdateOrRejectThePurchaseOrder("Accepted");
                    setNotificationOn("Accepted");
                  }}
                >
                  Confirm
                </Box>

                <Box
                  sx={{
                    ...ButtonStyleForAcceptAndReject,
                    bgcolor: "#fff",
                    border: "1px solid #2261A2",
                    color: "#2261A2",
                  }}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Cancel
                </Box>
                <Button
                  sx={qtyButtonStyle}
                  variant="outlined"
                  onClick={() => setOpenPartOrder(true)}
                >
                  Part Order
                </Button>
              </Box>
            </Box>
          </div>
        </Paper>
      </Modal>
    </div>
  );
};

export default POAcceptModal;

const InputSx = {
  width: "95%",
  height: "35px",
  border: "none",
  m: "auto",
  fontSize: "14px",
  "& input[type=number]": {
    "-moz-appearance": "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
};

const FeeBoxText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "13px",
  lineHeight: "24px",
  color: "#6B7A99",
};

const dialogtexthead = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "28px",
  color: "#6B7A99",
};

const qtyButtonStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  border: "1px solid #2261A2",
  width: "171px",
  height: "35px",
  fontSize: {
    xl: "12px",
    lg: "12px",
    md: "12px",
    sm: "12px",
    xs: "9px",
  },
  lineHeight: {
    xl: "15px",
    lg: "15px",
    md: "15px",
    sm: "15px",
    xs: "13px",
  },
  color: "#2261A2",
  background: "transparent",
  borderRadius: "10px",
  textTransform: "none",
  padding: {
    xl: "1rem 2rem",
    lg: "1rem 2rem",
    md: "1rem 2rem",
    sm: "1rem 2rem",
    xs: "0.7rem 1.7rem",
  },
  "&:hover": {
    background: "#C3CAD9",
    color: "#545454",
  },
  mx: "auto",
};

const dialogtext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "13px",
  lineHeight: "22px",
  color: "#6B7A99",
};

const reqbtn = {
  width: "114px",
  height: "42px",
  boxShadow: "none",
  background: "#2261A2",
  borderRadius: "8px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "10px",
  textTransform: "none",
};

const ButtonStyleForAcceptAndReject = {
  width: "100%",
  height: "35px",
  maxWidth: "180px",
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
