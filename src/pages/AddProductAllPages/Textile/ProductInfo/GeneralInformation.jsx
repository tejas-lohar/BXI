import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import { CircularProgress, TextField, ThemeProvider } from "@mui/material";
import { Select, MenuItem, BottomNavigation, Button } from "@mui/material";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import { usePostProductQuery } from "./ProductHooksQuery";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray } from "react-hook-form";
import UserMale from "../../../../assets/Images/CommonImages/UserMaleColor.svg";
import UserFemale from "../../../../assets/Images/CommonImages/UserFemaleColor.svg";
import UserBaby from "../../../../assets/Images/CommonImages/UserBabyColor.svg";
import UserUnisex from "../../../../assets/Images/CommonImages/UserUnisexColor.svg";
import UserOther from "../../../../assets/Images/CommonImages/UserOther.svg";
import axios from "axios";
import UserOther2 from "../../../../assets/Images/CommonImages/UserOther2.svg";
import { useEffect } from "react";
import { Category } from "@mui/icons-material";
import { createTheme } from "@material-ui/core/styles";
import { toast, ToastContainer } from "react-toastify";

// import lifestyleData from "./lifestyleCategoryData.json";

// import MaterialUiGlobalStyleComponent from "../../../../components/GlobalStyle/MaterialUiGlobalStyle";

import ProductAddTheme from "../../../../components/GlobalStyle/MaterialUiGlobalStyle";
import ToolTip from "../../../../components/ToolTip";

