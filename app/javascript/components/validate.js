const validate = values => {
  const errors = {};

  if (!values.comments) {
    errors.comments = { _error: 'At least one comment must be entered' };
  } else {
    const commentsArrayErrors = [];
    values.comments.forEach((comment, commentIndex) => {
      const commentErrors = {};
      if (!comment || !comment.commenter) {
        commentErrors.commenter = 'Required';
        commentsArrayErrors[commentIndex] = commentErrors;
      }
      if (!comment || !comment.body) {
        commentErrors.body = 'Required';
        commentsArrayErrors[commentIndex] = commentErrors;
      }
    });
    if (commentsArrayErrors.length) {
      errors.comments = commentsArrayErrors;
    }
  }
  //console.log(errors);
  return errors;
};

export default validate;
