import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { React, useRef } from "react";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ToastContainer } from "react-toastify";
import { useGetInvoiceByOrderSummary } from "../../Hooks/Invoices/useGetInvoiceByOrderSummary";
import print from "../../assets/Images/CommonImages/PrintInvoice.svg";
import download from "../../assets/Images/CommonImages/downloadinvoice.svg";
import signature from "../../assets/Signature.svg";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import { PDFDocument, StandardFonts, PDFSecurity } from 'pdf-lib';

const Invoice = () => {
  // const navigate = useNavigate();
  let id = useParams().id;
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleDownload = () => {
    setTimeout(() => {
      html2canvas(componentRef.current)
        .then((canvas) => {
          const pdf = new jsPDF();
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

          pdf.addImage(
            canvas.toDataURL("image/png"),
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight
          );
          pdf.save("DeliveryInvoice.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }, 1000);
  };


//   const handleDownload = () => {
//   setTimeout(() => {
//     html2canvas(componentRef.current)
//       .then((canvas) => {
//         const pdf = new jsPDF();
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         pdf.addImage(
//           canvas.toDataURL("image/png"),
//           "PNG",
//           0,
//           0,
//           pdfWidth,
//           pdfHeight
//         );

//         // Set password for the PDF
//         const password = "your_password";
//         pdf.setPassword(password);

//         // Save the protected PDF
//         pdf.save("DeliveryInvoice.pdf");
//       })
//       .catch((error) => {
//         console.error("Error generating PDF:", error);
//       });
//   }, 1000);
// };

  
  // const handleDownload = async () => {
  //   try {
  //     const canvas = await html2canvas(componentRef.current);
  //     const pdfDoc = await PDFDocument.create();
  
  //     const page = pdfDoc.addPage();
  //     const pdfWidth = page.getWidth();
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  //     const pngImage = await pdfDoc.embedPng(canvas.toDataURL("image/png"));
  //     page.drawImage(pngImage, {
  //       x: 0,
  //       y: 0,
  //       width: pdfWidth,
  //       height: pdfHeight,
  //     });
  
  //     // Set the password for the PDF
  //     const password = 'your_password';
  //     pdfDoc.setPassword(password);
  
  //     // Save the PDF as a binary array
  //     const pdfBytes = await pdfDoc.save();
  
  //     // Create a Blob object from the PDF data
  //     const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
  
  //     // Create a download link for the protected PDF
  //     const downloadLink = document.createElement('a');
  //     downloadLink.href = URL.createObjectURL(pdfBlob);
  //     downloadLink.download = 'protected_bill.pdf';
  //     downloadLink.click();
  //   } catch (error) {
  //     console.error("Error generating PDF:", error);
  //   }
  // };


  

  


  const {
    data: InvoiceData,
    // isLoading: DataLoading,
    // error: DataError,
  } = useGetInvoiceByOrderSummary(id);

  // async function UpdateInvoice() {
  //   await axios
  //     .put(
  //       `invoices/update_invoice/` + InvoiceData?._id,
  //       {
  //         BuyerInvoiceAcceptanceStatus: "Accepted",
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       toast.success("Invoice Accepted", {
  //         position: "top-center",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //       setTimeout(() => {
  //         navigate("/home/choosetransport/" + InvoiceData?._id);
  //       }, 2000);
  //     })
  //     .catch((err) => {
  //       alert("Error");
  //     });
  // }

  // async function UpdateInvoiceReject() {
  //   await axios
  //     .put(
  //       `invoices/update_invoice/` + InvoiceData?._id,
  //       {
  //         BuyerInvoiceAcceptanceStatus: "Rejected",
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       toast.error("Invoice Rejected", {
  //         position: "top-center",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "light",
  //       });
  //     })
  //     .catch((err) => {
  //       alert("Error");
  //     });
  // }

  return (
    <Grid
      container
      sx={{
        padding: {
          xl: "2rem",
          lg: "2rem",
          md: "0.5rem",
          sm: "0.2rem",
          xs: "0.2rem",
        },
      }}
    >
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BreadCrumbHeader
        title="Delivery Invoice"
        MainText={"Delivery Invoice"}
      />
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          display: "grid",
          background: "#fff",
          borderRadius: "20px",
          border: "none",
          height: "auto",
          px: {
            xl: "16px",
            lg: "16px",
            md: "12px",
            sm: 0,
            xs: 0,
          },
        }}
      >
        <Box ref={componentRef}>
          {/* grid box 1 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column-reverse",
                xs: "column-reverse",
              },
            }}
          >
            <Grid
              item
              xl={7}
              lg={7}
              md={7}
              sm={12}
              xs={12}
              sx={{
                width: "90%",
                mx: "auto",
                padding: {
                  xl: "16px",
                  lg: "16px",
                  md: "12px",
                  sm: "8px",
                  xs: "8px",
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gap: {
                    xl: "16px",
                    lg: "16px",
                    md: "12px",
                    sm: "8px",
                    xs: "8px",
                  },
                }}
              >
                <Box
                  sx={{
                    py: {
                      xl: "1.5rem",
                      lg: "1.5rem",
                      md: "1rem",
                      sm: "0.5rem",
                      xs: "0.5rem",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: {
                        xl: "2rem",
                        lg: "2rem",
                        md: "1.3rem",
                        sm: "1rem",
                        xs: "1rem",
                      },
                      lineHeight: "30px",
                      color: "#6B7A99",
                    }}
                  >
                    New Invoices: #FY23PIHR/0151777
                    {/* MGL524874 */}
                    {InvoiceData?._id}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    height: "auto",
                    background: "#156DB6",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    py: {
                      xl: "18px",
                      lg: "18px",
                      md: "16px",
                      sm: "14px",
                      xs: "14px",
                    },
                    px: {
                      xl: "32px",
                      lg: "32px",
                      md: "16px",
                      sm: "16px",
                      xs: "12px",
                    },
                  }}
                >
                  <Box sx={{}}>
                    <Typography sx={{ ...SellerNameText, color: "#fff" }}>
                      BXI World LLP
                    </Typography>
                    <Typography
                      sx={{
                        ...SellerDetailsText,
                        color: "#FFFFFF",
                        opacity: "0.7",
                        width: "95%",
                      }}
                    >
                      501, 5th Floor Meadows Tower, Sahar Plaza complex ,
                      Andheri (E) , Mumbai -400059 India
                    </Typography>
                    <Typography
                      sx={{
                        ...SellerDetailsText,
                        color: "#FFFFFF",
                        opacity: "0.7",
                      }}
                    >
                      GSTIN 06AAICP3427D1ZO
                    </Typography>
                    <Typography
                      sx={{
                        ...SellerDetailsText,
                        color: "#FFFFFF",
                        opacity: "0.7",
                      }}
                    >
                      CIN: U74HR2015PTC057213
                    </Typography>
                    <Typography
                      sx={{
                        ...SellerDetailsText,
                        color: "#FFFFFF",
                        opacity: "0.7",
                      }}
                    >
                      PAN: AAICP3427D
                    </Typography>
                  </Box>
                  {/* <Box
                  sx={{ width: "100%", maxWidth: "180px", textAlign: "left" }}
                >
                  <Typography
                    sx={{
                      ...SellerDetailsText,
                      color: "#FFFFFF",
                      opacity: "0.7",
                    }}
                  >
                    GSTIN 06AAICP3427D1ZO
                  </Typography>
                  <Typography
                    sx={{
                      ...SellerDetailsText,
                      color: "#FFFFFF",
                      opacity: "0.7",
                    }}
                  >
                    CIN: U74HR2015PTC057213
                  </Typography>
                  <Typography
                    sx={{
                      ...SellerDetailsText,
                      color: "#FFFFFF",
                      opacity: "0.7",
                    }}
                  >
                    PAN: AAICP3427D
                  </Typography>
                </Box> */}
                </Box>
                <Box
                  sx={{
                    background: "#F3F6F9",
                    height: "auto",
                    borderRadius: "10px",
                    display: {
                      xl: "flex",
                      lg: "flex",
                      md: "flex",
                      sm: "flex",
                      xs: "flex",
                    },
                    justifyContent: "space-between",
                    alignItems: "start",
                    py: {
                      xl: "22px",
                      lg: "22px",
                      md: "14px",
                      sm: "12px",
                      xs: "12px",
                    },
                    px: {
                      xl: "32px",
                      lg: "32px",
                      md: "16px",
                      sm: "16px",
                      xs: "12px",
                    },
                    // alignContent: "center",
                  }}
                >
                  <Box sx={{}}>
                    <Typography sx={{ ...SellerNameText, color: "#6B7A99" }}>
                      Bill To
                    </Typography>
                    <Typography
                      sx={{
                        ...SellerDetailsText,
                        fontWeight: 600,
                        color: "#727272",
                        opacity: "0.4",
                        mt: 1,
                      }}
                    >
                      GSTIN 27AAXFB2929C1ZA
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: {
                        xl: "auto",
                        lg: "auto",
                        md: "auto",
                        sm: "50%",
                        xs: "50%",
                      },
                      maxWidth: "200px",
                      textAlign: "right",
                    }}
                  >
                    <Typography
                      sx={{
                        ...SellerNameText,
                        color: "#6B7A99",
                        textAlign: "right",
                      }}
                    >
                      BXI WORLD LLP
                    </Typography>
                    <Typography
                      sx={{
                        ...SellerDetailsText,
                        fontWeight: 600,
                        color: "#727272",
                        opacity: "0.4",
                        textAlign: "right",
                        mt: 1,
                      }}
                    >
                      1407, Wing C, Fantasy Land, Cts No.1, J. V. Link Road,
                      Opp. Majas Depot MUMBAI 400060 Maharashtra (27)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xl={5}
              lg={5}
              md={5}
              sm={12}
              xs={12}
              sx={{
                width: "90%",
                mx: "auto",
                padding: {
                  xl: "16px",
                  lg: "16px",
                  md: "12px",
                  sm: "8px",
                  xs: "8px",
                },
              }}
            >
              <Box
                sx={{
                  py: {
                    xl: "3rem",
                    lg: "3rem",
                    md: "3rem",
                    sm: "1.5rem",
                    xs: "1.5rem",
                  },
                  px: {
                    xl: "3rem",
                    lg: "3rem",
                    md: "3rem",
                    sm: "1.5rem",
                    xs: "1.5rem",
                  },
                  // bgcolor: "red",
                  border: "1px solid rgba(24, 2, 12, 0.05)",
                  height: "auto",
                  minHeight: "335px",
                  mt: "1rem",
                }}
              >
                <Box
                  sx={{
                    ...labeltext,
                    py: {
                      xl: "2rem",
                      lg: "2rem",
                      md: "2rem",
                      sm: "0.5rem",
                      xs: "0.5rem",
                    },
                  }}
                >
                  <Typography sx={{ ...SellerNameText, color: "#6B7A99" }}>
                    Invoice Date :
                  </Typography>
                  <Typography
                    sx={{
                      ...SellerNameText,
                      fontWeight: 500,
                      fontSize: {
                        xl: "12px",
                        lg: "12px",
                        md: "12px",
                        sm: "9px",
                        xs: "9px",
                      },
                      lineHeight: "20px",
                      color: "#6B7A99",
                      opacity: 0.7,
                    }}
                  >
                    04 / 03 / 2023
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ...labeltext,
                    py: {
                      xl: "2rem",
                      lg: "2rem",
                      md: "2rem",
                      sm: "0.5rem",
                      xs: "0.5rem",
                    },
                  }}
                >
                  <Typography sx={{ ...SellerNameText, color: "#6B7A99" }}>
                    Terms :
                  </Typography>
                  <Typography
                    sx={{
                      ...SellerNameText,
                      fontWeight: 500,
                      fontSize: {
                        xl: "12px",
                        lg: "12px",
                        md: "12px",
                        sm: "9px",
                        xs: "9px",
                      },
                      lineHeight: "20px",
                      color: "#6B7A99",
                      opacity: 0.7,
                    }}
                  >
                    Due On Receipt
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ...labeltext,
                    py: {
                      xl: "2rem",
                      lg: "2rem",
                      md: "2rem",
                      sm: "0.5rem",
                      xs: "0.5rem",
                    },
                  }}
                >
                  <Typography sx={{ ...SellerNameText, color: "#6B7A99" }}>
                    Shipping Proforma Invoice :
                  </Typography>
                  <Typography
                    sx={{
                      ...SellerNameText,
                      fontWeight: 500,
                      fontSize: {
                        xl: "12px",
                        lg: "12px",
                        md: "12px",
                        sm: "9px",
                        xs: "9px",
                      },
                      lineHeight: "20px",
                      color: "#6B7A99",
                      opacity: 0.7,
                    }}
                  >
                    B/SHPMT/02FY23/1470970
                  </Typography>
                </Box>
                {/* <Box
                  sx={{
                    ...labeltext,
                    py: {
                      xl: "2rem",
                      lg: "2rem",
                      md: "2rem",
                      sm: "0.5rem",
                      xs: "0.5rem",
                    },
                  }}
                >
                  <Typography sx={{ ...SellerNameText, color: "#6B7A99" }}>
                    Pickrr Proforma Invoice :
                  </Typography>
                  <Typography
                    sx={{
                      ...SellerNameText,
                      fontWeight: 500,
                      fontSize: {
                        xl: "12px",
                        lg: "12px",
                        md: "12px",
                        sm: "9px",
                        xs: "9px",
                      },
                      lineHeight: "20px",
                      color: "#6B7A99",
                      opacity: 0.7,
                    }}
                  >
                    B/SHPMT/02FY23/1470970
                  </Typography>
                </Box> */}
                <Box
                  sx={{
                    ...labeltext,
                    width: "100%",
                    py: {
                      xl: "2rem",
                      lg: "2rem",
                      md: "2rem",
                      sm: "0.5rem",
                      xs: "0.5rem",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      ...SellerNameText,
                      color: "#6B7A99",
                      width: "100%",
                    }}
                  >
                    Shipment Data URL :
                  </Typography>
                  <Typography
                    sx={{
                      ...SellerNameText,
                      fontWeight: 500,
                      fontSize: {
                        xl: "12px",
                        lg: "12px",
                        md: "12px",
                        sm: "9px",
                        xs: "9px",
                      },
                      lineHeight: "20px",
                      color: "#6B7A99",
                      opacity: 0.7,
                    }}
                  >
                    https://pickrr.s3.amazonaws.com/2023-03-04T18:37:14.512184_bills_reports.csv
                  </Typography>
                </Box>
                {/* <Box
                sx={{
                  display: "grid",
                  gap: "10px",
                  py: {
                    xl: "45px",
                    lg: "40px",
                    md: "26px",
                    sm: "18px",
                    xs: "12px",
                  },
                  borderBottom: "1px solid rgba(24, 2, 12, 0.05);",
                }}
              >
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <img src={AvatarForClientDetail} />
                  <Box>
                    <Typography sx={ClientTypogharphyTitleStyle}>
                      Hatake Kakashi
                    </Typography>
                    <Typography sx={ClientTypogharphyDescriptionStyle}>
                      {" "}
                      company name{" "}
                    </Typography>
                  </Box>
                </Box>
              </Box> */}
                {/* <Box sx={{ pt: "1rem" }}>
                <Typography sx={ClientTypogharphyTitleStyle}>
                  Email Address
                </Typography>
                <Typography sx={ClientTypogharphyDescriptionStyle}>
                  Loremipsum@gmail.com
                </Typography>
              </Box> */}
              </Box>
            </Grid>
          </Box>

          {/* grid box 2 */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // flexDirection: {
              //   xl: "row",
              //   lg: "row",
              //   md: "row",
              //   sm: "column",
              //   xs: "column",
              // },
            }}
          >
            <Grid
              container
              sx={{
                width: "98%",
                height: "auto",
                // py: "1rem",
                bgcolor: "#156DB6",
                border: "1px solid #F5F5F5",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                p: "15px",
              }}
            >
              <Grid item xl={10} lg={10} md={10} sm={6} xs={6}>
                <Typography
                  sx={{
                    ...SellerDetailsText,
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#FFFFFF",
                    // width: "50%",
                  }}
                >
                  # Item & Description
                </Typography>
              </Grid>
              <Grid
                item
                xl={1}
                lg={1}
                md={1}
                sm={2}
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Typography
                  sx={{
                    ...SellerDetailsText,
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#FFFFFF",
                    // width: "20%",
                  }}
                >
                  HSN/SAC
                </Typography>
              </Grid>
              {/* <Grid
                item
                xl={1}
                lg={1}
                md={1}
                sm={2}
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                <Typography
                  sx={{
                    ...SellerDetailsText,
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#FFFFFF",
                    // width: "20%",
                  }}
                >
                  IGST
                </Typography>
              </Grid> */}
              <Grid
                item
                xl={1}
                lg={1}
                md={1}
                sm={2}
                xs={2}
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  // bgcolor: "red",
                }}
              >
                <Typography
                  sx={{
                    ...SellerDetailsText,
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "21px",
                    color: "#FFFFFF",
                    // width: "20%",
                  }}
                >
                  Amount
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              width: "98%",
              padding: {
                xl: "16px",
                lg: "16px",
                md: "12px",
                sm: "8px",
                xs: "8px",
              },
            }}
          >
            <Box
              sx={{
                width: "99.5%",
                py: "1rem",
                background: "#fff",
                height: "auto",
                border: "1px solid rgba(24, 2, 12, 0.05)",
              }}
            >
              <Grid
                container
                sx={{
                  width: "100%",
                  height: "43px",
                  display: "flex",
                  alignItems: "center",
                  px: "2rem",
                  borderBottom: "1px solid rgba(24, 2, 12, 0.05)",
                }}
              >
                <Grid item xl={10} lg={10} md={10} sm={12} xs={12}>
                  <Typography
                    sx={{
                      ...SellerDetailsText,
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#6B7A99",
                      lineHeight: "21px",
                      width: "50%",
                    }}
                  >
                    1. Shipping Reimbursement cost ( Ref. Docket no. - Ref no)
                  </Typography>
                  <Typography
                    sx={{
                      ...SellerDetailsText,
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "#6B7A99",
                      lineHeight: "21px",
                      width: "50%",
                    }}
                  >
                    Total Order count: 3 {"  "}Billing Month: 01 Mar 2023, 00:00
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={1}
                  lg={1}
                  md={1}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    // bgcolor: "red",
                  }}
                >
                  <Typography
                    sx={{
                      ...SellerDetailsText,
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#6B7A99",
                      lineHeight: "21px",
                      // textAlign: "right",
                      // width: "20%",
                    }}
                  >
                    996812
                  </Typography>
                </Grid>
                {/* <Grid
                  item
                  xl={1}
                  lg={1}
                  md={1}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      ...SellerDetailsText,
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#6B7A99",
                      lineHeight: "21px",
                      textAlign: "right",
                    }}
                  >
                    344.34
                  </Typography>
                  <Typography
                    sx={{
                      ...SellerDetailsText,
                      fontWeight: 400,
                      fontSize: "12px",
                      color: "#6B7A99",
                      lineHeight: "21px",
                      textAlign: "right",
                    }}
                  >
                    18%
                  </Typography>
                </Grid> */}
                <Grid item xl={1} lg={1} md={1} sm={12} xs={12}>
                  <Typography
                    sx={{
                      ...SellerDetailsText,
                      fontWeight: 600,
                      fontSize: "12px",
                      color: "#6B7A99",
                      lineHeight: "21px",
                      textAlign: "right",
                    }}
                  >
                    1,913.00
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  width: "100%",
                  py: "1rem",
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  px: "2rem",
                }}
              >
                <Grid item xl={10} lg={10} md={10} sm={12} xs={12}></Grid>

                <Grid item xl={2} lg={2} md={2} sm={12} xs={12}>
                  <Typography
                    sx={{ ...ItemDetailBillingTextStyle, textAlign: "right" }}
                  >
                    1,913.00
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  alignItems: "center",
                  // p: "1rem",
                  // px: "2rem",
                }}
              >
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{
                    bgcolor: "#e1e4eb",
                    py: "5px",
                    display: "flex",
                    // bgcolor: "red",
                    flexDirection: "column",
                    justifyContent: "left",
                  }}
                >
                  <Typography
                    sx={{
                      ...ItemDetailBillingTextStyle,
                      fontWeight: 700,
                      fontSize: "16px",
                      lineHeight: "21px",
                      color: "#6B7A99",
                      textalign: "left",
                      ml: 2.2,
                    }}
                  >
                    Bank Details
                  </Typography>
                  <Typography
                    sx={{
                      ...ItemDetailBillingTextStyle,
                      fontWeight: 400,
                      fontSize: "10px",
                      lineHeight: "21px",
                      color: "#6B7A99",
                      textalign: "left",
                      ml: 2.2,
                    }}
                  >
                    (BXI Bank Account)
                  </Typography>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}></Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  md={3}
                  sm={12}
                  xs={12}
                  sx={{
                    bgcolor: "#e1e4eb",
                    py: "15px",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Typography
                    sx={{
                      ...ItemDetailBillingTextStyle,
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#363636",
                      textalign: "right",
                    }}
                  >
                    Total{" "}
                    <span
                      style={{
                        color: "#555555",
                        fontSize: "11px",
                        fontFamily: "Poppins",
                        fontWeight: 400,
                      }}
                    >
                      (Incl. of GST)
                    </span>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={1}
                  lg={1}
                  md={1}
                  sm={12}
                  xs={12}
                  sx={{
                    bgcolor: "#e1e4eb",
                    py: "15px",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Typography
                    sx={{
                      ...ItemDetailBillingTextStyle,
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#363636",
                      textalign: "right",
                    }}
                  >
                    2,257.34 &nbsp; &nbsp;
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  width: "100%",
                  height: "auto",
                  display: "flex",
                  alignItems: "start",
                  p: "1rem",
                  px: "2rem",
                }}
              >
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={4}
                  sm={12}
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                  }}
                >
                  <Typography
                    sx={{
                      ...ItemDetailBillingTextStyle,
                      textalign: "right",
                      fontWeight: 600,
                      fontSize: "12px",
                      lineHeight: "20px",
                      color: "#505050",
                      opacity: 0.6,
                    }}
                  >
                    Account no. :
                  </Typography>
                  <Typography
                    sx={{
                      ...ItemDetailBillingTextStyle,
                      textalign: "right",
                      fontWeight: 600,
                      fontSize: "12px",
                      lineHeight: "20px",
                      color: "#505050",
                      opacity: 0.6,
                    }}
                  >
                    IFS Code :
                  </Typography>
                  <Typography
                    sx={{
                      ...ItemDetailBillingTextStyle,
                      textalign: "right",
                      fontWeight: 600,
                      fontSize: "12px",
                      lineHeight: "20px",
                      color: "#505050",
                      opacity: 0.6,
                    }}
                  >
                    Branch Name :
                  </Typography>
                  <Typography
                    sx={{
                      ...ItemDetailBillingTextStyle,
                      textalign: "right",
                      fontWeight: 600,
                      fontSize: "12px",
                      lineHeight: "20px",
                      color: "#505050",
                      opacity: 0.6,
                    }}
                  >
                    Bank Name :
                  </Typography>
                </Grid>
                <Grid item xl={4} lg={4} md={4} sm={12} xs={12}></Grid>
                <Grid
                  item
                  xl={1.5}
                  lg={1.5}
                  md={1.5}
                  sm={12}
                  xs={12}
                  sx={{
                    py: "1rem",
                    display: "flex",
                    justifyContent: "left",
                  }}
                >
                  <Typography
                    sx={{
                      ...ItemDetailBillingTextStyle,
                      textalign: "right",
                      fontWeight: 600,
                      fontSize: "12px",
                      lineHeight: "20px",
                      color: "#6B7A99",
                    }}
                  >
                    &nbsp; &nbsp; Total In Words :
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={2.5}
                  lg={2.5}
                  md={2.5}
                  sm={12}
                  xs={12}
                  sx={{
                    py: "1rem",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Typography
                    sx={{
                      ...ItemDetailBillingTextStyle,
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "20px",
                      textAlign: "right",
                      color: "#6B7A99",
                    }}
                  >
                    Indian Rupee Two Thousand Two Hundred Fifty-Seven and
                    Thirsty- Four Paise Only
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          {/* terms box 3 */}
          {/* <Box
            sx={{
              width: "98%",
              px: {
                xl: "16px",
                lg: "16px",
                md: "12px",
                sm: "8px",
                xs: "8px",
              },
            }}
          >
            <Box>
              <Typography
                sx={{
                  ...SellerDetailsText,
                  fontWeight: 600,
                  color: "#6B7A99",
                }}
              >
                Notes
              </Typography>
              <Typography
                sx={{
                  ...SellerDetailsText,
                  color: "#6B7A99",
                }}
              >
                Thanks for the business
              </Typography>
            </Box>
            <Box
              sx={{
                py: "12px",
              }}
            >
              <Typography
                sx={{
                  ...SellerDetailsText,
                  fontWeight: 600,
                  color: "#6B7A99",
                }}
              >
                Terms & Conditions
              </Typography>
              <Typography
                sx={{
                  ...SellerDetailsText,
                  color: "#6B7A99",
                }}
              >
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>
                  Posuere morbi arcu facilisi adipiscing enim nulla lectus.
                </li>
                <li>
                  Malesuada amet volutpat sed quis egestas diam consectetur.
                </li>
                <li>Id dui pellentesque porta nunc scelerisque montes.</li>
              </Typography>
            </Box>
            <Box
              sx={{
                py: "12px",
              }}
            >
              <Box component="img" src={signature} />
            </Box>
          </Box> */}
        </Box>
        {/* button box 3 */}
        <Box
          sx={{
            width: {
              xl: "50%",
              lg: "50%",
              md: "50%",
              sm: "70%",
              xs: "70%",
            },
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            my: {
              xl: "16px",
              lg: "16px",
              md: "12px",
              sm: "8px",
              xs: "8px",
            },
          }}
        >
          <Button variant="outlined" sx={btnsx} onClick={handlePrint}>
            <Box component={"img"} src={print} sx={ButtonIconStyle}></Box>
            <Typography sx={ButtonTextStyle}>Print</Typography>
          </Button>
          <Button variant="outlined" sx={btnsx} onClick={handleDownload}>
            <Box component={"img"} src={download} sx={ButtonIconStyle}></Box>
            <Typography sx={ButtonTextStyle}>Download</Typography>
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Invoice;
const SellerDetailsText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "12px",
    lg: "12px",
    md: "10px",
    sm: "8px",
    xs: "7px",
  },
  lineHeight: {
    xl: "20px",
    lg: "20px",
    md: "16px",
    sm: "14px",
    xs: "10px",
  },
};

