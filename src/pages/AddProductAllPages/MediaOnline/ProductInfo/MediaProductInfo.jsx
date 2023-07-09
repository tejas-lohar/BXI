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
import stackofcoins from "../../../../assets/Stack of Coins.svg";
import InfoIcon from "../../../../assets/InfoIcon.svg";
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
// import MediaOtherCost from "./MediaOtherCost";
import OthercostPortion from "../../Textile/ProductInfo/OthercostPortion.jsx";
import bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";
import { toast, ToastContainer } from "react-toastify";
import Bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";
import axios from "axios";
import ToolTip from "../../../../components/ToolTip";
import { useEffectOnce } from "react-use";
const LocationArr = [
  "Specific",
  "position",
  "main area",
  "lobby",
  "foyer",
  "wall area",
  "washrooms",
  "billing counter",
  "passage",
  "On screen",
  "On Air",
  "other",
];
function filterMultiples(array, multiple) {
  return array.filter(function (value) {
    return value % multiple === 0;
  });
}
const MediaProductInfo = () => {
  const ProductId = useParams().id;
  const navigate = useNavigate();
  console.log("ProductId", ProductId);
  const GSTOptions = [0, 5, 12, 18, 28];
  const [unit, setUnit] = useState("");
  const [Timeline, setTimeline] = useState("");
  const [ProductData, setProductData] = useState();
  const [modelName, setModelName] = useState();
  const [FetchedproductData, setFetchedpProuctData] = useState();
  const [HSNStore, setHSNStore] = useState();
  const [hsnCode, setHsnCode] = useState();
  const [onlyState, setOnlyState] = useState(false);
  const [justState, setJustState] = useState(false);
  const [paythru, setPaythru] = useState({
    bxitokens: "",
    inr: "",
  });
  const tagInputRef = useRef(null);

  const [OthercostEditId, SetOthercostEditId] = useState(null);
  const [customhsnFields, setCustomHSNFields] = useState(false);
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
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        medianame:
          FetchedproductData?.ProductSubCategory === "643cda0c53068696706e3951"
            ? z.any()
            : z.string().min(1),
        offerningbrandat:
          FetchedproductData?.ProductSubCategory === "643cda0c53068696706e3951"
            ? z.any()
            : z.string().min(1),
        multiplexScreenName:
          FetchedproductData?.ProductSubCategory === "643cda0c53068696706e3951"
            ? z.string().min(1)
            : z.any(),
        mediaVariation: z.object({
          location: z.any(),
          unit: z.any(),
          Timeline: z.any(),
          repetition: z.coerce.number().min(1),
          dimensionSize: z.string().min(1),
          PricePerUnit: z.coerce.string().min(1),
          DiscountedPrice: z.coerce.string().min(1),
          GST: z.coerce.number().gte(1).lte(28),
          HSN: z.coerce.number().min(1),
          minOrderQuantityunit:
            FetchedproductData?.ProductSubCategory ===
            "643cda0c53068696706e3951"
              ? z.any()
              : z.coerce.string().min(1),
          minOrderQuantitytimeline: z.coerce.string().min(1),
          maxOrderQuantityunit:
            FetchedproductData?.ProductSubCategory ===
            "643cda0c53068696706e3951"
              ? z.any()
              : z.coerce.string().min(1),
          seatingCapacity: "643cda0c53068696706e3951"
            ? z.coerce.string().min(1)
            : z.any(),
          maxOrderQuantitytimeline: z.coerce.string().min(1),
          maxTimeslotSeconds: z.coerce.number().min(1),
          minTimeslotSeconds: z.coerce.number().min(1),
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
        Timeline: "Week",
        unit: "Screen",
      },
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "ProductsVariantions", // unique name for your Field Array
    });
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
  const SecondsFieldArr = [
    10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
    180,
  ];

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

  const {
    fields: OthercostFields,
    append: OthercostAppend,
    remove: OthercostRemove,
    update: OthercostUpdate,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "Othercost", // unique name for your Field Array
  });

  const [data, setData] = useState([]);
  const { id } = useParams();

  //Additional feature states and functions
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [storefeatures, setStorefeatures] = useState([]);
  const [traits, setTraits] = useState([]);
  const [MaxtimeslotArr, setMaxtimeslotArr] = useState([]);
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
      return toast.error("feature discription less than 25 letters", {
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

  const [otherinformation, setOtherInformation] = useState("");
  const [OtherInfoArray, setOtherInfoArray] = useState([]);

  const OtherInformationSubmit = (e) => {
    e.preventDefault();
    if (otherinformation.trim() !== "") {
      setOtherInformation("");
      setOtherInfoArray([...OtherInfoArray, otherinformation]);
    } else {
      return;
    }
  };
  // useEffect(() => {
  //   console.log("VALUES", getValues());
  //   console.log("mediaVariation", getValues().mediaVariation);
  // });

  async function FetchAddedProduct() {
    await axios
      .get(`product/get_product_byId/${ProductId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res.data);
        return res.data;
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
    if (FetchedproductData?.ProductSubCategory === "643cda0c53068696706e3951") {
      setValue("mediaVariation.unit", "Screen");
      setValue("mediaVariation.Timeline", "Week");
    }
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
    } else if (items.length > 25) {
      return toast.error("Please Select Best Feature ( max 25 )", {
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
            navigate(`/home/mediaonline/mediaonlinetechinfo/${id}`);
          }
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
      console.log("datahere", datatobesent);
    }
  });

  let result = [];
  let multipliedArr = [];

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
          <Box>
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
                  {FetchedproductData?.ProductSubCategory ===
                  "643cda0c53068696706e3951" ? (
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Typography sx={{ ...CommonTextStyle, pt: "20px" }}>
                          Screen / Name / Location{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Typography>

                        <TextField
                          focused
                          multiline
                          placeholder="Eg. Plasma digital screen ads"
                          variant="standard"
                          {...register("multiplexScreenName")}
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
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
                            minHeight: "47px",
                            height: "auto",
                            border: errors["multiplexScreenName"]
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
                        <Typography
                          sx={{ color: "red", fontFamily: "Poppins" }}
                        >
                          {errors?.multiplexScreenName?.message}
                        </Typography>
                      </Box>
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

                        <Select
                          disableUnderline
                          defaultValue={"BMP"}
                          {...register("offerningbrandat")}
                          sx={{
                            ...inputStyles,
                            width: "100%",
                            marginTop: "10px",
                          }}
                        >
                          <MenuItem value="BMP">BMP</MenuItem>
                          <MenuItem value="Interval">Interval</MenuItem>
                          <MenuItem value="Both">Both</MenuItem>
                        </Select>
                        <Typography
                          sx={{ color: "red", fontFamily: "Poppins" }}
                        >
                          {errors?.offerningbrandat?.message}
                        </Typography>
                      </Box>
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
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Seating Capacity
                          </Typography>

                          <Input
                            disableUnderline
                            placeholder="256"
                            {...register("mediaVariation.seatingCapacity")}
                            sx={{
                              ...inputStyles,
                              mt: 1.2,
                              width: "140px",
                              border: errors?.mediaVariation?.seatingCapacity
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
                            {errors?.mediaVariation?.seatingCapacity?.message}
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
                            sx={{
                              ...CommonTextStyle,
                              fontSize: "12px",
                              mb: 0.05,
                            }}
                          >
                            Rate Screen / Week{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>

                          <Box sx={{ position: "relative" }}>
                            <Input
                              disableUnderline
                              placeholder="3000"
                              // value={data.mro}
                              // type="number"
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
                              mb: 0.05,
                            }}
                          >
                            Discounted Price{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Box sx={{ position: "relative" }}>
                            <Input
                              disableUnderline
                              placeholder="2000"
                              // value={data.discount}
                              // type="number"
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
                            Repetition <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Input
                            disableUnderline
                            placeholder="28 Per week"
                            {...register("mediaVariation.repetition")}
                            sx={{
                              ...inputStyles,
                              mt: 1.2,
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
                      </Box>
                      <Box
                        sx={{
                          height: "auto",
                          minHeight: "100px",
                          position: "relative",
                          display: "flex",
                          flexWrap: "wrap",
                          // justifyContent: "space-between",
                          gap: "20px",
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
                            Dimension Size{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Input
                            placeholder="2048 X 998"
                            disableUnderline
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

                        {/* <Box
                          sx={{
                            height: "auto",
                            minHeight: "100px",
                            position: "relative",
                            // display: "flex",
                            // flexWrap: "wrap",
                            // justifyContent: "flex-start",
                            // flexDirection: "row",
                            // gap: "30px",
                          }}
                        > */}
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
                            Min Order Timeslot{" "}
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
                                  // background: "#fff",
                                  display: "flex",
                                  borderRadius: "10px",
                                  gap: "5px",
                                }}
                              >
                                <Select
                                  disableUnderline
                                  {...register(
                                    "mediaVariation.minTimeslotSeconds",
                                    {
                                      onChange: (e) => {
                                        setOnlyState(!onlyState);
                                      },
                                    }
                                  )}
                                  sx={{
                                    ...inputStyles,
                                    width: "60px",
                                    padding: "0px",
                                    ml: 1,
                                    // border: "1px white solid",
                                    border: errors?.mediaVariation
                                      ?.minTimeslotSeconds?.message
                                      ? "1px solid red"
                                      : null,
                                  }}
                                >
                                  {SecondsFieldArr?.map((item, idx) => {
                                    return (
                                      <MenuItem
                                        sx={{
                                          border: "1px white solid",
                                        }}
                                        onClick={() => {
                                          // data = ;
                                          setMaxtimeslotArr(
                                            filterMultiples(
                                              SecondsFieldArr,
                                              item
                                            )
                                          );
                                          console.log(
                                            "resultarrat",
                                            MaxtimeslotArr
                                          );
                                        }}
                                        value={item}
                                      >
                                        {item}
                                      </MenuItem>
                                    );
                                  })}
                                  {/* <MenuItem value="seconds">Seconds</MenuItem> */}
                                </Select>
                                <Input
                                  disableUnderline
                                  // value={getValues()?.mediaVariation?.timeline}
                                  // {...register("mediaVariation.Timeline")}
                                  value={"seconds"}
                                  disabled
                                  sx={{
                                    ...inputStyles,
                                    width: "60px",
                                    paddingY: "0.5px",
                                  }}
                                />
                              </Box>
                              <Typography
                                sx={{ color: "red", fontFamily: "Poppins" }}
                              >
                                {
                                  errors?.mediaVariation?.minTimeslotSeconds
                                    ?.message
                                }
                              </Typography>
                              <Typography
                                sx={{
                                  ...CommonTextStyle,
                                  fontSize: "12px",
                                }}
                              >
                                {FetchedproductData?.mediaVariation
                                  ?.minTimeslotSeconds
                                  ? "Selected minTimeslotSeconds :" +
                                    FetchedproductData?.mediaVariation
                                      ?.minTimeslotSeconds
                                  : null}
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
                            Max Order Timeslot{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              // flexDirection: "column",
                              gap: "10px",
                            }}
                          >
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
                                  // background: "#fff",
                                  display: "flex",
                                  borderRadius: "10px",
                                  gap: "5px",
                                }}
                              >
                                <Select
                                  disableUnderline
                                  {...register(
                                    "mediaVariation.maxTimeslotSeconds"
                                  )}
                                  sx={{
                                    ...inputStyles,
                                    width: "60px",
                                    padding: "0px",
                                    ml: 1,
                                    border: errors?.mediaVariation
                                      ?.maxTimeslotSeconds?.message
                                      ? "1px solid red"
                                      : null,
                                  }}
                                >
                                  {MaxtimeslotArr?.map((item, idx) => {
                                    if (
                                      Number(
                                        getValues()?.mediaVariation
                                          ?.minTimeslotSeconds
                                      ) >= Number(item)
                                    )
                                      return null;

                                    return (
                                      <MenuItem value={item}>{item}</MenuItem>
                                    );
                                  })}
                                  {/* <MenuItem value="seconds">Seconds</MenuItem> */}
                                </Select>
                                <Input
                                  disableUnderline
                                  // value={getValues()?.mediaVariation?.timeline}
                                  // {...register("mediaVariation.Timeline")}
                                  value={"seconds"}
                                  disabled
                                  sx={{
                                    ...inputStyles,
                                    width: "60px",
                                    paddingY: "0.5px",
                                  }}
                                />
                              </Box>
                              <Typography
                                sx={{ color: "red", fontFamily: "Poppins" }}
                              >
                                {
                                  errors?.mediaVariation?.maxTimeslotSeconds
                                    ?.message
                                }
                              </Typography>
                              <Typography
                                sx={{
                                  ...CommonTextStyle,
                                  fontSize: "12px",
                                }}
                              >
                                {FetchedproductData?.mediaVariation
                                  ?.maxTimeslotSeconds
                                  ? "Selected maxTimeslotSeconds :" +
                                    FetchedproductData?.mediaVariation
                                      ?.maxTimeslotSeconds
                                  : null}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        {/* </Box> */}

                        {/* <Box
                          sx={{
                            display: "flex",
                          }}
                        > */}
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
                                  placeholder={"Timeline"}
                                />
                                <Input
                                  disableUnderline
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
                          {/* </Box> */}
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
                    </Box>
                  ) : (
                    <Box>
                      {/* for media online default flow */}
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
                          placeholder="Eg. Plasma digital screen ads"
                          variant="standard"
                          {...register("medianame")}
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
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
                            minHeight: "47px",
                            height: "auto",
                            border: errors["medianame"]
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
                              color: " #445fd2",
                              fontSize: "12px",
                              fontWeight: 400,
                              lineHeight: "20px",
                            },
                          }}
                        />
                        <Typography
                          sx={{ color: "red", fontFamily: "Poppins" }}
                        >
                          {errors?.medianame?.message}
                        </Typography>
                      </Box>
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
                          placeholder="Eg. Near Concession area"
                          // value={description}
                          // onChange={(e) => setDescription(e.target.value)}
                          {...register("offerningbrandat")}
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
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
                            minHeight: "47px",
                            height: "auto",
                            border: errors["offerningbrandat"]
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
                            sx={{ ...CommonTextStyle, fontSize: "12px" }}
                          >
                            Location <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Typography
                            sx={{
                              ...CommonTextStyle,
                              fontSize: "12px",
                              fontWeight: 400,
                              border: errors?.mediaVariation?.location?.message
                                ? "1px solid red"
                                : null,
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
                            }}
                          >
                            {LocationArr.map((item) => {
                              return <MenuItem value={item}>{item}</MenuItem>;
                            })}
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
                            Timeline <span style={{ color: "red" }}> *</span>
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
                            {...register("mediaVariation.Timeline", {})}
                            sx={{
                              ...inputStyles,
                              width: "140px",
                              border: errors?.mediaVariation?.Timeline?.message
                                ? "1px solid red"
                                : null,
                            }}
                            // disabled={unit === "Spot" ? true : false}
                          >
                            <MenuItem
                              value="Day"
                              onClick={() => {
                                setOnlyState(!onlyState);
                              }}
                            >
                              {" "}
                              Per Day{" "}
                            </MenuItem>
                            <MenuItem
                              value="Week"
                              onClick={() => {
                                setOnlyState(!onlyState);
                              }}
                            >
                              {" "}
                              Per Week{" "}
                            </MenuItem>
                            <MenuItem
                              value="Month"
                              onClick={() => {
                                setOnlyState(!onlyState);
                              }}
                            >
                              {" "}
                              Per Month{" "}
                            </MenuItem>
                            <MenuItem
                              value="One Time"
                              onClick={() => {
                                setOnlyState(!onlyState);
                              }}
                            >
                              {" "}
                              Per One Time{" "}
                            </MenuItem>
                            <MenuItem
                              value="Year"
                              onClick={() => {
                                setOnlyState(!onlyState);
                              }}
                            >
                              {" "}
                              Per Year{" "}
                            </MenuItem>
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
                            Repetition <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Input
                            disableUnderline
                            placeholder="28 Per week"
                            {...register("mediaVariation.repetition")}
                            sx={{
                              ...inputStyles,
                              mt: 1.2,
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
                            Dimension Size{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Input
                            placeholder="2048 X 998"
                            disableUnderline
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
                              placeholder="3000"
                              // value={data.mro}
                              // type="number"
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
                            Discounted Price{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Box sx={{ position: "relative" }}>
                            <Input
                              disableUnderline
                              placeholder="2000"
                              // value={data.discount}
                              // type="number"
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
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
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
                                  placeholder={"Timeline"}
                                />
                                <Input
                                  disableUnderline
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
                            Min Order Timeslot{" "}
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
                                  // background: "#fff",
                                  display: "flex",
                                  borderRadius: "10px",
                                  gap: "10px",
                                }}
                              >
                                <Select
                                  disableUnderline
                                  {...register(
                                    "mediaVariation.minTimeslotSeconds",
                                    {
                                      onChange: (e) => {
                                        setOnlyState(!onlyState);
                                      },
                                    }
                                  )}
                                  sx={{
                                    ...inputStyles,
                                    width: "140px",
                                    padding: "0px",
                                    ml: 1,
                                    // border: "1px white solid",
                                    border: errors?.mediaVariation
                                      ?.minTimeslotSeconds?.message
                                      ? "1px solid red"
                                      : null,
                                  }}
                                >
                                  {SecondsFieldArr?.map((item, idx) => {
                                    return (
                                      <MenuItem
                                        sx={{
                                          border: "1px white solid",
                                        }}
                                        onClick={() => {
                                          // data = ;
                                          setMaxtimeslotArr(
                                            filterMultiples(
                                              SecondsFieldArr,
                                              item
                                            )
                                          );
                                          console.log(
                                            "resultarrat",
                                            MaxtimeslotArr
                                          );
                                        }}
                                        value={item}
                                      >
                                        {item}
                                      </MenuItem>
                                    );
                                  })}
                                  {/* <MenuItem value="seconds">Seconds</MenuItem> */}
                                </Select>
                                <Input
                                  disableUnderline
                                  // value={getValues()?.mediaVariation?.timeline}
                                  // {...register("mediaVariation.Timeline")}
                                  value={"seconds"}
                                  disabled
                                  sx={{
                                    ...inputStyles,
                                    width: "70px",
                                    paddingY: "0.5px",
                                  }}
                                />
                              </Box>
                              <Typography
                                sx={{ color: "red", fontFamily: "Poppins" }}
                              >
                                {
                                  errors?.mediaVariation?.minTimeslotSeconds
                                    ?.message
                                }
                              </Typography>
                              <Typography
                                sx={{
                                  ...CommonTextStyle,
                                  fontSize: "12px",
                                }}
                              >
                                {FetchedproductData?.mediaVariation
                                  ?.minTimeslotSeconds
                                  ? "Selected minTimeslotSeconds :" +
                                    FetchedproductData?.mediaVariation
                                      ?.minTimeslotSeconds
                                  : null}
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
                            Max Order Timeslot{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              // flexDirection: "column",
                              gap: "10px",
                            }}
                          >
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
                                  // background: "#fff",
                                  display: "flex",
                                  borderRadius: "10px",
                                  gap: "10px",
                                }}
                              >
                                <Select
                                  disableUnderline
                                  {...register(
                                    "mediaVariation.maxTimeslotSeconds"
                                  )}
                                  sx={{
                                    ...inputStyles,
                                    width: "140px",
                                    padding: "0px",
                                    ml: 1,
                                    border: errors?.mediaVariation
                                      ?.maxTimeslotSeconds?.message
                                      ? "1px solid red"
                                      : null,
                                  }}
                                >
                                  {MaxtimeslotArr?.map((item, idx) => {
                                    if (
                                      Number(
                                        getValues()?.mediaVariation
                                          ?.minTimeslotSeconds
                                      ) >= Number(item)
                                    )
                                      return null;

                                    return (
                                      <MenuItem value={item}>{item}</MenuItem>
                                    );
                                  })}
                                  {/* <MenuItem value="seconds">Seconds</MenuItem> */}
                                </Select>
                                <Input
                                  disableUnderline
                                  // value={getValues()?.mediaVariation?.timeline}
                                  // {...register("mediaVariation.Timeline")}
                                  value={"seconds"}
                                  disabled
                                  sx={{
                                    ...inputStyles,
                                    width: "70px",
                                    paddingY: "0.5px",
                                  }}
                                />
                              </Box>
                              <Typography
                                sx={{ color: "red", fontFamily: "Poppins" }}
                              >
                                {
                                  errors?.mediaVariation?.maxTimeslotSeconds
                                    ?.message
                                }
                              </Typography>
                              <Typography
                                sx={{
                                  ...CommonTextStyle,
                                  fontSize: "12px",
                                }}
                              >
                                {FetchedproductData?.mediaVariation
                                  ?.maxTimeslotSeconds
                                  ? "Selected maxTimeslotSeconds :" +
                                    FetchedproductData?.mediaVariation
                                      ?.maxTimeslotSeconds
                                  : null}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
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
                      mt: 3,
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
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.selectionStart === 0) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="Eg. Maharashtra"
                        {...register("GeographicalData.state")}
                        sx={{
                          mt: 1.2,
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
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.selectionStart === 0) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="Eg. Mumbai"
                        {...register("GeographicalData.city")}
                        sx={{
                          mt: 1.2,
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
                        Landmark
                      </Typography>
                      <Input
                        disableUnderline
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.selectionStart === 0) {
                            e.preventDefault();
                          }
                        }}
                        placeholder="Eg. Juhu"
                        {...register("GeographicalData.landmark")}
                        sx={{
                          mt: 1.2,
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
                        >
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
                          placeholder="Eg. Larger then Life Ads Across the Large Screens"
                          value={description}
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
                              e.preventDefault();
                            }
                          }}
                          sx={{
                            ...TextFieldStyle,
                            height: "100%",
                            color: "#445FD2",
                            background: "#FFFFFF",
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
                        pb: "5px",
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
                          placeholder="Eg. Technical Charges to be Paid on Extra on actual"
                          value={otherinformation}
                          onChange={(e) => {
                            setOtherInformation(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (
                              e.key === " " &&
                              e.target.selectionStart === 0
                            ) {
                              e.preventDefault();
                            }
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
