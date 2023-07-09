// import React from "react";
// const Bulkuploadpage = () => {
//   return (
//     <>
//       <BreadCrumbHeader title="Bulk Upload" MainText={"Bulk Upload"} />
//     </>
//   );
// };

// export default Bulkuploadpage;
import BreadCrumbHeader from "../../../../components/Header/BreadCrumbHeader.jsx";
import React, { useEffect, useState } from "react";
import { Grid, Paper, Box, Typography, Button } from "@mui/material";
import GoLeft from "../../../../assets/Images/CommonImages/GoLeft.png";
import BulkUploadImg from "../../../../assets/Images/CommonImages/bulkUploadImg.svg";
import { useNavigate } from "react-router-dom";
import MobilityExcelSheet from "../../../../assets/ExelSheets/BXI_Product_Sheet_Of_Sample_Mobelity.xlsx";
import { useRef } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import avatar from "../../../../assets/Images/CommonImages/Companylogo (2).svg";
import CircularProgress from "@mui/material/CircularProgress";
import Avatargenerator from "../../../../components/AvatarGenerator.jsx";
import useGetLoggedInUser from "../../../../Hooks/LoggedInUser/useGetLoggedInUser.js";
import { toast, ToastContainer } from "react-toastify";
import { makeStyles } from '@mui/styles';

import {
  BulkuploadproductToDB,
  loading,
} from "../../../../redux/action/Products/BulkuploadproductToDB.js";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  tableRow: {
    border: '1px solid rgba(224, 224, 224, 1)', // Change color as needed
  },
});