const SellerNameText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "16px",
    lg: "16px",
    md: "14px",
    sm: "14px",
    xs: "10px",
  },
  lineHeight: "24px",
  textAlign: "left",
  color: "#6B7A99",
};

const ItemDetailBillingTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 600,
  textAlign: "flex-end",
  fontSize: "12px",
  // lineHeight: "20px",
  color: "#6B7A99",
};

const ButtonStyle = {
  border: "1px solid rgba(24, 2, 12, 0.3);",
  borderRadius: "10px",
  px: {
    xl: "16px",
    lg: "16px",
    md: "12px",
    sm: "8px",
    xs: "8px",
  },
  py: {
    xl: "8px",
    lg: "8px",
    md: "6px",
    sm: "4px",
    xs: "4px",
  },
  width: "90%",
  height: {
    xl: "50px",
    lg: "50px",
    md: "40px",
    sm: "40px",
    xs: "40px",
  },
  display: "flex",
  gap: "10px",
};

const ButtonTextStyle = {
  textTransform: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "14px",
    lg: "14px",
    md: "12px",
    sm: "8px",
    xs: "8px",
  },
  textAlign: "center",
  color: "#156DB6",
};

const ButtonIconStyle = {
  width: {
    xl: "24px",
    lg: "24px",
    md: "20px",
    sm: "20px",
    xs: "18px",
  },
  height: "auto",
};

const labeltext = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const btnsx = {
  width: "100%",
  height: "51px",
  maxWidth: "168px",
  borderRadius: "10px",
  borderColor: "#156DB6",
  color: "#156DB6",
  textTransform: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  textAlign: "center",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  cursor: "pointer",
};
