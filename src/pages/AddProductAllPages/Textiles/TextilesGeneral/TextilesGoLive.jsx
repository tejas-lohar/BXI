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
import TextileVoucherGoLive from "./TextileVoucherGoLive";

export default function TextilesGoLive() {
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
    UnitOfTime: "Days",
  });
  const [invalidFile, setInvalidFile] = useState(false);
  const [invalidFileFormat, setInvalidFileFormat] = useState(false);
  const [invalidFileSize, setInvalidFileSize] = useState(false);

  const inputRef = useRef();
  const sizechartRef = useRef();
  const productId = useParams().id;
  useEffect(() => {
    if (files) {
      let NewData = [];
      for (let i = 0; i < files.length; i++) {
        NewData.push(files[i]);

        if (
          files[i].type === "image/png" ||
          files[i].type === "image/jpg" ||
          files[i].type === "image/jpeg" ||
          files[i].type === "image/gif" ||
          files[i].type === "video/mp4" ||
          files[i].type === "application/pdf"
        ) {
          setInvalidFileFormat(false);
        } else {
          setInvalidFileFormat(true);
        }

        const fileSizeInBytes = files[i].size;
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert bytes to megabytes
        if (fileSizeInMB > 5) {
          setInvalidFileSize(true);
        } else {
          setInvalidFileSize(false);
        }
      }

      setStoreImages(NewData);
      console.log(NewData);
      if (NewData.length === 0) {
        setInvalidFile(true);
      } else {
        setInvalidFile(false);
      }
    } else {
      setInvalidFile(true);
    }
  }, [files]);
  const [showContent, setShowContent] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);

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
    setNextClicked(true);
    if (
      invalidFile ||
      invalidFileFormat ||
      invalidFileSize ||
      !files ||
      !timeToListProduct.amount ||
      timeToListProduct.amount === undefined ||
      timeToListProduct.amount === ""
    ) {
      return;
    }
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
        navigate("/home/textiles/textilesgolive/" + id);
      })
      .catch((err) => console.log(err));
  };
  return (
    <form>
      <Box
        sx={{
          maxWidth: "716px",
          height: "100%",
          minHeight: "500px",
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
        <Box sx={{ overflowY: "auto", maxHeight: "470px" }}>
          <TextileVoucherGoLive />
        </Box>

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
            Upload Image & Video
          </Typography>
          <img src={help} />
        </Box> */}
        {/* <Box
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
        </Box> */}

        {/* {(files?.length === 0 || !files) && nextClicked ? (
          <Typography sx={invalidFileStyle}>This field is required</Typography>
        ) : (
          ""
        )}

        {invalidFile && nextClicked && files && files?.length !== 0 ? (
          <Typography sx={invalidFileStyle}>Invalid file</Typography>
        ) : (
          ""
        )} */}

        {/* {invalidFileFormat && nextClicked && files && files?.length !== 0 ? (
          <Typography sx={invalidFileStyle}>
            Invalid File Format (only JPEG, PNG, GIF, MP4, PDF file format are
            Supported)
          </Typography>
        ) : (
          ""
        )} */}

        {/* {invalidFileSize && nextClicked && files && files?.length !== 0 ? (
          <Typography sx={invalidFileStyle}>
            Invalid File Size (Maximum allowed file size is 5 MB)
          </Typography>
        ) : (
          ""
        )} */}

        {/* {files ? (
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
        )} */}

        {/* {loader ? (
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
        ) : null} */}

        {/* <Box sx={{ width: "90%", mx: "auto", mt: 2 }}>
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
              defaultValue={"Days"}
              // {...register("ListPeriod")}
              onChange={(e) => {
                setTimeToListProduct({
                  ...timeToListProduct,
                  UnitOfTime: e.target.value,
                });
              }}
            >
              <MenuItem sx={MenuItems} value="Month">
                Month
              </MenuItem>
              <MenuItem sx={MenuItems} value="Days">
                Days
              </MenuItem>
            </Select>
            {nextClicked &&
            (!timeToListProduct.amount ||
              timeToListProduct.amount === undefined ||
              timeToListProduct.amount === "") ? (
              <Typography sx={invalidFileStyle}>
                This field is required
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </Box> */}
        {/* LAST BUTTON  */}
        {/* <Box
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
        </Box> */}
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

const requiredFieldStyle = {
  fontFamily: "Poppins",
  color: "red",
  marginRight: "81%",
  marginTop: "1%",
  marginLeft: "6%",
  width: "15%",
};

const invalidFileStyle = {
  fontFamily: "Poppins",
  color: "red",
  width: "88%",
  marginTop: "1%",
};

const invalidFileFormatStyle = {
  fontFamily: "Poppins",
  color: "red",
  marginRight: "81%",
  marginTop: "1%",
  marginLeft: "5%",
};
