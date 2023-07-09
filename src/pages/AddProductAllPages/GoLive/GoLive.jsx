import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  Input,
  TextField,
} from "@mui/material";
import { useState, useRef } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import InfoIcon from "../../../assets/InfoIcon.svg";
import help from "../../../assets/Help.svg";
import UploadtoCloud from "../../../assets/UploadtoCloud.svg";
import RedoIcon from "../../../assets/RedoIcon.svg";
export default function GoLive() {
  const [loader, setLOader] = useState(false);
  const [files, setFiles] = useState(null);
  const inputRef = useRef();
  const [Button1, setButton1] = useState(false);
  const [Button2, setButton2] = useState(false);

  const [selectedOption, setSelectedOption] = useState("Select");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setLOader(true);
    setTimeout(() => {
      setLOader(false);
    }, [2000]);
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
    }, [2000]);
  };

  return (
    <Box
      sx={{
        maxWidth: "716px",
        height: "auto",
        maxHeight: "720px",
        boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
        px: "20px",
      }}
    >
      <Box
        sx={{
          px: "25px",
          py: "15px",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            gap: "20px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: 18,
            color: " #6B7A99",
          }}
        >
          Go Live <img src={InfoIcon} />
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: "25px",
        }}
      >
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
      </Box>
      <Box
        onClick={() => inputRef.current.click()}
        sx={{
          border: "2px dashed #445FD2",
          width: "auto",
          maxWidth: "670px",
          p: "1%",
          mx: "auto",
          cursor: "pointer",
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
              fontSize: "10px",
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
        <div>
          <ol>
            {Array?.from(files)?.map((file, idx) => (
              <li key={idx}>{file?.name}</li>
            ))}
          </ol>
          <div>
            <button onClick={() => setFiles(0)}>Cancel</button>
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      ) : (
        " "
      )}
      {loader ? <LinearProgress /> : null}

      <Box>
        <Typography sx={Text}>
          List this product for number of days ( maximum 365 days )
        </Typography>
        <Select
          value={selectedOption}
          onChange={handleChange}
          sx={{
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
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: 0,
              },
          }}
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
    </Box>
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
