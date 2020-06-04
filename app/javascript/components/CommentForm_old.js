import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateComment } from '../helpers/helpers';
import { Link } from 'react-router-dom';

class CommentForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      comment: props.comment,
      errors: {},
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
  } // end constructor

  handleSubmit(c) {
    c.preventDefault();
    const { comment } = this.state;
    const errors = validateComment(comment);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(comment);
    }
    //const { onSubmit } = this.props;
    //onSubmit(this.props.article.id, comment)
  } // end handleSubmit

  handleInputChange(comment) {
    const { target } = comment;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(prevState => ({
      comment: {
        ...prevState.comment,
        [name]: value,
      },
    }));
  } // end handleInputChange

  componentWillReceiveProps({ comment }) {
    this.setState({ comment });
  } // end componentWillReceiveProps

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the comment from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  } // end renderErrors

  render() {
    const { comment } = this.state;
    const { path } = this.props;

    //if (!article.id && path === '/articles/:id/edit') return <ArticleNotFound />;

    const cancelURL = `/articles/${this.props.article.id}`;
    comment.user_id = this.props.user;
    comment.article_id = this.props.article.id

    return (
      <div>
        <h2>New Comment</h2>

        {this.renderErrors()}

        <form className="commentForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="commenter">
              <strong>Display Name:</strong>
              <input type="text" id="commenter" name="commenter" onChange={this.handleInputChange} value={comment.commenter}/>
            </label>
          </div>
          <div>
            <label htmlFor="body">
              <strong>Comment:</strong>
              <textarea cols="30" rows="10" id="body" name="body" onChange={this.handleInputChange} value={comment.body}/>
            </label>
          </div>
          <div>
            <label htmlFor="is_public">
              <input type="checkbox" id="is_public" name="is_public" onChange={this.handleInputChange} value={comment.is_public}/> Public?
            </label>
          </div>
          <div>
            <label htmlFor="user_id">
              <input readOnly type="text" id="user_id" name="user_id" value={comment.user_id}/>
            </label>
          </div>
          <div>
            <label htmlFor="article_id">
              <input readOnly type="text" id="article_id" name="article_id" value={comment.article_id}/>
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to={cancelURL}>Cancel</Link>
          </div>
        </form>
      </div>
    );
  } // end render

} // end CommentForm

// class CommentForm extends React.Component {


//
//   renderErrors() {
//     const { errors } = this.state;
//
//     if (isEmptyObject(errors)) {
//       return null;
//     }
//
//     return (
//       <div className="errors">
//         <h3>The following errors prohibited the article from being saved:</h3>
//         <ul>
//           {Object.values(errors).map(error => (
//             <li key={error}>{error}</li>
//           ))}
//         </ul>
//       </div>
//     );
//   } // end renderErrors

// } // end ArticleForm

CommentForm.propTypes = {
  comment: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

CommentForm.defaultProps = {
  comment: {
    commenter: '',
    body: '',
    is_public: false,
    user_id: '',
    article_id: '',
  },
};

export default CommentForm;
