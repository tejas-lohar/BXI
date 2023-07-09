import React from "react";
import { Paper, Grid, Typography, Box, Button } from "@mui/material";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import PersonIcon from "@mui/icons-material/Person";
import Waterbotal from "../../assets/Waterbotal.svg";
import Location from "../../assets/location_icon.svg";
import LeftArrow from "../../assets/Images/ProductDetailIcon/LeftArrow.svg";
import Divider from "@material-ui/core/Divider";
import { OrderTracking } from "../../redux/action/Order-Tracking/Order-Tracking-Status.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { socket } from "../../pages/Message/Message";

function OrderHistory() {
  const dispatch = useDispatch();
  const { orderTracking, loading } = useSelector(
    (state) => state.orderTracking
  );

  useEffect(() => {
    dispatch(OrderTracking("646f06422d73c61da59fa022"));
  }, [dispatch]);

  return (
    <Paper
      sx={{
        bgcolor: "transparent",
        boxShadow: "none",
        height: "100%",
        width: "100%",
      }}
      elevation={0}
    >
      <BreadCrumbHeader MainText={"Order History"} />

      <Grid
        container
        sx={{
          maxHeight: "85%",
          maxWidth: "auto%",
        }}
      >
        <Grid
          item
          xl={2.8}
          lg={2.8}
          md={2.8}
          sm={12}
          xs={12}
          gap={2}
          sx={{
            // background: "red",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              background: "white",
              marginTop: "2rem",
              height: "35rem",
              borderRadius: "10px",
              width: {
                xl: "90%",
                lg: "90%",
                md: "85%",
                sm: "70%",
                xs: "80%",
              },
              // bgcolor: "red",
            }}
          >
            <img
              src={LeftArrow}
              alt="LeftArrow"
              style={{ marginTop: "2rem", marginLeft: "3rem" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              gap={2}
            >
              <Box sx={person}>
                <PersonIcon sx={Personicon} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    marginTop: "1rem",
                    fontFamily: "Outfit",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: {
                      xl: "3rem",
                      lg: "3rem",
                      md: "1.8rem",
                      sm: "1.5rem",
                      xs: "1.5rem",
                    },
                    color: "#000000",
                  }}
                >
                  Lorem Ipsum
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Outfit",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: {
                      xl: "1.6rem",
                      lg: "1.6rem",
                      md: "1.2rem",
                      sm: "1rem",
                      xs: "1rem",
                    },
                    color: "#ABB4C6",
                  }}
                >
                  Lorem ipsum dolor
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                // backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={icon}>
                <QuestionAnswerIcon
                  sx={{ color: "#445FD2", alignSelf: "center" }}
                />
              </Box>
              <Box sx={icon}>
                <MarkunreadIcon
                  sx={{ color: "#445FD2", alignSelf: "center" }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            component="img"
            src={Waterbotal}
            alt="Waterbotal"
            sx={{
              height: "auto",
              borderRadius: "14px",
              marginTop: "2rem",
              width: {
                xl: "90%",
                lg: "90%",
                md: "85%",
                sm: "70%",
                xs: "80%",
              },
            }}
          />
          <Grid
            container
            sx={{
              background: "#fff",
              marginTop: "2rem",
              height: {
                xl: "17rem",
                lg: "17rem",
                md: "21rem",
                sm: "15rem",
                xs: "15rem",
              },
              width: {
                xl: "90%",
                lg: "90%",
                md: "85%",
                sm: "70%",
                xs: "80%",
              },
              borderRadius: "10px",
              paddingInline: "2rem",
            }}
          >
            <Grid item xl={7} lg={7} md={7} sm={7} xs={7} sx={OrderDetail}>
              <Typography sx={detail}>Merchant Name</Typography>
              <Typography sx={detail}>Product Name</Typography>
              <Typography sx={detail}>Quantity</Typography>
              <Typography sx={detail}>Order Status</Typography>
              <Typography sx={detail}>Expected Delivery date</Typography>
            </Grid>
            <Grid item xl={5} lg={5} md={5} sm={5} xs={5} sx={OrderDetail}>
              <Typography sx={detailtext}>Lorem Ipsum</Typography>
              <Typography sx={detailtext}>Lorem Ipsum</Typography>
              <Typography sx={detailtext}>1500</Typography>
              <Typography sx={detailtext}>Location</Typography>
              <Typography sx={detailtext}>31/12/2022</Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "5.3rem",
              marginTop: "1rem",
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              sx={{
                width: {
                  xl: "80%",
                  lg: "80%",
                  md: "75%",
                  sm: "65%",
                  xs: "80%",
                },
                textTransform: "none",
                fontFamily: "Poppins",
                backgroundColor: "#445FD2",
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: {
                    xl: "1.8rem",
                    lg: "1.5rem",
                    md: "1.3rem",
                    sm: "1.3rem",
                    xs: "1.3rem",
                  },
                }}
              >
                Download Invoice
              </Typography>
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xl={9}
          lg={9}
          md={9}
          sm={12}
          xs={12}
          sx={{ marginLeft: "auto" }}
        >
          {orderTracking?.OrderStatusChangeDate?.map((item, index) => {
            return (
              <Grid
                key={index.toString()}
                sx={{
                  marginTop: "1rem",
                  marginBottom: "30px",
                  borderRedius: "10px",
                  height: "auto",
                  minHeight: "100px",
                  maxHeight: {
                    xl: "100px",
                    lg: "100px",
                    md: "70px",
                    sm: "50px",
                    xs: "50px",
                  },
                  width: "auto",
                }}
              >
                <Box
                  sx={{
                    marginLeft: {
                      xl: "4rem",
                      lg: "4rem",
                      md: "4rem",
                      sm: "4.1rem",
                      xs: "4.5rem",
                    },
                    marginTop: {
                      xl: "8rem",
                      lg: "8rem",
                      md: "8rem",
                      sm: "8rem",
                      xs: "8rem",
                    },
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: "1px",
                      background: "black",
                      height: "10rem",
                      position: "absolute",
                      marginLeft: "1rem",
                      marginTop: "8rem",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    background: "#FFFFFF",
                    boxShadow: "0px 10px 20px rgba(214, 214, 214, 0.5)",
                    borderRadius: "10px",
                    marginTop: "50px",
                    height: "auto",
                    display: "flex",
                    minHeight: "80px",
                    // bgcolor: "red",
                    zIndex: 1,
                  }}
                >
                  <Box
                    component="img"
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      marginLeft: {
                        xl: "3rem",
                        lg: "3rem",
                        md: "2rem",
                        sm: "2rem",
                        xs: "2rem",
                      },
                      marginTop: {
                        xl: "-2rem",
                        lg: "-2rem",
                        md: "-2rem",
                        sm: "-2rem",
                        xs: "-2rem",
                      },
                    }}
                    src={Location}
                    alt="location-icon"
                  />
                  <Grid container>
                    <Grid
                      item
                      xl={12}
                      lg={12}
                      md={12}
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
                        sx={{
                          // bgcolor: "red",
                          display: "flex",
                          justifyContent: "flex-end",
                          margin: "10px",
                          width: "95%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: 400,
                            color: "#7E7E7E",
                            fontSize: {
                              xl: "1.2rem",
                              lg: "1.2rem",
                              md: "0.8rem",
                              sm: "0.7rem",
                              xs: "0.7rem",
                            },
                          }}
                        >
                          {item.date}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          // bgcolor: "red",
                          display: "flex",
                          justifyContent: "flex-start",
                          width: "80%",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontStyle: "normal",
                            fontWeight: 500,
                            color: "#393D5E",
                            position: "absolute",
                            mt: {
                              xl: -2,
                              lg: -2,
                              md: -1,
                            },
                            fontSize: {
                              xl: "2rem",
                              lg: "2rem",
                              md: "1.7rem",
                              sm: "1.5rem",
                              xs: "1.5rem",
                            },
                          }}
                        >
                          {item.currentstatus}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xl={12}
                      lg={12}
                      md={12}
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
                        sx={{
                          mt: {
                            xl: 1,
                            lg: 1,
                            md: 1,
                            sm: 1,
                            xs: 1,
                          },
                          width: "80%",
                        }}
                      >
                        {item.discription ? (
                          <Typography sx={discriptiontext}>
                            {item.discription}
                          </Typography>
                        ) : null}
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xl={12}
                      lg={12}
                      md={12}
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
                        sx={{
                          mt: {
                            xl: 1,
                            lg: 1,
                            md: 1,
                            sm: 1,
                            xs: 1,
                          },
                          width: "80%",
                        }}
                      >
                        {item.TrackingID ? (
                          <Typography
                            sx={{
                              ...trackingid,
                              marginTop: 1,
                            }}
                          >
                            TrackingID : {item.TrackingID}
                          </Typography>
                        ) : null}
                        {item.Courier ? (
                          <Typography
                            sx={{
                              ...trackingid,
                              marginBottom: 1,
                            }}
                          >
                            Courier : {item.Courier}
                          </Typography>
                        ) : null}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Paper>
  );
}
export default OrderHistory;

