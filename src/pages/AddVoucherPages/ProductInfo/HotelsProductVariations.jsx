import React, { useState, useEffect } from "react";
import {
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
import bxitoken from "../../../assets/Images/CommonImages/BXIToken.svg";

export default function HotelProductVariations(props) {
  const [currency, setCurrency] = useState({
    currencyType: "",
    amount: "",
    reasonOfCost: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(
      z.object({
        CostPrice: z.string().min(1),
        ReasonOfCost: z.string().min(1),
        currencyType: z.any(),
      })
    ),
  });
  console.log("errors from inside =====>", errors);

  useEffect(() => {
    if (props.defaultValue == null) {
      return;
    }
    for (const [key, value] of Object.entries(props.defaultValue)) {
      setValue(key, value);
    }
  }, [props.defaultValue]);

  return (
    <Box
      sx={{
        mt: 3,
        height: "auto",
        minHeight: "100px",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        flexDirection: "row",
        gap: "10px",
        py: 2,
      }}
    >
      <Box
        sx={{
          py: "20px",
          display: "flex",
          gap: "20px",
          position: "relative",
          width: "100%",
        }}
      >
        <Button
          sx={{
            color: "#6B7A99",
            position: "absolute",
            right: 0,
            top: "15%",
          }}
          onClick={async () => {
            if ((await trigger()) === false) {
              console.log(errors, "errors=====>");
              return;
            }
            props.append(getValues(), props.index);
            reset();
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: "400",
              textTransform: "none",
            }}
          >
            + Add
          </Typography>
        </Button>

        <Box
          sx={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "45px",
              mt: "1%",
              borderRadius: "10px",
            }}
          >
            <Typography sx={{ ...CommonTextStyle, pb: "20px" }}>
              Other cost if applicable
            </Typography>
            <Box
              sx={{
                display: "flex",
                background: "#FFFFFF",
                borderRadius: "10px",
                width: "100%",
                alignItems: "center",
              }}
            >
              <TextField
                {...register("CostPrice")}
                type="number"
                id="standard-basic"
                variant="standard"
                InputProps={{
                  disableUnderline: "true",
                  style: {
                    color: "rgba(107, 122, 153)",
                    fontSize: "14px",
                    padding: "10px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "red",
                  },
                }}
                sx={{
                  width: "65%",
                  height: "100%",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                }}
              />

              <Select
                defaultValue={"₹"}
                {...register("currencyType")}
                sx={{
                  width: "auto",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                      border: 0,
                    },
                  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
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
                }}
              >
                <MenuItem value="BXITokens">
                  <Box
                    component="img"
                    src={bxitoken}
                    alt="bxitoken"
                    sx={{
                      height: "15px",
                      width: "auto",
                    }}
                  />
                </MenuItem>
                <MenuItem value="₹">₹</MenuItem>
              </Select>
              {/* <Typography sx={{ color: "red" }}>
                {errors["currencyType"]?.message}
              </Typography> */}
            </Box>
            <Typography sx={{ color: "red" }}>
              {errors["CostPrice"]?.message}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "45px",
              mt: "1%",
              borderRadius: "10px",
            }}
          >
            <Typography sx={{ ...CommonTextStyle, pb: "20px" }}>
              Reason of cost{" "}
            </Typography>
            <TextField
              {...register("ReasonOfCost")}
              id="standard-basic"
              variant="standard"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              sx={{
                width: "100%",
                height: "53px",
                background: "#FFFFFF",
                borderRadius: "10px",
              }}
            />
            <Typography sx={{ color: "red" }}>
              {errors["ReasonOfCost"]?.message}
            </Typography>
          </Box>
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
