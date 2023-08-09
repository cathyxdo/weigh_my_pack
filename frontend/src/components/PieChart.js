export default function PieChart({apiList, selectedIndex}) {
    const categories = apiList[selectedIndex].categories;
    const categorySubtotals = [];
    let total = 0;
    for (const index in categories) {
        const name = categories[index].name;
        let subtotalWeight = 0;

        for (const itemIndex in categories[index].items) {
            subtotalWeight = subtotalWeight + categories[index].items[itemIndex].weight * categories[index].items[itemIndex].qty;
            
        }
        total = total+subtotalWeight;
        console.log(subtotalWeight);
        categorySubtotals.push({name: name, subtotalWeight: subtotalWeight});
    }


    console.log(categorySubtotals);

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
            
            <div>
                <h3>Pie Chart goes here</h3>
            </div>
        </div>
    )
}