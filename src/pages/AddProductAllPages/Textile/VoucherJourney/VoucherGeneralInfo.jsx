import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InfoIcon from "../../../../assets/Images/CommonImages/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import { TextField } from "@mui/material";
import { Select, MenuItem, BottomNavigation } from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function VoucherGeneralInfo() {
  const [Button1, setButton1] = React.useState(false);
  const [Button2, setButton2] = React.useState(false);

  const [selectedOption, setSelectedOption] = useState("Select");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const navigate = useNavigate();
  return (
    <Box sx={BoxStyle}>
      <Box
        sx={{
          backgroundColor: "#f3f6f9",
          width: "100%",
          mx: "auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
          px: "25px",
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
          General Information
        </Typography>
        <Box
          component="img"
          src={InfoIcon}
          sx={{ width: "28px", height: "auto", cursor: "pointer" }}
        />
      </Box>

      {/* content */}
      <Box
        sx={{
          display: "grid",
          gap: "30px",
          px: "35px",
          py: "15px",
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "120x",
              color: "#6B7A99",
            }}
          >
            Subcategory
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
              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
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
        <TextField
          focused
          label=" Product Name"
          placeholder="Lorem Ipsum ( 8 keywords max ) "
          multiline
          variant="standard"
          sx={{
            width: "100%",
          }}
          InputLabelProps={{
            style: {
              color: "#6B7A99",
              fontSize: "14px",
              fontFamily: "Poppins",
            },
          }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins",
                  padding: "15px",
                }}
              ></Typography>
            ),
            style: {
              background: "#fff",
              fontFamily: "Poppins",
              color: "#6B7A99",
              borderRadius: "9px",
              paddingLeft: "20px",
            },
          }}
        />
        <TextField
          focused
          label="  Product Subtitle "
          placeholder="Lorem Ipsum ( 8 keywords max ) "
          multiline
          variant="standard"
          sx={{
            width: "100%",
          }}
          InputLabelProps={{
            style: {
              color: "#6B7A99",
              fontSize: "14px",
              fontFamily: "Poppins",
            },
          }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins",
                  padding: "15px",
                }}
              ></Typography>
            ),
            style: {
              background: "#fff",
              fontFamily: "Poppins",
              color: "#6B7A99",
              borderRadius: "9px",
              paddingLeft: "20px",
            },
          }}
        />
        <TextField
          focused
          label=" Product Description "
          placeholder="Lorem Ipsum ( 8 keywords max ) "
          multiline
          variant="standard"
          sx={{
            width: "100%",
          }}
          InputLabelProps={{
            style: {
              color: "#6B7A99",
              fontSize: "14px",
              fontFamily: "Poppins",
            },
          }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Poppins",
                  padding: "15px",
                }}
              ></Typography>
            ),
            style: {
              background: "#fff",
              fontFamily: "Poppins",
              color: "#6B7A99",
              borderRadius: "9px",
              paddingLeft: "20px",
            },
          }}
        />
      </Box>

      {/* footer */}

      <Box>
        <BottomNavigation
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "#F3F6F9",
            px: "10px",
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
              value={Button1}
              sx={{
                width: "100%",
                height: "32px",
                borderRadius: "10px",
                background: "#fff",
                color: "#636161",
                "&:hover": {
                  background: "red",
                  color: "#fff",
                },
              }}
              variant="contained"
            >
              cancel
            </Button>
            <Button
              value={Button2}
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
              onClick={() => {
                navigate("/home/textile/voucherinfo");
              }}
            >
              Next
            </Button>
          </Box>
        </BottomNavigation>
      </Box>
    </Box>
  );
}

const BoxStyle = {
  width: "auto",
  height: "auto",
  overflowY: "scroll",
  boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
  bgcolor: "#f3f6f9",
  mx: "auto",
  // p: "10px",
  maxWidth: "716px",
  minWidth: "300px",
  overflowX: "hidden",
};

const MenuItemTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#6B7A99",
};
