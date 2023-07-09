import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Paper,
  Button,
  TextField,
  Dialog,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import CustomEvents from "./Events";
import Footer from "./Footer";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Prefterences = () => {
  const [product, setProduct] = useState();
  const [listItem, setListItem] = useState([]);
  const [values, setValues] = useState([
    "TV",
    "SmartPhone",
    "earBuds",
    "earPhones",
    "videoGames ",
    "ps5",
    "PC",
    "mouse",
    "CPU",
  ]);

  const handleClick = () => {
    setValues((prevValues) => [...prevValues, "newValue"]);
  };

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const FetchAllItem = async () => {
    await axios
      .get("Prefernces/get_preferences")
      .then((res) => {
        console.log(res);
        setListItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    FetchAllItem();
  }, []);
  const add = async () => {
    CustomEvents.Prefrence(
      "pref",
      listItem.map((e) => e.Prefernce)
    );
    // .post("/product/add_product", {
    //   "...": "...",

    // })
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };
  return (
    <Paper
      elevation={0}
      sx={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
    >
      <Grid container sx={{ gridMe }}>
        <Grid container>
          {listItem?.map((e) => (
            <Grid item xl={4} lg={4}>
              <p key={e.name}>
                <Grid item xl={4} lg={4}>
                  <Box
                    width={100}
                    height={100}
                    border={1}
                    bgcolor="green"
                    color="primary.contrastText"
                    p={2}
                    m={1}
                  >
                    <Box sx={{ MarginRight: "auto", marginRight: "auto" }}>
                      <Checkbox
                        {...label}
                        onChange={handleChange}
                        value={product}
                        // onChange={(e) => {
                        //   setProduct(e.target.value);
                        // }}
                        // onClick={add}
                      />
                      <p> {e.Prefernce} </p>
                    </Box>
                    {/* {value} */}
                  </Box>
                </Grid>
              </p>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Button variant="contained" onClick={add}>
        Submit
      </Button>
      {/* {checked ? <p>Checkbox is checked</p> : null} */}
      <Footer />
    </Paper>
  );
};

export default Prefterences;

const gridMe = {
  mt: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
