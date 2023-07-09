import React, { useState } from "react";
import { Grid, Typography, Box, Button, Paper, TextField } from "@mui/material";
import mainImg from "../../assets/Images/register/addpasswordimg.svg";
import barterLogo from "../../assets/BXI_LOGO.png";
import { createTheme, ThemeProvider, makeStyles } from "@mui/material/styles";
import BarterHeader from "../../components/BarterHeader";
import Stepper from "../../components/Stepper";
import { useAddPassword } from "../../Hooks/Auth";
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
const AddPassoword = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();

  const { mutate } = useAddPassword();

  const addPassword = () => {
    const data = { email, password, rePassword };
    data(mutate);
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
      {/* <BarterHeader /> */}
      <Grid
        container
        sx={{
          background: "#fff",
          height: "100vh",
          width: "110%",
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
            marginTop: "-20rem",
          }}
        >
          <Grid
            container
            sx={{
              height: "30%",
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
            >
              <Box sx={{ width: "100px", mt: 3 }}>
                <img
                  src={barterLogo}
                  alt="img"
                  style={{
                    height: "auto",
                    width: "70px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Typography sx={login}>Add Password </Typography>
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
                label="Enter Password"
                placeholder="*******"
                variant="outlined"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
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
              <TextField
                label="Re - write password"
                placeholder="*******"
                variant="outlined"
                required
                onChange={(e) => {
                  setRePassword(e.target.value);
                }}
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
          </Box>
          <Box sx={{ display: "flex", mt: 4, width: "75%", gap: "10px" }}>
            <Button variant="outlined" fullWidth sx={previous}>
              Previous
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={loginTextButton}
              onClick={addPassword}
            >
              Add Password
            </Button>
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
          <img
            // src={newMainLogo}
            src={mainImg}
            alt="img"
            style={{ height: "auto", width: "100%", maxHeight: "100vh" }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddPassoword;

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
  lineHeight: 24,
  textAlign: "center",
  color: "#FFFFFF",
  textTransform: "none",
};

const previous = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.4rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  height: "4rem",
  borderRadius: "0.6rem",
  textAlign: "center",
  color: "rgba(55, 93, 187, 1)",
  textTransform: "none",
};
const loginTextButton = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "1.4rem",
    lg: "1.4rem",
    md: "1.4rem",
    sm: "1.2rem",
    xs: "1.2rem",
  },
  textAlign: "center",
  color: "#fff",
  textTransform: "none",
};
