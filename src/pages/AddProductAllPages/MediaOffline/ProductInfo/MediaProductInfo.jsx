import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  Input,
  TextField,
  Chip,
  BottomNavigation,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import RemoveIcon from "../../../../assets/Images/CommonImages/RemoveIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import EditIcon from "../../../../assets/Images/CommonImages/EditIcon.svg";
import { styled } from "@mui/material/styles";
import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import OthercostPortion from "../../Textile/ProductInfo/OthercostPortion.jsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
import { useEffectOnce } from "react-use";
// import MediaOtherCost from "./MediaOtherCost";
import bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";
import { toast, ToastContainer } from "react-toastify";
import Bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";
import axios from "axios";
import ToolTip from "../../../../components/ToolTip";

const MediaProductInfo = () => {
  const ProductId = useParams().id;
  const navigate = useNavigate();
  const [unit, setUnit] = useState("");

  console.log("ProductId", ProductId);
  const GSTOptions = [0, 5, 12, 18, 28];
  const [modelName, setModelName] = useState();
  const [HSNStore, setHSNStore] = useState();
  const [ProductData, setProductData] = useState();
  const [hsnCode, setHsnCode] = useState();
  const [FetchedproductData, setFetchedpProuctData] = useState();
  const [onlyState, setOnlyState] = useState(false);
  const [paythru, setPaythru] = useState({
    bxitokens: "",
    inr: "",
  });
  const [OthercostEditId, SetOthercostEditId] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    setError,
    reset,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        medianame: z.string().min(1),
        offerningbrandat:
          FetchedproductData?.ProductSubCategory === "647713dcb530d22fce1f6c36"
            ? z.any()
            : z.string().min(1),
        adPosition:
          FetchedproductData?.ProductSubCategory === "647713dcb530d22fce1f6c36"
            ? z.string().min(1)
            : z.any(),
        mediaVariation: z.object({
          location: z.any(),
          unit: z.any(),
          Timeline: z.any(),
          repetition:
            FetchedproductData?.ProductSubCategory ===
            "647713dcb530d22fce1f6c36"
              ? z.any()
              : z.coerce.number().min(1),
          dimensionSize: z.string().min(1),
          PricePerUnit: z.coerce.string().min(1),
          DiscountedPrice: z.coerce.string().min(1),
          GST: z.coerce.number().gte(1).lte(28),
          HSN: z.coerce.number().min(1),
          minOrderQuantityunit: z.coerce.string().min(1),
          minOrderQuantitytimeline: z.coerce.string().min(1),
          maxOrderQuantityunit: z.coerce.string().min(1),
          maxOrderQuantitytimeline: z.coerce.string().min(1),
          edition:
            FetchedproductData?.ProductSubCategory ===
            "647713dcb530d22fce1f6c36"
              ? z.string().min(1)
              : z.any(),
          Type:
            FetchedproductData?.ProductSubCategory ===
            "647713dcb530d22fce1f6c36"
              ? z.string().min(1)
              : z.any(),
          releasedetails:
            FetchedproductData?.ProductSubCategory ===
            "647713dcb530d22fce1f6c36"
              ? z.string().min(1)
              : z.any(),
          availableInsertions:
            FetchedproductData?.ProductSubCategory ===
            "647713dcb530d22fce1f6c36"
              ? z.coerce.number().min(1)
              : z.any(),
          adType:
            FetchedproductData?.ProductSubCategory ===
            "647713dcb530d22fce1f6c36"
              ? z.string().min(1)
              : z.any(),
        }),

        GeographicalData: z.object({
          region: z.string().min(1),
          state: z.string().min(1),
          city: z.string().min(1),
          landmark: z.string().min(1),
        }),
      })
    ),
    defaultValues: {
      mediaVariation: {
        Timeline: "Day",
      },
    },
  });
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "ProductsVariantions", // unique name for your Field Array
    });
  // useEffect(() => {
  //   setValue("productId", ProductId);
  // }, [ProductId]);
  console.log("errors here", errors);
  const FetchProduct = async () => {
    await axios
      .get("/product/get_product_byId/" + ProductId)
      .then((response) => {
        console.log("response", response.data);
        setFetchedpProuctData(response.data);

        if (response?.data?.ProductsVariantions?.length > 0) {
          setItems(response?.data?.ProductFeatures);
          setValue("medianame", response?.data?.medianame);
          setValue("offerningbrandat", response?.data?.offerningbrandat);
          setValue("adPosition", response?.data?.adPosition);
          setValue(
            "mediaVariation.PricePerUnit",
            response?.data?.mediaVariation?.PricePerUnit
          );
          setValue(
            "mediaVariation.repetition",
            response?.data?.mediaVariation?.repetition
          );
          setValue(
            "mediaVariation.dimensionSize",
            response?.data?.mediaVariation?.dimensionSize
          );
          setValue(
            "mediaVariation.DiscountedPrice",
            response?.data?.mediaVariation?.DiscountedPrice
          );
          setValue("mediaVariation.GST", response?.data?.mediaVariation?.GST);
          setValue("mediaVariation.HSN", response?.data?.mediaVariation?.HSN);
          setValue(
            "mediaVariation.minOrderQuantityunit",
            response?.data?.mediaVariation?.minOrderQuantityunit
          );
          setValue(
            "mediaVariation.minOrderQuantitytimeline",
            response?.data?.mediaVariation?.minOrderQuantitytimeline
          );
          setValue(
            "mediaVariation.maxOrderQuantityunit",
            response?.data?.mediaVariation?.maxOrderQuantityunit
          );
          setValue(
            "mediaVariation.maxOrderQuantitytimeline",
            response?.data?.mediaVariation?.maxOrderQuantitytimeline
          );
          setValue(
            "mediaVariation.location",
            response?.data?.mediaVariation?.location
          );
          setValue("mediaVariation.unit", response?.data?.mediaVariation?.unit);
          setValue(
            "mediaVariation.Timeline",
            response?.data?.mediaVariation?.Timeline
          );
          OthercostAppend(response?.data?.OtherCost);
          setValue("GeographicalData", response?.data?.GeographicalData);
          // setValue("", response?.data?.);
          setOtherInfoArray(
            response?.data?.OtherInformationBuyerMustKnowOrRemarks
          );
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffectOnce(() => {
    FetchProduct();
  }, []);
  const {
    mutate: updateProduct,
    isLoading,
    isError,
    data: productData,

    variables,

    error: RegisterError,
  } = useUpdateProductQuery();

  function handleConsole() {
    const ProductUpdatedata = {
      id: ProductId,
      medianame: getValues()?.medianame,
      offerningbrandat: getValues()?.offerningbrandat,
      ProductsVariantions: [getValues()?.mediaVariation],
      OtherCost: getValues()?.OtherCost,
      GeographicalData: getValues()?.GeographicalData,
      ProductFeatures: getValues()?.ProductFeatures,
    };
  }

  let {
    fields: OthercostFields,
    append: OthercostAppend,
    remove: OthercostRemove,
    update: OthercostUpdate,
    prepend: OtherCostsPrepend,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "Othercost", // unique name for your Field Array
  });
  console.log("OtherCostsData", OthercostFields);

  const [data, setData] = useState([]);
  const { id } = useParams();

  //Additional feature states and functions
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [storefeatures, setStorefeatures] = useState([]);
  const [traits, setTraits] = useState([]);

  const handleItemAdd = (e) => {
    e.preventDefault();
    if (description === "") {
      // console.log("name=====>", name);
      return toast.error("Please fill the proper features and discription", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (description.length > 75) {
      return toast.error("feature discription less than 75 letters", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (name === "") {
      return toast.error(" please add features ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (name !== "Other" && items.some((res) => res.name === name)) {
      setName("");
      return toast.error("Please fill the unique key feature", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const newItem = { name, description };
      if (name.trim() || description.trim() !== "") {
        setItems([...items, newItem]);
      }
    }
    // console.log("feature", name, description, items);
    // setName("");
    setDescription("");
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  const tagInputRef = useRef(null);

  const [otherinformation, setOtherInformation] = useState("");
  const [OtherInfoArray, setOtherInfoArray] = useState([]);
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

  const OtherInformationSubmit = (e) => {
    e.preventDefault();
    if (otherinformation.trim() !== "") {
      setOtherInformation("");
      setOtherInfoArray([...OtherInfoArray, otherinformation]);
    } else {
      return;
    }
  };
  useEffect(() => {
    console.log("VALUES", getValues());
    console.log("mediaVariation", getValues().mediaVariation);
  });
  useEffect(() => {
    if (FetchedproductData?.ProductSubCategory === "647713dcb530d22fce1f6c36") {
      setValue("mediaVariation.Timeline", "Day");
      // setValue("mediaVariation.adType", "adType");
    }
  }, []);

  async function FetchAddedProduct() {
    await axios
      .get(`product/get_product_byId/${ProductId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res.data);
        // setFetchedpProuctData(res.data);
        fetchHsnCode(res.data?.ProductSubCategory);
        return res.data;
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async function fetchHsnCode(props) {
    await axios
      .post(
        "hsn/Get_HSNCode",
        { SubCatId: "63e38b9ccc4c02b8a0c94b6f" },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setHSNStore(res.data);
      });
  }

  const OthercostFieldsarray = [
    "Applicable on",
    "Other cost ",
    "HSN",
    "GST",
    "Reason of cost",
  ];

  useEffect(() => {
    FetchAddedProduct();
  }, []);
  const Feature = [
    {
      name: "Reach",
    },
    {
      name: "Eyeballs",
    },
    {
      name: "Readership",
    },
    {
      name: "Viewership",
    },
    {
      name: "Listernship",
    },
    {
      name: "Editions",
    },
    {
      name: "Time slot",
    },
    {
      name: "Other",
    },
    {
      name: "Landmark",
    },
    {
      name: "Position",
    },
    {
      name: "Frequency",
    },
    {
      name: "Placement",
    },
    {
      name: "Duration",
    },
    {
      name: "Screen Type",
    },
    {
      name: "Gold",
    },
    {
      name: "Platinum",
    },
    {
      name: "Silver",
    },
    {
      name: "No of Seats",
    },
    {
      name: "Prime Time",
    },
    {
      name: "Location",
    },
    {
      name: "Near by",
    },
    {
      name: "Footfall",
    },
    {
      name: "Eyeball Reach",
    },
    {
      name: "Lead Time",
    },
    {
      name: "Gender Reach",
    },
    {
      name: "Event Sponsoring Brand",
    },
    {
      name: "Occasion",
    },
    {
      name: "Brading",
    },
    {
      name: "Average Like",
    },
    {
      name: "Engagement Rate",
    },
    {
      name: "Category",
    },
    {
      name: "Platform",
    },
    {
      name: "Audio",
    },
    {
      name: "Video",
    },
    {
      name: "AD Type",
    },
    {
      name: "Used for",
    },
    {
      name: "Format",
    },
    {
      name: "CTR",
    },
    {
      name: "CPCV",
    },
    {
      name: "CPM",
    },
    {
      name: "Contest",
    },
    {
      name: "Content Creation",
    },
    {
      name: "Sponsor Tags",
    },
    {
      name: "Studio Shift",
    },
    {
      name: "Roadblock",
    },
    {
      name: "Time Check",
    },
    {
      name: "Cinematic",
    },
    {
      name: "Quality",
    },
    {
      name: "Creative",
    },
  ];
  const ConvertPriceToperDay = (price, timeline) => {
    if (timeline === "Day") {
      return price;
    } else if (timeline === "Week") {
      return Number(price) / 7;
    } else if (timeline === "Month") {
      return Number(price) / 30;
    } else if (timeline === "Year") {
      return Number(price) / 365;
    } else if (unit === "Spot") {
      return price;
    }
  };

  const updateProductTotextilestatus = handleSubmit((data) => {
    const datatobesent = {
      ...data,
      id: ProductId,
      OtherCost: OthercostFields,
      ProductFeatures: items,
      ProductsVariantions: [getValues()?.mediaVariation],
      OtherInformationBuyerMustKnowOrRemarks: OtherInfoArray,
      mediaVariation: getValues()?.mediaVariation,
      ProductUploadStatus: "technicalinformation",
      ListingType: "Media",
      tags: tags,

      DiscountePricePerDay: Math.round(
        Number(
          ConvertPriceToperDay(
            getValues()?.mediaVariation?.DiscountedPrice,
            getValues()?.mediaVariation?.Timeline
            // getValues()?.mediaVariation?.minOrderQuantitytimeline
          )
        )
      ),
    };
    console.log("datahere", datatobesent);

    if (
      Number(data?.mediaVariation?.minOrderQuantityunit) >
      Number(data?.mediaVariation?.maxOrderQuantityunit)
    ) {
      setError("mediaVariation.maxOrderQuantityunit", {
        type: "custom",
        message: "Max Order Quantity can not be less than Min Order Quantity",
      });
      console.log("max Order ka error", errors);
    }
    if (
      Number(data?.mediaVariation?.minOrderQuantitytimeline) >
      Number(data?.mediaVariation?.maxOrderQuantitytimeline)
    ) {
      setError("mediaVariation.maxOrderQuantitytimeline", {
        type: "custom",
        message: "Max Order Quantity can not be less than Min Order Quantity",
      });
      console.log("max Order ka error", errors);
    }
    if (items?.length < 5) {
      return toast.error("Please Select Best Feature ( Min 5 )", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (items?.length > 20) {
      return toast.error("Please Select Best Feature ( max 20 )", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      updateProduct(datatobesent, {
        onSuccess: (response) => {
          if (response.status === 200) {
            navigate(`/home/mediaoffline/mediaofflinetechinfo/${id}`);
          }
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
    }
  });
  let GST = "";
  HSNStore?.filter((item) => {
    return item.HSN === hsnCode;
  })?.map((item, index) => {
    GST = item.GST;
  });
  useEffect(() => {
    setValue("mediaVariation.GST", GST);
  }, [GST]);

  React.useEffect(() => {
    // Prefill the array field with initial values
    ProductData?.OtherCost.forEach((value) => {
      OthercostAppend(value);
    });
  }, [OthercostAppend]);

  return (
    <>
      <form onSubmit={updateProductTotextilestatus}>
        <Box
          sx={{
            width: "650px",
            height: "100%",
            minHeight: "400px",
            overflowY: "scroll",
            boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
            bgcolor: "transparent",
            mx: "auto",
            maxWidth: "716px",
            bgcolor: "#f3f6f9",
            overflowX: "hidden",
            px: 4,
            py: 3,
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
                backgroundColor: "#f3f6f9",
                width: "100%",
                mx: "auto",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "10px",
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
                Product Information
              </Typography>
              <ToolTip
                info={
                  "Product Information encompasses essential details and specifications about a specific product/vouchers, including its name, description, features, pricing, and other relevant data, facilitating informed purchasing decisions for potential buyers."
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
              <Box
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
                <Stack>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ ...CommonTextStyle, pt: "20px" }}>
                      Media Name <span style={{ color: "red" }}> *</span>
                    </Typography>

                    <TextField
                      focused
                      multiline
                      variant="standard"
                      placeholder="Eg. Khushi Advertising"
                      // value={description}

                      {...register("medianame", {
                        onChange: (e) => {
                          setName(e.target.value);
                        },
                      })}
                      onKeyDown={(e) => {
                        if (e.key === " " && e.target.selectionStart === 0) {
                          e.preventDefault();
                        }
                      }}
                      sx={{
                        ...lablechange,
                        background: "#fff",
                        borderRadius: "10px",
                        padding: "0px 10px",
                        color: "#445fd2",
                        fontSize: "12px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        height: "auto",
                        minHeight: "47px",
                        border: errors?.medianame?.message
                          ? "1px solid red"
                          : null,
                      }}
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <Typography
                            variant="body1"
                            style={{ fontFamily: "Poppins" }}
                          ></Typography>
                        ),
                        style: {
                          fontFamily: "Poppins",
                          color: " #445fd2",
                          fontSize: "12px",
                          fontWeight: 400,
                          lineHeight: "20px",
                        },
                      }}
                    />
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                      {errors?.medianame?.message}
                    </Typography>
                  </Box>
                  {FetchedproductData?.ProductSubCategory ===
                  "647713dcb530d22fce1f6c36" ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography sx={{ ...CommonTextStyle, pt: "20px" }}>
                        Position of the Ad ?{" "}
                        <span style={{ color: "red" }}> *</span>
                      </Typography>

                      <TextField
                        focused
                        multiline
                        variant="standard"
                        // value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                        placeholder="Eg. On Screen "
                        {...register("adPosition")}
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.selectionStart === 0) {
                            e.preventDefault();
                          }
                        }}
                        sx={{
                          ...lablechange,
                          background: "#fff",
                          borderRadius: "10px",
                          padding: "0px 10px",
                          color: "#445fd2",
                          fontSize: "12px",
                          height: "auto",
                          minHeight: "47px",
                        }}
                        // InputLabelProps={{
                        //   style: {
                        //     color: "#6B7A99",
                        //     fontSize: "17px",
                        //     fontFamily: "Poppins",
                        //   },
                        // }}
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: (
                            <Typography
                              variant="body1"
                              style={{ fontFamily: "Poppins" }}
                            ></Typography>
                          ),
                          style: {
                            fontFamily: "Poppins",
                            color: "#445fd2",
                            fontSize: "12px",
                          },
                        }}
                      />
                      <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.offerningbrandat?.message}
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography sx={{ ...CommonTextStyle, pt: "20px" }}>
                          Offering this Branding At ?{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Typography>

                        <TextField
                          focused
                          multiline
                          variant="standard"
                          // value={description}
                          // onChange={(e) => setDescription(e.target.value)}
                          placeholder="Eg. On Screen "
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
                              e.preventDefault();
                            }
                          }}
                          {...register("offerningbrandat")}
                          sx={{
                            ...lablechange,
                            background: "#fff",
                            borderRadius: "10px",
                            padding: "0px 10px",
                            color: "#445fd2",
                            fontSize: "12px",
                            height: "auto",
                            minHeight: "47px",
                            border: errors?.offerningbrandat?.message
                              ? "1px solid red"
                              : null,
                          }}
                          // InputLabelProps={{
                          //   style: {
                          //     color: "#6B7A99",
                          //     fontSize: "17px",
                          //     fontFamily: "Poppins",
                          //   },
                          // }}
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <Typography
                                variant="body1"
                                style={{ fontFamily: "Poppins" }}
                              ></Typography>
                            ),
                            style: {
                              fontFamily: "Poppins",
                              color: "#445fd2",
                              fontSize: "12px",
                            },
                          }}
                        />
                        <Typography
                          sx={{ color: "red", fontFamily: "Poppins" }}
                        >
                          {errors?.offerningbrandat?.message}
                        </Typography>
                      </Box>
                    </>
                  )}
                  {FetchedproductData?.ProductSubCategory ===
                  "647713dcb530d22fce1f6c36" ? (
                    <>
                      {/* default for newspaper*/}
                      <Box
                        sx={{
                          mt: 3,
                          height: "auto",
                          minHeight: "100px",
                          position: "relative",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          flexDirection: "row",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "100px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Edition <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Input
                            disableUnderline
                            // value={data.productIdType}
                            // onChange={(e) => {
                            //   setTextilesDetails({
                            //     ...textTileDetails,
                            //     productIdType: e.target.value,
                            //   });
                            // }}
                            placeholder="Mumbai English"
                            {...register("mediaVariation.edition")}
                            sx={inputStyles}
                          />
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.edition?.message}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "100px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Type
                          </Typography>
                          <Select
                            disableUnderline
                            // {...register("mediaVariation.unit")}
                            {...register("mediaVariation.Type", {
                              onChange: (e) => {
                                setOnlyState(!onlyState);
                                setUnit(e.target.value);
                              },
                            })}
                            sx={inputStyles}
                          >
                            <MenuItem value="Full Page">Full Page</MenuItem>
                            <MenuItem value="Half Page">Half Page</MenuItem>
                            <MenuItem value="Quarter Page">
                              Quarter Page
                            </MenuItem>
                            <MenuItem value="Custom Size">Custom Size</MenuItem>
                          </Select>
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.Type?.message}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "100px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Release Details
                          </Typography>
                          <Select
                            disableUnderline
                            // {...register("mediaVariation.timeline")}
                            {...register("mediaVariation.releasedetails", {
                              onChange: (e) => {
                                setOnlyState(!onlyState);
                              },
                            })}
                            // disabled={unit === "Spot" ? true : false}
                            sx={inputStyles}
                          >
                            <MenuItem value="Per Insertion">
                              Per Insertion
                            </MenuItem>
                            {/* <MenuItem value="Week"> Per Week </MenuItem>
                        <MenuItem value="Month"> Per Month </MenuItem>
                        <MenuItem value="One Time"> Per One Time </MenuItem>
                        <MenuItem value="Year"> Per Year </MenuItem> */}
                          </Select>
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.releasedetails?.message}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "100px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            No of Insertions Available
                          </Typography>
                          <Input
                            disableUnderline
                            // value={data.productIdType}
                            // onChange={(e) => {
                            //   setTextilesDetails({
                            //     ...textTileDetails,
                            //     productIdType: e.target.value,
                            //   });
                            // }}
                            placeholder="28"
                            {...register("mediaVariation.availableInsertions", {
                              onChange: (e) => {
                                setValue(
                                  "mediaVariation.maxOrderQuantityunit",
                                  e.target.value
                                );
                                setValue(
                                  "mediaVariation.maxOrderQuantitytimeline",
                                  e.target.value
                                );

                                setOnlyState(!onlyState);
                              },
                            })}
                            sx={inputStyles}
                          />
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {
                              errors?.mediaVariation?.availableInsertions
                                ?.message
                            }
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "100px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Dimension Size
                          </Typography>
                          <Input
                            disableUnderline
                            placeholder="2048 X 998"
                            {...register("mediaVariation.dimensionSize")}
                            sx={{ ...inputStyles, width: "100px" }}
                          />
                        </Box>
                        {/* <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    mt: 1,
                    maxWidth: "100px",
                  }}
                >
                  <Typography sx={{ ...CommonTextStyle, fontSize: "10px" }}>
                    Dimension Size
                  </Typography>
                  <Select
                    disableUnderline
                    {...register("mediaVariation.dimensionSize")}
                    sx={inputStyles}
                  >
                    <MenuItem value="Per Hour">2040 * 998</MenuItem>
                    <MenuItem value="Per Day"> 1040 * 658 </MenuItem>
                    <MenuItem value="Per Week"> 360 * 698</MenuItem>
                  </Select>
                  <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                    {errors?.mediaVariation?.dimensionSize?.message}
                  </Typography>
                </Box> */}
                      </Box>
                      <Box
                        sx={{
                          height: "auto",
                          minHeight: "100px",
                          position: "relative",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          flexDirection: "row",
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
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Price
                          </Typography>

                          <Box sx={{ position: "relative" }}>
                            <Input
                              disableUnderline
                              // value={data.mro}
                              placeholder="3000"
                              {...register("mediaVariation.PricePerUnit", {
                                onChange: (event) => {
                                  event.target.value = parseInt(
                                    event.target.value.replace(
                                      /[^\d]+/gi,
                                      ""
                                    ) || 0
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

                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.PricePerUnit?.message}
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
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Discounted Price
                          </Typography>
                          <Box sx={{ position: "relative" }}>
                            <Input
                              disableUnderline
                              // value={data.discount}
                              placeholder="2000"
                              {...register("mediaVariation.DiscountedPrice", {
                                onChange: (event) => {
                                  event.target.value = parseInt(
                                    event.target.value.replace(
                                      /[^\d]+/gi,
                                      ""
                                    ) || 0
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

                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.DiscountedPrice?.message}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "100px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Ad Type
                          </Typography>
                          <Select
                            disableUnderline
                            // {...register("mediaVariation.unit")}
                            {...register("mediaVariation.adType", {
                              onChange: (e) => {
                                setOnlyState(!onlyState);
                                setUnit(e.target.value);
                              },
                            })}
                            sx={inputStyles}
                          >
                            <MenuItem value="color">Color</MenuItem>
                            <MenuItem value="Black & White">
                              Black & White
                            </MenuItem>
                            {/* <MenuItem value="Quarter Page">Quarter Page</MenuItem>
                        <MenuItem value="Custom Size">Custom Size</MenuItem> */}
                          </Select>
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.adType?.message}
                          </Typography>
                        </Box>
                        {/* <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          mt: 1,
                          maxWidth: "100px",
                        }}
                      >
                        <Typography
                          sx={{ ...CommonTextStyle, fontSize: "12px" }}
                        >
                          HSN
                        </Typography>
                       
                        <Select
                          disableUnderline
                          required={true}
                          {...register("mediaVariation.HSN", {
                            onChange: (e) => {
                              setHsnCode(e.target.value);
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
                          {HSNStore?.map((item, index) => {
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

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          mt: 1,
                          maxWidth: "140px",
                        }}
                      >
                        <Typography
                          sx={{ ...CommonTextStyle, fontSize: "12px" }}
                        >
                          GST
                        </Typography>

                        <Box sx={{ position: "relative" }}>
                          {hsnCode ? (
                            HSNStore?.filter((item) => {
                              return item.HSN === hsnCode;
                            })?.map((item, index) => {
                              return (
                                <Input
                                  disableUnderline
                                  disabled={true}
                                  required={true}
                                  value={item.GST}
                                  {...register("mediaVariation.GST")}
                                  // defaultValue={"0%"}
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
                          ) : (
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
                          )}
                         
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
                        <Typography
                          sx={{ color: "red", fontFamily: "Poppins" }}
                        >
                          {errors?.GST?.message}
                        </Typography>

                      </Box> */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "100px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            HSN
                          </Typography>

                          <Box sx={{ position: "relative" }}>
                            <Input
                              disableUnderline
                              // required={true}
                              placeholder="998346"
                              {...register("mediaVariation.HSN")}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.selectionStart === 0
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              sx={{
                                width: "100px",
                                height: "42px",
                                background: "#FFFFFF",
                                borderRadius: "10px",
                                px: 1,
                                fontSize: "12px",
                                color: "#445FD2",
                                border: errors["mediaVariation.HSN"]
                                  ? "1px solid red"
                                  : null,
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.HSN?.message}
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
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            GST
                          </Typography>

                          <Box sx={{ position: "relative" }}>
                            <Select
                              sx={{
                                ".MuiOutlinedInput-notchedOutline": {
                                  border: 0,
                                },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: 0,
                                  },
                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: 0,
                                  },
                                width: "70px",
                                height: "42px",
                                background: "#FFFFFF",
                                borderRadius: "10px",
                                fontSize: "12px",
                                color: "#445FD2",
                                border: errors?.mediaVariation?.GST?.message
                                  ? "1px solid red"
                                  : null,
                              }}
                              defaultValue="0"
                              {...register("mediaVariation.GST")}
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
                                right: "32%",
                                bottom: "25%",
                                color: "#979797",
                                fontSize: "15px",
                              }}
                            >
                              %
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.GST?.message}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          height: "auto",
                          minHeight: "100px",
                          position: "relative",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          gap: "30px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            // maxWidth: "150px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Min : Consumption Duration
                          </Typography>
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Box
                              sx={{
                                background: "#fff",
                                display: "flex",
                                borderRadius: "10px",
                              }}
                            >
                              <Input
                                disableUnderline
                                placeholder="100"
                                {...register(
                                  "mediaVariation.minOrderQuantityunit",
                                  {
                                    onChange: (e) => {
                                      setValue(
                                        "mediaVariation.minOrderQuantitytimeline",
                                        e.target.value
                                      );
                                    },
                                  }
                                )}
                                sx={{
                                  ...inputStyles,
                                  width: "65px",
                                  padding: "0px",
                                  ml: 1,
                                }}
                                // disabled={unit === "Spot" ? true : false}
                              />
                              <Input
                                disableUnderline
                                disabled
                                // value={getValues()?.mediaVariation?.unit}
                                {...register("mediaVariation.Type")}
                                // {...register("mediaVariation.minOrderQuantityunit")}
                                sx={{
                                  ...inputStyles,
                                  width: "65px",
                                  padding: "0px",
                                  ml: 1,
                                }}
                              />
                            </Box>
                            <Typography
                              sx={{ color: "red", fontFamily: "Poppins" }}
                            >
                              {
                                errors?.mediaVariation?.minOrderQuantityunit
                                  ?.message
                              }
                            </Typography>

                            {/* <Box
                            sx={{
                              background: "#fff",
                              display: "flex",
                              borderRadius: "10px",
                            }}
                          >
                            <Input
                              disableUnderline
                              {...register(
                                "mediaVariation.minOrderQuantitytimeline"
                              )}
                              sx={{
                                ...inputStyles,
                                width: "60px",
                                padding: "0px",
                              }}
                              // disabled={unit === "Spot" ? true : false}
                              placeholder={"Timeline"}
                            />
                            <Input
                              disableUnderline
                              value={"Day"}
                              // {...register("mediaVariation.Timeline")}
                              disabled
                              sx={{
                                ...inputStyles,
                                width: "65px",
                                padding: "0px",
                              }}
                            />
                          </Box> */}
                            {/* <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {
                              errors?.mediaVariation?.minOrderQuantitytimeline
                                ?.message
                            }
                          </Typography> */}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "200px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Max : Consumption Duration
                          </Typography>
                          {/* <Box sx={{ display: " flex", gap: "10px" }}>
                    <Input
                      disableUnderline
                      // value={data.productIdType}
                      // onChange={(e) => {
                      //   setTextilesDetails({
                      //     ...textTileDetails,
                      //     productIdType: e.target.value,
                      //   });
                      // }}
                      {...register("mediaVariation.maxOrderQuantity")}
                      sx={inputStyles}
                    />
                    <Input
                      disableUnderline
                      // value={data.productIdType}
                      // onChange={(e) => {
                      //   setTextilesDetails({
                      //     ...textTileDetails,
                      //     productIdType: e.target.value,
                      //   });
                      // }}
                      {...register("mediaVariation.maxOrderQuantity")}
                      sx={inputStyles}
                    />
                  </Box> */}
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Box
                              sx={{
                                background: "#fff",
                                display: "flex",
                                borderRadius: "10px",
                              }}
                            >
                              <Input
                                disableUnderline
                                placeholder="200"
                                disabled
                                {...register(
                                  "mediaVariation.maxOrderQuantityunit"
                                )}
                                sx={{
                                  ...inputStyles,
                                  width: "64px",
                                  padding: "0px",
                                  // backgroundColor: "red",
                                  ml: 1,
                                }}
                              />
                              <Input
                                disableUnderline
                                disabled
                                // value={getValues()?.mediaVariation?.unit}
                                // {...register("mediaVariation.unit")}
                                {...register("mediaVariation.Type")}
                                // {...register("mediaVariation.minOrderQuantityunit")}
                                sx={{
                                  ...inputStyles,
                                  width: "64px",
                                  padding: "0px",
                                  ml: 1,
                                }}
                              />
                            </Box>
                            <Typography
                              sx={{ color: "red", fontFamily: "Poppins" }}
                            >
                              {
                                errors?.mediaVariation?.maxOrderQuantityunit
                                  ?.message
                              }
                            </Typography>
                            {/* <Box
                            sx={{
                              background: "#fff",
                              display: "flex",
                              borderRadius: "10px",
                            }}
                          >
                            <Input
                              disableUnderline
                              {...register(
                                "mediaVariation.maxOrderQuantitytimeline"
                              )}
                              sx={{
                                ...inputStyles,
                                width: "64px",
                                padding: "0px",
                                ml: 1,
                              }}
                              // disabled={unit === "Spot" ? true : false}
                              placeholder={"Timeline"}
                            />
                            <Input
                              disableUnderline
                              value={"Day"}
                              // value={getValues()?.mediaVariation?.timeline}
                              // {...register("mediaVariation.Timeline")}
                              disabled
                              sx={{
                                ...inputStyles,
                                width: "50px",
                                padding: "0px",
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {
                              errors?.mediaVariation?.maxOrderQuantitytimeline
                                ?.message
                            }
                          </Typography> */}
                          </Box>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      {/* default for media offline*/}
                      <Box
                        sx={{
                          mt: 3,
                          height: "auto",
                          minHeight: "100px",
                          position: "relative",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          flexDirection: "row",
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
                          <Typography
                            sx={{
                              ...CommonTextStyle,
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            Location <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Typography
                            sx={{
                              ...CommonTextStyle,
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            {FetchedproductData?.mediaVariation?.location
                              ? "Your Selected Location :" +
                                FetchedproductData?.mediaVariation?.location
                              : null}
                          </Typography>
                          <Select
                            disableUnderline
                            {...register("mediaVariation.location")}
                            sx={{
                              ...inputStyles,
                              width: "140px",
                              border: errors?.mediaVariation?.location?.message
                                ? "1px solid red"
                                : null,
                            }}
                            // defaultValue={}
                          >
                            <MenuItem value="Entry Gate">Entry Gate</MenuItem>
                            <MenuItem value="Exit Gate ">Exit Gate</MenuItem>
                            <MenuItem value="Mall Atrium">Mall Atrium</MenuItem>
                            <MenuItem value="Conveyor Belt">
                              Conveyor Belt
                            </MenuItem>
                            <MenuItem value="Out Side Airport">
                              Out Side Airport
                            </MenuItem>
                            <MenuItem value="Waiting Area">
                              Waiting Area
                            </MenuItem>
                            <MenuItem value="Arrival">Arrival</MenuItem>
                            <MenuItem value="Departure">Departure</MenuItem>
                            <MenuItem value="All Locations">
                              All Locations
                            </MenuItem>
                            <MenuItem value="Handles of the Bus">
                              Handles of the Bus
                            </MenuItem>
                            <MenuItem value="Café Wall Branding">
                              Café Wall Branding
                            </MenuItem>
                            <MenuItem value="Near Parking Area">
                              Near Parking Area
                            </MenuItem>
                            <MenuItem value="Concession Counter">
                              Concession Counter
                            </MenuItem>
                            <MenuItem value="Coffee Tables">
                              Coffee Tables
                            </MenuItem>
                            <MenuItem value="Tent Cards">Tent Cards</MenuItem>
                            <MenuItem value="Parking Area">
                              Parking Area
                            </MenuItem>
                            <MenuItem value="Lobby">Lobby</MenuItem>
                            <MenuItem value="Highway">Highway</MenuItem>
                            <MenuItem value="main road">main road</MenuItem>
                            <MenuItem value="others">others</MenuItem>
                          </Select>

                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.location?.message}
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
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Unit <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Typography
                            sx={{
                              ...CommonTextStyle,
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            {FetchedproductData?.mediaVariation?.unit
                              ? "Your Selected Unit :" +
                                FetchedproductData?.mediaVariation?.unit
                              : null}
                          </Typography>
                          <Select
                            disableUnderline
                            // {...register("mediaVariation.unit")}
                            {...register("mediaVariation.unit", {
                              onChange: (e) => {
                                setOnlyState(!onlyState);
                                setUnit(e.target.value);
                              },
                            })}
                            sx={{
                              ...inputStyles,
                              width: "140px",
                              border: errors?.mediaVariation?.unit?.message
                                ? "1px solid red"
                                : null,
                            }}
                          >
                            <MenuItem value="Screen">Per Screen</MenuItem>
                            <MenuItem value="Unit"> Per Unit </MenuItem>
                            <MenuItem value="Spot"> Per Spot </MenuItem>
                            <MenuItem value="Sq cm"> Per Sq cm </MenuItem>
                            <MenuItem value="Display"> Per Display </MenuItem>
                            <MenuItem value="Location"> Per Location </MenuItem>
                            <MenuItem value="Release"> Per Release </MenuItem>
                            <MenuItem value="Annoucment">
                              {" "}
                              Per Annoucment{" "}
                            </MenuItem>
                            <MenuItem value="Video"> Per Video</MenuItem>
                          </Select>
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.unit?.message}
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
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Timeline
                          </Typography>
                          <Typography
                            sx={{
                              ...CommonTextStyle,
                              fontSize: "12px",
                            }}
                          >
                            {FetchedproductData?.mediaVariation?.Timeline
                              ? "Your Selected Timeline :" +
                                FetchedproductData?.mediaVariation?.Timeline
                              : null}
                          </Typography>
                          <Select
                            disableUnderline
                            // {...register("mediaVariation.timeline")}
                            {...register("mediaVariation.Timeline", {
                              onChange: (e) => {
                                setOnlyState(!onlyState);
                              },
                            })}
                            // disabled={unit === "Spot" ? true : false}
                            sx={{
                              ...inputStyles,
                              width: "140px",
                              border: errors?.mediaVariation?.Timeline?.message
                                ? "1px solid red"
                                : null,
                            }}
                          >
                            <MenuItem value="Day"> Per Day </MenuItem>
                            <MenuItem value="Week"> Per Week </MenuItem>
                            <MenuItem value="Month"> Per Month </MenuItem>
                            <MenuItem value="One Time"> Per One Time </MenuItem>
                            <MenuItem value="Year"> Per Year </MenuItem>
                          </Select>
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.Timeline?.message}
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
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Repetition Of Ads{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Input
                            disableUnderline
                            // value={data.productIdType}
                            // onChange={(e) => {
                            //   setTextilesDetails({
                            //     ...textTileDetails,
                            //     productIdType: e.target.value,
                            //   });
                            // }}
                            placeholder="28 Per week"
                            {...register("mediaVariation.repetition")}
                            sx={{
                              ...inputStyles,
                              width: "140px",
                              border: errors?.mediaVariation?.repetition
                                ?.message
                                ? "1px solid red"
                                : null,
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
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.repetition?.message}
                          </Typography>
                        </Box>

                        {/* <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    mt: 1,
                    maxWidth: "100px",
                  }}
                >
                  <Typography sx={{ ...CommonTextStyle, fontSize: "10px" }}>
                    Dimension Size <span style={{ color: 'red' }}> *</span>
                  </Typography>
                  <Select
                    disableUnderline
                    {...register("mediaVariation.dimensionSize")}
                    sx={inputStyles}
                  >
                    <MenuItem value="Per Hour">2040 * 998</MenuItem>
                    <MenuItem value="Per Day"> 1040 * 658 </MenuItem>
                    <MenuItem value="Per Week"> 360 * 698</MenuItem>
                  </Select>
                  <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                    {errors?.mediaVariation?.dimensionSize?.message}
                  </Typography>
                </Box> */}
                      </Box>
                      <Box
                        sx={{
                          height: "auto",
                          minHeight: "100px",
                          position: "relative",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          flexDirection: "row",
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
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Dimension Size
                          </Typography>
                          <Input
                            disableUnderline
                            placeholder="2048 X 998"
                            {...register("mediaVariation.dimensionSize")}
                            sx={{
                              ...inputStyles,
                              width: "140px",
                              border: errors?.mediaVariation?.dimensionSize
                                ?.message
                                ? "1px solid red"
                                : null,
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
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.dimensionSize?.message}
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
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Price <span style={{ color: "red" }}> *</span>
                          </Typography>

                          <Box sx={{ position: "relative" }}>
                            <Input
                              disableUnderline
                              // value={data.mro}
                              placeholder="3000"
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.selectionStart === 0
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              {...register("mediaVariation.PricePerUnit", {
                                onChange: (event) => {
                                  event.target.value = parseInt(
                                    event.target.value.replace(
                                      /[^\d]+/gi,
                                      ""
                                    ) || 0
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
                                border: errors?.mediaVariation?.PricePerUnit
                                  ?.message
                                  ? "1px solid red"
                                  : null,
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

                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.PricePerUnit?.message}
                          </Typography>
                        </Box>
                        {/* <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    mt: 1,
                    maxWidth: "100px",
                  }}
                >
                  <Typography sx={{ ...CommonTextStyle, fontSize: "10px" }}>
                    Price  <span style={{ color: 'red' }}> *</span>
                  </Typography> 
                  <Input
                    disableUnderline
                    // value={data.color}
                    // onChange={(e) => {
                    //   setTextilesDetails({
                    //     ...textTileDetails,
                    //     color: e.target.value,
                    //   });
                    // }}
                    {...register("mediaVariation.price")}
                    sx={inputStyles}
                  />
                  <img
                    src={Bxitoken}
                    style={{
                      // position: "absolute",
                      width: "20px",
                      right: "17%",
                      bottom: "10%",
                    }}
                    alt="element"
                  />
                </Box> */}
                        {/* <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    mt: 1,
                    maxWidth: "100px",
                  }}
                >
                  <Typography sx={{ ...CommonTextStyle, fontSize: "10px" }}>
                    Discounted Price <span style={{ color: 'red' }}> *</span>
                  </Typography>
                  <Input
                    disableUnderline
                   
                    {...register("mediaVariation.discountedprice")}
                    sx={inputStyles}
                  />
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
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Discounted Price
                          </Typography>
                          <Box sx={{ position: "relative" }}>
                            <Input
                              disableUnderline
                              // value={data.discount}
                              placeholder="2000"
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.selectionStart === 0
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              {...register("mediaVariation.DiscountedPrice", {
                                onChange: (event) => {
                                  event.target.value = parseInt(
                                    event.target.value.replace(
                                      /[^\d]+/gi,
                                      ""
                                    ) || 0
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
                                border: errors?.mediaVariation?.DiscountedPrice
                                  ?.message
                                  ? "1px solid red"
                                  : null,
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

                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.DiscountedPrice?.message}
                          </Typography>
                        </Box>
                        {/* <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          mt: 1,
                          maxWidth: "100px",
                        }}
                      >
                        <Typography
                          sx={{ ...CommonTextStyle, fontSize: "12px" }}
                        >
                          HSN <span style={{ color: 'red' }}> *</span>
                        </Typography>
                        <Typography
                          sx={{
                            ...CommonTextStyle,
                            fontSize: "12px",
                          }}
                        >
                          {FetchedproductData?.mediaVariation?.HSN
                            ? "Your Selected HSN :" +
                              FetchedproductData?.mediaVariation?.HSN
                            : null}
                        </Typography>
                        <Select
                          disableUnderline
                          required={true}
                          {...register("mediaVariation.HSN", {
                            onChange: (e) => {
                              setHsnCode(e.target.value);
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
                          {HSNStore?.map((item, index) => {
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

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          mt: 1,
                          maxWidth: "140px",
                        }}
                      >
                        <Typography
                          sx={{ ...CommonTextStyle, fontSize: "12px" }}
                        > 
                          GST  <span style={{ color: 'red' }}> *</span>
                        </Typography>

                        <Box sx={{ position: "relative" }}>
                          {hsnCode ? (
                            HSNStore?.filter((item) => {
                              return item.HSN === hsnCode;
                            })?.map((item, index) => {
                              return (
                                <Input
                                  disableUnderline
                                  disabled={true}
                                  required={true}
                                  value={item.GST}
                                  {...register("mediaVariation.GST")}
                                  // defaultValue={"0%"}
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
                          ) : (
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

                                border: errors?.GST?.message
                                  ? "1px solid red"
                                  : null,
                              }}
                            />
                          )}
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
                        <Typography
                          sx={{ color: "red", fontFamily: "Poppins" }}
                        >
                          {errors?.GST?.message}
                        </Typography>
                      </Box> */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            maxWidth: "100px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            HSN <span style={{ color: "red" }}> *</span>
                          </Typography>

                          <Box sx={{ position: "relative" }}>
                            <Input
                              disableUnderline
                              // required={true}
                              placeholder="998346"
                              {...register("mediaVariation.HSN")}
                              onKeyDown={(e) => {
                                if (
                                  e.key === " " &&
                                  e.target.selectionStart === 0
                                ) {
                                  e.preventDefault();
                                }
                              }}
                              sx={{
                                width: "100px",
                                height: "42px",
                                background: "#FFFFFF",
                                borderRadius: "10px",
                                px: 1,
                                fontSize: "12px",
                                color: "#445FD2",
                                border: errors["mediaVariation.HSN"]
                                  ? "1px solid red"
                                  : null,
                              }}
                            />
                          </Box>
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.HSN?.message}
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
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            GST <span style={{ color: "red" }}> *</span>
                          </Typography>

                          <Box sx={{ position: "relative" }}>
                            <Select
                              sx={{
                                ".MuiOutlinedInput-notchedOutline": {
                                  border: 0,
                                },
                                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: 0,
                                  },
                                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    border: 0,
                                  },
                                width: "70px",
                                height: "42px",
                                background: "#FFFFFF",
                                borderRadius: "10px",
                                fontSize: "12px",
                                color: "#445FD2",
                                border: errors?.mediaVariation?.GST?.message
                                  ? "1px solid red"
                                  : null,
                              }}
                              defaultValue="0"
                              {...register("mediaVariation.GST")}
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
                                right: "32%",
                                bottom: "25%",
                                color: "#979797",
                                fontSize: "15px",
                              }}
                            >
                              %
                            </Typography>
                          </Box>
                          <Typography
                            sx={{ color: "red", fontFamily: "Poppins" }}
                          >
                            {errors?.mediaVariation?.GST?.message}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          height: "auto",
                          minHeight: "100px",
                          position: "relative",
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                          flexDirection: "row",
                          gap: "15px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                            // maxWidth: "150px",
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Min Order QTY Unit{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Box
                                sx={{
                                  background: "#fff",
                                  display: "flex",
                                  borderRadius: "10px",
                                  border: errors?.mediaVariation
                                    ?.minOrderQuantityunit?.message
                                    ? "1px solid red"
                                    : null,
                                }}
                              >
                                <Input
                                  disableUnderline
                                  placeholder="100"
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === " " &&
                                      e.target.selectionStart === 0
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  {...register(
                                    "mediaVariation.minOrderQuantityunit",
                                    {
                                      onChange: (event) => {
                                        event.target.value = parseInt(
                                          event.target.value.replace(
                                            /[^\d]+/gi,
                                            ""
                                          ) || 0
                                        ).toLocaleString("en-US");
                                      },
                                    }
                                  )}
                                  sx={{
                                    ...inputStyles,
                                    width: "65px",
                                    padding: "0px",
                                    ml: 1,
                                  }}
                                  // disabled={unit === "Spot" ? true : false}
                                />
                                <Input
                                  disableUnderline
                                  disabled
                                  // value={getValues()?.mediaVariation?.unit}
                                  {...register("mediaVariation.unit")}
                                  // {...register("mediaVariation.minOrderQuantityunit")}
                                  sx={{
                                    ...inputStyles,
                                    width: "65px",
                                    padding: "0px",
                                    ml: 1,
                                  }}
                                />
                              </Box>
                              <Typography
                                sx={{ color: "red", fontFamily: "Poppins" }}
                              >
                                {
                                  errors?.mediaVariation?.minOrderQuantityunit
                                    ?.message
                                }
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Max Order QTY Unit{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>
                          {/* <Box sx={{ display: " flex", gap: "10px" }}>
                    <Input
                      disableUnderline
                      // value={data.productIdType}
                      // onChange={(e) => {
                      //   setTextilesDetails({
                      //     ...textTileDetails,
                      //     productIdType: e.target.value,
                      //   });
                      // }}
                      {...register("mediaVariation.maxOrderQuantity")}
                      sx={inputStyles}
                    />
                    <Input
                      disableUnderline
                      // value={data.productIdType}
                      // onChange={(e) => {
                      //   setTextilesDetails({
                      //     ...textTileDetails,
                      //     productIdType: e.target.value,
                      //   });
                      // }}
                      {...register("mediaVariation.maxOrderQuantity")}
                      sx={inputStyles}
                    />
                  </Box> */}
                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Box
                                sx={{
                                  background: "#fff",
                                  display: "flex",
                                  borderRadius: "10px",
                                  border: errors?.mediaVariation
                                    ?.maxOrderQuantityunit?.message
                                    ? "1px solid red"
                                    : null,
                                }}
                              >
                                <Input
                                  disableUnderline
                                  placeholder="200"
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === " " &&
                                      e.target.selectionStart === 0
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  {...register(
                                    "mediaVariation.maxOrderQuantityunit",
                                    {
                                      onChange: (event) => {
                                        event.target.value = parseInt(
                                          event.target.value.replace(
                                            /[^\d]+/gi,
                                            ""
                                          ) || 0
                                        ).toLocaleString("en-US");
                                      },
                                    }
                                  )}
                                  sx={{
                                    ...inputStyles,
                                    width: "64px",
                                    padding: "0px",
                                    // backgroundColor: "red",
                                    ml: 1,
                                  }}
                                />
                                <Input
                                  disableUnderline
                                  disabled
                                  // value={getValues()?.mediaVariation?.unit}
                                  {...register("mediaVariation.unit")}
                                  // {...register("mediaVariation.minOrderQuantityunit")}
                                  sx={{
                                    ...inputStyles,
                                    width: "64px",
                                    padding: "0px",
                                    ml: 1,
                                  }}
                                />
                              </Box>
                              <Typography
                                sx={{ color: "red", fontFamily: "Poppins" }}
                              >
                                {
                                  errors?.mediaVariation?.maxOrderQuantityunit
                                    ?.message
                                }
                              </Typography>
                            </Box>
                            {/* <Box
                            sx={{
                              display: "flex",
                              gap: "10px",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Box
                              sx={{
                                background: "#fff",
                                display: "flex",
                                borderRadius: "10px",
                                border: errors?.mediaVariation
                                  ?.maxOrderQuantitytimeline?.message
                                  ? "1px solid red"
                                  : null,
                              }}
                            >
                              <Input
                                disableUnderline
                                {...register(
                                  "mediaVariation.maxOrderQuantitytimeline",
                                  {
                                    onChange: (event) => {
                                      event.target.value = parseInt(
                                        event.target.value.replace(
                                          /[^\d]+/gi,
                                          ""
                                        ) || 0
                                      ).toLocaleString("en-US");
                                    },
                                  }
                                )}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === " " &&
                                    e.target.selectionStart === 0
                                  ) {
                                    e.preventDefault();
                                  }
                                }}
                                sx={{
                                  ...inputStyles,
                                  width: "64px",
                                  padding: "0px",
                                  ml: 1,
                                }}
                                // disabled={unit === "Spot" ? true : false}
                                placeholder={"Timeline"}
                              />
                              <Input
                                disableUnderline
                                // value={getValues()?.mediaVariation?.timeline}
                                {...register("mediaVariation.Timeline")}
                                disabled
                                sx={{
                                  ...inputStyles,
                                  width: "50px",
                                  padding: "0px",
                                }}
                              />
                            </Box>
                            <Typography
                              sx={{ color: "red", fontFamily: "Poppins" }}
                            >
                              {
                                errors?.mediaVariation?.maxOrderQuantitytimeline
                                  ?.message
                              }
                            </Typography>
                          </Box> */}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Min Order QTY Timeline{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>

                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Box
                                sx={{
                                  background: "#fff",
                                  display: "flex",
                                  borderRadius: "10px",
                                  border: errors?.mediaVariation
                                    ?.minOrderQuantitytimeline?.message
                                    ? "1px solid red"
                                    : null,
                                }}
                              >
                                <Input
                                  disableUnderline
                                  {...register(
                                    "mediaVariation.minOrderQuantitytimeline",
                                    {
                                      onChange: (event) => {
                                        event.target.value = parseInt(
                                          event.target.value.replace(
                                            /[^\d]+/gi,
                                            ""
                                          ) || 0
                                        ).toLocaleString("en-US");
                                      },
                                    }
                                  )}
                                  sx={{
                                    ...inputStyles,
                                    width: "64px",
                                    padding: "5px",
                                  }}
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === " " &&
                                      e.target.selectionStart === 0
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  // disabled={unit === "Spot" ? true : false}
                                  placeholder={"Timeline"}
                                />
                                <Input
                                  disableUnderline
                                  // value={getValues()?.mediaVariation?.timeline}
                                  {...register("mediaVariation.Timeline")}
                                  disabled
                                  sx={{
                                    ...inputStyles,
                                    width: "65px",
                                    padding: "0px",
                                  }}
                                />
                              </Box>
                              <Typography
                                sx={{ color: "red", fontFamily: "Poppins" }}
                              >
                                {
                                  errors?.mediaVariation
                                    ?.minOrderQuantitytimeline?.message
                                }
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            mt: 1,
                          }}
                        >
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Max Order QTY Timeline{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>

                          <Box sx={{ display: "flex", gap: "10px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                // display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Box
                                sx={{
                                  background: "#fff",
                                  display: "flex",
                                  borderRadius: "10px",
                                  border: errors?.mediaVariation
                                    ?.maxOrderQuantitytimeline?.message
                                    ? "1px solid red"
                                    : null,
                                }}
                              >
                                <Input
                                  disableUnderline
                                  {...register(
                                    "mediaVariation.maxOrderQuantitytimeline",
                                    {
                                      onChange: (event) => {
                                        event.target.value = parseInt(
                                          event.target.value.replace(
                                            /[^\d]+/gi,
                                            ""
                                          ) || 0
                                        ).toLocaleString("en-US");
                                      },
                                    }
                                  )}
                                  onKeyDown={(e) => {
                                    if (
                                      e.key === " " &&
                                      e.target.selectionStart === 0
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  sx={{
                                    ...inputStyles,
                                    width: "64px",
                                    padding: "0px",
                                    ml: 1,
                                  }}
                                  // disabled={unit === "Spot" ? true : false}
                                  placeholder={"Timeline"}
                                />
                                <Input
                                  disableUnderline
                                  // value={getValues()?.mediaVariation?.timeline}
                                  {...register("mediaVariation.Timeline")}
                                  disabled
                                  sx={{
                                    ...inputStyles,
                                    width: "50px",
                                    padding: "0px",
                                  }}
                                />
                              </Box>
                              <Typography
                                sx={{ color: "red", fontFamily: "Poppins" }}
                              >
                                {
                                  errors?.mediaVariation
                                    ?.maxOrderQuantitytimeline?.message
                                }
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </>
                  )}

                  <OthercostPortion
                    append={(data, index) => {
                      if (index !== null) {
                        OthercostUpdate(index, data);
                      } else {
                        OthercostAppend(data);
                      }
                      SetOthercostEditId(null);
                    }}
                    defaultValue={
                      OthercostEditId !== null
                        ? OthercostFields[OthercostEditId]
                        : null
                    }
                    index={OthercostEditId}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      flexDirection: "column",
                      width: "98%",
                      mx: "auto",
                    }}
                  >
                    <TableContainer
                      sx={{
                        width: "auto",
                        borderRadius: "10px",
                        background: "transparent",
                        border:
                          OthercostFields.length === 0
                            ? "none"
                            : "1px solid #e3e3e3",
                        ml: 1,
                        overflow: "auto",
                        "::-webkit-scrollbar": {
                          display: "flex",
                          height: "6px",
                        },
                      }}
                    >
                      <Table
                        sx={{
                          [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                          },
                          // border: "1px solid #e3e3e3",
                          borderRadius: "10px",
                          overflowX: "scroll",
                          background: "transparent",
                        }}
                        size="small"
                        aria-label="a dense table"
                      >
                        {OthercostFields?.map((item, idx) => {
                          console.log("item", item);
                          return (
                            <>
                              <TableHead>
                                <TableRow>
                                  {OthercostFieldsarray?.map((data) => {
                                    console.log("fields Data Here", data);
                                    if (data === "id" || data === "listPeriod")
                                      return null;
                                    return (
                                      <TableCell
                                        align="left"
                                        key={data}
                                        sx={{
                                          ...tableDataStyle,
                                          padding: "10px",
                                          textTransform: "capitalize",
                                          whiteSpace: "nowrap",
                                        }}
                                        component="th"
                                        scope="row"
                                      >
                                        {data}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              </TableHead>
                              <TableBody
                                sx={{
                                  borderBottom: "1px solid #EDEFF2",
                                }}
                              >
                                <TableRow
                                  key={item}
                                  style={{
                                    borderBottom: "1px solid #e3e3e3",
                                    padding: "10px",
                                  }}
                                >
                                  <TableCell align="center" sx={TableCellStyle}>
                                    {item.AdCostApplicableOn}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    sx={{
                                      ...TableCellStyle,
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {item.CostPrice}
                                    {"  "}
                                    {item.currencyType === "BXITokens" ? (
                                      <img
                                        src={bxitoken}
                                        style={{
                                          width: "15px",
                                          height: "15px",
                                        }}
                                        alt="bxitoken"
                                      />
                                    ) : (
                                      item.currencyType
                                    )}
                                  </TableCell>
                                  <TableCell align="left" sx={TableCellStyle}>
                                    {item.AdCostHSN}
                                  </TableCell>
                                  <TableCell align="left" sx={TableCellStyle}>
                                    {item.AdCostGST} %
                                  </TableCell>
                                  <TableCell align="left" sx={TableCellStyle}>
                                    {item.ReasonOfCost}
                                  </TableCell>

                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      onClick={() => {
                                        SetOthercostEditId(idx);
                                      }}
                                    >
                                      <Box component="img" src={EditIcon} />
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        OthercostRemove(idx);
                                      }}
                                    >
                                      <Box component="img" src={RemoveIcon} />
                                    </Button>
                                  </Box>
                                </TableRow>
                              </TableBody>
                            </>
                          );
                        })}
                      </Table>
                    </TableContainer>
                  </Box>

                  <Box
                    sx={{
                      mt: 4,
                      height: "auto",
                      minHeight: "100px",
                      position: "relative",
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        mt: 1,
                        maxWidth: "100px",
                      }}
                    >
                      {/*   <Typography sx={{ ...CommonTextStyle, fontSize: "12px" }}>
                      Region
                    </Typography>
                    <Typography sx={{ ...CommonTextStyle, fontSize: "12px"}}>
                      {FetchedproductData?.GeographicalData?.region
                        ? "Your Selected Region :" +
                          FetchedproductData?.GeographicalData?.region
                        : null}
                      </Typography> */}

                      <Typography
                        sx={{
                          ...CommonTextStyle,
                          display: "flex",
                          flexDirection: "row",
                          fontSize: "12px",
                        }}
                      >
                        Region
                        {FetchedproductData?.GeographicalData ? (
                          <Typography
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            : {FetchedproductData?.GeographicalData?.region}
                          </Typography>
                        ) : null}{" "}
                        <span style={{ color: "red" }}> *</span>
                      </Typography>
                      <Select
                        disableUnderline
                        {...register("GeographicalData.region")}
                        sx={{
                          ...inputStyles,
                          border: errors?.GeographicalData?.region?.message
                            ? "1px solid red"
                            : null,
                        }}
                      >
                        <MenuItem value="West">West</MenuItem>
                        <MenuItem value="East ">East</MenuItem>
                        <MenuItem value="South">South</MenuItem>
                        <MenuItem value="North">North</MenuItem>
                        <MenuItem value="PAN India">PAN India</MenuItem>
                      </Select>
                      <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.GeographicalData?.region?.message}
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
                      <Typography sx={{ ...CommonTextStyle, fontSize: "12px" }}>
                        State <span style={{ color: "red" }}> *</span>
                      </Typography>
                      <Input
                        disableUnderline
                        // value={data.size}
                        // onChange={(e) => {
                        //   setTextilesDetails({
                        //     ...textTileDetails,
                        //     size: e.target.value,
                        //   });
                        // }}
                        placeholder="Eg. Maharashtra"
                        {...register("GeographicalData.state")}
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.selectionStart === 0) {
                            e.preventDefault();
                          }
                        }}
                        sx={{
                          width: "139px",
                          height: "42px",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                          px: 1,
                          color: "#445fd2",
                          fontSize: "12px",
                          border: errors?.GeographicalData?.state?.message
                            ? "1px solid red"
                            : null,
                        }}
                      />
                      <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.GeographicalData?.state?.message}
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
                      <Typography sx={{ ...CommonTextStyle, fontSize: "12px" }}>
                        City <span style={{ color: "red" }}> *</span>
                      </Typography>
                      <Input
                        disableUnderline
                        // value={data.gst}
                        // onChange={(e) => {
                        //   setTextilesDetails({
                        //     ...textTileDetails,
                        //     gst: e.target.value,
                        //   });
                        // }}
                        placeholder="Eg. Mumbai"
                        {...register("GeographicalData.city")}
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.selectionStart === 0) {
                            e.preventDefault();
                          }
                        }}
                        sx={{
                          width: "139px",
                          height: "42px",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                          px: 1,
                          color: "#445fd2",
                          fontSize: "12px",
                          border: errors?.GeographicalData?.city?.message
                            ? "1px solid red"
                            : null,
                        }}
                      />
                      <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.GeographicalData?.city?.message}
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
                      <Typography sx={{ ...CommonTextStyle, fontSize: "12px" }}>
                        Landmark <span style={{ color: "red" }}> *</span>
                      </Typography>
                      <Input
                        disableUnderline
                        // value={data.productIdType}
                        // onChange={(e) => {
                        //   setTextilesDetails({
                        //     ...textTileDetails,
                        //     productIdType: e.target.value,
                        //   });
                        // }}
                        placeholder="Eg. Juhu"
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.selectionStart === 0) {
                            e.preventDefault();
                          }
                        }}
                        {...register("GeographicalData.landmark")}
                        sx={{
                          width: "139px",
                          height: "42px",
                          background: "#FFFFFF",
                          borderRadius: "10px",
                          px: 1,
                          color: "#445fd2",
                          fontSize: "12px",
                          border: errors?.GeographicalData?.landmark?.message
                            ? "1px solid red"
                            : null,
                        }}
                      />
                      <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.GeographicalData?.landmark?.message}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      py: "20px",
                    }}
                  >
                    <Box
                      sx={{
                        fontFamily: "Poppins",
                        color: "#6B7A99",
                      }}
                    >
                      <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                        Select the best features that describes your
                        brand/product
                      </Typography>
                      <Typography sx={{ fontSize: "12px" }}>
                        {" "}
                        (the more features you write the more you are
                        discovered){" "}
                      </Typography>
                    </Box>

                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "20px",
                          mt: 1,
                        }}
                      >
                        <Typography sx={CommonTextStyle}>
                          Select Best Feature ( Min 5 ){" "}
                          <span style={{ color: "red" }}> *</span>
                        </Typography>
                        {/* <Typography sx={{ ...CommonTextStyle, color: "red" }}>
                    {items?.length === 0 ? "10 features Remaining" : ""}
                  </Typography> */}
                        <Select
                          // value={name}
                          onChange={(e) => setName(e.target.value)}
                          // {...register("additionalFeatures.selectbestfeature")}
                          sx={{
                            width: "100%",
                            ".MuiOutlinedInput-notchedOutline": { border: 0 },
                            "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                              {
                                border: 0,
                              },
                            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                              {
                                border: 0,
                              },
                            background: "#fff",
                            height: "100%",
                            borderRadius: "10px",
                            // color: "#ADB8CC",
                            fontSize: "12px",
                            color: "#445FD2",
                          }}
                          key={traits}
                          // onClick={(e) =>
                          //   setSingleTrait(
                          //     { ...singleTrait },
                          //     (e.target.key = traits),
                          //     (e.target.value = name)
                          //   )
                          // }
                        >
                          {/* {storefeatures?.map((item) => {
                      return (
                        <MenuItem
                          value={item.SampleLifestyleFeature}
                          sx={{ color: "#ADB8CC", fontSize: "12px" }}
                        >
                          {item.SampleLifestyleFeature}
                        </MenuItem>
                      );
                    })} */}
                          {/* <MenuItem
                      value="option1"
                      sx={{ color: "#ADB8CC", fontSize: "12px" }}
                    >
                      OPTION 1
                    </MenuItem>
                    <MenuItem
                      value="option2"
                      sx={{ color: "#ADB8CC", fontSize: "12px" }}
                    >
                      OPTION 2
                    </MenuItem>
                    <MenuItem
                      value="option3"
                      sx={{ color: "#ADB8CC", fontSize: "12px" }}
                    >
                      OPTION 3
                    </MenuItem> */}
                          {Feature?.map((el, idx) => {
                            return (
                              <MenuItem
                                key={idx}
                                value={el?.name}
                                sx={CommonTextStyle}
                              >
                                {el.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </Box>

                      <Box>
                        <Typography sx={{ ...CommonTextStyle, pt: "20px" }}>
                          Feature Description{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Typography>

                        <TextField
                          focused
                          multiline
                          variant="standard"
                          value={description}
                          placeholder="Eg. Larger then Life Ads Across the Large Screens"
                          // sx={{
                          //   width: "100%",
                          //   height: "42px",
                          //   background: "#FFFFFF",
                          //   borderRadius: "10px",
                          //   mt: 1,
                          // }}
                          sx={{
                            ...TextFieldStyle,
                            height: "100%",
                            color: "#445FD2",
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => setDescription(e.target.value)}
                          minRows={3}
                          // InputProps={InputPropsStyle}
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <Typography
                                variant="body1"
                                style={{
                                  fontFamily: "Poppins",
                                  fontSize: "12px",
                                  color: "#445FD2",
                                }}
                              ></Typography>
                            ),
                            style: {
                              fontFamily: "Poppins",
                              // color: " #6B7A99",
                              fontSize: "12px",
                              padding: "10px",
                              color: "#445FD2",
                            },
                          }}
                        />
                      </Box>

                      <Button
                        variant="contained"
                        onClick={handleItemAdd}
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

                      <Typography
                        sx={{
                          color: "#6B7A99",
                          fontFamily: "Poppins",
                          fonmtSize: "20px",
                          marginRight: "75%",
                          marginTop: "1rem",
                        }}
                      >
                        Key Features({items.length})
                      </Typography>

                      <Box sx={{ width: "100%" }}>
                        {items.map((item, index) => (
                          <Box
                            sx={{
                              border: "1px solid #E3E3E3",
                              marginTop: "1rem",
                              mx: "auto",
                              height: "auto",
                              width: "99%",
                              display: " flex",
                              flexDirection: "column",
                              placeItems: "center",
                              borderRadius: "10px",
                            }}
                          >
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                width: "97%",
                                height: "auto",
                                justifyContent: "space-between",
                                minHeight: "60px",
                              }}
                            >
                              <Typography sx={{ mapdata }}>
                                <Typography
                                  sx={{
                                    fontWeight: "bold",
                                    marginTop: "15px",
                                    fontSize: "12px",
                                    height: "auto",
                                    color: " #6B7A99",
                                    fontFamily: "Poppins",
                                  }}
                                >
                                  {item.name}
                                </Typography>

                                {item.description}
                              </Typography>

                              <Button
                                onClick={() => handleDelete(index)}
                                sx={{ textTransform: "none", fontSize: "15px" }}
                              >
                                X
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  {/* <Box
              sx={{
                py: "20px",
                display: "flex",
                gap: "20px",
                position: "relative",
              }}
            >
              <Button
                sx={{
                  color: "#6B7A99",
                  position: "absolute",
                  right: 0,
                }}
                onClick={OtherInformationSubmit}
              >
                + Add
              </Button>
              <Box
                sx={{
                  width: "100%",
                  height: "45px",
                  mt: "1%",
                  borderRadius: "10px",
                }}
              >
                <Typography sx={CommonTextStyle}>
                  Other Information buyer must know / Remarks
                </Typography>
                <TextField
                  {...register("otherInfoForBuyer")}
                  id="standard-basic"
                  variant="standard"
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
                    width: "100%",
                    height: "42px",
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    mt: 1,
                  }}
                />
              </Box>
            </Box>

            {OtherInfoArray.map((items) => {
              return (
                <Box
                  key={items}
                  sx={{
                    justifyContent: "space-between",
                    display: "flex",
                    mt: "30px",
                    width: "auto",
                    gap: "20px",
                    border: "1px solid #E3E3E3",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    id="standard-basic"
                    variant="standard"
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
                      width: "100%",
                      background: "transparent",
                      padding: "10px",
                    }}
                  >
                    {items}
                  </Typography>
                  <Box
                    component="img"
                    src={RemoveIcon}
                    onClick={() => {
                      let temp = OtherInfoArray.filter(
                        (item) => item !== items
                      );
                      setOtherInfoArray(temp);
                    }}
                  />
                </Box>
              );
            })} */}

                  <Box
                    sx={{
                      py: "20px",
                      display: "flex",
                      gap: "20px",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "45px",
                        mt: "1%",
                        borderRadius: "10px",
                      }}
                    >
                      <Typography sx={CommonTextStyle}>
                        Other Information buyer must know / Remarks{" "}
                        <span style={{ color: "red" }}> *</span>
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          background: "#fff",
                          borderRadius: "10px",
                        }}
                      >
                        <TextField
                          // {...register("otherInfoForBuyer")}
                          placeholder="Eg. J2K Conversion Charges to be Paid on Extra on actual "
                          value={otherinformation}
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onChange={(e) => {
                            setOtherInformation(e?.target?.value);
                          }}
                          id="standard-basic"
                          variant="standard"
                          InputProps={{
                            disableUnderline: "true",
                            style: {
                              fontSize: "14px",
                              padding: "7px",
                              color: "#445fd2",
                            },
                          }}
                          InputLabelProps={{
                            style: {
                              color: "red",
                            },
                          }}
                          sx={{
                            width: "100%",
                            height: "42px",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                          }}
                        />
                        <Button
                          sx={{
                            color: "#6B7A99",
                            // position: "absolute",
                            right: 0,
                            border: "none",
                            textTransform: "none",
                            fontSize: "12px",
                            // height: "42px",
                            alignSelf: "center",
                            "&:hover": {
                              border: "none",
                            },
                          }}
                          onClick={OtherInformationSubmit}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </Box>

                  {OtherInfoArray.map((items) => {
                    console.log("OtherInfoArray", OtherInfoArray);
                    return (
                      <Box
                        key={items}
                        sx={{
                          justifyContent: "space-between",
                          display: "flex",
                          mt: "30px",
                          width: "auto",
                          gap: "20px",
                          border: "1px solid #E3E3E3",
                          borderRadius: "10px",
                        }}
                      >
                        <Typography
                          id="standard-basic"
                          variant="standard"
                          InputProps={{
                            disableUnderline: "true",
                            style: {
                              color: "rgba(107, 122, 153)",
                              fontFamily: "Poppins",

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
                            fontFamily: "Poppins",
                            width: "100%",
                            background: "transparent",
                            padding: "10px",
                            color: "#445fd2",
                          }}
                        >
                          {items}
                        </Typography>
                        <Box
                          sx={{
                            // bgcolor: "red",
                            marginRight: "10px",
                          }}
                          component="img"
                          src={RemoveIcon}
                          onClick={() => {
                            let temp = OtherInfoArray.filter(
                              (item) => item !== items
                            );
                            setOtherInfoArray(temp);
                          }}
                        />
                      </Box>
                    );
                  })}
                  <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
                    <Typography sx={TypographyStyle}>
                      Tags <span style={{ color: "red" }}> *</span>
                    </Typography>
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
              height: "20%",
              bgcolor: "transparent",
            }}
          >
            <BottomNavigation
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                bgcolor: "transparent",
                p: "10px",
                // boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
              }}
              showLabels
            >
              {/*   <Button
                sx={{
                  marginRight: "auto",
                  p: "2%",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  color: "#6B7A99",
                  fontSize: "14px",
                  textTransform: "none",
                  display: "flex",
                  gap: "10px",
                }}
                onClick={() => {
                  reset();
                  setOtherInformation([]);
                  setDescription("");
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
                  // onClick={handleConsole}
                  // onClick={() => {
                  //   navigate("/home/mediaonline/mediatechinfo/:id");
                  // }}
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
};

export default MediaProductInfo;

const StyledLabel = styled("span")({
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#6B7A99",
});

const SizesTextFontStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "13px",
  lineHeight: "10px",
  textAlign: "center",
  color: "#445FD2",
};

const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "21px",
  color: "#6B7A99",
};

const InputsInsideText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "18px",
  color: "#445FD2",
};
const TextFieldStyle = {
  width: "100%",
  height: "48px",
  background: "#fff",
  borderRadius: "9px",
  border: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#6B7A99",
  overflow: "auto",
  paddingLeft: "0px",
  "&:focus": {
    outline: "none",
  },
};
const mapdata = {
  color: " #6B7A99",
  fontFamily: "Poppins",
  width: "100%",
  fontSize: "12px",
  minHeight: "60px",
  height: "auto",
};
const SelectbestfeatureText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "21px",
  color: "#6B7A99",
};
const SelectbestfeatureTexttwo = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "10px",
  lineHeight: "13px",
  color: "#6B7A99",
};

const DropDownSelect = () => {
  return (
    <Select
      sx={{
        bgcolor: "#fff",
        borderRadius: "10px",
        color: "white",
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#fff",
        },
        ".MuiSvgIcon-root ": {
          fill: "#ADB8CC !important",
          fontSize: "22px",
        },
      }}
      labelId="select-filter-by-field-labe;"
      id="select-filter-by-field"
      value={"some value"}
      defaultValue="Grey"
    >
      <MenuItem value="Grey" sx={InputsInsideText}>
        Grey
      </MenuItem>
    </Select>
  );
};

const tableHeaderStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: "12px",
  color: "#6B7A99",
  opacity: 0.4,
};

const tableDataStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 12,
  color: "#6B7A99",
};

const TableCellStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 12,
  textAlign: "center",
  color: "#445FD2",
  overflow: "scroll",
  whiteSpace: "nowrap",
};

const GenderBoxStyle = {
  // border: "1px solid #445fd2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  heigth: "97px",
  width: "75px",
  padding: "10px",
  gap: "20px",
  borderRadius: "10px",
  background: "#fff",
};

const GenderIconStyle = {
  width: "30px",
  height: "30px",
};

const lablechange = {
  fontFamily: "Poppins",
  color: "#6B7A99",
  fontSize: "16px",
  display: "grid",
  textAlign: "left",
  marginTop: "2rem",
  fontWeight: "bold",
  background: "red",
  // borderBottom: "1px solid #E8E8E8",
  "&:focus": {
    border: "1px solid #E8E8E8",
  },
};

const inputStyles = {
  width: "110px",
  height: "42px",
  background: "#FFFFFF",
  borderRadius: "10px",
  padding: "0px 10px",
  fontSize: "12px",
  color: "#445fd2",
};
const TypographyStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#6B7A99",
};

const MenuItems = {
  fontSize: "12px",
  color: "#445FD2",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
};
