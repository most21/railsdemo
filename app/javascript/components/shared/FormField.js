import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

const FormField = ({ input, label, type, meta: { touched, error } }) => {
  console.log(touched);
  console.log(error);
  return (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
}

export default FormField;
