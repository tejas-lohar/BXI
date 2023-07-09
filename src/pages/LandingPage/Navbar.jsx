import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import BxiLogo from "../../assets/BXI_LOGO.png";
import Arrow from "../../assets/LoginArrow.svg";
import { useNavigate } from "react-router-dom/dist";
import { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import DrawerComp from "./DrawerComp";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = useState("1");
  const [border, SetBorder] = useState(false);
  const currentLocation = window.location.pathname;
  // console.log("currentlocation", currentLocation === "/");
  const checkactive = () => {
    if (currentLocation.includes("home")) {
      SetBorder(true);
    } else if (currentLocation.includes("howitworks")) {
      SetBorder(true);
    } else {
      SetBorder(false);
    }
  };
  useEffect(() => {
    checkactive();
  });
  const pages = [
    { name: "Home", link: "/", id: "1", text: "/" },
    { name: "How It Works", link: "/howitworks", id: "2", text: "/howitworks" },
  ];
  const links = ["/home", "/howitworks"];
  // howitworks;
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          background: "#fff",
          // boxShadow: "none",
          boxShadow: "0px 8px 16px rgba(220, 220, 220, 0.5)",
          // height: "auto",
          // p: 1,
        }}
      >
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          {/* <Box
            sx={{ cursor: "pointer", display: "flex" }}
            onClick={() => navigate("/")}
          >
            <img
              src={BxiLogo}
              alt="Logo"
              width={50}
              // height={50}
              sx={{
                marginRight: "16px",
              }}
            />
            <Box>
              <Typography sx={{ color: "#000" }}>
                Barter Exchange of india
              </Typography>
            </Box>
          </Box> */}
          <Box
            sx={{
              // bgcolor: "red",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "end",
              flexDirection: "row",
              gap: "8px",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <img src={BxiLogo} alt="" width="45px" />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                textAlign: "center",
                color: "#000",
                mb: "-4px",
                textTransform: "uppercase",
              }}
            >
              Barter Exchange of India
            </Typography>
          </Box>

          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "right",
                  width: "22%",
                  marginLeft: "auto",
                }}
              >
                <TabContext
                  textColor="#252525"
                  value={value}
                  onChange={(event, newValue) => setValue(newValue)}
                  indicatorColor="primary"
                >
                  {pages.map((page, index) => (
                    <Tab
                      key={index}
                      label={page.name}
                      value={page.id}
                      index={page.id}
                      sx={{
                        ...NavbarText,
                        color: "#000",
                        opacity: 1,
                        borderBottom:
                          currentLocation === page.text
                            ? "3px solid #375DBB"
                            : "3px solid transparent",
                        "&:hover": {
                          // background: "red",
                          color: "#00000",
                          opacity: 1,
                          transition: " ease 1s",
                          borderBottom: "3px solid #375DBB",
                          fontWeight: 600,
                        },
                      }}
                      onClick={() => navigate(page.link)}
                      disableRipple
                    />
                  ))}
                </TabContext>
              </Box>
              {/* <Box
                sx={{
                  ...NavbarText,
                  borderRadius: "17px",
                  border: "1px solid #252525",
                  padding: "12px",
                  width: "180px",
                  height: "18px",
                  textAlign: "center",
                  lineHeight: "10px",
                  gap: "8px",
                  mt: 0.3,
                  "&:hover": {
                    background:
                      "linear-gradient(75deg, #375DBB 29.17%, #00B1FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                    backgroundColor: "#000",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Login / Sign Up
                <Box
                  component="img"
                  src={Arrow}
                  alt="Arrow"
                  sx={{
                    height: "auto",
                    width: "auto",
                  }}
                />
              </Box> */}
              <Box
                sx={{
                  ...NavbarText,
                  borderRadius: "17px",
                  border: "1px solid #252525",
                  padding: "12px",
                  width: "180px",
                  height: "18px",
                  textAlign: "center",
                  lineHeight: "10px",
                  gap: "8px",
                  mt: 0.3,
                  "&:hover": {
                    // background:
                    //   "linear-gradient(75deg, #375DBB 29.17%, #00B1FF 100%)",
                    // WebkitBackgroundClip: "text",
                    // WebkitTextFillColor: "transparent",
                    // backgroundClip: "text",
                    // textFillColor: "transparent",
                    // backgroundColor: "#000",
                    background: "#000",
                    color: "#fff",
                  },
                }}
                onClick={() => navigate("/login")}
              >
                Login / Sign Up
                <Box
                  component="img"
                  src={Arrow}
                  alt="Arrow"
                  sx={{
                    height: "auto",
                    width: "auto",
                    filter: "invert(100%)", // Change the icon color to white
                  }}
                />
              </Box>
            </>
          )}
          {/* <TrendingFlatIcon /> */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

const NavbarText = {
  marginLeft: "16px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#252525",
  cursor: "pointer",
};
