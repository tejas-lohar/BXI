import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import dropdownstyle from "./DropDown.module.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCompanyDetails } from "../Hooks/Auth";
import useGetCompanyTypeData from "../Hooks/CompanyData/useGetCompanyTypeData";
import BXITokenIcon from "../assets/BXITokenIcon.png";
import draftdummy from "../assets/Images/CommonImages/draftdummy.png";
import BreadCrumbHeader from "../components/Header/BreadCrumbHeader";
import {
  AllListedProductByCompanyAction,
  ListedDraftProductsByCompanyAction,
  ListedProductsByCompanyAction,
} from "../redux/action/ProductActions/ListedProductByCompanyAction";

const MyListedProduct = () => {
  const StyledPagination = styled(Pagination)({
    "& .MuiPagination-ul li:last-child": {
      marginLeft: "16px",
    },
    "& .MuiPagination-ul li:last-child button::before": {
      content: "'Last'",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "11px",
      lineHeight: "14px",
      color: "#445FD2",
      marginRight: "8px",
    },
    "& .MuiPagination-ul li:first-child": {
      marginRight: "16px",
    },
    "& .MuiPagination-ul li:first-child button::after": {
      content: "'First'",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "11px",
      lineHeight: "14px",
      color: "#445FD2",
      marginLeft: "8px",
    },
    "& .MuiPaginationItem-icon": {
      color: "#445FD2",
      fontWeight: 800,
    },
  });

  const location = useLocation();
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [FilterTab, setFilterTab] = useState(
    location?.state?.status ? location?.state?.status : "All"
  );
  const [allListedProduct, setAllListedProduct] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [storeSubCatId, setStoreSubCatId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [initialPaginationCount, setInitialPaginationCount] = useState(null);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const { ListedProductsByCompanyData, loadingListedProduct } = useSelector(
    (state) => state.ListedProductsByCompany
  );

  const { ListedDraftProductsByCompanyData, loadingListedDraft } = useSelector(
    (state) => state.ListedDraftProductsByCompany
  );

  const { AllListedProductByCompanyData, loadingAllListedProduct } =
    useSelector((state) => state.AllListedProductByCompany);

  useEffect(() => {
    const { finalCount: allCount } = AllListedProductByCompanyData || {};
    const { finalCount: liveCount } = ListedProductsByCompanyData || {};
    const { finalCount: draftCount } = ListedDraftProductsByCompanyData || {};

    if (allCount !== undefined && FilterTab === "All") {
      setInitialPaginationCount(allCount);
    } else if (liveCount !== undefined && FilterTab === "Live") {
      setInitialPaginationCount(liveCount);
    } else if (draftCount !== undefined && FilterTab === "In Draft") {
      setInitialPaginationCount(draftCount);
    }
  }, [
    AllListedProductByCompanyData,
    ListedProductsByCompanyData,
    ListedDraftProductsByCompanyData,
    FilterTab,
  ]);

  // const { mutate: addtocart } = useProductAddToCart();
  const [loading, setLoading] = useState(true);
  const { data: CompanyData } = useGetCompanyDetails();
  const { data: CompanyTypeData } = useGetCompanyTypeData(
    CompanyData?.data?.companyType
  );

  // const { mutate: removefromwishlist } = useRemoveWishlistProduct();

  // async function handleAddToCart(id) {
  //   addtocart(id);
  // }

  // async function handleRemoveWishlist(id) {
  //   removefromwishlist(id);
  // }

  const getAllCetegory = async () => {
    await axios
      .get("/subcategory/getsubcategory")
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    dispatch(ListedProductsByCompanyAction(currentPage));
    dispatch(ListedDraftProductsByCompanyAction(currentPage));
    dispatch(AllListedProductByCompanyAction(currentPage));
    getAllCetegory();
  }, [dispatch, currentPage]);

  let FilterTabArray = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Live",
    },
    {
      id: 3,
      name: "In Draft",
    },
    {
      id: 4,
      name: "Delist",
    },
    {
      id: 5,
      name: "Credit Request",
    },
    {
      id: 6,
      name: "Pending",
    },
  ];
  const NaviGateFunction = (product) => {
    console.log("productproductproductproductproduct", product);
    if (CompanyTypeData?.data?.CompanyTypeName === "Textile") {
      if (product.ProductUploadStatus === "productinformation") {
        navigate("/home/textile/texttileproductInfo/" + product._id);
      } else if (product.ProductUploadStatus === "technicalinformation") {
        navigate("/home/textile/technicalinfo/" + product._id);
      } else if (product.ProductUploadStatus === "golive") {
        navigate("/home/textile/golive/" + product._id);
      } else if (product.ProductUploadStatus === "pendingapproval") {
        navigate("/home/allproductpreview/" + product._id);
      } else if (product.ProductUploadStatus === "Approved") {
        navigate("/home/allproductpreview/" + product._id);
      }
    } else if (CompanyTypeData?.data?.CompanyTypeName === "Office Supply") {
      if (product.ProductUploadStatus === "productinformation") {
        navigate("/home/officesupply/officesupplyproductinfo/" + product._id);
      } else if (product.ProductUploadStatus === "technicalinformation") {
        navigate("/home/officesupply/officesupplytechinfo/" + product._id);
      } else if (product.ProductUploadStatus === "golive") {
        navigate("/home/officesupply/officesupplygolive/" + product._id);
      } else if (product.ProductUploadStatus === "pendingapproval") {
        navigate("/home/allproductpreview/" + product._id);
      } else if (product.ProductUploadStatus === "Approved") {
        navigate("/home/allproductpreview/" + product._id);
      }
    } else if (CompanyTypeData?.data?.CompanyTypeName === "Lifestyle") {
      if (product.ProductUploadStatus === "productinformation") {
        navigate("/home/lifestyle/lifestyleproductinfo/" + product._id);
      } else if (product.ProductUploadStatus === "technicalinformation") {
        navigate("/home/lifestyle/lifestyletechinfo/" + product._id);
      } else if (product.ProductUploadStatus === "golive") {
        navigate("/home/lifestyle/lifestylegolive/" + product._id);
      } else if (product.ProductUploadStatus === "pendingapproval") {
        navigate("/home/allproductpreview/" + product._id);
      } else if (product.ProductUploadStatus === "Approved") {
        navigate("/home/allproductpreview/" + product._id);
      }
    } else if (CompanyTypeData?.data?.CompanyTypeName === "Electronics") {
      if (product.ProductUploadStatus === "productinformation") {
        navigate("/home/electronics/electronicsproductinfo/" + product._id);
      } else if (product.ProductUploadStatus === "technicalinformation") {
        navigate("/home/electronics/electronicstechinfo/" + product._id);
      } else if (product.ProductUploadStatus === "golive") {
        navigate("/home/electronics/electronicsgolive/" + product._id);
      } else if (product.ProductUploadStatus === "pendingapproval") {
        navigate("/home/electronicsdetail/" + product._id);
      } else if (product.ProductUploadStatus === "Approved") {
        navigate("/home/electronicsdetail/" + product._id);
      }
    } else if (CompanyTypeData?.data?.CompanyTypeName === "FMCG") {
      if (product.ProductUploadStatus === "productinformation") {
        navigate("/home/fmcg/fmcgproductinfo/" + product._id);
      } else if (product.ProductUploadStatus === "technicalinformation") {
        navigate("/home/fmcg/fmcgtechinfo/" + product._id);
      } else if (product.ProductUploadStatus === "golive") {
        navigate("/home/fmcg/fmcggolive/" + product._id);
      } else if (product.ProductUploadStatus === "pendingapproval") {
        navigate("/home/fmcgproductpreview/" + product._id);
      } else if (product.ProductUploadStatus === "Approved") {
        navigate("/home/fmcgproductpreview/" + product._id);
      }
    } else if (CompanyTypeData?.data?.CompanyTypeName === "Mobility") {
      if (product.ProductUploadStatus === "productinformation") {
        navigate("/home/mobility/mobilityproductinfo/" + product._id);
      } else if (product.ProductUploadStatus === "technicalinformation") {
        navigate("/home/mobility/mobilitytechinfo/" + product._id);
      } else if (product.ProductUploadStatus === "golive") {
        navigate("/home/mobility/mobilitygolive/" + product._id);
      } else if (product.ProductUploadStatus === "pendingapproval") {
        navigate("/home/mobilityproductpreview/" + product._id);
      } else if (product.ProductUploadStatus === "Approved") {
        navigate("/home/mobilityproductpreview/" + product._id);
      }
    } else if (CompanyTypeData?.data?.CompanyTypeName === "QSR") {
      if (product.ProductUploadStatus === "productinformation") {
        navigate("/home/restaurant/restaurantproductinfo/" + product._id);
      } else if (product.ProductUploadStatus === "technicalinformation") {
        navigate("/home/restaurant/restauranttechinfo/" + product._id);
      } else if (product.ProductUploadStatus === "golive") {
        navigate("/home/restaurant/restaurantgolive/" + product._id);
      } else if (product.ProductUploadStatus === "pendingapproval") {
        navigate("/home/electronicsdetail/" + product._id);
      } else if (product.ProductUploadStatus === "Approved") {
        navigate("/home/electronicsdetail/" + product._id);
      }
    }
  };

  const renderDropdownItems = (item) => {
    return (
      <ul className={dropdownstyle.dropdown}>
        <li
          className={dropdownstyle.dropdownsubmenu}
          onMouseEnter={(e) => {
            setStoreSubCatId(item._id);
            console.log(item._id);
          }}
        >
          {item.SubcategoryName}
          <ul className={dropdownstyle.dropdown}>
            {item.SubcategoryValue?.map((subItem) => (
              <li key={subItem.SubcategoryType}>{subItem.SubcategoryType}</li>
            ))}
          </ul>
        </li>
      </ul>
    );
  };

  const renderSelectItems = (item) => {
    return (
      <MenuItem
        onClick={(e) => {
          setStoreSubCatId(item._id);
        }}
        value={item.SubcategoryName}
        sx={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "11px",
          lineHeight: "21px",
          color: "#929EAE",
        }}
      >
        {item.SubcategoryName}
      </MenuItem>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const allProductByCompany = async () => {
    await axios
      .get(`product/get_product_bySellerCompanyId`, { withCredentials: true })
      .then((res) => {
        setAllListedProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    allProductByCompany();
  }, []);

  return (
    <Paper elevation={0} sx={{ boxShadow: "none", background: "transparent" }}>
      <BreadCrumbHeader MainText="My Products" />
      <Grid
        container
        sx={{
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          mt: "2rem",
        }}
      >
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              alignContent: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "2rem",
                maxWidth: "100%",
              }}
            >
              <Typography sx={textStyle1}>Sort By</Typography>
              <div className={dropdownstyle.parent}>
                {categoryData?.map(renderDropdownItems)}
              </div>
              <Select
                sx={{
                  width: "100%",
                  height: "35px",
                  background: "transparent",
                  maxWidth: "150px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "21px",
                  color: "#929EAE",
                }}
                defaultValue={"All"}
              >
                {categoryData?.map(renderSelectItems)}
              </Select>
              <Select
                sx={{
                  width: "100%",
                  height: "35px",
                  background: "transparent",
                  maxWidth: "150px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "11px",
                  lineHeight: "21px",
                  color: "#929EAE",
                }}
              >
                {storeSubCatId === "" ? (
                  <MenuItem>Please Select SubCategory</MenuItem>
                ) : (
                  categoryData
                    .filter((item) => item._id === storeSubCatId)[0]
                    ?.SubcategoryValue?.map((item) => {
                      return (
                        <MenuItem value={item}>{item.SubcategoryType}</MenuItem>
                      );
                    })
                )}
              </Select>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {FilterTabArray?.map((res, idx) => {
                return (
                  <Button
                    onClick={() => {
                      setFilterTab(res.name);
                      setCurrentPage(1);
                    }}
                    sx={{
                      minWidth: "90px",
                      width: "auto",
                      height: "35px",
                      background: "#FFFFFF",
                      boxShadow:
                        res?.name === FilterTab
                          ? //  ||location?.state?.status === "draft"
                            "0px 10px 20px #DCDCDD"
                          : "inset 4px 5px 4px rgba(211, 211, 211, 0.25);",
                      borderRadius: "5px",
                      fontFamily: "Outfit",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: res?.name === FilterTab ? "#445FD2" : "#6B7A99",
                      whiteSpace: "nowrap",
                      textTransform: "capitalize",
                    }}
                  >
                    {res?.name}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          mt: 2,
        }}
      >
        {FilterTab === "Live"
          ? ListedProductsByCompanyData?.products?.map((res, idx) => {
              return (
                <>
                  {loadingListedProduct === true ? (
                    <Paper
                      sx={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "80vh",
                        position: "absolute",
                        top: 300,
                        left: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        zIndex: 1000,
                      }}
                      elevation={0}
                    >
                      <div className="triple-spinner"></div>
                    </Paper>
                  ) : (
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
                            paddingTop: "0rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            NaviGateFunction(res);
                          }}
                        >
                          <Box
                            sx={{
                              width: "90%",
                              height: "auto",
                              minHeight: "200px",
                              maxHeight: "200px",
                              mx: "auto",
                              pt: 2,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={
                                res?.ProductImages[0]?.url === null ||
                                res?.ProductImages[0]?.url === undefined
                                  ? draftdummy
                                  : res?.ProductImages[0]?.url
                              }
                              alt="img"
                              width={"auto"}
                              style={{
                                maxWidth: "300px",
                                maxHeight: "200px",
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
                                // bgcolor: "red",
                                mt: 1,
                              }}
                              elevation={0}
                            >
                              <Typography sx={MainTextStyle}>
                                {res?.ProductName}
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
                                    width: "30px",
                                    height: "30px",
                                    marginRight: "0.5rem",
                                  }}
                                />
                                <Typography
                                  sx={{
                                    ...PriceTextStyle,

                                    maxWidth: "100px",
                                    fontSize: "18px",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {/* 
                             {res?.ProductsVariantions[0]?.PricePerUnit
                              ? res?.ProductsVariantions[0]?.PricePerUnit
                             : res?.ProductsVariantions[0]?.price}   */}

                                  {res?.ProductsVariantions[0]?.DiscountedPrice
                                    ? res?.ProductsVariantions[0]
                                        ?.DiscountedPrice
                                    : res?.ProductsVariantions[0]?.PricePerUnit}
                                </Typography>{" "}
                              </Box>
                            </Paper>
                            <Typography sx={BottomTextStyle}>
                              {res?.ProductDescription}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                </>
              );
            })
          : FilterTab === "All"
          ? AllListedProductByCompanyData?.products?.map((res, idx) => {
              return (
                <>
                  {loadingAllListedProduct === true ? (
                    <Paper
                      sx={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "80vh",
                        position: "absolute",
                        top: 300,
                        left: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        zIndex: 1000,
                      }}
                      elevation={0}
                    >
                      <div className="triple-spinner"></div>
                    </Paper>
                  ) : (
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
                            paddingTop: "0rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            NaviGateFunction(res);
                          }}
                        >
                          <Box
                            sx={{
                              width: "90%",
                              height: "auto",
                              minHeight: "200px",
                              maxHeight: "200px",
                              mx: "auto",
                              pt: 2,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={
                                res?.ProductImages[0]?.url === null ||
                                res?.ProductImages[0]?.url === undefined
                                  ? draftdummy
                                  : res?.ProductImages[0]?.url
                              }
                              alt="img"
                              width={"auto"}
                              style={{
                                maxWidth: "300px",
                                maxHeight: "200px",
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
                              pb: 2,
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
                                {res?.ProductName}
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
                                    width: "30px",
                                    height: "30px",
                                    marginRight: "0.5rem",
                                  }}
                                />
                                <Typography
                                  sx={{
                                    ...PriceTextStyle,

                                    maxWidth: "100px",
                                    fontSize: "18px",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {/*    {res?.ProductsVariantions[0]?.PricePerUnit
                                    ? res?.ProductsVariantions[0]?.PricePerUnit
                               : res?.ProductsVariantions[0]?.price} */}

                                  {res?.ProductsVariantions[0]?.DiscountedPrice
                                    ? res?.ProductsVariantions[0]
                                        ?.DiscountedPrice
                                    : res?.ProductsVariantions[0]?.PricePerUnit}
                                </Typography>{" "}
                              </Box>
                            </Paper>
                            <Typography sx={BottomTextStyle}>
                              {res?.ProductDescription}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                </>
              );
            })
          : FilterTab === "In Draft" || location?.state?.status === "draft"
          ? ListedDraftProductsByCompanyData?.products?.map((res, idx) => {
              return (
                <>
                  {loadingListedDraft === true ? (
                    <Paper
                      sx={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "80vh",
                        position: "absolute",
                        top: 300,
                        left: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        zIndex: 1000,
                      }}
                      elevation={0}
                    >
                      <div className="triple-spinner"></div>
                    </Paper>
                  ) : (
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
                            paddingTop: "0rem",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            NaviGateFunction(res);
                          }}
                        >
                          <Box
                            sx={{
                              width: "90%",
                              height: "auto",
                              minHeight: "200px",
                              maxHeight: "200px",
                              mx: "auto",
                              pt: 2,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={
                                res?.ProductImages[0]?.url === null ||
                                res?.ProductImages[0]?.url === undefined
                                  ? draftdummy
                                  : res?.ProductImages[0]?.url
                              }
                              alt="img"
                              width={"auto"}
                              style={{
                                maxWidth: "300px",
                                maxHeight: "200px",
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
                              pb: 2,
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
                                {res?.ProductName}
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
                                    width: "30px",
                                    height: "30px",
                                    marginRight: "0.5rem",
                                  }}
                                />
                                <Typography
                                  sx={{
                                    ...PriceTextStyle,

                                    maxWidth: "100px",
                                    fontSize: "18px",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {/*   {res?.ProductsVariantions[0]?.PricePerUnit
                                    ? res?.ProductsVariantions[0]?.PricePerUnit
                                : res?.ProductsVariantions[0]?.price} */}

                                  {res?.ProductsVariantions[0]?.DiscountedPrice
                                    ? res?.ProductsVariantions[0]
                                        ?.DiscountedPrice
                                    : res?.ProductsVariantions[0]?.PricePerUnit}
                                </Typography>{" "}
                              </Box>
                            </Paper>
                            <Typography sx={BottomTextStyle}>
                              {res?.ProductDescription}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Button
                              sx={{
                                width: "305px",
                                textTransform: "none",
                                mx: "auto",
                                color: "#6B7A99",
                                fontFamily: "Poppins",
                                fontSize: "17px",
                                fontWeight: 600,
                              }}
                              onClick={() => {
                                NaviGateFunction(res);
                              }}
                            >
                              Edit
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  )}
                </>
              );
            })
          : null}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
        <Stack spacing={2}>
          <StyledPagination
            count={initialPaginationCount}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            strokeWidth={currentPage}
          />
        </Stack>
      </Box>{" "}
    </Paper>
  );
};

export default MyListedProduct;
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
  fontWeight: 500,
  fontSize: "13px",
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

