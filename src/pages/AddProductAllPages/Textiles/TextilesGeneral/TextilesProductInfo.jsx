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
import { styled } from "@mui/material/styles";
import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import HotelTextileProductInform from "./HotelsTextileProductInform";
import { useFieldArray } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import HotelProductVariations from "./HotelsProductVariations";
import axios from "axios";
// let BestFeaturesArray = [
//   "Size",
//   "Portability",
//   "Material",
//   "Build Quality",
//   "Design Type",
//   "Power source",
//   "Battery",
//   "Plug-in",
//   "Rechargeable",
//   "Energy",
//   "Efficiency",
//   "Display Type and Size",
//   "Touchscreen Functionality",
//   "Connectivity options",
//   "Compatibility",
//   "Durability",
//   "Per... ",
//   "Water efficiency",
//   "Noise reduction",
//   "Easy installation",
//   "Easy maintenance",
//   "Design",
//   "Weight",
//   "Portable",
//   "Capacity options",
//   "Functional",
//   "Versatile",
//   "Performance",
//   "Touchscreen controls",
//   "Model",
//   "Remote control",
//   "Program",
//   "Settings",
//   "Temperature Control",
//   "Humidity control",
//   "Airflow control",
//   "Customizable settings",
//   "Timed operation",
//   "Automatic shut-off",
//   "Safety features",
//   "Certified",
//   "Sensor",
//   "Filter",
//   "Other",
//   "Charging",
//   "Play Time",
//   "Mic",
//   "Bluetooth",
//   "Charging Port",
//   "Voice",
//   "Touch",
// ];
let BestFeaturesArray = [];

