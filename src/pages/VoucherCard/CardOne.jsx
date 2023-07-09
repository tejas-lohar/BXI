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
  } from "@mui/material";
  import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
  import BxiLogo from "../../assets/BXI_LOGO.png";
  import RestaurantImage from "../../assets/restaurant1.jpg";
  import FoodImage from "../../assets/food.jpg";
  import CoconutImage from "../../assets/coconutImage.jpg";
  import ShirtCollection from "../../assets/shirtCollection.webp";
  import Shoe from "../../assets/shoe5.jfif";
  import { useState } from "react";
  import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
  import ApartmentIcon from "@mui/icons-material/Apartment";
  import RamenDiningIcon from "@mui/icons-material/RamenDining";
  
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
    checked,
  }) => {
    const [open, setOpen] = useState(false);
    const [hoveredText, setHoveredText] = useState("");
    // Left Card
    const [leftCardData, setLeftCardData] = useState({
      offerValue: "$1,00,000",
      validity: "4 months",
      redemptionType: "online",
      cardName: tempOne ? "Gift Card" : tempFour ? "Offer Specific" : "",
      productName: "Product name",
      productDescription: "Lorem ipsum dolor sit amet consectetur.",
      adviceText: "Spend it on something you love!",
    });
  
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
  
    const handleOpen = (event) => {
      const text = event.target.innerText;
      setHoveredText(text);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSubmit = () => {
      // const editedText = draftToHtml(
      //   convertToRaw(editorState.getCurrentContent())
      // );
      const contentState = editorState.getCurrentContent();
      const editedText = convertToRaw(contentState);
  
      // setting Left card data
      setLeftCardData((prevState) => {
        return {
          ...prevState,
          offerValue:
            hoveredText === `Value ${prevState.offerValue}`
              ? editedText.blocks[0].text
              : prevState.offerValue,
          validity:
            hoveredText === `Validity : ${prevState.validity}`
              ? editedText.blocks[0].text
              : prevState.validity,
          redemptionType:
            hoveredText === `Redemption Type : ${prevState.redemptionType}`
              ? editedText.blocks[0].text
              : prevState.redemptionType,
          cardName:
            hoveredText === prevState.cardName
              ? editedText.blocks[0].text
              : prevState.cardName,
          productName:
            hoveredText === prevState.productName
              ? editedText.blocks[0].text
              : prevState.productName,
          productDescription:
            hoveredText === prevState.productDescription
              ? editedText.blocks[0].text
              : prevState.productDescription,
          adviceText:
            hoveredText === prevState.adviceText
              ? editedText.blocks[0].text
              : prevState.adviceText,
        };
      });
      // setting Right card data
      setRightCardData((prevState) => {
        return {
          ...prevState,
          inclusionPoint1:
            hoveredText === prevState.inclusionPoint1
              ? editedText.blocks[0].text
              : prevState.inclusionPoint1,
          inclusionPoint2:
            hoveredText === prevState.inclusionPoint2
              ? editedText.blocks[0].text
              : prevState.inclusionPoint2,
          inclusionPoint3:
            hoveredText === prevState.inclusionPoint3
              ? editedText.blocks[0].text
              : prevState.inclusionPoint3,
          inclusionPoint4:
            hoveredText === prevState.inclusionPoint4
              ? editedText.blocks[0].text
              : prevState.inclusionPoint4,
          exclusionPoint1:
            hoveredText === prevState.exclusionPoint1
              ? editedText.blocks[0].text
              : prevState.exclusionPoint1,
          exclusionPoint2:
            hoveredText === prevState.exclusionPoint2
              ? editedText.blocks[0].text
              : prevState.exclusionPoint2,
          exclusionPoint3:
            hoveredText === prevState.exclusionPoint3
              ? editedText.blocks[0].text
              : prevState.exclusionPoint3,
          webUrl:
            hoveredText === prevState.webUrl
              ? editedText.blocks[0].text
              : prevState.webUrl,
        };
      });
  
      setOpen(false);
    };
    return (
      <>
        <Dialog open={open} onClose={handleClose} sx={{ zIndex: 100 }}>
          <DialogTitle>Edit text: {hoveredText}</DialogTitle>
          <DialogContent>
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
        <Card
          sx={{
            backgroundImage:
              leftCard &&
              `url( ${
                tempOne
                  ? Shoe
                  : tempTwo
                  ? RestaurantImage
                  : tempThree
                  ? ""
                  : tempFour
                  ? FoodImage
                  : tempFive
                  ? CoconutImage
                  : ""
              })`,
            background: tempOne ? `linear-gradient(to left, ${cardBgColor}, white)` : "",
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
          {/* TEMP ONE IMAGE  */}
          {cardImage && tempOne && (rightCard || leftCard) && (
            <Box>
              <img
                style={{
                  width: "56%",
                  height: "80%",
                  position: "absolute",
                  top: 22,
                  right: 19,
                  zIndex: 1,
                  filter: rightCard ? "blur(3px)" : "",
                }}
                src={cardImage}
                alt="cardImage"
              />
            </Box>
          )}
          {/* TEMP THREE IMAGE */}
          {tempThree && leftCard && (
            <Box>
              <img
                style={{
                  width: "94px",
                  height: "118px",
                  position: "absolute",
                  top: 25,
                  right: 30,
                }}
                src={ShirtCollection}
                alt="cardImage"
              />
            </Box>
          )}
          <CardContent>
            {/* TEMPLATE ONE DESIGN */}
            {leftCard && tempOne && (
              <Box
                sx={{
                  textAlign: "center",
                  width: "35%",
                }}
              >
                <Box>
                  <img
                    style={{
                      width: "16px",
                      height: "13px",
                      position: "absolute",
                      top: 14,
                      right: 230,
                      zIndex: 1,
                    }}
                    src={BxiLogo}
                    alt="BxiLogo"
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "4.59458px",
                    lineHeight: "7px",
                    color: " #1E1E1E",
                    marginTop: "15px",
                  }}
                >
                  Barter Exchange Of India
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "9.18915px",
                    lineHeight: "14px",
                    color: " #1E1E1E",
                    marginTop: "7px",
                    filter: checked ?"invert(1)":'none',
                  }}
                  onMouseEnter={handleOpen}
                >
                  Value {leftCardData.offerValue}
                </Typography>
                <Box sx={{ marginTop: "3px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "4.59458px",
                      lineHeight: "7px",
                      color: " #1E1E1E",
                      filter: checked ?"invert(1)":'none',
                    }}
                    onMouseEnter={handleOpen}
                  >
                    Validity : {leftCardData.validity}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "4.59458px",
                      lineHeight: "7px",
                      color: " #1E1E1E",
                      filter: checked ?"invert(1)":'none',
                    }}
                    onMouseEnter={handleOpen}
                  >
                    Redemption Type : {leftCardData.redemptionType}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: "elix Titling",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "13.7837px",
                    lineHeight: "16px",
                    color: "#8F0000",
                    marginTop: "10px",
                    textTransform: "capitalize",
                    filter: checked ?"invert(1)":'none',
                  }}
                  onMouseEnter={handleOpen}
                >
                  {leftCardData.cardName}
                </Typography>
                <Box sx={{ marginTop: "7px" }}>
                  <Box>
                    <LocalDrinkIcon sx={{ width: "9.05px", height: " 9.4px" }} />
                    <LocalDrinkIcon sx={{ width: "9.05px", height: " 9.4px" }} />
                  </Box>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "5.74322px",
                      lineHeight: "9px",
                      color: "#1E1E1E",
                      filter: checked ?"invert(1)":'none',
                    }}
                    onMouseEnter={handleOpen}
                  >
                    {leftCardData.productName}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "5.74322px",
                      lineHeight: "126.7%",
                      color: "#434343",
                      filter: checked ?"invert(1)":'none',
                    }}
                    onMouseEnter={handleOpen}
                  >
                    {leftCardData.productDescription}
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
                    color: "#1E1E1E",
                    marginTop: "7px",
                    filter: checked ?"invert(1)":'none',
                  }}
                  onMouseEnter={handleOpen}
                >
                  {leftCardData.adviceText}
                </Typography>
              </Box>
            )}
            {/* TEMPLATE TWO DESIGN */}
            {leftCard && tempTwo && (
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
          </CardContent>
          {/* TEMPLATE THREE DESIGN  */}
          {leftCard && tempThree && (
            <Box sx={{ margin: "0 11px 11px 11px", width: "56%" }}>
              <Box
                sx={{
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                  marginTop: "-20px",
                }}
              >
                <Box
                  sx={{
                    border: "0.5px solid #656565",
                    padding: "2px 10px 2px 10px",
                  }}
                >
                  <img
                    src={BxiLogo}
                    alt="logo"
                    height={13}
                    sx={{
                      width: "16.33px",
                      height: "13.99px",
                      left: "62.1376953125px",
                      top: "1017.85546875px",
                      borderRadius: "0px",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    // fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontSize: "7.62195px",
                    fontWeight: 500,
                    lineHeight: "10px",
                    color: "#494949",
                    marginLeft: "6px",
                  }}
                >
                  Barter Exchange Of India
                </Typography>
              </Box>
              <Box sx={{ marginTop: "25px" }}>
                <Typography
                  sx={{
                    // fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "18.2927px",
                    lineHeight: "24px",
                    color: "#000000",
                  }}
                >
                  1,00,000
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Prata",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "27.439px",
                    lineHeight: "20px",
                    color: "#000000",
                  }}
                >
                  Voucher
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "22px",
                  position: "absolute",
                  zIndex: 2,
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    sx={{
                      // fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "6px",
                      lineHeight: "8px",
                      color: "#494949",
                    }}
                  >
                    Spend it on something you love!
                  </Typography>
                  <Typography
                    sx={{
                      // fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "5px",
                      lineHeight: "7px",
                      color: "#494949",
                    }}
                  >
                    Redemption Type : Online
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "center", marginLeft: "4px" }}>
                  <Typography
                    sx={{
                      // fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "4px",
                      lineHeight: "5px",
                      color: "#494949",
                      marginBottom: "2px",
                    }}
                  >
                    Validity Of voucher
                  </Typography>
                  <Typography
                    sx={{
                      width: "72px",
                      height: "24px",
                      // fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "10px",
                      lineHeight: "13px",
                      color: "#000000",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      border: "0.46px solid #656565",
                    }}
                  >
                    4 months
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
  
          {/* TEMPLATE FOUR DESIGN  */}
          {leftCard && tempFour && (
            <Box>
              <Box
                sx={{
                  marginTop: "-32px",
                  background: "white",
                  height: "157.36px",
                  width: "102.22px",
                  borderRadius: "0px 0px 5.74291px 5.74291px",
                  marginLeft: "14px",
                  textAlign: "center",
                }}
              >
                <Box>
                  <img
                    style={{
                      width: "16px",
                      height: "13px",
                      position: "absolute",
                      top: 5,
                      right: 218,
                      zIndex: 1,
                    }}
                    src={BxiLogo}
                    alt="BxiLogo"
                  />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "4.59458px",
                    lineHeight: "7px",
                    color: " #1E1E1E",
                    paddingTop: "2rem",
                  }}
                >
                  Barter Exchange Of India
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "9.18915px",
                    lineHeight: "14px",
                    color: " #1E1E1E",
                    marginTop: "7px",
                  }}
                >
                  Value {leftCardData.offerValue}
                </Typography>
                <Box sx={{ marginTop: "3px" }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "4.59458px",
                      lineHeight: "7px",
                      color: " #1E1E1E",
                    }}
                  >
                    Validity : {leftCardData.validity}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "4.59458px",
                      lineHeight: "7px",
                      color: " #1E1E1E",
                    }}
                  >
                    Redemption Type : {leftCardData.redemptionType}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "elix Titling",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "13.7837px",
                        lineHeight: "16px",
                        color: "#8F0000",
                        marginTop: "10px",
                        textTransform: "capitalize",
                      }}
                    >
                      {leftCardData.cardName}
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "11px" }}>
                    <RamenDiningIcon sx={{ width: "12px", height: " 12px" }} />
                  </Box>
                </Box>
                <Box sx={{ marginTop: "10px" }}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "5.74322px",
                      lineHeight: "9px",
                      color: "#1E1E1E",
                    }}
                  >
                    {leftCardData.productName}
                  </Typography>
                  <Typography
                    sx={{
                      // fontFamily: 'DM Sans',
                      textAlign: "center",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "5.74291px",
                      lineHeight: "126.7%",
                      color: "#939393",
                    }}
                  >
                    {leftCardData.productDescription}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    // fontFamily: 'DM Sans',
                    textAlign: "center",
                    fontStyle: "normal",
                    fontWeight: 700,
                    fontSize: "5.74291px",
                    lineHeight: "7px",
                    color: "#1E1E1E",
                    marginTop: "13px",
                  }}
                >
                  {leftCardData.adviceText}
                </Typography>
              </Box>
            </Box>
          )}
          {/* TEMPLATE FIVE DESIGN  */}
          {leftCard && tempFive && (
            <Box>
              <Box sx={{ background: "white", height: "26.82px" }}>
                <Box
                  sx={{
                    background: " rgba(135, 135, 135, 0.46);",
                    height: "26.82px",
                    marginTop: "-32px",
                    borderRadius: "3.88659px 4.88659px 0 0",
                    display: "flex",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={BxiLogo}
                      alt="logo"
                      height={15}
                      sx={{
                        width: "16.33px",
                        height: "13.99px",
                        left: "62.1376953125px",
                        top: "1017.85546875px",
                        borderRadius: "0px",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "4.66488px",
                        fontWeight: 500,
                        lineHeight: "6px",
                        color: "#1E1E1E",
                        marginLeft: "6px",
                      }}
                    >
                      Barter Exchange Of India
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontStyle: "normal",
                        fontWeight: 700,
                        fontSize: "8.16353px",
                        lineHeight: "11px",
                        color: "#1E1E1E",
                      }}
                    >
                      Value $ 1,00,000
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        // fontFamily: "DM Sans",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "6.99731px",
                        lineHeight: "9px",
                        color: "#1E1E1E",
                      }}
                    >
                      Validity 4 months
                    </Typography>
                  </Box>
                </Box>
              </Box>
  
              <Box
                sx={{
                  background: "white",
                  height: "40.82px",
                  marginTop: "102px",
                  borderRadius: " 0 0 4.88659px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 1rem",
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    sx={{
                      fontFamily: "Charm",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "11.6622px",
                      lineHeight: "18px",
                      color: "#1E1E1E",
                      textTransform: "capitalize",
                    }}
                  >
                    Gift Card
                  </Typography>
                  <Typography
                    sx={{
                      // fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "5.83109px",
                      lineHeight: "8px",
                      color: "#1E1E1E",
                    }}
                  >
                    Spend it on Something You love!
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <ApartmentIcon></ApartmentIcon>
                  <Typography
                    sx={{
                      // fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "3.49866px",
                      lineHeight: "5px",
                      color: "#1E1E1E",
                    }}
                  >
                    Redemption Type : Online
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          {rightCard &&
            (tempOne || tempTwo || tempThree || tempFour || tempFive) && (
              <Box
                sx={{
                  ...(tempFour && {
                    border: "0.114858px solid #8E8E8E",
                    borderRadius: "8.7522px",
                    margin: "-19px 12px 0 12px",
                    padding: "13px 0 11px 16px",
                  }),
                }}
              >
                {tempFive && (
                  <Box
                    sx={{
                      background: " rgba(135, 135, 135, 0.46);",
                      height: "26.82px",
                      marginTop: "-32px",
                      borderRadius: "3.88659px 4.88659px 0 0",
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "end",
                      paddingRight: "10px",
                    }}
                  >
                    <img
                      src={BxiLogo}
                      alt="logo"
                      height={15}
                      sx={{
                        width: "16.33px",
                        height: "13.99px",
                        left: "62.1376953125px",
                        top: "1017.85546875px",
                        borderRadius: "0px",
                      }}
                    />
                  </Box>
                )}
                <Box
                  sx={{
                    marginLeft: !tempFour && "2.5rem",
                    marginTop: tempFive && "10px",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        // fontFamily: "DM Sans",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "6.89186px",
                        lineHeight: "9px",
                        color: " #494949",
                        marginBottom: "5px",
                        filter: checked ?"invert(1)":'none',
                      }}
                    >
                      Inclusion
                    </Typography>
                    <Typography
                      component="ul"
                      sx={{
                        marginLeft: "-2.2rem",
                        // fontFamily: "DM Sans",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "5.74322px",
                        lineHeight: "7px",
                        color: "#000000",
                        zIndex: 5,
                        position: "absolute",
                        filter: checked ?"invert(1)":'none',
                      }}
                    >
                      <li onMouseEnter={handleOpen}>
                        {rightCardData.inclusionPoint1}
                      </li>
                      <li onMouseEnter={handleOpen}>
                        {rightCardData.inclusionPoint2}
                      </li>
                      <li onMouseEnter={handleOpen}>
                        {rightCardData.inclusionPoint3}
                      </li>
                      <li onMouseEnter={handleOpen}>
                        {rightCardData.inclusionPoint4}
                      </li>
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
                        color: " #494949",
                        marginTop: "40px",
                        marginBottom: "5px",
                        filter: checked ?"invert(1)":'none',
                      }}
                    >
                      Exclusion
                    </Typography>
                    <Typography
                      component="ul"
                      sx={{
                        marginLeft: "-2rem",
                        // fontFamily: "DM Sans",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "5.74322px",
                        lineHeight: "7px",
                        color: "#000000",
                        zIndex: 5,
                        position: "absolute",
                        filter: checked ?"invert(1)":'none',
                      }}
                    >
                      <li onMouseEnter={handleOpen}>
                        {rightCardData.exclusionPoint1}
                      </li>
                      <li onMouseEnter={handleOpen}>
                        {rightCardData.exclusionPoint2}
                      </li>
                      <li onMouseEnter={handleOpen}>
                        {rightCardData.exclusionPoint3}
                      </li>
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "5rem" }}>
                    <Typography
                      sx={{
                        fontFamily: "Prata",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "8.04051px",
                        lineHeight: "11px",
                        color: " #000000",
                        filter: checked ?"invert(1)":'none',
                      }}
                    >
                      www.bxiworld.com
                    </Typography>
                  </Box>
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
                          color: "#FFFFFF",
                        }}
                      >
                        Value $1,00,000
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ color: "white", justifyContent: "center" }}>
                          <DinnerDiningIcon />
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
                            Validity : 4 Months
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
                            Redemption Type : Online
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
                      color: "#F4F4F4",
                      width: "35.41px",
                      height: "27.41px",
                    }}
                  >
                    Gift Card
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
  