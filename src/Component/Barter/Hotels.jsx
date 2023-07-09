import React from "react";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
const Hotels = () => {
  return (
    <Paper elevation={0}>
      <Typography>Hotels</Typography>
      <Box
        // mt={5}
        sx={{ position: "relative", height: "80%", minHeight: "300px", pt: 2 }}
      >
        <Paper elevation={2} sx={mainPage}>
          <Grid container sx={PageStyle}>
            <Typography>Hotels</Typography>
          </Grid>
        </Paper>
      </Box>
    </Paper>
  );
};

export default Hotels;

const PageStyle = {
  display: "flex",
  justifyContent: "center",
  padding: "1.5rem",
  height: { xl: "6rem", lg: "6rem", md: "4rem", sm: "2rem", xs: "2rem" },
  background: "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0))",
  width: "90%",
  borderRadius: "1rem",
};

const mainPage = {
  borderRadius: "1rem",
  maxWidth: "200rem",
  paddingLeft: { xl: "4rem", lg: "4rem", md: "3rem", sm: "2rem", xs: "0rem" },
  marginTop: { xl: "0rem", lg: "0rem", md: "0rem", sm: "4rem", xs: "4rem" },
};