const TextilesProductInfo = () => {
  const [editId, SetEditId] = useState(null);
  const ProductId = useParams().id;
  const navigate = useNavigate();
  const [HSNStore, setHSNStore] = useState([]);
  const [setCurrency] = useState({
    currencyType: "",
    amount: "",
    reasonOfCost: "",
  });
  const [bestFeatures, setBestFeatures] = useState({
    selectedbestFeature: "",
    featureDescription: "",
  });
  const [costsArr, setCostsArr] = useState([]);
  let ArrayForCurrencyData = [];
  const [traits, setTraits] = useState([]);
  const [paythru, setPaythru] = useState({
    bxitokens: "",
    inr: "",
  });
  const [hoveredBox, setHoveredBox] = useState(null);
  const [activeBox, setActiveBox] = useState(null);
  const [size, setSize] = useState('length');
  console.log(size,'==========');

  const handleBoxClick = (index) => {
    setActiveBox(index);
    setHoveredBox(null);
  };

  const handleBoxHover = (index) => {
    setHoveredBox(index);
  };

  const handleBoxLeave = () => {
    setHoveredBox(null);
  };

  const sizeDetails = [
    { size: "length" },
    { size: "Length x Height" },
    { size: "Length x Height x Width" },
    { size: "Size S to 3XL" },
    { size: "Size 26 to 42" },
    { size: "GSM" },
    { size: "Custom Size " },
  ];

  async function getHotelFeature() {
    await axios
      .get(`hotelfeature/Get_hotel_feature`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res.data);
        debugger;
        let temp = res.data.map(
          ({ SampleCategoryFeature }) => SampleCategoryFeature
        );
        BestFeaturesArray = Object.values(temp);
      });
  }

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
        setHSNStore(res);
      });
  }
  useEffect(() => {
    FetchAddedProduct();
    getHotelFeature();
  }, []);
  const [OthercostEditId, SetOthercostEditId] = useState(null);
  useEffect(() => {
    console.log("====>costsArr", costsArr);
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
        sampleavailability: z.string().min(1),
        minimumorderqty: z.string().min(1),
        priceofsample: z.string().min(1),
        othercost: z.any(),
        // selectbestfeature: z.string().min(5).refine((value) => value !== '', {
        //   message: 'Please select a value',
        // }),
        // featuredescription: z.string().min(1),
        modelname: z.string().min(1),
        additionalFeatures: z.object({
          selectbestfeature: z.string().min(5),
          featuredescription: z.string().min(5),
        }),
        otherCost: z.any(),
        packagerelateddates: z.object({
          productpickuplocation: z.string().min(1),
          pickuplocationpincode: z.string().min(1),
          manufacturingdate: z.string().min(1),
          expirydate: z.string().min(1),
        }),
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

  const handleConsole = () => {
    setAddItemClicked(true);
    console.log("getValues", getValues());
    console.log("bestFeatures", bestFeatures);
    console.log("OthercostFields", fields, OthercostFields);
    const ProductUpdatedata = {
      id: ProductId,
      ProductsVariantions: getValues()?.ProductsVariantions,
      OtherCost: OthercostFields,
      ProductFeatures: items,
      ProductPickupLocation:
        getValues()?.packagerelateddates?.productpickuplocation.trim(),
      PickupLocationPinCode:
        getValues()?.packagerelateddates?.pickuplocationpincode.trim(),
      ManufacturingDate:
        getValues()?.packagerelateddates?.manufacturingdate.trim(),
      ExpiryDate: getValues()?.packagerelateddates?.expirydate.trim(),
      CostPrice: CostPrice,
      ReasonOfCost: ReasonOfCost,
    };
    if (ProductUpdatedata.ProductsVariantions.length === 0) {
      console.log(
        "============>",
        ProductUpdatedata.ProductsVariantions.length,
        ProductUpdatedata.ProductFeatures.length,
        ProductUpdatedata.ProductFeatures
      );
      document.getElementById("AddButtonVoucherInfo").click();
      return;
      // return toast.error("Please Fill All The Neccessary Fields", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    } else if (ProductUpdatedata.ProductFeatures.length < 5) {
      return toast.error("Please provide minimum 5 features", {
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
            navigate(`/home/textiles/textilestechinfo/${id}`);
          }
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
      console.log("ProductUpdatedata here", ProductUpdatedata);
    }
  };

  const handleChange = (event) => {
    setName(event);
  };

  useEffect(() => {
    setTraits(fields);
    setValue("othercost", OthercostFields);
  }, [fields, OthercostFields]);
  const [data, setData] = useState([]);
  const { id } = useParams();

  //Additional feature states and functions
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [addItemClicked, setAddItemClicked] = useState(false);

  const handleItemAdd = (e) => {
    setAddItemClicked(true);
    e.preventDefault();
    console.log("feature", name, description, items);
    const newItem = { name, description };
    if (name.trim() || description.trim() !== "") {
      setItems([...items, newItem]);
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
    updateProduct(data, {
      onSuccess: (response) => {
        console.log("response", response);
      },
    });
  });
  // const secondEdit
  console.log("fields here", fields);
  return (
    <>
    
      <form onSubmit={updateProductTotextilestatus}>
        <Box
          sx={{
            width: "650px",
            height: "100%",
            minHeight: "400px",
            maxWidth: "716px",
            overflowY: "scroll",
            boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
            bgcolor: "transparent",
            mx: "auto",
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
              Voucher Information
            </Typography>
            <Box
              component="img"
              src={InfoIcon}
              sx={{ width: "28px", height: "auto", cursor: "pointer" }}
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
            <Typography sx={CommonTextStyle}>Select your size chart</Typography>
            <Box
              sx={{
                marginTop: "2rem",
                flexDirection: "row",
                width: "100%",
                mx: "auto",
                display: "flex",
                // justifyContent: "flex-start",
                flexWrap: "wrap",
                gap: "4rem",
              }}
            >
              {sizeDetails.map((box, index) => (
                <Box
                  key={index}
                  sx={{
                    width: "97px",
                    height: "81px",
                    background: "#FFFFFF",
                    transition: "border-color 0.3s, color 0.3s",
                    border:
                      index === activeBox
                        ? "2px solid #445FD2"
                        : index === hoveredBox
                        ? "2px solid #445FD2"
                        : "1px solid #D9D9D9",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    cursor: "pointer",
                    ...(box.size === size && {
                      border: "2px solid #445FD2",
                    }),
                  }}
                  onMouseEnter={() => handleBoxHover(index)}
                  onMouseLeave={handleBoxLeave}
                  onClick={() => {
                    setSize(box.size)
                    handleBoxClick(index)}}
                >
                  <Box sx={{}}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 500,
                        fontSize: "10px",
                        lineHeight: "15px",
                        color:
                          index === activeBox || index === hoveredBox
                            ? "#445FD2"
                            : "#ADB8CC",
                        marginBottom: "5px",
                        ...(box.size === size && {
                          color: "#445FD2",
                        }),
                      }}
                    >
                      {box.size}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Stack>
              {/* /////////////////////////////////////////////// */}
              <HotelTextileProductInform
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
                HSNData={HSNStore}
                handleConsole={handleConsole}
              />
              {/* <Button
                  // onClick={handleAdd}
                  onClick={async () => {
                     props.append(getValues(), props.index);
                    reset();
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
                </Button> */}
              {fields.length === 0 ? null : (
                <Box
                  sx={{
                    display: "flex",
                    gap: "20px",
                    flexDirection: "column",
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
                      <TableHead>
                        <TableRow>
                          {Object.keys(fields.length > 0 ? fields[0] : {}).map(
                            (data) => {
                              console.log("fields here", data);
                              if (data === "id") return null;
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
                            }
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody
                        sx={{
                          borderBottom: "1px solid #EDEFF2",
                        }}
                      >
                        {fields?.map((item, idx) => {
                          return (
                            <TableRow
                              key={item}
                              style={{
                                borderBottom: "1px solid #e3e3e3",
                                padding: "10px",
                              }}
                            >
                              <TableCell align="center" sx={TableCellStyle}>
                                <input
                                  value={item.color}
                                  type="color"
                                  disabled
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    border: "1px",
                                  }}
                                />
                              </TableCell>
                              {localStorage.getItem("digitalData") ===
                              "Offer Specific" ? (
                                <TableCell align="center" sx={TableCellStyle}>
                                  {item.RoomType}
                                </TableCell>
                              ) : (
                                ""
                              )}
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.size}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.HSN}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.GST}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.validityOfVoucherValue}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.validityOfVoucherUnit}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.PricePerUnit}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.MinOrderQuantity}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.MaxOrderQuantity}
                              </TableCell>
                              {/* <TableCell align="center" sx={TableCellStyle}>
                                  {item.sampleavailability
                                    ? item.sampleavailability
                                    : "N/A"}
                                </TableCell>
  
                                <TableCell align="center" sx={TableCellStyle}>
                                  {item.priceofsample
                                    ? item.priceofsample
                                    : "N/A"}
                                </TableCell> */}
                              {/* <TableCell align="center" sx={TableCellStyle}>
                                  {item.priceofsample}
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
                          );
                        })}
                      </TableBody>
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
              <HotelProductVariations
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
              <Box>
                <TableContainer
                  sx={{
                    width: "auto",
                    borderRadius: "10px",
                    background: "transparent",
                    // border: "1px solid #e3e3e3",
                  }}
                >
                  <Table
                    sx={{
                      borderRadius: "10px",
                      overflowX: "scroll",
                      background: "transparent",
                    }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableBody>
                      {OthercostFields?.map((item, idx) => {
                        return (
                          <TableRow
                            key={item}
                            sx={{
                              py: "10px",
                              display: "flex",
                              gap: "20px",
                            }}
                          >
                            <TableCell
                              align="center"
                              sx={{
                                ...TableCellStyle,
                                borderRadius: "10px",
                                border: "1px solid #E3E3E3",
                                width: "40%",
                                color: "#445FD2",
                                [`& .${tableCellClasses.root}`]: {
                                  borderRadius: "10px",
                                },
                                padding: "10px",
                              }}
                            >
                              {item.currencyType}
                              {"  "} {item.CostPrice}
                            </TableCell>

                            <TableCell
                              align="center"
                              sx={{
                                ...TableCellStyle,
                                border: "1px solid #E3E3E3",
                                borderRadius: "10px",
                                color: "#445FD2",
                                display: "flex",
                                justifyContent: "space-between",
                                width: "60%",
                                padding: "10px",
                              }}
                            >
                              {item.ReasonOfCost}
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
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
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
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ fontSize: "12px" }}>
                      (the more features you write the more you are discovered)
                    </Typography>
                    <Typography ml={1} sx={CommonTextStyle}>
                      Min 10
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <Typography sx={CommonTextStyle}>Feature Name</Typography>
                    <Select
                      value={name}
                      onChange={handleChange}
                      {...register("additionalFeatures.selectbestfeature")}
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
                        color: "#ADB8CC",
                        fontSize: "12px",
                      }}
                      key={traits}
                    >
                      {BestFeaturesArray?.map((res, idx) => {
                        return (
                          <MenuItem
                            key={idx}
                            value={res}
                            onClick={(e) => {
                              handleChange(res);
                              // setSingleTrait({
                              //   ...singleTrait,
                              //   [e.target.key]: e.target.value
                              // });
                            }}
                          >
                            {res}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {addItemClicked === true && items.length < 5 && (
                      <Typography sx={errorLableStyle}>
                        select at least {5 - items.length} feature
                      </Typography>
                    )}
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ ...CommonTextStyle, pt: "20px" }}>
                      Feature Description
                    </Typography>

                    <TextField
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      focused
                      multiline
                      variant="standard"
                      // {...register("additionalFeatures.featuredescription")}
                      sx={{
                        ...lablechange,
                        background: "#fff",
                        borderRadius: "10px",
                        height: "42px",
                        padding: "1%",
                      }}
                      InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                          <Typography
                            variant="body1"
                            style={{ fontFamily: "Poppins", fontSize: "12px" }}
                          ></Typography>
                        ),
                        style: {
                          fontFamily: "Poppins",
                          color: " #6B7A99",
                          fontSize: "12px",
                        },
                      }}
                    />
                    {addItemClicked === true && items.length < 5 && (
                      <Typography sx={errorLableStyle}>
                        enter at least {5 - items.length} feature description
                      </Typography>
                    )}
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
                      "&:hover": {
                        background: "#445FD2",
                      },
                      my: 3,
                    }}
                  >
                    Proceed To ADD
                  </Button>

                  <Typography
                    sx={{
                      color: "#6B7A99",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      marginRight: "75%",
                      marginTop: "1rem",
                      lineHeight: "18px",
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
                            height: "60px",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography sx={{ ...mapdata }}>
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                marginTop: "15px",
                                fontSize: "12px",
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
                  width: "100%",
                  mx: "auto",
                  height: "100%",
                  bgcolor: "transparent",
                }}
              >
                <BottomNavigation
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    bgcolor: "#FAFBFD",
                    p: "10px",
                    boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
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
                  <Box
                    sx={{ display: "flex", gap: "10px", p: 1, width: "50%" }}
                  >
                    <Button
                      sx={{
                        width: "100%",
                        height: "32px",
                        borderRadius: "10px",
                        background: "#fff",
                        color: "#636161",
                        fontSize: "14px",
                        "&:hover": {
                          background: "#f3f6f9",
                          color: "#000",
                        },
                      }}
                      variant="contained"
                    >
                      cancel
                    </Button>
                    <Button
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
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default TextilesProductInfo;

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
};

const errorLableStyle = { fontFamily: "Poppins", color: "red" };
