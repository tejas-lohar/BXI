import {
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
  } from "@mui/material";
  import CardOne from "./CardOne";
  import { useState } from "react";
  
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
  }) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState("Choose wisely");
    const handleRadioChange = (event) => {
      setValue(event.target.value);
      setHelperText(" ");
      setError(false);
    };
    return (
      <>
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
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6} md={6}>
            <CardOne
              leftCard
              tempOne={tempOne}
              tempTwo={tempTwo}
              tempThree={tempThree}
              tempFour={tempFour}
              tempFive={tempFive}
              cardBgColor={cardBgColor}
              cardImage={cardImage}
              myRefBack={myRefBack}
              myRefFront={myRefFront}
              checked={checked}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <CardOne
              rightCard
              tempOne={tempOne}
              tempTwo={tempTwo}
              tempThree={tempThree}
              tempFour={tempFour}
              tempFive={tempFive}
              cardBgColor={cardBgColor}
              cardImage={cardImage}
              myRefBack={myRefBack}
              myRefFront={myRefFront}
              checked={checked}
            />
          </Grid>
        </Grid>
      </>
    );
  };
  
  export default Template;
  