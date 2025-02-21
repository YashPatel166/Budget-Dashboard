import { useEffect, useState } from "react";
import Table from "./Table";
import Chart1 from "./Chart1";
function App() {
  const [monthIndex, setMonthIndex] = useState(0);
  const [yearIndex, setYearIndex] = useState(0);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [2023, 2024];

  const handlePrevMonth = () => {
    setMonthIndex((prevIndex) => {
      if (prevIndex === 0) {
        setYearIndex((prevYearIndex) =>
          prevYearIndex === 0 ? prevYearIndex : prevYearIndex - 1
        );
        return months.length - 1;
      }
      return prevIndex - 1;
    });
  };

  const handleNextMonth = () => {
    setMonthIndex((prevIndex) => {
      if (prevIndex === months.length - 1) {
        setYearIndex((prevYearIndex) =>
          prevYearIndex === years.length - 1 ? prevYearIndex : prevYearIndex + 1
        );
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/transactions.json")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTransactions(data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  let total_amt = transactions
    .reduce(
      (sum, transaction) =>
        new Date(transaction.date).getMonth() === monthIndex
          ? sum + transaction.amount
          : sum,
      0
    )
    .toFixed(2);

  return (
    <div className="dashboard">
      <div className="header">
        <h1>
          <button onClick={handlePrevMonth}>
            <i className="fa-solid fa-angles-left"></i>
          </button>{" "}
          {months[monthIndex]} {years[yearIndex]}
          <button onClick={handleNextMonth}>
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </h1>
      </div>
      <div className="box1">Total spend this month: ${total_amt}</div>
      <div className="box2">
        <Chart1 data_c={transactions} idx={monthIndex} />
      </div>
      <div className="box3">
        <Table
          data_c={transactions}
          midx={monthIndex}
          yidx={years[yearIndex]}
        />
      </div>
      {/*  <div className="box2">Box 2</div> */}
    </div>
  );
}

export default App;
