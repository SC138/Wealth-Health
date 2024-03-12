import React, { useState } from "react";
import InputField from "../InputField/InputField";
import DatePicker from "react-datepicker";
import Select from "react-select";
import states from "states-us";
import "react-datepicker/dist/react-datepicker.css";
import "./style.module.css";

const departmentOptions = [
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
  { value: "Engineering", label: "Engineering" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Legal", label: "Legal" },
];

const EmployeeForm = () => {
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

  const handleDateChange = (name, date) => {
    setEmployee({ ...employee, [name]: date });
  };

  const stateOptions = states
    .filter((x) => x.contiguous)
    .map((state) => ({ value: state.abbreviation, label: state.name }));

  const handleSelectChange = (selectedOption) => {
    setEmployee({ ...employee, State: selectedOption.value });
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(employee);
  };

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
          />
        </div>
        <div className="datepicker-container">
          <label>Start Date</label>
          <DatePicker
            selected={employee.StartDate}
            onChange={(date) => handleDateChange("StartDate", date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <p className="adress">Adress</p>
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
