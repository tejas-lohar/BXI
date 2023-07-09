import { Box, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import RightArrow from "../../assets/RightArrow.png";
import SharethisIcon from "../../assets/share.png";
import WishlistIcon from "../../assets/wishlist.png";

import { useDispatch, useSelector } from "react-redux";
import { useGetWishlistData } from "../../Hooks/ProductActions/useGetWishlistData";
import { get_Cart_Items } from "../../redux/action/CartActions";
import { getProduct } from "../../redux/action/Home-Filter/products";
import { allNotification } from "../../redux/action/Notification/getNotifications";
import { getProductFilter } from "../../redux/action/products";

import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import { useState } from "react";
import { toast } from "react-toastify";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";
import { useAddToWishlist } from "../../Hooks/ProductActions/useAddToWishlist";
import { useRemoveWishlistProductByProductId } from "../../Hooks/ProductActions/useRemoveWishlistProduct";
import StacsOfCoinIcon from "../../assets/BXITokenIcon.png";
import CommaSeprator from "../../components/CommaSeprator";
import { getLoggedCompanyDetails } from "../../redux/action/Company/LoggedInCompanyAction";
import { ProductAnalysisUpdate } from "../../redux/action/Products/ProductAnalysis";
import { socket } from "../Message/Message";

const ProductList = () => {
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
  const [limit, setLimit] = useState(48);
  // const [productViewId, setProductViewId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: loggedInUserData } = useGetLoggedInUser();

  const {
    data: mutateWishlistData,
    mutate: addtowishlist,
    isLoading: wishlistMutateLoading,
    error: wishlistMutateError,
  } = useAddToWishlist();

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

  async function handleAddToWishlist(id, ProductType) {
    axios
      .post(
        "wishlist/add_to_wishlist",
        { id: id, ProductType: ProductType },
        { withCredentials: true }
      )
      .then((res) => {
        wishlistRefetch();
      });
  }

  useEffect(() => {
    wishlistRefetch();
    dispatch(get_Cart_Items());
  }, [wishlistRefetch, mutateWishlistData, mutateRemoveWishlistData]);

  async function handleRemoveWishlist(id) {
    removefromwishlist(id);
  }

  useEffect(() => {
    dispatch(
      getProduct("", "", "", "", "", "", "", "", "", "", "", "", currentPage)
    );
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getLoggedCompanyDetails());
    dispatch(getProductFilter());
  }, [dispatch, handleRemoveWishlist, handleAddToWishlist]);

  const GetProductCategory = async (name, id, type, listingType) => {
    dispatch(ProductAnalysisUpdate(id, "ProductViewCount"));

    if (listingType === "Voucher") {
      navigate(`/home/voucherdetail/${id}`);
    } else if (listingType === "Media") {
      navigate(`/home/mediabuying/${id}`, {
        state: { type: "Media" },
      });
    } else if (listingType === "Product") {
      navigate(`/home/productdetail/${id}`);
    } else {
      navigate(`/home/productdetail/${id}`);
    }
  };

  const GetProductShareLink = async (id, type) => {
    await axios
      .get(`product_type/get_productType/${type}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data?.CompanyTypeName) {
          navigator.clipboard.writeText(
            `https://www.testing-bxi.unada.in/home/productdetail` + `/${id}`
          );
          toast.info("Url Copied", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
  };

  let login_User = loggedInUserData?.data?._id;
  useEffect(() => {
    if (login_User !== null) {
      dispatch(allNotification(login_User));
    }
  }, [login_User]);

  let socketId = socket.id;
  useEffect(() => {
    if (socketId !== undefined && login_User !== undefined) {
      socket.emit("newUser", { login_User, socketId });
    }
  });

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        mx: "auto",
        background: "transparent",
        borderRadius: "5px",
        mt: 2,
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
            <Typography sx={ExTextStyle}>Explore</Typography>
            <Link
              to={"/home/product"}
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "space-between",
                width: "100px",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={ViewAllTextStyle}>View All</Typography>
              <img src={RightArrow} width={"30px"} alt="img" />
            </Link>
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ width: "100%" }}>
        {loading === true
          ? [...Array(12)].map((e, i) => (
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
            ))
          : products?.products &&
            products?.products?.length > 0 &&
            products?.products?.map((res, idx) => {
              // console.log("products", res);
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
                      // mx: "auto",
                      mx: {
                        xl: 1,
                        lg: 1,
                        md: 1,
                        sm: 1,
                        xs: "auto",
                      },
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
                          onClick={() =>
                            GetProductShareLink(res?._id, res?.ProductType)
                          }
                        >
                          <img
                            src={SharethisIcon}
                            width="18px"
                            height="18px"
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
                            onClick={() =>
                              handleAddToWishlist(res?._id, res?.ProductType)
                            }
                          >
                            <img
                              src={WishlistIcon}
                              width="17px"
                              height="17px"
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
                          GetProductCategory(
                            res?.ProductCategoryName,
                            res?._id,
                            res?.ProductType,
                            res?.ListingType
                          );
                        }}
                      >
                        <img
                          src={
                            res?.ProductImages.length > 0
                              ? res?.ProductImages[0].url
                              : res?.files?.at(0) // Updated code to check if res.files exists and get the first element's URL
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
                          GetProductCategory(
                            res?.ProductCategoryName,
                            res?._id,
                            res?.ProductType,
                            res?.ListingType
                          );
                        }}
                      >
                        <Paper
                          sx={{
                            width: "80%",
                            mx: "auto",
                            height: "auto",
                            minWidth: "240px",
                            maxWidth: "275px",
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
                              gap: "5px",
                              alignItems: "center",
                              alignContent: "center",
                            }}
                          >
                            <img
                              src={StacsOfCoinIcon}
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                              alt="coin"
                            />
                            <CommaSeprator
                              Price={
                                res?.ProductsVariantions[0]?.DiscountedPrice
                                  ? res?.ProductsVariantions[0]?.DiscountedPrice
                                  : res?.mediaVariation?.price
                                  ? res?.mediaVariation?.price
                                  : 0
                              }
                            />
                          </Typography>{" "}
                        </Paper>
                        <Paper
                          sx={{
                            width: "80%",
                            height: "auto",
                            mx: "auto",
                            minWidth: "240px",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: {
            xl: "100%",
            lg: "100%",
            md: "100%",
            sm: "100%",
            xs: "100%",
          },
          mx: "auto",
        }}
        mt={2}
      >
        <Stack>
          <StyledPagination
            size="small"
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

export default ProductList;

const PriceTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: { xl: "15px", lg: "15px", md: "15px", sm: "15px", xs: "15px" },
  lineHeight: "24px",
  color: "#717171",
};

const MainTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: { xl: "18px", lg: "18px", md: "16px", sm: "14px", xs: "14px" },
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
  fontSize: {
    xl: "12px",
    lg: "12px",
    md: "10px",
    sm: "8px",
    xs: "8px",
  },
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

const ViewAllTextStyle = {
  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "17px",
  lineHeight: "21px",

  color: "#1976d2",
};

// company name product name random value
