import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Employees from "./Pages/Employees/Employees";
import EmployeeForm from "./components/EmployeeForm/EmployeeForm";
import "./global.css";
import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/edit-employee/:id" element={<EmployeeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
