import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import FormField from "./shared/FormField";

const Comments = ({ comments, fields, meta: { touched, error, submitFailed } }) => {
  return (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>
          Add Comment
        </button>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </li>
      {fields.map((comment, index) => (
        <li key={index}>
          <button
            type="button"
            title="Remove Comment"
            onClick={() => fields.remove(index)}
          />
          <h4>Comment #{index + 1}</h4>
          <Field
            name={`${comment}.commenter`}
            type="text"
            component={FormField}
            label="Display Name"
          />
          <Field
            name={`${comment}.body`}
            type="text"
            component={FormField}
            label="Comment"
          />
          <label><strong>Public </strong> </label>
          <Field
            name={`${comment}.is_public`}
            type="checkbox"
            component="input"
          />
        </li>
      ))}
    </ul>
  );
}


export default Comments;
