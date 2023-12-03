import DoughnutChart from "./DoughnutChart";
import { useState } from "react";

export default function ChartSection({apiList, selectedIndex}) {
    function weightConversion(weight, from_uom, to_uom) {
        function convertToG(weight, from_uom) {
            if (from_uom === 'g') {
                return weight*1000;
            } if (from_uom === 'kg') {
                return weight * 1000000;
            } if (from_uom === 'oz') {
                return weight * 28349.5;
            } if (from_uom === 'lb') {
                return weight * 453592;
            }
        }

        function convertGToUom(weight_g, to_uom) {
            if (to_uom === 'g') {
                return Math.round(weight_g)/1000;
            } if (to_uom === 'kg') {
                //return Math.round((weight_g * 1000 / 100000)) / 1000;
                return (weight_g / 100000).toFixed(2);
            } if (to_uom === 'oz') {
                return Math.round((weight_g * 1000 / 28349.5)) / 1000;
            } if (to_uom === 'lb') {
                return Math.round((weight_g * 1000 / 453592)) / 1000;
            }
        }

        return convertGToUom(convertToG(weight, from_uom), to_uom);
    }

    const categories = apiList[selectedIndex].categories;
    const categorySubtotals = [];
    let total = 0;
    const [currentWeightUom, setCurrentWeighUom] = useState('lb');

    const nameLabels = [];
    const data = [];
    for (const index in categories) {
        const name = categories[index].name;
        let subtotalWeight = 0;
        nameLabels.push(name);

        for (const itemIndex in categories[index].items) {
            subtotalWeight = subtotalWeight + weightConversion(categories[index].items[itemIndex].weight, categories[index].items[itemIndex].weight_uom, currentWeightUom) * categories[index].items[itemIndex].qty;
            
        }
        total = total+subtotalWeight;
        categorySubtotals.push({name: name, subtotalWeight: subtotalWeight});
        data.push(subtotalWeight);
    }
    const chartData = {
        labels: nameLabels,
        datasets: [
            {
              label: 'weight',
              data: data,
              backgroundColor: ['#FFA630','#D7E8BA','#4DA1A9','#2E5077','#611C35'],
              borderWidth: 1,
            },
          ],
    }

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
                        {categorySubtotals.map((category) => 
                        <tr>
                            <td>{category.name}</td>
                            <td>{category.subtotalWeight + ' ' + currentWeightUom}</td>
                        </tr>
                        )
                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <td>
                                Total Weight
                            </td>
                            <td>{total + ' ' }
                                <select name="weight_uom" value={currentWeightUom} onChange={handleChange}>
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
                    <DoughnutChart chartData={chartData} />
                </div>
            </div>
    )
}