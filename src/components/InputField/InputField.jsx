import React from "react";

const InputField = ({ label, type, name, value, onChange, required}) => {
  return (
    <div className="input-container">
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required={required}/>
    </div>
  );
};

export default InputField;
