import { Box, Grid, Typography, Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Employee2 from "../../assets/employee2.jpg";
import IndiaMap from "../../assets/HomePageImages/india.svg";
import Landingimg from "../../assets/HomePageImages/landingimage.svg";
import landingarrow from "../../assets/HomePageImages/rightarr.svg";
import landingarrowone from "../../assets/HomePageImages/leftarr.svg";
import SampleVideo from "../../assets/SampleVideo/SampleVideo.mp4";
import BxiBanner from "../../assets/SampleVideo/BXIBanner.gif";
import Adonmo from "../../assets/HomePageImages/Adonmo.png";
import Ajmal from "../../assets/HomePageImages/Ajmal.png";
import Alt_Balaji from "../../assets/HomePageImages/Alt Balaji.png";
import Being_Human from "../../assets/HomePageImages/Being Human.png";
import Bestseller from "../../assets/HomePageImages/Bestseller.png";
import Boat from "../../assets/HomePageImages/Boat-01.png";
import Bombay_Shaving from "../../assets/HomePageImages/Bombay Shaving.png";
import BR from "../../assets/HomePageImages/BR-01.png";
import Clothing_Culture from "../../assets/HomePageImages/Clothing Culture.png";
import Carnival from "../../assets/HomePageImages/Carnival-01.png";
import Casablanca from "../../assets/HomePageImages/Casablanca-01.png";
import Cheesiano from "../../assets/HomePageImages/Cheesiano.png";
import Cinepolis from "../../assets/HomePageImages/Cinepolis-01.png";
import Classic_Tissue from "../../assets/HomePageImages/Classic Tissue.png";
import Della from "../../assets/HomePageImages/Della-01.png";
import Dollar from "../../assets/HomePageImages/Dollar-01.png";
import Enrich from "../../assets/HomePageImages/Enrich-01.png";
import ERIS from "../../assets/HomePageImages/ERIS-01.png";
import Finch from "../../assets/HomePageImages/Finch.png";
import Flote_House from "../../assets/HomePageImages/Flote House.png";
import Foce from "../../assets/HomePageImages/foce-01.png";
import Free_Press_Journal from "../../assets/HomePageImages/Free Press Journal-01.png";
import GCPL from "../../assets/HomePageImages/GCPL-01.png";
import GMR from "../../assets/HomePageImages/GMR-01.png";
import GO_First from "../../assets/HomePageImages/GO First-01.png";
import GO_Zero from "../../assets/HomePageImages/GO Zero-01.png";
import GTPL from "../../assets/HomePageImages/GtPL-01.png";
import Thomas_Cook from "../../assets/HomePageImages/Thomas Cook-01.png";
import Indigo_Paints from "../../assets/HomePageImages/Indigo Paints-01.png";
import Jaipan from "../../assets/HomePageImages/jaipan-01.png";
import Karibo from "../../assets/HomePageImages/KAribo.png";
import Khushi from "../../assets/HomePageImages/Khushi-01.png";
import LimeLight from "../../assets/HomePageImages/LimeLight.png";
import Restaurant from "../../assets/HomePageImages/Restaurantqsr.png";
import Lifestyle from "../../assets/HomePageImages/Lifestyle.png";
import Media from "../../assets/HomePageImages/Media.png";
import Mobility from "../../assets/HomePageImages/Mobility.png";
import Office_supply from "../../assets/HomePageImages/Officesupply.png";
import Other from "../../assets/HomePageImages/Other.png";
import Hotel from "../../assets/HomePageImages/Hotel.png";
import FMCG from "../../assets/HomePageImages/FMCG.png";
import Entertainment__Events from "../../assets/HomePageImages/Entertainment__Events.png";
import Electronics from "../../assets/HomePageImages/Electronics.png";
import Apparel from "../../assets/HomePageImages/Apparel.png";
import Airline from "../../assets/HomePageImages/Component_1.png";
import Implications_Of_Barter from "../../assets/HomePageImages/Legal & Tax Implications Of Barter.png";
import Future_Of_Barter from "../../assets/HomePageImages/Future Of Barter.png";
import Benefits_Of_Bartering from "../../assets/HomePageImages/Benefits Of Bartering.png";
import BxiPointer from "../../assets/HomePageImages/BxiPointer.png";
import BoxDesign from "./BoxDesign";
import { config } from "react-spring";
import EmailIcon from "@mui/icons-material/Email";
import PinDropIcon from "@mui/icons-material/PinDrop";
import CallIcon from "@mui/icons-material/Call";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";
import Activecategories from "./Activecategories";
import ClientMarquee from "./ClientMarquee";
import "./Style.css";
import AdonmoReel from "../../assets/HomePageImages/AdonmoReel.mp4";
import KARIBOReel from "../../assets/HomePageImages/KARIBOReel.mp4";
import DellaAdventures from "../../assets/HomePageImages/DellaAdventures.mp4";
import MirajCinemaReel from "../../assets/HomePageImages/MirajCinemaReel.mp4";
import NilonReel from "../../assets/HomePageImages/NilonReel.mp4";
import SkodaAutoReel from "../../assets/HomePageImages/SkodaAutoReel.mp4";
import TheOrchidHotelReel from "../../assets/HomePageImages/TheOrchidHotelReel.mp4";
import TechStack from "./TechStack";
import Fade from "react-reveal/Fade";
import { useNavigate } from "react-router-dom/dist";
import Typewriter from "typewriter-effect/dist/core";
import { motion, useAnimation } from "framer-motion";
import AnimationOnImg from "./Animation/AnimationOnImg";
import { keyframes } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";
import Card from "./Card";
import Carousel from "./Carousel";
const Tech = [
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Adonmo-01.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Being+Human-01.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Ajmal-01.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Alt+Balaji-01.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Bestseller-01.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Bombay+Shaving.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/BR-01.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Clothing+Culture.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Carnival-01.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Casablanca-01.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Cheesiano.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Cinepolis-01.png",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Classic+Tissue.png ",
  "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/Khushi-01.png",
];
const LandingPageBody = (props) => {
  console.log("props", props);
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  let cards = [
    {
      key: uuidv4(),
      content: (
        <Card videoUrl="https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/AdonmoReel.mp4" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card videoUrl="https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/KARIBOReel.mp4" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card videoUrl="https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/DellaAdventures.mp4" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card videoUrl="https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/MirajCinemaReel.mp4" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card videoUrl="https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/NilonReel.mp4" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card videoUrl="https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/SkodaAutoReel.mp4" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card videoUrl="https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/TheOrchidHotelReel.mp4" />
      ),
    },
  ];
  // https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/MirajCinemaReel.mp4
  // https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/NilonReel.mp4
  // https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/SkodaAutoReel.mp4
  // https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/TheOrchidHotelReel.mp4

  // const handleSlideChange = (slideIndex) => {
  //   setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
  // };

  // const springProps = useSpring({
  //   from: { left: 0 },
  //   to: { left: 200 },
  //   config: { duration: 2000 },
  //   reset: true,
  //   reverse: true,
  //   loop: true,
  // });
  const springProps = useSpring({
    from: { left: -400 },
    to: { left: 0 },
    config: { duration: 2000 },
    reset: true,
  });
  const springPropss = useSpring({
    from: { left: "100%" },
    to: { left: "79.15%" },
    config: { duration: 2000 },
    reset: true,
    // from: { right: 0 },
    // to: { right: 200, },
    // config: { duration: 1000 },
    // reset: true,
  });

  // const springPropss = useSpring({
  //   from: { left: "100%" },
  //   to: { left: "80%" },
  //   config: { duration: 2000 },
  //   reset: true,
  //   // from: { right: 0 },
  //   // to: { right: 200, },
  //   // config: { duration: 1000 },
  //   // reset: true,
  // });

  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
      });
    }
  }, [controls, inView]);
  const [ref1, inView1] = useInView();
  useEffect(() => {
    if (inView1) {
      console.log("in", inView1);
      controls.start({
        opacity: 1,
        scale: 1,
        translateX: -400,
      });
    }
  }, [controls, inView1]);

  const counterAnim = (qSelector, start = 0, end, duration = 1000) => {
    const target = document.querySelector(qSelector);
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      target.innerText = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // const { ref, inView } = useInView({
  //   threshold: 0,
  // });
  async function openEmail(e) {
    window.location.href = "mailto:business@bxiworld.com";
  }

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        counterAnim("#count1", 0, 150, 2000);
        counterAnim("#count2", 0, 22, 2000);
        counterAnim("#count3", 0, 200, 2000);
        counterAnim("#count4", 0, 12000, 2000);
      }, 500);
    }
  }, [inView]);

  const typewriterRef = useRef(null);
  useEffect(() => {
    const typewriter = new Typewriter(typewriterRef.current, {
      loop: true,
    });

    typewriter
      .pauseFor(1000)
      .typeString("Apparel")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Office Supply")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Hotel")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Electronics")
      .pauseFor(1000)
      .deleteAll()
      .typeString("FMCG")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Lifestyle")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Mobility")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Textile")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Restaurant")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Media")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Airline")
      .pauseFor(1000)
      .deleteAll()
      .typeString("Entertainment")
      .pauseFor(1000)
      .start();
  }, []);
  const buttonAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxHeight: "100%",
          mt: 2,
        }}
      >
        <Box
          component="img"
          sx={{
            width: "100%",
            minWidth: "100vw",
            height: "auto",
            minHeight: "92vh",
            maxHeight: "92vh",
            objectFit: "fill",
          }}
          src={
            "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/BXIBanner.gif"
          }
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
            position: "absolute",
            right: "0.5%",
            top: "89%",
          }}
        >
          <Button
            sx={{
              background: "#fff",
              borderRadius: "23.1178px",
              width: "230.8px",
              height: "50.59px",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 700,
              alignItems: "center",
              textAlign: "center",
              color: "#375DBB",
              fontSize: "16.8383px",
              textTransform: "none",
              boxShadow: "0px 8px 16px rgba(30, 30, 30, 0.5)",
              // boxShadow: "0px 4px 8px ",
              transform: "scale(1)",
              transition: "0.5s ease-in-out",
              "&:hover": {
                background: "#fff",
                color: "#375DBB",
                transform: "scale(1.1)",
                // animation: `${buttonAnimation} 1s ease forwards`,
              },
            }}
            onClick={() => navigate("/login")}
          >
            Explore Marketplace
          </Button>
        </Box>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Fade top duration={1000}>
            <Typography
              sx={{
                width: "auto",
                height: "48px",
                // top: "1021.5px",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 700,
                fontSize: "30px",
                lineHeight: "48px",
                textTransform: "uppercase",
                color: "#000000",
              }}
            >
              Active Categories
            </Typography>
          </Fade>
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ padding: "20px 100px" }}>
        <Grid item xs={6} sm={3} md={3}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <AnimationOnImg>
              <Box
                sx={{
                  height: "300px",
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <div className="AmentiseOne">
                  <img
                    src={Airline}
                    alt="OneImg"
                    className="am-img"
                    style={{
                      width: "90%",
                      height: "90%",
                      cursor: "pointer",
                    }}
                  />
                  <div className="AmentiseOneHover">
                    <Typography sx={{ ...OnHoverTextStyle, mb: 2 }}>
                      Airline
                    </Typography>
                  </div>
                </div>

                <div className="AmentiseOne" style={{ marginRight: "-110px" }}>
                  <img
                    src={Hotel}
                    alt="Hotel"
                    className="am-img"
                    style={{
                      width: "90%",
                      height: "90%",
                      cursor: "pointer",
                    }}
                  />
                  <div className="AmentiseOneHover">
                    <Typography sx={{ ...OnHoverTextStyle, mb: 2 }}>
                      Hotel
                    </Typography>
                  </div>
                </div>
                <div className="AmentiseOne">
                  <img
                    src={Office_supply}
                    alt="OneImg"
                    className="am-img"
                    style={{
                      width: "90%",
                      height: "90%",
                      cursor: "pointer",
                    }}
                  />
                  <div className="AmentiseOneHover">
                    <Typography sx={{ ...OnHoverTextStyle, fontSize: "14px" }}>
                      Office Supply
                    </Typography>
                  </div>
                </div>
              </Box>
            </AnimationOnImg>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <AnimationOnImg>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  height: "300px",
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <div className="AmentiseOne">
                  <img
                    src={Restaurant}
                    alt="Restaurant"
                    className="am-img"
                    style={{
                      width: "90%",
                      height: "90%",
                      cursor: "pointer",
                    }}
                  />
                  <div className="AmentiseOneHover">
                    <Typography sx={{ ...OnHoverTextStyle }}>
                      Restaurant
                    </Typography>
                  </div>
                </div>

                <div className="AmentiseOne" style={{ marginRight: "-110px" }}>
                  <img
                    src={Media}
                    alt="Media"
                    className="am-img"
                    style={{
                      width: "90%",
                      height: "90%",
                      cursor: "pointer",
                    }}
                  />
                  <div className="AmentiseOneHover">
                    <Typography sx={{ ...OnHoverTextStyle, mb: 2 }}>
                      Media
                    </Typography>
                  </div>
                </div>

                <div className="AmentiseOne">
                  <img
                    src={Apparel}
                    alt="Apparel"
                    className="am-img"
                    style={{
                      width: "90%",
                      height: "90%",
                      cursor: "pointer",
                    }}
                  />
                  <div className="AmentiseOneHover">
                    <Typography sx={{ ...OnHoverTextStyle }}>
                      Apparel
                    </Typography>
                  </div>
                </div>
              </Box>
            </Box>
          </AnimationOnImg>
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <AnimationOnImg>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  height: "300px",
                  width: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <div className="AmentiseOne ">
                  <img
                    src={FMCG}
                    alt="FMCG"
                    className="am-img"
                    style={{
                      width: "90%",
                      height: "90%",
                      cursor: "pointer",
                    }}
                  />
                  <div className="AmentiseOneHover">
                    <Typography sx={{ ...OnHoverTextStyle }}>FMCG</Typography>
                  </div>
                </div>

                <div className="AmentiseOne" style={{ marginRight: "-110px" }}>
                  <img
                    src={Mobility}
                    alt="Mobility"
                    className="am-img"
                    style={{
                      width: "90%",
                      height: "90%",
                      cursor: "pointer",
                    }}
                  />
                  <div className="AmentiseOneHover">
                    <Typography sx={{ ...OnHoverTextStyle, mb: 2 }}>
                      Mobility
                    </Typography>
                  </div>
                </div>

                <div className="AmentiseOne">
                  <img
                    src={Other}
                    alt="Other"
                    className="am-img"
                    style={{
                      width: "90%",
                      height: "90%",
                      cursor: "pointer",
                    }}
                  />
                  <div className="AmentiseOneHover">
                    <Typography sx={{ ...OnHoverTextStyle }}>Other</Typography>
                  </div>
                </div>
              </Box>
            </Box>
          </AnimationOnImg>
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <AnimationOnImg>
            <Box
              sx={{
                height: "300px",
                width: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <div className="AmentiseOne">
                <img
                  src={Lifestyle}
                  alt="Lifestyle"
                  className="am-img"
                  style={{
                    width: "90%",
                    height: "90%",
                    cursor: "pointer",
                  }}
                />
                <div className="AmentiseOneHover">
                  <Typography sx={{ ...OnHoverTextStyle }}>
                    Lifestyle
                  </Typography>
                </div>
              </div>

              <div className="AmentiseOne" style={{ marginRight: "-110px" }}>
                <img
                  src={Entertainment__Events}
                  alt="Entertainment__Events"
                  className="am-img"
                  style={{
                    width: "90%",
                    height: "90%",
                    cursor: "pointer",
                  }}
                />
                <div className="AmentiseOneHover">
                  <Typography
                    sx={{ ...OnHoverTextStyle, mb: 2, fontSize: "16px" }}
                  >
                    Entertainment
                  </Typography>
                </div>
              </div>

              <div className="AmentiseOne">
                <img
                  src={Electronics}
                  alt="Electronics"
                  className="am-img"
                  style={{
                    width: "90%",
                    height: "90%",
                    cursor: "pointer",
                  }}
                />
                <div className="AmentiseOneHover">
                  <Typography sx={{ ...OnHoverTextStyle }}>
                    Electronics
                  </Typography>
                </div>
              </div>
            </Box>
          </AnimationOnImg>
        </Grid>
      </Grid>
      <Box id="hello">
        <Grid
          container
          spacing={4}
          sx={{ padding: "55px 0 0 0" }}
          ref={props.scollRef}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ marginLeft: "60px" }}>
              <Box sx={{ display: "flex" }}>
                <Fade top duration={1000}>
                  <Typography
                    variant="inherit"
                    component="span"
                    sx={{ ...headingStyle, fontSize: "30px", fontWeight: 600 }}
                  >
                    What is
                  </Typography>
                  <Typography
                    variant="inherit"
                    component="span"
                    sx={{ ...gradientText, fontSize: "30px", fontWeight: 600 }}
                  >
                    BXI ?
                  </Typography>
                </Fade>
              </Box>
              <Typography
                variant="inherit"
                component="span"
                sx={{ ...contentStyle, fontWeight: 500, marginBottom: "0" }}
              >
                BXI Barter Exchange of India
              </Typography>
              <Typography variant="inherit" component="span" sx={contentStyle}>
                is Business Barter Market Place of India.
              </Typography>

              <Typography sx={contentStyle}>
                Digital Marketplace where Organization / Brands Come together on
                BXI and Sell Buy Exchange with One Another on BARTER with the
                help of Barter Coins.
              </Typography>
              <Typography sx={contentStyle}>
                BXI is third party Record Keeper for this Transactions and helps
                to facilitate the Barter Transactions among the Registered
                Members on the Marketplace.
              </Typography>
              <Typography sx={{ ...contentStyle, fontWeight: 500 }}>
                Members here Sell what they have and Buy What they want and Pay
                By Products.
              </Typography>
              <Typography sx={{ ...contentStyle, mb: 1 }}>
                BXI onboards More and More Members as per Demand of the
                product's and services from Various Categories.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                mt: 10,
              }}
            >
              <Box
                sx={{
                  width: "80%",
                  height: "80%",
                  // clipPath: "polygon(-100% 0%, 100% -64%, 100% 64%, 58% 100%)",
                  transform: "rotate(90deg)",
                }}
              >
                <video
                  // controls
                  autoPlay
                  controlsList="nodownload"
                  src={
                    "https://bxi-development.s3.ap-south-1.amazonaws.com/BxiStatic/SampleVideo.mp4"
                  }
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "rotate(-90deg)",
                    borderRadius: "20px",
                    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* Brands Logo  */}
      <Box sx={{ marginBottom: "30px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <Fade top duration={1000}>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...headingStyle, fontWeight: 600 }}
            >
              Brands
            </Typography>
            <Typography
              variant="inherit"
              component="span"
              sx={{
                ...gradientText,
                fontSize: "30px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Active With BXI
            </Typography>
          </Fade>
        </Box>
        {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {imageUrls.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt="imageUrl" style={imageStyle} />
          ))}
        </Box> */}
        <TechStack Tech={Tech} />
        <ClientMarquee />
      </Box>
      <Box
        sx={{
          height: "230px",
          background: "#00AFDF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Fade top duration={1000}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: {
                xs: "25px",
                sm: "30px",
                md: "30px",
                xl: "30px",
                lg: "30px",
              },
              lineHeight: "72px",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            Do you own or Operate a business in
          </Typography>
        </Fade>
        {/* <Fade top duration={1000}> */}
        <Typography
          ref={typewriterRef}
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 650,
            fontSize: {
              xs: "30px",
              sm: "45px",
              md: "30px",
              xl: "30px",
              lg: "30px",
            },
            lineHeight: "40px",
            color: "#000000",
            textTransform: "uppercase",
          }}
        >
          Office Supply
        </Typography>
        {/* </Fade> */}
      </Box>
      <Box
        sx={{
          height: "280px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Fade top duration={1000}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "30px",
              lineHeight: "45px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              letterSpacing: "-1.62343px",
              color: "#00AFDF",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            “ Sell Buy Exchange on Barter “
          </Typography>
        </Fade>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "27px",
            lineHeight: "25px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            letterSpacing: "-1.62343px",
            color: "#121136",
            textTransform: "uppercase",
          }}
        >
          Pay By Products
        </Typography>
        <Button
          sx={{
            mt: 2,
            background: "#00AFDF",
            borderRadius: "31px",
            width: "250px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0px 8px 16px rgba(30, 30, 30, 0.5)",
            transform: "scale(1)",
            transition: "0.5s ease-in-out",
            "&:hover": {
              borderRadius: "30px",
              // border: "3px solid #000 ",
              background: "#00AFDF",
              // animation: `${buttonAnimation} 1s ease forwards`,
              transform: "scale(1.1)",
            },
          }}
          onClick={() => navigate("/login")}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 700,
              fontSize: "22px",
              lineHeight: "36px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              color: "#FFFFFF",
              textTransform: "none",
            }}
          >
            Join Now
          </Typography>
        </Button>
      </Box>
      <Box
        sx={{
          // height: "1000.53px",
          height: "95vh",
          background:
            "linear-gradient(180deg, #8272B5 0%, rgba(130, 114, 181, 0.52) 52.6%, #8272B5 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
        inView={inView1}
      >
        {/* <div className="Bounce_img"> */}
        {/* <Box
          component="img"
          src={landingarrowone}
          sx={{
            // width: "200.35px",
            // height: "200.35px",
            // transform: "rotate(45deg)",
            // border: "75px solid #B44EA1",
            position: "absolute",
            top: -320,
            left: 0,
            width: "320px",
          }}
        /> */}
        <animated.img
          src={landingarrowone}
          style={{
            ...springProps,
            position: "absolute",
            top: -320,
            width: "320px",
          }}
        />
        <animated.img
          src={landingarrow}
          style={{
            ...springPropss,
            position: "absolute",
            top: 200,
            right: 0,
            width: "320px",
          }}
        />

        {/* <motion.img
          ref={ref1}
          src={landingarrowone}
          style={{
            width: "auto",
            left: 150,
            top: -250,
            height: "820px",
            width: "820px",
            position: "absolute",
          }}
          initial={{
            x: inView1 && -480,
          }}
          animate={{
            x: inView1 && -400,
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeatDelay: 0,
          }}
        /> */}
        {/* </div> */}
        {/* <Box
          component="img"
          src={landingarrow}
          sx={{
            // width: "200.35px",
            // height: "200.35px",
            // transform: "rotate(45deg)",
            // border: "75px solid #156DB7",
            position: "absolute",
            top: 200,
            right: 0,
            width: "320px",
          }}
        /> */}
        {/* <img src={BxiPointer} alt="BxiPointer" style={{position:"absolute"}} /> */}
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Fade top duration={1000}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "30px",
                  lineHeight: "65px",
                  display: "flex",
                  alignItems: "center",
                  letterSpacing: "-1.62343px",
                  color: "#000000",
                  marginTop: "-125px",
                  // bgcolor:"red"
                }}
              >
                Our Honors
              </Typography>
            </Fade>
          </Box>
          <Box>
            <Carousel
              cards={cards}
              height="400px"
              width="500px"
              offset={2}
              showArrows={false}
            />
          </Box>
        </Box>
      </Box>
      {/* map  */}
      <Box>
        <Grid
          container
          spacing={2}
          sx={{
            py: "10px",
            // bgcolor:"red",
          }}
          inView={inView}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{
                width: "80%",
                maxWidth: "80%",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                marginLeft: "70px",
                marginTop: "40px",
              }}
            >
              <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={controls}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
              >
                <img
                  src={IndiaMap}
                  alt="IndiaMap"
                  style={{ width: "90%", height: "auto" }}
                />
              </motion.div>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box sx={{ marginTop: "130px" }}>
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Fade top duration={1000}>
                  <Typography
                    variant="inherit"
                    component="span"
                    sx={{ ...headingStyle, lineHeight: "44px" }}
                  >
                    Making
                  </Typography>
                  <Typography
                    variant="inherit"
                    component="span"
                    sx={{ ...gradientText, lineHeight: "44px" }}
                  >
                    A Difference
                  </Typography>
                </Fade>
              </Box>
              <Fade top duration={1000}>
                <Typography sx={gradientSubHeadTypo}>
                  Think Smarter , Let’s Barter
                </Typography>
              </Fade>
            </Box>
            <Box
              sx={{
                paddingRight: "80px",
                marginTop: "30px",
                display: "flex",
                justifyContent: "space-between",
              }}
              ref={ref}
            >
              <Box>
                <Box
                  sx={{
                    borderLeft: "4px solid #2264A1",
                    paddingLeft: "10px",
                    marginBottom: "80px",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    {/* <Typography sx={numbersDesign}>150</Typography> */}
                    <Typography sx={numbersDesign} id="count1"></Typography>
                    <Typography sx={{ ...numbersDesign, color: "#445FD2" }}>
                      +
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "17.6889px",
                      lineHeight: "18px",
                      display: "flex",
                      alignItems: "center",
                      color: "#2E2E2E",
                    }}
                  >
                    Happy customers
                  </Typography>
                </Box>

                <Box
                  sx={{ borderLeft: "4px solid #2264A1", paddingLeft: "10px" }}
                >
                  <Box sx={{ display: "flex" }}>
                    {/* <Typography sx={numbersDesign}>22</Typography> */}
                    <Typography sx={numbersDesign} id="count2"></Typography>
                    <Typography sx={{ ...numbersDesign, color: "#445FD2" }}>
                      +
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "17.6889px",
                      lineHeight: "18px",
                      display: "flex",
                      alignItems: "center",
                      color: "#2E2E2E",
                    }}
                  >
                    Cities
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box
                  sx={{
                    borderLeft: "4px solid #2264A1",
                    paddingLeft: "10px",
                    marginBottom: "80px",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    {/* <Typography sx={numbersDesign}>600</Typography> */}
                    <Typography sx={numbersDesign} id="count3"></Typography>
                    <Typography sx={{ ...numbersDesign, color: "#445FD2" }}>
                      +
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "19.6889px",
                      lineHeight: "18px",
                      display: "flex",
                      alignItems: "center",
                      color: "#2E2E2E",
                    }}
                  >
                    Transactions
                  </Typography>
                </Box>

                <Box
                  sx={{ borderLeft: "4px solid #2264A1", paddingLeft: "10px" }}
                >
                  <Box sx={{ display: "flex" }}>
                    {/* <Typography sx={numbersDesign}>12K</Typography> */}
                    <Typography sx={numbersDesign} id="count4"></Typography>
                    <Typography sx={{ ...numbersDesign, color: "#445FD2" }}>
                      +
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "17.6889px",
                      lineHeight: "18px",
                      display: "flex",
                      alignItems: "center",
                      color: "#2E2E2E",
                    }}
                  >
                    Products & Services
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* NEWSFEED  */}
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Fade top duration={1000}>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...headingStyle, lineHeight: "44px" }}
            >
              NEWSFEED
            </Typography>
            <Typography
              variant="inherit"
              component="span"
              sx={{ ...gradientText, lineHeight: "44px" }}
            >
              & BLOGS
            </Typography>
          </Fade>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: {
                xs: "16px",
                sm: "20px",
                md: "20px",
                lg: "20px",
                xl: "20px",
              },
              lineHeight: "14px",
              display: "flex",
              alignItems: "center",
              color: "#404040",
            }}
          >
            Insights and Tips from Barter Exchange of India
          </Typography>
        </Box>
        <Box sx={{ width: "85%", mx: "auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4}>
              <a
                href="https://barterexchangeofindia.blogspot.com/2023/05/top-10-benefits-of-bartering.html "
                target="_blank"
                alt="wtsp"
                style={{
                  color: "inherit",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "60px",
                  }}
                >
                  <img
                    src={Benefits_Of_Bartering}
                    alt="Benefits_Of_Bartering"
                    style={{
                      width: "85%",
                      maxWidth: "330px",
                      height: "auto",
                      width: "85%",
                      maxWidth: "330px",
                      height: "auto",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                </Box>
              </a>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography sx={newsFeedTypoStyle}>
                  Benefits of Bartering
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "60px",
                }}
              >
                <img
                  src={Future_Of_Barter}
                  alt="Future_Of_Barter"
                  style={{ width: "85%", maxWidth: "330px", height: "auto" }}
                />
              </Box> */}
              <a
                href="https://barterexchangeofindia.blogspot.com/2023/05/future-of-barter.html"
                target="_blank"
                alt="wtsp"
                style={{
                  color: "inherit",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "60px",
                  }}
                >
                  <img
                    src={Future_Of_Barter}
                    alt="Future_Of_Barter"
                    style={{
                      width: "85%",
                      maxWidth: "330px",
                      height: "auto",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                </Box>
              </a>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography sx={newsFeedTypoStyle}>Future of Barter</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <a
                href="https://barterexchangeofindia.blogspot.com/2023/05/barter-strategic-tool-for-new-economy.html"
                target="_blank"
                alt="wtsp"
                style={{
                  color: "inherit",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "60px",
                  }}
                >
                  <img
                    src={Implications_Of_Barter}
                    alt="Implications_Of_Barter"
                    style={{
                      width: "85%",
                      maxWidth: "330px",
                      height: "auto",
                      transition: "transform 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                </Box>
              </a>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography sx={newsFeedTypoStyle}>
                  Legal & Tax Implications of Barter Business in India
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* underline  */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "790px",
            height: "1px",
            background: "#D8D8D8",
            marginTop: "20px",
          }}
        />
      </Box>
      {/* contact details  */}
      <Box>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4}>
            <Box>
              <Box sx={ContactDetailsMainBox}>
                <AnimationOnImg>
                  <Box
                    sx={{
                      ...ContactDetailsSubBox,
                      "&:hover": {
                        animation: `${buttonAnimation} 1s ease forwards`,
                      },
                    }}
                  >
                    <CallIcon style={ContactDetailsIcon} />
                  </Box>
                </AnimationOnImg>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ ...newsFeedTypoStyle }}>
                  +91 22-49646776
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Box>
              <Box sx={ContactDetailsMainBox}>
                <AnimationOnImg>
                  <Box
                    sx={{
                      ...ContactDetailsSubBox,
                      "&:hover": {
                        animation: `${buttonAnimation} 1s ease forwards`,
                      },
                    }}
                  >
                    <PinDropIcon style={ContactDetailsIcon} />
                  </Box>
                </AnimationOnImg>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ ...newsFeedTypoStyle, width: "400px" }}>
                  501-Meadows Tower, Sahar Plaza , Sir M.V. Road, Andheri (E),
                  Mumbai 400059.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Box>
              <Box sx={ContactDetailsMainBox}>
             
                <AnimationOnImg>
                  <Box
                    sx={{
                      ...ContactDetailsSubBox,
                      "&:hover": {
                        animation: `${buttonAnimation} 1s ease forwards`,
                      },
                    }}
                  >
                    <EmailIcon style={ContactDetailsIcon} />
                  </Box>
                </AnimationOnImg>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{ ...newsFeedTypoStyle, textTransform: "none" }}
                >
                  business@bxiworld.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid> */}
      </Box>
    </>
  );
};
{
  /* onClick={openEmail} */
}
export default LandingPageBody;
const contentStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  color: "#2E2E2E",
  marginBottom: "20px",
};
const gradientText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xs: "30px",
    sm: "30px",
    md: "30px",
    lg: "30px",
    xl: "30px",
  },
  textTransform: "uppercase",
  lineHeight: "65px",
  display: "flex",
  alignItems: "center",
  letterSpacing: "-1.62343px",
  background:
    "linear-gradient(90deg, rgba(55, 93, 187, 1), rgba(7, 167, 247, 1))",
  // "linear-gradient(to right, rgba(191, 55, 131, 1), rgba(35, 98, 166, 1), rgba(29, 148, 198, 1))",
  // "linear-gradient(rgba(55, 93, 187, 1),rgba(7, 167, 247, 1))",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  textFillColor: "transparent",
};
const headingStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xs: "30px",
    sm: "30px",
    md: "30px",
    lg: "30px",
    xl: "30px",
  },
  lineHeight: "65px",
  display: "flex",
  alignItems: "center",
  letterSpacing: "-1.62343px",
  color: "#0D0E0E",
  marginRight: "10px",
  textTransform: "uppercase",
};
const gradientSubHeadTypo = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xs: "15px",
    sm: "18px",
    md: "18px",
    xl: "18px",
    lg: "18px",
  },
  lineHeight: "30px",
  display: "flex",
  alignItems: "center",
  color: "#494B7A",
  textTransform: "uppercase",
};
const imageStyle = {
  width: "95px",
  height: "50px",
  objectFit: "cover",
  margin: "10px",
};
const numbersDesign = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "40.2533px",
  // lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  color: "#2E2E2E",
};
const newsFeedTypoStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "16px",
  lineHeight: "29px",
  alignItems: "center",
  textAlign: "center",
  textTransform: "capitalize",
  color: "#000000",
  marginTop: "20px",
  width: "317.99px",
  height: "58px",
};
const ContactDetailsMainBox = {
  display: "flex",
  justifyContent: "center",
  marginTop: "60px",
  cursor: "pointer",
};
const ContactDetailsSubBox = {
  border: "3px solid #0296DC",
  width: "60.13px",
  height: "60.94px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.3s ease",
  ":hover": {
    // backgroundColor: "black",
  },
};
const ContactDetailsIcon = {
  width: "30.24px",
  height: "30.24px",
  color: "#0296DC",
};
const OnHoverTextStyle = {
  fontFamily: "Playfair Display",
  fontStyle: "Poppins ",
  fontWeight: 400,
  fontSize: "18px",
  lineHeight: "30px",
  color: "#000",
  Opacity: "0.8",
  mt: 2,
  textAlign: "justify",
};
