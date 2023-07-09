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

export default function TextileProductInform(props) {
  const [currency, setCurrency] = useState({
    currencyType: "",
    amount: "",
    reasonOfCost: "",
  });
  const GSTOptions = [0, 5, 12, 18, 28];

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
        AdCostGST: z.coerce
          .number()
          .lte(28, "GST must be less than or equal to 28")
          .int({
            message: "GST must be not a decimal",
          }),
        AdCostHSN: z.coerce.number().min(1),
        ReasonOfCost: z.string().min(1).max(75),
        AdCostApplicableOn: z.string().min(1),
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
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "200px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            Additional cost applicble on
          </Typography>
          <Select
            defaultValue={"All"}
            {...register("AdCostApplicableOn")}
            sx={{
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: 0,
                },
              width: "199px",
              height: "48px",
              background: "#FFFFFF",
              borderRadius: "10px",
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontSize: "12px",
              fontWeight: 400,
              color: "#445FD2",
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="PerUnit">Per Unit</MenuItem>
          </Select>
          <Typography sx={{ color: "red", height: "auto", width: "103%" }}>
            {errors["AdCostApplicableOn"]?.message}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "180px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            Other cost if applicable<span style={{ color: "red" }}> *</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              background: "#FFFFFF",
              borderRadius: "10px",
              width: "100%",
              alignItems: "center",
              border: errors["CostPrice"] ? "1px solid red" : null,
            }}
          >
            <Input
              disableUnderline
              // {...register("CostPrice")}
              {...register("CostPrice", {
                onChange: (event) => {
                  event.target.value = parseInt(
                    event.target.value.replace(/[^\d]+/gi, "") || 0
                  ).toLocaleString("en-US");
                },
              })}
              // type="number"
              placeholder="Eg. 1000"
              id="standard-basic"
              variant="standard"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "#445FD2",
                  fontSize: "13px",
                },
              }}
              sx={{
                width: "100%",
                height: "48px",
                background: "#FFFFFF",
                borderRadius: "10px",
                px: 1,
                fontSize: "12px",
                color: "#445FD2",
              }}
            />

            <Select
              defaultValue={"₹"}
              {...register("currencyType")}
              sx={{
                height: "48px",
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
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors["CostPrice"]?.message}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "100px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            HSN <span style={{ color: "red" }}> *</span>
          </Typography>

          <Box sx={{ position: "relative" }}>
            <Input
              disableUnderline
              // required={true}
              placeholder="998346"
              {...register("AdCostHSN")}
              // type="number"
              sx={{
                width: "100px",
                height: "48px",
                background: "#FFFFFF",
                borderRadius: "10px",
                px: 1,
                fontSize: "12px",
                color: "#445FD2",
                border: errors["AdCostHSN"] ? "1px solid red" : null,
              }}
              maxLength={6}
              minLength={0}
              onKeyDown={(e) => {
                if (e.key === " " && e.target.selectionStart === 0) {
                  e.preventDefault();
                }
              }}
            />
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors?.AdCostHSN?.message}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "100px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            GST <span style={{ color: "red" }}> *</span>
          </Typography>

          <Box sx={{ position: "relative" }}>
            <Select
              sx={{
                ".MuiOutlinedInput-notchedOutline": {
                  border: 0,
                },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
                width: "100px",
                height: "48px",
                background: "#FFFFFF",
                borderRadius: "10px",
                fontSize: "12px",
                color: "#445FD2",
                border: errors["AdCostGST"] ? "1px solid red" : null,
              }}
              defaultValue="0"
              {...register("AdCostGST")}
            >
              {GSTOptions.map((gst, idx) => {
                return (
                  <MenuItem sx={MenuItems} value={gst}>
                    {gst}
                  </MenuItem>
                );
              })}
            </Select>

            <Typography
              sx={{
                position: "absolute",
                right: "32%",
                bottom: "25%",
                color: "#979797",
                fontSize: "15px",
              }}
            >
              %
            </Typography>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors["AdCostGST"]?.message}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <Typography sx={{ ...CommonTextStyle }}>
            Reason of cost <span style={{ color: "red" }}> *</span>
          </Typography>
          <Box
            sx={{
              display: "flex",
              background: "#fff",
              borderRadius: "10px",
            }}
          >
            <TextField
              {...register("ReasonOfCost")}
              placeholder="Eg. Every 3 minutes in loop"
              id="standard-basic"
              variant="standard"
              InputProps={{
                disableUnderline: "true",
                style: {
                  // color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "10px",
                  height: "48px",
                  color: "#445fd2",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              sx={{
                width: "100%",
                background: "#FFFFFF",
                borderRadius: "10px",
                color: "#445fd2",
                border: errors["ReasonOfCost"] ? "1px solid red" : null,
              }}
            />
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors["ReasonOfCost"]?.message}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          sx={{
            color: "#ffffff",
            backgroundColor: "#445FD2",
            textTransform: "none",
            fontSize: "14px",
            height: "41px",
            width: "100%",
            borderRadius: "10px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            boxShadow: "none",
            "&:hover": {
              // border: "none",
              boxShadow: "none",
              backgroundColor: "#445FD2",
            },
          }}
          onClick={async () => {
            if ((await trigger()) === false) {
              console.log(errors, "errors=====>");
              return;
            }
            props.append(getValues(), props.index);
            reset({
              AdCostName: "",
              AdCostPrice: "",
              AdCostHSN: "",
              AdCostGST: "",
              ReasonOfCost: "",
            });
          }}
        >
          Add Additional Cost
        </Button>
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

const MenuItems = {
  fontSize: "12px",
  color: "#445FD2",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
};
