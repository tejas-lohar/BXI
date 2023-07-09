import axios from "axios";
import React, { useState, useEffect } from "react";

const PurchaseOrderListApprovedByBuyerForSeller = (props) => {
  const [dataLength, setdataLength] = useState();
  useEffect(() => {
    axios
      .get(`purchase/get_purchase_order_accepted_by_buyer_for_seller_company`, {
        withCredentials: true,
      })
      .then((res) => {
        setdataLength(res?.data);
      });
  }, []);

  return dataLength?.length;
};

export default PurchaseOrderListApprovedByBuyerForSeller;
