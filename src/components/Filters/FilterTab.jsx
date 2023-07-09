import { Box, Paper } from "@mui/material";
import React from "react";
import FilterCard from "../Cards/FilterCard";
import AdvertisingIcon from "../../Assets/FilterIcons/Advertising.png";
import AirlinesIcon from "../../Assets/FilterIcons/Airlines.png";
import AppearelsIcon from "../../Assets/FilterIcons/Appearels.png";
import AutomobileIcon from "../../Assets/FilterIcons/Automobile.png";
import BeauticianIcon from "../../Assets/FilterIcons/Beautician.png";
import BusinessProductIcon from "../../Assets/FilterIcons/BusinessProduct.png";

const FilterTab = () => {
  return (
    <Box
      sx={{
        bgcolor: "transparent",
        display: "flex",
        justifyContent: "space-evenly",
      }}
      elevation={0}
    >
      <FilterCard img={AdvertisingIcon} text="Advertising & broadcast" />
      <FilterCard img={AirlinesIcon} text="Airlines" />
      <FilterCard img={AppearelsIcon} text="Apparel" />
      <FilterCard img={AutomobileIcon} text="Automobiles" />
      <FilterCard img={BeauticianIcon} text="Beauty & cosmetics" />
      <FilterCard img={BusinessProductIcon} text="Business Products" />
    </Box>
  );
};

export default FilterTab;
