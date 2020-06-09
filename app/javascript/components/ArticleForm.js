import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { viewAllArticles } from '../actions/index';
import { connect } from 'react-redux';
import { isEmptyObject } from '../helpers/helpers';



class ArticleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: props.article,
      errors: {},
    };

    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
  } // end constructor

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

  componentDidMount() {
    const { viewAllArticles } = this.props;
    viewAllArticles();
  } // end componentDidMount

  componentWillReceiveProps({ article }) {
    this.setState({ article });
  } // end componentWillReceiveProps

  render() {
    const { article } = this.state;
    const { path } = this.props;

    if (!article.id && path === '/articles/:id/edit') return <ArticleNotFound />;

    const cancelURL = article.id ? `/articles/${article.id}` : '/articles';
    const title = article.id ? 'Edit Article' : 'New Article';
    if (this.props.articles) {
      article.user_id = this.props.articles[0].cur_user;
      console.log(article);
    }


    return (
      <div>
        <h2>{title}</h2>

        {this.renderErrors()}

        <form className="articleForm" onSubmit={this.props.handleSubmit}>
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
          <div>
            <label htmlFor="user_id">
              <input hidden readOnly type="text" id="user_id" name="user_id" value={article.user_id}/>
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
  //onSubmit: PropTypes.func.isRequired,
  //path: PropTypes.string.isRequired,
};

ArticleForm.defaultProps = {
  article: {
    title: '',
    text: '',
    user_id: '',
  },
};

function mapStateToProps(state) {
  const { articles } = state;
  return {
    isFetching: articles.isFetching,
    articles: articles.items
  };
} // end mapStateToProps

//export default ArticleForm;
export default connect(mapStateToProps, {viewAllArticles})(ArticleForm)
