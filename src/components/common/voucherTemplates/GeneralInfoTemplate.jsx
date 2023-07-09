import React, { useEffect, useState } from "react";
import { TextField, Select, MenuItem, Button, Box, BottomNavigation, Grid, RadioGroup, FormControlLabel, Radio, } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import InfoIcon from "../../../assets/InfoIcon.svg";
import RedoIcon from "../../../assets/Images/CommonImages/RedoIcon.svg";
import { styles } from "./styles/commonStyles";
import { usePostProductQuery } from "../../../Hooks/Products/AddProduct"
import { useGetProductById } from "../../../Hooks/GetProducts/useGetProductById";
import useGetProductVoucherFields from "../../../Hooks/ProductActions/useGetProductVoucherFields"
import { useNavigate, useParams, useLocation } from "react-router-dom";
import UserMale from "../../../assets/Images/CommonImages/UserMaleColor.svg";
import UserFemale from "../../../assets/Images/CommonImages/UserFemaleColor.svg";
import UserBaby from "../../../assets/Images/CommonImages/UserBabyColor.svg";
import UserUnisex from "../../../assets/Images/CommonImages/UserUnisexColor.svg";
import UserOther from "../../../assets/Images/CommonImages/UserOther.svg";
import UserOther2 from "../../../assets/Images/CommonImages/UserOther2.svg";
import axios from "axios";
import ToolTip from "../../ToolTip";

const subCategoryList = [
  "Car & Motorbike",
  "Motorbike Accessories & Parts",
  "Car Accessories",
  "Car Electronics",
  "Car Parts",
  "Car & Bike Care",
  "All Car & Motorbike Products",
  "Bike & Bicycle"
]
const defaultSubCats = ["Value Voucher", "Gift Cards", "Valid on All", "Valid on Limited", "Others"]

const dbData = {
  StepGeneralInfo: [
    {
      "FieldName": "ProductSubCategory",
      "FieldLabel": "Subcategory",
      "FieldType": "dropdown",
      "MinValue": "1",
      "options": [
        { "label": "Car & Motorbike", "value": "64350499ab34e1c586310a79" },
        { "label": "Motorbike Accessories and parts", "value": "64350565ab34e1c586310a85" },
        { "label": "Car Accessories", "value": "64350578ab34e1c586310a89" },
        { "label": "Car Electronics", "value": "64350583ab34e1c586310a8d" },
        { "label": "Car Parts", "value": "64350592ab34e1c586310a91" },
        { "label": "Car and Bike Care", "value": "643505a2ab34e1c586310a95" },
        { "label": "All cars and Motorbike Products", "value": "643505bbab34e1c586310a99" },
        { "label": "Bike & Bicycle", "value": "6458d4c7ee0f6104e072ab31" },
        { "label": "Others", "value": "64632a5e53954ff20bc8ea01" }
      ],
      "Input": true,
      "required": true
    },
    {
      "FieldName": "ProductName",
      "FieldLabel": "Product Name",
      "FieldType": "text",
      "MinLength": "10",
      "MaxLength": "25",
      "Input": true,
      "required": true
    },
    {
      "FieldName": "ProductSubtitle",
      "FieldLabel": "Product Subtitle",
      "FieldType": "text",
      "MinValue": "1",
      "Input": true,
      "required": true
    },
    {
      "FieldName": "ProductDescription",
      "FieldLabel": "Product Description",
      "FieldType": "textArea",
      "MinValue": "1",
      "Input": true,
      "required": true
    }
  ],
};


