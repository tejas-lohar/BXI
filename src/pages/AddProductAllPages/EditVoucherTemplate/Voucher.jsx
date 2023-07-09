import { Box, Card, Grid, Typography, RadioGroup, FormControlLabel, Radio, InputBase, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, BottomNavigation, TextField, Select, MenuItem, } from "@mui/material";
import useGetCompanyTypeData from "../../../Hooks/CompanyData/useGetCompanyTypeData";
import { useGetCompanyDetails } from "../../../Hooks/Auth";
import { usePostProductQuery } from "../../../Hooks/Products/AddProduct"
import { useEffect, useState } from "react";
import RedoIcon from "../../../assets/Images/CommonImages/RedoIcon.svg"
import { useDropzone } from "react-dropzone";
import UploadtoCloud from "../../../assets/UploadtoCloud.svg";
import RadioIcon from "@mui/icons-material/Radio";
import FlatwareIcon from "@mui/icons-material/Flatware";
import ApartmentIcon from "@mui/icons-material/Apartment";
import IcecreamIcon from "@mui/icons-material/Icecream";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LiquorIcon from "@mui/icons-material/Liquor";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import IronIcon from "@mui/icons-material/Iron";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import React, { useRef } from "react";
import * as htmlToImage from "html-to-image";
import ToolTip from "../../../components/ToolTip";
import { Stack } from "@mui/system";
// import draftToHtml from "draftjs-to-html";
import { CircularProgress } from "@mui/material";
import Template from "./Template";
import { voucherStyle } from './EditVoucherStyle'
import { styles } from '../../../components/common/voucherTemplates/styles/commonStyles'
import EditIcon from "@mui/icons-material/Edit";
import TemplateCustomOptions from "./TemplateCustomOptions";
import EditVoucherForm from "./EditVoucherForm";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";




