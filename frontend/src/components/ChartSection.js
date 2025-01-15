import DoughnutChart from "./DoughnutChart";
import { useState } from "react";
import generateChartData from "./utils/generateChartData";

export default function ChartSection({ list }) {
  const [currentWeightUom, setCurrentWeighUom] = useState("lb");
  const { data, chartLabels, total, categorySubtotals } = generateChartData(
    list,
    currentWeightUom
  );

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "weight",
        data: data,
        backgroundColor: [
          "#FFA630",
          "#D7E8BA",
          "#4DA1A9",
          "#2E5077",
          "#611C35",
        ],
        borderWidth: 1,
      },
    ],
  };

  function handleChange(event) {
    setCurrentWeighUom(event.target.value);
  }

  return (
    <div className="chart-details">
      <table className="chart-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Weight</th>
          </tr>
        </thead>

        <tbody>
          {categorySubtotals.map((category) => (
            <tr>
              <td>{category.name}</td>
              <td>
                {parseFloat(category.subtotalWeight).toFixed(2) +
                  " " +
                  currentWeightUom}
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td>Total Weight</td>
            <td>
              {parseFloat(total).toFixed(2) + " "}
              <select
                name="weight_uom"
                value={currentWeightUom}
                onChange={handleChange}
              >
                <option value="oz">oz</option>
                <option value="lb">lb</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
              </select>
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="donut-chart">
        {data.length > 0 && <DoughnutChart chartData={chartData} currentWeightUom={currentWeightUom}/>}
      </div>
    </div>
  );
}
