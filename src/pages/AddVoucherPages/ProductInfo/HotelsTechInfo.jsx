import {
  Box,
  // Paper,
  Typography,
  TextField,
  Button,
  BottomNavigation,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import React, { useEffect, useState, useRef } from "react";
import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DeleteIcon from "../../../../assets/Images/CommonImages/DeleteIcon.svg";

import { zodResolver } from "@hookform/resolvers/zod";
import UploadtoCloud from "../../../../assets/UploadtoCloud.svg";
export default function HotelsTechInfo() {
  const ProductId = useParams().id;
  const navigate = useNavigate();
  const [files, setFiles] = useState(null);
  const inputRef = useRef();
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };
  const handleUpload = () => {
    setFiles(files);
  };
  const [selectedValue, setSelectedValue] = useState("");
  const handleChangeone = (event) => {
    setSelectedValue(event.target.value);
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(
      z.object({
        TermConditions: z.string().min(1),
        Exclusions: z.string().min(1),
        Inclusions: z.string().min(1),
        RedemptionSteps: z.string().min(1),
        Address: z.string().min(1),
        Area: z.string().min(1),
        Landmark: z.string().min(1),
        City: z.string().min(1),
        State: z.string().min(1),
        Link: z.string().optional(),
      })
    ),
  });
  const {
    mutate: updateProduct,
    isLoading,
    isError,
    data: recievedproductData,
    reset,
    error: RegisterError,
  } = useUpdateProductQuery();

  function handleConsole() {
    // console.log("getValues", getValues());
    const ProductUpdatedata = {
      // id: ProductId,
      // ProductsVariantions: getValues()?.ProductsVariantions,
      // OtherCost: OthercostFields,
      // ProductFeatures: items,
    };
    // if (
    //   ProductUpdatedata.ProductsVariantions.length === 0 ||
    //   ProductUpdatedata.ProductFeatures.length === 0
    // ) {
    //   return toast.error("Please Fill All The Neccessary Fields", {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // } else {
    //   updateProduct(ProductUpdatedata, {
    //     onSuccess: (response) => {
    //       if (response.status === 200) {
    //         // navigate(`/home/hotels/hotelstechinfo/${id}`);
    //       }
    //     },
    //     onError: (error) => {
    //       console.log("error", error);
    //     },
    //   });
    //   console.log("ProductUpdatedata here", ProductUpdatedata);
    // }
  }
  const techinfoStatus = handleSubmit((data) => {
    console.log("datahereofsubmit", data);
    console.log("files", files);
    var formData = new FormData();

    // for (let i = 0; i < files.length; i++) {
    // }
    formData.append("HotelLocations", files);
    Object.entries(data).map(([key, value]) => {
      console.log("key", key, "value", value);
      return formData.append(key, value);
    });
    formData.append("id", ProductId);
    formData.append("redemptionType", selectedValue);

    console.log("datahereofsubmit", formData);
    // for (const value of formData.values()) {
    //   console.log(value);
    // }
    console.log("datahereofsubmit", formData);
    updateProduct(formData, {
      onSuccess: (response) => {
        console.log("response", response);
        if (response.status === 200) {
          navigate(`/home/hotels/hotelsgolive/${ProductId}`);
        }
      },
    });
  });

  const lineText = [
    {
      text: "Lorem ipsum dolor sit amet consectetur. ",
    },
    {
      text: "Tortor commodo nec sit amet. ",
    },
    {
      text: "Eget ornare et et enim leo ac sed nascetur. ",
    },
    {
      text: " Pulvinar vitae vitae sed id non volutpat risus elit.",
    },
  ];
  return (
    <form onSubmit={techinfoStatus}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "716px",
          height: "auto",
        }}
      >
        <Box
          sx={{
            px: "30px",
            height: "auto",
            maxHeight: "490px",
            background: "#FAFBFD",
            overflow: "scroll",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#FAFBFD",
              width: "100%",
              mx: "auto",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              py: "10px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: {
                  xs: "18px",
                  sm: "16px",
                  md: "16px",
                  lg: "14px",
                  xl: "14px",
                },
                color: "#6B7A99",
              }}
            >
              Technical Information
            </Typography>
            <Box
              component="img"
              src={InfoIcon}
              sx={{ width: "28px", height: "auto", cursor: "pointer" }}
            />
          </Box>

          <Box sx={{ display: "grid", gap: "10px", py: "10px" }}>
            <Typography sx={TypographyStyle}>Inclusions</Typography>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={4}
              variant="standard"
              placeholder="Inclusions"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "blue",
                  fontSize: "14px",
                  padding: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              {...register("Inclusions")}
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   setProductData({
              //     ...productData,
              //     instructionstouseproduct: e.target.value,
              //   });
              // }}
              sx={textfieldstyle}
            />
            <Typography sx={ErrorStyle}>
              {errors["Inclusions"]?.message}
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gap: "10px", py: "10px" }}>
            <Typography sx={TypographyStyle}>Exclusions </Typography>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={4}
              variant="standard"
              placeholder="Exclusions"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "blue",
                  fontSize: "14px",
                  padding: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              {...register("Exclusions")}
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   setProductData({
              //     ...productData,
              //     instructionstouseproduct: e.target.value,
              //   });
              // }}
              sx={textfieldstyle}
            />
            <Typography sx={ErrorStyle}>
              {errors["Exclusions"]?.message}
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gap: "10px", py: "10px" }}>
            <Typography sx={TypographyStyle}>Terms & Conditions</Typography>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={4}
              variant="standard"
              placeholder="Terms & Conditions "
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "blue",
                  fontSize: "14px",
                  padding: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              {...register("TermConditions")}
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   setProductData({
              //     ...productData,
              //     instructionstouseproduct: e.target.value,
              //   });
              // }}
              sx={textfieldstyle}
            />
            <Typography sx={ErrorStyle}>
              {errors["TermConditions"]?.message}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: 12,
                color: "#6B7A99",
              }}
            >
              Redemption Steps
            </Typography>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={4}
              variant="standard"
              placeholder="Redemption Steps"
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "blue",
                  fontSize: "14px",
                  padding: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              {...register("RedemptionSteps")}
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   setProductData({
              //     ...productData,
              //     instructionstouseproduct: e.target.value,
              //   });
              // }}
              sx={textfieldstyle}
            />
            <Typography sx={ErrorStyle}>
              {errors["RedemptionSteps"]?.message}
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                textAlign: "left",
                marginTop: "45px",
                color: "#6B7A99",
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "21px",
              }}
            >
              How can it be redeemed by buyer ?
            </Typography>
          </Box>
          <Box>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={handleChangeone}
              value={selectedValue}
              sx={{
                justifyContent: "start",
                gap: "40px",
                width: "100%",
                mx: "auto",
              }}
            >
              <FormControlLabel
                value="online"
                control={<Radio />}
                label="Online"
                style={{
                  color: selectedValue === "online" ? "#445FD2" : "#ADB8CC",
                }}
              />
              <FormControlLabel
                value="offline"
                control={<Radio />}
                label="Offline"
                style={{
                  color: selectedValue === "offline" ? "#445FD2" : "#ADB8CC",
                }}
              />

              <FormControlLabel
                value="both"
                control={<Radio />}
                label="Both"
                style={{
                  color: selectedValue === "both" ? "#445FD2" : "#ADB8CC",
                }}
              />
            </RadioGroup>

            {/* /***********************************online*************************************** */}

            {selectedValue === "online" && (
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                {/* <TextField
                  focused
                  label="Add URL"
                  multiline
                  variant="standard"
                  placeholder="Link"
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    startAdornment: (
                      <Typography sx={{ marginLeft: "inherit" }}></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: "blue",
                      marginTop: "25px",
                      fontWeight: "bold",
                      fontSize: "12px",
                      width: "97%",
                      marginLeft: "10px",
                      height: "41px",
                      background: "#FFFFFF",
                      borderRadius: "9px",
                    },
                  }}
                /> */}
                {/* <Typography
                  sx={{
                    mt: 1,
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#6B7A99",
                  }}
                >
                  Add URL{" "}
                </Typography> */}
                {/* <a href="" style={{ textDecoration: "none" }}>
                  link
                </a> */}
                <TextField
                  focused
                  {...register("Link")}
                  label="Add URL"
                  multiline
                  variant="standard"
                  placeholder="  Link"
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    startAdornment: (
                      <Typography sx={{ marginLeft: "inherit" }}></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "25px",
                      marginLeft: "0px",
                      fontSize: "12px",
                      height: "41px",
                      background: "#FFFFFF",
                      borderRadius: "9px",
                    },
                  }}
                />
                {/* Link */}
              </Box>
            )}

            {/* /***********************************offline*************************************** */}

            {selectedValue === "offline" && (
              <Box>
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TextField
                    focused
                    label="Address ( If Single ) Type Below"
                    {...register("Address")}
                    multiline
                    variant="standard"
                    placeholder="   Address "
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),
                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "30px",
                        marginLeft: "0px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TextField
                    focused
                    {...register("Area")}
                    label="Area"
                    multiline
                    variant="standard"
                    placeholder="   Area "
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),
                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "25px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TextField
                    focused
                    {...register("Landmark")}
                    label="Landmark"
                    multiline
                    variant="standard"
                    placeholder="   Landmark"
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),

                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "25px",
                        marginLeft: "0px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TextField
                    focused
                    {...register("City")}
                    label="City"
                    multiline
                    variant="standard"
                    placeholder="  City"
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),
                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "25px",
                        marginLeft: "0px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TextField
                    focused
                    {...register("State")}
                    label="State"
                    multiline
                    variant="standard"
                    placeholder="   State"
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),
                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "25px",
                        marginLeft: "0px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "14px",
                      color: "#6B7A99",
                      mt: "2%",
                      textAlign: "left",
                    }}
                  >
                    Upload Store List ( If Multiple Locations)
                  </Typography>
                </Box>

                <Box
                  sx={{
                    // marginTop : "15px" ,
                    border: "2px dashed #445FD2",
                    width: "auto",
                    maxWidth: "670px",
                    p: 3,
                    mt: "3%",

                    position: "relative",
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <Box
                    sx={{
                      display: "grid",
                      width: "60%",
                      mx: " auto",
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        justifyContent: "center",
                        alignItems: "center",
                        tetxAlign: "center",
                      }}
                    >
                      <Box
                        component="img"
                        src={UploadtoCloud}
                        sx={{
                          position: "absolute",
                          left: "10%",
                        }}
                      />
                      <Typography
                        onClick={() => inputRef.current.click()}
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "10px",
                          color: "#6B7A99",
                          cursor: "pointer",
                          "&:hover": {
                            color: "blue",
                          },
                        }}
                      >
                        Drag & Drop upload or browse to choose a file
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Mulish",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "8px",
                          color: "#676767",
                          textAlign: "center",
                        }}
                      >
                        Supported format : JPEG, PNG, XLSX
                      </Typography>
                    </Box>
                  </Box>

                  <input
                    type="file"
                    // multiple
                    onChange={(event) => {
                      console.log("event Here", event.target.files[0]);
                      setFiles(event.target.files[0]);
                    }}
                    hidden
                    // accept="*"
                    ref={inputRef}
                  />
                </Box>

                {files ? (
                  <Box
                    sx={{
                      width: "90%",
                      my: "2%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "10px",
                        color: "#6B7A99",
                      }}
                    >
                      Uploaded
                    </Typography>
                    {/* {Array?.from(files)?.map((file, idx) => ( */}
                    <Box
                      sx={{
                        background: "#fff",
                        border: "1px solid green",
                        borderRadius: "9px",
                        height: "42px",
                        width: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        my: "10px",
                        px: "8px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "10px",
                          color: "#6B7A99",
                        }}
                      >
                        {files?.name}
                      </Typography>
                      <Box
                        component="img"
                        src={DeleteIcon}
                        sx={{
                          height: "20px",
                          width: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setFiles(null);
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  " "
                )}
                {/*  */}
              </Box>
            )}

            {/* /***********************************Both*************************************** */}
            {selectedValue === "both" && (
              <Box>
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TextField
                    focused
                    {...register("Address")}
                    label="Address ( If Single ) Type Below"
                    multiline
                    variant="standard"
                    placeholder="   Address "
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),
                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "30px",
                        marginLeft: "0px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TextField
                    focused
                    {...register("Area")}
                    label="Area"
                    multiline
                    variant="standard"
                    placeholder="   Area "
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),
                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "25px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TextField
                    focused
                    {...register("Landmark")}
                    label="Landmark"
                    multiline
                    variant="standard"
                    placeholder="   Landmark"
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),

                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "25px",
                        marginLeft: "0px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TextField
                    focused
                    {...register("City")}
                    label="City"
                    multiline
                    variant="standard"
                    placeholder="  City"
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),
                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "25px",
                        marginLeft: "0px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  <TextField
                    focused
                    {...register("State")}
                    label="State"
                    multiline
                    variant="standard"
                    placeholder="   State"
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),
                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "25px",
                        marginLeft: "0px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    // marginTop : "15px" ,
                    border: "2px dashed #445FD2",
                    width: "auto",
                    maxWidth: "670px",
                    p: 3,
                    mt: "3%",

                    position: "relative",
                  }}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <Box
                    sx={{
                      display: "grid",
                      width: "60%",
                      mx: " auto",
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        justifyContent: "center",
                        alignItems: "center",
                        tetxAlign: "center",
                      }}
                    >
                      <Box
                        component="img"
                        src={UploadtoCloud}
                        sx={{
                          position: "absolute",
                          left: "10%",
                        }}
                      />
                      <Typography
                        onClick={() => inputRef.current.click()}
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "10px",
                          color: "#6B7A99",
                          cursor: "pointer",
                          "&:hover": {
                            color: "blue",
                          },
                        }}
                      >
                        Drag & Drop upload or browse to choose a file
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Mulish",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "8px",
                          color: "#676767",
                          textAlign: "center",
                        }}
                      >
                        Supported format : JPEG, PNG, XLSX
                      </Typography>
                    </Box>
                  </Box>

                  <input
                    type="file"
                    multiple
                    onChange={(event) => {
                      console.log("event Here", event.target.files[0]);
                      setFiles(event.target.files[0]);
                    }}
                    hidden
                    accept=".png,.jpeg,.xlsx"
                    ref={inputRef}
                  />
                </Box>
                {/* {files ? console.log("files", files) : " "} */}
                {files ? (
                  <Box
                    sx={{
                      width: "90%",
                      my: "2%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "10px",
                        color: "#6B7A99",
                      }}
                    >
                      Uploaded
                    </Typography>
                    {/* {Array?.from(files)?.map((file, idx) => ( */}
                    <Box
                      sx={{
                        background: "#fff",
                        border: "1px solid green",
                        borderRadius: "9px",
                        height: "42px",
                        width: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        my: "10px",
                        px: "8px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "10px",
                          color: "#6B7A99",
                        }}
                      >
                        {files?.name}
                      </Typography>
                      <Box
                        component="img"
                        src={DeleteIcon}
                        sx={{
                          height: "20px",
                          width: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setFiles(null);
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  " "
                )}
                {/* {files ? (
                  <div>
                    <ol>
                      {Array?.from(files)?.map((file, idx) => (
                        <li key={idx}>{file?.name}</li>
                      ))}
                    </ol>
                    <div>
                      <button onClick={() => setFiles(0)}>Cancel</button>
                      <button onClick={handleUpload}>Upload</button>
                    </div>
                  </div>
                ) : (
                  " "
                )} */}
                <Box
                  sx={{
                    justifyContent: "flex-start",
                  }}
                >
                  {/* <TextField
                    focused
                    label="Add URL"
                    multiline
                    variant="standard"
                    placeholder="Link"
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),
                      style: {
                        fontFamily: "Poppins",
                        color: "blue",
                        marginTop: "25px",
                        marginLeft: "7px",
                        fontWeight: "bold",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  /> */}
                  {/* <Typography
                    sx={{
                      mt: 1,
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#6B7A99",
                    }}
                  >
                    Add URL{" "}
                  </Typography> */}
                  <TextField
                    focused
                    {...register("Link")}
                    label="Add URL "
                    multiline
                    variant="standard"
                    placeholder="  Link"
                    sx={lablechange}
                    InputLabelProps={{
                      style: {
                        color: "#6B7A99",
                        fontSize: "20px",
                        fontFamily: "Poppins",
                      },
                    }}
                    InputProps={{
                      disableUnderline: true,
                      endAdornment: (
                        <Typography
                          variant="body1"
                          style={{ fontFamily: "Poppins" }}
                        ></Typography>
                      ),
                      startAdornment: (
                        <Typography sx={{ marginLeft: "inherit" }}></Typography>
                      ),
                      style: {
                        fontFamily: "Poppins",
                        color: " #6B7A99",
                        marginTop: "25px",
                        marginLeft: "0px",
                        fontSize: "12px",
                        height: "41px",
                        background: "#FFFFFF",
                        borderRadius: "9px",
                      },
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              width: "100%",
              mx: "auto",
              height: "100%",
              bgcolor: "transparent",
              marginBottom: "21px",
            }}
          >
            <BottomNavigation
              sx={{
                display: "flex",
                justifyContent: "space-between",
                bgcolor: "#FAFBFD",
                p: "10px",
              }}
              showLabels
            >
              <Typography
                sx={{
                  marginRight: "auto",
                  p: "2%",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  color: "#6B7A99",
                  fontSize: 14,
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Box
                  component="img"
                  sx={{ width: "23px", height: "23px" }}
                  src={RedoIcon}
                  alt=""
                />
                Reset to Defaults
              </Typography>
              <Box sx={{ display: "flex", gap: "10px", p: 1, width: "50%" }}>
                <Button
                  sx={{
                    width: "100%",
                    height: "32px",
                    borderRadius: "10px",
                    background: "#fff",
                    color: "#636161",
                    fontSize: "14px",
                    "&:hover": {
                      background: "#FAFBFD",
                      color: "#000",
                    },
                  }}
                  variant="contained"
                >
                  cancel
                </Button>
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    height: "32px",
                    borderRadius: "10px",
                    background: "#445FD2",
                    fontSize: "14px",
                    "&:hover": {
                      background: "#445FD2",
                    },
                  }}
                  variant="contained"
                  onClick={handleConsole}
                >
                  Next
                </Button>
              </Box>
            </BottomNavigation>
          </Box>
        </Box>
      </Box>
    </form>
  );
}

const textfieldstyle = {
  width: "100%",
  height: "100px",
  background: "#FFFFFF",
  borderRadius: "10px",
  color: "red",
  fontSize: "14px",
};

const lablechange = {
  fontFamily: "Poppins",
  color: "#6B7A99",
  fontSize: "12px",
  display: "grid",
  textAlign: "left",
  marginTop: "2rem",
  fontWeight: "bold",
  "&:focus": {
    border: "1px solid #E8E8E8",
  },
};

const MenuItems = {
  fontSize: "12px",
  color: "#6B7A99",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
};

const TypographyStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#6B7A99",
};

const ErrorStyle = {
  color: "red",
};
