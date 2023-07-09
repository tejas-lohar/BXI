import React, { useRef, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputBase,
  IconButton,
  Button,
  Switch,
} from "@mui/material";
import { Delete } from "@material-ui/icons";

import { useDropzone } from "react-dropzone";
import UploadtoCloud from "../../../../assets/UploadtoCloud.svg";
import RadioIcon from "@mui/icons-material/Radio";
import FlatwareIcon from "@mui/icons-material/Flatware";
import ApartmentIcon from "@mui/icons-material/Apartment";
import IcecreamIcon from "@mui/icons-material/Icecream";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LiquorIcon from "@mui/icons-material/Liquor";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import IronIcon from "@mui/icons-material/Iron";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";

import { useEffect } from "react";

const TemplateCustomOptions = ({
  updateFile,
  updateBGColor,
  updateIcon,
  updateTextColor,
}) => {
  const [dataUrlFront, setDataUrlFront] = useState("");
  const [dataUrlBack, setDataUrlBack] = useState("");
  const [files, setFiles] = useState([]);
  const [cardBgColor, setCardBgColor] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activeAction, setActiveAction] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");
  const [open, setOpen] = useState(false);
  const [hoveredText, setHoveredText] = useState("");
  const [checked, handleChange] = useState(true);
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

  // dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".jpg, .png, .xlsx",
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(" ");
    setError(false);
  };

  const colors = [
    //LIGHT
    "#FF00001a",
    "#FFA5001a",
    "#FFFF001a",
    "#00FF001a",
    "#00FFFF1a",
    "#0000FF1a",
    "#FF00FF1a",
    "#8000801a",
    // "#0000001a",
    "#FFFFFF", // white

    // MIDDLE
    "#FF000080",
    "#FFA50080",
    "#FFFF0080",
    "#00FF0080",
    "#00FFFF80",
    "#0000FF80",
    "#FF00FF80",
    "#80008080",
    "#00000080",

    // DARK
    "#FF0000", // red
    "#FFA500", // orange
    "#FFFF00", // yellow
    "#00FF00", // green
    "#00FFFF", // cyan
    "#0000FF", // blue
    "#FF00FF", // magenta
    "#800080", // purple
    "#000000", // black
  ];

  const iconList = [
    {
      icon: <RadioIcon sx={{ fontSize: "2.5rem" }} />,
      action: "RadioIcon1",
    },
    {
      icon: <IcecreamIcon sx={{ fontSize: "2.5rem" }} />,
      action: "IcecreamIcon1",
    },
    {
      icon: <ApartmentIcon sx={{ fontSize: "2.5rem" }} />,
      action: "ApartmentIcon2",
    },
    {
      icon: <FlatwareIcon sx={{ fontSize: "2.5rem" }} />,
      action: "FlatwareIcon1",
    },
    {
      icon: <AirplaneTicketIcon sx={{ fontSize: "2.5rem" }} />,
      action: "AirplaneTicketIcon3",
    },
    {
      icon: <FastfoodIcon sx={{ fontSize: "2.5rem" }} />,
      action: "FastfoodIcon1",
    },
    {
      icon: <LocalCafeIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LocalCafeIcon2",
    },
    {
      icon: <LiquorIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LiquorIcon3",
    },
    {
      icon: <LunchDiningIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LunchDiningIcon1",
    },
    {
      icon: <LocalPizzaIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LocalPizzaIcon1",
    },
    {
      icon: <IronIcon sx={{ fontSize: "2.5rem" }} />,
      action: "IronIcon2",
    },
    {
      icon: <RadioIcon sx={{ fontSize: "2.5rem" }} />,
      action: "RadioIcon2",
    },
    {
      icon: <IcecreamIcon sx={{ fontSize: "2.5rem" }} />,
      action: "IcecreamIcon2",
    },
    {
      icon: <ApartmentIcon sx={{ fontSize: "2.5rem" }} />,
      action: "ApartmentIcon1",
    },
    {
      icon: <FlatwareIcon sx={{ fontSize: "2.5rem" }} />,
      action: "FlatwareIcon2",
    },
    {
      icon: <AirplaneTicketIcon sx={{ fontSize: "2.5rem" }} />,
      action: "AirplaneTicketIcon1",
    },
    {
      icon: <FastfoodIcon sx={{ fontSize: "2.5rem" }} />,
      action: "FastfoodIcon2",
    },
    {
      icon: <LocalCafeIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LocalCafeIcon3",
    },
    {
      icon: <LiquorIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LiquorIcon1",
    },
    {
      icon: <LunchDiningIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LunchDiningIcon2",
    },
    {
      icon: <LocalPizzaIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LocalPizzaIcon2",
    },
    {
      icon: <IronIcon sx={{ fontSize: "2.5rem" }} />,
      action: "IronIcon1",
    },
    {
      icon: <AirplaneTicketIcon sx={{ fontSize: "2.5rem" }} />,
      action: "AirplaneTicketIcon2",
    },
    {
      icon: <FastfoodIcon sx={{ fontSize: "2.5rem" }} />,
      action: "FastfoodIcon3",
    },
    // {
    //   icon: <LocalCafeIcon sx={{ fontSize: "2.5rem" }} />,
    //   action: "LocalCafeIcon1",
    // },
    // {
    //   icon: <LiquorIcon sx={{ fontSize: "2.5rem" }} />,
    //   action: "LiquorIcon2",
    // },
  ];
  function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  useEffect(() => {
    updateBGColor(cardBgColor);
  }, [cardBgColor]);

  useEffect(() => {
    updateIcon(category);
  }, [category]);

  useEffect(() => {
    updateFile(files);
  }, [files]);

  useEffect(() => {
    updateTextColor(checked);
  }, [checked]);

  return (
    <>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "14px",
          lineSeight: "21px",
          color: "#6B7A99",
          marginTop: "1rem",
        }}
      >
        Upload Image
      </Typography>
      <Box
        {...getRootProps({ className: "dropzone" })}
        // sx={{
        //   ...(image === false && {
        //     display: "none",
        //   }),
        //   ...(image === true && {
        //     display: "flex",
        //   }),
        // }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            padding: "3rem",
            marginTop: "1rem",
            textAlign: "center",
            "&:hover": { cursor: "pointer" },
            borderColor: "#2d8ae0",
            borderRadius: "7px",
            border: "2px dashed #445FD2",
            borderSpacing: "6px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={UploadtoCloud}
              sx={{
                position: "sticky",
                top: "0px",
                marginRight: "14rem",
              }}
            />
            <Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "10px",
                  color: "#6B7A99",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                  },
                }}
              >
                Drag & Drop upload or browse to choose a file
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "8px",
                  color: "#676767",
                  textAlign: "center",
                }}
              >
                Supported format : JPEG, PNG, XLSX
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "2rem", marginBottom: "1.5rem" }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "10px",
            lineHeight: "15px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            color: "#6B7A99",
          }}
        >
          Uploaded file
        </Typography>
      </Box>
      <Box sx={{ marginBottom: "2rem" }}>
        <InputBase
          placeholder={files[0]?.path ? files[0]?.path : "document-name.JPEG"}
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
          type="text"
          sx={{
            border: "1px solid #445FD2",
            borderRadius: "4px",
            padding: "0.5rem",
            width: "70%",
          }}
          inputProps={{
            style: {
              color: "#6B7A99",
            },
          }}
          endAdornment={
            <IconButton
              aria-label="clear input"
              onClick={() => {
                setFiles([]);
              }}
              style={{ color: "#445FD2" }}
            >
              <Delete />
            </IconButton>
          }
        />
      </Box>
      <Box sx={{ marginTop: "2rem", marginBottom: "1.5rem", color: "#315794" }}>
        <Typography sx={hedingTexts}>Choose Background color</Typography>
      </Box>
      <Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {chunk(colors, 9).map((rowColors, index) => (
            <Box key={index} sx={{ display: "flex" }}>
              {rowColors.map((color) => (
                <Box
                  onClick={() => {
                    setActiveColor(color);
                    setCardBgColor(color);
                  }}
                  className={activeColor === color ? "active" : ""}
                  key={color}
                  sx={{
                    width: "4rem",
                    height: "4rem",
                    backgroundColor: color,
                    borderRadius: "2px",
                    margin: "0.5rem",
                    cursor: "pointer",
                    border: "0.1px solid #B1AFB480",
                    "&:hover": {
                      border: "1px solid blue",
                    },
                    "&.active": {
                      border: "1.5px solid blue",
                    },
                  }}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ marginTop: "2rem", marginBottom: "1.5rem" }}>
        <Typography sx={hedingTexts}>Choose Element</Typography>
      </Box>
      <Typography fontSize="15px">{category}</Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {iconList.map(({ icon, action }) => (
          <Box
            key={action}
            onClick={() => {
              setActiveAction(action);
              setCategory(action);
            }}
            className={activeAction === action ? "active" : ""}
            sx={{
              width: "37px",
              height: "37px",
              border: "1px solid black",
              borderRadius: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0.5rem",
              cursor: "pointer",
              "&:hover": {
                border: "1px solid blue",
              },
              "&.active": {
                border: "1.5px solid blue",
              },
            }}
          >
            {icon}
          </Box>
        ))}
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              defaultChecked
              onChange={(e) => handleChange(!checked)}
            />
          }
          label="Invert Text"
        />
      </Box>
    </>
  );
};

export default TemplateCustomOptions;
const hedingTexts = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "21px",
    color: "#6B7A99",
  };