import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewProduct = () => {
  const navigate = useNavigate();
  const { id, type } = useParams();

  const GetProductCategory = async () => {
    const data = await axios
      .get(`product_type/get_productType/${type}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data?.CompanyTypeName === "Textile") {
          navigate(`/home/appreal/${id}`);
        }
      });
  };

  useEffect(() => {
    GetProductCategory();
  }, []);

  return <div>ViewProduct</div>;
};

export default ViewProduct;
