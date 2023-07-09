import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import MarketPlacePoster from "../../assets/PosterImages/MarketPlacePoster.png";

const ImagePoster = () => {
  return (
    <Paper sx={PosterStyle} elevation={0}>
      <Box sx={OfferboxStyle}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Typography sx={OfferBoxText}>Save</Typography>
          <Typography sx={PosterOfferText}>10%</Typography>
          <Typography sx={OfferBoxText}>
            At our <br></br>resorts
          </Typography>
        </Box>
      </Box>
      <Button sx={ButtonStyle}>Book Now</Button>
    </Paper>
  );
};

export default ImagePoster;

const PosterStyle = {
  width: "97%",
  mx: "auto",
  height: {
    xl: "294px",
    lg: "280px",
    md: "260px",
    sm: "240px",
    xs: "220px",
  },
  boxShadow: "0px",
  background: `url(${MarketPlacePoster}), #FFFFFF`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  borderRadius: "12px",
  position: "relative",
  my: 5,
  zIndex: 0,
};

const OfferboxStyle = {
  width: "auto",
  minWidth: {
    xl: "475px",
    lg: "475px",
    md: "450px",
    sm: "400px",
    xs: "260px",
  },
  maxWidth: "475px",
  height: {
    xl: "147px",
    lg: "140px",
    md: "130px",
    sm: "120px",
    xs: "100px",
  },
  background: "rgba(24, 24, 24, 0.1)",
  backdropFilter: "blur(2px)",
  borderRadius: "25px",
  position: "absolute",
  top: { xl: "32%", lg: "32%", md: "32%", sm: "15%", xs: "15%" },
  left: { xl: "15%", lg: "12%", md: "10%", sm: "5%", xs: "4%" },
};

const OfferBoxText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 800,
  fontSize: { xl: "36px", lg: "32px", md: "30px", sm: "28px", xs: "26px" },
  lineHeight: "40px",
  /* identical to box height */
  color: "#FFFFFF",
};

const PosterOfferText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 900,
  fontSize: { xl: "64px", lg: "60px", md: "55px", sm: "50px", xs: "40px" },
  lineHeight: "96px",
  color: "#FFFFFF",
  WebkitTextStroke: "2px #776B47",
};

const ButtonStyle = {
  width: {
    xl: "260px",
    lg: "240px",
    md: "220px",
    sm: "210px",
    xs: "180px",
  },
  height: "60px",
  background: "#fff",
  borderRadius: "15px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "24px",
    lg: "22px",
    md: "20px",
    sm: "18px",
    xs: "16px",
  },
  "&:hover": {
    background: "#C3CAD9",
  },
  lineHeight: "36px",
  color: "#303030",
  top: {
    xl: "60%",
    lg: "60%",
    md: "60%",
    sm: "70%",
    xs: "70%",
  },
  left: "auto",
  right: { xl: "-75%", lg: "-65%", md: "-65%", sm: "-50%", xs: "-35%" },
  zIndex: 0,
  textTransform: "none",
};
