import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography, Box, Button, Paper } from "@mui/material";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Product from "../../assets/ProductImages/transactionsproduct.svg";
import TablePagination from "@mui/material/TablePagination";
import { MdPendingActions, MdCancel } from "react-icons/md";
import { listPurchaseOrders } from "../../redux/action/PurchaseOrder_Action";
import { useDispatch } from "react-redux";
import { BsFillCheckCircleFill } from "react-icons/bs";

import CompanyName from "../../components/CompanyName";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import useGetSellerPurchaseOrderIncoice from "../../Hooks/SellerPurchaseOrder/useGetSellerPurchaseOrderIncoice";

function SellerPerformaInvoiceHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const CompanyList = [
    {
      id: 1,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
  ];

  const {
    data: orderSummerInvioce,
    isLoading: purchaseOrderLoadingSeller,
    error: purchaseOrderErrorSeller,
  } = useGetSellerPurchaseOrderIncoice();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(listPurchaseOrders());
  }, [dispatch]);

  return (
    <Paper
      sx={{
        boxShadow: "none",
        background: "transparent",
        width: "100%",
        mx: "auto",
      }}
      elevation={0}
    >
      <BreadCrumbHeader MainText={"Performa Invoice"} />
      <Grid
        container
        sx={{
          background: "#FFFFFF",
          padding: "1rem",
          borderRadius: "20px",
          minHeight: "70vh",
        }}
      >
        <Grid
          container
          sx={{
            marginTop: "2rem",
          }}
        >
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TableContainer
              sx={{
                height: "auto",
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableheading}>Company Name</TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Total Products
                    </TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Order Date
                    </TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Invoice Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderSummerInvioce &&
                    orderSummerInvioce?.map((data, idx) => {
                      console.log(data);
                      return (
                        <TableRow
                          sx={{
                            maxHeight: "100px",
                            height: "70px",
                            bgcolor: "transparent",
                          }}
                        >
                          <TableCell align="right" sx={{ textAlign: "left" }}>
                            <Box
                              sx={{
                                width: "auto",
                                display: "flex",
                                alignItems: "center",
                                alignContent: "center",
                              }}
                              gap={1}
                            >
                              <Typography sx={companyname}>
                                <CompanyName
                                  CompanyId={data?.BuyerCompanyId}
                                  CompanyName={
                                    data?.BuyerDetails?.BuyerCompanyName
                                  }
                                />
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="center">
                            <Typography sx={companyname}>
                              {data?.ProductData?.length}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography sx={companyname}>
                              {new Date(data?.createdAt).toDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              sx={{
                                width: "160px",
                                height: "40px",
                                borderRadius: "10px",
                                mx: "auto",
                                display: "flex",
                                alignItems: "center",
                                alignContent: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Typography sx={companyname}>
                                {data?.BuyerInvoiceAcceptanceStatus
                                  ? data?.BuyerInvoiceAcceptanceStatus
                                  : "Pending"}
                              </Typography>
                              {data?.BuyerInvoiceAcceptanceStatus ===
                              "Accepted" ? (
                                <BsFillCheckCircleFill
                                  size={18}
                                  fill="green"
                                  style={{
                                    marginLeft: "5px",
                                  }}
                                />
                              ) : data?.BuyerInvoiceAcceptanceStatus ===
                                "Rejected" ? (
                                <MdCancel
                                  fill="red"
                                  size={22}
                                  style={{
                                    marginLeft: "5px",
                                  }}
                                />
                              ) : (
                                <MdPendingActions
                                  fill="#fca311"
                                  size={22}
                                  style={{
                                    marginLeft: "5px",
                                  }}
                                />
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TablePagination
            className="pagination"
            component="div"
            count={CompanyList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Grid>
    </Paper>
  );
}

export default SellerPerformaInvoiceHistory;

const tableheading = {
  fontFamily: "Kumbh Sans",
  color: "#7E8BA6",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "bold",
};

const companyname = {
  fontFamily: "Kumbh Sans",
  color: "#7E8BA6",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: "700",
};

const tablename = {
  fontFamily: "Kumbh Sans",
  color: "#1B212D",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: "700",
};

const searchbox = {
  width: "100%",
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 400,
  "& fieldset": { border: "none" },
  bgcolor: "#FFF",
  border: "1px solid rgba(243, 243, 243, 1)",
  borderRadius: "5px",
};

const filterbuttons = {
  fontFamily: "Outfit",
  fontWeight: "700",
  fontSize: "1.2rem",
  background: "white",
  border: "none",
  color: "black",
  width: "89px",
  height: "35px",
  textTransform: "none",
};
