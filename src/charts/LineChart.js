// import React from "react";
// import { Line } from "react-chartjs-2";

// const LineChart = ({ data }) => {
//   const chartData = {
//     labels: data.map((d) => d.month),
//     datasets: [
//       {
//         label: "Monthly Expenses",
//         data: data.map((d) => d.amount),
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
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary components
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

  return <Line data={chartData} />;
};

export default LineChart;