export default function GeneralInformation() {
  const [SubCategory, setSubCategory] = useState("Select");
  const [ProductName, setProductName] = useState("");
  const [ProductSubtitle, setProductSubtitle] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [hsnFilter, setHsnFilter] = useState("");
  const [ProductData, setProductData] = useState("");
  console.log(ProductData, "ProductData");
  const LocationData = useLocation();
  console.log("locationData", LocationData);
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

  const [storeSubCatId, setStoreSubCatId] = useState();

  const navigate = useNavigate();
  const { mutateAsync, isLoading } = usePostProductQuery();
  const [gender, SetGender] = useState("Unisex");
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

  async function getHsnCode() {
    try {
      await axios
        .post(
          "hsn/Get_HSNCode",
          {
            hsnFilter,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          //console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getHsnCode();
  }, [hsnFilter]);

  useEffect(() => {
    getAllCetegory();
  }, []);
  // //console.log("lifestyleData", lifestyleData);
  let data = [];
  const handleChange = (event) => {
    SetGender(event.target.value);
    data = categoryData.filter((item) => {
      if (item.SubcategoryName === "unisex") {
        return true;
      } else {
        return false;
      }
    });
  };

  let DropName = "";

  function DropDownName(id) {
    categoryData &&
      categoryData?.map((item) => {
        // categoryData.filter((data) => data._id === storeSubCatId)[0]
        // ?.categoryData?.map((item) => {
        if (item._id === id) {
          DropName = item.SubcategoryType;
        }
      });
    //console.log("DropName", DropName);
    return DropName;
  }

  const category = ProductData?.gender;
  const subcategoryId = ProductData?.ProductSubCategory;

  const getSubcategoryName = (categoryName, subcategoryId) => {
    const category = categoryData.find(
      (category) => category.SubcategoryName === categoryName
    );
    if (category) {
      const subcategory = category.SubcategoryValue.find(
        (subcategory) => subcategory._id === subcategoryId
      );
      if (subcategory) {
        return subcategory.SubcategoryType;
      }
    }
    return null;
  };
  const subcategoryName = getSubcategoryName(category, subcategoryId);

  console.log("lastcategoryname", subcategoryName);

  const FetchProduct = async () => {
    await axios
      .get("/product/get_product_byId/" + LocationData?.state?.id)
      .then((response) => {
        //console.log("response", response?.data);
        setProductData(response?.data);
        SetGender(response.datagender);
        Object.entries(response?.data).map(([key, value]) => {
          //console.log(key);
          // setValue(key, value);
        });
      })
      .catch((error) => {
        //console.log("error", error);
      });
  };
  useEffect(() => {
    FetchProduct();
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await axios.get(
        "/product/get_product_byId/" + LocationData?.state?.id
      );

      console.log("168", res);
      return {
        productname: res?.data?.ProductName,
        productsubtitle: res?.data?.ProductSubtittle,
        productdescription: res?.data?.ProductDescription,
        subcategory: res?.data?.ProductSubCategory,
      };
    },
    resolver: zodResolver(
      z.object({
        // gender: z.any(),
        subcategory: z.string().min(1),
        productname: z.string().max(50).min(5),
        productsubtitle: z.string().max(75).min(10),
        productdescription: z.string().max(1000).min(20),
      })
    ),
  });

  const AddProduct = handleSubmit((data) => {
    console.log("data", data);
    mutateAsync(
      {
        gender: gender,
        ProductName: data?.productname?.trim(),
        ProductSubtittle: data?.productsubtitle?.trim(),
        ProductDescription: data?.productdescription?.trim(),
        ProductSubCategory: data?.subcategory,
        ProductUploadStatus: "productinformation",
        ListingType: "Product",
        ProductCategoryName: "Textile",
      },
      {
        onSuccess: (response) => {
          if (response?.data._id) {
            navigate("/home/textile/texttileproductinfo/" + response?.data._id);
          } else {
            // alert("Please fill The Necessary Information");
            toast.error("Please fill The Necessary Information", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        },
        onError: (error) => {
          alert("Something");
        },
      }
    );
  });
  return (
    <>
      <ToastContainer style={{ fontSize: "16px" }} />
      <form onSubmit={AddProduct}>
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
              General Information
            </Typography>
            <ToolTip
              info={
                "General Information refers to broad and fundamental knowledge or facts about a particular Product OR Vouchers. It includes Basic details, features, or descriptions that provide overview."
              }
            />
          </Box>

          <Box
            sx={{
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
            }}
          >
            <Box
              sx={{
                flexDirection: "column",
                width: "100%",
                mx: "auto",
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
              }}
            >
              <Typography sx={CommonTextStyle}>
                Gender <span style={{ color: "red" }}> *</span>
              </Typography>
              {ProductData?.ProductSubCategory ? (
                <Typography sx={CommonTextStyle}>
                  {" "}
                  Your Selected Gender:{" "}
                  {/* {DropDownName(ProductData?.ProductSubCategory)} */}
                  {category}
                </Typography>
              ) : null}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: {
                    xl: "start",
                    lg: "start",
                    md: "start",
                    sm: "start",
                    xs: "center",
                  },
                  flexWrap: "wrap",
                  gap: "10px",
                  height: "100%",
                }}
              >
                {categoryData?.map((item, index) => {
                  console.log("item", item);
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
                      onClick={() => {
                        SetGender(item.SubcategoryName);
                        setStoreSubCatId(item._id);
                        // //console.log("item.SubcategoryName", item.SubcategoryName);
                      }}
                      {...register("gender")}
                    >
                      <Typography
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
                      </Typography>
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
              <Typography sx={ErrorStyle}>
                {errors["gender"]?.message}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "30px" }}>
              <Box
                sx={{
                  width: "100%",
                  background: "transparent",
                }}
              >
                {/* LifestyleData map this data */}
                {/* <Typography sx={CommonTextStyle}>Category</Typography> */}

                {/* {//console.log("LifestyleData", LifestyleData)} */}

                <Typography sx={CommonTextStyle}>
                  Subcategory <span style={{ color: "red" }}> *</span>
                </Typography>
                {ProductData?.ProductSubCategory ? (
                  <Typography sx={CommonTextStyle}>
                    {" "}
                    Your Selected Category:{" "}
                    {/* {DropDownName(ProductData?.ProductSubCategory)} */}
                    {subcategoryName}
                  </Typography>
                ) : null}

                <Box sx={{ display: "flex", gap: "2rem" }}>
                  <Select
                    // value={SubCategory}
                    // {...register("subcategory")}
                    defaultValue={DropDownName(ProductData?.ProductSubCategory)}
                    {...register("subcategory")}
                    label={DropDownName(ProductData?.ProductSubCategory)}
                    sx={{ ...subcategoryDrowpdownStyle, color: "#445FD2" }}
                  >
                    {/*   <MenuItem>
                    {ProductData?.ProductSubCategory
                      ? DropDownName(ProductData?.ProductSubCategory)
                      : "hello"}
                    </MenuItem> */}
                    {categoryData
                      .filter((item) => item._id === storeSubCatId)[0]
                      ?.SubcategoryValue?.map((el, idx) => {
                        console.log("el", el);
                        return (
                          <MenuItem
                            key={idx}
                            value={el?._id}
                            sx={{ ...CommonTextStyle }}
                          >
                            {el.SubcategoryType}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </Box>
                <Typography sx={ErrorStyle}>
                  {errors["subcategory"]?.message}
                </Typography>
              </Box>
            </Box>

            {/* <Box>
              <Typography sx={CommonTextStyle}>Product Name</Typography>
              <ThemeProvider theme={ProductAddTheme}>
                <TextField
                  focused
                  placeholder="Eg. Amazon Brand-Symbol T-Shirt (8 keywords max)"
                  multiline
                  // variant="standard"
                  InputProps={InputPropsStyle}
                  sx={{
                    ...TextFieldStyle,
                    width: "99%",
                    mx: "auto",
                    border: errors["productname"] ? "1px solid red" : null,
                  }}
                  {...register("productname")}
                  // onChange={(e) => setProductName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === " " && e.target.selectionStart === 0) {
                      e.preventDefault();
                    }
                  }}
                />
              </ThemeProvider>
              <Typography sx={ErrorStyle}>
                {errors["productname"]?.message}
              </Typography>
            </Box> */}
            <Box>
              <Typography sx={CommonTextStyle}>
                Product Name <span style={{ color: "red" }}> *</span>
              </Typography>
              <TextField
                focused
                placeholder="Eg. Amazon Brand-Symbol T-Shirt (8 keywords max)"
                multiline
                variant="standard"
                sx={{
                  ...TextFieldStyle,
                  width: "99%",
                  mx: "auto",
                  border: errors["productname"] ? "1px solid red" : null,
                }}
                InputProps={InputPropsStyle}
                {...register("productname")}
                // onChange={(e) => setProductSubtitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === " " && e.target.selectionStart === 0) {
                    e.preventDefault();
                  }
                }}
              />
              <Typography sx={ErrorStyle}>
                {errors["productname"]?.message}
              </Typography>
            </Box>

            <Box>
              <Typography sx={CommonTextStyle}>
                {" "}
                Product Subtitle <span style={{ color: "red" }}> *</span>{" "}
              </Typography>
              <TextField
                focused
                placeholder="Eg.  Eden and Lvy Regular Black Color  half sleeves and round neck T-Shirt (24 keywords max)"
                multiline
                variant="standard"
                sx={{
                  ...TextFieldStyle,
                  width: "99%",
                  mx: "auto",
                  border: errors["productsubtitle"] ? "1px solid red" : null,
                }}
                InputProps={InputPropsStyle}
                {...register("productsubtitle")}
                // onChange={(e) => setProductSubtitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === " " && e.target.selectionStart === 0) {
                    e.preventDefault();
                  }
                }}
              />
              <Typography sx={ErrorStyle}>
                {errors["productsubtitle"]?.message}
              </Typography>
            </Box>
            <Box>
              <Typography sx={CommonTextStyle}>
                Product Description <span style={{ color: "red" }}> *</span>
              </Typography>
              <TextField
                focused
                placeholder="Amazon T-Shirts are good for Outing and Casual Wear , They come in multiple colors , can be used for regular wear and are very easy to care. You would feel comfortable with its Fabric and Stretchable Material ( 50 keywords max ) "
                multiline
                variant="standard"
                sx={{
                  ...TextFieldStyle,
                  height: "100%",
                  width: "99%",
                  mx: "auto",
                  border: errors["productdescription"] ? "1px solid red" : null,
                }}
                minRows={3}
                InputProps={InputPropsStyle}
                {...register("productdescription")}
                onChange={(e) => setProductDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === " " && e.target.selectionStart === 0) {
                    e.preventDefault();
                  }
                }}
              />
              <Typography sx={ErrorStyle}>
                {errors["productdescription"]?.message}
              </Typography>
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
                justifyContent: "flex-end",
                background: "#FAFBFD",
                p: "10px",
                boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
              }}
              showLabels
            >
              {/* <Button
                sx={{
                  marginRight: "auto",
                  p: "2%",
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
              </Button> */}
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
}

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
    color: "#445FD2",
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
const subcategoryDrowpdownStyle = {
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
    fill: "#ADB8CC !important",
    fontSize: "2rem",
  },
};
