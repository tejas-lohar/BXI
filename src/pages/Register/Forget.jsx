import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForgetPassEmailSubmit } from "../../Hooks/Auth";
import barterLogo from "../../assets/BXI_LOGO.png";
import mainImg from "../../assets/Images/register/forgetimg.svg";

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

const Forget = () => {
  // const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const navigate = useNavigate();

  // const { mutate } = useForget();
  const { mutate: mutateForgetPassEmailSubmit } = useForgetPassEmailSubmit();

  const addForgetPassword = () => {
    // const data = { userId };
    // navigate("/forgetpasswordotp");
    mutateForgetPassEmailSubmit(
      { email: userEmail },
      {
        onSuccess: (data) => {
          // console.log(data);
          navigate("/forgetpasswordotp", {
            state: { email: userEmail },
          });
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
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
      {/* <Stepper /> */}
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
            marginTop: "-25rem",
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
          <Typography sx={login}>Forgot Password</Typography>
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
              <Box
                sx={{
                  width: "88%",
                  height: "auto",
                  borderRadius: "12px",
                  border: "1px #CCCCCC",
                  marginTop: "03px",
                  position: "relative",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  bgcolor: "transparent",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: "10%",
                    top: "-20%",
                    bgcolor: "#fff",
                    px: 1,
                    fontSize: {
                      xl: "14px",
                      lg: "14px",
                      md: "12px",
                      sm: "12px",
                      xs: "12px",
                    },
                  }}
                >
                  <label
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,

                      color: "#6B7A99",
                    }}
                  >
                    Email Address
                  </label>
                </Box>
                <input
                  type={"text"}
                  placeholder="bxi@bxi.com"
                  style={{
                    mt: 2,
                    width: "97%",
                    height: "58px",
                    borderRadius: "14px",
                    padding: "0 1rem",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    // required: "true",
                    fontWeight: 400,
                    border: "1px solid #CCCCCC",
                    textAlign: "left",
                    color: "#6B7A99",
                  }}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Box>
            </ThemeProvider>

            <Grid
              container
              mt={3}
              sx={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "space-between",
              }}
            >
              {/* <Grid item xl={5} lg={5} md={5} sm={12} xs={12}>
                <Button
                  onClick={navigate("/")}
                  variant="outlined"
                  fullWidth
                  sx={{
                    // width: "90%",
                    height: "40px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Poppins",
                    borderRadius: "6px",
                    border: "1px solid #375DBB",
                  }}
                >
                  Previous
                </Button>
              </Grid> */}

              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "  #375DBB",
                    // width: "90%",
                    height: "40px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Poppins",
                    borderRadius: "6px",
                  }}
                  onClick={addForgetPassword}
                >
                  Forgot Password
                </Button>
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

export default Forget;

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
