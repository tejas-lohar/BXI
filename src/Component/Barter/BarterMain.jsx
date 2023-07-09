import React from "react";
import { Stack, Paper } from "@mui/material";
import HeaderBarter from "./HeaderBarter";
import MainContent from "./MainContent";
import Login from "./Login";
import Tolist from "./Tolist";
import Footer from "./Footer";
import { Link } from "react-router-dom";
const BarterMain = () => {
  return (
    <Paper elevation sx={paperStyle}>
      <Stack>
        <HeaderBarter />
        <MainContent />
        <Login />
        {/* <Tolist /> */}
        <nav>{/* <Link to="transition">transition</Link> */}</nav>
        <Footer />
      </Stack>
    </Paper>
  );
};

export default BarterMain;
const paperStyle = {
  height: "100vh",
  width: "95%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "10px",
};
