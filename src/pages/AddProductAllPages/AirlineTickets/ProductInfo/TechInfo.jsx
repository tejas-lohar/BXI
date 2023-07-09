import {
  Box,
  // Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  Chip,
  Button,
  BottomNavigation,
} from "@mui/material";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
export default function TechInfo() {
  const ProductId = useParams().id;
  const navigate = useNavigate();

  const [guarantee, setGuarantee] = useState("");
  const [warranty, setWarranty] = useState("");
  const [productDimentions, setProductDimentions] = useState({
    height: "",
    length: "",
    width: "",
  });
  const [productData, setProductData] = useState({
    weigthbeforepacking: "",
    weigthafterpacking: "",
    packaginganddeliveryinstructions: "",
    instructionstouseproduct: "",
  });

  const [tags, setTags] = useState([]);
  const pointList = [
    {
      textName: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      textName: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      textName: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
      textName: "Lorem ipsum dolor sit amet consectetur.",
    },
  ];

  const {
    mutate: updateProduct,
    isLoading,
    isError,
    data: recievedproductData,
    reset,
    error: RegisterError,
  } = useUpdateProductQuery();
  const AddProduct = async () => {
    const ProductUpdatedata = {
      id: ProductId,
      tags,
      guarantee,
      warranty,
      productDimentions,
      productData,
    };
    updateProduct(ProductUpdatedata, {
      onSuccess: (response) => {
        // if (response.data.satus === 200) {
        navigate(`/home/myproduct/golive/${ProductId}`);
        // }
        console.log("response", response);
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };
  return (
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
          background: "#f3f6f9",
          overflow: "scroll",
          boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
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
            py: "10px",
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
            Technical Information
          </Typography>
          <Box
            component="img"
            src={InfoIcon}
            sx={{ width: "28px", height: "auto", cursor: "pointer" }}
          />
        </Box>
        <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
          <Typography sx={TypographyStyle}>Inclusions</Typography>
          <Box
            sx={{
              width: "auto",
              maxWidth: "710px",
              height: "100px",
              // border: "1px solid black",
            }}
          >
            <TextField
              id="standard-multiline-static"
              multiline
              rows={4}
              variant="standard"
              placeholder="Lorem Ipsum ....."
              InputProps={{
                disableUnderline: "true",
                style: {
                  color: "rgba(107, 122, 153)",
                  fontSize: "14px",
                  padding: "10px",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "red",
                },
              }}
              onChange={(e) => {
                console.log(e.target.value);
                setProductData({
                  ...productData,
                  packaginganddeliveryinstructions: e.target.value,
                });
              }}
              sx={textfieldstyle}
            />
          </Box>
        </Box>
        <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
          <Typography sx={TypographyStyle}>Exclusions</Typography>
          <TextField
            id="standard-multiline-static"
            multiline
            rows={4}
            variant="standard"
            placeholder="Lorem Ipsum ....."
            InputProps={{
              disableUnderline: "true",
              style: {
                color: "rgba(107, 122, 153)",
                fontSize: "14px",
                padding: "10px",
              },
            }}
            InputLabelProps={{
              style: {
                color: "red",
              },
            }}
            onChange={(e) => {
              console.log(e.target.value);
              setProductData({
                ...productData,
                instructionstouseproduct: e.target.value,
              });
            }}
            sx={textfieldstyle}
          />
        </Box>
        <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
          <Typography sx={TypographyStyle}>Terms & Conditions</Typography>
          <TextField
            id="standard-multiline-static"
            multiline
            rows={4}
            variant="standard"
            placeholder="Lorem Ipsum ....."
            InputProps={{
              disableUnderline: "true",
              style: {
                color: "rgba(107, 122, 153)",
                fontSize: "14px",
                padding: "10px",
              },
            }}
            InputLabelProps={{
              style: {
                color: "red",
              },
            }}
            onChange={(e) => {
              console.log(e.target.value);
              setProductData({
                ...productData,
                instructionstouseproduct: e.target.value,
              });
            }}
            sx={textfieldstyle}
          />
        </Box>
        <Box>
          <Typography sx={TypographyStyle}>Redemption Steps</Typography>
          <Box
            sx={{
              mt: 1,
              background: "#fff",
              width: "95%",
              height: "auto",
              mx: "auto",
              borderRadius: "7px",
              p: 2,
            }}
          >
            {pointList?.map((el, idx) => {
              return (
                <>
                  <Box sx={{ display: "flex", gap: "5px" }}>
                    <GoPrimitiveDot
                      style={{ marginTop: "4px", color: "#445FD2" }}
                    />
                    <Typography sx={textList}>{el.textName}</Typography>
                  </Box>
                </>
              );
            })}
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
            bgcolor: "#f3f6f9",
            p: "10px",
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
              onClick={AddProduct}
            >
              Next
            </Button>
          </Box>
        </BottomNavigation>
      </Box>
    </Box>
  );
}
const textList = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 12,
  color: "#445FD2",
};

const textfieldstyle = {
  width: "100%",
  height: "100px",
  background: "#FFFFFF",
  borderRadius: "10px",
  color: "red",
  fontSize: "14px",
};

const MenuItems = {
  fontSize: "12px",
  color: "#6B7A99",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
};

const TypographyStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  color: "#6B7A99",
};

const packagingunit = {
  width: "20%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  height: "100%",
  background: "#FFFFFF",
  color: "#6B7A99",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  borderRadius: "0px 10px 10px 0px",
};

const GW = {
  width: "30%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  background: "#FFFFFF",
  height: "100%",
  color: "#6B7A99",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  borderRadius: "0px 10px 10px 0px",
};

const PD = {
  width: "40%",
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  background: "#FFFFFF",
  height: "100%",
  maxWidth: "75px",
  minWidth: "75px",
  color: "#6B7A99",
  fontSize: "12px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  borderRadius: "0px 10px 10px 0px",
};
