import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  Button,
  Modal,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Pagination,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import SearchIcon from "../../assets/search.svg";
import FilterListIcon from "@mui/icons-material/FilterList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { useGetInvoices } from "../../Hooks/Invoices/useGetInvoices.js";
import CompanyName from "../../components/CompanyName";
import { useNavigate } from "react-router-dom";
import getAllInvoices from "../../redux/action/invoices";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { async } from "react-input-emoji";

const InvoiceTypes = [
  "Proforma",
  "Final",
  "Pickrr",
  "BXI",
  "OrderSummary",
  "MembershipInvoice",
];

const OrderTracking = () => {
  const [allOrders, setAllOrders] = React.useState([]);
  const [newStatus, setNewStatus] = React.useState("");
  const [orderId, setOrderId] = React.useState("");
  const [update, setUpdate] = React.useState(false);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const data = {
        OrderStatus: newStatus,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const link = `order/order-status/${orderId}`;

      const response = await axios.post(link, data, {
        withCredentials: true,
        headers: config.headers,
      });

      setUpdate(!update);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`/order/allorders`, {
        withCredentials: true,
      });

      setAllOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getAllOrders();
  }, [update]);

  return (
    <>
      <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <Grid container>
          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "17px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
              padding: "2rem",
            }}
            gap={2}
          >
            <TableContainer>
              <Table sx={{ minWidth: 650, "& td": { border: 0 } }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="left" sx={tablehead}>
                      PRODUCT NAME
                    </TableCell>
                    <TableCell align="left" sx={tablehead}>
                      ORDER ID
                    </TableCell>
                    <TableCell align="left" sx={tablehead}>
                      CURRENT STATUS
                    </TableCell>
                    <TableCell align="left" sx={tablehead}>
                      ACTION
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allOrders?.map((el, idx) => {
                    return (
                      <TableRow key={idx}>
                        <TableCell align="left">
                          <Box
                            sx={{ display: "flex", flexDirection: "row" }}
                            gap={2}
                          >
                            <Box>
                              <Typography
                                sx={{
                                  fontFamily: "Kumbh Sans",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  fontSize: 14,
                                  color: "#1B212D",
                                }}
                              >
                                {el?.invoiceId?.ProductData?.[0]?.ProductName}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            sx={{
                              fontFamily: "Kumbh Sans",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 14,
                              color: "#1B212D",
                            }}
                          >
                            {/* {el?.invoiceId?.OrderSummeryId} */}
                            {`Or${el?._id}`}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            sx={{
                              fontFamily: "Kumbh Sans",
                              fontStyle: "normal",
                              fontWeight: 400,
                              fontSize: 13,
                              color: "#929EAE",
                            }}
                          >
                            {el?.OrderStatus}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                Order Status
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={el?.OrderStatus}
                                label="OrderStatus"
                                onChange={(e) => {
                                  setNewStatus(e.target.value);
                                  setOrderId(el?._id);
                                  updateOrderStatus(el?._id, e.target.value);
                                }}
                              >
                                <MenuItem value="">Select an option</MenuItem>
                                <MenuItem value="Ready To Ship">
                                  Ready To Ship
                                </MenuItem>
                                <MenuItem value="Shipped">Shipped</MenuItem>
                                <MenuItem value="In Transit">
                                  In Transit
                                </MenuItem>
                                <MenuItem value="Reached Nearest hub">
                                  Reached Nearest hub
                                </MenuItem>
                                <MenuItem value="Out For delivery">
                                  Out For delivery
                                </MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                              </Select>
                            </FormControl>
                            <Typography
                              sx={{
                                fontFamily: "Kumbh Sans",
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: 14,
                                color: "#1B212D",
                              }}
                            ></Typography>
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
      </Paper>
    </>
  );
};

export default OrderTracking;

const searchbox = {
  width: {
    xl: "75%",
    lg: "70%",
    md: "65%",
    sm: "60%",
    xs: "40%",
  },
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 400,
  background: "#F8F8F8",
  borderRadius: "15px",
  "& fieldset": { border: "none" },
};

const filterbutton = {
  color: "#1B212D",
  border: "1px solid #F5F5F5",
  borderRadius: "10px",
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "1.4rem",
  textTransform: "none",
  "&:hover": {
    color: "#445FD2",
  },
};

const tablehead = {
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "1.2rem",
  color: "#929EAE",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
