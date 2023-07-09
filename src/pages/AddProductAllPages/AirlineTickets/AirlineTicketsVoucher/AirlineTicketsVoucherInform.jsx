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
const unitsOfVolumes = ["ml", "oz", "L", "cu ft"];

export default function RestaurantQSRVoucherInform(props) {
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
  const [validityofvoucher, setValidityofVoucher] = useState("");
  console.log("propsHere =====>", props);
  const ProductId = useParams().id;
  const navigate = useNavigate();
  console.log("ProductId", ProductId);
  console.log("props", props.size);
  const [data, setData] = useState(props?.HSNData);
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
        ProductSize: z.string().optional(),
        HSN: z.coerce.number().gte(1),
        GST: z.coerce.number().optional(),
        PricePerUnit: z.coerce.number().gte(1),
        MinOrderQuantity: z.coerce.number().gte(1),
        MaxOrderQuantity: z.coerce.number().gte(1),
        TotalPrice: z.coerce.number().optional(),
        length: z.string().optional(),
        width: z.string().optional(),
        height: z.string().optional(),
        weight: z.string().optional(),
        GSM: z.string().optional(),
        measureMentUnit: z.string().optional(),
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
  // handle validation on next click
  useEffect(() => {
    if (props.nextClicked) {
      // document.getElementById("ProceedToAddButton").click();
    }
  }, [props.nextClicked]);
  let GST = 0;

  console.log("values", getValues());
  function stopPropagate(callback) {
    return (e) => {
      e.stopPropagation();
      callback();
    };
  }
  useEffect(() => {
    setValue("height", "");
    setValue("width", "");
    setValue("length", "");
    setValue("weight", "");
    setValue("GSM", "");
    setValue("sampleavailability", "");
    setValue("priceofsample", "");
    setValue("measureMentUnit", "");
  }, [color]);
  useEffect(() => {
    setValue("GST", GST);
  }, [GST]);
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
        justifyContent: "space-between",
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
        <Typography sx={CommonTextStyle}>Price Per Unit</Typography>

        <Box sx={{ position: "relative" }}>
          <Input
            disableUnderline
            // value={data.mro}

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
            alt="element"
          />
        </Box>
        {errors?.PricePerUnit?.message ? generateError() : ""}
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
                required={true}
                {...register("HSN", {
                  onChange: (e) => {
                    setStorehsn(e.target.value);
                  },
                })}
                style={{
                  width: "100px",
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
                              color: "#6B7A99",
                            }}
                          >
                            {item.HSN}
                          </Typography>
                        </MenuItem>
                      );
                    })}
              </Select>
            </Box>
            {/* {errors?.HSN?.message && isAddButtonClicked ? (
              <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                This field is required
              </Typography>
            ) : (
              ""
            )} */}
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
                  // value={item.GST}
                  // defaultValue={"0%"}
                  placeholder="GST"
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
                      value={item.GST}
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
                  );
                })
              )}
              {/* <Input
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
            /> */}
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
            {errors?.GST?.message ? generateError() : ""}
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
            {errors?.HSN?.message ? generateError() : ""}
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
            {errors?.GST?.message ? generateError() : ""}
          </Box>
        </>
      )}
      <Box
        sx={{
          width: "auto",
          maxWidth: "200px",
          height: "45px",
          mt: "1%",
          borderRadius: "10px",
        }}
      >
        <Typography sx={CommonTextStyle}>Validity of Voucher</Typography>
        <TextField
          {...register("validityOfVoucher")}
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
        {errors?.validityOfVoucher?.message ? generateError() : ""}
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
          // value={data.minimum}

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
        {errors?.MinOrderQuantity?.message ? generateError() : ""}
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
          // value={data.maximum}

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
        {errors?.MaxOrderQuantity?.message ? generateError() : ""}
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
        <Typography sx={CommonTextStyle}>Total Price</Typography>

        <Box sx={{ position: "relative" }}>
          <Input
            disableUnderline
            // value={data.mro}

            {...register("TotalPrice")}
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
            alt="element"
          />
        </Box>
        {errors?.TotalPrice?.message ? generateError() : ""}
      </Box>
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
        ></FormGroup>
        <Button
          // onClick={handleAdd}
          onClick={async () => {
            if ((await trigger()) === false) {
              // setIsAddButtonClicked(true);
              // if (
              //   !getValues().color ||
              //   !getValues().GST ||
              //   !getValues().HSN ||
              //   !getValues().validityOfVoucher ||
              //   !getValues().PricePerUnit ||
              //   !getValues().MinOrderQuantity ||
              //   !getValues().MaxOrderQuantity
              // ) {
              console.log("error");
              return;
              // }
            } else {
              // setIsAddButtonClicked(false);
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
            } else {
              if (props?.HSNData) {
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
                  "Weight",
                  `${getValues().weight}${getValues().measureMentUnit}`
                );
              } else if (props.size === "GSM") {
                setValue(
                  "GSM",
                  `${getValues().GSM}${getValues().measureMentUnit}`
                );
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
          id="ProceedToAddButton"
        >
          Proceed To Add
        </Button>
      </Box>
    </Box>
  );
}

const generateError = () => {
  return (
    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
      This field is required
    </Typography>
  );
};

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

const errorLableStyle = { fontFamily: "Poppins", color: "red" };

function SizeChart(props) {
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
            </Select>
          </Box>
          {/* {!props.values.length ? (
            <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
              This field is requried
            </Typography>
          ) : (
            ""
          )} */}
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
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...register("List")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...register("List")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
          {/* {!props.values.length || !props.values.height ? (
            <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
              This field is requried
            </Typography>
          ) : (
            ""
          )} */}
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
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...register("List")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...register("List")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...register("List")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
            </Select>
            {/* {!props.values.length ||
            !props.values.height ||
            !props.values.width ? (
              <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                This field is requried
              </Typography>
            ) : (
              ""
            )}{" "} */}
          </Box>
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
          <Typography sx={CommonTextStyle}>Weight</Typography>

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
              {...props.register("weight")}
              defaultValue={"g"}
              id="standard-basic"
              variant="standard"
              placeholder="Weight"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
            {/* {!props.values.weight ? generateError() : ""} */}
          </Box>
        </Box>
      );
    case "GSM":
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
          <Typography sx={CommonTextStyle}>GSM</Typography>

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
              {...props.register("GSM")}
              defaultValue={"g"}
              id="standard-basic"
              variant="standard"
              placeholder="GSM"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
            {/* {!props.values.GSM ? generateError() : ""} */}
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
              placeholder="amount"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "7px",
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
            <TextField
              // value={data.size}
              defaultValue={"in"}
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
          </Box>
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
        </Box>
      );
  }
}
