import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Paper, Box, Button } from "@mui/material";
import WishlistIcon from "../../assets/wishlist.png";
import SharethisIcon from "../../assets/share.png";
import CartIcon from "../../assets/cart.png";
import ImgOne from "../../assets/ProductImages/Imgone.png";
import { useDispatch } from "react-redux";
import { BsCartFill } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { AiFillHeart } from "react-icons/ai";
import { useProductAddToCart } from "../../Hooks/ProductActions/useProductAddToCart";
import { useAddToWishlist } from "../../Hooks/ProductActions/useAddToWishlist";
import { useRemoveCartProduct } from "../../Hooks/ProductActions/useRemoveCartProduct";
import { useRemoveWishlistProduct } from "../../Hooks/ProductActions/useRemoveWishlistProduct";

export default function ProductCard(props) {
  let Productdata = props?.data;

  const { data: mutateCartData, mutate: addtocart } = useProductAddToCart();
  const {
    data: mutateWishlistData,
    mutate: addtowishlist,
    isLoading: wishlistMutateLoading,
    error: wishlistMutateError,
  } = useAddToWishlist();

  const { data: mutateRemoveData, mutate: removefromcart } =
    useRemoveCartProduct();

  const { data: mutateRemoveWishlistData, mutate: removefromwishlist } =
    useRemoveWishlistProduct();

  async function handleAddToCart(id) {
    addtocart(id);
  }

  async function handleRemoveCart(id) {
    removefromcart(id);
  }

  async function handleAddToWishlist(id) {
    addtowishlist(id);
  }

  async function handleRemoveWishlist(id) {
    removefromwishlist(id);
  }

  console.log("Productdata ======>", Productdata);
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
          paddingTop: props.BoxHead ? "2rem" : "0rem",
        }}
      >
        {!props.BoxHead ? (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              onClick={() => handleRemoveWishlist(props?.data._id)}
              sx={{
                ml: "auto",
                mr: 2,
                p: 0,
                bgcolor: "transparent",
              }}
            >
              <GrFormClose size={30} />
            </Button>
          </Box>
        ) : (
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              width: "100px",
              maxWidth: "200px",
              ml: "auto",
              mr: 3,
              bgcolor: "transparent",
              minHeight: "50px",
              alignItems: "center",
              height: "auto",
              justifyContent: "space-evenly",
            }}
          >
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            >
              <img src={SharethisIcon} width="18px" height={"18px"} alt="img" />
            </button>

            {props.cartData?.find(
              (item) => item?.ProductId?._id === Productdata?._id
            ) ? (
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveCart(Productdata?._id)}
              >
                <BsCartFill color={"#445FD2"} size={"15px"} />
              </button>
            ) : (
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleAddToCart(Productdata._id)}
              >
                <img src={CartIcon} width="20px" height={"20px"} alt="img" />
              </button>
            )}

            {props?.wishlist?.find(
              (item) => item?.ProductId._id === Productdata?._id
            ) ? (
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveWishlist(Productdata?._id)}
              >
                <AiFillHeart color={"red"} size={"20px"} />
              </button>
            ) : (
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                onClick={() => handleAddToWishlist(Productdata?._id)}
              >
                <img
                  src={WishlistIcon}
                  width="17px"
                  height={"17px"}
                  alt="img"
                />
              </button>
            )}
          </Paper>
        )}

        <Box
          sx={{
            width: props.BoxHead ? "80%" : "90%",
            height: "auto",
            minHeight: "180px",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              width: "85%",
              height: "auto",
              minHeight: "180px",
              mx: "auto",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <img
              src={
                Productdata?.ProductImages.length > 0
                  ? Productdata?.ProductImages[0].url
                  : null
              }
              alt="img"
              style={{
                width: "auto",
                maxWidth: "250px",
                maxHeight: "150px",
                height: "auto",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </Box>
          {/* <img
            src={
              Productdata?.ProductImages.length > 0
                ? Productdata?.ProductImages[0].url
                : null
            }
            alt="img"
            width={"100%"}
            height={"100%"}
          /> */}
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
            <Typography sx={MainTextStyle}>
              {Productdata?.ProductName}
            </Typography>
            <Typography sx={PriceTextStyle}>
              ₹{" "}
              {Productdata?.ProductsVariantions[0]?.PricePerUnit
                ? Productdata?.ProductsVariantions[0]?.PricePerUnit
                : ""}
            </Typography>{" "}
          </Paper>
          <Typography sx={BottomTextStyle}>
            {Productdata?.ProductDescription
              ? Productdata?.ProductDescription
              : ""}
          </Typography>
          {props.addCart ? (
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
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#445FD2",
                },
              }}
              onClick={() => handleAddToCart(Productdata?._id)}
            >
              Add To Cart
            </Button>
          ) : null}
        </Box>
      </Box>
    </Paper>
  );
}

const PriceTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: { xl: "16px", lg: "16px", md: "15px", sm: "15px", xs: "15px" },
  lineHeight: "24px",
  color: "#717171",
};

const MainTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: { xl: "20px", lg: "20px", md: "18px", sm: "16px", xs: "16px" },
  lineHeight: "30px",
  color: "#141414",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
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
  // show ... if text is more than 3 lines
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};
