import React, { useState } from "react";
import Slider from "react-slick";
import { Box, Grid } from "@mui/material";
import VoucherDetail from "../../assets/Images/CommonImages/VoucherDetail.svg";
import GotLeftImg from "../../assets/Images/CommonImages/GoLeftImg.png";
import GoRightImg from "../../assets/Images/CommonImages/GoRightImg.png";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Box
      component={"img"}
      className={className}
      onClick={onClick}
      sx={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        left: "-3%",
        height: "auto",
        width: "7%",
        zIndex: "10",
      }}
      src={GotLeftImg}
    ></Box>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Box
      component={"img"}
      className={className}
      onClick={onClick}
      sx={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        right: "-3%",
        height: "auto",
        width: "7%",
        zIndex: "10",
      }}
      src={GoRightImg}
    ></Box>
  );
}

export default function CarasoulForProductDetails(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    className: "center",
    // centerMode: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: function (i) {
      return (
        <a>
          <div>
            <li
              style={{
                border: "3px solid #6B7A99",
                backgroundColor: currentSlide === i ? "#6B7A99" : "white",
                borderRadius: "10px",
                width: "5px",
                height: "5px",
              }}
            ></li>
          </div>
        </a>
      );
    },
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    touchMove: true,
    dots: true,
    // draggable: true,
    // dotsClass: "slick-dots slick-thumb",
    // appendDots: (dots) => <ul>{dots}</ul>,
  };

  return (
    <Grid
      sx={{
        width: "100%",
        maxWidth: "450px",
        mx: "auto",
        position: "relative",
      }}
      gap={5}
    >
      {/* <Slider {...settings}>
        <Box>
          <img src={VoucherDetail} style={ImageStyle} />
        </Box>
        <Box>
          <img src={VoucherDetail} style={ImageStyle} />
        </Box>
        <Box>
          <img src={VoucherDetail} style={ImageStyle} />
        </Box>
        <Box>
          <img src={VoucherDetail} style={ImageStyle} />
        </Box>
        <Box>
          <img src={VoucherDetail} style={ImageStyle} />
        </Box>
      </Slider> */}
      <Slider {...settings}>
        <Box>
          <img src={props?.imgSrc[0]['url']} style={ImageStyle} />
        </Box>
        <Box>
          <img src={props?.imgSrc[1]['url']} style={ImageStyle} />
        </Box>
      </Slider>
    </Grid>
  );
}

const ImageStyle = {
  width: "98%",
  borderRadius: "10px",
  maxWidth: "450px",
  
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  textAlign: "center",
};
