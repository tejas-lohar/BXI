import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import { CircularProgress, TextField, ThemeProvider } from "@mui/material";
import { Select, MenuItem, BottomNavigation, Button } from "@mui/material";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import { usePostProductQuery } from "./ProductHooksQuery";
import { useNavigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import ProductAddTheme from "../../../../components/GlobalStyle/MaterialUiGlobalStyle";
import UnisexIcon from "../../../../assets/Images/CommonImages/UserUnisex.svg";
import UnisexIconColor from "../../../../assets/Images/CommonImages/UserUnisexColor.svg";
import OtherIcon from "../../../../assets/Images/CommonImages/UserOther.svg";
import OtherIconColor from "../../../../assets/Images/CommonImages/UserOther2.svg";
import FemaleIcon from "../../../../assets/Images/CommonImages/UserFemale.svg";
import FemaleIconColor from "../../../../assets/Images/CommonImages/UserFemaleColor.svg";
import MaleIcon from "../../../../assets/Images/CommonImages/UserMale.svg";
import MaleIconColor from "../../../../assets/Images/CommonImages/UserMaleColor.svg";
import KidsIcon from "../../../../assets/Images/CommonImages/UserBaby.svg";
import KidsIconColor from "../../../../assets/Images/CommonImages/UserBabyColor.svg";

export default function TextilesGeneralInfo() {
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [ProductName, setProductName] = useState("");
  const [ProductSubtitle, setProductSubtitle] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const [hoveredBox, setHoveredBox] = useState(null);
  const [activeBox, setActiveBox] = useState(null);
  const [gender, setGender] = useState('Male');

  const handleBoxClick = (index) => {
    setActiveBox(index);
    setHoveredBox(null);
  };

  const handleBoxHover = (index) => {
    setHoveredBox(index);
  };

  const handleBoxLeave = () => {
    setHoveredBox(null);
  };

  const { mutateAsync, isLoading } = usePostProductQuery();

  // const getAllCetegory = async () => {
  //   await axios
  //     .get("hotelsub/Get_hotel_subcategory", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setHotels(res.data);
  //     });
  // };

  // useEffect(() => {
  //   getAllCetegory();
  // }, []);

  const genderDetails = [
    { gender: "Male", icon: MaleIcon, hoverIcon: MaleIconColor },
    { gender: "Female", icon: FemaleIcon, hoverIcon: FemaleIconColor },
    { gender: "Kids", icon: KidsIcon, hoverIcon: KidsIconColor },
    { gender: "Unisex", icon: UnisexIcon, hoverIcon: UnisexIconColor },
    { gender: "Other", icon: OtherIcon, hoverIcon: OtherIconColor },
  ];

  const schema = z.object({
    category: z
      .string()
      .nonempty("This field is required")
      .min(1, "Please select a category"),
    productname: z
      .string()
      .nonempty("This field is required")
      .min(3, "Product name should be at least 3 characters long")
      .max(8, "Product name should be at most 8 characters long"),
    productsubtitle: z
      .string()
      .nonempty("This field is required")
      .min(5, "Product subtitle should be at least 5 characters long")
      .max(24, "Product subtitle should be at most 24 characters long"),
    productdescription: z
      .string()
      .nonempty("This field is required")
      .min(10, "Product subtitle should be at least 10 characters long")
      .max(50, "Product subtitle should be at most 50 characters long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const AddProduct = handleSubmit((data) => {
    try {
      mutateAsync(
        {
          ProductGender: gender.trim(),
          ProductSubCategory: data.category.trim(),
          ProductDescription: data.productdescription.trim(),
          ProductName: data.productname.trim(),
          ProductSubtittle: data.productsubtitle.trim(),
        },
        {
          onSuccess: (response) => {
            if (response?.data._id) {
              navigate(
                "/home/textiles/textilesproductinfo/" + response?.data._id
              );
            } else {
              alert("Somethings has gone wrong");
            }
          },
          onError: (error) => {},
        }
      );
    } catch (error) {
      console.log(error);
      
    }
    
  });

  const textiles =[
    {category:'Men'},
    {category:'Gents'},
    {category:'Ladies'},
    {category:'Kids'},
    {category:'Boys'},
    {category:'Girls'},
  ]
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
          <Box
            component="img"
            src={InfoIcon}
            sx={{ width: "18px", height: "auto", cursor: "pointer" }}
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
          <Typography sx={CommonTextStyle}>Gender</Typography>
          <Box
            sx={{
              flexDirection: "row",
              width: "100%",
              mx: "auto",
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            {genderDetails.map((box, index) => (
              <Box
                key={index}
                sx={{
                  width: "97px",
                  height: "78.01px",
                  background: "#FFFFFF",
                  transition: "border-color 0.3s, color 0.3s",
                  border:
                    index === activeBox
                      ? "2px solid #445FD2"
                      : index === hoveredBox
                      ? "2px solid #445FD2"
                      : "1px solid #D9D9D9",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  cursor: "pointer",
                  ...(box.gender === gender && {
                    border: "2px solid #445FD2",
                  }),
                }}
                {...register("gender")}
                onMouseEnter={() => handleBoxHover(index)}
                onMouseLeave={handleBoxLeave}
                onClick={() => {
                  setGender(box.gender);
                  handleBoxClick(index);
                }}
              >
                <Box sx={{}}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontStyle: "normal",
                      fontWeight: 500,
                      fontSize: "10px",
                      lineHeight: "15px",
                      color:
                        index === activeBox || index === hoveredBox
                          ? "#445FD2"
                          : "#ADB8CC",
                      marginBottom: "5px",
                      ...(box.gender === gender && {
                        color: "#445FD2",
                      }),
                    }}
                  >
                    {box.gender}
                  </Typography>
                  <img
                    style={{
                      width: "23px",
                      height: "22.15px",
                      marginTop: "5px",
                    }}
                    // src={box.icon}
                    src={
                      index === activeBox || index === hoveredBox
                        ? box.hoverIcon
                        : box.icon
                    }
                    alt={`${box.gender} Icon`}
                  />
                </Box>
              </Box>
            ))}
          </Box>
            <Typography sx={ErrorStyle}>
              {errors["gender"]?.message}
            </Typography>

          <Box
            sx={{
              width: "100%",
              background: "transparent",
            }}
          >
            <Typography sx={CommonTextStyle}>Category</Typography>

            <Select
              {...register("category")}
              onChange={(e) => setCategory(e.target.value)}
              sx={{
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
                  fontSize: "2rem",
                },
              }}
            >
              {textiles &&
                textiles?.length > 0 &&
                textiles?.map((el, idx) => {
                  return (
                    <MenuItem key={idx} value={el?.category} sx={CommonTextStyle}>
                      <Typography sx={{ color: "black" }}>
                        {el.category}
                      </Typography>
                    </MenuItem>
                  );
                })}
            </Select>
            <Typography sx={ErrorStyle}>
              {errors["category"]?.message}
            </Typography>
          </Box>

          <Box>
            <Typography sx={CommonTextStyle}>Product Name</Typography>
            <ThemeProvider theme={ProductAddTheme}>
              <TextField
                focused
                placeholder="Lorem Ipsum ( 8 keywords max )"
                multiline
                variant="standard"
                InputProps={InputPropsStyle}
                sx={TextFieldStyle}
                {...register("productname")}
                onChange={(e) => setProductName(e.target.value)}
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
              placeholder="Lorem Ipsum ( 24 keywords max )  "
              multiline
              variant="standard"
              sx={TextFieldStyle}
              InputProps={InputPropsStyle}
              {...register("productsubtitle")}
              onChange={(e) => setProductSubtitle(e.target.value)}
            />
            <Typography sx={ErrorStyle}>
              {errors["productsubtitle"]?.message}
            </Typography>
          </Box>
          <Box>
            <Typography sx={CommonTextStyle}>Product Description</Typography>
            <TextField
              focused
              placeholder="Lorem Ipsum ( 50 keywords max ) "
              multiline
              variant="standard"
              sx={{ ...TextFieldStyle, height: "100%" }}
              minRows={3}
              InputProps={InputPropsStyle}
              {...register("productdescription")}
              onChange={(e) => setProductDescription(e.target.value)}
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
                type="submit"
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
                // onClick={AddProduct}
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
