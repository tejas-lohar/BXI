// use query to get total sales and total purchase

// Path: src\Hooks\Stats\useGetTotalSales.js
import { useState, useEffect } from "react";
import axios from "axios";

import { useQuery } from "react-query";

export default function useGetTotalSales() {
  const { data, isLoading, error } = useQuery("totalSales", () => {
    return axios
      .get(`soldAndbrought/total-sales`, {
        withCredentials: true,
      })
      .then((res) => res.data);
  });

  return { data, isLoading, error };
}
