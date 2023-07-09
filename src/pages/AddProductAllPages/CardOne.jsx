import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  TextField,
  FormControl,
  ThemeProvider,
  Select,
  MenuItem,
  Input
} from "@mui/material";


import { makeStyles } from '@material-ui/core/styles';
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import BxiLogo from "../../assets/BXI_LOGO.png";
import RestaurantImage from "../../assets/restaurant1.jpg";
import RupeeImage from "../../assets/rupee.svg";
import FoodImage from "../../assets/food.jpg";
import Shoe from "../../assets/shoeimage.svg";
import Avatargenerator from "../../components/AvatarGenerator";
import { useState } from "react";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { voucherStyle } from '../AddProductAllPages/EditVoucherTemplate/EditVoucherStyle'
import ProductAddTheme from "../../components/GlobalStyle/MaterialUiGlobalStyle";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useGetLoggedInUser from "../../Hooks/LoggedInUser/useGetLoggedInUser";
// offerValue: "$1,00,000",
// validity: "4 months",
// redemptionType: "online",
// cardName: "Gift Card",
// productName: "Product name",
// productDescription: "Lorem ipsum dolor sit amet consectetur.",
// adviceText: "Spend it on something you love!",


import LightIcon1 from "../../assets/voucher-preview/light-icon1.svg"
import LightIcon2 from "../../assets/voucher-preview/light-icon2.svg"
import LightIcon3 from "../../assets/voucher-preview/light-icon3.svg"
import LightIcon4 from "../../assets/voucher-preview/light-icon4.svg"
import LightIcon5 from "../../assets/voucher-preview/light-icon5.svg"
import LightIcon6 from "../../assets/voucher-preview/light-icon6.svg"
import LightIcon7 from "../../assets/voucher-preview/light-icon7.svg"
import LightIcon8 from "../../assets/voucher-preview/light-icon8.svg"
import LightIcon9 from "../../assets/voucher-preview/light-icon9.svg"
import LightIcon10 from "../../assets/voucher-preview/light-icon10.svg"
import LightIcon11 from "../../assets/voucher-preview/light-icon11.svg"
import LightIcon12 from "../../assets/voucher-preview/light-icon12.svg"
import LightIcon13 from "../../assets/voucher-preview/light-icon13.svg"
import LightIcon14 from "../../assets/voucher-preview/light-icon14.svg"
import LightIcon15 from "../../assets/voucher-preview/light-icon15.svg"
import LightIcon16 from "../../assets/voucher-preview/light-icon16.svg"
import LightIcon17 from "../../assets/voucher-preview/light-icon17.svg"
import LightIcon18 from "../../assets/voucher-preview/light-icon18.svg"
import LightIcon19 from "../../assets/voucher-preview/light-icon19.svg"
import LightIcon20 from "../../assets/voucher-preview/light-icon20.svg"
import LightIcon21 from "../../assets/voucher-preview/light-icon21.svg"
import LightIcon22 from "../../assets/voucher-preview/light-icon22.svg"
import LightIcon23 from "../../assets/voucher-preview/light-icon23.svg"
import LightIcon24 from "../../assets/voucher-preview/light-icon24.svg"
import LightIcon25 from "../../assets/voucher-preview/light-icon25.svg"
import LightIcon26 from "../../assets/voucher-preview/light-icon26.svg"

