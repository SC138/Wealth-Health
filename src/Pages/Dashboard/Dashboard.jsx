import React, { useState } from "react";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Header from "../../components/Header/Header";
import { Modal } from "react-new-modal-plugin";
import "react-new-modal-plugin/dist/global.css";
import { Link } from "react-router-dom";

// import users from "../../assets/img/users-solid.svg";
import UsersIcon from "../../components/UsersIcon/UsersIcon";
import { v4 as uuidv4 } from "uuid";

// Page de tableau de bord avec un formulaire pour ajouter un nouvel employé.
const Dashboard = () => {
  // États pour gérer l'ouverture de la modale, son contenu et la réinitialisation du formulaire.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [resetForm, setResetForm] = useState(false);

  // Fonction pour gérer la sauvegarde de l'employé.
  const handleEmployeeSave = (newEmployee) => {
    // Fonction pour calculer l'âge à partir de la date de naissance.
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

    // Vérifier si l'employé a au moins 18 ans.
    if (newEmployee.DateOfBirth) {
      const age = calculateAge(newEmployee.DateOfBirth);
      if (age < 18) {
        setModalContent("Employee must be at least 18 years old.");
        setIsModalOpen(true);
        return;
      }
    } else {
      setModalContent("Please enter a valid date of birth for the employee.");
      setIsModalOpen(true);
      return;
    }

    // Récupère les employés depuis le stockage local ou un tableau vide.
    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    // Vérifie si l'employé existe déjà, puis met à jour ou crée un nouvel employé.
    if (newEmployee.id) {
      const updatedEmployees = employees.map((emp) =>
        emp.id === newEmployee.id ? { ...emp, ...newEmployee } : emp
      );
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
      setModalContent("Employee Updated Successfully!");
    } else {
      const employeeExists = employees.some(
        (employee) =>
          employee.FirstName === newEmployee.FirstName &&
          employee.LastName === newEmployee.LastName &&
          employee.Street === newEmployee.Street
      );

      if (employeeExists) {
        setModalContent("Employee already exists.");
      } else {
        const employeeWithId = { ...newEmployee, id: uuidv4() };
        employees.push(employeeWithId);
        localStorage.setItem("employees", JSON.stringify(employees));
        setModalContent("Employee Created !");
      }
    }

    setIsModalOpen(true); // Ouvre la modale pour afficher le message.
    setResetForm(true); // Réinitialise le formulaire après la sauvegarde.
  };

  return (
    <div className="dashboard">
      <Header />
      <Link to="/employees" className="link-employees">
        {/* Lien vers la liste des employés. */}
        <div className="icon-with-text">
          <UsersIcon color="#6F860F" />
          <span>Employees List</span>
        </div>
      </Link>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        {" "}
        {/* Affiche la modale si isModalOpen est vrai */}
        <p>{modalContent}</p>
      </Modal>
      {/* Formulaire d'employé avec gestion de la sauvegarde et de la réinitialisation. */}
      <EmployeeForm
        onEmployeeSave={handleEmployeeSave}
        resetForm={resetForm}
        setResetForm={setResetForm}
      />{" "}
    </div>
  );
};

export default Dashboard;