const MobilityBulkUploadPage = () => {
      const classes = useStyles();
  const navigate = useNavigate();
  const [upload, setUpload] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(data,"data");

  const dispatch = useDispatch();

  const inputFile = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
    console.log("dfuygdfgufg");
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
    setLoading(true);
    console.log("upload", data);
  };

  const UploadHandel = () => {
    dispatch(BulkuploadproductToDB());
      toast.success("Data Successfully Added", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(()=> {
      navigate('/home/mylistedproducts')
    },5000)
  };

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetLoggedInUser();

  return (
    <>
      {/* <Paper
        sx={{
          height: "100%",
          width: "100%",
          mx: "auto",
        }}
      > */}
        <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
      <BreadCrumbHeader title="Bulk Upload" MainText={"Bulk Upload"} />

      {upload ? (
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
            <Grid container>
              <Grid item lg={1} xl={1} md={1} sm={12} xs={12}>
                <Box
                  component={"img"}
                  src={GoLeft}
                  sx={{
                    width: "22px",
                    marginLeft: "-85%",
                    marginTop: "2%",
                    cursor: "pointer",
                    justifyContent: "flex-start",
                  }}
                  onClick={() => {
                    navigate("/home");
                  }}
                />
              </Grid>

              <Grid item lg={8} xl={8} md={8} sm={12} xs={12}>
                <Typography
                  sx={{
                    color: "#929EAE",
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    lineHeight: "24px",
                    textAlign: "justify",
                  }}
                >
                  Product Details
                </Typography>
                <Typography
                  sx={{
                    color: "#929EAE",
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    lineHeight: "24px",
                    textAlign: "initial",
                  }}
                >
                  ( Data from the Template is Mapped here, Fill the Incomplete
                  Information to Go Live )
                </Typography>
              </Grid>

           {/*  <Grid item lg={3} xl={3} md={3} sm={12} xs={12}>
                <Box>
                  <select
                    style={{
                      width: "100px",
                      height: "40px",
                      border: "1px solid #E6E9EE",
                      borderRadius: "12px",
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: "100px",
                      padding: "0px 14px",
                      gap: "8px",
                      color: "gray",
                    }}
                  >
                    <option>All</option>
                    <option>All</option>
                  </select>
                </Box>
              </Grid> */} 
            </Grid>

            <Grid container>
              <Grid item xl={12} lg={12} sm={12} xs={12} md={12}>
                <TableContainer
                  sx={{
                    minWidth: 650,
                    "& td": { border: 0 },
                    height: "500px",
                    maxHeight: "500px",
                    overflow: "scroll",
                    mt: "2%",
                  }}
                >
                  <Table>
                    <TableHead>
                    <TableRow sx={{
                      "& .MuiTableCell-root": {
                        borderLeft: "1px solid rgba(224, 224, 224, 1)"
                      }
                    }}>
                    <TableCell align="left" sx={tablehead}>
                    Serial Number
                  </TableCell>
                       <TableCell align="left" sx={tablehead}>
                    ProductName
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                  ProductSubCategory
                </TableCell>
               
                <TableCell align="left" sx={tablehead}>
                  ProductDescription
                </TableCell>
                <TableCell align="left" sx={tablehead}>
                  ProductsVariantions
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
                    ProductColor
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                  MRP
                </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductSize
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    ProductIdType
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
                  TaxesDetails
                </TableCell>
               
                  <TableCell align="left" sx={tablehead}>
                    ProductPickUpLocation
                  </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    PickUpLocationPincode
                  </TableCell>
                  
                  <TableCell align="left" sx={tablehead}>
                  Guarantee
                </TableCell>
                  <TableCell align="left" sx={tablehead}>
                    Warranty
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

                    {loading === false ? (
                      <CircularProgress
                        disableShrink
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          alignContent: "center",
                          justifyContent: "center",
                          height: "10%",
                          width: "15%",
                          marginTop: "250px",
                          marginLeft: "650px",
                        }}
                      />
                    ) : (
                      <TableBody  sx={{
                        "& .MuiTableCell-root": {
                          borderLeft: "1px solid rgba(224, 224, 224, 1)"
                        }
                      }}>
                        {data &&
                          data?.map((el, idx) => (
                            <TableRow className={classes.tableRow}>
                            <TableCell align="left"  className={classes.tableCell}>
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
                              key={idx}
                            >
                            {idx + 1}
                            </Typography>
                          </TableCell>
                            <TableCell align="left" className={classes.tableCell} >
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

                                        // width: "auto",
                                        // maxWidth: "120px",
                                        // display: "flex",
                                        // justifyContent: "space-between",
                                        // alignItems: "center",
                                        // alignContent: "center",
                                      }}
                                    >
                                      <Avatargenerator
                                        companyname={
                                          userData?.data?.companyName
                                        }
                                      />
                                      {el?.ProductName}
                                    </Typography>
                                  </Box>
                                </Box>
                              </TableCell>
                              <TableCell align="left"  className={classes.tableCell}>
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
                        
                            <TableCell align="left"  className={classes.tableCell}>
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
                            <TableCell align="left"  className={classes.tableCell}>
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
                              <TableCell align="left" className={classes.tableCell}>
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

                              <TableCell align="left"  className={classes.tableCell}>
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

 <TableCell align="left"  className={classes.tableCell}>
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
                              <TableCell align="left" className={classes.tableCell} >
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

                              <TableCell align="left"  className={classes.tableCell}>
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
                                  {el?.ProductsVariantions[0]?.GST}%
                                </Typography>
                              </TableCell>

                             





                              <TableCell align="left"  className={classes.tableCell}>
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
                              
                              <TableCell align="left"  className={classes.tableCell}>
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
                                {el?.MRP}
                              </Typography>
                            </TableCell>

                              <TableCell align="left"  className={classes.tableCell}>
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
                             
                              <TableCell align="left"  className={classes.tableCell}>
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
            
                              <TableCell align="left"  className={classes.tableCell}>
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
                              <TableCell align="left"  className={classes.tableCell}>
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
                              
                        
                              <TableCell align="left"  className={classes.tableCell} >
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
                              <TableCell align="left"  className={classes.tableCell}>
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

                          
                              
                              <TableCell align="left"  className={classes.tableCell}>
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
                                {el?.TaxesDetails}
                              </Typography>
                            </TableCell>

                              <TableCell align="left"  className={classes.tableCell} >
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
                              <TableCell align="left"  className={classes.tableCell} >
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
                              
                                           
                              <TableCell align="left"  className={classes.tableCell}>
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
                       
                              <TableCell align="left"  className={classes.tableCell}>
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
                            

                              <TableCell align="left"  className={classes.tableCell}>
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
                              <TableCell align="left"  className={classes.tableCell}>
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
                              <TableCell align="left"  className={classes.tableCell}>
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
                              
                              <TableCell align="left"  className={classes.tableCell}>
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
                                      ?.WeightBeforePackingPerUnit
                                  }
                                </Typography>
                              </TableCell>
                              <TableCell align="left"  className={classes.tableCell} >
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
                                      ?.WeightAfterPackingPerUnit
                                  }
                                </Typography>
                              </TableCell>
                              <TableCell align="left"  className={classes.tableCell}>
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
                              <TableCell align="left"  className={classes.tableCell}>
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
                              <TableCell align="left"  className={classes.tableCell}>
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
                    )}
                  </Table>
                </TableContainer>

                {loading === true ? (
                  <Button
                    variant="contained"
                    onClick={UploadHandel}
                    sx={filterbutton}
                  >
                    Upload Data
                  </Button>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#fff",
              borderRadius: "20px 20px 20px 20px",
            }}
          >
            <Grid container>
              <Box
                component={"img"}
                src={GoLeft}
                sx={{
                  width: "22px",
                  marginLeft: "1%",
                  marginTop: "2%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/home");
                }}
              />
            </Grid>
            <Grid
              container
              sx={{
                width: "90%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "4rem",
              }}
            >
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                sx={{ padding: "3rem" }}
              >
                <Typography sx={mainTextStyle}>
                  What is Bulk Upload ?
                </Typography>
                <Typography sx={MetaTextStyle}>
                  Bulk Upload is a tool to add Two or More Products / Services /
                  offerings with Multiple SKU / Colors / Dimensions / Rate /
                  Sizes all at One go with the Help of Available Template at the
                  Same Time.
                </Typography>

                <Typography sx={{ ...mainTextStyle, marginTop: "2rem" }}>
                  How to Upload
                </Typography>
                <span
                  //   component={"span"}
                  style={{
                    background: "red",
                    color: "red",
                    height: "5px",
                    width: "5px",
                    borderRadius: "50%",
                  }}
                ></span>
                <Typography sx={pointsStyle}>
                  &#x2022; Download a template from
                </Typography>
                <Typography sx={pointsStyle}>
                  &#x2022; Add your Data to the template file
                </Typography>
                <Typography sx={pointsStyle}>
                  &#x2022; Upload it for processing
                </Typography>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                sm={12}
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  component={"img"}
                  onClick={onButtonClick}
                  src={BulkUploadImg}
                  sx={{ width: "100%", maxWidth: "350px", cursor: "pointer" }}
                ></Box>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <Box>
                  <Typography sx={Upload} onClick={onButtonClick}>
                    Click here to Upload
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
            >
              <Grid
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                sx={{ padding: "3rem" }}
              >
                <a
                  onClick={() => {
                    console.log("download excel");
                  }}
                  sx={downLoadText}
                ></a>
                <Box
                  component={"a"}
                  download="mobilityDocs"
                  target="_blank"
                  href={MobilityExcelSheet}
                  onClick={() => {
                    console.log("download excel");
                  }}
                  sx={downLoadText}
                >
                  Download Format Template here{" "}
                </Box>
                {/* <a href={ExampleDoc} download="MyExampleDoc" target="_blank">
              <Button className={classes.navLink}>My Example Doc</Button>
            </a> */}
                <Typography sx={noteText}>
                  Note : First Row are the Headers in the Format Template, 100%
                  Information is must for the Bulk Upload to Go Live. Products
                  Listed in the Template shall be listed as Individual Products.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}

      {/* <Grid
        container
        sx={{
          borderRadius: "30px",
          display: "flex",
          justifyContent: "center",
          background: "#F3F6F9",
        }}
      ></Grid> */}
      {/* </Paper> */}
    </>
  );
};

