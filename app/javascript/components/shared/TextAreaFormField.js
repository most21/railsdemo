import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

const TextAreaFormField = ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <div>
        <textarea {...input} cols="30" rows="10" placeholder="Text"/>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
}

export default TextAreaFormField;