const trackingid = {
  color: "#9BA5B7",
  fontFamily: "Poppins",
  textAlign: "left",
  fontSize: {
    xl: "12px",
    lg: "12px",
    md: "11px",
    sm: "10px",
    xs: "10px",
  },
};

const discriptiontext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 300,
  fontSize: {
    xl: "15px",
    lg: "15px",
    md: "13px",
    sm: "11px",
    xs: "11px",
  },
  color: "#9BA5B7",
};

const detail = {
  fontWeight: "bold",
  fontFamily: "Poppins",
  textAlign: "left",
  marginTop: "1rem",
  fontSize: {
    xl: "1.2rem",
    lg: "1.1rem",
    md: "1.1rem",
    sm: "1.1rem",
    xs: "1.1rem",
  },
};
const detailtext = {
  fontSize: {
    xl: "1.2rem",
    lg: "1.1rem",
    md: "1.1rem",
    sm: "1.1rem",
    xs: "1.1rem",
  },
  marginTop: "1rem",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "400",
  color: "#393D5E",
};

const icon = {
  width: "55px",
  height: "55px",
  background: "#E0F0FF",
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  margin: "2%",
  borderRadius: "30px",

  marginTop: {
    xl: "2rem",
    lg: "2rem",
    md: "2rem",
    sm: "2rem",
    xs: "2rem",
  },
  fontSize: {
    xl: "1rem",
    lg: "1rem",
    md: "1rem",
    sm: "0.7rem",
    xs: "0.7rem",
  },
};

const person = {
  background: "#EDEDED",
  width: "10rem",
  height: "10rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "1%",
  borderRadius: "10rem",

  marginTop: {
    xl: "1rem",
    lg: "1rem",
    md: "1rem",
    sm: "2rem",
    xs: "2rem",
  },
};

const Personicon = {
  color: "#7D8BA6",
  width: "4rem",
  height: "4rem",
};

const OrderDetail = {
  display: "flex",
  flexDirection: "column",
  // bgcolor: "red",
  mt: {
    xl: "1.5",
    lg: "1.5",
    md: "1",
    sm: "0.5",
    xs: "0.5",
  },
};
