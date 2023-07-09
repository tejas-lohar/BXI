import React from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  BottomNavigation,
  FormControlLabel,
  Checkbox,
  TextField,
  Tooltip,
  Fade,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import InfoIcon from "../assets/InfoIcon.svg";

const ToolTip = (props) => {
  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip
      {...props}
      componentsProps={{ tooltip: { className: className } }}
    />
  ))(`
          background: #445fd2;
          width:200px;
      `);
  return (
    <>
      <CustomTooltip
        title={<Typography sx={ToolTextStyle}>{props.info}</Typography>}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 400 }}
      >
        <Box
          component="img"
          src={InfoIcon}
          sx={{ width: "28px", height: "auto", cursor: "pointer" }}
        />
      </CustomTooltip>
    </>
  );
};

export default ToolTip;

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
