import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import { CircularProgress, TextField, ThemeProvider } from "@mui/material";
import { Select, MenuItem, BottomNavigation, Button } from "@mui/material";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import { usePostProductQuery } from "./ProductHooksQuery";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import ProductAddTheme from "../../../../components/GlobalStyle/MaterialUiGlobalStyle";
import { toast, ToastContainer } from "react-toastify";
import ToolTip from "../../../../components/ToolTip";

export default function HotelsGeneralInfo() {
  const navigate = useNavigate();

  const productId = useParams().id;
  const [SubCategory, setSubCategory] = useState();
  const [ProductName, setProductName] = useState("");
  const [ProductData, setProductData] = useState();
  const [ProductSubtitle, setProductSubtitle] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const LocationData = useLocation();
  const [star, setStar] = useState("5");
  const [storeSubCatId, setStoreSubCatId] = useState("");
  const [hotels, setHotels] = useState();

  const { mutateAsync, isLoading } = usePostProductQuery();


  const getAllCetegory = async () => {
    await axios
      .get("hotelsub/Get_hotel_subcategory", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setHotels(res.data);
      });
  };

  useEffect(() => {
    if (localStorage.getItem('digitalData') == 'Offer Specific') {
      getAllCetegory();
    } else {
      const defaultSubCats = ["Value Voucher", "Gift Cards", "Valid on All", "Valid on Limited", "Others"]
      setHotels(defaultSubCats);
    }

  }, []);

  let DropName = "";
  function DropDownName(id) {
    hotels &&
      hotels?.map((item) => {
        if (item._id === id) {
          DropName = item.SubcategoryType;
        }
      });
    console.log("DropName", DropName);
    return DropName;
  }
  const FetchProduct = async () => {
    await axios
      .get("/product/get_product_byId/" + productId)
      .then((response) => {
        if (response && response?.data) {
          console.log('response?.data?.ProductSubCategory',response?.data?.ProductSubCategory)
          setProductData(response?.data)
          setSubCategory(response?.data?.ProductSubCategory);
          setProductName(response?.data?.ProductName);
          setProductSubtitle(response?.data?.ProductSubtittle);
          setProductDescription(response?.data?.ProductDescription);
          setStar(response?.data?.HotelStars)
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    FetchProduct();
  }, []);


  useEffect(() => {
    if (ProductData && hotels) {
      setSubCategory(ProductData?.ProductSubCategory);
    }
  }, [ProductData, hotels])
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        subcategory: z.string({ message: "Please Select one category" }).min(1),
        // productname: z.string().max(50).min(3),
        // productsubtitle: z.string().max(150).min(4),
        productname: z.string().max(50).min(10),
        productsubtitle: z.string().max(75).min(10),
        productdescription: z.string().max(1000).min(10),
      })
    ),
  });

  const AddProduct = handleSubmit((data) => {
    mutateAsync(
      {
        ProductName: data.productname.trim(),
        ProductSubtitle: data.productsubtitle.trim(),
        ProductDescription: data.productdescription.trim(),
        ProductSubCategory: data.subcategory.trim(),
        HotelStars: star.trim(),
      },
      {
        onSuccess: (response) => {
          if (response?.data._id) {
            navigate("/home/hotelsVoucher/hotelsproductinfo/" + response?.data._id);
          } else {
            // alert("Somethings has gone wrong");
            return toast.error("Somethings has gone wrong", {
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
        onError: (error) => { },
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
                width: "100%",
                background: "transparent",
              }}
            >
              <Typography sx={CommonTextStyle}>Category</Typography>

              <Select
                value={SubCategory}
                {...register("subcategory")}
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
                    // fill: "#ADB8CC !important",
                    fontSize: "14px",
                  },
                }}
              >
                {hotels &&
                  hotels?.length > 0 &&
                  hotels?.map((el, idx) => {
                    return (
                      localStorage.getItem('digitalData') == 'Offer Specific' ?
                        <MenuItem key={idx} selected={SubCategory == el?._id} value={el?._id} sx={CommonTextStyle}>
                          <Typography sx={{ color: "#445FD2", fontSize: "14px" }}>
                            {el.SampleCategoryType}
                          </Typography>
                        </MenuItem>
                        :
                        <MenuItem key={idx} selected={SubCategory == el} value={el} sx={CommonTextStyle}>
                          <Typography sx={{ color: "#445FD2", fontSize: "14px" }}>
                            {el}
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
              <Typography sx={CommonTextStyle}>Voucher Name</Typography>
              <ThemeProvider theme={ProductAddTheme}>
                <TextField
                  focused
                  placeholder="Eg. JW Marriott Mumbai  Deluxe Room Voucher ( 8 keywords max ) "
                  multiline
                  variant="standard"
                  InputProps={InputPropsStyle}
                  sx={{
                    ...TextFieldStyle,
                    width: "99%",
                    mx: "auto",
                    border: errors["productname"] ? "1px solid red" : null,
                  }}
                  value={ProductName}
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
              <Typography sx={CommonTextStyle}> Voucher Subtitle </Typography>
              <TextField
                focused
                placeholder="Eg. Luxury Deluxe Room Nights Vouchers for Your Stay with MAP Plan  (24 keywords max)"
                multiline
                variant="standard"
                sx={{
                  ...TextFieldStyle,
                  width: "99%",
                  mx: "auto",
                  border: errors["productsubtitle"] ? "1px solid red" : null,
                }}
                InputProps={InputPropsStyle}
                value={ProductSubtitle}
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
              <Typography sx={CommonTextStyle}>
                {" "}
                Voucher Description{" "}
              </Typography>
              <TextField
                focused
                placeholder="Eg. Luxury Deluxe Room Vouchers at Marriott are the perfect gift. You Can use them for your Important People Stay OR Gifting it to your Partners and Near Dear Ones. Marriott Property Comes with 350+ Rooms , 3 In House Restaurant, 24X7 in Room Dinning and Service, Medical and Cabs Service Available, This are Easy to Redeem Vouchers You have to Come on our Website and Apply the Codes and Book the Room.( 50 keywords max ) "
                multiline
                variant="standard"
                sx={{
                  ...TextFieldStyle,
                  height: "99%",
                  width: "99%",
                  mx: "auto",
                  border: errors["productdescription"] ? "1px solid red" : null,
                }}
                minRows={2}
                InputProps={InputPropsStyle}
                value={ProductDescription}
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
            <Box>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#6B7A99",
                  marginTop: "20px",
                }}
              >
                Ratings of the property
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Button
                  contained
                  sx={{
                    ...btnStar,
                    backgroundColor: star === "5" ? "#445FD2" : "#fff",
                    color: star === "5" ? "#fff" : "rgba(107, 122, 153, 1)",
                  }}
                  onClick={() => setStar("5")}
                >
                  5 star
                </Button>
                <Button
                  contained
                  sx={{
                    ...btnStar,
                    backgroundColor: star === "4" ? "#445FD2" : "#fff",
                    color: star === "4" ? "#fff" : "rgba(107, 122, 153, 1)",
                  }}
                  onClick={() => setStar("4")}
                >
                  4 star
                </Button>
                <Button
                  contained
                  sx={{
                    ...btnStar,
                    backgroundColor: star === "3" ? "#445FD2" : "#fff",
                    color: star === "3" ? "#fff" : "rgba(107, 122, 153, 1)",
                  }}
                  onClick={() => setStar("3")}
                >
                  3 star
                </Button>
                <Button
                  contained
                  sx={{
                    ...btnStar,
                    backgroundColor: star === "2" ? "#445FD2" : "#fff",
                    color: star === "2" ? "#fff" : "rgba(107, 122, 153, 1)",
                  }}
                  onClick={() => setStar("2")}
                >
                  2 star
                </Button>
                <Button
                  contained
                  sx={{
                    ...btnStar,
                    backgroundColor: star === "1" ? "#445FD2" : "#fff",
                    color: star === "1" ? "#fff" : "rgba(107, 122, 153, 1)",
                  }}
                  onClick={() => setStar("1")}
                >
                  1 star
                </Button>
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
                    textTransform: " none",
                    "&:hover": {
                      background: "#445FD2",
                    },
                  }}
                  variant="contained"
                // onClick={AddProduct}
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
