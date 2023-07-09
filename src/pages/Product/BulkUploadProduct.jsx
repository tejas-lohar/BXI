import React, { useState } from "react";
import { Grid, Typography, TextField, Box, Paper, Button } from "@mui/material";
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
import axios from "axios";
import { BulkuploadproductToDB } from "../../redux/action/Products/BulkuploadproductToDB";
import { useSelector, useDispatch } from "react-redux";

const InvoicePage = () => {
  const [upload, setUpload] = useState(null);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const {
    data: invoicesData,
    isLoading: invoicesLoading,
    isError: invoicesError,
  } = useGetInvoices();

  let TotalAmount = 0;

  for (let i = 0; i < invoicesData?.data?.length; i++) {
    for (let j = 0; j < invoicesData?.data[i]?.ProductData?.length; j++) {
      TotalAmount +=
        invoicesData?.data[i]?.ProductData[j]?.DiscountedPrice *
        invoicesData?.data[i]?.ProductData[j]?.ProductQuantity;
    }
  }

  console.log(TotalAmount);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/home/invoice/` + id);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      // store the data in state
      const myForm = new FormData();
      myForm.append("file", file);
      setUpload(data);
      uploadExcelFile(myForm);
    };

    reader?.readAsBinaryString(file);
  };

  const uploadExcelFile = async (myForm) => {
    const { data } = await axios.post("product/productbulkupload", myForm, {
      headers: { "Content-type": "multipart/form-data" },
      withCredentials: true,
    });
    setData(data);
    console.log("upload", data);
  };

  const UploadHandel = () => {
    dispatch(BulkuploadproductToDB());
  };

  return (
    <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
      <BreadCrumbHeader MainText={"Bulk Upload Product"} />
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
            ></TextField>
            <Button variant="outlined" onClick={UploadHandel} sx={filterbutton}>
              Upload
            </Button>

            <Button variant="outlined" sx={filterbutton}>
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
            </Button>
          </Grid>
          <input type="file" onChange={handleFileUpload} />
          <TableContainer
            sx={{
              minWidth: 650,
              "& td": { border: 0 },
              height: "500px",
              maxHeight: "500px",
              overflow: "scroll",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={tablehead}>
                    ProductName
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    Gender
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductSubCategory
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductSubtittle
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductDescription
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductsVariantions
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductColor
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductSize
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    PricePerUnit
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    DiscountedPrice
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    MinOrderQuantity
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    MaxOrderQuantity
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    GST
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductIdType
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    SampleMinOrderQuantity
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    PriceOfSample
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    CostPrice
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ReasonOfCost
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    FeatureName
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    FeatureDesc
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductPickUpLocation
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    PickUpLocationPincode
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    Warranty
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    Guarantee
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    Height
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    Length
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    BreadthOrWidth
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    WeightBeforePackingPerUnit
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    WeightAfterPackingPerUnit
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    PackagingAndDeliveryInstructionsIfAny
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    Tags
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductImages
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data?.map((el, idx) => (
                    <TableRow>
                      <TableCell align="left">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                          }}
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
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {el?.ProductName}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        <Box>
                          <Typography
                            sx={{
                              fontFamily: "Kumbh Sans",
                              fontStyle: "normal",
                              fontWeight: 500,
                              fontSize: 14,
                              color: "#1B212D",
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {el?.Gender}
                          </Typography>
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductSubCategory}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductSubtittle}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductDescription}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions?.length}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions[0]?.ProductColor}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions[0]?.ProductSize}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions[0]?.PricePerUnit}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions[0]?.DiscountedPrice}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions[0]?.MinOrderQuantity}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions[0]?.MaxOrderQuantity}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions[0]?.GST}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions[0]?.ProductIdType}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions[0]?.SampleMinOrderQuantity}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductsVariantions[0]?.PriceOfSample}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.OtherCost[0]?.CostPrice}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.OtherCost[0]?.ReasonOfCost}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductFeatures[0]?.FeatureDesc}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductFeatures[0]?.FeatureName}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductPickUpLocation}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.PickUpLocationPincode}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductTechInfo?.Warranty}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductTechInfo?.Guarantee}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductTechInfo?.Height}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductTechInfo?.Length}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductTechInfo?.BreadthOrWidth}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductTechInfo?.WeightBeforePackingPerUnit}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductTechInfo?.WeightAfterPackingPerUnit}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {
                            el?.ProductTechInfo
                              ?.PackagingAndDeliveryInstructionsIfAny
                          }
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductTechInfo?.Tags[0]}
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
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          {el?.ProductImages[0].url}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InvoicePage;

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
  color: "#1B212D",
  border: "1px solid #F5F5F5",
  borderRadius: "10px",
};

const tablehead = {
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "1.2rem",
  color: "#929EAE",
};
