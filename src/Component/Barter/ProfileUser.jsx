import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Grid } from "@mui/material";
const ProfileUser = () => {
  const parms = useParams().emailLogin;
  console.log("--->", parms);
  return (
    <Paper elevation={0}>
      <Grid
        container
        spacing={4}
        sx={{ width: "95%", marginLeft: "auto", marginRight: "auto" }}
      >
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
          <Paper
            elevation={2}
            sx={{ minHeight: "250px", borderRadius: "10px" }}
          >
            Paper Elevation
          </Paper>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={12} sx={{}}>
          <Grid container>
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{ background: "#000" }}
            >
              3
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Paper elevation={2}>Paper Elevation</Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileUser;
