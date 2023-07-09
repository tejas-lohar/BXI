import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import CheckIcon from "../assets/StepComponenets/CheckIcon.svg";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Indicator from "../../src/assets/Images/Indicator.svg";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", position: "absolute" }}>
      <Box sx={{ width: "100%", minWidth: "400px" }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

const Stepper = () => {
  const Location = useLocation();

  console.log("Location", Location?.pathname);

  let progress = 25;

  let createaccount = false;
  let gst = false;
  let bank = false;
  let AllOtherRoutes = false;
  if (
    Location.pathname.includes("createaccount") ||
    Location.pathname.includes("otp")
  ) {
    createaccount = true;
  } else if (Location.pathname.includes("gst")) {
    gst = true;
    createaccount = true;
    progress = 50;
    bank = false;
  } else if (Location.pathname.includes("bank")) {
    progress = 100;
    bank = true;
    createaccount = true;
    gst = true;
  } else if (
    Location.pathname.includes(
      "forward_penny" || "reverse_penny" || "beingverified"
    )
  ) {
    AllOtherRoutes = true;
  }

  console.log(progress);

  return (
    <Grid
      container
      sx={{
        textAlign: "center",
        position: "absolute",
        width: { xl: "50%", lg: "60%", md: "60%", sm: "60%", xs: "80%" },
        maxWidth: {
          xl: "100%",
          lg: "100%",
          md: "100%",
          sm: "100%",
          xs: "100%",
        },
        left: { xl: "29%", lg: "33%", md: "34%", sm: "50%", xs: "50%" },
        transform: "translate(-50%,-50%)",
        top: "12%",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{
          width: "400px",
          height: "100px",
          display: "flex",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LinearProgressWithLabel
          value={progress}
          sx={{
            backgroundColor: "#E0E0E7",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#375DBB",
            },
          }}
        />
        <Box
          sx={{
            width: "150px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: "0%",
            top: "57%",
            transform: "translate(-55%, -50%)",
          }}
        >
          <Box
            sx={{
              height: "16px",
              width: "16px",
            }}
          >
            {gst ? (
              <img
                src={Indicator}
                alt="indicator"
                style={{ height: "18px", width: "18px", marginTop: "7px" }}
              />
            ) : (
              <Box
                sx={{
                  height: "11px",
                  width: "11px",
                  border: "5px solid #375dbb",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  mt: "3px",
                }}
              ></Box>
            )}
          </Box>
          <Typography
            sx={{
              ...StepperTextStyle,
              color: createaccount ? "#375DBB" : "#898F8F",
              mt: "10px",
            }}
          >
            Company Details
          </Typography>
        </Box>
        <Box
          sx={{
            width: "150px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: "50%",
            top: "57%",
            transform: "translate(-55%, -50%)",
          }}
        >
          {bank ? (
            <Box
              sx={{
                height: "16px",
                // border: "4px solid #375DBB",
                width: "16px",
                backgroundColor: "white",
                // borderRadius: "50%",
              }}
            >
              <img
                src={Indicator}
                alt="indicator"
                style={{ height: "18px", width: "18px", marginTop: "2px" }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                height: "12px",
                width: "12px",
                border: "4px solid #375dbb",
                backgroundColor: "white",
                borderRadius: "50%",
                mt: "7px",
              }}
            ></Box>
          )}
          <Typography
            sx={{
              ...StepperTextStyle,
              color: gst ? "#375DBB" : "#898F8F",
              mt: "5px",
            }}
          >
            GST Detail
          </Typography>
        </Box>
        <Box
          sx={{
            width: "200px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            left: "105%",
            top: "58%",
            transform: "translate(-55%, -50%)",
          }}
        >
          {AllOtherRoutes ? (
            <Box
              sx={{
                height: "16px",
                // border: "4px solid #375DBB",
                width: "16px",
                backgroundColor: "white",
                // borderRadius: "50%",
              }}
            >
              <img
                src={Indicator}
                alt="indicator"
                style={{ height: "16px", width: "16px" }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                height: "12px",
                width: "12px",
                border: "4px solid #375dbb",
                backgroundColor: "white",
                borderRadius: "50%",
                mt: "3px",
              }}
            ></Box>
          )}
          <Typography
            sx={{ ...StepperTextStyle, color: bank ? "#375DBB" : "#898F8F" }}
          >
            Company Bank Details
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
};

export default Stepper;

const StepperTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  color: "#375DBB",
};
