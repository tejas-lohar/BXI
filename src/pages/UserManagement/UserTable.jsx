import { useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const useGetUsers = () =>
  useQuery("all-users", async () => {
    return (await axios.get("/api/v1/roles")).data;
  });

export default function BasicTable() {

  const { isLoading, data } = useGetUsers();

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>_id</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.users.map((row) => (
            <TableRow
              key={row._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{"row.role"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
