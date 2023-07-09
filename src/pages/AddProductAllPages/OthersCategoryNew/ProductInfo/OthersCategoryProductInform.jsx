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
const unitsForVolume = ["ml", "oz", "l", "cu ft"];
const unitsForShelfLife = ["days", "months"];
const UnitsOfTemprature = ["C", "F"];
const UnitsOfNutritonValue = ["g", "%DV", "tonne", "kg", "g", "mlg", "mig"];

export default function ElectronicsTextileProductInform(props) {
  console.log("propsHere =====>", props);
  const ProductId = useParams().id;
  const navigate = useNavigate();
  console.log("ProductId", ProductId);

  const [sampleAvailability, setSampleAvailability] = useState();

  // const [minOrder, setMinOrder] = useState();
  const [showContent, setShowContent] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowContent(event.target.checked);
  };
  const [selected, SetSelected] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [storehsn, setStorehsn] = useState();
  const [customhsnFields, setCustomHSNFields] = useState(false);
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
        // flavor: z.string().min(1),
        // ProductSize: z.string().min(1),
        GST: z.any(),
        HSN: z.string().min(1),
        ProductIdType: z.string().min(1),
        PricePerUnit: z.coerce.number().gte(1),
        DiscountedPrice: z.coerce.number().gte(1),
        MinOrderQuantity: z.coerce.number().gte(1),
        MaxOrderQuantity: z.coerce.number().gte(1),
        // productSize: z.string().optional(),
        // ProductSize: z.any(),
        // length: z.any(),
        // width: z.string().optional(),
        // height: z.string().optional(),
        // measureMentUnit: z.string().min(1),
        // listPeriod: z.any(),
        // weight: z.string().optional(),

        sampleavailability: showContent
          ? z.coerce.number().gte(1)
          : z.coerce.number().optional(),
        priceofsample: showContent
          ? z.coerce.number().gte(1)
          : z.coerce.number().optional(),
        // volume: z.string().optional(),
        // calories: z.string().optional(),
        // shelfLife: z.string().optional(),
        // nutritioninfo: z.string().optional(),
        // temprature: z.string().optional(),
      })
      // z.object({
      //   sampleavailability: z.number().min(1),
      //   priceofsample: z.number().min(1),
      // })
    ),
  });
  console.log("errors from inside =====>", errors);
  let GST = 0;

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
    {
      !props?.HSNData
        ? setValue("GST", 0)
        : props?.HSNData?.filter((item) => {
            return item.HSN === storehsn;
          })?.map((item, index) => {
            GST = item.GST;
          });
    }
  }, [GST, storehsn]);
  // useEffect(() => {
  //   setValue("ProductColor", color);
  //   // setValue("GST", GST);
  // }, [color]);
  // console.log("GST", GST);
  // useEffect(() => {
  //   setValue("length", "");
  //   setValue("height", "");
  //   setValue("width", "");
  //   setValue("volume", "");
  //   setValue("calories", "");
  //   setValue("sampleavailability", 0);
  //   setValue("priceofsample", 0);
  //   setValue("nutritioninfo", "");
  //   setValue("shelfLife", "");
  //   setValue("temprature", "");
  // }, []);

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
          <Typography sx={CommonTextStyle}>MRP</Typography>
          <Input
            disableUnderline
            {...register("PricePerUnit")}
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
          <Typography sx={CommonTextStyle}>Discounted Price</Typography>
          <Box sx={{ position: "relative" }}>
            <Input
              disableUnderline
              // value={data.discount}

              {...register("DiscountedPrice")}
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
        {/* <SizeChart size={props.size} register={register} /> */}
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
                    width: "100px",
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
                {errors?.GST?.message}
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
                        width: "70px",
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
                          // required={true}
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
                    <Input
                      disableUnderline
                      // required={true}
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
                <Input
                  disableUnderline
                  // required={true}
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
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            mt: 1,
            maxWidth: "140px",
          }}
        >
          <Typography sx={CommonTextStyle}>Product ID Type</Typography>
          <Input
            disableUnderline
            {...register("ProductIdType")}
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
            {errors?.ProductIdType?.message}
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
          <Typography sx={CommonTextStyle}>Price per Unit</Typography>

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
            />
          </Box>

          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors?.PricePerUnit?.message}
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

          <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
            {errors?.MaxOrderQuantity?.message}
          </Typography>
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
                  <Typography sx={CommonTextStyle}>
                    Min order Quantity
                  </Typography>
                  <Input
                    disableUnderline
                    {...register("sampleavailability")}
                    sx={{
                      width: "145px",
                      height: "42px",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      fontSize: "12px",
                      color: "#445FD2",
                      px: 1,
                    }}
                  />
                  <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                    {errors?.sampleavailability?.message}
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
                  <Typography sx={CommonTextStyle}> Price of sample</Typography>
                  <Box sx={{ position: "relative" }}>
                    <Input
                      disableUnderline
                      {...register("priceofsample")}
                      sx={{
                        width: "145px",
                        height: "42px",
                        background: "#FFFFFF",
                        borderRadius: "10px",
                        fontSize: "12px",
                        color: "#445FD2",
                        px: 1,
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
                    {errors?.priceofsample?.message}
                  </Typography>
                </Box>
              </Box>
            )}
          </FormGroup>
        </Box>
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
              Number(getValues().MaxOrderQuantity) <
              Number(getValues().MinOrderQuantity)
            ) {
              setError("MaxOrderQuantity", {
                type: "custom",
                message:
                  "Max Order Quantity can not be less than Min Order Quantity",
              });
            } else if (
              Number(getValues().PricePerUnit) <
              Number(getValues().DiscountedPrice)
            ) {
              setError("PricePerUnit", {
                type: "custom",
                message: "PricePerUnit can not be less than DiscountedPrice",
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

              props.append(getValues(), props.index);
              reset({
                flavor: "",
                // ProductSize: z.string().min(1),
                GST: "",
                HSN: "",
                ProductIdType: "",
                PricePerUnit: "",
                DiscountedPrice: "",
                MinOrderQuantity: "",
                MaxOrderQuantity: "",
                // productSize: z.string().optional(),
                ProductSize: "",

                // weight: z.string().optional(),

                sampleavailability: "",
                priceofsample: "",
              });
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
          Add
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
          <Typography sx={CommonTextStyle}>Nutritional Information</Typography>

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
