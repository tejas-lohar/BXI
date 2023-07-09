import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  BottomNavigation,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import help from "../../../../assets/Help.svg";
import UploadtoCloud from "../../../../assets/UploadtoCloud.svg";
import DeleteIcon from "../../../../assets/Images/CommonImages/DeleteIcon.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
export default function HotelsGoLive() {
  const navigate = useNavigate();
  const id = useParams().id;
  const [loader, setLOader] = useState(false);
  const [files, setFiles] = useState(null);
  const [sizechart, setSizeChart] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Select");
  const [progress, setProgress] = React.useState(0);
  const [storeImages, setStoreImages] = useState();
  const [timeToListProduct, setTimeToListProduct] = useState({
    amount: "",
    UnitOfTime: "",
  });
  const inputRef = useRef();
  const sizechartRef = useRef();
  const productId = useParams().id;
  console.log(productId);
  console.log(files);
  console.log("sizechart", sizechart);
  useEffect(() => {
    if (files) {
      let NewData = [];
      for (let i = 0; i < files.length; i++) {
        NewData.push(files[i]);
      }
      setStoreImages(NewData);
      console.log(NewData);
    }
  }, [files]);
  const [showContent, setShowContent] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowContent(event.target.checked);
  };
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setLOader(true);
    setTimeout(() => {
      setLOader(false);
    }, [5000]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  // send files to the server //
  const handleUpload = () => {
    setFiles(files);
    setLOader(true);
    setTimeout(() => {
      setLOader(false);
    }, [5000]);
  };

  const uploadData = async (event) => {
    event.preventDefault();
    var formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("id", productId);
    formData.append("sizechart", sizechart);
    formData.append("ListThisProductForAmount", timeToListProduct.amount);
    formData.append(
      "ListThisProductForUnitOfTime",
      timeToListProduct.UnitOfTime
    );

    await axios({
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
        navigate("/home/hotelvoucherdetail/" + id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form>
      <Box
        sx={{
          maxWidth: "716px",
          height: "100%",
          // minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
          px: "20px",
          // backgroundColor: "red",
          backgroundColor: "#f3f6f9",
        }}
      >
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "10px",
            py: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: {
                xs: "18px",
                sm: "16px",
                md: "16px",
                lg: "14px",
                xl: "14px",
              },
              color: "#6B7A99",
            }}
          >
            Go Live
          </Typography>
          <Box
            component="img"
            src={InfoIcon}
            sx={{ width: "28px", height: "auto", cursor: "pointer" }}
          />
        </Box>
        {/* <Box sx={{ width: "90%" }}>
          <FormControlLabel
            sx={CommonTextStyle}
            control={
              <Checkbox
                checked={showContent}
                onChange={handleCheckboxChange}
                name="showContent"
                color="primary"
              />
            }
            label=" Installation & Demo"
          />
        </Box> */}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: "20px",
            width: "90%",
          }}
        >
          {" "}
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: 12,
              color: "#6B7A99",
              p: "2%",
            }}
          >
            Upload Image & Video
          </Typography>
          <img
            src={help}
            style={{
              cursor: "pointer",
            }}
          />
        </Box>
        <Box
          sx={{
            border: "2px dashed #445FD2",
            background: "#fff",
            width: "80%",
            maxWidth: "670px",
            p: "4%",
            mx: "auto",
            position: "relative",
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Box
            sx={{
              display: "grid",
              width: "60%",
              mx: " auto",
            }}
          >
            <Box
              sx={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                tetxAlign: "center",
              }}
            >
              <Box
                component="img"
                src={UploadtoCloud}
                sx={{
                  position: "absolute",
                  left: "5%",
                  textalign: "center",
                }}
              />
              <Typography
                onClick={() => inputRef.current.click()}
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
                  textalign: "center",
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
                Supported format : JPEG, PNG, GIF, MP4, PDF
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", mt: "1%" }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: {
                  xl: "10px",
                  lg: "10px",
                  md: "10px",
                  sm: "8px",
                  xs: "8px",
                },
                color: "#445FD2",
              }}
            >
              Mandatory Photos : Front View, Back View, Close Fabric View, Model
              Wearing View , Size Chart & Privacy Policy
            </Typography>
          </Box>
          <input
            type="file"
            multiple
            onChange={(event) => setFiles(event.target.files)}
            hidden
            accept=".png,.pdf,.mp4,.jpeg,.gif"
            ref={inputRef}
          />
        </Box>
        {files ? (
          <Box
            sx={{
              width: "90%",
              my: "2%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "10px",
                color: "#6B7A99",
              }}
            >
              Uploaded
            </Typography>

            {Array?.from(files)?.map((file, idx) => (
              <Box
                sx={{
                  background: "#fff",
                  border: "1px solid green",
                  borderRadius: "9px",
                  height: "42px",
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: "10px",
                  px: "8px",
                }}
              >
                <Typography
                  key={idx}
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "10px",
                    color: "#6B7A99",
                  }}
                >
                  {file?.name}
                </Typography>
                <Box
                  component="img"
                  src={DeleteIcon}
                  sx={{
                    height: "20px",
                    width: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const newFiles = Array.from(files);
                    newFiles.splice(idx, 1);
                    setFiles(newFiles);
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          " "
        )}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: "20px",
            width: "90%",
          }}
        >
          {" "}
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: 12,
              color: "#6B7A99",
              p: "2%",
            }}
          >
            Upload SizeChart
          </Typography>
          <img src={help} />
        </Box>
        <Box
          sx={{
            border: "2px dashed #445FD2",
            background: "#fff",
            width: "80%",
            maxWidth: "670px",
            p: "4%",
            mx: "auto",
            position: "relative",
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Box
            sx={{
              display: "grid",
              width: "60%",
              mx: " auto",
            }}
          >
            <Box
              sx={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                tetxAlign: "center",
              }}
            >
              <Box
                component="img"
                src={UploadtoCloud}
                sx={{
                  position: "absolute",
                  left: "5%",
                  textalign: "center",
                }}
              />
              <Typography
                onClick={() => sizechartRef?.current?.click()}
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
                  textalign: "center",
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
                Supported format : JPEG, PNG, GIF, MP4, PDF
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", mt: "1%" }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: {
                  xl: "10px",
                  lg: "10px",
                  md: "10px",
                  sm: "8px",
                  xs: "8px",
                },
                color: "#445FD2",
              }}
            >
              Mandatory Photos : Front View, Back View, Close Fabric View, Model
              Wearing View , Size Chart & Privacy Policy
            </Typography>
          </Box>
          <input
            type="file"
            // multiple
            onChange={(event) => setSizeChart(event.target.files[0])}
            hidden
            accept=".png,.pdf,.mp4,.jpeg,.gif"
            ref={sizechartRef}
          />
        </Box>
        {sizechart ? (
          <Box
            sx={{
              width: "90%",
              my: "2%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "10px",
                color: "#6B7A99",
              }}
            >
              Uploaded
            </Typography>
            <Box
              sx={{
                background: "#fff",
                border: "1px solid green",
                borderRadius: "9px",
                height: "42px",
                width: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                my: "10px",
                px: "8px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "10px",
                  color: "#6B7A99",
                }}
              >
                {sizechart?.name}
              </Typography>
              <Box
                component="img"
                src={DeleteIcon}
                sx={{
                  height: "20px",
                  width: "20px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setFiles(null);
                }}
              />
            </Box>
          </Box>
        ) : (
          " "
        )} */}

        {loader ? (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              backgroundColor: "transparent",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#445FD2",
              },
            }}
          />
        ) : null}

        <Box sx={{ width: "90%", mx: "auto", mt: 2 }}>
          <Typography sx={Text}>
            {" "}
            List this product for number of days ( maximum 365 days )
          </Typography>
          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
            }}
          >
            <TextField
              id="standard-basic"
              variant="standard"
              placeholder="List this product for number of days"
              onChange={(e) => {
                setTimeToListProduct({
                  ...timeToListProduct,
                  amount: e.target.value,
                });
              }}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              sx={{
                width: "80%",
                height: "100%",
                background: "#FFFFFF",
                borderRadius: "10px 0px 0px 10px",
              }}
            />

            <Select
              sx={GW}
              defaultValue={"Year"}
              // {...register("ListPeriod")}
              onChange={(e) => {
                setTimeToListProduct({
                  ...timeToListProduct,
                  UnitOfTime: e.target.value,
                });
              }}
            >
              <MenuItem sx={MenuItems} value="Year">
                Year
              </MenuItem>
              <MenuItem sx={MenuItems} value="Month">
                Month
              </MenuItem>
              <MenuItem sx={MenuItems} value="Days">
                Days
              </MenuItem>
            </Select>
            {/* <Typography sx={ErrorStyle}>{errors["List"]?.message}</Typography> */}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            mt: 10,
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
                onClick={uploadData}
              >
                Next
              </Button>
            </Box>
          </BottomNavigation>
        </Box>
      </Box>
    </form>
  );
}
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

const MenuItemTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#6B7A99",
};

const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "21px",
  color: "#6B7A99",
};
// import {
//   Box,
//   Card,
//   Grid,
//   Typography,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   InputBase,
//   IconButton,
//   Button,
// } from "@mui/material";
// import { Delete } from "@material-ui/icons";
// import { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import UploadtoCloud from "../../../../assets/UploadtoCloud.svg";
// import RadioIcon from "@mui/icons-material/Radio";
// import FlatwareIcon from "@mui/icons-material/Flatware";
// import ApartmentIcon from "@mui/icons-material/Apartment";
// import IcecreamIcon from "@mui/icons-material/Icecream";
// import LunchDiningIcon from "@mui/icons-material/LunchDining";
// import LiquorIcon from "@mui/icons-material/Liquor";
// import LocalCafeIcon from "@mui/icons-material/LocalCafe";
// import FastfoodIcon from "@mui/icons-material/Fastfood";
// import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
// import IronIcon from "@mui/icons-material/Iron";
// import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
// import BxiLogo from "../../../../assets/BXI_LOGO.png";
// import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
// import React, { useRef } from "react";
// import * as htmlToImage from "html-to-image";

// import { EditorState, convertToRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// // import draftToHtml from "draftjs-to-html";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@material-ui/core";

