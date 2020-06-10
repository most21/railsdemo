import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

const FormField = (props) => {
  const { input, label, type, meta: { touched, error } } = props;
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label} /> {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
}

export default FormField;
