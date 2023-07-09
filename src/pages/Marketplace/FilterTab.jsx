import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import FilterCard from "../../components/Cards/FilterCard";
import AdvertisingIcon from "../../assets/FilterIcons/Advertising.png";
import AirlinesIcon from "../../assets/FilterIcons/Airlines.png";
import AppearelsIcon from "../../assets/FilterIcons/Appearels.png";
import AutomobileIcon from "../../assets/FilterIcons/Automobile.png";
import BeauticianIcon from "../../assets/FilterIcons/Beautician.png";
import BusinessProductIcon from "../../assets/FilterIcons/BusinessProduct.png";
import FilterIconImg from "../../assets/FilterIcons/FilterIcon.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const FilterTab = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 5,
    speed: 500,
  };
  return (
    <Box
      sx={{
        bgcolor: "transparent",
        mx: "auto",
        width: "99%",
      }}
      elevation={0}
    >
      <Grid container>
        <Grid item xl={11.2} lg={11.2} md={11} sm={11} xs={11}>
          <Slider {...settings}>
            <FilterCard img={AppearelsIcon} text="Advertising & broadcast" />
            <FilterCard img={AirlinesIcon} text="Airlines" />
            <FilterCard img={AppearelsIcon} text="Apparel" />
            <FilterCard img={AutomobileIcon} text="Automobiles" />
            <FilterCard img={BeauticianIcon} text="Beauty & cosmetics" />
            <FilterCard img={BusinessProductIcon} text="Business Products" />
            <FilterCard img={AppearelsIcon} text="Apparel" />
            <FilterCard img={AutomobileIcon} text="Automobiles" />
            <FilterCard img={BeauticianIcon} text="Beauty & cosmetics" />
            <FilterCard img={AutomobileIcon} text="Automobiles" />
            <FilterCard img={BeauticianIcon} text="Beauty & cosmetics" />
            <FilterCard img={BusinessProductIcon} text="Business Products" />
          </Slider>
        </Grid>
        <Grid
          xl={0.8}
          lg={0.8}
          md={0.8}
          sm={0.8}
          xs={0.8}
          sx={{ display: "flex", justifyContent: "right" }}
        >
          <Box
            sx={{
              background: "#ffffff",
              boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
              width: "30px",
              px: "10px",
              height: "80px",
              borderRadius: "20px",
              display: "grid",
              justifyContent: "space-evenly",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <img
              src={FilterIconImg}
              alt="filter"
              width="26px"
              height="auto"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FilterTab;
