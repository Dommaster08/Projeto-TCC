import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserManagement from "./components/UserManagement";
import HomePage from "./components/HomePage";
import LoanManagement from "./components/LoanManagement";
import LoanReports from "./components/LoanReports";
import "bootstrap/dist/css/bootstrap.min.css";
import BookManager from "./components/BookManager";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/loans" element={<LoanManagement />} />
          <Route path="/books" element={<BookManager />} />
          <Route path="/reports" element={<LoanReports />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
