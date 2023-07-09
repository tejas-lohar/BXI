import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";

import { getCompanyById } from "../redux/action/CompanyActions";
import { useDispatch, useSelector } from "react-redux";

const AvatargeneratorWithId = (props) => {
  const [companyName, setCompanyName] = useState("");
  const [companyNameLetter, setCompanyNameLetter] = useState("");
  const [storeCompanyData, setStoreCompanyData] = useState();

  console.log(props);

  const dispatch = useDispatch();

  const { company: companyData } = useSelector((state) => state.companyById);

  useEffect(() => {
    dispatch(getCompanyById(props.CompanyId));
    if (props?.companyname === undefined) {
      return;
    }

    let data =
      props.companyname?.split(" ") || companyData?.companyName?.split(" ");

    let datatwo = data && data?.map((word) => word[0]);
    setCompanyNameLetter(datatwo[0] && datatwo[0].toLowerCase());
    let datathree = (datatwo[0] && datatwo[0]) + datatwo[1];
    setCompanyName(datathree);
  }, [props]);

  if (
    companyNameLetter === "a" ||
    companyNameLetter === "d" ||
    companyNameLetter === "g" ||
    companyNameLetter === "j" ||
    companyNameLetter === "m" ||
    companyNameLetter === "p" ||
    companyNameLetter === "s" ||
    companyNameLetter === "v" ||
    companyNameLetter === "y" ||
    companyNameLetter === "z"
  ) {
    return <Avatar sx={{ bgcolor: "#445FD2" }}>{companyName}</Avatar>;
  } else if (
    companyNameLetter === "b" ||
    companyNameLetter === "e" ||
    companyNameLetter === "h" ||
    companyNameLetter === "k" ||
    companyNameLetter === "n" ||
    companyNameLetter === "q" ||
    companyNameLetter === "t" ||
    companyNameLetter === "w" ||
    companyNameLetter === "x"
  ) {
    return <Avatar sx={{ bgcolor: "blue" }}>{companyName}</Avatar>;
  } else if (
    companyNameLetter === "c" ||
    companyNameLetter === "f" ||
    companyNameLetter === "i" ||
    companyNameLetter === "l" ||
    companyNameLetter === "o" ||
    companyNameLetter === "r" ||
    companyNameLetter === "u"
  ) {
    {
      return <Avatar sx={{ bgcolor: "maroon" }}>{companyName}</Avatar>;
    }
  } else {
    return <Avatar sx={{ bgcolor: "orange" }}>{companyName}</Avatar>;
  }
};

export default AvatargeneratorWithId;
