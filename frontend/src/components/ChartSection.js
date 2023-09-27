import DoughnutChart from "./DoughnutChart";
export default function ChartSection({apiList, selectedIndex}) {
    const categories = apiList[selectedIndex].categories;
    const categorySubtotals = [];
    let total = 0;

    const nameLabels = [];
    const data = [];
    for (const index in categories) {
        const name = categories[index].name;
        let subtotalWeight = 0;
        nameLabels.push(name);

        for (const itemIndex in categories[index].items) {
            subtotalWeight = subtotalWeight + categories[index].items[itemIndex].weight * categories[index].items[itemIndex].qty;
            
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
                        <td>{category.subtotalWeight}</td>
                    </tr>
                    )
                    }
                </tbody>

                <tfoot>
                    <tr>
                        <td>
                            Total Weight
                        </td>
                        <td>{total}</td>
                    </tr>
                </tfoot>
            </table>
            
            <div className="donut-chart">
                <DoughnutChart chartData={chartData} />
            </div>


        </div>
    )
}