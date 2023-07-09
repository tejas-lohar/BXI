import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import axios from "axios";

const ContactForm = () => {
  // Input Change Handling
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleOnChange = (event) => {
    event.persist();
    setInputs((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("https://formbold.com/s/3VpqX", inputs, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 191|Q59ROFDL4WC9sTmWCRxCd0bCpg9bcOyMmgtAKhTe",
        },
      })
      .then((response) => {
        if (response.status === 200 || 201) {
          alert("Message sent successfully!");
        } else {
          alert("An error occurred while sending the message.");
        }
        console.log(response);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(355.71deg, #00A5DF 0.01%, #166BB5 94.66%)",
      }}
    >
      <form onSubmit={handleOnSubmit} sx={{ width: "400px" }}>
        <Box
          sx={{
            // background: "#156DB7",
            background: "linear-gradient(4.29deg, #D83493 0%, #7879B9 94.66%)",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "400px",
            padding: "60px",
            borderRadius: "20px",
          }}
        >
          <TextField
            id="name"
            type="text"
            name="name"
            label="Name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleOnChange}
            sx={{ marginBottom: "1rem" }}
            required
          />
          <TextField
            id="email"
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            value={inputs.email}
            onChange={handleOnChange}
            sx={{ marginBottom: "1rem" }}
            required
          />
          <TextField
            id="message"
            name="message"
            label="Message"
            placeholder="Type your message"
            multiline
            rows={4}
            value={inputs.message}
            onChange={handleOnChange}
            sx={{ marginBottom: "1rem" }}
            required
          />
          <Button type="submit" variant="contained" color="#156DB7">
            Send Message
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ContactForm;
