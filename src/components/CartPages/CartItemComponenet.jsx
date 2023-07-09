import React from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "../../assets/WishlistPage/ShoppingCart.svg";
import TrashCanIcon from "../../assets/WishlistPage/TrashCanicon.svg";
const CartItemComponenet = (props) => {
  return (
    <Grid
      container
      sx={{
        background: "#FFFFFF",
        border: "1px solid #EDEFF2",
        borderRadius: "20px",
        marginBottom: "2rem",
        padding: {
          xl: "0rem",
          lg: "0rem",
          md: " 0rem ",
          sm: " 0rem",
          xs: "2rem",
        },
      }}
    >
      <Grid
        item
        xl={1.5}
        lg={1.5}
        md={2}
        sm={2}
        xs={12}
        sx={{
          textAlign: {
            xl: "start",
            lg: "start",
            md: "start",
            sm: "start",
            xs: "center",
          },
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={props.Imgsrc}
          sx={{
            borderRadius: "20px",
            height: "auto",
            width: "100%",
            maxHeight: "200px",
            maxWidth: "200px",
          }}
        ></Box>
        {/* <img /> */}
      </Grid>
      <Grid
        item
        xl={8}
        lg={8}
        md={7}
        sm={6.5}
        xs={12}
        sx={{
          paddingLeft: {
            xl: "2rem",
            lg: "2rem",
            md: "2rem",
            sm: "2rem",
            xs: "0",
          },
          display: "flex",
          alignItems: {
            xl: "start",
            lg: "start",
            md: "start",
            sm: "start",
            xs: "center",
          },
          justifyContent: "center",
          flexDirection: "column",
          gap: {
            xl: "1rem",
            lg: "0.8rem",
            md: "0.3rem",
            sm: "0rem",
            xs: "0rem",
          },
          marginTop: {
            xl: "0rem",
            lg: "0rem",
            md: "0rem",
            sm: "0rem",
            xs: "2rem",
          },
          marginBottom: {
            xl: "0rem",
            lg: "0rem",
            md: "0rem",
            sm: "0rem",
            xs: "2rem",
          },
        }}
      >
        <Typography sx={ProductNameTextStyle}>{props.ProductName}</Typography>
        <Typography sx={ProductMetaTextStyle}>{props.ProductDesc}</Typography>
        <Typography sx={ProductPriceTextStyle}>{props.ProductPrice}</Typography>
      </Grid>
      {props.wishlist ? (
        <>
          <Grid
            item
            xl={1.5}
            lg={1.5}
            md={2}
            sm={2.5}
            xs={6}
            sx={{
              // background: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xl: "end",
                lg: "end",
                md: "end",
                sm: "end",
                xs: "center",
              },
            }}
          >
            {/* <Button sx={ButtonStyle}>Place Or</Button> */}
            <img
              src={ShoppingCartIcon}
              alt="icon"
              style={{ cursor: "pointer" }}
            />
          </Grid>
          <Grid
            item
            xl={1}
            lg={1}
            md={1}
            sm={1}
            xs={6}
            sx={{
              // background: "yellow",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <CloseIcon sx={{ cursor: "pointer" }} /> */}
            <img src={TrashCanIcon} alt="icon" style={{ cursor: "pointer" }} />
          </Grid>
        </>
      ) : (
        <>
          <Grid
            item
            xl={1.5}
            lg={1.5}
            md={2}
            sm={2.5}
            xs={6}
            sx={{
              // background: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: {
                xl: "end",
                lg: "end",
                md: "end",
                sm: "end",
                xs: "center",
              },
            }}
          >
            <Button sx={ButtonStyle}>Place Order</Button>
          </Grid>
          <Grid
            item
            xl={1}
            lg={1}
            md={1}
            sm={1}
            xs={6}
            sx={{
              // background: "yellow",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloseIcon sx={{ cursor: "pointer" }} />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CartItemComponenet;
const ProductNameTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "20px",
    lg: "20px",
    md: "17px",
    sm: "13px",
    xs: "13px",
  },
  // lineHeight: "30px",
  color: "#6B7A99",
};
const ProductMetaTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: {
    xl: "12px",
    lg: "12px",
    md: "11px",
    sm: "9px",
    xs: "9px",
  },
  lineHeight: {
    xl: "18px",
    lg: "18px",
    md: "15px",
    sm: "14px",
    xs: "14px",
  },
  color: "#858585",
};
const ProductPriceTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "22px",
    lg: "22px",
    md: "20px",
    sm: "15px",
    xs: "15px",
  },
  lineHeight: {
    xl: "21px",
    lg: "21px",
    md: "19px",
    sm: "18px",
    xs: "17px",
  },
  color: "#B5B5C3",
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
};
