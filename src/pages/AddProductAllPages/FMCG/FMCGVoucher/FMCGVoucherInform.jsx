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
import { map, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@mui/material/styles";
import { Form } from "react-hook-form";
import Bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";
const lengthSizearr = ["", "mm", "cm", "m", "km", "in", "ft", "yd", "mi", "nmi"];
const unitsForVolume = ["ml", "oz", "l", "cu ft"];
const unitsForShelfLife = ["days", "months", "Years"];
const UnitsOfTemprature = ["C", "F"];
const UnitsOfNutritonValue = ["g", "%DV", "tonne", "kg", "g", "mlg", "mig"];




export default function FMCGVoucherInform(props) {
  const [StoreGst, setStoreGST] = useState();
  const [customhsnFields, setCustomHSNFields] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [storehsn, setStorehsn] = useState();
  const [selected, SetSelected] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [TotalValueUploaded, setTotalValueUploaded] = useState()

  let GST = 0;

  const schema = z.object({
    flavor: localStorage.getItem("digitalData") === "Offer Specific" ? z.string().min(1) : z.string().optional(),
    ProductSize: z.any(),
    GST: z.coerce.number().min(1).max(99, "GST can not be in 3 digits"),
    HSN: z.string().min(1).max(6),
    validityOfVoucherValue: z.coerce.number().min(1).max(365),
    validityOfVoucherUnit: z.string().min(1),
    PricePerUnit: z.string().min(1).max(10),
    MinOrderQuantity: z.string().min(1).max(10),
    MaxOrderQuantity: z.string().min(1).max(10),
    TotalAvailableQty: z.string().min(1).max(10),
    TotalValueUploaded: z.string().optional(),
    length: localStorage.getItem("digitalData") === "Offer Specific" ?
      props.size === "Length" ||
        props.size === "Length x Height" ||
        props.size === "Length x Height x Width" ||
        props.size === "Custom Size"
        ? z.string().min(1)
        : z.string().optional() : z.string().optional(),
    width:
      props.size === "Length x Height x Width"
        ? z.string().min(1)
        : z.string().optional(),
    height:
      props.size === "Length x Height" ||
        props.size === "Length x Height x Width"
        ? z.string().min(1)
        : z.string().optional(),
    measureMentUnit: localStorage.getItem("digitalData") === "Offer Specific" ? z.string().min(1, "Please select Unit.") : z.string().optional(),
    listPeriod: z.any(),
    volume:
      props.size === "Volume" ? z.string().min(1) : z.string().optional(),
    calories:
      props.size === "CalorieCount"
        ? z.string().min(1)
        : z.string().optional(),
    shelfLife:
      props.size === "ShelfLife"
        ? z.string().min(1)
        : z.string().optional(),
    nutritioninfo:
      props.size === "NutritionalInformation"
        ? z.string().min(1)
        : z.string().optional(),
    temprature:
      props.size === "Temprature"
        ? z.string().min(1)
        : z.string().optional(),
  })


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    trigger,
    setError,
    formState: { errors, isValid },
    watch
  } = useForm({
    resolver: zodResolver(schema),
  });


  const watchTotalAvailableQty = watch('TotalAvailableQty', '');
  const watchPricePerUnit = watch('PricePerUnit', '');



  useEffect(() => {
    if (props.defaultValue == null) {
      return;
    }
    // setValue(props.defaultValue);
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

  useEffect(() => {
    // setValue("ProductColor", color);
    setValue("height", "");
    setValue("width", "");
    setValue("measureMentUnit", "");
    setValue(
      "ProductSize",
      getValues("height") + getValues("width") + getValues("length")
    );
  }, [color]);


  useEffect(() => {
    updateTotalUploadedPrice({ TotalAvailableQty: watchTotalAvailableQty, PricePerUnit: watchPricePerUnit });
  }, [watchTotalAvailableQty, watchPricePerUnit]);


  const updateTotalUploadedPrice = () => {
    const TotalAvailableQty = parseFloat(watchTotalAvailableQty.replace(/,/g, ''));
    const PricePerUnit = parseFloat(watchPricePerUnit.replace(/,/g, ''));
    const total = isNaN(TotalAvailableQty) || isNaN(PricePerUnit) ? '' : (TotalAvailableQty * PricePerUnit);
    setTotalValueUploaded(total.toLocaleString("en-US"))
  }

  return (
    <Box>

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
          gap: "5px",
          px: 2,
          py: 2,
        }}
        className="voucher-variations"
      >

        {/* price per unit start */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>Price/Voucher</Typography>

          <Box sx={{ position: "relative" }}>
            <Input
              disableUnderline
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
            />
          </Box>

          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors?.PricePerUnit?.message}
          </Typography>
        </Box>
        {/* price per unit ends */}

        {/* Total Available QTY start */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>Total Available QTY</Typography>

          <Input
            disableUnderline
            // value={data.minimum}
            placeholder="1"
            {...register("TotalAvailableQty", {
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
              border: errors["TotalAvailableQty"] ? "1px solid red" : null,
            }}
          />
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors?.TotalAvailableQty?.message}
          </Typography>
        </Box>

        {/* Total Available QTY ends */}



        {/* min order start */}
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

        {/* min order ends */}


        {/* Max order starts */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "135px",
          }}
        >
          <Typography sx={{ ...CommonTextStyle }}>
            {" "}
            Max order Quantity
          </Typography>

          <Input
            disableUnderline
            // value={data.maximum}
            placeholder="1000"
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

        {/* Max order end */}

        {/* Total Uploaded value starts */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "148px",
          }}
        >
          <Typography sx={{ ...CommonTextStyle }}>
            Total Uploaded value
          </Typography>

          <Input
            disableUnderline
            name="TotalValueUploaded"
            // value={data.maximum}
            {...register("TotalValueUploaded", {
              onChange: (event) => {
                event.target.value = parseInt(
                  event.target.value.replace(/[^\d]+/gi, "") || 0
                ).toLocaleString("en-US");
              },
            })}
            placeholder="1000"
            disabled
            value={TotalValueUploaded}
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


        </Box>

        {/* Total Uploaded value end */}



        {/* HSN GST start */}
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
                placeholder="998346"
                {...register("HSN")}
                sx={{
                  width: "130px",
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
            <Typography sx={CommonTextStyle}>GST</Typography>

            <Box sx={{ position: "relative" }}>
              <Input
                disableUnderline
                // required={true}
                placeholder="5"
                {...register("GST")}
                sx={{
                  width: "130px",
                  height: "42px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  px: 1,
                  fontSize: "12px",
                  color: "#445FD2",
                  border: errors["GST"] ? "1px solid red" : null,
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
                onKeyDown={(e) => {
                  if (e.key === " " && e.target.selectionStart === 0) {
                    e.preventDefault();
                  }
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
        {/* HSN GST end */}


        {/* color box start */}
        {localStorage.getItem("digitalData") === "Offer Specific" &&
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: 1,
              maxWidth: "140px",
            }}
          >
            <Typography sx={CommonTextStyle}>Flavor</Typography>
            <Input
              disableUnderline
              placeholder="Butterscotch"
              {...register("flavor")}
              sx={{
                width: "139px",
                height: "42px",
                background: "#FFFFFF",
                borderRadius: "10px",
                fontSize: "12px",
                color: "#445FD2",
                px: 1,
                border: errors["flavor"] ? "1px solid red" : null,
              }}
            />
            <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
              {errors?.flavor?.message}
            </Typography>
          </Box>
        }

        {/* color box end */}

        {
          localStorage.getItem("digitalData") === "Offer Specific" && <SizeChart size={props.size} register={register} errors={errors} />
        }



        {/* validity start */}
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
              placeholder="validity"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "#445FD2",
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
              defaultValue="days"
              {...register("validityOfVoucherUnit")}
            >
              <MenuItem sx={MenuItems} value="days">
                days
              </MenuItem>
              {/* <MenuItem sx={MenuItems} value="months">
                months
              </MenuItem> */}
              {/* <MenuItem sx={MenuItems} value="years">
              years
            </MenuItem> */}
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors?.validityOfVoucherValue?.message}
          </Typography>
        </Box>
        {/* validity ends */}

      </Box>


      <Box>
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
              parseFloat(getValues().TotalAvailableQty.replace(/,/g, "")) <
              parseFloat(getValues().MaxOrderQuantity.replace(/,/g, ""))
            ) {
              setError("MaxOrderQuantity", {
                type: "custom",
                message:
                  "Max Order Quantity can not be greater than Total Quantity",
              });
            } else {

              if (localStorage.getItem("digitalData") === "Offer Specific") {
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
                } else if (props.size === "Volume") {
                  setValue(
                    "ProductSize",
                    `${getValues().volume}${getValues().measureMentUnit}`
                  );
                } else if (props.size === "CalorieCount") {
                  setValue(
                    "ProductSize",
                    `${getValues().calories}${getValues().measureMentUnit}`
                  );
                } else if (props.size === "ShelfLife") {
                  setValue(
                    "ProductSize",
                    `${getValues().shelfLife}${getValues().measureMentUnit}`
                  );
                } else if (props.size === "NutritionalInformation") {
                  setValue(
                    "ProductSize",
                    `${getValues().nutritioninfo}${getValues().measureMentUnit}`
                  );
                } else if (props.size === "Temprature") {
                  setValue(
                    "ProductSize",
                    `${getValues().temprature}${getValues().measureMentUnit}`
                  );
                }
              }

              setValue("TotalValueUploaded", parseFloat(TotalValueUploaded.replace(/,/g, "")))
              console.log(getValues(), "getValues");
              props.append(getValues(), props.index);
              // reset();
              reset((formValues) => ({
                formValues,
                PricePerUnit: "",
                // DiscountedPrice: "",
                MinOrderQuantity: "",
                MaxOrderQuantity: "",
                TotalAvailableQty: "",
                length: "",
                height: "",
                width: "",
                weight: "",
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
  fontSize: "12px",
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

const GW = {
  width: "55%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  background: "#fff",
  height: "100%",
  color: "#445FD2",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  borderRadius: "0px 10px 10px 0px",
};

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
              placeholder="L"
              type="number"
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...props.register("listPeriod")}
              InputProps={{
                disableUnderline: "true",
                inputProps: { min: 0 },
                style: {
                  color: "#445FD2",
                  fontSize: "12px",
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

              {...props.register("measureMentUnit")}
            >

              {lengthSizearr?.map((item, idx) => {
                return (
                  <MenuItem sx={MenuItems} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.length?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.measureMentUnit?.message}
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

              {...props.register("measureMentUnit")}
            >
              {lengthSizearr?.map((item, idx) => {
                return (
                  <MenuItem sx={MenuItems} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
            {/* <Typography sx={ErrorStyle}>{errors["List"]?.message}</Typography> */}
            <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
              {props?.errors?.measureMentUnit?.message}
            </Typography>
          </Box>

          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.length?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.height?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.measureMentUnit?.message}
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

              // {...register("ListPeriod")}
              {...props.register("measureMentUnit")}
            >
              {lengthSizearr?.map((item, idx) => {
                return (
                  <MenuItem sx={MenuItems} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
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
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.measureMentUnit?.message}
          </Typography>
        </Box>
      );
    case "Volume":
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
          <Typography sx={CommonTextStyle}>Volume</Typography>

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
              placeholder="volume"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "#445FD2",
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
              {unitsForVolume?.map((unit) => {
                return (
                  <MenuItem sx={MenuItems} value={unit}>
                    {unit}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.volume?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.measureMentUnit?.message}
          </Typography>
        </Box>
      );
    case "CalorieCount":
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
          <Typography sx={CommonTextStyle}>Calorie Count</Typography>

          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
              border: props?.errors?.calories?.message
                ? "1px solid red"
                : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("calories")}
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
                  color: "#445FD2",
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
              defaultValue={"cal"}
              {...props.register("measureMentUnit")}
            >
              {/* {unitsForBatteryCapacity?.map((unit) => {
                  return ( */}
              <MenuItem sx={MenuItems} value={"cal"}>
                cal
              </MenuItem>
              {/* ); */}
              {/* })} */}
              {/* <MenuItem sx={MenuItems} value="db">
                  db
                </MenuItem> */}
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.calories?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.measureMentUnit?.message}
          </Typography>
        </Box>
      );
    case "ShelfLife":
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
          <Typography sx={CommonTextStyle}>Shelf Life</Typography>

          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
              border: props?.errors?.shelfLife?.message
                ? "1px solid red"
                : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("shelfLife")}
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
                  color: "#445FD2",
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
              defaultValue={"days"}
              {...props.register("measureMentUnit")}
            >
              {unitsForShelfLife?.map((unit) => {
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
            {props?.errors?.shelfLife?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.measureMentUnit?.message}
          </Typography>
        </Box>
      );
    case "NutritionalInformation":
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
          <Typography sx={CommonTextStyle}>Nutritional</Typography>

          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
              border: props?.errors?.nutritioninfo?.message
                ? "1px solid red"
                : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("nutritioninfo")}
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
                  color: "#445FD2",
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
              defaultValue={"MB"}
              {...props.register("measureMentUnit")}
            >
              {UnitsOfNutritonValue?.map((unit) => {
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
            {props?.errors?.nutritioninfo?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.measureMentUnit?.message}
          </Typography>
        </Box>
      );
    case "Temprature":
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
          <Typography sx={CommonTextStyle}>Temprature</Typography>

          <Box
            sx={{
              width: "100%",
              // maxWidth: "1000px",
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
              border: props?.errors?.temprature?.message
                ? "1px solid red"
                : null,
            }}
          >
            <TextField
              // value={data.size}
              {...props.register("temprature")}
              id="standard-basic"
              variant="standard"
              placeholder="Temprature"
              // onChange={(e) => {
              //   setListPeriod(e.target.value);
              // }}
              // {...props.register("listPeriod")}
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "#445FD2",
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
              defaultValue={"PX"}
              {...props.register("measureMentUnit")}
            >
              {UnitsOfTemprature?.map((unit) => {
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
            {props?.errors?.temprature?.message}
          </Typography>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.measureMentUnit?.message}
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
          {/* {if(props.size === "Length"){
      return(
        "props.size"
      )
    }} */}
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
              placeholder="amount"
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
                borderRight: "0.5px solid rgba(107, 122, 153)",
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
        </Box>
      );
  }
}
