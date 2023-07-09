import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Fade,
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import stackofcoin from "../../assets/CartPage/unnamed 1.svg";
import MaleImage from "../../assets/Dashboard/Male.png";
import UpArrow from "../../assets/Dashboard/UpArrow.png";
import radiocheck from "../../assets/Dashboard/radiocheck.svg";
import radiouncheck from "../../assets/Dashboard/radiouncheck.svg";
import PrintPurchaseOrder from "../../assets/Images/CommonImages/Print.png";
import doneIcon from "../../assets/Images/doneTick.svg";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
// import Fade from "@mui/material/Fade";
import axios from "axios";
import { useGetCartData } from "../../Hooks/ProductActions/useGetCartData";
import { useRemoveCartProduct } from "../../Hooks/ProductActions/useRemoveCartProduct";
import DocDownloadImg from "../../assets/Images/CommonImages/DocDownload.png";
// import DashboardChart from "../../components/Charts/DashboardChart";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import useGetAllCompanyMembers from "../../Hooks/CompanyMember/useGetAllCompanyMembers";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";
import useGetTotalBuy from "../../Hooks/Stats/useGetTotalBuy";
import useGetTotalSales from "../../Hooks/Stats/useGetTotalSales";
import useGetBuySaleStats from "../../Hooks/Stats/useGetBuySaleStats";
import CommaSeprator from "../../components/CommaSeprator";

import LineChart from "./LineChartPage";
import {
  useGetAllCompanyProducts,
  useRequestCredit,
} from "./useGetAllCompanyProducts";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "Figma Subscription",
    "Software",
    "244.20",
    "02 Apr 2022",
    "MGL0124124"
  ),
  createData(
    "Figma Subscription",
    "Software",
    "244.20",
    "02 Apr 2022",
    "MGL0124124"
  ),
  createData(
    "Figma Subscription",
    "Software",
    "244.20",
    "02 Apr 2022",
    "MGL0124124"
  ),
];
const reqBalance = async () => {
  await axios
    .get("wallet/mywallet", {
      withCredentials: true,
    })
    .then((res) => {
      console.log("==========>", res);
    })
    .err((err) => {
      console.log(err);
    });
};

