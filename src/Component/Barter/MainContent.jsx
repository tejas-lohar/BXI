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
import Tolist from "./Tolist";
const MainContent = () => {
  // const [items, setItems] = useState([]);
  // const [items1, setItems1] = useState([]);

  const showItems = () => {
    setItems(["item 1", "item 2", "item 3"]);
  };
  // const showItems1 = () => {
  //   setItems1(["item 5", "item 6", "item 7"]);
  // };

  const closeList = () => {
    setItems([]);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const [value, setValue] = useState("");

  // const [update, setUpdate] = useState(value);
  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

  // const handleClick = () => {
  //   setUpdate(value);
  //   console.log(value);
  // };
  const [itemsNew, setItemsNew] = useState([]);
  const [items, setItems] = useState([]);
  const [view, setView] = useState(false);

  const [valueTo, setValue] = useState("");

  const addItem = (event) => {
    event.preventDefault();
    setItems([...items, valueTo]);
    setValue("");
  };

  const removeItem = (index) => {
    setItems(items.filter((item, i) => i !== index));
  };

  return (
    <Paper elevation={0}>
      <Grid container sx={grdMargin}>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Listing
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box
              mt={5}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <form onSubmit={addItem}>
                <TextField
                  type="text"
                  label="ADD BROWSING"
                  value={valueTo}
                  onChange={(event) => setValue(event.target.value)}
                />
                <Button type="submit" variant="outlined">
                  Add Item
                </Button>
              </form>
            </Box>
          </Dialog>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <Button variant="contained" onClick={() => setView(!view)}>
            Browsing
          </Button>

          {view ? (
            <ul>
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : null}
        </Grid>
      </Grid>

      {/* <Grid container sx={grdMargin}>
        <Grid item xl={12} lg={12} md={12} sm={6} xs={6}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Open Modal
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            sx={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "50px",
              minHeight: "550px",
            }}
          >
            <Paper
              elevation={4}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Tolist />
            </Paper>
          </Modal>
        </Grid>
      </Grid> */}
    </Paper>
  );
};

export default MainContent;

const grdMargin = {
  width: "80%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "100px",
};
{
  /* <Modal
            open={open}
            onClose={handleClose}
            sx={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "50px",
              minHeight: "550px",
            }}
          >
            <Paper
              elevation={4}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <form onSubmit={addItemTO}>
                <input
                  type="text"
                  value={valueTo}
                  onChange={(event) => setValueTO(event.target.value)}
                />
                <button type="submit">Add Item</button>
              </form>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    {item}
                    <button onClick={() => removeItem(index)}>Remove</button>
                  </li>
                ))}
              </ul>
            </Paper>
          </Modal> */
}
