import React, { useState } from "react";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Header from "../../components/Header/Header";
import { Modal } from "react-new-modal-plugin";
import "react-new-modal-plugin/dist/global.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  // Initialise l'état pour savoir si la modale est ouverte ou non.
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Initialise l'état pour le contenu de la modale.
  const [modalContent, setModalContent] = useState("");

  const [resetForm, setResetForm] = useState(false);

  const handleEmployeeSave = (newEmployee) => {
    // Fonction pour calculer l'âge à partir de la date de naissance
    const calculateAge = (dateOfBirth) => {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    // Vérifie d'abord l'âge de l'employé
    if (newEmployee.DateOfBirth) {
      const age = calculateAge(newEmployee.DateOfBirth);
      if (age < 18) {
        setModalContent("Employee must be at least 18 years old.");
        setIsModalOpen(true);
        return; // Sort de la fonction sans ajouter l'employé si moins de 18 ans
      }
    } else {
      setModalContent("Please enter a valid date of birth for the employee.");
      setIsModalOpen(true);
      return; // Sort de la fonction si la date de naissance n'est pas fournie
    }

    // Vérifie ensuite si l'employé existe déjà
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employeeExists = employees.some(
      (employee) =>
        employee.FirstName === newEmployee.FirstName &&
        employee.LastName === newEmployee.LastName &&
        employee.Street === newEmployee.Street
    );

    if (employeeExists) {
      setModalContent("Employee already exists.");
      setIsModalOpen(true);
    } else {
      // employees.push(newEmployee);
      const employeeWithId = { ...newEmployee, id: uuidv4() };
      employees.push(employeeWithId);
      localStorage.setItem("employees", JSON.stringify(employees));
      setModalContent("Employee Created !");
      setIsModalOpen(true);
      setResetForm(true);
    }
  };

  return (
    <div className="dashboard">
      <Header />
      <Link to="/employees" className="link-employees">
        <div className="icon-with-text">
          <FontAwesomeIcon icon={faUsers} size="2x" color="#6F860F" />
          <span>Employees List</span>
        </div>
      </Link>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        {" "}
        {/* Affiche la modale si isModalOpen est vrai */}
        <p>{modalContent}</p>
      </Modal>
      <EmployeeForm
        onEmployeeSave={handleEmployeeSave}
        resetForm={resetForm}
        setResetForm={setResetForm}
      />{" "}
    </div>
  );
};

export default Dashboard;
