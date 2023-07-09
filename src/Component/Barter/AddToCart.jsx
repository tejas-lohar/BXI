import axios from "axios";
import React, { useState, useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import {
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
function AddToCart() {
  const [listCart, setListCart] = useState([]);
  const [listItemCart, setListItemCart] = useState([]);
  const [dataWishList, setDataWishList] = useState(null);
  console.log(listItemCart);
  const navigate = useNavigate();
  const fetchCart = async () => {
    await axios
      .get("product/get_cart_products")
      .then((res) => {
        console.log(res);
        setListCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const orderPlace = async () => {
    await axios
      .get("product/get_cart_products")
      .then((res) => {
        console.log(res);
        let stored = res?.data?.map((element) => {
          return { ProductId: element?._id, CompanyId: element?.companyId };
        });
        setListItemCart(stored);
      })
      .catch((err) => {
        console.log(err);
      });
    if (listItemCart) {
      await axios
        .post("order/create_order", {
          OrderData: listItemCart,
          DeliveryAddress: "myAddress---",
        })
        .then((res) => {
          console.log("___________", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log("ddgddd", listItemCart);

  useEffect(() => {
    fetchCart();
  }, []);
  const DeleteCartProduct = async (props) => {
    let id = props;
    console.log("======>", id);
    await axios
      .delete(`product/delete_cart_product/${id}`)
      .then((res) => {
        console.log(res);
        fetchCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Add To Cart</h1>
      <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">company id</TableCell>
            <TableCell align="left">Product name</TableCell>
            <TableCell align="left">Product Description</TableCell>
            <TableCell align="left">Product Price</TableCell>
            <TableCell align="left">Product Oty</TableCell>
            <TableCell align="left">Product Type</TableCell>
            <TableCell align="left">Delete</TableCell>
            <TableCell align="left">Order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listCart?.map((e) => {
            return (
              <TableRow
                key={e._id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell align="left">{e?._id}</TableCell>
                <TableCell align="left">{e?.ProductId?.ProductName}</TableCell>
                <TableCell align="left">{e?.ProductId?.ProductDesc}</TableCell>
                <TableCell align="left">{e?.ProductId?.ProductPrice}</TableCell>
                <TableCell align="left">{e?.ProductId?.ProductQty}</TableCell>
                <TableCell align="left">{e?.ProductId?.ProductType}</TableCell>
                <TableCell align="left">
                  <Button
                    onClick={() => {
                      DeleteCartProduct(e._id);
                    }}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" onClick={orderPlace}>
                    Order Place Here
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box>
        <Button variant="contained" onClick={orderPlace}>
          Order Place Here
        </Button>
      </Box>
      <Paper sx={paperSmallStyle}>
        <Box sx={{ bgcolor: "#fff", width: "85%" }}>
          {/* <Typography sx={FeedbackStyle}>
            In this world, wherever there is light - there are also shadows. As
            long as the concept of winners exists, there must also be losers
          </Typography>
          <Typography variant="p" sx={serviceName}>
            AR/VR
            <br />
          </Typography>

          <Typography variant="p" sx={serviceName}>
            DEVELOPEMENT
          </Typography> */}
        </Box>
      </Paper>
      <Grid
        container
        sx={{
          height: "auto",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
        }}
      >
        {/* <Typography variant="h4" sx={textStyle}>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint <span>Velit official</span>
        </Typography> */}
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} sx={adjGrid} mt={2}>
          <Typography sx={mainContent}>
            Our workforce remains at the core of our company be it our
            designers, advisors, developers, or managers. Every single person
            contributes in their unique way and we as a company strive on
            offering a range of tangible and intangible perks to our workforce.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
export default AddToCart;

const paperSmallStyle = {
  // width: "100%",
  maxWidth: "320px",
  // height: "359px",
  width: { xl: "400px", lg: "260px", md: "300px", sm: "260px", xs: "250px" },
  height: { xl: "300px", lg: "262px", md: "262px", sm: "280px", xs: "250px" },
  background: "#FFFFFF",
  borderRadius: "30px",
  marginBottom: "10px",
  marginTop: "10px",
  marginRight: "auto",
  marginLeft: "auto",
  mx: "auto",
  display: "flex",
  padding: "20px",
  // flexDirection: "column-reverse",
  // position: "relative",
};
const serviceName = {
  fontFamily: "Be Vietnam Pro",
  fontStyle: "normal",
  fontWeight: 600,

  fontSize: {
    xl: "2.4rem",
    lg: "1.8rem",
    md: "1.6rem",
    sm: "1.6rem",
    xs: "1.6rem",
  },
  lineHeight: "35px",
  textTransform: "uppercase",
  color: "#485BFF",
};

const FeedbackStyle = {
  fontFamily: "PT Sans",
  fontStyle: "normal",
  fontWeight: 500,
  // fontSize: "2.2rem",
  fontSize: {
    xl: "1.5rem",
    lg: "1.5rem",
    md: "1.4rem",
    sm: "1.4rem",
    xs: "1.4rem",
  },
  lineHeight: {
    xl: "28px",
    lg: "25px",
    md: "17px",
    sm: "20px",
    xs: "20px",
  },
};
const textStyle = {
  // fontSize: "4.5rem",
  fontSize: {
    xl: "5rem",
    lg: "4.5rem",
    md: "3.5rem",
    sm: "3rem",
    xs: "3rem",
  },
  fontFamily: "Be Vietnam Pro, sans-serif",
  lineHeight: {
    xl: "57px",
    lg: "52px",
    md: "45px",
    sm: "37px",
    xs: "37px",
  },
  letterSpacing: "-0.02em",
  color: "#000000",
  textTransform: "none",
  textAlign: "center",
  marginBottom: "2rem",
};

const adjGrid = {
  display: "flex",
  justifyContent: "center",
};

const mainContent = {
  fontSize: {
    xl: "1rem",
    lg: "1rem",
    md: "1.5rem",
    sm: "1.4rem",
    xs: "1.3rem",
  },
  width: { xl: "80%", lg: "80%", md: "70%", sm: "90%", xs: "95%" },
  color: "rgba(0, 0, 0, 0.5)",
  fontFamily: "Be Vietnam Pro",
  // lineHeight: "1rem",
  // fontWeight: 300,
  textAlign: "center",
};
