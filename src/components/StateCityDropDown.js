import React, { useState } from "react";
import axios from "axios";

function StateCityDropDown(props) {
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    setPincode(e.target.value);
    if (e.target.value.length === 6) {
      setError("");
      axios
        .get(`https://api.postalpincode.in/pincode/${e.target.value}`)
        .then((res) => {
          setState(res.data[0].PostOffice[0].State);
          setCity(res.data[0].PostOffice[0].District);
        })
        .then(() => {
          document.getElementById("pincode").classList.remove("error");
        })
        .catch((err) => {
          document.getElementById("pincode").className = "error";
          setError("Invalid PIN Code");
        });
    } else if (e.target.value.length !== 0 && e.target.value.length !== 6) {
      setCity("");
      setState("");
      setError("ZIP code must be of 6 digits");
    } else {
      setCity("");
      setState("");
      setError("");
    }
  };

  return (
    <div style={props.Container} className="outer_box">
      {error ? <span className="error-display">{error}</span> : null}
      <div style={props.pincodeContainer} className="group">
        <input
          maxLength={6}
          minLength={6}
          onChange={onChange}
          name="pincode"
          placeholder=" "
          value={pincode}
          id="pincode"
          type="number"
          style={props.pincodeInput}
          className="pin"
          required
        />
        <span className="highlight"></span>
        <label>Pin code</label>
      </div>
      <div style={props.cityContainer} className="group">
        <input
          type="String"
          readOnly
          placeholder=" "
          value={city}
          style={props.cityInput}
          className="inp"
          required
        />
        <label>City</label>
      </div>
      <div style={props.stateContainer} className="group">
        <input
          type="String"
          placeholder=" "
          readOnly
          value={state}
          style={props.stateInput}
          className="inp"
          required
        />
        <label>State</label>
      </div>
      <h4>Enter 6-digit Pincode</h4>
    </div>
  );
}

export default StateCityDropDown;
