import {
  BottomNavigation,
  Box,
  Button,
  Fade,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { toast } from "react-toastify";
import { useGetCompanyDetails } from "../../../../Hooks/Auth";
import useGetCompanyTypeData from "../../../../Hooks/CompanyData/useGetCompanyTypeData";
import { useEffectOnce } from "react-use";
import help from "../../../../assets/Help.svg";
import DeleteIcon from "../../../../assets/Images/CommonImages/DeleteIcon.svg";
import UploadtoCloud from "../../../../assets/UploadtoCloud.svg";
import ToolTip from "../../../../components/ToolTip";

export default function TextileGoLive() {
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      componentsProps={{ tooltip: { className: className } }}
    />
  ))(`
          background: #445fd2;
          width:200px;
      `);

  const navigate = useNavigate();
  const id = useParams().id;
  const [loader, setLOader] = useState(false);
  const [files, setFiles] = useState([]);
  const [sizechart, setSizeChart] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Select");
  const [progress, setProgress] = React.useState(0);
  const [storeImages, setStoreImages] = useState();
  const [formError, setFormError] = useState(false);
  const [ListPeriod, setListPeriod] = useState();
  const [ProductData, setProductData] = useState("");
  const [FileNameErrorfordimanesion, setFileNameErrorForDimension] = useState();
  const [FileNameErrorForSize, setFileNameErrorForSize] = useState();

  const { data: CompanyData } = useGetCompanyDetails();
  const { data: CompanyTypeData } = useGetCompanyTypeData(
    CompanyData?.data?.companyType
  );

  const inputRef = useRef();
  const sizechartRef = useRef();
  const productId = useParams().id;

  const FetchProduct = async () => {
    await axios
      .get("product/get_product_byId/" + id)
      .then((response) => {
        setProductData(response?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffectOnce(() => {
    FetchProduct();
  });

  const NaviGateFunction = (id) => {
    if (
      ProductData?.ProductCategoryName === "Textile" ||
      ProductData?.ProductCategoryName === "Office Supply" ||
      ProductData?.ProductCategoryName === "Lifestyle"
    ) {
      navigate("/home/allproductpreview/" + id);
    } else if (ProductData?.ProductCategoryName === "Electronics") {
      navigate("/home/electronicsproductpreview/" + id);
    } else if (ProductData?.ProductCategoryName === "FMCG") {
      navigate("/home/fmcgproductpreview/" + id);
    } else if (ProductData?.ProductCategoryName === "Mobility") {
      navigate("/home/mobilityproductpreview/" + id);
    } else if (ProductData?.ProductCategoryName === "QSR") {
      navigate("/home/RestaurantProductPreview/" + id);
    } else if (ProductData?.ProductCategoryName === "Media") {
      navigate("/home/mediaonlineproductpreview/" + id);
    }
  };

  useEffect(() => {
    if (files) {
      let NewData = [];
      for (let i = 0; i < files.length; i++) {
        NewData.push(files[i]);
      }
      setStoreImages(NewData);
    }
  }, [files]);
  const [showContent, setShowContent] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDropSizechart = (event) => {
    event.preventDefault();
    setSizeChart(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleChangeFiles = (event) => {
    const newFiles = Array.from(event.target.files);
    const duplicateFiles = newFiles.filter((file) =>
      files.some((existingFile) => existingFile.name === file.name)
    );

    if (duplicateFiles.length > 0) {
      return toast.error("Duplicate Files are not allowed", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const uploadData = async (event) => {
    event.preventDefault();
    var formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("id", productId);
    formData.append("sizechart", sizechart);
    formData.append("ProductUploadStatus", "pendingapproval");
    formData.append("listperiod", ListPeriod);
    let FilarrayForDimension = [];
    let FilearrayforSize = [];
    let ReadyToUpload = true;

    if (files?.length >= 6 && files?.length <= 7) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        try {
          const dataUrl = await readFileAsDataURL(file);
          const img = await loadImage(dataUrl);
          let expectedAspectRatio = 16 / 9;

          if (
            ProductData?.ProductCategoryName === "Textile" ||
            ProductData?.ProductCategoryName === "Office Supply" ||
            ProductData?.ProductCategoryName === "Lifestyle" ||
            ProductData?.ProductCategoryName === "Other"
          ) {
            expectedAspectRatio = 9 / 16 || 3 / 4 || 2 / 3;
          } else {
            expectedAspectRatio = 16 / 9 || 4 / 3 || 3 / 2;
          }

          if (file.size <= Number(1000000)) {
            const width = img.width;
            const height = img.height;
            const aspectRatio = width / height;
            if (Math.abs(aspectRatio - expectedAspectRatio) < 0.01) {
              ReadyToUpload = true;
            } else {
              FilarrayForDimension.push(file.name);
            }
          } else {
            FilearrayforSize.push(file.name);
            ReadyToUpload = false;
          }
        } catch (error) {
          ReadyToUpload = false;
        }
      }
    } else {
      // alert("Please select at least 6 Product Images");
      setFormError(true);
      ReadyToUpload = false;
      return toast.error("Please upload at least 6 images", {
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

    setFileNameErrorForDimension(FilarrayForDimension);
    setFileNameErrorForSize(FilearrayforSize);
    var maxDays = Number(ProductData?.GapBetweenDays);

    if ((maxDays && Number(ListPeriod) > maxDays) || Number(ListPeriod) > 365) {
      // alert("Please select the list period less than 365 days");
      return toast.error(
        "Please select the list period less than " +
          (maxDays ? maxDays : "365") +
          " Days",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else if (ListPeriod === "" || ListPeriod === null) {
      // alert("Please select the list period less than 365 days");
      return toast.error("Please Fill the listing Days", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      if (FilarrayForDimension?.length <= 0 && FilearrayforSize?.length <= 0) {
        axios({
          method: "post",
          url: "/product/product_mutation",
          data: formData,
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
          },
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
          .then((res) => {
            navigate("/home/allproductpreview/" + id);
            // NaviGateFunction(id);
          })
          .catch((err) => console.log(err));
      } else {
        ReadyToUpload = false;
        return toast.error("Image dimension or Size issue", {
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
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = src;
    });
  };

  return (
    <>
      <form>
        <Box sx={FirstBoxStyle}>
          <Box sx={FirstBoxChildStyle}>
            <Typography
              sx={{ ...TextStyle, fontSize: "14px", fontWeight: 600 }}
            >
              Go Live
            </Typography>
            <ToolTip
              info={
                "Go Live is the time at which something becomes available to use and purchased by other members on the platform."
              }
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: "20px",
              width: "90%",
            }}
          >
            {" "}
            <Typography sx={{ ...TextStyle, fontSize: "12px" }}>
              Upload Image & Video <span style={{ color: "red" }}> *</span>
            </Typography>
            <CustomTooltip
              title={
                <Typography
                  sx={ToolTextStyle}
                >{`Mandatory Photos : 3 Clear Product Photos with White Background , High Resolution , Close View , Distant View , If on Display / in Use View , Kindly add Size Chart / Dimension Photos Separetly in the Below Link. ( 5 Photos + 1 Video ) Mandatory`}</Typography>
              }
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 400 }}
            >
              <img
                src={help}
                style={{
                  cursor: "pointer",
                }}
              />
            </CustomTooltip>
          </Box>
          <Box
            onClick={() => inputRef.current.click()}
            sx={{ ...ImageSelectBoxStyle, cursor: "pointer" }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Box
              sx={{
                display: "grid",
                width: "60%",
                mx: " auto",
              }}
            >
              <Box sx={DisplayGridStyle}>
                <Box component="img" src={UploadtoCloud} sx={ImageBox} />
                <Typography
                  sx={{
                    ...TextStyle,
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#445FD2",
                    },
                    textalign: "center",
                  }}
                >
                  Drag & Drop upload or{" "}
                  <span style={{ color: "#445FD2", fontWeight: 500 }}>
                    {"  "}
                    browse{"  "}
                  </span>{" "}
                  to choose a file
                </Typography>
                <Typography sx={MulishFontTextStyle}>
                  Size Limit & Format ( JPEG , PNG - 1 MB , PDF - 5 MB , GIF ,
                  MP4 - 5 MB )
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: "center", mt: "1%" }}>
              <Typography sx={TextStyle}>
                Aspect Ratio 3 : 4 (1070 X 1585 )
              </Typography>
              <Typography
                sx={{
                  ...TextStyle,
                  color: "#445FD2",
                }}
              >
                Mandatory Photos : Front View, Back View, Close Fabric View,
                Model Wearing View
              </Typography>
            </Box>
            <input
              type="file"
              multiple
              onChange={handleChangeFiles}
              hidden
              accept=".png,.pdf,.mp4,.jpeg,.gif"
              ref={inputRef}
            />
          </Box>
          {files ? (
            <Box
              sx={{
                width: "90%",
                my: "2%",
              }}
            >
              <Typography sx={TextStyle}>Uploaded</Typography>

              {Array?.from(files)?.map((file, idx) => {
                const hasDimensionError = FileNameErrorfordimanesion?.includes(
                  file.name
                );

                const hasSizeError = FileNameErrorForSize?.includes(file.name);

                return (
                  <Box
                    key={idx}
                    sx={{
                      bgcolor: "white",
                    }}
                  >
                    <Box sx={ImageMapBox}>
                      <Typography key={idx} sx={TextStyle}>
                        {file?.name}
                      </Typography>
                      <Box
                        component="img"
                        src={DeleteIcon}
                        sx={{
                          height: "20px",
                          width: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const newFiles = Array.from(files);
                          newFiles.splice(idx, 1);
                          setFiles(newFiles);
                          // Remove the image from error arrays if it exists
                          setFileNameErrorForDimension((prevErrors) =>
                            prevErrors?.filter((error) => error !== file.name)
                          );
                          setFileNameErrorForSize((prevErrors) =>
                            prevErrors?.filter((error) => error !== file.name)
                          );
                        }}
                      />
                    </Box>
                    {
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          gap: "7px",
                        }}
                      >
                        {FileNameErrorfordimanesion?.includes(file.name) && (
                          <Typography sx={{ color: "black" }}>
                            Dimension Issue:{" "}
                            <span style={{ color: "red" }}>{file.name}</span>
                          </Typography>
                        )}

                        {FileNameErrorForSize?.includes(file.name) && (
                          <Typography sx={{ color: "black" }}>
                            Size Issue:{" "}
                            <span style={{ color: "red" }}>{file.name}</span>
                          </Typography>
                        )}
                      </Box>
                    }
                  </Box>
                );
              })}
            </Box>
          ) : (
            " "
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: "20px",
              width: "90%",
            }}
          >
            {" "}
            <Typography sx={{ ...TextStyle, fontSize: "12px" }}>
              Upload Size chart, Price Tags-separately here
            </Typography>
            <CustomTooltip
              title={
                <Typography
                  sx={ToolTextStyle}
                >{`Important Picture : ( Size Chart / Dimensions/ Certificate / Technical Information ) Add Here +`}</Typography>
              }
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 400 }}
            >
              <img
                src={help}
                style={{
                  cursor: "pointer",
                }}
              />
            </CustomTooltip>
          </Box>
          <Box
            onClick={() => sizechartRef?.current?.click()}
            sx={{ ...SizeChartBox, cursor: "pointer" }}
            onDragOver={handleDragOver}
            onDrop={handleDropSizechart}
          >
            <Box
              sx={{
                display: "grid",
                width: "60%",
                mx: " auto",
              }}
            >
              <Box sx={DisplayGridStyle}>
                <Box
                  component="img"
                  src={UploadtoCloud}
                  sx={{
                    position: "absolute",
                    left: "5%",
                    textalign: "center",
                  }}
                />
                <Typography sx={TextStyle}>
                  Drag & Drop upload or{" "}
                  <span style={{ color: "#445FD2", fontWeight: 500 }}>
                    {" "}
                    browse{" "}
                  </span>{" "}
                  to choose a file
                </Typography>
                <Typography sx={MulishFontTextStyle}>
                  Supported format : PDF - 5 MB
                </Typography>
                <Typography sx={MulishFontTextStyle}>
                  Size Limit : 10 MB
                </Typography>
              </Box>
            </Box>

            <input
              type="file"
              // multiple
              onChange={(event) => setSizeChart(event.target.files[0])}
              hidden
              accept=".png,.pdf,.mp4,.jpeg,.gif"
              ref={sizechartRef}
            />
          </Box>
          {sizechart ? (
            <Box
              sx={{
                width: "90%",
                my: "2%",
              }}
            >
              <Typography sx={TextStyle}>Uploaded</Typography>
              <Box sx={SizeChartBoxStyle}>
                <Typography sx={TextStyle}>{sizechart?.name}</Typography>
                <Box
                  component="img"
                  src={DeleteIcon}
                  sx={{
                    height: "20px",
                    width: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSizeChart(null);
                  }}
                />
              </Box>
            </Box>
          ) : (
            " "
          )}

          {loader ? (
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                backgroundColor: "transparent",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#445FD2",
                },
              }}
            />
          ) : null}

          <Box sx={{ width: "90%", mx: "auto", mt: 2 }}>
            <Typography sx={Text}>
              {" "}
              List this product for number of days ( maximum 365 days ){" "}
              <span style={{ color: "red" }}> *</span>
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "42px",
                mt: "1%",
                borderRadius: "10px",
              }}
            >
              <TextField
                id="standard-basic"
                variant="standard"
                placeholder="70"
                InputProps={{
                  disableUnderline: "true",
                  style: {
                    color: "#445FD2",
                    fontSize: "14px",
                    padding: "7px",
                  },
                  inputProps: {
                    maxLength: 3, // Limit input length to 3 characters
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: "red",
                  },
                }}
                onChange={(e) => {
                  const inputValue = e.target.value;

                  if (inputValue.match(/\D/g)) {
                    const filteredValue = inputValue.replace(/\D/g, "");
                    e.target.value = filteredValue;
                  }
                  console.log("filteredValue", e.target.value);
                  setListPeriod(e.target.value);
                }}
                sx={{
                  width: "80%",
                  height: "100%",
                  background: "#FFFFFF",
                  borderRadius: "10px 0px 0px 10px",
                }}
                onKeyDown={(e) => {
                  if (e.key === " " && e.target.selectionStart === 0) {
                    e.preventDefault();
                  }
                }}
              />

              <Select sx={GW} defaultValue={"Days"}>
                <MenuItem sx={MenuItems} value="Days">
                  Days
                </MenuItem>
              </Select>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              mx: "auto",
              height: "100%",
              bgcolor: "transparent",
              marginBottom: "21px",
            }}
          >
            <BottomNavigation
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                bgcolor: "transparent",
                p: "10px",
              }}
              showLabels
            >
              {/* <Button sx={{...ResetToDefaultTextStyle , textTransform : "none"}}
          
              
              onClick={() => {
                setFiles([])
                setSizeChart(null)
                setListPeriod("")
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
                  sx={CancelButtonStyle}
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
                  sx={GoLiveButton}
                  variant="contained"
                  onClick={uploadData}
                >
                  Go Live
                </Button>
              </Box>
            </BottomNavigation>
          </Box>
        </Box>
      </form>
    </>
  );
}

const FirstBoxStyle = {
  maxWidth: "716px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
  px: "20px",
  backgroundColor: "#f3f6f9",
};

const FirstBoxChildStyle = {
  width: "100%",
  mx: "auto",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "10px",
  py: "10px",
};

const TextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10px",
  textTransform: "none",
  color: "#6B7A99",
};

const ImageBox = {
  display: "flex",
  justifyContent: "center",
  position: "absolute",
  left: "5%",
  textalign: "center",
};

const ImageMapBox = {
  background: "#fff",
  border: "1px solid green",
  borderRadius: "9px",
  height: "42px",
  width: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  my: "10px",
  px: "8px",
};

const SizeChartBox = {
  border: "2px dashed #445FD2",
  background: "#fff",
  width: "80%",
  maxWidth: "670px",
  p: "4%",
  mx: "auto",
  position: "relative",
};

const DisplayGridStyle = {
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
  tetxAlign: "center",
};

const MulishFontTextStyle = {
  fontFamily: "Mulish",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "8px",
  color: "#676767",
  textAlign: "center",
};
const ImageSelectBoxStyle = {
  border: "2px dashed #445FD2",
  background: "#fff",
  width: "80%",
  maxWidth: "670px",
  p: "4%",
  mx: "auto",
  position: "relative",
};
const Text = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 12,
  ml: "2%",
  mb: "1%",
  pt: "2%",
  // py: 1,
  color: "#6B7A99",
};

const CancelButtonStyle = {
  width: "100%",
  height: "32px",
  borderRadius: "10px",
  background: "#fff",
  color: "#636161",
  fontSize: "14px",
  textTransform: "none",
  fontSize: "14px",
  textTransform: "none",
  "&:hover": {
    background: "#FAFBFD",
    color: "#000",
  },
};

const GoLiveButton = {
  width: "100%",
  height: "32px",
  borderRadius: "10px",
  background: "#445FD2",
  fontSize: "14px",
  textTransform: "none",
  "&:hover": {
    background: "#445FD2",
  },
};

const ResetToDefaultTextStyle = {
  marginRight: "auto",
  p: "2%",
  fontFamily: "Poppins",
  fontStyle: "normal",
  color: "#6B7A99",
  fontSize: 14,
  display: "flex",
  gap: "10px",
};
const SizeChartBoxStyle = {
  background: "#fff",
  border: "1px solid green",
  borderRadius: "9px",
  height: "42px",
  width: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  my: "10px",
  px: "8px",
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
  fontSize: "14px",
  lineHeight: "21px",
  color: "#6B7A99",
};

const MenuItems = {
  fontSize: "12px",
  color: "#6B7A99",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
};
const GW = {
  width: "20%",
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

const ToolTextStyle = {
  fontFamily: "Outfit",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "10px",
  lineHeight: "13px",
  color: "#fff",
  textAlign: "center",
  cursor: "pointer",
};
