import {
  Paper,
  Box,
  Typography,
  Button,
  Modal,
  Grid,
  Tabs,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";

import React, { useEffect, useState, useRef } from "react";
import UserIcon from "../../assets/HeaderIcon/User.png";
import CartIcon from "../../assets/HeaderIcon/Cart.png";
import ChatIcon from "../../assets/HeaderIcon/Chat.png";
import NotifyIcon from "../../assets/HeaderIcon/Notification.png";
import SearchIcon from "../../assets/HeaderIcon/Search.png";
import LogoIcon from "../../assets/HeaderIcon/logo.svg";
import { Link } from "react-router-dom";
// import { useGetCartData } from "../../Hooks/ProductActions/useGetCartData";
// import MarketplaceNotification from "./MarketplaceNotification.jsx";
import FullScreenIcon from "../../assets/HeaderIcon/FullScreenIcon.svg";
import CloseIconForNotification from "../../assets/HeaderIcon/CloseIconForNotification.svg";
import NotificationAvatar from "../../assets/HeaderIcon/NotificationAvatar.svg";
import OrderAccept from "../../assets/HeaderIcon/OrderAccept.svg";
import OrderReject from "../../assets/HeaderIcon/OrderReject.svg";
import Tab from "@mui/material/Tab";
import TabScrollButton from "@mui/material/TabScrollButton";
import axios from "axios";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";
import Avatargenerator from "../AvatarGenerator";
import TabContext from "@mui/lab/TabContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "timeago.js";
import { socket } from "../../pages/Message/Message";
import { allNotification } from "../../redux/action/Notification/getNotifications";
import { notifications } from "../../redux/action/Notification/notification";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetCompanyDetails } from "../../Hooks/Auth";
import { getProduct } from "../../redux/action/Home-Filter/products";
import { LastSeenSet } from "../../redux/action/Chat/LastSeen";
import { GetLastSeens } from "../../redux/action/Chat/GetLastSeen";
import barterLogo from "../../assets/BXI_LOGO.png";

import useGetAuthUser from "../../Hooks/LoggedInUser/useGetAuthUser";
import { toast, ToastContainer } from "react-toastify";
import { nullable } from "zod";
import PageLoader from "../LoadingButton/PageLoader";

