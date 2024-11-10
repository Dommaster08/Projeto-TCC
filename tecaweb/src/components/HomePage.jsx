import React, { useState } from "react";
import UserManagement from "./UserManagement";
import LoanManagement from "./LoanManagement";
import LoanReports from "./LoanReports";
import BookManager from "./BookManager";
import "../styles/Homepage.css";
const HomePage = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "user-management":
        return <UserManagement />;
      case "loan-management":
        return <LoanManagement />;
      case "loan-reports":
        return <LoanReports />;
      case "book-list":
        return <BookManager />;
      default:
        return <h2>Selecione uma funcionalidade</h2>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <aside className="col-md-3 col-lg-2 bg-light p-3 sidebar d-flex flex-column align-items-center">
          <h2 className="text-primary my-3">TecaWeb</h2>
          <nav className="nav flex-column w-100">
            <button
              className="btn btn-link nav-link text-dark"
              onClick={() => setSelectedComponent("user-management")}
            >
              Cadastrar Usuário
            </button>
            <button
              className="btn btn-link nav-link text-dark"
              onClick={() => setSelectedComponent("loan-management")}
            >
              Gerenciar Empréstimos
            </button>
            <button
              className="btn btn-link nav-link text-dark"
              onClick={() => setSelectedComponent("book-list")}
            >
              Lista de Livros
            </button>
            <button
              className="btn btn-link nav-link text-dark"
              onClick={() => setSelectedComponent("loan-reports")}
            >
              Ver Relatórios
            </button>
          </nav>
        </aside>
        <main className="col-md-9 col-lg-10 d-flex align-items-center justify-content-center">
          <div className="content-container">{renderComponent()}</div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
