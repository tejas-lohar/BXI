import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import { CircularProgress, TextField } from "@mui/material";
import { Select, MenuItem, BottomNavigation, Button } from "@mui/material";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import { usePostProductQuery } from "./ProductHooksQuery";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ToolTip from "../../../../components/ToolTip";
import axios from "axios";

export default function GeneralInformation() {
  const [SubCategory, setSubCategory] = useState("Select");
  const [ProductName, setProductName] = useState("");
  const LocationData = useLocation();
  const [ProductSubtitle, setProductSubtitle] = useState("");
  const [ProductData, setProductData] = useState();
  const [ProductDescription, setProductDescription] = useState("");
  const [MediaSubCatArr, setMediaSubCatArr] = useState([]);
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = usePostProductQuery();
  const fetchMediaSubCategories = async () => {
    await axios
      .get("/mediaonlinesub/Get_media_onlinesingle", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("====>res", res);
        setMediaSubCatArr(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchMediaSubCategories();
  }, []);

  const FetchProduct = async () => {
    await axios
      .get("/product/get_product_byId/" + LocationData?.state?.id)
      .then((response) => {
        console.log("response", response?.data);
        setProductData(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    FetchProduct();
  }, []);
  let DropName = "";
  function DropDownName(id) {
    MediaSubCatArr &&
      MediaSubCatArr?.map((item) => {
        if (item._id === id) {
          DropName = item.Mediaonlinecategorysingle;
        }
      });

    return DropName;
  }
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      subcategory: ProductData?.ProductSubCategory,
      productname: ProductData?.ProductName,
      productsubtitle: ProductData?.ProductSubtitle,
      productdescription: ProductData?.ProductDescription,
    },
    resolver: zodResolver(
      z.object({
        subcategory: z.string().min(1),
        productname: z.string().max(50).min(5),
        productsubtitle: z.string().max(75).min(10),
        productdescription: z.string().max(1000).min(20),
      })
    ),
    defaultValues: {
      subcategory: ProductData?.ProductSubCategory,
      productname: ProductData?.ProductName,
      productsubtitle: ProductData?.ProductSubtitle,
      productdescription: ProductData?.ProductDescription,
    },
  });

  const AddProduct = handleSubmit((data) => {
    console.log(data, "===================>", DropDownName(data.subcategory));

    mutateAsync(
      {
        ProductName: data.productname,
        ProductSubtitle: data.productsubtitle,
        ProductDescription: data.productdescription,
        ProductSubCategory: data.subcategory,
        id: LocationData?.state?.id,
        ProductUploadStatus: "productinformation",
        ListingType: "Media",
        ProductCategoryName:
          DropDownName(data.subcategory) === "Multiplex ADs" ||
          data.subcategory === "643cda0c53068696706e3951"
            ? "Multiplex ADs"
            : "MediaOnline",
        ProductSubCategoryName: DropDownName(data.subcategory),
      },
      {
        onSuccess: (response) => {
          console.log(response, "===================>");
          navigate(
            "/home/mediaonline/mediaonlineproductinfo/" + response.data._id
          );
        },
        onError: (error) => {
          console.log("error", error);
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
          <Box
            sx={{
              width: "100%",
              background: "transparent",
            }}
          >
            <Typography sx={CommonTextStyle}>
              Sub Category <span style={{ color: "red" }}> *</span>
            </Typography>

            {ProductData?.ProductSubCategory ? (
              <Typography sx={CommonTextStyle}>
                {" "}
                Your Selected Category:{" "}
                {DropDownName(ProductData?.ProductSubCategory)}
              </Typography>
            ) : null}

            <Select
              value={SubCategory}
              {...register("subcategory")}
              onChange={(e) => setSubCategory(e.target?.value)}
              sx={{
                background: "#fff",
                border: "none",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: 14,
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
                  fill: "#ADB8CC !important",
                  fontSize: "2rem",
                },
              }}
            >
              {/*   <MenuItem
                value="Select"
                disabled
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
                </MenuItem> */}
              {MediaSubCatArr?.map((item) => {
                return (
                  <MenuItem value={item?._id} sx={MenuItemTextStyle}>
                    {item?.Mediaonlinecategorysingle}
                  </MenuItem>
                );
              })}
              {/* <MenuItem value="CCD" sx={MenuItemTextStyle}>
                Cafe digital screens
              </MenuItem>
              <MenuItem value="AIRPORT SCREENS" sx={MenuItemTextStyle}>
                AIRPORT SCREENS
              </MenuItem>
              <MenuItem value="DOOH" sx={MenuItemTextStyle}>
                DOOH
              </MenuItem>
              <MenuItem value="RADIO" sx={MenuItemTextStyle}>
                RADIO
              </MenuItem>
              <MenuItem value="NEW PAPER" sx={MenuItemTextStyle}>
                NEW PAPER
              </MenuItem>
              <MenuItem value="MAGAZINES" sx={MenuItemTextStyle}>
                MAGAZINES
              </MenuItem>
              <MenuItem value="INFLUNCER MARKERTING" sx={MenuItemTextStyle}>
                INFLUNCER MARKERTING
              </MenuItem>
              <MenuItem value="DIGITAL ADS" sx={MenuItemTextStyle}>
                DIGITAL ADS
              </MenuItem>
              <MenuItem value="DIGITAL MARKETING" sx={MenuItemTextStyle}>
                DIGITAL MARKETING
              </MenuItem>
              <MenuItem value="WEB BANNERS" sx={MenuItemTextStyle}>
                WEB BANNERS
              </MenuItem>
              <MenuItem value="WEB BANNERS" sx={MenuItemTextStyle}>
                INAPP ADVT
              </MenuItem>
              <MenuItem value="WEB BANNERS" sx={MenuItemTextStyle}>
                Social media ADVT
              </MenuItem>
              <MenuItem value="WEB BANNERS" sx={MenuItemTextStyle}>
                Display video
              </MenuItem>
              <MenuItem value="WEB BANNERS" sx={MenuItemTextStyle}>
                mobile
              </MenuItem>
              <MenuItem value="WEB BANNERS" sx={MenuItemTextStyle}>
                single screen
              </MenuItem>
              <MenuItem value="WEB BANNERS" sx={MenuItemTextStyle}>
                gym disgital screen
              </MenuItem>
              <MenuItem value="WEB BANNERS" sx={MenuItemTextStyle}>
                railway digital screen
              </MenuItem>
              <MenuItem value="WEB BANNERS" sx={MenuItemTextStyle}>
                others
              </MenuItem> */}
            </Select>
            <Typography sx={ErrorStyle}>
              {errors["subcategory"]?.message}
            </Typography>
          </Box>
          <Box>
            <Typography sx={CommonTextStyle}>
              Product Name <span style={{ color: "red" }}> *</span>
            </Typography>
            <TextField
              focused
              placeholder="Eg. Cafe coffee Day Juhu ( 8 keywords max ) "
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
              onKeyDown={(e) => {
                if (e.key === " " && e.target.selectionStart === 0) {
                  e.preventDefault();
                }
              }}
              // onChange={(e) => setProductName(e.target.value)}
            />
            <Typography sx={ErrorStyle}>
              {errors["productname"]?.message}
            </Typography>
          </Box>
          <Box>
            <Typography sx={CommonTextStyle}>
              Subtitle <span style={{ color: "red" }}> *</span>
            </Typography>
            <TextField
              focused
              placeholder="Eg. Digital Ads inside cafe on 64 inch TV (24 keywords max ) "
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
              onKeyDown={(e) => {
                if (e.key === " " && e.target.selectionStart === 0) {
                  e.preventDefault();
                }
              }}
              // onChange={(e) => setProductSubtitle(e.target.value)}
            />
            <Typography sx={ErrorStyle}>
              {errors["productsubtitle"]?.message}
            </Typography>
          </Box>

          <Box>
            <Typography sx={CommonTextStyle}>
              Description <span style={{ color: "red" }}> *</span>
            </Typography>
            <TextField
              focused
              placeholder="Eg. Big Brands Need Big digital 64 inch Screens, strategically placed inside cafeteria at a prominent location. Reach your target audience and potential customers by advertising on the screens. Run your 15 seconds video ads on the screens which play 200 times in a day.( 50 keywords max ) "
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
              onKeyDown={(e) => {
                if (e.key === " " && e.target.selectionStart === 0) {
                  e.preventDefault();
                }
              }}
              // onChange={(e) => setProductDescription(e.target.value)}
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
              bgcolor: "#f3f6f9",
              p: "10px",
              boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
            }}
            showLabels
          >
            {/*    <Button
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
  bgcolor: "#f3f6f9",
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
  color: "#445FD2",
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
