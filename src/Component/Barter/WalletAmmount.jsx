import React, { useState, useEffect } from "react";
import { Box, Paper, Grid, TableRow, TableCell, Button } from "@mui/material";
import axios from "axios";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const WalletAmmount = () => {
  const [dataGet, setDataGet] = useState();
  const [listCart, setListCart] = useState([]);

  const navigate = useNavigate();

  const FetchAllWallet = async () => {
    await axios
      .get("/wallet/walletbyId?Identifier=6392fc895849976ef0f113f4")
      .then((res) => {
        console.log(res);
        setDataGet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCart = async () => {
    await axios
      .get("/product/get_cart_products")
      .then((res) => {
        console.log(res);
        setListCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCart();
  }, []);
  // const {
  //   data: cartData,
  //   isLoading: dataLoading,
  //   isError: dataError,
  // } = useGetProductCartValues();

  // console.log("cartData", cartData?.data?.body?.length);

  useEffect(() => {
    FetchAllWallet();
  }, []);

  return (
    <Paper elevation={0}>
      <Grid container mt={4}>
        <Grid item xl={6} lg={6} md={6}>
          <Box
            sx={{ marginRight: "auto", zIndex: 20 }}
            width={200}
            height={50}
            bgcolor="primary.main"
            color="primary.contrastText"
            borderRadius={10}
            p={2}
            onClick={() => {
              navigate("/wallet");
            }}
          >
            <Grid container>
              <Grid item xl={6} lg={6}>
                <TableRow
                  key={dataGet?.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell align="right" sx={{ fontSize: "20px" }}>
                    {dataGet?.balance}
                    Wallet
                  </TableCell>
                </TableRow>
              </Grid>
              <Grid item xl={6} lg={6}>
                <Box mt={1}>
                  <AccountBalanceWalletIcon
                    sx={{ width: "45px", height: "auto" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xl={6} lg={6} md={6}>
          <Box
            sx={{ marginLeft: "auto", right: 0, zIndex: 20 }}
            width={200}
            height={50}
            bgcolor="primary.main"
            color="primary.contrastText"
            borderRadius={10}
            p={2}
            mt={2}
          >
            <Grid
              container
              sx={{ color: "#fff" }}
              onClick={() => {
                navigate("/addtocart");
              }}
            >
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <Box mt={1}>
                  <ShoppingCartIcon sx={{ width: "45px", height: "auto" }} />
                </Box>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TableRow
                  key={listCart?.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right" sx={{ fontSize: "20px" }}>
                    {listCart?.length}
                  </TableCell>
                </TableRow>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{ marginLeft: "auto", right: 0, zIndex: 20 }}
        width={100}
        height={25}
        bgcolor="primary.main"
        color="primary.contrastText"
        borderRadius={10}
        p={2}
        mt={2}
      >
        <Grid
          container
          onClick={() => {
            navigate("/adduser");
          }}
        >
          <Button sx={{ color: "#fff" }}> ADD USER </Button>
        </Grid>
      </Box>
    </Paper>
  );
};

export default WalletAmmount;