const GeneralInfoTemplate = () => {
  const classes = styles();
  const navigate = useNavigate();
  const productId = useParams().id;

  const { data: voucherData } = useGetProductVoucherFields()
  // const { data: ProductData } = useGetProductById(productId);
  const { mutateAsync, isLoading } = usePostProductQuery();
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [renderPage, setRenderPage] = useState(false)
  const [entertainmentOrSpacific, setEntertainmentOrSpacific] = useState('Entertainment')
  const fullPath = useLocation().pathname;
  const [categoryData, setCategoryData] = useState([]);
  const [storeSubCatId, setStoreSubCatId] = useState('');
  const [gender, SetGender] = useState('');
  const [SubCategory, setSubCategory] = useState('');
  const [ProductData, setProductData] = useState(null)

  const img = [
    {
      name: "Female",
      src: UserFemale,
    },
    {
      name: "Male",
      src: UserMale,
    },
    {
      name: "Kids",
      src: UserBaby,
    },
    {
      name: "unisex",
      src: UserUnisex,
    },
    {
      name: "other",
      src: UserOther2,
    },
  ];

  const getAllCetegory = async () => {
    await axios
      .get("/subcategory/getsubcategory", {
        withCredentials: true,
      })
      .then((res) => {
        setCategoryData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchCurrentProduct = async () => {
    await axios
      .get(`product/get_product_byId/${productId}`)
      .then((res) => {
        setProductData(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timeoutId = setInterval(() => {
      if (localStorage.getItem("companyType") != 'undefined') {
        setRenderPage(false)
        setRenderPage(true)
        clearInterval(timeoutId);
      }
    }, 700);

    return () => {
      clearInterval(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("companyType") === "Textile") {
      getAllCetegory();
    }
    fetchCurrentProduct()
  }, [])

  useEffect(() => {
    if (voucherData && voucherData?.StepGeneralInfo && localStorage.getItem("companyType") != 'undefined') {
      setRenderPage(true)
    }
  }, [voucherData, localStorage.getItem("companyType")])

  useEffect(() => {
    if (ProductData && voucherData) {
      updateFieldWithDBValues()
    }
  }, [ProductData, voucherData])

  const updateFieldWithDBValues = () => {

    if (voucherData && voucherData.StepGeneralInfo) {
      voucherData && voucherData.StepGeneralInfo.forEach(element => {
        if (ProductData.hasOwnProperty(element.FieldName)) {
          if (element.FieldName === "file") {
            // setFormValues((prevFormValues) => ({
            //     ...prevFormValues,
            //     [element.FieldLabel]: files[0],
            // }));
          } else {
            setFormValues((prevFormValues) =>
              Object.assign({}, prevFormValues, { [element.FieldName]: ProductData[element.FieldName] })
            );
          }
        }
      });
      // if (localStorage.getItem("companyType") === "Entertainment & Events" && ProductData?.entertainmentOrSpacific) {
      //   setEntertainmentOrSpacific(ProductData.entertainmentOrSpacific)
      // }
      if (localStorage.getItem("companyType") === "Textile" || ProductData?.gender) {

        if (categoryData && categoryData.length > 0 && ProductData?.gender) {
          let t = categoryData.filter(x => x.SubcategoryName == ProductData.gender)[0]['_id']
          setStoreSubCatId(t)
          SetGender(ProductData.gender)
          if (ProductData?.ProductSubCategory) setSubCategory(ProductData.ProductSubCategory);
        }
      }
      if (localStorage.getItem("companyType") === "Airlines Tickets") {
        if (ProductData?.ProductSubCategory) setSubCategory(ProductData.ProductSubCategory);
      }

    }
  }

  const handleSelectChange = (name, value) => {
    console.log('namevalue', name, value)
    setFormValues((prevFormValues) =>
      Object.assign({}, prevFormValues, { [name]: value })
    );
  }
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: files[0],
      }));
    } else {
      setFormValues((prevFormValues) =>
        Object.assign({}, prevFormValues, { [name]: value })
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formValidation();
  };

  const formValidation = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      console.log("Form submitted:", formValues);
      let dataToPass = formValues
      // if (localStorage.getItem("companyType") === "Entertainment & Events") {
      //   dataToPass = { ...formValues, 'entertainmentOrSpacific': entertainmentOrSpacific }
      // }
      if (localStorage.getItem("companyType") === "Textile") {
        dataToPass = { ...formValues, 'gender': gender, 'ProductSubCategory': SubCategory }
      }
      if (localStorage.getItem("companyType") === "Airlines Tickets") {
        dataToPass = { ...formValues, 'ProductSubCategory': "63e38bbfcc4c02b8a0c94b7e" }
      }

      dataToPass = { ...dataToPass, ListingType: "Voucher", VoucherType: localStorage.getItem("digitalData") }

      mutateAsync(dataToPass, {
        onSuccess: (response) => {
          if (response?.data._id) {

            let chunks = fullPath.split('/');
            let path = chunks[chunks.length - 1];
            if (localStorage.getItem("companyType") === "Mobility") {
              navigate(`/home/mobilityVoucher/mobilitygeneralinformation/` + response?.data._id);
            }
            else if (localStorage.getItem("companyType") === "Electronics") {
              navigate(`/home/electronicsVoucher/electronicsgeneralinformation/` + response?.data._id);
            }
            else if (localStorage.getItem("companyType") === "FMCG") {
              navigate(`/home/fmcgVoucher/fmcggeneralinformation/` + response?.data._id);
            }
            else if (localStorage.getItem("companyType") === "Office Supply") {
              navigate(`/home/officesupplyVoucher/officesupplygeneralinformation/` + response?.data._id);
            }
            else if (localStorage.getItem("companyType") === "Lifestyle") {
              navigate(`/home/lifestyleVoucher/lifestylegeneralinformation/` + response?.data._id);
            }
            else if (localStorage.getItem("companyType") === "QSR") {
              navigate(`/home/qsrVoucher/qsrgeneralinformation/` + response?.data._id);
            }
            else if (localStorage.getItem("companyType") === "Others") {
              navigate(`/home/otherVoucher/othertechinfo/` + response?.data._id);
            }
            else if (localStorage.getItem("companyType") === "Entertainment & Events") {
              navigate(`/home/eeVoucher/eegeneralinformation/` + response?.data._id);
            }
            else if (localStorage.getItem("companyType") === "Textile") {
              navigate(`/home/textileVoucher/textilegeneralinformation/` + response?.data._id);
            }
            else if (localStorage.getItem("companyType") === "Airlines Tickets") {
              navigate(`/home/airlineVoucher/airlinegeneralinformation/` + response?.data._id);
            }
          } else {
            alert("Somethings has gone wrong");
          }
        },
        onError: (error) => { },
      }
      );
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    // Validate each field based on its type
    if (voucherData?.StepGeneralInfo) {
      voucherData.StepGeneralInfo.forEach((field) => {
        if (field.required) {
          if (field.FieldType === "dropdown" && !formValues[field.FieldName]) {
            errors[field.FieldName] = "This field is required";
          } else if (field.FieldType === "text" || field.FieldType === "textArea") {
            if (!formValues[field.FieldName]) {
              errors[field.FieldName] = "This field is required";
            } else if (field?.MinLength && formValues[field.FieldName].length < field.MinLength) {
              errors[field.FieldName] = `This field must contain at least ${field.MinLength} character(s)`;
            } else if (field?.MaxLength && formValues[field.FieldName].length > field.MaxLength) {
              errors[field.FieldName] = `This field must contain less than ${field.MaxLength} character(s)`;
            }
          } else if (field.FieldType === "file" && !formValues[field.FieldName]) {
            errors[field.FieldName] = "Please select a file";
          } else if (field.FieldType === "file" && !formValues[field.FieldName]) {
            errors[field.FieldName] = "Please select a file";
          } else if (!formValues[field.FieldName]) {
            errors[field.FieldName] = "This field is required";
          }
        }

        if (field?.hasDependentFields && formValues[field.FieldName]) {
          let t = field.fields[0][formValues[field.FieldName]];
          if (t && t.length > 0) {
            t.forEach((element) => {
              if (
                element.FieldType === "text" &&
                !formValues[element.FieldName]
              ) {
                errors[element.FieldName] = "This field is required";
              }
            });
          }
        }
      });
    }
    if (localStorage.getItem("companyType") === "Textile") {
      if (!SubCategory) errors['SubCategory'] = "This field is required";
      if (!gender) errors['gender'] = "This field is required";
    }
    return errors;
  };

  const renderSelectOptions = (options) => {
    if (localStorage.getItem('digitalData') == 'Offer Specific') {
      return options?.map((res, idx) => {
        return (

          <option key={idx} value={res.value}   >
            {res.label}
          </option>
        );
      })
    } else {
      return defaultSubCats.map((res, idx) => {
        return (
          <option key={res} value={res}  >
            {res}
          </option>
        );
      })
    }
  }

  const renderFormFields = (fields) => {
    return fields.map((ele, ind) => {
      switch (ele.FieldType) {
        case "textArea":
          return (
            <Box className={classes.fieldBox}>
              <label className={classes.fieldLabel}>
                {ele.FieldLabel}<span style={{ color: "red" }}> *</span>
              </label>
              <TextField
                multiline
                minRows={4}
                variant="standard"
                name={ele.FieldName}
                placeholder={ele.FieldLabel}
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
                // {...register("Inclusions")}
                value={formValues[ele.FieldName] || ""}
                className={classes.textAreaField}
                onChange={handleChange}
                error={!!errors[ele.FieldName]}
              />
              {errors[ele.FieldName] && (
                <span className={classes.validationError}>{errors[ele.FieldName]}</span>
              )}
            </Box>
          );
        case "text":
          return (
            <Box className={classes.fieldBox}>
              <label className={classes.fieldLabel}>
                {ele.FieldLabel}<span style={{ color: "red" }}> *</span>
              </label>
              <TextField
                variant="standard"
                name={ele.FieldName}
                placeholder={ele.FieldLabel}
                InputProps={{
                  disableUnderline: "true",
                  style: {
                    fontSize: "14px",
                    padding: "10px",
                    background: '#FFF'
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "red",
                  },
                }}
                //   {...register("productname")}
                value={formValues[ele.FieldName] || ""}
                onChange={handleChange}
                className={classes.textField}
                error={!!errors[ele.FieldName]}
              />
              {errors[ele.FieldName] && (
                <span className={classes.validationError}>{errors[ele.FieldName]}</span>
              )}
            </Box>
          );
        case "dropdown":
          return (
            <Box className={classes.fieldBox} >
              <label className={classes.fieldLabel}>
                {ele.FieldLabel}<span style={{ color: "red" }}> *</span>
              </label>
              <select id="textileDropDown"
                name={ele.FieldName}
                value={formValues[ele.FieldName] || ""}
                onChange={(e) => handleSelectChange(ele.FieldName, e.target.value)}
                className={classes.htmlSelectStyle}
              >
                <option>Select Value</option>
                {ele && ele?.options && ele.options.length > 0 ? renderSelectOptions(ele.options) : null}
              </select>
              {errors[ele.FieldName] && (
                <span className={classes.validationError}>{errors[ele.FieldName]}</span>
              )}
            </Box>
          );
        default:
          return "";
      }
    });
  };

  const resetAll = () => {
    if (localStorage.getItem("companyType") === "Textile") {
      setSubCategory('');
      SetGender('');
      setStoreSubCatId('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={BoxStyle}>

        <Box sx={{
          width: "100%",
          mx: "auto",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "10px",
          px: "25px",
          py: "15px",
        }}
        >
          <label className={classes.pageTitle}>
            General Information
          </label>
          <ToolTip
            info={
              "General Information refers to broad and fundamental knowledge or facts about a particular Product OR Vouchers. It includes Basic details, features, or descriptions that provide overview."
            }
          />
          {/* <Box className={classes.infoIcon} component="img" src={InfoIcon} /> */}
        </Box>
        <Box
          sx={{
            display: "grid",
            width: "88%",
            bgcolor: "transparent",
            mx: "auto",
            mt: "0",
            mb: "20px",
            pb: 4,
            height: "auto",
            gap: "0",
            maxHeight: "500px",
            overflowY: "scroll",
          }}
        >
          {
            renderPage && localStorage.getItem("companyType") === "Textile" && <>
              <Box className={classes.textileBox} >
                <div style={{ display: 'none' }}>
                  {JSON.stringify(storeSubCatId)}
                  {JSON.stringify(SubCategory)}
                </div>
                <label className={classes.fieldLabel}>Gender<span style={{ color: "red" }}> *</span></label>
                <Box className={classes.textileGenderBox} >
                  {categoryData?.map((item, index) => {
                    return (
                      <Box
                        sx={{
                          ...GenderBoxStyle,
                          border:
                            item._id === storeSubCatId
                              ? "1px solid #445fd2"
                              : "1px solid #f3f6f9",
                          cursor: "pointer",
                        }}
                        value={gender}
                        onClick={() => {
                          SetGender(item.SubcategoryName);
                          setStoreSubCatId(item._id);
                          // //console.log("item.SubcategoryName", item.SubcategoryName);
                        }}
                      // {...register("gender")}
                      >
                        <span

                          sx={{
                            ...CommonTextStyle,
                            color:
                              item._id === storeSubCatId ? "#445fd2" : "#6B7A99",
                            fontWeight:
                              item._id === storeSubCatId ? "600" : "500",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.SubcategoryName}
                        </span>
                        <Box
                          component="img"
                          src={img[index].src}
                          sx={{
                            ...GenderIconStyle,
                            opacity: item._id === storeSubCatId ? 1 : 0.5,
                          }}
                        />
                      </Box>
                    );
                  })}
                </Box>
                {errors['gender'] && (
                  <span className={classes.validationError}>{errors['gender']}</span>
                )}
              </Box>
              <Box sx={{ display: "flex", gap: "30px", marginTop: '20px' }}>
                <Box sx={{ width: "100%", background: "transparent", }} >
                  <label className={classes.fieldLabel}>Category<span style={{ color: "red" }}> *</span></label>
                  {/* className={classes.selectField} */}
                  {/* sx={CommonTextStyle} */}
                  <select placeholder="T-shirts & Polos" name='SubCategory' id="textileDropDown"
                    value={SubCategory}
                    className={classes.htmlSelectStyle}
                    onChange={(e) => {
                      setSubCategory(e.target.value);
                    }}
                  >
                    <option value="" >Select Option</option>
                    {
                      categoryData && categoryData.filter(item => item._id === storeSubCatId).length == 1 ?
                        categoryData
                          .filter((item) => item._id === storeSubCatId)[0]
                          ?.SubcategoryValue?.map((item) => {
                            return (
                              <option value={item._id} selected={item._id == SubCategory} >
                                {item.SubcategoryType}
                              </option>
                            );
                          })
                        :
                        <option value="">
                          Please Select Category
                        </option>

                    }

                  </select>
                </Box>

              </Box>
              {errors['SubCategory'] && (
                <span className={classes.validationError}>{errors['SubCategory']}</span>
              )}
            </>
          }

          {renderPage && voucherData?.StepGeneralInfo && voucherData?.StepGeneralInfo.length > 0
            ? renderFormFields(voucherData.StepGeneralInfo)
            : null}
        </Box>


        <div className={classes.formNavigation}>
          <div className={classes.formNavigationBar}>
            <button className={classes.resetLabel} onClick={() => { setFormValues({}); resetAll() }} >
              &nbsp;{/* <Box component="img" sx={{ width: "23px", height: "23px" }} src={RedoIcon} alt="" /> Reset to Default */}
            </button>
            <div className={classes.navigationButtonSection}>
              <button className={classes.navigationCancelButton}
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
                type="submit"
                className={classes.navigationSubmitButton}
                variant="contained"
              >
                {isLoading ? <CircularProgress size={20} /> : "Next"}
              </button>
            </div>
          </div>
        </div>

      </Box>
    </form>
  );
};

export default GeneralInfoTemplate;


const BoxStyle = {
  width: "100%",
  height: "auto",
  overflowY: "scroll",
  boxShadow: " 0px 10px 20px #dcdcdc",
  background: "#FAFBFD",
  boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
  bgcolor: "#FAFBFD",
  mx: "auto",
  maxWidth: "716px",
  minWidth: "300px",
  overflow: "hidden",
  // borderRadius: "10px",
};

const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  color: " #6B7A99",
  paddingBottom: "8px",
};

const GenderBoxStyle = {
  // border: "1px solid #445fd2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  heigth: "70px",
  width: "85px",
  padding: "10px",
  gap: "5px",
  borderRadius: "10px",
  background: "#fff",
  textTransform: 'capitalize',
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
};


const GenderIconStyle = {
  width: "30px",
  height: "30px",
};

const htmlSelectStyle = {

}