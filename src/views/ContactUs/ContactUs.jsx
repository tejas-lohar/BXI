import {
  Box,
  Button,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ContactIcon from "../../assets/Images/ContactUs/ContactIcon.svg";
import EditIcon from "../../assets/Images/ContactUs/Edit.png";
import EmailIconContactUs from "../../assets/Images/ContactUs/EmailIconContactUs.svg";
import EmailIcon from "../../assets/Images/ContactUs/Envelope.png";
import HiOutlineChevronRight from "../../assets/Images/ContactUs/HiOutlineChevronRight.svg";
import HomeIcon from "../../assets/Images/ContactUs/HomeIcon.svg";
import UserIcon from "../../assets/Images/ContactUs/User.png";

const HowCanWeHelpData = [
  {
    id: 1,
    name: "Lorem ipsum dolor (FAQ)",
    description:
      "Eleifend semper nisi mi enim condimentum vel habitant purus eget.",
    icon: (
      <img
        src={HiOutlineChevronRight}
        style={{ width: 14, height: 8.91, cursor: "pointer" }}
        alt="icon"
      />
    ),
  },
  {
    id: 2,
    name: "Lorem ipsum dolor (FAQ)",
    description:
      "Eleifend semper nisi mi enim condimentum vel habitant purus eget.",
    icon: (
      <img
        src={HiOutlineChevronRight}
        style={{ width: 14, height: 8.91, cursor: "pointer" }}
        alt="icon"
      />
    ),
  },
  {
    id: 3,
    name: "Lorem ipsum dolor (FAQ)",
    description:
      "Eleifend semper nisi mi enim condimentum vel habitant purus eget.",
    icon: (
      <img
        src={HiOutlineChevronRight}
        style={{ width: 14, height: 8.91, cursor: "pointer" }}
        alt="icon"
      />
    ),
  },
];

const ContactUs = () => {
  return (
    <Grid container>
      <Paper
        sx={{
          display: {
            xl: "flex",
            lg: "flex",
            md: "flex",
            sm: "block",
            xs: "block",
          },
          width: "97%",
          mx: "auto",
          mt: 2,
          zIndex: 1,
        }}
        elevation={0}
      >
        <Box sx={ContactBoxOneStyle}>
          <Box sx={ContactBoxOneHeader}>
            <Typography sx={Titletext}>Contact Us</Typography>
            <Typography sx={TitleBottomtext}>
              We love to hear from you, Just dropn us a line and ask us
              anything. We are looking forward to hearing from you!
            </Typography>
          </Box>
          <Box sx={{ width: "90%", mx: "auto", mb: 5 }}>
            <Box sx={{ width: "90%", mx: "auto", maxWidth: "350px" }}>
              <InputLabel sx={InputLableText}>Name</InputLabel>
              <Box sx={InputBox}>
                <Input
                  disableUnderline
                  placeholder="Please enter your name"
                  sx={PlaceHolderColor}
                />
                <img
                  src={UserIcon}
                  width={"15px"}
                  height={"15px"}
                  alt="usericon"
                />
              </Box>
            </Box>
            <Box sx={{ width: "90%", mx: "auto", maxWidth: "350px", mt: 3 }}>
              <InputLabel sx={InputLableText}>E-mail</InputLabel>
              <Box sx={InputBox}>
                <Input
                  disableUnderline
                  placeholder="Please enter your E-mail"
                  sx={PlaceHolderColor}
                />
                <img
                  src={EmailIcon}
                  width={"15px"}
                  height={"15px"}
                  alt="emailicon"
                />
              </Box>
            </Box>
            <Box sx={{ width: "90%", mx: "auto", maxWidth: "350px", mt: 3 }}>
              <InputLabel sx={InputLableText}>Subject</InputLabel>
              <Box sx={InputBox}>
                <Input
                  disableUnderline
                  placeholder="Please enter your subject"
                  sx={PlaceHolderColor}
                />
                <img
                  src={EditIcon}
                  width={"15px"}
                  height={"15px"}
                  alt="editicon"
                />
              </Box>
            </Box>
            <Box sx={{ width: "90%", mx: "auto", maxWidth: "350px", mt: 3 }}>
              <InputLabel sx={InputLableText}>Message</InputLabel>
              <Box sx={{ ...InputBox, height: "100px" }}>
                <Input
                  disableUnderline
                  placeholder="Please enter your message"
                  sx={{ ...PlaceHolderColor, height: "200px" }}
                  multiline
                  minRows={3}
                />
                <img
                  src={EditIcon}
                  width={"15px"}
                  height={"15px"}
                  alt="editicon"
                />
              </Box>
            </Box>
            <Box
              sx={{
                width: "85%",
                mx: "auto",
                mt: 5,
                pb: {
                  xl: "none",
                  lg: "none",
                  md: "none",
                  sm: "10%",
                  xs: "10%",
                },
              }}
            >
              <Button sx={ButtonStyle}>SUBMIT</Button>
            </Box>
          </Box>
        </Box>
        {/* </Grid>
        <Grid item xl={7} lg={7} md={7} sm={12} xs={12}> */}
        <Box sx={ContactBoxTwoStyle}>
          <Box sx={{ width: "90%", mx: "auto" }}>
            <Box sx={HowCanWeHelpTextWithDescription}>
              <Typography sx={Titletext}>How can we help ?</Typography>
              <Typography sx={HowCanWeHelpBottomText}>
                Please select a topic below related to your industray. if you
                don’t find what you need. fill out our contact form.
              </Typography>
            </Box>

            {/* *****  FAQ ARRAY BOX ***** */}
            <Box sx={FAQBoxStyle}>
              {HowCanWeHelpData.map((HowCanWeHelpData, idx) => (
                <Box key={idx} sx={{ mt: 2 }}>
                  <Typography sx={HowCanWeHelpQueText}>
                    {" "}
                    {HowCanWeHelpData.name}{" "}
                  </Typography>
                  <Box
                    sx={{
                      ...HowCanWeHelpAnswerWithIcon,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={HowCanWeHelpAnsText}>
                      {HowCanWeHelpData.description}
                    </Typography>
                    {HowCanWeHelpData.icon}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* ***** CONTACT INFORMATION BOX ****** */}
            <Box sx={ContactInfoBoxStyle}>
              <Box>
                <Typography sx={ContactInformationTitle}>
                  Contact information
                </Typography>
              </Box>
              <Box sx={ContactInformationBox}>
                <img src={HomeIcon} alt="homeicon" />
                <Typography sx={ContactInfoInnerText}>
                  BXI (Barter Exchange of India) 501- 5th Floor Meadows Tower,
                  Sahar Plaza Complex, Sir M.V. Road, Next to Kohinoor
                  Continental Hotel, Andheri (East), Mumbai 400059.
                </Typography>
              </Box>
              <Box sx={ContactInformationBox}>
                <img src={ContactIcon} alt="contacticon" />
                <Typography sx={ContactInfoInnerText}>
                  P: +91 22-49646776
                </Typography>
              </Box>
              <Box sx={ContactInformationBox}>
                <img src={EmailIconContactUs} alt="emailicon" />
                <Link to="/" style={{ color: "#778DA9" }}>
                  <Typography sx={ContactInfoInnerText}>
                    business@bxiworld.com
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* </Grid> */}
      </Paper>
    </Grid>
  );
};

export default ContactUs;

const ContactBoxOneStyle = {
  width: "90%",
  maxWidth: "580px",
  height: "auto",
  background: "#FFFFFF",
  boxShadow:
    "143px 187px 94px rgba(186, 186, 186, 0.01), 80px 105px 79px rgba(186, 186, 186, 0.05), 36px 47px 59px rgba(186, 186, 186, 0.09), 9px 12px 32px rgba(186, 186, 186, 0.1), 0px 0px 0px rgba(186, 186, 186, 0.1)",
  borderRadius: "10px",
  zIndex: 10,
  display: "block",
  justifyContent: "space-evenly",
  mx: "auto",
};

const ContactBoxTwoStyle = {
  mx: "auto",
  width: "90%",
  height: "auto",
  // background: "#fff",
  pl: 10,
  display: "grid",
  borderRadius: "10px",
};

const ContactBoxOneHeader = {
  width: "100%",
  minHeight: "100px",
  maxHeight: "150px",
  maxWidth: "450px",
  mx: "auto",
  bgcolor: "#fff",
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  my: 10,
};

const HowCanWeHelpTextWithDescription = {
  width: "100%",
  bgcolor: "#fff",
  display: "grid",
  gap: "20px",
  alignItems: "center",
  my: 8,
};

const Titletext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "35px",
    lg: "32px",
    md: "27px",
    sm: "23px",
    xs: "20px",
  },
  lineHeight: "30px",
  color: "#6B7A99",
  pt: {
    xl: "3%",
    lg: "3%",
    md: "2%",
    sm: "2%",
    xs: "2%",
  },
};

const InputBox = {
  width: "auto",
  height: "36px",
  background: "#F3F6F9",
  borderRadius: "3px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  pl: 3,
  pr: 1,
  mt: 1,
};

const PlaceHolderColor = {
  width: "100%",
  maxWidth: "350px",
  height: "100%",
  bgcolor: "transparent",
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "21px",
  display: "flex",
  alignItems: "center",
  // color: " rgba(107, 122, 153, 0.2)",
  // color: "cadetblue"
};

const InputLableText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "21px",
  display: "flex",
  alignItems: "center",
  color: "#6B7A99",
};

const TitleBottomtext = {
  pt: "3%",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "1.2rem",
    lg: "1rem",
    md: "1rem",
    sm: "0.8rem",
    xs: "0.7rem",
  },
  lineHeight: {
    xl: "26px",
    lg: "22px",
    md: "18px",
    sm: "15px",
    xs: "13px",
  },
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  color: "#8A8A8A",
};

