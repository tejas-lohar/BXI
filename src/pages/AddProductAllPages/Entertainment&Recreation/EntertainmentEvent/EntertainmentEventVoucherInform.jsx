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
const lengthSizearr = ["mm", "cm", "m", "km", "in", "ft", "yd", "mi", "nmi"];
const SizesXLarr = [
  "xs",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
  "XXXXL",
  "XXXXXL",
  "plus",
];
const NumericslSizeArr = [
  26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52,
];
export default function EntertainmentEventVoucherInform(props) {
  console.log("propsHere =====>", props);
  const ProductId = useParams().id;
  const navigate = useNavigate();
  console.log("ProductId", ProductId);
  console.log("props", props.size);
  const [data, setData] = useState(props?.HSNData);
  const [sampleAvailability, setSampleAvailability] = useState();
  const [StoreGst, setStoreGST] = useState();
  const [customhsnFields, setCustomHSNFields] = useState(false);
  // const [minOrder, setMinOrder] = useState();
  const [showContent, setShowContent] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowContent(event.target.checked);
  };
  const [storehsn, setStorehsn] = useState();
  const [selected, SetSelected] = useState(false);
  const [color, setColor] = useState("#ffffff");
  // const [textTileDetails, setTextilesDetails] = useState({
  //   size: "",
  //   color: "",
  //   gst: "",
  //   idtype: "",
  //   mrp: "",
  //   discount: "",
  //   minimum: "",
  //   maximum: "",
  // });
  // console.log("textTileDetails", textTileDetails);
  let GST = 0;

  console.log("StoreGstStoreGst", StoreGst);
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
        // ProductColor: z.string().length(7),
        // ProductSize: z.any(),
        DateOfTheEvent: z.string().optional(),
        // ProductIdType: z.string().min(1),
        GST: z.coerce.number().gte(1),
        HSN: z.string().min(1),
        PricePerUnit: z.string().min(1),
        QTY: z.string().min(1),
        MinOrderQuantity: z.string().min(1),
        MaxOrderQuantity: z.string().min(1),

      })
      // z.object({
      //   sampleavailability: z.number().min(1),
      //   priceofsample: z.number().min(1),
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
    setValue("sampleavailability", 0);
    setValue("priceofsample", 0);
    setValue(
      "ProductSize",
      getValues("height") + getValues("width") + getValues("length")
    );
  }, [color]);
  // props?.HSNData?.filter((item) => {
  //   return item.HSN === storehsn;
  // })?.map((item, index) => {
  //   GST = item.GST;
  // });
  useEffect(() => {
    setValue("GST", GST);
  }, [GST, props?.HSNData]);
  console.log("GST,GST", GST);


  const formatDate = () => {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
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
          gap: "10px",
          px: 2,
          py: 2,
        }}
      >

        {props?.HSNData ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2px",
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
                    width: "130px",
                    height: "42px",
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    px: 1,
                    fontSize: "12px",
                    color: "#445FD2",
                    border: errors["HSN"] ? "1px solid red" : null,
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
                      border: errors["HSN"] ? "1px solid red" : null,
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
                            border: errors["HSN"] ? "1px solid red" : null,
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
                        border: errors["GST"] ? "1px solid red" : null,
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
                            border: errors["GST"] ? "1px solid red" : null,
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
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
        )}

        {/* <Box
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
              height: "42px",
              mt: "1%",
              borderRadius: "10px",
            }}
          >
            <TextField
              // value={data.size}
              {...register("ProductSize")}
              id="standard-basic"
              variant="standard"
              placeholder=""
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
                width: "45%",
                height: "100%",
                background: "#FFFFFF",
                borderRadius: "10px 0px 0px 10px",
              }}
            />

            <Select
              sx={GW}
              defaultValue={"in"}
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
          </Box>
        </Box> */}

        {
          localStorage.getItem("digitalData") == "Offer Specific" &&
          <Box sx={boxStyle2} >
            <Typography sx={CommonTextStyle}>Date of the Event</Typography>
            <Box sx={box3} >
              <TextField type="date" id="standard-basic" variant="standard"
                defaultValue={formatDate()}
                {...register("DateOfTheEvent")}
                InputProps={{
                  disableUnderline: "true",
                  style: {
                    color: "rgba(68, 95, 210, 1)",
                    fontSize: "14px",
                    padding: "7px",
                    background: "transparent",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "red",
                  },
                }}
                sx={{
                  width: "auto",
                  height: "100%",
                  background: "#fff",
                  borderRadius: "10px",
                }}
              />
            </Box>

          </Box>
        }


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
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>Discounted Price</Typography>
          <Box sx={{ position: "relative" }}>
            <Input
              disableUnderline
              // value={data.discount}
              placeholder="900"
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
          <Typography sx={CommonTextStyle}>QTY</Typography>

          <Input
            disableUnderline
            // value={data.minimum}
            placeholder="1"
            {...register("QTY", {
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
              border: errors["QTY"] ? "1px solid red" : null,
            }}
          />
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors?.QTY?.message}
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
            maxWidth: "135px",
          }}
        >
          <Typography sx={{ ...CommonTextStyle, fontSize: "13.5px" }}>
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

        {/* <SizeChart size={props.size} register={register} errors={errors} /> */}

        {/* <Box
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
              {props?.HSNData?.map((item, index) => {
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
        </Box> */}

        <Box
          sx={{
            p: 1,
            mt: 2,
            width: "100%",
          }}
        >

        </Box>
      </Box>
      <Box>
        {console.log(props.size, "errors")}
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
              } else if (props.size === "Size S to 3XL") {
                setValue("ProductSize", `${getValues().measureMentUnit}`);
              } else if (props.size === "Size 26 to 42") {
                setValue("ProductSize", `${getValues().measureMentUnit}`);
              } else if (props.size === "GSM") {
                setValue(
                  "ProductSize",
                  `${getValues().length}${getValues().measureMentUnit}`
                );
              }
              console.log(getValues(), "getValues");
              props.append(getValues(), props.index);
              // reset();
              reset((formValues) => ({
                formValues,
                PricePerUnit: "",
                QTY: "",
                MinOrderQuantity: "",
                MaxOrderQuantity: "",
                sampleavailability: "",
                priceofsample: "",
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
              defaultValue={"in"}
              {...props.register("measureMentUnit")}
            >
              {/* <MenuItem sx={MenuItems} value="in">
                in
              </MenuItem>
              <MenuItem sx={MenuItems} value="cm">
                cm
              </MenuItem>
              <MenuItem sx={MenuItems} value="gsm">
                gsm
              </MenuItem> */}
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
              defaultValue={"in"}
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
        </Box>
      );
    case "Size S to 3XL":
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
            {/* <TextField
              // value={data.size}
              // value={}
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
            /> */}

            <Select
              sx={{ ...GW, width: "150%", borderRadius: "10px 10px 10px 10px" }}
              defaultValue={"S"}
              {...props.register("measureMentUnit")}
            >
              {SizesXLarr?.map((item, idx) => {
                return (
                  <MenuItem sx={MenuItems} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </Box>
      );
    case "Size 26 to 42":
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
            {/* <TextField
              // value={data.size}
              // value={}
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
            /> */}

            <Select
              sx={{ ...GW, width: "150%", borderRadius: "10px 10px 10px 10px" }}
              defaultValue={"28"}
              {...props.register("measureMentUnit")}
            >
              {NumericslSizeArr?.map((item, idx) => {
                return (
                  <MenuItem sx={MenuItems} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
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
              defaultValue={"gsm"}
              {...props.register("measureMentUnit")}
            >
              <MenuItem sx={MenuItems} value="gsm">
                gsm
              </MenuItem>
              <MenuItem sx={MenuItems} value="oz">
                oz
              </MenuItem>
              <MenuItem sx={MenuItems} value="sqyard">
                sq yard
              </MenuItem>
            </Select>
          </Box>
          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {props?.errors?.length?.message}
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

            {/* <Select
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
            </Select> */}
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


const boxStyle2 = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  mt: 1,
  maxWidth: "140px",
}
const box3 = {
  borderRadius: "10px",
  background: "white",
  width: "139px",
  height: "42px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
}