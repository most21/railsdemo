import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

let CommentForm = props => {
  const { onSubmit } = props;
  
  return (
    <div>
      <h2>New Comment</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="displayName">Display Name </label>
          <Field name="displayName" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="body">Comment </label>
          <Field name="body" component="input" type="text" />
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
