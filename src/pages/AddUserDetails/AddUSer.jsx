import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Switch,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  styled,
} from "@mui/material/styles";
import BreadCrumbHeader from "../../components/Header/BreadCrumbHeader";

const AddUSer = () => {
  const outerTheme = createTheme({
    palette: {
      primary: {
        main: "#6B7A99",
      },
    },
    typography: {
      fontSize: 30,
    },
  });
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [value, setValue] = React.useState("female");

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <Paper elevation={0} sx={{ bgcolor: "transparent", boxShadow: "none" }}>
      <BreadCrumbHeader MainText={"Apparel"} />
      <Paper
        elevation={0}
        sx={{
          borderRadius: "20px",
        }}
      >
        <Grid container>
          <Grid container xl={6} lg={6} md={6} sm={12} xs={12}></Grid>
          <Grid container xl={6} lg={6} md={6} sm={12} xs={12} sx={adjGrid}>
            <ThemeProvider theme={outerTheme}>
              <Box sx={{ width: "70%", gap: "10px" }}>
                <Typography sx={feildName}> Member Name </Typography>
                <TextField
                  label="Name"
                  placeholder="Name"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "5px",
                      border: "3px #6B7A99",
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: "70%", gap: "10px", mt: 2 }}>
                <Typography sx={feildName}> Member Email </Typography>
                <TextField
                  label=" Email "
                  placeholder=" Email "
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "5px",
                      border: "3px #6B7A99",
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: "70%", gap: "10px", mt: 8 }}>
                <Typography sx={feildName}> Role </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Age"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ width: "70%", gap: "10px", mt: 2 }}>
                <Typography sx={feildName}> Enter Password </Typography>
                <TextField
                  label="Password"
                  placeholder="Password"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: {
                      borderRadius: "5px",
                      border: "3px #6B7A99",
                    },
                  }}
                />
              </Box>
              <Box sx={{ width: "70%", gap: "10px", mt: 8 }}>
                <Typography sx={feildName}> Product Category </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="select"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {/* <Box sx={{ mt: 2 }}>
                <Switch {...label} defaultChecked />
                <Switch {...label} defaultChecked color="primary" />
              </Box> */}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "start",
                  gap: {
                    xl: "10rem",
                    lg: "10rem",
                    md: "6rem",
                    sm: "2rem",
                    xs: "0rem",
                  },
                  width: "70%",
                }}
              >
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Typography sx={tic}>View</Typography>
                  <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    labelPlacement="start"
                  />
                </Box>
                <Box sx={{ display: "flex", mt: 2 }}>
                  <Typography sx={tic}>Edit</Typography>
                  <FormControlLabel
                    control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                    labelPlacement="start"
                  />
                </Box>
              </Box>
            </ThemeProvider>
            <Box mt={3} sx={{ width: "70%" }}>
              <Typography sx={endText}>
                User can edit the member role & Permissions of other user?{" "}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "20px", width: "70%" }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChangeRadio}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default AddUSer;

const feildName = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  display: "flex",
  alignItems: "center",
  textTransform: "capitalize",
  color: "#6B7A99",
  lineHeight: "4rem",
};

const adjGrid = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  columnSpacing: 2,
};

const tic = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 16,
  color: "#6B7A99",
  lineHeight: "5rem",
};

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 45,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "rgba(68, 95, 210, 1)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const endText = {
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: 14,
  color: "#6B7A99",
};
