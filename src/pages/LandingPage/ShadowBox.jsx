import { Box, Typography } from "@mui/material";
import React from "react";

const ShadowBox = ({ imagePath, title }) => {
  return (
    <>
      <Box sx={flexBetween}>
        <Box sx={sellerBoxDesign}>
          <img
            src={imagePath}
            alt="imagePath"
            style={{
              width: "40.91px",
              height: "40.91px",
            }}
          />
        </Box>
      </Box>
      <Box sx={flexBetween}>
        <Typography
          sx={{
            width: "180px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "26px",
            textAlign: "center",
            color: "#8272B5",
            marginTop: "27px",
          }}
        >
          {title}
        </Typography>
      </Box>
    </>
  );
};

export default ShadowBox;
const sellerBoxDesign = {
  width: "82px",
  height: "82px",
  background: "rgba(255, 255, 255, 0.002)",
  boxShadow: "1px 1px 30.6px 1px rgba(74, 45, 197, 0.14)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "1px 1px 30.6px 1px rgba(114, 95, 297, 0.50)",
  },
};
const flexBetween = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
