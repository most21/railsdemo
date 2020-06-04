import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const renderComments = ({ comments, fields, meta: { touched, error, submitFailed } }) => {
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
            component={renderField}
            label="Display Name"
          />
          <Field
            name={`${comment}.body`}
            type="text"
            component={renderField}
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

const CommentForm = props => {
  const { handleSubmit, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FieldArray name="comments" component={renderComments} comments={props.article.comments}/>
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "CommentForm",
  validate
})(CommentForm);
