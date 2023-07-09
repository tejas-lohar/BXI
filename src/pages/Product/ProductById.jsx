import React from "react";
import { useGetProductById } from "../../Hooks/GetProducts/useGetProductById";
import { Button, Grid, Typography, Box, Paper } from "@mui/material";
import ImgOne from "../../assets/ProductImages/Imgone.png";
import { useProductAddToCart } from "../../Hooks/ProductActions/useProductAddToCart";
import { GrFormClose } from "react-icons/gr";

import { removeWishlist } from "../../redux/action/Wishlist";
import { useDispatch } from "react-redux";

const ProductById = (props) => {
  const dispatch = useDispatch();
  const {
    data: productData,
    isLoading: productLoading,
    isError: productError,
  } = useGetProductById(props.productId?.ProductId);


  async function handleRemoveWishlist(id) {
    dispatch(removeWishlist(id));
  }

  //  react query to add to cart
  const { mutate: addToCart } = useProductAddToCart();

  async function handleAddToCart(id) {
    await addToCart(id);
  }

  if (productLoading) return <p>Loading...</p>;

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "transparent",
        borderRadius: "20px",
        maxWidth: "330px",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          width: "97%",
          mx: "auto",
          height: "auto",
          minHeight: "340px",
          bgcolor: "#fff",
          borderRadius: "20px",
          paddingTop: "15px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "auto",
          }}
        >
          <Button
            onClick={() => handleRemoveWishlist(props.productId?.ProductId)}
          >
            <GrFormClose />
          </Button>
        </Box>
        <Box
          sx={{
            width: "90%",
            height: "auto",
            minHeight: "180px",
            mx: "auto",
          }}
        >
          <img src={ImgOne} alt="img" width={"100%"} height={"100%"} />
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "270px",
            mx: "auto",
            height: "auto",
            display: "grid",
            justifyContent: "center",
            alignItems: "center",
            pb: 2,
          }}
        >
          <Paper
            sx={{
              width: "96%",
              mx: "auto",
              maxWidth: "270px",
              height: "auto",
              minWidth: "240px",
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
            }}
            elevation={0}
          >
            <Typography
              sx={{
                ...MainTextStyle,
                // show ... after some text
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {productData?.body?.ProductName}{" "}
            </Typography>
            <Typography sx={PriceTextStyle}>
              ${productData?.body?.ProductPrice}
            </Typography>{" "}
          </Paper>
          <Typography sx={BottomTextStyle}>
            {productData?.body?.ProductDesc}
          </Typography>

          <Button
            sx={{
              marginTop: "2rem",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "17px",
              lineHeight: "26px",
              color: "#6B7A99",
              textTransform: "none",
            }}
            onClick={() => handleAddToCart(productData?.body?._id)}
          >
            Add To Cart
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductById;

const textStyle1 = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "18px",
  lineHeight: "25px",
  color: "#6B7A99",
};

const PriceTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: { xl: "16px", lg: "16px", md: "15px", sm: "15px", xs: "15px" },
  lineHeight: "24px",
  color: "#717171",
};
const ProductNameTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "17px",
    sm: "15px",
    xs: "15px",
  },
  lineHeight: "30px",
  color: "#181C32",
};
const ProductMetaTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: {
    xl: "11px",
    lg: "11px",
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
  color: "#6B7A99",
};
const ProductPriceTextStyle = {
  fontFamily: "Lora",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "16px",
    lg: "16px",
    md: "16px",
    sm: "15px",
    xs: "15px",
  },
  lineHeight: {
    xl: "30px",
    lg: "30px",
    md: "22px",
    sm: "22px",
    xs: "22px",
  },
  color: "#6B7A99",
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

const MainTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: { xl: "18px", lg: "18px", md: "18px", sm: "16px", xs: "16px" },
  lineHeight: "30px",
  color: "#141414",
};

const BottomTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "11px",
  lineHeight: "16px",
  color: "#6B7A99",
  textAlign: "left",
  mt: 1,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
