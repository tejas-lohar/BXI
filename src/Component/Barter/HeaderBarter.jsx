import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Stack,
  Button,
  Card,
  CardContent,
  TextField,
  Modal,
} from "@mui/material";

const HeaderBarter = () => {
  const [value, setValue] = useState("");

  const [update, setUpdate] = useState(value);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    setUpdate(value);
    console.log(value);
  };

  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Typography>{update}</Typography>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Box>
            <Grid container>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Button variant="contained">Login</Button>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                <Button variant="contained">SignUp</Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Card
            sx={{
              border: "1.5px solid blue",
              borderRadius: "8px",
              width: "220px",
            }}
          >
            <CardContent>
              <Box>
                <Typography sx={{ fontSize: "14px" }}>Wallet</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <Box>
            <TextField
              id="standard-basic"
              label="Wallet Value"
              variant="outlined"
              value={value}
              onChange={handleChange}
            />
            <Button onClick={handleClick} variant="outlined">
              add Value
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HeaderBarter;
