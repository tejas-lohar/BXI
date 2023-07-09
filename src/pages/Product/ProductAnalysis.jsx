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
import DocDownloadImg from "../../assets/Images/CommonImages/DocDownload.png";
import DashboardChart from "../../components/Charts/DashboardChart";
import { useDispatch, useSelector } from "react-redux";
import LineChart from "../../views/Dashboard/LineChartPage";
import LineChatPageForProductAnalytics from "../../views/Dashboard/LineChatPageForProduct";
import {
  useGetAllCompanyProducts,
  useRequestCredit,
} from "../../views/Dashboard/useGetAllCompanyProducts";
import { ProductAnalysiss } from "../../redux/action/Products/ProductAnalysis";
import { ProductAnalysisDataOfLastWeeks, ProductAnalysisDataOfLastMonths, ProductAnalysisDataOfThreeMonths, ProductAnalysisDataOfSixMonths, ProductAnalysisDataOfLastYears, ProductAnalysisDataOfLastFiveYears } from "../../redux/action/Products/ProductAnalysisData";


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

const ProductAnalysis = () => {
  const [ProductId, setProductId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()
  const { ProductAnalysis } = useSelector((state) => state.ProductAnalysis);

  useEffect(() => {
    dispatch(ProductAnalysiss());
  }, [dispatch])

  useEffect(() => {
    if (ProductId) {
      dispatch(ProductAnalysisDataOfLastWeeks(ProductId));
      dispatch(ProductAnalysisDataOfLastMonths(ProductId));
      dispatch(ProductAnalysisDataOfThreeMonths(ProductId));
      dispatch(ProductAnalysisDataOfSixMonths(ProductId));
      dispatch(ProductAnalysisDataOfLastYears(ProductId));
      dispatch(ProductAnalysisDataOfLastFiveYears(ProductId));
    }
  }, [ProductId]);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (ProductAnalysis.length > 0) {
      setProductId(ProductAnalysis[0]._id);
    }
  }, [ProductAnalysis]);

  console.log("ProductId", ProductId);

  return (
    <Paper sx={{ width: "100%", bgcolor: "transparent" }} elevation={0}>
      <BreadCrumbHeader
        MainText="Products Analytics"
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
            <>
              {loading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width={440}
                    height={520}
                    animation="wave"
                    sx={{ borderRadius: "10px", mt: 3 }}
                  />
                </>
              ) : (
                <Box sx={{ width: "100%", height: "auto", mt: 1.2 }}>
                  <Box sx={RecenteUsersBox}>
                    <Box
                      sx={{
                        padding: "2rem 2rem",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ ...TokenText, lineHeight: "30px" }}>
                        Product Details
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
                        maxHeight: "700px",
                        overflowY: "scroll",
                        bgcolor: "transparent",
                      }}
                    >
                      {ProductAnalysis?.map((item, index) => {
                        return (
                          <Box
                            key={index}
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              alignItems: "center",
                              width: "100%",
                              bgcolor: "transparent",
                              mt: index === 0 ? "0px" : "5rem",
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
                                  style={{ width: "60px", height: "60px" }}
                                  src={item?.ProductImages[0]?.url}
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
                                  {item.ProductName ? item.ProductName : "Product"}
                                </Typography>
                                <br></br>
                                <Typography
                                  sx={{
                                    ...StatMainText,
                                    fontSize: "12px",
                                    lineHeight: "0px",
                                  }}
                                >
                                  {item.ProductDescription ? item.ProductDescription : "Product Description"}
                                </Typography>
                              </Box>
                            </Box>
                            <Button
                              sx={{ ml: "auto" }}
                            onClick={() => setProductId(item._id)}
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
                  <Box>
                    <Skeleton
                      variant="rectangular"
                      width={990}
                      height={520}
                      animation="wave"
                      sx={{ borderRadius: "10px", mt: 3 }}
                    />
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      width: "98%",
                      ml: "auto",
                      mr: "0px",
                      height: "auto",
                    }}
                  // ref={componentRef1}
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
                    ></Paper>
                    <Paper sx={DashboardChartStyle} elevation={0}>
                      <LineChatPageForProductAnalytics />
                    </Paper>
                  </Box>
                </>
              )}
            </>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default ProductAnalysis;

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
  fontWeight: 400,
  fontSize: "10px",
  lineHeight: "15px",
  /* identical to box height */

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