const VoucherCard = () => {
  let id;
  id = useParams().id;
  const navigate = useNavigate();
  const myRefFront = useRef(null);
  const myRefFrontThree = useRef(null);
  const myRefBack = useRef(null);
  const myRefBackThree = useRef(null);

  const { data: CompanyData } = useGetCompanyDetails();
  const { mutateAsync, isLoading } = usePostProductQuery();
  const {
    data: CompanyTypeData,
    isLoading: CompanyTypeDataLoading,
    error: CompanyTypeDataError,
  } = useGetCompanyTypeData(CompanyData?.data?.companyType);

  const classes = voucherStyle()
  const cls = styles()

  const [dataUrlFront, setDataUrlFront] = useState("");
  const [dataUrlBack, setDataUrlBack] = useState("");
  const [files, setFiles] = useState([]);
  const [cardBgColor, setCardBgColor] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activeAction, setActiveAction] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("Choose wisely");
  const [open, setOpen] = useState(false);
  const [hoveredText, setHoveredText] = useState("");
  const [productData, setProductData] = useState(null)
  const [checked, setChecked] = useState(null)
  const [invertIconChecked, setInvertIconChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [ListThisProductForAmount, setListThisProductForAmount] = useState(null)
  const [ListThisProductForUnitOfTime, setListThisProductForUnitOfTime] = useState('Days')
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  // Left Card

  const [leftCardData, setLeftCardData] = useState({
    offerValue: "$1,00,000",
    validity: "4 months",
    redemptionType: "online",
    cardName: "Gift Card",
    productName: "Product name",
    productDescription: "Lorem ipsum dolor sit amet consectetur.",
    adviceText: "Spend it on something you love!",
  });

  // Right Card
  const [rightCardData, setRightCardData] = useState({
    inclusionPoint1: "Lorem ipsum dolor sit amet consectetur.",
    inclusionPoint2: "Nibh elit nibh neque gravida sed lorem nisi lorem ipsum.",
    inclusionPoint3:
      "Auctor neque eu vulputate gravida ultrices ipsum lectus massa aliquet.",
    inclusionPoint4: "hello Lorem ipsum dolor sit amet consectetur.",
    exclusionPoint1: "Lorem one ipsum dolor sit amet consectetur.",
    exclusionPoint2:
      "Nibh elit two nibh neque gravida sed lorem nisi lorem ipsum.",
    exclusionPoint3:
      "Auctor neque three eu vulputate gravida ultrices ipsum lectus massa aliquet.",
    webUrl: "www.bxiworld.com",
  });

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setListThisProductForAmount(inputValue)
    setHasStartedTyping(true);
  };

  const validateInput = (value) => {
    const parsedValue = parseInt(value, 10);
    return parsedValue > 0 && parsedValue <= 365;
  };

  useEffect(() => {
    GetProductByid();
  }, []);

  useEffect(() => {
    console.log('data========', productData)
  }, [productData])


  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleOpen = (event) => {
    const text = event.target.innerText;
    setHoveredText(text);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".jpg, .png, .xlsx",
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const colors = [
    //LIGHT
    "#FF00001a",
    "#FFA5001a",
    "#FFFF001a",
    "#00FF001a",
    "#00FFFF1a",
    "#0000FF1a",
    "#FF00FF1a",
    "#8000801a",
    // "#0000001a",
    "#FFFFFF", // white

    // MIDDLE
    "#FF000080",
    "#FFA50080",
    "#FFFF0080",
    "#00FF0080",
    "#00FFFF80",
    "#0000FF80",
    "#FF00FF80",
    "#80008080",
    "#00000080",

    // DARK
    "#FF0000", // red
    "#FFA500", // orange
    "#FFFF00", // yellow
    "#00FF00", // green
    "#00FFFF", // cyan
    "#0000FF", // blue
    "#FF00FF", // magenta
    "#800080", // purple
    "#000000", // black
  ];

  const iconList = [
    {
      icon: <RadioIcon sx={{ fontSize: "2.5rem" }} />,
      action: "RadioIcon1",
    },
    {
      icon: <IcecreamIcon sx={{ fontSize: "2.5rem" }} />,
      action: "IcecreamIcon1",
    },
    {
      icon: <ApartmentIcon sx={{ fontSize: "2.5rem" }} />,
      action: "ApartmentIcon2",
    },
    {
      icon: <FlatwareIcon sx={{ fontSize: "2.5rem" }} />,
      action: "FlatwareIcon1",
    },
    {
      icon: <AirplaneTicketIcon sx={{ fontSize: "2.5rem" }} />,
      action: "AirplaneTicketIcon3",
    },
    {
      icon: <FastfoodIcon sx={{ fontSize: "2.5rem" }} />,
      action: "FastfoodIcon1",
    },
    {
      icon: <LocalCafeIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LocalCafeIcon2",
    },
    {
      icon: <LiquorIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LiquorIcon3",
    },
    {
      icon: <LunchDiningIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LunchDiningIcon1",
    },
    {
      icon: <LocalPizzaIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LocalPizzaIcon1",
    },
    {
      icon: <IronIcon sx={{ fontSize: "2.5rem" }} />,
      action: "IronIcon2",
    },
    {
      icon: <RadioIcon sx={{ fontSize: "2.5rem" }} />,
      action: "RadioIcon2",
    },
    {
      icon: <IcecreamIcon sx={{ fontSize: "2.5rem" }} />,
      action: "IcecreamIcon2",
    },
    {
      icon: <ApartmentIcon sx={{ fontSize: "2.5rem" }} />,
      action: "ApartmentIcon1",
    },
    {
      icon: <FlatwareIcon sx={{ fontSize: "2.5rem" }} />,
      action: "FlatwareIcon2",
    },
    {
      icon: <AirplaneTicketIcon sx={{ fontSize: "2.5rem" }} />,
      action: "AirplaneTicketIcon1",
    },
    {
      icon: <FastfoodIcon sx={{ fontSize: "2.5rem" }} />,
      action: "FastfoodIcon2",
    },
    {
      icon: <LocalCafeIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LocalCafeIcon3",
    },
    {
      icon: <LiquorIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LiquorIcon1",
    },
    {
      icon: <LunchDiningIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LunchDiningIcon2",
    },
    {
      icon: <LocalPizzaIcon sx={{ fontSize: "2.5rem" }} />,
      action: "LocalPizzaIcon2",
    },
    {
      icon: <IronIcon sx={{ fontSize: "2.5rem" }} />,
      action: "IronIcon1",
    },
    {
      icon: <AirplaneTicketIcon sx={{ fontSize: "2.5rem" }} />,
      action: "AirplaneTicketIcon2",
    },
    {
      icon: <FastfoodIcon sx={{ fontSize: "2.5rem" }} />,
      action: "FastfoodIcon3",
    },
    // {
    //   icon: <LocalCafeIcon sx={{ fontSize: "2.5rem" }} />,
    //   action: "LocalCafeIcon1",
    // },
    // {
    //   icon: <LiquorIcon sx={{ fontSize: "2.5rem" }} />,
    //   action: "LiquorIcon2",
    // },
  ];
  function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  const downloadCardFront = () => {
    htmlToImage
      .toBlob(myRefFront.current)
      .then((blob) => {
        setDataUrlFront(blob);
        // const link = document.createElement("a");
        // link.download = "my-design-front.png";
        // link.href = dataUrl;
        // link.click();
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  const downloadCardFront2 = () => {
    htmlToImage
      .toBlob(myRefFrontThree.current)
      .then((blob) => {
        setDataUrlFront(blob);
        // const link = document.createElement("a");
        // link.download = "my-design-front.png";
        // link.href = dataUrl;
        // link.click();
      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  const downloadCardBack = () => {
    htmlToImage
      .toBlob(myRefBack.current)
      .then((blob) => {
        setDataUrlBack(blob);

      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };
  const downloadCardBack2 = () => {
    htmlToImage
      .toBlob(myRefBackThree.current)
      .then((blob) => {
        setDataUrlBack(blob);

      })
      .catch((error) => {
        console.error("Error capturing image: ", error);
      });
  };

  async function GetProductByid() {
    await axios
      .get(
        `product/get_product_byId/${id}
        `,
        {
          withCredentials: true,
        }
      )
      .then((res) => {

        if (res?.data) {

          let response = res?.data
          let productDetails = {
            productName: response?.ProductName,
            productSubtitle: response?.ProductSubtitle,
            validityOfVoucherUnit: '',
            validityOfVoucherValue: '',
            pricePerUnit: '',
            redemptionType: response.redemptionType,
            inclusions: response.Inclusions,
            exclusions: response.Exclusions,
            redemptionURL: response?.Link,
            voucherType: localStorage.getItem("digitalData") == 'Offer Specific' ? 'Offer Specific' : 'Gift Card'
          }
          if (response?.ProductsVariantions?.length > 0) {
            let variations = response.ProductsVariantions[0]
            productDetails.pricePerUnit = variations.PricePerUnit;
            productDetails.validityOfVoucherUnit = variations?.validityOfVoucherUnit
            productDetails.validityOfVoucherValue = variations?.validityOfVoucherValue
          }
          setProductData(productDetails)
        }

      });
  }

  useEffect(() => {
    if (dataUrlFront && dataUrlBack && isSubmitted) {
      setShowSpinner(true)
      var formData = new FormData();
      formData.append("ListThisProductForAmount", ListThisProductForAmount);
      formData.append("ListThisProductForUnitOfTime", ListThisProductForUnitOfTime);
      // console.log('filesfiles----', dataUrlFront)
      formData.append("files", dataUrlFront);
      formData.append("files", dataUrlBack);
      formData.append("id", id);

      mutateAsync(formData, {
        onSuccess: (response) => {
          if (response?.data._id) {
            if (localStorage.getItem("digitalData") === "Offer Specific") {
              navigate(`/home/spacificvoucher/${response?.data._id}`)
            } else {
              navigate(`/home/valueandgiftvoucher/${response?.data._id}`)
            }
          } else {
            alert("Somethings has gone wrong");
          }
        },
        onError: (error) => { },
      }
      );

      // axios({
      //   method: "post",
      //   url: "/product/product_mutation",
      //   data: formData,
      //   onUploadProgress: (progressEvent) => {
      //     const { loaded, total } = progressEvent;
      //     let percent = Math.floor((loaded * 100) / total);
      //     console.log(`${loaded}kb of ${total}kb | ${percent}% `);
      //   },
      //   headers: { "Content-Type": "multipart/form-data" },
      //   withCredentials: true,
      // })
      //   .then((res) => {
      //     console.log(res);
      //     setShowSpinner(false)
      // if (localStorage.getItem("digitalData") === "Offer Specific") {
      //   navigate(`/home/spacificvoucher/${id}`)
      // } else {
      //   navigate(`/home/valueandgiftvoucher/${id}`)
      // }

      //   })
      //   .catch((err) => console.log(err));
    }
  }, [dataUrlFront, dataUrlBack])

  const uploadTemplate = () => {
    setShowSpinner(true)
    setDataUrlFront("")
    setIsSubmitted(false)
    if (value == 'Template1') {
      setIsSubmitted(true)
      downloadCardFront()
      downloadCardBack()
    }
    if (value == 'Template3') {
      setIsSubmitted(true)
      downloadCardFront2()
      downloadCardBack2()

    }
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: "716px",
          height: "auto",
        }}
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
              gap: "0",
              py: "10px",
            }}
          >
            <Typography
              sx={{ ...TextStyle, fontSize: "14px", fontWeight: 600 }}
            >
              Go Live
            </Typography>
            <ToolTip
              info={
                "Go Live is the time at which something becomes available to use and purchased by other members on the platform."
              }
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              maxHeight: "500px",
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

              <RadioGroup name="Template" onChange={handleRadioChange} className={classes.templateHeader}  >
                <FormControlLabel
                  checked={value == 'Template1' ? true : false}
                  value="Template1"
                  control={<Radio sx={{ color: "#2d8ae0" }} />}
                  label={<Typography className={classes.templateLabel} sx={{ fontSize: "1.5rem", color: "#315794" }}> Template 1 </Typography>}
                  sx={{ color: "#2d8ae0" }}

                />
                {value == 'Template1' && <button className={classes.templateEditIconButton} onClick={() => { setOpen(true) }}><EditIcon /></button>}
              </RadioGroup>
              <Box>
                <Template
                  tempOne
                  cardBgColor={value == 'Template1' ? cardBgColor : ''}
                  cardImage={value == 'Template1' ? files[0]?.preview : null}
                  category={value == 'Template1' ? category ? category : 0 : 0}
                  templateId='Template1'
                  productData={productData}
                  textInverted={value == 'Template1' ? checked : true}
                  iconInverted={value == 'Template1' ? invertIconChecked : true}
                  myRefBack={myRefBack}
                  myRefFront={myRefFront}
                />
              </Box>
              {
                value == 'Template1' && <TemplateCustomOptions
                  updateFile={(e) => { setFiles(e) }}
                  updateBGColor={(e) => { setCardBgColor(e) }}
                  updateIcon={(e) => { setCategory(e) }}
                  updateTextColor={(e) => { setChecked(e) }}
                  updateInvertIcon={(e) => { setInvertIconChecked(e) }}
                />
              }

              {/* template 3 */}
              <RadioGroup name="Template" onChange={handleRadioChange} className={classes.templateHeader}  >
                <FormControlLabel
                  checked={value == 'Template3' ? true : false}
                  value="Template3"
                  control={<Radio sx={{ color: "#2d8ae0" }} />}
                  label={<Typography className={classes.templateLabel} sx={{ fontSize: "1.5rem", color: "#315794" }}> Template 2 </Typography>}
                  sx={{ color: "#2d8ae0" }}

                />
                {value == 'Template3' && <button className={classes.templateEditIconButton} onClick={() => { setOpen(true) }}><EditIcon /></button>}
              </RadioGroup>
              <Box>
                <Template
                  cardBgColor={value == 'Template3' ? cardBgColor : ''}
                  cardImage={value == 'Template3' ? files[0]?.preview : null}
                  category={value == 'Template3' ? category ? category : 0 : 0}
                  templateId='Template3'
                  productData={productData}
                  textInverted={value == 'Template3' ? checked : true}
                  iconInverted={value == 'Template3' ? invertIconChecked : true}
                  myRefBack={myRefBackThree}
                  myRefFront={myRefFrontThree}
                />
              </Box>
              {
                value == 'Template3' && <TemplateCustomOptions
                  updateFile={(e) => { setFiles(e) }}
                  updateBGColor={(e) => { setCardBgColor(e) }}
                  updateIcon={(e) => { setCategory(e) }}
                  updateTextColor={(e) => { setChecked(e) }}
                  updateInvertIcon={(e) => { setInvertIconChecked(e) }}
                />
              }

              <Box className={cls.fieldBox}>
                <label className={cls.fieldLabel}>
                  List this product for number of days ( maximum 365 days )<span style={{ color: "red" }}> *</span>
                </label>
                <Box className={cls.goLiveFieldBox}>
                  <TextField
                    variant="standard"
                    type="number"

                    name="ListThisProductForAmount"
                    placeholder="List this product for number of days ( maximum 365 days )"
                    InputProps={{
                      disableUnderline: "true",
                      style: {
                        fontSize: "14px",
                        padding: "10px",
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: "red",
                      },
                    }}
                    //   {...register("productname")}
                    value={ListThisProductForAmount}
                    onChange={handleChange}
                    // onChange={(e) => { setListThisProductForAmount(e.target.value) }}
                    className={cls.goLivetextField}
                    error={hasStartedTyping && !validateInput(ListThisProductForAmount)}
                    helperText={hasStartedTyping && !validateInput(ListThisProductForAmount) ? 'Please enter valid days!' : ''}

                  />
                  <Select
                    className={cls.goLiveSelectBox}
                    sx={{
                      ".MuiOutlinedInput-notchedOutline": { border: 0 },
                      "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                        border: 0,
                      },
                      "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: 0,
                      },
                    }}
                    defaultValue={"Days"}
                    name="ListThisProductForUnitOfTime"
                    // {...register("ListPeriod")}
                    InputProps={{
                      disableUnderline: "true",
                      style: {
                        fontSize: "14px",
                        padding: "10px",
                      },
                    }}
                    onChange={(e) => { setListThisProductForUnitOfTime(e.target.value) }}
                  >

                    <MenuItem className={cls.goLiveMenuItems} value="Days">
                      Days
                    </MenuItem>
                  </Select>

                </Box>

              </Box>
              <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose} sx={{ zIndex: 100 }}>
                <DialogTitle>Edit Content on Voucher</DialogTitle>
                <DialogContent style={{ background: '#FAFBFD' }}>
                  <Box>
                    <EditVoucherForm cardData={productData} closePopup={() => { setOpen(false) }} updateFormData={(e) => { setProductData(e) }} />
                  </Box>
                </DialogContent>
                {/* <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={null}>Save</Button>
          </DialogActions> */}
              </Dialog>
            </Stack>
          </Box>

        </Box>
        <div className={cls.formNavigation}>
          <div className={cls.formNavigationBar}   style={{padding:"0 30px"}}>
            <button className={cls.resetLabel}  >
              &nbsp;{/* <Box component="img" sx={{ width: "23px", height: "23px" }} src={RedoIcon} alt="" /> Reset to Default */}
            </button>
            <div className={cls.navigationButtonSection}  style={{padding:"10px"}}>
              <button className={cls.navigationCancelButton}
                variant="contained"
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
              </button>
              <button
                disabled={!value || (!ListThisProductForAmount || !validateInput(ListThisProductForAmount)) || files.length == 0}
                variant="contained"
                onClick={() => uploadTemplate()}
                type="submit"
                className={cls.navigationSubmitButton}
              >
                {isLoading ? <CircularProgress size={20} /> : "Next"}
              </button>
            </div>
          </div>
        </div>

      </Box>
    </>
  );
};

export default VoucherCard;


const FirstBoxChildStyle = {
  width: "100%",
  mx: "auto",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  py: "10px",
};

const TextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10px",
  textTransform: "none",
  color: "#6B7A99",
};

const FirstBoxStyle = {
  boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
  padding: "20px 20px",
  backgroundColor: "#f3f6f9",
};