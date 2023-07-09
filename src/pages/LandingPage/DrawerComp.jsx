import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom/dist";

const DrawerComp = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const pages = ["Home", "How It Works", "Login", "Sign Up"];
  const handleNavigation = (page) => {
    if (page === "Home") navigate("/homepage");
    else if (page === "How It Works") navigate("/howitworks");
    else if (page === "Login") navigate("/homepage");
    else if (page === "Sign Up") navigate("/homepage");
  };
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {pages.map((page, index) => (
            <ListItemButton
              onClick={() => {
                setOpenDrawer(false);
                handleNavigation(page);
              }}
              key={index}
            >
              <ListItemIcon>
                <ListItemText
                  primary={page}
                  primaryTypographyProps={{
                    sx: { ...NavbarText, color: "black" },
                  }}
                />
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "black", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon sx={{ fontSize: "3rem" }} />
      </IconButton>
    </>
  );
};

export default DrawerComp;
const NavbarText = {
  marginLeft: "16px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  textAlign: "right",
  color: "#252525",
  cursor: "pointer",
};
