import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import axios from "axios";
import dayjs from "dayjs";
import {
  default as isBetween,
  default as isBetweenPlugin,
} from "dayjs/plugin/isBetween";
import PreviewPageHeader from "../../../components/PreviewPageHeader";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAddMediaToCart } from "../../../Hooks/MediaHooks/useAddMediaToCart";
import { useGetMediaCart } from "../../../Hooks/MediaHooks/useGetMediaCart";
import LeftArrow from "../../../assets/Images/ProductDetailIcon/LeftArrow.svg";
import BXITokenIcon from "../../../assets/Stack of Coins.svg";
import CarasoulForProductDetails from "../../../components/Carousel/CarasoulForProductDetails";
import FeatureName from "../../../components/FeatureName";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import sendEvents from "../../../utils/sendEvents";
import { ProductAnalysisUpdate } from "../../../redux/action/Products/ProductAnalysis";
import { useDispatch } from "react-redux";

dayjs.extend(isBetweenPlugin);
dayjs.extend(isBetween);
function ReturnDaysFromTimeline(timeline) {
  if (timeline === "Day") {
    return 0;
  } else if (timeline === "Week") {
    return 6;
  } else if (timeline === "Month") {
    return 29;
  } else if (timeline === "Year") {
    return 364;
  }
}
// return (
const SecondsFieldArr = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
  180,
];
function DiscountedPrice({ regularPrice, discountPrice, GetProductByIdData }) {
  console.log({ regularPrice, discountPrice });
  const discount = regularPrice - discountPrice;
  const discountPercent = (discount / regularPrice) * 100;
  const formattedDiscountPercent = discountPercent.toFixed(2);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          width: "500px",
          mt: "10px",
          marginBottom: "-11px",
          gap: "10px",
          // bgcolor: "red",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "24px",
            lineHeight: "36px",
            letterSpacing: "0.06em",
            textTransform: "capitalize",

            color: "#DC3737",
          }}
        >
          -{formattedDiscountPercent}%
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "36px",
            letterSpacing: "0.06em",
            textTransform: "capitalize",
            ml: 1,
            color: "#6B7A99",
          }}
        >
          &nbsp;{discountPrice}{" "}
          <img
            src={BXITokenIcon}
            style={{
              width: "20px",
              height: "auto",
            }}
            alt="BXI Token"
          />
        </Typography>
        {GetProductByIdData?.ProductsVariantions.at(0)?.unit ? (
          <Typography sx={{ ...fetchValue, pb: 1 }}>
            Per {GetProductByIdData?.ProductsVariantions.at(0)?.unit} Per{" "}
            {GetProductByIdData?.ProductsVariantions.at(0)?.Timeline}
          </Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "15px",
            }}
          >
            <Typography sx={fetchValue}>
              Per Day
              {/* {GetProductByIdData?.ProductsVariantions.at(0)?.Timeline} */}
            </Typography>
            <Typography sx={fetchValue}>
              Per insertion
              {/* {GetProductByIdData?.ProductsVariantions.at(0)?.Timeline} */}
            </Typography>
          </Box>
        )}
      </Box>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "36px",
          letterSpacing: "0.06em",
          textTransform: "capitalize",

          color: "#6B7A99",
          textDecoration: "line-through",
        }}
      >
        MRP: {regularPrice}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "16px",
          textTransform: "capitalize",
          color: "#6B7A99",
        }}
      >
        Appllicable Taxes Extra
      </Typography>
    </div>
  );
}

// function getDatesBetween(startDate, endDate) {
//   console.log("startDate", startDate);
//   const dates = [];
//   let currentDate = new Date(startDate);
//   console.log("currentDate", currentDate);
//   while (currentDate <= endDate) {
//     dates.push(new Date(currentDate));
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   console.log("dates", dates);
//   return dates;
// }

function fetchDatesBetween(startDate, endDate) {
  var dates = [];
  var currentDate = new Date(startDate);
  endDate = new Date(endDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate).toISOString());
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
// function isDateInArray(date, dateArray) {
//   var dateToCheck = new Date(date).toISOString().split("T")[0];
//   return dateArray.includes(dateToCheck);
// }
function filterMultiples(array, multiple) {
  return array.filter(function (value) {
    return value % multiple === 0;
  });
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));
const BoughtDatesArray = [];

function Day(props) {
  const { day, selectedDay, TimelineData, ...other } = props;

  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  const start = selectedDay;
  const end = start.add(ReturnDaysFromTimeline(TimelineData), "day");
  // BoughtDatesArray.push(start);
  const dayIsBetween = day.isBetween(start, end, null, "[]");
  const isFirstDay = day.isSame(start, "day");
  const isLastDay = day.isSame(end, "day");

  // console.log("dayIsBetween", BoughtDatesArray);
  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={dayIsBetween ? { px: 2.5, mx: 0 } : {}}
      dayIsBetween={dayIsBetween}
      isFirstDay={isFirstDay}
      isLastDay={isLastDay}
    />
  );
}
const options = { day: "2-digit", month: "short", year: "numeric" };

