import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import Process from "../../assets/Dashboard/creditlineprocess.svg";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
const CreditProcess = () => {
  return (
    <Paper sx={{ width: "100%", bgcolor: "transparent" }} elevation={0}>
      <BreadCrumbHeader
        MainText="Credit line process"
        LinkText1="{splitedurl[1]}"
        LinkText2="{splitedurl[2]}"
        link1="Link1"
        link2="link2"
      />
      <Paper
        sx={{
          bgcolor: "#fff",
          boxShadow: "none",
          p: 3,
          borderRadius: "20px",
          height: "auto",
          minHeight: "440px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          component="img"
          src={Process}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "80%",
            // bgcolor: "red",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "26px",
              lineHeight: "39px",
              color: "#6B7A99",
              textAlign: "center",
            }}
          >
            Processing{" "}
          </Typography>
          {/* <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "13px",
              lineHeight: "19px",
              textAlign: "center",
              color: "#6B7A99",
              width: "50%",
              //   bgcolor: "green",
            }}
          >
            Lorem ipsum dolor sit amet consectetur. Est maecenas egestas orci
            amet nulla pharetra feugiat.
          </Typography> */}
        </Box>
      </Paper>
    </Paper>
  );
};

export default CreditProcess;
