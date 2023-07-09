import axios from "axios";
import React, { useEffect, useState } from "react";

const PurchaseOrderApprovedByBuyerForSellerTotalPrice = (props) => {
  const [alldata, setAllData] = useState();
  useEffect(() => {
    axios
      .get(`purchase/get_purchase_order_accepted_by_buyer_for_seller_company`, {
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

export default PurchaseOrderApprovedByBuyerForSellerTotalPrice;