const ButtonStyle = {
  width: "100%",
  height: "36px",
  maxWidth: "350px",
  background: "#445FD2",
  borderRadius: "3px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "21px",
  display: "flex",
  alignItems: "center",
  color: "#FFFFFF",
  mx: "auto",
  "&:hover": {
    background: "#C3CAD9",
  },
};

const HowCanWeHelpBottomText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: {
    xl: "14px",
    lg: "14px",
    md: "12px",
    sm: "12px",
    xs: "12px",
  },
  lineHeight: "18px",
  textTransform: "capitalize",
  textAlign: "left",
  color: "rgba(119, 141, 169, 0.5)",
  maxWidth: "70%",
};

const HowCanWeHelpQueText = {
  fontFamily: "Mulish",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: {
    xl: "18px",
    lg: "18px",
    md: "16px",
    sm: "14px",
    xs: "14px",
  },
  display: "flex",
  alignItems: "center",
  textTransform: "capitalize",
  color: "#6B7A99",
  width: "75%",
  pt: "1rem",
  cursor: "pointer",
};

const HowCanWeHelpAnsText = {
  fontFamily: "Mulish",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  // lineHeight: "18px",
  color: "rgba(119, 141, 169, 0.5)",
  borderBottom: "1px solid #F3F3F3",
  width: "100%",
  py: "1rem",
  cursor: "pointer",
  alignItems: "center",
  textTransform: "capitalize",
  ":hover": {
    borderBottom: "1px solid #000000",
  },
};

const HowCanWeHelpAnswerWithIcon = {
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  mt: 0,
  mb: 1.5,
};

const FAQBoxStyle = {
  width: "100%",
  mx: "auto",
  gap: "10px",
};
const ContactInfoBoxStyle = {
  py: 5,
  mt: 2,
  width: "100%",
  mx: "auto",
};

const ContactInformationBox = {
  display: "flex",
  gap: {
    xl: "2%",
    lg: "3%",
    md: "4%",
    sm: "5%",
    xs: "6%",
  },
};
const ContactInfoInnerText = {
  width: "100%",
  flexdirection: "row",
  py: "10px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "13px",
  display: "flex",
  alignItems: "center",
  color: "#778DA9",
  mr: {
    xl: "4rem",
    lg: "4rem",
    md: "3rem",
    sm: "1rem",
    xs: "0",
  },
};

const ContactInformationTitle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "24px",
    lg: "24px",
    md: "24px",
    sm: "20px",
    xs: "18px",
  },
  display: "flex",
  alignItems: "center",
  color: "#6B7A99",
};
