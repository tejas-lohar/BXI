import {
  Box,
  // Paper,
  Grid,
  Checkbox,
  Typography,
  TextField,
  MenuItem,
  Select,
  Chip,
  Button,
  BottomNavigation,
} from "@mui/material";
import { Stack } from "@mui/system";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Checkbox from "@mui/material/Checkbox";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import DatePicker from "react-datepicker";
import { DateRangePicker } from "mui-daterange-picker";
import { useEffectOnce } from "react-use";
import RemoveIcon from "../../../../assets/Images/CommonImages/RemoveIcon.svg";
import addItemCartIcon from "../../../../assets/CartPage/addItemIcon.svg";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import defaultIcon from "../../../../assets/CartPage/defaultCheckBoxIcon.svg";
// import { useEffectOnce } from "react-use";
import ToolTip from "../../../../components/ToolTip";

export default function TechInfo() {
  const ProductId = useParams().id;
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({});
  const [dateArr, setDateArr] = useState([]);
  const [fetchproductData, setfetchProductData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [BXISpace, setBXISpace] = useState(false);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [checkBoxes, setCheckBoxes] = useState({
    inspectionPass: false,
    LogReport: false,
    Videos: false,
    Pictures: false,
    ExhibitionCertificate: false,
    Other: false,
  });

  const toggle = () => setOpen(!open);
  const countDaysfromTimeline = (value, timeline) => {
    if (timeline === "Week") {
      return value * 7;
    } else if (timeline === "Month") {
      return value * 30;
    } else if (timeline === "Years") {
      return value * 365;
    } else if (timeline === "Day") {
      return value;
    } else if (fetchproductData?.mediaVariation?.unit === "Spot") {
      return fetchproductData?.mediaVariation?.maxOrderQuantityunit;
    }
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    setError,
    reset,
    formState: { errors, isValid },
  } = useForm({
    Values: {
      Dimensions: fetchproductData?.dimensions,
      UploadLink: fetchproductData?.uploadLink,
      WhatSupportingYouWouldGiveToBuyer:
        fetchproductData?.whatSupportingYouWouldGiveToBuyer,
    },
    resolver: zodResolver(
      z.object({
        Dimensions: z.string().min(1),
        UploadLink: z.string().min(1),
        // BXISpace: z.boolean(),
      })
    ),
  });
  const FetchProduct = async () => {
    await axios
      .get(`product/get_product_byId/${ProductId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data, "media res");
        setfetchProductData(res.data);
        setValue("Dimensions", res?.data?.Dimensions);
        setValue("UploadLink", res?.data?.UploadLink);
        setCheckBoxes({
          inspectionPass:
            res?.data?.WhatSupportingYouWouldGiveToBuyer?.inspectionPass,
          LogReport: res?.data?.WhatSupportingYouWouldGiveToBuyer?.LogReport,
          Videos: res?.data?.WhatSupportingYouWouldGiveToBuyer?.Videos,
          Pictures: res?.data?.WhatSupportingYouWouldGiveToBuyer?.Pictures,
          ExhibitionCertificate:
            res?.data?.WhatSupportingYouWouldGiveToBuyer.ExhibitionCertificate,
          Other: res?.data?.WhatSupportingYouWouldGiveToBuyer?.Other,
        });
        setDateArr(res?.data?.calender);
        console.log(res?.data?.BXISpace, "BXISpace");
        setValue("BXISpace", res?.data?.BXISpace);
        setBXISpace(res?.data?.BXISpace);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffectOnce(() => {
    FetchProduct();
  }, []);
  function getDaysBetweenDates(startDate, endDate) {
    // Convert the start and end dates to UTC to avoid any timezone discrepancies
    var start = new Date(startDate.toUTCString());
    var end = new Date(endDate.toUTCString());

    // Calculate the time difference in milliseconds
    var timeDiff = end.getTime() - start.getTime();

    // Convert the time difference to days
    var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    return days;
  }
  const {
    mutate: updateProduct,
    isLoading,
    isError,
    data: productData,
    variables,

    error: RegisterError,
  } = useUpdateProductQuery();
  const updateProductTechinfostatus = handleSubmit((data) => {
    // console.log("DataOhere", data, checkBoxes);
    // const MinDaysTobeadded = countDaysfromTimeline(
    //   fetchproductData?.mediaVariation?.minOrderQuantitytimeline,
    //   fetchproductData?.mediaVariation?.Timeline
    // );
    const MaxDaysTobeadded = countDaysfromTimeline(
      fetchproductData?.mediaVariation?.maxOrderQuantitytimeline,
      fetchproductData?.mediaVariation?.Timeline
    );
    console.log(MaxDaysTobeadded, "MaxDaysTobeadded");
    let Totaldays = 0;
    dateArr.map((item) => {
      return (Totaldays += getDaysBetweenDates(item.startDate, item.endDate));
    });
    console.log(Totaldays, "totaldays");
    const datatobesent = {
      ...data,
      id: ProductId,
      WhatSupportingYouWouldGiveToBuyer: checkBoxes,
      calender: dateArr,
      ProductUploadStatus: "golive",
      // ListingType: "Media",
      BXISpace: BXISpace,
    };
    if (
      dateArr.length === 0 ||
      (checkBoxes.ExhibitionCertificate === false &&
        checkBoxes.LogReport === false &&
        checkBoxes.Other === false &&
        checkBoxes.Pictures === false &&
        checkBoxes.Videos === false &&
        checkBoxes.inspectionPass === false)
    ) {
      return toast.error("Please Select add all mandatory field", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (Number(Totaldays) >= Number(MaxDaysTobeadded)) {
      console.log("hello dates are perfect", MaxDaysTobeadded, Totaldays);
      updateProduct(datatobesent, {
        onSuccess: (response) => {
          if (response.status === 200) {
            navigate(`/home/mediaoffline/mediaofflinegolive/${ProductId}`);
          }
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    } else {
      setError("dates", {
        type: "manual",
        message: `Please Select Dates According to your timeline you need to add ${MaxDaysTobeadded} or more days and you have added ${Totaldays} days`,
      });
    }
    // else {
    //   console.log(
    //     "hello Esto Problemo",
    //     Totaldays,
    //     Number(MinDaysTobeadded),
    //     Number(MaxDaysTobeadded)
    //   );
    //   setError("dates", {
    //     type: "manual",
    //     message: `Please Select Dates According to your timeline you need to add exact ${MaxDaysTobeadded} days and you have added ${Totaldays} days`,
    //   });
    // }
  });
  const options = { day: "2-digit", month: "short", year: "numeric" };

  return (
    <>
      <form onSubmit={updateProductTechinfostatus}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "716px",
            height: "auto",
          }}
        >
          <Box
          // sx={{
          //   overflow: "auto",
          //   "::-webkit-scrollbar": {
          //     display: "flex",
          //   },
          //   "::-webkit-scrollbar-thumb": {
          //     dynamic: "#8d8e90",
          //     minHeight: "10px",
          //     borderRadius: "8px",
          //   },
          //   "::-webkit-scrollbar-thumb:vertical": {
          //     miaxHeight: "10px",
          //   },
          //   maxHeight: "410px",
          //   height: "600px",
          // }}
          >
            <Box
              sx={{
                px: "30px",
                height: "auto",
                maxHeight: "490px",
                background: "#f3f6f9",
                overflow: "scroll",
                boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#f3f6f9",
                  width: "100%",
                  mx: "auto",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  py: "10px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: {
                      xs: "18px",
                      sm: "16px",
                      md: "16px",
                      lg: "14px",
                      xl: "14px",
                    },
                    color: "#6B7A99",
                  }}
                >
                  Technical Information
                </Typography>
                <ToolTip
                  info={
                    "Technical Information refers to specific details and specifications about a product's technical aspects, packaging Material, packing size, Dimensions, logistic or go live information for your offered product, This is Critical Information from Logistic & Buying Perspective for Making Informed Decisions"
                  }
                />
              </Box>

              <Box
                sx={{
                  width: "100%",
                  mt: 2,
                  height: "100%",
                  maxHeight: "400px",
                  overflowY: "scroll",
                }}
              >
                <Stack
                  sx={{
                    overflow: "auto",
                    "::-webkit-scrollbar": {
                      display: "flex",
                    },
                    "::-webkit-scrollbar-thumb": {
                      dynamic: "#8d8e90",
                      minHeight: "10px",
                      borderRadius: "8px",
                    },
                    "::-webkit-scrollbar-thumb:vertical": {
                      maxHeight: "30px",
                    },
                    maxHeight: "410px",
                    height: "600px",
                    p: 1,
                  }}
                >
                  <Box
                    onChange={(e) => {
                      setCheckBoxes(e?.target?.checked);
                    }}
                    sx={{ display: "grid", gap: "5px", py: "5px" }}
                  >
                    <Typography sx={{ ...CommonTextStyle }}>
                      What supporting you would give to buyer{" "}
                      <span style={{ color: "red" }}> *</span>
                    </Typography>
                    <Grid container>
                      <Grid
                        xl={6}
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        {checkBoxes.inspectionPass === "on" ? (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              src={addItemCartIcon}
                              size={30}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  inspectionPass: false,
                                });
                              }}
                              alt="Checkbox"
                            />
                            <Typography
                              sx={{ ...CommonTextStyle, color: "#445fd2" }}
                            >
                              Inspection pass
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              alt="checkBox"
                              src={defaultIcon}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  inspectionPass: "on",
                                });
                              }}
                            />
                            <Typography sx={{ ...CommonTextStyle }}>
                              Inspection pass
                            </Typography>
                          </Box>
                        )}

                        {checkBoxes.LogReport === "on" ? (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              src={addItemCartIcon}
                              size={30}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  LogReport: false,
                                });
                              }}
                              alt="Checkbox"
                            />
                            <Typography
                              sx={{ ...CommonTextStyle, color: "#445fd2" }}
                            >
                              Log Report
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              alt="checkBox"
                              src={defaultIcon}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  LogReport: "on",
                                });
                              }}
                            />
                            <Typography sx={{ ...CommonTextStyle }}>
                              Log Report
                            </Typography>
                          </Box>
                        )}
                        {checkBoxes.Videos === "on" ? (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              src={addItemCartIcon}
                              size={30}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  Videos: false,
                                });
                              }}
                              alt="Checkbox"
                            />
                            <Typography
                              sx={{ ...CommonTextStyle, color: "#445fd2" }}
                            >
                              Videos
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              alt="checkBox"
                              src={defaultIcon}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  Videos: "on",
                                });
                              }}
                            />
                            <Typography sx={{ ...CommonTextStyle }}>
                              Videos
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                      <Grid
                        xl={6}
                        lg={6}
                        md={6}
                        sm={12}
                        xs={12}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                        }}
                      >
                        {checkBoxes.Pictures === "on" ? (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              src={addItemCartIcon}
                              size={30}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  Pictures: false,
                                });
                              }}
                              alt="Checkbox"
                            />
                            <Typography
                              sx={{ ...CommonTextStyle, color: "#445fd2" }}
                            >
                              Pictures
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              alt="checkBox"
                              src={defaultIcon}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  Pictures: "on",
                                });
                              }}
                            />
                            <Typography sx={{ ...CommonTextStyle }}>
                              Pictures
                            </Typography>
                          </Box>
                        )}
                        {checkBoxes.ExhibitionCertificate === "on" ? (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              src={addItemCartIcon}
                              size={30}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  ExhibitionCertificate: false,
                                });
                              }}
                              alt="Checkbox"
                            />
                            <Typography
                              sx={{ ...CommonTextStyle, color: "#445fd2" }}
                            >
                              Exhibition Certificate
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              alt="checkBox"
                              src={defaultIcon}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  ExhibitionCertificate: "on",
                                });
                              }}
                            />
                            <Typography sx={{ ...CommonTextStyle }}>
                              Exhibition Certificate
                            </Typography>
                          </Box>
                        )}
                        {checkBoxes.Other === "on" ? (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              src={addItemCartIcon}
                              size={30}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  Other: false,
                                });
                              }}
                              alt="Checkbox"
                            />
                            <Typography
                              sx={{ ...CommonTextStyle, color: "#445fd2" }}
                            >
                              Other
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <img
                              alt="checkBox"
                              src={defaultIcon}
                              onClick={() => {
                                setCheckBoxes({
                                  ...checkBoxes,
                                  Other: "on",
                                });
                              }}
                            />
                            <Typography sx={{ ...CommonTextStyle }}>
                              Other
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ display: "grid", gap: "5px", py: "5px" }}>
                    <Typography sx={{ ...CommonTextStyle }}>
                      Dimensions of Ad / Content Needed{" "}
                      <span style={{ color: "red" }}> *</span>
                    </Typography>

                    <TextField
                      focused
                      multiline
                      variant="standard"
                      placeholder="Eg. 30 Sec"
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                      {...register("Dimensions")}
                      sx={{
                        ...lablechange,
                        background: "#fff",
                        borderRadius: "10px",
                        height: "47px",
                        border: errors["Dimensions"]?.message
                          ? "1px solid red"
                          : null,
                      }}
                      // InputLabelProps={{
                      //   style: {
                      //     color: "#6B7A99",
                      //     fontSize: "17px",
                      //     fontFamily: "Poppins",
                      //   },
                      // }}
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <Typography
                            variant="body1"
                            style={{ fontFamily: "Poppins", color: "#445FD2" }}
                          ></Typography>
                        ),
                        style: {
                          fontFamily: "Poppins",
                          color: " #6B7A99",
                          fontSize: "12px",
                          color: "#445FD2",
                        },
                      }}
                    />
                  </Box>
                  <Typography sx={ErrorStyle}>
                    {errors["Dimensions"]?.message}
                  </Typography>
                  <Box sx={{ display: "grid", gap: "5px", py: "5px" }}>
                    <Typography sx={{ ...CommonTextStyle }}>
                      Content Upload Link ( Share a link where buyer can drop a
                      content ) <span style={{ color: "red" }}> *</span>
                    </Typography>

                    <TextField
                      focused
                      multiline
                      variant="standard"
                      placeholder="Eg. Uploaded content has to go to seller with PO & Confirmation"
                      // value={description}
                      // onChange={(e) => setDescription(e.target.value)}
                      {...register("UploadLink")}
                      sx={{
                        ...lablechange,
                        background: "#fff",
                        borderRadius: "10px",
                        height: "47px",
                        border: errors["UploadLink"]?.message
                          ? "1px solid red"
                          : null,
                      }}
                      // InputLabelProps={{
                      //   style: {
                      //     color: "#6B7A99",
                      //     fontSize: "17px",
                      //     fontFamily: "Poppins",
                      //   },
                      // }}
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <Typography
                            variant="body1"
                            style={{ fontFamily: "Poppins", color: "#445FD2" }}
                          ></Typography>
                        ),
                        style: {
                          fontFamily: "Poppins",
                          color: " #6B7A99",
                          fontSize: "12px",
                          color: "#445FD2",
                        },
                      }}
                    />
                  </Box>
                  <Typography sx={ErrorStyle}>
                    {errors["UploadLink"]?.message}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
                    <Checkbox
                      {...label}
                      // {...register("BXISpace")}
                      checked={BXISpace === true ? true : false}
                      onChange={(e) => setBXISpace(e.target.checked)}
                    />
                    <Typography sx={CommonTextStyle}>
                      Click here to use BXI Space from you can download , though
                      BXI does not take responsibility for the content{" "}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "grid", gap: "5px", py: "5px", mt: 2 }}>
                    <Typography sx={{ ...CommonTextStyle }}>
                      Calendar ( Select availability of Media){" "}
                      <span style={{ color: "red" }}> *</span>
                    </Typography>
                    <Box
                      variant="outlined"
                      onClick={handleClickOpen}
                      sx={{
                        ...lablechange,
                        background: "#fff",
                        border: "none",
                        borderRadius: "10px",
                        height: "47px",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <CalendarMonthIcon
                        sx={{
                          height: "30px",
                          width: "30px",
                          marginRight: "10px",
                        }}
                      />
                    </Box>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DateRangePicker
                        calender={1}
                        open={true}
                        toggle={toggle}
                        onChange={(range) => {
                          let isRangeValid = true;
                          for (const existingRange of dateArr) {
                            const { startDate, endDate } = existingRange;
                            if (
                              (range.startDate >= startDate &&
                                range.startDate <= endDate) ||
                              (range.endDate >= startDate &&
                                range.endDate <= endDate)
                            ) {
                              isRangeValid = false;
                              break;
                            }
                          }

                          if (isRangeValid) {
                            setDateArr([...dateArr, range]);
                          } else {
                            alert(
                              "Dates Already Selected, Please Select Again"
                            );
                          }
                        }}
                      />
                    </Dialog>
                  </Box>
                  <Typography sx={ErrorStyle}>
                    {errors["dates"]?.message}
                  </Typography>

                  <Box>
                    {dateArr.length > 0 &&
                      dateArr?.map((item, idx) => {
                        console.log(item, "===>item");

                        return (
                          <Box
                            key={idx}
                            sx={{
                              justifyContent: "space-between",
                              display: "flex",
                              mt: "30px",
                              width: "auto",
                              gap: "20px",
                              border: "1px solid #E3E3E3",
                              borderRadius: "10px",
                              padding: "0px 30px",
                            }}
                          >
                            <Typography
                              id="standard-basic"
                              variant="standard"
                              InputProps={{
                                disableUnderline: "true",
                                style: {
                                  color: "rgba(107, 122, 153)",
                                  fontSize: "14px",
                                  padding: "7px",
                                },
                              }}
                              InputLabelProps={{
                                style: {
                                  color: "red",
                                },
                              }}
                              sx={{
                                width: "100%",
                                background: "transparent",
                                padding: "10px",
                                fontFamily: "Poppins",
                              }}
                            >
                              {" "}
                              From :
                              {new Date(item?.startDate).toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </Typography>
                            <Typography
                              id="standard-basic"
                              variant="standard"
                              InputProps={{
                                disableUnderline: "true",
                                style: {
                                  color: "rgba(107, 122, 153)",
                                  fontSize: "14px",
                                  padding: "7px",
                                },
                              }}
                              InputLabelProps={{
                                style: {
                                  color: "red",
                                },
                              }}
                              sx={{
                                width: "100%",
                                background: "transparent",
                                padding: "10px",
                                fontFamily: "Poppins",
                              }}
                            >
                              To :{" "}
                              {new Date(item?.endDate).toLocaleDateString(
                                "en-US",
                                options
                              )}
                            </Typography>
                            <Box
                              component="img"
                              src={RemoveIcon}
                              sx={{ cursor: "pointer" }}
                              onClick={() => {
                                let temp = dateArr.filter(
                                  (items) => items !== item
                                );
                                setDateArr(temp);
                              }}
                            />
                          </Box>
                        );
                      })}
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              mx: "auto",
              height: "100%",
              bgcolor: "transparent",
            }}
          >
            <BottomNavigation
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                bgcolor: "#f3f6f9",
                p: "10px",
                boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
              }}
              showLabels
            >
              {/*   <Button
                sx={{
                  marginRight: "auto",
                  p: "2%",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  color: "#6B7A99",
                  fontSize: 14,
                  display: "flex",
                  gap: "10px",
                  textTransform: "none",
                }}
                onClick={() => {
                  reset({
                    UploadLink: "",
                    Dimensions: "",
                  });
                  setDateArr([]);
                }}
              >
                <Box
                  component="img"
                  sx={{ width: "23px", height: "23px" }}
                  src={RedoIcon}
                  alt=""
                />
                Reset to Default
              </Button> */}
              <Box sx={{ display: "flex", gap: "10px", p: 1, width: "50%" }}>
                <Button
                  sx={{
                    width: "100%",
                    height: "32px",
                    borderRadius: "10px",
                    background: "#fff",
                    color: "#636161",
                    fontSize: "14px",
                    textTransform: "none",
                    "&:hover": {
                      background: "#f3f6f9",
                      color: "#000",
                    },
                  }}
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    height: "32px",
                    borderRadius: "10px",
                    background: "#445FD2",
                    fontSize: "14px",
                    textTransform: "none",
                    "&:hover": {
                      background: "#445FD2",
                    },
                  }}
                  variant="contained"
                  // onClick={() => {
                  //   navigate("/home/mediaonline/mediagolive/:id");
                  // }}
                >
                  Next
                </Button>
              </Box>
            </BottomNavigation>
          </Box>
        </Box>
      </form>
    </>
  );
}

const textfieldstyle = {
  width: "100%",
  height: "100px",
  background: "#FFFFFF",
  borderRadius: "10px",
  color: "red",
  fontSize: "14px",
};

const MenuItems = {
  fontSize: "12px",
  color: "#6B7A99",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
};

const TypographyStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
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

const lablechange = {
  fontFamily: "Poppins",
  color: "#6B7A99",
  fontSize: "16px",
  display: "grid",
  textAlign: "left",
  fontWeight: "bold",
  paddingLeft: "10px",
  // borderBottom: "1px solid #E8E8E8",
  "&:focus": {
    border: "1px solid #E8E8E8",
  },
};

const packagingunit = {
  width: "20%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  height: "100%",
  background: "#FFFFFF",
  color: "#6B7A99",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  borderRadius: "0px 10px 10px 0px",
};

const GW = {
  width: "30%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  background: "#FFFFFF",
  height: "100%",
  color: "#6B7A99",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  borderRadius: "0px 10px 10px 0px",
};

const PD = {
  width: "40%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  background: "#FFFFFF",
  height: "100%",
  maxWidth: "75px",
  minWidth: "75px",
  color: "#6B7A99",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  borderRadius: "0px 10px 10px 0px",
};

const ErrorStyle = {
  color: "red",
};
