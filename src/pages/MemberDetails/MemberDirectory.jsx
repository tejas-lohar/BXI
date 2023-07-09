import React, { useState } from "react";
import { Grid, TextField, Typography, Box, Button, Paper } from "@mui/material";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Product from "../../assets/ProductImages/transactionsproduct.svg";
import TablePagination from "@mui/material/TablePagination";
import SearchIcon from "../../assets/membersearchIcon.svg";

function MemberDirectory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const CompanyList = [
    {
      id: 1,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 2,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 3,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 4,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 5,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 6,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 7,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 8,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 9,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 10,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 10,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
    {
      id: 12,
      avatar: Product,
      name: "Gadget Gallery LTD",
      membername: "Lorem Ipsum",
      website: "Loremipsum@gmail.com",
      businesscategory: "Category",
    },
  ];

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - CompanyList.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        boxShadow: "none",
        background: "transparent",
      }}
      elevation={0}
    >
      <BreadCrumbHeader MainText={"Member Directory"} />
      <Grid
        container
        sx={{
          background: "#FFFFFF",
          padding: "1rem",
          borderRadius: "20px",
          minHeight: "70vh",
        }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            flexdirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          gap={{
            xl: 3,
            lg: 2,
            md: 2,
            sm: 2,
            xs: 2,
          }}
        >
          <Box
            sx={{
              width: {
                xl: "15%",
                lg: "20%",
                md: "20%",
                sm: "90%",
                xs: "90%",
              },
              display: "flex",
              flexdirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: "600",
                fontStyle: "normal",
                color: "#1B212D",
                fontSize: {
                  xl: "1.8rem",
                  lg: "1.8rem",
                  md: "1.8em",
                  sm: "1.8rem",
                  xs: "1.8rem",
                },
              }}
            >
              Member Details
            </Typography>
          </Box>
          <Box
            sx={{
              width: {
                xl: "65%",
                lg: "60%",
                md: "50%",
                sm: "90%",
                xs: "90%",
              },
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TextField
              sx={searchbox}
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      component="img"
                      src={SearchIcon}
                      sx={{
                        height: "auto",
                        width: "15px",
                      }}
                      alt="Search"
                    />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Box>

          <Box>
            <Button
              sx={{
                ...filterbuttons,
                borderRadius: "7px",
                boxShadow: "0px 10px 20px #DCDCDD",
              }}
            >
              Members
            </Button>
            <Button
              style={{
                ...filterbuttons,
                borderRadius: "5px",
                boxShadow: "inset 4px 5px 4px rgba(211, 211, 211, 0.25)",
              }}
            >
              Locals
            </Button>
          </Box>
        </Grid>

        <Grid
          container
          sx={{
            marginTop: "2rem",
          }}
        >
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TableContainer
              sx={{
                height: "auto",
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={tableheading}>Company Name</TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Member Name
                    </TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Website
                    </TableCell>
                    <TableCell align="center" sx={tableheading}>
                      Business Category
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? CompanyList.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : CompanyList
                  ).map((item) => (
                    <TableRow key={item.name} sx={{ maxHeight: "200px" }}>
                      <TableCell align="right" sx={{ textAlign: "left" }}>
                        <Box
                          sx={{
                            width: "auto",
                            display: "flex",
                            alignItems: "center",
                            alignContent: "center",
                          }}
                          gap={1}
                        >
                          <img src={item.avatar} alt="company-logo" />
                          <Typography sx={companyname}>{item.name}</Typography>
                        </Box>
                      </TableCell>

                      <TableCell align="center">
                        <Typography sx={tablename}>
                          {item.membername}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={tablename}>{item.website}</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ ...tablename, color: "#445FD2" }}>
                          {item.businesscategory}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TablePagination
            className="pagination"
            component="div"
            count={CompanyList.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Grid>
    </Paper>
  );
}

export default MemberDirectory;

const tableheading = {
  fontFamily: "Kumbh Sans",
  color: "#7E8BA6",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "bold",
};

const companyname = {
  fontFamily: "Kumbh Sans",
  color: "#7E8BA6",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: "700",
};

const tablename = {
  fontFamily: "Kumbh Sans",
  color: "#1B212D",
  fontSize: "1.4rem",
  fontStyle: "normal",
  fontWeight: "700",
};

const searchbox = {
  width: "100%",
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: 400,
  "& fieldset": { border: "none" },
  bgcolor: "#FFF",
  border: "1px solid rgba(243, 243, 243, 1)",
  borderRadius: "5px",
};

const filterbuttons = {
  fontFamily: "Outfit",
  fontWeight: "700",
  fontSize: "1.2rem",
  background: "white",
  border: "none",
  color: "black",
  width: "89px",
  height: "35px",
  textTransform: "none",
};
