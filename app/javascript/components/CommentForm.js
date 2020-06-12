import React from "react";
import { Field, FieldArray, reduxForm } from "redux-form";
import validate from "./validate";
import { formValueSelector } from 'redux-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class CommentForm extends React.Component {
  render() {
    //const { handleSubmit, submitting } = this.props;
    //<FieldArray name="comments" component={Comments} comments={this.props.article.comments}/>

    return (
      <Form onSubmit={this.props.handleSubmit}>
        <br/>
        <h2>Add a comment:</h2>

        <Form.Group controlId="newCommentCommenter">
          <Form.Label>Display Name</Form.Label>
          <Form.Control type="text" size="sm" />
        </Form.Group>

        <Form.Group controlId="newCommentBody">
          <Form.Label>Comment</Form.Label>
          <Form.Control as="textarea" size="sm" />
        </Form.Group>

        <Form.Group controlId="newCommentIsPublic">
          <Form.Check type="switch" label="Public" />
        </Form.Group>

        <Button variant="primary" type="submit">Save</Button>
      </Form>
    );
  } // end render
} // end CommentForm

// export default reduxForm({
//   form: "CommentForm",
//   validate
// })(CommentForm);

export default CommentForm;
