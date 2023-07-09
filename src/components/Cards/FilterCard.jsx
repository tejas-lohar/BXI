import { Paper, Typography } from "@mui/material";
import React from "react";

const FilterCard = (props) => {
  return (
    <Paper
      sx={{
        background: "#ffffff",
        boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
        borderRadius: "20px",
        width: "auto",
        maxWidth:"auto",
        minWidth:"120px",
        px: "20px",
        mx:1,
        height: "80px",
        display: "grid",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <img
        src={props.img}
        alt="filter"
        width="26px"
        height="23px"
        style={{ marginLeft: "auto", marginRight: "auto" }}
      />
      <Typography sx={TextStyle}>{props.text}</Typography>
    </Paper>
  );
};

export default FilterCard;

const TextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "15px",
  lineHeight: "24px",
  mt: 1,
  /* identical to box height */
  color: "#6F6F6F",
};
