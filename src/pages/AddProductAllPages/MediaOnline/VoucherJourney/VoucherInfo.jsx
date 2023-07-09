import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Input,
  Select,
  MenuItem,
  Paper,
  BottomNavigation,
} from "@mui/material";
import stackofcoins from "../../../../assets/Images/VoucherJourney/VoucherInformation/stackofcoins.svg";
// import { Stack } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import percentage from "../../../../assets/Images/VoucherJourney/Percentage.svg";
import InfoIcon from "../../../../assets/Images/CommonImages/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";

function Voucherinfo() {
  // first add
  const [detail, setDetail] = useState([]);
  const [gst, setGST] = useState("");
  const [validityofvoucher, setValidityofVoucher] = useState("");
  const [minorderquantity, setMinorderQuantity] = useState("");
  const [maxorderquantity, setMaxorderQuantity] = useState("");
  const [mrp, setMRP] = useState("");
  const [totalquantity, setTotalQuantity] = useState("");
  const [totalprice, setTotalPrice] = useState("");

  const Submit = (e) => {
    e.preventDefault();
    const NewItem = {
      gst,
      validityofvoucher,
      minorderquantity,
      maxorderquantity,
      mrp,
      totalquantity,
      totalprice,
    };
    setDetail([...detail, NewItem]);
    setGST("");
    setValidityofVoucher("");
    setMinorderQuantity("");
    setMaxorderQuantity("");
    setMRP("");
    setTotalQuantity("");
    setTotalPrice("");
  };

  const Editdata = (index) => {
    const selectItem = detail[index];
    setGST(selectItem.gst);
    setValidityofVoucher(selectItem.validityofvoucher);
    setMinorderQuantity(selectItem.minorderquantity);
    setMaxorderQuantity(selectItem.maxorderquantity);
    setMRP(selectItem.mrp);
    setTotalQuantity(selectItem.totalquantity);
    setTotalPrice(selectItem.totalprice);
    const NewItem = [...detail];
    NewItem.splice(index, 1);
    setDetail(NewItem);
  };

  const deletedata = (index) => {
    const NewItem = [...detail];
    NewItem.splice(index, 1);
    setDetail(NewItem);
  };

  //  second add

  const [data, setdata] = useState([]);
  const [othercostifapplicable, setOthercostifapplicable] = useState("");
  const [reasonofcost, setReasonofcost] = useState("");

  const secondSubmit = (e) => {
    e.preventDefault();
    const newitems = { othercostifapplicable, reasonofcost };
    setdata([...data, newitems]);
    setOthercostifapplicable("");
    setReasonofcost("");
  };

  // third add
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, description };
    setItems([...items, newItem]);
    setName("");
    setDescription("");
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleEdit = (index) => {
    const selectedItem = items[index];
    setName(selectedItem.name);
    setDescription(selectedItem.description);
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <Box sx={BoxStyle}>
      <Paper
        elevation={0}
        sx={{
          background: "transparent",
        }}
      >
        <Grid
          container
          sx={{
            mx: "auto",
          }}
        >
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box
              sx={{
                width: "100%",
                mx: "auto",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
                px: "25px",
                py: "15px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: {
                    xs: "18px",
                    sm: "16px",
                    md: "16px",
                    lg: "14px",
                    xl: "14px",
                  },
                  color: "#6B7A99",
                }}
              >
                Voucher Information
              </Typography>
              <Box
                component="img"
                src={InfoIcon}
                sx={{ width: "18px", height: "auto", cursor: "pointer" }}
              />
            </Box>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box
              sx={{
                width: "91%",
                height: "100%",
                minHeight: "400px",
                // overflowY: "scroll",
                boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
                bgcolor: "transparent",
                mx: "auto",
                maxWidth: "716px",
                // bgcolor: "#f3f6f9",
                // overflowY: "hidden",
                px: 4,
                py: 3,
              }}
            >
              {/* <Box
          sx={{
            width: "100%",
            mt: 2,  
            height: "100%",
            maxHeight: "400px",
            overflowY: "scroll",
          }}
        >
          <Stack> */}
              <Box
                sx={{
                  mt: 3,
                  border: "1px solid #E3E3E3",
                  borderRadius: "10px",
                  height: "auto",
                  minHeight: "100px",
                  position: "relative",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  gap: "10px",
                  px: 2,
                  py: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    mt: 1,
                    maxWidth: "140px",
                  }}
                >
                  <Typography sx={CommonTextStyle}>GST</Typography>
                  <Box
                    sx={{
                      position: "relative",
                    }}
                  >
                    <Input
                      value={gst}
                      onChange={(e) => setGST(e.target.value)}
                      disableUnderline
                      sx={{
                        color: "rgba(107, 122, 153)",
                        width: "139px",
                        height: "42px",
                        background: "#FFFFFF",
                        borderRadius: "10px",
                        px: 1,
                      }}
                    />
                    <Box
                      component="img"
                      // src={percentage}
                      sx={{
                        position: "absolute",
                        right: "5%",
                        top: "30%",
                        width: "15px",
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: "auto",
                    maxWidth: "200px",
                    height: "45px",
                    mt: "1%",
                    borderRadius: "10px",
                  }}
                >
                  <Typography sx={CommonTextStyle}>
                    Validity of Voucher
                  </Typography>
                  <TextField
                    value={validityofvoucher}
                    onChange={(e) => setValidityofVoucher(e.target.value)}
                    id="standard-basic"
                    variant="standard"
                    InputProps={{
                      disableUnderline: "true",
                      style: {
                        color: "rgba(107, 122, 153)",
                        fontSize: "14px",
                        padding: "10px",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "red",
                      },
                    }}
                    sx={{
                      width: "33%",
                      height: "100%",
                      background: "#FFFFFF",
                      borderRadius: "10px 0px 0px 10px",
                    }}
                  />
                  <Select
                    sx={{
                      width: "50%",
                      borderRadius: "0px 10px 10px 0px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                          border: 0,
                        },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: 0,
                        },
                      background: "#FFFFFF",
                      height: "100%",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "13px",
                      lineHeight: "21px",
                      color: "#6B7A99",
                    }}
                    defaultValue="Month"
                  >
                    <MenuItem value="Month" sx={CommonTextStyle}>
                      Month
                    </MenuItem>
                    <MenuItem value="Year" sx={CommonTextStyle}>
                      Year
                    </MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    mt: 1,
                    maxWidth: "140px",
                  }}
                >
                  <Typography sx={CommonTextStyle}>
                    Min order Quantity
                  </Typography>
                  <Input
                    value={minorderquantity}
                    onChange={(e) => setMinorderQuantity(e.target.value)}
                    disableUnderline
                    sx={{
                      color: "rgba(107, 122, 153)",
                      width: "139px",
                      height: "42px",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      px: 1,
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    mt: 1,
                    maxWidth: "140px",
                  }}
                >
                  <Typography sx={CommonTextStyle}>
                    {" "}
                    Max order Quantity
                  </Typography>
                  <Input
                    value={maxorderquantity}
                    onChange={(e) => setMaxorderQuantity(e.target.value)}
                    disableUnderline
                    sx={{
                      color: "rgba(107, 122, 153)",
                      width: "139px",
                      height: "42px",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      px: 1,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "auto",
                    maxWidth: "160px",
                    height: "45px",
                    mt: "1%",
                    borderRadius: "10px",
                  }}
                >
                  <Typography sx={CommonTextStyle}>MRP</Typography>
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    InputProps={{
                      disableUnderline: "true",
                      startAdornment: (
                        <img src={stackofcoins} alt="stackofcoins" />
                      ),
                      style: {
                        color: "rgba(107, 122, 153)",
                        fontSize: "14px",
                        padding: "10px",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "red",
                      },
                    }}
                    sx={{
                      width: "33%",
                      height: "100%",
                      background: "#FFFFFF",
                      borderRadius: "0px 10px 10px 0px",
                    }}
                  />
                  <Select
                    value={mrp}
                    onChange={(e) => setMRP(e.target.value)}
                    sx={{
                      width: "50%",
                      borderRadius: "0px 10px 10px 0px",
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                          border: 0,
                        },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: 0,
                        },
                      background: "#FFFFFF",
                      height: "100%",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "13px",
                      lineHeight: "21px",
                      color: "#6B7A99",
                    }}
                    defaultValue="500"
                  >
                    <MenuItem value="500" sx={CommonTextStyle}>
                      500
                    </MenuItem>
                    <MenuItem value="1000" sx={CommonTextStyle}>
                      1000
                    </MenuItem>
                    <MenuItem value="1500" sx={CommonTextStyle}>
                      1500
                    </MenuItem>
                    <MenuItem value="2000" sx={CommonTextStyle}>
                      2000
                    </MenuItem>
                  </Select>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    mt: 1,
                    maxWidth: "140px",
                  }}
                >
                  <Typography sx={CommonTextStyle}>Total Quantity</Typography>
                  <Input
                    value={totalquantity}
                    onChange={(e) => setTotalQuantity(e.target.value)}
                    disableUnderline
                    sx={{
                      color: "rgba(107, 122, 153)",
                      width: "139px",
                      height: "42px",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      px: 1,
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "auto",
                    maxWidth: "160px",
                    height: "45px",
                    mt: "1%",
                    borderRadius: "10px",
                  }}
                >
                  <Typography sx={CommonTextStyle}>Total Price</Typography>
                  <TextField
                    value={totalprice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    id="standard-basic"
                    variant="standard"
                    InputProps={{
                      disableUnderline: "true",
                      startAdornment: (
                        <img src={stackofcoins} alt="stackofcoins" />
                      ),
                      style: {
                        color: "rgba(107, 122, 153)",
                        fontSize: "14px",
                        padding: "10px",
                        borderRadius: "0px 10px 10px 0px",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "red",
                      },
                    }}
                    sx={{
                      width: "139px",
                      height: "100%",
                      background: "#FFFFFF",
                      borderRadius: "0px 10px 10px 0px",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    mt: 1,
                    borderRadius: "10px",
                    height: "auto",
                    position: "relative",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    gap: "30px",
                    px: 0,
                    py: 0,
                  }}
                ></Box>
              </Box>

              <Button
                onClick={Submit}
                sx={{
                  width: "100%",
                  height: "41px",
                  background: "#445FD2",
                  borderRadius: "10px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#FFFFFF",
                  "&:hover": {
                    background: "#445FD2",
                  },
                  my: 3,
                }}
              >
                ADD
              </Button>

              <Box sx={{ marginTop: "2rem" }}>
                <Typography sx={CommonTextStyle}>
                  Added Details ({detail.length}){" "}
                </Typography>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={tableheading}>GST</TableCell>
                        <TableCell align="center" sx={tableheading}>
                          Validity
                        </TableCell>
                        <TableCell align="center" sx={tableheading}>
                          Min
                        </TableCell>
                        <TableCell align="center" sx={tableheading}>
                          Max
                        </TableCell>
                        <TableCell align="center" sx={tableheading}>
                          MRP
                        </TableCell>
                        <TableCell align="center" sx={tableheading}>
                          QTY
                        </TableCell>
                        <TableCell align="center" sx={tableheading}>
                          Total Price
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detail.map((item, index) => (
                        <TableRow key={item.name}>
                          <TableCell align="center" sx={TableCellcss}>
                            {item.gst}%
                          </TableCell>

                          <TableCell align="center" sx={TableCellcss}>
                            {item.validityofvoucher}
                          </TableCell>
                          <TableCell align="center" sx={TableCellcss}>
                            {item.minorderquantity}
                          </TableCell>
                          <TableCell align="center" sx={TableCellcss}>
                            {item.maxorderquantity}
                          </TableCell>
                          <TableCell align="center" sx={TableCellcss}>
                            {item.mrp}
                          </TableCell>
                          <TableCell align="center" sx={TableCellcss}>
                            {item.totalquantity}
                          </TableCell>
                          <TableCell align="center" sx={TableCellcss}>
                            {item.totalprice}
                          </TableCell>
                          <Button onClick={() => Editdata(index)}>
                            <CreateIcon
                              sx={{ color: "#445FD2", width: "25px" }}
                            />
                          </Button>
                          <Button onClick={() => deletedata(index)}>
                            <CloseIcon
                              sx={{ color: "#445FD2", width: "25px" }}
                            />
                          </Button>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              {/* </Stack>
        </Box> */}

              <Grid container>
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  <Box
                    sx={{
                      width: "auto",
                      maxWidth: "200px",
                      height: "45px",
                      mt: "1%",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography sx={CommonTextStyle}>
                      Other cost if applicable
                    </Typography>
                    <TextField
                      value={othercostifapplicable}
                      onChange={(e) => setOthercostifapplicable(e.target.value)}
                      id="standard-basic"
                      variant="standard"
                      InputProps={{
                        disableUnderline: "true",
                        style: {
                          color: "rgba(107, 122, 153)",
                          fontSize: "14px",
                          padding: "10px",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "red",
                        },
                      }}
                      sx={{
                        width: "45%",
                        height: "100%",
                        background: "#FFFFFF",
                        borderRadius: "0px 10px 10px 0px",
                      }}
                    />
                    <Select
                      sx={{
                        width: "50%",
                        borderRadius: "0px 10px 10px 0px",
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            border: 0,
                          },
                        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            border: 0,
                          },
                        background: "#FFFFFF",
                        height: "100%",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "13px",
                        lineHeight: "21px",
                        color: "#6B7A99",
                      }}
                      defaultValue="Rupies"
                    >
                      <MenuItem value="Rupies" sx={CommonTextStyle}>
                        <img src={stackofcoins} alt="stackofcoins" />
                      </MenuItem>
                      <MenuItem value="dollar" sx={CommonTextStyle}>
                        $
                      </MenuItem>
                    </Select>
                  </Box>
                </Grid>

                <Grid xl={8} lg={8} md={8} sm={12} xs={12}>
                  <Box
                    sx={{
                      width: "auto",
                      maxWidth: "200px",
                      height: "45px",
                      mt: "1%",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography sx={CommonTextStyle}>Reason of cost</Typography>
                    <TextField
                      value={reasonofcost}
                      onChange={(e) => setReasonofcost(e.target.value)}
                      id="standard-basic"
                      variant="standard"
                      InputProps={{
                        disableUnderline: "true",
                        style: {
                          color: "rgba(107, 122, 153)",
                          fontSize: "14px",
                          padding: "10px",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          color: "red",
                        },
                      }}
                      sx={{
                        width: "100%",
                        height: "100%",
                        background: "#FFFFFF",
                        borderRadius: "0px 10px 10px 0px",
                      }}
                    />
                  </Box>

                  <Button
                    sx={{ color: "#6B7A99", top: "2rem" }}
                    onClick={secondSubmit}
                  >
                    + Add{" "}
                  </Button>
                </Grid>
              </Grid>

              {data.map((items) => {
                return (
                  <Typography
                    key={items}
                    sx={{
                      marginTop: "4rem",
                      justifyContent: "space-around",
                      display: "flex",
                    }}
                  >
                    <Box
                      sx={{
                        height: "60px",
                        display: " grid",
                        placeItems: "center",
                        width: "80%",
                        mx: "auto",
                        border: "1px solid #E3E3E3",
                        borderRedius: "10px",
                        color: "#445FD2",
                        fontFamily: "Poppins",
                        fontSize: "15px",
                      }}
                    >
                      {items.othercostifapplicable}
                    </Box>

                    <Box
                      sx={{
                        height: "60px",
                        display: " grid",
                        placeItems: "center",
                        border: "1px solid #E3E3E3",
                        borderRedius: "10px",
                        width: "80%",
                        mx: "auto",
                        color: "#445FD2",
                        fontFamily: "Poppins",
                        fontSize: "15px",
                      }}
                    >
                      {items.reasonofcost}
                    </Box>
                  </Typography>
                );
              })}

              <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    textAlign: "initial",
                    fontFamily: "Poppins",
                    color: "#6B7A99",
                    marginTop: "5rem",
                  }}
                >
                  Select the best features that describes your brand/product
                  <Typography>
                    (the more features you write the more you are discovered)
                  </Typography>
                  Min 10
                </Typography>

                <TextField
                  focused
                  className="text"
                  label="Feature Name "
                  multiline
                  variant="standard"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "17px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                    },
                  }}
                />

                <TextField
                  focused
                  label="Feature Description "
                  multiline
                  variant="standard"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "17px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: { fontFamily: "Poppins", color: " #6B7A99" },
                  }}
                />

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    width: "100%",
                    height: "41px",
                    background: "#445FD2",
                    borderRadius: "10px",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#FFFFFF",
                    "&:hover": {
                      background: "#445FD2",
                    },
                    my: 3,
                  }}
                >
                  Add
                </Button>

                <Typography
                  sx={{
                    color: "#6B7A99",
                    fontFamily: "Poppins",
                    fonmtSize: "20px",
                    marginRight: "75%",
                    marginTop: "1rem",
                  }}
                >
                  Key Features({items.length})
                </Typography>
                {items.map((item, index) => (
                  <Box
                    sx={{
                      border: "1px solid #E3E3E3",
                      marginTop: "1rem",
                      mx: "auto",
                      height: "100px",
                      display: " grid",
                      placeItems: "center",
                      borderRadius: "10px",
                    }}
                  >
                    <Typography key={index} sx={{ display: "flex" }}>
                      <Typography sx={mapdata}>
                        {item.name} <br />
                        {item.description}
                      </Typography>

                      <Button
                        onClick={() => handleEdit(index)}
                        sx={{ textTransform: "none", marginLeft: "5rem" }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(index)}
                        sx={{ textTransform: "none", marginLeft: "5rem" }}
                      >
                        Delete
                      </Button>
                    </Typography>
                  </Box>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <BottomNavigation
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: "#f3f6f9",
            p: "10px",
            boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
            height: "auto",
          }}
          showLabels
        >
          <Typography
            sx={{
              marginRight: "auto",
              p: "2%",
              fontFamily: "Poppins",
              fontStyle: "normal",
              color: "#6B7A99",
              fontSize: 14,
              display: "flex",
              gap: "10px",
            }}
          >
            <Box
              component="img"
              sx={{ width: "23px", height: "23px" }}
              src={RedoIcon}
              alt=""
            />
            Reset to Defaults
          </Typography>
          <Box sx={{ display: "flex", gap: "10px", p: 1, width: "50%" }}>
            <Button
              sx={{
                width: "100%",
                height: "32px",
                borderRadius: "10px",
                background: "#fff",
                color: "#636161",
                "&:hover": {
                  background: "#f3f6f9",
                  color: "#000",
                },
              }}
              variant="contained"
            >
              cancel
            </Button>
            <Button
              sx={{
                width: "100%",
                height: "32px",
                borderRadius: "10px",
                background: "#445FD2",
                // color: "#fff",
                "&:hover": {
                  background: "#445FD2",
                  //   color: "#fff",
                },
              }}
              variant="contained"
              //   onClick={AddProduct}
            >
              Next
              {/* {isLoading ? <CircularProgress /> : "Next"} */}
            </Button>
          </Box>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default Voucherinfo;

const lablechange = {
  fontFamily: "Poppins",
  color: "#6B7A99",
  fontSize: "16px",
  display: "grid",
  textAlign: "left",
  marginTop: "2rem",
  fontWeight: "bold",
  // borderBottom: "1px solid #E8E8E8",
  "&:focus": {
    border: "1px solid #E8E8E8",
  },
};

const mapdata = {
  color: " #6B7A99",
  fontFamily: "Poppins",
};

const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "21px",
  color: "#6B7A99",
  marginTop: "1rem",
};

const tableheading = {
  color: "#6B7A99",
  fontFamily: "Poppins",
  fontSize: "12px",
};

const TableCellcss = {
  color: "#445FD2",
  fontFamily: "Work Sans",
  fontSize: {
    xl: "17px",
    lg: "15px",
    md: "15px",
    sm: "15px",
    xs: "14px",
  },
};

const BoxStyle = {
  width: "100%",
  height: "492px",
  overflowY: "scroll",
  boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
  bgcolor: "#f3f6f9",
  mx: "auto",
  maxWidth: "716px",
  minWidth: "300px",
  overflow: "scroll",
  // borderRadius: "10px",
};
