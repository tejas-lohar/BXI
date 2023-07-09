import react from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function useGetRecomendedProducts() {
  return useQuery(["recommeded"], async () => {
    return await axios.get("recommeded", {
      withcreditentials: true,
    });
  });
}
