import React from "react";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
// import { Chart as ChartJS, Title, Tooltip, LineElement, Legend } from 'chartjs';
import {
  Title,
  Chart as ChartJS,
  Tooltip,
  BarElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  BarElement
);

const options = {
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
      min: 0,
      max: 100,
      ticks: {
        stepSize: 25,
        callback: function (value, index, values) {
          return "    " + "$" + value + "K";
        },
      },
    },
  },

  indexAxis: "x",
  // borderWidth: 30,
  elements: {
    bar: {
      borderWidth: 0.1,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      display: false,
    },
    tooltip: {
      backgroundColor: "#fff",
      bodyColor: "#000",
      borderColor: "rgba(173, 184, 204, 1)",
      borderWidth: 2,
      titleFont: "bold",
      title: true,
      titleColor: "#000",
      padding: 10,
      // callbacks: {
      //   labelColor: function (context) {
      //     return {
      //       borderColor: "#000",
      //       borderRadius: 2,
      //     };
      //   },
      //   labelTextColor: function (context) {
      //     return "#000";
      //   },
      // },
    },
    // title: {
    //   display: true,
    //   // text: "Bar-Chart using chart.js ",
    // },
  },
};

export default function BarChart() {
  const [selectedData, setSelectedData] = useState("data1");

  const data1 = {
    labels: [
      "12am to 4am",
      "4am to 8am",
      "8am to 12pm",
      "12pm to 4pm",
      "4pm to 8pm",
      "8pm to 12am",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [25, 82, 45, 55, 64, 40],
        borderWidth: 1,
        backgroundColor: "gray",
        lineTension: 0.4,
        fill: true,
        borderRadius: 17,
        barThickness: 40,
      },
    ],
  };
  const maxValueInOneDay = Math.max(...data1.datasets[0].data);
  data1.datasets[0].backgroundColor = data1.datasets[0].data.map((value) =>
    value === maxValueInOneDay ? "#445FD2" : "rgba(173, 184, 204, 0.45);"
  );

  const data2 = {
    labels: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    datasets: [
      {
        label: "Dataset 2",
        data: [20, 30, 65, 45, 82, 30, 40],
        border: "none",
        backgroundColor: "gray",
        lineTension: 0.4,
        fill: true,
        borderRadius: 17,
        barThickness: 45,
      },
    ],
  };
  const maxValueInWeek = Math.max(...data2.datasets[0].data);
  data2.datasets[0].backgroundColor = data2.datasets[0].data.map((value) =>
    value === maxValueInWeek ? "#445FD2" : "rgba(173, 184, 204, 0.45);"
  );

  const data3 = {
    labels: [
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
    datasets: [
      {
        label: "Dataset 3",
        data: [25, 45, 55, 64, 40, 45, 55, 82, 64, 40, 23, 45],
        borderWidth: 1,
        backgroundColor: "gray",
        lineTension: 0.4,
        fill: true,
        borderRadius: 12,
        barThickness: 30,
      },
    ],
  };
  const maxValueInMonth = Math.max(...data3.datasets[0].data);
  data3.datasets[0].backgroundColor = data3.datasets[0].data.map((value) =>
    value === maxValueInMonth ? "#445FD2" : "rgba(173, 184, 204, 0.45);"
  );

  const handleChange = (e) => {
    setSelectedData(e.target.value);
  };

  return (
    <Box
      sx={{
        height: "395px",
        width: "535px",
        // background: "red",
        display: "grid",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: "16px",
          width: "90%",
          mx: "auto",
          p: 0.5,
          lineHeight: "30px",
        }}
      >
        Product Analytics
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          gap: "20px",
          width: "70%",
          height: "60px",
          mx: "auto",
          mt: 2,
        }}
      >
        <div>
          <select style={ProductAnalysticsDropDown1}>
            <option>All</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <div>
          <select style={{ ...ProductAnalysticsDropDown1, width: "110px" }}>
            <option>Scale</option>
            <option>1</option>
            <option>2</option>
          </select>
        </div>
        <div>
          <select
            onChange={handleChange}
            style={{ ...ProductAnalysticsDropDown1, width: "150px" }}
          >
            <option value="data1">1D</option>
            <option value="data2">1W</option>
            <option value="data3">1M</option>
          </select>
        </div>
      </Box>
      {/* <Box sx={{ mt: 2 }}> */}
      <Bar
        options={options}
        data={
          selectedData === "data1"
            ? data1
            : data2 && selectedData === "data2"
            ? data2
            : data3 && selectedData === "data3"
            ? data3
            : data1
        }
      />
      {/* </Box> */}
    </Box>
  );
}

const ProductAnalysticsDropDown1 = {
  height: "44px",
  width: "80px",
  // minWidth: "70px",
  borderRadius: "12px",
  border: "1px solid #E6E9EE",
  // paddingLeft: "25px",
  // paddingRight: "25px",
  padding: 8,
  fontFamily: "Poppins",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: "16px",
  color: "#AFAFAF",
  // lineHeight: 24,
};
