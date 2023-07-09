import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  Input,
  TextField,
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
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LifeStyleVoucherInform from "./LifeStyleVoucherInform.jsx";
import { useFieldArray } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import MobilityProductVariations from "./MobilityProductVariations.jsx";
import axios from "axios";
import bxitoken from "../../../../assets/Images/CommonImages/BXIToken.svg";
const LifeStyleGeneralInformation = () => {
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

  let invalidFeature = false;

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
        setHSNStore(res.data);
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
          .get(`otherfeature/Get_other_feature`, {
            withCredentials: true,
          })
          .then((res) => {
            debugger;
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
        sampleavailability: z.string().min(1),
        minimumorderqty: z.string().min(1),
        priceofsample: z.string().min(1),
        othercost: z.any(),
        selectbestfeature: z.string().min(1),
        featuredescription: z.string().min(1),

        modelname: z.string().min(1),
        additionalFeatures: z.object({
          selectbestfeature: z.string().min(1),
          featuredescription: z.string().min(1),
        }),
        otherCost: z.any(),
        packagerelateddates: z.object({
          productpickuplocation: z.string().min(1),
          pickuplocationpincode: z.string().min(1),
          manufacturingdate: z.string().min(1),
          expirydate: z.string().min(1),
        }),
        productdetails: z.object({
          registrationdetails: z.string().min(1),
          taxesdetails: z.string().min(1),
          insurancedetails: z.string().min(1),
        }),
        locationdetails: z.object({
          region: z.string().min(1),
          state: z.string().min(1),
          city: z.string().min(1),
          landmark: z.string().min(1),
          pincode: z.coerce.number().min(1),
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
    setNextClicked(true);
    setAddItemClicked(true);
    document.getElementById("AddButton").click();

    const ProductUpdatedata = {
      id: ProductId,
      ProductsVariantions: getValues()?.ProductsVariantions,
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
      CostPrice: CostPrice,
      ReasonOfCost: ReasonOfCost,
    };
    // if (ProductUpdatedata.ProductsVariantions.length < 10) {
    //   invalidFeature = true;
    //   return;
    // } else {
    invalidFeature = false;
    updateProduct(ProductUpdatedata, {
      onSuccess: (response) => {
        if (response.status === 200) {
          navigate(`/home/lifestyleVoucher/lifestyletechinfo/${id}`, {
            state: { subcategory: navigateData?.state?.subcategory },
          });
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
    if (items.length >= 5 && fields.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [items, fields]);

  const handleItemAdd = (e) => {
    setAddItemClicked(true);
    e.preventDefault();
    if (description === "") {
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
      <ToastContainer style={{ fontSize: "16px" }} />
      <form onSubmit={updateProductTotextilestatus}>
        <Box sx={formBoxStyle}>
          {/* title section start */}
          <Box sx={boxStyle}>
            <Typography sx={fieldStyle}>Voucher Information</Typography>
            <Box component="img" src={InfoIcon} sx={imgStyle} />
          </Box>
          {/* title section end */}

          <Box sx={boxStyle1}>
            <Stack>
              {/* size chart option start */}
              {localStorage.getItem("digitalData") ===
                "Offer Specific" && (
                <Box sx={boxStyle2}>
                  <Typography sx={CommonTextStyle}>
                    Select your size chart
                  </Typography>
                  <Box sx={boxStyle3}>
                    <Box sx={boxStyle4}>
                      <Box
                        sx={boxStyle5(size)}
                        onClick={() => setSize("ShoesSize")}
                      >
                        <Typography sx={fieldStyle1(size)}>
                          Shoes Size
                        </Typography>
                      </Box>

                      <Box
                        sx={boxStyle9(size)}
                        onClick={() => setSize("Length")}
                      >
                        <Typography sx={fieldStyle5(size)}>Length</Typography>
                      </Box>
                      <Box
                        sx={boxStyle10(size)}
                        onClick={() => setSize("Length x Height")}
                      >
                        <Typography sx={fieldStyle6(size)}>
                          Length x Height
                        </Typography>
                      </Box>
                      <Box
                        sx={boxStyle11(size)}
                        onClick={() => setSize("Length x Height x Width")}
                      >
                        <Typography sx={fieldStyle7(size)}>
                          Length x Height x Width
                        </Typography>
                      </Box>

                      <Box
                        sx={boxStyle12(size)}
                        onClick={() => setSize("Custom Size")}
                      >
                        <Typography sx={fieldStyle8(size)}>
                          Custom Size
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}

              <LifeStyleVoucherInform
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

              {fields.length > 0 ? generateNewArray(fields) : null}

              {fields.length === 0 ? null : (
                <Box sx={boxStyle13}>
                  <Typography sx={CommonTextStyle}>
                    Added Details ( {fields?.length} )
                  </Typography>
                  <TableContainer sx={tablestyle1}>
                    <Table
                      sx={{ tablestyle2 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableHead>
                        <TableRow>
                          {Object.keys(fields[0]).map((data) => {
                            if (
                              data === "id" ||
                              data === "listPeriod" ||
                              data === "Sampleavailability"
                            )
                              return null;
                            return (
                              <TableCell
                                key={data}
                                sx={TableCellStyle1}
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
                        {fields.map((row, index) => (
                          <TableRow key={index}>
                            {Object.keys(row).map((data, idx) => {
                              if (
                                data === "id" ||
                                data === "listPeriod" ||
                                data === "Sampleavailability"
                              )
                                return null;
                              return data === "ProductColor" ? (
                                <TableCell
                                  align="center"
                                  sx={TableCellStyle}
                                  key={data}
                                >
                                  <input
                                    value={row[data]}
                                    type="color"
                                    disabled
                                    style={inputColorStyle}
                                  />
                                </TableCell>
                              ) : (
                                <TableCell
                                  align="center"
                                  sx={TableCellStyle}
                                  key={data}
                                >
                                  {row[data]}
                                </TableCell>
                              );
                            })}
                            {/* edit and remove start */}
                            <TableCell align="center" sx={TableCellStyle}>
                              <TableCell align="center" sx={TableCellStyle}>
                                <Button
                                  onClick={() => {
                                    SetEditId(index);
                                  }}
                                >
                                  <Box component="img" src={EditIcon} />
                                </Button>
                              </TableCell>
                              <TableCell align="center" sx={TableCellStyle}>
                                <Button
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  <Box component="img" src={RemoveIcon} />
                                </Button>
                              </TableCell>
                            </TableCell>
                            {/* edit and remove end */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
              {/* size chart option end */}

              {/* OthercostFields start */}
              <MobilityProductVariations
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
                <TableContainer sx={tablestyle3}>
                  <Table
                    sx={tablestyle4}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableBody>
                      {OthercostFields?.map((item, idx) => {
                        return (
                          <TableRow key={item} sx={TableRowStyle}>
                            <TableCell align="center" sx={TableCellStyle2}>
                              {item.currencyType === "token" ? (
                                <img
                                  src={bxitoken}
                                  style={{ width: "30px", height: "30px" }}
                                  alt="bxitoken"
                                />
                              ) : (
                                item.currencyType
                              )}
                              {"  "} {item.CostPrice}
                            </TableCell>

                            <TableCell align="center" sx={TableCellStyle3}>
                              {item.ReasonOfCost}
                              <Box sx={boxStyle14}>
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
                  <Box key={items} sx={boxStyle15}>
                    <Box sx={boxStyle16}>
                      {items?.amount}
                      {paythru === "bxitokens" ? (
                        <Box component="img" src={stackofcoins} />
                      ) : (
                        "₹"
                      )}
                    </Box>

                    <Box sx={boxStyle17}>
                      <Box>{items?.reasonOfCost}</Box>

                      <Box sx={boxStyle18}>
                        <Button
                          onClick={() => {
                            const newCostsArr = costsArr.filter(
                              (item) => item !== items
                            );
                            setCostsArr(newCostsArr);
                            setCurrency(items);
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
                    Select the best features that describes your brand/product
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
                            key={el.OtherFeature}
                            value={el.OtherFeature}
                            sx={CommonTextStyle}
                          >
                            <Typography sx={{ color: "black" }}>
                              {el.OtherFeature}
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
                      Feature Description
                    </Typography>

                    <TextField
                      focused
                      multiline
                      variant="standard"
                      sx={{ ...TextFieldStyle, height: "100%" }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      minRows={3}
                      // InputProps={InputPropsStyle}
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
                    Add
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

              {/* BottomNavigation start  */}
              <Box sx={boxStyle22}>
                <BottomNavigation sx={showLabelsStyle} showLabels>
                  <Box sx={boxStyle23}>
                    <Button sx={cancelStyle} variant="contained">
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
              {/* BottomNavigation end  */}
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default LifeStyleGeneralInformation;

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
  marginLeft: "50%",
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
  boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
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
