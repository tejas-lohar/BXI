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
import axios from "axios";
import { useEffect } from "react";
import ProductAddTheme from "../../../../components/GlobalStyle/MaterialUiGlobalStyle";
import LifestyleData from "./lifestyleCategoryData.json";
import ToolTip from "../../../../components/ToolTip";
import { toast, ToastContainer } from "react-toastify";
const MakeupMetaCategoriesArr = [
  "Face",
  "Eyes",
  "Makeup Kits & Combos",
  "Lips",
  "Nails",
  "Tools & Brushes",
  "Multi-Functional Makeup Palettes",
  "Top Brands",
];
const skinArr = [
  "Moisturizers",
  "Cleansers",
  "Masks",
  "Toners",
  "Body Care",
  "Hands & Feet",
  "Neck Creams",
  "Eye Care",
  "Lip Care",
  "Sun Care",
  "Skin Tools",
  "Skin Supplements",
];
const HairCareArr = [];
const ToolsAndAccesoriesArr = [];
const HairArr = [
  { name: "Hair Care", metaSubArr: HairCareArr },
  { name: "Tools & Accessories", metaSubArr: "ToolsAndAccesoriesArr" },
];
// const mainCategoriesArr = [
//   {
//     name: "Makeup",
//     subCategoriesArr: MakeupMetaCategoriesArr,
//   },
//   {
//     name: "Skin",
//     subCategoriesArr: skinArr,
//   },
//   { name: "Hair", subCategoriesArr: HairArr },
//   "Hair",
//   "Appliances",
//   " Bath & Body",
//   "Natural",
//   "Mom & Baby",
//   "Health & Wellness",
//   "Men Fragrance",
// ];
// const defaultArr = [
//   "Vitamins and supplements",
//   "Personal care",
//   "Nutrition and fitness",
//   "Health monitors and trackers",
//   "Alternative therapies",
//   "Home decor",
//   "Furniture",
//   "Kitchen and dining",
//   "Home improvement",
//   "Outdoor living",
//   "Clothing",
//   "Accessories",
//   "Shoes",
//   "Jewelry",
//   "Watches",
//   "Makeup",
//   "Skincare",
//   "Haircare",
//   "Fragrance",
//   "Grooming tools and accessories",
//   "Board games and puzzles",
//   "Action figures and collectibles",
//   "Outdoor toys and games",
//   "Building sets and blocks",
//   "Educational toys and games",
//   "Books",
//   "Movies and TV shows",
//   "Music and audio books",
//   "Magazines and newspapers",
//   "Software and video games",
//   "Others",
// ];
export default function LifestyleGeneralInformation() {
  // const [SubCategory, setSubCategory] = useState("Select");
  const [MainCatgory, setMainCatgory] = useState([]);
  const LocationData = useLocation();
  // const [ProductName, setProductName] = useState("");
  const [ProductSubtitle, setProductSubtitle] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [ProductData, setProductData] = useState();
  console.log(LifestyleData, "LifestyleData");
  const getAllOfficeCetegory = async () => {
    await axios
      .get("lifestylesubcategory/lifestylegetsubcategory")
      .then((res) => {
        console.log("========", res.data);
        setCategoryData(res.data[0].SubcategoryValue);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllOfficeCetegory();
  }, []);
  // const img = [
  //   {
  //     name: "UserUnisex",
  //     src: UserUnisex,
  //   },
  //   {
  //     name: "Female",
  //     src: UserFemale,
  //   },
  //   {
  //     name: "Male",
  //     src: UserMale,
  //   },
  //   {
  //     name: "UserBaby",
  //     src: UserBaby,
  //   },
  // ];

  // const [storeSubCatId, setStoreSubCatId] = useState("");
  // console.log("storeSubCatId", storeSubCatId);

  const navigate = useNavigate();
  const { mutateAsync, isLoading } = usePostProductQuery();
  // const [gender, SetGender] = useState("unisex");
  // const getAllCetegory = async () => {
  //   await axios
  //     .get("/subcategory/subcategory")
  //     .then((res) => {
  //       console.log("res", res.data);
  //       setCategoryData(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // useEffect(() => {
  //   getAllCetegory();
  // }, []);
  // let data = [];
  // const handleChange = (event) => {
  //   SetGender(event.target.value);
  //   data = categoryData.filter((item) => {
  //     if (item.SubcategoryName === "unisex") {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  // };
  const FetchProduct = async () => {
    await axios
      .get("/product/get_product_byId/" + LocationData?.state?.id)
      .then((response) => {
        console.log("response", response?.data?.ProductSubCategory);
        setProductData(response?.data);

        Object.entries(response?.data).map(([key, value]) => {
          console.log(key);
          setValue(key, value);
        });
      })
      .catch((error) => {
        console.log("error", error);
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
      return {
        productname: res?.data?.ProductName,
        productsubtitle: res?.data?.ProductSubtittle,
        productdescription: res?.data?.ProductDescription,
        subcategory: res?.data?.ProductSubCategory,
      };
    },
    // values: {
    //   // subcategory: ProductData?.ProductSubCategory,
    //   // productname: ProductData?.ProductName,
    //   // productsubtitle: ProductData?.ProductSubtittle,
    //   // productdescription: ProductData?.ProductDescription,
    // },
    resolver: zodResolver(
      z.object({
        // gender: z.any(),
        subcategory: z.any(),
        productname: z.string().max(25).min(5),
        productsubtitle: z.string().max(50).min(10),
        productdescription: z.string().max(350).min(20),
      })
    ),
    // setValue:{
    //   subcategory: subcategory,
    //   productname: productname,
    //   productsubtitle: productsubtitle,
    //   productdescription: productdescription,
    // },

    // defaultValues: {
    //   productdescription: "",
    //   productsubtitle: "",
    //   productname: "",
    // },
  });
  let DropName = "";
  function DropDownName(id) {
    categoryData &&
      categoryData?.map((item) => {
        if (item._id === id) {
          DropName = item.SubcategoryType;
        }
      });
    console.log("DropName", DropName);
    return DropName;
  }

  console.log("errors", errors);

  const AddProduct = handleSubmit((data) => {
    console.log("data", data);
    mutateAsync(
      {
        // gender: gender,
        ProductName: data.productname.trim(),
        ProductSubtittle: data.productsubtitle.trim(),
        ProductDescription: data.productdescription.trim(),
        ProductSubCategory: data?.subcategory,
        ProductUploadStatus: "productinformation",
      },
      {
        onSuccess: (response) => {
          console.log("response", response, response?.data._id);
          if (response?.data._id) {
            navigate(
              "/home/lifestyle/lifestyleproductinfo/" + response?.data._id
            );
          } else {
            // alert("Somethings has gone wrong");
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
          console.log("error=======>", error);
        },
      }
    );
  });
  return (
    <>
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
                width: "100%",
                background: "transparent",
              }}
            >
              {/* LifestyleData map this data */}
              {/* <Typography sx={CommonTextStyle}>Category</Typography> */}

              {/* {console.log("LifestyleData", LifestyleData)} */}

              <Typography sx={CommonTextStyle}>Subcategory</Typography>
              {ProductData?.ProductSubCategory ? (
                <Typography sx={CommonTextStyle}>
                  {" "}
                  Your Selected Category:{" "}
                  {DropDownName(ProductData?.ProductSubCategory)}
                </Typography>
              ) : null}

              <Box sx={{ display: "flex", gap: "2rem" }}>
                <Select
                  // value={SubCategory}
                  // {...register("subcategory")}

                  {...register("subcategory")}
                  label={DropDownName(ProductData?.ProductSubCategory)}
                  sx={{ ...subcategoryDrowpdownStyle, color: "#445FD2" }}
                >
                  <MenuItem
                    disabled
                    value={ProductData?.ProductSubCategory}
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: 14,
                      color: "rgba(173, 184, 204, 0.59)",
                    }}
                  >
                    {ProductData?.ProductSubCategory
                      ? DropDownName(ProductData?.ProductSubCategory)
                      : "Select an option"}
                  </MenuItem>
                  {categoryData?.map((el, idx) => {
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

            <Box>
              <Typography sx={CommonTextStyle}>Product Name</Typography>
              <ThemeProvider theme={ProductAddTheme}>
                <TextField
                  focused
                  placeholder="Eg. Boat Wave select smart watch ( 8 keywords max )"
                  multiline
                  variant="standard"
                  InputProps={InputPropsStyle}
                  sx={{
                    ...TextFieldStyle,
                    width: "99%",
                    mx: "auto",
                    border: errors["productname"] ? "1px solid red" : null,
                  }}
                  {...register("productname")}
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
            </Box>

            <Box>
              <Typography sx={CommonTextStyle}> Product Subtitle </Typography>
              <TextField
                focused
                placeholder="Eg. smart watch ( 24 keywords max ) "
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
              <Typography sx={CommonTextStyle}>Description</Typography>
              <TextField
                focused
                placeholder="Eg.  Introducing Wave Select, the watch of all watches. Now pursue your fitness journey in style with its beautiful 4.29 cm(1.69”) colour HD display and 20+ active sport modes. Maintain a healthy life with its heart-rate & SpO2 monitor and multiple sedentary & hydration alerts. Never miss a beat with a long-lasting 10 day battery life that keeps you connected to your world, always. ( 50 keywords max ) "
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
                // onChange={(e) => setProductDescription(e.target.value)}
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
                justifyContent: "space-between",
                bgcolor: "#f3f6f9",
                p: "10px",
                boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
              }}
              showLabels
            >
              <Button
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
                {/* <Button
                
              > */}
                Reset to Default
                {/* </Button> */}
              </Button>
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
  color: "#445FD2",
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
