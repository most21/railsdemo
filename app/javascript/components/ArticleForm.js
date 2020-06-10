import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import FormField from "./shared/FormField";
import TextAreaFormField from "./shared/TextAreaFormField";
import HiddenFormField from "./shared/HiddenFormField";

// Field-level validation functions
const required = value => value ? undefined : 'Required';
const minLength = min => value =>
  value && value.length < min ? `Must be at least ${min} characters` : undefined
const minLength5 = minLength(5)


class ArticleForm extends React.Component {
  render() {
    const { article, invalid, submitting, pristine } = this.props;

    //if (!article.id === '/articles/:id/edit') return <ArticleNotFound />;

    const cancelURL = article.id ? `/articles/${article.id}` : '/articles';
    //const userId = this.props.user;

    return (
      <div>
        <h2>{`${this.props.page_title} Article`}</h2>

        <form className="articleForm" onSubmit={this.props.handleSubmit}>
          <Field name="title" type="text" component={FormField} label="Title" validate={[ required, minLength5 ]}/>
          <Field name="text" component={TextAreaFormField} label="Text" validate={[ required ]}/>
          <div className="form-actions">
            <button type="submit" disabled={invalid || submitting || pristine}>Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  } // end render
} // end ArticleForm

ArticleForm.propTypes = {
  article: PropTypes.shape(),
  //onSubmit: PropTypes.func.isRequired,
  //path: PropTypes.string.isRequired,
};

ArticleForm.defaultProps = {
  article: {
    title: '',
    text: '',
  },
};

ArticleForm = reduxForm({
  form: "ArticleForm",
  enableReinitialize: true,
})(ArticleForm);

export default ArticleForm;