export default function MediaBuying() {
  let { id } = useParams();
  let ProductId = id;
  const dispatch = useDispatch();

  // const [MaxtimeslotArr, setMaxtimeslotArr] = useState([]);
  let navigate = useNavigate();
  // const [count, setCount] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [boughtDate, setBoughtDates] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [unitsToBebought, setUnitsToBebought] = useState(0);
  // const [timelineToBought, setTimelineToBought] = useState();

  const [BoughtSeconds, setBoughtSeconds] = useState(1);

  // const [starvalue, setstarValue] = React.useState(2);

  const [TabValue, setTabValue] = React.useState("1");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const [currentImage, setCurrentImage] = useState(0);

  const [GetProductByIdData, setGetProductByIdData] = useState();
  const [ProductFeatures, setProfuctFeatures] = useState([]);
  // const [VariationToMap, setVariationToMap] = useState();

  const [storeVariationData, setStoreVariationData] = useState();
  const { data: mutateCartData, mutate: addMediaToCart } = useAddMediaToCart();
  const [cartdata, setCartData] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  let NewdataArray = [];
  const ImageDataArray = GetProductByIdData?.ProductImages;
  // const upwardClick = () => {
  //   setCurrentImage((currentImage + 1) % ImageDataArray.length);
  // };
  const [openCalender, setOpenCalender] = React.useState(false);
  const handleOpenCalender = () => setOpenCalender(true);
  const handleCloseCalender = () => setOpenCalender(false);
  async function GetProductByid() {
    await axios
      .get(
        `product/get_product_byId/${ProductId}
        `,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setGetProductByIdData(res?.data);
        setStoreVariationData(res?.data?.ProductsVariantions[0]?._id);
        setProfuctFeatures(res?.data?.ProductFeatures);
      });
    // console.log("====>", GetProductByIdData);
  }

  const {
    data: MediaData,
    // isLoading: MediaLoading,
    // isError: MediaError,
    refetch: Mediarefetch,
  } = useGetMediaCart();

  console.log("MediaData", MediaData?.body);

  async function GetMediaFromCart() {
    await axios
      .get("media/get_media_cart", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("resss", res?.data?.body);
        if (res?.data?.body.length > 0) {
          setCartData(true);
        }
      });
  }
  function generateRandomId(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  useEffect(() => {
    GetProductByid();
    GetMediaFromCart();
  }, []);

  useEffect(() => {
    GetProductByid();
  }, []);

  // useEffect(() => {

  // }, [mutateCartData]);

  // const { data: VoucherCartData, isLoading, error } = useGetAllCartVouchers();
  const countDaysfromTimeline = (value, timeline) => {
    if (timeline === "Week") {
      return value / 7;
    } else if (timeline === "Month") {
      return value / 30;
    } else if (timeline === "Years") {
      return value / 365;
    } else if (timeline === "Day") {
      return value;
    } else if (timeline === "One Time") {
      return value;
    }
  };
  function extractDatesFromObjects(objects) {
    const datesArray = [];

    objects.forEach((obj) => {
      const dates = Object.values(obj).filter((value) => value instanceof Date);
      datesArray.push(...dates);
    });

    return datesArray;
  }
  async function handleAddToCart(id) {
    const datesToBuyArray =
      GetProductByIdData?.ProductsVariantions?.at(0)?.Timeline === "Day" ||
      GetProductByIdData?.ProductsVariantions?.at(0)?.Timeline === "One Time"
        ? boughtDate
        : extractDatesFromObjects(boughtDate);
    if (
      datesToBuyArray?.length >
      (ReturnDaysFromTimeline(
        GetProductByIdData?.ProductsVariantions.at(0)?.Timeline
      ) +
        1) *
        Number(
          GetProductByIdData?.ProductsVariantions.at(0)
            ?.maxOrderQuantitytimeline
        )
    ) {
      alert("Dates Should not be more than max Qty");
    } else if (
      datesToBuyArray?.length <
      (ReturnDaysFromTimeline(
        GetProductByIdData?.ProductsVariantions.at(0)?.Timeline
      ) +
        1) *
        Number(
          GetProductByIdData?.ProductsVariantions.at(0)
            ?.minOrderQuantitytimeline
        )
    ) {
      alert("Dates Should not be less than min Qty");
    } else {
      console.log(
        "timelineToBought",
        datesToBuyArray.length,
        GetProductByIdData?.ProductsVariantions.at(0)?.Timeline,
        GetProductByIdData?.mediaVariation?.Timeline,
        countDaysfromTimeline(
          datesToBuyArray.length,
          GetProductByIdData?.mediaVariation?.Timeline
        )
      );
      await addMediaToCart(
        {
          ProductId: id,
          Boughtdates: datesToBuyArray,
          IsMedia: true,
          IsSample: false,
          ProductQuantity: boughtDate.length,
          unitsToBebought:
            GetProductByIdData?.ProductSubCategory ===
              "647713dcb530d22fce1f6c36" ||
            GetProductByIdData?.ProductSubCategory ===
              "643cda0c53068696706e3951"
              ? 1
              : unitsToBebought,
          BoughtSeconds: BoughtSeconds,
          timelineToBought: countDaysfromTimeline(
            datesToBuyArray.length,
            GetProductByIdData?.mediaVariation?.Timeline
          ),
        },
        {
          onSuccess: (res) => {
            console.log("mediabuyingres", res);

            dispatch(
              ProductAnalysisUpdate(ProductId, "", "ProductAddToCardCount")
            );

            toast.success("Added to Cart", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // }
            Mediarefetch();
          },
          onError: (err) => {
            console.log("err", err);
          },
        }
      );
      await Mediarefetch();
      await GetMediaFromCart();
      sendEvents("Media add to cart");
    }
    console.log("boughtDatesfromcart", datesToBuyArray);
  }

  console.log("boughtDates", boughtDate);

  function isDateBetween(targetDate, startDate, endDate) {
    return startDate <= targetDate && targetDate <= endDate;
  }
  const otherCostList = [
    {
      otherCostText: GetProductByIdData?.OtherCost[0]?.ReasonOfCost,
      otherCostValue: GetProductByIdData?.OtherCost[0]?.CostPrice,
    },
  ];
  // function getDaysBetweenDates(startDate, endDate) {
  //   // Convert the start and end dates to UTC to avoid any timezone discrepancies
  //   var start = new Date(startDate.toUTCString());
  //   var end = new Date(endDate.toUTCString());

  //   // Calculate the time difference in milliseconds
  //   var timeDiff = end.getTime() - start.getTime();

  //   // Convert the time difference to days
  //   var days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  //   return days;
  // }
  const toggle = () => setOpen(!open);

  // console.log("boughtDates", boughtDate);
  // useEffect(() => {

  // }, []);
  // console.log(
  //   "MaxtimeslotArr",
  //   filterMultiples(
  //     SecondsFieldArr,
  //     GetProductByIdData?.ProductsVariantions.at(0)?.minTimeslotSeconds
  //   )
  // );
  const [value, setValue] = useState();

  const ableddates = [];
  const getAllDatesOfRange = (startDate, endDate) => {
    let dateIsBetween = false;

    for (const item of boughtDate) {
      if (isDateBetween(item, startDate, endDate)) {
        dateIsBetween = true;
        break; // Exit the loop if a date is found between the range
      }
    }

    if (dateIsBetween) {
      return []; // Return an empty array if a date is found between the range
    }

    const theDate = new Date(startDate);
    while (theDate <= endDate) {
      ableddates.push(new Date(theDate)); // Use push instead of spread operator
      theDate.setDate(theDate.getDate() + 1);
    }

    return ableddates;
  };

  GetProductByIdData?.calender?.map((item, idx) => {
    getAllDatesOfRange(new Date(item.startDate), new Date(item.endDate));
  });

  // useEffect(() => {}, []);
  // console.log("edate", ableddates);
  return (
    <React.Fragment>
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
      <Paper
        Paper
        sx={{
          width: "100%",
          height: "100%",
          background: "transparent",
          boxShadow: "none",
        }}
        elevation={0}
      >
        <BreadCrumbHeader MainText="Media" />

        <Box
          sx={{
            padding: "1% 0",
            borderRadius: "30px",
            margin: "2%",
            background: "#fff",
            height: "auto",
            width: "auto",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              textAlign: "center",
              width: "95%",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                width: "100%",
                mx: "auto",
                height: "80px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <PreviewPageHeader />
            </Box>
          </Box>
          <Grid container sx={HeaderContainerStyle}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box sx={PageHeader}>
                <Typography sx={AppBarTypoStyle}>
                  {GetProductByIdData?.ProductName}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* ***** Carasoul ***** */}
          <Box
            sx={{
              display: "flex",
              my: {
                xl: "0px",
                lg: "0px",
                md: "5px",
                sm: "10px",
                xs: "20px",
              },
              width: "100%",
            }}
          >
            <CarasoulForProductDetails ImageDataArray={ImageDataArray} />
          </Box>

          <TabContext value={TabValue} variant="fullwidth">
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "100%",
                mt: {
                  xl: "40px",
                  lg: "40px",
                  md: "30px",
                  sm: "20px",
                  xs: "10px",
                },
              }}
            >
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
                variant="fullWidth"
                sx={MainTabStyle}
              >
                <Tab label="Description" value="1" sx={TabTextStyle} />
                <Tab label="Product Information" value="2" sx={TabTextStyle} />
                <Tab
                  label="Technical Information"
                  value="3"
                  sx={TabTextStyle}
                />
                <Tab label="Key Features" value="4" sx={TabTextStyle} />
              </TabList>
            </Box>

            <TabPanel value="1">
              {/* Description */}
              <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{}}>
                  <Box>
                    <Typography sx={TypographyTitleText}>
                      {GetProductByIdData?.ProductSubtitle}
                    </Typography>
                    <Typography sx={DescriptionAnswerText}>
                      {GetProductByIdData?.ProductDescription}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>{" "}
              <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={{}}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <Box>
                      <Typography sx={semi}>
                        {GetProductByIdData?.ProductName}
                        {/* Product Information */}
                      </Typography>
                      <Box
                        sx={{
                          width: "100%",
                          mx: "auto",
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "row",
                          gap: "5px",
                        }}
                      >
                        <DiscountedPrice
                          regularPrice={
                            GetProductByIdData?.ProductsVariantions?.at(0)
                              ?.PricePerUnit
                          }
                          discountPrice={
                            GetProductByIdData?.ProductsVariantions?.at(0)
                              ?.DiscountedPrice
                          }
                          GetProductByIdData={GetProductByIdData}

                          // regularPrice={10000}
                          // discountPrice={5000}
                        />
                      </Box>
                    </Box>
                    <Box
                      mt={2}
                      sx={
                        {
                          // width: "95%",
                          // mx: "auto",
                        }
                      }
                    >
                      <Grid container sx={{ width: "100%" }}>
                        {GetProductByIdData?.medianame ? (
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Typography sx={tableHeader}>Brand Name</Typography>
                            <Typography sx={fetchValue}>
                              {GetProductByIdData?.medianame}
                            </Typography>
                          </Grid>
                        ) : null}
                        {GetProductByIdData?.multiplexScreenName ? (
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Typography sx={tableHeader}>
                              Multiplex Name
                            </Typography>
                            <Typography sx={fetchValue}>
                              {GetProductByIdData?.multiplexScreenName}
                            </Typography>
                          </Grid>
                        ) : null}
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          {GetProductByIdData?.offerningbrandat ? (
                            <>
                              <Typography sx={tableHeader}>
                                {" "}
                                Offering At
                              </Typography>
                              <Typography sx={fetchValue}>
                                {GetProductByIdData?.offerningbrandat}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography sx={tableHeader}>
                                {" "}
                                Position of the Ad ?
                              </Typography>
                              <Typography sx={fetchValue}>
                                {GetProductByIdData?.adPosition}
                              </Typography>
                            </>
                          )}
                        </Grid>
                      </Grid>
                      <Grid container sx={{ mt: 2, width: "100%" }}>
                        {GetProductByIdData?.ProductsVariantions.at(0)
                          ?.location ? (
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Typography sx={tableHeader}>Location</Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.location
                              }
                            </Typography>
                          </Grid>
                        ) : null}
                        {GetProductByIdData?.ProductsVariantions.at(0)?.Type ? (
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Typography sx={tableHeader}>Type</Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.Type
                              }
                            </Typography>
                          </Grid>
                        ) : null}
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          {GetProductByIdData?.ProductsVariantions.at(0)
                            ?.Timeline ? (
                            <>
                              <Typography sx={tableHeader}>
                                {" "}
                                Timeline
                              </Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.Timeline
                                }
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography sx={tableHeader}> Edition</Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.edition
                                }
                              </Typography>
                            </>
                          )}
                        </Grid>
                        {GetProductByIdData?.ProductsVariantions.at(0)
                          ?.edition ? (
                          <>
                            <Grid
                              item
                              xl={2.4}
                              lg={2.4}
                              md={2.4}
                              sm={2.4}
                              xs={2.4}
                            >
                              <Typography sx={tableHeader}> Edition</Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.edition
                                }
                              </Typography>
                            </Grid>
                          </>
                        ) : null}

                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          {GetProductByIdData?.ProductsVariantions.at(0)
                            ?.unit ? (
                            <>
                              <Typography sx={tableHeader}>Unit</Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.unit
                                }
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography sx={tableHeader}>
                                Release Details
                              </Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.releasedetails
                                }
                              </Typography>
                            </>
                          )}
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          {GetProductByIdData?.ProductsVariantions.at(0)
                            ?.repetition ? (
                            <>
                              <Typography sx={tableHeader}>
                                {" "}
                                Repetition
                              </Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.repetition
                                }
                              </Typography>
                            </>
                          ) : (
                            <>
                              <Typography sx={tableHeader}>Ad Type</Typography>
                              <Typography sx={fetchValue}>
                                {
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.adType
                                }
                              </Typography>
                            </>
                          )}
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}>
                            Dimension Size
                          </Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.dimensionSize
                            }
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ mt: 2, width: "100%" }}>
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}>Price</Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions?.at(0)
                                ?.DiscountedPrice
                            }
                          </Typography>
                        </Grid>

                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}>GST</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.ProductsVariantions.at(0)?.GST}{" "}
                            %
                          </Typography>
                        </Grid>
                        {GetProductByIdData?.ProductsVariantions.at(0)
                          ?.availableInsertions ? (
                          <Grid
                            item
                            xl={2.4}
                            lg={2.4}
                            md={2.4}
                            sm={2.4}
                            xs={2.4}
                          >
                            <Typography sx={tableHeader}>
                              Available Insertions
                            </Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.availableInsertions
                              }{" "}
                            </Typography>
                          </Grid>
                        ) : null}
                      </Grid>
                      <Grid container sx={{ mt: 2 }}>
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                          <Typography sx={tableHeader}>
                            {" "}
                            Min - Max Order Quantity Timeline
                          </Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.ProductsVariantions.at(0)
                              ?.minOrderQuantitytimeline
                              ? `${
                                  GetProductByIdData?.ProductsVariantions.at(0)
                                    ?.minOrderQuantitytimeline
                                } - ${
                                  GetProductByIdData?.ProductsVariantions?.at(0)
                                    ?.maxOrderQuantitytimeline
                                }`
                              : "N/A"}{" "}
                            {""} /{" "}
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.Timeline
                            }
                          </Typography>
                        </Grid>
                        {GetProductByIdData?.ProductSubCategory ===
                        "643cda0c53068696706e3951" ? null : (
                          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                            <Typography sx={tableHeader}>
                              {" "}
                              Min - Max Order Quantity Unit
                            </Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.minOrderQuantityunit
                              }{" "}
                              -
                              {
                                GetProductByIdData?.ProductsVariantions?.at(0)
                                  ?.maxOrderQuantityunit
                              }
                              /{" "}
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.unit
                              }
                            </Typography>
                          </Grid>
                        )}

                        {GetProductByIdData?.ProductsVariantions?.at(0)
                          ?.minTimeslotSeconds ? (
                          <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                            <Typography sx={tableHeader}>
                              {" "}
                              Min - Max Timeslot
                            </Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.minTimeslotSeconds
                              }{" "}
                              -
                              {
                                GetProductByIdData?.ProductsVariantions?.at(0)
                                  ?.maxTimeslotSeconds
                              }
                              / Seconds {""}{" "}
                            </Typography>
                          </Grid>
                        ) : null}
                      </Grid>
                      <Grid container sx={{ mt: 5, width: "90%" }}>
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}>Region</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.GeographicalData?.region}
                          </Typography>
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}> State</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.GeographicalData?.state}
                          </Typography>
                        </Grid>

                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}>City</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.GeographicalData?.city}
                          </Typography>
                        </Grid>
                        <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                          <Typography sx={tableHeader}> Landmark</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.GeographicalData?.landmark}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          ...tableHeader,
                          fontWeight: 600,
                          fontSize: "18px",
                          lineHeight: "27px",
                        }}
                      >
                        Inventory Available Dates
                      </Typography>

                      <Box
                        onClick={toggle}
                        sx={{
                          background: "rgba(243, 246, 249, 0.4)",
                          width: "295px",
                          // height: "53px",
                          borderRadius: "10px",
                          mt: "0.8%",
                          padding: "1rem",
                          // display: "flex",
                        }}
                      >
                        {GetProductByIdData?.calender?.map((item, idx) => {
                          return (
                            <>
                              <Typography sx={{ fontSize: "14px" }}>
                                from :
                                {new Date(item?.startDate).toLocaleDateString(
                                  "en-US",
                                  options
                                )}{" "}
                                - to :
                                {new Date(item?.endDate).toLocaleDateString(
                                  "en-US",
                                  options
                                )}
                              </Typography>
                            </>
                          );
                        })}
                      </Box>
                    </Box>
                    <Grid container>
                      <Grid xl={4} lg={4} md={4} sm={4} xs={4}>
                        <Typography
                          sx={{
                            ...tableHeader,
                            fontWeight: 600,
                            fontSize: "18px",
                            lineHeight: "27px",
                          }}
                        >
                          How Many{" "}
                          {
                            GetProductByIdData?.ProductsVariantions.at(0)
                              ?.Timeline
                          }{" "}
                          you would like to buy?
                        </Typography>
                        <Box
                          onClick={handleOpenCalender}
                          sx={{
                            width: "80%",
                            height: "auto",
                            mt: 1,
                            cursor: "pointer",
                            border: " 1.22591px solid #D4D4D4",
                            borderRadius: "5px",
                            color: "grey",
                            p: 2,
                          }}
                        >
                          Select
                        </Box>

                        <Modal
                          open={openCalender}
                          onClose={handleCloseCalender}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box
                            sx={{
                              background: "#fff",
                              top: "50%",
                              width: "40%",
                              mx: "auto",
                              mt: 5,
                            }}
                          >
                            {GetProductByIdData?.ProductsVariantions?.at(0)
                              ?.Timeline === "Day" ||
                            GetProductByIdData?.ProductsVariantions?.at(0)
                              ?.Timeline === "One Time" ? (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                  label="Select Dates"
                                  shouldDisableDate={(date) => {
                                    return !!!GetProductByIdData?.calender?.find(
                                      (el) =>
                                        isDateBetween(
                                          new Date(date),
                                          new Date(el.startDate),
                                          new Date(el.endDate)
                                        )
                                    );
                                  }}
                                  onChange={(e) => {
                                    console.log(
                                      "edate",
                                      new Date(e),
                                      boughtDate
                                    );
                                    const data = boughtDate?.find((item) =>
                                      dayjs(item).isSame(e)
                                    );
                                    if (data) {
                                      return;
                                    }
                                    setBoughtDates([
                                      ...boughtDate,
                                      new Date(e),
                                    ]);
                                    //  else if (!data) {
                                    //   setBoughtDates([...boughtDate, new Date(e)]);
                                    // } else {
                                    //   return;
                                    // }
                                  }}
                                />
                              </LocalizationProvider>
                            ) : (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateCalendar
                                  sx={{
                                    "& .MuiPickersDay-day": {
                                      color: "red",
                                    },
                                    "& .MuiPickersDay-daySelected": {
                                      color: "green",
                                    },
                                    "& .MuiPickersDay-dayDisabled": {
                                      color: "pink",
                                    },
                                  }}
                                  // value={value}
                                  shouldDisableDate={(date) => {
                                    return !!!GetProductByIdData?.calender?.find(
                                      (el) =>
                                        isDateBetween(
                                          new Date(date),
                                          new Date(el.startDate),
                                          new Date(el.endDate)
                                        )
                                    );
                                  }}
                                  // boughtDate
                                  slots={{ day: Day }}
                                  slotProps={{
                                    day: {
                                      selectedDay: value,
                                      TimelineData:
                                        GetProductByIdData?.ProductsVariantions?.at(
                                          0
                                        )?.Timeline,
                                    },
                                  }}
                                  onChange={(newValue) => {
                                    if (
                                      GetProductByIdData?.ProductSubCategory ===
                                        "643cda0c53068696706e3951" &&
                                      newValue.day() !== 5
                                    ) {
                                      alert(
                                        "Only Fridays are allowed for selection."
                                      );
                                      return;
                                    }
                                    setValue(newValue);
                                    let enddate = newValue.add(
                                      ReturnDaysFromTimeline(
                                        GetProductByIdData?.ProductsVariantions?.at(
                                          0
                                        )?.Timeline
                                      ),
                                      "day"
                                    );

                                    let arr = fetchDatesBetween(
                                      new Date(newValue),
                                      new Date(enddate)
                                    );

                                    ableddates.map((res) =>
                                      console.log(
                                        "onoonoone",
                                        res.toISOString()
                                      )
                                    );

                                    if (ableddates && arr) {
                                      const matchingDates = ableddates.filter(
                                        (date) =>
                                          arr.includes(date.toISOString())
                                      );

                                      if (
                                        matchingDates.length === arr?.length
                                      ) {
                                        let IdString = generateRandomId(8);

                                        // Check if any of the dates in the new object already exist in the array
                                        const duplicateDates =
                                          matchingDates.some((newDate) =>
                                            boughtDate.some((obj) => {
                                              for (let i = 0; i <= 6; i++) {
                                                if (
                                                  obj[i] &&
                                                  obj[i].getTime() ===
                                                    new Date(newDate).getTime()
                                                ) {
                                                  return true;
                                                }
                                              }
                                              return false;
                                            })
                                          );

                                        if (duplicateDates) {
                                          alert(
                                            "One or more dates already exist in selected dates please select another date."
                                          );
                                          return;
                                        }

                                        // If all dates are unique, add the new object to the array
                                        setBoughtDates([
                                          ...boughtDate,
                                          { ...matchingDates, IdString },
                                        ]);
                                        console.log(
                                          "Object added successfully."
                                        );
                                      } else {
                                        console.log("No matching dates found");
                                        alert(
                                          "One or more of the selected dates is not available to buy. Please select another date."
                                        );
                                      }
                                    }
                                  }}
                                />
                              </LocalizationProvider>
                            )}
                          </Box>
                        </Modal>
                      </Grid>
                      {GetProductByIdData?.ProductSubCategory ===
                        "647713dcb530d22fce1f6c36" ||
                      GetProductByIdData?.ProductSubCategory ===
                        "643cda0c53068696706e3951" ? null : (
                        <Grid xl={4} lg={4} md={4} sm={4} xs={4}>
                          <Box
                            sx={{
                              width: "100%",
                            }}
                          >
                            <Typography
                              sx={{
                                ...tableHeader,
                                fontWeight: 600,
                                fontSize: "18px",
                                lineHeight: "27px",
                              }}
                            >
                              How Many Units you would like to buy?
                            </Typography>
                            {/* <Box
                          sx={{
                            border: "1px solid #8C8C8C",
                            width: "255px",
                            height: "53px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            px: 1,
                            mt: "0.8%",
                          }}
                        > */}
                            {/* <TextField */}
                            <TextField
                              id=""
                              label="unit to be bought"
                              sx={{ width: "90%", borderRadius: "20px", mt: 1 }}
                              onChange={(e) => {
                                setUnitsToBebought(e.target.value);
                              }}
                            />
                          </Box>
                        </Grid>
                      )}

                      <Grid xl={4} lg={4} md={4} sm={4} xs={4}>
                        {GetProductByIdData?.ProductsVariantions.at(0)
                          ?.maxTimeslotSeconds ? (
                          <Box
                            sx={{
                              width: "100%",
                            }}
                          >
                            <Typography
                              sx={{
                                ...tableHeader,
                                fontWeight: 600,
                                fontSize: "18px",
                                lineHeight: "27px",
                              }}
                            >
                              How Many Seconds you would like to buy?
                            </Typography>
                            <Select
                              sx={{ width: "95%", mt: 1 }}
                              onChange={(e) => {
                                console.log("edate", e.target.value);
                                setBoughtSeconds(e.target.value);
                              }}
                              defaultValue={120}
                            >
                              {filterMultiples(
                                SecondsFieldArr,
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.minTimeslotSeconds
                              )?.map((item, idx) => {
                                if (
                                  Number(
                                    GetProductByIdData?.ProductsVariantions.at(
                                      0
                                    )?.maxTimeslotSeconds
                                  ) < Number(item)
                                )
                                  return null;
                                if (
                                  Number(
                                    GetProductByIdData?.ProductsVariantions.at(
                                      0
                                    )?.minTimeslotSeconds
                                  ) > Number(item)
                                )
                                  return null;
                                return <MenuItem value={item}>{item}</MenuItem>;
                              })}
                            </Select>
                          </Box>
                        ) : null}
                      </Grid>
                    </Grid>

                    <Box>
                      <Typography
                        sx={{
                          ...tableHeader,
                          fontWeight: 600,
                          fontSize: "18px",
                          lineHeight: "27px",
                        }}
                      >
                        Selected Dates
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: "20px",
                          mt: "0.8%",
                        }}
                      >
                        {GetProductByIdData?.ProductsVariantions?.at(0)
                          ?.Timeline === "Day" ||
                        GetProductByIdData?.ProductsVariantions?.at(0)
                          ?.Timeline === "One Time"
                          ? boughtDate?.map((item, idx) => {
                              return (
                                <>
                                  <Box
                                    sx={{
                                      // background: "#F2F2F2",
                                      background: "rgba(243, 246, 249, 0.4)",

                                      padding: "10px",
                                      borderRadius: "10px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...selectdate,
                                      }}
                                    >
                                      {new Date(item).toDateString()}
                                    </Typography>
                                    <Button
                                      onClick={() => {
                                        // remove only this date from the array
                                        setBoughtDates(
                                          boughtDate.filter(
                                            (item, index) => index !== idx
                                          )
                                        );
                                      }}
                                    >
                                      {" "}
                                      X
                                    </Button>
                                  </Box>
                                </>
                              );
                            })
                          : boughtDate?.map((item) => {
                              console.log("item", item);
                              return (
                                <Box
                                  sx={{
                                    // background: "#F2F2F2",
                                    background: "rgba(243, 246, 249, 0.4)",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    textAlign: "center",
                                  }}
                                >
                                  {/* {Object.entries(item).map(([key, value]) => {
                                    console.log("item", key, value);
                                    if (key === "IdString") {
                                      return (
                                        <Button
                                          onClick={() => {
                                            // remove the item from the array
                                            setBoughtDates(
                                              boughtDate.filter(
                                                (item) =>
                                                  item.IdString !== value
                                              )
                                            );
                                          }}
                                        >
                                          X
                                        </Button>
                                      );
                                    } else {
                                      return (
                                        <Typography>
                                          {new Date(value).toDateString()}
                                        </Typography>
                                      );
                                    }
                                  })} */}
                                  {Object.entries(item).map(
                                    ([key, value], index, array) => {
                                      console.log("item", key, value);
                                      if (
                                        index === 0 ||
                                        index === array.length - 2 ||
                                        index === array.length - 1
                                      ) {
                                        if (key === "IdString") {
                                          return (
                                            <Button
                                              onClick={() => {
                                                // remove the item from the array
                                                setBoughtDates(
                                                  boughtDate.filter(
                                                    (item) =>
                                                      item.IdString !== value
                                                  )
                                                );
                                              }}
                                            >
                                              X
                                            </Button>
                                          );
                                        } else {
                                          if (index === 0) {
                                            return (
                                              <Typography
                                                sx={{
                                                  ...selectdate,
                                                }}
                                              >
                                                From :{" "}
                                                {new Date(value).toDateString()}
                                              </Typography>
                                            );
                                          } else if (
                                            index ===
                                            array.length - 2
                                          ) {
                                            return (
                                              <Typography
                                                sx={{
                                                  ...selectdate,
                                                }}
                                              >
                                                To :{" "}
                                                {new Date(value).toDateString()}
                                              </Typography>
                                            );
                                          }

                                          // return (
                                          //   <Typography>
                                          //     {new Date(value).toDateString()}
                                          //   </Typography>
                                          // );
                                        }
                                      }
                                      return null;
                                    }
                                  )}
                                </Box>
                              );
                            })}
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexdirection: "row",
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "35%",
                        }}
                      >
                        <Typography
                          sx={{
                            ...tableHeader,
                            fontWeight: 600,
                            fontSize: "16px",
                            lineHeight: "27px",
                          }}
                        >
                          GST
                        </Typography>
                        <Box
                          sx={{
                            background: "rgba(243, 246, 249, 0.4)",
                            width: "315px",
                            height: "53px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            px: 1,
                            mt: "0.8%",
                          }}
                        >
                          <Typography sx={{ ...tableData, fontWeight: 500 }}>
                            {GetProductByIdData?.mediaVariation?.GST}%
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          width: "35%",
                        }}
                      >
                        <Typography
                          sx={{
                            ...tableHeader,
                            fontWeight: 600,
                            fontSize: "16px",
                            lineHeight: "27px",
                          }}
                        >
                          Total{" "}
                          {
                            GetProductByIdData?.ProductsVariantions.at(0)
                              ?.Timeline
                          }
                        </Typography>
                        <Box
                          sx={{
                            // border: "1px solid #8C8C8C",
                            // width: "255px",
                            // height: "53px",
                            // borderRadius: "10px",
                            // display: "flex",
                            // justifyContent: "flex-start",
                            // alignItems: "center",
                            // px: 1,
                            // mt: "0.8%",
                            background: "rgba(243, 246, 249, 0.4)",
                            width: "315px",
                            height: "53px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            px: 1,
                            mt: "0.8%",
                          }}
                        >
                          <Typography
                            sx={{
                              ...tableData,
                              color: "#445FD2",
                            }}
                          >
                            {boughtDate?.length === 0
                              ? "0"
                              : boughtDate?.length}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          width: "35%",
                        }}
                      >
                        <Typography
                          sx={{
                            ...tableHeader,
                            fontWeight: 600,
                            fontSize: "16px",
                            lineHeight: "27px",
                          }}
                        >
                          Total Price
                        </Typography>
                        <Box
                          sx={{
                            background: "rgba(243, 246, 249, 0.4)",
                            width: "315px",
                            height: "53px",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            px: 1,
                            mt: "0.8%",
                          }}
                        >
                          <Typography
                            sx={{
                              ...tableData,
                              fontWeight: 500,
                              display: "flex",
                              flexDirection: "raw",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            {boughtDate?.length === 0 || unitsToBebought === 0
                              ? GetProductByIdData?.mediaVariation
                                  ?.DiscountedPrice
                              : GetProductByIdData?.mediaVariation
                                  ?.DiscountedPrice *
                                boughtDate?.length *
                                unitsToBebought}
                            <Box
                              component="img"
                              src={BXITokenIcon}
                              sx={{ height: "18px", width: "18px" }}
                            />
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          ...tableHeader,
                          fontWeight: 600,
                          fontSize: "18px",
                          lineHeight: "27px",
                        }}
                      >
                        Content
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "20px",
                        }}
                      >
                        <Typography
                          sx={{
                            ...selectdate,
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "24px",
                            color: "#445FD2",
                            borderBottom: "1px solid #445FD2",
                          }}
                        >
                          Upload your data here
                        </Typography>
                      </Box>
                    </Box>

                    {GetProductByIdData?.OtherCost &&
                    GetProductByIdData?.OtherCost?.length !== 0 ? (
                      <Box mt={2}>
                        <Typography
                          sx={{
                            ...product,
                            fontWeight: 600,
                            fontSize: "18px",
                            lineHeight: "30px",
                          }}
                        >
                          Additional Cost
                        </Typography>
                        {GetProductByIdData?.OtherCost?.length === 0
                          ? ""
                          : GetProductByIdData?.OtherCost?.map((cost) => {
                              console.log("cost", cost);
                              const newValue = cost?.CostPrice.toFixed(2);
                              return (
                                <>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      gap: "60px",
                                      mt: 1,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        minWidth: "160px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          ...fetchValue,
                                        }}
                                      >
                                        {" "}
                                        {cost?.ReasonOfCost}{" "}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        minWidth: "160px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          ...fetchValue,
                                        }}
                                      >
                                        HSN - {cost?.AdCostHSN}{" "}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        minWidth: "160px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          ...fetchValue,
                                        }}
                                      >
                                        GST - {cost?.AdCostHSN} %
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        minWidth: "160px",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          ...fetchValue,
                                        }}
                                      >
                                        {cost?.AdCostApplicableOn}
                                      </Typography>
                                    </Box>
                                    <Box
                                      sx={{
                                        gap: "5px",
                                        minWidth: "160px",
                                        display: "flex",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          ...fetchValue,
                                        }}
                                      >
                                        {newValue}
                                      </Typography>
                                      <Typography>
                                        {cost.currencyType === "BXITokens" ? (
                                          <Box
                                            component="img"
                                            src={BXITokenIcon}
                                            alt="token"
                                            sx={{
                                              height: "auto",
                                              width: "15px",
                                              marginTop: "6px",
                                            }}
                                          />
                                        ) : (
                                          <Typography
                                            sx={{
                                              fontSize: "20px",
                                              ml: 1,
                                            }}
                                          >
                                            ₹
                                          </Typography>
                                        )}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </>
                              );
                            })}
                      </Box>
                    ) : null}
                    {GetProductByIdData?.OtherInformationBuyerMustKnowOrRemarks ? (
                      <Box sx={{ mt: 3 }}>
                        <Typography sx={cost}>Remarks </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            width: "95%",
                            gap: "10px",
                            mt: 1,
                          }}
                        >
                          {GetProductByIdData?.OtherInformationBuyerMustKnowOrRemarks?.map(
                            (el, idx) => {
                              return (
                                <>
                                  <Typography sx={otherCostText}>
                                    {idx + 1}.
                                  </Typography>
                                  <Typography sx={otherCostText}>
                                    {el}
                                  </Typography>
                                </>
                              );
                            }
                          )}
                        </Box>
                      </Box>
                    ) : null}
                  </Box>
                </Grid>
              </Grid>
              <Box>
                <Typography sx={pack}>Technical Information</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <Typography sx={inclusiveheader}>
                    Supporting you would get from Seller
                  </Typography>
                  {GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer
                    ? Object?.keys(
                        GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer
                      ).map((el, idx) => {
                        if (
                          GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer[
                            el
                          ] === "on"
                        ) {
                          return (
                            <>
                              <Typography
                                sx={{
                                  ...packHead,
                                  color: "#6B7A99",
                                  fontWeight: 400,
                                  fontSize: "16px",
                                  display: "flex",
                                  gap: "10px",
                                }}
                              >
                                {" "}
                                {el}
                              </Typography>
                            </>
                          );
                        } else {
                          return null;
                        }
                      })
                    : null}{" "}
                </Box>

                <Box>
                  <Typography sx={inclusiveheader}>
                    Dimensions of Ad / Content Needed
                  </Typography>
                  <Box sx={{ pt: "0.8%" }}>
                    <Typography sx={dots}>
                      {GetProductByIdData?.Dimensions}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography sx={pack}>Key Features</Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Grid
                    container
                    mt={4}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    {ProductFeatures?.map((res) => {
                      return (
                        <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                          <Box
                            sx={{
                              // px: 2,
                              display: "flex",
                              // flexWrap: "wrap",
                              textAlign: "start",
                              flexDirection: "row",
                              gap: "100px",
                              mt: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: "20px",
                                width: "100%",
                              }}
                            >
                              {/* <Box
                                      component="img"
                                      src={bxifeature}
                                      sx={{ height: "80px", width: "30px" }}
                                    /> */}
                              <FeatureName name={res?.name} />
                              <Box
                                sx={{
                                  width: "80%",
                                  maxWidth: "825px",
                                  height: "auto",
                                  wordWrap: "break-word",
                                }}
                              >
                                <Typography sx={packHead}>
                                  {res.name}
                                </Typography>
                                <Typography sx={packVal}>
                                  {res.description}{" "}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Grid container>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <Typography sx={{ ...semi, color: "#156DB6" }}>
                    {/* {GetProductByIdData?.ProductName} */}
                    Product Information
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      mx: "auto",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: "5px",
                    }}
                  >
                    <DiscountedPrice
                      regularPrice={
                        GetProductByIdData?.ProductsVariantions?.at(0)
                          ?.PricePerUnit
                      }
                      discountPrice={
                        GetProductByIdData?.ProductsVariantions?.at(0)
                          ?.DiscountedPrice
                      }
                      GetProductByIdData={GetProductByIdData}
                      // regularPrice={10000}
                      // discountPrice={5000}
                    />
                  </Box>

                  <Box
                    mt={4}
                    sx={{
                      width: "100%",
                      mx: "auto",
                    }}
                  >
                    <Grid container sx={{ width: "90%" }}>
                      {GetProductByIdData?.medianame ? (
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>Brand Name</Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.medianame}
                          </Typography>
                        </Grid>
                      ) : null}
                      {GetProductByIdData?.multiplexScreenName ? (
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>
                            Multiplex Name
                          </Typography>
                          <Typography sx={fetchValue}>
                            {GetProductByIdData?.multiplexScreenName}
                          </Typography>
                        </Grid>
                      ) : null}
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        {GetProductByIdData?.offerningbrandat ? (
                          <>
                            <Typography sx={tableHeader}>
                              {" "}
                              Offering At
                            </Typography>
                            <Typography
                              sx={{ ...fetchValue, whiteSpace: "nowrap" }}
                            >
                              {GetProductByIdData?.offerningbrandat}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography sx={tableHeader}>
                              {" "}
                              Position of the Ad ?
                            </Typography>
                            <Typography
                              sx={{
                                ...fetchValue,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {GetProductByIdData?.adPosition}
                            </Typography>
                          </>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 4, width: "90%" }}>
                      {GetProductByIdData?.ProductsVariantions.at(0)
                        ?.location ? (
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>Location</Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.location
                            }
                          </Typography>
                        </Grid>
                      ) : null}
                      {GetProductByIdData?.ProductsVariantions.at(0)?.Type ? (
                        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                          <Typography sx={tableHeader}>Type</Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.Type
                            }
                          </Typography>
                        </Grid>
                      ) : null}
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        {GetProductByIdData?.ProductsVariantions.at(0)?.unit ? (
                          <>
                            <Typography sx={tableHeader}>Unit</Typography>
                            <Typography sx={fetchValue}>
                              Per{" "}
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.unit
                              }
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography sx={tableHeader}>
                              Release Details
                            </Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.releasedetails
                              }
                            </Typography>
                          </>
                        )}
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        {GetProductByIdData?.ProductsVariantions.at(0)
                          ?.Timeline ? (
                          <>
                            <Typography sx={tableHeader}> Timeline</Typography>
                            <Typography sx={fetchValue}>
                              Per{" "}
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.Timeline
                              }
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography sx={tableHeader}> Edition</Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.edition
                              }
                            </Typography>
                          </>
                        )}
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        {GetProductByIdData?.ProductsVariantions.at(0)
                          ?.repetition ? (
                          <>
                            <Typography sx={tableHeader}>
                              {" "}
                              Repetition
                            </Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.repetition
                              }
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography sx={tableHeader}>Ad Type</Typography>
                            <Typography sx={fetchValue}>
                              {
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.adType
                              }
                            </Typography>
                          </>
                        )}
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        <Typography sx={tableHeader}>Dimension Size</Typography>
                        <Typography sx={fetchValue}>
                          {
                            GetProductByIdData?.ProductsVariantions.at(0)
                              ?.dimensionSize
                          }
                        </Typography>
                      </Grid>
                      <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        <Typography sx={tableHeader}>GST</Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.ProductsVariantions.at(0)?.GST} %
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mt: 4, width: "90%" }}>
                      <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                        <Typography sx={tableHeader}>
                          {" "}
                          Min - Max Order Quantity Timeline
                        </Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.ProductsVariantions.at(0)
                            ?.minOrderQuantitytimeline
                            ? `${
                                GetProductByIdData?.ProductsVariantions.at(0)
                                  ?.minOrderQuantitytimeline
                              } - ${
                                GetProductByIdData?.ProductsVariantions?.at(0)
                                  ?.maxOrderQuantitytimeline
                              }`
                            : "N/A"}{" "}
                          {""} /{" "}
                          {
                            GetProductByIdData?.ProductsVariantions.at(0)
                              ?.Timeline
                          }
                        </Typography>
                      </Grid>

                      {GetProductByIdData?.ProductSubCategory ===
                      "643cda0c53068696706e3951" ? null : (
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                          <Typography sx={tableHeader}>
                            {" "}
                            Min - Max Order Quantity Unit
                          </Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.minOrderQuantityunit
                            }{" "}
                            -
                            {
                              GetProductByIdData?.ProductsVariantions?.at(0)
                                ?.maxOrderQuantityunit
                            }
                            /{" "}
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.unit
                            }
                          </Typography>
                        </Grid>
                      )}

                      {GetProductByIdData?.ProductsVariantions?.at(0)
                        ?.minTimeslotSeconds ? (
                        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                          <Typography sx={tableHeader}>
                            {" "}
                            Min - Max Timeslot
                          </Typography>
                          <Typography sx={fetchValue}>
                            {
                              GetProductByIdData?.ProductsVariantions.at(0)
                                ?.minTimeslotSeconds
                            }{" "}
                            -
                            {
                              GetProductByIdData?.ProductsVariantions?.at(0)
                                ?.maxTimeslotSeconds
                            }
                            / Seconds {""}{" "}
                          </Typography>
                        </Grid>
                      ) : null}
                    </Grid>
                    <Grid container sx={{ mt: 5, width: "90%" }}>
                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Typography sx={tableHeader}>Region</Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.GeographicalData?.region}
                        </Typography>
                      </Grid>
                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Typography sx={tableHeader}> State</Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.GeographicalData?.state}
                        </Typography>
                      </Grid>

                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Typography sx={tableHeader}>City</Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.GeographicalData?.city}
                        </Typography>
                      </Grid>
                      <Grid item xl={2.4} lg={2.4} md={2.4} sm={2.4} xs={2.4}>
                        <Typography sx={tableHeader}> Landmark</Typography>
                        <Typography sx={fetchValue}>
                          {GetProductByIdData?.GeographicalData?.landmark}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>

                  {GetProductByIdData?.OtherCost &&
                  GetProductByIdData?.OtherCost?.length !== 0 ? (
                    <Box mt={2}>
                      <Typography
                        sx={{
                          ...product,
                          fontWeight: 600,
                          fontSize: "18px",
                          lineHeight: "30px",
                        }}
                      >
                        Additional Cost
                      </Typography>
                      {GetProductByIdData?.OtherCost?.length === 0
                        ? ""
                        : GetProductByIdData?.OtherCost?.map((cost) => {
                            console.log("cost", cost);
                            const newValue = cost?.CostPrice.toFixed(2);
                            return (
                              <>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: "60px",
                                    mt: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      minWidth: "160px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...fetchValue,
                                      }}
                                    >
                                      {" "}
                                      {cost?.ReasonOfCost}{" "}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      minWidth: "160px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...fetchValue,
                                      }}
                                    >
                                      HSN - {cost?.AdCostHSN}{" "}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      minWidth: "160px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...fetchValue,
                                      }}
                                    >
                                      GST - {cost?.AdCostHSN} %
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      minWidth: "160px",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...fetchValue,
                                      }}
                                    >
                                      {cost?.AdCostApplicableOn}
                                    </Typography>
                                  </Box>
                                  <Box
                                    sx={{
                                      gap: "5px",
                                      minWidth: "160px",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        ...fetchValue,
                                      }}
                                    >
                                      {newValue}
                                    </Typography>
                                    <Typography>
                                      {cost.currencyType === "BXITokens" ? (
                                        <Box
                                          component="img"
                                          src={BXITokenIcon}
                                          alt="token"
                                          sx={{
                                            height: "auto",
                                            width: "15px",
                                            marginTop: "6px",
                                          }}
                                        />
                                      ) : (
                                        <Typography
                                          sx={{
                                            fontSize: "20px",
                                            ml: 1,
                                          }}
                                        >
                                          ₹
                                        </Typography>
                                      )}
                                    </Typography>
                                  </Box>
                                </Box>
                              </>
                            );
                          })}
                    </Box>
                  ) : null}
                  {GetProductByIdData?.OtherInformationBuyerMustKnowOrRemarks
                    .length === 0 ? null : (
                    <>
                      <Box sx={{ mt: 3 }}>
                        <Typography sx={cost}>Remarks </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            width: "95%",
                            gap: "10px",
                            mt: 1,
                          }}
                        >
                          {GetProductByIdData?.OtherInformationBuyerMustKnowOrRemarks.map(
                            (item) => {
                              return (
                                <>
                                  <Typography sx={otherCostText}>
                                    {item}
                                  </Typography>
                                </>
                              );
                            }
                          )}
                        </Box>
                      </Box>
                    </>
                  )}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Box>
                <Typography sx={pack}>Technical Information</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                  }}
                >
                  <Typography sx={inclusiveheader}>
                    Supporting you would get from Seller
                  </Typography>
                  {GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer
                    ? Object?.keys(
                        GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer
                      ).map((el, idx) => {
                        if (
                          GetProductByIdData?.WhatSupportingYouWouldGiveToBuyer[
                            el
                          ] === "on"
                        ) {
                          return (
                            <>
                              <Typography
                                sx={{
                                  ...packHead,
                                  color: "#6B7A99",
                                  fontWeight: 400,
                                  fontSize: "16px",
                                  display: "flex",
                                  gap: "10px",
                                }}
                              >
                                {" "}
                                {el}
                              </Typography>
                            </>
                          );
                        } else {
                          return null;
                        }
                      })
                    : null}{" "}
                </Box>

                <Box>
                  <Typography sx={inclusiveheader}>
                    Dimensions of Ad / Content Needed
                  </Typography>
                  <Box sx={{ pt: "0.8%" }}>
                    <Typography sx={dots}>
                      {GetProductByIdData?.Dimensions}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="4">
              <Box>
                <Typography sx={pack}>Key Features</Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Grid
                    container
                    mt={4}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    {ProductFeatures?.map((res) => {
                      return (
                        <Grid item xl={3} lg={3} md={4} sm={6} xs={6}>
                          <Box
                            sx={{
                              px: 2,
                              display: "flex",
                              // flexWrap: "wrap",
                              textAlign: "start",
                              flexDirection: "row",
                              gap: "100px",
                              mt: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: "20px",
                                width: "100%",
                              }}
                            >
                              {/* <Box
                                      component="img"
                                      src={bxifeature}
                                      sx={{ height: "80px", width: "30px" }}
                                    /> */}
                              <FeatureName name={res?.name} />
                              <Box
                                sx={{
                                  width: "80%",
                                  maxWidth: "825px",
                                  height: "auto",
                                  wordWrap: "break-word",
                                }}
                              >
                                <Typography sx={packHead}>
                                  {res.name}
                                </Typography>
                                <Typography sx={packVal}>
                                  {res.description}{" "}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={BookButtonStyle}
          >
            {MediaData?.body?.find(
              (item) => item?.ProductId?._id === ProductId
            ) ? (
              <Button
                variant="contained"
                sx={CartButtonStyle}
                onClick={() => navigate("/home/cart")}
              >
                Go To Cart
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={CartButtonStyle}
                onClick={() => {
                  // if Product is Newspaper
                  if (
                    GetProductByIdData?.ProductSubCategory ===
                      "647713dcb530d22fce1f6c36" ||
                    GetProductByIdData?.ProductSubCategory ===
                      "643cda0c53068696706e3951"
                  ) {
                    console.log("hello", boughtDate?.length);
                    // setUnitsToBebought(boughtDate?.length);
                    if (boughtDate?.length === 0) {
                      console.log("Please Select Date");
                      alert("Please Select Date");
                    } else {
                      handleAddToCart(ProductId);
                    }
                  } else {
                    // if product is not newspaper
                    if (boughtDate?.length === 0) {
                      console.log("Please Select Date");
                      alert("Please Select Date");
                    } else if (unitsToBebought === 0) {
                      alert("Please Select Units");
                    } else if (
                      Number(unitsToBebought) >
                      Number(
                        GetProductByIdData?.ProductsVariantions.at(0)
                          ?.maxOrderQuantityunit
                      )
                    ) {
                      console.log(
                        "hello",
                        unitsToBebought >
                          GetProductByIdData?.ProductsVariantions.at(0)
                            ?.maxOrderQuantityunit,
                        unitsToBebought,
                        GetProductByIdData?.ProductsVariantions.at(0)
                          ?.maxOrderQuantityunit
                      );
                      alert("Units Should not be more than max Qty");
                    } else if (
                      Number(unitsToBebought) <
                      Number(
                        GetProductByIdData?.ProductsVariantions.at(0)
                          ?.minOrderQuantityunit
                      )
                    ) {
                      console.log(
                        "hello",
                        unitsToBebought <
                          GetProductByIdData?.ProductsVariantions.at(0)
                            ?.minOrderQuantityunit,
                        unitsToBebought,
                        GetProductByIdData?.ProductsVariantions.at(0)
                          ?.minOrderQuantityunit
                      );
                      alert("Units Should not be less than min Qty");
                    } else {
                      handleAddToCart(ProductId);
                    }
                  }
                }}
              >
                Add To Cart
              </Button>
            )}
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

const inclusiveheader = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xs: "12px",
    sm: "15px",
    md: "16px",
    lg: "16px",
    xl: "16px",
  },
  color: "#6B7A99",
  width: {
    xl: "80%",
    lg: "80%",
    md: "65%",
    sm: "100%",
    xs: "100%",
  },
  pt: "1%",
};

// const listText = {
//   fontFamily: "Poppins",
//   fontStyle: "normal",
//   fontWeight: 400,
//   fontSize: {
//     xs: "12px",
//     sm: "15px",
//     md: "16px",
//     lg: "16px",
//     xl: "16px",
//   },

//   color: "#6B7A99",
// };
const otherCostText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  color: "#6B7A99",
};

const cost = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "18px",
  color: "#6B7A99",
};
const otherCostValue = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  color: "rgba(68, 95, 210, 1)",
};
const dots = {
  display: "flex",
  gap: "8px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xs: "20px",
    sm: "15px",
    md: "16px",
    lg: "16px",
    xl: "16px",
  },
  textAlign: "justify",
  color: "#6B7A99",
};

