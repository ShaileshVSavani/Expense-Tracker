// import React from "react";
// import { Pie } from "react-chartjs-2";

// const PieChart = ({ data }) => {
//   const chartData = {
//     labels: data.map((d) => d.category),
//     datasets: [
//       {
//         label: "Expenses by Category",
//         data: data.map((d) => d.amount),
//         backgroundColor: ["#007BFF", "#28A745", "#FFC107", "#DC3545"],
//       },
//     ],
//   };

//   return <Pie data={chartData} />;
// };

// export default PieChart;




import React  from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.category),
    datasets: [
      {
        label: "Expenses by Category",
        data: data.map((d) => d.amount),
        backgroundColor: ["#007BFF", "#28A745", "#FFC107", "#DC3545"],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;