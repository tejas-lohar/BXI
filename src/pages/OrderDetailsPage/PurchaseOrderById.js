import { Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const PurchaseOrderById = (props) => {
  const [purchaseOrder, setPurchaseOrder] = useState();

  async function GetPurchaseOrderById() {
    await axios
      .get(`purchase/get_purchase_order/${props.data}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPurchaseOrder(res.data);
      });
  }

  let PaddingStyle = 1.5;

  useEffect(() => {
    GetPurchaseOrderById();
  }, []);

  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        py: 2,
        height: "10px",
      }}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{
          borderBottom: "none",
          p: PaddingStyle,
        }}
      >
        <Typography sx={SelectedItemsTetxStyle}>1</Typography>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={{
          borderBottom: "none",
          p: PaddingStyle,
        }}
      >
        <Typography
          sx={{
            ...SelectedItemsTetxStyle,
            // make text ... if it is too long
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {purchaseOrder?.ProductId.ProductName}
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
          {purchaseOrder?.ProductId.ProductPrice /
            purchaseOrder?.ProductId.ProductQty}
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
            (purchaseOrder?.ProductId.ProductPrice /
              purchaseOrder?.ProductId.ProductQty) *
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
          {purchaseOrder?.ProductId.ProductQty}
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
          {(purchaseOrder?.ProductId.ProductPrice * 0.18).toFixed(3)}
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
          {purchaseOrder?.ProductId.ProductPrice}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default PurchaseOrderById;

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
