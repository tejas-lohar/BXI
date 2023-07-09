import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Box,
  TextField,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  Dialog,
  TableHead,
} from "@mui/material";
const Wallet = () => {
  const navigate = useNavigate();
  const [dataGet, setDataGet] = useState([]);
  const [ammout, setAmmount] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const FetchAllCutsomModels = async () => {
    await axios
      .get("/wallet")
      .then((res) => {
        console.log(res);
        setDataGet(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    FetchAllCutsomModels();
  }, []);

  // const filteredDatas = dataGet.filter((item) =>
  //   item.walletAddress.toLowerCase().includes(text.toLowerCase())
  // );
  return (
    <Paper elevation={0}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Wallet
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box mt={5} sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box>
            <TextField
              type="text"
              label="Ammout"
              value={ammout}
              onChange={(e) => setAmmount(e.target.value)}
            />
            <TextField
              type="text"
              label="Ammout"
              value={ammout}
              onChange={(e) => setAmmount(e.target.value)}
            />
            <TextField
              type="text"
              label="Ammout"
              value={ammout}
              onChange={(e) => setAmmount(e.target.value)}
            />
          </Box>
          {/* <Box>
                <Button onClick={add} size="small" variant="contained">
                  add Product
                </Button>
              </Box> */}
        </Box>
      </Dialog>
      <Box sx={{ marginTop: "10%" }}>
        <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Wallet From</TableCell>
              <TableCell align="left">Wallet To</TableCell>
              <TableCell align="left">Ammount</TableCell>
              <TableCell align="left">Cancel</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataGet?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row._id}</TableCell>
                <TableCell align="right">{row.walletAddress}</TableCell>
                <TableCell align="right">{row.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default Wallet;
