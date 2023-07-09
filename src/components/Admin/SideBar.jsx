import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { adminstyles } from "../common/voucherTemplates/styles/adminStyles";
import LeaderboardIcon from "../../assets/LeaderboardIcon.png";
import EventNoteIcon  from "../../assets/EventNoteIcon.png";
import HomeIcon  from "../../assets/HomeIcon.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";

const drawerWidth = 240;

const SideBar = () =>{
    const classes = adminstyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const RouteArray = [
      {
        id: 1,
        name: "Home",
        logoImage: HomeIcon,
        activeLogo: "",
        linkUrl: "",
        textColor : "#fffff"
      },
      {
        id: 2,
        name: "Explore",
        logoImage: EventNoteIcon,
        activeLogo: "",
        linkUrl: "Explore",
        textColor : "#7D8FB3"
      },
      {
        id: 3,
        name: "Login / Sign Up",
        logoImage: EventNoteIcon,
        activeLogo: "",
        linkUrl: "LoginSignup",
        textColor : "#7D8FB3"
      },
      {
        id: 4,
        name: "User & Company",
        logoImage: EventNoteIcon,
        activeLogo: "",
        linkUrl: "UserAndCompany",
        textColor : "#7D8FB3"
      },
      {
        id: 5,
        name: "Analytics",
        logoImage: LeaderboardIcon,
        activeLogo: "",
        linkUrl: "Analytics",
        textColor : "#7D8FB3"
      },
      {
        id: 6,
        name: "Orders",
        logoImage: EventNoteIcon,
        activeLogo: "",
        linkUrl: "Orders",
        textColor : "#7D8FB3"
      },
      {
        id: 7,
        name: "Chat & Query",
        logoImage: EventNoteIcon,
        activeLogo: "",
        linkUrl: "ChatAndQuery",
        textColor : "#7D8FB3"
      },
      {
        id: 8,
        name: "Genie",
        logoImage: EventNoteIcon,
        activeLogo: "",
        linkUrl: "Genie",
        textColor : "#7D8FB3"
      },
      {
        id: 9,
        name: "Add Category",
        logoImage: EventNoteIcon,
        activeLogo: "",
        linkUrl: "AddCategory",
        textColor : "#7D8FB3"
      },
      {
        id: 10,
        name: "Add Member",
        logoImage: EventNoteIcon,
        activeLogo: "",
        linkUrl: "AddMember",
        textColor : "#7D8FB3"
      },
      {
        id: 11,
        name: "Member Directory",
        logoImage: EventNoteIcon,
        activeLogo: "",
        linkUrl: "MemberDirectory",
        textColor : "#7D8FB3"
      },
      {
        id: 12,
        name: "Recycle Bin",
        logoImage: EventNoteIcon,
        activeLogo: "",
        linkUrl: "RecycleBin",
        textColor : "#7D8FB3"
      }
    ];
    return (
      <div>
          <AdminHeader></AdminHeader>
          <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Drawer PaperProps={{
              sx: {
                position: "inherit",
                borderRight: 0,
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }
            }} variant="permanent" anchor="left">
            <List>
              {RouteArray.map((res, index) => (
                <ListItem 
                    // className={res.name === 'Home' ? classes.homebtn:''}
                    key={res.name} 
                    disablePadding
                    component = {Link}
                    to = {res.linkUrl}>
                    <ListItemButton>
                      <ListItemIcon>
                          <img src={res.logoImage} width={"20px"} height="20px" />
                      </ListItemIcon>
                      <ListItemText  className={classes.sidebartext} sx={{ color : res.textColor}} primary={res.name} />
                    </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box  component="main"  sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }} >
            <Toolbar />
            <Outlet/>
          </Box>
        </Box>
      </div>
    )
}
export default SideBar;