const pack = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "2.2rem",
    lg: "2.2rem",
    md: "2.2rem",
    sm: "2rem",
    xs: "2rem",
  },
  textAlign: {
    xl: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
  color: "#6B7A99",
};
const fetchValue = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 450,
  fontSize: "14px",
  color: "#B1B1B1",
  marginTop: "7px",
};
const packHead = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.6rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  color: "#ADB8CC",
};

const packVal = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.6rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  color: "#6B7A99",
};

const tableData = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.6rem",
    sm: "1.6rem",
    xs: "1.5rem",
  },
  color: "#B1B1B1",
  lineHeight: "4rem",
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
};

const tableHeader = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.6rem",
    lg: "1.6rem",
    md: "1.6rem",
    sm: "1.4rem",
    xs: "1rem",
  },
  color: "#6B7A99",
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
};

const mainText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "24px",
  color: "#6B7A99",
  p: 3,
};

const HeaderContainerStyle = { px: "2rem" };
const PageHeader = {
  display: "flex",
  background: "#fff",
  width: "100%",
  py: "20px",
  position: "relative",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
};

const AppBarTypoStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "24px",
    lg: "24px",
    md: "20px",
    sm: "16px",
    xs: "12px",
  },
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  width: "100%",
  px: "15%",
  color: "#4D4D4D",
};