// const VoucherCard = () => {
//   const myRefFront = useRef(null);
//   const myRefBack = useRef(null);
//   const [dataUrlFront, setDataUrlFront] = useState("");
//   const [dataUrlBack, setDataUrlBack] = useState("");
//   const [files, setFiles] = useState([]);
//   const [color, setColor] = useState("");
//   const [activeColor, setActiveColor] = useState("");
//   const [activeAction, setActiveAction] = useState("");
//   const [category, setCategory] = useState("");
//   const [value, setValue] = useState("");
//   const [error, setError] = useState(false);
//   const [helperText, setHelperText] = useState("Choose wisely");

//   const [open, setOpen] = useState(false);
//   const [hoveredText, setHoveredText] = useState("");
//   // Left Card
//   const [offerValue, setOfferValue] = useState("$1,00,000");
//   const [validity, setValidity] = useState("4 months");
//   const [redemptionType, setRedemptionType] = useState("online");
//   const [cardName, setCardName] = useState("Gift Card");
//   const [productName, setProductName] = useState("Product name");
//   const [productDescription, setProductDescription] = useState(
//     "Lorem ipsum dolor sit amet consectetur."
//   );
//   const [adviceText, setAdviceText] = useState(
//     "Spend it on something you love!"
//   );
//   // Right Card
//   const [inclusionPoint1, setInclusionPoint1] = useState(
//     "Lorem ipsum dolor sit amet consectetur."
//   );
//   const [inclusionPoint2, setInclusionPoint2] = useState(
//     "Nibh elit nibh neque gravida sed lorem nisi lorem ipsum."
//   );
//   const [inclusionPoint3, setInclusionPoint3] = useState(
//     "Auctor neque eu vulputate gravida ultrices ipsum lectus massa aliquet."
//   );
//   const [inclusionPoint4, setInclusionPoint4] = useState(
//     "hello Lorem ipsum dolor sit amet consectetur."
//   );

//   const [exclusionPoint1, setExclusionPoint1] = useState(
//     "Lorem one ipsum dolor sit amet consectetur."
//   );
//   const [exclusionPoint2, setExclusionPoint2] = useState(
//     "Nibh elit two nibh neque gravida sed lorem nisi lorem ipsum."
//   );
//   const [exclusionPoint3, setExclusionPoint3] = useState(
//     "Auctor neque three eu vulputate gravida ultrices ipsum lectus massa aliquet."
//   );
//   const [webUrl, setWebUrl] = useState("www.bxiworld.com");

//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );
//   const handleOpen = (event) => {
//     const text = event.target.innerText;
//     setHoveredText(text);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = () => {
//     // const editedText = draftToHtml(
//     //   convertToRaw(editorState.getCurrentContent())
//     // );
//     const contentState = editorState.getCurrentContent();
//     const editedText = convertToRaw(contentState);

