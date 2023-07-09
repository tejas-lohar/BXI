import {
  Grid,
  Typography,
  Box,
  Avatar,
  Button,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import { Box } from "@mui/material";
import React from "react";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import avtarImg from "../../assets/Images/MembersPage/AvatarImg.svg";
import { AiFillPlusSquare } from "react-icons/ai";
import { FaHotel } from "react-icons/fa";
import ProductImg from "../../assets/Images/MembersPage/ProductImg.svg";
import DateRangeIcon from "@mui/icons-material/DateRange";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ClearIcon from "@mui/icons-material/Clear";
// import ChartImg from "../../assets/Images/MembersPage/chartImg.png";
import LineChart from "./BarChart";
import { Link, useParams } from "react-router-dom";
import useGetCompanyMemberById from "../../Hooks/CompanyMember/useGetCompanyMemberById";
import CategoryDetails from "../Category/CategoryDetails";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { MdAddBox } from "react-icons/md";
import GoLeftIcon from "../../assets/Images/CommonImages/GoLeft.png";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";
import Avatargenerator from "../../components/AvatarGenerator";
import axios from "axios";

const StyledLabel = styled("span")({
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6B7A99",
});

const MemberDetailsPage = () => {
  const { id } = useParams();
  const [selectedData, setSelectedData] = React.useState("data1");
  const [productDetails, setProductDetails] = React.useState([]);
  const [balance, setBalance] = React.useState("");

  const handleChange = (e) => {
    setSelectedData(e.target.value);
  };
  const {
    data: MemberData,
    isLoading: MemberDataIsLoading,
    error: MemberDataError,
  } = useGetCompanyMemberById(id);

  console.log("MemberData", MemberData);

  const reqBalance = async () => {
    await axios
      .get("wallet/mywallet", {
        withCredentials: true,
      })
      .then((res) => {
        setBalance(res?.data?.data?.balance);
      });
  };

  const fetchProductDetails = async () => {
    return await axios
      .post("/member-details/product-details", {
        sellerCompanyId: MemberData?.companyId,
        postedBy: MemberData?._id,
      })
      .then((response) => response.data)
      .catch((error) => console.error(error));
  };

  React.useEffect(() => {
    const getProductDetails = async () => {
      const productDetails = await fetchProductDetails();
      setProductDetails(productDetails);
    };
    getProductDetails();
    reqBalance();
  }, []);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetLoggedInUser();

  console.log("userDatauserData", MemberData, balance);
  return (
    <Paper
      sx={{
        boxShadow: "none",
        width: "100%",
        bgcolor: "transparent",
      }}
      elevation={0}
    >
      <BreadCrumbHeader MainText={"Member Details"} />
      <Grid
        container
        sx={{
          background: "white",
          mx: "auto",
          width: "100%",
          borderRadius: "10px",
          marginTop: "3rem",
        }}
        spacing={2}
        position="relative"
        padding="2rem 0rem"
      >
        <Link to="/home/dashboard">
          <img
            src={GoLeftIcon}
            style={{
              width: "22px",
              position: "absolute",
              top: "2%",
              left: "1%",
              fontSize: "2.5rem",
              color: "rgba(68, 95, 210, 1)",
              cursor: "pointer",
              marginLeft: "5px",
              marginTop: "5px",
            }}
          />
        </Link>
        <ClearIcon
          sx={{
            position: "absolute",
            top: "2%",
            right: "1%",
            fontSize: "2.5rem",
            color: "rgba(68, 95, 210, 1)",
            cursor: "pointer",
          }}
        />
        <Grid
          item
          xl={3.5}
          lg={3.5}
          md={3.5}
          sm={12}
          xs={12}
          sx={{ padding: "2rem" }}
        >
          <Box
            sx={{
              padding: {
                xl: "2rem",
                lg: "1.5rem",
                md: "1.5rem",
                sm: "1.5rem",
                xs: "1.5rem",
              },
              border: "1px solid rgba(245, 245, 245, 1)",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={BoxHeaderText}>Member Details</Typography>
              <MoreHorizIcon
                // fontSize={"40"}

                sx={{ color: "rgba(146, 158, 174, 1)", fontSize: "17px" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "2.5rem",
                borderBottom: "1px solid rgba(245, 245, 245, 1)",
                paddingBottom: "1.5rem",
                marginBottom: "1.6rem",
                justifyContent: {
                  xl: "start",
                  lg: "start",
                  md: "start",
                  sm: "center",
                  xs: "center",
                },
              }}
            >
              <Avatargenerator companyname={userData?.data?.companyName} />
              <Box
                sx={{
                  marginLeft: "1.2rem",
                }}
              >
                <Typography sx={nameTextStyle}>
                  {MemberData?.name ? MemberData?.name : "N/A"}
                </Typography>
                <Typography sx={emailTextStyle}>
                  {MemberData?.email ? MemberData?.email : "N/A"}
                </Typography>
              </Box>
            </Box>
            <Typography sx={BoxHeaderText}>
              Token Limit:{" "}
              {MemberData?.superAdmin ? balance : MemberData?.tokenlimit}
            </Typography>

            {/* <Button
              sx={{
                background: "#445FD2",

                borderRadius: "10px",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: 15,
                color: "white",
                width: {
                  xl: "90%",
                  lg: "90%",
                  md: "90%",
                  sm: "60%",
                  xs: "60%",
                },
                border: "1px solid #445FD2",
                marginTop: "1.25rem",
                textTransform: "none",
                "&:hover": {
                  background: "white",
                  color: "#445FD2",
                  border: "1px solid #445FD2",
                },
              }}
            >
              Edit
            </Button> */}
          </Box>
        </Grid>
        <Grid
          item
          xl={8.5}
          lg={8.5}
          md={8.5}
          sm={12}
          xs={12}
          sx={{ padding: "2rem", overflow: "scroll" }}
        >
          <Box
            sx={{
              padding: "1.5rem",
              border: "1px solid rgba(245, 245, 245, 1)",
              borderRadius: "10px",
              textAlign: "center",
              height: "206px",
            }}
          >
            <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
              >
                <Typography sx={BoxHeaderText}>Permissions</Typography>

                <Button
                  sx={{
                    textTransform: "none",

                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#929EAE",
                  }}
                >
                  {" "}
                  <AiFillPlusSquare
                    style={{
                      fontSize: "25px",
                      marginRight: "1rem",
                      color: "#e5e5e5",
                    }}
                  />
                  Edit
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xl: "column",
                    lg: "column",
                    md: "column",
                    sm: "row",
                    xs: "column",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",

                    flexDirection: {
                      xl: "row",
                      lg: "row",
                      md: "row",
                      sm: "column",
                      xs: "column",
                    },
                    width: "90%",
                    padding: {
                      xl: "0rem 2rem",
                      lg: "0rem 2rem",
                      md: "0rem 2rem",
                      sm: "0rem 0rem",
                      xs: "0rem 0rem",
                    },
                    mb: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "start",
                      display: "flex",
                      alignItems: "center",
                      gap: "3.5rem",
                    }}
                  >
                    <FaHotel style={{ fontSize: "35px" }} />

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Box>
                        <Typography sx={BoxHeaderText}>
                          Product Category
                        </Typography>
                        <Typography
                          sx={{ ...emailTextStyle, marginTop: "0.5rem" }}
                        >
                          {MemberData?.productRights}
                        </Typography>
                        {/* <Typography sx={{color : "#929EAE" , fontFamily : "Poppins" , fontSize : "12px"}}>Lorem Ipsum</Typography> */}
                      </Box>
                    </Grid>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // gap: {
                      //   xl: "10rem",
                      //   lg: "10rem",
                      //   md: "6rem",
                      //   sm: "2rem",
                      //   xs: "0rem",
                      // },
                    }}
                  >
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{
                        display: "flex",
                        justifyContent: "start",
                        width: "100%",
                        minWidth: "300px",
                      }}
                    >
                      <Grid container>
                        <Grid item xl={6} lg={6} md={6}>
                          <FormControlLabel
                            value="View Only"
                            // onChange={(e) => {
                            //   setInputData({
                            //     ...inputData,
                            //     productRights: e.target.value,
                            //   });
                            // }}
                            control={
                              <Radio
                                checked={
                                  MemberData?.productRights === "viewonly"
                                    ? true
                                    : false
                                }
                                sx={{
                                  color: "#445FD2",
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 22,
                                  },
                                }}
                              />
                            }
                            label={<StyledLabel>View Only</StyledLabel>}
                          />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                          <FormControlLabel
                            value="View & Edit"
                            sx={
                              {
                                // ml: 5,
                              }
                            }
                            // onChange={(e) => {
                            //   setInputData({
                            //     ...inputData,
                            //     productRights: e.target.value,
                            //   });
                            // }}
                            control={
                              <Radio
                                checked={
                                  MemberData?.productRights === "View & Edit"
                                    ? true
                                    : false
                                }
                                sx={{
                                  color: "#445FD2",
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 22,
                                    marginLeft: "4px",
                                  },
                                }}
                              />
                            }
                            label={<StyledLabel>View & Edit</StyledLabel>}
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: {
                      xl: "row",
                      lg: "row",
                      md: "row",
                      sm: "column",
                      xs: "column",
                    },
                    marginTop: "5px",
                    // background: "red",
                    width: "90%",
                    padding: {
                      xl: "0rem 2rem",
                      lg: "0rem 2rem",
                      md: "0rem 2rem",
                      sm: "0rem 0rem",
                      xs: "0rem 0rem",
                    },
                    // mb: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      textAlign: "start",
                      display: "flex",
                      alignItems: "center",
                      gap: "3.5rem",
                    }}
                  >
                    <FaHotel style={{ fontSize: "35px" }} />
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Box>
                        <Typography sx={BoxHeaderText}>
                          Member edit rights
                        </Typography>
                        <Typography
                          sx={{ ...emailTextStyle, marginTop: "0.5rem" }}
                        >
                          {MemberData?.roleAndPermission}
                        </Typography>
                        {/* <Typography sx={{color : "#929EAE" , fontFamily : "Poppins" , fontSize : "12px"}}>Lorem Ipsum</Typography> */}
                      </Box>
                    </Grid>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      // gap: {
                      //   xl: "10rem",
                      //   lg: "10rem",
                      //   md: "6rem",
                      //   sm: "2rem",
                      //   xs: "0rem",
                      // },
                      justifyContent: "space-between",
                    }}
                  >
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{
                        display: "flex",
                        bgcolor: "transparent",
                        width: "100%",
                        minWidth: "320px",
                        justifyContent: "end",
                      }}
                    >
                      <Grid container>
                        <Grid item xl={6} lg={6} md={6}>
                          <FormControlLabel
                            value="View Only"
                            sx={{
                              marginRight: "26px",
                            }}
                            control={
                              <Radio
                                checked={
                                  MemberData?.roleAndPermission === "Yes"
                                    ? true
                                    : false
                                }
                                sx={{
                                  color: "#445FD2",
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 22,
                                  },
                                }}
                              />
                            }
                            label={<StyledLabel>Yes</StyledLabel>}
                          />
                        </Grid>
                        <Grid item xl={6} lg={6} md={6}>
                          <FormControlLabel
                            value="View & Edit"
                            sx={{
                              marginRight: "58px",
                            }}
                            control={
                              <Radio
                                checked={
                                  MemberData?.roleAndPermission === "No"
                                    ? true
                                    : false
                                }
                                sx={{
                                  color: "#445FD2",
                                  "& .MuiSvgIcon-root": {
                                    fontSize: 22,
                                  },
                                }}
                              />
                            }
                            label={<StyledLabel>No</StyledLabel>}
                          />
                        </Grid>
                      </Grid>
                    </RadioGroup>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* <Grid container sx={{ marginTop: "2rem", background: "#f3f6f9" }}>
        <Grid
          item
          xl={7}
          lg={7}
          md={7}
          sm={12}
          xs={12}
          sx={{
            borderRadius: "10px",
            padding: {
              xl: "0rem 2rem 0rem 0rem",
              lg: "0rem 2rem 0rem 0rem",
              md: "0rem 2rem 0rem 0rem",
              sm: "0rem",
              xs: "0rem",
            },
            marginBottom: "2rem",
          }}
        >
          <Box
            sx={{
              padding: "3rem",
              background: "#fff",
              borderRadius: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  gap: "30px",
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "2rem" }}
                >
                  <Typography sx={productDetailsTextStyle}>
                    Product Details
                  </Typography>
                </Box>
                <Box>
                  <div>
                    <select
                      onChange={handleChange}
                      style={ProductAnalysticsDropDown}
                    >
                      <option value="data1">Category</option>
                      <option value="data2">LifeStyle</option>
                      <option value="data3">Other</option>
                    </select>
                  </div>
                </Box>
              </Box>
              <Button
                sx={{
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#929EAE",
                }}
              >
                {" "}
                <MdAddBox
                  style={{
                    fontSize: "25px",
                    marginRight: "1rem",
                    color: "#e5e5e5",
                  }}
                />
                Add
              </Button>
            </Box>
            <Box
              sx={{
                maxHeight: "490px",
                overflowY: "scroll",
                padding: "3px",
              }}
            >
                productDetails.map((res, idx) => {
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        mx: "auto",
                        borderRadius: "10px",
                        border: "1px solid rgba(237, 239, 242, 1)",
                        marginTop: "2rem",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box
                          component={"img"}
                          src={
                            res.ProductImages.length > 0
                              ? res.ProductImages[0].url
                              : ProductImg
                          }
                          sx={{
                            borderRadius: "10px",
                            width: {
                              xl: "auto",
                              lg: "auto",
                              md: "auto",
                              sm: "auto",
                              xs: "80px",
                            },
                            maxWidth: "140px",
                          }}
                        />
                        <Box sx={{ marginLeft: "2rem" }}>
                          <Typography
                            sx={{
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#6B7A99",
                              fontFamily: "Poppins",
                            }}
                          >
                            {res.ProductName}
                          </Typography>
                          <Typography sx={productDescText}>
                            {res.ProductDescription}
                          </Typography>
                        </Box>
                      </Box>
                      <MoreHorizIcon
                        sx={{
                          color: "rgba(146, 158, 174, 1)",
                          fontSize: "22px",
                          textAlign: "end",
                          marginRight: "2rem",
                          alignSelf: "flex-start",
                        }}
                      />
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Grid>
      </Grid> */}

      <Button
        sx={{
          background: "#445FD2",

          borderRadius: "10px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: 15,
          color: "white",
          width: {
            xl: "90%",
            lg: "90%",
            md: "90%",
            sm: "60%",
            xs: "60%",
          },
          border: "1px solid #445FD2",
          marginTop: "1.25rem",
          textTransform: "none",
          "&:hover": {
            background: "white",
            color: "#445FD2",
            border: "1px solid #445FD2",
          },
        }}
      >
        Edit
      </Button>
    </Paper>
  );
};

