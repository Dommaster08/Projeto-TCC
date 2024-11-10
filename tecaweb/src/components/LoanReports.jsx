import React, { useState, useEffect } from "react";

const LoanReports = () => {
  const [totalLoans, setTotalLoans] = useState(0);

  const fetchTotalLoans = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/loans/total-loans"
      );
      const data = await response.json();

      setTotalLoans(data.totalLoans);
    } catch (error) {
      console.error("Erro ao buscar o total de empréstimos:", error);
    }
  };

  useEffect(() => {
    fetchTotalLoans();
  }, []);

  return (
    <div>
      <h1>Relatórios de Empréstimos</h1>
      <p>Número total de empréstimos: {totalLoans}</p>
    </div>
  );
};

export default LoanReports;
