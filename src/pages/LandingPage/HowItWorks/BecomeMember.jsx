import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import SampleVideo from "../../../assets/SampleVideo/SampleVideo.mp4";
import HBM from "../../../assets/HomePageImages/becomememberimg.svg";
import Fade from "react-reveal/Fade";
const BecomeMember = () => {
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          height: "80vh",
          width: "100%",
        }}
      >
        {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <video
              controls
              autoPlay
              controlsList="nodownload"
              src={SampleVideo}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "0 17.449px 17.449px 0",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography variant="inherit" component="span" sx={headingStyle}>
                How
              </Typography>
              <Typography variant="inherit" component="span" sx={gradientText}>
                To Become a Member?
              </Typography>
            </Box>
            <Box
              sx={{
                width: "90%",
                maxWidth: "90%",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                marginLeft: "40px",
                marginTop: "24px",
              }}
            >
              <img
                src={HBM}
                alt="HBM"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid> */}
        <Grid container>
          <Grid item xl={6} lg={6} md={6}>
            <video
              // controls
              autoPlay
              // controlsList="nodownload"
              src={
                "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/SampleVideo.mp4"
              }
              style={{
                width: "100%",
                height: "75vh",
                objectFit: "cover",
                borderRadius: "0 17.449px 17.449px 0",
              }}
            />
          </Grid>
          <Grid item xl={6} lg={6} md={6}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: -2,
                }}
              >
                <Fade top duration={1000}>
                  <Typography
                    variant="inherit"
                    component="span"
                    sx={headingStyle}
                  >
                    How
                  </Typography>
                  <Typography
                    variant="inherit"
                    component="span"
                    sx={gradientText}
                  >
                    To Become a Member?
                  </Typography>
                </Fade>
              </Box>
              <Box
                sx={{
                  width: "90%",
                  mx: "auto",
                  maxWidth: "80%",
                  height: "80%",
                  maxHeight: "60vh",
                  display: "flex",
                  justifyContent: "center",
                  // marginLeft: "40px",
                  mt: 1,
                }}
              >
                <img
                  src={HBM}
                  alt="HBM"
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default BecomeMember;
const gradientText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xs: "22px",
    sm: "28px",
    md: "30px",
    lg: "30px",
    xl: "30px",
  },
  letterSpacing: "0.5px",
  lineHeight: "65px",
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(75deg, #375DBB 29.17%, #00B1FF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
};
const headingStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xs: "22px",
    sm: "28px",
    md: "30px",
    lg: "30px",
    xl: "30px",
  },
  letterSpacing: "0.5px",
  lineHeight: "65px",
  display: "flex",
  alignItems: "center",
  color: "#0D0E0E",
  marginRight: "10px",
};
