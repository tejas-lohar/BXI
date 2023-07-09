import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  Button,
  Stack,
  MenuItem,
  Menu,
} from "@mui/material";
import BreadCrumbHeader from "../components/Header/BreadCrumbHeader";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "../assets/search.svg";
import FilterListIcon from "@mui/icons-material/FilterList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import CompanyName from "../components/CompanyName";
import { styled, alpha } from "@mui/material/styles";
import CommaSeprator from "../components/CommaSeprator";

import BXICoin from "../assets/BXITokanSVG.svg";

const TransactionsTypes = [
  "Successful",
  "Failed",
  "All",
  "Category filter",
  "Client filter",
  "Date range",
];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const TransactionsPage = () => {
  const StyledPagination = styled(Pagination)({
    "& .MuiPagination-ul li:last-child": {
      marginLeft: "16px",
    },
    "& .MuiPagination-ul li:last-child button::before": {
      content: "'Last'",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "11px",
      lineHeight: "14px",
      color: "#445FD2",
      marginRight: "8px",
    },
    "& .MuiPagination-ul li:first-child": {
      marginRight: "16px",
    },
    "& .MuiPagination-ul li:first-child button::after": {
      content: "'First'",
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 800,
      fontSize: "11px",
      lineHeight: "14px",
      color: "#445FD2",
      marginLeft: "8px",
    },
    "& .MuiPaginationItem-icon": {
      color: "#445FD2",
      fontWeight: 800,
    },
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [walletData, setWalletData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openfl = Boolean(anchorEl);
  const handleClickfl = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosefl = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await axios.get("transactions", {
          withCredentials: true,
        });
        setWalletData(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWalletData();
  }, []);

  useEffect(() => {
    const performSearch = () => {
      const filteredResults = walletData.filter((data) =>
        data?.sellerCompanyName?.seller
          ?.toLowerCase()
          .includes(searchQuery?.toLowerCase())
      );
      setSearchResults(filteredResults);
    };

    performSearch();
  }, [searchQuery, walletData]);

  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return searchResults.slice(startIndex, endIndex);
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
      <BreadCrumbHeader MainText={"Transactions"} />
      <Grid container>
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "17px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: "2rem",
          }}
          gap={2}
        >
          <Grid
            container
            sx={{ display: "flex", flexdirection: "row" }}
            gap={2}
          >
            <TextField
              sx={searchbox}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search anything on Transactions"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      component="img"
                      src={SearchIcon}
                      sx={{
                        height: "auto",
                        width: {
                          xl: "20px",
                          lg: "20px",
                          md: "20px",
                          sm: "15px",
                          xs: "15px",
                        },
                      }}
                      alt="Search"
                    />
                  </InputAdornment>
                ),
              }}
            />
            {/* <Button variant="outlined" sx={filterbutton}>
              <FilterListIcon />
              <Typography
                sx={{
                  fontFamily: "Kumbh Sans",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "1.4rem",
                  color: "#1B212D",
                  textTransform: "none",
                  m: 1,
                }}
              >
                Filters
              </Typography>
            </Button> */}
            <Button
              id="demo-customized-button"
              aria-controls={openfl ? "demo-customized-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openfl ? "true" : undefined}
              // variant="contained"
              disableElevation
              onClick={handleClickfl}
              variant="outlined"
              sx={{
                ...filterbutton,
                "&:hover": {
                  color: "#445FD2",
                },
                color: openfl ? "#445FD2" : "#1B212D",
                border: openfl ? "1px solid #445FD2" : "1px solid #F5F5F5",
              }}
              startIcon={<FilterListIcon />}
            >
              <Typography
                sx={{
                  fontFamily: "Kumbh Sans",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "1.4rem",
                  textTransform: "none",
                  m: 1,
                }}
              >
                Filters
              </Typography>
            </Button>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={openfl}
              onClose={handleClosefl}
            >
              {TransactionsTypes?.map((res, idx) => {
                return (
                  <MenuItem
                    value={res}
                    key={idx}
                    onClick={() => {
                      handleClosefl();
                    }}
                  >
                    {res}
                  </MenuItem>
                );
              })}
            </StyledMenu>
          </Grid>
          <TableContainer>
            <Table sx={{ minWidth: 650, "& td": { border: 0 } }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ ...tablehead, textAlign: "left", width: "20px" }}
                  >
                    No
                  </TableCell>
                  <TableCell sx={{ ...tablehead, textAlign: "left" }}>
                    NAME/BUSINESS
                  </TableCell>
                  <TableCell sx={tablehead}>AMOUNT</TableCell>
                  <TableCell sx={tablehead}>DATE</TableCell>
                  <TableCell sx={tablehead}>STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getPaginatedData().map((data, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell
                        align="left"
                        style={{
                          width: "20px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Kumbh Sans",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: 14,
                            color: "#1B212D",
                          }}
                        >
                          {idx + 1}
                        </Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Box
                          sx={{ display: "flex", flexDirection: "row" }}
                          gap={2}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontFamily: "Kumbh Sans",
                                fontStyle: "normal",
                                fontWeight: 500,
                                fontSize: 14,
                                color: "#1B212D",
                              }}
                            >
                              <CompanyName
                                CompanyId={data.walletTo}
                                CompanyName={data?.sellerCompanyName?.seller}
                              />
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            fontFamily: "Kumbh Sans",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: "14px",
                            color: "#1B212D",
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            gap: "10px",
                          }}
                        >
                          <CommaSeprator Price={data?.amount} />{" "}
                          <img
                            src={BXICoin}
                            alt="currency"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            fontFamily: "Kumbh Sans",
                            fontStyle: "normal",
                            fontWeight: 500,
                            fontSize: 14,
                            color: "#1B212D",
                          }}
                        >
                          {new Date(data?.createdAt).toDateString()}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Kumbh Sans",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: 13,
                            color: "#929EAE",
                          }}
                        >
                          at 8:00 PM
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            fontFamily: "Kumbh Sans",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: 13,
                            color: "#929EAE",
                          }}
                        >
                          {data?.status}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
        <Stack spacing={2}>
          <StyledPagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </Box>
    </Paper>
  );
};

export default TransactionsPage;

const searchbox = {
  width: {
    xl: "90%",
    lg: "85%",
    md: "80%",
    sm: "75%",
    xs: "50%",
  },
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 400,
  background: "#F8F8F8",
  borderRadius: "15px",
  "& fieldset": { border: "none" },
};

const filterbutton = {
  borderRadius: "10px",
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "1.4rem",
  textTransform: "none",
  cursor: "pointer",
  // "&:hover": {
  //   color: "#445FD2",
  // },
};

const tablehead = {
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "1.2rem",
  textAlign: "center",
  color: "#929EAE",
};