//     // Left card value setting
//     setOfferValue(
//       hoveredText === `Value ${offerValue}`
//         ? editedText.blocks[0].text
//         : offerValue
//     );
//     setValidity(
//       hoveredText === `Validity : ${validity}`
//         ? editedText.blocks[0].text
//         : validity
//     );
//     setRedemptionType(
//       hoveredText === `Redemption Type : ${redemptionType}`
//         ? editedText.blocks[0].text
//         : redemptionType
//     );
//     setCardName(
//       hoveredText === cardName ? editedText.blocks[0].text : cardName
//     );
//     setProductName(
//       hoveredText === productName ? editedText.blocks[0].text : productName
//     );
//     setProductDescription(
//       hoveredText === productDescription
//         ? editedText.blocks[0].text
//         : productDescription
//     );
//     setAdviceText(
//       hoveredText === adviceText ? editedText.blocks[0].text : adviceText
//     );
//     // Right card value setting
//     setInclusionPoint1(
//       hoveredText === inclusionPoint1
//         ? editedText.blocks[0].text
//         : inclusionPoint1
//     );
//     setInclusionPoint2(
//       hoveredText === inclusionPoint2
//         ? editedText.blocks[0].text
//         : inclusionPoint2
//     );
//     setInclusionPoint3(
//       hoveredText === inclusionPoint3
//         ? editedText.blocks[0].text
//         : inclusionPoint3
//     );
//     setInclusionPoint4(
//       hoveredText === inclusionPoint4
//         ? editedText.blocks[0].text
//         : inclusionPoint4
//     );
//     setExclusionPoint1(
//       hoveredText === exclusionPoint1
//         ? editedText.blocks[0].text
//         : exclusionPoint1
//     );
//     setExclusionPoint2(
//       hoveredText === exclusionPoint2
//         ? editedText.blocks[0].text
//         : exclusionPoint2
//     );
//     setExclusionPoint3(
//       hoveredText === exclusionPoint3
//         ? editedText.blocks[0].text
//         : exclusionPoint3
//     );
//     setWebUrl(hoveredText === webUrl ? editedText.blocks[0].text : webUrl);

//     setOpen(false);
//   };

//   console.log(category, "---------category");
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: ".jpg, .png, .xlsx",
//     multiple: false,
//     onDrop: (acceptedFiles) => {
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         )
//       );
//     },
//   });
//   const handleRadioChange = (event) => {
//     setValue(event.target.value);
//     setHelperText(" ");
//     setError(false);
//   };

//   const colors = [
//     //LIGHT
//     "#FF00001a",
//     "#FFA5001a",
//     "#FFFF001a",
//     "#00FF001a",
//     "#00FFFF1a",
//     "#0000FF1a",
//     "#FF00FF1a",
//     "#8000801a",
//     // "#0000001a",
//     "#FFFFFF", // white

//     // MIDDLE
//     "#FF000080",
//     "#FFA50080",
//     "#FFFF0080",
//     "#00FF0080",
//     "#00FFFF80",
//     "#0000FF80",
//     "#FF00FF80",
//     "#80008080",
//     "#00000080",

//     // DARK
//     "#FF0000", // red
//     "#FFA500", // orange
//     "#FFFF00", // yellow
//     "#00FF00", // green
//     "#00FFFF", // cyan
//     "#0000FF", // blue
//     "#FF00FF", // magenta
//     "#800080", // purple
//     "#000000", // black
//   ];

