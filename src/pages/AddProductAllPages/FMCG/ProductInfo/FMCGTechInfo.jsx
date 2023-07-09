import {
  Box,
  // Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  Chip,
  Button,
  BottomNavigation,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Stack } from "@mui/system";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ToolTip from "../../../../components/ToolTip";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function ElectronicsTechInfo() {
  const ProductId = useParams().id;
  const navigate = useNavigate();
  const [Guarantee, setGuarantee] = useState("");
  const [Warranty, setWarranty] = useState("");
  const [weight, setweight] = useState("Grams");
  const [productDimentions, setProductDimentions] = useState({
    height: "",
    length: "",
    width: "",
  });
  const [productData, setProductData] = useState({
    weigthbeforepacking: "",
    weigthafterpacking: "",
    packaginganddeliveryinstructions: "",
    instructionstouseproduct: "",
  });

  // const handleAddTag = (event) => {
  //   if (event.key === "Enter" && event.target.value !== "") {
  //     event.preventDefault();
  //     setTags([...tags, event.target.value]);
  //     console.log(tags, "=====>");
  //     event.target.value = "";
  //   }
  // };

  // const [currentTag, setCurrentTag] = useState();
  // const [tags, setTags] = useState([]);
  // const handleAddTag = (event) => {
  //   if (event.key === "Enter" && event.target.value !== "") {
  //     event.preventDefault();
  //     if (tags?.includes(event.target.value)) {
  //       // event.target.value = "";
  //       return;
  //     } else {
  //       setTags([...tags, event.target.value]);
  //       console.log(tags, "=====>");
  //       event.target.value = "";
  //     }
  //   }
  // };
  // const handleAddButtonClick = (event) => {
  //   if (!currentTag) {
  //     return;
  //   } else {
  //     if (tags?.includes(currentTag)) {
  //       event.target.value = "";
  //       return;
  //     } else {
  //       setTags([...tags, currentTag]);
  //       console.log(tags, "=====>");
  //       // setCurrentTag(null);
  //     }
  //   }
  // };
  const [tags, setTags] = useState([]);
  const tagInputRef = useRef(null);

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentTag = e.target.value.trim();
      if (currentTag !== "") {
        setTags([...tags, currentTag]);
        tagInputRef.current.value = "";
      }
    }
  };

  const handleAddButtonClick = () => {
    const currentTag = tagInputRef.current.value.trim();
    if (currentTag !== "") {
      setTags([...tags, currentTag]);
      tagInputRef.current.value = "";
    }
  };
  const handleDeleteTag = (tagToDelete) => () => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(
      z.object({
        // Guarantee: z.coerce.number().gte(1),
        // GuaranteePeriod: z.string().min(1),
        // Warranty: z.coerce.number().gte(1),
        // WarrantyPeriod: z.string().min(1),
        // Height: z.coerce.number().gte(1),
        // heightMeasuriUnit: z.string().min(1),
        // Length: z.coerce.number().gte(1),
        // lengthMeasuriUnit: z.string().min(1),
        // Width: z.coerce.number().gte(1),
        // widthMeasuriUnit: z.string().min(1),
        WeightBeforePackingPerUnit: z.coerce.number().gte(1),
        WeightBeforePackingPerUnitMeasurUnit: z.string().min(1),
        // WeightAfterPackingPerUnit: z.coerce.number().gte(1),
        // WeightAfterPackingPerUnitMeasurUnit: z.string().min(1),
        // PackagingAndDeliveryInstructions: z.string().min(1),
        // InstructionsToUseProduct: z.string().min(1),
        PackagingInfoPerUnit: z.string().min(1),
        LegalInformation: z.string().min(1),
      })
    ),
    defaultValues: {
      // Guarantee: "",
      // Warranty: "",
      // Height: "",
      // Length: "",
      // Width: "",
      WeightBeforePackingPerUnit: "",
      // WeightAfterPackingPerUnit: "",
      // PackagingAndDeliveryInstructions: "",
      // InstructionsToUseProduct: "",
      PackagingInfoPerUnit: "",
      LegalInformation: "",
    },
  });
  useEffect(() => {
    console.log("This iS Errors", errors);
  });
  const {
    mutate: updateProduct,
    isLoading,
    isError,
    data: recievedproductData,
    // reset,
    error: RegisterError,
  } = useUpdateProductQuery();
  const FetchTechInfo = async () => {
    await axios
      .get("/product/get_product_byId/" + ProductId)
      .then((response) => {
        console.log("response", response?.data);
        setProductData(response?.data);
        setValue(
          "LegalInformation",
          response?.data?.ProductTechInfo?.LegalInformation
        );
        setValue(
          "PackagingInfoPerUnit",
          response?.data?.ProductTechInfo?.PackagingInfoPerUnit
        );
        setValue(
          "WeightBeforePackingPerUnit",
          response?.data?.ProductTechInfo?.WeightBeforePackingPerUnit
        );
        // setValue(
        //   "PackagingAndDeliveryInstructions",
        //   response?.data?.ProductTechInfo?.PackagingAndDeliveryInstructionsIfAny
        // );
        // setValue(
        //   "InstructionsToUseProduct",
        //   response?.data?.ProductTechInfo?.InstructionsToUseProduct
        // );

        setTags([...tags, ...response?.data?.ProductTechInfo?.Tags]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    FetchTechInfo();
  }, []);
  const createCompany = handleSubmit((ProductTechInfo) => {
    console.log("getValues", getValues());
    console.log("data here", ProductTechInfo);
    console.log(
      ProductTechInfo.PackagingInfoPerUnit,
      ProductTechInfo.LegalInformation,
      "legal nameeeeeeeeee"
    );
    if (
      Number(ProductTechInfo?.WeightAfterPackingPerUnit) <
      Number(ProductTechInfo?.WeightBeforePackingPerUnit)
    ) {
      return toast.error(
        "Weight after packing is must be greater than Weight before packing",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else if (tags?.length === 0) {
      console.log("tags", tags);
      return toast.error("Please add-atleast one Tag", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // setError({
      //   type:"manual",
      //   message:"Please select atleast one tag"
      // })
    } else {
      updateProduct(
        {
          id: ProductId,
          UnitOfMeasurement: "CM",
          UnitOfWeight: "KiloGrams",
          UnitOfTime: "Month",
          ProductTechInfo: {
            // Height:
            //   ProductTechInfo.heightMeasuriUnit === "CM"
            //     ? ProductTechInfo.Height
            //     : Number(ProductTechInfo.Height) * 100,

            // Length:
            //   ProductTechInfo.lengthMeasuriUnit === "CM"
            //     ? ProductTechInfo?.Length
            //     : Number(ProductTechInfo?.Length) * 100,
            // Width:
            //   ProductTechInfo.widthMeasuriUnit === "CM"
            //     ? ProductTechInfo?.Width
            //     : Number(ProductTechInfo?.Width) * 100,
            // Guarantee:
            //   ProductTechInfo?.GuaranteePeriod === "Month"
            //     ? Number(ProductTechInfo?.Guarantee)
            //     : Number(ProductTechInfo?.Guarantee) * 12,
            // Warranty:
            //   ProductTechInfo?.WarrantyPeriod === "Month"
            //     ? Number(ProductTechInfo?.Warranty)
            //     : Number(ProductTechInfo?.Warranty) * 12,
            WeightBeforePackingPerUnit:
              ProductTechInfo.WeightBeforePackingPerUnitMeasurUnit ===
              "KiloGrams"
                ? ProductTechInfo.WeightBeforePackingPerUnit
                : Number(ProductTechInfo.WeightBeforePackingPerUnit) / 1000,

            // WeightAfterPackingPerUnit:
            //   ProductTechInfo.WeightAfterPackingPerUnitMeasurUnit ===
            //   "KiloGrams"
            //     ? ProductTechInfo.WeightAfterPackingPerUnit
            //     : Number(ProductTechInfo.WeightAfterPackingPerUnit) / 1000,

            // PackagingAndDeliveryInstructionsIfAny:
            //   ProductTechInfo.PackagingAndDeliveryInstructions,
            // InstructionsToUseProduct: ProductTechInfo.InstructionsToUseProduct,
            PackagingInfoPerUnit: ProductTechInfo.PackagingInfoPerUnit,
            LegalInformation: ProductTechInfo.LegalInformation,
            Tags: tags,
            ProductUploadStatus: "golive",
          },
        },
        {
          onSuccess: (response) => {
            if (response.status === 200) {
              navigate(`/home/fmcg/fmcggolive/${ProductId}`);
            }
          },
          onError: (error) => {
            console.log("error", error);
          },
        }
      );
      // updateProduct(data, {
      //   onSuccess: (response) => {
      //     console.log("response", response);
      //   },
      // });
    }
  });
  return (
    <>

      <form onSubmit={createCompany}>
        <Box
          sx={{
            width: "100%",
            maxWidth: "716px",
            height: "auto",
          }}
        >
          <Box
            // sx={{
            //   overflow: "auto",
            //   "::-webkit-scrollbar": {
            //     display: "flex",
            //   },
            //   "::-webkit-scrollbar-thumb": {
            //     dynamic: "#8d8e90",
            //     minHeight: "10px",
            //     borderRadius: "8px",
            //   },
            //   "::-webkit-scrollbar-thumb:vertical": {
            //     miaxHeight: "10px",
            //   },
            //   maxHeight: "410px",
            //   height: "600px",
            // }}
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
                <ToolTip
                  info={
                    "Technical Information refers to specific details and specifications about a product's technical aspects, packaging Material, packing size, Dimensions, logistic or go live information for your offered product, This is Critical Information from Logistic & Buying Perspective for Making Informed Decisions"
                  }
                />
              </Box>
              <Box
              sx={{
                width: "100%",
                mt: 2,
                height: "100%",
                maxHeight: "400px",
                overflowY: "scroll",
              }}
            >
              <Stack
                sx={{
                  overflow: "auto",
                  "::-webkit-scrollbar": {
                    display: "flex",
                  },
                  "::-webkit-scrollbar-thumb": {
                    dynamic: "#8d8e90",
                    minHeight: "10px",
                    borderRadius: "8px",
                  },
                  "::-webkit-scrollbar-thumb:vertical": {
                    maxHeight: "30px",
                  },
                  maxHeight: "410px",
                  height: "600px",
                  p: 1,
                }}
              >

              {/* <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                width: "100%",
                gap: "10px",
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  width: "100%",
                  maxWidth: "290px",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={TypographyStyle}>Warranty</Typography>
                <Box
                  sx={{
                    width: "auto",
                    maxWidth: "500px",
                    height: "42px",
                    mt: "1%",
                    borderRadius: "10px",
                  }}
                >
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    placeholder="Warranty"
                    // onChange={(e) => {
                    //   setWarranty(e.target.value);
                    // }}
                    {...register("Warranty")}
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
                      width: "70%",
                      height: "100%",
                      background: "#FFFFFF",
                      borderRadius: "10px 0px 0px 10px",
                    }}
                  />

                  <Select
                    sx={GW}
                    defaultValue={"Year"}
                    {...register("WarrantyPeriod")}
                  >
                    <MenuItem sx={MenuItems} value="Year">
                      Year
                    </MenuItem>
                    <MenuItem sx={MenuItems} value="Month">
                      Month
                    </MenuItem>
                    <MenuItem sx={MenuItems} value="Days">
                      Days
                    </MenuItem>
                  </Select>
                  <Typography sx={ErrorStyle}>
                    {errors["Warranty"]?.message}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "grid", width: "100%", maxWidth: "290px" }}>
                <Typography sx={TypographyStyle}>Guarantee</Typography>
                <Box
                  sx={{
                    width: "auto",
                    maxWidth: "500px",
                    height: "42px",
                    mt: "1%",
                    // border: "1px solid black",
                    borderRadius: "10px 0px 0px 10px",
                  }}
                >
                  <TextField
                    variant="standard"
                    placeholder="Guarantee"
                    // onChange={(e) => {
                    //   setGuarantee(e.target.value);
                    // }}
                    {...register("Guarantee")}
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
                      width: "70%",
                      height: "100%",
                      background: "#FFFFFF",
                      borderRadius: "10px 0px 0px 10px",
                    }}
                  ></TextField>
                  <Select
                    sx={GW}
                    defaultValue={"Year"}
                    {...register("GuaranteePeriod")}
                  >
                    <MenuItem sx={MenuItems} value="Year">
                      Year
                    </MenuItem>
                    <MenuItem sx={MenuItems} value="Month">
                      Month
                    </MenuItem>
                    <MenuItem sx={MenuItems} value="Days">
                      Days
                    </MenuItem>
                  </Select>
                  <Typography sx={ErrorStyle}>
                    {errors["Guarantee"]?.message}
                  </Typography>
                </Box>
              </Box>
                  </Box> */}

              {/*   <Box
              sx={{
                display: "grid",
                // background: "pink",
                gap: "5px",
                py: "30px",
              }}
            >
              <Typography sx={TypographyStyle}>
              Packaging Information  
              </Typography>

            <Box
                sx={{
                  display: "flex",
                  // flexDirection: {
                  //   xl: "row",
                  //   lg: "row",
                  //   md: "row",
                  //   sm: "column",
                  //   xs:" column",
                  // },
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <Box sx={{ display: "grid", gap: "10px" }}>
                  <Typography sx={TypographyStyle}>Height</Typography>
                  <Box
                    sx={{
                      width: "auto",
                      maxWidth: "500px",
                      height: "42px",
                      // border: "1px solid black",
                      borderRadius: "10px 0px 0px 10px",
                    }}
                  >
                    <TextField
                      variant="standard"
                      placeholder="Height"
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
                        width: "60%",
                        height: "100%",
                        background: "#FFFFFF",
                        maxWidth: "113px",
                        minWidth: "113px",
                        borderRadius: "10px 0px 0px 10px",
                      }}
                      // onChange={(e) => {
                      //   {
                      //     console.log(e.target.value);

                      //     setProductDimentions({
                      //       ...productDimentions,
                      //       height: e.target.value,
                      //     });
                      //   }
                      // }}
                      {...register("Height")}
                    ></TextField>
                    <Select
                      sx={PD}
                      defaultValue={"CM"}
                      {...register("heightMeasuriUnit")}
                    >
                      <MenuItem sx={MenuItems} value="CM">
                        cm
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="M">
                        m
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="Fit">
                        fit
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="In">
                        in
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="Unit">
                        unit
                      </MenuItem>
                    </Select>
                    <Typography sx={ErrorStyle}>
                      {errors["Height"]?.message}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "grid" }}>
                  <Typography sx={TypographyStyle}>Length</Typography>
                  <Box
                    sx={{
                      width: "auto",
                      maxWidth: "500px",
                      height: "42px",
                      // border: "1px solid black",
                    }}
                  >
                    <TextField
                      variant="standard"
                      placeholder="Length"
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
                        maxWidth: "141px",
                        minWidth: "141px",
                      }}
                      sx={{
                        width: "60%",
                        height: "100%",
                        background: "#FFFFFF",
                        maxWidth: "113px",
                        minWidth: "113px",
                        borderRadius: "10px 0px 0px 10px",
                      }}
                      {...register("Length")}
                      // onChange={(e) => {
                      //   console.log(
                      //     "here ============================",
                      //     e.target.value
                      //   );
                      //   setProductDimentions({
                      //     ...productDimentions,
                      //     length: e.target.value,
                      //   });
                      // }}
                    ></TextField>
                    <Select
                      sx={PD}
                      defaultValue={"CM"}
                      {...register("lengthMeasuriUnit")}
                    >
                      <MenuItem sx={MenuItems} value="CM">
                        cm
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="M">
                        m
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="Fit">
                        fit
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="In">
                        in
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="Unit">
                        unit
                      </MenuItem>
                    </Select>
                    <Typography sx={ErrorStyle}>
                      {errors["Length"]?.message}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "grid" }}>
                  <Typography sx={TypographyStyle}>Breadth / Width</Typography>
                  <Box
                    sx={{
                      width: "auto",
                      maxWidth: "500px",
                      height: "42px",
                      // border: "1px solid black",
                    }}
                  >
                    <TextField
                      variant="standard"
                      placeholder="Breadth"
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
                        width: "60%",
                        height: "100%",
                        background: "#FFFFFF",
                        maxWidth: "113px",
                        minWidth: "113px",
                        borderRadius: "10px 0px 0px 10px",
                      }}
                      {...register("Width")}
                      // onChange={(e) => {
                      //   console.log(e.target.value);

                      //   setProductDimentions({
                      //     ...productDimentions,
                      //     width: e.target.value,
                      //   });
                      // }}
                    ></TextField>
                    <Select
                      sx={PD}
                      defaultValue={"CM"}
                      {...register("widthMeasuriUnit")}
                    >
                      <MenuItem sx={MenuItems} value="CM">
                        cm
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="M">
                        m
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="Fit">
                        fit
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="In">
                        in
                      </MenuItem>
                      <MenuItem sx={MenuItems} value="Unit">
                        unit
                      </MenuItem>
                    </Select>
                    <Typography sx={ErrorStyle}>
                      {errors["Width"]?.message}
                    </Typography>
                  </Box>
                </Box>
                    </Box> 
             </Box>  */}

              <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
                <Typography sx={TypographyStyle}>
                  Packaging Information
                </Typography>

                <Typography sx={TypographyStyle}>
                  Weight before packing per unit <span style={{ color: 'red' }}> *</span>
                </Typography>
                <Box
                  sx={{
                    width: "auto",
                    maxWidth: "710px",
                    height: "55px",
                    // border: "1px solid black",
                    borderRadius: "10px",
                    border: errors["WeightBeforePackingPerUnit"]
                      ? "1px solid red"
                      : null,
                  }}
                >
                  <TextField
                    id="standard-multiline-static"
                    variant="standard"
                    placeholder="70"
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
                    onKeyDown={(e) => {
                      if (e.key === " " && e.target.selectionStart === 0) {
                        e.preventDefault();
                      }
                    }}
                    sx={{
                      width: "80%",
                      height: "100%",
                      background: "#FFFFFF",
                      borderRadius: "10px 0px 0px 10px",
                    }}
                    {...register("WeightBeforePackingPerUnit")}
                    // onChange={(e) => {
                    //   console.log(e.target.value);

                    //   setProductData({
                    //     ...productData,
                    //     weigthbeforepacking: e.target.value,
                    //   });
                    // }}
                  ></TextField>
                  <Select
                    sx={{
                      ...packagingunit,
                      border: errors["WeightBeforePackingPerUnitMeasurUnit"]
                        ? "1px solid red"
                        : null,
                    }}
                    defaultValue={"Grams"}
                    {...register("WeightBeforePackingPerUnitMeasurUnit", {
                      onChange: (e) => {
                        setweight(e.target.value);
                        console.log("ewew", e.target.value);
                      },
                    })}
                  >
                    <MenuItem sx={MenuItems} value="Grams">
                      Grams
                    </MenuItem>
                    <MenuItem sx={MenuItems} value="KiloGrams">
                      KiloGrams
                    </MenuItem>
                  </Select>
                  <Typography sx={ErrorStyle}>
                    {errors["WeightBeforePackingPerUnit"]?.message}
                  </Typography>
                </Box>
              </Box>

              {/*  <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
              <Typography sx={TypographyStyle}>
                Weight after packing per unit
              </Typography>
              <Box
                sx={{
                  width: "auto",
                  maxWidth: "710px",
                  height: "55px",
                  // border: "1px solid black",
                }}
              >
                <TextField
                  id="standard-multiline-static"
                  variant="standard"
                  placeholder="  Weight after packing per unit"
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
                    width: "80%",
                    height: "100%",
                    background: "#FFFFFF",
                    borderRadius: "10px 0px 0px 10px",
                  }}
                  {...register("WeightAfterPackingPerUnit")}
                  // onChange={(e) => {
                  //   console.log(e.target.value);
                  //   setProductData({
                  //     ...productData,
                  //     weigthafterpacking: e.target.value,
                  //   });
                  // }}
                ></TextField>
                <Select
                  sx={packagingunit}
                  defaultValue={"Grams"}
                  {...register("WeightAfterPackingPerUnitMeasurUnit")}
                >
                  {weight === "Grams" ? (
                    <MenuItem sx={MenuItems} value="Grams">
                      Grams
                    </MenuItem>
                  ) : (
                    <MenuItem sx={MenuItems} value="KiloGrams">
                      KiloGrams
                    </MenuItem>
                  )}
                </Select>
                <Typography sx={ErrorStyle}>
                  {errors["WeightAfterPackingPerUnit"]?.message}
                </Typography>
              </Box>
            </Box>  */}

              {/*   <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
              <Typography sx={TypographyStyle}>
                Packaging and delivery Instructions ( if Any)
              </Typography>
              <TextField
                id="standard-multiline-static"
                multiline
                rows={4}
                variant="standard"
                placeholder="Packaging and delivery Instructions if Any"
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
                {...register("PackagingAndDeliveryInstructions")}
                // onChange={(e) => {
                //   console.log(e.target.value);
                //   setProductData({
                //     ...productData,
                //     packaginganddeliveryinstructions: e.target.value,
                //   });
                // }}
                sx={textfieldstyle}
              />
              <Typography sx={ErrorStyle}>
                {errors["PackagingAndDeliveryInstructions"]?.message}
              </Typography>
            </Box>
            <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
              <Typography sx={TypographyStyle}>
                Instructions to use product
              </Typography>
              <TextField
                id="standard-multiline-static"
                multiline
                rows={4}
                variant="standard"
                placeholder="Instructions to use product"
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
                {...register("InstructionsToUseProduct")}
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
                {errors["InstructionsToUseProduct"]?.message}
              </Typography>
              </Box> */}

              <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
                <Typography sx={TypographyStyle}>
                  Packaging Info. per unit <span style={{ color: 'red' }}> *</span>
                </Typography>
                <TextField
                  id="standard-multiline-static"
                  multiline
                  rows={4}
                  variant="standard"
                  placeholder="Packaging Information"
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
                  {...register("PackagingInfoPerUnit")}
                  onKeyDown={(e) => {
                    if (e.key === " " && e.target.selectionStart === 0) {
                      e.preventDefault();
                    }
                  }}
                  // onChange={(e) => {
                  //   console.log(e.target.value);
                  //   setProductData({
                  //     ...productData,
                  //     packaginganddeliveryinstructions: e.target.value,
                  //   });
                  // }}
                  sx={{
                    ...textfieldstyle,
                    border: errors["PackagingInfoPerUnit"]
                      ? "1px solid red"
                      : null,
                  }}
                />
                <Typography sx={ErrorStyle}>
                  {errors["PackagingInfoPerUnit"]?.message}
                </Typography>
              </Box>

              <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
                <Typography sx={TypographyStyle}>Legal Information <span style={{ color: 'red' }}> *</span></Typography>
                <TextField
                  id="standard-multiline-static"
                  multiline
                  rows={4}
                  variant="standard"
                  placeholder="Your use of this web site constitutes your acceptance of the following Terms of Use. Do not use the site if you do not agree to be bound by these terms. Be sure to check this page periodically for updates, as your continued use of the site signifies your acceptance of any changed items."
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
                  {...register("LegalInformation")}
                  onKeyDown={(e) => {
                    if (e.key === " " && e.target.selectionStart === 0) {
                      e.preventDefault();
                    }
                  }}
                  // onChange={(e) => {
                  //   console.log(e.target.value);
                  //   setProductData({
                  //     ...productData,
                  //     packaginganddeliveryinstructions: e.target.value,
                  //   });
                  // }}
                  sx={{
                    ...textfieldstyle,
                    border: errors["LegalInformation"] ? "1px solid red" : null,
                  }}
                />
                <Typography sx={ErrorStyle}>
                  {errors["LegalInformation"]?.message}
                </Typography>
              </Box>

              <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
                <Typography sx={TypographyStyle}>Tags <span style={{ color: 'red' }}> *</span></Typography>
                <Box
                  sx={{
                    display: "flex",
                    background: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  <TextField
                    placeholder="Add Tags"
                    inputRef={tagInputRef}
                    sx={{
                      width: "100%",
                      background: "#fff",
                      borderRadius: "10px",
                      height: "41px",
                    }}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        color: "rgba(107, 122, 153)",
                        fontSize: "14px",
                        marginTop: "5px",
                        marginLeft: "1%",
                        color: "#445FD2",
                      },
                    }}
                    onKeyDown={handleAddTag}
                  />
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#6B7A99",
                      // position: "absolute",
                      right: 1,
                      textTransform: "none",
                      fontSize: "12px",
                      // height: "42px",
                      alignSelf: "center",
                      "&:hover": {
                        border: "none",
                      },
                    }}
                    onClick={handleAddButtonClick}
                  >
                    Add
                  </Button>
                </Box>
                <Typography sx={ErrorStyle}>
                  {errors["height"]?.message}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "auto",
                    gap: "5px",
                  }}
                >
                  {tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={handleDeleteTag(tag)}
                      color="default"
                      fullWidth
                      sx={{
                        fontSize: "14px",
                        background: "#FFFFFF ",
                        color: "#6B7A99",
                        height: "50px",
                        boxShadow: "0px 4px 4px rgba(229, 229, 229, 0.25)",
                      }}
                      />
                      ))}
                      </Box>
                      </Box>
                      </Stack>
                      </Box>
                      </Box>
                      </Box>
                      <Box
            sx={{
              width: "100%",
              mx: "auto",
              height: "auto",
              background: "#FAFBFD",
            }}
          >
            <BottomNavigation
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                background: "#FAFBFD",
              }}
              showLabels
            >
              {/* <Button
                sx={{
                  marginRight: "auto",
                  p: "2%",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  color: "#6B7A99",
                  fontSize: 14,
                  display: "flex",
                  gap: "10px",
                  cursor: "pointer",
                  textTransform: "none",
                }}
                onClick={() => {
                  reset();
                  setTags([])
                }}
              >
                <Box
                  component="img"
                  sx={{ width: "23px", height: "23px" }}
                  src={RedoIcon}
                  alt=""
                />
                Reset to Default
              </Button> */}
              <Box sx={{ display: "flex", gap: "10px", p: 1, width: "50%" }}>
                <Button
                  sx={{
                    width: "100%",
                    height: "32px",
                    borderRadius: "10px",
                    background: "#fff",
                    color: "#636161",
                    fontSize: "14px",
                    textTransform: "none",
                    "&:hover": {
                      background: "#f3f6f9",
                      color: "#000",
                    },
                  }}
                  variant="contained"
                  onClick={() => {
                    let confirm = window.confirm(
                      "Are you sure you want to cancel the product?"
                    );
                    if (confirm) {
                      navigate("/home/mylistedproducts");
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  sx={{
                    width: "100%",
                    height: "32px",
                    borderRadius: "10px",
                    background: "#445FD2",
                    fontSize: "14px",
                    textTransform: "none",
                    "&:hover": {
                      background: "#445FD2",
                    },
                  }}
                  variant="contained"
                >
                  {isLoading ? <CircularProgress size={20} /> : "Next"}
                </Button>
              </Box>
            </BottomNavigation>
          </Box>
        </Box>
      </form>
    </>
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

const packagingunit = {
  width: "20%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  height: "100%",
  background: "#FFFFFF",
  color: "#6B7A99",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  borderRadius: "0px 10px 10px 0px",
};

const GW = {
  width: "30%",
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

const PD = {
  width: "40%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  background: "#FFFFFF",
  height: "100%",
  maxWidth: "75px",
  minWidth: "75px",
  color: "#6B7A99",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  borderRadius: "0px 10px 10px 0px",
};

const ErrorStyle = {
  color: "red",
};
