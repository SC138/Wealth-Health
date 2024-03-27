import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InputField from "../InputField/InputField";
import DatePicker from "react-datepicker";
import Select from "react-select";
import states from "states-us";
import "react-datepicker/dist/react-datepicker.css";
import { departmentOptions } from "../Departments/Departments";

// Options pour le champ de sélection du département.
// const departmentOptions = [
//   { value: "Sales", label: "Sales" },
//   { value: "Marketing", label: "Marketing" },
//   { value: "Engineering", label: "Engineering" },
//   { value: "Human Resources", label: "Human Resources" },
//   { value: "Legal", label: "Legal" },
// ];

// Composant pour le formulaire d'employé avec une prop pour la fonction de sauvegarde de l'employé.
const EmployeeForm = ({ onEmployeeSave, resetForm, setResetForm }) => {
  const { id } = useParams();
  const [errors, setErrors] = useState({}); // Nouvel état pour les erreurs de validation.

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

  // Crée des options pour le champ de sélection d'état USA en filtrant les états contigus.
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
    if (!validateForm()) return; // Ne procède pas si le formulaire est invalide.
    onEmployeeSave(employee); // Appelle la fonction de sauvegarde passée en props avec les données de l'employé.
    // Ne réinitialise pas le formulaire ici. Cela sera géré en réponse à l'état resetForm.
  };

  const validateForm = () => {
    const newErrors = {};
    // Regex pour les noms
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ-]+)*$/;
    // Regex pour les adresses
    const streetCityRegex = /^(?=.*[A-Za-z])[A-Za-z0-9\s.,'-]+$/;
    // Regex pour le ZipCode (5 chiffres uniquement)
    const zipCodeRegex = /^\d{5}$/;

    if (!employee.FirstName.trim() || !nameRegex.test(employee.FirstName))
      newErrors.FirstName = "First Name is required and must be valid.";
    if (!employee.LastName.trim() || !nameRegex.test(employee.LastName))
      newErrors.LastName = "Last Name is required and must be valid.";
    if (!employee.DateOfBirth)
      newErrors.DateOfBirth = "Date of Birth is required.";
    if (!employee.StartDate) newErrors.StartDate = "Start Date is required.";
    if (!employee.Street.trim() || !streetCityRegex.test(employee.Street))
      newErrors.Street = "Street is required and must be valid.";
    if (!employee.City.trim() || !/^[A-Za-z\s]+$/.test(employee.City))
      newErrors.City = "City is required and must be valid.";
    if (!employee.ZipCode.trim() || !zipCodeRegex.test(employee.ZipCode))
      newErrors.ZipCode = "Zip Code is required and must be exactly 5 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si le formulaire est valide.
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

  // Fonction pour gérer le style des érreurs de date (naissance et démarrage).
  const startDateError = errors.StartDate ? "errorInput" : "";
  const birthDateError = errors.DateOfBirth ? "errorInput" : "";

  return (
    <div className="form-container">
      <form
        className="form"
        onSubmit={handleSubmit}
        aria-labelledby="formTitle"
      >
        <h2 id="formTitle" className="title-form">
          Create Employee
        </h2>

        {/* First Name Field */}
        <InputField
          label="First Name"
          htmlFor="firstName"
          id="firstName"
          name="FirstName"
          value={employee.FirstName}
          onChange={handleChange}
          error={errors.FirstName}
          aria-required="true"
          aria-invalid={Boolean(errors.FirstName)}
        />

        {/* Last Name Field */}
        <InputField
          label="Last Name"
          htmlFor="lastName"
          id="lastName"
          name="LastName"
          value={employee.LastName}
          onChange={handleChange}
          error={errors.LastName}
          aria-required="true"
          aria-invalid={Boolean(errors.LastName)}
        />

        {/* Date of Birth DatePicker */}
        <div className="datepicker-container" aria-live="polite">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <DatePicker
            id="dateOfBirth"
            selected={employee.DateOfBirth}
            onChange={(date) => handleDateChange("DateOfBirth", date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            showYearDropdown
            dropdownMode="select"
            className={birthDateError}
            aria-required="true"
            aria-invalid={Boolean(errors.DateOfBirth)}
          />
        </div>

        {/* Start Date DatePicker */}
        <div className="datepicker-container" aria-live="polite">
          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            id="startDate"
            selected={employee.StartDate}
            onChange={(date) => handleDateChange("StartDate", date)}
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            dropdownMode="select"
            className={startDateError}
            aria-required="true"
            aria-invalid={Boolean(errors.StartDate)}
          />
        </div>

        {/* Address Fields */}
        <p className="address">Address</p>
        <InputField
          label="Street"
          htmlFor="street"
          id="street"
          name="Street"
          value={employee.Street}
          onChange={handleChange}
          error={errors.Street}
          aria-required="true"
          aria-invalid={Boolean(errors.Street)}
        />
        <InputField
          label="City"
          htmlFor="city"
          id="city"
          name="City"
          value={employee.City}
          onChange={handleChange}
          error={errors.City}
          aria-required="true"
          aria-invalid={Boolean(errors.City)}
        />

        {/* State Select */}
        <div className="input-container">
          <label htmlFor="state">State</label>
          <Select
            inputId="state" 
            options={stateOptions}
            onChange={handleSelectChange}
            placeholder="Select State..."
            classNamePrefix="custom-select"
            value={stateOptions.find(
              (option) => option.value === employee.State
            )}
            aria-required="true"
          />
        </div>

        {/* Zip Code Field */}
        <InputField
          label="Zip Code"
          htmlFor="zipCode"
          id="zipCode"
          name="ZipCode"
          value={employee.ZipCode}
          onChange={handleChange}
          error={errors.ZipCode}
          aria-required="true"
          aria-invalid={Boolean(errors.ZipCode)}
        />

        {/* Department Select */}
        <div className="input-container">
          <label htmlFor="department">Department</label>
          <Select
            inputId="department" 
            options={departmentOptions}
            onChange={(selectedOption) =>
              setEmployee({ ...employee, Department: selectedOption.value })
            }
            placeholder="Select Department..."
            classNamePrefix="custom-select"
            value={departmentOptions.find(
              (option) => option.value === employee.Department
            )}
            aria-required="true"
          />
        </div>

        {/* Submit Button */}
        <button className="btn-save" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
