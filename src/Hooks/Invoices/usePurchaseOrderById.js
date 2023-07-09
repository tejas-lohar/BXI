import { useQuery } from "react-query";
import axios from "axios";

export function PurchaseOrderById(id) {
  return useQuery(["PurchaseOrderById", id], () =>
    axios.get(`purchase/get_purchase_order/${id}`).then((res) => res.data)
  );
}
