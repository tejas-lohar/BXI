import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import LandingPageBody from "./LandingPageBody";
import { Box } from "@mui/material";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";

const HomePage = () => {
  const ref = useRef(null);
  const Location = useLocation();
  const navigate = useNavigate();
  console.log("location", Location?.pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => {
      if (window.scrollY === 0) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (Location?.state === "ABClick") {
      return ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  const handleClick = () => {
    return ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const HandleFlick = () => {
    console.log("LocationTT");
    navigate("/");
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <>
        <Box
          sx={{
            marginTop: "64px",
          }}
        >
          <LandingPageBody scollRef={ref} />
        </Box>
      </>
      <Box>
        <Footer handleClick={handleClick} />
      </Box>
    </>
  );
};

export default HomePage;
