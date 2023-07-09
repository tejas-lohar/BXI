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
} from "@mui/material";
import { Stack } from "@mui/system";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import React, { useEffect, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import { styled } from "@mui/material/styles";
import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ToolTip from "../../../../components/ToolTip";
import axios from "axios";

export default function MobilityTechInfo() {
  const ProductId = useParams().id;
  const navigate = useNavigate();
  const tagInputRef = useRef(null);
  const navigateData = useLocation();
  console.log("navigateData", navigateData?.state?.subcategory);
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

  const [currentTag, setCurrentTag] = useState();
  const [tags, setTags] = useState([]);
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
        Guarantee: z.coerce.string().min(1),
        GuaranteePeriod: z.string().min(1),
        Warranty: z.coerce.string().min(1),
        WarrantyPeriod: z.string().min(1),
        // Height:
        //   navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31"
        //     ? z.coerce.number().gte(1)
        //     : z.optional(),
        // heightMeasuriUnit:
        //   navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31"
        //     ? z.string().min(1)
        //     : z.optional(),
        // Length:
        //   navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31"
        //     ? z.coerce.number().gte(1)
        //     : z.optional(),
        // lengthMeasuriUnit:
        //   navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31"
        //     ? z.string().min(1)
        //     : z.optional(),
        // Width:
        //   navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31"
        //     ? z.coerce.number().gte(1)
        //     : z.optional(),
        // widthMeasuriUnit:
        //   navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31"
        //     ? z.string().min(1)
        //     : z.optional(),
        WeightBeforePackingPerUnit:
          navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31"
            ? z.coerce.number().gte(1)
            : z.optional(),
        WeightBeforePackingPerUnitMeasurUnit:
          navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31"
            ? z.string().min(1)
            : z.optional(),
        // WeightAfterPackingPerUnit:
        //   navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31"
        //     ? z.coerce.number().gte(1)
        //     : z.optional(),
        // WeightAfterPackingPerUnitMeasurUnit:
        //   navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31"
        //     ? z.string().min(1)
        //     : z.optional(),
        PackagingAndDeliveryInstructions: z.string().min(1),
        InstructionsToUseProduct: z.string().min(1),
      })
    ),
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
        setValue("Guarantee", response?.data?.ProductTechInfo?.Guarantee);
        setValue("Warranty", response?.data?.ProductTechInfo?.Warranty);
        setValue(
          "WeightBeforePackingPerUnit",
          response?.data?.ProductTechInfo?.WeightBeforePackingPerUnit
        );
        setValue(
          "PackagingAndDeliveryInstructions",
          response?.data?.ProductTechInfo?.PackagingAndDeliveryInstructionsIfAny
        );
        setValue(
          "InstructionsToUseProduct",
          response?.data?.ProductTechInfo?.InstructionsToUseProduct
        );

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
    if (navigateData?.state?.subcategory === "6458d4c7ee0f6104e072ab31") {
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
            Guarantee:
              ProductTechInfo?.GuaranteePeriod === "Month"
                ? Number(ProductTechInfo?.Guarantee)
                : Number(ProductTechInfo?.Guarantee) * 12,
            Warranty:
              ProductTechInfo?.WarrantyPeriod === "Month"
                ? Number(ProductTechInfo?.Warranty)
                : Number(ProductTechInfo?.Warranty) * 12,
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

            PackagingAndDeliveryInstructionsIfAny:
              ProductTechInfo.PackagingAndDeliveryInstructions,
            InstructionsToUseProduct: ProductTechInfo.InstructionsToUseProduct,
            Tags: tags,
            ProductUploadStatus: "golive",
          },
        },
        {
          onSuccess: (response) => {
            if (response.status === 200) {
              navigate(`/home/mobility/mobilitygolive/${ProductId}`);
            }
          },
          onError: (error) => {
            console.log("error", error);
          },
        }
      );
    } else if (tags?.length === 0) {
      console.log("tags", tags);
      return toast.error("Please Select Tag", {
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
            Height: "NA",

            Length: "NA",
            Width: "NA",
            Guarantee:
              ProductTechInfo?.GuaranteePeriod === "Month"
                ? Number(ProductTechInfo?.Guarantee)
                : Number(ProductTechInfo?.Guarantee) * 12,
            Warranty:
              ProductTechInfo?.WarrantyPeriod === "Month"
                ? Number(ProductTechInfo?.Warranty)
                : Number(ProductTechInfo?.Warranty) * 12,
            WeightBeforePackingPerUnit: "NA",

            WeightAfterPackingPerUnit: "NA",

            PackagingAndDeliveryInstructionsIfAny:
              ProductTechInfo.PackagingAndDeliveryInstructions,
            InstructionsToUseProduct: ProductTechInfo.InstructionsToUseProduct,
            Tags: tags,
          },
        },
        {
          onSuccess: (response) => {
            if (response.status === 200) {
              navigate(`/home/mobility/mobilitygolive/${ProductId}`);
            }
          },
          onError: (error) => {
            console.log("error", error);
          },
        }
      );
    }

    // updateProduct(data, {
    //   onSuccess: (response) => {
    //     console.log("response", response);
    //   },
    // });
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
          //   p: 1,
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
                  <Box
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
                      <Typography sx={TypographyStyle}>Warranty <span style={{ color: 'red' }}> *</span></Typography>
                      <Box
                        sx={{
                          width: "auto",
                          maxWidth: "500px",
                          height: "42px",
                          mt: "1%",
                          borderRadius: "10px",
                          border: errors["Warranty"] ? "1px solid red" : null,
                        }}
                      >
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          placeholder="1"
                          type="number"
                          // onChange={(e) => {
                          //   setWarranty(e.target.value);
                          // }}
                          {...register("Warranty")}
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
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
                              e.preventDefault();
                            }
                          }}
                          sx={{
                            width: "70%",
                            height: "100%",
                            background: "#FFFFFF",
                            borderRadius: "10px 0px 0px 10px",
                          }}
                        />

                        <Select
                          sx={{
                            ...GW,
                            border: errors["WarrantyPeriod"]
                              ? "1px solid red"
                              : null,
                          }}
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
                    <Box
                      sx={{ display: "grid", width: "100%", maxWidth: "290px" }}
                    >
                      <Typography sx={TypographyStyle}>Guarantee <span style={{ color: 'red' }}> *</span></Typography>
                      <Box
                        sx={{
                          width: "auto",
                          maxWidth: "500px",
                          height: "42px",
                          mt: "1%",
                          // border: "1px solid black",
                          borderRadius: "10px",
                          border: errors["Guarantee"] ? "1px solid red" : null,
                        }}
                      >
                        <TextField
                          variant="standard"
                          placeholder="1"
                          type="number"
                          // onChange={(e) => {
                          //   setGuarantee(e.target.value);
                          // }}
                          {...register("Guarantee")}
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
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
                              e.preventDefault();
                            }
                          }}
                          sx={{
                            width: "70%",
                            height: "100%",
                            background: "#FFFFFF",
                            borderRadius: "10px 0px 0px 10px",
                          }}
                        ></TextField>
                        <Select
                          sx={{
                            ...GW,
                            border: errors["GuaranteePeriod"]
                              ? "1px solid red"
                              : null,
                          }}
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
                  </Box>

                  <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
                    <Typography sx={{ ...TypographyStyle, fontWeight: 500 }}>
                      Product Packaging Information
                    </Typography>
                    <Typography sx={TypographyStyle}>
                      Weight before packing per unit
                    </Typography>
                    <Box
                      sx={{
                        width: "auto",
                        maxWidth: "710px",
                        height: "55px",
                        // border: "1px solid black",
                        borderRadius: "10px",
                        border: errors["WeightBeforePackingPerUnit"]?.message
                          ? "1px solid red"
                          : null,
                      }}
                    >
                      <TextField
                        id="standard-multiline-static"
                        variant="standard"
                        placeholder="70"
                        disabled={
                          navigateData?.state?.subcategory ===
                            "6458d4c7ee0f6104e072ab31" ||
                          navigateData?.state?.subcategory ===
                            "64350578ab34e1c586310a89" ||
                          navigateData?.state?.subcategory ===
                            "64350583ab34e1c586310a8d" ||
                          navigateData?.state?.subcategory ===
                            "64350592ab34e1c586310a91" ||
                          navigateData?.state?.subcategory ===
                            "643505a2ab34e1c586310a95" ||
                          navigateData?.state?.subcategory ===
                            "643505bbab34e1c586310a99" ||
                          navigateData?.state?.subcategory ===
                            "64880256cd7f80b6b94fd2ea"
                            ? false
                            : true
                        }
                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            color: "rgba(107, 122, 153)",
                            fontSize: "14px",
                            padding: "10px",
                            color: "#445FD2",
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
                        {...register("WeightBeforePackingPerUnitMeasurUnit")}
                        disabled={
                          navigateData?.state?.subcategory ===
                          "6458d4c7ee0f6104e072ab31" ||
                        navigateData?.state?.subcategory ===
                          "64350578ab34e1c586310a89" ||
                        navigateData?.state?.subcategory ===
                          "64350583ab34e1c586310a8d" ||
                        navigateData?.state?.subcategory ===
                          "64350592ab34e1c586310a91" ||
                        navigateData?.state?.subcategory ===
                          "643505a2ab34e1c586310a95" ||
                        navigateData?.state?.subcategory ===
                          "643505bbab34e1c586310a99" ||
                        navigateData?.state?.subcategory ===
                          "64880256cd7f80b6b94fd2ea"
                          ? false
                          : true
                        }
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
                  {/* <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
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
                disabled={
                  navigateData?.state?.subcategory ===
                  "6458d4c7ee0f6104e072ab31"
                    ? false
                    : true
                }
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
                disabled={
                  navigateData?.state?.subcategory ===
                  "6458d4c7ee0f6104e072ab31"
                    ? false
                    : true
                }
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
          </Box> */}
                  <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
                    <Typography sx={TypographyStyle}>
                      Packaging and delivery Instructions if Any <span style={{ color: 'red' }}> *</span>
                    </Typography>
                    <TextField
                      id="standard-multiline-static"
                      multiline
                      rows={4}
                      variant="standard"
                      placeholder="Eg. Factory Packaging, Pre- Delivery Inspection."
                      InputProps={{
                        disableUnderline: "true",
                        style: {
                          color: "rgba(107, 122, 153)",
                          fontSize: "14px",
                          padding: "10px",
                          color: "#445FD2",
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
                      {...register("PackagingAndDeliveryInstructions")}
                      // onChange={(e) => {
                      //   console.log(e.target.value);
                      //   setProductData({
                      //     ...productData,
                      //     packaginganddeliveryinstructions: e.target.value,
                      //   });
                      // }}
                      sx={{
                        ...textfieldstyle,
                        border: errors["PackagingAndDeliveryInstructions"]
                          ? "1px solid red"
                          : null,
                      }}
                    />
                    <Typography sx={ErrorStyle}>
                      {errors["PackagingAndDeliveryInstructions"]?.message}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
                    <Typography sx={TypographyStyle}>
                      Instructions to use product <span style={{ color: 'red' }}> *</span>
                    </Typography>
                    <TextField
                      id="standard-multiline-static"
                      multiline
                      rows={4}
                      variant="standard"
                      placeholder="Eg. Get your car service at our authorized outlets"
                      InputProps={{
                        disableUnderline: "true",
                        style: {
                          color: "rgba(107, 122, 153)",
                          fontSize: "14px",
                          padding: "10px",
                          color: "#445FD2",
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
                      sx={{
                        ...textfieldstyle,
                        border: errors["InstructionsToUseProduct"]
                          ? "1px solid red"
                          : null,
                      }}
                    />
                    <Typography sx={ErrorStyle}>
                      {errors["InstructionsToUseProduct"]?.message}
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
              height: "100%",
              bgcolor: "transparent",
              marginBottom: "21px",
            }}
          >
            <BottomNavigation
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                bgcolor: "#FAFBFD",
                p: "10px",
              }}
              showLabels
            >
              {/* <Button
                sx={{
                  marginRight: "auto",
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
                      background: "#FAFBFD",
                      color: "#000",
                    },
                  }}
                  variant="contained"
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
                  // onClick={updateProductTotextilestatus}
                >
                  Next
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
