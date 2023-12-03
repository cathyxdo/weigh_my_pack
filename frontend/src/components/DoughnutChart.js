import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function DoughnutChart({chartData}) {
    const options = {
        plugins: {

            legend: {
              position: 'right',
            },
        }
    }
    return (
        <Doughnut data={chartData} options={options}/>
    ) 
}