import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Button,
} from "@mui/material";
const Logout = () => {
  const navigate = useNavigate();
  return (
    <Paper elevation={0}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", width: "40%" }}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/register");
          }}
        >
          LogOut
        </Button>
      </Box>
    </Paper>
  );
};

export default Logout;
