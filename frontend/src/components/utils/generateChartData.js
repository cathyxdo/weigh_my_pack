export default function generateChartData(list, currentWeightUom) {
  let chartData = {
    data: [],
    chartLabels: [],
    total: 0,
    categorySubtotals: [],
  };

  const categories = list.categories;

  for (const index in categories) {
    const categoryName = categories[index].name;
    let subtotalWeight = 0;

    for (const itemIndex in categories[index].items) {
      subtotalWeight =
        subtotalWeight +
        weightConversion(
          categories[index].items[itemIndex].weight,
          categories[index].items[itemIndex].weight_uom,
          currentWeightUom
        ) *
          categories[index].items[itemIndex].qty;
    }

    chartData.total = chartData.total + subtotalWeight;
    chartData.categorySubtotals.push({
      name: categoryName,
      subtotalWeight: subtotalWeight,
    });
    chartData.chartLabels.push(categoryName);
    chartData.data.push(subtotalWeight);
  }

  function weightConversion(weight, from_uom, to_uom) {
    function convertToG(weight, from_uom) {
      if (from_uom === "g") {
        return weight * 1000;
      }
      if (from_uom === "kg") {
        return weight * 1000000;
      }
      if (from_uom === "oz") {
        return weight * 28349.5;
      }
      if (from_uom === "lb") {
        return weight * 453592;
      }
    }

    function convertGToUom(weight_g, to_uom) {
      if (to_uom === "g") return parseFloat(weight_g / 1000);
      if (to_uom === "kg") return parseFloat(weight_g / 1000000);
      if (to_uom === "oz") return parseFloat(weight_g / 28349.5);
      if (to_uom === "lb") return parseFloat(weight_g / 453592);
    }

    return convertGToUom(convertToG(weight, from_uom), to_uom);
  }

  return chartData;
}
