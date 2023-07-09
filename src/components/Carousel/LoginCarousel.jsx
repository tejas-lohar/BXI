import { Paper, Box, Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Slider from "react-slick";
import mainImg from "../../assets/Images/register/newMainLogo.svg";
import { Link } from "react-router-dom";

const images = [
  {
    bgImage: mainImg,
    textTwo: "@Aalloa Hills",
    actionTextOne: "= View Project",
    actionTextTwo: "= Call Now",
    logo: mainImg,
    link: "/allohaHills",
  },
  {
    bgImage: mainImg,
    textTwo: "@Shela Extension",
    actionTextOne: "= View Project",
    actionTextTwo: "= Call Now",
    link: "/medhaansh",
    logo: mainImg,
  },
  {
    bgImage: mainImg,
    textTwo: "@Chekhla",
    actionTextOne: "= View Project",
    actionTextTwo: "= Call Now",
    link: "/inverness",
    logo: mainImg,
  },
];

const LoginCarousel = () => {
  return (
    <Paper elevation={0}>
      <Box sx={{ width: "auto", maxWidth: "500px", ml: "auto", mr: "0" }}>
        <Slider
          dots={true}
          infinite={true}
          speed={1500}
          dotsClass="slick-dotnew custom-indicatornew"
          autoplay={true}
          slidesToShow={1}
          draggable={false}
        >
          {images.map((step, index) => (
            <Box
              key={index}
              sx={{
                height: "100%",
                minHeight: "105vh",
                width: "100%",
                maxWidth: "100vw",
                overflow: "hidden",
              }}
            >
              <img
                src={step.bgImage}
                style={{
                  width: "100%",
                  minHeight: "600px",
                  minWidth: "auto",
                  height: "100%",
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Paper>
  );
};

export default LoginCarousel;