const Dashboard = () => {
  const [balance, setBalance] = React.useState("");
  const [open, setOpen] = useState(false);
  const [ProductId, setProductId] = useState();
  const [openSecond, setOpenSecond] = useState(false);
  const [sendNotification, setSendNotification] = useState("");
  const [loading, setLoading] = useState(true);
  const componentRef = useRef();
  const [filterType, setFilterType] = useState("Month");
  const [filteredData, setFilteredData] = useState([]);
  const [walletData, setWalletData] = useState([]);

  const [TotalSalesdata, setTotalSales] = useState(0);
  const [TotalPurchase, setTotalPurchase] = useState(0);

  const handleFilterChange = (type) => {
    setFilterType(type);

    switch (type) {
      case "Month":
        const currentDate = new Date();
        const lastMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          1
        );
        const filteredMonth = walletData.filter(
          (item) => new Date(item.createdAt) >= lastMonth
        );
        setFilteredData(filteredMonth);
        break;
      case "Week":
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        const filteredWeek = walletData.filter(
          (item) => new Date(item.createdAt) >= lastWeek
        );
        setFilteredData(filteredWeek);
        break;
      case "Day":
        const lastDay = new Date();
        lastDay.setDate(lastDay.getDate() - 1);
        const filteredDay = walletData.filter(
          (item) => new Date(item.createdAt) >= lastDay
        );
        setFilteredData(filteredDay);
        break;
      default:
        setFilteredData(walletData);
        break;
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const componentRef1 = useRef();
  const handlePrint1 = useReactToPrint({
    content: () => componentRef1.current,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await axios.get("transactions", {
          withCredentials: true,
        });
        setWalletData(response?.data);
        setFilteredData(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWalletData();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const { data: CompaniesProducts, refetch: refetch } =
    useGetAllCompanyProducts();
  const {
    data: ReqBalanceData,
    refetch: ReqBalRefetch,
    mutate: reqBalMutate,
  } = useRequestCredit();
  let totalvalue = 0;
  const reqBal = async (ProductId) => {
    reqBalMutate(
      { amount: 10, productId: ProductId },
      {
        onSuccess: (Response) => {
          totalvalue = Response?.data?.total;
          setTimeout(() => {
            navigate("/home/credit", {
              state: {
                ProductId: ProductId,
                total: Response?.data?.total,
              },
            });
          }, [3000]);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const reqBalance = async () => {
    await axios
      .get("wallet/mywallet", {
        withCredentials: true,
      })
      .then((res) => {
        setBalance(res?.data?.data?.balance);
      });
  };
  const navigate = useNavigate();
  const {
    data: CompanyMembersData,
    error: CompanyMembersError,
    isLoading: CompanyMembersIsLoading,
  } = useGetAllCompanyMembers();

  const ViewMemberDetails = (id) => {
    navigate(`/home/member_details/` + `${id}`);
  };

  useEffect(() => {
    reqBalance();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  async function GetTotalSellValue() {
    await axios
      .get("soldAndbrought/total-sales-value", {
        withCredentials: true,
      })
      .then((res) => {
        setTotalSales(res?.data?.body);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  async function GetTotalBuyValue() {
    await axios
      .get("soldAndbrought/total-buy-value", {
        withCredentials: true,
      })
      .then((res) => {
        setTotalPurchase(res?.data?.body);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  const {
    data: BuySalePercentageStats,
    isLoading: BuySalePercentageStatsIsLoading,
    error: BuySalePercentageStatsError,
    refetch: BuySalePercentageStatsrefetch,
  } = useGetBuySaleStats();

  console.log(
    "BuySalePercentageStats",
    BuySalePercentageStats?.totalBuyPercentage?.body?.SalesStatus,
    BuySalePercentageStats?.totalSalesPercentage?.body?.SalesStatus
  );

  useEffect(() => {
    GetTotalSellValue();
    GetTotalBuyValue();
  }, []);

  return (
    <Paper sx={{ width: "100%", bgcolor: "transparent" }} elevation={0}>
      <BreadCrumbHeader
        MainText="Dashboard"
        LinkText1="{splitedurl[1]}"
        LinkText2="{splitedurl[2]}"
        link1="Link1"
        link2="link2"
      />
      <Paper
        sx={{ bgcolor: "#fff", boxShadow: "none", p: 2, borderRadius: "20px" }}
        elevation={0}
      >
        <Grid container>
          <Grid
            item
            xl={3.8}
            lg={3.8}
            md={3.8}
            sm={12}
            xs={12}
            sx={{ bgcolor: "transparent" }}
          >
            <Typography sx={TokenText}>Barter Coins</Typography>
            <>
              {loading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width={400}
                    height={170}
                    animation="wave"
                    sx={{ borderRadius: "10px" }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={400}
                    height={400}
                    animation="wave"
                    sx={{ borderRadius: "10px", mt: 3 }}
                  />
                </>
              ) : (
                <Box sx={{ width: "100%", height: "auto", mt: 1.2 }}>
                  <Box sx={BXITokenCountBox}>
                    <Box
                      sx={{
                        padding: "1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        // bgcolor: "red",
                        gap: "1.5rem",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "",
                          }}
                        >
                          <Typography sx={TokenAmountStyle}>
                            {/* 1,230,000 */}
                            {balance ? balance : 0}
                            {/* {balance} */}
                            <img
                              src={stackofcoin}
                              style={{ marginLeft: "14px", height: "35px" }}
                              alt="stackofcoin"
                            />
                          </Typography>
                          {/* <TextField
                        placeholder="Enter amount"
                        value={reqBalanceAmount}
                        type="number"
                        onChange={(e) => {
                          setReqBalanceAmount(e.target.value);
                        }}
                      /> */}
                        </Box>

                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "12px",
                            color: " #000000",
                            fontWeight: 400,
                            lineHeight: "18px",
                          }}
                        >
                          Your Current Balance
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          width: "90%",
                          justifyContent: "space-between",
                          alignItems: "center",
                          // marginTop: "1.5rem",
                          mt: 3,
                        }}
                      >
                        <Button
                          sx={requestCreditButtonStyle}
                          onClick={handleClickOpen}
                        >
                          Request for credit line{" "}
                        </Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          fullWidth
                          maxWidth="lg"
                          sx={{
                            backdropFilter: "blur(2px)",
                          }}
                          PaperProps={{
                            sx: {
                              width: "60%",
                              maxHeight: 500,
                              borderRadius: "20px",
                            },
                          }}
                        >
                          <DialogTitle id="responsive-dialog-title">
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
                                  width: "50%",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Poppins",
                                    fontStyle: "normal",
                                    fontWeight: 600,
                                    fontSize: "18px",
                                    lineHeight: "28px",
                                    color: "#6B7A99",
                                  }}
                                >
                                  Please select the product for which you wish
                                  to Request credit
                                </Typography>
                              </Box>
                              <Box>
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
                            </Box>
                          </DialogTitle>
                          <DialogContent
                            sx={{
                              overflow: "auto",
                              mr: 2,
                              "::-webkit-scrollbar": {
                                display: "flex",
                              },
                              "::-webkit-scrollbar-thumb": {
                                dynamic: "#8d8e90",
                                minHeight: "10px",
                                borderRadius: "3px",
                              },
                              "::-webkit-scrollbar-thumb:vertical": {
                                miaxHeight: "10px",
                              },
                            }}
                          >
                            {CompaniesProducts?.map((el, idx) => {
                              return (
                                <Box key={idx}>
                                  <Box
                                    sx={{
                                      width: "100%",
                                      height: "103px",
                                      background: "#FFFFFF",
                                      border: "1px solid #EDEFF2",
                                      borderRadius: "10px 10px 10px 10px",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      alignContent: "center",
                                      mt: 2,
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        width: "100%",
                                        maxWidth: {
                                          xl: "700px",
                                          lg: "700px",
                                          md: "700px",
                                          sm: "350px",
                                          xs: "350px",
                                        },
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        alignContent: "center",
                                        gap: "2rem",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          ml: "1%",
                                          height: "90px",
                                          width: "150px",
                                          maxHeight: "122px",
                                          minWidth: "150px",
                                          maxWidth: "150px",
                                          borderRadius: "25px 25px 25px 25px",
                                          backgroundImage: `url(${
                                            el?.ProductImages?.at(0)?.url
                                          })`,
                                          backgroundSize: "contain",
                                          backgroundPosition: "center",
                                          backgroundRepeat: "no-repeat",
                                        }}
                                      ></Box>
                                      <Box
                                        sx={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignItems: "start",
                                          alignContent: "start",
                                          flexDirection: "column",
                                          gap: "0.5rem",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            ...ProductNameTextStyle,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            fontFamily: "Poppins",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {el?.ProductName}
                                        </Typography>
                                        <Box
                                          sx={{
                                            width: "50%",
                                            // mx: "auto",
                                          }}
                                        >
                                          <Typography sx={ProductMetaTextStyle}>
                                            {el?.ProductDescription}
                                          </Typography>
                                        </Box>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            alignContent: "center",
                                            width: "100%",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              ...ProductPriceTextStyle,
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            <img
                                              src={stackofcoin}
                                              alt="rupieicon"
                                              style={{
                                                width: "20px",
                                                height: "auto",
                                              }}
                                            />
                                          </Typography>
                                          <Typography
                                            sx={{
                                              ...ProductPriceTextStyle,
                                              marginTop: "-03px",
                                            }}
                                          >
                                            &nbsp;
                                            <CommaSeprator
                                              Price={
                                                el?.ProductsVariantions?.at(0)
                                                  ?.PricePerUnit
                                              }
                                            />
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      sx={{
                                        width: "100%",
                                        maxWidth: "120px",
                                        display: "flex",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        alignContent: "center",
                                      }}
                                    >
                                      {ProductId === el._id ? (
                                        <Box
                                          onClick={() => {
                                            setProductId(null);
                                          }}
                                          sx={{
                                            cursor: "pointer",
                                          }}
                                        >
                                          <img src={radiocheck} size={30} />
                                        </Box>
                                      ) : (
                                        <Box
                                          onClick={() => {
                                            setProductId(el._id);
                                          }}
                                          sx={{
                                            cursor: "pointer",
                                          }}
                                        >
                                          {/* <BiCheckbox size={30} /> */}
                                          <img src={radiouncheck} size={30} />
                                        </Box>
                                      )}
                                    </Box>
                                  </Box>
                                </Box>
                              );
                            })}
                          </DialogContent>
                          <DialogTitle id="responsive-dialog-title">
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <Button
                                variant="contained"
                                sx={reqbtn}
                                disabled={ProductId ? false : true}
                                onClick={() => {
                                  reqBal(ProductId);
                                  setSendNotification(ProductId);
                                  // setTimeout(() => {}, [3000]);
                                  setOpenSecond(true);
                                  setOpen(false);
                                }}
                              >
                                Request Credit
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{
                                  ...reqbtn,
                                  fontWeight: 700,
                                  background: "none",
                                  border: "0.7px solid #EBEDEE",
                                  color: "#445FD2",
                                }}
                                onClick={() => {
                                  if (open === false) {
                                    setOpen(true);
                                  } else {
                                    setOpen(false);
                                  }
                                }}
                              >
                                Back
                              </Button>
                            </Box>
                          </DialogTitle>
                        </Dialog>
                        <Dialog
                          open={openSecond}
                          onClose={() => {
                            setOpenSecond(false);
                          }}
                          sx={{
                            backdropFilter: "blur(2px)",
                          }}
                          fullWidth
                          maxWidth="lg"
                          PaperProps={{
                            sx: {
                              width: "35%",
                              height: "auto",
                              minHeight: "230px",
                              maxHeight: "230px",
                              borderRadius: "20px",
                              justifyContent: "center",
                            },
                          }}
                        >
                          <DialogTitle id="alert-dialog-title">
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                width: "100%",
                                // bgcolor: "red",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  width: "90%",
                                }}
                              >
                                <CloseIcon
                                  sx={{
                                    color: "#c6cad2",
                                    fontSize: "20px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => {
                                    if (openSecond === false) {
                                      setOpenSecond(true);
                                    } else {
                                      setOpenSecond(false);
                                    }
                                  }}
                                />
                              </Box>
                            </Box>
                          </DialogTitle>
                          <DialogContent
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              // bgcolor: "green",
                            }}
                          >
                            <DialogContentText id="alert-dialog-description">
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "15px",
                                }}
                              >
                                <Box
                                  component={"img"}
                                  src={doneIcon}
                                  alt="done"
                                ></Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 500,
                                      fontSize: "20px",
                                      lineHeight: "28px",
                                      textAlign: "center",
                                      color: "#6B7A99",
                                    }}
                                  >
                                    Request Sent
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontFamily: "Poppins",
                                      fontStyle: "normal",
                                      fontWeight: 400,
                                      fontSize: 14,
                                      lineHeight: "20px",
                                      textAlign: "center",
                                      color: "#475467",
                                    }}
                                  >
                                    Your Credit Points Are{" "}
                                    {(ReqBalanceData?.data?.total / 130) * 100}{" "}
                                    %
                                  </Typography>
                                </Box>
                              </Box>
                            </DialogContentText>
                          </DialogContent>
                        </Dialog>
                        <Tooltip
                          title={
                            <Typography sx={CreditUseTextStyle}>
                              How to Use Credit{" "}
                            </Typography>
                          }
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 400 }}
                          arrow
                        >
                          {/* <Button>Arrow</Button> */}
                          <Typography sx={CreditUseTextStyle}>
                            How to Use Credit{" "}
                          </Typography>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={RecenteUsersBox}>
                    <Box
                      sx={{
                        padding: "2rem 2rem",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ ...TokenText, lineHeight: "10px" }}>
                        Your Colleagues
                      </Typography>
                      <Link
                        to="/home/company_members"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Typography sx={{ ...StatMainText, color: "#445FD2" }}>
                          View All
                        </Typography>
                      </Link>
                    </Box>
                    <Box
                      sx={{
                        padding: "0px 2rem",
                        display: "block",
                        justifyItems: "flex-start",
                        height: "100%",
                        maxHeight: "320px",
                        overflowY: "scroll",
                        bgcolor: "transparent",
                      }}
                    >
                      {CompanyMembersData?.map((item, index) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              width: "100%",
                              bgcolor: "transparent",
                              mt: index === 0 ? "0px" : "2rem",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                width: "100%",
                                bgcolor: "transparent",
                              }}
                            >
                              <Box>
                                <img
                                  style={{ width: "30px", height: "30px" }}
                                  src={MaleImage}
                                  alt="maleimage"
                                />
                              </Box>
                              <Box sx={{ ml: "2rem" }}>
                                <Typography
                                  sx={{
                                    ...ProfileNameStyle,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    width: "200px",
                                    display: "block",
                                  }}
                                >
                                  {item.name ? item.name : "John Doe"}
                                </Typography>
                                <br></br>
                                <Typography
                                  sx={{
                                    ...StatMainText,
                                    fontSize: "12px",
                                    lineHeight: "0px",
                                  }}
                                >
                                  {item.role ? item.role : "Admin"}
                                </Typography>
                              </Box>
                            </Box>
                            <Button
                              sx={{ ml: "auto" }}
                              onClick={() => ViewMemberDetails(item._id)}
                            >
                              <Typography
                                sx={{ ...StatMainText, color: "#445FD2" }}
                              >
                                View
                              </Typography>
                            </Button>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              )}
            </>
          </Grid>
          <Grid item xl={8.2} lg={8.2} md={8.2} sm={12} xs={12}>
            <>
              {loading ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                      mt: 3,
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={250}
                      height={100}
                      animation="wave"
                      sx={{ borderRadius: "10px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={250}
                      height={100}
                      animation="wave"
                      sx={{ borderRadius: "10px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={250}
                      height={100}
                      animation="wave"
                      sx={{ borderRadius: "10px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={250}
                      height={100}
                      animation="wave"
                      sx={{ borderRadius: "10px" }}
                    />
                  </Box>
                  <Box>
                    <Skeleton
                      variant="rectangular"
                      width={880}
                      height={470}
                      animation="wave"
                      sx={{ borderRadius: "10px", mt: 3 }}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "10px",
                      justifyContent: "end",
                      width: "98%",
                    }}
                  >
                    <Box
                      component="img"
                      src={PrintPurchaseOrder}
                      sx={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                        mt: 0.5,
                      }}
                      onClick={handlePrint1}
                    />
                    <Box
                      component="img"
                      src={DocDownloadImg}
                      sx={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                        mt: 0.5,
                      }}
                      onClick={handlePrint1}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: "98%",
                      ml: "auto",
                      mr: "0px",
                      height: "auto",
                    }}
                    ref={componentRef1}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        width: "100%",
                        mx: "auto",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        flexWrap: "wrap",
                        bgcolor: "transparent",
                      }}
                    >
                      {" "}
                      <StatsBox
                        name="Total Sales"
                        change={true}
                        changePercentage={
                          BuySalePercentageStats?.totalSalesPercentage?.body
                            ?.FinalPercentage
                        }
                        childname="(Coins Earned)"
                        changeStatus={
                          BuySalePercentageStats?.totalSalesPercentage?.body
                            ?.SalesStatus
                        }
                        amount={TotalSalesdata}
                      />
                      <StatsBox
                        name="Credit issued / Due"
                        childname=""
                        change={false}
                        amount={balance}
                      />
                      <StatsBox
                        name="Total Purchased"
                        childname="(Coins Burnt)"
                        change={true}
                        changePercentage={
                          BuySalePercentageStats?.totalBuyPercentage?.body
                            ?.FinalPercentage
                        }
                        changeStatus={
                          BuySalePercentageStats?.totalBuyPercentage?.body
                            ?.SalesStatus
                        }
                        amount={TotalPurchase}
                      />
                      <StatsBox name="Pending Clearance" change={false} />
                    </Paper>
                    <Paper sx={DashboardChartStyle} elevation={0}>
                      {/* <DashboardChart /> */}
                      <LineChart />
                    </Paper>
                  </Box>
                </>
              )}
            </>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box sx={{ width: "99%", height: "auto" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "auto",
                  display: {
                    xl: "flex",
                    lg: "flex",
                    md: "flex",
                    sm: "block",
                    xs: "block",
                  },
                  justifyContent: "space-between",
                  padding: "1rem 0px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "auto",
                    padding: "0px 1rem",
                    maxWidth: "400px",
                  }}
                >
                  <Typography sx={{ ...TokenText, lineHeight: "30px" }}>
                    Recent Transactions
                  </Typography>
                  <select
                    style={{
                      width: "150px",
                      height: "40px",
                      border: "1px solid #E6E9EE",
                      borderRadius: "12px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: "0px 14px",
                      gap: "0px",
                      color: "gray",
                      cursor: "pointer",
                    }}
                  >
                    <option>Product 1</option>
                    <option>Product 2</option>
                    <option>Product 3</option>
                    <option>Product 4</option>
                  </select>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "auto",
                    padding: "0px 1rem",
                    maxWidth: "450px",
                    gap: "5px",
                    mt: {
                      xl: "0px",
                      lg: "0px",
                      md: "0px",
                      sm: "1rem",
                      xs: "1rem",
                    },
                  }}
                >
                  <Button
                    sx={morphicButtonStyle}
                    onClick={() => handleFilterChange("Month")}
                  >
                    Month
                  </Button>
                  <Button
                    sx={morphicButtonStyle}
                    onClick={() => handleFilterChange("Week")}
                  >
                    Week
                  </Button>
                  <Button
                    sx={morphicButtonStyle}
                    onClick={() => handleFilterChange("Day")}
                  >
                    Day
                  </Button>
                  <Box sx={{ display: "flex", gap: "10px", ml: "10px" }}>
                    <Box
                      component="img"
                      src={PrintPurchaseOrder}
                      sx={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                        mt: 0.5,
                      }}
                      onClick={handlePrint}
                    />
                    <Box
                      component="img"
                      src={DocDownloadImg}
                      sx={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                        mt: 0.5,
                      }}
                      onClick={handlePrint}
                    />
                  </Box>
                  <Button
                    onClick={() => navigate("/home/wallettransactions")}
                    sx={{
                      width: "120px",
                      height: "35px",
                      borderRadius: "12px",
                      textTransform: "capitalize",
                      bgcolor: "#156DB6",
                      ml: "10px",
                      "&:hover": {
                        bgcolor: "#156DB6",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontFamily: "poppins",
                        color: "white",
                      }}
                    >
                      View All
                    </Typography>
                  </Button>
                </Box>
              </Box>
              <TableContainer component={Box} ref={componentRef}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography
                          sx={{ ...StatMainText, textAlign: "start" }}
                        >
                          NAME/BUSINESS
                        </Typography>{" "}
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ ...StatMainText, textAlign: "start" }}
                        >
                          TYPE
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ ...StatMainText, textAlign: "start" }}
                        >
                          AMOUNT
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ ...StatMainText, textAlign: "start" }}
                        >
                          DATE
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          sx={{ ...StatMainText, textAlign: "start" }}
                        >
                          INVOICE ID
                        </Typography>
                      </TableCell>
                      {/* <TableCell align="right">
                        <Typography
                          sx={{ ...StatMainText, textAlign: "start" }}
                        >
                          ACTION
                        </Typography>
                      </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData?.map((row, index) => {
                      if (index < 3) {
                        return (
                          <TableRow
                            key={index}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{
                                ...StatMainText,
                                textAlign: "start",
                                color: "#78778B",
                              }}
                            >
                              {row.sellerCompanyName?.seller}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                ...StatMainText,
                                textAlign: "start",
                                color: "#78778B",
                              }}
                            >
                              Buy/Sell
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                ...StatMainText,
                                textAlign: "start",
                                color: "#1B212D",
                                fontWeight: 600,
                              }}
                            >
                              <Typography
                                sx={{
                                  ...StatMainText,
                                  textAlign: "start",
                                  color: "#1B212D",
                                  fontWeight: 600,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={stackofcoin}
                                  style={{ width: "20px", height: "20px" }}
                                  alt="stackofcoin"
                                />
                                {row.amount}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                ...StatMainText,
                                textAlign: "start",
                                color: "#1B212D",
                                fontWeight: 500,
                              }}
                            >
                              {new Date(row.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell
                              align="right"
                              sx={{
                                ...StatMainText,
                                textAlign: "start",
                                color: "#78778B",
                                fontWeight: 500,
                              }}
                            >
                              {row?.status}
                            </TableCell>
                            {/* <TableCell align="left">
                            <Button variant="contained">View</Button>
                          </TableCell> */}
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default Dashboard;

