import { Paper } from "@mui/material";
import React from "react";

const PageLoaderBottom = () => {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        maxHeight: "80vh",
        position: "absolute",
        top: 330,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        zIndex: 1000,
      }}
      elevation={0}
    >
      <div className="triple-spinner"></div>
    </Paper>
  );
};

export default PageLoaderBottom;
