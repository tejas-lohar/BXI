import react from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function useGetServicesType() {
  return useQuery(["services"], async () => {
    return await axios.get("services", {
      withcreditentials: true,
    });
  });
}
