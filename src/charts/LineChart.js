

// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register the necessary chart components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const LineChart = ({ data }) => {
//   const chartData = {
//     labels: data.map((d) => d.month), // Use months for the X-axis labels
//     datasets: [
//       {
//         label: "Monthly Expenses", // Set dataset label
//         data: data.map((d) => d.amount), // Use amount for Y-axis values
//         fill: false,
//         backgroundColor: "#007BFF",
//         borderColor: "#007BFF",
//       },
//     ],
//   };

//   return <Line data={chartData} />;
// };

// export default LineChart;



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
    labels: data.map((d) => d.month), // Use months for the X-axis labels
    datasets: [
      {
        label: "Monthly Expenses", // Set dataset label
        data: data.map((d) => d.amount), // Use amount for Y-axis values
        fill: false,
        backgroundColor: "#007BFF",
        borderColor: "#007BFF",
      },
    ],
  };

  const chartOptions = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: true, // Allow the chart to maintain its size and aspect ratio based on container
    plugins: {
      legend: {
        position: "top", // Adjust legend position if needed
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
        beginAtZero: true, // Ensure Y-axis starts from zero
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
