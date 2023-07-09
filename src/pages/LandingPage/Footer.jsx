import { Box, Grid, Typography, Button } from "@mui/material";
import React, { useRef } from "react";
import Shoe from "../../assets/shoe5.jfif";
import { useNavigate, useLocation } from "react-router-dom/dist";
import BxiWhiteLogo from "../../assets/HomePageImages/BXI_WHITE_LOGO.png";
import callfooter from "../../assets/HomePageImages/callfooter.svg";
import messagefooter from "../../assets/HomePageImages/messagefooter.svg";
import IRTA_LOGO from "../../assets/HomePageImages/IRTA_LOGO.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import fb from "../../assets/HomePageImages/fb.svg";
import { keyframes } from "@emotion/react";
const Footer = (props) => {
  console.log("props", props);
  const navigate = useNavigate();
  const Location = useLocation();
  console.log("Location", Location);
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
      {/* <Box
        sx={{
          background: "#156DB6",
          marginTop: "10rem",
          padding: "0.5rem",
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={2.5}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box sx={{}}>
                <img src={BxiWhiteLogo} width={50} alt="BxiWhiteLogo" />
              </Box>

              <Typography
                sx={{
                  ...FooterText,
                  fontWeight: 550,
                  fontSize: "16px",
                  lineHeight: "25px",
                  marginTop: "5px",
                }}
              >
                Pay By Products!
              </Typography>
              <Button
                sx={{
                  background: "#FFFFFF",
                  borderRadius: "32px",
                  width: "112.89px",
                  height: "20.63px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "5px",
                  boxShadow: "0px 8px 16px rgba(30, 30, 30, 0.5)",
                  transform: "scale(1)",
                  transition: "0.5s ease-in-out",
                  "&:hover": {
                    borderRadius: "32px",
                    // border: "2px solid #000 ",
                    background: "#fff",
                    // animation: `${buttonAnimation} 1s ease forwards`,
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
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
                    fontSize: "9.3315px",
                    lineHeight: "17px",
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    textTransform: "uppercase",
                    color: "#121136",
                  }}
                >
                  Join Now
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={1.8} xl={2.5} lg={2.5} sx={{ mt: 0.5 }}>
            <Box>
              <Typography
                sx={{
                  ...FooterText,
                  fontWeight: 550,
                  fontSize: "20px",
                  lineHeight: "35px",
                }}
              >
                Helpful Links
              </Typography>
              <Typography sx={FooterText}>How we work</Typography>
              <Box
                onClick={
                  Location?.pathname === "/howitworks"
                    ? props.HandleFlick
                    : props.handleClick
                }
                sx={{
                  ...FooterText,
                  fontWeight: 400,
                  lineHeight: "35px",
                  cursor: "pointer",
                }}
              >
                About BXI
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3.2} xl={3} lg={3} sx={{ mt: 0.5 }}>
            <Box>
              <Typography
                sx={{
                  ...FooterText,
                  fontWeight: 550,
                  fontSize: "20px",
                  lineHeight: "35px",
                }}
              >
                Barter Exchange of India
              </Typography>
              <Typography sx={FooterText}>PAN: AAXFB2929C </Typography>
              <Typography sx={FooterText}>GST: 27AAXFB2929C1ZA </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4.5} xl={4} lg={4} sx={{ mt: 0.5 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  ...FooterText,
                  fontWeight: 550,
                  fontSize: "18px",
                  lineHeight: "35px",
                }}
              >
                “Member of Global Barter Council”
              </Typography>
              <Box sx={{ marginTop: "6px" }}>
                <img
                  src={IRTA_LOGO}
                  style={{ width: "166.68px", height: "66.88px" }}
                  alt="imageAlt"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box> */}
      {/* <Box
        sx={{
          padding: "20px 0",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography sx={textDesign}>
                @2023 Barter Exchange of India. All Rights Reserved.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Box
                  sx={{
                    ...socialIcons,
                  }}
                >
                  <a
                    href=" https://www.facebook.com/bxi.world?mibextid=ZbWKwL"
                    target="_blank"
                    alt="wtsp"
                    style={{
                      color: "inherit",
                      marginTop: "3px",
                    }}
                  >
                    <Box>
                      <FacebookIcon sx={{ color: "fff", background: "fff" }} />
                    </Box>
                  </a>
                </Box>
                <Box sx={socialIcons}>
                  <a
                    href="https://instagram.com/bxi.world?igshid=MzRlODBiNWFlZA== "
                    target="_blank"
                    alt="wtsp"
                    style={{
                      color: "inherit",
                      marginTop: "3px",
                    }}
                  >
                    <Box>
                      <InstagramIcon sx={{ color: "fff", background: "fff" }} />
                    </Box>
                  </a>
                </Box>
                <Box sx={socialIcons}>
                  <a
                    href=" https://www.linkedin.com/company/barter-exchange-of-india/"
                    target="_blank"
                    alt="wtsp"
                    style={{
                      color: "inherit",
                      marginTop: "3px",
                    }}
                  >
                    <Box>
                      <LinkedInIcon sx={{ color: "fff", background: "fff" }} />
                    </Box>
                  </a>
                </Box>
                <Box sx={socialIcons}>
                  <a
                    href="https://twitter.com/bximarketplace?s=20"
                    target="_blank"
                    alt="wtsp"
                    style={{
                      color: "inherit",
                      marginTop: "3px",
                    }}
                  >
                    <Box>
                      <TwitterIcon sx={{ color: "fff", background: "fff" }} />
                    </Box>
                  </a>
                </Box>
                <Box sx={socialIcons}>
                  <a
                    href="https://www.youtube.com/@bxi.world_"
                    target="_blank"
                    alt="wtsp"
                    style={{
                      color: "inherit",
                      marginTop: "3px",
                    }}
                  >
                    <Box>
                      <YouTubeIcon sx={{ color: "fff", background: "fff" }} />
                    </Box>
                  </a>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography sx={textDesign}>
                Privacy Policy | Terms & Conditions
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box> */}

      <Grid
        container
        sx={{
          background: "rgba(21, 109, 182, 1)",
          p: 1,
        }}
      >
        <Grid
          item
          xl={3}
          lg={3}
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", width: "90%", mx: "auto" }}>
            <img src={BxiWhiteLogo} width={50} alt="BxiWhiteLogo" />
          </Box>
          <Box>
            <Typography
              sx={{
                ...FooterText,
                width: "90%",
                mx: "auto",
                lineHeight: "60px",
              }}
            >
              Address
            </Typography>
            <Typography sx={{ ...textDesign, width: "90%", mx: "auto" }}>
              501- Meadows Tower, Sahar Plaza , sir M.V. Road, Andheri (E),
              Mumbai 400059.
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                ...FooterText,
                width: "90%",
                mx: "auto",
                lineHeight: "60px",
              }}
            >
              Contact Us
            </Typography>
            <Box
              sx={{ display: "flex", width: "95%", mx: "auto", gap: "10px" }}
            >
              <img
                src={callfooter}
                alt=""
                style={{ width: "30px", height: "auto" }}
              />
              <Typography sx={{ ...textDesign, mt: 0.5 }}>
                +91 22-49646776
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", width: "95%", mx: "auto", gap: "10px" }}
            >
              <img
                src={messagefooter}
                alt=""
                style={{ width: "30px", height: "auto" }}
              />
              <Typography sx={{ ...textDesign, mt: 0.7 }}>
                business@bxiworld.com
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={3} lg={3}>
          <Box sx={{ mt: 5 }}>
            <Typography sx={{ ...FooterText, textAlign: "center" }}>
              Helpful Links
            </Typography>
            <Box
              onClick={
                Location?.pathname === "/howitworks"
                  ? props.HandleFlick
                  : props.handleClick
              }
              sx={{
                ...textDesign,
                cursor: "pointer",
                width: "30%",
                mx: "auto",
                lineHeight: "25px",
              }}
            >
              About US
            </Box>
          </Box>
          <Typography
            sx={{ ...textDesign, width: "30%", mx: "auto", lineHeight: "25px" }}
          >
            How we work
          </Typography>
          <Typography
            sx={{ ...textDesign, width: "30%", mx: "auto", lineHeight: "25px" }}
          >
            Blog
          </Typography>
          <Typography
            sx={{ ...textDesign, width: "30%", mx: "auto", lineHeight: "25px" }}
          >
            Testimonials
          </Typography>
          <Typography
            sx={{ ...textDesign, width: "30%", mx: "auto", lineHeight: "25px" }}
          >
            Terms & Conditions
          </Typography>
          <Typography
            sx={{ ...textDesign, width: "30%", mx: "auto", lineHeight: "25px" }}
          >
            Privacy Policy
          </Typography>
        </Grid>
        <Grid item xl={3} lg={3}>
          <Box sx={{ mt: 5 }}>
            <Typography sx={{ ...FooterText, textAlign: "center" }}>
              Barter Exchange of India{" "}
            </Typography>
            <Typography
              sx={{
                ...textDesign,
                width: "60%",
                mx: "auto",
                lineHeight: "25px",
              }}
            >
              PAN: AAXFB2929C
            </Typography>
            <Typography
              sx={{
                ...textDesign,
                width: "60%",
                mx: "auto",
                lineHeight: "25px",
              }}
            >
              GST: 27AAXFB2929C1ZA
            </Typography>
          </Box>
        </Grid>
        <Grid item xl={3} lg={3}>
          <Box sx={{ mt: 5 }}>
            <Typography sx={{ ...FooterText, textAlign: "center" }}>
              “Member of Global Barter Council”
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                mt: 2,
              }}
            >
              <img
                src={IRTA_LOGO}
                style={{ width: "166.68px", height: "66.88px" }}
                alt="imageAlt"
              />
            </Box>
          </Box>
        </Grid>
        <Box
          sx={{
            borderBottom: "1px solid #fff",
            width: "98%",
            mx: "auto",
            mt: 1,
          }}
        ></Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "80%",
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Box
                sx={{
                  ...socialIcons,
                }}
              >
                <a
                  href=" https://www.facebook.com/bxi.world?mibextid=ZbWKwL"
                  target="_blank"
                  alt="wtsp"
                  style={{
                    color: "inherit",
                    marginTop: "3px",
                  }}
                >
                  <Box>
                    <FacebookIcon sx={{ color: "fff", background: "fff" }} />
                  </Box>
                </a>
              </Box>
              <Box sx={socialIcons}>
                <a
                  href="https://instagram.com/bxi.world?igshid=MzRlODBiNWFlZA== "
                  target="_blank"
                  alt="wtsp"
                  style={{
                    color: "inherit",
                    marginTop: "3px",
                  }}
                >
                  <Box>
                    <InstagramIcon sx={{ color: "fff", background: "fff" }} />
                  </Box>
                </a>
              </Box>
              <Box sx={socialIcons}>
                <a
                  href=" https://www.linkedin.com/company/barter-exchange-of-india/"
                  target="_blank"
                  alt="wtsp"
                  style={{
                    color: "inherit",
                    marginTop: "3px",
                  }}
                >
                  <Box>
                    <LinkedInIcon sx={{ color: "fff", background: "fff" }} />
                  </Box>
                </a>
              </Box>
              <Box sx={socialIcons}>
                <a
                  href="https://twitter.com/bximarketplace?s=20"
                  target="_blank"
                  alt="wtsp"
                  style={{
                    color: "inherit",
                    marginTop: "3px",
                  }}
                >
                  <Box>
                    <TwitterIcon sx={{ color: "fff", background: "fff" }} />
                  </Box>
                </a>
              </Box>
              <Box sx={socialIcons}>
                <a
                  href="https://www.youtube.com/@bxi.world_"
                  target="_blank"
                  alt="wtsp"
                  style={{
                    color: "inherit",
                    marginTop: "3px",
                  }}
                >
                  <Box>
                    <YouTubeIcon sx={{ color: "fff", background: "fff" }} />
                  </Box>
                </a>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "60%",
            }}
          >
            <Typography
              sx={{
                ...textDesign,
                textAlign: "right",
                fontSize: "14px",
                mt: 1,
              }}
            >
              @2023 Barter Exchange of India. All Rights Reserved.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Footer;
const FooterText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "35px",
  textAlign: "left",
  color: "#FFFFFF",
};
const socialIcons = {
  width: "32.39px",
  height: "32.39px",
  background: " #fff",
  borderRadius: "50%",
  color: "#156DB6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    background: "#000",
    transform: "ease 1s",
  },
};
const textDesign = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "18px",
  color: "#fff",
};
