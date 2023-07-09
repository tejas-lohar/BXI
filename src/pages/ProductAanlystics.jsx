import React from "react";

const ProductAanlystics = () => {
  return (
    <Box
      sx={{
        height: "auto",
        width: {
          xl: "100%",
          lg: "100%",
          md: "100%",
          sm: "60%",
          xs: "60%",
        },
        alignSelf: "center",
        mx: "auto",
        background: "#fff",
        borderRadius: "10px",
        height: "595px",
        width: "100%",
        overflow: "scroll",
      }}
    >
      <LineChart />
    </Box>
  );
};

export default ProductAanlystics;
