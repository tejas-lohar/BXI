import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { Delete } from "@material-ui/icons";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadtoCloud from "../../assets/UploadtoCloud.svg";
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
import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";
import Template from "./Template";
import { Switch as AntSwitch } from "antd";

const VoucherCard = () => {
  const myRefFront = useRef(null);
  const myRefBack = useRef(null);
  const [dataUrlFront, setDataUrlFront] = useState("");
  const [dataUrlBack, setDataUrlBack] = useState("");
  const [files, setFiles] = useState([]);
  const [cardBgColor, setCardBgColor] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activeAction, setActiveAction] = useState("");
  const [category, setCategory] = useState("");
  const [loader, setLOader] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select");
  const [checked, setChecked] = useState(false);

  function handleToggle() {
    setChecked(!checked);
  }

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
  const colors = [
    //LIGHT
    "#FBF2C880",
    "#F9B68F80",
    "#F68B9180",
    "#F695C780",
    "#8BB5DB80",
    "#89D6A480",
    "#C5A1CB80",
    "#B1AFB480",
    "#FFFDFE80",

    // MIDDLE
    "#F8EA94",
    "#F8A879",
    "#F4757C",
    "#F481BC",
    "#8BB5DB",
    "#71CF92",
    "#BA8FC2",
    // "#A2A0A5",
    "#0000FF80",
    // "#FFFDFE",
    "#A2A0A5",

    // DARK
    "#806E00",
    "#8A3300",
    "#8B0008",
    "#8C0048",
    "#004788",
    "#008C31",
    "#76008C",
    "#37008A",
    "#040002",
  ];
  // const colors = [
  //   //LIGHT
  //   "#FF00001a",
  //   "#FFA5001a",
  //   "#FFFF001a",
  //   "#00FF001a",
  //   "#00FFFF1a",
  //   "#0000FF1a",
  //   "#FF00FF1a",
  //   "#8000801a",
  //   // "#0000001a",
  //   "#FFFFFF", // white

  //   // MIDDLE
  //   "#FF000080",
  //   "#FFA50080",
  //   "#FFFF0080",
  //   "#00FF0080",
  //   "#00FFFF80",
  //   "#0000FF80",
  //   "#FF00FF80",
  //   "#80008080",
  //   "#00000080",

  //   // DARK
  //   "#FF0000", // red
  //   "#FFA500", // orange
  //   "#FFFF00", // yellow
  //   "#00FF00", // green
  //   "#00FFFF", // cyan
  //   "#0000FF", // blue
  //   "#FF00FF", // magenta
  //   "#800080", // purple
  //   "#000000", // black
  // ];

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

  const downloadCardFront = () => {
    htmlToImage
      .toPng(myRefFront.current)
      .then((dataUrl) => {
        setDataUrlFront(dataUrl);
        const link = document.createElement("a");
        link.download = "my-design-front.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  const downloadCardBack = () => {
    htmlToImage
      .toPng(myRefBack.current)
      .then((dataUrl) => {
        setDataUrlBack(dataUrl);
        const link = document.createElement("a");
        link.download = "my-design-back.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setLOader(true);
    setTimeout(() => {
      setLOader(false);
    }, [5000]);
  };

  return (
    <>
      <Box sx={{ padding: 8, background: "#FAFBFD", borderRadius: "2px" }}>
        {/* template 1  */}
        <Box>
          <Template
            tempOne
            cardBgColor={cardBgColor}
            cardImage={files[0]?.preview}
            myRefBack={myRefBack}
            myRefFront={myRefFront}
            checked={checked}
          />
        </Box>
        <Box sx={{ marginTop: "2rem" }}>
          {/* Added two buttons for image dowld  */}
          <Button
            style={{
              backgroundColor: "#445FD2",
              color: "white",
              marginRight: "1rem",
            }}
            onClick={downloadCardFront}
          >
            Download Card Front
          </Button>
          <Button
            style={{ backgroundColor: "#445FD2", color: "white" }}
            onClick={downloadCardBack}
          >
            Download Card Back
          </Button>
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
        </Box>
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
              component="img"
              src={UploadtoCloud}
              sx={{
                position: "absolute",
                left: "30%",
              }}
            />
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
        <Box
          sx={{ marginTop: "2rem", marginBottom: "1.5rem", color: "#315794" }}
        >
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
        {/* INVERTED TEXT  */}
        <Box sx={{ marginTop: "1.5rem" }}>
          <Typography sx={hedingTexts}>Invert Text</Typography>
          <AntSwitch
            checked={checked}
            onChange={handleToggle}
            inputProps={{ "aria-label": "ant design" }}
          />
        </Box>
        {/* template 2 */}
        <Box sx={{ marginTop: "3rem" }}>
          <Template tempOne={false} tempTwo />
        </Box>
        {/* template 3  */}
        <Box sx={{ marginTop: "3rem" }}>
          <Template tempTwo={false} tempThree />
        </Box>
        {/* template 4  */}
        <Box sx={{ marginTop: "3rem" }}>
          <Template tempThree={false} tempFour />
        </Box>
        {/* template 5  */}
        <Box sx={{ marginTop: "3rem" }}>
          <Template tempFour={false} tempFive />
        </Box>

        <Box sx={{ width: "104%", mx: "auto", mt: 3 }}>
          <Typography sx={Text}>
            List this product for number of days ( maximum 365 days )
          </Typography>
          <Select
            value={selectedOption}
            onChange={handleChange}
            sx={inputFieldDesign}
          >
            <MenuItem
              value="Select"
              disabled
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: 14,
                color: "rgba(173, 184, 204, 0.59)",
              }}
            >
              Select an option
            </MenuItem>
            <MenuItem value="option1" sx={MenuItemTextStyle}>
              Option 1
            </MenuItem>
            <MenuItem value="option2" sx={MenuItemTextStyle}>
              Option 2
            </MenuItem>
            <MenuItem value="option3" sx={MenuItemTextStyle}>
              Option 3
            </MenuItem>
          </Select>
        </Box>

        <Box sx={{ width: "104%", mx: "auto", mt: 3 }}>
          <Typography sx={Text}>Add a custom message</Typography>
          <InputBase
            placeholder="Lorem ipsum dolor sit amet consectetur."
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            type="text"
            sx={inputFieldDesign}
          ></InputBase>
        </Box>
      </Box>
    </>
  );
};

export default VoucherCard;

const MenuItemTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#6B7A99",
};

const Text = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 12,
  ml: "2%",
  mb: "1%",
  pt: "2%",
  // py: 1,
  color: "#6B7A99",
};
const inputFieldDesign = {
  background: "#fff",
  border: "none",
  color: "rgba(173, 184, 204, 0.59)",
  borderRadius: "9px",
  height: "42px",
  width: "100%",
  boxShadow: "none",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
};

const hedingTexts = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "21px",
  color: "#6B7A99",
};
