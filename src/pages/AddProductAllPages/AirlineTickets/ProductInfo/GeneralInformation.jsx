import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import { CircularProgress, TextField } from "@mui/material";
import { Select, MenuItem, BottomNavigation, Button } from "@mui/material";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import { usePostProductQuery } from "./ProductHooksQuery";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function GeneralInformation() {
  const [SubCategory, setSubCategory] = useState("");
  const [ProductName, setProductName] = useState("");
  const [ProductSubtitle, setProductSubtitle] = useState("");
  const [ProductDescription, setProductDescription] = useState("");
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = usePostProductQuery();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        // gst: z.string().length(15),
        subcategory: z.string().min(1),
        productname: z.string().max(50).min(3),
        productsubtitle: z.string().max(150).min(4),
        productdescription: z.string().max(350).min(10),
      })
    ),
  });

  const AddProduct = handleSubmit((data) => {
    mutateAsync(
      {
        ProductName: ProductName,
        ProductSubtitle,
        ProductDescription,
        ProductType: SubCategory,
      },
      {
        onSuccess: (response) => {
          navigate("/home/textile/texttileproductInfo/" + response.data._id);
        },
        onError: (error) => {},
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
          <Box>
            <Typography sx={CommonTextStyle}>Airline Name</Typography>
            <TextField
              focused
              placeholder="Lorem Ipsum ( 8 keywords max ) "
              multiline
              variant="standard"
              sx={TextFieldStyle}
              InputProps={InputPropsStyle}
              {...register("productname")}
              onChange={(e) => setProductName(e.target.value)}
            />
            <Typography sx={ErrorStyle}>
              {errors["productname"]?.message}
            </Typography>
          </Box>
          <Box>
            <Typography sx={CommonTextStyle}> Subtittle </Typography>
            <TextField
              focused
              placeholder="Lorem Ipsum ( 8 keywords max )"
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
            <Typography sx={CommonTextStyle}> Description</Typography>
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
                type="submit"
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
