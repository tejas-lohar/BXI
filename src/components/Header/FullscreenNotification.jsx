import {
  Box,
  Button,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Skeleton,
  Stack
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "../../assets/HeaderIcon/CloseIcon.svg";
import AvatarIcon from "../../assets/HeaderIcon/AvatarIcon.svg";
import BreadCrumbHeader from "./BreadCrumbHeader";
import { allNotification } from "../../redux/action/Notification/getNotifications";
import { useSelector, useDispatch } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";
import Avatargenerator from "../AvatarGenerator";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/system";

const FullscreenNotification = () => {
  const StyledPagination = styled(Pagination)({
    "& .MuiPagination-ul li:last-child": {
      marginLeft: "16px",
    },
    "& .MuiPagination-ul li:last-child button::before": {
      content: "'Last'",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "11px",
      lineHeight: "14px",
      color: "#445FD2",
      marginRight: "8px",
    },
    "& .MuiPagination-ul li:first-child": {
      marginRight: "16px",
    },
    "& .MuiPagination-ul li:first-child button::after": {
      content: "'First'",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "11px",
      lineHeight: "14px",
      color: "#445FD2",
      marginLeft: "8px",
    },
    "& .MuiPaginationItem-icon": {
      color: "#445FD2",
      fontWeight: 800,
    },
  });

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { data: loggedInUserData } = useGetLoggedInUser();
  const { getNotification } = useSelector((state) => state.allNotifiactions);

  const [active, setActive] = useState("btn1");
  const [btn1, setBtn1] = useState(active === "btn1");
  const [btn2, setBtn2] = useState(active === "btn2");
  const [btn3, setBtn3] = useState(active === "btn3");
  const [btn4, setBtn4] = useState(active === "btn4");
  const [bxi, setBxi] = useState([]);
  const [seller, setSeller] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [readMessage, setReadMessage] = useState(false);
  const [totalCountBXIArray, SetTotalCountBXIArray] = useState([]);
  const [totalCountBuyerArray, setTotalCountBuyerArray] = useState([]);
  const [totalCountSellerArray, setTotalCountSellerArray] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btns, setBtns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDeleteNotificationALL = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };
  const handleDeleteBxi = (id) => {
    setBxi((prevBxi) => prevBxi.filter((bxi) => bxi.id !== id));
  };
  const handleDeleteSeller = (id) => {
    setSeller((prevSeller) => prevSeller.filter((seller) => seller.id !== id));
  };
  const handleDeleteBuyer = (id) => {
    setBuyer((prevBuyer) => prevBuyer.filter((buyer) => buyer.id !== id));
  };

  let login_User = loggedInUserData?.data?._id;
  useEffect(() => {
    if (login_User !== null) {
      dispatch(allNotification(login_User));
    }
  }, [dispatch, login_User, readMessage]);

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

  useEffect(() => {
    if (getNotification !== null) {
      setNotifications(getNotification?.notifications);

      if (getNotification?.notifications) {
        const AllCount = getNotification.notifications.filter(
          (item) => item.read === false
        );

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
      }
    }
  }, [getNotification]);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
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

  const DeleteNotifications = async (id) => {
    await axios
      .post(
        `notification/deletenotification/${id}`,
        { read: true },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data);
        dispatch(allNotification(login_User));
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(allNotification(login_User));
  };

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  const totalPages = Math.ceil(btns?.length / itemsPerPage);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return btns?.slice(startIndex, endIndex);
  };

  const handlePageChange = (event, newPage) => {
  setCurrentPage(newPage);
};


useEffect(() => {
  setBtn1(active === "btn1");
  setBtn2(active === "btn2");
  setBtn3(active === "btn3");
  setBtn4(active === "btn4");
}, [active]);

