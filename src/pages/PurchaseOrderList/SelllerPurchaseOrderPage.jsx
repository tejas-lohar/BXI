import React, { useEffect } from "react";
import {
  Paper,
  Box,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Button,
  TableRow,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import StacsOfCoinIcon from "../../assets/CartPage/StacksOfCoinsIcon.svg";

import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useGetOrderSummaryByIdForBuyer } from "../../Hooks/OrderActions/useGetOrderSummaryByIdForBuyer";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";

import { useUpdatePurchaseOrder } from "../../Hooks/OrderActions/useUpdatePurchaseOrder";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";



const SelllerPurchaseOrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: purchaseOrderBySellerIdData,
    isLoading: purchaseOrderBySellerIdLoading,
    error: purchaseOrderBySellerIdError,
  } = useGetOrderSummaryByIdForBuyer(id);

  let totalPrice = 0;
  purchaseOrderBySellerIdData?.map((item) => {
    totalPrice += item.ProductId.ProductPrice;
  });

  const handleUpdatePurchaseOrder = (id, status) => {
    updatePurchaseOrderMutate(id, status);
  };

  let PaddingStyle = 1.5;

  const {
    data: loggedInUserData,
    isLoading: loggedInUserLoading,
    error: loggedInUserError,
  } = useGetLoggedInUser();

  let storeDataIds = [];
  let storeSellerId = [];
  purchaseOrderBySellerIdData?.map((item) => {
    storeDataIds.push(item._id);
    storeSellerId.push(item.SellerCompanyId);
  });

  const {
    data: updatePurchaseOrderData,
    isLoading: updatePurchaseOrderLoading,
    error: updatePurchaseOrderError,
    mutate: updatePurchaseOrderMutate,
  } = useUpdatePurchaseOrder();


  async function mutatePurchaseOrder() {
    await updatePurchaseOrderMutate({
      storeDataIds,
      status: "Accepted",
      SellerCompanyId: id,
    });
    navigate("/home/sellerordersummary");
  }

  async function mutatePurchaseOrderRejected() {
    await updatePurchaseOrderMutate({ storeDataIds, status: "Rejected" });
    navigate("/home/sellerordersummary");
  }

  return (
    <Paper
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
      }}
      elevation={0}
    >
      <BreadCrumbHeader MainText="Purchase Order" />
      <Paper
        sx={{
          bgcolor: "#fff",
          width: "92.7%",
          mx: "auto",
          borderRadius: "20px",
          p: 4,
        }}
        elevation={0}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            mb: 2,
            maxWidth: "400px",
          }}
        >
          <HiOutlineArrowNarrowLeft size={30} color="lightgray" />
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 500,
              fontSize: "18px",
              lineHeight: "36px",
              color: "#000000",
            }}
          >
            Company Name
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(2, 1fr)",
            height: "100%",
            maxHeight: "170px",
          }}
        >
          <Box
            sx={{
              height: "48px",
              background: "#445FD2",
              border: "1px solid #F5F5F5",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              pl: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "21px",

                color: "#FFFFFF",
              }}
            >
              Buyer Information
            </Typography>
          </Box>
          <Box sx={{ width: "90%", ml: 0, mr: "auto", maxWidth: "800px" }}>
            <Grid container>
              <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
                <Typography sx={BuyerInfoText}>Name:</Typography>
              </Grid>
              <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                <Typography sx={BuyerInfoTextTwo}>
                  {loggedInUserData?.data?.companyName
                    ? loggedInUserData?.data?.companyName
                    : "Company Name"}
                </Typography>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{ mt: 1 }}>
                <Typography sx={BuyerInfoText}>E-Mail:</Typography>
              </Grid>
              <Grid item xl={9} lg={9} md={9} sm={9} xs={9} sx={{ mt: 1 }}>
                <Typography sx={BuyerInfoTextTwo}>
                  {loggedInUserData?.data?.email
                    ? loggedInUserData?.data?.email
                    : "Email"}
                </Typography>
              </Grid>
              <Grid item xl={3} lg={3} md={3} sm={3} xs={3} sx={{ mt: 1 }}>
                <Typography sx={BuyerInfoText}>Shipping Address:</Typography>
              </Grid>
              <Grid item xl={9} lg={9} md={9} sm={9} xs={9} sx={{ mt: 1 }}>
                <Typography sx={BuyerInfoTextTwo}>
                  2715 Ash Dr. San Jose, South Dakota 83475
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "repeat(2, 1fr)",
            height: "100%",
            maxHeight: "170px",
            mt: 4,
          }}
        >
          <Box
            sx={{
              height: "48px",
              background: "#445FD2",
              border: "1px solid #F5F5F5",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              pl: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "21px",

                color: "#FFFFFF",
              }}
            >
              Product Information
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", ml: 0, mr: "auto" }}>
          <TableContainer sx={{ height: "100%" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      ...InfoBoxAmountText,
                      borderBottom: "none",
                      width: "10px",
                      textAlign: "center",
                    }}
                  >
                    No
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                  >
                    Product Name
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                    align="right"
                  >
                    Price Per Unit
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                    align="right"
                  >
                    GST Per Product
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                    align="right"
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                    align="right"
                  >
                    GST
                  </TableCell>
                  <TableCell
                    sx={{ ...InfoBoxAmountText, borderBottom: "none" }}
                    align="right"
                  >
                    Total Tokens
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {purchaseOrderBySellerIdData?.map((res, index) => {
                  return (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        py: 2,
                        height: "10px",
                      }}
                    >
                      <TableCell
                        sx={{
                          borderBottom: "none",
                          width: "10px",
                          textAlign: "center",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {index + 1}
                        </Typography>
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {res?.ProductId?.ProductName}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {res?.ProductId?.ProductPrice /
                            res?.ProductId?.ProductQty}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {(
                            (res?.ProductId?.ProductPrice /
                              res?.ProductId?.ProductQty) *
                            0.18
                          ).toFixed(3)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {res?.ProductId?.ProductQty}
                        </Typography>
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {(res?.ProductId?.ProductPrice * 0.18).toFixed(3)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          borderBottom: "none",
                          p: PaddingStyle,
                        }}
                      >
                        <Typography sx={SelectedItemsTetxStyle}>
                          {res?.ProductId?.ProductPrice}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}

                <TableRow sx={{ borderTop: "1px solid #EDEDED" }}>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "none" }}
                    component="th"
                    scope="row"
                  >
                    <Typography sx={SelectedItemsTetxStyle}></Typography>
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "none" }}
                    component="th"
                    scope="row"
                  >
                    <Typography sx={SelectedItemsTetxStyle}>
                      Total Amount
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "none" }}
                    align="right"
                  ></TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "none" }}
                    align="right"
                  ></TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "none" }}
                    align="right"
                  >
                    <Typography sx={SelectedItemsTetxStyle}>
                      {purchaseOrderBySellerIdData?.reduce(
                        (acc, cur) => acc + cur?.ProductId?.ProductQty,
                        0
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "none" }}
                    align="right"
                  >
                    <Typography sx={SelectedItemsTetxStyle}>
                      {purchaseOrderBySellerIdData
                        ?.reduce(
                          (acc, cur) =>
                            acc +
                            (cur?.ProductId?.ProductPrice *
                              cur?.ProductId?.ProductQty *
                              0.18) /
                              cur?.ProductId?.ProductQty,
                          0
                        )
                        .toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "none" }}
                    align="right"
                  >
                    <Typography sx={SelectedItemsTetxStyle}>
                      <Box
                        component="img"
                        src={StacsOfCoinIcon}
                        alt="icon"
                      ></Box>
                      {totalPrice
                        ? totalPrice
                        : purchaseOrderBySellerIdData?.reduce(
                            (acc, cur) => acc + cur?.ProductId?.ProductPrice,
                            0
                          )}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          sx={{
            width: "100%",
            mt: 4,
          }}
        >
          <Box
            sx={{
              maxWidth: "500px",
              mx: "auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              height: "100%",
            }}
          >
            <Button
              sx={{
                width: "100%",
                height: "40px",
                maxWidth: "200px",
                borderRadius: "6px",
                bgcolor: "#445FD2",
                textTransform: "none",
                color: "#fff",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "16px",
                color: "#FFFFFF",
              }}
              onClick={() => {
                mutatePurchaseOrder();
              }}
            >
              Approve
            </Button>
            <Button
              sx={{
                width: "100%",
                height: "40px",
                maxWidth: "200px",
                borderRadius: "6px",
                bgcolor: "#fff",
                color: "#445FD2",
                textTransform: "none",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontSize: "16px",
              }}
              onClick={() => {
                mutatePurchaseOrderRejected();
              }}
            >
              Reject
            </Button>
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
};

export default SelllerPurchaseOrderPage;

const BuyerInfoText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "right",
  color: "#000000",
};

const BuyerInfoTextTwo = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left",
  color: "#6B7A99",
  ml: 2,
};

const InfoBoxAmountText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: " #282828",
};

const SelectedItemsTetxStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "27px",

  color: "#6B7A99",
};

const FeeBoxText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "24px",
  color: "#6B7A99",
};
