import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import barterLogo from "../../assets/BXI_LOGO.png";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    background: '#FAFBFC',
    border: '1px solid #445FD2',
    borderRadius: '6px'
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '70ch',
      },
    },
  }));

const pages = ['Home', 'About', 'Marketplace','Contact Us'];

const AdminHeader = () =>{
    return (
        <box className = "main-box">
            <AppBar position="static" sx= {{backgroundColor: "#FDFDFD",color:"#6B7A99",boxShadow:0,borderBottom:'2px solid #F0F0F0'}} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                <Box sx={{ width: "100px" }}>
                  <img
                    src={barterLogo}
                    alt="img"
                    style={{ height: "auto", width: "50px" }}
                  />
                </Box>
                <Typography sx = {{mr: 5,fontFamily: 'Poppins',fontWeight: 700,color: '#6B7A99',textDecoration: 'none',fontSize: '16px'}}>
                    Admin Panel
                </Typography>
                <Search>
                    <SearchIconWrapper>
                    <RefreshIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Quick Find"
                        inputProps={{ 'aria-label': 'refresh' }}
                        />
                </Search>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        sx={{ my: 2, color: '#6B7A99',fontSize: '10px', display: 'block',fontFamily: 'Poppins', fontWeight: 400,}}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>
                </Toolbar>
            </Container>
            </AppBar>
        </box>
      );
}
export default AdminHeader;