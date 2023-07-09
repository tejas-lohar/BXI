import axios from "axios";
import React, { useEffect, useState } from "react";

const PurchaseOrderTotalPrice = (props) => {
  const [alldata, setAllData] = useState();
  useEffect(() => {
    axios
      .get(`purchase/get_purchase_order_by_company/${props.data}`, {
        withCredentials: true,
      })
      .then((res) => {
        setAllData(res.data);
      });
  }, []);

  let totalPrice = 0;
  alldata?.map((item) => {
    totalPrice += item.ProductId.ProductPrice;
  });

  return totalPrice ? totalPrice : 0;
};

export default PurchaseOrderTotalPrice;
