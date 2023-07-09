import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from "react";
import {
  default as DashboardIcon,
  default as Dashboard_Active,
} from "../../assets/SidebarIcon/Dashboard.png";
// import ShopIcon from "../../assets/SidebarIcon/Shop.png";
// import Shop_Active from "../../assets/SidebarIcon/Shop_Active.png";
import { Grid, Paper, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import List from "../../assets/SidebarIcon/List.png";
import LogoutButton from "../../assets/SidebarIcon/Logout.png";
import MenuIcon from "../../assets/SidebarIcon/Menu.png";
import PurchesOrder from "../../assets/SidebarIcon/Purchase Order.png";
import SettingsIcon from "../../assets/SidebarIcon/Settings.png";
import Shipingproduct from "../../assets/SidebarIcon/Shipping Product.png";
import Shop from "../../assets/SidebarIcon/Shop.png";
import Trolley from "../../assets/SidebarIcon/Trolley.png";
import Vector from "../../assets/SidebarIcon/Vector.png";
import WishlistIcon from "../../assets/SidebarIcon/Wishlist.png";
import PriceList from "../../assets/SidebarIcon/price-list 1.png";
// import barterLogo from "../../assets/BXI_LOGO.png";
import newbarterLogo from "../../assets/SidebarIcon/Rectangle 243.png";

import Header from "../Header/Header";

import { motion } from "framer-motion";

import axios from "axios";
import { isError } from "react-query";
import { useLocation } from "react-router-dom";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";

export default function SidebarMenu() {
  let naviagte = useNavigate();
  const [x, setX] = useState(0);
  let location = useLocation();
  const [state, setState] = React.useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const {
    data: datahere,
    isLoading: DataLoading,
    error: DataError,
    refetch: refetchData,
    isRefetching,
  } = useGetLoggedInUser();

  // useEffect(() => {
  //   console.log("datahere", datahere);
  //   console.log("notUser", DataError);
  //   if (DataError && !isRefetching) {
  //     navigate("/");
  //   }
  // }, [DataError, isRefetching]);
  const LogoutCompany = async () => {
    await axios
      .get(`/auth/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("dataHere", datahere?.data?.termsAcceptStatus);

  useEffect(() => {
    console.log("dataHere", datahere?.data);
    if (
      datahere?.data?.companyOnboardingStatus === "UNVERIFIED" ||
      datahere?.data?.companyOnboardingStatus === "GST" ||
      datahere?.data?.companyOnboardingStatus === "BANK_DETAILS" ||
      datahere?.data?.companyOnboardingStatus === "REVERSE_DROP" ||
      datahere?.data?.companyOnboardingStatus === "COURT_CASE" ||
      datahere?.data?.companyOnboardingStatus === "UNDER_REVIEW" ||
      datahere?.data?.companyOnboardingStatus === "FORWARD_DROP"
    ) {
      LogoutCompany();
      naviagte("/");
    }

    if (isRefetching || DataLoading) return;
    console.log("location", location.pathname);
    if (
      location.pathname.includes("/terms") ||
      location.pathname.includes("/payment")
    )
      return;
    if (DataError || datahere?.data === "") {
      //If user Is Not Logged In , isError will be true
      naviagte("/");
    }
  }, [isError, isRefetching, datahere]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setState(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const RouteArray = [
    {
      id: 26,
      name: "MarketPlace",
      logoImage: Shop,
      activeLogo: "",
      linkUrl: "/home",
    },
    {
      id: 3,
      name: "Dashboard",
      logoImage: DashboardIcon,
      activeLogo: Dashboard_Active,
      linkUrl: "/home/dashboard",
    },

    {
      id: 25,
      name: "Transaction ",
      logoImage: Vector,
      activeLogo: "",
      linkUrl: "/home/wallettransactions",
    },
    {
      id: 6,
      name: "Wishlist",
      logoImage: WishlistIcon,
      activeLogo: "",
      linkUrl: "/home/wishlist",
    },

    {
      id: 11,
      name: "My Products",
      logoImage: Shipingproduct,
      activeLogo: "",
      linkUrl: "/home/mylistedproducts",
    },
    {
      id: 15,
      name: "My Orders",
      logoImage: Trolley,
      activeLogo: "",
      linkUrl: "/home/orderdetails",
    },
    {
      id: 9,
      name: "My Purchase Order",
      logoImage: List,
      activeLogo: "",
      linkUrl: "/home/purchaseorderlist",
    },
    {
      id: 8,
      name: "Invoice",
      logoImage: PurchesOrder,
      activeLogo: "",
      linkUrl: "/home/invoicenotification",
    },

    {
      id: 24,
      name: "Membership",
      logoImage: PriceList,
      activeLogo: "",
      linkUrl: "/home/membershipplan",
    },
    {
      id: 10,
      name: "Seller Eaaa",
      logoImage: PriceList,
      activeLogo: "",
      linkUrl: "/home/sellereaaa",
    },
    {
      id: 12,
      name: "Buyer Eaaa",
      logoImage: PriceList,
      activeLogo: "",
      linkUrl: "/home/buyereaaa",
    },
    {
      id: 25,
      name: "Product Analysis",
      logoImage: SettingsIcon,
      activeLogo: "",
      linkUrl: "/home/productanalytics",
    },
  ];

  // get window location
  const currentPath = window.location.pathname;
  // const currentPathArray = currentPath.split("/");
  // const currentPathName = currentPathArray
  const logOutUser = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed === true) {
      await axios
        .get(`/auth/logout`, { withCredentials: true })
        .then((res) => {
          console.log(res);
          if (res.data === "Logged out" && res.status === 200) {
            navigate("/login");
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };
  return (
    <Paper
      sx={{
        position: "relative",
        borderRadius: "0px",
        boxShadow: "none",
        bgcolor: "#F3F6F9",
        minHeight: "100vh",
        maxHeight: "100vh",
        overflowY: "scroll",
      }}
      elevation={0}
    >
      <Header />
      <Box
        sx={{
          position: "absolute",
          top: "0px",
          zIndex: 10,
          borderRadius: "0px 50px 50px 0px",
        }}
      >
        {datahere?.data?.termsAcceptStatus === true ? (
          state ? (
            <motion.div
              className="box"
              animate={{ x: 0 }}
              transition={{ type: "spring", ease: "easeOut", duration: 2 }}
            >
              <Paper
                sx={{
                  width: "350px",
                  height: "100%",
                  minHeight: "100vh",
                  zIndex: 10,
                  borderRadius: "0px 50px 50px 0px",
                  transition: "all 2s",
                }}
                ref={wrapperRef}
              >
                <Paper
                  elevation={0}
                  sx={{
                    width: "100%",
                    position: "absolute",
                    borderRadius: "0px",
                    bgcolor: "transparent",
                  }}
                ></Paper>
                <Button
                  onClick={() => {
                    if (state === true) {
                      setState(false);
                    } else {
                      setState(true);
                    }
                  }}
                  disableRipple
                  disableTouchRipple
                  disableFocusRipple
                  sx={{
                    position: "absolute",
                    width: "50px",
                    height: "50px",
                    transform: "rotate(90deg)",
                    top: 10,
                    left: -2,
                    "&:hover": {
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                    "&:active": {
                      boxShadow: "none",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <img src={MenuIcon} width="100%" height={"auto"} />
                </Button>
                <Paper
                  elevation={0}
                  sx={{
                    bgcolor: "transparent",
                    position: "relative",
                    top: "50px",
                    width: "80%",
                    height: "90vh",
                    mx: "auto",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      bgcolor: "transparent",
                      // ml: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignContent: "center",
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
                      <img src={newbarterLogo} alt="" width="40px" />
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 600,
                          fontSize: "15px",
                          textAlign: "center",
                          color: "#1D3163",
                          mb: "10px",
                        }}
                      >
                        Barter Exchange of India
                      </Typography>
                    </Box>
                    {/* <Typography
                      sx={{ ...LogoTextStyle, cursor: "pointer" }}
                      onClick={() => setState(false)}
                    >
                      <GrClose />
                    </Typography> */}
                  </Box>

                  <Paper
                    sx={{
                      display: "grid",
                      justifyContent: "space-evenly",
                      maxHeight: "75vh",
                      minHeight: "75vh",
                      overflowY: "scroll",
                      width: "100%",
                      bgcolor: "transparent",
                      mt: 2,
                    }}
                    elevation={0}
                  >
                    {RouteArray.map((res, idx) => {
                      return (
                        <Link
                          to={res.linkUrl}
                          onClick={() => setState(false)}
                          style={{
                            textDecoration: "none",
                            width: "100%",
                            minWidth: "280px",
                          }}
                        >
                          <Grid
                            container
                            sx={{
                              ...BoxStyle,
                              background:
                                currentPath === res.linkUrl
                                  ? "rgba(156, 206, 255, 0.31)"
                                  : "transparent",
                            }}
                          >
                            <Grid
                              item
                              xl={3}
                              lg={3}
                              md={3}
                              sm={3}
                              xs={3}
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                              }}
                            >
                              <img
                                src={res.logoImage}
                                width={"20px"}
                                height="20px"
                              />
                            </Grid>
                            <Grid
                              item
                              xl={9}
                              lg={9}
                              md={9}
                              sm={9}
                              xs={9}
                              sx={{
                                display: "flex",
                                justifyContent: "left",
                                alignItems: "center",
                                alignContent: "center",
                              }}
                            >
                              <Typography
                                sx={{
                                  ...TextStyle,
                                  color:
                                    currentPath === res.linkUrl
                                      ? "#445FD2"
                                      : "#000000",
                                  fontWeight:
                                    currentPath === res.linkUrl ? 500 : 400,
                                }}
                              >
                                {res.name}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Link>
                      );
                    })}
                  </Paper>

                  <Button
                    sx={ButtonStyle}
                    // onClick={() => {
                    //   Window.confirm("Are you sure you want to logout?");
                    //   // confirm("delete this product???");
                    //   // confirm("Are you sure you want to logout?");
                    // }}
                    onClick={logOutUser}
                  >
                    <Grid container sx={{ mt: 1 }}>
                      <Grid item xl={1.5} lg={1.5} md={1.5} sm={1.5} xs={1.5}>
                        <img src={LogoutButton} height="36px" alt="logout" />
                      </Grid>
                      <Grid
                        item
                        xl={10.5}
                        lg={10.5}
                        md={10.5}
                        sm={10.5}
                        xs={10.5}
                      >
                        <Typography sx={LogoutText}>Logout</Typography>
                      </Grid>
                    </Grid>
                  </Button>
                </Paper>
              </Paper>
            </motion.div>
          ) : (
            <Button
              onClick={() => setState(true)}
              disableRipple
              disableTouchRipple
              disableFocusRipple
              sx={{
                position: "relative",
                width: "50px",
                height: "50px",
                mt: 1.5,
                "&:hover": {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                },
                "&:active": {
                  boxShadow: "none",
                  backgroundColor: "transparent",
                },
              }}
            >
              <img src={MenuIcon} width="100%" height={"auto"} />
            </Button>
          )
        ) : null}
      </Box>

      {location.pathname === "/home" ? (
        <Paper
          sx={{
            bgcolor: "transparent",
            borderRadius: "30px",
            maxHeight: "90vh",
            minHeight: "90vh",
            overflowY: "scroll",
          }}
          elevation={0}
        >
          <Outlet />
        </Paper>
      ) : (
        <Paper sx={OutLetParentStyle} elevation={0}>
          <Box sx={OutLetBoxStyle}>
            <Outlet />
          </Box>
        </Paper>
      )}
    </Paper>
  );
}

const BoxStyle = {
  width: "100%",
  marginY: "5px",
  height: { xl: "50px", lg: "50px", md: "50px", sm: "50px", xs: "45px" },
  bgcolor: "white",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "rgba(156, 206, 255, 0.31)",
  },
};

const TextStyle = {
  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: { xl: "18px", lg: "17px", md: "16px", sm: "16px", xs: "16px" },
  lineHeight: "45px",
  "&:hover": {
    color: "#445FD2",
  },
  width: "100%",
  color: "#1D3163",
};

const ButtonStyle = {
  width: "270px",
  px: 2,
  height: "50px",
  background: "#445FD2",
  borderRadius: "10px",
  textTransform: "none",
  position: "absolute",
  bottom: "-15px",
  left: "50%",
  transform: "translateX(-50%)",
  "&:hover": {
    bgcolor: "#443FD8",
  },
};

const LogoutText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "30px",
  color: "#FFFFFF",
  textAlign: "left",
  ml: 3,
  mt: 0.5,
};

const LogoTextStyle = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "20px",
  textAlign: "center",
  color: "#6B7A99",
};

const OutLetParentStyle = {
  width: "92%",
  px: 2,
  py: 3,
  mt: 2,
  mx: "auto",
  bgcolor: "transparent",
  borderRadius: "30px",
  maxHeight: { xl: "82vh", lg: "83vh", md: "79vh", sm: "79vh", xs: "100vh" },
  minHeight: { xl: "82vh", lg: "83vh", md: "79vh", sm: "79vh", xs: "100vh" },
  overflowY: "scroll",
  border: "2px solid #E7E7E7",
  position: "relative",
};

const OutLetBoxStyle = {
  maxWidth: "2000px",
  width: "96%",
  mx: "auto",
  bgcolor: "transparent",
  position: "relative",
};
