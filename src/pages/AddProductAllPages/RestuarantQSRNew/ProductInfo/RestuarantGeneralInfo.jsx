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
import axios from "axios";
import { useEffect } from "react";
import ProductAddTheme from "../../../../components/GlobalStyle/MaterialUiGlobalStyle";
import ToolTip from "../../../../components/ToolTip";

export default function RestuarantGeneralInfo() {
  const [SubCategory, setSubCategory] = useState();
  const [ProductName, setProductName] = useState("");
  const [ProductSubtitle, setProductSubtitle] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [ProductData, setProductData] = useState();
  const LocationData = useLocation();
  const [storeSubCatId, setStoreSubCatId] = useState("");
  const [storeFMCG, setStroreFMCG] = useState([]);
  const [restuarantSubcateory, setRestuarantSubcateory] = useState([]);

  const navigate = useNavigate();
  const { mutateAsync, isLoading } = usePostProductQuery();
  const getAllCetegory = async () => {
    await axios
      .get("/restaurantsub/Get_restaurant_subcategory")
      .then((res) => {
        console.log(res.data);
        setRestuarantSubcateory(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllCetegory();
  }, []);

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
    resolver: zodResolver(
      z.object({
        // gender: z.any(),
        subcategory: z.string().min(1),
        productname: z.string().max(50).min(5),
        productsubtitle: z.string().max(75).min(10),
        productdescription: z.string().max(1000).min(20),
      })
    ),
    // defaultValues: {
    //   productname: "",
    //   productsubtitle: "",
    //   productdescription: "",
    // },
  });
  let DropName = "";
  function DropDownName(id) {
    restuarantSubcateory &&
      restuarantSubcateory?.map((item) => {
        if (item._id === id) {
          DropName = item.RestuarantQsrCategoryType;
        }
      });
    console.log("DropName", DropName);
    return DropName;
  }
  const AddProduct = handleSubmit((data) => {
    mutateAsync(
      {
        // gender: gender,
        // ProductName: ProductName.trim(),
        // ProductSubtittle: ProductSubtitle.trim(),
        // ProductDescription,
        // ProductSubCategory: data.subcategory,
        ProductName: data.productname,
        ProductSubtittle: data.productsubtitle,
        ProductDescription: data.productdescription,
        ProductSubCategory: data.subcategory,
        ProductUploadStatus: "productinformation",
        ProductCategoryName: "QSR",
      },
      {
        onSuccess: (response) => {
          if (response?.data._id) {
            navigate(
              "/home/restaurant/restaurantproductinfo/" + response?.data._id
            );
          } else {
            alert("Somethings has gone wrong");
          }
        },
        onError: (error) => {
          console.log("error=======>", error);
        },
      }
    );
  });
  return (
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
          {/* <Box
            sx={{
              flexDirection: "column",
              width: "100%",
              mx: "auto",
              display: "flex",
              justifyContent: "flex-start",
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
              }}
            >
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
                    onClick={() => {
                      SetGender("UserUnisex");
                      setStoreSubCatId(item._id);
                    }}
                    {...register("gender")}
                  >
                    <Typography
                      sx={{
                        ...CommonTextStyle,
                        color:
                          item._id === storeSubCatId ? "#445fd2" : "#6B7A99",
                        fontWeight: item._id === storeSubCatId ? "600" : "500",
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
          </Box> */}
          <Box
            sx={{
              width: "100%",
              background: "transparent",
            }}
          >
            <Typography sx={CommonTextStyle}>Subcategory <span style={{ color: 'red' }}> *</span></Typography>
            {ProductData?.ProductSubCategory ? (
              <Typography sx={CommonTextStyle}>
                {" "}
                Your Selected Category:{" "}
                {DropDownName(ProductData?.ProductSubCategory)}
              </Typography>
            ) : null}
            <Select
              // value={SubCategory}
              {...register("subcategory")}
              label={DropDownName(ProductData?.ProductSubCategory)}
              onChange={(e) => setSubCategory(e.target.value)}
              sx={{
                background: "#fff",
                border: "none",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                color: "#445FD2",
                borderRadius: "9px",
                height: "48px",
                width: "100%",
                boxShadow: "none",
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
                "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    border: 0,
                  },
                "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
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
              }}
              {...(ProductData?.ProductSubCategory
                ? DropDownName(ProductData?.ProductSubCategory)
                : "Select an option")}
            >
              {restuarantSubcateory?.map((el, idx) => {
                return (
                  <MenuItem
                    value={el._id}
                    key={idx}
                    sx={{ ...CommonTextStyle }}
                  >
                    <Typography sx={{ fontSize: "14px" }}>
                      {el.RestuarantQsrCategoryType}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Select>
            <Typography sx={ErrorStyle}>
              {errors["subcategory"]?.message}
            </Typography>
          </Box>

          <Box>
            <Typography sx={CommonTextStyle}>Product Name <span style={{ color: 'red' }}> *</span></Typography>
            <ThemeProvider theme={ProductAddTheme}>
              <TextField
                focused
                placeholder="Eg. Pizza Hut Voucher ( 8 keywords max )"
                multiline
                variant="standard"
                InputProps={InputPropsStyle}
                sx={{
                  ...TextFieldStyle,
                  border: errors["productname"]?.message
                    ? "1px solid red"
                    : null,
                }}
                {...register("productname")}
                onChange={(e) => setProductName(e.target.value)}
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
            <Typography sx={CommonTextStyle}> Product Subtitle <span style={{ color: 'red' }}> *</span> </Typography>
            <TextField
              focused
              placeholder="Eg. Flat 8% off at checkou Pizza Hut Voucher. ( 24 keywords max ) "
              multiline
              variant="standard"
              sx={{
                ...TextFieldStyle,
                border: errors["productsubtitle"]?.message
                  ? "1px solid red"
                  : null,
              }}
              InputProps={InputPropsStyle}
              {...register("productsubtitle")}
              onChange={(e) => setProductSubtitle(e.target.value)}
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
            <Typography sx={CommonTextStyle}>Product Description <span style={{ color: 'red' }}> *</span></Typography>
            <TextField
              focused
              placeholder="Eg. Pizza Hut, world's largest restaurant company, a famous American restaurant chain and international franchise, is known for its pizza and side dishes. Pizza Hut is split into several different restaurant formats; the original family-style dine-in locations; store front delivery and carry-out locations; and hybrid locations that have carry-out, delivery, and dinein options.( 50 keywords max )"
              multiline
              variant="standard"
              sx={{
                ...TextFieldStyle,
                height: "100%",
                border: errors["productdescription"]?.message
                  ? "1px solid red"
                  : null,
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
  );
}

const TextFieldStyle = {
  width: "97%",
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
