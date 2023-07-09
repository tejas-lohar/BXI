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
import TextileProductInform from "./LifestyleTextileProductInform.jsx";
import OthercostPortion from "./OthercostPortion.jsx";
import { useFieldArray } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const TextileProductInfo = () => {
  const [editId, SetEditId] = useState(null);
  const ProductId = useParams().id;
  const navigate = useNavigate();
  console.log("ProductId", ProductId);
  const [size, setSize] = useState("small");
  const [sampleAvailability, setSampleAvailability] = useState(false);
  const [samplePrice, setSamplePrice] = useState();
  const [minOrder, setMinOrder] = useState();
  const [singleTrait, setSingleTrait] = useState({});
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
  const [traits, setTraits] = useState([]);
  const [ExpiryDate, setExpiryDate] = useState();
  const [ManufacturingData, setManufacturingData] = useState();
  const [pickup, setPickup] = useState({
    pickupLocation: "",
    pickupPinCode: "",
  });
  const [modelName, setModelName] = useState();
  const [paythru, setPaythru] = useState({
    bxitokens: "",
    inr: "",
  });

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
        // gst: z.string().length(15),
        size: z.string(),
        fields: z.any(),
        sampleavailability: z.string().min(1),
        minimumorderqty: z.string().min(1),
        priceofsample: z.string().min(1),
        othercost: z.any(),
        selectbestfeature: z.string().min(1),
        featuredescription: z.string().min(1),

        modelname: z.string().min(1),
        // traits: z.any(),
        additionalFeatures: z.object({
          selectbestfeature: z.string().min(1),
          featuredescription: z.string().min(1),
        }),
        otherCost: z.any(),
        packagerelateddates: z.object({
          productpickuplocation: z.string().min(1),
          pickuplocationpincode: z.string().min(1),
          // manufacturingdate: z.string().min(1),
          // expirydate: z.string().min(1),
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

  function handleConsole() {
    console.log("getValues", getValues());
    console.log("bestFeatures", bestFeatures);
    console.log("OthercostFields", fields, OthercostFields);
    const ProductUpdatedata = {
      id: ProductId,
      ProductsVariantions: getValues()?.ProductsVariantions,
      OtherCost: OthercostFields,
      ProductFeatures: items,
      ProductPickupLocation:
        getValues()?.packagerelateddates?.productpickuplocation,
      PickupLocationPinCode:
        getValues()?.packagerelateddates?.pickuplocationpincode,
    };
    if (
      ProductUpdatedata.ProductsVariantions.length === 0 ||
      ProductUpdatedata.ProductFeatures.length === 0
    ) {
      console.log(
        "============>",
        ProductUpdatedata.ProductsVariantions.length,
        ProductUpdatedata.ProductFeatures.length,
        ProductUpdatedata.ProductFeatures
      );
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
    } else {
      updateProduct(ProductUpdatedata, {
        onSuccess: (response) => {
          if (response.status === 200) {
            navigate(`/home/textile/technicalinfo/${id}`);
          }
        },
        onError: (error) => {
          console.log("error", error);
        },
      });
      console.log("ProductUpdatedata here", ProductUpdatedata);
    }
  }

  useEffect(() => {
    setValue("traits", fields);
    setValue("othercost", OthercostFields);
  }, [fields, OthercostFields]);
  const [data, setData] = useState([]);
  const { id } = useParams();
  // const [textTileDetails, setTextilesDetails] = useState({
  //   size: "",
  //   color: "",
  //   gst: "",
  //   productIdType: "",
  //   mrp: "",
  //   discount: "",
  //   minimum: "",
  //   maximum: "",
  // });
  // // console.log("textTileDetails", textTileDetails, data);

  // const handleAdd = async () => {
  //   setData([...data, textTileDetails]);
  // };

  // const EditTableData = (index) => {
  //   const newData = [...data];
  //   newData.splice(index, 1);
  //   setTextilesDetails(newData);
  // };

  // const RemoveTableData = (index) => {
  //   const newData = [...data];
  //   newData.splice(index, 1);
  //   setTextilesDetails(newData);
  // };

  //Additional feature states and functions
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleItemAdd = (e) => {
    e.preventDefault();
    if (description === "") {
      // console.log("name=====>", name);
      return toast.error("Please fill the discription", {
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
  return (
    <>
      // <ToastContainer style={{ fontSize: "16px" }} />
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
            <Stack>
              <Box
                sx={{
                  height: "auto",
                  position: "relative",
                }}
              >
                <Typography sx={CommonTextStyle}>
                ( Select the Best Size Option ) Other Can be Added on Feature Box Forward
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
                          size === "small"
                            ? "1px solid #445fd2"
                            : "1px solid #f3f6f9",
                        height: "70px",
                        cursor: "pointer",
                      }}
                      onClick={() => setSize("small")}
                    >
                      <Typography
                        sx={{
                          color: size === "small" ? "#445fd2" : "#ADB8CC",
                          fontSize: "1.2rem",
                          textAlign: "center",
                        }}
                      >
                        Size <br /> M to 3XL
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        ...GenderBoxStyle,
                        border:
                          size === "medium"
                            ? "1px solid #445fd2"
                            : "1px solid #f3f6f9",
                        height: "70px",
                        cursor: "pointer",
                      }}
                      onClick={() => setSize("medium")}
                    >
                      <Typography
                        sx={{
                          color: size === "medium" ? "#445fd2" : "#ADB8CC",
                          fontSize: "1.2rem",
                          textAlign: "center",
                        }}
                      >
                        Size <br /> 28 to 42
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        ...GenderBoxStyle,
                        border:
                          size === "large"
                            ? "1px solid #445fd2"
                            : "1px solid #f3f6f9",
                        height: "70px",
                        cursor: "pointer",
                      }}
                      onClick={() => setSize("large")}
                    >
                      <Typography
                        sx={{
                          color: size === "large" ? "#445fd2" : "#ADB8CC",
                          fontSize: "1.2rem",
                          textAlign: "center",
                        }}
                      >
                        Size <br /> 6 months to 8 years
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        ...GenderBoxStyle,
                        border:
                          size === "XL"
                            ? "1px solid #445fd2"
                            : "1px solid #f3f6f9",
                        height: "70px",
                        cursor: "pointer",
                      }}
                      onClick={() => setSize("XL")}
                    >
                      <Typography
                        sx={{
                          color: size === "XL" ? "#445fd2" : "#ADB8CC",
                          fontSize: "1.2rem",
                          textAlign: "center",
                        }}
                      >
                        Size <br /> 8 months to 15 years
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        ...GenderBoxStyle,
                        border:
                          size === "XXL"
                            ? "1px solid #445fd2"
                            : "1px solid #f3f6f9",
                        height: "70px",
                        cursor: "pointer",
                      }}
                      onClick={() => setSize("XXL")}
                    >
                      <Typography
                        sx={{
                          color: size === "XXL" ? "#445fd2" : "#ADB8CC",
                          fontSize: "1.2rem",
                          textAlign: "center",
                        }}
                      >
                        Size <br /> 0 to 8{" "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              {/* /////////////////////////////////////////////// */}
              <TextileProductInform
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
                                {/* {item.ProductColor} */}

                                <input
                                  // disableUnderline
                                  value={item.ProductColor}
                                  type="color"
                                  disabled
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    border: "1px",
                                  }}
                                  // label={ProductColor}
                                />
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.ProductSize}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.GST}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.ProductIdType}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.PricePerUnit}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.DiscountedPrice}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.MinOrderQuantity}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.MaxOrderQuantity}
                              </TableCell>

                              <TableCell align="center" sx={TableCellStyle}>
                                {item.sampleavailability}
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                {item.priceofsample}
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
              {/* <Button
                sx={{
                  color: "#6B7A99",
                  position: "absolute",
                  right: 0,
                 fontSize : "12px" ,
                 marginBottom : "5px"


                }}
                onClick={() => {
                  // console.log(currency, "currency");
                  setCostsArr([...costsArr, { ...currency }]);
                  setCurrency({
                    currencyType: "",
                    amount: "",
                    reasonOfCost: "",
                  });

                  // console.log(costsArr, "costsArr");
                }}
              >
                + Add
              </Button> */}
              {/* <Box
                sx={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
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
                    Other cost if applicable
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      onChange={(e) => {
                        setCurrency({ ...currency, amount: e.target.value });
                      }}
                      // {...register("CostPrice")}
                      type="number"
                      id="standard-basic"
                      variant="standard"
                      value={currency.amount}
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
                        width: "65%",
                        height: "100%",
                        background: "#FFFFFF",
                        borderRadius: "10px",
                      }}
                    />
                    <Select
                      sx={{
                        width: "35%",
                        borderRadius: "0px 10px 10px 0px",
                        ".MuiOutlinedInput-notchedOutline": { border: 0 },
                        "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                          {
                            border: 0,
                          },
                        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            border: 0,
                          },
                        background: "#FFFFFF",
                        borderRadius: "10px",
                        height: "100%",
                        fontFamily: "Poppins",
                        fontStyle: "normal",
                        fontWeight: 400,
                        fontSize: "13px",
                        lineHeight: "21px",
                        color: "#6B7A99",
                      }}
                      defaultValue={"BXITokens"}
                      value={currency.currencyType}
                      onChange={(e) => {
                        setCurrency({
                          ...currency,
                          currencyType: e.target.value,
                        });
                      }}
                    >
                      <MenuItem
                        value="BXITokens"
                        sx={CommonTextStyle}
                        onClick={() => setPaythru("bxitokens")}
                      >
                        <Box
                          component="img"
                          src={stackofcoins}
                          alt="stackofcoins"
                          sx={{
                            height: "15px",
                            width: "auto",
                          }}
                        />
                      </MenuItem>
                      <MenuItem
                        value="Rupees"
                        sx={CommonTextStyle}
                        onClick={() => setPaythru("inr")}
                      >
                        ₹
                      </MenuItem>
                    </Select>

                  </Box>
                </Box> 
              </Box>  */}
              {/* <Box
                sx={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
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
                  <Typography sx={CommonTextStyle}>Reason of cost </Typography>
                  <TextField
                    onChange={(e) => {
                      setCurrency({
                        ...currency,
                        reasonOfCost: e.target.value,
                      });
                    }}
                    // {...register("ReasonOfCost")}
                    id="standard-basic"
                    variant="standard"
                    value={currency.reasonOfCost}
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
                      width: "100%",
                      height: "53px",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </Box> */}
              {/* </Box> */}
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
                      Select Best Feature ( Min 10 )
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
                        color: "#ADB8CC",
                        fontSize: "12px",
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
                      <MenuItem
                        value="option1"
                        sx={{ color: "#ADB8CC", fontSize: "12px" }}
                      >
                        option 1
                      </MenuItem>
                      <MenuItem
                        value="option2"
                        sx={{ color: "#ADB8CC", fontSize: "12px" }}
                      >
                        option 2
                      </MenuItem>
                      <MenuItem
                        value="option3"
                        sx={{ color: "#ADB8CC", fontSize: "12px" }}
                      >
                        option 3
                      </MenuItem>
                      <MenuItem
                        value="option4"
                        sx={{ color: "#ADB8CC", fontSize: "12px" }}
                      >
                        option 4
                      </MenuItem>
                    </Select>
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
                      // value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      focused
                      multiline
                      variant="standard"
                      // {...register("additionalFeatures.featuredescription")}
                      sx={{
                        ...lablechange,
                        background: "#fff",
                        borderRadius: "10px",
                        height: "47px",
                        padding: "1%",
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
                    Add
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

                  <Box
                    sx={{
                      py: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "45%",
                          gap: "10px",
                        }}
                      >
                        <Typography sx={{ ...CommonTextStyle, pt: "10px" }}>
                          Product Pick Up Location{" "}
                        </Typography>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          placeholder="Ahmedabad"
                          // onChange={(e) =>
                          //   setPickup({
                          //     ...pickup,
                          //     pickupLocation: e.target.value,
                          //   })
                          // }
                          {...register(
                            "packagerelateddates.productpickuplocation"
                          )}
                          InputProps={{
                            disableUnderline: "true",
                            style: {
                              color: "rgba(107, 122, 153)",
                              fontSize: "14px",
                              padding: "10px",
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
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "45%",
                          gap: "10px",
                        }}
                      >
                        <Typography sx={{ ...CommonTextStyle, pt: "10px" }}>
                          Pick Up Location Pincode
                        </Typography>
                        <TextField
                          id="standard-basic"
                          variant="standard"
                          placeholder="380015"
                          // onChange={(e) =>
                          //   setPickup({
                          //     ...pickup,
                          //     pickupPinCode: e.target.value,
                          //   })
                          // }
                          {...register(
                            "packagerelateddates.pickuplocationpincode"
                          )}
                          InputProps={{
                            disableUnderline: "true",
                            style: {
                              color: "rgba(107, 122, 153)",
                              fontSize: "14px",
                              padding: "10px",
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

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "45%",
                        gap: "10px",
                      }}
                    >
                      <Typography sx={{ ...CommonTextStyle, pt: "10px" }}>
                        Manufacturing Date
                      </Typography>
                      <TextField
                        type="date"
                        id="standard-basic"
                        variant="standard"
                        // onChange={(e) => setManufacturingData(e.target.value)}
                        {...register("packagerelateddates.manufacturingdate")}
                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            color: "rgba(107, 122, 153)",
                            fontSize: "14px",
                            padding: "10px",
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
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "45%",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        sx={{ ...CommonTextStyle, pt: "10px", height: "100%" }}
                      >
                        Expiry Date
                      </Typography>
                      <TextField
                        type="date"
                        id="standard-basic"
                        variant="standard"
                        // onChange={(e) => setExpiryDate(e.target.value)}
                        {...register("packagerelateddates.expirydate")}
                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            color: "rgba(107, 122, 153)",
                            fontSize: "14px",
                            padding: "10px",
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
                    </Box> */}
                      {/* <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography sx={CommonTextStyle}> Model Name </Typography>
                      <TextField
                        id="standard-basic"
                        variant="standard"
                        placeholder="Type in two - three words"
                        onChange={(e) => setModelName(e.target.value)}
                        {...register("modelname")}
                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            color: "rgba(107, 122, 153)",
                            fontSize: "14px",
                            padding: "10px",
                            background: "transparent",
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: "red",
                          },
                        }}
                        sx={{
                          width: "100%",
                          height: "100%",
                          background: "#fff",
                          borderRadius: "10px",
                          textAlign: "left",
                        }}
                      />
                    </Box> */}
                      {/* <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          gap: "10px",
                        }}
                      >
                        <Typography sx={{ ...CommonTextStyle, pt: "20px" }}>
                          Instructions to use product
                        </Typography>

                        <TextField
                          focused
                          multiline
                          variant="standard"
                          placeholder="Instructions to use product"
                          sx={{
                            background: "#fff",
                            borderRadius: "10px",
                            height: "150px",
                            width: "auto",
                            px: "10px",
                          }}
                          InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                              <Typography
                                variant="body1"
                                style={{ fontFamily: "Poppins" }}
                              ></Typography>
                            ),
                            style: { fontFamily: "Poppins", color: " #6B7A99" },
                          }}
                        />
                      </Box> */}
                    </Box>
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
                    Reset to Default
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
                        textTransform : "none" ,
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
                      sx={{
                        width: "100%",
                        height: "32px",
                        borderRadius: "10px",
                        background: "#445FD2",
                        fontSize: "14px",
                        textTransform : "none" ,
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

export default TextileProductInfo;

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
