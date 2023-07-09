import React from "react";
import { Box } from "@mui/material";
const ClientBox = ({ image, name = "client" }) => {
  return (
    <Box
      sx={
        {
          // marginX: "12px",
          // borderRadius: "8px",
          // backgroundColor: "#0d0d0d",
          // // paddingX: "120px",
          // // paddingY: "12px",
          // width: "315px",
          // height: "auto",
          // minHeight: "95px",
          // maxHeight: "120px",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
        }
      }
    >
      <img
        style={{
          width: "95px",
          height: "auto",
          objectFit: "cover",
          margin: "30px",
        }}
        src={image}
        alt="android"
      />
    </Box>
  );
};

export default ClientBox;
