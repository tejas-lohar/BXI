import { Box, Typography } from "@mui/material";
import axios from "axios";
import {
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Chart as chartjs,
} from "chart.js";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import BXITokenIcon from "../../assets/BXITokenIcon.png";

chartjs.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

export default function LineChartPage() {
  const [tokenFlows, setTokenFlows] = useState([]);
  const [filters, setFilters] = useState({ filter: "buy", timeline: "week" });
  const productYears = useRef(new Set());

  let productTotal = [];
  tokenFlows &&
    tokenFlows?.map((tokenFlow) => {
      const total =
        tokenFlow.ProductData &&
        tokenFlow.ProductData.map((productData) => {
          return productData.PricePerUnit * productData.ProductQuantity;
        });
      productTotal.push({ createdAt: tokenFlow.createdAt, total: total });
    });

  const timelineFilter = {
    week: "ddd",
    month: "MMM",
    year: "YYYY",
  };

  const productByTimeline = productTotal.reduce((result, item) => {
    let key = "";
    if (filters.timeline === "quarter") {
      key = `Quarter ${getQuarter(item.createdAt)}`;
    } else {
      key = moment(item.createdAt).format(timelineFilter[filters.timeline]);
    }
    if (!result.hasOwnProperty(key)) {
      result[key] = [];
    }
    result[key].push(item.total);
    return result;
  }, []);

  let timelineProducts = {};
  for (let data in productByTimeline) {
    let values = productByTimeline[data];
    let total = values.reduce(
      (sum, day) => sum + day.reduce((daySum, value) => daySum + value, 0),
      0
    );
    timelineProducts[data] = total;
  }

  let yearsArray = [];
  if (filters.timeline === "year") {
    const maxYear = Math.max(...Object.keys(timelineProducts));
    yearsArray = Array.from(
      { length: 10 },
      (_, index) => maxYear - index
    ).reverse();
    const yearSet = new Set();
    Object.keys(timelineProducts).map((t) => yearSet.add(t));
    productYears.current.add(...yearSet);
  }

  function getQuarter(date) {
    return moment(date).week() - moment(date).startOf("month").week() + 1;
  }

  const labels = {
    week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    month: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    quarter: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4", "Quarter 5"],
    year: yearsArray,
  };

  const weekTotals = labels[filters.timeline].map(
    (day) => timelineProducts[day]
  );

  const data = {
    labels: labels[filters.timeline],
    datasets: [
      {
        label: "First Dataset",
        data: weekTotals,
        backgroundColor: "rgba(0, 20, 250, 0.2",
        lineTension: 0.4,
        borderColor: "rgba(0, 0, 250, 0.7)",
        fill: true,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
      },

      y: {
        grid: {
          display: false,
        },
        beginAtZero: true,
        min: weekTotals ? Math.min(...weekTotals) : 0,
        max: weekTotals ? Math.max(...weekTotals) : 0,
        responsive: true,
        maintainAspectRatio: false,
        ticks: {
          stepSize: 1000,
          callback: function (value, index, values) {
            return "₹" + Math.floor(value) + "K";
          },
        },
      },
    },
    barThickness: 40,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "filter") {
      productYears.current = new Set();
    }
    setFilters((prevFilter) => {
      if (value !== "all-years") {
        if (name === "timeline" && value !== "year") {
          const updatedFilters = { ...prevFilter, [name]: value };
          delete updatedFilters["year"];
          return updatedFilters;
        } else return { ...prevFilter, [name]: value };
      } else {
        const updatedFilters = { ...prevFilter };
        delete updatedFilters["year"];
        return updatedFilters;
      }
    });
  };

  const fetchTotalSales = async () => {
    axios
      .get(
        `/soldAndbrought/total-${filters.filter}${
          "?timeline=" + filters.timeline
        }${filters.year ? "&year=" + filters.year : ""}`
      )
      .then((result) => {
        setTokenFlows(result.data);
        console.log("result", result);
      });
  };

  useEffect(() => {
    fetchTotalSales();
  }, [filters]);

  return (
    <Box
      sx={{
        height: "460px",
        width: "830px",
        mx: "auto",
        my: 2,
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 3, mb: 2 }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: 20,
            color: "#15223C",
          }}
        >
          Tokens Flow
        </Typography>
        <Box>
          <select style={opt} name="filter" onChange={handleChange}>
            <option value="buy">Purchase</option>
            <option value="sales">Sale</option>
            <option value="credit-issued">Credit Issued</option>
            <option value="credit-owed">Credit Owed</option>
            <option value="net-tokens">Net Tokens</option>
          </select>
        </Box>
        <Box>
          <select style={opt} name="timeline" onChange={handleChange}>
            <option value="week">Day wise</option>
            <option value="quarter">Week wise</option>
            <option value="month">Month wise</option>
            <option value="year">Year wise</option>
          </select>
        </Box>
        {filters.timeline === "year" && (
          <Box>
            <select style={opt} name="year" onChange={handleChange}>
              <option value="all-years">All Years</option>
              {Array.from(productYears.current).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </Box>
        )}
      </Box>
      <Bar style={{ height: "430px" }} data={data} options={options} />
    </Box>
  );
}

const opt = {
  height: "35px",
  borderRadius: "12px",
  border: "1px solid #E6E9EE",
  paddingLeft: "15px",
  paddingRight: "15px",
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  color: "#AFAFAF",
  maxWidth: 250,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
