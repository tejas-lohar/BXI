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
  TextField,
} from "@mui/material";
// import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@mui/material/styles";
import { Form } from "react-hook-form";
import Bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";

const unitsForWeight = ["oz", "g", "kg", "lb", "l", "ml", "cu ft"];
const unitsForBatteryCapacity = ["mAh", "Ah"];
const unitsForPowerConsumption = ["W", "KW", "HP", "V", "A"];
const unitsForStorage = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
const unitsOfVolumes = ["ml", "oz", "L", "cu ft"];
export default function MobilityProductInform(props) {
  console.log("propsHere =====>", props);
  const ProductId = useParams().id;
  // const [shoeSizeCountry, setShoeSizeCountry] = useState(usShoeSizes);
  const navigate = useNavigate();
  console.log("ProductId", ProductId);
  console.log("props", props.size);

  const GSTOptions = [0, 5, 12, 18, 28];
  const [data, setData] = useState(props?.HSNData);
  const [customhsnFields, setCustomHSNFields] = useState(false);

  const [storehsn, setStorehsn] = useState();

  const [sampleAvailability, setSampleAvailability] = useState();

  // const [minOrder, setMinOrder] = useState();
  const [showContent, setShowContent] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowContent(event.target.checked);
  };
  const [selected, SetSelected] = useState(false);
  const [color, setColor] = useState("#ffffff");
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
    resolver: zodResolver(
      z.object({
        ProductColor: z.string().length(7),
        ProductSize: z.any(),
        // GST: z.coerce.number().optional(),
        // GST: z.number().int().min(0).optional(),
        // HSN: z.coerce.number().optional(),
        // HSN: z.number().min(0).optional(),
        // GST: z
        //   .string()
        //   .transform((val) => (val ? parseInt(val) : undefined))
        //   .refine((val) => !isNaN(val), {
        //     message: "Invalid GST value. Must be an integer.",
        //   })
        //   .optional(),
        // HSN: z
        //   .string()
        //   .transform((val) => (val ? parseFloat(val) : undefined))
        //   .refine((val) => !isNaN(val), {
        //     message: "Invalid HSN value. Must be a number.",
        //   })
        //   .optional(),
        GST: z.coerce.number().lte(28).int({
          message: "GST must be not a decimal",
        }),
        HSN: z.string().min(1),
        ProductIdType: z.string().min(1),
        PricePerUnit: z.coerce.string().min(1),
        DiscountedPrice: z.coerce.string().min(1),
        MinOrderQuantity: z.coerce.string().min(1),
        MaxOrderQuantity: z.coerce.string().min(1),
        // length: z.coerce.number().positive(),
        // length: z
        //   .string()
        //   .refine((value) => !isNaN(Number(value)), {
        //     message: "Invalid input. Please enter only numbers for length.",
        //   })
        //   .refine((value) => Number(value) > 0, {
        //     message: "Length must be a positive number.",
        //   })
        //   .refine((value) => !/^1e\+43$/i.test(value), {
        //     message: "Invalid input. Please enter a valid number for length.",
        //   }),
        // width: z.string().optional(),
        // height: z.string().optional(),
        // measureMentUnit: z.any(),
        // PricePerUnit: z.string().min(1),
        // DiscountedPrice: z.string().min(1),
        // MinOrderQuantity: z.string().min(1),
        // MaxOrderQuantity: z.string().min(1),
        weight:
          props.size === "Weight" ? z.string().min(1) : z.string().optional(),
        batteryCapacity:
          props.size === "BatteryCapacity"
            ? z.string().min(1)
            : z.string().optional(),
        powerConsumption:
          props.size === "PowerConsumption"
            ? z.string().min(1)
            : z.string().optional(),
        volume:
          props.size === "volume" ? z.string().min(1) : z.string().optional(),
        length:
          props.size === "Length" ||
          props.size === "Length x Height" ||
          props.size === "Length x Height x Width" ||
          props.size === "Custom Size"
            ? z
                .string()
                .refine((value) => !isNaN(Number(value)), {
                  message:
                    "Invalid input. Please enter only numbers for length.",
                })
                .refine((value) => Number(value) > 0, {
                  message: "Length must be a positive number.",
                })
                .refine((value) => !/^1e\+43$/i.test(value), {
                  message:
                    "Invalid input. Please enter a valid number for length.",
                })
            : z.string().optional(),
        width:
          props.size === "Length x Height x Width"
            ? z.string().min(1)
            : z.string().optional(),
        height:
          props.size === "Length x Height" ||
          props.size === "Length x Height x Width"
            ? z.string().min(1)
            : z.string().optional(),
        measureMentUnit:
          props.size === "Custom Size"
            ? z.string().min(1)
            : z.string().optional(),
        listPeriod: z.any(),
        ShoeSize: z.coerce.number().optional(),
        // }),
        // z.object({
        sampleavailability: showContent ? z.string().min(1) : z.any(),
        priceofsample: showContent ? z.string().min(1) : z.any(),
      })
    ),
  });
  console.log("errors from inside =====>", errors);

  useEffect(() => {
    if (props.defaultValue == null) {
      return;
    }
    // setValue(props.defaultValue);
    for (const [key, value] of Object.entries(props.defaultValue)) {
      setValue(key, value);
    }
  }, [props.defaultValue]);

  //   const SubmitForm = handleSubmit((data) => {
  //     console.log("data======================", data);
  //   });

  //   const handleAdd = async () => {
  //     setData([...data, textTileDetails]);
  //   };
  let GST = "";
  // let sampleavailability = getValues().sampleavailability;
  // let priceofsample = getValues().priceofsample;
  // let length = getValues().length;
  // let ShoeSize = getValues().ShoeSize;
  // let batteryCapacity = getValues().batteryCapacity;
  // let powerConsumption = getValues().powerConsumption;
  // let Volume = getValues().Volume;

  console.log("values", getValues());
  function stopPropagate(callback) {
    return (e) => {
      e.stopPropagation();
      callback();
    };
  }
  // props?.HSNData?.filter((item) => {
  //   return item.HSN === storehsn;
  // })?.map((item, index) => {
  //   GST = item.GST;
  // });
  useEffect(() => {
    setValue("ProductColor", color);

    // setValue("", "");
  }, [color]);
  useEffect(() => {
    setValue("height", "");
    setValue("width", "");
    setValue("length", "");
    setValue("sampleavailability", 0);
    setValue("priceofsample", 0);
    setValue("batteryCapacity", "");
    setValue("powerConsumption", "");
    setValue("volume", "");
    setValue("weight", "");
  }, []);
  // useEffect(() => {
  //   setValue("GST", GST);
  // }, [GST]);
  // console.log("GST", GST);
  return (
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
        justifyContent: "flex-start",
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
        <Typography sx={CommonTextStyle}>Color</Typography>
        <Box
          sx={{
            // width: "139px",
            // height: "42px",
            // background: "#FFFFFF",
            borderRadius: "10px",
            // px: 1,
            background: "white",
            width: "139px",
            height: "42px",
            display: "flex",
            // justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <input
            // disableUnderline
            // value={getValues("ProductColor")}
            type="color"
            // {...register("ProductColor", {
            //   onChange: (e) => {
            //     // console.log(e.target.value);
            //     trigger("ProductColor");
            //   },
            // })}
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              // setValue("ProductColor", e.target.value);
              // trigger("ProductColor");
            }}
            style={{
              height: "40px",
              width: "60px",
              border: "1px",
              cursor: "pointer",
            }}
            // label={ProductColor}
          />
          <Input
            disableUnderline
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            // {...register("ProductSize")}
            {...register("ProductColor")}
            sx={{
              width: "139px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              px: 1,
              color: "#445FD2",
            }}
          />
        </Box>
        {/* {errors?.ProductColor?.message} */}
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.ProductColor?.message}
        </Typography>
      </Box>

      {/*   <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <SizeChart
          size={props.size}
          register={register}
          // shoeSizeCountry={shoeSizeCountry}
        />
        {errors.length && (
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors.length.message}
          </Typography>
        )}
        </Box> */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
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
            {...register("HSN")}
            sx={{
              width: "139px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              px: 1,
              fontSize: "12px",
              color: "#445FD2",
              border: errors["HSN"] ? "1px solid red" : null,
            }}
            onKeyDown={(e) => {
              if (e.key === " " && e.target.selectionStart === 0) {
                e.preventDefault();
              }
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
        <Typography sx={CommonTextStyle}>
          GST <span style={{ color: "red" }}> *</span>
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Select
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
              width: "139px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              px: 1,
              fontSize: "12px",
              color: "#445FD2",
              border: errors["GST"] ? "1px solid red" : null,
            }}
            defaultValue="0"
            {...register("GST")}
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
              right: "25%",
              bottom: "25%",
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}>
          Product ID Type <span style={{ color: "red" }}> *</span>
        </Typography>
        <Input
          disableUnderline
          // value={data. IdType}
          placeholder="#1910WH23"
          {...register("ProductIdType", {
            onChange: (event) => {
              const inputValue = event.target.value;

              if (inputValue.match(/[^a-zA-Z0-9\s]/gi)) {
                const filteredValue = inputValue.replace(
                  /[^a-zA-Z0-9\s]/gi,
                  ""
                );
                event.target.value = filteredValue;
              }
            },
          })}
          sx={{
            width: "139px",
            height: "42px",
            background: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#445FD2",
            px: 1,
            border: errors["ProductIdType"] ? "1px solid red" : null,
          }}
          onKeyDown={(e) => {
            if (e.key === " " && e.target.selectionStart === 0) {
              e.preventDefault();
            }
          }}
        />
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.ProductIdType?.message}
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
        <Typography sx={CommonTextStyle}>
          Price per Unit <span style={{ color: "red" }}> *</span>
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Input
            disableUnderline
            // value={data.mro}
            placeholder="Eg. 10,00,000"
            {...register("PricePerUnit", {
              onChange: (event) => {
                event.target.value = parseInt(
                  event.target.value.replace(/[^\d]+/gi, "") || 0
                ).toLocaleString("en-US");
              },
            })}
            sx={{
              width: "139px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "12px",
              px: 1,
              color: "#445FD2",
              border: errors["PricePerUnit"] ? "1px solid red" : null,
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
            alt="element"
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
        <Typography sx={CommonTextStyle}>
          Discounted Price <span style={{ color: "red" }}> *</span>
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Input
            disableUnderline
            // value={data.discount}
            placeholder="Eg. 10,000"
            {...register("DiscountedPrice", {
              onChange: (event) => {
                event.target.value = parseInt(
                  event.target.value.replace(/[^\d]+/gi, "") || 0
                ).toLocaleString("en-US");
              },
            })}
            sx={{
              width: "139px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "12px",
              color: "#445FD2",
              px: 1,
              border: errors["DiscountedPrice"] ? "1px solid red" : null,
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
          />
        </Box>

        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.DiscountedPrice?.message}
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
        <Typography sx={{ ...CommonTextStyle, whiteSpace: "nowrap" }}>
          Min order Quantity <span style={{ color: "red" }}> *</span>
        </Typography>

        <Input
          disableUnderline
          // value={data.minimum}
          placeholder="Eg. 10"
          {...register("MinOrderQuantity", {
            onChange: (event) => {
              event.target.value = parseInt(
                event.target.value.replace(/[^\d]+/gi, "") || 0
              ).toLocaleString("en-US");
            },
          })}
          sx={{
            width: "139px",
            height: "42px",
            background: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#445FD2",
            px: 1,
            border: errors["MinOrderQuantity"] ? "1px solid red" : null,
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
        <Typography sx={{ ...CommonTextStyle, whiteSpace: "nowrap" }}>
          {" "}
          Max order Quantity <span style={{ color: "red" }}> *</span>
        </Typography>

        <Input
          disableUnderline
          // value={data.maximum}
          placeholder="Eg. 100"
          {...register("MaxOrderQuantity", {
            onChange: (event) => {
              event.target.value = parseInt(
                event.target.value.replace(/[^\d]+/gi, "") || 0
              ).toLocaleString("en-US");
            },
          })}
          sx={{
            width: "139px",
            height: "42px",
            background: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#445FD2",
            px: 1,
            border: errors["MaxOrderQuantity"] ? "1px solid red" : null,
          }}
        />

        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.MaxOrderQuantity?.message}
        </Typography>
      </Box>
      <SizeChart
        size={props.size}
        register={register}
        errors={errors}
        // shoeSizeCountry={shoeSizeCountry}
      />
      <Box
        sx={{
          p: 1,
          mt: 2,
          width: "100%",
        }}
      >
        <FormGroup
          value={selected}
          onClick={() => {
            SetSelected(true);
          }}
        >
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
            label="  Do you wish to provide a sample in added details ?"
          />
          {showContent && (
            <Box
              sx={{
                mt: 1,
                borderRadius: "10px",
                height: "auto",
                position: "relative",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                flexDirection: "row",
                gap: "30px",
                px: 0,
                py: 0,
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
                <Typography sx={{ ...CommonTextStyle, whiteSpace: "nowrap" }}>
                  Min order Quantity <span style={{ color: "red" }}> *</span>
                </Typography>
                <Input
                  disableUnderline
                  placeholder="Eg. 10"
                  {...register("sampleavailability", {
                    onChange: (event) => {
                      event.target.value = parseInt(
                        event.target.value.replace(/[^\d]+/gi, "") || 0
                      ).toLocaleString("en-US");
                    },
                  })}
                  sx={{
                    width: "145px",
                    height: "42px",
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    fontSize: "12px",
                    color: "#445FD2",
                    px: 1,
                    border: errors["sampleavailability"]
                      ? "1px solid red"
                      : null,
                  }}
                />
                <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                  {errors?.sampleavailability?.message}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "30%",
                  height: "40px",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={{ ...CommonTextStyle }}>
                  Price of sample <span style={{ color: "red" }}> *</span>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    width: "145px",
                    alignItems: "center",
                    mt: 2,
                    border: errors["priceofsample"] ? "1px solid red" : null,
                  }}
                >
                  <TextField
                    // {...register("CostPrice")}
                    {...register("priceofsample", {
                      onChange: (event) => {
                        event.target.value = parseInt(
                          event.target.value.replace(/[^\d]+/gi, "") || 0
                        ).toLocaleString("en-US");
                      },
                    })}
                    // type="number"
                    placeholder="Eg. 1234"
                    id="standard-basic"
                    variant="standard"
                    InputProps={{
                      disableUnderline: "true",
                      style: {
                        color: "#445FD2",
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
                      // width: "65%",
                      width: "145px",
                      height: "60%",
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
                      height: "60%",
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
                        src={Bxitoken}
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
                <Typography sx={{ color: "red" }}>
                  {errors["priceofsample"]?.message}
                </Typography>
              </Box>
            </Box>
          )}
        </FormGroup>
        <Button
          // onClick={handleAdd}
          onClick={async () => {
            if ((await trigger()) === false) {
              console.log(errors, "errors=====>");
              return;
            }
            if (
              parseFloat(getValues().MaxOrderQuantity.replace(/,/g, "")) <
              parseFloat(getValues().MinOrderQuantity.replace(/,/g, ""))
            ) {
              setError("MaxOrderQuantity", {
                type: "custom",
                message:
                  "Max Order Quantity can not be less than Min Order Quantity",
              });
            } else if (
              parseFloat(getValues().PricePerUnit.replace(/,/g, "")) <
              parseFloat(getValues().DiscountedPrice.replace(/,/g, ""))
            ) {
              setError("PricePerUnit", {
                type: "custom",
                message: "PricePerUnit can not be less than DiscountedPrice",
              });
            } else {
              // if (props?.HSNData && customhsnFields === false) {
              //   // {
              //   //   !props?.HSNData
              //   //     ? setValue("GST", 0)
              //   // :
              //   props?.HSNData?.filter((item) => {
              //     return item.HSN === storehsn;
              //   })?.map((item, index) => {
              //     GST = item.GST;
              //   });
              //   // }
              //   setValue("GST", GST);
              // }
              if (props.size === "Length x Height x Width") {
                setValue(
                  "ProductSize",
                  `${getValues().length}${getValues().measureMentUnit} x ${
                    getValues().height
                  }${getValues().measureMentUnit} x ${getValues().width}${
                    getValues().measureMentUnit
                  }`
                );
              } else if (props.size === "Length x Height") {
                setValue(
                  "ProductSize",
                  `${getValues().length}${getValues().measureMentUnit} x ${
                    getValues().height
                  }${getValues().measureMentUnit}`
                );
              } else if (props.size === "Custom Size") {
                setValue(
                  "ProductSize",
                  `${getValues().length}${getValues().measureMentUnit}`
                );
              } else if (props.size === "Length") {
                setValue(
                  "ProductSize",
                  `${getValues().length}${getValues().measureMentUnit}`
                );
              } else if (props.size === "Weight") {
                setValue(
                  "ProductSize",
                  `${getValues().weight}${getValues().measureMentUnit}`
                );
              } else if (props.size === "BatteryCapacity") {
                setValue(
                  "ProductSize",
                  `${getValues().batteryCapacity}${getValues().measureMentUnit}`
                );
              } else if (props.size === "PowerConsumption") {
                setValue(
                  "ProductSize",
                  `${getValues().powerConsumption}${
                    getValues().measureMentUnit
                  }`
                );
              }
              props.append(getValues(), props.index);
              // reset();
              reset((formValues) => ({
                formValues,
                PricePerUnit: "",
                DiscountedPrice: "",
                MinOrderQuantity: "",
                MaxOrderQuantity: "",
                sampleavailability: "",
                priceofsample: "",

                length: "",
                height: "",
                width: "",
                weight: "",
                batteryCapacity: "",
                powerConsumption: "",
                volume: "",
              }));
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
          Proceed to ADD
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
  color: "#6B7A99",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
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

function SizeChart(props) {
  console.log("size", props.size, "size");
  switch (props.size) {
    case "Length":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          {/* {if(props.size === "Length"){
      return(
        "props.size"
      )
    }} */}
          <Typography sx={CommonTextStyle}>
            Size <span style={{ color: "red" }}> *</span>
          </Typography>
          {/* <Input
      disableUnderline
      // value={data.size}

      {...register("ProductSize")}
      sx={{
        width: "139px",
        height: "42px",
        background: "#FFFFFF",
        borderRadius: "10px",
        fontSize: "12px",
        color: "#445FD2",
        px: 1,
      }}
    /> */}
          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",

              border: props?.errors?.length?.message ? "1px solid red" : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("length")}
              id="standard-basic"
              variant="standard"
              placeholder="L"
              type="number"
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...props.register("listPeriod")}
              InputProps={{
                inputProps: { min: 0 },
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
              defaultValue={"in"}
              {...props.register("measureMentUnit")}
            >
              <MenuItem sx={MenuItems} value="in">
                in
              </MenuItem>
              <MenuItem sx={MenuItems} value="cm">
                cm
              </MenuItem>
              <MenuItem sx={MenuItems} value="mm">
                mm
              </MenuItem>
              <MenuItem sx={MenuItems} value="m">
                m
              </MenuItem>
              <MenuItem sx={MenuItems} value="km">
                km
              </MenuItem>
              <MenuItem sx={MenuItems} value="ft">
                ft
              </MenuItem>
              <MenuItem sx={MenuItems} value="yd">
                yd
              </MenuItem>
              <MenuItem sx={MenuItems} value="mi">
                mi
              </MenuItem>
              <MenuItem sx={MenuItems} value="nmi">
                nmi
              </MenuItem>
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.length?.message}
          </Typography>
        </Box>
      );
    case "Length x Height":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            Size <span style={{ color: "red" }}> *</span>
          </Typography>
          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: 1,
              mx: "auto",
              borderRadius: "10px",
              // background: "red",
              border:
                props?.errors?.height?.message || props?.errors?.length?.message
                  ? "1px solid red"
                  : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("length")}
              id="standard-basic"
              variant="standard"
              placeholder="L"
              type="number"
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...register("List")}
              InputProps={{
                inputProps: { min: 0 },
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
                  color: "#445FD2",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              sx={{
                width: "35%",
                height: "100%",
                background: "#FFFFFF",
                borderRadius: "10px 0px 0px 10px",
              }}
            />
            <TextField
              // value={data.size}
              {...props.register("height")}
              id="standard-basic"
              variant="standard"
              placeholder="H"
              type="number"
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...register("List")}
              InputProps={{
                inputProps: { min: 0 },
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
                  color: "#445FD2",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              sx={{
                width: "35%",
                height: "100%",
                background: "#FFFFFF",
                // borderRadius: "10px 0px 0px 10px",
              }}
            />

            <Select
              sx={{ ...GW, width: "30%" }}
              defaultValue={"in"}
              // {...register("ListPeriod")}
              {...props.register("measureMentUnit")}
            >
              <MenuItem sx={MenuItems} value="in">
                in
              </MenuItem>
              <MenuItem sx={MenuItems} value="cm">
                cm
              </MenuItem>
              <MenuItem sx={MenuItems} value="mm">
                mm
              </MenuItem>
              <MenuItem sx={MenuItems} value="m">
                m
              </MenuItem>
              <MenuItem sx={MenuItems} value="km">
                km
              </MenuItem>
              <MenuItem sx={MenuItems} value="ft">
                ft
              </MenuItem>
              <MenuItem sx={MenuItems} value="yd">
                yd
              </MenuItem>
              <MenuItem sx={MenuItems} value="mi">
                mi
              </MenuItem>
              <MenuItem sx={MenuItems} value="nmi">
                nmi
              </MenuItem>
              {/* <MenuItem sx={MenuItems} value="oz">
                oz
              </MenuItem>
              <MenuItem sx={MenuItems} value="g">
                g
              </MenuItem>
              <MenuItem sx={MenuItems} value="gb">
                gb
              </MenuItem>
              <MenuItem sx={MenuItems} value="tb">
                tb
              </MenuItem>
              <MenuItem sx={MenuItems} value="lb">
                lb
              </MenuItem>
              <MenuItem sx={MenuItems} value="kg">
                kg
              </MenuItem>
              <MenuItem sx={MenuItems} value="mah">
                mah
              </MenuItem>
              <MenuItem sx={MenuItems} value="w">
                w
              </MenuItem>
              <MenuItem sx={MenuItems} value="pixels">
                pixels
              </MenuItem>
              <MenuItem sx={MenuItems} value="hz">
                hz
              </MenuItem>
              <MenuItem sx={MenuItems} value="db">
                db
              </MenuItem> */}
            </Select>
            {/* <Typography sx={ErrorStyle}>{errors["List"]?.message}</Typography> */}
          </Box>
          {/* <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
      {errors?.ProductSize?.message}
    </Typography> */}
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.length?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.height?.message}
          </Typography>
        </Box>
      );
    case "Length x Height x Width":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            Size <span style={{ color: "red" }}> *</span>
          </Typography>
          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: 1,
              mx: "auto",
              borderRadius: "10px",
              // background: "red",
              border:
                props?.errors?.height?.message ||
                props?.errors?.length?.message ||
                props?.errors?.width?.message
                  ? "1px solid red"
                  : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("length")}
              id="standard-basic"
              variant="standard"
              placeholder="L"
              type="number"
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...register("List")}
              InputProps={{
                inputProps: { min: 0 },
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
                  color: "#445FD2",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              sx={{
                width: "20%",
                height: "100%",
                background: "#FFFFFF",
                borderRadius: "10px 0px 0px 10px",
              }}
            />
            <TextField
              // value={data.size}
              {...props.register("height")}
              id="standard-basic"
              variant="standard"
              placeholder="H"
              type="number"
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...register("List")}
              InputProps={{
                inputProps: { min: 0 },
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
                  color: "#445FD2",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              sx={{
                width: "20%",
                height: "100%",
                background: "#FFFFFF",
                // borderRadius: "10px 0px 0px 10px",
              }}
            />
            <TextField
              // value={data.size}
              {...props.register("width")}
              // {...register("ProductSize")}
              id="standard-basic"
              variant="standard"
              placeholder="W"
              type="number"
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...register("List")}
              InputProps={{
                inputProps: { min: 0 },
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
                  color: "#445FD2",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              sx={{
                width: "20%",
                height: "100%",
                background: "#FFFFFF",
                // borderRadius: "10px 0px 0px 10px",
              }}
            />
            <Select
              sx={{ ...GW, width: "40%" }}
              defaultValue={"in"}
              {...props.register("measureMentUnit")}
              // {...register("ListPeriod")}
            >
              <MenuItem sx={MenuItems} value="in">
                in
              </MenuItem>
              <MenuItem sx={MenuItems} value="cm">
                cm
              </MenuItem>
              <MenuItem sx={MenuItems} value="mm">
                mm
              </MenuItem>
              <MenuItem sx={MenuItems} value="m">
                m
              </MenuItem>
              <MenuItem sx={MenuItems} value="km">
                km
              </MenuItem>
              <MenuItem sx={MenuItems} value="ft">
                ft
              </MenuItem>
              <MenuItem sx={MenuItems} value="yd">
                yd
              </MenuItem>
              <MenuItem sx={MenuItems} value="mi">
                mi
              </MenuItem>
              <MenuItem sx={MenuItems} value="nmi">
                nmi
              </MenuItem>
              {/* <MenuItem sx={MenuItems} value="oz">
                oz
              </MenuItem>
              <MenuItem sx={MenuItems} value="g">
                g
              </MenuItem>
              <MenuItem sx={MenuItems} value="gb">
                gb
              </MenuItem>
              <MenuItem sx={MenuItems} value="tb">
                tb
              </MenuItem>
              <MenuItem sx={MenuItems} value="lb">
                lb
              </MenuItem>
              <MenuItem sx={MenuItems} value="kg">
                kg
              </MenuItem>
              <MenuItem sx={MenuItems} value="mah">
                mah
              </MenuItem>
              <MenuItem sx={MenuItems} value="w">
                w
              </MenuItem>
              <MenuItem sx={MenuItems} value="pixels">
                pixels
              </MenuItem>
              <MenuItem sx={MenuItems} value="hz">
                hz
              </MenuItem>
              <MenuItem sx={MenuItems} value="db">
                db
              </MenuItem> */}
            </Select>
            {/* <Typography sx={ErrorStyle}>{errors["List"]?.message}</Typography> */}
          </Box>
          {/* <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
      {errors?.ProductSize?.message}
    </Typography> */}
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.length?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.height?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.width?.message}
          </Typography>
        </Box>
      );
    case "Weight":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            Weight <span style={{ color: "red" }}> *</span>
          </Typography>

          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
              border: props?.errors?.weight?.message ? "1px solid red" : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("weight")}
              id="standard-basic"
              variant="standard"
              placeholder="Weight"
              type="number"
              InputProps={{
                inputProps: { min: 0 },
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
              defaultValue={"oz"}
              {...props.register("measureMentUnit")}
            >
              {unitsForWeight?.map((unit) => {
                return (
                  <MenuItem sx={MenuItems} value={unit}>
                    {unit}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.weight?.message}
          </Typography>
        </Box>
      );
    case "BatteryCapacity":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            Battery Capacity <span style={{ color: "red" }}> *</span>
          </Typography>

          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
              border: props?.errors?.batteryCapacity?.message
                ? "1px solid red"
                : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("batteryCapacity")}
              id="standard-basic"
              variant="standard"
              placeholder=""
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...props.register("listPeriod")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
              defaultValue={"mAh"}
              {...props.register("measureMentUnit")}
            >
              {unitsForBatteryCapacity?.map((unit) => {
                return (
                  <MenuItem sx={MenuItems} value={unit}>
                    {unit}
                  </MenuItem>
                );
              })}
              {/* <MenuItem sx={MenuItems} value="db">
                db
              </MenuItem> */}
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.batteryCapacity?.message}
          </Typography>
        </Box>
      );
    case "PowerConsumption":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "160px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            Power Consumption <span style={{ color: "red" }}> *</span>
          </Typography>

          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
              border: props?.errors?.powerConsumption?.message
                ? "1px solid red"
                : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("powerConsumption")}
              id="standard-basic"
              variant="standard"
              placeholder=""
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...props.register("listPeriod")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
              defaultValue={"W"}
              {...props.register("measureMentUnit")}
            >
              {unitsForPowerConsumption?.map((unit) => {
                return (
                  <MenuItem sx={MenuItems} value={unit}>
                    {unit}
                  </MenuItem>
                );
              })}
              {/* <MenuItem sx={MenuItems} value="db">
                db
              </MenuItem> */}
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.powerConsumption?.message}
          </Typography>
        </Box>
      );
    case "volume":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            volume <span style={{ color: "red" }}> *</span>
          </Typography>

          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
              border: props?.errors?.volume?.message ? "1px solid red" : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("volume")}
              id="standard-basic"
              variant="standard"
              placeholder="Volume"
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              {...props.register("volume")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
              defaultValue={"ml"}
              {...props.register("measureMentUnit")}
            >
              {unitsOfVolumes?.map((unit) => {
                return (
                  <MenuItem sx={MenuItems} value={unit}>
                    {unit}
                  </MenuItem>
                );
              })}
              {/* <MenuItem sx={MenuItems} value="db">
                db
              </MenuItem> */}
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.volume?.message}
          </Typography>
        </Box>
      );

    case "Custom Size":
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>
            Size <span style={{ color: "red" }}> *</span>
          </Typography>

          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
              border: props?.errors?.length?.message ? "1px solid red" : null,
            }}
          >
            <TextField
              {...props.register("length")}
              id="standard-basic"
              variant="standard"
              placeholder="amount"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
                borderRight: "0.5px solid grey",
              }}
            />
            <TextField
              // value={data.size}
              {...props.register("measureMentUnit")}
              id="standard-basic"
              variant="standard"
              placeholder="unit"
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...props.register("listPeriod")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
                borderRadius: "0px 10px 10px 0px",
              }}
            />
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.length?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.measureMentUnit?.message}
          </Typography>
        </Box>
      );
    default:
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          {/* {if(props.size === "Length"){
      return(
        "props.size"
      )
    }} */}
          <Typography sx={CommonTextStyle}>
            Size <span style={{ color: "red" }}> *</span>
          </Typography>
          {/* <Input
      disableUnderline
      // value={data.size}

      {...register("ProductSize")}
      sx={{
        width: "139px",
        height: "42px",
        background: "#FFFFFF",
        borderRadius: "10px",
        fontSize: "12px",
        color: "#445FD2",
        px: 1,
      }}
    /> */}
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
              // value={data.size}
              {...props.register("length")}
              id="standard-basic"
              variant="standard"
              placeholder=""
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...props.register("listPeriod")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
              defaultValue={"in"}
              {...props.register("measureMentUnit")}
            >
              <MenuItem sx={MenuItems} value="in">
                in
              </MenuItem>
              <MenuItem sx={MenuItems} value="cm">
                cm
              </MenuItem>
              <MenuItem sx={MenuItems} value="oz">
                oz
              </MenuItem>
              <MenuItem sx={MenuItems} value="g">
                g
              </MenuItem>
              <MenuItem sx={MenuItems} value="gb">
                gb
              </MenuItem>
              <MenuItem sx={MenuItems} value="tb">
                tb
              </MenuItem>
              <MenuItem sx={MenuItems} value="lb">
                lb
              </MenuItem>
              <MenuItem sx={MenuItems} value="kg">
                kg
              </MenuItem>
              <MenuItem sx={MenuItems} value="mah">
                mah
              </MenuItem>
              <MenuItem sx={MenuItems} value="w">
                w
              </MenuItem>
              <MenuItem sx={MenuItems} value="pixels">
                pixels
              </MenuItem>
              <MenuItem sx={MenuItems} value="hz">
                hz
              </MenuItem>
              <MenuItem sx={MenuItems} value="db">
                db
              </MenuItem>
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.length?.message}
          </Typography>
        </Box>
      );
  }
}