import DarkIcon1 from "../../assets/voucher-preview/invert/light-icon1.svg"
import DarkIcon2 from "../../assets/voucher-preview/invert/light-icon2.svg"
import DarkIcon3 from "../../assets/voucher-preview/invert/light-icon3.svg"
import DarkIcon4 from "../../assets/voucher-preview/invert/light-icon4.svg"
import DarkIcon5 from "../../assets/voucher-preview/invert/light-icon5.svg"
import DarkIcon6 from "../../assets/voucher-preview/invert/light-icon6.svg"
import DarkIcon7 from "../../assets/voucher-preview/invert/light-icon7.svg"
import DarkIcon8 from "../../assets/voucher-preview/invert/light-icon8.svg"
import DarkIcon9 from "../../assets/voucher-preview/invert/light-icon9.svg"
import DarkIcon10 from "../../assets/voucher-preview/invert/light-icon10.svg"
import DarkIcon11 from "../../assets/voucher-preview/invert/light-icon11.svg"
import DarkIcon12 from "../../assets/voucher-preview/invert/light-icon12.svg"
import DarkIcon13 from "../../assets/voucher-preview/invert/light-icon13.svg"
import DarkIcon14 from "../../assets/voucher-preview/invert/light-icon14.svg"
import DarkIcon15 from "../../assets/voucher-preview/invert/light-icon15.svg"
import DarkIcon16 from "../../assets/voucher-preview/invert/light-icon16.svg"
import DarkIcon17 from "../../assets/voucher-preview/invert/light-icon17.svg"
import DarkIcon18 from "../../assets/voucher-preview/invert/light-icon18.svg"
import DarkIcon19 from "../../assets/voucher-preview/invert/light-icon19.svg"
import DarkIcon20 from "../../assets/voucher-preview/invert/light-icon20.svg"
import DarkIcon21 from "../../assets/voucher-preview/invert/light-icon21.svg"
import DarkIcon22 from "../../assets/voucher-preview/invert/light-icon22.svg"
import DarkIcon23 from "../../assets/voucher-preview/invert/light-icon23.svg"
import DarkIcon24 from "../../assets/voucher-preview/invert/light-icon24.svg"
import DarkIcon25 from "../../assets/voucher-preview/invert/light-icon25.svg"
import DarkIcon26 from "../../assets/voucher-preview/invert/light-icon26.svg"



const validationSchema = Yup.object().shape({
  productName: Yup.string().required('This field is required.'),
  productDescription: Yup.string().required('This field is required.'),
  adviceText: Yup.string().required('This field is required.'),
});

