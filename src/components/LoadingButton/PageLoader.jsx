import { Paper } from "@mui/material";
import React from "react";

const PageLoader = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "transparent",
        zIndex: 1000,
      }}
      elevation={0}
    >
      <div className="triple-spinner"></div>
    </Paper>
  );
};

export default PageLoader;
