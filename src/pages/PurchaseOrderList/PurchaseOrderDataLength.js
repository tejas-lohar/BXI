import axios from "axios";
import React, { useState, useEffect } from "react";

const PurchaseOrderDataLength = (props) => {
  const [dataLength, setdataLength] = useState();
  useEffect(() => {
    axios
      .get(`purchase/get_purchase_order_by_company/${props.data}`, {
        withCredentials: true,
      })
      .then((res) => {
        setdataLength(res.data);
      });
  }, []);

  return dataLength?.length;
};

export default PurchaseOrderDataLength;
