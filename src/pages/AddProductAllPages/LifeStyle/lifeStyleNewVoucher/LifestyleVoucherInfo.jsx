import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  Input,
  TextField,
  BottomNavigation,
  CircularProgress,
  Chip
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import stackofcoins from "../../../../assets/Stack of Coins.svg";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import RemoveIcon from "../../../../assets/Images/CommonImages/RemoveIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import EditIcon from "../../../../assets/Images/CommonImages/EditIcon.svg";
import UserBaby from "../../../../assets/Images/CommonImages/UserBaby.svg";
import UserBaby2 from "../../../../assets/Images/CommonImages/UserBabyColor.svg";
import UserFemale from "../../../../assets/Images/CommonImages/UserFemale.svg";
import UserFemale2 from "../../../../assets/Images/CommonImages/UserFemaleColor.svg";
import UserMale from "../../../../assets/Images/CommonImages/UserMale.svg";
import UserMale2 from "../../../../assets/Images/CommonImages/UserMaleColor.svg";
import UserOther from "../../../../assets/Images/CommonImages/UserOther.svg";
import UserOther2 from "../../../../assets/Images/CommonImages/UserOther2.svg";
import UserUnisex from "../../../../assets/Images/CommonImages/UserUnisex.svg";
import UserUnisex2 from "../../../../assets/Images/CommonImages/UserUnisexColor.svg";


import { styled } from "@mui/material/styles";
import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import SizeChartTemplate from "../../Common/SizeChartTemplate.jsx";
import { useFieldArray } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";
import bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";
import ToolTip from "../../../../components/ToolTip";

import OthercostsTemplate from "../../../../components/common/voucherTemplates/OthercostsTemplate";


