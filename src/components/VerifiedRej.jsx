import React from "react";
import {
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  Stack,
  Container,
  CircularProgress,
} from "@mui/material";
import BarterHeader from "../components/BarterHeader";
// import mainImg from "../assets/Images/register/newMainLogo.svg";
import Stepper from "../components/Stepper";
import barterLogo from "../assets/BXI_LOGO.png";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VerifiedRej = ({
  imgSize,
  imgLogoUrl,
  headText,
  subText,
  learnBtn,
  ShowButton,
  subText2,
  subTextColor,
  showLoader,
  mainimg,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Paper
      elevation={0}
      sx={{
        boxShadow: "0px",
        height: "100vh",
        width: "100%",
        maxHeight: "100vh",
        maxWidth: "100vw",
        overflowY: "hidden",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* <BarterHeader /> */}
      {window.location.href === "/reject" || "" ? <Stepper /> : null}

      <Grid
        container
        sx={{
          background: "#fff",
          height: "95vh",
          width: "110%",
        }}
      >
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid
            container
            sx={{
              // height: "25%",
              position: "absolute",
              top: "1%",
              right: "45%",
            }}
          >
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Box sx={{ width: "100px" }}>
                <img
                  src={barterLogo}
                  alt="img"
                  style={{
                    height: "auto",
                    width: "70px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box pb={2}>
            <img
              src={imgLogoUrl}
              alt="protect"
              style={{
                height: imgSize ? imgSize : "auto",
                width: imgSize ? imgSize : "auto",
              }}
            />
          </Box>
          <Typography sx={login}> {headText} </Typography>
          <Box
            mt={2}
            sx={{
              width: { xl: "75%", lg: "75%", md: "70%", sm: "70%", xs: "95%" },
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography sx={intoText}>{subText}</Typography>
          </Box>
          <Box
            mt={2}
            sx={{
              width: { xl: "75%", lg: "75%", md: "70%", sm: "70%", xs: "95%" },
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Typography sx={intoText}>
              <span style={{ color: "rgba(68, 95, 210, 1)", fontWeight: 600 }}>
                {subTextColor}
              </span>
              {subText2}
            </Typography>
          </Box>
          {ShowButton === true ? (
            <Button
              variant="outlined"
              fullWidth
              sx={btn}
              onClick={handleClickOpen}
            >
              {/* {learnBtn} */}
              Learn More
            </Button>
          ) : null}
          {showLoader ? <CircularProgress sx={{ marginTop: "2rem" }} /> : null}
        </Grid>
        <Grid
          item
          xl={6}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          sx={{
            display: {
              xl: "block",
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
            },
            justifyContent: "center",
          }}
        >
          <img
            // src={newMainLogo}
            src={mainimg}
            alt="img"
            style={{ height: "auto", width: "100%", maxHeight: "100vh" }}
          />
        </Grid>
      </Grid>
      {/* <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Contact Information"}</DialogTitle>
        <DialogContent>
          <Stack>
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontFamily: "Poppins", fontSize: "14px" }}>
                1. Website:{" "}
                <Link to={"https://bxiworld.com/"}>https://bxiworld.com/</Link>
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontFamily: "Poppins", fontSize: "14px" }}>
                2. Email: support@bxiworld.com
              </Typography>
            </Box>
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ fontFamily: "Poppins", fontSize: "14px" }}>
                3. Phone: 8828326776{" "}
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog> */}
    </Paper>
  );
};

export default VerifiedRej;

const mainText = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: 16,
  textAlign: "center",
  color: "#6B7A99",
  display: "flex",
  justifyContent: "space-around",
};

const login = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "3.2rem",
    lg: "3.1rem",
    md: "3rem",
    sm: "2.8rem",
    xs: "2.6rem",
  },
  color: "#6B7A99",
  textAlign: "center",
};

const intoText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.4rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  textAlign: "center",
  color: "#6B7A99",
};

// const loginText = {
//   fontFamily: "Poppins",
//   fontStyle: "normal",
//   fontWeight: 400,
//   fontSize: {
//     xl: "1.8rem",
//     lg: "1.8rem",
//     md: "1.4rem",
//     sm: "1.4rem",
//     xs: "1.4rem",
//   },
//   textAlign: "center",
//   color: "rgba(107, 122, 153, 1)",
//   textTransform: "none",
// };

const btn = {
  background: "#fff",
  width: "75%",
  height: "4rem",
  marginLeft: "auto",
  marginRight: "auto",
  border: "1px solid rgba(237, 239, 242, 1)",
  marginTop: "4rem",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.8rem",
    lg: "1.8rem",
    md: "1.4rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  textAlign: "center",
  color: "rgba(107, 122, 153, 1)",
  textTransform: "none",
};
