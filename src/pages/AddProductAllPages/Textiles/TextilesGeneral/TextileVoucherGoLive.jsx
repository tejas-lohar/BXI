import {
  Box,
  Typography,
  InputBase,
  IconButton,
  Button,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  BottomNavigation,
} from "@mui/material";
import { Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadtoCloud from "../../../../assets/UploadtoCloud.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
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

import Template from "../Template";
// import { Switch as AntSwitch } from "antd";
import { voucherStyle } from "./EditVoucherStyle";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import TemplateCustomOptions from "./TemplateCustomOptions";

const TextileVoucherGoLive = () => {
  let id;
  id = useParams().id;
  const navigate = useNavigate();
  const myRefFront = useRef(null);
  const myRefFrontTwo = useRef(null);
  const myRefFrontThree = useRef(null);
  const myRefFrontFour = useRef(null);
  const myRefFrontFive = useRef(null);
  const myRefBack = useRef(null);
  const myRefBackTwo = useRef(null);
  const myRefBackThree = useRef(null);
  const myRefBackFour = useRef(null);
  const myRefBackFive = useRef(null);
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
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };
  const classes = voucherStyle();
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
        // const link = document.createElement("a");
        // link.download = "my-design-front.png";
        // link.href = dataUrl;
        // link.click();
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
        // const link = document.createElement("a");
        // link.download = "my-design-back.png";
        // link.href = dataUrl;
        // link.click();
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  // DWLD FRONT BACK 2
  const downloadCardFront2 = () => {
    htmlToImage
      .toPng(myRefFrontTwo.current)
      .then((dataUrl) => {
        setDataUrlFront(dataUrl);
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  const downloadCardBack2 = () => {
    htmlToImage
      .toPng(myRefBackTwo.current)
      .then((dataUrl) => {
        setDataUrlBack(dataUrl);
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  // DWLD FRONT BACK 3
  const downloadCardFront3 = () => {
    htmlToImage
      .toPng(myRefFrontThree.current)
      .then((dataUrl) => {
        setDataUrlFront(dataUrl);
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  const downloadCardBack3 = () => {
    htmlToImage
      .toPng(myRefBackThree.current)
      .then((dataUrl) => {
        setDataUrlBack(dataUrl);
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  // DWLD FRONT BACK 4
  const downloadCardFront4 = () => {
    htmlToImage
      .toPng(myRefFrontFour.current)
      .then((dataUrl) => {
        setDataUrlFront(dataUrl);
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  const downloadCardBack4 = () => {
    htmlToImage
      .toPng(myRefBackFour.current)
      .then((dataUrl) => {
        setDataUrlBack(dataUrl);
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  // DWLD FRONT BACK 5
  const downloadCardFront5 = () => {
    htmlToImage
      .toPng(myRefFrontFive.current)
      .then((dataUrl) => {
        setDataUrlFront(dataUrl);
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  const downloadCardBack5 = () => {
    htmlToImage
      .toPng(myRefBackFive.current)
      .then((dataUrl) => {
        setDataUrlBack(dataUrl);
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
  useEffect(() => {
    GetProductByid();
  }, []);
  useEffect(() => {
    console.log("data========", productData);
  }, [productData]);

  async function GetProductByid() {
    await axios
      .get(
        `product/get_product_byId/${id}
        `,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res?.data) {
          let response = res?.data;
          let productDetails = {
            productName: response?.ProductName,
            productSubtittle: response?.ProductSubtittle,
            validityOfVoucherUnit: "",
            validityOfVoucherValue: "",
            pricePerUnit: "",
            redemptionType: response.redemptionType,
            inclusions: response.Inclusions,
            exclusions: response.Exclusions,
          };
          if (response?.ProductsVariantions?.length > 0) {
            let variations = response.ProductsVariantions[0];
            productDetails.validityOfVoucherUnit =
              variations.validityOfVoucherUnit;
            productDetails.validityOfVoucherValue =
              variations.validityOfVoucherValue;
            productDetails.pricePerUnit = variations.PricePerUnit;
          }
          setProductData(productDetails);
        }
      });
  }
  useEffect(() => {
    if (dataUrlFront && dataUrlBack && isSubmitted) {
      var formData = new FormData();
      formData.append("files", dataUrlFront);
      formData.append("files", dataUrlBack);
      formData.append("id", id);
      axios({
        method: "post",
        url: "/product/product_mutation",
        data: formData,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          console.log(`${loaded}kb of ${total}kb | ${percent}% `);
        },
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          navigate(`/home/textilesvoucherprev/${id}`);
        })
        .catch((err) => console.log(err));
    }
  }, [dataUrlFront, dataUrlBack]);

  const uploadTemplate = () => {
    setDataUrlFront("");
    setIsSubmitted(false);
    if (value == "Template1") {
      setIsSubmitted(true);
      downloadCardFront();
      downloadCardBack();
    }
    if (value == "Template2") {
      setIsSubmitted(true);
      downloadCardFront2();
      downloadCardBack2();
    }
    if (value == "Template3") {
      setIsSubmitted(true);
      downloadCardFront3();
      downloadCardBack3();
    }
    if (value == "Template4") {
      setIsSubmitted(true);
      downloadCardFront4();
      downloadCardBack4();
    }
    if (value == "Template5") {
      setIsSubmitted(true);
      downloadCardFront5();
      downloadCardBack5();
    }
  };
  return (
    <>
      <Box sx={{ padding: 4, background: "#f3f6f9", borderRadius: "2px" }}>
        <RadioGroup
          name="Template"
          onChange={handleRadioChange}
          className={classes.templateHeader}
        >
          <FormControlLabel
            checked={value == "Template1" ? true : false}
            value="Template1"
            control={<Radio sx={{ color: "#2d8ae0" }} />}
            label={
              <Typography
                className={classes.templateLabel}
                sx={{ fontSize: "1.5rem", color: "#315794" }}
              >
                {" "}
                Template 1{" "}
              </Typography>
            }
            sx={{ color: "#2d8ae0" }}
          />
          {value == "Template1" && (
            <button
              className={classes.templateEditIconButton}
              onClick={() => {
                setOpen(true);
              }}
            >
              <EditIcon />
            </button>
          )}
        </RadioGroup>
        {/* template 1  */}
        <Box>
          <Template
            tempOne
            cardBgColor={value == "Template1" ? cardBgColor : ""}
            cardImage={value == "Template1" ? files[0]?.preview : null}
            category={
              value == "Template1" ? (
                category ? (
                  category
                ) : (
                  <FastfoodIcon sx={{ fontSize: "2.5rem" }} />
                )
              ) : (
                <FastfoodIcon sx={{ fontSize: "2.5rem" }} />
              )
            }
            templateId="Template1"
            productData={productData}
            textInverted={value == "Template1" ? checked : true}
            myRefBack={myRefBack}
            myRefFront={myRefFront}
          />
          {/* <Template
            tempOne
            cardBgColor={cardBgColor}
            cardImage={files[0]?.preview}
            myRefBack={myRefBack}
            myRefFront={myRefFront}
            checked={checked}
          /> */}
        </Box>
        {value == "Template1" && (
          <TemplateCustomOptions
            updateFile={(e) => {
              setFiles(e);
            }}
            updateBGColor={(e) => {
              setCardBgColor(e);
            }}
            updateIcon={(e) => {
              setCategory(e);
            }}
            updateTextColor={(e) => {
              setChecked(e);
            }}
          />
        )}
        {/* TEMP 2  */}
        <RadioGroup
          name="Template"
          onChange={handleRadioChange}
          className={classes.templateHeader}
        >
          <FormControlLabel
            checked={value == "Template2" ? true : false}
            value="Template2"
            control={<Radio sx={{ color: "#2d8ae0" }} />}
            label={
              <Typography
                className={classes.templateLabel}
                sx={{ fontSize: "1.5rem", color: "#315794" }}
              >
                {" "}
                Template 2{" "}
              </Typography>
            }
            sx={{ color: "#2d8ae0" }}
          />
          {value == "Template2" && (
            <button
              className={classes.templateEditIconButton}
              onClick={() => {
                setOpen(true);
              }}
            >
              <EditIcon />
            </button>
          )}
        </RadioGroup>
        <Box>
          <Template
            cardBgColor={value == "Template2" ? cardBgColor : ""}
            cardImage={value == "Template2" ? files[0]?.preview : null}
            category={
              value == "Template2" ? (
                category ? (
                  category
                ) : (
                  <FastfoodIcon sx={{ fontSize: "2.5rem" }} />
                )
              ) : (
                <FastfoodIcon sx={{ fontSize: "2.5rem" }} />
              )
            }
            templateId="Template2"
            productData={productData}
            textInverted={value == "Template2" ? checked : true}
            myRefBack={myRefBackTwo}
            myRefFront={myRefFrontTwo}
          />
        </Box>
        {value == "Template2" && (
          <TemplateCustomOptions
            updateFile={(e) => {
              setFiles(e);
            }}
            updateBGColor={(e) => {
              setCardBgColor(e);
            }}
            updateIcon={(e) => {
              setCategory(e);
            }}
            updateTextColor={(e) => {
              setChecked(e);
            }}
          />
        )}
        {/* TEMP 3  */}
        <RadioGroup
          name="Template"
          onChange={handleRadioChange}
          className={classes.templateHeader}
        >
          <FormControlLabel
            checked={value == "Template3" ? true : false}
            value="Template3"
            control={<Radio sx={{ color: "#2d8ae0" }} />}
            label={
              <Typography
                className={classes.templateLabel}
                sx={{ fontSize: "1.5rem", color: "#315794" }}
              >
                {" "}
                Template 3{" "}
              </Typography>
            }
            sx={{ color: "#2d8ae0" }}
          />
          {value == "Template3" && (
            <button
              className={classes.templateEditIconButton}
              onClick={() => {
                setOpen(true);
              }}
            >
              <EditIcon />
            </button>
          )}
        </RadioGroup>
        <Box>
          <Template
            cardBgColor={value == "Template3" ? cardBgColor : ""}
            cardImage={value == "Template3" ? files[0]?.preview : null}
            category={
              value == "Template3" ? (
                category ? (
                  category
                ) : (
                  <FastfoodIcon sx={{ fontSize: "2.5rem" }} />
                )
              ) : (
                <FastfoodIcon sx={{ fontSize: "2.5rem" }} />
              )
            }
            templateId="Template3"
            productData={productData}
            textInverted={value == "Template3" ? checked : true}
            myRefBack={myRefBackThree}
            myRefFront={myRefFrontThree}
          />
        </Box>
        {value == "Template3" && (
          <TemplateCustomOptions
            updateFile={(e) => {
              setFiles(e);
            }}
            updateBGColor={(e) => {
              setCardBgColor(e);
            }}
            updateIcon={(e) => {
              setCategory(e);
            }}
            updateTextColor={(e) => {
              setChecked(e);
            }}
          />
        )}
        {/* TEMP 4  */}
        <RadioGroup
          name="Template"
          onChange={handleRadioChange}
          className={classes.templateHeader}
        >
          <FormControlLabel
            checked={value == "Template4" ? true : false}
            value="Template4"
            control={<Radio sx={{ color: "#2d8ae0" }} />}
            label={
              <Typography
                className={classes.templateLabel}
                sx={{ fontSize: "1.5rem", color: "#315794" }}
              >
                {" "}
                Template 4{" "}
              </Typography>
            }
            sx={{ color: "#2d8ae0" }}
          />
          {value == "Template4" && (
            <button
              className={classes.templateEditIconButton}
              onClick={() => {
                setOpen(true);
              }}
            >
              <EditIcon />
            </button>
          )}
        </RadioGroup>
        <Box>
          <Template
            cardBgColor={value == "Template4" ? cardBgColor : ""}
            cardImage={value == "Template4" ? files[0]?.preview : null}
            category={
              value == "Template4" ? (
                category ? (
                  category
                ) : (
                  <FastfoodIcon sx={{ fontSize: "2.5rem" }} />
                )
              ) : (
                <FastfoodIcon sx={{ fontSize: "2.5rem" }} />
              )
            }
            templateId="Template4"
            productData={productData}
            textInverted={value == "Template4" ? checked : true}
            myRefBack={myRefBackFour}
            myRefFront={myRefFrontFour}
          />
        </Box>
        {value == "Template4" && (
          <TemplateCustomOptions
            updateFile={(e) => {
              setFiles(e);
            }}
            updateBGColor={(e) => {
              setCardBgColor(e);
            }}
            updateIcon={(e) => {
              setCategory(e);
            }}
            updateTextColor={(e) => {
              setChecked(e);
            }}
          />
        )}
        {/* TEMP 5  */}
        <RadioGroup
          name="Template"
          onChange={handleRadioChange}
          className={classes.templateHeader}
        >
          <FormControlLabel
            checked={value == "Template5" ? true : false}
            value="Template5"
            control={<Radio sx={{ color: "#2d8ae0" }} />}
            label={
              <Typography
                className={classes.templateLabel}
                sx={{ fontSize: "1.5rem", color: "#315794" }}
              >
                {" "}
                Template 5{" "}
              </Typography>
            }
            sx={{ color: "#2d8ae0" }}
          />
          {value == "Template5" && (
            <button
              className={classes.templateEditIconButton}
              onClick={() => {
                setOpen(true);
              }}
            >
              <EditIcon />
            </button>
          )}
        </RadioGroup>
        <Box>
          <Template
            cardBgColor={value == "Template5" ? cardBgColor : ""}
            cardImage={value == "Template5" ? files[0]?.preview : null}
            category={
              value == "Template5" ? (
                category ? (
                  category
                ) : (
                  <FastfoodIcon sx={{ fontSize: "2.5rem" }} />
                )
              ) : (
                <FastfoodIcon sx={{ fontSize: "2.5rem" }} />
              )
            }
            templateId="Template5"
            productData={productData}
            textInverted={value == "Template5" ? checked : true}
            myRefBack={myRefBackFive}
            myRefFront={myRefFrontFive}
          />
        </Box>
        {value == "Template5" && (
          <TemplateCustomOptions
            updateFile={(e) => {
              setFiles(e);
            }}
            updateBGColor={(e) => {
              setCardBgColor(e);
            }}
            updateIcon={(e) => {
              setCategory(e);
            }}
            updateTextColor={(e) => {
              setChecked(e);
            }}
          />
        )}

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
        <Box
          sx={{
            width: "100%",
            // height: "100%",
          }}
        >
          <BottomNavigation
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#f3f6f9",
              p: "5px",
              // boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
            }}
            showLabels
          >
            <Typography
              sx={{
                marginRight: "auto",
                p: "2%",
                fontFamily: "Poppins",
                fontStyle: "normal",
                color: "#6B7A99",
                fontSize: 14,
                display: "flex",
                gap: "10px",
              }}
            >
              <Box
                component="img"
                sx={{ width: "23px", height: "23px" }}
                src={RedoIcon}
                alt=""
              />
              Reset to Defaults
            </Typography>
            <Box sx={{ display: "flex", gap: "10px", p: 1, width: "50%" }}>
              <Button
                sx={{
                  width: "100%",
                  height: "32px",
                  borderRadius: "10px",
                  background: "#fff",
                  color: "#636161",
                  "&:hover": {
                    background: "#f3f6f9",
                    color: "#000",
                  },
                }}
                variant="contained"
              >
                cancel
              </Button>
              <Button
                sx={{
                  width: "100%",
                  height: "32px",
                  borderRadius: "10px",
                  background: "#445FD2",
                  "&:hover": {
                    background: "#445FD2",
                  },
                }}
                variant="contained"
                onClick={() => uploadTemplate()}
              >
                Next
              </Button>
            </Box>
          </BottomNavigation>
        </Box>
        {/* <Box sx={{ marginTop: "2rem" }}>
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
        </Box> */}
        {/* <Box
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
                  marginRight: '14rem',
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
        </Box> */}
        {/* INVERTED TEXT  */}
        {/* <Box sx={{ marginTop: "1.5rem" }}>
          <Typography sx={hedingTexts}>Invert Text</Typography>
          <AntSwitch
            checked={checked}
            onChange={handleToggle}
            inputProps={{ "aria-label": "ant design" }}
          />
        </Box> */}
        {/* template 2 */}
        {/* <Box sx={{ marginTop: "3rem" }}>
          <Template tempOne={false} tempTwo />
        </Box> */}
        {/* template 3  */}
        {/* <Box sx={{ marginTop: "3rem" }}>
          <Template tempTwo={false} tempThree />
        </Box> */}
        {/* template 4  */}
        {/* <Box sx={{ marginTop: "3rem" }}>
          <Template tempThree={false} tempFour />
        </Box> */}
        {/* template 5  */}
        {/* <Box sx={{ marginTop: "3rem" }}>
          <Template tempFour={false} tempFive />
        </Box> */}
      </Box>
    </>
  );
};

export default TextileVoucherGoLive;

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
