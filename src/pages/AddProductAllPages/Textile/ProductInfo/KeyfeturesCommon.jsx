import React, { useState, useEffect } from "react";
import {
  Input,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";

export default function KeyfeturesCommon(props) {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const handleItemAdd = (name, description) => {
    if (description === "") {
      return props.Ptoast.error(
        "Please fill in the proper features and description",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else if (name === "") {
      return props.Ptoast.error("Please add key feature", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (props?.AddedFeaturesArr.some((res) => res.name === name)) {
      setName("");
      return props.Ptoast.error("Please fill the unique key feature", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (description?.length > 75) {
      return props.Ptoast.error(
        "Feature description should be less than 75 characters",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      const newItem = { name, description };
      if (name?.trim() !== "" || description?.trim() !== "") {
        props.PsetItems([...props?.AddedFeaturesArr, newItem]);
      }
    }
    setName("");
    setDescription("");
    // setName();
  };
  return (
    <Box
      sx={{
        py: "20px",
      }}
    >
      <Box
        sx={{
          fontFamily: "Poppins",
          color: "#6B7A99",
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
          Select the best features that describes your brand/product
        </Typography>
        <Typography sx={{ fontSize: "12px" }}>
          {" "}
          (the more features you write the more you are discovered){" "}
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography
            sx={{
              ...CommonTextStyle,
              mt: 2,
              fontWeight: 500,
              fontSize: "12px",
            }}
          >
            Describe your Product Best ( Feature’s / Specification's ) minimum 5
          </Typography>
          <Select
            value={name}
            onChange={(e) => setName(e.target.value)}
            // {...register("additionalFeatures.selectbestfeature")}
            sx={{
              width: "100%",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
              background: "#fff",
              height: "100%",
              borderRadius: "10px",
              color: "#ADB8CC",
              fontSize: "12px",
            }}
            // key={traits}
            // onClick={(e) =>
            //   setSingleTrait(
            //     { ...singleTrait },
            //     (e.target.key = traits),
            //     (e.target.value = name)
            //   )
            // }
          >
            {props?.FeaturesArr?.map((res) => {
              return (
                <MenuItem
                  value={res.TextileFeature}
                  sx={{ color: "#445FD2", fontSize: "14px" }}
                >
                  {res.TextileFeature}
                </MenuItem>
              );
            })}
          </Select>
        </Box>

        <Box>
          <Typography sx={{ ...CommonTextStyle, pt: "20px" }}>
            Select Feature Description
          </Typography>

          <TextField
            focused
            multiline
            variant="standard"
            placeholder="Eg. Cotton & Silk Mix (Type in two - three words)"
            value={description}
            sx={{
              ...TextFieldStyle,
              height: "100%",
            }}
            onChange={(e) => setDescription(e.target.value)}
            minRows={3}
            // InputProps={InputPropsStyle}
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <Typography
                  variant="body1"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "12px",
                  }}
                ></Typography>
              ),
              style: {
                fontFamily: "Poppins",
                fontSize: "12px",
                color: "#445FD2",
                paddingLeft: "10px",
              },
            }}
            onKeyDown={(e) => {
              if (e.key === " " && e.target.selectionStart === 0) {
                e.preventDefault();
              }
            }}
          />
        </Box>

        <Button
          variant="contained"
          onClick={handleItemAdd}
          sx={{
            width: "100%",
            height: "41px",
            textTransform: "none",
            background: "#445FD2",
            borderRadius: "10px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "21px",
            color: "#FFFFFF",
            "&:hover": {
              background: "#445FD2",
            },
            my: 3,
          }}
        >
          Proceed to ADD
        </Button>

        <Typography
          sx={{
            color: "#6B7A99",
            fontFamily: "Poppins",
            fonmtSize: "20px",
            marginRight: "75%",
            marginTop: "1rem",
          }}
        >
          Key Features({props?.AddedFeaturesArr?.length})
        </Typography>

        <Box sx={{ width: "100%" }}>
          {props?.AddedFeaturesArr?.map((item, index) => (
            <Box
              sx={{
                border: "1px solid #E3E3E3",
                marginTop: "1rem",
                mx: "auto",
                height: "auto",
                width: "99%",
                display: " flex",
                flexDirection: "column",
                placeItems: "center",
                borderRadius: "10px",
              }}
            >
              <Box
                key={index}
                sx={{
                  display: "flex",
                  width: "97%",
                  minHeight: "60px",
                  justifyContent: "space-between",
                  height: "auto",
                }}
              >
                <Typography sx={{ mapdata }}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      marginTop: "15px",
                      fontSize: "12px",
                      height: "auto",
                      color: " #6B7A99",
                      fontFamily: "Poppins",
                    }}
                  >
                    {item.name}
                  </Typography>

                  {item.description}
                </Typography>

                <Button
                  onClick={() => props.handleDelete(index)}
                  sx={{ textTransform: "none", fontSize: "15px" }}
                >
                  X
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "21px",
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
const mapdata = {
  color: " #6B7A99",
  fontFamily: "Poppins",
  width: "100%",
  fontSize: "12px",
  minHeight: "60px",
  height: "auto",
};
