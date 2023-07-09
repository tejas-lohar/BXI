import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Paper,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
const SellerOrders = () => {
  const [sellerOrders, setSellerOrders] = useState([]);
  const fetchSeller = async () => {
    await axios
      .get("order/get_orders")
      .then((res) => {
        console.log(res);
        setSellerOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchSeller();
  }, []);
  return (
    <Paper elevation={0}>
      <h2> Orders </h2>
      <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">company id</TableCell>
            <TableCell align="left">Rrequested By</TableCell>
            <TableCell align="left">Order Date</TableCell>
            <TableCell align="left">DeliveryAddress</TableCell>
            {/* <TableCell align="left">DeliveryStatus</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerOrders?.map((e, idx) => {
            // console.log("=====____>", seller);
            return (
              <TableRow
                key={idx}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell align="left">{e?.element?._id}</TableCell>
                <TableCell align="left">{e?.element?.CompanyId}</TableCell>
                <TableCell align="left">{e?.element?.RequestdBy}</TableCell>
                <TableCell align="left">
                  {new Date(e?.element?.OrderDate).toDateString()}
                </TableCell>
                <TableCell align="left">
                  {e?.element?.DeliveryAddress}
                </TableCell>
                {/* <TableCell align="left">
                  <Button variant="contained">Accept</Button>
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default SellerOrders;
