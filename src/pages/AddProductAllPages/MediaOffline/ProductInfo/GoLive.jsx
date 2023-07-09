import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  BottomNavigation,
  Tooltip,
  Fade,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
import InfoIcon from "../../../../assets/InfoIcon.svg";
import RedoIcon from "../../../../assets/Images/CommonImages/RedoIcon.svg";
import help from "../../../../assets/Help.svg";
import UploadtoCloud from "../../../../assets/UploadtoCloud.svg";
import DeleteIcon from "../../../../assets/Images/CommonImages/DeleteIcon.svg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import ToolTip from "../../../../components/ToolTip";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";


export default function MediaGoLive() {
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
  const [selectedOption, setSelectedOption] = useState("Select");
  const [progress, setProgress] = React.useState(0);
  const [storeImages, setStoreImages] = useState();
  const [ListPeriod, setListPeriod] = useState();
  const [FileNameErrorfordimanesion, setFileNameErrorForDimension] = useState();
  const [FileNameErrorForSize, setFileNameErrorForSize] = useState();
  const inputRef = useRef();
  const productId = useParams().id;
  console.log(productId);
  console.log(files);

  useEffect(() => {
    if (files) {
      let NewData = [];
      for (let i = 0; i < files.length; i++) {
        NewData.push(files[i]);
      }
      setStoreImages(NewData);
      console.log(NewData);
    }
  }, [files]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setLOader(true);
    setTimeout(() => {
      setLOader(false);
    }, [5000]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleChangeFiles = (event) => {
    const files = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...files]);
  }

  // send files to the server //
  const handleUpload = () => {
    setFiles(files);
    setLOader(true);
    setTimeout(() => {
      setLOader(false);
    }, [5000]);
  };


  const uploadData = async (event) => {
    event.preventDefault();
    var formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    formData.append("id", productId);
    // ProductUploadStatus: "golive",
    formData.append("ProductUploadStatus", "pendingapproval");
    formData.append("ListingType", "Media");
    let FilarrayForDimension = [];
    let FilearrayforSize = [];

    if (files?.length > 5 && files?.length <= 7) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            if (files[i].size <= Number(1000000)) {
              if (img.width < Number(1070) && img.height < Number(1585)) {
              } else {
                FilarrayForDimension.push(files[i].name);
              }
            } else {
              FilearrayforSize.push(files[i].name);
            }
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(files[i]);
      }
    } else {
      // alert("Please select atleast 6 Product Images");
      return toast.error("Please select atleast 6 Product Images", {
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
    if (Number(ListPeriod) > 365) {
      // alert("Please select the list period less than 365 days");
      return toast.error("Please select the list period less than 365 days", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }  else {
    if (
      FileNameErrorfordimanesion?.length <= 0 &&
      FileNameErrorForSize?.length <= 0
    ) {
      axios({
        method: "post",
        url: "/product/product_mutation",
        data: formData,
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);
          console.log(`${loaded}kb of ${total}kb | ${percent}% `);
        },
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
         navigate("/home/mediaonlineproductpreview/" + id);
       
        })
        .catch((err) => console.log(err));
    } else {
      // alert("Something went wrong");
      return toast.error("Something went wrong", {
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



  return (
    <>
    <form>
      <Box
        sx={{
          maxWidth: "716px",
          height: "100%",
          // minHeight: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
          px: "20px",
          // backgroundColor: "red",
          backgroundColor: "#f3f6f9",
        }}
      >
        <Box
          sx={{
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
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: 12,
              color: "#6B7A99",
              p: "2%",
            }}
          >
            Sample Photos / Video / Audio  <span style={{ color: 'red' }}> *</span>
          </Typography>
          <CustomTooltip
            title={
              <Typography
                sx={ToolTextStyle}
              >{`Qty up to 10 Minimum 4 ( 4 + 1 Video Minimum ) Aspect Ratio 32 : 9 (3840 X 1080) OR 16 : 9 ( 1920 X 1080 )`}</Typography>
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
          sx={{
            border: "2px dashed #445FD2",
            background: "#fff",
            width: "80%",
            maxWidth: "670px",
            p: "4%",
            mx: "auto",
            position: "relative",
            cursor  : "pointer"
          }}
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
            <Box
              sx={{
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                tetxAlign: "center",
              }}
            >
              <Box
                component="img"
                src={UploadtoCloud}
                sx={{
                  position: "absolute",
                  left: "5%",
                  textalign: "center",
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "10px",
                  color: "#6B7A99",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                  },
                  textalign: "center",
                }}
              >
                Drag & Drop upload or{" "}
                <span style={{ color: " #445FD2", fontWeight: 500 }}>
                  browse
                </span>{" "}
                to choose a file
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Mulish",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "8px",
                  color: "#676767",
                  textAlign: "center",
                }}
              >
                Size Limit & Format ( JPEG - 1 MB , PDF - 5 MB , Coral File - 10
                MB )
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", mt: "1%", width: "70%", mx: "auto" }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: {
                  xl: "10px",
                  lg: "10px",
                  md: "10px",
                  sm: "8px",
                  xs: "8px",
                },
                color: "#445FD2",
              }}
            >
              Aspect Ratio 32 : 9 (3840 X 1080 ) OR 16 : 9 ( 1920 X 1080)
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: {
                  xl: "10px",
                  lg: "10px",
                  md: "10px",
                  sm: "8px",
                  xs: "8px",
                },
                color: "#445FD2",
              }}
            >
              Mandatory Photos : Media related photos
            </Typography>
          </Box>
          <input
            type="file"
            multiple
            // onChange={(event) => setFiles(event.target.files)}
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
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "10px",
                color: "#6B7A99",
              }}
            >
              Uploaded
            </Typography>

            {Array?.from(files)?.map((file, idx) => (
              <Box
                sx={{
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
                }}
              >
                <Typography
                  key={idx}
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "10px",
                    color: "#6B7A99",
                  }}
                >
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
                  }}
                />
              </Box>
            ))}
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

        {/* <Box sx={{ width: "90%", mx: "auto", mt: 2 }}>
          <Typography sx={Text}>
            List this product for number of days ( maximum 365 days )
          </Typography>
          <Select
            value={selectedOption}
            onChange={handleChange}
            sx={{
              background: "#fff",
              border: "none",
              color: "rgba(173, 184, 204, 0.59)",
              borderRadius: "9px",
              height: "42px",
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
            }}
          >
            <MenuItem
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
              Select an option
            </MenuItem>
            <MenuItem value="option1" sx={MenuItemTextStyle}>
              30 days
            </MenuItem>
            <MenuItem value="option2" sx={MenuItemTextStyle}>
              100 days
            </MenuItem>
            <MenuItem value="option3" sx={MenuItemTextStyle}>
              365 days
            </MenuItem>
          </Select>
        </Box> */}

        <Box
          sx={{
            width: "100%",
            height: "100%",
            mt: 10,
          }}
        >
          <BottomNavigation
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              bgcolor: "#f3f6f9",
              p: "5px",
              // boxShadow: "0px 10px 20px rgba(220, 220, 220, 0.5)",
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
                fontSize: "14px",
                textTransform: "none",
                display: "flex",
                gap: "10px",
              }}

              onClick={() => {
                setFiles([])
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

const MenuItemTextStyle = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#6B7A99",
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
