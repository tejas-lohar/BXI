import { Card, Stack, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BXITokenIcon from "../../assets/Stack of Coins.svg";
const YouMayAlsoLikeCard = (props) => {
  const productImage =
    props.product.ProductImages.length > 0
      ? props.product.ProductImages[0].url
      : "";
  const productPrice =
    props.product.ProductsVariantions.length > 0
      ? props.product.ProductsVariantions[0].PricePerUnit
      : "";

  return (
    <Card
      className="card"
      sx={{
        maxWidth: "270px",
        borderRadius: 20,
        maxHeight: "290px",
        cursor: "pointer",
      }}
    >
      <img src={productImage} alt={props.product.ProductName} className="img" />
      <Stack
        className="content-wrapper"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Typography
          variant="h6"
          component="h6"
          className="title ellipsis"
          sx={{ width: "70%" }}
        >
          {props.product.ProductName}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <img
            src={BXITokenIcon}
            alt="rupi"
            style={{ width: "18px", height: "18px", marginTop: "5px" }}
          />
          <Typography variant="subtitle1" className="grey price">
            {productPrice}
          </Typography>
        </Box>
      </Stack>
      <Typography variant="subtitle2" className="grey description ellipsis">
        {props.product.ProductDescription}
      </Typography>
    </Card>
  );
};

export default YouMayAlsoLikeCard;
