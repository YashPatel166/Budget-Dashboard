import { Chart } from "react-google-charts";

export default function Chart1({ data_c, idx }) {
  const filteredData = data_c.filter(
    (transaction) => new Date(transaction.date).getMonth() === idx
  );

  const categoryTotals = filteredData.reduce((acc, transaction) => {
    acc[transaction.category] =
      (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  const data_chart = [
    ["Category", "Amount"],
    ...Object.entries(categoryTotals),
  ];

  return (
    <div>
      <h3>Expenses by Category</h3>
      <Chart
        chartType="PieChart"
        data={data_chart}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
}
