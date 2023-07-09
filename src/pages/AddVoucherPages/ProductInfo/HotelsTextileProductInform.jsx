import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  Typography,
  Select,
  MenuItem,
  Button,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
// import { useUpdateProductQuery } from "./ProductHooksQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { styled } from "@mui/material/styles";
import { Form } from "react-hook-form";
import Bxitoken from "../../../assets/Images/CommonImages/BXIToken.svg";

export default function HotelsTextileProductInform(props) {
  console.log("propsHere =====>", props);
  const [storehsn, setStorehsn] = useState();

  const ProductId = useParams().id;
  const navigate = useNavigate();
  console.log("ProductId", ProductId);

  const [sampleAvailability, setSampleAvailability] = useState();

  // const [minOrder, setMinOrder] = useState();
  const [showContent, setShowContent] = useState(false);

  const handleCheckboxChange = (event) => {
    setShowContent(event.target.checked);
  };

  return (
    <Box
      sx={{
        my: 3,
        border: "1px solid #E3E3E3",
        borderRadius: "10px",
        height: "auto",
        minHeight: "100px",
        position: "relative",
        display: "flex",
        flexWrap: "wrap",
        // justifyContent: "space-between",
        flexDirection: "row",
        gap: "10px",
        px: 2,
        py: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        {/* {errors?.ProductColor?.message} */}
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}></Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}>Room Type</Typography>
        <Input
          disableUnderline
          // value={data.size}

          sx={{
            width: "139px",
            height: "42px",
            background: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#445FD2",
            px: 1,
          }}
        />
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}></Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}>Price per Unit</Typography>
        <Box sx={{ position: "relative" }}>
          <Input
            disableUnderline
            // value={data.mro}

            sx={{
              width: "139px",
              height: "42px",
              background: "#FFFFFF",
              borderRadius: "10px",
              fontSize: "12px",
              px: 1,
              color: "#445FD2",
            }}
          />

          <img
            src={Bxitoken}
            style={{
              position: "absolute",
              width: "20px",
              right: "7%",
              bottom: "20%",
            }}
            alt="bxiToken"
          />
        </Box>
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}></Typography>
      </Box>

      {props?.HSNData && props?.HSNData > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: 1,
              maxWidth: "140px",
            }}
          >
            <Typography sx={CommonTextStyle}>HSN</Typography>

            <Box sx={{ position: "relative" }}>
              <Select
                disableUnderline
                required={true}
                style={{
                  width: "100px",
                  height: "42px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  px: 1,
                  fontSize: "12px",
                  color: "#445FD2",
                }}
              >
                {!props?.HSNData ||
                props?.HSNData === undefined ||
                props?.HSNData === ""
                  ? null
                  : props?.HSNData?.map((item, index) => {
                      return (
                        <MenuItem
                          style={{
                            width: "50px",
                            height: "42px",
                            background: "#FFFFFF",
                            borderRadius: "10px",
                            px: 1,
                            fontSize: "12px",
                            color: "#445FD2",
                          }}
                          value={item.HSN}
                        >
                          <Typography
                            sx={{
                              color: "#445FD2",
                            }}
                          >
                            {item.HSN}
                          </Typography>
                        </MenuItem>
                      );
                    })}
              </Select>
            </Box>
            <Typography
              sx={{ color: "red", fontFamily: "Poppins" }}
            ></Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: 1,
              maxWidth: "140px",
            }}
          >
            <Typography sx={CommonTextStyle}>GST</Typography>

            <Box sx={{ position: "relative" }}>
              {storehsn === null || storehsn === undefined ? (
                <Input
                  disableUnderline
                  disabled={true}
                  required={true}
                  // value={item.GST}
                  // defaultValue={"0%"}
                  placeholder="GST"
                  sx={{
                    width: "70px",
                    height: "42px",
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    px: 1,
                    fontSize: "12px",
                    color: "#445FD2",
                  }}
                  InputProps={{
                    style: {
                      color: "#445FD2",
                    },
                  }}
                />
              ) : !props?.HSNData ||
                props?.HSNData === undefined ||
                props?.HSNData === "" ? null : (
                props?.HSNData?.filter((item) => {
                  return item.HSN === storehsn;
                })?.map((item, index) => {
                  return (
                    <Input
                      disableUnderline
                      disabled={true}
                      required={true}
                      value={item.GST}
                      sx={{
                        width: "70px",
                        height: "42px",
                        background: "#FFFFFF",
                        borderRadius: "10px",
                        px: 1,
                        fontSize: "12px",
                        color: "#445FD2",
                      }}
                    />
                  );
                })
              )}

              <Typography
                sx={{
                  position: "absolute",
                  right: "10%",
                  bottom: "20%",
                  color: "#979797",
                  fontSize: "15px",
                }}
              >
                %
              </Typography>
            </Box>
            <Typography
              sx={{ color: "red", fontFamily: "Poppins" }}
            ></Typography>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: 1,
              maxWidth: "140px",
            }}
          >
            <Typography sx={CommonTextStyle}>HSN</Typography>

            <Box sx={{ position: "relative" }}>
              <Input
                disableUnderline
                required={true}
                sx={{
                  width: "70px",
                  height: "42px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  px: 1,
                  fontSize: "12px",
                  color: "#445FD2",
                }}
              />
            </Box>
            <Typography
              sx={{ color: "red", fontFamily: "Poppins" }}
            ></Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              mt: 1,
              maxWidth: "140px",
            }}
          >
            <Typography sx={CommonTextStyle}>GST</Typography>

            <Box sx={{ position: "relative" }}>
              <Input
                disableUnderline
                required={true}
                sx={{
                  width: "70px",
                  height: "42px",
                  background: "#FFFFFF",
                  borderRadius: "10px",
                  px: 1,
                  fontSize: "12px",
                  color: "#445FD2",
                }}
              />

              <Typography
                sx={{
                  position: "absolute",
                  right: "10%",
                  bottom: "20%",
                  color: "#979797",
                  fontSize: "15px",
                }}
              >
                %
              </Typography>
            </Box>
            <Typography
              sx={{ color: "red", fontFamily: "Poppins" }}
            ></Typography>
          </Box>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}>Validity of Voucher</Typography>

        <Box
          sx={{
            width: "100%",
            // maxWidth: "1000px",
            height: "42px",
            mt: "1%",
            borderRadius: "10px",
          }}
        >
          <Input
            // value={data.size}
            id="standard-basic"
            variant="standard"
            disableUnderline
            placeholder="validity"
            InputProps={{
              disableUnderline: "true",
              style: {
                color: "#445FD2",
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
              width: "45%",
              height: "100%",
              background: "#FFFFFF",
              borderRadius: "10px 0px 0px 10px",
            }}
          />

          <Select sx={GW} defaultValue={"in"}>
            <MenuItem sx={MenuItems} value="days">
              days
            </MenuItem>
            <MenuItem sx={MenuItems} value="months">
              months
            </MenuItem>
            <MenuItem sx={MenuItems} value="years">
              years
            </MenuItem>
          </Select>
        </Box>

        <Typography sx={{ color: "red", fontFamily: "Poppins" }}></Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}>Min order Quantity</Typography>

        <Input
          disableUnderline
          // value={data.minimum}

          sx={{
            width: "139px",
            height: "42px",
            background: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#445FD2",
            px: 1,
          }}
        />
        <Typography sx={{ color: "red", fontFamily: "Poppins" }}></Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mt: 1,
          maxWidth: "140px",
        }}
      >
        <Typography sx={CommonTextStyle}> Max order Quantity</Typography>

        <Input
          disableUnderline
          // value={data.maximum}

          sx={{
            width: "139px",
            height: "42px",
            background: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "12px",
            color: "#445FD2",
            px: 1,
          }}
        />

        <Typography sx={{ color: "red", fontFamily: "Poppins" }}></Typography>
      </Box>
      {/* </Grid>
      </Grid> */}
      <Box
        sx={{
          p: 1,
          mt: 2,
          width: "100%",
        }}
      >
        <Button
        // onClick={handleAdd}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}

const CommonTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "21px",
  color: "#6B7A99",
};
const GW = {
  width: "55%",
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
const MenuItems = {
  fontSize: "12px",
  color: "#6B7A99",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
};
