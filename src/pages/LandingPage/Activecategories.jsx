import { Typography } from "@mui/material";
import React from "react";
import "./Style.css";
export default function Activecategories({ imageUrl, text }) {
  return (
    <div className="AmentiseOne">
      <img
        src={imageUrl}
        alt="OneImg"
        className="am-img"
        style={{
          width: "100%",
          height: "100%",
          cursor: "pointer",
        }}
      />
      <div className="AmentiseOneHover">
        <Typography sx={OnHoverTextStyle}>{text}</Typography>
      </div>
    </div>
  );
}

const OnHoverTextStyle = {
  fontFamily: "Playfair Display",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "30px",
  color: "#000",
  Opacity: "0.8",
  mt: 2,
  textAlign: "justify",
};