const Header = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: loggedInUserData } = useGetLoggedInUser();
  const [CheckCompanyType, setCheckCompanyType] = useState("");
  const [Pathdata, setPathData] = useState(false);

  const { data: AuthUserData } = useGetAuthUser();
  // console.log("AuthUserData", AuthUserData?.data?.productRights);

  const { data: CompanyData } = useGetCompanyDetails();
  const NavigateFunction = () => {
    if (CheckCompanyType === "Media") {
      navigate("/home/MediaOnlinePhysical");
    } else if (
      localStorage.getItem("companyType") == "Entertainment & Events"
    ) {
      navigate("/home/eephysical");
    } else {
      navigate("/home/physical");
    }
  };

  const fetchompanyType = async () => {
    await axios
      .get(`company_type/get_companyType/${CompanyData?.data?.companyType}`)
      .then((res) => {
        console.log("res.data.CompanyTypeName", res.data.CompanyTypeName);
        setCheckCompanyType(res.data.CompanyTypeName);
        localStorage.setItem("companyType", res?.data?.CompanyTypeName);
        // console.log("res.data.CompanyTypeName", res.data.CompanyTypeName);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    fetchompanyType();
  }, []);

  useEffect(() => {
    fetchompanyType();
  }, [NavigateFunction]);

  const path = location.pathname.split("/").pop();

  const [cartItems, setCartItems] = useState(0);
  const [notification, setNotification] = useState([]);
  const [notificationRead, setNotificationRead] = useState(false);
  const [notificationDot, setNotificationDot] = useState(false);
  const [cartUpdateNotification, setCartUpdateNotification] = useState(false);
  const [messagenotificationDot, setMessageNotificationDot] = useState(false);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");
  const [totalCountBXIArray, SetTotalCountBXIArray] = useState([]);
  const [totalCountBuyerArray, setTotalCountBuyerArray] = useState([]);
  const [totalCountSellerArray, setTotalCountSellerArray] = useState([]);
  const [incrementAll, setIncrementAll] = useState(false);
  const [incrementBxi, setIncrementBxi] = useState(false);
  const [incrementBuy, setIncrementBuy] = useState(false);
  const [incrementSeller, setIncrementSeller] = useState(false);
  const [unReadCountOfAll, setUnReadCountOfAll] = useState(null);
  const [unReadCountOfBxi, setUnReadCountOfBxi] = useState(null);
  const [unReadCountOfBuyer, setUnReadCountOfBuyer] = useState(null);
  const [unReadCountOfSeller, setUnReadCountOfSeller] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const inputRef = useRef(null);
  const { getNotification } = useSelector((state) => state.allNotifiactions);
  const GetLoggedCompanyData = useSelector((state) => state.GetLoggedCompany);

  const handleStyleChange = () => {
    inputRef.current.style.color = "#C3CAD9";
    inputRef.current.style.fontSize = "14px";
    inputRef.current.style.fontFamily = "Poppins";
  };

  const handleFocus = () => {
    if (isExpanded === false) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const handleBlur = () => {
    setIsExpanded(false);
  };

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
    isRefetching,
  } = useGetLoggedInUser();

  const UpdateNotifications = async (data) => {
    let status = null;

    if (data?.read === false) {
      status = true;
    } else if (data?.read === true) {
      status = false;
    }

    await axios
      .put(
        `notification/updatenotification/${data._id}`,
        { read: status },
        { withCredentials: true }
      )
      .then((res) => {})
      .catch((err) => {});
    dispatch(allNotification(login_User));
  };
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (getNotification) {
      getNotification?.notifications?.map((item) => {
        if (item?.read === false) {
          setNotificationDot(true);
        }
      });
    }
  }, [getNotification]);

  const handleOpen = () => {
    setOpen(true);
    setNotificationDot(false);
    setMessageNotificationDot(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let login_User = loggedInUserData?.data?._id;
  const filterUniqueMessages = (
    messagesWithCount,
    totalCountArray,
    setTotalCountArray
  ) => {
    const uniqueMessages = messagesWithCount.filter(
      (message) => !totalCountArray.some((m) => m._id === message._id)
    );

    setTotalCountArray((prevArray) => {
      const updatedArray = [...prevArray];

      uniqueMessages.forEach((message) => {
        if (!updatedArray.some((m) => m._id === message._id)) {
          updatedArray.push(message);
        }
      });

      return updatedArray;
    });
  };

  // console.log("GetLoggedCompanyData", GetLoggedCompanyData);

  useEffect(() => {
    if (getNotification !== null) {
      setNotification(getNotification?.notifications);

      if (getNotification?.notifications) {
        const AllCount = getNotification.notifications.filter(
          (item) => item.read === false
        );
        setUnReadCountOfAll(AllCount.length);

        const messagesWithCountSeller = getNotification.notifications.filter(
          (item) => {
            return (
              item.message.includes("messages") ||
              item.message.includes("contacted") ||
              item.message.includes("product") ||
              item.message.includes("PI")
            );
          }
        );
        filterUniqueMessages(
          messagesWithCountSeller,
          totalCountSellerArray,
          setTotalCountSellerArray
        );
        const SellerCount = messagesWithCountSeller.filter(
          (item) => item.read === false
        );
        setUnReadCountOfSeller(SellerCount.length);

        const messagesWithCountBuyer = getNotification.notifications.filter(
          (item) => {
            return (
              item.message.includes("confirmed") ||
              item.message.includes("rejected") ||
              item.message.includes("Order")
            );
          }
        );
        filterUniqueMessages(
          messagesWithCountBuyer,
          totalCountBuyerArray,
          setTotalCountBuyerArray
        );
        const BuyerCount = messagesWithCountBuyer.filter(
          (item) => item.read === false
        );
        setUnReadCountOfBuyer(BuyerCount.length);

        const messagesWithCountBXI = getNotification.notifications.filter(
          (item) => item.message.includes("BXI")
        );
        filterUniqueMessages(
          messagesWithCountBXI,
          totalCountBXIArray,
          SetTotalCountBXIArray
        );
        const BxiCount = messagesWithCountBXI.filter(
          (item) => item.read === false
        );
        setUnReadCountOfBxi(BxiCount.length);
      }
    }
  }, [getNotification]);

  useEffect(() => {
    if (login_User) {
      dispatch(allNotification(login_User));
    }
  }, [login_User]);

  useEffect(() => {
    socket.on("notificationS", (data) => {
      if (data !== null) {
        // dispatch(
        //   notifications(data.sellerId, data.buyerId, data.message, data.type)
        // );
        setNotification((prevNotification) => [...prevNotification, data]);
        setNotificationDot(true);
        setIncrementAll(true);
      }
    });

    socket.on("MessagesNotification", (data) => {
      if (data !== null) {
        // dispatch(
        //   notifications(data.senderId, data.ReceiverId, data.message, data.type)
        // );
        setNotification((prevNotification) => [...prevNotification, data]);
        setMessageNotificationDot(true);
        setNotificationDot(true);
        setIncrementAll(true);
      }
    });

    socket.on("QueryNotificationR", (data) => {
      if (data !== null) {
        // dispatch(
        //   notifications(data.sellerId, data.buyerId, data.message, data.type)
        // );
        setNotification((prevNotification) => [...prevNotification, data]);
        setNotificationDot(true);
        setIncrementAll(true);
      }
    });

    socket.on("notificationS", (data) => {
      if (data !== null) {
        // dispatch(
        //   notifications(data.sellerId, data.buyerId, data.message, data.type)
        // );
        setNotification((prevNotification) => [...prevNotification, data]);
        setNotificationDot(true);
        setIncrementAll(true);
      }
    });

    socket.on("OrderTracking", (data) => {
      if (data !== null) {
        console.log("socketdata", data);
        setNotification((prevNotification) => [...prevNotification, data]);
        setNotificationDot(true);
        setIncrementAll(true);
      }
    });

    socket.on("CartUpdate", (data) => {
      setCartUpdateNotification(true);
    });
  }, []);

  function CustomTabScrollButton(props) {
    return <TabScrollButton {...props} style={{ display: "none" }} />;
  }
  let pathData = "";

  if (location.pathname.includes("/home/physical")) {
    pathData = "true";
  } else if (location.pathname.includes("officesupplydetail")) {
    pathData = "false";
  } else if (location.pathname.includes("apprealpreview")) {
    pathData = "true";
  } else if (location.pathname.includes("electronicsdetail")) {
    pathData = "false";
  } else if (location.pathname.includes("lifestyleproductpreview")) {
    pathData = "false";
  } else if (location.pathname.includes("/home/textile")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/fmcg")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/texttileproductInfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/technicalinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/golive")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/officesupply")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/officesupplyproductinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/officesupplytechinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/officesupplygolive")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/electronics")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/electronicsproductinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/electronicstechinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/electronicsgolive")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mediaonline")) {
    pathData = "true";
  } else if (location.pathname.includes("home/MediaOnlinePhysical")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mediaproductinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mediatechinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mediagolive")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mediaoffline")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mediaproductinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mediatechinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mediagolive")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/lifestyledetail/")) {
    pathData = "false";
  } else if (location.pathname.includes("/home/lifestyle")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/lifestyleproductinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/lifestyletechinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/lifestylegolive")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mobilitydetail")) {
    pathData = "false";
  } else if (location.pathname.includes("/home/mobility")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mobility/mobilityproductinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mobility/mobilitytechinfo")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mobility/mobilitygolive")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/mobility/mobilitygolive")) {
    pathData = "true";
  } else if (location.pathname.includes("/home/appreal")) {
    pathData = "false";
  }

  const OffDot = () => {
    setMessageNotificationDot(false);
  };

  let socketId = socket.id;
  useEffect(() => {
    if (socketId !== undefined && login_User !== undefined) {
      socket.emit("newUser", { login_User, socketId });
    }
  });

  useEffect(() => {
    dispatch(
      getProduct(
        search,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        tag
      )
    );
  }, [dispatch, search, tag]);

  useEffect(() => {
    dispatch(GetLastSeens(login_User));
  }, [dispatch, login_User]);

  useEffect(() => {
    window.addEventListener("beforeunload", function (event) {
      dispatch(LastSeenSet(login_User));
      dispatch(GetLastSeens(login_User));
    });
  }, [login_User]);

  const handleClickRedirect = (message) => {
    if (message.includes("messages")) {
      navigate("/home/message");
    } else if (message.includes("contacted")) {
      navigate("/home/message");
    } else if (message.includes("confirmed")) {
      navigate("/home/sellerordersummary");
    } else if (message.includes("rejected")) {
      navigate("/home/sellerordersummary");
    } else if (message.includes("generated")) {
      navigate("/home/sellerordersummary");
    } else if (message.includes("Order")) {
      navigate("/home/order_history");
    }
  };

  // const findCount = (MessageArray) => {
  //   if (MessageArray !== null) {
  //     const allCount = MessageArray?.notifications?.filter(
  //       (item) => item.read === false
  //     );
  //     purchaseorderlist.log(allCount);
  //     setUnReadCountOfAll(allCount);
  //   }
  // };

  // useEffect(() => {
  //   findCount(getNotification);
  // }, [getNotification]);

  if (userData?.data?.termsAcceptStatus === false) {
    return (
      <Box
        sx={{
          position: "relative",
          width: "95%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "row",
          borderBottom: "2px solid #EDEFF2;",
          height: "70px",
          pl: "70px",
          background: "transparent",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            width: "auto",
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            gap: "5px",
            maxWidth: "220px",
          }}
        >
          <Avatargenerator companyname={userData?.data?.companyName} />
          <Typography
            sx={{
              ...UserNameTextStyle,
              width: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              mr: 1,
            }}
          >
            {userData?.data?.companyName}
          </Typography>
        </Box>
      </Box>
    );
  }
  return (
    <React.Fragment>
      <ToastContainer style={{ fontSize: "16px" }} />
      <Paper
        sx={{
          position: "relative",
          borderBottom: "2px solid #EDEFF2;",
          height: "70px",
          pl: "70px",
          background: "transparent",
        }}
        elevation={0}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: "100vw",
            overflowX: "hidden",
            borderRadius: "0px",
            boxShadow: "none",
            display: "flex",
            justifyContent: "space-evenly",
            background: "transparent",
            alignItems: "center",
            alignContent: "center",
            height: "100%",
          }}
          elevation={0}
        >
          <Grid container>
            <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
              {/* <Link
                to={"/home"}
                style={{ textDecoration: "none", width: "300px" }}
              > */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "end",
                  // alignContent: "center",
                  // gap: "8px",
                  width: "100%",
                  // bgcolor: "green",
                }}
              >
                <a
                  href={"/home"}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Box
                    sx={{
                      // bgcolor: "red",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "end",
                      flexDirection: "row",
                      gap: "8px",
                      textDecoration: "none",
                    }}
                  >
                    <img src={barterLogo} alt="" width="45px" />
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "14px",
                        textAlign: "center",
                        color: "#111034",
                        mb: "-4px",
                      }}
                    >
                      Barter Exchange of India
                    </Typography>
                  </Box>
                </a>
              </Box>
              {/* </Link> */}
            </Grid>
            <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
              <Box
                sx={{
                  display: "flex",
                  alignContent: "center",
                  // alignContent: "center",
                  gap: "15px",
                  width: "220px",
                  mx: "auto",
                }}
              >
                {AuthUserData?.data?.productRights === "View & Edit" ? (
                  <Button
                    // disabled={disableButton}
                    // disabled={true}
                    sx={{
                      ...UnActiveExploreButtonStyle,
                      bgcolor: pathData === "true" ? "white" : null,
                      color: pathData === "true" ? "#6B7A99" : "#ADB8CC",
                    }}
                    onClick={NavigateFunction}
                  >
                    Sell
                  </Button>
                ) : (
                  <Button
                    sx={{
                      ...UnActiveExploreButtonStyle,
                      bgcolor: pathData === "true" ? "white" : null,
                      color: pathData === "true" ? "#6B7A99" : "#ADB8CC",
                    }}
                    onClick={() => {
                      return toast.error(
                        "You don't have Permission to sell Products",
                        {
                          position: "top-center",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          progress: undefined,
                          theme: "light",
                        }
                      );
                    }}
                  >
                    Sell
                  </Button>
                )}
                <Button
                  sx={{
                    ...ExploreButtonStyle,
                    bgcolor: pathData === "true" ? "transparent" : "#fff",
                    color: pathData === "true" ? "#ADB8CC" : "#6B7A99",
                  }}
                  onClick={() => navigate("/home")}
                >
                  Buy
                </Button>
              </Box>
            </Grid>
            <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-evenly",
                  alignContent: "center",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    alignContent: "center",
                    gap: "05px",
                    width: "400px",
                  }}
                >
                  {location.pathname === "/home" && (
                    <Box
                      sx={{
                        ...ButtonsStyle,
                        bgcolor: "#FFFFFF",
                        width: isExpanded ? "200px" : "45px",
                        transition: "all 0.6s",
                        height: "45px",
                        display: "flex",
                        justifyContent: "center",
                        // alignItems:"end",
                        alignContent: "end",
                      }}
                    >
                      {isExpanded ? (
                        <input
                          onClick={handleStyleChange}
                          ref={inputRef}
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setTag(e.target.value);
                          }}
                          type="text"
                          placeholder={isExpanded ? "Search" : ""}
                          style={{
                            border: "none",
                            outline: "none",
                            width: "90%",
                            height: "90%",
                            background: "#FFFFFF",
                            display: "flex",
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            boxShadow: "0px 2px 5px rgba(38, 51, 77, 0.03)",
                            borderRadius: "100px 0px 00px 100px",
                            cursor: "pointer",
                            paddingLeft: "15px",
                            fontFamily: "Poppins",
                            fontSize: "14px",
                            color: "#C3CAD9",
                            marginLeft: "5px",
                          }}
                          onBlur={handleBlur}
                        />
                      ) : null}

                      {isExpanded ? (
                        <img
                          src={SearchIcon}
                          onClick={handleFocus}
                          style={{
                            height: "20px",
                            marginRight: "6px",
                          }}
                        />
                      ) : (
                        <img
                          src={SearchIcon}
                          onClick={handleFocus}
                          style={{
                            height: "20px",
                          }}
                        />
                      )}
                    </Box>
                  )}
                  &nbsp;&nbsp;
                  <Box sx={{ ...ButtonsStyle, position: "relative" }}>
                    {notificationDot === true ? (
                      <Box
                        sx={{
                          display: "flex",
                          bgcolor: "red",
                          height: "15px",
                          width: "15px",
                          borderRadius: "20px",
                          position: "absolute",
                          display: "flex",
                          justifyContent: "center",
                          alignContent: "center",
                          alignItems: "center",
                          top: "7px",
                          right: "7px",
                          zIndex: 1,
                          color: "white",
                        }}
                      >
                        {incrementAll === true
                          ? unReadCountOfAll + 1
                          : unReadCountOfAll}
                      </Box>
                    ) : null}

                    <img
                      src={NotifyIcon}
                      alt="CartIcon"
                      width="auto"
                      height={"20px"}
                      style={{
                        cursor: "pointer",
                        padding: "12px",
                      }}
                      onClick={handleOpen}
                    />
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "1rem",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 18,
                              color: "#6B7A99",
                            }}
                          >
                            Notifications
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "20px",
                            }}
                          >
                            <Link
                              to={"/home/fullscreennotification"}
                              style={{ textDecoration: "none" }}
                              onClick={handleClose}
                            >
                              <Box
                                component="img"
                                src={FullScreenIcon}
                                sx={HeaderIcons}
                              ></Box>
                            </Link>
                            <Box
                              component="img"
                              src={CloseIconForNotification}
                              onClick={handleClose}
                              sx={{ ...HeaderIcons }}
                            ></Box>
                          </Box>
                        </Box>
                        <Box>
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {/* <TabContext value={value} variant="fullwidth"> */}
                            <Tabs
                              value={value}
                              onChange={handleChange}
                              variant={
                                window.innerWidth < 1400
                                  ? "scrollable"
                                  : "standard"
                              }
                              scrollButtons={{
                                start: <CustomTabScrollButton />,
                                end: <CustomTabScrollButton />,
                              }}
                              sx={{
                                width: "auto",
                                borderBottom: "1px solid #E5E5E5",
                                wordWrap: "break-word",
                              }}
                            >
                              <Tab label="All" value="1" sx={SubTabStyle} />
                              <Box sx={notificationcount}>
                                {incrementAll === true
                                  ? unReadCountOfAll + 1
                                  : unReadCountOfAll}
                              </Box>
                              <Tab label="BXI" value="2" sx={SubTabStyle} />
                              <Box sx={notificationcount}>
                                {incrementBxi === true
                                  ? unReadCountOfBxi + 1
                                  : unReadCountOfBxi}
                              </Box>
                              <Tab
                                label="Purchase"
                                value="3"
                                sx={{ ...SubTabStyle, ml: "10px" }}
                              />
                              <Box sx={notificationcount}>
                                {incrementBuy === true
                                  ? unReadCountOfBuyer + 1
                                  : unReadCountOfBuyer}
                              </Box>
                              <Tab label="Sell" value="4" sx={SubTabStyle} />
                              <Box sx={notificationcount}>
                                {" "}
                                {incrementSeller === true
                                  ? unReadCountOfSeller + 1
                                  : unReadCountOfSeller}
                              </Box>
                            </Tabs>
                          </Grid>
                        </Box>
                        <Box>
                          <TabContext value={value}>
                            <TabPanel
                              value={"1"}
                              sx={{
                                padding: "0px",
                                boxShadow: 0,
                                "::before": {
                                  height: "0px",
                                  left: "0px",
                                },
                              }}
                            >
                              {notification?.map((notification, idx) => {
                                return (
                                  <Accordion
                                    key={idx}
                                    sx={{
                                      boxshadow: "0px 0px 0px 0px",
                                      border: "none",
                                      boxShadow: 0,
                                      "::before": {
                                        height: "0px",
                                        left: "0px",
                                      },
                                    }}
                                  >
                                    <Box
                                      // expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                      sx={{
                                        mt: 1,
                                        position: "relative",
                                        "::before": {
                                          height: "0px",
                                          left: "0px",
                                        },
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display:
                                            notification.read === true
                                              ? "none"
                                              : "flex",
                                          bgcolor: "red",
                                          height: "12px",
                                          width: "12px",
                                          borderRadius: "20px",
                                          position: "absolute",
                                          zIndex: 1,
                                        }}
                                      ></Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: "10px",
                                        }}
                                      >
                                        <Avatargenerator
                                          companyname={
                                            userData?.data?.companyName
                                          }
                                        />

                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "100%",
                                          }}
                                        >
                                          <Typography
                                            sx={NotificationMessage}
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              handleClickRedirect(
                                                notification.message
                                              )
                                            }
                                          >
                                            {notification.message}
                                          </Typography>
                                          <Box
                                            sx={{
                                              fontFamily: "Poppins",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              fontSize: 10,
                                              color: "#445FD2",
                                              textAlign: "right",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              UpdateNotifications(notification);
                                            }}
                                          >
                                            {notification.read === false
                                              ? "Mark as Read"
                                              : "Mark as UnRead"}
                                          </Box>

                                          <Typography
                                            sx={{
                                              fontFamily: "Outfit",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              fontSize: "10px",
                                              color: "#6C6C6C",
                                            }}
                                          >
                                            {format(notification?.createdAt)}
                                          </Typography>
                                          {/* <Typography
                                            sx={{
                                              ...NotificationTime,
                                              mt: 1.2,
                                              color:
                                                notification.read === true
                                                  ? "#000"
                                                  : "#fff",
                                            }}
                                          >
                                            {format(notification?.createdAt)}
                                          </Typography>  */}
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Accordion>
                                );
                              })}
                            </TabPanel>
                            <TabPanel
                              value={"2"}
                              sx={{
                                padding: "0px",
                                boxShadow: 0,
                                "::before": {
                                  height: "0px",
                                  left: "0px",
                                },
                              }}
                            >
                              {totalCountBXIArray?.map((notification, idx) => {
                                return (
                                  <Accordion
                                    key={idx}
                                    sx={{
                                      boxshadow: "0px 0px 0px 0px",
                                      border: "none",
                                      boxShadow: 0,
                                      "::before": {
                                        height: "0px",
                                        left: "0px",
                                      },
                                    }}
                                  >
                                    <Box
                                      // expandIcon={<ExpandMoreIcon />}
                                      aria-controls="panel1a-content"
                                      id="panel1a-header"
                                      sx={{
                                        mt: 1,
                                        position: "relative",
                                        "::before": {
                                          height: "0px",
                                          left: "0px",
                                        },
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display:
                                            notification.read === true
                                              ? "none"
                                              : "flex",
                                          bgcolor: "red",
                                          height: "12px",
                                          width: "12px",
                                          borderRadius: "20px",
                                          position: "absolute",
                                          zIndex: 1,
                                        }}
                                      ></Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: "10px",
                                        }}
                                      >
                                        <Avatargenerator
                                          companyname={
                                            userData?.data?.companyName
                                          }
                                        />

                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            width: "100%",
                                          }}
                                        >
                                          <Typography
                                            style={{ cursor: "pointer" }}
                                            sx={NotificationMessage}
                                            onClick={() =>
                                              handleClickRedirect(
                                                notification.message
                                              )
                                            }
                                          >
                                            {notification.message}
                                          </Typography>
                                          <Box
                                            sx={{
                                              fontFamily: "Poppins",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              fontSize: 10,
                                              color: "#445FD2",
                                              textAlign: "right",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => {
                                              UpdateNotifications(notification);
                                            }}
                                          >
                                            {notification.read === false
                                              ? "Mark as Read"
                                              : "Mark as UnRead"}
                                          </Box>

                                          <Typography
                                            sx={{
                                              fontFamily: "Outfit",
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              fontSize: "10px",
                                              color: "#6C6C6C",
                                            }}
                                          >
                                            {format(notification?.createdAt)}
                                          </Typography>
                                          {/* <Typography
                                            sx={{
                                              ...NotificationTime,
                                              mt: 1.2,
                                              color:
                                                notification.read === true
                                                  ? "#000"
                                                  : "#fff",
                                            }}
                                          >
                                            {format(notification?.createdAt)}
                                          </Typography> */}
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Accordion>
                                );
                              })}
                            </TabPanel>
                            <TabPanel
                              value={"3"}
                              sx={{
                                padding: "0px",
                                boxShadow: 0,
                                "::before": {
                                  height: "0px",
                                  left: "0px",
                                },
                              }}
                            >
                              {totalCountBuyerArray?.map(
                                (notification, idx) => {
                                  return (
                                    <Accordion
                                      key={idx}
                                      sx={{
                                        boxshadow: "0px 0px 0px 0px",
                                        border: "none",
                                        boxShadow: 0,
                                        "::before": {
                                          height: "0px",
                                          left: "0px",
                                        },
                                      }}
                                    >
                                      <Box
                                        // expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        sx={{
                                          mt: 1,
                                          position: "relative",
                                          "::before": {
                                            height: "0px",
                                            left: "0px",
                                          },
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display:
                                              notification.read === true
                                                ? "none"
                                                : "flex",
                                            bgcolor: "red",
                                            height: "12px",
                                            width: "12px",
                                            borderRadius: "20px",
                                            position: "absolute",
                                            zIndex: 1,
                                          }}
                                        ></Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: "10px",
                                          }}
                                        >
                                          <Avatargenerator
                                            companyname={
                                              userData?.data?.companyName
                                            }
                                          />

                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "column",
                                              width: "100%",
                                            }}
                                          >
                                            <Typography
                                              style={{ cursor: "pointer" }}
                                              sx={NotificationMessage}
                                              onClick={() =>
                                                handleClickRedirect(
                                                  notification.message
                                                )
                                              }
                                            >
                                              {notification.message}
                                            </Typography>

                                            <Box
                                              sx={{
                                                fontFamily: "Poppins",
                                                fontStyle: "normal",
                                                fontWeight: 500,
                                                fontSize: 10,
                                                color: "#445FD2",
                                                textAlign: "right",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                UpdateNotifications(
                                                  notification
                                                );
                                              }}
                                            >
                                              {notification.read === false
                                                ? "Mark as Read"
                                                : "Mark as UnRead"}
                                            </Box>

                                            <Typography
                                              sx={{
                                                fontFamily: "Outfit",
                                                fontStyle: "normal",
                                                fontWeight: 500,
                                                fontSize: "10px",
                                                color: "#6C6C6C",
                                              }}
                                            >
                                              {format(notification?.createdAt)}
                                            </Typography>
                                            {/* <Typography
                                              sx={{
                                                ...NotificationTime,
                                                mt: 1.2,
                                                color:
                                                  notification.read === true
                                                    ? "#000"
                                                    : "#fff",
                                              }}
                                            >
                                              {format(notification?.createdAt)}
                                            </Typography> */}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Accordion>
                                  );
                                }
                              )}
                            </TabPanel>
                            <TabPanel
                              value={"4"}
                              sx={{
                                padding: "0px",
                                boxShadow: 0,
                                "::before": {
                                  height: "0px",
                                  left: "0px",
                                },
                              }}
                            >
                              {totalCountSellerArray?.map(
                                (notification, idx) => {
                                  return (
                                    <Accordion
                                      key={idx}
                                      sx={{
                                        boxshadow: "0px 0px 0px 0px",
                                        border: "none",
                                        boxShadow: 0,
                                        "::before": {
                                          height: "0px",
                                          left: "0px",
                                        },
                                      }}
                                    >
                                      <Box
                                        // expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        sx={{
                                          mt: 1,
                                          position: "relative",
                                          "::before": {
                                            height: "0px",
                                            left: "0px",
                                          },
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            display:
                                              notification.read === true
                                                ? "none"
                                                : "flex",
                                            bgcolor: "red",
                                            height: "12px",
                                            width: "12px",
                                            borderRadius: "20px",
                                            position: "absolute",
                                            zIndex: 1,
                                          }}
                                        ></Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: "10px",
                                          }}
                                        >
                                          <Avatargenerator
                                            companyname={
                                              userData?.data?.companyName
                                            }
                                          />

                                          <Box
                                            sx={{
                                              display: "flex",
                                              flexDirection: "column",
                                              width: "100%",
                                            }}
                                          >
                                            <Typography
                                              style={{ cursor: "pointer" }}
                                              sx={NotificationMessage}
                                              onClick={() =>
                                                handleClickRedirect(
                                                  notification.message
                                                )
                                              }
                                            >
                                              {notification.message}
                                            </Typography>

                                            <Box
                                              sx={{
                                                fontFamily: "Poppins",
                                                fontStyle: "normal",
                                                fontWeight: 500,
                                                fontSize: 10,
                                                color: "#445FD2",
                                                textAlign: "right",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                UpdateNotifications(
                                                  notification
                                                );
                                              }}
                                            >
                                              {notification.read === false
                                                ? "Mark as Read"
                                                : "Mark as UnRead"}
                                            </Box>

                                            <Typography
                                              sx={{
                                                fontFamily: "Outfit",
                                                fontStyle: "normal",
                                                fontWeight: 500,
                                                fontSize: "10px",
                                                color: "#6C6C6C",
                                              }}
                                            >
                                              {format(notification?.createdAt)}
                                            </Typography>

                                            {/* <Typography
                                              sx={{
                                                ...NotificationTime,
                                                mt: 1.2,
                                                color:
                                                  notification.read === true
                                                    ? "#000"
                                                    : "#fff",
                                              }}
                                            >
                                              {format(notification?.createdAt)}
                                            </Typography> */}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </Accordion>
                                  );
                                }
                              )}
                            </TabPanel>
                          </TabContext>
                        </Box>
                      </Box>
                    </Modal>
                  </Box>
                  &nbsp;&nbsp;
                  <Link to="/home/message">
                    <Box sx={{ ...ButtonsStyle, position: "relative" }}>
                      {messagenotificationDot === true ? (
                        <Box
                          sx={{
                            display: "flex",
                            bgcolor: "red",
                            height: "10px",
                            width: "10px",
                            borderRadius: "20px",
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            zIndex: 1,
                          }}
                        ></Box>
                      ) : null}
                      <img
                        onClick={OffDot}
                        src={ChatIcon}
                        alt="CartIcon"
                        width="auto"
                        height={"20px"}
                      />
                    </Box>
                  </Link>
                  &nbsp;&nbsp;
                  <Link
                    to="/home/cart"
                    onClick={() => setCartUpdateNotification(false)}
                  >
                    <Box sx={{ ...ButtonsStyle, position: "relative" }}>
                      {/* <Typography
                        sx={{
                          position: "absolute",
                          color: "#445FD2",
                          fontSize: "16px",
                          top: "0px",
                          right: "10px",
                        }}
                      >
                        {cartItems?.data?.length}
                      </Typography> */}
                      <Box
                        sx={{
                          position: "absolute",
                          background: cartUpdateNotification
                            ? "rgba(230, 46, 123, 1)"
                            : "transparent",
                          height: "10px",
                          width: "10px",
                          borderRadius: "50%",
                          top: "20%",
                          right: "20%",
                        }}
                      ></Box>
                      <img
                        src={CartIcon}
                        alt="CartIcon"
                        width="auto"
                        height={"20px"}
                      />
                    </Box>
                  </Link>
                </Box>

                <Link to={"/home/profile"} style={{ textDecoration: "none" }}>
                  <Box
                    sx={{
                      display: "flex",
                      width: "auto",
                      justifyContent: "flex-start",
                      alignContent: "center",
                      alignItems: "center",
                      gap: "5px",
                      maxWidth: "220px",
                    }}
                  >
                    <Avatargenerator
                      companyname={userData?.data?.companyName}
                    />
                    <Typography
                      sx={{
                        ...UserNameTextStyle,
                        width: "300px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        mr: 1,
                      }}
                    >
                      {userData?.data?.companyName}
                    </Typography>
                  </Box>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </React.Fragment>
  );
};

