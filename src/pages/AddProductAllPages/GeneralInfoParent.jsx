import React, { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import GoLeft from "../../assets/Images/CommonImages/GoLeft.png";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { Stack } from "@mui/system";
import ProductImageOne from "../../assets/ProductImages/Imgone.png";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetrecentProducts } from "../../Hooks/GetProducts/useGetrecentProducts";
import axios from "axios";
import { useGetCompanyDetails } from "../../Hooks/Auth";
import useGetCompanyTypeData from "../../Hooks/CompanyData/useGetCompanyTypeData";

import useGetAuthUser from "../../Hooks/LoggedInUser/useGetAuthUser";

function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        // bottom: "120px",
        // left: "50px",
      }}
    >
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{
          color: "#3361FF",
          fontWeight: "bold",
        }}
        thickness={1}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{
            fontFamily: "Poppins",
            color: "#6B7A99",
            fontWeight: 500,
            fontSize: "18px",
          }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const GeneralInfoParent = () => {
  let id;
  id = useParams().id;
  const location = useLocation();
  console.log(location.pathname, "location");
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(25);
  const [ProgressStep, setProgressStep] = React.useState(1);
  const {
    data: recentProductsData,
    isLoading,
    isError,
    refetch: refetchRecentProducts,
  } = useGetrecentProducts();

  let path = window.location.pathname;
  const { data: CompanyData } = useGetCompanyDetails();
  const {
    data: CompanyTypeData,
    isLoading: CompanyTypeDataLoading,
    error: CompanyTypeDataError,
  } = useGetCompanyTypeData(CompanyData?.data?.companyType);

  // useEffect(() => {
  //   if (CompanyTypeData) {
  //     localStorage.setItem("companyType", CompanyTypeData?.data?.CompanyTypeName)
  //   }
  // }, [CompanyTypeData])

  const [currentProduct, setCurrentProduct] = React.useState({});
  const fetchCurrentProduct = async () => {
    await axios
      .get(`product/get_product_byId/${id}`)
      .then((res) => {
        setCurrentProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCurrentProduct();
    refetchRecentProducts();
  }, [location]);
  useEffect(() => {
    if (
      path.includes("texttileproductinfo") ||
      path.includes("lifestyleproductinfo") ||
      path.includes("electronicsproductinfo") ||
      path.includes("officesupplyproductinfo") ||
      path.includes("mediaonlineproductinfo") ||
      path.includes("mediaofflineproductinfo") ||
      path.includes("hotelsproductinfo") ||
      path.includes("fmcgproductinfo") ||
      path.includes("restaurantproductinfo")
    ) {
      setProgress(50);
      setProgressStep(2);
    } else if (
      path.includes("technicalinfo") ||
      path.includes("lifestyletechinfo") ||
      path.includes("electronicstechinfo") ||
      path.includes("officesupplytechinfo") ||
      path.includes("mediaonlinetechinfo") ||
      path.includes("mediaofflinetechinfo") ||
      path.includes("hotelstechinfo") ||
      path.includes("fmcgtechinfo") ||
      path.includes("restauranttechinfo")
    ) {
      setProgress(75);
      setProgressStep(3);
    } else if (
      path.includes("golive") ||
      path.includes("lifestylegolive") ||
      path.includes("electronicsgolive") ||
      path.includes("officesupplygolive") ||
      path.includes("mediaonlinegolive") ||
      path.includes("mediaofflinegolive") ||
      path.includes("hotelsgolive") ||
      path.includes("fmcggolive") ||
      path.includes("restaurantgolive")
    ) {
      setProgress(100);
      setProgressStep(4);
    } else if (
      path.includes("") ||
      path.includes("lifestylegeneralinfo") ||
      path.includes("electronicsgeneralinfo") ||
      path.includes("officesupplygolive")
    ) {
      setProgress(25);
    }
  });

  const { data: AuthUserData } = useGetAuthUser();

  const leftarrow = () => {
    if (location.pathname?.includes("Voucher")) {
      if (localStorage.getItem("companyType") === "Mobility" && location.pathname?.includes('mobilitygeneralinformation')) {
        navigate(`/home/mobilityVoucher/` + id);
      }
      else if (localStorage.getItem("companyType") === "Electronics" && location.pathname?.includes('electronicsgeneralinformation')) {
        navigate(`/home/electronicsVoucher/` + id);
      }
      else if (localStorage.getItem("companyType") === "FMCG" && location.pathname?.includes('fmcggeneralinformation')) {
        navigate(`/home/fmcgVoucher/` + id);
      }
      else if (localStorage.getItem("companyType") === "Office Supply" && location.pathname?.includes('officesupplygeneralinformation')) {
        navigate(`/home/officesupplyVoucher/` + id);
      }
      else if (localStorage.getItem("companyType") === "Lifestyle" && location.pathname?.includes('lifestylegeneralinformation')) {
        navigate(`/home/lifestyleVoucher/` + id);
      }
      else if (localStorage.getItem("companyType") === "QSR" && location.pathname?.includes('qsrgeneralinformation')) {
        navigate(`/home/qsrVoucher/` + id);
      }
      else if (localStorage.getItem("companyType") === "Entertainment & Events" && location.pathname?.includes('eegeneralinformation')) {
        navigate(`/home/eeVoucher/` + id);
      }
      else if (localStorage.getItem("companyType") === "Textile" && location.pathname?.includes('textilegeneralinformation')) {
        navigate(`/home/textileVoucher/` + id);
      }
      else if (localStorage.getItem("companyType") === "Airlines Tickets" && location.pathname?.includes('airlinegeneralinformation')) {
        navigate(`/home/airlineVoucher/` + id);
      }
      else if (location.pathname?.includes("electronicsVoucher/electronicstechinfo")) {
        navigate(`/home/electronicsVoucher/electronicsgeneralinformation/` + id);
      }
      else if (location.pathname?.includes("fmcgVoucher/fmcgtechinfo")) {
        navigate(`/home/fmcgVoucher/fmcggeneralinformation/` + id);
      }
      else if (location.pathname?.includes("eeVoucher/eetechinfo")) {
        navigate(`/home/eeVoucher/eegeneralinformation/` + id);
      }
      else if (location.pathname?.includes("lifestyleVoucher/lifestyletechinfo")) {
        navigate(`/home/lifestyleVoucher/lifestylegeneralinformation/` + id);
      }
      else if (location.pathname?.includes("textileVoucher/textiletechinfo")) {
        navigate(`/home/textileVoucher/textilegeneralinformation/` + id);
      }
      else if (location.pathname?.includes("mobilityVoucher/mobilitytechinfo")) {
        navigate(`/home/mobilityVoucher/mobilitygeneralinformation/` + id);
      }
      else if (location.pathname?.includes("electronicsVoucher/electronicstechinfo")) {
        navigate(`/home/electronicsVoucher/electronicsgeneralinformation/` + id);
      }
      else if (location.pathname?.includes("officesupplyVoucher/officesupplytechinfo")) {
        navigate(`/home/officesupplyVoucher/officesupplygeneralinformation/` + id);
      }
      else if (location.pathname?.includes("airlineVoucher/airlinetechinfo")) {
        navigate(`/home/airlineVoucher/airlinegeneralinformation/` + id);
      }
      else if (location.pathname?.includes("qsrVoucher/qsrtechinfo")) {
        navigate(`/home/qsrVoucher/qsrgeneralinformation/` + id);
      }
      else if (
        location.pathname?.includes("mobilityVoucher")
        || location.pathname?.includes("electronicsVoucher")
        || location.pathname?.includes("fmcgVoucher")
        || location.pathname?.includes("officesupplyVoucher")
        || location.pathname?.includes("lifestyleVoucher")
        || location.pathname?.includes("qsrVoucher")
        || location.pathname?.includes("textileVoucher")
        || location.pathname?.includes("airlineVoucher")
      ) {
        navigate(`/home/physical`)
      } else if (location.pathname?.includes("eeVoucher")) {
        navigate(`/home/eephysical`)
      } else {
        navigate(-1);
      }

    } else if (location.pathname?.includes("lifestyleproductinfo")) {
      navigate("/home/lifestyle", {
        state: { id: id },
      });
    } else if (location.pathname?.includes("lifestyletechinfo")) {
      navigate("/home/lifestyle/lifestyleproductinfo/" + id);
    } else if (location.pathname?.includes("lifestylegolive")) {
      navigate("/home/lifestyle/lifestyletechinfo/" + id);
    } else if (location.pathname?.includes("officesupplyproductinfo")) {
      navigate("/home/officesupply", { state: { id: id } });
    } else if (location.pathname?.includes("officesupplytechinfo")) {
      navigate("/home/officesupply/officesupplyproductinfo/" + id);
    } else if (location.pathname?.includes("officesupplygolive")) {
      navigate("/home/officesupply/officesupplytechinfo/" + id);
    } else if (location.pathname?.includes("texttileproductinfo")) {
      navigate("/home/textile", {
        state: { id: id },
      });
    } else if (location.pathname?.includes("technicalinfo")) {
      navigate("/home/textile/texttileproductInfo/" + id);
    } else if (location.pathname?.includes("/golive")) {
      navigate("/home/textile/technicalinfo/" + id);
    } else if (location.pathname?.includes("restaurantproductinfo")) {
      navigate("/home/restaurant", {
        state: { id: id },
      });
    } else if (location.pathname?.includes("restauranttechinfo")) {
      navigate("/home/restaurant/restaurantproductinfo/" + id);
    } else if (location.pathname?.includes("restaurantgolive")) {
      navigate("/home/restaurant/restauranttechinfo/" + id);
    }

    else if (location.pathname?.includes("electronicsproductinfo")) {
      navigate("/home/electronics", {
        state: { id: id },
      });
    } else if (location.pathname?.includes("electronicstechinfo")) {
      navigate("/home/electronics/electronicsproductinfo/" + id);
    } else if (location.pathname?.includes("electronicsgolive")) {
      navigate("/home/electronics/electronicstechinfo/" + id);
    } else if (location.pathname?.includes("hotelsproductinfo")) {
      navigate("/home/hotelsVoucher/" + id);
    } else if (location.pathname?.includes("hotelstechinfo")) {
      navigate("/home/hotelsVoucher/hotelsproductinfo/" + id);
    } else if (location.pathname?.includes("hotelsgolive")) {
      navigate("/home/hotelsVoucher/hotelstechinfo/" + id);
    } else if (location.pathname?.includes("fmcgproductinfo")) {
      navigate("/home/fmcg", {
        state: { id: id },
      });
    } else if (location.pathname?.includes("fmcgtechinfo")) {
      navigate("/home/fmcg/fmcgproductinfo/" + id);
    } else if (location.pathname?.includes("fmcggolive")) {
      navigate("/home/fmcg/fmcgtechinfo/" + id);
    } else if (location.pathname?.includes("mobilityproductinfo")) {
      navigate("/home/mobility", {
        state: { id: id },
      });
    } else if (location.pathname?.includes("mobilitytechinfo")) {
      navigate("/home/mobility/mobilityproductinfo/" + id);
    } else if (location.pathname?.includes("mobility/mobilitygolive")) {
      navigate("/home/mobility/mobilitytechinfo/" + id);
    } else if (location.pathname?.includes("mediaonlineproductinfo")) {
      navigate("/home/mediaonline", {
        state: { id: id },
      });
    } else if (location.pathname?.includes("mediaonlinetechinfo")) {
      navigate("/home/mediaonline/mediaonlineproductinfo/" + id);
    } else if (location.pathname?.includes("mediaonlinegolive")) {
      navigate("/home/mediaonline/mediaonlinetechinfo/" + id);
    } else if (location.pathname?.includes("mediaofflineproductinfo")) {
      // navigate("/home/mediaoffline");
      navigate("/home/mediaoffline", {
        state: { id: id },
      });
    } else if (location.pathname?.includes("mediaofflinetechinfo")) {
      navigate("/home/mediaoffline/mediaofflineproductinfo/" + id);
    } else if (location.pathname?.includes("mediaofflinegolive")) {
      navigate("/home/mediaoffline/mediaofflinetechinfo/" + id);
    } else {
      navigate(-1);
    }
  };

  return (
    <Paper
      sx={{
        width: "100%",
        height: "auto",
        bgcolor: "transparent",
      }}
      elevation={0}
    >
      <BreadCrumbHeader title="My Products" MainText={"My Products"} />
      <Paper
        sx={{
          width: "100%",
          height: "auto",
          mx: "auto",
          pb: 3,
          borderRadius: "17px",
          position: "relative",
          minHeight: "90vh",
          pt: 2,
          pl: 2,
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            width: "120px",
            paddingLeft: "10px",
            mt: "10px",
          }}
          onClick={leftarrow}
        >
          <img
            src={GoLeft}
            alt="left"
            width={"22px"}
            height="9px"
            style={{ cursor: "pointer" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent:
              recentProductsData?.length > 0 ? "space-between" : "center",
            alignContent: "center",
            height: "100%",
            minHeight: "auto",
            flexWrap: "wrap",
            bgcolor: "transparent",
            width: "100%",
            mx: "auto",
            mt: 2,
          }}
        >
          {recentProductsData?.length > 0 ? (
            <Box
              sx={{
                height: "100%",
                display: "grid",
                width: "100%",
                maxWidth: "400px",
                position: "relative",
              }}
            >
              <Stack
                direction="column"
                spacing={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "500px",
                  mx: "auto",
                  gap: "05px",
                }}
              >
                <Typography sx={TitleText}>Recent Products</Typography>
                {recentProductsData?.map((res, index) => {
                  return (
                    // <Link
                    //   to={"/home/appreal/" + `${res.id}`}
                    //   style={{
                    //     textDecoration: "none",
                    //   }}
                    // >
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "20px",
                        alignItems: "center",
                        width: "100%",
                        maxWidth: "auto",
                        maxWidth: "250px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundImage: `url(${res?.ProductImages[0]?.url || ProductImageOne
                            })`,
                          backgroundSize: "contain",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          width: "100px",
                          height: "100px",
                          borderRadius: "10px",
                          boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
                          border: "1px solid #E5E5E5",
                          cursor: "pointer",
                        }}
                      ></Box>

                      <Typography
                        sx={{
                          width: "100px",
                          fontFamily: "Poppins",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "20px",
                          textAlign: "left",
                          color: "#ADB8CC",
                          textDecoration: "none",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          "&:hover": {
                            color: "#000",
                            cursor: "pointer",
                          },
                        }}
                      >
                        {res?.ProductName}
                      </Typography>
                    </Box>
                    // </Link>
                  );
                })}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",

                      width: "88px",
                      height: "88px",
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      ml: 2,
                      bgcolor: "transparent",
                      borderRadius: "50%",
                      border: "1px solid #E3E3E3",
                      marginTop: "10px",
                    }}
                  >
                    <CircularProgressWithLabel value={progress} size={90} />
                    <Box
                      sx={{
                        width: "30px",
                        height: "30px",
                        bgcolor: "#3361FF",
                        border: "2px solid #3361FF",
                        boxShadow: "0px 10px 30px rgba(51, 97, 255, 0.3)",
                        borderRadius: "20px",
                        position: "absolute",
                        right: "-16%",
                        display: "flex",
                        justifyContent: "center",

                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 900,
                          fontSize: "12px",
                          textAlign: "center",
                          color: "#FFFFFF",
                        }}
                      >
                        {ProgressStep}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      marginLeft: "72px",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      "&:hover": {
                        color: "#445FD2",
                      },
                    }}
                  >
                    New Product
                  </Typography>
                </Box>
              </Stack>
            </Box>
          ) : (
            // <Box
            //   sx={{
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     alignContent: "center",
            //     background: "red",
            //     flexDirection: "column",
            //     ml: "25px",
            //     width: "100%",
            //   }}
            // >
            // </Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "18px",
                display: "flex",
                alignItems: "flex-start",
                textAlign: "right",
                color: "#8A8A8A",
                // lineHeight: 25,
                ml: "35px",
                mt: 5,
              }}
            >
              No Data Found
            </Typography>
          )}
          <Box
            sx={{
              display: "grid",
              width: "716px",
              mx: "auto",
              height: "100%",
              maxWidth: "716px",
              overflow: "hidden",
              boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
};

export default GeneralInfoParent;

const TitleText = {
  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "25px",
  color: "#6B7A99",
};
