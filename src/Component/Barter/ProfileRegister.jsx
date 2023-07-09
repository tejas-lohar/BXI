import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  TextField,
  //   DatePicker,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
// import DatePicker from "@material-ui/pickers/DatePicker";
const ProfileRegister = () => {
  const [formData, setFormData] = useState({});
  const [emailLogin, setEmailLogin] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    setFormData(event.target.elements);

    navigate("/home");
  }
  return (
    <Paper elevation={0}>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <TextField
          label="emailLogin"
          id="emailLogin"
          value={emailLogin}
          onChange={(event) => setEmailLogin(event.target.value)}
        />
        {/* <DatePicker
          label="Select a date"
          value={new Date()}
          onChange={(date) => console.log(date)}
        /> */}
        <button type="submit">Submit</button>
      </form>
    </Paper>
  );
};

export default ProfileRegister;
