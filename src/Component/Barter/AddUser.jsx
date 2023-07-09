import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Paper,
  Button,
  TextField,
  TableBody,
  Table,
  TableRow,
  Typography,
} from "@mui/material";
const AddUser = () => {
  // const [companyId, setCompanyId] = useState("");
  const [password, setPassword] = useState("");
  const [loginId, setLoginId] = useState("");
  const [userId, setUserId] = useState("");
  //   const [authId, setAuthId] = useState("");
  const [role, setRole] = useState("");
  const subLogin = async () => {
    console.log("=====>", subLogin);
    await axios
      .post("/assign/add_iamUser", {
        // companyId: companyId,
        password: password,
        loginId: loginId,
        userId: userId,
        role: role,
      })
      .then((res) => {
        console.log("___________>", res);
      })
      .catch((err) => {
        alert(err.response.data);
      });
    setUserId("");
    setRole("");
    setLoginId("");
    setPassword("");
  };
  return (
    <Paper elevation={0}>
      <Typography>ADD USER</Typography>
      <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
        <TableBody>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            }}
          >
            <Box
              mt={5}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              {/* <TextField
                label="companyId"
                id="companyId"
                value={companyId}
                onChange={(event) => setCompanyId(event.target.value)}
              /> */}
              <br />
              <br />
              <TextField
                label="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <br />
              <br />
              <TextField
                label="loginId"
                id="loginId"
                value={loginId}
                onChange={(event) => setLoginId(event.target.value)}
              />
              <br />
              <br />
              <TextField
                label="userId"
                id="userId"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
              />
              <br />
              <br />
              <TextField
                label="role"
                id="role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              />
              <br />
              <br />
              <Button onClick={subLogin} variant="contained">
                Add User
              </Button>
            </Box>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AddUser;
