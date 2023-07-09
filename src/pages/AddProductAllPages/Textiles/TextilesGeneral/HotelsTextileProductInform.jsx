import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Typography,
  Select,
  MenuItem,
  Button,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
// import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";

export default function HotelsTextileProductInform(props) {
  console.log(props,'======434=');
  let showRoomType = false;
  let temp = localStorage.getItem("digitalData");
  if (temp == "Offer Specific") {
    showRoomType = true;
  } else {
    showRoomType = false;
  }

  const [storehsn, setStorehsn] = useState();
  const [size, setSize] = useState();
  const [color, setColor] = useState('#979797');
  const schema = showRoomType
    ? z.object({
        RoomType: z
          .string()
          .nonempty({ message: "This field is required" })
          .min(1),
          color: z.string().nonempty({ message: "This field is required" }).min(7),
          size:z.string().nonempty({ message: "This field is required" }).min(1),
        PricePerUnit: z.coerce.number().gte(1),
        GST: z.coerce.number().gte(1),
        HSN: z.string().nonempty({ message: "This field is required" }).min(1),
        validityOfVoucherValue: z.coerce.number().gte(1),
        validityOfVoucherUnit: z.string().min(1),
        MinOrderQuantity: z.coerce.number().gte(1),
        MaxOrderQuantity: z.coerce.number().gte(1),
      })
    : z.object({
      color: z.string().nonempty({ message: "This field is required" }).min(7),
      size:z.string().nonempty({ message: "This field is required" }).min(1),
      PricePerUnit: z.coerce.number().gte(1),
        GST: z.coerce.number().gte(1),
        HSN: z.string().nonempty({ message: "This field is required" }).min(1),
        validityOfVoucherValue: z.coerce.number().gte(1),
        validityOfVoucherUnit: z.string().min(1),
        MinOrderQuantity: z.coerce.number().gte(1),
        MaxOrderQuantity: z.coerce.number().gte(1),
      });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    trigger,
    setError,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });
console.log(props?.HSNData,'====6767=========');
  let GST = 0;
  props?.HSNData?.filter((item) => {
    return item.HSN === storehsn;
  })?.map((item, index) => {
    GST = item.GST;
  });
  useEffect(() => {
    setValue("GST", GST);
  }, [GST, props?.HSNData]);
  useEffect(() => {
    if (props.defaultValue == null) {
      return;
    }
    for (const [key, value] of Object.entries(props.defaultValue)) {
      setValue(key, value);
    }
  }, [props.defaultValue]);
  function stopPropagate(callback) {
    return (e) => {
      e.stopPropagation();
      callback();
    };
  }
  return (
    <>
    <Box
      sx={{
        my: 3,
        border: "1px solid #E3E3E3",
        borderRadius: "10px",
        height: "auto",
        minHeight: "100px",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        // justifyContent: "space-between",
        flexDirection: "row",
        gap: "10px",
        px: 2,
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.ProductColor?.message}
        </Typography>
      </Box>
      {showRoomType ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>Room Type</Typography>
          <Input
            {...register("RoomType")}
            id="standard-basic"
            variant="standard"
            disableUnderline
            placeholder="Room Type"
            InputProps={{
              disableUnderline: "true",
              style: {
                color: "#445FD2",
                fontSize: "14px",
                padding: "7px",
              },
            }}
            sx={{
              width: "139px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "12px",
              color: "#445FD2",
              px: 1,
            }}
          />
          {showRoomType ? (
            <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
              {errors?.RoomType?.message}
            </Typography>
          ) : (
            ""
          )}
        </Box>
      ) : (
        ""
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}>Color</Typography>

        <Box sx={{ position: "relative", display: "flex" }}>
          <Box
            sx={{
              width: "35px",
              height: "42px",
              background: color,
              borderRadius: "10px",
              marginRight: "3px",
            }}
          />
          <Input
            disableUnderline
            placeholder="#979797"
            onChange={(e)=>setColor(e.target.value)}
            {...register("color")}
            sx={{
              width: "104px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "12px",
              px: 1,
              color: "#445FD2",
            }}
            InputProps={{
              style: {
                color: "#445FD2",
              },
            }}
          />
        </Box>
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.color?.message}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}>Size</Typography>
        <Box
          sx={{
            width: "100%",
            // maxWidth: "1000px",
            height: "42px",
            mt: "1%",
            borderRadius: "10px",
          }}
        >
          <Select
            {...register("size")}
            onChange={(e) => setSize(e.target.value)}
            defaultValue="S"
            sx={{
              width: "139px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              boxShadow: "none",
              "& .MuiSelect-select": {
                color: "#445FD2",
              },
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
                // fill: "#ADB8CC !important",
                fontSize: "2rem",
              },
            }}
          >
            <MenuItem sx={MenuItems} value="S">
              S
            </MenuItem>
            <MenuItem sx={MenuItems} value="M">
              M
            </MenuItem>
            <MenuItem sx={MenuItems} value="L">
              L
            </MenuItem>
            <MenuItem sx={MenuItems} value="XL">
              XL
            </MenuItem>
            <MenuItem sx={MenuItems} value="XXL">
              XXL
            </MenuItem>
          </Select>
        </Box>
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.size?.message}
        </Typography>
      </Box>
      {props?.HSNData && props?.HSNData > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: 1,
              maxWidth: "140px",
            }}
          >
            <Typography sx={CommonTextStyle}>HSN</Typography>
            <Box sx={{ position: "relative" }}>
              <Select
                disableUnderline
                placeholder="998346"
                required={true}
                {...register("HSN", {
                  onChange: (e) => {
                    setStorehsn(e.target.value);
                  },
                })}
                style={{
                  width: "79.4px",
                  height: "42px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  px: 1,
                  fontSize: "12px",
                  color: "#445FD2",
                }}
              >
                {!props?.HSNData ||
                props?.HSNData === undefined ||
                props?.HSNData === ""
                  ? null
                  : props?.HSNData?.map((item, index) => {
                      return (
                        <MenuItem
                          style={{
                            width: "50px",
                            height: "42px",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                            px: 1,
                            fontSize: "12px",
                            color: "#445FD2",
                          }}
                          value={item.HSN}
                        >
                          <Typography
                            sx={{
                              color: "#445FD2",
                            }}
                          >
                            {item.HSN}
                          </Typography>
                        </MenuItem>
                      );
                    })}
              </Select>
            </Box>
            <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
              {errors?.HSN?.message}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: 1,
              maxWidth: "140px",
            }}
          >
            <Typography sx={CommonTextStyle}>GST</Typography>
            <Box sx={{ position: "relative" }}>
              {storehsn === null || storehsn === undefined ? (
                <Input
                  disableUnderline
                  disabled={true}
                  required={true}
                  placeholder="5"
                  sx={{
                    width: "46px",
                    height: "42px",
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    px: 1,
                    fontSize: "12px",
                    color: "#445FD2",
                  }}
                  InputProps={{
                    style: {
                      color: "#445FD2",
                    },
                  }}
                />
              ) : !props?.HSNData ||
                props?.HSNData === undefined ||
                props?.HSNData === "" ? null : (
                props?.HSNData?.filter((item) => {
                  return item.HSN === storehsn;
                })?.map((item, index) => {
                  return (
                    <Input
                      disableUnderline
                      disabled={true}
                      required={true}
                      placeholder="5"
                      value={item.GST}
                      sx={{
                        width: "46px",
                        height: "42px",
                        background: "#FFFFFF",
                        borderRadius: "10px",
                        px: 1,
                        fontSize: "12px",
                        color: "#445FD2",
                      }}
                    />
                  );
                })
              )}
              <Typography
                sx={{
                  position: "absolute",
                  right: "10%",
                  bottom: "20%",
                  color: "#979797",
                  fontSize: "15px",
                }}
              >
                %
              </Typography>
            </Box>
            <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
              {errors?.GST?.message}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: 1,
              maxWidth: "140px",
            }}
          >
            <Typography sx={CommonTextStyle}>HSN</Typography>
            <Box sx={{ position: "relative" }}>
              <Input
                disableUnderline
                required={true}
                {...register("HSN")}
                sx={{
                  width: "70px",
                  height: "42px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  px: 1,
                  fontSize: "12px",
                  color: "#445FD2",
                }}
              />
            </Box>
            <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
              {errors?.HSN?.message}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: 1,
              maxWidth: "140px",
            }}
          >
            <Typography sx={CommonTextStyle}>GST</Typography>
            <Box sx={{ position: "relative" }}>
              <Input
                disableUnderline
                required={true}
                {...register("GST")}
                sx={{
                  width: "70px",
                  height: "42px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  px: 1,
                  fontSize: "12px",
                  color: "#445FD2",
                }}
              />

              <Typography
                sx={{
                  position: "absolute",
                  right: "10%",
                  bottom: "20%",
                  color: "#979797",
                  fontSize: "15px",
                }}
              >
                %
              </Typography>
            </Box>
            <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
              {errors?.GST?.message}
            </Typography>
          </Box>
        </>
      )}
       <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}>Validity of Voucher</Typography>
        <Box
          sx={{
            width: "100%",
            // maxWidth: "1000px",
            height: "42px",
            mt: "1%",
            borderRadius: "10px",
          }}
        >
          <Input
            {...register("validityOfVoucherValue")}
            id="standard-basic"
            variant="standard"
            disableUnderline
            placeholder="4"
            InputProps={{
              disableUnderline: true,
              style: {
                color: "#445FD2",
                fontSize: "14px",
                padding: "7px",
                marginLeft: "10px", 
              },
              placeholderStyle: {
                color: "#445FD2", 
              },
            }}
            InputLabelProps={{
              style: {
                color: "red",
              },
            }}
            sx={{
              width: "45%",
              height: "100%",
              background: "#FFFFFF",
              borderRadius: "10px 0px 0px 10px",
            }}
          />
          <Select
            sx={GW}
            defaultValue="days"
            {...register("validityOfVoucherUnit")}
          >
            <MenuItem sx={MenuItems} value="days">
              days
            </MenuItem>
            <MenuItem sx={MenuItems} value="months">
              months
            </MenuItem>
            <MenuItem sx={MenuItems} value="years">
              years
            </MenuItem>
          </Select>
        </Box>
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.validityOfVoucherValue?.message}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}>Price per Unit</Typography>
        <Box sx={{ position: "relative" }}>
          <Input
            disableUnderline
            placeholder="1300"
            InputProps={{
              placeholderStyle: {
                color: "#445FD2 ", 
              }
            }}
            {...register("PricePerUnit")}
            sx={{
              width: "139px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "12px",
              px: 1,
              color: "#445FD2",
            }}
          />

          <img
            src={Bxitoken}
            style={{
              position: "absolute",
              width: "20px",
              right: "7%",
              bottom: "20%",
            }}
            alt="bxiToken"
          />
        </Box>
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.PricePerUnit?.message}
        </Typography>
      </Box>

     
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}>Min order Quantity</Typography>
        <Input
          disableUnderline
          {...register("MinOrderQuantity")}
          sx={{
            width: "139px",
            height: "42px",
            background: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#445FD2",
            px: 1,
          }}
        />
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.MinOrderQuantity?.message}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}> Max order Quantity</Typography>
        <Input
          disableUnderline
          {...register("MaxOrderQuantity")}
          sx={{
            width: "139px",
            height: "42px",
            background: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#445FD2",
            px: 1,
          }}
        />
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.MaxOrderQuantity?.message}
        </Typography>
      </Box>
    </Box>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Button
          id="AddButtonVoucherInfo"
          onClick={async () => {
            if ((await trigger()) === false) {
              return;
            }
            if (
              Number(getValues().MaxOrderQuantity) <
              Number(getValues().MinOrderQuantity)
            ) {
              setError("MaxOrderQuantity", {
                type: "custom",
                message:
                  "Max Order Quantity can not be less than Min Order Quantity",
              });
            } else if (
              Number(getValues().PricePerUnit) <=
              Number(getValues().DiscountedPrice)
            ) {
              setError("PricePerUnit", {
                type: "custom",
                message:
                  "PricePerUnit can not be less than or equal to DiscountedPrice",
              });
            } else {
              // {props?.HSNData && props?.HSNData > 0 ? (

              if (props?.HSNData && props?.HSNData > 0) {
                // {
                //   !props?.HSNData
                //     ? setValue("GST", 0)
                // :
                props?.HSNData?.filter((item) => {
                  return item.HSN === storehsn;
                })?.map((item, index) => {
                  GST = item.GST;
                });
                // }
                setValue("GST", GST);
              }
              props.append(getValues(), props.index);
              reset();
            }
          }}
          sx={{
            width: "100%",
            height: "41px",
            background: "#445FD2",
            borderRadius: "10px",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "21px",
            color: "#FFFFFF",
            textTransform: "none",
            "&:hover": {
              background: "#445FD2",
            },
            my: 3,
          }}
        >
          Proceed To ADD
        </Button>
      </Box>
    </>
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
const GW = {
  width: "55%",
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
const MenuItems = {
  fontSize: "12px",
  color: "#6B7A99",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
};
