import React from "react";
import { useParams } from "react-router-dom";
import useGetProductCategoriesById from "../../Hooks/GetProductCategories/useGetProductCategoriesById";

const CategoryDetails = (props) => {
  console.log("props", props);
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductCategoriesById(
    props.categoryId
  );
  return data?.ProductTypeName;
};

export default CategoryDetails;
