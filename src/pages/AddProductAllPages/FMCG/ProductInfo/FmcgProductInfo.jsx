import {
  BottomNavigation,
  Box,
  Button,
  CircularProgress,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { zodResolver } from "@hookform/resolvers/zod";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import EditIcon from "../../../../assets/Images/CommonImages/EditIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import RemoveIcon from "../../../../assets/Images/CommonImages/RemoveIcon.svg";
import stackofcoins from "../../../../assets/Stack of Coins.svg";
import FMCGProductInform from "./FMCGProductInform.jsx";
import { useUpdateProductQuery } from "./ProductHooksQuery";
// import FMCGProductVariations from "./FMCGProductVariations.jsx";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import dayjs from "dayjs";
import { useEffectOnce } from "react-use";
import bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";
import ToolTip from "../../../../components/ToolTip";
import OthercostPortion from "../../Textile/ProductInfo/OthercostPortion.jsx";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const FMCGProductInfo = () => {
  const [editId, SetEditId] = useState(null);
  const ProductId = useParams().id;
  const navigate = useNavigate();
  const [size, setSize] = useState("Length");
  const [form, setForm] = useState("dry");
  const [isChecked, setIsChecked] = useState(false);
  let skippedCount = 0;
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    // setExpiryDate(null);
    // setValue("expirydate", null);
  };
  const [currency, setCurrency] = useState({
    currencyType: "",
    amount: "",
    reasonOfCost: "",
  });
  const [bestFeatures, setBestFeatures] = useState({
    selectedbestFeature: "",
    featureDescription: "",
  });
  const [bestFeaturesArr, setBestFeaturesArr] = useState([]);
  const [costsArr, setCostsArr] = useState([]);
  let ArrayForCurrencyData = [];
  const [HSNStore, setHSNStore] = useState();
  const [ProductData, setProductData] = useState("");
  const [traits, setTraits] = useState([]);
  const [ExpiryDate, setExpiryDate] = useState();
  const [ManufacturingData, setManufacturingData] = useState();
  const [MinManufacturingData, setMinManufacturingData] = useState();

  const [pickup, setPickup] = useState({
    pickupLocation: "",
    pickupPinCode: "",
  });
  const [paythru, setPaythru] = useState({
    bxitokens: "",
    inr: "",
  });

  const [OthercostEditId, SetOthercostEditId] = useState(null);

  const [Feature, setFeature] = useState();

  const getAllFeature = async () => {
    await axios
      .get("fmcgproinfo/Get_fmcg_productinfo", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res.data);
        setFeature(res.data);
      })
      .catch((err) => console.log(err));
  };
  console.log("getAllFeature ==>", Feature);
  async function FetchAddedProduct() {
    await axios
      .get(`product/get_product_byId/${ProductId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res.data);
        fetchHsnCode(res.data?.ProductSubCategory);
        return res.data;
      });
  }

  async function fetchHsnCode(props) {
    await axios
      .post(
        "hsn/Get_HSNCode",
        { SubCatId: props },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setHSNStore(res.data);
      });
  }

  useEffect(() => {
    FetchAddedProduct();
  }, []);
  useEffect(() => {
    getAllFeature();
    console.log("====>costsArr", costsArr);
  }, []);
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
        // gst: z.string().length(15),
        // size: z.string(),
        // fields: z.any(),
        // sampleavailability: z.string().min(1),
        // minimumorderqty: z.string().min(1),
        // priceofsample: z.string().min(1),
        // othercost: z.any(),
        // selectbestfeature: z.string().min(1),
        // featuredescription: z.string().min(1),
        // // traits: z.any(),
        // additionalFeatures: z.object({
        //   selectbestfeature: z.string().min(1),
        //   featuredescription: z.string().min(1),
        // }),
        // otherCost: z.any(),
        // packagerelateddates: z.object({
        //   // productpickuplocation: z.string().min(1),
        //   // pickuplocationpincode: z.string().min(1),
        manufacturingdate: z.date(),
        // expirydate: z.date().optional(),
        // }),
        // ShelfLife: z.string().min(1),
        // ShelfLifePeriod: z.string().min(1),
        // manufacturingdate: z.string().min(1),
        // expirydate: z.string().min(1),
        productContentInfo: z.string().min(1),
        locationdetails: z.object({
          region: z.string().min(1),
          state: z.string().min(1),
          city: z.string().min(1),
          landmark: z.string().min(1),
          pincode: z.coerce.number().refine(
            (v) => {
              if (String(v).length !== 6) {
                return false;
              }
              return true;
            },
            {
              message: "Please Input 6 Digit Pin Code",
            }
          ),
        }),
      })
    ),
    defaultValues: {
      size: "",
      fields: "",
      sampleavailability: "",
      minimumorderqty: "",
      priceofsample: "",
      othercost: "",
      selectbestfeature: "",
      featuredescription: "",
      selectedbestFeature: "",
      otherCost: "",
      productpickuplocation: "",
      pickuplocationpincode: "",
      manufacturingdate: "",
      expirydate: "",
    },
  });
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "ProductsVariantions", // unique name for your Field Array
    });
  const {
    fields: OthercostFields,
    append: OthercostAppend,
    remove: OthercostRemove,
    update: OthercostUpdate,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "Othercost", // unique name for your Field Array
  });
  const {
    mutate: updateProduct,
    isLoading,
    isError,
    data: productData,
    variables,
    error: RegisterError,
  } = useUpdateProductQuery();

  console.log("errors", errors);

  useEffect(() => {
    setValue("traits", fields);
    setValue("othercost", OthercostFields);
  }, [fields, OthercostFields]);
  const [data, setData] = useState([]);
  const { id } = useParams();

  //Additional feature states and functions
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleItemAdd = (e) => {
    e.preventDefault();
    // function countInArray() {
    //   var count = 0;
    //   for (var i = 0; i < items.length; i++) {
    //     if (items[i].name === "Other") {
    //       count++;
    //     }
    //   }
    //   return count;
    // }
    // countInArray();
    // console.log("others count ", countInArray());
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
    } else if (name === "") {
      return toast.error(" please add key features ", {
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
    } else if (description.length > 75) {
      return toast.error(" feature discription less than 75 letters ", {
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

  const [additionalData, setAdditionalData] = useState([]);
  // const [dataToMap, setDataToMAp] = useState([]);

  const [CostPrice, setCostPrice] = useState("");
  const [ReasonOfCost, setReasonOfCost] = useState("");

  // console.log("additionalData", additionalData);

  useEffect(() => {
    setAdditionalData([...additionalData, { CostPrice, ReasonOfCost }]);
    // console.log("additionalData", additionalData);
  }, [CostPrice, ReasonOfCost]);

  const secondSubmit = (e) => {
    // setDataToMAp(getValues());
    ArrayForCurrencyData.push(getValues().CostPrice);
    e.preventDefault();
    const newitems = { CostPrice, ReasonOfCost };
    setAdditionalData([...additionalData, newitems]);
    setCostPrice("");
    setReasonOfCost("");
    // if (errors) {
    //   console.log(errors);
    // } else if (!isValid) {
    //   return;
    // }
  };

  const updateProductTotextilestatus = handleSubmit((data) => {
    const manufacturingDate = new Date(ManufacturingData);
    const expiryDate = ExpiryDate ? new Date(ExpiryDate) : null;

    // Function to count days between two dates
    function countDaysBetweenDates(startDate, endDate) {
      if (startDate && endDate) {
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
        const diffInDays = Math.round((endDate - new Date()) / oneDay);
        return diffInDays;
      }
      return null;
    }

    const daysBetweenDates = countDaysBetweenDates(
      manufacturingDate,
      expiryDate
    );

    const ProductUpdatedata = {
      id: ProductId,
      ProductsVariantions: getValues()?.ProductsVariantions,
      OtherCost: OthercostFields,
      ProductFeatures: items,
      ProductPickupLocation:
        getValues()?.packagerelateddates?.productpickuplocation,
      PickupLocationPinCode:
        getValues()?.packagerelateddates?.pickuplocationpincode,
      ManufacturingDate: new Date(ManufacturingData),
      ExpiryDate: ExpiryDate ? new Date(ExpiryDate) : null,
      GapBetweenDays: daysBetweenDates,
      LocationDetails: getValues()?.locationdetails,
      // ShelfLifePeriod: getValues()?.packagerelateddates?.shelflifeperiod,
      formofProduct: form,
      productContentInformation: data.productContentInfo,
      ProductUploadStatus: "technicalinformation",
    };
    if (ProductUpdatedata.ProductsVariantions.length === 0) {
      return toast.error("Please Fill All The Neccessary Fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (ProductUpdatedata.ProductFeatures.length < 5) {
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
    } else if (ProductUpdatedata.ProductFeatures.length > 20) {
      return toast.error("Please Select Best Feature ( Max 20 )", {
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
      updateProduct(ProductUpdatedata, {
        onSuccess: (response) => {
          if (response.status === 200) {
            navigate(`/home/fmcg/fmcgtechinfo/${id}`);
          }
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
      console.log("ProductUpdatedata here", ProductUpdatedata);
    }
    // updateProduct(data, {
    //   onSuccess: (response) => {
    //     console.log("response", response);
    //   },
    // });
  });
  // const secondEdit
  // console.log("itemhere", fields);
  // console.log("errors", errors);
  const ArrayFields = [
    "Flavor",
    "HSN",
    "GST",
    "ProductIdType",
    "PricePerUnit",
    "DiscountedPrice",
    "MinOrderQuantity",
    "MaxOrderQuantity",
    "Length",
    "MeasureMentUnit",
    "Height",
    "Width",
    "Volume",
    "Calories",
    "Sampleavailability",
    "Priceofsample",
    "Nutritioninfo",
    "ShelfLife",
    "Temprature",
    "ProductSize",
  ];

  const OthercostFieldsarray = [
    "Applicable on",
    "Other cost ",
    "HSN",
    "GST",
    "Reason of cost",
  ];

  const FetchProduct = async () => {
    await axios
      .get("/product/get_product_byId/" + ProductId)
      .then((response) => {
        setProductData(response?.data);
        console.log("response", response.data);
        setProductData(response?.data);
        if (response?.data?.ProductsVariantions?.length > 0) {
          append(response?.data?.ProductsVariantions);
          OthercostAppend(response?.data?.OtherCost);
          setItems(response?.data?.ProductFeatures);
          setManufacturingData(response?.data?.ManufacturingData);
          setValue(
            "locationdetails.region",
            response?.data?.LocationDetails?.region
          );
          setValue(
            "locationdetails.state",
            response?.data?.LocationDetails?.state
          );
          setValue(
            "locationdetails.city",
            response?.data?.LocationDetails?.city
          );
          setValue(
            "locationdetails.landmark",
            response?.data?.LocationDetails?.landmark
          );
          setValue(
            "locationdetails.pincode",
            response?.data?.LocationDetails?.pincode
          );
          setValue(
            "packagerelateddates.expirydate",
            response?.data?.ExpiryDate
          );
          setValue(
            "packagerelateddates.manufacturingdate",
            response?.data?.ManufacturingData
          );
          setValue(
            "productContentInfo",
            response?.data?.productContentInformation
          );
          setForm(response?.data?.formofProduct);
          setValue("size", response?.data?.ProductsVariantions[0]?.ProductSize);
          setExpiryDate(response?.data?.ExpiryDate);
        }
        // console.log("fetchdata", response?.data?.OtherCost);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffectOnce(() => {
    FetchProduct();
  });

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
            bgcolor: "#FAFBFD",
            overflowX: "hidden",
            px: 4,
            py: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: "transparent",
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
                  miaxHeight: "10px",
                },
                maxHeight: "410px",
                height: "600px",
              }}
            >
              <Stack>
                <Box
                  sx={{
                    height: "auto",
                    position: "relative",
                  }}
                >
                  <Typography sx={CommonTextStyle}>
                    ( Select the Best Size Option ) Other Can be Added on
                    Feature Box Forward
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      width: "auto",
                      float: "left",
                      mt: 1,
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px",
                        height: "100%",
                        // padding: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          ...GenderBoxStyle,
                          border:
                            size === "Length"
                              ? "1px solid #445fd2"
                              : "1px solid #f3f6f9",
                          height: "70px",
                          cursor:
                            fields.length === 0 ? "pointer" : "not-allowed",
                        }}
                        // onClick={() => setSize("Length")}
                        onClick={() => {
                          if (fields.length === 0) {
                            setSize("Length");
                          } else return;
                        }}
                      >
                        <Typography
                          sx={{
                            color: size === "Length" ? "#445fd2" : "#ADB8CC",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          Length
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          ...GenderBoxStyle,
                          border:
                            size === "Length x Height"
                              ? "1px solid #445fd2"
                              : "1px solid #f3f6f9",
                          height: "70px",
                          // cursor: "pointer",
                          cursor:
                            fields.length === 0 ? "pointer" : "not-allowed",
                        }}
                        // onClick={() => setSize("Length x Height")}
                        onClick={() => {
                          if (fields.length === 0) {
                            setSize("Length x Height");
                          } else return;
                        }}
                      >
                        <Typography
                          sx={{
                            color:
                              size === "Length x Height"
                                ? "#445fd2"
                                : "#ADB8CC",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          Length x Height
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          ...GenderBoxStyle,
                          border:
                            size === "Length x Height x Width"
                              ? "1px solid #445fd2"
                              : "1px solid #f3f6f9",
                          height: "70px",
                          cursor:
                            fields.length === 0 ? "pointer" : "not-allowed",
                        }}
                        onClick={() => {
                          if (fields.length === 0) {
                            setSize("Length x Height x Width");
                          } else return;
                        }}
                        // onClick={() => setSize("Length x Height x Width")}
                      >
                        <Typography
                          sx={{
                            color:
                              size === "Length x Height x Width"
                                ? "#445fd2"
                                : "#ADB8CC",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          Length x Height x Width
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          ...GenderBoxStyle,
                          border:
                            size === "Volume"
                              ? "1px solid #445fd2"
                              : "1px solid #f3f6f9",
                          height: "70px",
                          cursor:
                            fields.length === 0 ? "pointer" : "not-allowed",
                        }}
                        onClick={() => {
                          if (fields.length === 0) {
                            setSize("Volume");
                          } else return;
                        }}
                        // onClick={() => setSize("Volume")}
                      >
                        <Typography
                          sx={{
                            color: size === "Volume" ? "#445fd2" : "#ADB8CC",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          Volume
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          ...GenderBoxStyle,
                          border:
                            size === "CalorieCount"
                              ? "1px solid #445fd2"
                              : "1px solid #f3f6f9",
                          height: "70px",
                          cursor:
                            fields.length === 0 ? "pointer" : "not-allowed",
                        }}
                        onClick={() => {
                          if (fields.length === 0) {
                            setSize("CalorieCount");
                          } else return;
                        }}
                        // onClick={() => setSize("CalorieCount")}
                      >
                        <Typography
                          sx={{
                            color:
                              size === "CalorieCount" ? "#445fd2" : "#ADB8CC",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          Calorie Count
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          ...GenderBoxStyle,
                          border:
                            size === "ShelfLife"
                              ? "1px solid #445fd2"
                              : "1px solid #f3f6f9",
                          height: "70px",
                          cursor:
                            fields.length === 0 ? "pointer" : "not-allowed",
                        }}
                        onClick={() => {
                          if (fields.length === 0) {
                            setSize("ShelfLife");
                          } else return;
                        }}
                        // onClick={() => setSize("ShelfLife")}
                      >
                        <Typography
                          sx={{
                            color: size === "ShelfLife" ? "#445fd2" : "#ADB8CC",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          Shelf Life
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          ...GenderBoxStyle,
                          border:
                            size === "NutritionalInformation"
                              ? "1px solid #445fd2"
                              : "1px solid #f3f6f9",
                          height: "70px",
                          cursor:
                            fields.length === 0 ? "pointer" : "not-allowed",
                        }}
                        onClick={() => {
                          if (fields.length === 0) {
                            setSize("NutritionalInformation");
                          } else return;
                        }}
                        // onClick={() => setSize("NutritionalInformation")}
                      >
                        <Typography
                          sx={{
                            color:
                              size === "NutritionalInformation"
                                ? "#445fd2"
                                : "#ADB8CC",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          Nutritional
                          <br />
                          Information
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          ...GenderBoxStyle,
                          border:
                            size === "Temprature"
                              ? "1px solid #445fd2"
                              : "1px solid #f3f6f9",
                          height: "70px",
                          cursor:
                            fields.length === 0 ? "pointer" : "not-allowed",
                        }}
                        onClick={() => {
                          if (fields.length === 0) {
                            setSize("Temprature");
                          } else return;
                        }}
                        // onClick={() => setSize("Temprature")}
                      >
                        <Typography
                          sx={{
                            color:
                              size === "Temprature" ? "#445fd2" : "#ADB8CC",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          Temprature
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          ...GenderBoxStyle,
                          border:
                            size === "Custom Size"
                              ? "1px solid #445fd2"
                              : "1px solid #f3f6f9",
                          height: "70px",
                          cursor:
                            fields.length === 0 ? "pointer" : "not-allowed",
                        }}
                        onClick={() => {
                          if (fields.length === 0) {
                            setSize("Custom Size");
                          } else return;
                        }}
                        // onClick={() => setSize("Custom Size")}
                      >
                        <Typography
                          sx={{
                            color:
                              size === "Custom Size" ? "#445fd2" : "#ADB8CC",
                            fontSize: "1.2rem",
                            textAlign: "center",
                          }}
                        >
                          Custom Size
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Checkbox
                    {...label}
                    checked={isChecked}
                    // defaultChecked
                    onChange={handleCheckboxChange}
                  />
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: 12,
                      textAlign: "center",
                      color: "#7D8BA6",
                      mt: 1,
                    }}
                  >
                    Click here , To add Expiry Date
                  </Typography>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      width: "98%",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "45%",
                        gap: "5px",
                      }}
                    >
                      <Typography sx={{ ...CommonTextStyle, pt: "10px" }}>
                        Manufacturing Date{" "}
                        <span style={{ color: "red" }}> *</span>
                      </Typography>

                      <DatePicker
                        defaultValue={dayjs(ManufacturingData)}
                        onChange={(e) => {
                          setManufacturingData(e);
                          setMinManufacturingData({
                            ...e,
                            $d: new Date(e.$d.getTime() + 24 * 60 * 60 * 1000),
                          });
                          console.log("Manufacturing", e);
                          setValue("manufacturingdate", new Date(e));
                        }}
                        disableFuture={true}
                      />
                      <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                        {errors?.manufacturingdate?.message}
                      </Typography>
                    </Box>

                    {isChecked && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "45%",
                          gap: "5px",
                        }}
                      >
                        <Typography
                          sx={{
                            ...CommonTextStyle,
                            pt: "10px",
                            height: "100%",
                          }}
                        >
                          Expiry Date <span style={{ color: "red" }}> *</span>
                        </Typography>

                        <DatePicker
                          // {...register("packagerelateddates.expirydate")}
                          // // minDate={
                          // //   getValues()?.packagerelateddates?.manufacturingdate
                          // // }
                          minDate={ManufacturingData}
                          // disabled={isChecked}
                          defaultValue={ExpiryDate ? dayjs(ExpiryDate) : null}
                          onChange={(e) => {
                            setExpiryDate(e);
                            setValue("expirydate", new Date(e));
                          }}
                        />
                        <Typography
                          sx={{ color: "red", fontFamily: "Poppins" }}
                        >
                          {errors?.expirydate?.message}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </LocalizationProvider>

                {/* /////////////////////////////////////////////// */}
                <FMCGProductInform
                  append={(data, index) => {
                    if (index !== null) {
                      update(index, data);
                    } else {
                      append(data);
                    }
                    SetEditId(null);
                  }}
                  defaultValue={editId !== null ? fields[editId] : null}
                  index={editId}
                  size={size}
                  HSNData={HSNStore}
                />
                {fields.length === 0 ? null : (
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      flexDirection: "column",
                      width: "98%",
                      mx: "auto",
                    }}
                  >
                    <Typography sx={CommonTextStyle}>
                      Added Details (
                      {fields &&
                        fields.filter(
                          (item) => item && Object.keys(item).length !== 1
                        ).length}
                      )
                    </Typography>
                    <TableContainer
                      sx={{
                        width: "auto",
                        borderRadius: "10px",
                        background: "transparent",
                        border: "1px solid #e3e3e3",
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
                        {fields &&
                          Object.keys(fields).length > 0 &&
                          fields?.map((item, idx) => {
                            console.log("data", item);
                            if (item && Object.keys(item).length === 1) {
                              skippedCount++;
                              return null;
                            }
                            return (
                              <>
                                <TableHead>
                                  <TableRow>
                                    {ArrayFields?.map((data) => {
                                      console.log("itemhere", data);
                                      if (
                                        data === "id" ||
                                        data === "listPeriod"
                                      )
                                        return null;
                                      return (
                                        <TableCell
                                          key={data}
                                          sx={{
                                            ...tableDataStyle,
                                            padding: "10px",
                                            textTransform: "capitalize",
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
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {/* {item.ProductColor} */}

                                      {item.flavor ? item.flavor : "N/A"}
                                    </TableCell>
                                    {/* <TableCell align="center" sx={TableCellStyle}>
                                {item.HSN}
                              </TableCell> */}

                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.HSN}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.GST ? item.GST : "0"}%
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.ProductIdType}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.PricePerUnit}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.DiscountedPrice}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.MinOrderQuantity}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.MaxOrderQuantity}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.length ? item.length : "N/A"}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.measureMentUnit
                                        ? item.measureMentUnit
                                        : "N/A"}
                                    </TableCell>
                                    {/* <TableCell align="center" sx={TableCellStyle}>
                                {item.GST}
                              </TableCell> */}
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.height ? item.height : "N/A"}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.width ? item.width : "N/A"}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.volume ? item.volume : "N/A"}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.calories ? item.calories : "N/A"}
                                    </TableCell>

                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.sampleavailability
                                        ? item.sampleavailability
                                        : "N/A"}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.priceofsample
                                        ? item.priceofsample
                                        : "N/A"}
                                      {item.currencyType === "BXITokens" ? (
                                        <img
                                          src={bxitoken}
                                          style={{
                                            width: "13px",
                                            height: "13px",
                                          }}
                                          // alt="bxitoken"
                                        />
                                      ) : (
                                        item.currencyType
                                      )}
                                    </TableCell>

                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.nutritioninfo
                                        ? item.nutritioninfo
                                        : "N/A"}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.shelfLife ? item.shelfLife : "N/A"}
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.temprature
                                        ? item.temprature
                                        : "N/A"}
                                    </TableCell>

                                    <TableCell
                                      align="center"
                                      sx={TableCellStyle}
                                    >
                                      {item.ProductSize
                                        ? item.ProductSize
                                        : "N/A"}
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
                                          SetEditId(idx);
                                        }}
                                      >
                                        <Box component="img" src={EditIcon} />
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          remove(idx);
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
                )}
                {/* <Box
          sx={{
            py: "20px",
            display: "flex",
            gap: "20px",
            position: "relative",
          }}
        > */}
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
                                      style={{ width: "15px", height: "15px" }}
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

                <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
                  <Typography sx={CommonTextStyle}>
                    Product Content <span style={{ color: "red" }}> *</span>
                  </Typography>
                  <TextField
                    id="standard-multiline-static"
                    multiline
                    rows={4}
                    variant="standard"
                    placeholder="Eg. Milk, Butterscotch, Nuts etc     "
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
                    {...register("productContentInfo")}
                    onKeyDown={(e) => {
                      if (e.key === " " && e.target.selectionStart === 0) {
                        e.preventDefault();
                      }
                    }}
                    sx={{
                      ...textfieldstyle,
                      width: "98%",
                      mx: "auto",
                      border: errors["productContentInfo"]
                        ? "1px solid red"
                        : null,
                    }}
                  />
                  <Typography sx={ErrorStyle}>
                    {errors["productContentInfo"]?.message}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    pt: 3,
                  }}
                >
                  <Typography sx={{ ...CommonTextStyle }}>
                    Product Pickup Location & Pincode
                  </Typography>
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
                    gap: "10px",
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
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      Region
                      {ProductData?.LocationDetails ? (
                        <Typography sx={CommonTextStyle}>
                          : {ProductData?.LocationDetails?.region}
                        </Typography>
                      ) : null}{" "}
                      <span style={{ color: "red" }}> *</span>
                    </Typography>
                    <Select
                      disableUnderline
                      {...register("locationdetails.region")}
                      placeholder="Eg. West"
                      sx={{
                        ...inputStyles,
                        borderRadius: "10px",
                        border: errors?.locationdetails?.region?.message
                          ? "1px solid red"
                          : null,
                      }}
                    >
                      <MenuItem value="West">West</MenuItem>
                      <MenuItem value="East ">East</MenuItem>
                      <MenuItem value="South">South</MenuItem>
                      <MenuItem value="North">North</MenuItem>
                    </Select>
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                      {errors?.locationdetails?.region?.message}
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
                    <Typography sx={CommonTextStyle}>
                      State <span style={{ color: "red" }}> *</span>
                    </Typography>
                    <Input
                      disableUnderline
                      placeholder="Eg. Bihar"
                      {...register("locationdetails.state")}
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
                        color: "#445FD2",
                        fontSize: "12px",
                        border: errors?.locationdetails?.state?.message
                          ? "1px solid red"
                          : null,
                      }}
                    />
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                      {errors?.locationdetails?.state?.message}
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
                    <Typography sx={CommonTextStyle}>
                      City <span style={{ color: "red" }}> *</span>{" "}
                    </Typography>
                    <Input
                      disableUnderline
                      placeholder="Eg. Patna"
                      {...register("locationdetails.city")}
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
                        color: "#445FD2",
                        fontSize: "12px",
                        border: errors?.locationdetails?.city?.message
                          ? "1px solid red"
                          : null,
                      }}
                    />
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                      {errors?.locationdetails?.city?.message}
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
                    <Typography sx={CommonTextStyle}>
                      Landmark <span style={{ color: "red" }}> *</span>{" "}
                    </Typography>
                    <Input
                      placeholder="Eg. Gandhi Maidan"
                      disableUnderline
                      {...register("locationdetails.landmark")}
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
                        color: "#445FD2",
                        fontSize: "12px",
                        border: errors?.locationdetails?.landmark?.message
                          ? "1px solid red"
                          : null,
                      }}
                    />
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                      {errors?.locationdetails?.landmark?.message}
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
                    <Typography sx={CommonTextStyle}>
                      Pincode <span style={{ color: "red" }}> *</span>
                    </Typography>
                    <Input
                      type="number"
                      disableUnderline
                      placeholder="Eg. 800001"
                      {...register("locationdetails.pincode")}
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
                        color: "#445FD2",
                        fontSize: "12px",
                        border: errors?.locationdetails?.pincode?.message
                          ? "1px solid red"
                          : null,
                      }}
                    />
                    <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                      {errors?.locationdetails?.pincode?.message}
                    </Typography>
                  </Box>
                </Box>

                {costsArr?.map((items) => {
                  console.log("costsArr", costsArr);
                  return (
                    <Box
                      key={items}
                      sx={{
                        justifyContent: "space-between",
                        display: "flex",
                        mt: "30px",
                        width: "100%",
                        gap: "20px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "40%",
                          height: "60px",
                          display: " grid",
                          placeItems: "center",
                          border: "1px solid #E3E3E3",
                          borderRedius: "10px",
                          color: "#445FD2",
                          fontFamily: "Poppins",
                          fontSize: "15px",
                          borderRadius: "10px",
                        }}
                      >
                        {items?.amount}
                        {paythru === "bxitokens" ? (
                          <Box component="img" src={stackofcoins} />
                        ) : (
                          "₹"
                        )}
                      </Box>

                      <Box
                        sx={{
                          width: "60%",
                          height: "60px",
                          display: " flex",
                          placeItems: "center",
                          border: "1px solid #E3E3E3",
                          borderRedius: "10px",
                          color: "#445FD2",
                          fontFamily: "Poppins",
                          fontSize: "15px",
                          borderRadius: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>{items?.reasonOfCost}</Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            onClick={() => {
                              const newCostsArr = costsArr.filter(
                                (item) => item !== items
                              );
                              setCostsArr(newCostsArr);
                              setCurrency(items);
                              // console.log("------------------", newCostsArr);
                            }}
                          >
                            <Box component="img" src={EditIcon} />
                          </Button>
                          <Button
                            onClick={() => {
                              const newCostsArr = costsArr.filter(
                                (item) => item !== items
                              );
                              setCostsArr(newCostsArr);
                            }}
                          >
                            <Box component="img" src={RemoveIcon} />
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
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
                      Select the best features that describes your brand/product
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      {" "}
                      (the more features you write the more you are discovered){" "}
                    </Typography>
                  </Box>

                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <Typography sx={CommonTextStyle}>
                        Select Best Feature ( Min 5 ){" "}
                        <span style={{ color: "red" }}> *</span>
                      </Typography>

                      <Select
                        // value={name}
                        onChange={(e) => setName(e.target.value)}
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
                          color: "#445FD2",
                          fontSize: "14px",
                        }}
                        key={traits}
                      >
                        {Feature?.map((el, idx) => {
                          return (
                            <MenuItem
                              key={idx}
                              value={el?.FmcgproductinfoType}
                              sx={CommonTextStyle}
                            >
                              <Typography sx={{ fontSize: "14px" }}>
                                {el.FmcgproductinfoType}
                              </Typography>
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
                        placeholder=" No Artificial sweeteners or preservatives.100% Vegetarian Type in two - three words"
                        sx={{ ...TextFieldStyle, height: "100%", p: 2 }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === " " && e.target.selectionStart === 0) {
                            e.preventDefault();
                          }
                        }}
                        minRows={3}
                        maxLength={15}
                        // InputProps={InputPropsStyle}
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: (
                            <Typography
                              variant="body1"
                              style={{
                                fontFamily: "Poppins",
                                fontSize: "12px",
                              }}
                            ></Typography>
                          ),
                          style: {
                            fontFamily: "Poppins",
                            color: " #445FD2",
                            fontSize: "14px",
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
                              minHeight: "60px",
                              justifyContent: "space-between",
                              height: "auto",
                            }}
                          >
                            <Typography sx={{ mapdata }}>
                              <Typography
                                sx={{
                                  fontWeight: "bold",
                                  marginTop: "15px",
                                  fontSize: "12px",
                                  height: "auto",
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

                    <Box
                      sx={{
                        py: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <Typography sx={{ ...CommonTextStyle, pt: "20px" }}>
                          Form
                        </Typography>

                        <Box>
                          <Button
                            sx={{
                              width: "126px",
                              height: "52px",
                              background: form === "dry" ? "#445FD2" : "#fff",
                              borderRadius: "35px",
                              color: form === "dry" ? "#fff" : "#445FD2",
                              zIndex: 100,
                              left: "3rem",
                              "&:hover": {
                                // background: "#445FD2",
                                color: "#000",
                              },
                            }}
                            onClick={() => setForm("dry")}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 600,
                                fontSize: "14px",
                                lineHeight: "21px",
                              }}
                            >
                              Dry
                            </Typography>
                          </Button>
                          <Button
                            sx={{
                              width: "126px",
                              height: "52px",
                              // background: "#fff",
                              background: form === "wet" ? "#445FD2" : "#fff",
                              borderRadius: "35px",
                              color: form === "wet" ? "#fff" : "#445FD2",
                              "&:hover": {
                                // background: "#445FD2",
                                color: "#000",
                              },
                            }}
                            onClick={() => setForm("wet")}
                          >
                            <Typography
                              sx={{
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: "12px",
                                lineHeight: "18px",
                                // color: "#6B7A99",
                              }}
                            >
                              Wet
                            </Typography>
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              mx: "auto",
              height: "auto",
              background: "transparent",
            }}
          >
            <BottomNavigation
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                background: "transparent",
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
};

export default FMCGProductInfo;

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

const lablechange = {
  fontFamily: "Poppins",
  color: "#6B7A99",
  fontSize: "16px",
  display: "grid",
  textAlign: "left",
  marginTop: "2rem",
  fontWeight: "bold",
  // borderBottom: "1px solid #E8E8E8",
  "&:focus": {
    border: "1px solid #E8E8E8",
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

const TextFieldStyle = {
  width: "95%",
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

const InputPropsStyle = {
  disableUnderline: true,
  style: {
    background: "#fff",
    fontFamily: "Poppins",
    color: "#6B7A99",
    borderRadius: "9px",
    height: "100%",
    paddingLeft: "10px",
    fontSize: "14px",
  },
};

const GW = {
  width: "20%",
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

const textfieldstyle = {
  width: "100%",
  height: "100px",
  background: "#FFFFFF",
  borderRadius: "10px",
  color: "red",
  fontSize: "14px",
};

const inputStyles = {
  width: "139px",
  height: "42px",
  background: "#FFFFFF",
  borderRadius: "10px",
  padding: "0px 10px",
  fontSize: "12px",
  color: "#445fd2",
};
