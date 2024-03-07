import React from "react";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Header from "../../components/Header/Header";
import Modal  from "react-new-modal-plugin";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Header />
      <Modal />
      <EmployeeForm />
    </div>
  );
};

export default Dashboard;
