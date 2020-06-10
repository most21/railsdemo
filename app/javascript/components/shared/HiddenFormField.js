import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";

const HiddenFormField = (props) => {
  const { input, type, user, meta: { touched, error } } = props;
  console.log('in HiddenFOrmField');
  return (
    <div>
      <div>
        <input {...input} type={type} value={user} readOnly  />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
}

export default HiddenFormField;
