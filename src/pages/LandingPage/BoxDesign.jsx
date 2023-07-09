import { Box } from "@mui/material";
import React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import DrawIcon from "@mui/icons-material/Draw";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

const BoxDesign = () => {
  return (
    <>
      <Box sx={DiamondDesign}>
        <Box sx={IconDesign}>
          <FlightTakeoffIcon />
        </Box>
      </Box>
      <Box
        sx={{
          ...DiamondDesign,
          marginBottom: " -19px",
          marginTop: "-11px",
          marginLeft: "87px",
        }}
      >
        <Box sx={IconDesign}>
          <DrawIcon />
        </Box>
      </Box>
      <Box
        sx={{
          ...DiamondDesign,
          marginLeft: "-7px",
        }}
      >
        <Box sx={IconDesign}>
          <ApartmentIcon />
        </Box>
      </Box>
    </>
  );
};

export default BoxDesign;
const IconDesign = {
  transform: "rotate(-45deg)",
  width: "44.28px",
  height: "44.28px",
  fontSize: "5rem",
  marginTop: "20px",
  marginLeft: "16px",
};
const DiamondDesign = {
  width: "108.35px",
  height: "108.35px",
  transform: "rotate(45deg)",
  border: "4px solid #00AFDF",
  borderRadius: "34.0746px",
};
