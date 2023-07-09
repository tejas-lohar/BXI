import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
// import LeftArrow from "../../assets/Images/payment/LeftArrow.svg";
import LeftArrow from '../../assets/Images/payment/LeftArrow.png';

import { Link } from "react-router-dom";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { toast, ToastContainer } from "react-toastify";
const BankDetails = () => {
  return (
    <Paper elevation={0} sx={{ bgcolor: "transparent" }}>
      <ToastContainer style={{ fontSize: "16px" }} />

      <BreadCrumbHeader MainText="Bank Details" subText="Notifications" />
      <Paper
        elevation={0}
        sx={{
          borderRadius: "15px",
          height: "100vh",
          //   alignItems: "center",
          //   flexDirection: "row",
          //   justifyContent: "center",
        }}
      >
        <Link to={"/home"}>
          <Box
            component="img"
            src={LeftArrow}
            alt="LeftArrow"
            sx={{
              width:"22px",
              height :"9px" ,
              mx: "auto",
              p: 2,
            }}
          ></Box>
        </Link>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Typography sx={headText}>Bank Details</Typography>
          <Box>{/* <TextField standard /> */}</Box>
        </Box>
      </Paper>
    </Paper>
  );
};

export default BankDetails;

const headText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 32,
  color: "#6B7A99",
  mt: 5,
};