const CardOne = ({
  leftCard = false,
  rightCard = false,
  tempOne = false,
  tempTwo = false,
  tempThree = false,
  tempFour = false,
  tempFive = false,
  cardBgColor,
  cardImage,
  myRefBack,
  myRefFront,
  showLeftEdit = false,
  closePopup,
  category,
  templateId,
  productData,
  textInverted,
  iconInverted
}) => {

  const classes = voucherStyle()

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [open, setOpen] = useState(false);
  const [hoveredText, setHoveredText] = useState("");
  // Left Card
  const [leftCardData, setLeftCardData] = useState({
    offerValue: "$1,00,000",
    validity: "4 months",
    redemptionType: "online",
    cardName: "Gift Card",
    productName: "Product name",
    productDescription: "Lorem ipsum dolor sit amet consectetur.",
    adviceText: "Spend it on something you love!",
  });

  const imageIcons = [
    LightIcon1,
    LightIcon2,
    LightIcon3,
    LightIcon4,
    LightIcon5,
    LightIcon6,
    LightIcon7,
    LightIcon8,
    LightIcon9,
    LightIcon10,
    LightIcon11,
    LightIcon12,
    LightIcon13,
    LightIcon14,
    LightIcon15,
    LightIcon16,
    LightIcon17,
    LightIcon18,
    LightIcon19,
    LightIcon20,
    LightIcon21,
    LightIcon22,
    LightIcon23,
    LightIcon24,
    LightIcon25,
    LightIcon26,
  ]

  const invertedImageIcons = [
    DarkIcon1,
    DarkIcon2,
    DarkIcon3,
    DarkIcon4,
    DarkIcon5,
    DarkIcon6,
    DarkIcon7,
    DarkIcon8,
    DarkIcon9,
    DarkIcon10,
    DarkIcon11,
    DarkIcon12,
    DarkIcon13,
    DarkIcon14,
    DarkIcon15,
    DarkIcon16,
    DarkIcon17,
    DarkIcon18,
    DarkIcon19,
    DarkIcon20,
    DarkIcon21,
    DarkIcon22,
    DarkIcon23,
    DarkIcon24,
    DarkIcon25,
    DarkIcon26,
  ]

  // Right Card
  const [rightCardData, setRightCardData] = useState({
    inclusionPoint1: "Lorem ipsum dolor sit amet consectetur.",
    inclusionPoint2: "Nibh elit nibh neque gravida sed lorem nisi lorem ipsum.",
    inclusionPoint3:
      "Auctor neque eu vulputate gravida ultrices ipsum lectus massa aliquet.",
    inclusionPoint4: "hello Lorem ipsum dolor sit amet consectetur.",
    exclusionPoint1: "Lorem one ipsum dolor sit amet consectetur.",
    exclusionPoint2:
      "Nibh elit two nibh neque gravida sed lorem nisi lorem ipsum.",
    exclusionPoint3:
      "Auctor neque three eu vulputate gravida ultrices ipsum lectus massa aliquet.",
    webUrl: "www.bxiworld.com",
  });
  const initialValues = {
    productName: "Product name",
    productDescription: "Lorem ipsum dolor sit amet consectetur.",
    adviceText: "Spend it on something you love!"
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      setIsSubmitting(true);
      // Handle form submission
    },
  });


  const truncateString = (str, maxLength) => {
    if (str && str.length > maxLength) {
      str = str.substring(0, maxLength) + "...";
    }
    return str;
  };

  const handleOpen = (event) => {
    const text = event.target.innerText;
    setHoveredText(text);
    setOpen(true);
  };

  const handleClose = () => {
    closePopup()
  };

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetLoggedInUser();

  let bgImage = '';
  let customStyle = {}
  let bgColorFirst = ''
  switch (templateId) {
    case 'Template1':
      bgImage = ''
      cardBgColor = cardBgColor != '' ? cardBgColor : '#C4C3D8'
      customStyle = {
        // background: cardBgColor,
        backdropFilter: 'blur(1.72297px)',
      }
      break
    case 'Template2':
      bgImage = leftCard ? cardImage ? cardImage : RestaurantImage : ''
      break
    case 'Template3':
      bgImage = leftCard ? cardImage ? cardImage : FoodImage : ''
      cardBgColor = cardBgColor != '' ? cardBgColor : '#FFF'
      break
  }



  return (
    <>
      <Card
        sx={{
          backgroundImage: `url( ${bgImage})`,
          backgroundColor: cardBgColor,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          position: "relative",
          borderRadius: tempTwo
            ? "8.70283px 8.70283px 0 0"
            : tempThree
              ? "8.70283px"
              : "",
          height: "168.85px",
          width: "290.61px",
        }}
        // ref={myRefFront}
        ref={leftCard ? myRefFront : rightCard ? myRefBack : ""}
      >

        {/* <CardContent className={classes.cardZeroPadding `${templateId == 'Template2' && classes.templateOneImage}`}> */}
        <CardContent
          className={classes.templateOneImage}
          style={customStyle}
        >
          {leftCard && tempOne && (
            <Box sx={{ textAlign: "center", padding: '0px 0px 15px 0' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} className={classes.companyLogo}>
                <Avatargenerator
                  companyname={userData?.data?.companyName}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "4.59458px",
                  lineHeight: "7px",
                  color: !textInverted ? "#FFF" : "#1E1E1E",

                }}
              >
                {userData?.data?.companyName}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 700,
                  fontSize: "9.18915px",
                  lineHeight: "14px",
                  color: !textInverted ? "#FFF" : "#1E1E1E",
                  marginTop: "7px",
                }}
              // onMouseEnter={handleOpen}
              >
                Value <img src={RupeeImage} /> {productData?.pricePerUnit}
              </Typography>
              <Box sx={{ marginTop: "3px" }}>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "4.59458px",
                    lineHeight: "7px",
                    color: !textInverted ? "#FFF" : "#1E1E1E",
                  }}
                // onMouseEnter={handleOpen}
                >
                  Validity : {productData?.validityOfVoucherValue} {productData?.validityOfVoucherUnit}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "4.59458px",
                    lineHeight: "7px",
                    color: !textInverted ? "#FFF" : "#1E1E1E",
                  }}
                // onMouseEnter={handleOpen}
                >
                  Redemption Type : {productData?.redemptionType === "both" ? "Online & Offline" : productData?.redemptionType}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "elix Titling",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "13.7837px",
                  lineHeight: "16px",
                  color: !textInverted ? "#FFF" : "#8F0000",
                  marginTop: "10px",
                }}
              // onMouseEnter={handleOpen}
              >
                {productData?.voucherType}
              </Typography>
              <Box sx={{ marginTop: "7px" }}>
                <Box sx={{ width: "18px", height: "18px" }} className={classes.template1Icon}>
                  {/* {category} */}
                  {
                    iconInverted ? <img src={imageIcons[category]} /> : <img src={invertedImageIcons[category]} />
                  }

                </Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "5.74322px",
                    lineHeight: "9px",
                    color: !textInverted ? "#FFF" : "#1E1E1E",
                    marginTop: '10px'
                  }}
                // onMouseEnter={handleOpen}
                >
                  {productData?.productName}
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "5.74322px",
                    lineHeight: "126.7%",
                    color: !textInverted ? "#FFF" : "#434343",

                  }}
                // onMouseEnter={handleOpen}
                >
                  {productData?.productSubtitle}
                </Typography>
              </Box>
              <Typography
                sx={{
                  textAlign: "center",
                  fontFamily: "Felix Titling",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: " 4.59458px",
                  lineHeight: "5px",
                  color: !textInverted ? "#FFF" : "#1E1E1E",
                  margin: "10px 0",
                }}
              // onMouseEnter={handleOpen}
              >
                {leftCardData.adviceText}
              </Typography>
            </Box>
          )}

          {leftCard && templateId == 'Template2' && (
            <Grid container spacing={3} justifyContent="space-between">
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <img
                      src={BxiLogo}
                      alt="logo"
                      height={40}
                      sx={{
                        height: "19.415754318237305px",
                        width: "22.842092514038086px",
                        left: "62.1376953125px",
                        top: "1017.85546875px",
                        borderRadius: "0px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "5px",
                        fontWeight: 700,
                        lineHeight: "7px",
                        letterSpacing: "0em",
                        textAlign: "left",
                        color: "#888888",
                      }}
                    >
                      Barter Exchange Of India
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontFamily: "Forte",
                    fontSize: "7px",
                    fontStyle: "italic",
                    fontWeight: 400,
                    lineHeight: "9px",
                    letterSpacing: "0em",
                    textAlign: "right",
                    color: "#FFFFFF",
                    width: "66.1px",
                    height: "18.27px",
                  }}
                >
                  Spend it on something you love!
                </Typography>
              </Grid>
            </Grid>
          )}

          {
            leftCard && templateId == 'Template3' &&
            <>
              <Box className={classes.templateThreeBox} style={{ backgroundColor: cardBgColor, borderColor: cardBgColor, textAlign: 'center' }} >
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }} className={classes.companyLogo}>
                  <Avatargenerator
                    companyname={userData?.data?.companyName}
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "4.59458px",
                    lineHeight: "7px",
                    color: !textInverted ? "#FFF" : "#1E1E1E",
                    marginTop: "5px",
                  }}
                >
                  {userData?.data?.companyName}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "9.18915px",
                    lineHeight: "14px",
                    color: !textInverted ? "#FFF" : " #1E1E1E",
                    marginTop: "7px",
                  }}
                // onMouseEnter={handleOpen}
                >
                  Value <img src={RupeeImage} /> {productData?.pricePerUnit}
                </Typography>
                <Box >
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "4.59458px",
                      lineHeight: "7px",
                      color: !textInverted ? "#FFF" : " #1E1E1E",
                    }}
                  // onMouseEnter={handleOpen}
                  >
                    Validity : {productData?.validityOfVoucherValue} {productData?.validityOfVoucherUnit}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "4.59458px",
                      lineHeight: "7px",
                      color: !textInverted ? "#FFF" : " #1E1E1E",
                    }}
                  // onMouseEnter={handleOpen}
                  >
                    Redemption Type : {productData?.redemptionType === "both" ? "Online & Offline" : productData?.redemptionType}
                  </Typography>
                </Box>
                <Box className={classes.offerSection}>
                  <Typography
                    sx={{
                      fontFamily: "'Dancing Script', cursive",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "13.7837px",
                      lineHeight: "16px",
                      color: !textInverted ? "#FFF" : "#8F0000",
                    }}
                  // onMouseEnter={handleOpen}
                  >
                    {productData?.voucherType} 
                  </Typography>
                  <Box sx={{ width: "15px", height: "15px" }} className={classes.template1Icon}>
                    {
                      iconInverted ? <img src={imageIcons[category]} /> : <img src={invertedImageIcons[category]} />
                    }
                  </Box>
                </Box>

                <Box sx={{ marginTop: "7px" }}>

                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "5.74322px",
                      lineHeight: "9px",
                      color: !textInverted ? "#FFF" : "#1E1E1E",
                    }}
                  // onMouseEnter={handleOpen}
                  >
                    {productData?.productName}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "5.74322px",
                      lineHeight: "126.7%",
                      color: !textInverted ? "#FFF" : "#939393",
                      lineHeight: '7px'
                    }}
                  // onMouseEnter={handleOpen}
                  >
                    {productData?.productSubtitle}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    textAlign: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: " 5.74px",
                    lineHeight: "5px",
                    color: !textInverted ? "#FFF" : "#1E1E1E",
                    margin: "10px 0",
                  }}
                // onMouseEnter={handleOpen}
                >
                  {leftCardData.adviceText}
                </Typography>
              </Box>
            </>
          }
        </CardContent>

        {templateId == 'Template1' && leftCard && (
          <img
            style={{
              width: "56%",
              height: "80%",

              filter: rightCard ? "blur(3px)" : "",
            }}
            src={cardImage ? cardImage : Shoe}
            alt="cardImage"
          />
        )}

        {rightCard && (
          <Box sx={{ marginLeft: "2.5rem" }}>
            <Box>
              <Typography
                sx={{
                  // fontFamily: "DM Sans",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "6.89186px",
                  lineHeight: "9px",
                  color: !textInverted ? "#FFF" : " #494949",
                  marginBottom: "5px",
                }}
              >
                Inclusion
              </Typography>
              <Typography
                component="span"
                sx={{
                  // fontFamily: "DM Sans",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "5.74322px",
                  lineHeight: "7px",
                  color: !textInverted ? "#FFF" : "#000000",
                  zIndex: 5,
                  position: "absolute",
                }}
              >
                {truncateString(productData?.inclusions,250)}
                {/* <li
                //  onMouseEnter={handleOpen}
                >
                  {rightCardData.inclusionPoint1}
                </li>
                <li
                // onMouseEnter={handleOpen}
                >
                  {rightCardData.inclusionPoint2}
                </li>
                <li
                // onMouseEnter={handleOpen}
                >
                  {rightCardData.inclusionPoint3}
                </li>
                <li
                // onMouseEnter={handleOpen}
                >
                  {rightCardData.inclusionPoint4}
                </li> */}
              </Typography>
            </Box>
            <Box sx={{ marginTop: "2.5rem" }}>
              <Typography
                sx={{
                  // fontFamily: "DM Sans",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "6.89186px",
                  lineHeight: "9px",
                  color: !textInverted ? "#FFF" : " #494949",
                  marginTop: "40px",
                  marginBottom: "5px",
                }}
              >
                Exclusion
              </Typography>
              <Typography
                component="span"
                sx={{

                  // fontFamily: "DM Sans",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "5.74322px",
                  lineHeight: "7px",
                  color: !textInverted ? "#FFF" : "#000000",
                  zIndex: 5,
                  position: "absolute",
                }}
              >
                {/* {productData?.exclusions} */}
                {truncateString(productData?.exclusions,250)}
                {/* <li
                // onMouseEnter={handleOpen}
                >
                  {rightCardData.exclusionPoint1}
                </li>
                <li
                // onMouseEnter={handleOpen}
                >
                  {rightCardData.exclusionPoint2}
                </li>
                <li
                // onMouseEnter={handleOpen}
                >
                  {rightCardData.exclusionPoint3}
                </li> */}
              </Typography>
            </Box>
            <Box sx={{ marginTop: "5rem" }}>
              {
                productData?.redemptionURL && <Typography
                  sx={{
                    fontFamily: "Prata",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "8.04051px",
                    lineHeight: "11px",
                    color: !textInverted ? "#FFF" : " #000000",
                  }}
                >
                  {productData.redemptionURL}
                </Typography>
              }

            </Box>
          </Box>
        )}
        {leftCard && tempTwo && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50px",
              backgroundColor: "#000",
              borderRadius: "58% 220% 0 0",
              zIndex: 1,
            }}
            className="black-box"
          >
            {/* bottom text  */}
            <Grid
              container
              spacing={3}
              justifyContent="space-between"
              sx={{ padding: "1rem 1rem" }}
            >
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: "14px",
                        fontWeight: 700,
                        lineHeight: "21px",
                        letterSpacing: "0em",
                        textAlign: "left",
                        color: !textInverted ? "#FFF" : "#FFFFFF",
                      }}
                    >
                      Value <img src={RupeeImage} /> {productData?.pricePerUnit}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex" }}>
                      <Box sx={{ color: "white", justifyContent: "center", width: "9.05px", height: " 9.4px" }} className={classes.template2Icon}>
                        {
                          iconInverted ? <img src={imageIcons[category]} /> : <img src={invertedImageIcons[category]} />
                        }

                      </Box>
                      <Box sx={{ textAlign: "left", marginLeft: ".7rem" }}>
                        <Typography
                          sx={{
                            fontStyle: "normal",
                            fontFamily: "Poppins",
                            fontSize: "4.56842px",
                            fontWeight: 400,
                            lineHeight: "7px",
                            color: "#FFFFFF",
                          }}
                        >
                          Validity : {productData?.validityOfVoucherValue} {productData?.validityOfVoucherUnit}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "4.56842px",
                            fontWeight: 400,
                            lineHeight: "7px",
                            color: "#FFFFFF",
                            fontStyle: "normal",
                          }}
                        >
                          Redemption Type : {productData?.redemptionType === "both" ? "Online & Offline" : productData?.redemptionType}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontFamily: "Forte",
                    fontSize: "11.421px",
                    fontStyle: "italic",
                    fontWeight: 400,
                    lineHeight: "115.79%",
                    letterSpacing: "0em",
                    textAlign: "right",
                    color: !textInverted ? "#FFF" : "#F4F4F4",
                    width: "35.41px",
                    height: "27.41px",
                  }}
                >
                  {productData?.voucherType}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        {rightCard && tempTwo && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50px",
              backgroundColor: "#000",
              borderRadius: "220% 58% 0 0",
            }}
            className="black-box"
          />
        )}
        {leftCard && tempTwo && (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50px",
              // backgroundColor: "#000",
              borderRadius: "220% 58% 0 0",
              backdropFilter: "blur(30px)",
              // opacity: 0.3,
            }}
            className="black-box"
          />
        )}
      </Card>
    </>
  );
};

export default CardOne;

