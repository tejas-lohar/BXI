import axios from "axios";
import {
  INVOICE_REQUEST,
  INVOICE_SUCCESSS,
  INVOICE_FAIL,
} from "../reduser/invoices";

const getAllInvoices =
  (search = "", sell = "", purchase = "", InvoiceType = "", page = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: INVOICE_REQUEST.toString() });

      console.log("InvoiceType==>", InvoiceType);
      const params = {
        search: search.trim(),
        sell,
        purchase,
        invoiceType: InvoiceType,
        page,
        limit: "", // Update the limit value as per your requirement
      };

      const response = await axios.get("invoices/get_invoices", {
        params,
        withCredentials: true,
      });

      dispatch({
        type: INVOICE_SUCCESSS.toString(),
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: INVOICE_FAIL.toString(),
        payload: error.response.data.message,
      });
    }
  };

export default getAllInvoices;