//   const iconList = [
//     {
//       icon: <RadioIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "RadioIcon1",
//     },
//     {
//       icon: <IcecreamIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "IcecreamIcon1",
//     },
//     {
//       icon: <ApartmentIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "ApartmentIcon2",
//     },
//     {
//       icon: <FlatwareIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "FlatwareIcon1",
//     },
//     {
//       icon: <AirplaneTicketIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "AirplaneTicketIcon3",
//     },
//     {
//       icon: <FastfoodIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "FastfoodIcon1",
//     },
//     {
//       icon: <LocalCafeIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "LocalCafeIcon2",
//     },
//     {
//       icon: <LiquorIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "LiquorIcon3",
//     },
//     {
//       icon: <LunchDiningIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "LunchDiningIcon1",
//     },
//     {
//       icon: <LocalPizzaIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "LocalPizzaIcon1",
//     },
//     {
//       icon: <IronIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "IronIcon2",
//     },
//     {
//       icon: <RadioIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "RadioIcon2",
//     },
//     {
//       icon: <IcecreamIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "IcecreamIcon2",
//     },
//     {
//       icon: <ApartmentIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "ApartmentIcon1",
//     },
//     {
//       icon: <FlatwareIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "FlatwareIcon2",
//     },
//     {
//       icon: <AirplaneTicketIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "AirplaneTicketIcon1",
//     },
//     {
//       icon: <FastfoodIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "FastfoodIcon2",
//     },
//     {
//       icon: <LocalCafeIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "LocalCafeIcon3",
//     },
//     {
//       icon: <LiquorIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "LiquorIcon1",
//     },
//     {
//       icon: <LunchDiningIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "LunchDiningIcon2",
//     },
//     {
//       icon: <LocalPizzaIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "LocalPizzaIcon2",
//     },
//     {
//       icon: <IronIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "IronIcon1",
//     },
//     {
//       icon: <AirplaneTicketIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "AirplaneTicketIcon2",
//     },
//     {
//       icon: <FastfoodIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "FastfoodIcon3",
//     },
//     {
//       icon: <LocalCafeIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "LocalCafeIcon1",
//     },
//     {
//       icon: <LiquorIcon sx={{ fontSize: "2.5rem" }} />,
//       action: "LiquorIcon2",
//     },
//   ];
//   function chunk(array, size) {
//     const chunks = [];
//     for (let i = 0; i < array.length; i += size) {
//       chunks.push(array.slice(i, i + size));
//     }
//     return chunks;
//   }