export default Header;

const ExploreButtonStyle = {
  width: "92px",
  height: "44px",
  background: "#FFFFFF",
  borderRadius: "6px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "21px",
  /* identical to box height */
  textAlign: "center",
  color: "#6B7A99",
  textTransform: "none",
};

const ButtonsStyle = {
  width: "45px",
  height: "45px",
  background: "#FFFFFF",
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  boxShadow: "0px 2px 5px rgba(38, 51, 77, 0.03)",
  borderRadius: "100px",
  cursor: "pointer",
};

const UnActiveExploreButtonStyle = {
  width: "92px",
  height: "44px",
  background: "transparent",
  borderRadius: "6px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "21px",
  /* identical to box height */
  textAlign: "center",
  color: "#ADB8CC",
  textTransform: "none",
};

const HeaderTextStyle = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "20px",
  textAlign: "center",
  color: "#6B7A99",
};

const UserNameTextStyle = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "center",
  color: "#6B7A99",
};

const style = {
  position: "absolute",
  top: "37%",
  left: "80%",
  transform: "translate(-50%, -50%)",
  width: "28%",
  height: "370px",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 4,
  p: "30px",
  borderRadiusTopRight: "10px",
  maxWidth: "500px",
  minWidth: "250px",
  borderRadius: "20px 20px 0px 0px",
};

const HeaderIcons = {
  width: "20px",
  height: "20px",
  cursor: "pointer",
};

const SubTabStyle = {
  width: "0%",
  textTransform: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "15px",
  color: "#000000",
};

const NotificationMessage = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
};

const NotificationTime = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "10px",
  color: "#6C6C6C",
};

const notificationcount = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  width: "22px",
  height: "20px",
  background: "#F8E8EA",
  borderRadius: "2px",
  mt: 1.2,
  p: "3px",
};
