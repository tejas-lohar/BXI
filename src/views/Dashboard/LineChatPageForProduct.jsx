import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart, Title, Tooltip, Legend, CategoryScale, LinearScale, Filler } from "chart.js";
import moment from "moment";

Chart.register(Title, Tooltip, Legend, CategoryScale, LinearScale, Filler);

const lastOneMonth = ["1 Week", "2 Week", "3 Week", "4 Week", "5 Week"];

export default function LineChartPage() {
  const [filter, setFilter] = useState({
    metric: "ViewCount",
    timeline: "Last7Days",
  });

  const { ProductAnalysisOfLastWeek } = useSelector((state) => state.ProductAnalysisOfWeek);
  const { ProductAnalysisOfLastMonth } = useSelector((state) => state.ProductAnalysisOfLastMonth);
  const { ProductAnalysisOfLastThreeMonth } = useSelector((state) => state.ProductAnalysisOfThreeMonth);
  const { ProductAnalysisOfLastSixMonth } = useSelector((state) => state.ProductAnalysisOfSixMonth);
  const { ProductAnalysisOfLastYear } = useSelector((state) => state.ProductAnalysisOfLastYear);
  const { ProductAnalysisOfLastFiveYear } = useSelector((state) => state.ProductAnalysisOfLastFiveYear);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let filteredData = [];

    switch (filter.timeline) {
      case "Last7Days":
        filteredData = ProductAnalysisOfLastWeek?.weekViewCounts || [];
        break;
      case "Last1Month":
        filteredData = ProductAnalysisOfLastMonth?.monthViewCounts || [];
        break;
      case "Last3Month":
        filteredData = ProductAnalysisOfLastThreeMonth?.monthsData || [];
        break;
      case "Last6Month":
        filteredData = ProductAnalysisOfLastSixMonth?.monthsData || [];
        break;
      case "Last1Year":
        filteredData = ProductAnalysisOfLastYear?.monthsData || [];
        break;
      case "Last5Year":
        filteredData = ProductAnalysisOfLastFiveYear?.yearsData || [];
        break;
      default:
        filteredData = [];
    }

    // Apply additional filtering based on the selected metric if necessary
    switch (filter.metric) {
      case "ViewCount":
        // No additional filtering needed for view count
        break;
      case "AddToCartCount":
      case "PurchaseCount":
        filteredData = filteredData.filter((entry) => entry[filter.metric] > 0);
        break;
      default:
        break;
    }

    // Update the chart data with the filtered data
    setChartData(filteredData);
  }, [
    filter,
    ProductAnalysisOfLastWeek,
    ProductAnalysisOfLastMonth,
    ProductAnalysisOfLastThreeMonth,
    ProductAnalysisOfLastSixMonth,
    ProductAnalysisOfLastYear,
    ProductAnalysisOfLastFiveYear,
  ]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Product Analysis",
        font: { size: 20 },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Timeline",
          font: { size: 16 },
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: filter.metric,
          font: { size: 16 },
        },
      },
    },
  };

  const data = {
    labels: chartData.map((entry, index) => {
      if (filter.timeline === "Last7Days") {
        return moment(entry.Day, "dddd").format("ddd");
      } else if (
        filter.timeline === "Last3Month" ||
        filter.timeline === "Last6Month" ||
        filter.timeline === "Last1Year"
      ) {
        return moment(entry.Month, "MMMM YYYY").format("MMM YYYY");
      } else if (filter.timeline === "Last1Month") {
        return lastOneMonth[index];
      } else if (filter.timeline === "Last5Year") {
        return entry.Year;
      } else {
        return "";
      }
    }),
    datasets: [
      {
        label: filter.metric,
        data: chartData.map((entry) => entry[filter.metric]),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      sx={{
        height: "460px",
        width: "830px",
        mx: "auto",
        my: 2,
      }}
    >
      <Box className="chart-container">
        <Box mb={2}>
          <select
            style={opt}
            className="select-input"
            value={filter.metric}
            onChange={(e) => setFilter({ ...filter, metric: e.target.value })}
          >
            <option value="ViewCount">View Count</option>
            <option value="AddToCartCount">Add to Cart Count</option>
            <option value="PurchaseCount">Purchase Count</option>
          </select>
        </Box>
        <Box mb={2}>
          <select
            style={opt}
            className="select-input"
            value={filter.timeline}
            onChange={(e) => setFilter({ ...filter, timeline: e.target.value })}
          >
            <option value="Last7Days">Last 7 Days</option>
            <option value="Last1Month">Last 1 Month</option>
            <option value="Last3Month">Last 3 Months</option>
            <option value="Last6Month">Last 6 Months</option>
            <option value="Last1Year">Last 1 Year</option>
            <option value="Last5Year">Last 5 Years</option>
          </select>
        </Box>
        <Box maxWidth={900}>
          <Bar data={data} options={options} />
        </Box>
      </Box>
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