export default MemberDetailsPage;
const ProductAnalysticsDropDown = {
  height: "44px",
  borderRadius: "12px",
  border: "1px solid #E6E9EE",
  paddingLeft: "25px",
  paddingRight: "25px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  color: "#AFAFAF",
  lineHeight: 24,
};
const BoxHeaderText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "16px",
    lg: "14px",
    md: "12px",
    sm: "12px",
    xs: "10px",
  },
  lineHeight: "24px",
  color: "#1B212D",
  textAlign: "start",
};
const nameTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "16px",
    lg: "14px",
    md: "12px",
    sm: "12px",
    xs: "10px",
  },
  lineHeight: "24px",
  color: "#1B212D",
  textAlign: "start",
};
const emailTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "16px",
    lg: "14px",
    md: "9px",
    sm: "12px",
    xs: "10px",
  },
  lineHeight: "24px",
  color: "#929EAE",
  textAlign: "start",
};
const switchLabelTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#929EAE",
  marginRight: "1rem",
};
const OptionTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "16px",
    lg: "14px",
    md: "12px",
    sm: "12px",
    xs: "10px",
  },
  lineHeight: "24px",
  color: "#AFAFAF",
};
const productDetailsTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "16px",
    lg: "14px",
    md: "12px",
    sm: "12px",
    xs: "10px",
  },
  lineHeight: "24px",
  color: "#1B212D",
};
const productNameText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "16px",
    lg: "14px",
    md: "12px",
    sm: "12px",
    xs: "10px",
  },
  lineHeight: "24px",
  color: "#6B7A99",
};
const productDescText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: "10px",
  lineHeight: "15px",
  color: "#858585",
};
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "rgba(68, 95, 210, 1)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
