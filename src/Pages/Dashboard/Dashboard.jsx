import React, { useState } from "react";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Header from "../../components/Header/Header";
import { Modal } from "react-new-modal-plugin"; 

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="dashboard">
      <Header />
      <button onClick={toggleModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} closeModal={toggleModal}>
        {/* Contenu de la modal ici */}
        <p>test modal</p>
        {/* <button onClick={toggleModal}>Close</button> */}
      </Modal>
      <EmployeeForm />
    </div>
  );
};

export default Dashboard;
