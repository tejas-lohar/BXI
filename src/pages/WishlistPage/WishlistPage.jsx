import React, { useEffect } from "react";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { Grid, Typography, Box, Paper, Button } from "@mui/material";
import BooksMarkIcon from "../../assets/WishlistPage/Bookmark.png";
import axios from "axios";
import ProductCard from "../../components/Cards/ProductCard";
import { useGetWishlistData } from "../../Hooks/ProductActions/useGetWishlistData";
import { useProductAddToCart } from "../../Hooks/ProductActions/useProductAddToCart";
import { useRemoveWishlistProduct } from "../../Hooks/ProductActions/useRemoveWishlistProduct";
import { GrFormClose } from "react-icons/gr";
import ImgOne from "../../assets/ProductImages/Imgone.png";
import { useGetCartData } from "../../Hooks/ProductActions/useGetCartData";
import BXITokenIcon from "../../assets/BXITokenIcon.png";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../assets/Images/CommonImages/GoLeft.png";
import EmptyWishlistImage from "../../assets/Images/CommonImages/EmptyWishlist.png";
import HeartIcon from "../../assets/Images/CommonImages/Heart.svg";

import { AiFillHeart } from "react-icons/ai";

const WishlistPage = () => {
  const navigate = useNavigate();
  const {
    data: wishlistData,
    isLoading: wishlistLoading,
    error: wishlistError,
    refetch: wishlistRefetch,
  } = useGetWishlistData();

  const { data: mutateRemoveWishlistData, mutate: removefromwishlist } =
    useRemoveWishlistProduct();



  async function handleRemoveWishlist(id) {
    await removefromwishlist(id);
    await wishlistRefetch();
  }

  useEffect(() => {
    wishlistRefetch();
  }, []);

  const GetProductCategory = async (id, type, listingType) => {
    if (listingType === "Voucher") {
      navigate(`/home/voucherdetail/${id._id}`);
    } else {
      await axios
        .get(`product_type/get_productType/${type}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res?.data?.CompanyTypeName === "Textile") {
            navigate(`/home/productdetail/${id._id}`);
          } else if (res?.data?.CompanyTypeName === "Hotel") {
            navigate(`/home/voucherdetail/${id._id}`);
          } else if (res?.data?.CompanyTypeName === "Mobility") {
            navigate(`/home/mobilitydetail/${id._id}`);
          } else if (res?.data?.CompanyTypeName === "Electronics") {
            navigate(`/home/electronicsdetail/${id._id}`);
          } else if (res?.data?.CompanyTypeName === "FMCG") {
            navigate(`/home/productdetail/${id._id}`);
          } else if (res?.data?.CompanyTypeName === "Office Supply") {
            navigate(`/home/productdetail/${id._id}`);
          } else if (res?.data?.CompanyTypeName === "Others") {
            navigate(`/home/productdetail/${id._id}`);
          } else if (res?.data?.CompanyTypeName === "Lifestyle") {
            navigate(`/home/productdetail/${id._id}`);
          } else if (res?.data?.CompanyTypeName === "Media") {
            navigate(`/home/mediabuying/${id._id}`);
          } else {
            navigate(`/home/productdetail/${id._id}`);
          }
        });
    }
  };

  return (
    <Paper elevation={0} sx={{ boxShadow: "none", background: "transparent" }}>
      <BreadCrumbHeader MainText="Your WishList" />

      <Grid
        container
        sx={{
          width: "99%",
          mx: "auto",
          mt: "3rem",
          height: "auto",
          background: "transparent",
          borderRadius: "20px",
        }}
      >
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/home")}
          >
            <img
              src={LeftArrow}
              alt="Icon"
              style={{
                width: "27px",
                height: "auto",
                marginLeft: "13px",
                marginTop: "11px",
              }}
            />
          </Box>
        </Grid>
        <Grid container>
          {wishlistData ? (
            wishlistData?.length > 0 ? (
              wishlistData?.map((res, idx) => {
                return (
                  <Grid
                    key={idx}
                    item
                    xl={3}
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    sx={{ marginTop: "2rem" }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        bgcolor: "transparent",
                        borderRadius: "20px",
                        maxWidth: "340px",
                        mx: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        sx={{
                          width: "98%",
                          maxWidth: "330px",
                          mx: "auto",
                          height: "auto",
                          minHeight: "320px",
                          bgcolor: "#fff",
                          borderRadius: "20px",
                          paddingTop: "0rem",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => handleRemoveWishlist(res?._id)}
                          style={{
                            width: "35px",
                            float: "right",
                            borderRadius: "0px 20px 0px 0px",
                            height: "35px",
                            cursor: "pointer",
                            border: "none",
                            background: "transparent",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <AiFillHeart color={"red"} size={"25px"} />
                        </button>
                        <Box
                          sx={{
                            width: "85%",
                            height: "auto",
                            minHeight: "180px",
                            mx: "auto",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                          }}
                          onClick={() => {
                            GetProductCategory(
                              res?.ProductId,
                              res?.ProductType,
                              res?.ProductId?.ListingType
                            );
                          }}
                        >
                          <img
                            src={res?.ProductId?.ProductImages[0]?.url}
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
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "270px",
                            mx: "auto",
                            height: "auto",
                            display: "grid",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() => {
                            GetProductCategory(
                              res?.ProductId,
                              res?.ProductType,
                              res?.ProductId?.ListingType
                            );
                          }}
                        >
                          <Paper
                            sx={{
                              width: "100%",
                              mx: "auto",
                              maxWidth: "300px",
                              height: "auto",
                              minWidth: "280px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignContent: "center",
                              mt: 1,
                            }}
                            elevation={0}
                          >
                            <Typography sx={MainTextStyle}>
                              {res?.ProductId?.ProductName}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                alignContent: "center",
                              }}
                            >
                              <img
                                src={BXITokenIcon}
                                alt="Icon"
                                style={{
                                  width: "27px",
                                  height: "27px",
                                  marginRight: "05px",
                                }}
                              />
                              <Typography
                                sx={{
                                  ...PriceTextStyle,

                                  maxWidth: "100px",
                                  fontSize: "18px",
                                  // make test hide if it is too long
                                  display: "-webkit-box",
                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {
                                  res?.ProductId?.ProductsVariantions[0]
                                    ?.PricePerUnit
                                }
                              </Typography>{" "}
                            </Box>
                          </Paper>
                          <Typography sx={BottomTextStyle}>
                            {res?.ProductId?.ProductDescription}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              alignContent: "center",
                              mt: 2,
                            }}
                          >
                            {/* <Button
                            sx={{
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
                            onClick={() => handleAddToCart(res?.ProductId)}
                          >
                            Add To Cart
                          </Button> */}
                            {/* {cartItems?.find(
                            (item) =>
                              item?.ProductId?._id === res?.ProductId?._id
                          ) ? (
                            <Button
                              sx={{
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
                              onClick={() => {
                                navigate("/home/cart");
                              }}
                            >
                              Go To cart
                            </Button>
                          ) : (
                            <Button
                              sx={{
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
                              onClick={() => handleAddToCart(res?.ProductId)}
                            >
                              Add To Cart
                            </Button>
                          )} */}
                          </Box>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                );
              })
            ) : (
              <EmptyWishlistPage />
            )
          ) : (
            <EmptyWishlistPage />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WishlistPage;

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
  fontWeight: 600,
  fontSize: { xl: "18px", lg: "18px", md: "18px", sm: "16px", xs: "16px" },
  lineHeight: "30px",
  maxWidth: "250px",
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
  fontSize: "12px",
  lineHeight: "16px",
  color: "#6B7A99",
  textAlign: "left",
  mt: 1,
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const EmptyWishlistPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "90%",
        maxWidth: "400px",
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        mt: 2,
      }}
    >
      <Box
        component="img"
        src={EmptyWishlistImage}
        sx={{
          width: "90%",
          maxWidth: "230px",
          height: "auto",
          mx: "auto",
        }}
      />
      <Typography sx={EmptyWishlistTextOne}>
        Your Wishlist is currently empty
      </Typography>
      <Typography
        sx={{ ...EmptyWishlistTextOne, fontSize: "12px", lineHeight: "18px" }}
      >
        Seems like you don’t have wishes here . Make a Wish !{" "}
      </Typography>
      <Button sx={EmptyWishlistButton} onClick={() => navigate("/home")}>
        Start Shopping
      </Button>
    </Box>
  );
};

const EmptyWishlistTextOne = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "18px",
  lineHeight: "27px",

  color: "#7E8BA6",
};

const EmptyWishlistButton = {
  width: "231.32px",
  height: "36.67px",
  background: "#445FD2",
  borderRadius: "10px",
  color: "white",
  textTransform: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "18px",
};
