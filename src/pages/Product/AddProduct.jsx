import { Grid, Typography, Box, Button, Paper } from "@mui/material";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import LeftArrow from "../../assets/arrow.svg";
import Male from "../../assets/Images/ProductCategory/Male.svg";
import Female from "../../assets/Images/ProductCategory/Female.svg";
import Baby from "../../assets/Images/ProductCategory/Baby.svg";
import React, { useState } from "react";

const AddProduct = () => {
  const [Selectone, setSelectone] = useState(false);
  const [SelectTwo, setSelectTwo] = useState(false);
  const [SelectThree, setSelectThree] = useState(false);

  const [buttonText, setButtonText] = useState("Select");
  const [buttonTextone, setButtonTextone] = useState("Select");
  const [buttonTexttwo, setButtonTexttwo] = useState("Select");

  function handleClick() {
    setSelectone(true);
    setSelectTwo(false);
    setSelectThree(false);
    setButtonText("Selected");
    setButtonTextone("Select");
    setButtonTexttwo("Select");
  }

  function handleClick1() {
    setSelectone(false);
    setSelectTwo(true);
    setSelectThree(false);
    setButtonText("Select");
    setButtonTextone("Selected");
    setButtonTexttwo("Select");
  }

  function handleClick2() {
    setSelectone(false);
    setSelectTwo(false);
    setSelectThree(true);
    setButtonText("Select");
    setButtonTextone("Select");
    setButtonTexttwo("Selected");
  }
  return (
    <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
      <BreadCrumbHeader MainText={"AddProducts"} />
      <Grid container>
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "17px",
            padding: "2rem",
            minHeight: "68vh",
            //   justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ marginBottom: "5rem" }}>
            <Box
              component="img"
              sx={{
                height: "9px",
                width: "22px",
              }}
              src={LeftArrow}
              alt="laftarrow"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                width: "100%",
                gap: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "500",
                  fontSize: "2.4rem",
                  color: "#393D5E",
                }}
              >
                Please ! Select Your Product Category
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "1.6rem",
                  color: "rgba(57, 61, 94, 0.54)",
                  paddingX: {
                    xl: "25rem",
                    lg: "25rem",
                    md: "15rem",
                    sm: "3rem",
                    xs: "3rem",
                  },
                  //   background: "red",
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Mollis vitae in sed
                tincidunt vel. Nulla arcu ipsum ornare accumsan.
              </Typography>
            </Box>
          </Box>
          <Grid
            container
            sx={{
              width: {
                xl: "60%",
                lg: "80%",
                md: "80%",
                sm: "100%",
                xs: "100%",
              },
              display: "flex",
              mx: "auto",
            }}
          >
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Box sx={card}>
                <Button
                  variant="outlined"
                  sx={{
                    ...categorybutton,
                    border: Selectone
                      ? "2px solid #3366ff "
                      : "2px solid #b3b3b3",
                    opacity: Selectone ? 1 : 0.3,
                  }}
                >
                  <img src={Male} alt="" height="30%" />
                  <Typography sx={buttontext}>Male</Typography>
                </Button>

                <Button
                  variant="contained"
                  onClick={handleClick}
                  sx={{
                    ...selectbutton,
                    background: Selectone
                      ? "rgba(68, 95, 210, 1)"
                      : "rgba(68, 95, 210, 0.07)",
                    color: Selectone ? "" : "#fff",
                  }}
                >
                  {buttonText}
                </Button>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
              <Box sx={card}>
                <Button
                  variant="outlined"
                  sx={{
                    ...categorybutton,
                    border: SelectTwo
                      ? "2px solid #3366ff"
                      : "2.5px solid #b3b3b3 ",
                    opacity: SelectTwo ? 1 : 0.3,
                  }}
                >
                  <img src={Female} alt="" height="30%" />
                  <Typography sx={buttontext}>Women</Typography>
                </Button>

                <Button
                  sx={{
                    ...selectbutton,
                    background: SelectTwo
                      ? "rgba(68, 95, 210, 1)"
                      : "rgba(68, 95, 210, 0.07)",
                    color: SelectTwo ? "" : "#fff",
                  }}
                  variant="contained"
                  onClick={handleClick1}
                >
                  {buttonTextone}
                </Button>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <Box sx={card}>
                <Button
                  variant="outlined"
                  sx={{
                    ...categorybutton,
                    border: SelectThree
                      ? "2px solid #3366ff"
                      : "2.5px solid #b3b3b3 ",
                    opacity: SelectThree ? 3 : 0.3,
                  }}
                >
                  <img src={Baby} alt="" height="30%" />
                  <Typography sx={buttontext}>Kids</Typography>
                </Button>

                <Button
                  variant="contained"
                  onClick={handleClick2}
                  sx={{
                    ...selectbutton,
                    background: SelectThree
                      ? "rgba(68, 95, 210, 1)"
                      : "rgba(68, 95, 210, 0.07)",
                    color: SelectThree ? "" : "#fff",
                  }}
                >
                  {buttonTexttwo}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddProduct;

const card = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "2rem",
  //   background: "red",
};

const categorybutton = {
  borderRadius: "14px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: {
    xl: "60%",
    lg: "50%",
    md: "55%",
    sm: "80%",
    xs: "80%",
  },
  maxWidth: "190px",
  minWidth: "190px",
  height: "190px",
  mx: "auto",
};

const buttontext = {
  color: "black",
  textTransform: "none",
  fontFamily: "Poppins",
};

const selectbutton = {
  borderRadius: "10px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "16px",
  color: "#C9C9C9",
  textTransform: "none",
  maxWidth: "190px",
  minWidth: "190px",
  width: {
    xl: "60%",
    lg: "50%",
    md: "55%",
    sm: "80%",
    xs: "80%",
  },
  "&:hover": {
    backgroundColor: "rgba(68, 95, 210, 1)",
  },
  mx: "auto",
};
