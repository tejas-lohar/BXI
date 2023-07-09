import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  Input,
  TextField,
  Chip,
  Grid,
  BottomNavigation,
  InputAdornment,
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
import UserMale from "../../../../assets/Images/CommonImages/UserMale.svg";
import UserFemale from "../../../../assets/Images/CommonImages/UserFemale.svg";
import UserBaby from "../../../../assets/Images/CommonImages/UserBaby.svg";
import UserUnisex from "../../../../assets/Images/CommonImages/UserUnisex.svg";
import RemoveIcon from "../../../../assets/Images/CommonImages/RemoveIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import EditIcon from "../../../../assets/Images/CommonImages/EditIcon.svg";
import { styled } from "@mui/material/styles";
import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const TableHeader = [
  {
    id: 1,
    Header: "Color",
  },
  {
    id: 2,
    Header: "Size",
  },
  {
    id: 3,
    Header: "GST",
  },
  {
    id: 4,
    Header: "Product Id Type",
  },
  {
    id: 5,
    Header: "MRP",
  },
  {
    id: 6,
    Header: "Discount",
  },
  {
    id: 7,
    Header: "Min",
  },
  {
    id: 8,
    Header: "Max",
  },
];

const TextileProductInfo = () => {
  const ProductId = useParams().id;
  const navigate = useNavigate();
  console.log("ProductId", ProductId);
  const [gender, SetGender] = useState("male");
  const [size, setSize] = useState("small");
  const [sampleAvailability, setSampleAvailability] = useState(false);
  const [samplePrice, setSamplePrice] = useState();
  const [minOrder, setMinOrder] = useState();
  const [singleTrait, setSingleTrait] = useState({});
  const [currency, setCurrency] = useState({
    currency: "",
    amount: "",
  });
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

  const {
    register,
    handleSubmit,
    setValue,
    getValues,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        // gst: z.string().length(15),
        gender: z.string(),
        size: z.string(),

        sampleavailability: z.string().min(1),
        minimumorderqty: z.string().min(1),
        priceofsample: z.string().min(1),
        othercostifapplicable: z.string().min(1),
        reasonofcost: z.string().min(1),
        selectbestfeature: z.string().min(1),
        featuredescription: z.string().min(1),

        modelname: z.string().min(1),
        traits: z.object({
          productcolor: z.string().min(1),
          productsize: z.string().min(1),
          productgst: z.string().min(1),
          productIdType: z.string().min(1),
          productmrp: z.string().min(1),
          productdiscount: z.string().min(1),
          productminimumqty: z.string().min(1),
          productmaximumqty: z.string().min(1),
        }),
        packagerelateddates: z.object({
          productpickuplocation: z.string().min(1),
          pickuplocationpincode: z.string().min(1),
          manufacturingdate: z.string().min(1),
          expirydate: z.string().min(1),
        }),
      })
    ),
  });

  console.log("paythru", paythru);
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
    console.log({
      id: ProductId,
      gender: gender,
      size: size,
      sampleAvailability: sampleAvailability,
      samplePrice: samplePrice,
      minOrder: minOrder,
      currency: currency,
      traits: traits,
      expiryDate: ExpiryDate,
      manufacturingDate: ManufacturingData,
      pickup: pickup,
      modelName: modelName,
      reasonofcost: reasonofcost,
      othercostifapplicable: othercostifapplicable,
      additionalData: additionalData,
      items: items,
      // name: name,
      // description: description,
      data: data,
    });
    const ProductUpdatedata = {
      id: ProductId,
      gender: gender,
      additionalInfo: items,
      size: size,
      sampleAvailability: false,
      samplePrice: samplePrice,
      minOrder: minOrder,
      currency: currency,
      // traits: traits,
      expiryDate: ExpiryDate,
      manufacturingDate: ManufacturingData,
      pickup: pickup,
      modelName: modelName,
      reasonofcost: reasonofcost,
      othercostifapplicable: othercostifapplicable,
      additionalData: additionalData,
      traits: data,
      name: name,
      description: description,
    };
    updateProduct(ProductUpdatedata, {
      onSuccess: (response) => {
        // if (response.data.satus === 200) {
        navigate(`/home/myproduct/technicalinfo/${id}`);
        // }
        console.log("response", response);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  }

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
  // console.log("textTileDetails", textTileDetails, data);

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
  console.log("new data ===============>", data);

  //Additional feature states and functions
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleItemAdd = (e) => {
    e.preventDefault();
    const newItem = { name, description };
    setItems([...items, newItem]);
    setName("");
    setDescription("");
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleEdit = (index) => {
    const selectedItem = items[index];
    setName(selectedItem.name);
    setDescription(selectedItem.description);
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const [additionalData, setAdditionalData] = useState([]);
  const [othercostifapplicable, setOthercostifapplicable] = useState("");
  const [reasonofcost, setReasonofcost] = useState("");

  const secondSubmit = (e) => {
    e.preventDefault();
    const newitems = { othercostifapplicable, reasonofcost };
    setAdditionalData([...additionalData, newitems]);
    setOthercostifapplicable("");
    setReasonofcost("");
  };
  useEffect(() => {
    console.log("VALUES", getValues());
  });
  const updateProductTotextilestatus = handleSubmit((data) => {
    console.log("data", data);
    updateProduct(data, {
      onSuccess: (response) => {
        console.log("response", response);
      },
    });
  });
  // const secondEdit
  return (
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
                      gender === "male"
                        ? "1px solid #445fd2"
                        : "1px solid #f3f6f9",
                  }}
                  onClick={() => SetGender("male")}
                  {...register("gender")}
                >
                  <Typography>Male</Typography>
                  <Box component="img" src={UserMale} sx={GenderIconStyle} />
                </Box>
                <Box
                  sx={{
                    ...GenderBoxStyle,
                    border:
                      gender === "Female"
                        ? "1px solid #445fd2"
                        : "1px solid #f3f6f9",
                  }}
                  onClick={() => SetGender("Female")}
                  {...register("gender")}
                >
                  <Typography>female</Typography>
                  <Box component="img" src={UserFemale} sx={GenderIconStyle} />
                </Box>
                <Box
                  sx={{
                    ...GenderBoxStyle,
                    border:
                      gender === "Kids"
                        ? "1px solid #445fd2"
                        : "1px solid #f3f6f9",
                  }}
                  onClick={() => SetGender("Kids")}
                  {...register("gender")}
                >
                  <Typography>Kids</Typography>
                  <Box component="img" src={UserBaby} sx={GenderIconStyle} />
                </Box>
                <Box
                  sx={{
                    ...GenderBoxStyle,
                    border:
                      gender === "Unisex"
                        ? "1px solid #445fd2"
                        : "1px solid #f3f6f9",
                  }}
                  onClick={() => SetGender("Unisex")}
                  {...register("gender")}
                >
                  <Typography>Unisex</Typography>
                  <Box component="img" src={UserUnisex} sx={GenderIconStyle} />
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
                ( Select the Best Size Option ) Other Can be Added on Feature
                Box Forward
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
                    }}
                    onClick={() => setSize("small")}
                  >
                    <Typography
                      sx={{
                        ...boxText,
                        color: size === "small" ? "#445fd2" : "#ADB8CC",
                      }}
                    >
                      Size M to 3XL
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
                    }}
                    onClick={() => setSize("medium")}
                  >
                    <Typography
                      sx={{
                        ...boxText,
                        color: size === "medium" ? "#445fd2" : "#ADB8CC",
                      }}
                    >
                      Size 28 to 42
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
                    }}
                    onClick={() => setSize("large")}
                  >
                    <Typography
                      sx={{
                        ...boxText,
                        color: size === "large" ? "#445fd2" : "#ADB8CC",
                      }}
                    >
                      Size 6 months to 8 years
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
                    }}
                    onClick={() => setSize("XL")}
                  >
                    <Typography
                      sx={{
                        ...boxText,
                        color: size === "XL" ? "#445fd2" : "#ADB8CC",
                      }}
                    >
                      Size 8 months to 15 years
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
                    }}
                    onClick={() => setSize("XXL")}
                  >
                    <Typography
                      sx={{
                        ...boxText,
                        color: size === "XXL" ? "#445fd2" : "#ADB8CC",
                      }}
                    >
                      Size 0 to 8{" "}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 3,
                border: "1px solid #E3E3E3",
                borderRadius: "10px",
                height: "auto",
                minHeight: "100px",
                position: "relative",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                flexDirection: "row",
                gap: "10px",
                px: 2,
                py: 2,
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
                <Typography sx={CommonTextStyle}>Color</Typography>
                <Input
                  disableUnderline
                  // value={data.color}
                  // onChange={(e) => {
                  //   setTextilesDetails({
                  //     ...textTileDetails,
                  //     color: e.target.value,
                  //   });
                  // }}
                  {...register("traits.productcolor")}
                  sx={TextBoxStyle}
                />
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
                <Typography sx={CommonTextStyle}>Size</Typography>
                <Input
                  disableUnderline
                  // value={data.size}
                  // onChange={(e) => {
                  //   setTextilesDetails({
                  //     ...textTileDetails,
                  //     size: e.target.value,
                  //   });
                  // }}
                  {...register("traits.productsize")}
                  sx={TextBoxStyle}
                />
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
                <Typography sx={CommonTextStyle}>GST</Typography>
                <Input
                  disableUnderline
                  // value={data.gst}
                  // onChange={(e) => {
                  //   setTextilesDetails({
                  //     ...textTileDetails,
                  //     gst: e.target.value,
                  //   });
                  // }}
                  {...register("traits.productgst")}
                  sx={TextBoxStyle}
                />
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
                <Typography sx={CommonTextStyle}>Product ID Type</Typography>
                <Input
                  disableUnderline
                  // value={data.productIdType}
                  // onChange={(e) => {
                  //   setTextilesDetails({
                  //     ...textTileDetails,
                  //     productIdType: e.target.value,
                  //   });
                  // }}
                  {...register("traits.productidtype")}
                  sx={TextBoxStyle}
                />
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
                <Typography sx={CommonTextStyle}>MRP</Typography>
                <Input
                  disableUnderline
                  // value={data.mro}
                  // onChange={(e) => {
                  //   setTextilesDetails({
                  //     ...textTileDetails,
                  //     mrp: e.target.value,
                  //   });
                  // }}
                  {...register("traits.productmrp")}
                  sx={TextBoxStyle}
                />
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
                <Typography sx={CommonTextStyle}>Discounted Price</Typography>
                <Input
                  disableUnderline
                  // value={data.discount}
                  // onChange={(e) => {
                  //   setTextilesDetails({
                  //     ...textTileDetails,
                  //     discount: e.target.value,
                  //   });
                  // }}
                  {...register("traits.productdiscount")}
                  sx={TextBoxStyle}
                />
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
                <Typography sx={CommonTextStyle}>Min order Quantity</Typography>
                <Input
                  disableUnderline
                  // value={data.minimum}
                  // onChange={(e) => {
                  //   setTextilesDetails({
                  //     ...textTileDetails,
                  //     minimum: e.target.value,
                  //   });
                  // }}
                  {...register("traits.productminimumqty")}
                  sx={TextBoxStyle}
                />
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
                  {" "}
                  Max order Quantity
                </Typography>
                <Input
                  disableUnderline
                  {...register("traits.productmaximumqty")}
                  sx={TextBoxStyle}
                />
              </Box>
              <Box
                sx={{
                  p: 1,
                  mt: 2,
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    // onChange={(e) => {
                    //   setSampleAvailability(e.target.value);
                    // }}
                    {...register("sampleavailability")}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label={
                        <StyledLabel>
                          Do you wish to provide a sample in added details ?
                        </StyledLabel>
                      }
                    />
                  </RadioGroup>
                </FormControl>

                {/* <Box
                  sx={{
                    mt: 1,
                    borderRadius: "10px",
                    height: "auto",
                    position: "relative",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    gap: "30px",
                    px: 0,
                    py: 0,
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
                    <Typography sx={CommonTextStyle}>
                      Min order Quantity
                    </Typography>
                    <Input
                      disableUnderline
                      onChange={(e) => setMinOrder(e.target.value)}
                      {...register("minimumorderqty")}
                      sx={{
                        width: "145px",
                        height: "42px",
                        background: "#FFFFFF",
                        borderRadius: "10px",
                        px: 1,
                      }}
                    />
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
                      {" "}
                      Price of sample
                    </Typography>
                    <Input
                      disableUnderline
                      onChange={(e) => setSamplePrice(e.target.value)}
                      {...register("priceofsample")}
                      sx={{
                        width: "145px",
                        height: "42px",
                        background: "#FFFFFF",
                        borderRadius: "10px",
                        px: 1,
                      }}
                    />
                  </Box>
                </Box> */}
              </Box>
            </Box>

            <Button
              // onClick={handleAdd}
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
              ADD
            </Button>
            <Box>
              <Typography sx={CommonTextStyle}>
                Added Details ( {data?.length} )
              </Typography>
              <TableContainer
                sx={{
                  width: "auto",
                  borderRadius: "10px",
                  background: "#f4f6f9",
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
                  <TableHead>
                    <TableRow>
                      {TableHeader.map((data) => (
                        <TableCell
                          key={data.Header}
                          sx={{
                            ...tableDataStyle,
                            padding: "10px",
                          }}
                          component="th"
                          scope="row"
                        >
                          {data.Header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      borderBottom: "1px solid #EDEFF2",
                    }}
                  >
                    {data.map((item) => (
                      <TableRow
                        key={item}
                        style={{
                          borderBottom: "1px solid #e3e3e3",
                          padding: "10px",
                        }}
                      >
                        <TableCell align="center" sx={TableCellStyle}>
                          {item.color}
                        </TableCell>
                        <TableCell align="center" sx={TableCellStyle}>
                          {item.size}
                        </TableCell>
                        <TableCell align="center" sx={TableCellStyle}>
                          {item.gst}
                        </TableCell>
                        <TableCell align="center" sx={TableCellStyle}>
                          {item.productIdType}
                        </TableCell>
                        <TableCell align="center" sx={TableCellStyle}>
                          {item.mrp}
                        </TableCell>
                        <TableCell align="center" sx={TableCellStyle}>
                          {item.discount}
                        </TableCell>
                        <TableCell align="center" sx={TableCellStyle}>
                          {item.minimum}
                        </TableCell>
                        <TableCell align="center" sx={TableCellStyle}>
                          {item.maximum}
                        </TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Button onClick={() => {}}>
                            <Box component="img" src={EditIcon} />
                          </Button>
                          <Button
                            onClick={() => {
                              const newData = data.filter(
                                (data) => data !== item
                              );
                              setData(newData);
                            }}
                          >
                            <Box component="img" src={RemoveIcon} />
                          </Button>
                        </Box>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box
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
                onClick={secondSubmit}
              >
                + Add
              </Button>
              <Box
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
                      // value={othercostifapplicable}
                      // onChange={(e) => setOthercostifapplicable(e.target.value)}
                      {...register("othercostifapplicable")}
                      id="standard-basic"
                      variant="standard"
                      InputProps={{
                        disableUnderline: "true",
                        style: {
                          // color: "rgba(107, 122, 153)",
                          color: "rgba(68, 95, 210, 1)",
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
                      defaultValue="Rupies"
                    >
                      <MenuItem
                        value="Rupies"
                        sx={CommonTextStyle}
                        onClick={(e) => setPaythru("bxitokens")}
                      >
                        <img src={stackofcoins} alt="stackofcoins" />
                      </MenuItem>
                      <MenuItem
                        value="dollar"
                        sx={CommonTextStyle}
                        onClick={(e) => setPaythru("inr")}
                      >
                        ₹
                      </MenuItem>
                    </Select>
                  </Box>
                </Box>
              </Box>
              <Box
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
                    // value={reasonofcost}
                    // onChange={(e) => setReasonofcost(e.target.value)}
                    {...register("reasonofcost")}
                    id="standard-basic"
                    variant="standard"
                    InputProps={{
                      disableUnderline: "true",
                      style: {
                        color: "rgba(68, 95, 210, 1)",
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
              </Box>
            </Box>

            {additionalData.map((items) => {
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
                    {items.othercostifapplicable}
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
                    <Box>{items.reasonofcost}</Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() => {
                          setOthercostifapplicable(items.othercostifapplicable);
                          setReasonofcost(items.reasonofcost);
                          const newAdditionalData = additionalData.filter(
                            (item) => item !== items
                          );
                          setAdditionalData(newAdditionalData);
                        }}
                      >
                        <Box component="img" src={EditIcon} />
                      </Button>
                      <Button
                        onClick={() => {
                          const newAdditionalData = additionalData.filter(
                            (item) => item !== items
                          );
                          setAdditionalData(newAdditionalData);
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
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#6B7A99",
                    py: "10px",
                  }}
                >
                  Select the best features that describes your brand/product
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: 10,
                    color: "#6B7A99",
                    py: "1px",
                  }}
                >
                  (the more features you write the more you are discovered)
                </Typography>
                <Box
                  sx={{
                    mt: 2,
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
                    // onChange={(e) => setName(e.target.value)}
                    {...register("selectbestfeature")}
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
                      // onChange={(e) => setTraits(e.target.value)}
                    >
                      option 1
                    </MenuItem>
                    <MenuItem
                      value="option2"
                      // onChange={(e) => setTraits(e.target.value)}
                    >
                      option 2
                    </MenuItem>
                    <MenuItem
                      value="option3"
                      // onChange={(e) => setTraits(e.target.value)}
                    >
                      option 3
                    </MenuItem>
                    <MenuItem
                      value="option4"
                      // onChange={(e) => setTraits(e.target.value)}
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
                    Selected Feature Discription
                  </Typography>

                  <TextField
                    focused
                    multiline
                    variant="standard"
                    placeholder="    Type in two-three words"
                    // value={description}
                    // onChange={(e) => setDescription(e.target.value)}
                    {...register("featuredescription")}
                    sx={{
                      ...lablechange,
                      background: "#fff",
                      borderRadius: "10px",
                      height: "44px",
                      p: 0.5,
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
                      style: { fontFamily: "Poppins", color: " #6B7A99" },
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
                <Box>
                  {/* <Box>
                    <TextField
                      focused
                      multiline
                      variant="standard"
                      placeholder="  Lorem Ipsum"
                      onChange={(e) => setDescription(e.target.value)}
                      {...register("featuredescription")}
                      sx={{
                        ...lablechange,
                        background: "#fff",
                        borderRadius: "10px",
                        height: "87px",
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
                  <Box
                    key={items}
                    sx={{
                      justifyContent: "space-between",
                      display: "flex",
                      mt: "30px",
                      width: "100%",
                      gap: "20px",
                      background: "#fff",
                      borderRadius: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "80px",
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
                      <Box>
                        <TextField
                          focused
                          multiline
                          variant="standard"
                          placeholder="  Lorem Ipsum"
                          onChange={(e) => setDescription(e.target.value)}
                          {...register("featuredescription")}
                          sx={{
                            ...lablechange,
                            background: "#fff",
                            borderRadius: "10px",
                            // height: "87px",
                            mb: 2,
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
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          onClick={() => {
                            setOthercostifapplicable(
                              items.othercostifapplicable
                            );
                            setReasonofcost(items.reasonofcost);
                            const newAdditionalData = additionalData.filter(
                              (item) => item !== items
                            );
                            setAdditionalData(newAdditionalData);
                          }}
                        >
                          <Box component="img" src={EditIcon} />
                        </Button>
                        <Button
                          onClick={() => {
                            const newAdditionalData = additionalData.filter(
                              (item) => item !== items
                            );
                            setAdditionalData(newAdditionalData);
                          }}
                        >
                          <Box component="img" src={RemoveIcon} />
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                {items.map((item, index) => (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "30px",
                      width: "650px",
                    }}
                  >
                    <Box key={index} sx={{ width: "50%" }}>
                      <Typography
                        sx={{
                          color: " #6B7A99",
                          fontFamily: "Poppins",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: " #6B7A99",
                          fontFamily: "Poppins",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        width: "40%",
                      }}
                    >
                      <Button
                        onClick={() => handleEdit(index)}
                        sx={{ textTransform: "none", marginLeft: "5rem" }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(index)}
                        sx={{ textTransform: "none", marginLeft: "5rem" }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                ))}

                <Box
                  sx={{
                    py: "20px",
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
                        height: "42px",
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
                        {...register("productpickuplocation")}
                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            // color: "rgba(107, 122, 153)",
                            color: "rgba(68, 95, 210, 1)",
                            fontSize: "14px",
                            padding: "7px",
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
                        height: "42px",
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
                        {...register("pickuplocationpincode")}
                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            color: "rgba(68, 95, 210, 1)",
                            fontSize: "14px",
                            padding: "7px",
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
                      mt: 10,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "45%",
                        gap: "10px",
                        height: "42px",
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
                        {...register("manufacturingdate")}
                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            color: "rgba(68, 95, 210, 1)",
                            fontSize: "14px",
                            padding: "7px",
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
                        height: "42px",
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
                        {...register("expirydate")}
                        InputProps={{
                          disableUnderline: "true",
                          style: {
                            color: "rgba(68, 95, 210, 1)",
                            fontSize: "14px",
                            padding: "7px",
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
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                width: "100%",
                mx: "auto",
                height: "100%",
                bgcolor: "transparent",
                mt: 5,
              }}
            >
              <BottomNavigation
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: "#f3f6f9",
                  p: "1px",
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
                <Box sx={{ display: "flex", gap: "10px", p: 1, width: "50%" }}>
                  <Button
                    sx={{
                      width: "100%",
                      height: "32px",
                      borderRadius: "10px",
                      background: "#fff",
                      color: "#636161",
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
                      "&:hover": {
                        background: "#445FD2",
                      },
                    }}
                    variant="contained"
                    // onClick={handleConsole}
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
  );
};

export default TextileProductInfo;

const boxText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 11,
};

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

const TextBoxStyle = {
  width: "139px",
  height: "42px",
  background: "#FFFFFF",
  borderRadius: "10px",
  px: 1,
  color: "rgba(68, 95, 210, 1)",
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
  color: "#C8C8C8",
  overflow: "scroll",
};

const GenderBoxStyle = {
  // border: "1px solid #445fd2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
  heigth: "97px",
  width: "75px",
  padding: "10px",
  gap: "20px",
  borderRadius: "10px",
  background: "#fff",
  cursor: "pointer",
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
  // borderBottom: "1px solid #E8E8E8",
  "&:focus": {
    border: "1px solid #E8E8E8",
  },
};
