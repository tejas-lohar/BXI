import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from "react-toastify";
import print from "../../src/assets/Images/CommonImages/PrintInvoice.svg";
import download from "../../src/assets/Images/CommonImages/downloadinvoice.svg";
import { useUpdatePurchaseOrder } from "../Hooks/OrderActions/useUpdatePurchaseOrder";
import BreadCrumbHeader from "../components/Header/BreadCrumbHeader";
import { getOrderSummary } from "../redux/action/OrderSummaryActions";
import axios from "axios";

const TaxInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
          pdf.save("print.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
        });
    }, 1000);
  };

  // const {
  //   OrderSummary: OrderSummarydata,
  //   //  loading: OrderSummaryDataLoading
  // } = useSelector((state) => state.OrderSummaryD);

  // useEffect(() => {
  //   // dispatch(getCompanyById(OrderSummarydata?.SellerCompanyId));
  //   dispatch(getOrderSummary(id));
  // }, [dispatch, id]);
  const [setOrderData, OrderData] = useState();

  const getAllOrder = async () => {
    await axios
      .get(`order/get_order_by_invoiceId`, {
        Id: "64a53f1ab0bd899a32358875",
      })
      .then((res) => {
        console.log("resorrder", res);
        setOrderData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let storeDataIds = [];
  let TotalQuantity = 0;
  let totalAmount = 0;
  let totalPricePerUnit = 0;
  let totatlTaxableAmount = 0;
  let totalGST = 0;
  let totalAmountWithGST = 0;
  let totalAmountWithTax = 0;
  // OrderSummarydata?.ProductData?.map((item) => {
  //   storeDataIds.push(item);
  //   TotalQuantity += item.ProductQuantity;
  //   totalAmount += item.PricePerUnit * item.ProductQuantity;
  //   totalPricePerUnit += item.PricePerUnit;
  //   totatlTaxableAmount += item.PricePerUnit * item.ProductQuantity;
  //   totalGST += item.GST;
  //   totalAmountWithGST +=
  //     item?.PricePerUnit * item?.ProductQuantity * (item?.GST / 100);
  //   totalAmountWithTax +=
  //     item?.PricePerUnit * item?.ProductQuantity * (item?.GST / 100) +
  //     item?.PricePerUnit * item?.ProductQuantity;
  // });
  // console.log("storeDataIds", totalGST, totalAmountWithGST);
  useEffect(() => {
    getAllOrder();
  }, []);

  // useEffect(() => {
  //   if (updatePurchaseOrderData?.status === "Accepted") {
  //     toast.success("Order Accepted", {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     setTimeout(() => {
  //       navigate("/home/buyerordersummaryhistory");
  //     }, 2000);
  //   } else if (updatePurchaseOrderData?.status === "Rejected") {
  //     toast.error("Order Rejected", {
  //       position: "top-center",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     setTimeout(() => {
  //       navigate("/home/buyerordersummaryhistory");
  //     }, 2000);
  //   }
  // }, [dispatch, updatePurchaseOrderData]);

  return (
    <Paper sx={{ width: "100%", bgcolor: "transparent" }} elevation={0}>
      <BreadCrumbHeader
        MainText="Tax Invoice"
        LinkText1="{splitedurl[1]}"
        LinkText2="{splitedurl[2]}"
        link1="Link1"
        link2="link2"
      />
      <Paper
        sx={{
          bgcolor: "#fff",
          boxShadow: "none",
          p: 3,
          borderRadius: "20px",
          height: "auto",
          minHeight: "520px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          //   alignItems: "center",
          //   bgcolor: "red",
          gap: "30px",
        }}
        elevation={0}
      >
        <Box
          sx={{
            bgcolor: "transparent",
            width: "100%",
            height: "100%",
          }}
          elevation={0}
        >
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

          <Box
            sx={{
              width: "100%",
              bgcolor: "white",
              mx: "auto",
              borderRadius: "17px",
              py: "40px",
            }}
            elevation={1}
            ref={componentRef}
          >
            <Box
              sx={{
                width: "95%",
                mx: "auto",
                borderLeft: "1px solid #cdcdcd",
                borderRight: "1px solid #cdcdcd",
                borderBottom: "1px solid #cdcdcd",
                borderTop: "1px solid #cdcdcd",
                px: "0px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "auto",
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "130px",
                    width: "30%",
                  }}
                >
                  <Typography
                    sx={{
                      ...TextLastStyle,
                      color: "#6B7A99",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    Seller Company Logo
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderLeft: "1px solid #cdcdcd",
                    height: "130px",
                    width: "40%",
                  }}
                >
                  <Typography sx={CommongTextStyle}></Typography>
                  <Typography
                    sx={{
                      ...TextLastStyle,
                      color: "#6B7A99",
                      fontSize: "14px",
                      fontWeight: 600,
                      width: "98%",
                    }}
                  >
                    Seller Legal Name as per GST Certificate
                  </Typography>
                  <Typography
                    sx={{
                      ...TextLastStyle,
                      color: "#6B7A99",
                      fontSize: "14px",
                      fontWeight: 600,
                      width: "98%",
                    }}
                  >
                    Seller’s Registered address
                  </Typography>
                  <Typography sx={{ ...TextStyleTwo, width: "98%" }}>
                    Tel:
                  </Typography>
                  <Box
                    sx={{
                      width: "98%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Typography sx={{ ...TextStyleTwo, width: "50%" }}>
                      GSTIN:
                    </Typography>
                    <Typography sx={{ ...TextStyleTwo, width: "50%" }}>
                      Email ID:
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    // borderRight: "1px solid #cdcdcd",
                    borderLeft: "1px solid #cdcdcd",
                    height: "130px",
                    width: "30%",
                  }}
                >
                  <Typography
                    sx={{
                      ...TextLastStyle,
                      color: "#8272B5",
                      borderBottom: "1px solid #8272B5",
                    }}
                  >
                    Seller’s website
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "42px",
                  mx: "auto",
                  background: "#156DB6",
                  borderRadius: "10px",
                }}
              >
                <Typography
                  sx={{
                    ...CommongTextStyle,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    height: "100%",
                  }}
                >
                  Tax Invoice
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    mx: "auto",
                    borderRight: "1px solid #CDCDCD",
                  }}
                >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            p: 0.2,
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            Invoice No : Baner Biz Bay , 6th Floor, Opposite
                            Syngenta
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            p: 0.2,
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            Invoice Date : Baner Biz Bay , 6th Floor, Opposite
                            Syngenta
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            p: 0.2,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            {" "}
                            State : Maharashtra
                          </Typography>
                          <Typography sx={TextStyleTwo}> Code : 107</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
                <Box
                  sx={{
                    width: "60%",
                    mx: "auto",
                  }}
                >
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          sx={{
                            p: 0.2,
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            Place of Supply:
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            p: 0.2,
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            Baner Biz Bay , 6th Floor, Opposite Syngenta
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            p: 0.2,
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            Delivery Challan no:
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            p: 0.2,
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            27AABCN8601N1Z6
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          sx={{
                            p: 0.2,
                          }}
                        >
                          <Typography sx={TextStyleTwo}>
                            {" "}
                            Purchase Order no:
                          </Typography>{" "}
                        </TableCell>
                        <TableCell
                          sx={{
                            p: 0.2,
                          }}
                        >
                          <Typography sx={TextStyleTwo}>Maharashtra</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  mx: "auto",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "21px",
                    background: "#156DB6",
                    borderRadius: "3px 0px 0px 3",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      height: "100%",
                      borderRight: "1px solid #F3F2F3",
                    }}
                  >
                    <Typography
                      sx={{
                        ...CommongTextStyle,
                        fontSize: "10px",
                        color: "white",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      &nbsp; Bill to Party
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "60%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                      height: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        ...CommongTextStyle,
                        color: "white",
                        fontSize: "10px",
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      &nbsp; Ship to Party
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      mx: "auto",
                      borderRight: "1px solid #CDCDCD",
                    }}
                  >
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}>
                              Buyer Name{" "}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}></Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}>
                              Address :{" "}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}>
                              Baner Biz Bay , 6th Floor, Opposite Syngenta ,
                              Baner , Pune - 411045
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}> City : </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}>Ahmedabad</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}> GSTIN : </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}>
                              27AABCN8601N1Z6
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}> State :</Typography>{" "}
                          </TableCell>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}>
                              Maharashtra
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                  <Box
                    sx={{
                      width: "60%",
                    }}
                  >
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                            }}
                          >
                            <Typography sx={TextStyleTwo}>
                              {" "}
                              GSTIN : 27AABCN8601N1Z6
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            sx={{
                              p: 0.2,
                              borderBottom: "none",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Typography sx={{ ...TextStyleTwo, width: "50%" }}>
                              {" "}
                              State : Maharashtra
                            </Typography>{" "}
                            <Typography sx={{ ...TextStyleTwo, width: "50%" }}>
                              {" "}
                              Code : 107
                            </Typography>{" "}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Box>
              </Box>

              <TableContainer
                component={Paper}
                sx={{
                  maxWidth: "100%",
                  mx: "auto",
                  boxShadow: "none",
                  borderRadius: "0px",
                }}
              >
                <Table
                  sx={{
                    minWidth: "700px",
                    boxShadow: "none",
                    borderRight: "none",
                  }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow sx={{ height: "33px", bgcolor: "#156DB6" }}>
                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TableTextStyle}> S. No.</Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={5}
                        sx={tablecell}
                      >
                        <Typography sx={TableTextStyle}>
                          Product / Service Description
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TableTextStyle}>
                          HSN / SAC code
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TableTextStyle}>QTY</Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TableTextStyle}>
                          Rate (in Barter Coins)
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TableTextStyle}>
                          Amount (in Barter Coins)
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TableTextStyle}>
                          Rate (in INR)
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TableTextStyle}>
                          Amount (in INR)
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TableTextStyle}>Discount</Typography>
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={2}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TableTextStyle}>
                          Taxable Value
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {OrderSummarydata?.ProductData?.map((row) => {
                        return (
                        );
                      })} */}
                    <TableRow
                      sx={{
                        height: "21px",
                      }}
                    >
                      <TableCell
                        align="left"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>1</Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>product name</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>9983</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>UOM</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>QTY</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>rate</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>amount</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>Discount</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>Discount</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={2}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>tax value</Typography>
                      </TableCell>
                    </TableRow>

                    <TableRow
                      sx={{
                        height: "21px",
                      }}
                    >
                      <TableCell
                        align="center"
                        colSpan={4}
                        rowSpan={1}
                        sx={{
                          borderRight: "1px solid #CDCDCD",
                          bgcolor: "#156DB6",
                          p: 0.2,
                        }}
                      >
                        <Typography
                          sx={{ ...TableBottomtext, color: "#ffffff" }}
                        >
                          Total Amount Before Tax
                        </Typography>
                      </TableCell>

                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="center"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>
                          {totalAmount}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>
                          {totatlTaxableAmount}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>
                          {totalAmountWithTax}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>
                          {totalAmountWithTax}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        height: "21px",
                      }}
                    >
                      <TableCell
                        align="center"
                        colSpan={4}
                        rowSpan={1}
                        sx={{ borderRight: "1px solid #CDCDCD" }}
                      >
                        <Typography sx={TextLastStyle}>
                          Terms & Conditions{" "}
                        </Typography>
                      </TableCell>

                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="left"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>CGST</Typography>
                        <Typography sx={TextLastStyle}>SGST</Typography>
                        <Typography sx={TextLastStyle}>IGST</Typography>
                        <Typography sx={TextLastStyle}>-</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>0%</Typography>
                        <Typography sx={TextLastStyle}>0%</Typography>
                        <Typography sx={TextLastStyle}>0%</Typography>
                        <Typography sx={TextLastStyle}>-</Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography sx={TextLastStyle}>0000</Typography>
                        <Typography sx={TextLastStyle}>0000</Typography>
                        <Typography sx={TextLastStyle}>-</Typography>
                        <Typography sx={TextLastStyle}>-</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        height: "21px",
                      }}
                    >
                      <TableCell
                        align="left"
                        colSpan={6}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          Total amount payable ( In words )
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="left"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          Total GST
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          5,280
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        height: "21px",
                      }}
                    >
                      <TableCell
                        align="left"
                        colSpan={6}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          INR Thirty Six Thousand Four Hundred Forty Only
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="left"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          Invoice Total
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      ></TableCell>
                      <TableCell
                        align="right"
                        colSpan={1}
                        rowSpan={1}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          35,280
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  width: "100%",
                  mx: "auto",
                  // borderRight: "1px solid #CDCDCD",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow
                      sx={{
                        height: "21px",
                      }}
                    >
                      <TableCell
                        align="left"
                        colSpan={2}
                        rowSpan={2}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          HSN / SAC
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={2}
                        rowSpan={2}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          Taxable Value
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={2}
                        rowSpan={2}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          CGST TAX
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={2}
                        rowSpan={2}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          SGST TAX
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={2}
                        rowSpan={2}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          Integrated Tax
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        colSpan={2}
                        rowSpan={2}
                        sx={tablecell}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          Total Tax Amount
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableRow
                    sx={{
                      height: "21px",
                    }}
                  >
                    <TableCell
                      align="left"
                      colSpan={6}
                      rowSpan={1}
                      sx={{
                        borderRight: "1px solid #CDCDCD",
                        bgcolor: "#156DB6",
                        p: 0.2,
                      }}
                    >
                      <Typography sx={{ ...TableBottomtext, color: "#ffffff" }}>
                        Bank Details : Name : Sellers Bank Details
                      </Typography>
                    </TableCell>

                    <TableCell
                      align="center"
                      colSpan={6}
                      rowSpan={1}
                      sx={tablecell}
                    >
                      <Typography
                        sx={{
                          ...TextLastStyle,
                          color: "#858585",
                          fontWeight: 600,
                        }}
                      >
                        For Seller Company
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Table>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  mx: "auto",
                  borderRight: "1px solid #CDCDCD",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{
                          p: 0.2,
                          borderBottom: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          Account no. :
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          p: 0.2,
                          borderBottom: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          {" "}
                          IFS Code :
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          p: 0.2,
                          borderBottom: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          Branch Name :
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        sx={{
                          p: 0.2,
                          borderBottom: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            color: "#858585",
                            fontWeight: 600,
                          }}
                        >
                          {" "}
                          Bank Name :
                        </Typography>{" "}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        p: 0.2,
                        borderTop: "1px solid #CDCDCD",
                        height: "42px",
                      }}
                    >
                      <TableCell
                        sx={{
                          p: 0.2,
                          height: "42px",
                          border: "none",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          sx={{
                            ...TextLastStyle,
                            fontSize: "8px",
                          }}
                        >
                          {" "}
                          Certified that the particulars given above are true
                          and correct ( E & OE )
                        </Typography>{" "}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Box
                  sx={{
                    borderTop: "1px solid #CDCDCD",
                    height: "22px",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      ...TextLastStyle,
                      fontSize: "8px",
                      textAlign: "center",
                    }}
                  >
                    This is a computer generated invoice
                  </Typography>{" "}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              mt: 3,
              pb: 3,
            }}
          >
            <Box
              sx={{
                maxWidth: "360px",
                mx: "auto",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
                height: "100%",
              }}
            >
              <Button variant="outlined" sx={btnsx} onClick={handlePrint}>
                <Box component={"img"} src={print} sx={ButtonIconStyle} /> Print
              </Button>

              <Button variant="outlined" sx={btnsx} onClick={handleDownload}>
                <Box component={"img"} src={download} sx={ButtonIconStyle} />{" "}
                Download
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
};

export default TaxInvoice;
const CommongTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "14px",
  lineHeight: "21px",

  color: "#6B7A99",
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

const TextStyleTwo = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "left",
  color: "#6B7A99",
  opacity: 0.7,
};

const TableTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "10px",
  lineHeight: "20px",
  color: "#FFFFFF",
};

const TableBottomtext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "11px",
  lineHeight: "20px",

  color: "#505050",
};

const TableTotaltextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",
  color: "#050505",
  opacity: 1,
};

const TextLastStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "12px",
  lineHeight: "20px",
  color: "#98a2b8",
  // opacity: 0.7,
};

const BanktText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "10px",
  lineHeight: "11px",
  color: "#505050",
};

const BanktbottomText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "9px",
  lineHeight: "11px",
  color: "#505050",
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

const tablecell = { borderRight: "1px solid #CDCDCD", p: 0.2 };
