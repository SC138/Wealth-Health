import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./global.css";
const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard"));
const Employees = React.lazy(() => import("./Pages/Employees/Employees"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Chargement...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:id" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
