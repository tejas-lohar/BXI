import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CardOne from "../../../pages/AddProductAllPages/CardOne";
import { useState } from "react";
import EditIcon from "../../../assets/Images/CommonImages/EditIcon.svg";
import { voucherStyle } from "./TextilesGeneral/EditVoucherStyle";

const Template = ({
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
  templateId,
  category,
  productData,
  textInverted,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");
  const [openLeftEdit, setOpenLeftEdit] = useState(false);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };
  const classes = voucherStyle();

  return (
    <>
      {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="Template"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value={
              tempOne
                ? "Template1"
                : tempTwo
                ? "Template2"
                : tempThree
                ? "Template3"
                : tempFour
                ? "Template4"
                : tempFive
                ? "Template5"
                : ""
            }
            control={<Radio sx={{ color: "#445FD2" }} />}
            label={
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontHeight: 400,
                  fontSize: "14px",
                  lineHeight: "21px",
                  color: "#6B7A99",
                }}
              >
                {tempOne
                  ? "Template 1"
                  : tempTwo
                  ? "Template 2"
                  : tempThree
                  ? "Template 3"
                  : tempFour
                  ? "Template 4"
                  : tempFive
                  ? "Template 5"
                  : ""}
              </Typography>
            }
            sx={{ color: "#2d8ae0" }}
          />
        </RadioGroup>
        <Box  sx={{cursor: 'pointer'}} >
          <img src={EditIcon} alt="editIcon" />
        </Box>
      </Box> */}
      <Grid className={classes.cardContainer} container spacing={6}>
        <Grid item xs={12} sm={6} md={6}>
          <CardOne
            leftCard
            tempOne={templateId == "Template1" && true}
            tempTwo={templateId == "Template2" && true}
            tempThree={templateId == "Template3" && true}
            tempFour={templateId == "Template4" && true}
            tempFive={templateId == "Template5" && true}
            cardBgColor={cardBgColor}
            showLeftEdit={openLeftEdit}
            closePopup={() => {
              console.log("closed");
              setOpenLeftEdit(false);
            }}
            category={category}
            cardImage={cardImage}
            myRefFront={myRefFront}
            templateId={templateId}
            productData={productData}
            textInverted={textInverted}
            // myRefBack={myRefBack}
            // checked={checked}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CardOne
            rightCard
            tempOne = {templateId == 'Template1' && true}
            tempTwo = {templateId == 'Template2' && true}
            tempThree={templateId == 'Template3' && true}
            tempFour={templateId == "Template4" && true}
            tempFive={templateId == "Template5" && true}
            cardBgColor={cardBgColor}
            // cardImage={cardImage}
            myRefBack={myRefBack}
            // myRefFront={myRefFront}
            showLeftEdit={openLeftEdit}
            closePopup = {() => { console.log('closed');setOpenLeftEdit(false)}}
            templateId = {templateId}
            productData = {productData}
            textInverted ={textInverted}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Template;
