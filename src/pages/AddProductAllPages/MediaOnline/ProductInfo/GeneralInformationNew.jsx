import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import {
  CircularProgress,
  Paper,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Select, MenuItem, BottomNavigation, Button } from "@mui/material";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import { usePostProductQuery } from "./ProductHooksQuery";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserMale from "../../../../assets/Images/CommonImages/UserMale.svg";
import axios from "axios";
import { useEffect } from "react";
import ProductAddTheme from "../../../../components/GlobalStyle/MaterialUiGlobalStyle";

import CloseIcon from "@mui/icons-material/Close";

export default function GeneralInformationNew() {
  const [categoryData, setCategoryData] = useState([]);
  const [gender, SetGender] = useState("Male");
  const [storeSubCatId, setStoreSubCatId] = useState("");

  const getAllCetegory = async () => {
    await axios
      .get("/subcategory/subcategory")
      .then((res) => {
        console.log("res", res.data);
        setCategoryData(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllCetegory();
  }, []);
  return (
    <Paper
      elevation={0}
      sx={{
        // width: {
        //   xl: "100%",
        //   lg: "100%",
        //   md: "100%",
        //   sm: "95%",
        //   xs: "95%",
        // },
        width: "100%",
        height: "60vh",
        overflowY: "scroll",
        background: "#f3f6f9",
        display: "flex",
        justifyContent: "center",
        gap: "5px",
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          width: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "raw",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: {
                xl: "18px",
                lg: "18px",
                md: "16px",
                sm: "14px",
                xs: "14px",
              },
              color: "#6B7A99",
              display: "flex",
              flexDirection: "raw",
              justifyContent: "center",
              alignItems: "center",
              gap: "2px",
            }}
          >
            General Information
            <Box
              component="img"
              src={InfoIcon}
              sx={{ width: "28px", height: "auto", cursor: "pointer" }}
            />
          </Typography>
          <Box>
            <CloseIcon
              sx={{ color: "#B7C1D2", fontSize: "18px", fontWeight: 600 }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            flexDirection: "column",
            width: "100%",
            mx: "auto",
            display: "flex",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <Typography sx={CommonTextStyle}>Gender</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              gap: "10px",
              height: "100%",
            }}
          >
            {categoryData?.map((item) => {
              return (
                <Box
                  sx={{
                    ...GenderBoxStyle,
                    border:
                      item._id === storeSubCatId
                        ? "1px solid #445fd2"
                        : "1px solid #D9D9D9",

                    cursor: "pointer",
                  }}
                  onClick={() => {
                    SetGender("Male");
                    setStoreSubCatId(item._id);
                  }}
                >
                  <Typography
                    sx={{
                      ...CommonTextStyle,
                      color: item._id === storeSubCatId ? "#445fd2" : "#6B7A99",
                      fontWeight: item._id === storeSubCatId ? "600" : "500",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.SubcategoryName}
                  </Typography>
                  <Box component="img" src={UserMale} sx={GenderIconStyle} />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            background: "transparent",
          }}
        >
          <Typography sx={CommonTextStyle}>Subcategory</Typography>
          <Select
            sx={{
              background: "#fff",
              border: "none",
              color: "rgba(173, 184, 204, 0.59)",
              borderRadius: "9px",
              height: "48px",
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
              "&.MuiSelect-select:focus": {
                background: "none",
              },
              "&.MuiSelect-select": {
                background: "none",
              },
              ".MuiSvgIcon-root ": {
                fill: "#ADB8CC !important",
                fontSize: "2rem",
              },
            }}
          >
            <MenuItem sx={MenuItemTextStyle}>Option 1</MenuItem>
            <MenuItem sx={MenuItemTextStyle}>Option 2</MenuItem>
            <MenuItem sx={MenuItemTextStyle}>Option 3</MenuItem>
          </Select>
          <Typography sx={ErrorStyle}></Typography>
        </Box>
        <Box>
          <Typography sx={CommonTextStyle}>Product Name</Typography>
          <ThemeProvider theme={ProductAddTheme}>
            <TextField
              focused
              placeholder="Lorem Ipsum ( 8 keywords max ) "
              multiline
              variant="standard"
              InputProps={InputPropsStyle}
              sx={TextFieldStyle}
            />
          </ThemeProvider>
          <Typography sx={ErrorStyle}></Typography>
        </Box>
        <Box>
          <Typography sx={CommonTextStyle}> Product Subtitle </Typography>
          <TextField
            focused
            placeholder="Lorem Ipsum ( 24 keywords max ) "
            multiline
            variant="standard"
            sx={TextFieldStyle}
            InputProps={InputPropsStyle}
          />
          <Typography sx={ErrorStyle}></Typography>
        </Box>
        <Box>
          <Typography sx={CommonTextStyle}>Product Description</Typography>
          <TextField
            focused
            placeholder="Lorem Ipsum ( 50 keywords max ) "
            multiline
            variant="standard"
            sx={{ ...TextFieldStyle, height: "100%" }}
            minRows={3}
            InputProps={InputPropsStyle}
          />
          <Typography sx={ErrorStyle}></Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            pt: {
              xl: "1%",
              lg: "1%",
              md: "1%",
              sm: "3%",
              xs: "3%",
            },
          }}
        >
          <Typography
            sx={{
              marginRight: "auto",
              p: "2%",
              fontFamily: "Poppins",
              fontStyle: "normal",
              color: "#6B7A99",
              fontSize: {
                xl: "14px",
                lg: "14px",
                md: "14px",
                sm: "10px",
                xs: "10px",
              },
              display: "flex",
              gap: "10px",
            }}
          >
            <Box
              component="img"
              sx={{
                width: {
                  xl: "23px",
                  lg: "23px",
                  md: "23px",
                  sm: "20px",
                  xs: "20px",
                },
                height: {
                  xl: "23px",
                  lg: "23px",
                  md: "23px",
                  sm: "20px",
                  xs: "20px",
                },
              }}
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
              <Typography sx={btntext}>cancel</Typography>
            </Button>
            <Button
              type="submit"
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
              {/* {isLoading ? <CircularProgress /> : "Next"} */}
              <Typography sx={{ ...btntext, color: "#fff" }}>Next</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

const ErrorStyle = {
  color: "red",
};

const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  color: " #6B7A99",
  paddingBottom: "8px",
};

const MenuItemTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: {
    xl: "14px",
    lg: "14px",
    md: "14px",
    sm: "10px",
    xs: "10px",
  },
  color: "#6B7A99",
};

const TextFieldStyle = {
  width: "100%",
  height: "48px",
  background: "#fff",
  borderRadius: "9px",
  border: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#6B7A99",
  overflow: "auto",
  paddingLeft: "0px",
  "&:focus": {
    outline: "none",
  },
};

const InputPropsStyle = {
  disableUnderline: true,
  style: {
    background: "#fff",
    fontFamily: "Poppins",
    color: "#6B7A99",
    borderRadius: "9px",
    height: "100%",
    paddingLeft: "10px",
    fontSize: "14px",
  },
};

const btntext = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xl: "14px",
    lg: "14px",
    md: "14px",
    sm: "14px",
    xs: "10px",
  },
  color: "#636161",
};

const GenderIconStyle = {
  width: "30px",
  height: "30px",
};

const GenderBoxStyle = {
  // border: "1px solid #445fd2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  heigth: "70px",
  width: "85px",
  padding: "10px",
  gap: "5px",
  borderRadius: "10px",
  background: "#fff",
};