//   const downloadCardFront = () => {
//     htmlToImage
//       .toPng(myRefFront.current)
//       .then((dataUrl) => {
//         setDataUrlFront(dataUrl);
//         const link = document.createElement("a");
//         link.download = "my-design-front.png";
//         link.href = dataUrl;
//         link.click();
//       })
//       .catch((error) => {
//         console.error("Error capturing image: ", error);
//       });
//   };
//   const downloadCardBack = () => {
//     htmlToImage
//       .toPng(myRefBack.current)
//       .then((dataUrl) => {
//         setDataUrlBack(dataUrl);
//         const link = document.createElement("a");
//         link.download = "my-design-back.png";
//         link.href = dataUrl;
//         link.click();
//       })
//       .catch((error) => {
//         console.error("Error capturing image: ", error);
//       });
//   };
//   return (
//     <>
//       <Box sx={{ padding: 8 }}>
//         <RadioGroup
//           aria-labelledby="demo-error-radios"
//           name="Template"
//           value={value}
//           onChange={handleRadioChange}
//         >
//           <FormControlLabel
//             value="template1"
//             control={<Radio sx={{ color: "#2d8ae0" }} />}
//             label={
//               <Typography sx={{ fontSize: "1.5rem", color: "#315794" }}>
//                 Template 1
//               </Typography>
//             }
//             sx={{ color: "#2d8ae0" }}
//           />
//         </RadioGroup>
//         <Grid container spacing={6}>
//           <Grid
//             item
//             xl={6}
//             lg={6}
//             md={6}
//             sm={12}
//             xs={12}
//             sx={{ position: "relative" }}
//           >
//             <Card
//               sx={{
//                 width: {
//                   xs: 353,
//                   sm: 453,
//                   md: 453,
//                   lg: 553,
//                   xl: 553,
//                 },
//                 height: 345,
//                 background: color,
//                 borderRadius: "2rem",
//                 zIndex: 0,
//               }}
//               ref={myRefFront}
//             >
//               {files[0] && (
//                 <img
//                   src={files[0]?.preview}
//                   alt="MyImage"
//                   style={{
//                     width: "38%",
//                     height: "50%",
//                     position: "absolute",
//                     top: 94,
//                     right: 76,
//                     zIndex: 1,
//                   }}
//                 />
//               )}
//               <Box>
//                 <img
//                   src={BxiLogo}
//                   alt="MyImage"
//                   style={{
//                     width: "6%",
//                     height: "8%",
//                     position: "absolute",
//                     top: 77,
//                     left: 144,
//                     zIndex: 1,
//                   }}
//                 />
//                 <Typography
//                   sx={{
//                     fontFamily: "Poppins",
//                     marginTop: "62px",
//                     marginLeft: "62px",
//                   }}
//                 >
//                   Barter Exchange Of India
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "2rem",
//                     fontWeight: "bold",
//                     marginTop: "12px",
//                     marginLeft: "41px",
//                     fontFamily: "Poppins",
//                     width: "40%",
//                   }}
//                   onMouseEnter={handleOpen}
//                 >
//                   Value {offerValue}
//                 </Typography>
//                 <Box>
//                   <Typography
//                     component="div"
//                     sx={{
//                       fontFamily: "Poppins",
//                       marginLeft: "71px",
//                       width: "25%",
//                     }}
//                     onMouseEnter={handleOpen}
//                   >
//                     Validity : {validity}
//                   </Typography>
//                   <Dialog open={open} onClose={handleClose}>
//                     <DialogTitle>Edit text: {hoveredText}</DialogTitle>
//                     <DialogContent>
//                       <Editor
//                         editorState={editorState}
//                         onEditorStateChange={setEditorState}
//                       />
//                     </DialogContent>
//                     <DialogActions>
//                       <Button onClick={handleClose}>Cancel</Button>
//                       <Button onClick={handleSubmit}>Save</Button>
//                     </DialogActions>
//                   </Dialog>
//                 </Box>
//                 <Typography
//                   sx={{
//                     fontFamily: "Poppins",
//                     marginLeft: "55px",
//                     width: "25%",
//                   }}
//                   onMouseEnter={handleOpen}
//                 >
//                   Redemption Type : {redemptionType}
//                 </Typography>
//                 <Typography
//                   variant="h1"
//                   sx={{
//                     fontFamily: "Felix Titling",
//                     fontWeight: 400,
//                     color: "#8F0000",
//                     fontSize: "3.5rem",
//                     marginTop: "19px",
//                     marginLeft: "28px",
//                     width: "40%",
//                   }}
//                   onMouseEnter={handleOpen}
//                 >
//                   {cardName}
//                 </Typography>
//                 <Box sx={{ marginTop: "14px", marginLeft: "94px" }}>
//                   <LocalDrinkIcon />
//                   <LocalDrinkIcon />
//                 </Box>
//                 <Typography
//                   sx={{
//                     fontWeight: "bold",
//                     fontFamily: "Poppins",
//                     marginLeft: "67px",
//                     fontSize: "1.2rem",
//                     width: "40%",
//                   }}
//                   onMouseEnter={handleOpen}
//                 >
//                   {productName}
//                 </Typography>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "100%",
//                     width: "40%",
//                   }}
//                 >
//                   <Typography
//                     sx={{ fontFamily: "Poppins", fontSize: "1.2rem" }}
//                     variant="body1"
//                     align="center"
//                     onMouseEnter={handleOpen}
//                   >
//                     {productDescription}
//                   </Typography>
//                 </Box>
//                 <Typography
//                   sx={{
//                     fontFamily: "Felix Titling",
//                     fontWeight: 400,
//                     color: "#1E1E1E",
//                     marginTop: "10px",
//                     marginLeft: "24px",
//                     width: "40%",
//                   }}
//                   onMouseEnter={handleOpen}
//                 >
//                   {adviceText}
//                 </Typography>
//               </Box>
//             </Card>
//           </Grid>
//           {/* {dataUrl && <img src={dataUrl} alt="downloaddImage" />} */}
//           <Grid
//             item
//             xl={6}
//             lg={6}
//             md={6}
//             sm={12}
//             xs={12}
//             sx={{ position: "relative" }}
//           >
//             <Card
//               sx={{
//                 width: {
//                   xs: 353,
//                   sm: 453,
//                   md: 453,
//                   lg: 553,
//                   xl: 553,
//                 },
//                 height: 345,
//                 background: color,
//                 borderRadius: "2rem",
//                 // filter: "blur(1px)",
//                 zIndex: 0,
//               }}
//               ref={myRefBack}
//             >
//               {files[0] && (
//                 <img
//                   src={files[0]?.preview}
//                   alt="MyImage"
//                   style={{
//                     width: "38%",
//                     height: "50%",
//                     position: "absolute",
//                     filter: "blur(3px)",
//                     top: 94,
//                     left: 300,
//                     zIndex: 1,
//                   }}
//                 />
//               )}
//               <Box>
//                 <Typography
//                   sx={{
//                     fontSize: "2rem",
//                     fontWeight: 500,
//                     color: "#494949",
//                     marginTop: "40px",
//                     marginLeft: "35px",
//                   }}
//                 >
//                   Inclusion
//                 </Typography>
//                 <Typography
//                   component="ul"
//                   sx={{
//                     position: "absolute",
//                     fontSize: "1.2rem",
//                     top: 124,
//                     left: 67,
//                     zIndex: 5,
//                   }}
//                 >
//                   <li onMouseEnter={handleOpen}>{inclusionPoint1}</li>
//                   <li onMouseEnter={handleOpen}>{inclusionPoint2}</li>
//                   <li onMouseEnter={handleOpen}>{inclusionPoint3}</li>
//                   <li onMouseEnter={handleOpen}>{inclusionPoint4}</li>
//                 </Typography>
//               </Box>
//               <Box>
//                 <Typography
//                   sx={{
//                     fontSize: "2rem",
//                     fontWeight: 500,
//                     color: "#494949",
//                     marginTop: "101px",
//                     marginLeft: "35px",
//                   }}
//                 >
//                   Exclusion
//                 </Typography>
//                 <Typography
//                   component="ul"
//                   sx={{
//                     position: "absolute",
//                     fontSize: "1.2rem",
//                     top: 257,
//                     left: 68,
//                     zIndex: 5,
//                   }}
//                 >
//                   <li onMouseEnter={handleOpen}>{exclusionPoint1}</li>
//                   <li onMouseEnter={handleOpen}>{exclusionPoint2}</li>
//                   <li onMouseEnter={handleOpen}>{exclusionPoint3}</li>
//                 </Typography>
//                 <Typography
//                   sx={{
//                     fontSize: "2rem",
//                     fontWeight: 400,
//                     color: "#000000",
//                     marginTop: "78px",
//                     marginLeft: "48px",
//                     fontFamily: "prata",
//                   }}
//                   onMouseEnter={handleOpen}
//                 >
//                   {webUrl}
//                 </Typography>
//               </Box>
//             </Card>
//           </Grid>
//         </Grid>
//         <Box sx={{ marginTop: "2rem", color: "#315794" }}>
//           {/* Added two buttons for image dowld  */}
//           <Button
//             style={{
//               backgroundColor: "#2d8ae0",
//               color: "white",
//               marginRight: "1rem",
//             }}
//             onClick={downloadCardFront}
//           >
//             Download Card Front
//           </Button>
//           <Button
//             style={{ backgroundColor: "#2d8ae0", color: "white" }}
//             onClick={downloadCardBack}
//           >
//             Download Card Back
//           </Button>
//           <Typography fontSize="20px">Upload Image</Typography>
//         </Box>
//         <Box
//           {...getRootProps({ className: "dropzone" })}
//           // sx={{
//           //   ...(image === false && {
//           //     display: "none",
//           //   }),
//           //   ...(image === true && {
//           //     display: "flex",
//           //   }),
//           // }}
//         >
//           <input {...getInputProps()} />
//           <Box
//             border={"2px dashed "}
//             sx={{
//               padding: "3rem",
//               marginTop: "1rem",
//               textAlign: "center",
//               "&:hover": { cursor: "pointer" },
//               borderColor: "#2d8ae0",
//             }}
//           >
//             <Box
//               component="img"
//               src={UploadtoCloud}
//               sx={{
//                 position: "absolute",
//                 left: "15%",
//               }}
//             />
//             <Typography
//               sx={{
//                 fontFamily: "Poppins",
//                 fontStyle: "normal",
//                 fontWeight: 400,
//                 fontSize: "10px",
//                 color: "#6B7A99",
//                 cursor: "pointer",
//                 "&:hover": {
//                   color: "blue",
//                 },
//               }}
//             >
//               Drag & Drop upload or browse to choose a file
//             </Typography>
//             <Typography
//               sx={{
//                 fontFamily: "Mulish",
//                 fontStyle: "normal",
//                 fontWeight: 400,
//                 fontSize: "8px",
//                 color: "#676767",
//                 textAlign: "center",
//               }}
//             >
//               Supported format : JPEG, PNG, XLSX
//             </Typography>
//           </Box>
//         </Box>
//         <Box
//           sx={{ marginTop: "2rem", marginBottom: "1.5rem", color: "#315794" }}
//         >
//           <Typography fontSize="18px">Uploaded file</Typography>
//         </Box>
//         <Box sx={{ marginBottom: "2rem" }}>
//           <InputBase
//             placeholder={files[0]?.path}
//             // value={search}
//             // onChange={(e) => setSearch(e.target.value)}
//             type="text"
//             sx={{
//               border: "1px solid #2d8ae0",
//               borderRadius: "4px",
//               padding: "0.5rem",
//               width: "70%",
//             }}
//             inputProps={{
//               style: {
//                 color: "#2d8ae0",
//               },
//             }}
//             endAdornment={
//               <IconButton
//                 aria-label="clear input"
//                 onClick={() => {
//                   setFiles([]);
//                 }}
//                 style={{ color: "#2d8ae0" }}
//               >
//                 <Delete />
//               </IconButton>
//             }
//           />
//         </Box>
//         {/* <Box>
//           <InputBase
//             placeholder={files[0]?.path}
//             // value={search}
//             // onChange={(e) => setSearch(e.target.value)}
//             type="text"
//             sx={{
//               border: "1px solid #2d8ae0",
//               borderRadius: "4px",
//               padding: "0.5rem",
//               width: "70%",
//             }}
//             inputProps={{
//               style: {
//                 color: "#2d8ae0",
//               },
//             }}
//             endAdornment={
//               <IconButton
//                 aria-label="clear input"
//                 onClick={() => {
//                   setFiles([]);
//                 }}
//                 style={{ color: "#2d8ae0" }}
//               >
//                 <Delete />
//               </IconButton>
//             }
//           />
//         </Box> */}
//         <Box
//           sx={{ marginTop: "2rem", marginBottom: "1.5rem", color: "#315794" }}
//         >
//           <Typography fontSize="18px">Choose Background color</Typography>
//         </Box>
//         <Box>
//           <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//             {chunk(colors, 9).map((rowColors, index) => (
//               <Box key={index} sx={{ display: "flex" }}>
//                 {rowColors.map((color) => (
//                   <Box
//                     onClick={() => {
//                       setActiveColor(color);
//                       setColor(color);
//                     }}
//                     className={activeColor === color ? "active" : ""}
//                     key={color}
//                     sx={{
//                       width: "4rem",
//                       height: "4rem",
//                       backgroundColor: color,
//                       borderRadius: "2px",
//                       margin: "0.5rem",
//                       cursor: "pointer",
//                       "&:hover": {
//                         border: "1px solid blue",
//                       },
//                       "&.active": {
//                         border: "1.5px solid blue",
//                       },
//                     }}
//                   />
//                 ))}
//               </Box>
//             ))}
//           </Box>
//         </Box>
//         <Box
//           sx={{ marginTop: "2rem", marginBottom: "1.5rem", color: "#315794" }}
//         >
//           <Typography fontSize="20px">Choose Element</Typography>
//         </Box>
//         <Typography fontSize="15px">{category}</Typography>

