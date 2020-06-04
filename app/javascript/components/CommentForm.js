import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

let CommentForm = props => {
  const { handleSubmit } = props;

  return (
    <div>
      <h2>New Comment</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="commenter">Display Name </label>
          <Field name="commenter" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="body">Comment </label>
          <Field name="body" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="is_public">Public </label>
          <Field name="is_public" component="input" type="checkbox" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
} // end CommentForm

CommentForm = reduxForm({
  form: 'comment'
})(CommentForm)

export default CommentForm;
