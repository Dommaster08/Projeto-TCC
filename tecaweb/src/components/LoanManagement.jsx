import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoanManagement.css";

const LoanManagement = () => {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [newLoan, setNewLoan] = useState({
    user: "",
    book: "",
    dueDate: "",
  });
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/list");
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/books/list");
      const booksData = await response.json();
      setBooks(booksData);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  const fetchLoans = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/loans/list");
      const loansData = await response.json();
      setLoans(loansData);
    } catch (error) {
      console.error("Erro ao buscar empréstimos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLoan((prevLoan) => ({
      ...prevLoan,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/loans/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLoan),
      });
      if (response.ok) {
        alert("Empréstimo registrado com sucesso!");
        setNewLoan({ user: "", book: "", dueDate: "" });
        fetchLoans();
      } else {
        alert("Erro ao registrar empréstimo.");
      }
    } catch (error) {
      console.error("Erro ao registrar empréstimo:", error);
      alert("Erro ao registrar empréstimo");
    }
  };

  const handleCancelLoan = async (loanId) => {
    if (window.confirm("Tem certeza que deseja cancelar este empréstimo?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/loans/${loanId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Empréstimo cancelado com sucesso!");
          fetchLoans();
        } else {
          alert("Erro ao cancelar empréstimo.");
        }
      } catch (error) {
        console.error("Erro ao cancelar empréstimo:", error);
      }
    }
  };

  const handleCompleteLoan = async (loanId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/loans/${loanId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Empréstimo concluído com sucesso!");
        fetchLoans();
      } else {
        alert("Erro ao concluir empréstimo.");
      }
    } catch (error) {
      console.error("Erro ao concluir empréstimo:", error);
    }
  };

  useEffect(() => {
    fetchLoans();
    fetchUsers();
    fetchBooks();
  }, []);

  return (
    <div className="loan-management-container">
      <h1 className="title">Controle de Empréstimos</h1>

      <form onSubmit={handleSubmit} className="loan-form">
        <div className="form-group">
          <label htmlFor="user">Usuário:</label>
          <select
            name="user"
            id="user"
            value={newLoan.user}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione um usuário</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="book">Livro:</label>
          <select
            name="book"
            id="book"
            value={newLoan.book}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecione um livro</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Data de Devolução:</label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            value={newLoan.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Registrar Empréstimo
        </button>
      </form>

      <h2 className="sub-title">Lista de Empréstimos</h2>
      {loans.length > 0 ? (
        <ul className="loan-list">
          {loans.map((loan) => (
            <li key={loan._id} className="loan-item">
              <span>
                {loan.user?.name} emprestou "{loan.book?.title}" - Devolução
                até: {new Date(loan.dueDate).toLocaleDateString()}
              </span>
              <button
                onClick={() => handleCompleteLoan(loan._id)}
                className="btn-complete"
              >
                Concluir
              </button>
              <button
                onClick={() => handleCancelLoan(loan._id)}
                className="btn-cancel"
              >
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-loans">Nenhum empréstimo registrado.</p>
      )}
    </div>
  );
};

export default LoanManagement;
