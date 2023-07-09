import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PurchaseOrderDetails from "./PurchaseOrderDetails";

const PurchaseOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [stateArray, setStateArray] = useState();
  const [Address, setAddress] = useState("");
  const [Area, setArea] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("");
  const [BuyerShippingAddress, setBuyerShippingAddress] = useState();
  const [CityArray, setCityArray] = useState();
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [openTextarea, setOpenTextarea] = useState("");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    setBuyerShippingAddress({
      PinCode: pincode,
      City: city,
      State: state,
      Address: Address,
    });
  }, [pincode, city, state, Address, Area]);

  const { OrderSummary: OrderSummarydata, loading: OrderSummaryDataLoading } =
    useSelector((state) => state.OrderSummaryD);

  let storeDataIds = [];
  let TotalQuantity = 0;
  let totalAmount = 0;
  let totalPricePerUnit = 0;
  let totatlTaxableAmount = 0;
  let totalGST = 0;
  let totalAmountWithGST = 0;
  let totalAmountWithTax = 0;
  let totaltaxvalue = 0;
  let totalCGSTAmount = 0;
  let totalIGSTPercentage = 0;
  let totalSGSTAmount = 0;
  let totalSGSTPercentage = 0;
  let totalCSTPerCentage = 0;
  let TotalGSTAmount = 0;
  let TotalTokanAmount = 0;

  let totaladditionalcostinrupee = 0;
  let totaladditionalcostinbxi = 0;
  OrderSummarydata?.ProductData?.map((item) => {
    let TotalSec = item?.BoughtSeconds * 10;
    storeDataIds.push(item);
    TotalQuantity += item.ProductQuantity;
    totalAmount +=
      OrderSummarydata?.ProductTypeName === "Media"
        ? item.DiscountedPrice *
          item?.TimelineToBought *
          item.ProductQuantity *
          item?.BoughtSeconds
        : item.DiscountedPrice * item.ProductQuantity;
    totalPricePerUnit += item.DiscountedPrice;
    TotalTokanAmount +=
      OrderSummarydata?.ProductTypeName === "Media"
        ? item.DiscountedPrice *
          item?.TimelineToBought *
          item.ProductQuantity *
          item?.BoughtSeconds
        : item?.PriceWithoutGST;

    totatlTaxableAmount +=
      OrderSummarydata?.ProductTypeName === "Media"
        ? item.DiscountedPrice *
          item?.TimelineToBought *
          item.ProductQuantity *
          item?.BoughtSeconds
        : item.DiscountedPrice * item.ProductQuantity;
    totalGST += item.GST;
    totalAmountWithGST += (
      item?.DiscountedPrice *
      item?.ProductQuantity *
      (item?.GST / 100)
    )?.toFixed(2);
    totalAmountWithTax +=
      OrderSummarydata?.ProductTypeName === "Media"
        ? item?.DiscountedPrice *
            item?.ProductQuantity *
            item?.TimelineToBought *
            item?.BoughtSeconds *
            (item?.GST / 100) +
          item?.DiscountedPrice *
            item?.ProductQuantity *
            item?.TimelineToBought *
            item?.BoughtSeconds
        : item?.TotalPriceWithGSTInRupee;

    totalCGSTAmount +=
      (item?.DiscountedPrice * item?.ProductQuantity * item?.GST) / 2 / 100;
    totalSGSTAmount +=
      (item?.DiscountedPrice * item?.ProductQuantity * item?.GST) / 2 / 100;
    totalSGSTPercentage += item.GST / 2;
    totalCSTPerCentage += item.GST / 2;
    totalIGSTPercentage += item.GST;
    TotalGSTAmount += item?.TotalGSTInBXI;
    totaltaxvalue += item?.TotalGSTInBXI;
  });

  let AdCostInrTotal = 0;
  let AdCostBxiTotal = 0;

  OrderSummarydata?.ProductData?.map((item) => {
    if (item?.AdditionCostArray?.length > 0) {
      item?.AdditionCostArray.forEach((item) => {
        if (item?.currencyType === "₹") {
          AdCostInrTotal += item?.GstPrice;
          totaladditionalcostinrupee += item?.TotalWithGst;
        } else if (item?.currencyType === "BXITokens") {
          AdCostBxiTotal += item?.GstPrice;
          totaladditionalcostinbxi += item?.TotalWithGst;
        }
      });
    }
  });

  totaltaxvalue = totaltaxvalue + AdCostInrTotal + AdCostBxiTotal;

  return (
    <PurchaseOrderDetails
      SellerPage={false}
      Title={"Purchased Order"}
      PageName={"Purchased Order"}
      IsMedia = {OrderSummarydata?.ProductTypeName === "Media"}
      OrderSummarydata={OrderSummarydata}
      TableData={{
        storeDataIds,
        TotalQuantity,
        totalAmount,
        totalPricePerUnit,
        totatlTaxableAmount,
        totalGST,
        totalAmountWithGST,
        totalAmountWithTax,
        totaltaxvalue,
        totalCGSTAmount,
        totalIGSTPercentage,
        totalSGSTAmount,
        totalSGSTPercentage,
        totalCSTPerCentage,
        TotalGSTAmount,
        TotalTokanAmount,
        totaladditionalcostinrupee,
        totaladditionalcostinbxi,
        AdCostBxiTotal,
        AdCostInrTotal,
      }}
    />
  );
};

export default PurchaseOrder;