useEffect(() => {
  let activeBtnArray = [];

  if (btn1) {
    activeBtnArray = notifications;
  } else if (btn2) {
    activeBtnArray = totalCountBXIArray;
  } else if (btn3) {
    activeBtnArray = totalCountSellerArray;
  } else if (btn4) {
    activeBtnArray = totalCountBuyerArray;
  }

  setBtns(activeBtnArray);
  setCurrentPage(1);
}, [btn1, btn2, btn3, btn4, notifications]);

  return (
    <>
      <BreadCrumbHeader MainText="Notifications" />
      <Grid
        container
        sx={{
          background: "#fff",
          width: "100%",
          mx: "auto",
          borderRadius: "17px",
        }}
      >
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{ mx: "auto", width: "95%", height: "100%" }}
        >
          <Box sx={ButtonGroupStyle}>
            <Button
              sx={{
                ...ButtonStyle,
                borderColor: active === "btn1" ? "#445FD2" : "#E6E9EE",
                color: active === "btn1" ? "#445FD2" : "#929EAE",
              }}
              id="btn1"
              onClick={() => {
                setBtn1(true);
                setBtn2(false);
                setActive("btn1");
              }}
            >
              All
            </Button>

            <Button
              sx={{
                ...ButtonStyle,
                borderColor: active === "btn2" ? "#445FD2" : "#E6E9EE",
                color: active === "btn2" ? "#445FD2" : "#929EAE",
              }}
              id="btn2"
              onClick={() => {
                setBtn1(false);
                setBtn2(true);
                setBtn3(false);
                setBtn4(false);
                setActive("btn2");
              }}
            >
              BXI
            </Button>

            <Button
              sx={{
                ...ButtonStyle,
                borderColor: active === "btn3" ? "#445FD2" : "#E6E9EE",
                color: active === "btn3" ? "#445FD2" : "#929EAE",
              }}
              id="btn3"
              onClick={() => {
                setBtn3(true);
                setBtn4(false);
                setBtn2(false);
                setBtn1(false);
                setActive("btn3");
              }}
            >
              Purchase
            </Button>
            <Button
              sx={{
                ...ButtonStyle,
                borderColor: active === "btn4" ? "#445FD2" : "#E6E9EE",
                color: active === "btn4" ? "#445FD2" : "#929EAE",
              }}
              id="btn4"
              onClick={() => {
                setBtn3(false);
                setBtn4(true);
                setBtn2(false);
                setBtn1(false);
                setActive("btn4");
              }}
            >
              Sell
            </Button>
          </Box>
          <div>
            {btn1 && (
              <Box sx={{ mt: 1, mb: 1 }}>
                {getPaginatedData()?.map((notification, idx) => {
                  return (
                    <>
                      {loading ? (
                        <Box sx={{ width: "95%", mx: "auto" }}>
                          <Skeleton
                            variant="rectangular"
                            height={100}
                            animation="wave"
                            sx={{ borderRadius: "10px", mt: 1, width: "100%" }}
                          />
                        </Box>
                      ) : (
                        <Box
                          key={idx}
                          sx={{
                            width: "95%",
                            mx: "auto",
                            minHeight: "90px",
                            background: "#FBFBFB",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "auto",
                            mt: 1,
                            gap: "5px",
                          }}
                        >
                          {notification.read === true ? (
                            <Box
                              sx={{
                                height: "10px",
                                width: "10px",
                                borderRadius: "7px",
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                height: "10px",
                                width: "10px",
                                background: "#445FD2",
                                borderRadius: "7px",
                              }}
                            />
                          )}
                          <Box
                            sx={{
                              width: "97%",
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Avatargenerator
                              companyname={userData?.data?.companyName}
                            />
                            <Box
                              sx={{
                                textAlign: "left",
                                width: "85%",
                                px: 2,
                                // bgcolor: "red",
                              }}
                            >
                              <Typography
                                sx={{
                                  ...NameOfNotification,
                                }}
                              >
                                {notification.type}
                              </Typography>

                              <Typography
                                style={{ cursor: "pointer" }}
                                sx={{
                                  ...NameOfNotification,
                                  fontWeight: 400,
                                  fontSize: "14px",
                                  lineHeight: "17px",

                                  color: "#ADB8CC",
                                }}
                                onClick={() =>
                                  handleClickRedirect(notification.message)
                                }
                              >
                                {notification.message}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                width: "15%",
                                // bgcolor: "green",
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "5px",
                              }}
                            >
                              {/* {notification.read === true ? null : ( */}
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  UpdateNotifications(notification);
                                }}
                                sx={{
                                  color: "#445FD2",
                                  border: "none",
                                  fontFamily: "Poppins",
                                  fontStyle: "normal",
                                  textTransform: "none",
                                  fontWeight: 400,
                                  fontSize: "12px",
                                  lineHeight: "18px",
                                  "&:hover": {
                                    border: "none",
                                  },
                                }}
                              >
                                {notification.read === false
                                  ? "Mark as Read"
                                  : "Mark as UnRead"}
                              </Button>
                              {/* )} */}
                              <CancelIcon
                                key={notification.id}
                                onClick={() =>
                                  DeleteNotifications(notification?._id)
                                }
                                sx={{
                                  color: "#d9d9d9",
                                  fontSize: "20px",
                                  cursor: "pointer",
                                  mt: 0.5,
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </>
                  );
                })}
              </Box>
            )}
            {btn2 && (
              <Box sx={{ mt: 1, mb: 1 }}>
                {/* <Box sx={NotificationWholeData}> */}
                {getPaginatedData()?.map((bxi) => (
                  <>
                    {loading ? (
                      <Box sx={{ width: "95%", mx: "auto" }}>
                        <Skeleton
                          variant="rectangular"
                          height={100}
                          animation="wave"
                          sx={{ borderRadius: "10px", mt: 1, width: "100%" }}
                        />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "95%",
                          mx: "auto",
                          minHeight: "90px",
                          background: "#FBFBFB",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "auto",
                          mt: 1,
                          gap: "5px",
                        }}
                      >
                        {bxi.read === true ? (
                          <Box
                            sx={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "7px",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              height: "10px",
                              width: "10px",
                              background: "#445FD2",
                              borderRadius: "7px",
                            }}
                          />
                        )}
                        <Box
                          sx={{
                            width: "97%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatargenerator
                            companyname={userData?.data?.companyName}
                          />
                          <Box
                            sx={{
                              textAlign: "left",
                              width: "85%",
                              px: 2,
                              // bgcolor: "red",
                            }}
                          >
                            <Typography
                              sx={{
                                ...NameOfNotification,
                              }}
                            >
                              {bxi.type}
                            </Typography>

                            <Typography
                              style={{ cursor: "pointer" }}
                              sx={{
                                ...NameOfNotification,
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "17px",

                                color: "#ADB8CC",
                              }}
                              onClick={() => handleClickRedirect(bxi.message)}
                            >
                              {bxi.message}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "15%",
                              // bgcolor: "green",
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "5px",
                            }}
                          >
                            {/* {bxi.read === true ? null : ( */}
                            <Button
                              variant="outlined"
                              onClick={() => {
                                // UpdateNotifications(bxi?._id);
                                UpdateNotifications(bxi);
                              }}
                              sx={{
                                color: "#445FD2",
                                border: "none",
                                textTransform: "none",
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: "12px",
                                lineHeight: "18px",
                                "&:hover": {
                                  border: "none",
                                },
                              }}
                            >
                              {bxi.read === false
                                ? "Mark as Read"
                                : "Mark as UnRead"}
                            </Button>
                            {/* )} */}
                            <CancelIcon
                              key={bxi.id}
                              onClick={() => DeleteNotifications(bxi?._id)}
                              sx={{
                                color: "#d9d9d9",
                                fontSize: "20px",
                                mt: 0.5,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </>
                ))}
                {/* </Box> */}
              </Box>
            )}
            {btn3 && (
              <Box sx={{ mt: 1, mb: 1 }}>
                {getPaginatedData()?.map((seller) => (
                  <>
                    {loading ? (
                      <Box sx={{ width: "95%", mx: "auto" }}>
                        <Skeleton
                          variant="rectangular"
                          height={100}
                          animation="wave"
                          sx={{ borderRadius: "10px", mt: 1, width: "100%" }}
                        />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "95%",
                          mx: "auto",
                          minHeight: "90px",
                          background: "#FBFBFB",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "auto",
                          mt: 1,
                          gap: "5px",
                        }}
                      >
                        {seller.read === true ? (
                          <Box
                            sx={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "7px",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              height: "10px",
                              width: "10px",
                              background: "#445FD2",
                              borderRadius: "7px",
                            }}
                          />
                        )}
                        <Box
                          sx={{
                            width: "97%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatargenerator
                            companyname={userData?.data?.companyName}
                          />
                          <Box
                            sx={{
                              textAlign: "left",
                              width: "85%",
                              px: 2,
                              // bgcolor: "red",
                            }}
                          >
                            <Typography
                              sx={{
                                ...NameOfNotification,
                              }}
                            >
                              {seller.type}
                            </Typography>

                            <Typography
                              style={{ cursor: "pointer" }}
                              sx={{
                                ...NameOfNotification,
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "17px",

                                color: "#ADB8CC",
                              }}
                              onClick={() =>
                                handleClickRedirect(seller.message)
                              }
                            >
                              {seller.message}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "15%",
                              // bgcolor: "green",
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "5px",
                            }}
                          >
                            {/* {seller.read === true ? null : ( */}
                            <Button
                              variant="outlined"
                              onClick={() => {
                                // UpdateNotifications(seller?._id);
                                UpdateNotifications(seller);
                              }}
                              sx={{
                                color: "#445FD2",
                                border: "none",
                                textTransform: "none",
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: "12px",
                                lineHeight: "18px",
                                "&:hover": {
                                  border: "none",
                                },
                              }}
                            >
                              {seller.read === false
                                ? "Mark as Read"
                                : "Mark as UnRead"}
                            </Button>
                            {/* )} */}
                            <CancelIcon
                              key={seller.id}
                              onClick={() => DeleteNotifications(seller?._id)}
                              sx={{
                                color: "#d9d9d9",
                                fontSize: "20px",
                                mt: 0.5,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </>
                ))}
              </Box>
            )}
            {btn4 && (
              <Box sx={{ mt: 1, mb: 1 }}>
                {getPaginatedData()?.map((buyer) => (
                  <>
                    {loading ? (
                      <Box sx={{ width: "95%", mx: "auto" }}>
                        <Skeleton
                          variant="rectangular"
                          height={100}
                          animation="wave"
                          sx={{ borderRadius: "10px", mt: 1, width: "100%" }}
                        />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: "95%",
                          mx: "auto",
                          minHeight: "90px",
                          background: "#FBFBFB",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "auto",
                          mt: 1,
                          gap: "5px",
                        }}
                      >
                        {buyer.read === true ? (
                          <Box
                            sx={{
                              height: "10px",
                              width: "10px",
                              borderRadius: "7px",
                            }}
                          />
                        ) : (
                          <Box
                            sx={{
                              height: "10px",
                              width: "10px",
                              background: "#445FD2",
                              borderRadius: "7px",
                            }}
                          />
                        )}
                        <Box
                          sx={{
                            width: "97%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <Avatargenerator
                            companyname={userData?.data?.companyName}
                          />
                          <Box
                            sx={{
                              textAlign: "left",
                              width: "85%",
                              px: 2,
                              // bgcolor: "red",
                            }}
                          >
                            <Typography
                              sx={{
                                ...NameOfNotification,
                              }}
                            >
                              {buyer.type}
                            </Typography>

                            <Typography
                              style={{ cursor: "pointer" }}
                              sx={{
                                ...NameOfNotification,
                                fontWeight: 400,
                                fontSize: "14px",
                                lineHeight: "17px",

                                color: "#ADB8CC",
                              }}
                              onClick={() => handleClickRedirect(buyer.message)}
                            >
                              {buyer.message}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "15%",
                              // bgcolor: "green",
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "5px",
                            }}
                          >
                            {/* {buyer.read === true ? null : ( */}
                            <Button
                              variant="outlined"
                              onClick={() => {
                                // UpdateNotifications(buyer?._id);
                                UpdateNotifications(buyer);
                              }}
                              sx={{
                                color: "#445FD2",
                                border: "none",
                                textTransform: "none",
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: "12px",
                                lineHeight: "18px",
                                "&:hover": {
                                  border: "none",
                                },
                              }}
                            >
                              {buyer.read === false
                                ? "Mark as Read"
                                : "Mark as UnRead"}
                            </Button>
                            {/* )} */}
                            <CancelIcon
                              key={buyer.id}
                              onClick={() => DeleteNotifications(buyer?._id)}
                              sx={{
                                color: "#d9d9d9",
                                fontSize: "20px",
                                mt: 0.5,
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </>
                ))}
              </Box>
            )}
          </div>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          <Stack spacing={2}>
            <StyledPagination
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
          </Stack>
        </Box>
    </>
  );
};

export default FullscreenNotification;

const ButtonGroupStyle = {
  width: "100%",
  maxWidth: "700px",
  height: "auto",
  textAlign: "center",
  mx: "auto",
  display: "flex",
  justifyContent: "space-evenly",
  py: 2,
};

const ButtonStyle = {
  border: "1px solid red",
  borderRadius: "20px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 14,
  width: "20%",
  height: "40%",
  color: "#929EAE",
  //   borderColor: "#E6E9EE",
  "&:hover": {
    borderColor: "#445FD2",
    color: "#445FD2",
  },
};

const NotificationInnerData = {
  display: "grid",
  textAlign: "left",
  px: 2,
};

const NameOfNotification = {
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "25px",

  color: "#6B7A99",
};
