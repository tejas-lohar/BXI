import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import YouMayAlsoLikeCard from "./YouMayAlsoLikeCard";
import "./you-may-like.css";

const YouMayAlsoLike = (props) => {
  const [products, setProducts] = React.useState([]);
  const [viewMore, setViewMore] = React.useState(false);
  const navigate = useNavigate();
  const fetchYouMayLike = async () => {
    return await axios
      .post("/cart/you-may-like", {
        productIds: props.productIds,
      })
      .then((result) => result.data)
      .catch((error) => console.log(error));
  };

  const handleOnClick = () => {
    setViewMore(!viewMore);
  };

  React.useEffect(() => {
    const getYouMayLike = async () => {
      const products = await fetchYouMayLike();
      setProducts(products);
    };
    getYouMayLike();
  }, []);
  const GetProductCategory = async (id, type) => {
    await axios
      .get(`product_type/get_productType/${type}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data?.CompanyTypeName === "Textile") {
          navigate(`/home/productdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Hotel") {
          navigate(`/home/hotelvoucheraddtocart/${id}`);
        } else if (res?.data?.CompanyTypeName === "Mobility") {
          navigate(`/home/mobilitydetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Electronics") {
          navigate(`/home/electronicsdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "FMCG") {
          navigate(`/home/productdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Office Supply") {
          navigate(`/home/productdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Others") {
          navigate(`/home/productdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Lifestyle") {
          navigate(`/home/productdetail/${id}`);
        } else if (res?.data?.CompanyTypeName === "Media") {
          navigate(`/home/mediabuying/${id}`);
        } else {
          navigate(`/home/productdetail/${id}`);
        }
      });
  };
  return (
    <Box className="you-may-like">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h4" className="heading">
          You may also like
        </Typography>
        <Button
          variant="text"
          className="view-all"
          onClick={handleOnClick}
          sx={{ color: "rgba(107, 122, 153, 1)" }}
        >
          View {viewMore ? "less" : "all"}
        </Button>
      </Stack>
      <Stack className="product-wrapper">
        {products &&
          products.map((product, index) => {
            if (!viewMore && index < 4)
              return (
                <Box
                  onClick={() => {
                    GetProductCategory(product?._id, product?.ProductType);
                  }}
                >
                  <YouMayAlsoLikeCard product={product} />
                </Box>
              );
            else if (viewMore)
              return (
                <Box
                  onClick={() => {
                    GetProductCategory(product?._id, product?.ProductType);
                  }}
                >
                  <YouMayAlsoLikeCard product={product} />
                </Box>
              );
          })}
      </Stack>
    </Box>
  );
};

export default YouMayAlsoLike;
