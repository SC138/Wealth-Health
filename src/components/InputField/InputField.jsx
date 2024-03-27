import React from "react";

const InputField = ({ label,id, type, name, value, onChange, error}) => {
  const inputError = error ? "errorInput" : "";
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} name={name} value={value} onChange={onChange} error={error} className={inputError}/>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default InputField;
