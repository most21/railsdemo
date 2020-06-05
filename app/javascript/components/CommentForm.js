import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import Comments from "./comment-form/Comments";
import FormField from "./shared/FormField";
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

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <FieldArray name="comments" component={Comments} comments={this.props.article.comments}/>
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
