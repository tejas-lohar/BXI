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
  import React, { useEffect, useRef } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
  import { useReactToPrint } from "react-to-print";
  import { ToastContainer, toast } from "react-toastify";
  import print from "../../src/assets/Print.svg";
  import download from "../../src/assets/document-download.svg";
  import { useUpdatePurchaseOrder } from "../Hooks/OrderActions/useUpdatePurchaseOrder";
  import BreadCrumbHeader from "../components/Header/BreadCrumbHeader";
  import { getOrderSummary } from "../redux/action/OrderSummaryActions";

  const MembershipInvoice = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    const {
      OrderSummary: OrderSummarydata,
      //  loading: OrderSummaryDataLoading
    } = useSelector((state) => state.OrderSummaryD);
  
    useEffect(() => {
      // dispatch(getCompanyById(OrderSummarydata?.SellerCompanyId));
      dispatch(getOrderSummary(id));
    }, [dispatch, id]);
  
    let storeDataIds = [];
    let TotalQuantity = 0;
    let totalAmount = 0;
    let totalPricePerUnit = 0;
    let totatlTaxableAmount = 0;
    let totalGST = 0;
    let totalAmountWithGST = 0;
    let totalAmountWithTax = 0;
    OrderSummarydata?.ProductData?.map((item) => {
      storeDataIds.push(item);
      TotalQuantity += item.ProductQuantity;
      totalAmount += item.PricePerUnit * item.ProductQuantity;
      totalPricePerUnit += item.PricePerUnit;
      totatlTaxableAmount += item.PricePerUnit * item.ProductQuantity;
      totalGST += item.GST;
      totalAmountWithGST +=
        item?.PricePerUnit * item?.ProductQuantity * (item?.GST / 100);
      totalAmountWithTax +=
        item?.PricePerUnit * item?.ProductQuantity * (item?.GST / 100) +
        item?.PricePerUnit * item?.ProductQuantity;
    });
    console.log("storeDataIds", totalGST, totalAmountWithGST);
  
    const {
      data: updatePurchaseOrderData,
      // isLoading: updatePurchaseOrderLoading,
      // error: updatePurchaseOrderError,
      // mutate: updatePurchaseOrderMutate,
    } = useUpdatePurchaseOrder();
  
    console.log("updatePurchaseOrderData", updatePurchaseOrderData);
  
    // async function mutatePurchaseOrder() {
    //   await updatePurchaseOrderMutate({
    //     status: "Accepted",
    //     OrderSummaryId: id,
    //   });
    // }
  
    // let notificationMessage = "Order Accepted";
    // let notificationType = "info";
    // let socketId = socket.id;
    useEffect(() => {
      if (updatePurchaseOrderData?.status === "Accepted") {
        toast.success("Order Accepted", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/home/buyerordersummaryhistory");
        }, 2000);
      } else if (updatePurchaseOrderData?.status === "Rejected") {
        toast.error("Order Rejected", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/home/buyerordersummaryhistory");
        }, 2000);
      }
    }, [dispatch, updatePurchaseOrderData]);
  
    // async function mutatePurchaseOrderRejected() {
    //   await updatePurchaseOrderMutate({
    //     status: "Rejected",
    //     OrderSummaryId: id,
    //   });
    // }
  
    console.log("updatePurchaseOrderData", OrderSummarydata);
  
    return (
      <Paper sx={{ width: "100%", bgcolor: "transparent" }} elevation={0}>
        <BreadCrumbHeader
          MainText="Membership Invoice"
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
     {/*       <ToastContainer
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
          /> */} 
            
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  width: "97%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  gap: "20px",
                }}
              >
                <Box onClick={handlePrint} sx={{ cursor: "pointer" }}>
                  <img
                    src={print}
                    alt="print"
                    style={{ height: "30px", width: "30px" }}
                  />
                </Box>
                <Box onClick={handlePrint} sx={{ cursor: "pointer" }}>
                  <img
                    src={download}
                    alt="download"
                    style={{ height: "30px", width: "30px", mr: "5" }}
                  />
                </Box>
              </Box>
            </Box>
  
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
                    BXI Logo
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
                    <Typography sx={CommongTextStyle}>
                      {OrderSummarydata?.BuyerDetails?.BuyerCompanyName}
                    </Typography>
                    <Typography
                      sx={{
                        ...CommongTextStyle,
                        textAlign: "center",
                        fontSize: "11px",
                      }}
                    >
                      Buyer Legal Name as per GSTIN
                    </Typography>
                    <Typography>Tel:</Typography>
                    <Typography>GSTIN:</Typography>
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
                    <Typography>Buyer’s website</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "42px",
                    mx: "auto",
                    background: "#445FD2",
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
                    Membership Invoice
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mx: "auto",
                    height: "40px",
                    borderRight: "1px solid #cdcdcd",
                    borderLeft: "1px solid #cdcdcd",
                  }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      borderRight: "1px solid #F3F2F3",
                      pl: 1,
                    }}
                  >
                    <Typography sx={CommongTextStyle}>
                      PO Number: {OrderSummarydata?.PoNumber}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "50%",
                      pl: 1,
                    }}
                  >
                    <Typography sx={CommongTextStyle}>
                      PO Date:{" "}
                      {new Date(OrderSummarydata?.PoDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    mx: "auto",
                    border: "1px solid #cdcdcd",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "21px",
                      background: "#445FD2",
                      borderRadius: "3px 0px 0px 3",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "50%",
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
                        }}
                      >
                        Bill To
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "50%",
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
                        }}
                      >
                        BXI’S Details
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      py: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        mx: "auto",
                        borderRight: "1px solid #CDCDCD",
                        p: 2,
                      }}
                    >
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}>
                                Buyer Name{" "}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}>
                                {" "}
                                {
                                  OrderSummarydata?.SellerDetails
                                    ?.SellerCompanyName
                                }
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}>
                                Address :{" "}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                p: 0.5,
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
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}> GSTIN : </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                p: 0.5,
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
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}> State :</Typography>{" "}
                            </TableCell>
                            <TableCell
                              sx={{
                                p: 0.5,
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
                    <Box sx={{ width: "100%", mx: "auto", p: 2 }}>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell
                              sx={{
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}>
                                BXI Details{" "}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}>
                                {" "}
                                {OrderSummarydata?.BuyerDetails?.BuyerCompanyName}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              sx={{
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}>
                                {" "}
                                Address :{" "}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                p: 0.5,
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
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}> GSTIN : </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                p: 0.5,
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
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}> State : </Typography>{" "}
                            </TableCell>
                            <TableCell
                              sx={{
                                p: 0.5,
                                borderBottom: "none",
                              }}
                            >
                              <Typography sx={TextStyleTwo}>
                                {" "}
                                Maharashtra
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
                  }}
                >
                  <Table sx={{ minWidth: "700px" }} aria-label="customized table">
                    <TableHead>
                      <TableRow sx={{ height: "42px", bgcolor: "#445FD2" }}>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableTextStyle}> S. No.</Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={2}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableTextStyle}>
                            Product / Service Description
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableTextStyle}>HSN Code</Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableTextStyle}>QTY</Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableTextStyle}>Rate</Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableTextStyle}>Amount</Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableTextStyle}>
                            Taxable Value
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            p: 0,
                            maxWidth: "200px",
                            mx: "auto",
                          }}
                          align="center"
                        >
                          <TableRow>
                            <TableCell
                              align="center"
                              colSpan={2}
                              sx={{
                                width: "150px",
                                borderRight: "1px solid #CDCDCD",
                                p: 0,
                                height: "35px",
                              }}
                            >
                              <Typography sx={TableTextStyle}>CGST</Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              sx={{
                                width: "150px",
                                p: 0,
                                height: "35px",
                              }}
                            >
                              <Typography sx={TableTextStyle}>SGST</Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                borderRight: "1px solid #CDCDCD",
                                p: 0,
                                height: "35px",
                                width: "25%",
                              }}
                            >
                              {" "}
                              <Typography sx={TableTextStyle}>%</Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "25%",
                                borderRight: "1px solid #CDCDCD",
                                p: 0,
                                height: "35px",
                              }}
                            >
                              {" "}
                              <Typography sx={TableTextStyle}>Rs.</Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                width: "25%",
                                borderRight: "1px solid #CDCDCD",
                                p: 0,
                                height: "100%",
                              }}
                            >
                              {" "}
                              <Typography sx={TableTextStyle}>%</Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ p: 0, height: "100%", width: "25%" }}
                            >
                              {" "}
                              <Typography sx={TableTextStyle}>Rs.</Typography>
                            </TableCell>
                          </TableRow>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            bgcolor: "#445FD2",
                            width: "170px",
                            borderLeft: "1px solid #CDCDCD",
                          }}
                        >
                          <Typography sx={TableTextStyle}>Total</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {OrderSummarydata?.ProductData?.map((row) => {
                        return (
                          <TableRow
                            sx={{
                              height: "42px",
                              backgroundColor: "#F7F7F7",
                            }}
                          >
                            <TableCell
                              align="center"
                              colSpan={1}
                              rowSpan={1}
                              sx={{ borderRight: "1px solid #CDCDCD" }}
                            >
                              <Typography sx={TableBottomtext}>1</Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={1}
                              rowSpan={1}
                              sx={{ borderRight: "1px solid #CDCDCD" }}
                            >
                              <Typography sx={TableBottomtext}>
                                {row?.ProductName}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={1}
                              rowSpan={1}
                              sx={{ borderRight: "1px solid #CDCDCD" }}
                            >
                              <Typography sx={TableBottomtext}>9983</Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={1}
                              rowSpan={1}
                              sx={{ borderRight: "1px solid #CDCDCD" }}
                            >
                              <Typography sx={TableBottomtext}>
                                {row?.ProductQuantity}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={1}
                              rowSpan={1}
                              sx={{ borderRight: "1px solid #CDCDCD" }}
                            >
                              <Typography sx={TableBottomtext}>
                                {row?.PricePerUnit}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={1}
                              rowSpan={1}
                              sx={{ borderRight: "1px solid #CDCDCD" }}
                            >
                              <Typography sx={TableBottomtext}>
                                {row?.PricePerUnit * row?.ProductQuantity}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={1}
                              rowSpan={1}
                              sx={{ borderRight: "1px solid #CDCDCD" }}
                            >
                              <Typography sx={TableBottomtext}>
                                {" "}
                                {row?.PricePerUnit * row?.ProductQuantity}
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{
                                p: 0,
                                maxWidth: "200px",
                                mx: "auto",
                              }}
                              align="center"
                            >
                              <TableRow>
                                <TableCell
                                  align="center"
                                  colSpan={2}
                                  sx={{
                                    width: "150px",
                                    borderRight: "1px solid #CDCDCD",
                                  }}
                                >
                                  <Typography sx={TableBottomtext}>
                                    {row?.GST / 2}
                                  </Typography>
                                </TableCell>
  
                                <TableCell
                                  align="center"
                                  colSpan={2}
                                  sx={{
                                    width: "150px",
                                    borderRight: "1px solid #CDCDCD",
                                  }}
                                >
                                  <Typography sx={TableBottomtext}>
                                    {" "}
                                    {row?.PricePerUnit *
                                      row?.ProductQuantity *
                                      (row?.GST / 2 / 100)}
                                  </Typography>
                                </TableCell>
                                <TableCell
                                  align="center"
                                  colSpan={2}
                                  sx={{
                                    width: "150px",
                                    borderRight: "1px solid #CDCDCD",
                                  }}
                                >
                                  <Typography sx={TableBottomtext}>
                                    {row?.GST / 2}
                                  </Typography>
                                </TableCell>
  
                                <TableCell
                                  align="center"
                                  colSpan={2}
                                  sx={{
                                    width: "150px",
                                    borderRight: "1px solid #CDCDCD",
                                  }}
                                >
                                  <Typography sx={TableBottomtext}>
                                    {" "}
                                    {row?.PricePerUnit *
                                      row?.ProductQuantity *
                                      (row?.GST / 2 / 100)}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={1}
                              rowSpan={1}
                              sx={{ borderRight: "1px solid #CDCDCD" }}
                            >
                              <Typography sx={TableBottomtext}>
                                {row?.PricePerUnit *
                                  row?.ProductQuantity *
                                  (row?.GST / 100) +
                                  row?.PricePerUnit * row?.ProductQuantity}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow
                        sx={{
                          height: "42px",
                          backgroundColor: "#F7F7F7",
                        }}
                      >
                        <TableCell
                          align="center"
                          colSpan={3}
                          rowSpan={3}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableBottomtext}>Total</Typography>
                        </TableCell>
  
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableBottomtext}>
                            {TotalQuantity}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableBottomtext}>
                            {totalPricePerUnit}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableBottomtext}>
                            {totalAmount}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableBottomtext}>
                            {totatlTaxableAmount}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            p: 0,
                            maxWidth: "200px",
                            mx: "auto",
                          }}
                          align="center"
                        >
                          <TableRow>
                            <TableCell
                              align="center"
                              colSpan={2}
                              sx={{
                                width: "100px",
                                borderRight: "1px solid #CDCDCD",
                              }}
                            ></TableCell>
  
                            <TableCell
                              align="center"
                              colSpan={2}
                              sx={{
                                width: "100px",
                                borderRight: "1px solid #CDCDCD",
                              }}
                            >
                              <Typography sx={TableBottomtext}>
                                {totalAmountWithGST / 2}
                              </Typography>
                            </TableCell>
                            <TableCell
                              align="center"
                              colSpan={2}
                              sx={{
                                width: "100px",
                                borderRight: "1px solid #CDCDCD",
                              }}
                            ></TableCell>
  
                            <TableCell
                              align="center"
                              colSpan={2}
                              sx={{
                                width: "100px",
                                borderRight: "1px solid #CDCDCD",
                              }}
                            >
                              <Typography sx={TableBottomtext}>
                                {totalAmountWithGST / 2}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableCell>
                        <TableCell
                          align="center"
                          colSpan={1}
                          rowSpan={1}
                          sx={{ borderRight: "1px solid #CDCDCD" }}
                        >
                          <Typography sx={TableBottomtext}>
                            {totalAmountWithTax}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                    mx: "auto",
                    border: "1px solid #cdcdcd",
                  }}
                >
                  <Box
                    sx={{
                      width: "60%",
                      height: "100%",
                      borderRight: "1px solid #CDCDCD",
                    }}
                  >
                    <Box
                      sx={{
                        background: "#445FD2",
                        borderRadius: "3px 0px 0px 3",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={TableTextStyle}>
                        Total amount in words
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        minHeight: "100px",
                      }}
                    >
                      <Typography
                        sx={{
                          ...TableTotaltextStyle,
                          fontWeight: 600,
                          fontSize: "13px",
                        }}
                      >
                        One Lac Twenty Thousand Rupees only
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "40%",
                    }}
                  >
                    <Table
                      sx={{
                        height: "120px",
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <TableRow sx={{ width: "100%", display: "flex" }}>
                        <TableCell
                          sx={{
                            pl: 1,
                            py: 0.5,
                            borderBottom: "none",
                            width: "50%",
                          }}
                          colSpan={1}
                        >
                          <Typography sx={TableTotaltextStyle}>
                            Total: Amount before Tax{" "}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderBottom: "none",
                            width: "50%",
                          }}
                          align="right"
                        >
                          <Typography sx={TableBottomtext}>
                            {totatlTaxableAmount}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ width: "100%", display: "flex" }}>
                        <TableCell
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderBottom: "none",
                            width: "50%",
                          }}
                        >
                          <Typography sx={TableTotaltextStyle}>
                            Add:GST
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderBottom: "none",
                            width: "50%",
                          }}
                          align="right"
                        >
                          <Typography sx={TableBottomtext}>
                            {totalAmountWithTax}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                    <TableCell sx={{ px: 1, py: 0.5, borderBottom: "none" }}>
                      <Typography sx={TableTotaltextStyle}>
                        Total:Tax Amount
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ px: 1, py: 0.5, borderBottom: "none" }}
                      align="right"
                    >
                      <Typography sx={TableBottomtext}>
                        {(totatlTaxableAmount * totalGST) / 100}
                      </Typography>
                    </TableCell>
                  </TableRow> */}
                      {/* <TableRow>
                    <TableCell sx={{ px: 1, py: 0.5, borderBottom: "none" }}>
                      <Typography sx={TableTotaltextStyle}>
                        Less:Round Off
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ px: 1, py: 0.5, borderBottom: "none" }}
                      align="right"
                    >
                      <Typography sx={TableBottomtext}>-</Typography>
                    </TableCell>
                  </TableRow> */}
                    </Table>
                    <Box
                      sx={{
                        background: "#445FD2",
                        borderRadius: "3px 0px 0px 3",
                        display: "flex",
                        justifyContent: "space-between",
                        px: 1,
                      }}
                    >
                      <Typography sx={TableTextStyle}>
                        Total amount after Tax :
                      </Typography>
                      <Typography sx={TableTextStyle}>
                        {Number(totalAmountWithTax) + totatlTaxableAmount}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    mx: "auto",
                    justifyContent: "space-between",
                    border: "1px solid #cdcdcd",
                  }}
                >
                  <Box
                    sx={{
                      width: "60%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        borderRight: "1px solid #CDCDCD",
                      }}
                    >
                      <Box
                        sx={{
                          background: "#445FD2",
                          borderRadius: "3px 0px 0px 3",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography sx={TableTextStyle}>Bank Details</Typography>
                      </Box>
                      <Box>
                        <ul>
                          <li style={{ listStyleType: "none" }}>
                            <Typography sx={BanktText}>
                              {" "}
                              Account Number
                            </Typography>
                          </li>
                          <li style={{ listStyleType: "none" }}>
                            <Typography sx={BanktbottomText}>
                              12345787989866
                            </Typography>
                          </li>
                        </ul>
                        <ul>
                          <li style={{ listStyleType: "none" }}>
                            <Typography sx={BanktText}>
                              {" "}
                              Branch Address
                            </Typography>
                          </li>
                          <li style={{ listStyleType: "none" }}>
                            <Typography sx={BanktbottomText}>
                              Lorem ipsum dolor sit amet consectetur.
                            </Typography>
                          </li>
                        </ul>
                        <ul>
                          <li style={{ listStyleType: "none" }}>
                            <Typography sx={BanktText}>
                              {OrderSummarydata?.BankDetails?.BankName}
                            </Typography>
                          </li>
                          <li style={{ listStyleType: "none" }}>
                            <Typography sx={BanktbottomText}>
                              {OrderSummarydata?.BankDetails?.IFSC}
                            </Typography>
                          </li>
                        </ul>
  
                        <ul>
                          <li style={{ listStyleType: "none" }}>
                            <Typography sx={BanktText}>IFSC Code</Typography>
                          </li>
                          <li style={{ listStyleType: "none" }}>
                            <Typography sx={BanktbottomText}>
                              Dfyuw123445
                            </Typography>
                          </li>
                        </ul>
                        <ul>
                          <li style={{ listStyleType: "none" }}>
                            <Typography sx={BanktText}>
                              {OrderSummarydata?.BankDetails?.BankName}
                            </Typography>
                          </li>
                          <li style={{ listStyleType: "none" }}>
                            <Typography sx={BanktbottomText}>
                              {OrderSummarydata?.BankDetails?.IFSC}
                            </Typography>
                          </li>
                        </ul>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "40%",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "3px 0px 0px 3",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "bottom",
                        border: "1px solid #CDCDCD",
                      }}
                    >
                      <Typography sx={TextLastStyle}>
                        Certified that the particulars given above are true and
                        correct
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        borderRadius: "3px 0px 0px",
                        display: "flex",
                        justifyContent: "center",
                        border: "0px 1px solid #CDCDCD 0px 0px",
                      }}
                    >
                      <Typography sx={TextLastStyle}>For Buyer Name</Typography>
                    </Box>
                    <Box
                      sx={{
                        height: "100px",
                        width: "100%",
                      }}
                    ></Box>
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
                  maxWidth: "500px",
                  mx: "auto",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                  height: "100%",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    height: "40px",
                    maxWidth: "200px",
                    borderRadius: "6px",
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
                  }}
                >
                  Continue
                </Button>
  
                <Button
                  variant="outlined"
                  sx={{
                    width: "100%",
                    height: "40px",
                    maxWidth: "200px",
                    borderRadius: "6px",
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
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Paper>
    );
  };
  
  export default MembershipInvoice;
  const CommongTextStyle = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "21px",
  
    color: "#6B7A99",
  };
  
  const TextStyleTwo = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "12px",
    lineHeight: "20px",
    textAlign: "left",
    color: "#505050",
    opacity: 1,
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
    fontWeight: 600,
    fontSize: "10px",
    lineHeight: "20px",
    color: "#050505",
    opacity: 0.7,
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
  