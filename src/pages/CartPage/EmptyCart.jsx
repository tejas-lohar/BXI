import React from "react";
import { Button, Grid, Paper, Typography, Box } from "@mui/material";
import emptycarticon from "../../assets/CartPage/emptycartimage.svg";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{
        bgcolor: "transparent",
        borderRadius: "0px",
        boxShadow: "none",
        width: "100%",
      }}
      elevation={0}
    >
      <Grid
        container
        sx={{
          background: "#FFFFFF",
          padding: "2.5rem",
          borderRadius: "20px",
          marginTop: "2%",
          minHeight: "70vh",
          position: "relative",
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "35px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={emptycarticon}
              alt="cartimage"
              style={{ width: "94%", height: "94%" }}
            />

            <Typography sx={Typoone}>Your cart is currently empty</Typography>
          </Box>
<Typography sx={Typotwo}>
            Before proceed to checkout , you must add some products to your
            cart, you will find a lot of interesting products on our marketplace
          </Typography>

          <Button
            variant="contained"
            sx={Returnbutton}
            onClick={() => {
              navigate("/home");
            }}
          >
            Return to Marketplace
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EmptyCart;

const Typoone = {
  FontFamily: "Poppins",
  fontSize: "20px",
  color: " #7E8BA6",
  lineHeight: "27px",
  fontWeight: "bold",
  marginTop: "20px",
};

const Typotwo = {
  color: " #7E8BA6",
  fontSize: "12px",
  FontFamily: "Poppins",
  lineheight: "18px",
  height: "36px",
  width: "40%",
  mx: "auto",
  textAlign: "center",
};

const Returnbutton = {
  textTransform: "none",
  background: "#445FD2",
  color: "white",
  top: " 30.98px",
  fontSize: "12px",
  borderRadius: " 10px",
  FontFamily: "Poppins",
  width: " 231.32px",
  height: "36.67px",
};