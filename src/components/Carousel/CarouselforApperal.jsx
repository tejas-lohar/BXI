import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import HotelImage from "../../assets/Images/CommonImages/HotelImage.svg";
// import GoLeftImg from "../../assets/Images/CommonImages/GoLeftimg.png";
import downward from "../../assets/Images/Apprealimg/downward.svg";
import upward from "../../assets/Images/Apprealimg/upward.svg";

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  // const [img, setImg] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [GetProductByIdData, setGetProductByIdData] = useState();

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
        top: "40%",
        left: "-20%",
        height: "auto",
        width: "15%",
        zIndex: "1",
      }}
      src={upward}
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
        top: "55%",
        left: "-20%",
        height: "auto",
        width: "15%",
        zIndex: "1",
      }}
      src={downward}
    ></Box>
  );
}

export default function CarouselforApperal(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    // className: "center",
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
    slidesToShow: 1,
    speed: 500,
    height: "auto",
    nextArrow: props?.ImageDataArray?.length > 1 ? <SampleNextArrow /> : null,
    prevArrow: props?.ImageDataArray?.length > 1 ? <SamplePrevArrow /> : null,
    touchMove: true,
    dots: true,
    // axis: "vertical",
    vertical: true,
  };
  return (
    <Grid
      sx={{
        width: "75%",
        // margin: "auto",
        position: "relative",
        // height: "auto",
        height: "415px",
        mx: "auto",
      }}
      gap={7}
    >
      {props?.ImageDataArray?.length > 1 ? (
        <Slider {...settings}>
          {props?.ImageDataArray?.map((res) => {
            if (res.url == null) {
              return (
                <Box
                  component="img"
                  src={HotelImage}
                  sx={{
                    height: "auto",
                    maxHeight: "430px",
                    width: "auto",
                    maxWidth: "100%",
                  }}
                />
              );
            } else if (res.typeOfFile === "image") {
              return (
                <Box
                  // component="img"
                  // src={res.url}
                  sx={{
                    background: `url(${res.url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                    width: "auto",
                    maxHeight: "420px",
                    minHeight: "420px",
                  }}
                />
              );
            } else if (res.typeOfFile === "video") {
              return (
                <video
                  src={res.url}
                  controls
                  style={{ height: "auto", width: "auto", minHeight: "438px" }}
                />
              );
            } else {
              return (
                <Box
                  // component="img"
                  // src={res.url}
                  sx={{
                    background: `url(${res.url})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100%",
                    width: "auto",
                    maxHeight: {
                      xl: "430px",
                      lg: "430px",
                      md: "430px",
                      sm: "230px",
                      xs: "230px",
                    },
                    minHeight: {
                      xl: "430px",
                      lg: "430px",
                      md: "430px",
                      sm: "230px",
                      xs: "230px",
                    },
                  }}
                />
              );
            }
          })}
        </Slider>
      ) : (
        // <Slider {...settings}>
        <Box
          sx={{
            width: "98%",
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
              //   height: "300px",
              height: "auto",
              width: "auto",
              mx: "auto",
            }}
          />
        </Box>
        // </Slider>
      )}
    </Grid>
  );
}

const ImageStyle = {
  width: "98%",
};
