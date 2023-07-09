import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "../DataTable";
import ViewOrder from "./ViewOrder";
import {
  Grid,
  Box,
  Paper,
  Button,
  TextField,
  Dialog,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  InputLabel,
  Tooltip,
  ButtonBase,
  Typography,
} from "@mui/material";
const SellerOrder = () => {
  const [seller, setSeller] = useState([]);
  const fetchSeller = async () => {
    await axios
      .get("order/get_seller_orders")
      .then((res) => {
        console.log("===>", res);
        setSeller(res.data);
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
      <h2> Seller Orders </h2>
      {/* <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">id</TableCell>
            <TableCell align="left">company id</TableCell>
            <TableCell align="left">Rrequested By</TableCell>
            <TableCell align="left">Order Date</TableCell>
            <TableCell align="left">DeliveryAddress</TableCell>
            <TableCell align="left">DeliveryStatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seller?.map((e, idx) => {
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
                <TableCell align="left">
                  <Button variant="contained">Accept</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
      <DataTable data={seller} />
    </Paper>
  );
};

export default SellerOrder;