const MainTabStyle = {
  width: "100%",
};

const TabTextStyle = {
  color: "#B1B1B1",
  fontFamily: "poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "14px",
    sm: "12px",
    xs: "10px",
  },
  letterSpacing: "0.02em",
  textTransform: "none",
};

const TypographyTitleText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "20px",
    lg: "20px",
    md: "20px",
    sm: "16px",
    xs: "16px",
  },
  color: "#6B7A99",
  // py: "8px",
};

const DescriptionAnswerText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "16px",
    lg: "16px",
    md: "12px",
    sm: "10px",
    xs: "8px",
  },
  textAlign: "justify",
  color: "#6B7A99",
  py: {
    xl: "16px",
    lg: "16px",
    md: "12px",
    sm: "10px",
    xs: "8px",
  },
};

const BookButtonStyle = {
  py: "16px",
  textAlign: "center",
};

const CartButtonStyle = {
  width: "90%",
  fontSize: {
    xl: "16px",
    lg: "16px",
    md: "12px",
    sm: "10px",
    xs: "8px",
  },
  fontFamily: "poppins",
  fontStyle: "normal",
  fontWeight: 500,
  background: "#445FD2",
  ":hover": {
    background: "#445FD2",
  },
  textTransform: "none",
};

const semi = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "2.4rem",
    lg: "2.4rem",
    md: "2.2rem",
    sm: "2rem",
    xs: "2rem",
  },
  color: "#6B7A99",
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
};
const semiPrice = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "2.4rem",
    lg: "2.4rem",
    md: "2.4rem",
    sm: "2.4rem",
    xs: "2.4rem",
  },
  letterSpacing: "0.06em",
  textTransform: "capitalize",
  color: "#6B7A99",
  textAlign: {
    x: "start",
    lg: "start",
    md: "start",
    sm: "start",
    xs: "center",
  },
};

const selectdate = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "21px",
  color: "#6B7A99",
};
const product = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "2.4rem",
    lg: "2.4rem",
    md: "2.2rem",
    sm: "2.2rem",
    xs: "2.1rem",
  },
  color: "#6B7A99",
};
const listText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.6rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  color: "#6B7A99",
};
