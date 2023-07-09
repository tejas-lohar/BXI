import React, { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Paper,
  Stack,
  Button,
  Modal,
  TextField,
  Dialog,
} from "@mui/material";
const CompanyProfile = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [emailAlternate, setEmailAlternate] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [companyId, setCompanyId] = useState("");

  const compData = async () => {
    // await axios
    //   .post("auth/login", {
    //     loginId: emailLogin,
    //     password: passwordLogin,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       alert("Logged Successfully");
    //       navigate("/home");
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err.response.data);
    //   });
  };
  return (
    <Paper elevation={0}>
      <br />
      <br />
      <TextField
        label="companyName"
        id="companyName"
        value={companyName}
        onChange={(event) => setCompanyName(event.target.value)}
      />
      <br />
      <br />
      <TextField
        label="emailLogin"
        id="emailLogin"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <br />
      <TextField
        label="emailAlternate"
        id="emailAlternate"
        value={emailAlternate}
        onChange={(event) => setEmailAlternate(event.target.value)}
      />
      <br />
      <br />
      <TextField
        label="mobile"
        id="mobile"
        value={mobile}
        onChange={(event) => setMobile(event.target.value)}
      />
      <br />
      <br />
      <TextField
        label="address"
        id="address"
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <br />
      <br />
      <TextField
        label="pincode"
        id="pincode"
        value={pincode}
        onChange={(event) => setPincode(event.target.value)}
      />
      <br />
      <br />
      <TextField
        label="city"
        id="city"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <br />
      <br />
      <TextField
        label="gstNo"
        id="gstNo"
        value={gstNo}
        onChange={(event) => setGstNo(event.target.value)}
      />
      <br />
      <br />
      <TextField
        label="companyId"
        id="companyId"
        value={companyId}
        onChange={(event) => setCompanyId(event.target.value)}
      />
      <br />
      <br />
      <Button onClick={compData} variant="contained">
        {" "}
        Send{" "}
      </Button>
    </Paper>
  );
};

export default CompanyProfile;
