import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import mainImg from "../../assets/Images/register/newMainLogo.svg";
import { createTheme, ThemeProvider, makeStyles } from "@mui/material/styles";
import BarterHeader from "../../components/BarterHeader";
import Stepper from "../../components/Stepper";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useGetListCompany, useCompanyStepDetails } from "../../Hooks/Auth";

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
const ROC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [companyName, setCompanyName] = useState();
  const { mutate, isLoading: gstLoading } = useCompanyStepDetails();
  const { data, isLoading } = useGetListCompany(id);

  const updateCompanyName = () => {
    if (!companyName || companyName === "") {
      return;
    }

    //
    const data = { companyName, id };
    mutate(data, {
      onSuccess: (Response) => {
        navigate("/gst/" + id);
      },
      onError: (err) => {},
    });
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
      <Stepper />
      <Grid
        container
        sx={{
          background: "#fff",
          height: "100vh",
          width: "100.5%",
        }}
      >
        {isLoading || gstLoading ? (
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
            }}
          >
            <CircularProgress />
          </Grid>
        ) : (
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
            }}
          >
            <Typography sx={accountText}>
              Select Your Registered company Name
            </Typography>

            {!data?.data &&
              typeof data?.data?.result?.companiesList === "undefined" && (
                <Typography>No Match Found For Your Company</Typography>
              )}
            {/*  */}
            {data?.data?.result?.companiesList && (
              <Box
                sx={{
                  width: "90%",
                  maxWidth: "450px",
                  height: "auto",
                  borderRadius: "12px",
                  border: "1px #CCCCCC",
                  marginTop: "10px",
                  position: "relative",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  bgcolor: "transparent",
                  mt: 5,
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
                    Company Type
                  </label>
                </Box>

                <select
                  type="text"
                  style={{
                    mt: 2,
                    width: "100%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    height: "5rem",
                    borderRadius: "12px",
                    padding: "0 1rem",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    border: "1px solid #CCCCCC",
                    textAlign: "left",
                    color: "#6B7A99",
                  }}
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                >
                  <option></option>
                  {data?.data?.result?.companiesList?.map((e) => {
                    return (
                      <option value={e.companyName} key={e.companyName}>
                        {e.companyName}
                      </option>
                    );
                  })}
                </select>
              </Box>
            )}

            {/*  */}
            <Box sx={{ display: "flex", gap: "4rem" }}>
              <Button
                disabled={
                  typeof data?.data?.result?.companiesList === "undefined"
                }
                onClick={() => {
                  updateCompanyName();
                }}
                sx={ButtonStyle}
              >
                Continue
              </Button>
              <Button
                onClick={() => {
                  navigate("/gst/" + id);
                }}
                sx={ButtonStyle}
              >
                Continue With Default Name
              </Button>
            </Box>
          </Grid>
        )}

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

export default ROC;

const CustomDropdown = () => {
  return <></>;
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
  fontWeight: 600,
  fontSize: { xl: "20px", lg: "18px", md: "17px", sm: "16px", xs: "15px" },
  lineHeight: "30px",

  textAlign: "center",

  color: "#6B7A99",
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
const ButtonStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "13px",
    lg: "11px",
    md: "9px",
    sm: "8px",
    xs: "7px",
  },
  // lineHeight: "30px",
  background: "#E0F0FF",
  color: "#445FD2",
  borderRadius: "10px",
  textTransform: "none",
  padding: {
    xl: "1.8rem 4rem",
    lg: "1.8rem 3rem",
    md: "1rem 3rem",
    sm: "1rem 3rem",
    xs: "1rem 3rem",
  },
  mt: "4rem",
};
