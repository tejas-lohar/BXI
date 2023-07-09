import React from "react";
import { Typography, Box, TextField, Paper, Grid } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useRef } from "react";
import UploadtoCloud from "../../../../assets/UploadtoCloud.svg";

export default function TechnicalInfo() {
  const [files, setFiles] = useState(null);

  const inputRef = useRef();

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
  };

  const handleUpload = () => {
    setFiles(files);
  };

  //radiobutton

  const [selectedValue, setSelectedValue] = useState("");

  const handleChangeone = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Paper elevation={0} sx={{ background: "transparent" }}>
      <Box sx={{ margin: "10px" }}>
        <Grid container>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box
              sx={{
                justifyContent: "flex-start",
              }}
            >
              <Typography sx={headercss}>Inclusions</Typography>

              <Typography sx={text}>Terms & Conditions </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{ marginTop: "3rem" }}
          >
            <Box
              sx={{
                justifyContent: "flex-start",
              }}
            >
              <Typography sx={headercss}>Exclusions </Typography>

              <Typography sx={text}>Terms & Conditions </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{ marginTop: "3rem" }}
          >
            <Box
              sx={{
                justifyContent: "flex-start",
              }}
            >
              <Typography sx={headercss}>Terms & Conditions</Typography>

              <Typography sx={text}>Terms & Conditions </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            sx={{ marginTop: "3rem" }}
          >
            <Box
              sx={{
                justifyContent: "flex-start",
              }}
            >
              <Typography sx={headercss}>Redemption Steps</Typography>

              <Typography sx={text1}>
                <FiberManualRecordIcon sx={fiberManualRecordIcon} /> Lorem ipsum
                dolor sit amet consectetur.{" "}
              </Typography>
              <Typography sx={text1}>
                <FiberManualRecordIcon sx={fiberManualRecordIcon} /> Tortor
                commodo nec sit amet.
              </Typography>
              <Typography sx={text1}>
                <FiberManualRecordIcon sx={fiberManualRecordIcon} /> Eget ornare
                et et enim leo ac sed nascetur.
              </Typography>
              <Typography sx={text1}>
                <FiberManualRecordIcon sx={fiberManualRecordIcon} /> Pulvinar
                vitae vitae sed id non volutpat risus elit.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box>
          <Typography
            sx={{ textAlign: "left", marginTop: "45px", color: "#6B7A99" }}
          >
            How can it be redeemed by buyer ?
          </Typography>
        </Box>
        <Box>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={handleChangeone}
            value={selectedValue}
            sx={{ justifyContent: "space-evenly" }}
          >
            <FormControlLabel
              value="online"
              control={<Radio />}
              label="Online"
              style={{
                color: selectedValue === "online" ? "#445FD2" : "#ADB8CC",
              }}
            />
            <FormControlLabel
              value="offline"
              control={<Radio />}
              label="Offline"
              style={{
                color: selectedValue === "offline" ? "#445FD2" : "#ADB8CC",
              }}
            />

            <FormControlLabel
              value="both"
              control={<Radio />}
              label="Both"
              style={{
                color: selectedValue === "both" ? "#445FD2" : "#ADB8CC",
              }}
            />
          </RadioGroup>

          {/* /***********************************online*************************************** */}
          {selectedValue === "online" && (
            <Box
              sx={{
                justifyContent: "flex-start",
              }}
            >
              <TextField
                focused
                label="Add URL"
                multiline
                variant="standard"
                placeholder="Link"
                sx={lablechange}
                InputLabelProps={{
                  style: {
                    color: "#6B7A99",
                    fontSize: "20px",
                    fontFamily: "Poppins",
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <Typography
                      variant="body1"
                      style={{ fontFamily: "Poppins" }}
                    ></Typography>
                  ),
                  style: {
                    fontFamily: "Poppins",
                    color: "blue",
                    marginTop: "25px",
                    marginLeft: "7px",
                    fontWeight: "bold",
                    fontSize: "15px",
                  },
                }}
              />
            </Box>
          )}
          {/* /***********************************offline*************************************** */}
          {selectedValue === "offline" && (
            <Box>
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="Address ( If Single ) Type Below"
                  multiline
                  variant="standard"
                  placeholder="Lorem Ipsum ( 24 keywords max ) "
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "50px",
                      marginLeft: "20px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="Area"
                  multiline
                  variant="standard"
                  placeholder="Lorem Ipsum ( 24 keywords max ) "
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "50px",
                      marginLeft: "20px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="Landmark"
                  multiline
                  variant="standard"
                  placeholder="Lorem Ipsum ( 24 keywords max ) "
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "50px",
                      marginLeft: "20px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="City"
                  multiline
                  variant="standard"
                  placeholder="Lorem Ipsum ( 24 keywords max ) "
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "50px",
                      marginLeft: "20px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="State"
                  multiline
                  variant="standard"
                  placeholder="Lorem Ipsum ( 24 keywords max ) "
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "50px",
                      marginLeft: "20px",
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#6B7A99",
                    mt: "2%",
                    textAlign: "left",
                  }}
                >
                  Upload Store List ( If Multiple Locations)
                </Typography>
              </Box>

              <Box
                sx={{
                  // marginTop : "15px" ,
                  border: "2px dashed #445FD2",
                  width: "auto",
                  maxWidth: "670px",
                  p: "2%",
                  mt: "3%",

                  position: "relative",
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
                      }}
                    />
                    <Typography
                      onClick={() => inputRef.current.click()}
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
                      }}
                    >
                      Drag & Drop upload or browse to choose a file
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
                      Supported format : JPEG, PNG, XLSX
                    </Typography>
                  </Box>
                </Box>

                <input
                  type="file"
                  multiple
                  onChange={(event) => setFiles(event.target.files)}
                  hidden
                  accept=".png,.jpeg,.xlsx"
                  ref={inputRef}
                />
              </Box>

              {files ? (
                <div>
                  <ol>
                    {Array?.from(files)?.map((file, idx) => (
                      <li key={idx}>{file?.name}</li>
                    ))}
                  </ol>
                  <div>
                    <button onClick={() => setFiles(0)}>Cancel</button>
                    <button onClick={handleUpload}>Upload</button>
                  </div>
                </div>
              ) : (
                " "
              )}
            </Box>
          )}
          {/* /***********************************Both*************************************** */}
          {selectedValue === "both" && (
            <Box>
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="Address ( If Single ) Type Below"
                  multiline
                  variant="standard"
                  placeholder="Lorem Ipsum ( 24 keywords max ) "
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "50px",
                      marginLeft: "20px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="Area"
                  multiline
                  variant="standard"
                  placeholder="Lorem Ipsum ( 24 keywords max ) "
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "50px",
                      marginLeft: "20px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="Landmark"
                  multiline
                  variant="standard"
                  placeholder="Lorem Ipsum ( 24 keywords max ) "
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "50px",
                      marginLeft: "20px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="City"
                  multiline
                  variant="standard"
                  placeholder="Lorem Ipsum ( 24 keywords max ) "
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "50px",
                      marginLeft: "20px",
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="State"
                  multiline
                  variant="standard"
                  placeholder="Lorem Ipsum ( 24 keywords max ) "
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: " #6B7A99",
                      marginTop: "50px",
                      marginLeft: "20px",
                    },
                  }}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#6B7A99",
                    mt: "2%",
                    textAlign: "left",
                  }}
                >
                  Upload Store List ( If Multiple Locations)
                </Typography>
              </Box>
              <Box
                sx={{
                  // marginTop : "15px" ,
                  border: "2px dashed #445FD2",
                  width: "auto",
                  maxWidth: "670px",
                  p: "2%",
                  mt: "3%",

                  position: "relative",
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
                      }}
                    />
                    <Typography
                      onClick={() => inputRef.current.click()}
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
                      }}
                    >
                      Drag & Drop upload or browse to choose a file
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
                      Supported format : JPEG, PNG, XLSX
                    </Typography>
                  </Box>
                </Box>

                <input
                  type="file"
                  multiple
                  onChange={(event) => setFiles(event.target.files)}
                  hidden
                  accept=".png,.jpeg,.xlsx"
                  ref={inputRef}
                />
              </Box>

              {files ? (
                <div>
                  <ol>
                    {Array?.from(files)?.map((file, idx) => (
                      <li key={idx}>{file?.name}</li>
                    ))}
                  </ol>
                  <div>
                    <button onClick={() => setFiles(0)}>Cancel</button>
                    <button onClick={handleUpload}>Upload</button>
                  </div>
                </div>
              ) : (
                " "
              )}
              <Box
                sx={{
                  justifyContent: "flex-start",
                }}
              >
                <TextField
                  focused
                  label="Add URL"
                  multiline
                  variant="standard"
                  placeholder="Link"
                  sx={lablechange}
                  InputLabelProps={{
                    style: {
                      color: "#6B7A99",
                      fontSize: "20px",
                      fontFamily: "Poppins",
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: (
                      <Typography
                        variant="body1"
                        style={{ fontFamily: "Poppins" }}
                      ></Typography>
                    ),
                    style: {
                      fontFamily: "Poppins",
                      color: "blue",
                      marginTop: "25px",
                      marginLeft: "7px",
                      fontWeight: "bold",
                      fontSize: "15px",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

const lablechange = {
  fontFamily: "Poppins",
  color: "#6B7A99",
  fontSize: "12px",
  display: "grid",
  textAlign: "left",
  marginTop: "2rem",
  fontWeight: "bold",
  "&:focus": {
    border: "1px solid #E8E8E8",
  },
};

const text = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "12px",
  color: "#445FD2",
  marginLeft: "28px",
  marginTop: "3em",
  textAlign: "left",
};

const text1 = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "bold",
  fontSize: "12px",
  color: "#445FD2",
  textAlign: "left",
  display: "flex",
  marginLeft: "28px",
  marginTop: "12px",
};

const headercss = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "14px",
  color: "#6B7A99",
  textAlignLast: "left",
};

const fiberManualRecordIcon = {
  width: "10px",
  height: "auto",
};
