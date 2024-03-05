import React, { useState } from "react";
import InputField from "../InputField/InputField";

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
  });



  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee);
  };

  return (
    <>
    <h2>Create Employee</h2>
    <form onSubmit={handleSubmit}>
      <InputField
        label="First Name"
        name="FirstName"
        value={employee.FirstName}
        onChange={handleChange}
      />
      <InputField
        label="Last Name"
        name="LastName"
        value={employee.LastName}
        onChange={handleChange}
      />
      <InputField
        label="Date of Birth"
        name="DateOfBirth"
        value={employee.DateOfBirth}
        onChange={handleChange}
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
        />
        <InputField
            label="City"
            name="City"
            value={employee.City}
            onChange={handleChange}
        />
        <InputField
            label="State"
            name="State"
            value={employee.State}
            onChange={handleChange}
        />
        <InputField
            label="Zip Code"
            name="ZipCode"
            value={employee.ZipCode}
            onChange={handleChange}
        />
        
      <p>Departement</p>
      <button type="submit">Save</button>
    </form>
    </>
  );
};

export default EmployeeForm;
