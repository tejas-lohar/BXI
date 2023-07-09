import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import HowitworksPageBody from "./HowitworksPageBody";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";

const HowitworksPage = () => {
  const ref = useRef(null);
  const Location = useLocation();
  const navigate = useNavigate();
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
  const HandleFlick = () => {
    console.log("LocationTT");
    navigate("/", {
      state: "ABClick",
    });
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box
        sx={{
          marginTop: "64px",
        }}
      >
        <HowitworksPageBody />
      </Box>
      <Box>
        <Footer HandleFlick={HandleFlick} />
      </Box>
    </>
  );
};

export default HowitworksPage;
