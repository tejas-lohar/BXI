import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box, Grid } from "@mui/material";
import HotelImage from "../../assets/Images/CommonImages/HotelImage.svg";
// import GoLeftImg from "../../assets/Images/CommonImages/GoLeftimg.png";
import GotLeftImg from "../../assets/Images/CommonImages/GoLeftImg.png";
import GoRightImg from "../../assets/Images/CommonImages/GoRightImg.png";
import { styled } from "@mui/system";
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  // const [img, setImg] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  let NewImgArray = [];
  // const ImageDataArray = GetProductByIdData?.ProductImages;
  const upwardClick = () => {
    setCurrentImage((currentImage + 1) % props.ImageDataArray.length);
  };

  useEffect(() => {
    // GetProductByid();
    console.log("ImageDataArray", props.ImageDataArray);
  }, []);

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
        left: "18%",
        height: "auto",
        width: "4%",
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
        right: "18%",
        height: "auto",
        width: "4%",
        zIndex: "10",
      }}
      src={GoRightImg}
    ></Box>
  );
}
const BlurredImage = styled("img")`
  height: 500px;
  width: 800px;
  max-width: 98.8%;
  min-height: 438px;
  filter: ${({ active }) => (active ? "none" : "blur(4px)")};
`;

export default function CarasoulForProductDetails(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    className: "center",
    dots: true,
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
    // centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 1.66,
    speed: 500,
    nextArrow: props?.ImageDataArray?.length > 1 ? <SampleNextArrow /> : null,
    prevArrow: props?.ImageDataArray?.length > 1 ? <SamplePrevArrow /> : null,
    touchMove: true,
  };
  return (
    <Grid
      sx={{
        width: "100%",
        position: "relative",
      }}
      gap={5}
    >
      {props?.ImageDataArray?.length > 0 ? (
        <Slider {...settings}>
          {props?.ImageDataArray?.map((res, index) => {
            console.log(":::::::", index, currentSlide);
            if (res.url == null) {
              return (
                <Box
                  component="img"
                  src={HotelImage}
                  sx={{
                    height: "auto",
                    minHeight: "438px",
                    width: "auto",
                    maxWidth: "98.8%",
                  }}
                />
              );
            } else if (res.typeOfFile === "image") {
              return (
                <BlurredImage
                  key={res.url}
                  src={res.url}
                  active={
                    currentSlide === index - 1 || currentSlide === index + 1
                  }
                />
              );
            } else if (res.typeOfFile === "video") {
              return (
                <video
                  src={res.url}
                  controls
                  style={{
                    height: "500px",
                    width: "800px",
                    minHeight: "438px",
                    maxWidth: "98.8%",
                  }}
                />
              );
            } else {
              return null;
            }
          })}
        </Slider>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={
              props?.ImageDataArray?.length === 1 &&
              props?.ImageDataArray[0]?.url
            }
            sx={{
              height: "300px",
              width: "auto",
              mx: "auto",
            }}
          />
        </Box>
      )}
    </Grid>
  );
}

const ImageStyle = {
  width: "98%",
};
