import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from "redux-form";
import FormField from "./shared/FormField";
import TextAreaFormField from "./shared/TextAreaFormField";
import HiddenFormField from "./shared/HiddenFormField";
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form';
import 'react-widgets/dist/css/react-widgets.css';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

Moment.locale('en')
momentLocalizer()

// Field-level validation functions
const required = value => value ? undefined : 'Required';
const minLength = min => value =>
  value && value.length < min ? `Must be at least ${min} characters` : undefined
const minLength5 = minLength(5)


class ArticleForm extends React.Component {
  render() {
    const { initialValues, article, invalid, submitting, pristine } = this.props;

    //if (!article.id === '/articles/:id/edit') return <ArticleNotFound />;

    const cancelURL = this.props.cur_article_id ? `/articles/${this.props.cur_article_id}` : '/articles';

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item href="/articles">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{`${this.props.page_title} Article`}</Breadcrumb.Item>
        </Breadcrumb>

        <div className="newArticleForm">
          <Form onSubmit={this.props.handleSubmit}>
            <h2 className="newArticleTitle">{`${this.props.page_title} Article`}</h2>
            <hr />

            <Form.Group controlId="newArticleFormTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" size="sm" defaultValue={initialValues.title}/>
            </Form.Group>

            <Form.Group controlId="newArticleFormText">
              <Form.Label>Text</Form.Label>
              <Form.Control as="textarea" size="sm" defaultValue={initialValues.text}/>
            </Form.Group>

            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <DateTimePicker time={false} defaultValue={new Date()} />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Check type="switch" label="Draft Mode*"
                defaultChecked={initialValues.status === "Draft" ? true : false}
                disabled={initialValues.status === "Submitted" ? true : false}
              />
            </Form.Group>
            <p style={{"fontSize": 11}}>
              *In "Draft Mode", click the "Save" button to record changes.
              To officially submit, switch "Draft Mode" off.
              Once submitted, Draft Mode will be permanently disabled for this article.
            </p>

            <Button variant="primary" type="submit">Save</Button>
            {'                              '}
            <Button variant="secondary" href={cancelURL}>Cancel</Button>
          </Form>
        </div>
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
    due_date: '',
    status: '',
  },
};

ArticleForm = reduxForm({
  form: "ArticleForm",
  enableReinitialize: true,
})(ArticleForm);

export default ArticleForm;