const OthercostFieldsarray = [
  "Applicable on",
  "Other cost ",
  "HSN",
  "GST",
  "Reason of cost",
];
const LifestyleVoucherInfo = () => {
  const [nameDuplicate, setNameDuplicate] = useState(false);
  const [editId, SetEditId] = useState(null);
  const navigateData = useLocation();
  console.log("navigateData", navigateData?.state?.subcategory);
  const ProductId = useParams().id;
  const navigate = useNavigate();
  const [size, setSize] = useState("Length");
  const [currency, setCurrency] = useState({
    currencyType: "",
    amount: "",
    reasonOfCost: "",
  });
  const [bestFeatures, setBestFeatures] = useState({
    selectedbestFeature: "",
    featureDescription: "",
  });
  const [OthercostEditId, SetOthercostEditId] = useState(null);
  const [Feature, setFeature] = useState();
  const [HSNStore, setHSNStore] = useState();
  const [costsArr, setCostsArr] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  let ArrayForCurrencyData = [];
  const [paythru, setPaythru] = useState({
    bxitokens: "",
    inr: "",
  });
  const [traits, setTraits] = useState([]);
  const [addItemClicked, setAddItemClicked] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);
  const [AllFeature, setAllFeature] = useState([]);
  const [ProductData, setProductData] = useState("");

  let invalidFeature = false;

  const [gender, setGender] = useState("Male");

  const tableRowFields = localStorage.getItem("digitalData") === "Offer Specific" ?
    [
      { label: 'Price/Voucher', value: 'PricePerUnit' },
      { label: 'Total QTY', value: 'TotalAvailableQty' },
      { label: 'HSN', value: 'HSN' },
      { label: 'GST', value: 'GST' },
      { label: 'Min', value: 'MinOrderQuantity' },
      { label: 'Max', value: 'MaxOrderQuantity' },
      { label: 'Total uploaded value', value: 'TotalValueUploaded' },
      { label: 'Color', value: 'ProductColor' },
      { label: 'Size', value: 'ProductSize' },
      { label: 'Validity', value: 'validityOfVoucherValue' },
    ] :
    [
      { label: 'Price/Voucher', value: 'PricePerUnit' },
      { label: 'Total QTY', value: 'TotalAvailableQty' },
      { label: 'HSN', value: 'HSN' },
      { label: 'GST', value: 'GST' },
      { label: 'Min', value: 'MinOrderQuantity' },
      { label: 'Max', value: 'MaxOrderQuantity' },
      { label: 'Total uploaded value', value: 'TotalValueUploaded' },
      { label: 'Validity', value: 'validityOfVoucherValue' },
    ]

  const arrayOfFields = [
    "ProductColor",
    "HSN",
    "GST",
    "validityOfVoucherValue",
    "PricePerUnit",
    // "DiscountedPrice",
    "MinOrderQuantity",
    "MaxOrderQuantity",


    // "ProductIdType",
    // "PricePerUnit",
    // "DiscountedPrice",
    // "MinOrderQuantity",
    // "MaxOrderQuantity",
    // "Sampleavailability",
    // "Priceofsample",
    // "length",
    // "height",
    // "MeasureMentUnit",
    // "width",
    "Product Size",
    // "shoe Size",
  ];

  const getAllFeature = [
    "Feature 1",
    "Feature 2",
    "Feature 3",
    "Feature 4",
    "Feature 5",
    "Feature 6",
    "Feature 7",
    "Feature 8",
    "Feature 9",
    "Feature 10",
  ];
  // const getAllFeature = async () => {
  //   await axios
  //     .get("mobilityfeature/Get_mobility_feature")
  //     .then((res) => {
  //       console.log("resoffeatures", res.data);
  //       setFeature(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };




  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState([]);

  const handleAddTag = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      event.preventDefault();
      if (tags?.includes(event.target.value)) {
        // event.target.value = "";
        return;
      } else {
        setTags([...tags, event.target.value]);
        console.log(tags, "=====>");
        event.target.value = "";
        setCurrentTag((pre) => '');
      }
    }
  };

  const handleAddButtonClick = (event) => {
    if (!currentTag) {
      return;
    } else {
      if (tags?.includes(currentTag)) {
        event.target.value = "";
        return;
      } else {
        setTags([...tags, currentTag]);
        console.log(tags, "=====>");
        setCurrentTag((pre) => '');
      }
    }
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };


  useState(() => {
    console.log('gender-----', gender)
  }, [gender])

  const FetchProduct = async () => {
    await axios
      .get("/product/get_product_byId/" + ProductId)
      .then((response) => {
        // setProductData(response?.data);
        console.log("response-----", response?.data?.Tags);
        if (response?.data?.gender) {
          setGender(response?.data?.gender);
        }

        setProductData(response?.data);
        if (response?.data?.Tags) {
          setTags(response.data.Tags)
        }
        if (response?.data?.ProductsVariantions?.length > 0) {
          // setGender(response?.data?.gender);
          append(response?.data?.ProductsVariantions);
          OthercostAppend(response?.data?.OtherCost);
          setItems(response?.data?.ProductFeatures);
        }
        // console.log("fetchdata", response?.data?.OtherCost);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    FetchProduct();
  }, []);

  async function FetchAddedProduct() {
    await axios
      .get(`product/get_product_byId/${ProductId}`, {
        withCredentials: true,
      })
      .then((res) => {
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
        if (res?.data && res.data != 'No Data Found') {
          setHSNStore(res.data);
        }
      });
  }

  useEffect(() => {
    FetchAddedProduct();
  }, []);
  useEffect(() => {
    // getAllFeature();
    console.log("====>costsArr", costsArr);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(`lifestylefeature/Get_lifestyle_feature`, {
            withCredentials: true,
          })
          .then((res) => {
            fetchHsnCode(res.data?.ProductSubCategory);
            return res.data;
          });
        const jsonData = await response;
        setAllFeature(jsonData);
      } catch (error) {
        console.log("Error fetching data from the API:", error);
      }
    };

    fetchData();
  }, []);
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
        size: z.string(),
        fields: z.any(),



        othercost: z.any(),
        selectbestfeature: z.string().min(1),
        featuredescription: z.string().min(1),

        modelname: z.string().min(1),
        additionalFeatures: z.object({
          selectbestfeature: z.string().min(1),
          featuredescription: z.string().min(1),
        }),
        otherCost: z.any(),


      })
    ),
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
    reset,
    variables,

    error: RegisterError,
  } = useUpdateProductQuery();
  function handleConsole() {
    setNextClicked(true);
    setAddItemClicked(true);
    // document.getElementById("AddButton").click();

    const ProductUpdatedata = {
      id: ProductId,
      ProductsVariantions: getValues()?.ProductsVariantions,
      gender: gender,
      OtherCost: OthercostFields,
      ProductFeatures: items,
      ProductPickupLocation:
        getValues()?.packagerelateddates?.productpickuplocation,
      PickupLocationPinCode:
        getValues()?.packagerelateddates?.pickuplocationpincode,
      ManufacturingDate: getValues()?.packagerelateddates?.manufacturingdate,
      ExpiryDate: getValues()?.packagerelateddates?.expirydate,
      ProductDetails: getValues()?.productdetails,
      LocationDetails: getValues()?.locationdetails,
      ProductUploadStatus: "technicalinformation",
      Tags: tags
    };
    // if (ProductUpdatedata.ProductsVariantions.length < 10) {
    //   invalidFeature = true;
    //   return;
    // } else {
    invalidFeature = false;
    updateProduct(ProductUpdatedata, {
      onSuccess: (response) => {
        if (response.status === 200) {
          navigate(`/home/lifestyleVoucher/lifestyletechinfo/${id}`);
        }
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
    // }
  }

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

  useEffect(() => {
    if (items.length >= 5 && fields.length > 0 && tags.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [items, fields, tags]);

  const handleItemAdd = (e) => {
    setAddItemClicked(true);
    e.preventDefault();
    if (name === "" || description === "") {
      invalidFeature = true;
      return;
    } else if (description.length > 75) {
      invalidFeature = true;
      return;
    } else {
      invalidFeature = false;
      const newItem = { name, description };
      if (name.trim() || description.trim() !== "") {
        if (items.length === 0) {
          setItems([...items, newItem]);
        } else if (items.length > 0 && newItem) {
          // Check if the name value already exists in the items array
          const isNameDuplicate = items.every((item) => item.name !== name);
          if (isNameDuplicate) {
            setItems([...items, newItem]);
            setNameDuplicate(false);
          } else {
            setNameDuplicate(true);
          }
        }
      }
    }
    setName("");
    setDescription("");
  };
  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };
  const [additionalData, setAdditionalData] = useState([]);
  const [CostPrice, setCostPrice] = useState("");
  const [ReasonOfCost, setReasonOfCost] = useState("");

  useEffect(() => {
    setAdditionalData([...additionalData, { CostPrice, ReasonOfCost }]);
  }, [CostPrice, ReasonOfCost]);

  const secondSubmit = (e) => {
    ArrayForCurrencyData.push(getValues().CostPrice);
    e.preventDefault();
    const newitems = { CostPrice, ReasonOfCost };
    setAdditionalData([...additionalData, newitems]);
    setCostPrice("");
    setReasonOfCost("");
  };

  const updateProductTotextilestatus = handleSubmit((data) => {
    updateProduct(data, {
      onSuccess: (response) => {
        console.log("response", response);
      },
    });
  });

  const generateNewArray = (fields) => {
    for (let i = 1; i < fields.length; i++) {
      Object.keys(fields[0]).forEach((key) => {
        if (!Object.prototype.hasOwnProperty.call(fields[i], key)) {
          fields[i][key] = "";
        }
      });
    }
    fields = [...fields].sort((a, b) => a.id - b.id);
    const referenceField = fields[0];

    for (let i = 1; i < fields.length; i++) {
      fields[i] = { ...referenceField, ...fields[i] };
    }
  };

  return (
    <>
      <form onSubmit={updateProductTotextilestatus}>
        <Box
          sx={{
            width: "650px",
            // overflowY: "scroll",
            boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
            bgcolor: "transparent",
            mx: "auto",
            maxWidth: "716px",
            bgcolor: "#FAFBFD",
            // overflowX: "hidden",
            px: 4,
            py: 3,
          }}
        >
          <Box
            sx={{
              p: 1,
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
                Voucher Information
              </Typography>
              <ToolTip
                info={
                  "Voucher Information encompasses essential details and specifications about a specific product/vouchers, including its name, description, features, pricing, and other relevant data, facilitating informed purchasing decisions for potential buyers."
                }
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                mt: 2,
                height: "500px",
                padding: '0 10px',
                overflowY: "scroll",
                "::-webkit-scrollbar": {
                  display: "flex",
                },
                "::-webkit-scrollbar-thumb": {
                  dynamic: "#8d8e90",
                  minHeight: "10px",
                  borderRadius: "8px",
                },
                "::-webkit-scrollbar-thumb:vertical": {
                  maxHeight: "10px",
                },

              }}
            >
              <Stack>
                {/* size chart option start */}


                {
                  localStorage.getItem("digitalData") === "Offer Specific" && (
                    <>
                      <Box
                        sx={{
                          py: "10px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <Typography sx={CommonTextStyle}>Gender</Typography>
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
                                gender === "Male"
                                  ? "1px solid #445fd2"
                                  : "1px solid #f3f6f9",
                              cursor: "pointer",
                            }}
                            onClick={() => setGender("Male")}
                          // {...register("gender")}
                          >
                            <Typography
                              sx={{
                                color: gender === "Male" ? "#445fd2" : "#ADB8CC",
                              }}
                            >
                              Male
                            </Typography>
                            {gender === "Male" ? (
                              <Box
                                component="img"
                                src={UserMale2}
                                sx={GenderIconStyle}
                              />
                            ) : (
                              <Box
                                component="img"
                                src={UserMale}
                                sx={GenderIconStyle}
                              />
                            )}
                          </Box>
                          <Box
                            sx={{
                              ...GenderBoxStyle,
                              border:
                                gender === "Female"
                                  ? "1px solid #445fd2"
                                  : "1px solid #f3f6f9",
                              cursor: "pointer",
                            }}
                            onClick={() => setGender("Female")}
                          // {...register("gender")}
                          >
                            <Typography
                              sx={{
                                color: gender === "Female" ? "#445fd2" : "#ADB8CC",
                              }}
                            >
                              Female
                            </Typography>
                            {gender === "Female" ? (
                              <Box
                                component="img"
                                src={UserFemale2}
                                sx={GenderIconStyle}
                              />
                            ) : (
                              <Box
                                component="img"
                                src={UserFemale}
                                sx={GenderIconStyle}
                              />
                            )}
                          </Box>
                          <Box
                            sx={{
                              ...GenderBoxStyle,
                              border:
                                gender === "Kids"
                                  ? "1px solid #445fd2"
                                  : "1px solid #f3f6f9",
                              cursor: "pointer",
                            }}
                            onClick={() => setGender("Kids")}
                          // {...register("gender")}
                          >
                            <Typography
                              sx={{
                                color: gender === "Kids" ? "#445fd2" : "#ADB8CC",
                              }}
                            >
                              Kids
                            </Typography>
                            {gender === "Kids" ? (
                              <Box
                                component="img"
                                src={UserBaby2}
                                sx={GenderIconStyle}
                              />
                            ) : (
                              <Box
                                component="img"
                                src={UserBaby}
                                sx={GenderIconStyle}
                              />
                            )}{" "}
                          </Box>
                          <Box
                            sx={{
                              ...GenderBoxStyle,
                              border:
                                gender === "Unisex"
                                  ? "1px solid #445fd2"
                                  : "1px solid #f3f6f9",
                              cursor: "pointer",
                            }}
                            onClick={() => setGender("Unisex")}
                          // {...register("gender")}
                          >
                            <Typography
                              sx={{
                                color: gender === "Unisex" ? "#445fd2" : "#ADB8CC",
                              }}
                            >
                              Unisex
                            </Typography>
                            {gender === "Unisex" ? (
                              <Box
                                component="img"
                                src={UserUnisex2}
                                sx={GenderIconStyle}
                              />
                            ) : (
                              <Box
                                component="img"
                                src={UserUnisex}
                                sx={GenderIconStyle}
                              />
                            )}
                          </Box>

                          <Box
                            sx={{
                              ...GenderBoxStyle,
                              border:
                                gender === "Other"
                                  ? "1px solid #445fd2"
                                  : "1px solid #f3f6f9",
                              cursor: "pointer",
                            }}
                            onClick={() => setGender("Other")}
                          // {...register("gender")}
                          >
                            <Typography
                              sx={{
                                color: gender === "Other" ? "#445fd2" : "#ADB8CC",
                              }}
                            >
                              Other
                            </Typography>
                            {gender === "Other" ? (
                              <Box
                                component="img"
                                src={UserOther2}
                                sx={GenderIconStyle}
                              />
                            ) : (
                              <Box
                                component="img"
                                src={UserOther}
                                sx={GenderIconStyle}
                              />
                            )}{" "}
                          </Box>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          height: "auto",
                          position: "relative",
                        }}
                      >
                        <Typography sx={CommonTextStyle}>
                          Select your size chart<span style={{ color: "red" }}> *</span>
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
                                  size === "Shoes"
                                    ? "1px solid #445fd2"
                                    : "1px solid #f3f6f9",
                                height: "70px",
                                cursor:
                                  fields.length === 0 ? "pointer" : "not-allowed",
                              }}
                              onClick={() => {
                                if (fields.length === 0) {
                                  setSize("Shoes");
                                } else return;
                                // setSize("Shoes");
                              }}
                            >
                              <Typography
                                sx={{
                                  color: size === "Shoes" ? "#445fd2" : "#ADB8CC",
                                  fontSize: "1.2rem",
                                  textAlign: "center",
                                }}
                              >
                                Shoes Size
                              </Typography>
                            </Box>
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
                              onClick={() => {
                                if (fields.length === 0) {
                                  setSize("Length");
                                } else return;
                                // setSize("Length")
                              }}
                            // onClick={() => {setSize("Length")}}
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
                                cursor:
                                  fields.length === 0 ? "pointer" : "not-allowed",
                              }}
                              onClick={() => {
                                if (fields.length === 0) {
                                  setSize("Length x Height");
                                } else return;
                                // setSize("Length")
                              }}
                            // onClick={() => setSize("Length x Height")}
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
                                // setSize("Length")
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
                                // setSize("Length")
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
                    </>
                  )
                }
                <SizeChartTemplate
                  append={(data, index) => {
                    if (
                      localStorage.getItem("digitalData") !==
                      "Offer Specific" &&
                      items.length > 1
                    ) {
                      return;
                    }
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
                  nextClicked={nextClicked}
                />
                {/* <TextileVoucherInform
                  append={(data, index) => {
                    if (
                      localStorage.getItem("digitalData") !==
                      "Offer Specific" &&
                      items.length > 1
                    ) {
                      return;
                    }
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
                  nextClicked={nextClicked}
                /> */}

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
                      Added Details ( {fields?.length} )
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
                        {
                          fields?.map((item, idx) => {
                            return (
                              <>
                                <TableHead>
                                  <TableRow>
                                    {tableRowFields?.map((data) => {
                                      return (
                                        <TableCell
                                          key={data.value}

                                          sx={{
                                            ...tableDataStyle,
                                            padding: "10px",
                                            textTransform: "capitalize",
                                            textAlign: "center"
                                          }}
                                          component="th"
                                          scope="row"
                                        >
                                          <span style={data.value == 'TotalValueUploaded' || data.value == 'ProductSize' ? { width: '135px', display: 'inline-block' } : {}}>{data.label}</span>
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
                                      {item.PricePerUnit}
                                    </TableCell>

                                    <TableCell align="center" sx={TableCellStyle}>
                                      {item.TotalAvailableQty}
                                    </TableCell>

                                    <TableCell align="center" sx={TableCellStyle}>
                                      {item.HSN}
                                    </TableCell>
                                    <TableCell align="center" sx={TableCellStyle}>
                                      {item.GST}
                                    </TableCell>

                                    <TableCell align="center" sx={TableCellStyle}>
                                      {item.MinOrderQuantity}
                                    </TableCell>
                                    <TableCell align="center" sx={TableCellStyle}>
                                      {item.MaxOrderQuantity}
                                    </TableCell>

                                    <TableCell align="center" sx={TableCellStyle}>
                                      {item?.TotalValueUploaded.toLocaleString("en-US")}
                                    </TableCell>

                                    {localStorage.getItem("digitalData") === "Offer Specific" && <>
                                      <TableCell align="center" sx={TableCellStyle}>
                                        <input
                                          value={item.ProductColor}
                                          type="color"
                                          disabled
                                          style={{
                                            height: "30px",
                                            width: "30px",
                                            border: "1px",
                                          }}
                                        />
                                      </TableCell>

                                      <TableCell align="center" sx={TableCellStyle}>
                                        {item.ProductSize ||
                                          item.ProductSize === undefined
                                          ? item.ProductSize
                                          : "N/A"}
                                      </TableCell>
                                    </>}


                                    <TableCell align="center" sx={TableCellStyle}>
                                      {item.validityOfVoucherValue}
                                    </TableCell>




                                    {/* <TableCell align="center" sx={TableCellStyle}>
                                  {item.length ? item.length : "N/A"}
                                </TableCell>
                                <TableCell align="center" sx={TableCellStyle}>
                                  {item.height ? item.height : "N/A"}
                                </TableCell>
                                <TableCell align="center" sx={TableCellStyle}>
                                  {item.measureMentUnit
                                    ? item.measureMentUnit
                                    : "N/A"}
                                </TableCell>
                                <TableCell align="center" sx={TableCellStyle}>
                                  {item.width ? item.width : "N/A"}
                                </TableCell> */}

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
                          })
                        }
                      </Table>
                    </TableContainer>
                  </Box>
                )}
                {/* size chart option end */}

                {/* OthercostFields start */}
                <OthercostsTemplate
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
                    width: "100%",
                    mx: "auto",
                    marginBottom: "10px"
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
                {/* OthercostFields end */}

                {/* select best feature section start */}
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
                      Select the best features that describes your brand/product<span style={{ color: "red" }}> *</span>
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      {" "}
                      (the more features you write the more you are discovered){" "}
                    </Typography>
                  </Box>

                  <Box>
                    <Box sx={boxStyle19}>
                      <Typography sx={CommonTextStyle}>
                        Select Best Feature ( Min 5 and Max 20 )
                      </Typography>
                      <Select
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={selectStyle1}
                        key={traits}
                      >
                        {AllFeature?.map((el) => {
                          return (
                            <MenuItem
                              key={el.SampleLifestyleFeature}
                              value={el.SampleLifestyleFeature}
                              sx={CommonTextStyle}
                            >
                              <Typography sx={{
                                color: "#445fd2",
                                fontFamily: "Poppins",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: "14px",
                              }}>
                                {el.SampleLifestyleFeature}
                              </Typography>
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {nameDuplicate && items.length < 5 && (
                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                          selected feature already added, select at least{" "}
                          {5 - items.length} feature
                        </Typography>
                      )}
                      {nameDuplicate && items.length > 4 && items.length < 21 && (
                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                          selected feature already added
                        </Typography>
                      )}
                      {addItemClicked && !nameDuplicate && items.length < 5 && (
                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                          select at least {5 - items.length} feature
                        </Typography>
                      )}
                      {addItemClicked && items.length > 20 && (
                        <Typography sx={errorLableStyle}>
                          can not select more than 20 feature
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Typography sx={{ ...CommonTextStyle, pt: "20px" }}>
                        Feature Description<span style={{ color: "red" }}> *</span>
                      </Typography>

                      <TextField
                        focused
                        multiline
                        variant="standard"
                        sx={{ ...TextFieldStyle, height: "100%", color: "#445fd2" }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        minRows={3}
                        // InputProps={InputPropsStyle}
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: (
                            <Typography
                              variant="body1"
                              style={{ fontFamily: "Poppins", fontSize: "14px" }}
                            ></Typography>
                          ),
                          style: {
                            fontFamily: "Poppins",
                            color: "#445fd2",
                            fontSize: "14px",
                          },
                        }}
                      />
                      {addItemClicked && description.length > 75 && (
                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                          Feature description should be less than 75 characters
                        </Typography>
                      )}
                      {addItemClicked && items.length < 5 && (
                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                          enter at least {5 - items.length} feature description
                        </Typography>
                      )}
                      {addItemClicked && items.length > 20 && (
                        <Typography sx={{ color: "red", fontFamily: "Poppins" }}>
                          can not enter more than 20 feature description
                        </Typography>
                      )}
                    </Box>

                    <Button
                      variant="contained"
                      onClick={handleItemAdd}
                      sx={buttonStyleAdd}
                      id="AddButton"
                    >
                      ADD Feature
                    </Button>

                    <Typography sx={featureStyle}>
                      Key Features({items.length})
                    </Typography>

                    <Box sx={{ width: "100%" }}>
                      {items.map((item, index) => (
                        <Box sx={boxStyle20}>
                          <Box key={index} sx={boxStyle21}>
                            <Typography sx={{ ...mapdata }}>
                              <Typography sx={itemStyle}>{item.name}</Typography>

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
                {/* select best feature section end */}

              </Stack>
              {/* tags section starts */}

              <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
                <Typography sx={TypographyStyle}>Tags<span style={{ color: "red" }}> *</span></Typography>
                <Box
                  sx={{
                    display: "flex",

                    borderRadius: "10px",
                  }}
                >
                  <TextField
                    placeholder="Tags"
                    sx={{
                      width: "100%",
                      background: "#fff",
                      borderRadius: "10px",
                      height: "41px",
                      width: '90%',
                      marginRight: '10px'
                    }}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        color: "#445FD2",
                        fontSize: "14px",
                        marginTop: "5px",
                        marginLeft: "1%",
                      },
                    }}
                    onKeyDown={(e) => {
                      if (e.key === " " && e.target.selectionStart === 0) {
                        e.preventDefault();
                      }
                    }}
                    onKeyPress={handleAddTag}
                    // {...register("Tags")}
                    // onKeyDown={(e) => {
                    //   if (e.key === " " && e.target.selectionStart === 0) {
                    //     e.preventDefault();
                    //   }
                    // }}
                    value={currentTag}
                    onChange={(e) => {
                      setCurrentTag(e.target.value);
                    }}
                  />

                  <Button
                    variant="outlined"
                    sx={{
                      color: "#FFF",
                      // position: "absolute",
                      right: 1,
                      textTransform: "none",
                      fontSize: "12px",
                      background: '#445FD2',
                      // height: "42px",
                      alignSelf: "center",
                      "&:hover": {

                        color: "black"
                      },
                    }}
                    onClick={handleAddButtonClick}
                  >
                    Add
                  </Button>
                </Box>
                <Typography sx={ErrorStyle}>
                  {errors["Tags"]?.message}
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
              {/* tags section starts */}
            </Box>



          </Box>

          <Box
            sx={{
              width: "100%",
              mx: "auto",

              background: "#FAFBFD",
            }}
          >
            <BottomNavigation sx={showLabelsStyle} showLabels>
              <Button
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
                }}
              >
                <Box
                  component="img"
                  sx={{ width: "23px", height: "23px" }}
                  src={RedoIcon}
                  alt=""
                />
                Reset to Default
              </Button>
              <Box sx={boxStyle23}>
                <Button sx={cancelStyle} variant="contained"
                  onClick={() => {
                    let confirm = window.confirm(
                      "Are you sure you want to cancel the product?"
                    );
                    if (confirm) {
                      navigate("/home/physical");
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isDisabled}
                  sx={nextStyle}
                  variant="contained"
                  onClick={handleConsole}
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

export default LifestyleVoucherInfo;

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
  fontSize: "12px",
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
  textTransform: "capitalize"
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
};

const TextFieldStyle = {
  width: "98%",
  height: "48px",
  background: "#fff",
  borderRadius: "9px",
  border: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#445fd2",
  overflow: "auto",
  paddingLeft: "10px",
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

const errorLableStyle = { fontFamily: "Poppins", color: "red" };

const formBoxStyle = {
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
};

const boxStyle = {
  backgroundColor: "transparent",
  width: "100%",
  mx: "auto",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
};

const boxStyle1 = {
  width: "100%",
  mt: 2,
  height: "100%",
  maxHeight: "400px",
  overflowY: "scroll",
};

const boxStyle2 = {
  height: "auto",
  position: "relative",
};

const boxStyle3 = {
  display: "flex",
  width: "auto",
  float: "left",
  mt: 1,
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "10px",
};

const boxStyle4 = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  height: "100%",
  // padding: "10px",
};

const boxStyle5 = (size) => ({
  ...GenderBoxStyle,
  border: size === "Weight" ? "1px solid #445fd2" : "1px solid #f3f6f9",
  height: "70px",
  cursor: "pointer",
});

const boxStyle5_1 = (size) => ({
  ...GenderBoxStyle,
  border: size === "GSM" ? "1px solid #445fd2" : "1px solid #f3f6f9",
  height: "70px",
  cursor: "pointer",
});

const boxStyle9 = (size) => ({
  ...GenderBoxStyle,
  border: size === "Length" ? "1px solid #445fd2" : "1px solid #f3f6f9",
  height: "70px",
  cursor: "pointer",
});

const boxStyle10 = (size) => ({
  ...GenderBoxStyle,
  border:
    size === "Length x Height" ? "1px solid #445fd2" : "1px solid #f3f6f9",
  height: "70px",
  cursor: "pointer",
});

const boxStyle11_1 = (size) => ({
  ...GenderBoxStyle,
  border: size === "size S to 3XL" ? "1px solid #445fd2" : "1px solid #f3f6f9",
  height: "70px",
  cursor: "pointer",
});

const boxStyle11_2 = (size) => ({
  ...GenderBoxStyle,
  border: size === "size 26 to 42" ? "1px solid #445fd2" : "1px solid #f3f6f9",
  height: "70px",
  cursor: "pointer",
});

const boxStyle11 = (size) => ({
  ...GenderBoxStyle,
  border:
    size === "Length x Height x Width"
      ? "1px solid #445fd2"
      : "1px solid #f3f6f9",
  height: "70px",
  cursor: "pointer",
});

const boxStyle12 = (size) => ({
  ...GenderBoxStyle,
  border: size === "Custom Size" ? "1px solid #445fd2" : "1px solid #f3f6f9",
  height: "70px",
  cursor: "pointer",
});

const boxStyle13 = {
  display: "flex",
  gap: "20px",
  flexDirection: "column",
};

const boxStyle14 = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const boxStyle15 = {
  justifyContent: "space-between",
  display: "flex",
  mt: "30px",
  width: "100%",
  gap: "20px",
};

const boxStyle16 = {
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
};

const boxStyle17 = {
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
};

const boxStyle18 = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const boxStyle19 = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const boxStyle20 = {
  border: "1px solid #E3E3E3",
  marginTop: "1rem",
  mx: "auto",
  height: "auto",
  width: "99%",
  display: " flex",
  flexDirection: "column",
  placeItems: "center",
  borderRadius: "10px",
};

const boxStyle21 = {
  display: "flex",
  width: "97%",
  minHeight: "60px",
  justifyContent: "space-between",
  height: "auto",
};

const boxStyle22 = {
  width: "100%",
  mx: "auto",
  height: "100%",
  bgcolor: "transparent",
};

const boxStyle23 = {
  display: "flex",
  gap: "10px",
  p: 1,
  width: "50%",
};

const fieldStyle = {
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
};

const fieldStyle1 = (size) => ({
  color: size === "Weight" ? "#445fd2" : "#ADB8CC",
  fontSize: "1.2rem",
  textAlign: "center",
});

const fieldStyle1_1 = (size) => ({
  color: size === "GSM" ? "#445fd2" : "#ADB8CC",
  fontSize: "1.2rem",
  textAlign: "center",
});

const fieldStyle5 = (size) => ({
  color: size === "Length" ? "#445fd2" : "#ADB8CC",
  fontSize: "1.2rem",
  textAlign: "center",
});

const fieldStyle6 = (size) => ({
  color: size === "Length x Height" ? "#445fd2" : "#ADB8CC",
  fontSize: "1.2rem",
  textAlign: "center",
});

const fieldStyle7 = (size) => ({
  color: size === "Length x Height x Width" ? "#445fd2" : "#ADB8CC",
  fontSize: "1.2rem",
  textAlign: "center",
});
const fieldStyle7_1 = (size) => ({
  color: size === "size S to 3XL" ? "#445fd2" : "#ADB8CC",
  fontSize: "1.2rem",
  textAlign: "center",
});
const fieldStyle7_2 = (size) => ({
  color: size === "size 26 to 42" ? "#445fd2" : "#ADB8CC",
  fontSize: "1.2rem",
  textAlign: "center",
});

const fieldStyle8 = (size) => ({
  color: size === "Custom Size" ? "#445fd2" : "#ADB8CC",
  fontSize: "1.2rem",
  textAlign: "center",
});

const imgStyle = { width: "28px", height: "auto", cursor: "pointer" };

const tablestyle1 = {
  width: "auto",
  borderRadius: "10px",
  background: "transparent",
  border: "1px solid #e3e3e3",
};

const tablestyle2 = {
  [`& .${tableCellClasses.root}`]: {
    borderBottom: "none",
  },
  borderRadius: "10px",
  overflowX: "scroll",
  background: "transparent",
};

const tablestyle3 = {
  width: "auto",
  borderRadius: "10px",
  background: "transparent",
};

const tablestyle4 = {
  borderRadius: "10px",
  overflowX: "scroll",
  background: "transparent",
};

const TableCellStyle1 = {
  ...tableDataStyle,
  padding: "10px",
  textTransform: "capitalize",
};

const TableCellStyle2 = {
  ...TableCellStyle,
  borderRadius: "10px",
  border: "1px solid #E3E3E3",
  width: "40%",
  color: "#445FD2",
  [`& .${tableCellClasses.root}`]: {
    borderRadius: "10px",
  },
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const TableCellStyle3 = {
  ...TableCellStyle,
  border: "1px solid #E3E3E3",
  borderRadius: "10px",
  color: "#445FD2",
  display: "flex",
  justifyContent: "space-between",
  width: "60%",
  padding: "10px",
};

const TableRowStyle = {
  py: "10px",
  display: "flex",
  gap: "20px",
};

const inputColorStyle = {
  height: "30px",
  width: "30px",
  border: "1px",
};

const selectStyle1 = {
  width: "100%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  background: "#fff",
  height: "100%",
  borderRadius: "10px",
  color: "#ADB8CC",
  fontSize: "12px",
};

const buttonStyleAdd = {
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
};

const featureStyle = {
  color: "#6B7A99",
  fontFamily: "Poppins",
  fonmtSize: "20px",
  marginRight: "75%",
  marginTop: "1rem",
};

const itemStyle = {
  fontWeight: "bold",
  marginTop: "15px",
  fontSize: "12px",
};

const showLabelsStyle = {
  display: "flex",
  justifyContent: "space-between",
  bgcolor: "#FAFBFD",
  p: "10px",
};

const cancelStyle = {
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
};

const nextStyle = {
  width: "100%",
  height: "32px",
  borderRadius: "10px",
  background: "#445FD2",
  fontSize: "14px",
  textTransform: "none",
  "&:hover": {
    background: "#445FD2",
  },
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


const GenderIconStyle = {
  width: "30px",
  height: "30px",
};