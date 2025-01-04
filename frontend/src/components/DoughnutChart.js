import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function DoughnutChart({ chartData }) {
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw; // Access the raw value
            return `${value.toFixed(2)}`; // Format to 2 decimals
          },
        },
      },
      legend: {
        position: "right",
      },
    },
  };
  return <Doughnut data={chartData} options={options} />;
}
