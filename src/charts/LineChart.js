
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.month), 
    datasets: [
      {
        label: "Monthly Expenses", 
        data: data.map((d) => d.amount), 
        fill: false,
        backgroundColor: "#007BFF",
        borderColor: "#007BFF",
      },
    ],
  };

  const chartOptions = {
    responsive: true, 
    maintainAspectRatio: true, 
    plugins: {
      legend: {
        position: "top", 
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
        },
        beginAtZero: true, 
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
