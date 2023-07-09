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
import { listPurchaseOrders } from "../../redux/action/PurchaseOrder_Action";
import { useDispatch } from "react-redux";
import CompanyName from "../../components/CompanyName";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { notifications } from "../../redux/action/Notification/notification";
import addItemCartIcon from "../../assets/CartPage/addItemIcon.svg";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { MdPendingActions, MdCancel } from "react-icons/md";
import { set } from "react-hook-form";

function BuyerOrderSummaryHistory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ordersumdata, setOrdersumdata] = useState();
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [SelectAll, setSelectAll] = React.useState();

  async function GetOrderSummerAfterBuyerAccept() {
    await axios
      .get("purchase/get_order_summary_after_buyer_accept", {
        withCredentials: true,
      })
      .then((res) => {
        setOrdersumdata(res.data);
      })
      .catch((err) => {});
  }

  const SelectAllDataFun = () => {
    let data = [];
    for (let i = 0; i < ordersumdata?.length; i++) {
      for (let j = 0; j < ordersumdata[i].ProductData.length; j++) {
        if (ordersumdata[i].SellerOrderStatus === "Accepted") {
          data.push(ordersumdata[i]._id);
        }
      }
    }
    setSelectAll(data);
  };

  const RemoveAllSelected = () => {
    setSelectAll([]);
  };

  function removeData(params) {
    const orderData = SelectAll.find((el) => el === params);
    if (orderData) {
      const newOrder = SelectAll.filter((el) => el !== params);
      setSelectAll(newOrder);
    } else {
      console.log("not exist");
    }
  }

  useEffect(() => {
    GetOrderSummerAfterBuyerAccept();
  }, []);

  useEffect(() => {
    if (ordersumdata) {
      // let arrayOrder = Object.entries(ordersumdata);
      // let lastOrderindex = arrayOrder[arrayOrder?.length - 1];
      // let sellerId = lastOrderindex[1]?.SellerDetails?.SellerCompanyId;
      // let buyerId = lastOrderindex[1]?.BuyerDetails?.BuyerCompanyId;
      let message = `New Order Has been Received from ${ordersumdata?.BuyerDetails?.BuyerCompanyName}`;
      let type = "info";

      dispatch(
        notifications(
          ordersumdata?.SellerDetails?.SellerCompanyId,
          ordersumdata?.BuyerDetails?.BuyerCompanyId,
          message,
          type
        )
      );
    }
  }, [ordersumdata]);

  async function storeData(params) {
    if (SelectAll?.length > 0) {
      setSelectAll([...SelectAll, params._id]);
    } else {
      setSelectAll([params._id]);
    }
  }

  function removeData(params) {
    const orderData = SelectAll.find((el) => el === params);
    if (orderData) {
      const newOrder = SelectAll.filter((el) => el !== params);
      setSelectAll(newOrder);
    } else {
      console.log("not exist");
    }
  }

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function BuyerAcceptOrder(Status) {
    if (SelectAll?.length > 0) {
      await axios
        .put(
          "invoices/update_multiple_invoice",
          {
            OrderId: SelectAll,
            Status: Status,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          GetOrderSummerAfterBuyerAccept();
          RemoveAllSelected();
        })
        .catch((err) => {});
    }
  }

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
      <BreadCrumbHeader MainText={"Buyer Order History"} />
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
                    <TableCell sx={tableheading}>No</TableCell>
                    <TableCell sx={tableheading}>Company Name</TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Total Products
                    </TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Order Date
                    </TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Seller Status
                    </TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Action
                    </TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Select to Approve
                      {SelectAll?.length === ordersumdata?.length ? (
                        <Box
                          onClick={RemoveAllSelected}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          {/* <BiCheckboxChecked size={35}  style={{color : "#445FD2"}}  /> */}
                          <img src={addItemCartIcon} size={30} />
                        </Box>
                      ) : (
                        <Box
                          onClick={SelectAllDataFun}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <BiCheckbox size={30} />
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersumdata?.map((data, idx) => {
                    return (
                      <TableRow
                        key={idx}
                        sx={{
                          height: "50px",
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
                            <Typography sx={companyname}>{idx + 1}</Typography>
                          </Box>
                        </TableCell>
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
                                CompanyName={
                                  data?.SellerDetails?.SellerCompanyName
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
                              {data?.SellerOrderStatus
                                ? data?.SellerOrderStatus
                                : "Pending"}
                            </Typography>
                            {data?.SellerOrderStatus === "Accepted" ? (
                              <BsFillCheckCircleFill
                                size={18}
                                fill="green"
                                style={{
                                  marginLeft: "5px",
                                }}
                              />
                            ) : data?.SellerOrderStatus === "Rejected" ? (
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
                        <TableCell align="center">
                          {data?.SellerOrderStatus === "Pending" ||
                          data?.SellerOrderStatus === "Rejected" ? null : (
                            <Button
                              variant="contained"
                              sx={{
                                color: "#ff",
                                borderRadius: "5px",
                                width: "100%",
                                maxWidth: "100px",
                                height: "100%",
                                "&:hover": {
                                  backgroundColor: "navyblue",
                                },
                              }}
                              onClick={() => {
                                navigate(`/home/performainvoice/${data._id}`);
                              }}
                            >
                              View Invoice
                            </Button>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {data?.SellerOrderStatus === "Pending" ? null : (
                            <>
                              {SelectAll?.includes(data?._id) ? (
                                <Box
                                  onClick={() => removeData(data?._id)}
                                  sx={{
                                    cursor: "pointer",
                                  }}
                                >
                                  <img src={addItemCartIcon} size={30} />
                                </Box>
                              ) : (
                                <Box
                                  onClick={() => {
                                    storeData(data);
                                  }}
                                  sx={{
                                    cursor: "pointer",
                                  }}
                                >
                                  <BiCheckbox size={30} />
                                </Box>
                              )}
                            </>
                          )}
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
            mt: 2,
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            maxWidth: "250px",
            mx: "auto",
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: "100px",
              height: "40px",
              textTransform: "capitalize",
              fontSize: "14px",
            }}
            onClick={() => BuyerAcceptOrder("Accepted")}
          >
            Accept
          </Button>
          <Button
            sx={{
              width: "100px",
              height: "40px",
              fontSize: "14px",
              textTransform: "capitalize",
            }}
            onClick={() => BuyerAcceptOrder("Rejected")}
          >
            Reject
          </Button>
        </Box>

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

export default BuyerOrderSummaryHistory;

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
