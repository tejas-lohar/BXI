import React from "react";
import { Grid, Typography, Box, Button, Paper, TextField } from "@mui/material";
// import barterLogo from "../assets/Images/register/logo.svg";
import barterLogo from "../assets/BXI_LOGO.png";
const BarterHeader = () => {
  return (
    <Grid
      container
      sx={{
        height: "25%",
        // bgcolor: "red",
      }}
    >
      <Grid
        item
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
        gap={2}
      >
        <Box
          sx={{
            width: "100px",
            mt: 3,
          }}
        >
          <img
            src={barterLogo}
            alt="img"
            style={{ height: "auto", width: "50px" }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default BarterHeader;
const mainText = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: 16,
  textAlign: "center",
  color: "#6B7A99",
  display: "flex",
  justifyContent: "space-around",
};