export default MobilityBulkUploadPage;
const mainTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "27px",
  color: "#6B7A99",
};
const MetaTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "24px",
  textAlign: "justify",
  color: "#6B7A99",
  marginTop: "2rem",
};
const pointsStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 18,
  lineHeight: "122.5%",
  display: "flex",
  alignItems: "center",
  color: "#6B7A99",
  marginTop: "1.5rem",
};
const downLoadText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 22,
  lineHeight: "18px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  textDecoration: "none",
  color: "#445FD2",
};
const noteText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 16,
  lineHeight: "28px",
  display: "flex",
  alignItems: "center",
  marginTop: "3rem",
  color: "#6B7A99",
  width: "80%",
};
const tablehead = {
  fontFamily: "Kumbh Sans",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "1.2rem",
  color: "#929EAE",
};

const filterbutton = {
  // color: "#1B212D",
  // border: "1px solid #F5F5F5",
  // borderRadius: "10px",
  width: " 281px",
  height: "48px",
  ml: "auto",
  background: "#445FD2",
  borderRedius: "10px",
  color: "#FFFFFF",
  fontFamily: "Poppins",
  fontWeight: 600,
  fontSize: "14px",
  lineHeight: "21px",
  textTransform: "none",
};

const Upload = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "18px",
  alignItems: "center",
  textAlign: "center",
  textDecoration: "none",
  color: "#445FD2",
  cursor: "pointer",
};
