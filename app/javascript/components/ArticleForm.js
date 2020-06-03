import React from 'react';
import PropTypes from 'prop-types';
import { isEmptyObject, validateArticle } from '../helpers/helpers';
import { Link } from 'react-router-dom';

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: props.article,
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
  } // end constructor

  handleSubmit(a) {
    a.preventDefault();
    const { article } = this.state;
    const errors = validateArticle(article);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      console.log(article);
      onSubmit(article);
    }
  } // end handleSubmit

  handleInputChange(article) {
    const { target } = article;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState(prevState => ({
      article: {
        ...prevState.article,
        [name]: value,
      },
    }));
  } // end handleInputChange

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the article from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  } // end renderErrors

  componentWillReceiveProps({ article }) {
    this.setState({ article });
  } // end componentWillReceiveProps

  render() {
    const { article } = this.state;
    const { path } = this.props;

    if (!article.id && path === '/articles/:id/edit') return <ArticleNotFound />;

    const cancelURL = article.id ? `/articles/${article.id}` : '/articles';
    const title = article.id ? 'Edit Article' : 'New Article';

    return (
      <div>
        <h2>{title}</h2>

        {this.renderErrors()}

        <form className="articleForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">
              <strong>Title:</strong>
              <input type="text" id="title" name="title" onChange={this.handleInputChange} value={article.title}/>
            </label>
          </div>
          <div>
            <label htmlFor="text">
              <strong>Text:</strong>
              <textarea cols="30" rows="10" id="text" name="text" onChange={this.handleInputChange} value={article.text}/>
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
} // end ArticleForm

ArticleForm.propTypes = {
  article: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

ArticleForm.defaultProps = {
  article: {
    title: '',
    text: '',
    user_id: '',
  },
};

export default ArticleForm;