const StatsBox = (props) => {
  // const reqBalance = async () => {
  //   await axios
  //     .get("wallet/mywallet", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log("==========>", res);
  //     })
  //     .err((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   reqBalance();
  // }, []);

  let StatusChange = props?.changeStatus === "Increased" ? "#445FD2" : "red";

  return (
    <Box
      sx={{
        width: "95%",
        mx: "auto",
        height: "85px",
        background: "#FFFFFF",
        border: "1px solid #E6E9EE",
        borderRadius: "12px",
        maxWidth: "190px",
        borderLeft: "4px solid #445FD2",
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        mt: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography sx={StatMainText}>{props.name}</Typography>
          <span>{props?.childname}</span>
        </Box>
        {props?.change ? (
          <Box sx={StatChangesStyle}>
            {" "}
            <img src={UpArrow} width={"18px"} height={"18px"} alt="uparrow" />
            <Typography sx={{ ...StatChangesTextStyle, color: StatusChange }}>
              {props?.changePercentage}%
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Typography
        sx={{
          ...MoneyTextStyle,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "2px",
        }}
      >
        <img
          src={stackofcoin}
          style={{ width: "20px", height: "20px" }}
          alt="stackofcoin"
        />
        {props?.amount ? `${props?.amount}` : "0"}
      </Typography>
    </Box>
  );
};

const morphicButtonStyle = {
  width: "89px",
  height: "35px ",
  background: "#FFFFFF",
  boxShadow: "0px 10px 20px #DCDCDD",
  borderRadius: "5px",
  // hover effect
  "&:hover": {
    background: "#FFFFFF",
    boxShadow: "inset 4px 5px 4px rgba(211, 211, 211, 0.25)",
    borderRadius: "5px",
  },
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  lineHeight: "15px",
  color: "#000000",
  textTransform: "none",
};

const BXITokenCountBox = {
  width: "100%",
  height: "180px",
  background: "#FAFBFD",
  border: "1px solid #E6E9EE",
  borderRadius: "10px",
  mx: "auto",
};

const RecenteUsersBox = {
  width: "100%",
  height: "407px",
  background: "#ffffff",
  border: "1px solid #E6E9EE",
  borderRadius: "12px",
  mx: "auto",
  mt: 3,
};

const DashboardChartStyle = {
  width: "97%",
  mx: "auto",
  mt: 3,
  height: "494px",
  background: "#FFFFFF",
  border: "1px solid #E6E9EE",
  borderRadius: "12px",
  overflow: "scroll",
};

const StatChangesStyle = {
  width: "64px",
  height: "27px",
  background: "#F9FAFE",
  borderRadius: "6px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  ml: 0.5,
};

const StatChangesTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "11px",
  lineHeight: "15px",
  color: "#445FD2",
};

const StatMainText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "21px",
  color: "#AFAFAF",
  textTransform: "none",
};

const MoneyTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: { xl: "20px", lg: "20px", md: "18px", sm: "16px", xs: "14px" },
  lineHeight: "30px",
  mt: 0.5,
  color: "#15223C",
};
const TokenText = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: { xl: "20px", lg: "20px", md: "18px", sm: "16px", xs: "14px" },
  lineHeight: "25px",
  color: "#393D5E",
};
const TokenAmountStyle = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 800,
  fontSize: "32px",
  lineHeight: "40px",
  color: "#545454",
  display: "flex",
  alignItems: "center",
};
const requestCreditButtonStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
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
  color: "#FFFFFF",
  background: "#445FD2",
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
};
const CreditUseTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
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
  color: "#393D5E",
  textAlign: "center",
  cursor: "pointer",
};

const ProfileNameStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#15223C",
};

const TitleText = {
  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "25px",
  color: "#6B7A99",
};

const SelectedItemsTetxStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "27px",
  color: "#6B7A99",
};

const SelectedItemsTetxStyle1 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "27px",
  color: "#6B7A99",
};

const infoBoxHeaderText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#282828",
  marginTop: "3rem",
  marginBottom: "3rem",
};
const infoBoxValueText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#6B7A99",
  marginBottom: "1rem",
};
const InfoBoxAmountText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: " #282828",
};

const textStyle1 = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "25px",
  color: "#6B7A99",
};

const ProductNameTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "17px",
    sm: "13px",
    xs: "13px",
  },
  lineHeight: "25px",
  color: "#6B7A99",
  textAlign: "left",
};
const ProductMetaTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: {
    xl: "12px",
    lg: "12px",
    md: "11px",
    sm: "9px",
    xs: "9px",
  },
  lineHeight: {
    xl: "18px",
    lg: "18px",
    md: "15px",
    sm: "14px",
    xs: "14px",
  },
  color: "#858585",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",

  //   font-family: 'Poppins';
  // fontStyle: "normal",
  // fontWeight:300,
  // fontSize:12,
  // lineHeight:18,
  // color: "#858585",
};
const ProductPriceTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  color: "rgba(107, 122, 153, 0.5)",
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "18px",
    sm: "15px",
    xs: "15px",
  },
  lineHeight: {
    xl: "21px",
    lg: "21px",
    md: "19px",
    sm: "18px",
    xs: "17px",
  },
  alignContent: "center",
  alignItems: "center",
};

const cartSelectionTextStyle = {
  fontFamily: "Poppins",
  // fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "16px",
  lineHeight: "25px",
  color: "#6B7A99",
};

const reqbtn = {
  width: "114px",
  height: "42px",
  boxShadow: "none",
  background: "#445FD2",
  borderRadius: "8px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "10px",
  textTransform: "none",
};
