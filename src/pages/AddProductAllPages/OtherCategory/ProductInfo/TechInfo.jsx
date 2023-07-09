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
  Grid,
} from "@mui/material";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

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
  const handleAddTag = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  const handleDeleteTag = (tagToDelete) => () => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

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
          // px: "30px",
          p: 3,
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
            gap: " ",
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
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: "100%",
            gap: "10px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              width: "90%",
              maxWidth: "290px",
              borderRadius: "10px",
            }}
          >
            <Typography sx={TypographyStyle}>Warranty</Typography>
            <Box
              sx={{
                width: "auto",
                maxWidth: "500px",
                height: "42px",
                mt: "1%",
                borderRadius: "10px",
              }}
            >
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="Warranty"
                onChange={(e) => {
                  setWarranty(e.target.value);
                }}
                InputProps={{
                  disableUnderline: "true",
                  style: {
                    color: "rgba(68, 95, 210, 1)",
                    fontSize: "14px",
                    padding: "7px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "red",
                  },
                }}
                sx={{
                  width: "70%",
                  height: "100%",
                  background: "#FFFFFF",
                  borderRadius: "10px 0px 0px 10px",
                }}
              />
              <Select sx={GW}>
                <MenuItem sx={MenuItems} value="option1">
                  Year
                </MenuItem>
                <MenuItem sx={MenuItems} value="option2">
                  Month
                </MenuItem>
              </Select>
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              width: "90%",
              maxWidth: "290px",
              borderRadius: "10px",
            }}
          >
            <Typography sx={TypographyStyle}>Guarantee</Typography>
            <Box
              sx={{
                width: "auto",
                maxWidth: "500px",
                height: "42px",
                mt: "1%",
                borderRadius: "10px",
              }}
            >
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="Guarantee"
                onChange={(e) => {
                  setGuarantee(e.target.value);
                }}
                InputProps={{
                  disableUnderline: "true",
                  style: {
                    color: "rgba(68, 95, 210, 1)",
                    fontSize: "14px",
                    padding: "7px",
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "red",
                  },
                }}
                sx={{
                  width: "70%",
                  height: "100%",
                  background: "#FFFFFF",
                  borderRadius: "10px 0px 0px 10px",
                }}
              />
              <Select sx={GW}>
                <MenuItem sx={MenuItems} value="option1">
                  Year
                </MenuItem>
                <MenuItem sx={MenuItems} value="option2">
                  Month
                </MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            // background: "pink",
            gap: "5px",
            py: "30px",
          }}
        >
          <Typography sx={TypographyStyle}>
            Product Packaging Dimensions
          </Typography>
          <Box
            sx={{
              display: "flex",
              // flexDirection: {
              //   xl: "row",
              //   lg: "row",
              //   md: "row",
              //   sm: "column",
              //   xs:" column",
              // },
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
              mt: 1,
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: "10px",
              }}
            >
              <Typography sx={TypographyStyle}>Height</Typography>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "42px",
                  // border: "1px solid black",
                  borderRadius: "10px 0px 0px 10px",
                }}
              >
                <TextField
                  variant="standard"
                  placeholder="Height"
                  InputProps={{
                    disableUnderline: "true",
                    style: {
                      color: "rgba(107, 122, 153)",
                      fontSize: "14px",
                      padding: "7px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "red",
                    },
                  }}
                  sx={{
                    width: "100%",
                    height: "100%",
                    background: "#FFFFFF",
                    maxWidth: "113px",
                    minWidth: "113px",
                    borderRadius: "10px 0px 0px 10px",
                  }}
                  onChange={(e) => {
                    {
                      console.log(e.target.value);

                      setProductDimentions({
                        ...productDimentions,
                        height: e.target.value,
                      });
                    }
                  }}
                ></TextField>
                <Select sx={PD}>
                  <MenuItem sx={MenuItems} value="option1">
                    CM
                  </MenuItem>
                  <MenuItem sx={MenuItems} value="option2">
                    M
                  </MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ display: "grid" }}>
              <Typography sx={TypographyStyle}>Length</Typography>
              <Box
                sx={{
                  width: "auto",
                  maxWidth: "500px",
                  height: "42px",
                  // border: "1px solid black",
                }}
              >
                <TextField
                  variant="standard"
                  placeholder="Length"
                  InputProps={{
                    disableUnderline: "true",
                    style: {
                      color: "rgba(107, 122, 153)",
                      fontSize: "14px",
                      padding: "7px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "red",
                    },
                    maxWidth: "141px",
                    minWidth: "141px",
                  }}
                  sx={{
                    width: "60%",
                    height: "100%",
                    background: "#FFFFFF",
                    maxWidth: "113px",
                    minWidth: "113px",
                    borderRadius: "10px 0px 0px 10px",
                  }}
                  onChange={(e) => {
                    console.log(
                      "here ============================",
                      e.target.value
                    );
                    setProductDimentions({
                      ...productDimentions,
                      length: e.target.value,
                    });
                  }}
                ></TextField>
                <Select sx={PD}>
                  <MenuItem sx={MenuItems} value="option1">
                    CM
                  </MenuItem>
                  <MenuItem sx={MenuItems} value="option2">
                    M
                  </MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ display: "grid" }}>
              <Typography sx={TypographyStyle}>Breadth / Width</Typography>
              <Box
                sx={{
                  width: "auto",
                  maxWidth: "500px",
                  height: "42px",
                  // border: "1px solid black",
                }}
              >
                <TextField
                  variant="standard"
                  placeholder="Breadth"
                  InputProps={{
                    disableUnderline: "true",
                    style: {
                      color: "rgba(107, 122, 153)",
                      fontSize: "14px",
                      padding: "7px",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "red",
                    },
                  }}
                  sx={{
                    width: "60%",
                    height: "100%",
                    background: "#FFFFFF",
                    maxWidth: "113px",
                    minWidth: "113px",
                    borderRadius: "10px 0px 0px 10px",
                  }}
                  onChange={(e) => {
                    console.log(e.target.value);

                    setProductDimentions({
                      ...productDimentions,
                      width: e.target.value,
                    });
                  }}
                ></TextField>
                <Select sx={PD}>
                  <MenuItem sx={MenuItems} value="option1">
                    CM
                  </MenuItem>
                  <MenuItem sx={MenuItems} value="option2">
                    M
                  </MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
          <Typography sx={TypographyStyle}>
            Weight before packing per unit
          </Typography>
          <Box
            sx={{
              width: "auto",
              maxWidth: "710px",
              height: "55px",
              // border: "1px solid black",
            }}
          >
            <TextField
              id="standard-multiline-static"
              variant="standard"
              placeholder="Weight"
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
              sx={{
                width: "80%",
                height: "100%",
                background: "#FFFFFF",
                borderRadius: "10px 0px 0px 10px",
              }}
              onChange={(e) => {
                console.log(e.target.value);

                setProductData({
                  ...productData,
                  weigthbeforepacking: e.target.value,
                });
              }}
            ></TextField>
            <Select sx={packagingunit}>
              <MenuItem sx={MenuItems} value="option1">
                Grams
              </MenuItem>
              <MenuItem sx={MenuItems} value="option2">
                KiloGrams
              </MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
          <Typography sx={TypographyStyle}>
            Weight after packing per unit
          </Typography>
          <Box
            sx={{
              width: "auto",
              maxWidth: "710px",
              height: "55px",
              // border: "1px solid black",
            }}
          >
            <TextField
              id="standard-multiline-static"
              variant="standard"
              placeholder="Weight"
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
              sx={{
                width: "80%",
                height: "100%",
                background: "#FFFFFF",
                borderRadius: "10px 0px 0px 10px",
              }}
              onChange={(e) => {
                console.log(e.target.value);
                setProductData({
                  ...productData,
                  weigthafterpacking: e.target.value,
                });
              }}
            ></TextField>
            <Select sx={packagingunit}>
              <MenuItem sx={MenuItems} value="option1">
                Grams
              </MenuItem>
              <MenuItem sx={MenuItems} value="option2">
                KiloGrams
              </MenuItem>
            </Select>
          </Box>
        </Box>
        <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
          <Typography sx={TypographyStyle}>
            Packaging and delivery Instructions if Any
          </Typography>
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
        <Box sx={{ display: "grid", gap: "10px", py: "20px" }}>
          <Typography sx={TypographyStyle}>
            Instructions to use product
          </Typography>
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
        <Box sx={{ display: "grid", gap: "10px" }}>
          <Typography sx={TypographyStyle}>Tags</Typography>
          <TextField
            sx={{
              width: "100%",
              background: "#FFFFFF",
              borderRadius: "10px",
              height: "31px",
              p: 1,
            }}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                color: "rgba(107, 122, 153)",
                fontSize: "14px",
              },
            }}
            onKeyPress={handleAddTag}
          />
          <Grid container>
            <Grid
              item
              xl={12}
              lg={12}
              md={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "center",
                gap: "10px",
              }}
            >
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={handleDeleteTag(tag)}
                  color="default"
                  sx={{
                    width: "12%",
                    backgroundColor: "#fff",
                    borderRadius: "3px",
                    boxShadow: "0px 4px 4px rgba(229, 229, 229, 0.25)",
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: 10,
                    color: "#6B7A99",
                  }}
                />
              ))}
            </Grid>
          </Grid>
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
    </Box>
  );
}

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
