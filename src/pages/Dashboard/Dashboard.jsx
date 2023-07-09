import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ProductCard from "../../components/Cards/ProductCard";
// import FilterTab from "../Components/Filters/FilterTab";
// import AdPoster from "../Pages/Advertising/AdPoster";
import ImgOne from "../../assets/ProductImages/Imgone.png";
import ImgTwo from "../../assets/ProductImages/Imgtwo.png";
import ImgThree from "../../assets/ProductImages/Imgthree.png";
import ImgFour from "../../assets/ProductImages/Imgfour.png";
import { Link } from "react-router-dom";
import RightArrow from "../../assets/RightArrow.png";

const ImageArray = [
  ImgOne,
  ImgTwo,
  ImgThree,
  ImgFour,
  ImgOne,
  ImgTwo,
  ImgThree,
  ImgFour,
];

const Dashboard = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        mx: "auto",
        background: "transparent",
        borderRadius: "5px",
        mt: 2,
      }}
      elevation={0}
    >
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Paper
            elevation={0}
            sx={{
              bgcolor: "transparent",
              boxShadow: "none",
              borderRadius: "0px",
              width: "96%",
              mx: "auto",
              height: "30px",
              display: "flex",
              justifyContent: "space-between",
              my: 1,
            }}
          >
            <Typography sx={ExTextStyle}>Explore</Typography>
            <Link
              to={""}
              style={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "space-between",
                width: "100px",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={ViewAllTextStyle}>View All</Typography>
              <img src={RightArrow} width={"30px"} />
            </Link>
          </Paper>
        </Grid>
      </Grid>
      <Grid container sx={{ width: "100%" }}>
        {ImageArray.map((res, idx) => {
          return (
            <Grid item xl={3} lg={3} md={4} sm={6} xs={12} sx={{ mt: 2 }}>
              <ProductCard key={idx} img={res} />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default Dashboard;

const ExTextStyle = {
  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "30px",
  lineHeight: "38px",
  color: "#6B7A99",
};

const ViewAllTextStyle = {
  fontFamily: "Source Sans Pro",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "17px",
  lineHeight: "21px",

  color: "#1976d2",
};
