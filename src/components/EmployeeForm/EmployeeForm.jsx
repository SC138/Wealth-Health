import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InputField from "../InputField/InputField";
import DatePicker from "react-datepicker";
import Select from "react-select";
import states from "states-us";
import "react-datepicker/dist/react-datepicker.css";

// Options pour le champ de sélection du département.
const departmentOptions = [
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Engineering", label: "Engineering" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Legal", label: "Legal" },
];

// Composant pour le formulaire d'employé avec une prop pour la fonction de sauvegarde de l'employé.
const EmployeeForm = ({ onEmployeeSave, resetForm, setResetForm }) => {
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      const employeeToEdit = employees.find((emp) => emp.id === id);
      if (employeeToEdit) {
        setEmployee(employeeToEdit);
      }
    }
  }, [id]);
  
  // Initialise l'état pour les données de l'employé.
  const [employee, setEmployee] = useState({
    FirstName: "",
    LastName: "",
    DateOfBirth: null,
    StartDate: null,
    Street: "",
    City: "",
    State: "AL",
    ZipCode: "",
    Department: "Sales",
  });

  // Fonction pour gérer le changement de date (naissance et démarrage).
  const handleDateChange = (name, date) => {
    setEmployee({ ...employee, [name]: date }); // Met à jour l'état avec la nouvelle date.
  };

  // Crée des options pour le champ de sélection d'état US en filtrant les états contigus.
  const stateOptions = states
    .filter((x) => x.contiguous)
    .map((state) => ({ value: state.abbreviation, label: state.name }));

  // Fonction pour gérer le changement de sélection pour l'état.
  const handleSelectChange = (selectedOption) => {
    setEmployee({ ...employee, State: selectedOption.value }); // Met à jour l'état de l'employé avec la nouvelle valeur.
  };

  // Gère les changements dans les champs de saisie.
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value }); // Met à jour l'état de l'employé avec la nouvelle valeur.
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page).
    onEmployeeSave(employee); // Appelle la fonction de sauvegarde passée en props avec les données de l'employé.
    // Ne réinitialise pas le formulaire ici. Cela sera géré en réponse à l'état resetForm.
  };

  useEffect(() => {
    if (resetForm) {
      // Réinitialise l'état de l'employé ici avec les valeurs par défaut.
      setEmployee({
        FirstName: "",
        LastName: "",
        DateOfBirth: null,
        StartDate: null,
        Street: "",
        City: "",
        State: "AL",
        ZipCode: "",
        Department: "Sales",
      });
      // Réinitialise l'état de réinitialisation à false après la réinitialisation du formulaire.
      setResetForm(false);
    }
  }, [resetForm, setResetForm]);

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title-form">Create Employee</h2>
        <InputField
          label="First Name"
          name="FirstName"
          value={employee.FirstName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Last Name"
          name="LastName"
          value={employee.LastName}
          onChange={handleChange}
          required
        />
        <div className="datepicker-container">
          <label>Date of Birth</label>
          <DatePicker
            selected={employee.DateOfBirth}
            onChange={(date) => handleDateChange("DateOfBirth", date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            showYearDropdown
            dropdownMode="select"
            required
          />
        </div>
        <div className="datepicker-container">
          <label>Start Date</label>
          <DatePicker
            selected={employee.StartDate}
            onChange={(date) => handleDateChange("StartDate", date)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            dropdownMode="select"
            required
          />
        </div>
        <p className="address">Address</p>
        <InputField
          label="Street"
          name="Street"
          value={employee.Street}
          onChange={handleChange}
          required
        />
        <InputField
          label="City"
          name="City"
          value={employee.City}
          onChange={handleChange}
          required
        />
        <div className="input-container">
          <label>State</label>
          <Select
            options={stateOptions}
            onChange={handleSelectChange}
            placeholder="Select State..."
            value={stateOptions.find(
              (option) => option.value === employee.State
            )}
          />
        </div>
        <InputField
          label="Zip Code"
          name="ZipCode"
          value={employee.ZipCode}
          onChange={handleChange}
          required
        />

        <div className="input-container">
          <label>Department</label>
          <Select
            options={departmentOptions}
            onChange={(selectedOption) =>
              setEmployee({ ...employee, Department: selectedOption.value })
            }
            placeholder="Select Department..."
            classNamePrefix="custom-select"
            value={departmentOptions.find(
              (option) => option.value === employee.Department
            )}
          />
        </div>
        <button className="btn-save" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
