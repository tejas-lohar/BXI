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
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@mui/material/styles";
import { Form } from "react-hook-form";
import Bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";

const showSizesToRender = {
  "usShoeSizes": ['',
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
    49, 50,
  ],
  "ukShoeSizes": [
    '',2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10.5, 11, 11.5,
  ],
  "EuShoeSizes": ['',35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48]
}
export default function LifestyleProductInform(props) {
  console.log("propsHere =====>", props);
  const ProductId = useParams().id;
  // const [shoeSizeCountry, setShoeSizeCountry] = useState(usShoeSizes);
  const navigate = useNavigate();
  console.log("ProductId", ProductId);
  console.log("props", props.size);
  const [data, setData] = useState(props?.HSNData);
  const [storehsn, setStorehsn] = useState();
  const [customhsnFields, setCustomHSNFields] = useState(false);

  const [sampleAvailability, setSampleAvailability] = useState();

  // const [minOrder, setMinOrder] = useState();
  const [showContent, setShowContent] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowContent(event.target.checked);
  };
  const [selected, SetSelected] = useState(false);
  console.log("==============>", selected);
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
        GST: z.string().min(1),
        HSN: z.string().min(1),
        // ProductIdType: z.string().min(1),
        PricePerUnit: z.string().min(1),
        // DiscountedPrice: z.string().min(1),
        MinOrderQuantity: z.string().min(1),
        MaxOrderQuantity: z.string().min(1),
        validityOfVoucherValue: z.string().min(1),
        validityOfVoucherUnit: z.string().min(1),
        length:
          props.size === "Length" ||
            props.size === "Length x Height" ||
            props.size === "Length x Height x Width" ||
            props.size === "Custom Size"
            ? z.string().min(1)
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
          props.size === "Custom Size" ? z.string().min(1) : z.any(),
        listPeriod: z.any(),
        ShoeSize:
          props.size === "Shoes"
            ? z.coerce.number().optional()
            : z.string().optional(),
        // sampleavailability: showContent ? z.string().min(1) : z.any(),
        // priceofsample: showContent ? z.string().min(1) : z.any(),
      })
      // z.object({
      //   sampleavailability: showContent
      //     ? z.number().gte(1)
      //     : z.number().optional(),
      //   priceofsample: showContent ? z.number().gte(1) : z.number().optional(),
      // })
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
  let GST = 0;
  // let sampleavailability = getValues().sampleavailability;
  // let priceofsample = getValues().priceofsample;
  let length = getValues().length;
  let ShoeSize = getValues().ShoeSize;

  console.log("values", getValues());
  function stopPropagate(callback) {
    return (e) => {
      e.stopPropagation();
      callback();
    };
  }
  props?.HSNData?.filter((item) => {
    return item.HSN === storehsn;
  })?.map((item, index) => {
    GST = item.GST;
  });
  useEffect(() => {
    setValue("ProductColor", color);
    setValue("height", "");
    setValue("width", "");
    setValue("GST", GST);
    setValue("length", length ? length : "");
    // setValue("sampleavailability", 0);
    // setValue("priceofsample", 0);
    setValue("ShoeSize", ShoeSize);
    // setValue("", "");
  }, [color, GST]);

  console.log("GST", GST);
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
            {...register("ProductColor", {
              onChange: (e) => {
                setColor(e.target.value);
              },
            })}
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
            // onChange={(e) => {
            //   setColor(e.target.value);
            // }}
            // {...register("ProductSize")}
            {...register("ProductColor", {
              onChange: (e) => {
                setColor(e.target.value);
              },
            })}
            sx={{
              width: "139px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              px: 1,
              color: "#445fd2",
            }}
          />
        </Box>
        {/* {errors?.ProductColor?.message} */}
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.ProductColor?.message}
        </Typography>
      </Box>

      {props?.HSNData ? (
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
                // required={true}
                {...register("HSN", {
                  onChange: (e) => {
                    setStorehsn(e.target.value);
                  },
                })}
                style={{
                  width: "139px",
                  height: "42px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  px: 1,
                  fontSize: "12px",
                  color: "#445FD2",
                }}
              >
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
                  value={"custom"}
                  onClick={() => {
                    setCustomHSNFields(true);
                    reset({
                      HSN: "",
                    });
                  }}
                >
                  custom hsn
                </MenuItem>
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
                        onClick={() => {
                          setCustomHSNFields(false);
                        }}
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
          {customhsnFields === false ? (
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
                    // required={true}
                    placeholder="GST"
                    sx={{
                      width: "130px",
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
                    onKeyDown={(e) => {
                      if (e.key === " " && e.target.selectionStart === 0) {
                        e.preventDefault();
                      }
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
                        // required={true}
                        value={item.GST}
                        sx={{
                          width: "130px",
                          height: "42px",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                          px: 1,
                          fontSize: "12px",
                          color: "#445FD2",
                        }}
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.selectionStart === 0) {
                            e.preventDefault();
                          }
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
                    fontSize: "15px",
                    color: "#445FD2",
                  }}
                >
                  %
                </Typography>
              </Box>
              <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                {errors?.GST?.message}
              </Typography>

              {/* <Typography>{errors["GST"]?.message}</Typography> */}
            </Box>
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
                <Typography sx={CommonTextStyle}>Custom HSN</Typography>

                <Box sx={{ position: "relative" }}>
                  <Input
                    disableUnderline
                    // required={true}
                    {...register("HSN")}
                    sx={{
                      width: "130px",
                      height: "42px",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      px: 1,
                      fontSize: "12px",
                      color: "#445FD2",
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
                <Typography sx={CommonTextStyle}>GST</Typography>

                <Box sx={{ position: "relative" }}>
                  <Input
                    disableUnderline
                    // required={true}
                    {...register("GST")}
                    sx={{
                      width: "130px",
                      height: "42px",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      px: 1,
                      fontSize: "12px",
                      color: "#445FD2",
                    }}
                    onKeyDown={(e) => {
                      if (e.key === " " && e.target.selectionStart === 0) {
                        e.preventDefault();
                      }
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
                // required={true}
                {...register("HSN")}
                sx={{
                  width: "130px",
                  height: "42px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  px: 1,
                  fontSize: "12px",
                  color: "#445FD2",
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
            <Typography sx={CommonTextStyle}>GST</Typography>

            <Box sx={{ position: "relative" }}>
              <Input
                disableUnderline
                // required={true}
                {...register("GST")}
                sx={{
                  width: "130px",
                  height: "42px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  px: 1,
                  fontSize: "12px",
                  color: "#445FD2",
                }}
                onKeyDown={(e) => {
                  if (e.key === " " && e.target.selectionStart === 0) {
                    e.preventDefault();
                  }
                }}
              />

              <Typography
                sx={{
                  position: "absolute",
                  right: "10%",
                  bottom: "20%",
                  color: "#979797",
                  fontSize: "15px",
                  color: "#445FD2",
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
        <Typography sx={CommonTextStyle}>Price per Unit</Typography>

        <Box sx={{ position: "relative" }}>
          <Input
            disableUnderline
            // pattern="^[\d,]+$"
            // value={data.mro}
            placeholder="1000"
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
        <Typography sx={CommonTextStyle}>Min Order Quantity</Typography>

        <Input
          disableUnderline
          // value={data.minimum}
          placeholder="1"
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
        <Typography sx={CommonTextStyle}> Max Order Quantity</Typography>

        <Input
          disableUnderline
          // value={data.maximum}
          placeholder="100"
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
      <Box
        sx={{
          width: "auto",
          maxWidth: "138px",
          height: "45px",
          mt: "1%",
          px: 1,
          borderRadius: "10px",
        }}
      >
        <Typography sx={CommonTextStyle}>Validity of Voucher</Typography>
        <TextField
          {...register("validityOfVoucherValue")}
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
            width: "33%",
            height: "100%",
            background: "#FFFFFF",
            borderRadius: "10px 0px 0px 10px",
            px: 1,
          }}
        />
        <Select
          sx={{
            width: "50%",
            borderRadius: "0px 10px 10px 0px",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: 0,
            },
            background: "#FFFFFF",
            height: "100%",
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "21px",
            color: "#6B7A99",
          }}
          defaultValue="Month"
          {...register("validityOfVoucherUnit")}
        >
          <MenuItem value="Month" sx={CommonTextStyle}>
            Month
          </MenuItem>
          <MenuItem value="Year" sx={CommonTextStyle}>
            Year
          </MenuItem>
        </Select>
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
          {errors?.validityOfVoucherValue?.message}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          // mt: 1,
          minWidth: "140px",
        }}
      >
        <SizeChart
          size={props.size}
          register={register}
          errors={errors}
        // shoeSizeCountry={shoeSizeCountry}
        />
      </Box>

      <Box
        sx={{
          p: 1,
          mt: 2,
          width: "100%",
        }}
      >

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
            } else {
              if (props?.HSNData && customhsnFields === false) {
                props?.HSNData?.filter((item) => {
                  return item.HSN === storehsn;
                })?.map((item, index) => {
                  GST = item.GST;
                });
                setValue("GST", GST);
              }
              if (props.size === "Length x Height x Width") {
                setValue(
                  "ProductSize",
                  `${getValues().length}${getValues().measureMentUnit} x ${getValues().height
                  }${getValues().measureMentUnit} x ${getValues().width}${getValues().measureMentUnit
                  }`
                );
              } else if (props.size === "Length x Height") {
                setValue(
                  "ProductSize",
                  `${getValues().length}${getValues().measureMentUnit} x ${getValues().height
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
              } else if (props.size === "Shoes") {
                setValue("ProductSize", `${getValues().ShoeSize}`);
              }
              console.log(getValues(), "getValues");
              props.append(getValues(), props.index);
              reset();
            }
            // if (selected === ""){

            // }
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
  console.log("size", props.size, props?.errors?.length?.message);
  const [shoeSizeCountry, setShoeSizeCountry] = useState();

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
          <Typography sx={CommonTextStyle}>Size</Typography>
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
              <MenuItem sx={MenuItems} value="gsm">
                gsm
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
          <Typography sx={CommonTextStyle}>Size</Typography>
          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: 1,
              mx: "auto",
              borderRadius: "10px",
              // background: "red",
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
              {...props.register("measureMentUnit")}

            // {...register("ListPeriod")}
            >
              <MenuItem sx={MenuItems} value="in">
                in
              </MenuItem>
              <MenuItem sx={MenuItems} value="cm">
                cm
              </MenuItem>
              <MenuItem sx={MenuItems} value="gsm">
                gsm
              </MenuItem>
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
          <Typography sx={CommonTextStyle}>Size</Typography>
          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: 1,
              mx: "auto",
              borderRadius: "10px",
              // background: "red",
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
              <MenuItem sx={MenuItems} value="gsm">
                gsm
              </MenuItem>
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
    case "Shoes":
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
          <Typography sx={CommonTextStyle}>Size</Typography>

          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
              display: "flex",
            }}
          >
            <Select
              sx={{
                ...GW,
                borderRadius: "10px 0px 0px 10px",
                borderRight: "0.5px solid grey",
              }}
              // defaultValue={usShoeSizes}
              onChange={(e) => {
                setShoeSizeCountry(e.target.value);
              }}
            >
              <MenuItem sx={MenuItems} value={'usShoeSizes'}>
                US
              </MenuItem>
              <MenuItem sx={MenuItems} value={'ukShoeSizes'}>
                UK
              </MenuItem>
              <MenuItem sx={MenuItems} value={'EuShoeSizes'}>
                EU
              </MenuItem>
            </Select>

            <Select sx={GW} defaultValue={"30"} {...props.register("ShoeSize")}>
              {
                shoeSizeCountry && showSizesToRender[shoeSizeCountry].map((item, idx) => {
                  return (
                    <MenuItem sx={MenuItems} value={item}>
                      {item}
                    </MenuItem>
                  );
                })
              }
              {/* {shoeSizeCountry?.map((item, idx) => {
                return (
                  <MenuItem sx={MenuItems} value={item}>
                    {item}
                  </MenuItem>
                );
              })} */}
            </Select>
          </Box>
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
            <TextField
              {...props.register("length")}
              id="standard-basic"
              variant="standard"
              placeholder="Value"
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
                borderRight: "0.5px solid grey",
                borderRadius: "10px 0px 0px 10px",
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
              <MenuItem sx={MenuItems} value="gsm">
                gsm
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
