import React, { useEffect } from "react";
import {
  Box,
  Modal,
  Paper,
  Typography,
  Button,
  BottomNavigation,
} from "@mui/material";
import GoLeft from "../../../assets/Images/CommonImages/GoLeft.png";
import BreadCrumbHeader from "../../../components/Header/BreadCrumbHeader";
import { Stack } from "@mui/system";
import ProductImageOne from "../../../assets/ProductImages/Imgone.png";
import AddIcon from "../../../assets/Images/CommonImages/Add.png";
import RedoIcon from "../../../assets/Images/CommonImages/RedoIcon.svg";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useGetrecentProducts } from "../../../Hooks/GetProducts/useGetrecentProducts";
import axios from "axios";

function CircularProgressWithLabel(props) {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        sx={{
          color: "#445FD2",
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
            fontSize: "20px",
          }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

const MyproductOfficeSupply = () => {
  let id;
  id = useParams().id;
  const location = useLocation();
  // console.log(location);
  const [progress, setProgress] = React.useState(25);
  const {
    data: recentProductsData,
    isLoading,
    isError,
    refetch: refetchRecentProducts,
  } = useGetrecentProducts();

  let path = window.location.pathname;

  const [currentProduct, setCurrentProduct] = React.useState({});
  const fetchCurrentProduct = async () => {
    await axios
      .get(`/product/get_product_byId/${id}`)
      .then((res) => {
        console.log(res.data);
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
      path.includes("officesupplyproductinfo")
    ) {
      setProgress(50);
    } else if (
      path.includes("technicalinfo") ||
      path.includes("lifestyletechinfo") ||
      path.includes("electronicstechinfo") ||
      path.includes("officesupplytechinfo")
    ) {
      setProgress(75);
    } else if (
      path.includes("golive") ||
      path.includes("lifestylegolive") ||
      path.includes("electronicsgolive") ||
      path.includes("officesupplygolive")
    ) {
      setProgress(100);
    } else if (
      path.includes("") ||
      path.includes("") ||
      path.includes("") ||
      path.includes("")
    ) {
      setProgress(25);
    }
  });

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
          height: "100%",
          minHeight: "82vh",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
            minHeight: "80px",
            ml: "2%",
            width: "98%",
            mx: "auto",
            maxHeight: "800px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
              width: "240px",
            }}
          >
            <img src={GoLeft} alt="left" width={"22px"} height="9px" />
            <Typography sx={TitleText}>Recent Products</Typography>
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
              alignItems: "center",
              width: "170px",
            }}
          >
            <Typography sx={TitleText}>Add Product</Typography>
            <img src={AddIcon} alt="left" width={"28px"} height="auto" />
          </Box> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
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
          <Box
            sx={{
              height: "100%",
              display: "grid",
              width: "100%",
              maxWidth: "400px",
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
                minWidth: "500px",
                gap: "20px",
              }}
            >
              {recentProductsData?.map((res, index) => {
                return (
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "30px",
                      alignItems: "center",
                      width: "100%",
                      maxWidth: "250px",
                    }}
                  >
                    <img
                      src={res?.ProductImages[0]?.url || ProductImageOne}
                      alt=""
                      style={{
                        width: "100%",
                        maxWidth: "140px",
                        height: "auto",
                        maxHeight: "100px",
                        borderRadius: "10px",
                      }}
                    />
                    <Typography>
                      <a
                        style={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "20px",
                          textAlign: "center",
                          color: "#ADB8CC",
                          textDecoration: "none",
                        }}
                        href={"/home/appreal/" + `${res.id}`}
                      >
                        {res?.ProductName}
                      </a>
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
            <Box
              sx={{
                width: "300px",
                height: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                ml: 2,
                mt: 3,
              }}
            >
              <CircularProgressWithLabel value={progress} size={90} />
            </Box>
          </Box>
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
            {/* <GeneralInformation /> */}
            {/* <TextileProductInfo /> */}
            {/* <TechInfo /> */}
            {/* <Box
              sx={{
                bgcolor: "#f3f6f9",
              }}
            >
              {(() => {
                switch (status) {
                  case 1:
                    return <GeneralInformationModal />;
                  case 2:
                    return <TextileProductInfo />;
                  case 3:
                    return <TechInfo />;
                  case 4:
                    return <GoLive />;
                }
              })()}
            </Box> */}
            {/* <Box
              sx={{
                width: "716px",
                mx: "auto",
                height: "100%",
                maxWidth: "716px",
                bgcolor: "transparent",
              }}
            ></Box> */}
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
};

export default MyproductOfficeSupply;

const TitleText = {
  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "20px",
  lineHeight: "25px",
  color: "#6B7A99",
};
