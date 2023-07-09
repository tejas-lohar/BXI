import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  Button,
  Modal,
  InputLabel,
  MenuItem,
  Menu,
  FormControl,
  Select,
  Stack,
  Pagination,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import SearchIcon from "../../assets/search.svg";
import FilterListIcon from "@mui/icons-material/FilterList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Avatar from "@mui/material/Avatar";
import { useGetInvoices } from "../../Hooks/Invoices/useGetInvoices.js";
import CompanyName from "../../components/CompanyName";
import { useNavigate } from "react-router-dom";
import getAllInvoices from "../../redux/action/invoices";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageLoaderBottom from "../../components/LoadingButton/PageLoaderBottom";
import { styled, alpha } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import PageLoader from "../../components/LoadingButton/PageLoader";

const InvoiceTypes = [
  "Proforma",
  "Final",
  "Pickrr",
  "BXI",
  "OrderSummary",
  "MembershipInvoice",
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

const InvoicePage = () => {
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

  const [currentPage, setCurrentPage] = React.useState(1);
  const [invoice, setInvoice] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [purchase, setPurchase] = React.useState(false);
  const [sell, setSell] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [loadingInvoice, setLoadingInvoice] = React.useState(true);
  const dispatch = useDispatch();
  const { invoices, loading } = useSelector((state) => state.invoices);
  let paginationCount = invoices?.finalCount;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openfl = Boolean(anchorEl);
  const handleClickfl = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosefl = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setInvoice(event.target.value);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const {
    data: invoicesData,
    isLoading: invoicesLoading,
    isError: invoicesError,
  } = useGetInvoices();

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/home/invoice/` + id);
  };

  useEffect(() => {
    dispatch(getAllInvoices(search, sell, purchase, invoice));
  }, [dispatch, search, sell, purchase, invoice]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingInvoice(false);
    }, 3000); // Delay in milliseconds

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <>
      <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <BreadCrumbHeader MainText={"Invoice"} />
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
              <Button
                variant="outlined"
                sx={{
                  ...filterbutton,
                  color: purchase ? "#445FD2" : "#1B212D",
                  border: purchase ? "1px solid #445FD2" : "1px solid #F5F5F5",
                }}
                onClick={() => {
                  setPurchase(true);
                  setSell(false);
                }}
              >
                Purchase
                {/* {purchase ? "True" : "False"} */}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  ...filterbutton,
                  color: sell ? "#445FD2" : "#1B212D",
                  border: sell ? "1px solid #445FD2" : "1px solid #F5F5F5",
                }}
                onClick={() => {
                  setPurchase(false);
                  setSell(true);
                }}
              >
                Sell
                {/* {sell ? "True" : "False"} */}
              </Button>
              <TextField
                sx={searchbox}
                placeholder="Search invoices"
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
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {/* <Button
                variant="outlined"
                sx={filterbutton}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                <FilterListIcon /> */}
              {/* <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  // open={open}
                  // onClose={handleClose}
                  // onOpen={handleOpen}
                  // value={invoice}
                  label="Age"
                  onChange={handleChange}
                  defaultValue="Proforma"
                >
                  {InvoiceTypes?.map((res, idx) => {
                    return (
                      <MenuItem
                        value={res}
                        key={idx}
                        onClick={() => {
                          if (invoice.includes(res.text)) {
                            setInvoice(
                              invoice.filter((item) => item !== res.text)
                            );
                          } else {
                            setInvoice([...invoice, res.text]);
                          }
                        }}
                      >
                        {res}
                      </MenuItem>
                    );
                  })}
                </Select> */}

              {/* <Typography
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
                {InvoiceTypes?.map((res, idx) => {
                  return (
                    <MenuItem
                      value={res}
                      key={idx}
                      onClick={() => {
                        if (invoice.includes(res.text)) {
                          setInvoice(
                            invoice.filter((item) => item !== res.text)
                          );
                          handleClosefl();
                        } else {
                          setInvoice([...invoice, res.text]);
                          handleClosefl();
                        }
                      }}
                    >
                      {res}
                    </MenuItem>
                  );
                })}
              </StyledMenu>
            </Grid>
            {loading === true ? (
              <Paper
                sx={{
                  width: "100%",
                  height: "50vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  backgroundColor: "transparent",
                  zIndex: 1000,
                }}
                elevation={0}
              >
                <CircularProgress
                  disableShrink
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                    height: "10%",
                    width: "15%",
                  }}
                />
              </Paper>
            ) : (
              <TableContainer>
                <Table sx={{ minWidth: 650, "& td": { border: 0 } }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={tablehead}>
                        NAME/CLIENT
                      </TableCell>
                      <TableCell align="left" sx={tablehead}>
                        DATE
                      </TableCell>
                      <TableCell align="left" sx={tablehead}>
                        QUANTITY
                      </TableCell>
                      <TableCell align="left" sx={tablehead}>
                        AMOUNT
                      </TableCell>
                      <TableCell align="left" sx={tablehead}>
                        Tax
                      </TableCell>
                      <TableCell align="left" sx={tablehead}>
                        STATUS
                      </TableCell>
                      <TableCell align="left" sx={tablehead}>
                        ACTION
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices?.Data?.map((el, idx) => {
                      console.log("sfdfgdhdhvfghu", el);
                      return (
                        <>
                          <TableRow>
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
                                      CompanyId={
                                        el?.SellerDetails?.SellerCompanyName
                                      }
                                      CompanyName={
                                        el?.SellerDetails?.SellerCompanyName
                                      }
                                    />
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                sx={{
                                  fontFamily: "Kumbh Sans",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  fontSize: 14,
                                  color: "#1B212D",
                                }}
                              >
                                {/* 14 Apr 2022 */}
                                {new Date(el.PoDate).toDateString()}
                              </Typography>
                              {/* <Typography
                                sx={{
                                  fontFamily: "Kumbh Sans",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  fontSize: 13,
                                  color: "#929EAE",
                                }}
                              >
                                at 8:00 PM
                              </Typography> */}
                            </TableCell>
                            <TableCell align="left">
                              {" "}
                              <Typography
                                sx={{
                                  fontFamily: "Kumbh Sans",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  fontSize: 13,
                                  color: "#929EAE",
                                }}
                              >
                                20
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                sx={{
                                  fontFamily: "Kumbh Sans",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  fontSize: 14,
                                  color: "#1B212D",
                                }}
                              >
                                {el?.TotalInvoiceValue}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Typography
                                sx={{
                                  fontFamily: "Kumbh Sans",
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  fontSize: 14,
                                  color: "#1B212D",
                                }}
                              >
                                {el?.TotalTaxValue}
                              </Typography>
                            </TableCell>
                            <TableCell align="left">
                              <Button
                                size="small"
                                variant="outlined"
                                sx={{
                                  color: el.BuyerInvoiceAcceptanceStatus
                                    ? "#F2994A"
                                    : "#29A073",
                                  backgroundColor:
                                    el.BuyerInvoiceAcceptanceStatus
                                      ? "#FFF1E6"
                                      : "#D9FFE9",
                                  border: "1px solid #F5F5F5",
                                  borderRadius: "4px",
                                }}
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
                                  {el.BuyerInvoiceAcceptanceStatus
                                    ? el.BuyerInvoiceAcceptanceStatus
                                    : "Performa"}
                                </Typography>
                              </Button>
                            </TableCell>
                            <TableCell align="left">
                              <Button
                                size="small"
                                variant="contained"
                                sx={{ backgroundColor: "#445FD2" }}
                                onClick={() => handleClick(el._id)}
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
                                  View
                                </Typography>
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }} mt={2}>
          <Stack spacing={2}>
            <StyledPagination
              count={paginationCount}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
          </Stack>
        </Box>{" "}
      </Paper>
    </>
  );
};

export default InvoicePage;

const searchbox = {
  width: {
    xl: "75%",
    lg: "70%",
    md: "65%",
    sm: "60%",
    xs: "40%",
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
  "&:hover": {
    color: "#445FD2",
  },
};

const tablehead = {
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "1.2rem",
  color: "#929EAE",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
