import React from "react";
import { Box, Button, TableCell, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PurchaseOrderDataLength from "./PurchaseOrderDataLength";
import PurchaseOrderTotalPrice from "./PurchaseOrderTotalPrice";

const BuyerPurchaseOrderListTable = (props) => {
  const navigate = useNavigate();

  return (
    <TableRow
      sx={{ maxHeight: "100px", height: "70px", bgcolor: "transparent" }}
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
            {props.data.SellerCompanyName}
          </Typography>
        </Box>
      </TableCell>

      <TableCell align="center">
        <Typography sx={companyname}>
          <PurchaseOrderDataLength data={props.data.SellerCompanyId} />
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography sx={companyname}>
          <PurchaseOrderTotalPrice data={props.data.SellerCompanyId} />
        </Typography>
      </TableCell>
      <TableCell align="center">
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
            navigate(`/home/purchaseorderdetails/${props.data.SellerCompanyId}`);
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default BuyerPurchaseOrderListTable;

const companyname = {
  fontFamily: "Kumbh Sans",
  color: "#7E8BA6",
  fontSize: "12px",
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
