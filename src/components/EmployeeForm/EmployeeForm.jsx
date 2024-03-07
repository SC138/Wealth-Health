import React, { useState } from "react";
import InputField from "../InputField/InputField";
import "./style.module.css";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    FirstName: "",
    LastName: "",
    DateOfBirth: "",
    StartDate: "",
    Street: "",
    City: "",
    State: "",
    ZipCode: "",
    Department: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee);
  };

  return (
    <div className="form-container">
      <h2>Create Employee</h2>
      <form className="form" onSubmit={handleSubmit}>
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
        <InputField
          label="Date of Birth"
          name="DateOfBirth"
          value={employee.DateOfBirth}
          onChange={handleChange}
          required
        />
        <InputField
          label="Start Date"
          name="StartDate"
          value={employee.StartDate}
          onChange={handleChange}
        />
        <p>Adress</p>
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
        <InputField
          label="State"
          name="State"
          value={employee.State}
          onChange={handleChange}
          required
        />
        <InputField
          label="Zip Code"
          name="ZipCode"
          value={employee.ZipCode}
          onChange={handleChange}
          required
        />

        <p>Departement</p>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
