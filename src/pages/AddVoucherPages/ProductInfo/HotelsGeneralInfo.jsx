import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoIcon from "../../../assets/InfoIcon.svg";
import { CircularProgress, TextField, ThemeProvider } from "@mui/material";
import { Select, MenuItem, BottomNavigation, Button } from "@mui/material";
import RedoIcon from "../../../assets/Images/CommonImages/RedoIcon.svg";
import { usePostProductQuery } from "./ProductHooksQuery";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import ProductAddTheme from "../../../components/GlobalStyle/MaterialUiGlobalStyle";

export default function HotelsGeneralInfo() {
  // const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [storegeneralinfoarray, setStoreGeneralInfoArray] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  let ErrorArray = [];


  const handleSubmit = (e) => {
    console.log("eeeeee", formValues);
    if (formValues.ProductName === "") {
      setFormErrors({
        FieldName: formValues.ProductName,
        Error: "Product Name is Required",
      });
    } else if (formValues.ProductName?.length < 4) {
      setFormErrors({
        ProductName: formValues.ProductName,
        Error: "Product Name Must be More than 3 Characters",
      });
    } else if (formValues.ProductDescription === "") {
      setFormErrors({
        FieldName: formValues.ProductDescription,
        Error: "Product Description is Required",
      });
    } else if (formValues.ProductDescription?.length < 5) {
      setFormErrors({
        FieldName: formValues.ProductDescription,
        Error: "Product Description Must be More than 5 Characters",
      });
    } else if (formValues.ProductDescription?.length > 500) {
      setFormErrors({
        FieldName: formValues.ProductDescription,
        Error: "Product Description Must be Less than 500 Characters",
      });
    } else if (formValues.ProductSubtitle === "") {
      setFormErrors({
        FieldName: formValues.ProductSubtitle,
        Error: "Product Subtitle is required",
      });
    } else if (formValues.ProductSubtitle === "") {
      setFormErrors({
        FieldName: formValues.ProductSubtitle,
        Error: "Product Subtitle is Required",
      });
    } else {
      setFormErrors(null);
      navigate("/home/voucherinfo")
    }
  };


  const [SubCategory, setSubCategory] = useState();
  const [ProductName, setProductName] = useState("");
  const [ProductSubtitle, setProductSubtitle] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [star, setStar] = useState("5");
  const [storeSubCatId, setStoreSubCatId] = useState("");
  const [subs, setSubs] = useState();
  const [StoreTextileSub, setStoreTextileSub] = useState();

  const [StoreVoucherTypeResponse, setStorVoucherTypeRes] = useState({});

  const { mutateAsync, isLoading } = usePostProductQuery();

  async function GetVoucherType() {
    await axios
      .get("voucher/getvoucherFiledsByType", {
        withCredentials: true,
      })
      .then((res) => {
        setStorVoucherTypeRes(res?.data);
        setStoreGeneralInfoArray(res?.data?.StepGeneralInfo);
        console.log("heyres", res);
      });
  }

  useEffect(() => {
    let filterSubData;

    for (let index = 0; index < StoreTextileSub?.length; index++) {
      if (StoreTextileSub[index]?._id == storeSubCatId) {
        filterSubData = StoreTextileSub[index]?.SubcategoryValue;
      }
    }
    setSubs(filterSubData);
  }, [storeSubCatId]);

  // async function GetAllSubcategory(props) {
  //   console.log("props", props);
  //   await axios
  //     .post(
  //       "subcategory/subcategory",
  //       { id: props },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       setSubCategory(res?.data);
  //     });
  // }

  const getAllCetegory = async () => {
    await axios
      .get("subcategory/getsubcategory", {
        withCredentials: true,
      })
      .then((res) => {
        setStoreTextileSub(res?.data);
      });
  };

  // useEffect(() => {
  //   GetAllSubcategory(storeSubCatId);
  // }, [storeSubCatId]);

  useEffect(() => {
    getAllCetegory();
    GetVoucherType();
  }, []);

  return (
    <form>
      {/* <p>{formErrors.email}</p> */}
      <Box sx={BoxStyle}>
        <Box
          sx={{
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
          <Typography sx={LableStyle}>General Information</Typography>
          <Box
            component="img"
            src={InfoIcon}
            sx={{ width: "18px", height: "auto", cursor: "pointer" }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            mx: "auto",
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            px: "25px",
            py: "15px",
          }}
        >
          {StoreTextileSub?.map((res, idx) => {
            return (
              <Box
                onClick={() => setStoreSubCatId(res?._id)}
                sx={{
                  ...GenderBoxStyle,
                  border: "1px solid #f3f6f9",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{
                    ...CommonTextStyle,
                    color: "#6B7A99",
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  {res?.SubcategoryName}
                </Typography>
                <Box
                  component="img"
                  sx={{
                    ...GenderIconStyle,
                    opacity: 1,
                  }}
                />
              </Box>
            );
          })}
        </Box>

        <Box sx={PageStyle}>
          <Box
            sx={{
              width: "100%",
              background: "transparent",
            }}
          >
            <Typography sx={CommonTextStyle}>Subcategory</Typography>

            <Select
              onChange={(e) => setSubCategory(e.target.value)}
              sx={SelectMenuStyle}
            >
              {subs &&
                subs?.length > 0 &&
                subs?.map((el, idx) => {
                  return (
                    <MenuItem key={idx} value={el?._id} sx={CommonTextStyle}>
                      <Typography sx={{ color: "black" }}>
                        {el.SubcategoryType}
                      </Typography>
                    </MenuItem>
                  );
                })}
            </Select>
          </Box>

          {storegeneralinfoarray && storegeneralinfoarray
            ? storegeneralinfoarray.map((res, idx) => {
                return (
                  <Box>
                    <Typography sx={CommonTextStyle}>
                      {res?.FieldName}
                    </Typography>
                    <ThemeProvider theme={ProductAddTheme}>
                      {res?.FieldName === "Product Description" ? (
                        <textarea
                          focused
                          name={(res?.FieldName).split(" ").join("")}
                          value={formValues?.FieldName}
                          placeholder="Product Name"
                          multiline
                          variant="standard"
                          type="text"
                          InputProps={InputPropsStyle}
                          style={{
                            ...TextFieldStyle,
                          }}
                          onChange={handleChange}
                        />
                      ) : (
                        <input
                          focused
                          name={(res?.FieldName).split(" ").join("")}
                          value={formValues?.FieldName}
                          placeholder="Product Name"
                          multiline
                          variant="standard"
                          type="text"
                          InputProps={InputPropsStyle}
                          style={{
                            ...TextFieldStyle,
                          }}
                          onChange={handleChange}
                        />
                      )}
                    </ThemeProvider>
                    {console.log(
                      "isssue",
                      formErrors === res?.FieldName?.split(" ").join("")
                    )}
                    {/* <Typography sx={ErrorStyle}>
                      {formErrors.FieldName}
                    </Typography> */}
                  </Box>
                );
              })
            : null}
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
            <Box sx={{ display: "flex", gap: "10px", p: 1, width: "50%" }}>
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
                // type="submit"
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
                // onSubmit={handleSubmit}
                onClick={handleSubmit}
              >
                {isLoading ? <CircularProgress /> : "Next"}
              </Button>
            </Box>
          </BottomNavigation>
        </Box>
      </Box>
    </form>
  );
}

const LableStyle = {
  fontFamily: "Poppins",
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
const PageStyle = {
  display: "grid",
  width: "88%",
  bgcolor: "transparent",
  mx: "auto",
  mt: "10px",
  mb: "20px",
  pb: 4,
  height: "auto",
  gap: "20px",
  maxHeight: "500px",
  overflowY: "scroll",
};

const SelectMenuStyle = {
  background: "#fff",
  border: "none",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#6B7A99",
  borderRadius: "9px",
  height: "48px",
  width: "100%",
  boxShadow: "none",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiSelect-select:focus": {
    background: "none",
  },
  "&.MuiSelect-select": {
    background: "none",
  },
  ".MuiSvgIcon-root ": {
    fontSize: "2rem",
  },
};

const btnStar = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 14,
  color: "#6B7A99",
  background: "#FFF",
  borderRadius: 35,
  // color: "#rgba(107, 122, 153, 1)",
  width: 100,
  height: 52,
  textTransform: "none",
  "&:hover": {
    color: "#fff",
    background: "#445FD2",
    fontWeight: 500,
  },
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

const MenuItemTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#6B7A99",
};

const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "12px",
  color: " #6B7A99",
  paddingBottom: "8px",
};

const GenText = {
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: {
    xs: "18px",
    sm: "16px",
    md: "16px",
    lg: "16px",
    xl: "16px",
  },
  color: "#6B7A99",
};

const ErrorStyle = {
  color: "red",
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
};

const GenderIconStyle = {
  width: "30px",
  height: "30px",
};
