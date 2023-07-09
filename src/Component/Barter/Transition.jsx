import React, { useEffect, useState } from "react";
import axios from "axios";
// import TableCell from "@mui/material/TableCell";
// import TableRow from "@mui/material/TableRow";
import { useParams } from "react-router-dom";
import WalletAmmount from "./WalletAmmount";
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
} from "@mui/material";
function Transition() {
  const [data, setdata] = useState([]);
  const [deliver, setDeliver] = useState();
  const [from, setFrom] = useState();
  const [amount, setAmount] = useState();
  const { id } = useParams();

  console.log(data, "____________>");

  const addTransition = async () => {
    await axios
      .post("/transactions/", {
        walletAddressTo: from,
        amount: amount,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const datafetch = async () => {
    // let res = await axios.get(`/transactions?walletAddress=${id}`);
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    let res = await axios.get(`/transactions/`);
    console.log(res, "res");
    setdata(res.data);
  };

  useEffect(() => {
    datafetch();
  }, []);

  return (
    <>
      <WalletAmmount />
      <h2>Transition</h2>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <TextField
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
          }}
          label="walletAddressTo"
        ></TextField>

        <TextField
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          label="amount"
        ></TextField>
      </Box>
      <Box>
        <Button onClick={addTransition} size="small" variant="contained">
          add Transition
        </Button>
      </Box>
      <Box mt={8}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">walletAddressTo </TableCell>
              {/* <TableCell align="left">recive</TableCell> */}
              <TableCell align="left">amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="right">{row.walletAddressTo}</TableCell>
                {/* <TableCell align="right">{row.recive}</TableCell> */}
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
export default Transition;
