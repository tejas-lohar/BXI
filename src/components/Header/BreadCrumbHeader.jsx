import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import React from "react";
import { useLocation } from "react-router-dom";

const BreadCrumbHeader = (Props) => {
  // console.log("Propdata", Props);
  const location = useLocation();
  const url = location.pathname;
  let splitedurl = url.split("/");
  const urlWithoutFirstChar = url.substring(1);
  let StoreUrl = urlWithoutFirstChar.substring(
    0,
    urlWithoutFirstChar.indexOf("/")
  );

  let storeLocationArray = [
    [
      <Typography sx={{ ...TextStyleInsidePaper, fontSize: "11px" }}>
        You are here
      </Typography>,
    ],
  ];
  for (let i = 1; i < splitedurl.length; i++) {
    storeLocationArray.push(splitedurl[i]);
  }
  return (
    <Paper
      item
      xl={12}
      lg={12}
      md={12}
      sm={12}
      xs={12}
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        py: "16px",
        marginBottom: "2rem",
        minHeight: "50px",
        width: "100%",
        mx: "auto",
      }}
      gap={0.5}
      elevation={0}
    >
      <Typography sx={maintext}>{Props.MainText}</Typography>
      {/* <Breadcrumbs separator=">" aria-label="breadcrumb" sx={menutext}>
        {storeLocationArray.map((item, index) => {
          // console.log(item);
          if (item === "home") {
            return (
              <Link
                underline="hover"
                key={index}
                color="inherit"
                to={`/${item}`}
                style={{ textDecoration: "none" }}
              >
                <Typography sx={{ ...TextStyleInsidePaper, fontSize: "11px" }}>
                  {item}
                </Typography>
              </Link>
            );
          } else {
            return (
              <Link
                underline="hover"
                key={index}
                color="inherit"
                to={`/home/${item}`}
                style={{ textDecoration: "none" }}
              >
                <Typography sx={{ ...TextStyleInsidePaper, fontSize: "11px" }}>
                  {item}
                </Typography>
              </Link>
            );
          }
        })}
      </Breadcrumbs> */}
    </Paper>
  );
};

export default BreadCrumbHeader;

const maintext = {
  fontFamily: "Poppins",
  fontStyle: "SemiBold",
  fontWeight: 600,
  fontSize: {
    xl: "2.4rem",
    lg: "2.4rem",
    md: "2rem",
    sm: "1.8rem",
    xs: "1.6rem",
  },
  mt: 1,
  width: "100%",
  textAlign: "center",
  ml: -10,
};

const menutext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontSize: "1rem",
  fontWeight: 500,
  color: "#807A7A",
};

const TextStyleInsidePaper = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontFamily: "Poppins",
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.3rem",
    sm: "1rem",
    xs: "1rem",
  },
  fontWeight: 500,
  color: "#6B7A99",
  lineHeight: "1.5",
  marginBottom: "2%",
};

const plantext = {
  fontFamily: "Poppins",
  fontStyle: "SemiBold",
  fontWeight: 600,
  fontSize: {
    xl: "3.2rem",
    lg: "3.1rem",
    md: "3rem",
    sm: "1.8rem",
    xs: "1.6rem",
  },
  color: "#202020",
};

const introtext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1rem",
    sm: "1rem",
    xs: "1rem",
  },
  color: "#B5BCCC",
  textAlign: "center",
  width: "75%",
  mx: "auto",
};

const paper = {
  width: "90%",
  display: "flex",
  margin: "2rem",
  padding: "2rem",
  height: {
    xl: "40rem",
    lg: "40rem",
    md: "25rem",
    sm: "25rem",
    xs: "25rem",
  },
  border: "2px solid #EAEAEA",
  borderRadius: "3rem",
  "&:hover": {
    border: "2px solid #445FD2",
  },
};

const checkicon = {
  color: "#445FD2",
  borderRadius: "30px",
  padding: "2px",
  background: "#E5EAEF",
};

const card = {
  textAlign: "left",
  width: {
    xl: "85%",
    lg: "85%",
    md: "90%",
    sm: "90%",
    xs: "95%",
  },
  marginLeft: "auto",
  marginTop: {
    xl: "5rem",
    lg: "5rem",
    md: "2rem",
    sm: "2rem",
    xs: "1rem",
  },
};
