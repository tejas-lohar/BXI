import React, { useEffect, useState } from "react";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import {
  Button,
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  FormControl,
  Radio,
  RadioGroup,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import Accordion from "@mui/material/Accordion";
import stackofcoin from "../../assets/CartPage/unnamed 1.svg";

import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import CommaSeprator from "../../components/CommaSeprator";
import Searchicon from "../../assets/Images/CommonImages/Icon.svg";
import Filter from "../../assets/Images/CommonImages/Slider.svg";
import CompanyName from "../../components/CompanyName";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DownIcon from "../../assets/Images/CommonImages/Down.png";
import stackofcoins from "../../assets/Stack of Coins.svg";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  useAddReview,
  useFetchReviews,
  useGetLoggedInUser,
} from "./OrdersInvoicesHooks";
import axios from "axios";
import OpenEaa from "../../components/openEaa";

const OrderDetails = () => {

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

  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialPaginationCount, setInitialPaginationCount] = useState(null);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [buyerCompanyInvoices, setBuyerCompanyInvoices] = React.useState([]);
  const navigate = useNavigate();

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  const {
    data: ReviewsData,
    isLoading: reviewsLoading,
    refetch: reviewsRefecth,
  } = useFetchReviews();
  const { mutate: addReview, isLoading } = useAddReview();
  const { data: LoggedinUser } = useGetLoggedInUser();

  const AddReviewClick = async (Product, ReviewRating) => {
    await addReview(
      { Product: Product, ReviewRating: ReviewRating },
      {
        onSuccess: (res) => {
          console.log("===>", res);
          reviewsRefecth();
          // handleClose();
        },
        onError: (error) => {
          console.log("===>", error);
        },
      }
    );
  };

  // console.log("===>", ReviewsData?.data?.at(0));
  const GetInvoicesOfBuyerCompany = async () => {
    return await axios
      .get(`/invoices/get_all_invoice_of_buyer_company?page=${currentPage}`)
      .then((res) => {
        console.log("res", res);
        setInitialPaginationCount(res.data.finalCount)
        setBuyerCompanyInvoices(res.data.InvoiceData);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const fetchproductbyId = async () => {
    await axios
      .get("/products/get_product_by_id")
      .then((res) => {
        console.log("===>", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    GetInvoicesOfBuyerCompany();
  }, [currentPage]);

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

  return (
    <Paper
      sx={{
        bgcolor: "transparent",
        width: "100%",
        height: "100%",
        boxShadow: "none",
      }}
      elevation={0}
    >
      <BreadCrumbHeader MainText="Order Details" />

      <Grid container>
        <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
          <TextField
            sx={{
              "& fieldset": { border: "none" },

              background: "transparent",
              width: "120%",
              maxWidth: "120%",
              // minWidth: "1100px",
              border: "1px solid #CDCDCD",
              borderRadius: "5px",
              fontSize: "14px",
            }}
            InputProps={{
              startAdornment: <img src={Searchicon} alt="serach" />,
              style: {
                marginLeft: "10px",
              },
            }}
            placeholder="Search"
          />
        </Grid>

        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
          <Button
            onClick={handleClickOpen}
            sx={{
              border: "1px solid #CDCDCD",
              borderRadius: "10px",
              color: "#CDCDCD",
              width: "200px",
              height: "63px",
              marginLeft: "243px",
              fontSize: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Box
                component="img"
                src={Filter}
                sx={{ height: "40px", width: "40px" }}
              />
              <Typography
                sx={{
                  fontSize: "20px",
                }}
              >
                Filters
              </Typography>
            </Box>
          </Button>
        </Grid>
      </Grid>

      <Dialog
        // fullWidth={fullWidth}
        // maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle
          sx={{
            color: "#323232",
            fontSize: "16px",
            fontFamily: "Poppins",
            fontWeight: 600,
          }}
        >
          Order Details
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={DialogContentTextcss}>
            Product
          </DialogContentText>

          <FormControl>
            <RadioGroup defaultValue="outlined" name="radio-buttons-group">
              <FormControlLabel
                sx={radiobuttonnnn}
                value="incoming"
                control={<Radio />}
                label="Incoming"
              />
              <FormControlLabel
                sx={radiobuttonnnn}
                value="outgoing"
                control={<Radio />}
                label="Outgoing"
              />
            </RadioGroup>
          </FormControl>

          <DialogContentText sx={DialogContentTextcss}>
            Status
          </DialogContentText>
          <FormControl>
            <RadioGroup defaultValue="outlined" name="radio-buttons-group">
              <FormControlLabel
                sx={radiobuttonnnn}
                value="all"
                label="All"
                control={<Radio />}
                variant="outlined"
              />
              <FormControlLabel
                sx={radiobuttonnnn}
                value="ontheway"
                label="On the way"
                control={<Radio />}
                variant="outlined"
              />
              <FormControlLabel
                sx={radiobuttonnnn}
                value="delivered"
                control={<Radio />}
                label="Delivered"
                variant="outlined"
              />
              <FormControlLabel
                sx={radiobuttonnnn}
                value="canceled"
                label="Canceled"
                control={<Radio />}
                variant="outlined"
              />
              <FormControlLabel
                sx={radiobuttonnnn}
                value="returned"
                label="Returned"
                control={<Radio />}
                variant="outlined"
              />
            </RadioGroup>
          </FormControl>

          <DialogContentText sx={DialogContentTextcss}>Time</DialogContentText>
          <FormControl>
            <RadioGroup defaultValue="outlined" name="radio-buttons-group">
              <FormControlLabel
                sx={radiobuttonnnn}
                value="anytime"
                label="Anytime"
                control={<Radio />}
                variant="outlined"
              />
              <FormControlLabel
                sx={radiobuttonnnn}
                value="last30days"
                label="Last 30 days"
                control={<Radio />}
                variant="outlined"
              />
              <FormControlLabel
                sx={radiobuttonnnn}
                value="last30months"
                label="Last 6 months"
                control={<Radio />}
                variant="outlined"
              />
              <FormControlLabel
                sx={radiobuttonnnn}
                value="lastyear"
                label="Last year"
                variant="outlined"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ textTransform: "none", fontSize: "10px" }}
          >
            Apply
          </Button>
          <Button
            sx={{ color: "#B5B5C3", textTransform: "none", fontSize: "10px" }}
          >
            Reset All
          </Button>
        </DialogActions>
      </Dialog>
     
      <>
        {buyerCompanyInvoices?.length > 0 &&
          buyerCompanyInvoices?.map((data, idx) => {
            let totalPrice = 0;
            data?.ProductData?.map((data) => {
              totalPrice =
                totalPrice + data.DiscountedPrice * data.ProductQuantity;
              return totalPrice;
            });
            function convertDate(inputFormat) {
              function pad(s) {
                return s < 10 ? "0" + s : s;
              }
              var d = new Date(inputFormat);
              return [
                pad(d.getDate()),
                pad(d.getMonth() + 1),
                d.getFullYear(),
              ].join("/");
            }

            return (
              <Accordion
                sx={{
                  p: 0,
                  boxShadow: "none",
                  border: "none",
                  borderBottom: "1px solid #F5F5F5",
                }}
              >
                <AccordionSummary
                  expandIcon={<img src={DownIcon} style={{ width: "9px" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{ p: 0 }}
                >
                  <Grid container>
                    <Grid
                      item
                      xl={0.5}
                      lg={0.5}
                      md={0.5}
                      sm={0.5}
                      xs={0.5}
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                      }}
                    >
                      <Typography sx={TableBodyTextStyling}>
                        {" "}
                        {idx + 1}
                      </Typography>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                      <Typography
                        sx={{
                          ...TableBodyTextStyling,
                          fontSize: "14px",
                        }}
                      >
                        <CompanyName
                          CompanyId={data.SellerCompanyId}
                          CompanyName={data?.SellerDetails?.SellerCompanyName}
                        />
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xl={1.5}
                      lg={1.5}
                      md={1.5}
                      sm={1.5}
                      xs={1.5}
                      sx={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Typography sx={TableBodyTextStyling}>
                        <CommaSeprator Price={data?.ProductData?.length} />
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xl={1.5}
                      lg={1.5}
                      md={1.5}
                      sm={1.5}
                      xs={1.5}
                      sx={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Typography
                        sx={{
                          ...TableBodyTextStyling,
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
                            width: "15px",
                            height: "auto",
                          }}
                        />
                        <CommaSeprator Price={totalPrice} />
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xl={1.5}
                      lg={1.5}
                      md={1.5}
                      sm={1.5}
                      xs={1.5}
                      sx={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      <Typography sx={TableBodyTextStyling}>
                        {convertDate(data?.PoDate)}
                      </Typography>
                    </Grid>
                   
                    <Grid
                      item
                      xl={3}
                      lg={3}
                      md={3}
                      sm={3}
                      xs={3}
                      sx={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                      {data?.SellerOrderStatus === "Pending" ? (
                        "---"
                      ) : (
                        <Box
                          onClick={() => {
                            // navigate(`/home/performainvoice/${data._id}`);
                          }}
                          sx={{
                            cursor: "pointer",
                            width: "100px",
                            mx: "auto",
                            height: "30px",
                            background: "#445FD2",
                            borderRadius: "4.39877px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              ...TableBodyTextStyling,
                              color: "#fff",
                            }}
                          >
                            View
                          </Typography>
                          <OpenEaa />

                        </Box>
                      )}
                    </Grid>
                    <Grid
                      item
                      xl={1}
                      lg={1}
                      md={1}
                      sm={1}
                      xs={1}
                      sx={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        display: "flex",
                      }}
                    >
                    
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pb: 2 }}>
                  {data?.ProductData?.length > 0 &&
                    data?.ProductData?.map((data, idx) => {
                      return (
                        <Grid
                          container
                          spacing={2}
                          sx={{
                            p: 0,
                            ml: 1,
                            width: "100%",
                            // maxWidth: "500px",
                          }}
                        >
                          <Grid
                            item
                            xl={1}
                            lg={1}
                            md={1}
                            sm={1}
                            xs={1}
                            sx={{
                              textAlign: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            <Typography sx={TableBodyTextStyling}>
                              {idx + 1}
                            </Typography>
                          </Grid>
                          <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                            <Box
                              component="img"
                              src={data?.ProductImage}
                              sx={{
                                width: "50px",
                                height: "auto",
                                mx: "auto",
                              }}
                            />
                          </Grid>
                          <Grid
                            item
                            xl={2}
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            sx={{
                              textAlign: "left",
                              alignItems: "start",
                              justifyContent: "flex-start",
                              display: "flex",
                            }}
                          >
                            <Typography
                              sx={{
                                ...TableBodyTextStyling,
                                textTransform: "capitalize",
                                //  hide text overflow
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "200px",
                              }}
                            >
                              {data?.ProductName}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xl={2}
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            sx={{
                              textAlign: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            <Typography sx={TableBodyTextStyling}>
                              <CommaSeprator Price={data?.ProductQuantity} />{" "}
                              QTY
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xl={2}
                            lg={2}
                            md={2}
                            sm={2}
                            xs={2}
                            sx={{
                              textAlign: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            <Typography
                              sx={{
                                ...TableBodyTextStyling,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "2px",
                              }}
                            >
                              <Box
                                component="img"
                                src={stackofcoins}
                                alt="coins"
                                sx={{
                                  height: "15px",
                                  width: "15px",
                                }}
                              />
                              <CommaSeprator Price={data?.DiscountedPrice} />
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xl={3}
                            lg={3}
                            md={3}
                            sm={3}
                            xs={3}
                            sx={{
                              textAlign: "center",
                              alignItems: "center",
                              justifyContent: "center",
                              // display: "flex",
                            }}
                          >
                            <Typography
                              sx={{
                                ...TableBodyTextStyling,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "2px",
                              }}
                            >
                              {/* <Box
                                component="img"
                                src={stackofcoins}
                                alt="coins"
                                sx={{
                                  height: "15px",
                                  width: "15px",
                                }}
                              />
                              <CommaSeprator Price={data?.DiscountedPrice} /> */}
                              Rate Product
                            </Typography>
                            {ReviewsData?.data?.length > 0 &&
                            ReviewsData?.data?.at(0)?.Product?._id ===
                              data?.ProductId &&
                            LoggedinUser.data.companyId ===
                              ReviewsData?.data?.at(0)?.ReviewBy._id ? (
                              <Rating
                                name="no-value"
                                value={ReviewsData.data.at(0).ReviewRating}
                                onChange={(e) => {
                                  // console.log("rating", e.target.value);
                                  // AddReviewClick(
                                  //   data.ProductId,
                                  //   e.target.value
                                  // );
                                }}
                              />
                            ) : (
                              <Rating
                                name="no-value"
                                value={null}
                                onChange={(e) => {
                                  console.log("rating", e.target.value);
                                  AddReviewClick(
                                    data?.ProductId,
                                    e.target.value
                                  );
                                }}
                              />
                            )}
                          </Grid>
                        </Grid>
                      );
                    })}
                </AccordionDetails>
              </Accordion>
            );
          })}
      </>
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
      </Box>
    </Paper>
  );
};

export default OrderDetails;

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
  marginTop: "10px",
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

const radiobuttonnnn = {
  fontSize: "12px",
  color: "#ADB8CC",
  fontFamily: "Poppins",
};

const DialogContentTextcss = {
  color: "#6B7A99",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: "bold",
  marginTop: "10px",
  marginBottom: "10px",
};
const SwitchButtonStyle = {
  borderRadius: "9px",
  boxShadow: "none",
  fontSize: "12px",
  fontWeight: "400",
  textTransform: "capitalize",
  height: "30px",
  width: "100px",
  fontFamily: "Poppins",
};

const TableBodyTextStyling = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "21px",
  color: "#1B212D",
};

const tableheading = {
  fontFamily: "Poppins",
  color: "#7E8BA6",
  fontSize: "13px",
  fontStyle: "normal",
  fontWeight: 500,
  textTransform: "Capitalize",
};
