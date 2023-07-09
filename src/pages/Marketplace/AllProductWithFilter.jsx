import { Grid, Paper, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import WishlistIcon from "../../assets/wishlist.png";
import SharethisIcon from "../../assets/share.png";
import CartIcon from "../../assets/cart.png";
import PageLoader from "../../components/LoadingButton/PageLoader";
import stackofcoin from "../../assets/CartPage/unnamed 1.svg";

import { BsCartFill } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { get_Cart_Items } from "../../redux/action/CartActions";
import { useGetWishlistData } from "../../Hooks/ProductActions/useGetWishlistData";
import { getProduct } from "../../redux/action/Home-Filter/products";
import { useProductAddToCart } from "../../Hooks/ProductActions/useProductAddToCart";
import { useAddToWishlist } from "../../Hooks/ProductActions/useAddToWishlist";
import { useRemoveCartProductByProductId } from "../../Hooks/ProductActions/useRemoveCartProduct";
import { useRemoveWishlistProductByProductId } from "../../Hooks/ProductActions/useRemoveWishlistProduct";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { useGetCartData } from "../../Hooks/ProductActions/useGetCartData";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllProductWithFilter = (props) => {
  const StyledPagination = styled(Pagination)({
    "& .MuiPagination-ul li:last-child": {
      marginLeft: "0px",
    },
    "& .MuiPagination-ul li:first-child": {
      marginRight: "0px",
    },
    "& .MuiPaginationItem-icon": {
      color: "#445FD2",
      fontWeight: 800,
    },
  });

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: mutateCartData, mutate: addtocart } = useProductAddToCart();

  const {
    data: mutateWishlistData,
    mutate: addtowishlist,
    isLoading: wishlistMutateLoading,
    error: wishlistMutateError,
  } = useAddToWishlist();

  const { data: mutateRemoveData, mutate: removefromcart } =
    useRemoveCartProductByProductId();

  const { data: mutateRemoveWishlistData, mutate: removefromwishlist } =
    useRemoveWishlistProductByProductId();

  const {
    data: wishlistData,
    isLoading: wishlistLoading,
    error: wishlistError,
    refetch: wishlistRefetch,
  } = useGetWishlistData();

  const { products, loading, error } = useSelector((state) => state.products);
  const [initialPaginationCount, setInitialPaginationCount] = useState(null);

  useEffect(() => {
    if (products && products.count !== undefined) {
      setInitialPaginationCount(products.count);
    }
  }, [products.count]);

  const {
    data: cartItems,
    isLoading: cartItemsLoading,
    error: cartItemsError,
    refetch: cartItemsRefetch,
  } = useGetCartData();

  async function handleAddToCart(id) {
    addtocart(id);
  }

  async function handleRemoveCart(id) {
    removefromcart(id);
  }

  async function handleAddToWishlist(id) {
    addtowishlist(id);
    wishlistRefetch();
  }

  async function handleRemoveWishlist(id) {
    removefromwishlist(id);
  }

  useEffect(() => {
    // dispatch(getWishlist());
    dispatch(get_Cart_Items());
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(
      getProduct("", "", "", "", "", "", "", "", "", "", "", "", currentPage)
    );
  }, [dispatch, currentPage]);

  const GetProductCategory = async (id, type) => {
    await axios
      .get(`product_type/get_productType/${type}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data?.CompanyTypeName === "Textile") {
          navigate(`/home/productdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Hotel") {
          navigate(`/home/hotelvoucheraddtocart/${id}`);
        } else if (res?.data?.CompanyTypeName === "Mobility") {
          navigate(`/home/mobilitydetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Electronics") {
          navigate(`/home/electronicsdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "FMCG") {
          navigate(`/home/productdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Office Supply") {
          navigate(`/home/productdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Others") {
          navigate(`/home/productdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Lifestyle") {
          navigate(`/home/productdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Media") {
          navigate(`/home/mediabuying/${id}`);
        } else {
          navigate(`/home/productdetail/${id}`);
        }
      });
  };

  const handlePageChange = (event, page) => {
    console.log("page", page);
    setCurrentPage(page);
    // Perform any additional logic or actions based on the new page
  };

  return (
    <Paper
      sx={{
        width: "100%",
        mx: "auto",
        background: "transparent",
        borderRadius: "5px",
        mt: 3,
        position: "relative",
      }}
      elevation={0}
    >
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "transparent",
              boxShadow: "none",
              borderRadius: "0px",
              width: "96%",
              mx: "auto",
              height: "30px",
              display: "flex",
              justifyContent: "space-between",
              my: 1,
            }}
          >
            <Typography sx={ExTextStyle}>
              {props.categoryName ? props.categoryName : "Explore"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {loading === true ? (
        <Grid container sx={{ width: "100%" }}>
          {[...Array(12)].map((e, i) => (
            <Grid
              item
              xl={3}
              lg={3}
              md={4}
              sm={6}
              xs={12}
              key={i}
              sx={{ mt: 3, display: "flex", flexDirection: "row" }}
            >
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  maxWidth: "330px",
                  mx: "auto",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width={330}
                  height={330}
                  sx={{
                    borderRadius: "20px",
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : products?.products?.length > 0 ? (
        <Grid container spacing={3}>
          {products?.products?.map((res, idx) => {
            return (
              <Grid
                item
                xl={3}
                lg={3}
                md={4}
                sm={6}
                xs={12}
                sx={{ mt: 3 }}
                key={idx}
              >
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
                      width: "100%",
                      mx: "auto",
                      height: "auto",
                      minHeight: "340px",
                      bgcolor: "#fff",
                      borderRadius: "20px",
                      paddingTop: "1rem",
                    }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        display: "flex",
                        width: "60px",
                        maxWidth: "60px",
                        ml: "auto",
                        mr: 2,
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
                        <img
                          src={SharethisIcon}
                          width="18px"
                          height={"18px"}
                          alt="img"
                        />
                      </button>

                      {wishlistData &&
                      wishlistData?.find(
                        (item) => item?.ProductId?._id === res?._id
                      ) ? (
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveWishlist(res?._id)}
                        >
                          <AiFillHeart color={"red"} size={"17px"} />
                        </button>
                      ) : (
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() => handleAddToWishlist(res?._id)}
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
                      onClick={() => {
                        GetProductCategory(res?._id, res?.ProductType);
                      }}
                    >
                      <img
                        src={
                          res?.ProductImages.length > 0
                            ? res?.ProductImages[0].url
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
                    <Box
                      sx={{
                        width: "100%",
                        mx: "auto",
                        height: "auto",
                        display: "grid",
                        justifyContent: "center",
                        alignItems: "center",
                        pb: 2,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        GetProductCategory(res?._id, res?.ProductType);
                      }}
                    >
                      <Paper
                        sx={{
                          width: "90%",
                          mx: "auto",
                          height: "auto",
                          minWidth: "275px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignContent: "center",
                        }}
                        elevation={0}
                      >
                        <Typography
                          sx={{
                            ...MainTextStyle,
                            display: "-webkit-box",
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {res?.ProductName}
                        </Typography>
                        <Typography
                          sx={{
                            ...PriceTextStyle,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <img
                            src={stackofcoin}
                            alt="rupieicon"
                            style={{
                              width: "20px",
                              height: "auto",
                            }}
                          />
                          {res?.ProductsVariantions[0]?.PricePerUnit
                            ? res?.ProductsVariantions[0]?.PricePerUnit
                            : ""}
                        </Typography>{" "}
                      </Paper>
                      <Paper
                        sx={{
                          width: "100%",
                          height: "auto",
                          minWidth: "275px",
                          maxWidth: "275px",
                        }}
                        elevation={0}
                      >
                        <Typography sx={BottomTextStyle}>
                          {res?.ProductDescription
                            ? res?.ProductDescription
                            : ""}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <PageLoader />
      )}
      :
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <StyledPagination
            count={initialPaginationCount}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
            strokeWidth={currentPage}
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default AllProductWithFilter;

const BoxHead = () => {
  return (
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
        <img src={SharethisIcon} width="18px" height={"18px"} />
      </button>
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      >
        <img src={CartIcon} width="20px" height={"20px"} />
      </button>
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
      >
        <img src={WishlistIcon} width="17px" height={"17px"} />
      </button>
    </Paper>
  );
};

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
  fontSize: { xl: "17px", lg: "17px", md: "16px", sm: "16px", xs: "16px" },
  lineHeight: "30px",
  color: "#141414",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  maxWidth: "160px",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const BottomTextStyle = {
  width: "90%",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "18px",
  color: "#6B7A99",
  textAlign: "left",
  mt: 1,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const ExTextStyle = {
  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "30px",
  lineHeight: "38px",
  color: "#6B7A99",
};
