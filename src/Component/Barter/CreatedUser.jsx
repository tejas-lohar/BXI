import React from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Stack,
  Button,
  Modal,
  TextField,
  Dialog,
} from "@mui/material";
import WalletAmmount from "./WalletAmmount";
import Footer from "./Footer";
import Logout from "../Logout";
const CreatedUser = () => {
  return (
    <Paper elevation={0}>
      <Logout />
      <WalletAmmount />
      <Typography>Created User</Typography>
      <Footer />
    </Paper>
  );
};

export default CreatedUser;
