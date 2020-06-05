import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";
import { formValueSelector } from 'redux-form';

class CommentForm extends React.Component {
  // componentDidMount() {
  //   const selector = formValueSelector('CommentForm')
  //   connect(
  //     state => ({
  //       firstValue: selector(state, 'first'),
  //       secondValue: selector(state, 'second')
  //     })
  //   )(MyFormComponent)
  //   console.log(selector(state, 'first'));
  // } // end componentDidMount

  renderField(args) {
    const { input, label, type, meta: { touched, error } } = args;
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

  renderComments(args) {
    const { comments, fields, meta: { touched, error, submitFailed } } = args;
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
              component={this.renderField.bind(this)}
              label="Display Name"
            />
            <Field
              name={`${comment}.body`}
              type="text"
              component={this.renderField.bind(this)}
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

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FieldArray name="comments" component={this.renderComments.bind(this)} comments={this.props.article.comments}/>
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
        </div>
      </form>
    );
  } // end render
} // end CommentForm

export default reduxForm({
  form: "CommentForm",
  validate
})(CommentForm);
