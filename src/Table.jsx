import { useState } from "react";

export default function Table({ data_c, midx, yidx }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = data_c.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() === midx &&
      transactionDate.getFullYear() === yidx
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTransactions = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <h3>
        Transactions for{" "}
        {new Date(yidx, midx).toLocaleString("default", { month: "long" })}{" "}
        {yidx}
      </h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Payee</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {displayedTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.payee}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
