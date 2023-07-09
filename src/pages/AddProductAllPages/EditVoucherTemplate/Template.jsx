import {
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CardOne from "../CardOne";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { voucherStyle } from './EditVoucherStyle'

const Template = ({
  tempOne = false,
  tempTwo = false,
  tempThree = false,
  tempFour = false,
  tempFive = false,
  cardBgColor,
  cardImage,
  category,
  templateId,
  productData,
  textInverted,
  iconInverted,
  myRefFront,
  myRefBack
}) => {

  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [openLeftEdit ,setOpenLeftEdit] = useState(false)
  const [helperText, setHelperText] = useState("Choose wisely");
  
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const classes = voucherStyle()

  return (
    <>
      <Grid className={classes.cardContainer} spacing={6}>
        <Grid item xs={12} sm={6} md={6}>
          <CardOne
            leftCard
            tempOne = {templateId == 'Template1' && true}
            tempTwo = {templateId == 'Template2' && true}
            tempThree={templateId == 'Template3' && true}
            cardBgColor={cardBgColor}
            showLeftEdit={openLeftEdit}
            closePopup = {() => { console.log('closed');setOpenLeftEdit(false)}}
            cardImage={cardImage}
            category={category}
            // myRefBack={myRefBack}
            myRefFront={myRefFront}
            templateId = {templateId}
            productData={productData}
            textInverted={textInverted}
            iconInverted = {iconInverted}
            
            
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CardOne
            rightCard
            tempOne = {templateId == 'Template1' && true}
            tempTwo = {templateId == 'Template2' && true}
            tempThree={templateId == 'Template3' && true}
            cardBgColor={cardBgColor}
            // cardImage={cardImage}
            myRefBack={myRefBack}
            // myRefFront={myRefFront}
            showLeftEdit={openLeftEdit}
            closePopup = {() => { console.log('closed');setOpenLeftEdit(false)}}
            templateId = {templateId}
            productData = {productData}
            textInverted ={textInverted}
            iconInverted = {iconInverted}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Template;
