import React, { useState } from "react";
import { Grid, Typography, Box, Button, Paper, TextField } from "@mui/material";
import mainImg from "../../assets/Images/register/newMainLogo.svg";
import barterLogo from "../../assets/Images/register/logo.svg";
import BarterHeader from "../../components/BarterHeader";
import { createTheme, ThemeProvider, makeStyles } from "@mui/material/styles";
import { useCompanyDetails } from "../../Hooks/Auth";
const outerTheme = createTheme({
  palette: {
    primary: {
      main: "#6B7A99",
    },
  },
  typography: {
    fontSize: 20,
  },
});
const CompanyDetails = () => {
  const [companyNature, setCompanyNature] = useState();
  const [companyRenew, setCompanyRenew] = useState();
  const { mutate } = useCompanyDetails();

  const addCompanyDetails = () => {
    const data = { companyNature, companyRenew };
    mutate(data);
  };
  return (
    <Paper
      elevation={0}
      sx={{
        boxShadow: "0px",
        height: "100vh",
        width: "100%",
        maxHeight: "100vh",
        maxWidth: "100vw",
        overflowY: "hidden",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <BarterHeader />
      <Grid
        container
        sx={{
          background: "#fff",
          height: "100vh",
          width: "100.5%",
        }}
      >
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={login}>Company Details </Typography>
          <Box
            mt={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "75%",
              gap: "20px",
            }}
          >
            <ThemeProvider theme={outerTheme}>
              <TextField
                label="Company nature"
                placeholder="12345667888"
                variant="outlined"
                required
                onChange={(e) => {
                  setCompanyNature(e.target.value);
                }}
                autoFocus
                InputProps={{
                  style: {
                    borderRadius: "12px",
                    border: "1px #CCCCCC",
                    // padding: "4px 4px",
                    // margin: "8px 0",
                  },
                }}
              />
              <TextField
                label="Company revenue"
                placeholder="Company revenue"
                variant="outlined"
                required
                onChange={(e) => {
                  setCompanyRenew(e.target.value);
                }}
                // size="large"
                InputProps={{
                  style: {
                    borderRadius: "12px",
                    border: "1px #CCCCCC",
                    // padding: "4px 4px",
                    // margin: "8px 0",
                  },
                }}
              />
            </ThemeProvider>

            <Grid
              container
              mt={3}
              sx={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: "  #375DBB",
                  height: "4rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick={addCompanyDetails}
              >
                <Typography sx={loginText}>Next</Typography>
              </Button>
              <Grid item xl={12} lg={12} md={12} sm={12} xs={12} mt={3}>
                <Typography sx={accountText}>
                  Don’t have an account?{" "}
                  <span
                    style={{
                      color: "rgba(55, 93, 187, 1)",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                    }}
                  >
                    {" "}
                    Login
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: {
              xl: "block",
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
            },
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              minWidth: "700px",
              maxWidth: "1050px",
              height: "100vh",
              position: "absolute",
              right: "-200px",
              bottom: "-60px",
            }}
          >
            <img
              // src={newMainLogo}
              src={mainImg}
              alt="img"
              style={{ height: "auto", width: "100%", maxHeight: "100vh" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CompanyDetails;

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

const login = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "3.2rem",
    lg: "3.1rem",
    md: "3rem",
    sm: "2.8rem",
    xs: "2.6rem",
  },
  color: "#6B7A99",
};

const remText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.4rem",
    lg: "1.3rem",
    md: "1.3rem",
    sm: "1.3rem",
    xs: "1.3rem",
  },
  color: "#6B7A99",
};

const accountText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.4rem",
    sm: "1.2rem",
    xs: "1rem",
  },
  color: "#A1A1A1",
  textAlign: {
    xl: "left",
    lg: "left",
    md: "center",
    sm: "center",
    xs: "center",
  },
};

const loginText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.4rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },

  textAlign: "center",
  color: "#FFFFFF",
  textTransform: "none",
};
