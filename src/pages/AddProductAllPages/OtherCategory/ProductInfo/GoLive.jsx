import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  BottomNavigation,
} from "@mui/material";
import { useState, useRef } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import help from "../../../../assets/Help.svg";
import UploadtoCloud from "../../../../assets/UploadtoCloud.svg";

export default function GoLive() {
  const [loader, setLOader] = useState(false);
  const [files, setFiles] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Select");
  const [progress, setProgress] = React.useState(0);
  const inputRef = useRef();

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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 1;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box
      sx={{
        maxWidth: "716px",
        height: "100%",
        minHeight: "500px",
        boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
        px: "20px",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: { xl: "20px", lg: "20px", md: "20px", sm: "10px", xs: "2px" },
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
          width: { xl: "80%", lg: "80%", md: "80%", sm: "90%", xs: "90%" },
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
              }}
            />
            <Typography
              onClick={() => inputRef.current.click()}
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: {
                  xl: "10px",
                  lg: "10px",
                  md: "10px",
                  sm: "7px",
                  xs: "7px",
                },
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

      <Box
        sx={{
          width: "100%",
          mx: "auto",
          height: "100%",
          // bgcolor: "transparent",
          mt: 15,
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
              // onClick={AddProduct}
            >
              Next
            </Button>
          </Box>
        </BottomNavigation>
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