//         <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//           {iconList.slice(0, 13).map(({ icon, action }) => (
//             <Box
//               key={action}
//               onClick={() => {
//                 setActiveAction(action);
//                 setCategory(action);
//               }}
//               className={activeAction === action ? "active" : ""}
//               sx={{
//                 width: "4rem",
//                 height: "4rem",
//                 border: "1px solid black",
//                 borderRadius: "2px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 margin: "0.5rem",
//                 cursor: "pointer",
//                 "&:hover": {
//                   border: "1px solid blue",
//                 },
//                 "&.active": {
//                   border: "1.5px solid blue",
//                 },
//               }}
//             >
//               {icon}
//             </Box>
//           ))}
//         </Box>
//         <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//           {iconList.slice(13).map(({ icon, action }) => (
//             <Box
//               key={action}
//               onClick={() => {
//                 setActiveAction(action);
//                 setCategory(action);
//               }}
//               className={activeAction === action ? "active" : ""}
//               sx={{
//                 width: "4rem",
//                 height: "4rem",
//                 border: "1px solid black",
//                 borderRadius: "2px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 margin: "0.5rem",
//                 cursor: "pointer",
//                 "&:hover": {
//                   border: "1px solid blue",
//                 },
//                 "&.active": {
//                   border: "1.5px solid blue",
//                 },
//               }}
//             >
//               {icon}
//             </Box>
//           ))}
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default VoucherCard;
const MenuItems = {
  fontSize: "12px",
  color: "#6B7A99",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
};
const GW = {
  width: "20%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  background: "#FFFFFF",
  height: "100%",
  color: "#6B7A99",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  borderRadius: "0px 10px 10px 0px",
};
